/** Collapsible tile groups on the live screen; the collapsed ids are kept per browser. */
export const GROUP_IDS = ["today", "balance", "plant-operation", "plant-storage", "plant-phases", "plant-wallbox"] as const;
const STORAGE_KEY = "e3dc-maestro.groups.v1";

export function parseCollapsed(raw: unknown): Set<string> {
  if (!Array.isArray(raw)) return new Set();
  return new Set(raw.filter((id): id is string => typeof id === "string" && (GROUP_IDS as readonly string[]).includes(id)));
}

export function loadCollapsed(): Set<string> {
  try {
    return parseCollapsed(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null"));
  } catch {
    return new Set();
  }
}

const CONTROLS_KEY = "e3dc-maestro.live-controls";

/** The live discharge/reserve pair starts collapsed so the sliders do not take the screen. */
export function loadControlsOpen(): boolean {
  try {
    return localStorage.getItem(CONTROLS_KEY) === "1";
  } catch {
    return false;
  }
}

export function saveControlsOpen(open: boolean): void {
  try {
    localStorage.setItem(CONTROLS_KEY, open ? "1" : "0");
  } catch {
    // storage blocked or full: the pair still toggles for this session
  }
}

export function saveCollapsed(collapsed: ReadonlySet<string>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...collapsed]));
  } catch {
    // storage blocked or full: the groups still toggle for this session
  }
}
