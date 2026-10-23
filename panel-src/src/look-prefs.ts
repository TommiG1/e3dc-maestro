/** Browser-local look knobs beyond the colour theme. */

export const DENSITIES = ["compact", "normal", "airy"] as const;
export type DensityId = (typeof DENSITIES)[number];

/** auto = keep the theme's own corner radii. */
export const CORNERS = ["auto", "soft", "medium", "sharp"] as const;
export type CornersId = (typeof CORNERS)[number];

export interface LookPrefs {
  motion: boolean;
  density: DensityId;
  corners: CornersId;
}

const STORAGE_KEY = "e3dc-maestro.look-prefs.v1";

const DENSITY_SET = new Set<string>(DENSITIES);
const CORNERS_SET = new Set<string>(CORNERS);

export function parseDensity(raw: unknown): DensityId {
  return typeof raw === "string" && DENSITY_SET.has(raw) ? (raw as DensityId) : "normal";
}

export function parseCorners(raw: unknown): CornersId {
  return typeof raw === "string" && CORNERS_SET.has(raw) ? (raw as CornersId) : "auto";
}

/** First visit follows the OS reduced-motion preference. */
export function defaultMotion(): boolean {
  try {
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return true;
  }
}

export function loadLookPrefs(): LookPrefs {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { motion: defaultMotion(), density: "normal", corners: "auto" };
    }
    const data = JSON.parse(raw) as Partial<LookPrefs>;
    return {
      motion: typeof data.motion === "boolean" ? data.motion : defaultMotion(),
      density: parseDensity(data.density),
      corners: parseCorners(data.corners),
    };
  } catch {
    return { motion: defaultMotion(), density: "normal", corners: "auto" };
  }
}

export function saveLookPrefs(prefs: LookPrefs): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // storage blocked: the choice still applies for this session
  }
}
