import type { Hass } from "./entities";

/** Help links inside the classic dashboard point to this path. */
export const CLASSIC_PATH = "e3dc-maestro";
export const CLASSIC_STRATEGY = "custom:e3dc-maestro";

export type ClassicState = "checking" | "missing" | "empty" | "ours" | "foreign" | "creating" | "error";

export interface ClassicStatus {
  state: ClassicState;
  /** undefined = could not be determined (resource list unavailable). */
  mushroom?: boolean;
  apex?: boolean;
  error?: string;
}

interface DashboardItem {
  id: string;
  url_path: string;
}

interface ResourceItem {
  url?: string;
}

const errorText = (err: unknown): string =>
  err instanceof Error
    ? err.message
    : typeof err === "object" && err && "message" in err
      ? String((err as { message: unknown }).message)
      : String(err);

const errorCode = (err: unknown): string | undefined =>
  typeof err === "object" && err && "code" in err ? String((err as { code: unknown }).code) : undefined;

export const hasResource = (urls: readonly string[], needle: string): boolean =>
  urls.some((url) => url.toLowerCase().includes(needle));

/** Classify the stored config of the dashboard at CLASSIC_PATH. */
export function classify(config: unknown): "ours" | "empty" | "foreign" {
  if (!config || typeof config !== "object") return "empty";
  const strategy = (config as { strategy?: { type?: unknown } }).strategy;
  if (strategy?.type === CLASSIC_STRATEGY) return "ours";
  const views = (config as { views?: unknown }).views;
  return Object.keys(config).length === 0 || (Array.isArray(views) && views.length === 0 && !strategy) ? "empty" : "foreign";
}

async function dependencies(hass: Hass): Promise<Pick<ClassicStatus, "mushroom" | "apex">> {
  try {
    const items = await hass.callWS<ResourceItem[]>({ type: "lovelace/resources" });
    const urls = items.map((item) => item.url ?? "");
    return { mushroom: hasResource(urls, "mushroom"), apex: hasResource(urls, "apexcharts-card") };
  } catch {
    return {};
  }
}

async function dashboardState(hass: Hass): Promise<ClassicState> {
  const dashboards = await hass.callWS<DashboardItem[]>({ type: "lovelace/dashboards/list" });
  if (!dashboards.some((d) => d.url_path === CLASSIC_PATH)) return "missing";
  try {
    const config = await hass.callWS<unknown>({ type: "lovelace/config", url_path: CLASSIC_PATH, force: false });
    return classify(config);
  } catch (err) {
    if (errorCode(err) === "config_not_found") return "empty";
    throw err;
  }
}

export async function checkClassic(hass: Hass): Promise<ClassicStatus> {
  const deps = await dependencies(hass);
  try {
    return { state: await dashboardState(hass), ...deps };
  } catch (err) {
    return { state: "error", error: errorText(err), ...deps };
  }
}

/** Create the dashboard (if needed) and point it at the Maestro strategy. Never overwrites other content. */
export async function createClassic(hass: Hass, current: ClassicState): Promise<void> {
  if (current === "missing") {
    await hass.callWS({
      type: "lovelace/dashboards/create",
      url_path: CLASSIC_PATH,
      title: "E3DC Maestro",
      icon: "mdi:battery-charging",
      require_admin: false,
      show_in_sidebar: true,
      mode: "storage",
    });
  } else if (current !== "empty") {
    return;
  }
  await hass.callWS({ type: "lovelace/config/save", url_path: CLASSIC_PATH, config: { strategy: { type: CLASSIC_STRATEGY } } });
}

export { errorText as classicErrorText };
