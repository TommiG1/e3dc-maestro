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

const periodStart = (period: Exclude<Period, "today">): number => {
  const start = new Date();
  if (period === "week") start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
  else start.setDate(1);
  start.setHours(0, 0, 0, 0);
  return start.getTime();
};

/** Sum of daily statistic changes since Monday or the first of the month. */
export async function loadPeriodSums(hass: Hass, period: Exclude<Period, "today">): Promise<Partial<Record<PeriodKey, number>>> {
  const raw = await hass.callWS<Record<string, { change?: number | null }[]>>({
    type: "recorder/statistics_during_period",
    start_time: new Date(periodStart(period)).toISOString(),
    end_time: new Date().toISOString(),
    statistic_ids: PERIOD_KEYS.map((key) => E[key]),
    period: "day",
    types: ["change"],
  });
  const out: Partial<Record<PeriodKey, number>> = {};
  for (const key of PERIOD_KEYS) {
    const sum = sumChanges(raw[E[key]]);
    if (sum !== undefined) out[key] = sum;
  }
  return out;
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

/** One power entity over the last 24 h, 5-minute means, in watts. `scale` converts kW sensors. */
export async function loadPowerSeries(hass: Hass, entityId: string, scale = 1): Promise<Point[]> {
  const raw = await fetchRaw(hass, [entityId], Date.now() - 24 * 3600e3, {
    minimal_response: true,
    no_attributes: true,
    significant_changes_only: false,
  });
  const points = numericPoints(normalizeHistory(raw[entityId])).map(([ts, v]): Point => [ts, v * scale]);
  return bucket(points, 5 * 60e3, "mean");
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
