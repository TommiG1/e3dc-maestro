/** First-run checklist. Reads entities and panel options; it does not change config. */

export type SetupStatus = "done" | "todo" | "optional" | "wait";

export type SetupId = "plant" | "tariff" | "forecast" | "safety" | "loads" | "regulation" | "run";

export interface SetupStep {
  id: SetupId;
  status: SetupStatus;
  required: boolean;
  /** Settings area the step opens. */
  area?: string;
  /** Option keys that still have no live entity. */
  missing: string[];
  note?: string;
}

export interface SetupFacts {
  /** Panel options were read from the integration. */
  ready: boolean;
  options: Record<string, unknown>;
  slots: number;
  state: (entityId: string) => string | undefined;
  /** Switch by unique_id suffix. Undefined when the entity is missing. */
  on: (key: string) => boolean | undefined;
  number: (key: string) => number | undefined;
  select: (key: string) => string | undefined;
  phase?: string;
  explanation?: string;
  /** Undefined when the master switch entity is missing. */
  regulation?: boolean;
}

const PLANT = ["soc_sensor", "pv_power_sensor", "house_power_sensor", "grid_power_sensor", "battery_power_sensor"] as const;
const FORECAST = ["pv_forecast_sensor", "pv_forecast_today_sensor", "tomorrow_pv_sensor"] as const;
const WIRES = ["wallbox_power_sensor", "evcc_charging_entity", "hp_switch_entity"] as const;
const RESERVES = ["fixed_reserve_enabled", "seasonal_reserve_enabled", "adaptive_reserve_enabled"] as const;
const LOADS = ["wallbox_enabled", "evcc_enabled", "hp_enabled"] as const;

const gone = (state: string | undefined): boolean =>
  !state || state === "unknown" || state === "unavailable" || state === "none";

const optionEntity = (options: Record<string, unknown>, key: string): string | undefined => {
  const value = options[key];
  return typeof value === "string" && value.includes(".") ? value : undefined;
};

const live = (facts: SetupFacts, key: string): boolean => {
  const id = optionEntity(facts.options, key);
  return !!id && !gone(facts.state(id));
};

const plantMissing = (facts: SetupFacts): string[] => {
  const missing: string[] = PLANT.filter((key) => !live(facts, key));
  const capacity = facts.options.battery_capacity_kwh;
  if (typeof capacity !== "number" || !(capacity > 0)) missing.push("battery_capacity_kwh");
  return missing;
};

const tariffStatus = (facts: SetupFacts): SetupStatus => {
  const mode = facts.select("tariff_mode");
  const fixed = Number.isFinite(facts.number("fixed_buy_price") ?? Number.NaN);
  const dynamic = live(facts, "price_sensor");
  const slots = facts.slots > 0;
  if (mode === "dynamic") {
    if (!facts.ready && !dynamic && !slots) return "wait";
    return dynamic || slots ? "done" : "todo";
  }
  if (mode === "fixed" && fixed) return "done";
  if (dynamic || slots) return "done";
  return facts.ready ? "todo" : "wait";
};

const anyOn = (facts: SetupFacts, keys: readonly string[]): boolean | undefined => {
  const values = keys.map((key) => facts.on(key));
  if (values.some((value) => value === true)) return true;
  if (values.every((value) => value === undefined)) return undefined;
  return false;
};

export function setupSteps(facts: SetupFacts): SetupStep[] {
  const plant = facts.ready ? plantMissing(facts) : [];
  const forecastOn = FORECAST.some((key) => live(facts, key));
  const wired = WIRES.some((key) => live(facts, key));
  const loadsOn = anyOn(facts, LOADS);
  const reserveOn = anyOn(facts, RESERVES);
  const decided = !gone(facts.phase);
  return [
    {
      id: "plant",
      status: facts.ready ? (plant.length ? "todo" : "done") : "wait",
      required: true,
      area: "plant",
      missing: plant,
    },
    { id: "tariff", status: tariffStatus(facts), required: true, area: "tariff", missing: [] },
    {
      id: "forecast",
      status: !facts.ready ? "wait" : forecastOn ? "done" : "optional",
      required: false,
      area: "pv",
      missing: [],
    },
    {
      id: "safety",
      status: reserveOn === undefined ? "wait" : reserveOn ? "done" : "optional",
      required: false,
      area: "safety",
      missing: [],
    },
    {
      id: "loads",
      status: loadsOn === true || wired ? "done" : !facts.ready || loadsOn === undefined ? "wait" : "optional",
      required: false,
      area: "loads",
      missing: [],
    },
    {
      id: "regulation",
      status: facts.regulation === undefined ? "wait" : facts.regulation ? "done" : "todo",
      required: true,
      missing: [],
    },
    {
      id: "run",
      status: decided ? "done" : facts.regulation === false ? "todo" : "wait",
      required: true,
      missing: [],
      note: decided && facts.explanation && !gone(facts.explanation) ? facts.explanation : undefined,
    },
  ];
}

export const setupComplete = (steps: readonly SetupStep[]): boolean =>
  steps.filter((step) => step.required).every((step) => step.status === "done");

const ACK_KEY = "e3dc-maestro.setup.ack";

/** The live banner stays hidden after the user confirms a complete setup. */
export const parseSetupAck = (raw: string | null): boolean => raw === "1";

export function loadSetupAck(): boolean {
  try {
    return parseSetupAck(localStorage.getItem(ACK_KEY));
  } catch {
    return false;
  }
}

export function saveSetupAck(): void {
  try {
    localStorage.setItem(ACK_KEY, "1");
  } catch {
    // storage blocked: the banner still hides until the next reload
  }
}
