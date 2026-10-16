// Fixed entity_ids: Maestro pins them on first registration (sensor_device.set_stable_entity_id),
// the Lovelace dashboards rely on the same ids.
export const ENTITIES = {
  trajectory: "sensor.e3dc_maestro_forecast_soc_trajektorie_24h",
  soc: "sensor.e3dc_maestro_aktueller_soc",
  targetSoc: "sensor.e3dc_maestro_ziel_soc",
  phase: "sensor.e3dc_maestro_regelphase",
} as const;

export const WATCHED: readonly string[] = Object.values(ENTITIES);

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed: string;
}

export interface Hass {
  states: Record<string, HassEntity | undefined>;
  language: string;
}

export const PHASES: Record<string, string> = {
  off: "Aus",
  manual: "Manuell",
  emergency: "Notladung",
  feed_in_limit: "Einspeisebegrenzung",
  reserve_protection: "Reserveschutz",
  evcc_pause: "EVCC-Pause",
  ht_protection: "HT-Schutz",
  force_discharge: "Erzwungene Entladung",
  morning_discharge: "Morgen-Entladung",
  astro_wait: "Astro-Wartezeit",
  morning_cap: "Morgen-Deckel",
  hard_soc_limit: "SoC-Deckel",
  fast_floor: "Schnell-Boden",
  grid_charge: "Netzladung",
  grid_hold: "Akku halten",
  corridor: "Ladekorridor",
  pv_delay: "PV-Verzögerung",
  spreading: "Spreading",
  curtailment_guard: "Abregelschutz",
  idle: "Leerlauf",
};

export const num = (e: HassEntity | undefined): number | undefined => {
  const v = e ? Number.parseFloat(e.state) : Number.NaN;
  return Number.isFinite(v) ? v : undefined;
};
