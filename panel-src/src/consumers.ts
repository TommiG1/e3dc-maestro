import { num, type Hass, type HassEntity } from "./entities";

/** Wallbox is measured beside house_power (see total_load_power). */
export const WALLBOX_ENTITY = "sensor.e3dc_maestro_wallbox_leistung";
export const MAX_CONSUMERS = 6;
const STORAGE_KEY = "e3dc-maestro.consumers.v1";
const OVERFLOW_W = 50;
/** The mismatch has to last this long. A late house reading must not flash the warning. */
export const OVERFLOW_HOLD_MS = 10_000;

export type ConsumerMode = "included" | "separate";

export const CONSUMER_ICONS = ["wallbox", "heater", "climate", "heatpump", "meter"] as const;
export type ConsumerIcon = (typeof CONSUMER_ICONS)[number];

/** Stroke icons in a 24×24 viewBox, same weight as the flow nodes. */
export const CONSUMER_ICON_PATH: Record<ConsumerIcon, string> = {
  wallbox: "M6 8h12v7H6zM9 8V5M15 8V5M12 15v4M9 19h6",
  heater: "M10 3v18M15 7c1.4 1 1.4 2 0 3s-1.4 2 0 3 1.4 2 0 3",
  climate: "M12 3v18M4.5 7.5l15 9M19.5 7.5l-15 9",
  heatpump: "M4 7h16v11H4zM12 9.5a2.5 2.5 0 1 0 .01 0",
  meter: "M6 16a6 6 0 1 1 12 0M12 16l3.5-3.5",
};

export interface Consumer {
  id: string;
  entityId: string;
  name: string;
  mode: ConsumerMode;
  icon: ConsumerIcon;
}

export interface FlowConsumer {
  id: string;
  name: string;
  entityId: string;
  watts: number;
  mode: ConsumerMode;
  missing: boolean;
  icon: ConsumerIcon;
}

export interface SeparateDayItem {
  name: string;
  kwh: number;
}

const isIcon = (value: unknown): value is ConsumerIcon =>
  typeof value === "string" && (CONSUMER_ICONS as readonly string[]).includes(value);

/** Wallbox entities start with the charger icon; everything else with the meter. */
export function guessIcon(entityId: string): ConsumerIcon {
  return /wallbox|evcc|easee|go-?e/i.test(entityId) ? "wallbox" : "meter";
}

/** Gone or unreachable. `unknown` still means the entity exists, it just has no number yet. */
export function consumerUnavailable(entity: HassEntity | undefined): boolean {
  return !entity || entity.state === "unavailable";
}

export function wattsOf(entity: HassEntity | undefined): number | undefined {
  const value = num(entity);
  if (value === undefined) return undefined;
  const unit = entity?.attributes.unit_of_measurement;
  return unit === "kW" ? value * 1000 : value;
}

export function isPowerSensor(entity: HassEntity | undefined): entity is HassEntity {
  if (!entity?.entity_id.startsWith("sensor.")) return false;
  const unit = entity.attributes.unit_of_measurement;
  return entity.attributes.device_class === "power" || unit === "W" || unit === "kW";
}

export function friendlyName(entity: HassEntity | undefined, fallback: string): string {
  const name = entity?.attributes.friendly_name;
  return typeof name === "string" && name.trim() ? name.trim() : fallback;
}

export function parseConsumers(raw: unknown): Consumer[] {
  if (!Array.isArray(raw)) return [];
  const out: Consumer[] = [];
  const seen = new Set<string>();
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const row = item as Record<string, unknown>;
    const entityId = row.entityId;
    const mode = row.mode;
    if (typeof entityId !== "string" || !entityId.startsWith("sensor.")) continue;
    if (seen.has(entityId)) continue;
    if (mode !== "included" && mode !== "separate") continue;
    const name = typeof row.name === "string" && row.name.trim() ? row.name.trim().slice(0, 40) : entityId;
    const id = typeof row.id === "string" && row.id ? row.id : entityId;
    out.push({ id, entityId, name, mode, icon: isIcon(row.icon) ? row.icon : guessIcon(entityId) });
    seen.add(entityId);
    if (out.length >= MAX_CONSUMERS) break;
  }
  return out;
}

/** randomUUID is unavailable on plain http (the usual LAN address). */
export function newConsumerId(): string {
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  return [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** Server list wins. A browser-only list is published once, when the entry has no list yet. */
export function consumersFromOptions(
  raw: unknown,
  local: Consumer[],
): { list: Consumer[]; publishLocal: boolean } {
  if (Array.isArray(raw)) return { list: parseConsumers(raw), publishLocal: false };
  if (local.length) return { list: local, publishLocal: true };
  return { list: [], publishLocal: false };
}

export function loadConsumers(): Consumer[] {
  try {
    return parseConsumers(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null"));
  } catch {
    return [];
  }
}

export function saveConsumers(list: Consumer[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parseConsumers(list)));
  } catch {
    // storage blocked or full: the list still applies for this session
  }
}

export function toFlow(list: Consumer[], hass: Hass): FlowConsumer[] {
  return list.map((c) => {
    const entity = hass.states[c.entityId];
    const watts = wattsOf(entity);
    return {
      id: c.id,
      name: c.name,
      entityId: c.entityId,
      mode: c.mode,
      icon: c.icon,
      watts: watts ?? 0,
      missing: consumerUnavailable(entity),
    };
  });
}

/** Hide idle loads in the live flow. Edit and arrange still see every consumer. */
export const FLOW_CONSUMER_MIN_W = 10;

export function visibleInFlow(
  items: FlowConsumer[],
  opts?: { arrange?: boolean; minW?: number },
): FlowConsumer[] {
  if (opts?.arrange) return items;
  const min = opts?.minW ?? FLOW_CONSUMER_MIN_W;
  return items.filter((c) => Math.abs(c.watts) > min);
}

/** Separate loads with a day counter. Only the Maestro wallbox sensor has one today. */
export function separateDayEnergy(
  items: Pick<FlowConsumer, "name" | "mode" | "entityId">[],
  wallboxKwh: number | undefined,
): SeparateDayItem[] {
  if (wallboxKwh === undefined || !Number.isFinite(wallboxKwh) || wallboxKwh <= 0) return [];
  return items
    .filter((item) => item.mode === "separate" && item.entityId === WALLBOX_ENTITY)
    .map((item) => ({ name: item.name, kwh: wallboxKwh }));
}

/** Included consumers are a slice of house power. Above the house reading the assignment is wrong. */
export function includedOverflow(house: number | undefined, items: FlowConsumer[]): boolean {
  if (house === undefined) return false;
  const sum = items.filter((i) => i.mode === "included").reduce((total, i) => total + Math.max(0, i.watts), 0);
  return sum > house + OVERFLOW_W;
}

/** Show the warning only after the mismatch has stayed true for the hold time. */
export function overflowHeld(
  active: boolean,
  since: number | undefined,
  now: number,
  holdMs = OVERFLOW_HOLD_MS,
): { show: boolean; since: number | undefined } {
  if (!active) return { show: false, since: undefined };
  const started = since ?? now;
  return { show: now - started >= holdMs, since: started };
}

export function powerSensorChoices(hass: Hass, taken: ReadonlySet<string>, query: string): { id: string; name: string }[] {
  const q = query.trim().toLowerCase();
  return Object.values(hass.states)
    .filter((entity): entity is HassEntity => isPowerSensor(entity) && !taken.has(entity.entity_id))
    .map((entity) => ({ id: entity.entity_id, name: friendlyName(entity, entity.entity_id) }))
    .filter((row) => !q || row.name.toLowerCase().includes(q) || row.id.toLowerCase().includes(q))
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, 12);
}
