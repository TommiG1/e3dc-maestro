// Pure data transformations (unit-tested in transform.test.ts).
export type Point = [number, number];

export interface Trajectory {
  trajectory_points: Point[];
  pv_points: Point[];
  house_points: Point[];
  grid_points: Point[];
  /** Battery power, positive = charging, negative = discharging. */
  battery_points?: Point[];
  trajectory_phases: string[];
  min_soc?: number;
  max_soc?: number;
  grid_draw_kwh?: number;
  grid_feed_in_kwh?: number;
  self_sufficiency_pct?: number;
}

const isPoints = (v: unknown): v is Point[] =>
  Array.isArray(v) && v.every((p) => Array.isArray(p) && p.length === 2 && Number.isFinite(p[0]));

export function parseTrajectory(a: Record<string, unknown> | undefined): Trajectory | undefined {
  if (!a) return undefined;
  const t = a as unknown as Trajectory;
  if (
    !isPoints(t.trajectory_points) ||
    !isPoints(t.pv_points) ||
    !isPoints(t.house_points) ||
    !isPoints(t.grid_points) ||
    !Array.isArray(t.trajectory_phases) ||
    t.trajectory_points.length < 2
  ) {
    return undefined;
  }
  return t;
}

export const toKw = (pts: Point[]): Point[] => pts.map(([x, v]) => [x, v / 1000]);

/**
 * Milliseconds until the SoC trajectory first reaches `target` at or after `now`.
 * `0` = already at/above target; `undefined` = never reaches in the forecast.
 */
export function etaToTargetMs(points: Point[], target: number, now = Date.now()): number | undefined {
  if (!(target > 0) || !Number.isFinite(target) || points.length < 2) return undefined;
  const goal = target - 0.5;
  let prev = points[0];
  for (const p of points) {
    if (p[0] <= now) prev = p;
    else break;
  }
  if (prev[1] >= goal) return 0;
  for (let i = 1; i < points.length; i++) {
    const [t0, s0] = points[i - 1];
    const [t1, s1] = points[i];
    if (t1 < now || s1 < goal) continue;
    if (s0 >= goal) return Math.max(0, t0 - now);
    if (s1 === s0) return Math.max(0, t1 - now);
    const frac = (target - s0) / (s1 - s0);
    const cross = t0 + Math.max(0, Math.min(1, frac)) * (t1 - t0);
    return Math.max(0, cross - now);
  }
  return undefined;
}

/** Parse Maestro autonomy strings like "2h 54min" / "54min" into hours. */
export function parseAutonomyHours(raw: string | undefined): number | undefined {
  if (!raw || raw === "unknown" || raw === "unavailable" || raw === "–") return undefined;
  const h = raw.match(/(\d+)\s*h/i);
  const m = raw.match(/(\d+)\s*min/i);
  if (!h && !m) return undefined;
  return (h ? Number(h[1]) : 0) + (m ? Number(m[1]) : 0) / 60;
}

/** Soft scale for the autonomy track (full bar ≈ this many hours). */
export const AUTONOMY_BAR_HOURS = 12;

/** Compact remaining-time label from milliseconds (e.g. "3 h", "45 min"). */
export function formatEtaLabel(ms: number): string {
  if (!(ms > 0) || !Number.isFinite(ms)) return "";
  const mins = Math.max(1, Math.round(ms / 60_000));
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
}

/** UTC-ms offset of a time zone at a given instant (e.g. +7_200_000 for UTC+2). */
function zoneOffsetMs(utcMs: number, timeZone: string): number {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const get = (type: string, parts: Intl.DateTimeFormatPart[]) =>
    Number(parts.find((p) => p.type === type)?.value ?? 0);
  const parts = dtf.formatToParts(new Date(utcMs));
  const hour = get("hour", parts) % 24; // Intl may report "24" for midnight
  const asUtc = Date.UTC(get("year", parts), get("month", parts) - 1, get("day", parts), hour, get("minute", parts), get("second", parts));
  return asUtc - utcMs;
}

/** UTC-ms timestamp of the next local midnight after `now`. Without `timeZone`, uses the browser's local clock. */
function nextMidnightMs(now: number, timeZone?: string): number {
  if (!timeZone) {
    const d = new Date(now);
    d.setHours(24, 0, 0, 0);
    return d.getTime();
  }
  const dtf = new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" });
  const parts = dtf.formatToParts(new Date(now));
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  const guessUtc = Date.UTC(get("year"), get("month") - 1, get("day") + 1, 0, 0, 0);
  return guessUtc - zoneOffsetMs(guessUtc, timeZone);
}

export type FloorKind = "down" | "up";
export type GridImportKind = "starts" | "until" | "ongoing";

export interface BatteryForecast {
  /**
   * Highest SoC reached after the next rise. Undefined when the SoC only falls (or stays flat)
   * for the whole window — then there is no upcoming peak.
   */
  peakSoc?: number;
  peakAt?: number;
  peakDay?: "today" | "tomorrow";
  /**
   * Reserve / empty event. `down` = discharge reaches the floor from above;
   * `up` = charge recovers to the floor from below. Omitted when already on the floor.
   */
  floorAt?: number;
  floorKind?: FloorKind;
  /**
   * Grid import outlook. `starts` = next begin; `until` = current import ends then;
   * `ongoing` = import for the whole remaining window.
   */
  gridImportAt?: number;
  gridImportKind?: GridImportKind;
}

const GRID_IMPORT_W = -30;
const isImport = (w: number) => w < GRID_IMPORT_W;

/**
 * Battery outlook from the live SoC/grid trajectory: the next reachable peak, when the
 * reserve floor/empty is hit or recovered, and when grid import starts/ends.
 *
 * A peak is a real rise, never the current level. The discharge run at the start of the window
 * (e.g. all night) is skipped; from the first rise on, the peak is the highest SoC in the rest of
 * the window, labelled today/tomorrow by its timestamp.
 *
 * Floor and grid events respect the current state: "Sockel 22:15" is never shown when SoC is
 * already below the reserve (then it's "Sockel erreicht …"); "Netz ab …" is never shown while
 * import is already running (then "Netz bis …" or "Netz durchgehend").
 *
 * Grid import only counts while the grid supplies more than the battery: the simulation blends the
 * measured residual load into its first steps, producing a decaying "import" next to a battery
 * that is clearly covering the house. Whether import is running *now* is decided by the live
 * `currentGrid` (negative = import) when available.
 *
 * `now`/`timeZone`/`currentSoc` are injectable for deterministic tests.
 */
export function batteryForecast(
  soc: Point[],
  grid: Point[],
  opts: {
    now?: number;
    reserve?: number;
    timeZone?: string;
    currentSoc?: number;
    currentGrid?: number;
    battery?: Point[];
  } = {},
): BatteryForecast | undefined {
  const now = opts.now ?? Date.now();
  const future = soc.filter(([t]) => t > now);
  if (!future.length) return undefined;

  const midnight = nextMidnightMs(now, opts.timeZone);
  let riseAt = 0;
  while (riseAt < future.length - 1 && future[riseAt + 1][1] <= future[riseAt][1] + 0.2) riseAt++;
  const peak =
    riseAt < future.length - 1 ? future.slice(riseAt).reduce((a, b) => (b[1] > a[1] ? b : a)) : undefined;
  const peakDay: "today" | "tomorrow" | undefined = peak
    ? peak[0] <= midnight
      ? "today"
      : "tomorrow"
    : undefined;

  const floorThreshold = opts.reserve !== undefined && opts.reserve > 0 ? opts.reserve : 0.5;
  const level =
    opts.currentSoc !== undefined && Number.isFinite(opts.currentSoc) ? opts.currentSoc : future[0][1];
  let floorAt: number | undefined;
  let floorKind: FloorKind | undefined;
  if (level > floorThreshold + 0.5) {
    floorAt = future.find(([, s]) => s <= floorThreshold)?.[0];
    if (floorAt !== undefined) floorKind = "down";
  } else if (level < floorThreshold - 0.5) {
    floorAt = future.find(([, s]) => s >= floorThreshold)?.[0];
    if (floorAt !== undefined) floorKind = "up";
  }

  const batteryAt = new Map(isPoints(opts.battery) ? opts.battery : []);
  const futureGrid: [number, boolean][] = grid
    .filter(([t]) => t > now)
    .map(([t, w]) => [t, isImport(w) && -w > Math.max(0, -(batteryAt.get(t) ?? 0))]);
  const importingNow =
    opts.currentGrid !== undefined && Number.isFinite(opts.currentGrid)
      ? isImport(opts.currentGrid)
      : futureGrid[0]?.[1];
  let gridImportAt: number | undefined;
  let gridImportKind: GridImportKind | undefined;
  if (futureGrid.length) {
    if (importingNow && futureGrid[0][1]) {
      let i = 0;
      while (i < futureGrid.length && futureGrid[i][1]) i++;
      if (i >= futureGrid.length) {
        gridImportKind = "ongoing";
      } else {
        gridImportAt = futureGrid[i][0];
        gridImportKind = "until";
      }
    } else {
      for (let i = 0; i < futureGrid.length; i++) {
        if (!futureGrid[i][1]) continue;
        const next = futureGrid[i + 1];
        if (!next || next[1]) {
          gridImportAt = futureGrid[i][0];
          gridImportKind = "starts";
          break;
        }
      }
    }
  }

  return {
    peakSoc: peak?.[1],
    peakAt: peak?.[0],
    peakDay,
    floorAt,
    floorKind,
    gridImportAt,
    gridImportKind,
  };
}



/** Grid power: negative = import, positive = feed-in (E3DC convention used by the trajectory). */
export function splitGrid(pts: Point[]): { imp: Point[]; exp: Point[] } {
  return {
    imp: pts.map(([x, v]) => [x, Math.max(0, -v) / 1000]),
    exp: pts.map(([x, v]) => [x, Math.max(0, v) / 1000]),
  };
}

export interface Band {
  phase: string;
  x: number;
  x2: number;
}

export function phaseBands(phases: string[], points: Point[]): Band[] {
  const bands: Band[] = [];
  let start = 0;
  for (let i = 1; i <= phases.length; i++) {
    if (i === phases.length || phases[i] !== phases[start]) {
      bands.push({ phase: phases[start], x: points[start][0], x2: points[Math.min(i, points.length) - 1][0] });
      start = i;
    }
  }
  return bands;
}

/** Turn newest-first phase-change events into left-to-right bands for a 24 h Gantt. */
export function timelineBands(
  items: TimelineItem[],
  now = Date.now(),
  windowMs = 24 * 3600e3,
): Band[] {
  if (!items.length || !(windowMs > 0)) return [];
  const origin = now - windowMs;
  const chrono = [...items].filter((it) => it.phase && Number.isFinite(it.ts)).sort((a, b) => a.ts - b.ts);
  if (!chrono.length) return [];
  const bands: Band[] = [];
  for (let i = 0; i < chrono.length; i++) {
    const x = Math.max(chrono[i].ts, origin);
    const x2 = Math.min(i + 1 < chrono.length ? chrono[i + 1].ts : now, now);
    if (x2 <= origin || x >= now || x2 <= x) continue;
    bands.push({ phase: chrono[i].phase, x, x2 });
  }
  return bands;
}

/** Stable colors for decision / Gantt phase chips. */
export function phaseColor(phase: string): string {
  const known: Record<string, string> = {
    off: "#64748b",
    manual: "#64748b",
    emergency: "#f87171",
    feed_in_limit: "#e879f9",
    reserve_protection: "#fb923c",
    evcc_pause: "#94a3b8",
    ht_protection: "#a78bfa",
    force_discharge: "#22d3ee",
    morning_discharge: "#67e8f9",
    astro_wait: "#94a3b8",
    morning_cap: "#818cf8",
    hard_soc_limit: "#c084fc",
    fast_floor: "#4ade80",
    grid_charge: "#34d399",
    grid_hold: "#fbbf24",
    corridor: "#38bdf8",
    pv_delay: "#60a5fa",
    spreading: "#2dd4bf",
    curtailment_guard: "#f87171",
    idle: "#94a3b8",
  };
  if (known[phase]) return known[phase];
  let hash = 0;
  for (let i = 0; i < phase.length; i++) hash = (hash * 31 + phase.charCodeAt(i)) >>> 0;
  const hue = hash % 360;
  return `hsl(${hue} 55% 55%)`;
}

export interface Slot {
  start: string;
  start_local: string;
  price: number;
  grid_charge_kwh: number;
  hold: boolean;
  release: boolean;
  soc_pct: number;
  /** Same plan decisions with expected load/PV (no safety factors) — what the chart shows. */
  soc_expected_pct?: number;
  consumption_kwh: number;
  /** Slot length in hours (from the planner). */
  hours?: number;
  /** House-deficit import with the plan (excludes intentional grid charge). */
  import_kwh?: number;
  /** True when the price comes from Energyforecast behind the tariff provider. */
  forecast?: boolean;
}

export const slotSoc = (s: Pick<Slot, "soc_pct" | "soc_expected_pct">): number =>
  Number.isFinite(s.soc_expected_pct) ? (s.soc_expected_pct as number) : s.soc_pct;

export type SlotAction = "charge" | "hold" | "release";

export const slotAction = (s: Pick<Slot, "grid_charge_kwh" | "hold">): SlotAction =>
  s.grid_charge_kwh > 0 ? "charge" : s.hold ? "hold" : "release";

export function parseSlots(v: unknown): Slot[] {
  if (!Array.isArray(v)) return [];
  return v.filter(
    (s): s is Slot =>
      !!s && typeof s.start === "string" && Number.isFinite(Date.parse(s.start)) && Number.isFinite(s.price),
  );
}

/** Planned end-of-slot SoC from the price plan (forecast strategy preview, also in shadow mode). */
export function planSocPoints(slots: Slot[]): Point[] {
  return slots
    .filter((s) => Number.isFinite(slotSoc(s)))
    .map((s) => [Date.parse(s.start), slotSoc(s)]);
}

/** Slot duration in hours — prefer planner `hours`, else gap to the next start. */
function slotHours(slots: Slot[], i: number): number {
  const s = slots[i];
  if (typeof s.hours === "number" && Number.isFinite(s.hours) && s.hours > 0) return s.hours;
  if (i + 1 < slots.length) {
    const gap = (Date.parse(slots[i + 1].start) - Date.parse(s.start)) / 3600e3;
    if (gap > 0) return gap;
  }
  return 1;
}

/**
 * Planned grid draw in kW for the shadow/plan overlay: house import + intentional
 * grid charge, as a step series (start→end of each slot).
 */
export function planImportKwPoints(slots: Slot[]): Point[] {
  const out: Point[] = [];
  for (let i = 0; i < slots.length; i++) {
    const s = slots[i];
    const hours = slotHours(slots, i);
    const importKwh = typeof s.import_kwh === "number" && Number.isFinite(s.import_kwh) ? s.import_kwh : 0;
    const chargeKwh = typeof s.grid_charge_kwh === "number" && Number.isFinite(s.grid_charge_kwh) ? s.grid_charge_kwh : 0;
    const kw = (importKwh + chargeKwh) / hours;
    if (!Number.isFinite(kw)) continue;
    const t0 = Date.parse(s.start);
    if (!Number.isFinite(t0)) continue;
    const t1 = i + 1 < slots.length ? Date.parse(slots[i + 1].start) : t0 + hours * 3600e3;
    if (!Number.isFinite(t1) || t1 <= t0) {
      out.push([t0, kw]);
      continue;
    }
    out.push([t0, kw], [t1, kw]);
  }
  return out;
}

/**
 * Drop transitional slots (e.g. the partial slot "now until the next price boundary"):
 * a datetime bar chart sizes every bar by the smallest x distance, so a 5-minute stub
 * would shrink all bars to one pixel.
 */
export function chartSlots(slots: Slot[]): Slot[] {
  if (slots.length < 3) return slots;
  const t = slots.map((s) => Date.parse(s.start));
  const gaps = t.slice(1).map((x, i) => x - t[i]).sort((a, b) => a - b);
  const median = gaps[Math.floor(gaps.length / 2)];
  return slots.filter((_, i) => i === slots.length - 1 || t[i + 1] - t[i] >= median * 0.5);
}

const HOUR_MS = 60 * 60 * 1000;
/** Keep native bars only when the plan is already ~hourly and not too long. */
const FINE_GAP_MS = 45 * 60 * 1000;
const MAX_NATIVE_BARS = 48;

/**
 * Chart/strip view of the plan: drop stubs, then bucket to ~1 h when Energyforecast
 * (or similar) delivers quarter-hour slots — otherwise the bars become a comb.
 */
export function displaySlots(slots: Slot[]): Slot[] {
  const cleaned = chartSlots(slots);
  if (cleaned.length < 3) return cleaned;
  const t = cleaned.map((s) => Date.parse(s.start));
  const gaps = t.slice(1).map((x, i) => x - t[i]).sort((a, b) => a - b);
  const median = gaps[Math.floor(gaps.length / 2)] ?? HOUR_MS;
  if (median >= FINE_GAP_MS && cleaned.length <= MAX_NATIVE_BARS) return cleaned;
  return bucketSlots(cleaned, HOUR_MS);
}

/** Merge consecutive slots into fixed time buckets for readable columns. */
export function bucketSlots(slots: Slot[], bucketMs: number): Slot[] {
  if (!slots.length || bucketMs <= 0) return slots;
  const out: Slot[] = [];
  let group: Slot[] = [];
  let groupKey = Number.NaN;

  const flush = () => {
    if (!group.length) return;
    const first = group[0];
    const last = group[group.length - 1];
    const price = group.reduce((sum, s) => sum + s.price, 0) / group.length;
    const charge = group.reduce((sum, s) => sum + s.grid_charge_kwh, 0);
    const consumption = group.reduce((sum, s) => sum + (s.consumption_kwh || 0), 0);
    const hold = charge <= 0 && group.some((s) => s.hold);
    out.push({
      start: first.start,
      start_local: first.start_local,
      price,
      grid_charge_kwh: charge,
      hold,
      release: !hold && charge <= 0,
      soc_pct: last.soc_pct,
      soc_expected_pct: last.soc_expected_pct,
      consumption_kwh: consumption,
      forecast: group.every((s) => !!s.forecast),
    });
    group = [];
  };

  for (const slot of slots) {
    const key = Math.floor(Date.parse(slot.start) / bucketMs);
    if (group.length && key !== groupKey) flush();
    if (!group.length) groupKey = key;
    group.push(slot);
  }
  flush();
  return out;
}

export function priceExtremes(slots: Slot[]): { min: Slot; max: Slot } | undefined {
  if (!slots.length) return undefined;
  return {
    min: slots.reduce((a, b) => (b.price < a.price ? b : a)),
    max: slots.reduce((a, b) => (b.price > a.price ? b : a)),
  };
}

/** Why the price-plan chart is empty (unit-tested). */
export type PlanEmptyKind =
  | "off"
  | "slots"
  | "threshold"
  | "computing"
  | "no_prices"
  | "no_profile"
  | "no_room"
  | "no_plan";

/**
 * Classify an empty plan page from strategy + sensor attributes.
 * Slot/threshold strategies never produce a price-plan chart; plan strategies
 * may still be computing or blocked on prices/profile/room.
 */
export function planEmptyKind(
  strategy: string | undefined,
  attrs: Record<string, unknown>,
): PlanEmptyKind {
  if (strategy === "off") return "off";
  if (strategy === "slots") return "slots";
  if (strategy === "threshold") return "threshold";
  const status = typeof attrs.status === "string" ? attrs.status : undefined;
  if (status === "no_prices") return "no_prices";
  if (status === "no_profile") return "no_profile";
  if (status === "no_room") return "no_room";
  if (strategy === "dynamic_auto" || strategy === "dynamic_expert") {
    if (attrs.enabled !== true || status === undefined) return "computing";
  }
  return "no_plan";
}

// ---- Recorder history -------------------------------------------------------

/** History row as returned by history/history_during_period (compressed or full form). */
export interface RawState {
  s?: string;
  a?: Record<string, unknown>;
  lc?: number;
  lu?: number;
  state?: string;
  attributes?: Record<string, unknown>;
  last_changed?: string;
  last_updated?: string;
}

export interface HistState {
  state: string;
  attrs: Record<string, unknown>;
  ts: number;
}

export function normalizeHistory(rows: RawState[] | undefined): HistState[] {
  return (rows ?? [])
    .map((r) => {
      const sec = r.lc ?? r.lu;
      const ts = sec !== undefined ? sec * 1000 : Date.parse(r.last_changed ?? r.last_updated ?? "");
      return { state: r.s ?? r.state ?? "", attrs: r.a ?? r.attributes ?? {}, ts };
    })
    .filter((r) => Number.isFinite(r.ts));
}

export function numericPoints(rows: HistState[]): Point[] {
  return rows
    .map((r): Point => [r.ts, Number.parseFloat(r.state)])
    .filter(([, v]) => Number.isFinite(v));
}

/** Bucket points on a fixed grid; mean for measurements, last value for cumulative counters. */
export function bucket(points: Point[], stepMs: number, mode: "mean" | "last"): Point[] {
  const buckets = new Map<number, number[]>();
  for (const [x, v] of points) {
    const k = Math.floor(x / stepMs) * stepMs;
    const arr = buckets.get(k);
    if (arr) arr.push(v);
    else buckets.set(k, [v]);
  }
  return [...buckets.entries()]
    .sort(([a], [b]) => a - b)
    .map(([k, vs]): Point => [k, mode === "last" ? vs[vs.length - 1] : vs.reduce((a, b) => a + b, 0) / vs.length]);
}

export interface TimelineItem {
  phase: string;
  reason: string;
  ts: number;
}

/** Newest-first list of phase changes; a run of the same phase collapses to its first entry. */
export function buildTimeline(
  hist: HistState[],
  fallback: unknown,
  limit = 12,
): TimelineItem[] {
  const fromAttrs = (attrs: Record<string, unknown>, state: string, ts: number): TimelineItem => {
    const stamp = typeof attrs.timestamp === "string" ? Date.parse(attrs.timestamp) : Number.NaN;
    return {
      phase: typeof attrs.phase === "string" ? attrs.phase : state,
      reason: typeof attrs.reason === "string" ? attrs.reason : "",
      ts: Number.isFinite(stamp) ? stamp : ts,
    };
  };
  const gone = (s: string) => s === "unavailable" || s === "unknown" || s === "";
  const items = hist.filter((h) => !gone(h.state) || typeof h.attrs.phase === "string").map((h) => fromAttrs(h.attrs, h.state, h.ts));
  if (Array.isArray(fallback)) {
    for (const f of fallback) {
      if (f && typeof f === "object") items.push(fromAttrs(f as Record<string, unknown>, "", Date.now()));
    }
  }
  items.sort((a, b) => b.ts - a.ts);
  const out: TimelineItem[] = [];
  for (const it of items) {
    if (!it.phase) continue;
    const prev = out[out.length - 1];
    if (prev && prev.phase === it.phase) {
      out[out.length - 1] = it; // same phase continues: show when it began
      continue;
    }
    out.push(it);
  }
  return out.slice(0, limit);
}
