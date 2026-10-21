/** Live battery tile layout. Stored in the browser like the flow style. */
export const BATTERY_STYLES = ["ring", "pack"] as const;
export type BatteryStyleId = (typeof BATTERY_STYLES)[number];

const STORAGE_KEY = "e3dc-maestro.battery-style.v1";

export function parseBatteryStyle(raw: unknown): BatteryStyleId {
  return raw === "ring" ? "ring" : "pack";
}

export function loadBatteryStyle(): BatteryStyleId {
  try {
    return parseBatteryStyle(localStorage.getItem(STORAGE_KEY));
  } catch {
    return "pack";
  }
}

export function saveBatteryStyle(style: BatteryStyleId): void {
  try {
    localStorage.setItem(STORAGE_KEY, style);
  } catch {
    // storage blocked: the choice still applies for this session
  }
}
