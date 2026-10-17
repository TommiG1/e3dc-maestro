/** Panel look. Stored in the browser so a later theme can be added without a new setting. */
export const THEMES = ["dark", "classic"] as const;
export type ThemeId = (typeof THEMES)[number];

const STORAGE_KEY = "e3dc-maestro.theme.v1";

export function parseTheme(raw: unknown): ThemeId {
  return raw === "classic" ? "classic" : "dark";
}

export function loadTheme(): ThemeId {
  try {
    return parseTheme(localStorage.getItem(STORAGE_KEY));
  } catch {
    return "dark";
  }
}

export function saveTheme(theme: ThemeId): void {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // storage blocked: the choice still applies for this session
  }
}
