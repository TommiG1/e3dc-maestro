import type { Hass } from "./entities";

export type EnergyOrigin = "options" | "rscp" | "maestro";
export type EnergyRole = "solar" | "grid_from" | "grid_to" | "battery_from" | "battery_to" | "wallbox";
export type EnergyStatus = "checking" | "unavailable" | "empty" | "ours" | "partial" | "foreign" | "applying" | "error";
export type EnergyApplyMode = "fill" | "replace";

export interface EnergySensorInfo {
  entity_id: string;
  origin: EnergyOrigin;
}

export interface EnergyDashboardStatus {
  state: EnergyStatus;
  energyReady?: boolean;
  ready?: boolean;
  status?: Exclude<EnergyStatus, "checking" | "applying" | "error">;
  sensors?: Partial<Record<EnergyRole, EnergySensorInfo>>;
  missing?: string[];
  hasSolar?: boolean;
  hasGrid?: boolean;
  hasBattery?: boolean;
  otherSources?: number;
  /** Solar meters already configured that Maestro does not propose (e.g. Fronius). */
  extraSolar?: string[];
  /** Individual devices already configured that Maestro does not propose. */
  extraDevices?: string[];
  /** E3DC wallbox power meter from hacs-e3dc (kW), if present. */
  wallboxPower?: { entity_id: string; available: boolean };
  proposedCount?: number;
  error?: string;
}

const errorText = (err: unknown): string => {
  const code =
    typeof err === "object" && err && "code" in err ? String((err as { code: unknown }).code) : "";
  const message =
    err instanceof Error
      ? err.message
      : typeof err === "object" && err && "message" in err
        ? String((err as { message: unknown }).message)
        : String(err);
  // New WS handlers only register on a core restart (HA cannot unregister old ones).
  if (code === "unknown_command" || /unknown command/i.test(message)) {
    return "Befehl fehlt — Home Assistant einmal neu starten, danach Panel hart neu laden.";
  }
  return message;
};

type PreviewRaw = {
  energy_ready?: boolean;
  ready?: boolean;
  status?: string;
  sensors?: Record<string, { entity_id?: string; origin?: string }>;
  missing?: string[];
  has_solar?: boolean;
  has_grid?: boolean;
  has_battery?: boolean;
  other_sources?: number;
  extra_solar?: string[];
  extra_devices?: string[];
  wallbox_power?: { entity_id?: string; available?: boolean };
  proposed_count?: number;
  error?: string;
};

function fromPreview(raw: PreviewRaw): EnergyDashboardStatus {
  const status = (raw.status ?? "unavailable") as Exclude<EnergyStatus, "checking" | "applying" | "error">;
  const sensors: Partial<Record<EnergyRole, EnergySensorInfo>> = {};
  for (const [role, info] of Object.entries(raw.sensors ?? {})) {
    if (!info?.entity_id || !info.origin) continue;
    sensors[role as EnergyRole] = { entity_id: info.entity_id, origin: info.origin as EnergyOrigin };
  }
  return {
    state: status,
    energyReady: raw.energy_ready === true,
    ready: raw.ready === true,
    status,
    sensors,
    missing: raw.missing ?? [],
    hasSolar: raw.has_solar === true,
    hasGrid: raw.has_grid === true,
    hasBattery: raw.has_battery === true,
    otherSources: raw.other_sources ?? 0,
    extraSolar: raw.extra_solar ?? [],
    extraDevices: raw.extra_devices ?? [],
    wallboxPower:
      raw.wallbox_power?.entity_id
        ? {
            entity_id: raw.wallbox_power.entity_id,
            available: raw.wallbox_power.available === true,
          }
        : undefined,
    proposedCount: raw.proposed_count ?? 0,
    error: raw.error,
  };
}

export async function checkEnergyDashboard(hass: Hass): Promise<EnergyDashboardStatus> {
  try {
    const raw = await hass.callWS<PreviewRaw>({ type: "e3dc_maestro/energy_dashboard/preview" });
    return fromPreview(raw);
  } catch (err) {
    return { state: "error", error: errorText(err) };
  }
}

export async function applyEnergyDashboard(hass: Hass, mode: EnergyApplyMode): Promise<EnergyDashboardStatus> {
  const raw = await hass.callWS<PreviewRaw & { ok?: boolean }>({
    type: "e3dc_maestro/energy_dashboard/apply",
    mode,
  });
  if (raw.ok === false) {
    return { ...fromPreview(raw), state: "error", error: raw.error ?? "apply_failed" };
  }
  return fromPreview(raw);
}

export { errorText as energyErrorText };
