/** Live alert banner: dismiss until the next new alarm, or hide permanently. */
import { E, type Hass } from "./entities";

export const ALERT_KEYS = [
  "unreachable",
  "charge_lock",
  "discharge_lock",
  "unjustified",
  "reserve_charge",
  "emergency_charge",
] as const;

export type AlertKey = (typeof ALERT_KEYS)[number];

const DISMISS_KEY = "e3dc-maestro.alerts-dismissed.v1";
const HIDDEN_KEY = "e3dc-maestro.alerts-banner-hidden.v1";

const KEY_LABEL: Record<AlertKey, "alertUnreachable" | "alertChargeLock" | "alertDischargeLock" | "alertUnjustified" | "alertReserveCharge" | "alertEmergencyCharge"> = {
  unreachable: "alertUnreachable",
  charge_lock: "alertChargeLock",
  discharge_lock: "alertDischargeLock",
  unjustified: "alertUnjustified",
  reserve_charge: "alertReserveCharge",
  emergency_charge: "alertEmergencyCharge",
};

export const alertLabelKey = (key: AlertKey) => KEY_LABEL[key];

/** Active alert ids from live entity state, stable order. */
export function activeAlertKeys(hass: Hass): AlertKey[] {
  const state = (id: string) => hass.states[id]?.state;
  const phase = state(E.phase);
  const out: AlertKey[] = [];
  if (state(E.reachable) === "off") out.push("unreachable");
  if (state(E.chargeLock) === "on") out.push("charge_lock");
  if (state(E.dischargeLock) === "on") out.push("discharge_lock");
  if (state(E.unjustified) === "on") out.push("unjustified");
  if (phase === "reserve_protection") out.push("reserve_charge");
  if (phase === "emergency") out.push("emergency_charge");
  return out;
}

/** Drop dismissed keys that are no longer active so a later repeat can show again. */
export function pruneDismissed(dismissed: ReadonlySet<AlertKey>, active: readonly AlertKey[]): Set<AlertKey> {
  const live = new Set(active);
  const next = new Set<AlertKey>();
  for (const key of dismissed) {
    if (live.has(key)) next.add(key);
  }
  return next;
}

/** True when at least one active alert was not yet confirmed away. */
export function bannerVisible(
  active: readonly AlertKey[],
  dismissed: ReadonlySet<AlertKey>,
  permanentlyHidden: boolean,
): boolean {
  if (permanentlyHidden || !active.length) return false;
  return active.some((key) => !dismissed.has(key));
}

export function parseDismissed(raw: unknown): Set<AlertKey> {
  const allowed = new Set<string>(ALERT_KEYS);
  const next = new Set<AlertKey>();
  if (!Array.isArray(raw)) return next;
  for (const item of raw) {
    if (typeof item === "string" && allowed.has(item)) next.add(item as AlertKey);
  }
  return next;
}

export function loadDismissed(): Set<AlertKey> {
  try {
    return parseDismissed(JSON.parse(localStorage.getItem(DISMISS_KEY) ?? "null"));
  } catch {
    return new Set();
  }
}

export function saveDismissed(keys: ReadonlySet<AlertKey>): void {
  try {
    localStorage.setItem(DISMISS_KEY, JSON.stringify([...keys]));
  } catch {
    // storage blocked: dismiss still applies for this session via memory
  }
}

export function parseBannerHidden(raw: string | null): boolean {
  return raw === "1";
}

export function loadBannerHidden(): boolean {
  try {
    return parseBannerHidden(localStorage.getItem(HIDDEN_KEY));
  } catch {
    return false;
  }
}

export function saveBannerHidden(hidden: boolean): void {
  try {
    localStorage.setItem(HIDDEN_KEY, hidden ? "1" : "0");
  } catch {
    // storage blocked: the choice still applies for this session
  }
}
