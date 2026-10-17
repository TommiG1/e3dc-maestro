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
  costToday: sensor("stromkosten_heute"),
  feedRevenue: sensor("einspeise_erlos_heute"),
  wear: sensor("akku_verschleiss_heute"),
  balance: sensor("energiebilanz_heute"),
  gridToBattery: sensor("netz_akku_heute"),
  unjustified: binary("netzladung_ohne_rechtfertigung"),
  wallboxEnergy: sensor("wallbox_energie_heute"),
  feedInInterventions: sensor("einspeise_eingriffe_heute"),
  feedInAvoided: sensor("dc_abregelung_verhindert_heute"),
  curtailAvoided: sensor("abregelung_verhindert_heute"),
  feedInLimit: binary("einspeisedrosselung_aktiv"),
  gridCharge: binary("netzladung_aktiv"),
  batteryPriority: binary("akku_prioritat_aktiv"),
  lowYield: binary("schwacher_pv_tag"),
  forecastQuality: sensor("forecast_datenqualitat"),
  p10: sensor("pv_restprognose_p10"),
  yieldToday: sensor("pv_tagesprognose"),
  yieldRef: sensor("pv_referenz_ertrag"),
  yieldRatio: sensor("pv_tag_quote"),
  deficit: sensor("morgen_energiedefizit"),
  seasonalReserve: sensor("notstromreserve_aktuell"),
  adaptiveReserve: sensor("notstromreserve_adaptiv"),
  htReserve: sensor("ht_reserve_adaptiv"),
  forwardTarget: sensor("vorausschauendes_ladeziel"),
  astroStart: sensor("astro_ladestart_uhrzeit"),
  seasonalEnd: sensor("saisonales_ladeende_uhrzeit"),
  pvDelayStart: sensor("verzogerter_ladestart_heute"),
  tomorrowStart: sensor("ladestart_morgen_prognose"),
  tomorrowEnd: sensor("ladeende_morgen_prognose"),
  autoStrategy: sensor("auto_aktive_strategie"),
  autoSaving: sensor("auto_geschatzte_einsparung"),
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
  fixedReserveSoc: "number.e3dc_maestro_notstromreserve_prozent",
  ctrlActive: sw("regelung_aktiv"),
  ctrlPredictive: sw("vorausschauende_ladung"),
  ctrlPvDelay: sw("pv_prognose_verzogerung"),
  ctrlPlanControls: sw("preisplan_steuert_akku"),
  ctrlPlanShadow: sw("preisplan_schattenmodus"),
  forceDischarge: sw("erzwungene_entladung"),
  fixedReserve: sw("notstromreserve"),
  debug: sw("debug_logging"),
  debugLog: sensor("debug_log"),
  btnClear: "button.e3dc_maestro_limits_jetzt_freigeben",
  btnCharge: "button.e3dc_maestro_manuell_laden_3_kwh",
  selWallbox: "select.e3dc_maestro_wallbox_typ",
  selMorning: "select.e3dc_maestro_vorentladungs_modus",
  selAuto: "select.e3dc_maestro_auto_optimierung_ziel",
  selTariff: "select.e3dc_maestro_tarif_modus",
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
