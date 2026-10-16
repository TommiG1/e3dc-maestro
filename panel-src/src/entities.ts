// Fixed entity_ids: Maestro pins them on first registration (sensor_device.set_stable_entity_id),
// the Lovelace dashboards rely on the same ids.
const sensor = (k: string) => `sensor.e3dc_maestro_${k}`;
const binary = (k: string) => `binary_sensor.e3dc_maestro_${k}`;
const sw = (k: string) => `switch.e3dc_maestro_${k}`;

export const E = {
  phase: sensor("regelphase"),
  lastAction: sensor("letzte_aktion"),
  explanation: sensor("entscheidungserklarung"),
  trajectory: sensor("forecast_soc_trajektorie_24h"),
  plan: sensor("preisplan"),
  soc: sensor("aktueller_soc"),
  targetSoc: sensor("ziel_soc"),
  pv: sensor("pv_power"),
  house: sensor("house_power"),
  grid: sensor("grid_power"),
  battery: sensor("battery_power"),
  autonomy: sensor("autonomiezeit"),
  costNet: sensor("netto_stromkosten_heute"),
  saving: sensor("pv_ersparnis_heute"),
  selfUse: sensor("pv_eigenverbrauch_heute"),
  importToday: sensor("netzbezug_heute"),
  feedToday: sensor("netzeinspeisung_heute"),
  chargedToday: sensor("geladen_heute"),
  dischargedToday: sensor("entladen_heute"),
  pvTomorrow: sensor("morgen_pv_prognose"),
  reachable: binary("e3dc_erreichbar"),
  chargeLock: binary("ladesperre_aktiv"),
  dischargeLock: binary("entladesperre_aktiv"),
  htProtect: binary("ht_schutz_aktiv"),
  curtail: binary("abregelschutz_aktiv"),
  emergency: binary("notfallladung_aktiv"),
  chargeLimit: sensor("soll_lade_limit"),
  dischargeLimit: sensor("soll_entlade_limit"),
  sentChargeLimit: sensor("gesendetes_lade_limit"),
  sentDischargeLimit: sensor("gesendetes_entlade_limit"),
  forceDischargePower: "number.e3dc_maestro_erzwungene_entladungsleistung",
} as const;

/** Switches shown in the quick-control sheet (order = display order). */
export const CONTROL_SWITCHES = [
  { id: sw("regelung_aktiv"), key: "ctrlActive" },
  { id: sw("vorausschauende_ladung"), key: "ctrlPredictive" },
  { id: sw("pv_prognose_verzogerung"), key: "ctrlPvDelay" },
  { id: sw("preisplan_steuert_akku"), key: "ctrlPlanControls" },
  { id: sw("preisplan_schattenmodus"), key: "ctrlPlanShadow" },
] as const;
export const FORCE_DISCHARGE_SWITCH = sw("erzwungene_entladung");
export const PREDICTIVE_SWITCH = sw("vorausschauende_ladung");
export const PLAN_SHADOW_SWITCH = sw("preisplan_schattenmodus");

/** Only these entities cause a re-render; hass changes on every state change in the house. */
export const WATCHED: readonly string[] = [
  ...Object.values(E),
  ...CONTROL_SWITCHES.map((c) => c.id),
  FORCE_DISCHARGE_SWITCH,
];

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed: string;
}

export interface Hass {
  states: Record<string, HassEntity | undefined>;
  language: string;
  callWS<T>(msg: Record<string, unknown>): Promise<T>;
  callService(domain: string, service: string, data?: Record<string, unknown>): Promise<unknown>;
}

export const num = (e: HassEntity | undefined): number | undefined => {
  const v = e ? Number.parseFloat(e.state) : Number.NaN;
  return Number.isFinite(v) ? v : undefined;
};

export const isOn = (e: HassEntity | undefined): boolean => e?.state === "on";
