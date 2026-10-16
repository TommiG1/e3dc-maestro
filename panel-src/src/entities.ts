// Default entity_ids as Maestro pins them on first registration (sensor_device.set_stable_entity_id).
// At runtime the backend resolves the keys through the entity registry (panel.PANEL_ENTITIES),
// so renamed entities keep working; keys must match that map.
const sensor = (k: string) => `sensor.e3dc_maestro_${k}`;
const binary = (k: string) => `binary_sensor.e3dc_maestro_${k}`;
const sw = (k: string) => `switch.e3dc_maestro_${k}`;

export const DEFAULT_IDS = {
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
  ctrlActive: sw("regelung_aktiv"),
  ctrlPredictive: sw("vorausschauende_ladung"),
  ctrlPvDelay: sw("pv_prognose_verzogerung"),
  ctrlPlanControls: sw("preisplan_steuert_akku"),
  ctrlPlanShadow: sw("preisplan_schattenmodus"),
  forceDischarge: sw("erzwungene_entladung"),
}

export type EntityKey = keyof typeof DEFAULT_IDS;

/** Current entity_ids; starts with the defaults and is updated by applyEntityMap(). */
export const E: Record<EntityKey, string> = { ...DEFAULT_IDS };

export interface EntityMap {
  entry_id: string | null;
  entities: Partial<Record<EntityKey, string>>;
  disabled: EntityKey[];
}

/** Take over the registry-resolved ids; keys the backend did not find keep their default. */
export function applyEntityMap(map: EntityMap): void {
  for (const key of Object.keys(DEFAULT_IDS) as EntityKey[]) {
    E[key] = map.entities[key] ?? DEFAULT_IDS[key];
  }
}

/** Switches shown in the quick-control sheet (order = display order); key doubles as i18n key. */
export const CONTROL_SWITCHES = ["ctrlActive", "ctrlPredictive", "ctrlPvDelay", "ctrlPlanControls", "ctrlPlanShadow"] as const;

/** Only these entities cause a re-render; hass changes on every state change in the house. */
export const watched = (): string[] => Object.values(E);

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
