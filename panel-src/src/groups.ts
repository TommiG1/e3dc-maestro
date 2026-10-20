/** Collapsible tile groups on the live screen; the collapsed ids are kept per browser. */
export const GROUP_IDS = ["today", "balance", "balancePulse", "plant-operation", "plant-storage", "plant-phases", "plant-wallbox"] as const;
const STORAGE_KEY = "e3dc-maestro.groups.v3";
const LEGACY_KEY = "e3dc-maestro.groups.v2";
const DEFAULT_COLLAPSED = ["today", "balance", "balancePulse"] as const;

export function parseCollapsed(raw: unknown): Set<string> {
  if (!Array.isArray(raw)) return new Set();
  return new Set(raw.filter((id): id is string => typeof id === "string" && (GROUP_IDS as readonly string[]).includes(id)));
}

/** First visit collapses the live number groups. A saved choice wins afterwards. */
export function collapsedFromStorage(current: string | null, legacy: string | null): Set<string> {
  if (current !== null) {
    try {
      return parseCollapsed(JSON.parse(current));
    } catch {
      return new Set(DEFAULT_COLLAPSED);
    }
  }
  const previous = new Set<string>();
  if (legacy !== null) {
    try {
      for (const id of parseCollapsed(JSON.parse(legacy))) previous.add(id);
    } catch {
      // ignore a broken legacy value and keep the new default
    }
  }
  for (const id of DEFAULT_COLLAPSED) previous.add(id);
  return previous;
}

export function loadCollapsed(): Set<string> {
  try {
    return collapsedFromStorage(localStorage.getItem(STORAGE_KEY), localStorage.getItem(LEGACY_KEY));
  } catch {
    return new Set(DEFAULT_COLLAPSED);
  }
}

export function saveCollapsed(collapsed: ReadonlySet<string>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...collapsed]));
  } catch {
    // storage blocked or full: the groups still toggle for this session
  }
}
