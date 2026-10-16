// Pure data transformations (unit-tested in transform.test.ts).
export type Point = [number, number];

export interface Trajectory {
  trajectory_points: Point[];
  pv_points: Point[];
  house_points: Point[];
  grid_points: Point[];
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

export interface Slot {
  start: string;
  start_local: string;
  price: number;
  grid_charge_kwh: number;
  hold: boolean;
  release: boolean;
  soc_pct: number;
  consumption_kwh: number;
}

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

export function priceExtremes(slots: Slot[]): { min: Slot; max: Slot } | undefined {
  if (!slots.length) return undefined;
  return {
    min: slots.reduce((a, b) => (b.price < a.price ? b : a)),
    max: slots.reduce((a, b) => (b.price > a.price ? b : a)),
  };
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
