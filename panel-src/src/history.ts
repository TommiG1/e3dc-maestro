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

export type SparkKey = "costNet" | "saving" | "selfUse" | "chargedToday";
const SPARKS: Record<SparkKey, string> = {
  costNet: E.costNet,
  saving: E.saving,
  selfUse: E.selfUse,
  chargedToday: E.chargedToday,
};

/** Cumulative daily counters since midnight, 30-minute grid. */
export async function loadSparks(hass: Hass): Promise<Record<SparkKey, Point[]>> {
  const raw = await fetchRaw(hass, Object.values(SPARKS), startOfToday(), {
    minimal_response: true,
    no_attributes: true,
    significant_changes_only: false,
  });
  const out = {} as Record<SparkKey, Point[]>;
  for (const [key, id] of Object.entries(SPARKS) as [SparkKey, string][]) {
    out[key] = bucket(numericPoints(normalizeHistory(raw[id])), 30 * 60e3, "last");
  }
  return out;
}

export interface IstSeries {
  pv: Point[];
  house: Point[];
  soc: Point[];
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
