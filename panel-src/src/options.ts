/** Option keys that have no Home Assistant entity. Written through e3dc_maestro/panel_options. */

export type OptionKind = "number" | "bool" | "entity" | "entities" | "select" | "time" | "text" | "action";

export interface OptionField {
  key: string;
  kind: OptionKind;
  min?: number;
  max?: number;
  step?: number;
  /** Shown beside the number. "%" uses the slider with the 10% grid. */
  unit?: string;
  choices?: readonly string[];
  /** i18n keys for select choice labels; falls back to the raw value. */
  choiceLabels?: Readonly<Record<string, string>>;
  domains?: readonly string[];
  required?: boolean;
  /** Max length for text fields (default 64). */
  maxLength?: number;
  /** Password-style input for tokens. */
  secret?: boolean;
}

export interface Slot {
  weekdays: number[];
  start_h: number;
  end_h: number;
  class_: "high" | "low" | "normal";
  min_reserve_soc?: number;
}

export type OptionArea = "plant" | "safety" | "tariff" | "pv" | "loads" | "sizing";

export type Modul3ZoneKey = "nt" | "st" | "ht";

export interface Modul3Window {
  start_h: number;
  end_h: number;
}

export interface Modul3Zone {
  price_ct_kwh: number;
  windows: Modul3Window[];
  /** Eigene Fenster je Quartal ("1"–"4"); fehlt ein Quartal, gelten `windows`. */
  quarter_windows?: Record<string, Modul3Window[]>;
}

export type Modul3Zones = Record<Modul3ZoneKey, Modul3Zone>;

export interface OptionBlock {
  area: OptionArea;
  title: "secSources" | "secAdaptive" | "secPriceSensor" | "secEnergyforecast" | "secModul3" | "secForecastSensors" | "secWallboxWire" | "secEvccWire" | "secHpWire" | "secSizingInputs";
  hint: "secSourcesHint" | "secAdaptiveHint" | "secPriceSensorHint" | "secEnergyforecastHint" | "secModul3Hint" | "secForecastSensorsHint" | "secWallboxWireHint" | "secEvccWireHint" | "secHpWireHint" | "secSizingInputsHint";
  fields: readonly OptionField[];
  /** One card for every field, instead of a card per field. */
  bundle?: boolean;
  /**
   * Tariff page only: which band this block belongs to when the page is
   * composed (price → strategy → slots → modul3 → …).
   */
  tariffBand?: "price" | "modul3";
}

const sensor = ["sensor"] as const;
const energy = ["sensor"] as const;
/** Tibber/aWATTar/Ostrom/EPEX sensors; Octopus day-rate curve events. */
const priceSource = ["sensor", "event"] as const;

const num = (key: string, min: number, max: number, step = 1, unit?: string): OptionField => ({ key, kind: "number", min, max, step, unit });
const entity = (key: string, domains: readonly string[], required = false): OptionField => ({
  key,
  kind: "entity",
  domains,
  required,
});
const entities = (key: string, domains: readonly string[]): OptionField => ({
  key,
  kind: "entities",
  domains,
});

export const OPTION_BLOCKS: readonly OptionBlock[] = [
  {
    area: "plant",
    title: "secSources",
    hint: "secSourcesHint",
    fields: [
      num("battery_capacity_kwh", 1, 100, 0.1),
      entity("soc_sensor", sensor, true),
      entity("pv_power_sensor", sensor, true),
      entities("additional_generation_sensor", sensor),
      entities("additional_energy_total_sensor", energy),
      entity("house_power_sensor", sensor, true),
      entity("grid_power_sensor", sensor, true),
      { key: "grid_power_invert", kind: "bool" },
      entity("battery_power_sensor", sensor, true),
      entity("battery_charged_today_sensor", energy),
      entity("battery_discharged_today_sensor", energy),
      entity("pv_production_today_sensor", energy),
      entity("house_consumption_today_sensor", energy),
    ],
  },
  {
    area: "safety",
    title: "secAdaptive",
    hint: "secAdaptiveHint",
    fields: [
      num("adaptive_reserve_lookback_days", 1, 60),
      num("adaptive_reserve_min_days", 1, 30),
      num("adaptive_reserve_safety_factor", 1, 3, 0.1),
      num("adaptive_reserve_max_soc", 5, 90, 1, "%"),
    ],
  },
  {
    area: "tariff",
    title: "secPriceSensor",
    hint: "secPriceSensorHint",
    fields: [entity("price_sensor", priceSource)],
    bundle: true,
    tariffBand: "price",
  },
  {
    area: "tariff",
    title: "secEnergyforecast",
    hint: "secEnergyforecastHint",
    fields: [
      { key: "energyforecast_token", kind: "text", maxLength: 128, secret: true },
      {
        key: "energyforecast_market_zone",
        kind: "select",
        choices: ["DE-LU", "AT", "FR", "NL", "BE", "PL", "DK1", "DK2", "CH", "CZ", "HU", "SI"],
      },
    ],
    bundle: true,
    tariffBand: "price",
  },
  {
    area: "tariff",
    title: "secModul3",
    hint: "secModul3Hint",
    fields: [
      { key: "modul3_enabled", kind: "bool" },
      { key: "modul3_add_to_curve", kind: "bool" },
      {
        key: "modul3_vat",
        kind: "select",
        choices: ["off", "de", "custom"],
        choiceLabels: {
          off: "modul3VatOff",
          de: "modul3VatDe",
          custom: "modul3VatCustom",
        },
      },
      num("modul3_vat_percent", 0, 100, 0.1, "%"),
    ],
    bundle: true,
    tariffBand: "modul3",
  },
  {
    area: "pv",
    title: "secForecastSensors",
    hint: "secForecastSensorsHint",
    fields: [
      entity("pv_forecast_sensor", sensor),
      entity("pv_forecast_today_sensor", sensor),
      entity("tomorrow_pv_sensor", sensor),
      entity("pv_forecast_sensor_day2", sensor),
      entity("pv_forecast_sensor_day3", sensor),
    ],
    bundle: true,
  },
  {
    area: "loads",
    title: "secWallboxWire",
    hint: "secWallboxWireHint",
    fields: [
      entity("wallbox_power_sensor", sensor),
      entity("wallbox_energy_sensor", energy),
      entity("wallbox_soc_sensor", sensor),
      entity("wallbox_plug_entity", ["binary_sensor", "sensor"]),
      { key: "wallbox_included_in_house", kind: "bool" },
      { key: "wallbox_phases", kind: "select", choices: ["1", "3"] },
      entity("wallbox_current_entity", ["number", "input_number"]),
      { key: "wallbox_service_on", kind: "action" },
      { key: "wallbox_service_off", kind: "action" },
    ],
  },
  {
    area: "loads",
    title: "secEvccWire",
    hint: "secEvccWireHint",
    fields: [
      entity("evcc_charging_entity", ["sensor", "binary_sensor", "switch", "input_boolean"]),
      entity("evcc_mode_entity", ["select", "input_select", "sensor"]),
      { key: "evcc_now_value", kind: "text" },
    ],
  },
  {
    area: "loads",
    title: "secHpWire",
    hint: "secHpWireHint",
    fields: [
      entity("hp_switch_entity", ["switch", "input_boolean"]),
      { key: "hp_service_on", kind: "action" },
      { key: "hp_service_off", kind: "action" },
      { key: "hp_time_start", kind: "time" },
      { key: "hp_time_end", kind: "time" },
    ],
  },
  {
    area: "sizing",
    title: "secSizingInputs",
    hint: "secSizingInputsHint",
    fields: [
      { key: "sizing_pv_energy_sensor", kind: "entities", domains: energy },
      entity("sizing_house_energy_sensor", energy),
      { key: "sizing_house_from_balance", kind: "bool" },
      entity("sizing_grid_import_energy_sensor", energy),
      entity("sizing_grid_export_energy_sensor", energy),
      entity("sizing_battery_charge_energy_sensor", energy),
      entity("sizing_battery_discharge_energy_sensor", energy),
      entity("sizing_wallbox_energy_sensor", energy),
      entity("sizing_heat_pump_energy_sensor", energy),
      num("sizing_analysis_days", 30, 730),
      num("sizing_electricity_price_eur_kwh", 0.05, 2, 0.01),
      num("sizing_feed_in_price_eur_kwh", 0, 1, 0.01),
      num("sizing_battery_price_eur_kwh", 100, 5000),
      num("sizing_pv_price_eur_per_kwp", 200, 5000),
      num("sizing_inverter_upgrade_price_eur", 0, 20000),
      num("sizing_round_trip_efficiency", 0.5, 1, 0.01),
      num("sizing_max_battery_sweep_kwh", 5, 200, 0.5),
      num("sizing_battery_step_kwh", 0.5, 10, 0.5),
      num("sizing_max_pv_expansion_kwp", 0, 200, 0.5),
      num("sizing_pv_step_kwp", 0.5, 10, 0.5),
    ],
  },
];

const labels: Record<string, { de: string; en: string }> = {
  battery_capacity_kwh: { de: "Nutzbare Akkukapazität", en: "Usable battery capacity" },
  soc_sensor: { de: "SoC-Sensor", en: "State-of-charge sensor" },
  pv_power_sensor: { de: "PV-Leistung", en: "PV power" },
  additional_generation_sensor: { de: "Zusätzliche Erzeuger (Leistung)", en: "Additional producers (power)" },
  additional_energy_total_sensor: { de: "Zusatz-Energiezähler (gesamt)", en: "Additional energy totals" },
  house_power_sensor: { de: "Hausverbrauch", en: "House power" },
  grid_power_sensor: { de: "Netzleistung", en: "Grid power" },
  grid_power_invert: { de: "Netzleistung invertieren", en: "Invert grid power" },
  battery_power_sensor: { de: "Akkuleistung", en: "Battery power" },
  battery_charged_today_sensor: { de: "Heute geladen", en: "Charged today" },
  battery_discharged_today_sensor: { de: "Heute entladen", en: "Discharged today" },
  pv_production_today_sensor: { de: "PV-Ertrag heute", en: "PV yield today" },
  house_consumption_today_sensor: { de: "Hausverbrauch heute", en: "House consumption today" },
  adaptive_reserve_lookback_days: { de: "Rückblick in Tagen", en: "Lookback in days" },
  adaptive_reserve_min_days: { de: "Mindestens Tage mit Daten", en: "Minimum days of data" },
  adaptive_reserve_safety_factor: { de: "Sicherheitsfaktor", en: "Safety factor" },
  adaptive_reserve_max_soc: { de: "Obergrenze der Reserve", en: "Reserve ceiling" },
  price_sensor: { de: "Preis-Sensor", en: "Price sensor" },
  energyforecast_token: { de: "Energyforecast API-Token", en: "Energyforecast API token" },
  energyforecast_market_zone: { de: "Energyforecast Marktzone", en: "Energyforecast market zone" },
  modul3_enabled: { de: "Modul 3 nutzen", en: "Use Module 3" },
  modul3_add_to_curve: {
    de: "Sensor ohne Netzentgelt → NE auf die Kurve addieren",
    en: "Sensor without grid fees → add NE to the curve",
  },
  modul3_vat: { de: "MwSt. auf ct/kWh", en: "VAT on ct/kWh" },
  modul3_vat_percent: { de: "Eigener MwSt.-Satz", en: "Custom VAT rate" },
  modul3_tariff_slots: {
    de: "Tarif-Slots aus Modul 3 ableiten",
    en: "Derive tariff slots from Module 3",
  },
  pv_forecast_sensor: { de: "Restprognose heute", en: "Remaining forecast today" },
  pv_forecast_today_sensor: { de: "Tagesprognose", en: "Today's forecast" },
  tomorrow_pv_sensor: { de: "Prognose morgen (Tagessumme)", en: "Tomorrow's forecast (daily total)" },
  pv_forecast_sensor_day2: {
    de: "Prognose morgen (Stundenprofil), optional, bei Solcast leer lassen",
    en: "Tomorrow's forecast (hourly profile), optional, leave empty for Solcast",
  },
  pv_forecast_sensor_day3: {
    de: "Prognose übermorgen (Stundenprofil), optional, nur Anzeige",
    en: "Day-after-tomorrow forecast (hourly profile), optional, display only",
  },
  wallbox_power_sensor: { de: "Wallbox-Leistung", en: "Wallbox power" },
  wallbox_energy_sensor: { de: "Wallbox-Energie", en: "Wallbox energy" },
  wallbox_soc_sensor: { de: "Fahrzeug-SoC", en: "Vehicle SoC" },
  wallbox_plug_entity: { de: "Stecker angesteckt", en: "Plug connected" },
  wallbox_included_in_house: { de: "In der Hauslast enthalten", en: "Included in house load" },
  wallbox_phases: { de: "Phasen", en: "Phases" },
  wallbox_current_entity: {
    de: "Ladestrom setzen (nur generische Wallbox)",
    en: "Set charge current (generic wallbox only)",
  },
  wallbox_service_on: { de: "Wallbox einschalten", en: "Turn wallbox on" },
  wallbox_service_off: { de: "Wallbox ausschalten", en: "Turn wallbox off" },
  evcc_charging_entity: { de: "Laden aktiv", en: "Charging active" },
  evcc_mode_entity: { de: "Lade-Modus", en: "Charge mode" },
  evcc_now_value: { de: "Wert für Sofortladen", en: "Instant-charge value" },
  hp_switch_entity: { de: "Schalter der Wärmepumpe", en: "Heat-pump switch" },
  hp_service_on: { de: "Wärmepumpe einschalten", en: "Turn heat pump on" },
  hp_service_off: { de: "Wärmepumpe ausschalten", en: "Turn heat pump off" },
  hp_time_start: { de: "Frühester Start", en: "Earliest start" },
  hp_time_end: { de: "Spätestes Ende", en: "Latest end" },
  sizing_pv_energy_sensor: { de: "PV-Energie", en: "PV energy" },
  sizing_house_energy_sensor: { de: "Hausenergie", en: "House energy" },
  sizing_house_from_balance: { de: "Haus aus der Bilanz rechnen", en: "Derive house from the balance" },
  sizing_grid_import_energy_sensor: { de: "Netzbezug", en: "Grid import" },
  sizing_grid_export_energy_sensor: { de: "Einspeisung", en: "Grid export" },
  sizing_battery_charge_energy_sensor: { de: "Akku geladen", en: "Battery charged" },
  sizing_battery_discharge_energy_sensor: { de: "Akku entladen", en: "Battery discharged" },
  sizing_wallbox_energy_sensor: { de: "Wallbox-Energie", en: "Wallbox energy" },
  sizing_heat_pump_energy_sensor: { de: "Wärmepumpen-Energie", en: "Heat-pump energy" },
  sizing_analysis_days: { de: "Analysetage", en: "Analysis days" },
  sizing_electricity_price_eur_kwh: { de: "Bezugspreis", en: "Import price" },
  sizing_feed_in_price_eur_kwh: { de: "Einspeisepreis", en: "Feed-in price" },
  sizing_battery_price_eur_kwh: { de: "Akkupreis", en: "Battery price" },
  sizing_pv_price_eur_per_kwp: { de: "PV-Preis", en: "PV price" },
  sizing_inverter_upgrade_price_eur: { de: "Wechselrichter-Upgrade", en: "Inverter upgrade" },
  sizing_round_trip_efficiency: { de: "Wirkungsgrad", en: "Round-trip efficiency" },
  sizing_max_battery_sweep_kwh: { de: "Akku bis", en: "Battery sweep up to" },
  sizing_battery_step_kwh: { de: "Akku-Schritt", en: "Battery step" },
  sizing_max_pv_expansion_kwp: { de: "PV-Zubau bis", en: "PV expansion up to" },
  sizing_pv_step_kwp: { de: "PV-Schritt", en: "PV step" },
};

export const fieldLabel = (language: string, key: string): string => {
  const row = labels[key];
  if (!row) return key;
  return language.toLowerCase().startsWith("de") || !language ? row.de : row.en;
};

export const blocksFor = (area: OptionArea): readonly OptionBlock[] => OPTION_BLOCKS.filter((block) => block.area === area);

/** Entity ids whose domain is allowed and whose id contains the query. */
export function entityChoices(ids: readonly string[], domains: readonly string[] | undefined, query: string, limit = 40): string[] {
  const allowed = new Set(domains ?? []);
  const q = query.trim().toLowerCase();
  const out: string[] = [];
  for (const id of ids) {
    const domain = id.split(".")[0];
    if (allowed.size && !allowed.has(domain)) continue;
    if (q && !id.toLowerCase().includes(q)) continue;
    out.push(id);
    if (out.length >= limit) break;
  }
  return out;
}

export function slotsFrom(value: unknown): Slot[] {
  if (!Array.isArray(value)) return [];
  const slots: Slot[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const raw = item as Record<string, unknown>;
    const weekdays = Array.isArray(raw.weekdays)
      ? raw.weekdays.filter((day): day is number => typeof day === "number" && day >= 0 && day <= 6)
      : [];
    const class_ = raw.class_ === "high" || raw.class_ === "low" || raw.class_ === "normal" ? raw.class_ : "normal";
    const slot: Slot = {
      weekdays,
      start_h: typeof raw.start_h === "number" ? raw.start_h : 0,
      end_h: typeof raw.end_h === "number" ? raw.end_h : 24,
      class_,
    };
    if (typeof raw.min_reserve_soc === "number") slot.min_reserve_soc = raw.min_reserve_soc;
    slots.push(slot);
  }
  return slots;
}

export const emptySlot = (): Slot => ({ weekdays: [0, 1, 2, 3, 4], start_h: 6, end_h: 22, class_: "high" });

export const emptyModul3Zones = (): Modul3Zones => ({
  nt: { price_ct_kwh: 0, windows: [{ start_h: 0, end_h: 5 }] },
  st: { price_ct_kwh: 0, windows: [] },
  ht: { price_ct_kwh: 0, windows: [{ start_h: 17, end_h: 21 }] },
});

const windowsFrom = (raw: unknown): Modul3Window[] => {
  const windows: Modul3Window[] = [];
  if (!Array.isArray(raw)) return windows;
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const w = item as Record<string, unknown>;
    const start_h = typeof w.start_h === "number" ? w.start_h : 0;
    const end_h = typeof w.end_h === "number" ? w.end_h : 0;
    if (start_h === end_h) continue;
    windows.push({ start_h, end_h });
  }
  return windows;
};

const zoneFrom = (raw: unknown, fallback: Modul3Zone): Modul3Zone => {
  if (!raw || typeof raw !== "object") return fallback;
  const row = raw as Record<string, unknown>;
  const price = typeof row.price_ct_kwh === "number" && Number.isFinite(row.price_ct_kwh) ? Math.max(0, row.price_ct_kwh) : 0;
  const zone: Modul3Zone = { price_ct_kwh: price, windows: windowsFrom(row.windows) };
  const rawQuarters = row.quarter_windows;
  if (rawQuarters && typeof rawQuarters === "object" && !Array.isArray(rawQuarters)) {
    const quarterWindows: Record<string, Modul3Window[]> = {};
    for (const [key, items] of Object.entries(rawQuarters as Record<string, unknown>)) {
      if (["1", "2", "3", "4"].includes(key) && Array.isArray(items)) quarterWindows[key] = windowsFrom(items);
    }
    if (Object.keys(quarterWindows).length) zone.quarter_windows = quarterWindows;
  }
  return zone;
};

/** Fenster einer Zone für ein Quartal; 0 = die gemeinsamen Fenster. */
export const modul3WindowsFor = (zone: Modul3Zone, quarter: number): Modul3Window[] =>
  quarter === 0 ? zone.windows : (zone.quarter_windows?.[String(quarter)] ?? zone.windows);

/** True wenn NT oder HT für dieses Quartal eigene Fenster haben. */
export const modul3HasOwnWindows = (zones: Modul3Zones, quarter: number): boolean =>
  (["nt", "ht"] as const).some((key) => zones[key].quarter_windows?.[String(quarter)] !== undefined);

/** Fenster einer Zone für ein Quartal setzen; 0 = gemeinsame Fenster. */
export function modul3WithWindows(zone: Modul3Zone, quarter: number, windows: Modul3Window[]): Modul3Zone {
  if (quarter === 0) return { ...zone, windows };
  return { ...zone, quarter_windows: { ...zone.quarter_windows, [String(quarter)]: windows } };
}

/** Eigene Fenster eines Quartals entfernen; danach gelten die gemeinsamen. */
export function modul3WithoutQuarter(zone: Modul3Zone, quarter: number): Modul3Zone {
  if (!zone.quarter_windows) return zone;
  const rest = { ...zone.quarter_windows };
  delete rest[String(quarter)];
  const next: Modul3Zone = { price_ct_kwh: zone.price_ct_kwh, windows: zone.windows };
  if (Object.keys(rest).length) next.quarter_windows = rest;
  return next;
}

export function modul3ZonesFrom(value: unknown): Modul3Zones {
  const base = emptyModul3Zones();
  if (!value || typeof value !== "object") return base;
  const raw = value as Record<string, unknown>;
  return {
    nt: zoneFrom(raw.nt, base.nt),
    st: zoneFrom(raw.st, base.st),
    ht: zoneFrom(raw.ht, base.ht),
  };
}

export type Modul3RuntimeStatus = {
  enabled: boolean;
  quarter: number;
  quarters: number[];
  active: boolean;
  zone: Modul3ZoneKey;
  tariff_slots: boolean;
  derived_slots: { start_h: number; end_h: number; class_: string; quarters: number[] }[];
};

/** Quartale aus den Options; fehlend oder leer → alle vier. */
export function modul3QuartersFrom(value: unknown): number[] {
  if (!Array.isArray(value)) return [1, 2, 3, 4];
  const out: number[] = [];
  for (const item of value) {
    const quarter = Number(item);
    if ([1, 2, 3, 4].includes(quarter) && !out.includes(quarter)) out.push(quarter);
  }
  return out.length ? out.sort((a, b) => a - b) : [1, 2, 3, 4];
}

const _windowActive = (window: Modul3Window, hour: number): boolean =>
  window.start_h <= window.end_h
    ? window.start_h <= hour && hour < window.end_h
    : hour >= window.start_h || hour < window.end_h;

/** Panel-Status aus Options und (ggf. noch ungespeicherten) Zonen. */
export function modul3StatusFrom(
  options: Record<string, unknown>,
  zones: Modul3Zones,
  now = new Date(),
): Modul3RuntimeStatus {
  const enabled = options.modul3_enabled === true;
  const quarters = modul3QuartersFrom(options.modul3_quarters);
  const quarter = Math.floor(now.getMonth() / 3) + 1;
  const active = enabled && quarters.includes(quarter);
  let zone: Modul3ZoneKey = "st";
  if (active) {
    const hour = now.getHours() + now.getMinutes() / 60;
    for (const key of ["ht", "nt"] as const) {
      if (modul3WindowsFor(zones[key], quarter).some((window) => _windowActive(window, hour))) {
        zone = key;
        break;
      }
    }
  }
  const tariff_slots = options.modul3_tariff_slots === true;
  const derived_slots: Modul3RuntimeStatus["derived_slots"] = [];
  if (enabled && tariff_slots) {
    for (const [key, class_] of [["nt", "low"], ["ht", "high"]] as const) {
      const byWindow = new Map<string, Modul3RuntimeStatus["derived_slots"][number]>();
      for (const q of quarters) {
        for (const window of modul3WindowsFor(zones[key], q)) {
          const id = `${window.start_h}-${window.end_h}`;
          const slot = byWindow.get(id) ?? { start_h: window.start_h, end_h: window.end_h, class_, quarters: [] };
          slot.quarters.push(q);
          byWindow.set(id, slot);
        }
      }
      derived_slots.push(...byWindow.values());
    }
  }
  return { enabled, quarter, quarters, active, zone, tariff_slots, derived_slots };
}

export function actionFrom(value: unknown): { service: string; entity: string } {
  if (!value || typeof value !== "object" || Array.isArray(value)) return { service: "", entity: "" };
  const raw = value as Record<string, unknown>;
  const service = typeof raw.action === "string" ? raw.action : typeof raw.service === "string" ? raw.service : "";
  const target = raw.target;
  const entityId = target && typeof target === "object" && !Array.isArray(target) ? (target as Record<string, unknown>).entity_id : undefined;
  return { service, entity: typeof entityId === "string" ? entityId : "" };
}

export function actionTo(service: string, entity: string): Record<string, unknown> | null {
  const name = service.trim();
  if (!name) return null;
  const id = entity.trim();
  return id ? { action: name, target: { entity_id: id } } : { action: name };
}

/** Select values are strings. Older options may still store the phase count as a number. */
export function selectValue(value: unknown, choices: readonly string[]): string {
  if (typeof value === "string" && choices.includes(value)) return value;
  if (typeof value === "number" && choices.includes(String(value))) return String(value);
  return choices[0] ?? "";
}

export function timeValue(value: unknown): string {
  return typeof value === "string" && /^\d{2}:\d{2}/.test(value) ? value.slice(0, 5) : "";
}
