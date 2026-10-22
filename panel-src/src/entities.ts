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
  additionalPv: sensor("additional_pv_power"),
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
  targetCharge: sensor("ziel_ladeleistung"),
  sizingStatus: sensor("advisor_status"),
  sizingMatrix: sensor("advisor_sizing_matrix"),
  sizingScenario: sensor("advisor_szenario"),
  sizingInverter: binary("advisor_wr_upgrade_empfohlen"),
  btnSizing: "button.e3dc_maestro_sizing_analyse_starten",
  saving: sensor("pv_ersparnis_heute"),
  selfUse: sensor("pv_eigenverbrauch_heute"),
  importToday: sensor("netzbezug_heute"),
  feedToday: sensor("netzeinspeisung_heute"),
  pvToday: sensor("pv_ertrag_heute"),
  pvExtraToday: sensor("pv_zusatz_heute"),
  houseToday: sensor("hausverbrauch_heute"),
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
  /** Total plant AC rating (W), incl. additional producers — Maestro WR-Leistung. */
  inverterPower: "number.e3dc_maestro_wr_leistung",
  ctrlActive: sw("regelung_aktiv"),
  ctrlPredictive: sw("vorausschauende_ladung"),
  ctrlPvDelay: sw("pv_prognose_verzogerung"),
  ctrlPlanControls: sw("preisplan_steuert_akku"),
  ctrlPlanShadow: sw("preisplan_schattenmodus"),
  ctrlAuto: sw("auto_optimierung"),
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
  selStrategy: "select.e3dc_maestro_netzladung_strategie",
}

export type EntityKey = keyof typeof DEFAULT_IDS;

/** Current entity_ids; starts with the defaults and is updated by applyEntityMap(). */
export const E: Record<EntityKey, string> = { ...DEFAULT_IDS };

export interface PlantModule {
  name: string;
  entities: Record<string, string>;
}

export interface PlantDevice {
  name: string;
  entities: Record<string, string>;
  modules?: PlantModule[];
  controls?: Record<string, string>;
}

export interface PlantControls {
  general?: Record<string, string>;
  wallbox?: Record<string, string>;
}

export interface PlantIdentity {
  name?: string;
  model?: string;
  serial?: string;
  firmware?: string;
}

export interface PlantMap {
  entities: Record<string, string>;
  packs: PlantDevice[];
  wallboxes: PlantDevice[];
  controls?: PlantControls;
  identity?: PlantIdentity;
}

export const emptyPlant = (): PlantMap => ({ entities: {}, packs: [], wallboxes: [], controls: { general: {}, wallbox: {} }, identity: {} });

/** e3dc_rscp entities for the plant screen. Replaced on every resolve. */
export let plant: PlantMap = emptyPlant();

export interface EntityMap {
  entry_id: string | null;
  entities: Partial<Record<EntityKey, string>>;
  disabled: EntityKey[];
  /** unique_id suffix -> current entity_id for every tunable number/switch/select/button. */
  settings?: Record<string, string>;
  settings_disabled?: string[];
  plant?: PlantMap;
}

/** Take over the registry-resolved ids; keys the backend did not find keep their default. */
export function applyEntityMap(map: EntityMap): void {
  for (const key of Object.keys(DEFAULT_IDS) as EntityKey[]) {
    E[key] = map.entities[key] ?? DEFAULT_IDS[key];
  }
}

/** Tunable entities for the settings screen. Replaced wholesale on every resolve. */
export const S: Record<string, string> = {};
const settingDisabled = new Set<string>();

export function applySettingsMap(map: Pick<EntityMap, "settings" | "settings_disabled">): void {
  for (const key of Object.keys(S)) delete S[key];
  Object.assign(S, map.settings ?? {});
  settingDisabled.clear();
  for (const key of map.settings_disabled ?? []) settingDisabled.add(key);
}

export function applyPlantMap(map: Pick<EntityMap, "plant">): void {
  plant = map.plant ?? emptyPlant();
}

export const isSettingDisabled = (key: string): boolean => settingDisabled.has(key);

/** Switches shown in the quick-control sheet (order = display order); key doubles as i18n key. */
export const CONTROL_SWITCHES = ["ctrlActive", "ctrlPredictive", "ctrlPvDelay", "ctrlPlanControls", "ctrlPlanShadow"] as const;

/** Only these entities cause a re-render; hass changes on every state change in the house. */
const values = (map: Record<string, string> | undefined): string[] => Object.values(map ?? {});

const plantIds = (): string[] => [
  ...values(plant.entities),
  ...values(plant.controls?.general),
  ...values(plant.controls?.wallbox),
  ...plant.packs.flatMap((pack) => [
    ...values(pack.entities),
    ...values(pack.controls),
    ...(pack.modules ?? []).flatMap((mod) => values(mod.entities)),
  ]),
  ...plant.wallboxes.flatMap((box) => [...values(box.entities), ...values(box.controls)]),
];

export const watched = (): string[] => [...Object.values(E), ...Object.values(S), ...plantIds()];

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed: string;
  last_updated?: string;
}

export interface Hass {
  states: Record<string, HassEntity | undefined>;
  language: string;
  user?: { is_admin?: boolean };
  callWS<T>(msg: Record<string, unknown>): Promise<T>;
  callService(domain: string, service: string, data?: Record<string, unknown>): Promise<unknown>;
}

export const num = (e: HassEntity | undefined): number | undefined => {
  const v = e ? Number.parseFloat(e.state) : Number.NaN;
  return Number.isFinite(v) ? v : undefined;
};

export const isOn = (e: HassEntity | undefined): boolean => e?.state === "on";
