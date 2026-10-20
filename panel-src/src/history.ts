import { E, type Hass } from "./entities";
import {
  bucket,
  buildTimeline,
  normalizeHistory,
  numericPoints,
  type Point,
  type RawState,
  type TimelineItem,
} from "./transform";

type Raw = Record<string, RawState[]>;

function fetchRaw(
  hass: Hass,
  ids: string[],
  startMs: number,
  extra: { minimal_response: boolean; no_attributes: boolean; significant_changes_only: boolean },
): Promise<Raw> {
  return hass.callWS<Raw>({
    type: "history/history_during_period",
    start_time: new Date(startMs).toISOString(),
    end_time: new Date().toISOString(),
    entity_ids: ids,
    include_start_time_state: true,
    ...extra,
  });
}

const startOfToday = (): number => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.getTime();
};

export type SparkKey =
  | "costNet"
  | "saving"
  | "selfUse"
  | "chargedToday"
  | "costToday"
  | "feedRevenue"
  | "wear"
  | "balance"
  | "gridToBattery"
  | "wallboxEnergy"
  | "curtailAvoided";
const SPARK_KEYS: SparkKey[] = [
  "costNet",
  "saving",
  "selfUse",
  "chargedToday",
  "costToday",
  "feedRevenue",
  "wear",
  "balance",
  "gridToBattery",
  "wallboxEnergy",
  "curtailAvoided",
];

/** Sum of the recorder `change` column. Missing rows mean the statistic does not exist. */
export function sumChanges(rows: { change?: number | null }[] | undefined): number | undefined {
  if (!rows?.length) return undefined;
  let any = false;
  let sum = 0;
  for (const row of rows) {
    if (typeof row.change === "number" && Number.isFinite(row.change)) {
      any = true;
      sum += row.change;
    }
  }
  return any ? sum : undefined;
}

export type Period = "today" | "week" | "month";

/** Daily counters the live tiles can show for the current week or month. */
export const PERIOD_KEYS = [
  "costNet",
  "costToday",
  "feedRevenue",
  "wear",
  "saving",
  "selfUse",
  "importToday",
  "feedToday",
  "chargedToday",
  "dischargedToday",
  "gridToBattery",
  "wallboxEnergy",
  "curtailAvoided",
  "feedInAvoided",
  "feedInInterventions",
] as const;
export type PeriodKey = (typeof PERIOD_KEYS)[number];
// Net cost is state_class "total" without last_reset: its midnight reset would count as a negative change.
const STAT_KEYS = PERIOD_KEYS.filter((key) => key !== "costNet");

/** Local calendar day as `YYYY-MM-DD`. */
export const calendarDay = (d = new Date()): string => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

/** Parse a `YYYY-MM-DD` key into a local midnight Date. Invalid keys fall back to today. */
export const parseCalendarDay = (day: string): Date => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(day);
  if (!m) {
    const fallback = new Date();
    fallback.setHours(0, 0, 0, 0);
    return fallback;
  }
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
};

export const isCalendarToday = (day: string): boolean => day === calendarDay();

export const shiftCalendarDay = (day: string, delta: number): string => {
  const d = parseCalendarDay(day);
  d.setDate(d.getDate() + delta);
  return calendarDay(d);
};

export const periodStart = (period: Exclude<Period, "today">, now = Date.now()): number => {
  const start = new Date(now);
  if (period === "week") start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
  else start.setDate(1);
  start.setHours(0, 0, 0, 0);
  return start.getTime();
};

type StatRow = { start?: unknown; change?: number | null };
type StatRaw = Record<string, StatRow[]>;

const BALANCE_PART_KEYS = ["costToday", "feedRevenue", "saving", "wear"] as const;
export type BalancePartKey = (typeof BALANCE_PART_KEYS)[number];
export type PulseRange = Exclude<Period, "today">;

export interface BalanceDay {
  day: string;
  ts: number;
  costToday?: number;
  feedRevenue?: number;
  saving?: number;
  wear?: number;
  balance?: number;
}

/** Same formula as the live Tagesbilanz for a past calendar day. */
export function dayBalance(parts: Pick<BalanceDay, BalancePartKey>): number | undefined {
  const { feedRevenue, saving, costToday, wear } = parts;
  if (feedRevenue === undefined || saving === undefined || costToday === undefined || wear === undefined) {
    return undefined;
  }
  return feedRevenue + saving - costToday - wear;
}

/** Recorder row start → local midnight ms. Accepts unix seconds/ms or ISO strings. */
export function statRowStartMs(row: StatRow): number | undefined {
  const s = row.start;
  if (typeof s === "number" && Number.isFinite(s)) return s > 1e12 ? s : s * 1000;
  if (typeof s === "string") {
    const t = Date.parse(s);
    return Number.isFinite(t) ? t : undefined;
  }
  return undefined;
}

function changeByDay(rows: StatRow[] | undefined): Map<string, number> {
  const map = new Map<string, number>();
  for (const row of rows ?? []) {
    const ms = statRowStartMs(row);
    if (ms === undefined || typeof row.change !== "number" || !Number.isFinite(row.change)) continue;
    map.set(calendarDay(new Date(ms)), row.change);
  }
  return map;
}

/** Build one BalanceDay per local calendar day from Monday / 1st until `now`. */
export function buildBalanceDays(raw: StatRaw, period: PulseRange, now = Date.now()): BalanceDay[] {
  const maps = Object.fromEntries(BALANCE_PART_KEYS.map((key) => [key, changeByDay(raw[E[key]])])) as Record<
    BalancePartKey,
    Map<string, number>
  >;
  const startMs = periodStart(period, now);
  const endKey = calendarDay(new Date(now));
  const out: BalanceDay[] = [];
  const cursor = new Date(startMs);
  while (calendarDay(cursor) <= endKey) {
    const day = calendarDay(cursor);
    const parts = {
      costToday: maps.costToday.get(day),
      feedRevenue: maps.feedRevenue.get(day),
      saving: maps.saving.get(day),
      wear: maps.wear.get(day),
    };
    out.push({ day, ts: cursor.getTime(), ...parts, balance: dayBalance(parts) });
    cursor.setDate(cursor.getDate() + 1);
  }
  return out;
}

async function fetchDayStats(hass: Hass, startMs: number, endMs: number, keys: readonly PeriodKey[]): Promise<StatRaw> {
  return hass.callWS<StatRaw>({
    type: "recorder/statistics_during_period",
    start_time: new Date(startMs).toISOString(),
    end_time: new Date(endMs).toISOString(),
    statistic_ids: keys.map((key) => E[key]),
    period: "day",
    types: ["change"],
  });
}

async function loadStatSums(hass: Hass, startMs: number, endMs: number): Promise<Partial<Record<PeriodKey, number>>> {
  const raw = await fetchDayStats(hass, startMs, endMs, STAT_KEYS);
  const out: Partial<Record<PeriodKey, number>> = {};
  for (const key of STAT_KEYS) {
    const sum = sumChanges(raw[E[key]]);
    if (sum !== undefined) out[key] = sum;
  }
  if (out.costToday !== undefined && out.feedRevenue !== undefined) out.costNet = out.costToday - out.feedRevenue;
  return out;
}

/** Daily economic balances since Monday or the first of the month. */
export async function loadBalanceDays(hass: Hass, period: PulseRange): Promise<BalanceDay[]> {
  const now = Date.now();
  const raw = await fetchDayStats(hass, periodStart(period, now), now, BALANCE_PART_KEYS);
  return buildBalanceDays(raw, period, now);
}

/** Sum of daily statistic changes since Monday or the first of the month. */
export async function loadPeriodSums(hass: Hass, period: Exclude<Period, "today">): Promise<Partial<Record<PeriodKey, number>>> {
  return loadStatSums(hass, periodStart(period), Date.now());
}

/** Sum of daily statistic changes for one local calendar day (`YYYY-MM-DD`). */
export async function loadDaySums(hass: Hass, day: string): Promise<Partial<Record<PeriodKey, number>>> {
  const start = parseCalendarDay(day);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return loadStatSums(hass, start.getTime(), end.getTime());
}

/** Cumulative daily counters since midnight, 30-minute grid. */
export async function loadSparks(hass: Hass): Promise<Record<SparkKey, Point[]>> {
  const raw = await fetchRaw(hass, SPARK_KEYS.map((k) => E[k]), startOfToday(), {
    minimal_response: true,
    no_attributes: true,
    significant_changes_only: false,
  });
  const out = {} as Record<SparkKey, Point[]>;
  for (const key of SPARK_KEYS) {
    out[key] = bucket(numericPoints(normalizeHistory(raw[E[key]])), 30 * 60e3, "last");
  }
  return out;
}

export interface IstSeries {
  pv: Point[];
  house: Point[];
  soc: Point[];
}

const DAY_MS = 24 * 3600e3;
const HISTORY_QUERY = { minimal_response: true, no_attributes: true, significant_changes_only: false };

const watts = (hass: Hass, entityId: string, rows: RawState[] | undefined): Point[] => {
  const scale = hass.states[entityId]?.attributes.unit_of_measurement === "kW" ? 1000 : 1;
  const points = numericPoints(normalizeHistory(rows)).map(([ts, v]): Point => [ts, v * scale]);
  return bucket(points, 5 * 60e3, "mean");
};

/** One power entity over the last 24 h, 5-minute means, in watts. `scale` converts kW sensors. */
export async function loadPowerSeries(hass: Hass, entityId: string, scale = 1): Promise<Point[]> {
  const raw = await fetchRaw(hass, [entityId], Date.now() - DAY_MS, HISTORY_QUERY);
  const points = numericPoints(normalizeHistory(raw[entityId])).map(([ts, v]): Point => [ts, v * scale]);
  return bucket(points, 5 * 60e3, "mean");
}

/** Several power entities over the last 24 h, one recorder query, 5-minute means in watts. */
export async function loadPowerSeriesMany(hass: Hass, entityIds: string[]): Promise<Record<string, Point[]>> {
  const ids = [...new Set(entityIds)];
  const out: Record<string, Point[]> = {};
  if (!ids.length) return out;
  const raw = await fetchRaw(hass, ids, Date.now() - DAY_MS, HISTORY_QUERY);
  for (const id of ids) out[id] = watts(hass, id, raw[id]);
  return out;
}

/** Actual power/SoC of the last `hours` hours on a 5-minute grid (W / %). */
export async function loadIst(hass: Hass, hours = 6): Promise<IstSeries> {
  const raw = await fetchRaw(hass, [E.pv, E.house, E.soc], Date.now() - hours * 3600e3, {
    minimal_response: true,
    no_attributes: true,
    significant_changes_only: false,
  });
  const series = (id: string) => bucket(numericPoints(normalizeHistory(raw[id])), 5 * 60e3, "mean");
  return { pv: series(E.pv), house: series(E.house), soc: series(E.soc) };
}

/** Phase changes of the last 24 h. The state is the phase, so only state changes are requested. */
export async function loadTimeline(hass: Hass): Promise<TimelineItem[]> {
  const raw = await fetchRaw(hass, [E.lastAction], Date.now() - 24 * 3600e3, {
    minimal_response: false,
    no_attributes: false,
    significant_changes_only: true,
  });
  const live = hass.states[E.lastAction]?.attributes.history;
  return buildTimeline(normalizeHistory(raw[E.lastAction]), live);
}
