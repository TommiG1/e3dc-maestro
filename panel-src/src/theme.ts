/** Panel look. Stored in the browser so a later theme can be added without a new setting. */
export const THEMES = ["dark", "classic", "e3dc", "oled", "amber", "leitstand", "tibber"] as const;
export type ThemeId = (typeof THEMES)[number];

const STORAGE_KEY = "e3dc-maestro.theme.v1";

const THEME_SET = new Set<string>(THEMES);

/** Classic and myE3DC are light; everything else is a night look. */
export function isDarkTheme(theme: ThemeId): boolean {
  return theme !== "classic" && theme !== "e3dc";
}

/** Flow nodes need a darker stroke on light surfaces. */
export function flowNeedsOutline(theme: ThemeId): boolean {
  return !isDarkTheme(theme);
}

export function parseTheme(raw: unknown): ThemeId {
  return typeof raw === "string" && THEME_SET.has(raw) ? (raw as ThemeId) : "dark";
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
