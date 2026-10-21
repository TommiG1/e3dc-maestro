/** Shared consumer dock for the live energy-flow views (nodes / blob / city). */

import type { ConsumerMode } from "./consumers";

/**
 * Free offset from the house/fan origin in SVG units.
 * Legacy fan slots `{ t, r }` are accepted when reading older storage and converted on resolve.
 */
export interface ConsumerPlace {
  dx: number;
  dy: number;
}

/** Old fan slot (angle + radius). Still read from localStorage, converted on resolve. */
export interface LegacyFanPlace {
  t: number;
  r: number;
}

export type StoredConsumerPlace = ConsumerPlace | LegacyFanPlace;

export interface ConsumerPos {
  x: number;
  y: number;
  /** Value/name sit to the right of the icon (wide fan). */
  labelSide: "right" | "below";
  labelDy: number;
}

export interface FanOpts {
  origin: { x: number; y: number };
  /** Base radius in SVG units (defaults only). */
  radius: number;
  /** Start/end angle in radians (0 = east, positive clockwise in SVG y-down). */
  startAngle: number;
  endAngle: number;
}

export interface PlaceBounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

const STORAGE_KEY = "e3dc-maestro.consumer-places.v2";
const LEGACY_STORAGE_KEY = "e3dc-maestro.consumer-places.v1";

/** Defaults for separately measured loads sit closer to the house. */
export const R_DEFAULT_SEPARATE = 0.55;
export const R_DEFAULT_INCLUDED = 1;
/** Soft drag envelope around the house origin (SVG units). */
const DRAG_PAD = 36;
const LABEL_W = 160;

const isFree = (row: Record<string, unknown>): row is { dx: number; dy: number } =>
  typeof row.dx === "number" &&
  Number.isFinite(row.dx) &&
  typeof row.dy === "number" &&
  Number.isFinite(row.dy);

const isLegacy = (row: Record<string, unknown>): row is { t: number; r: number } =>
  typeof row.t === "number" && Number.isFinite(row.t) && typeof row.r === "number" && Number.isFinite(row.r);

export function parseConsumerPlaces(raw: unknown): Record<string, StoredConsumerPlace> {
  if (!raw || typeof raw !== "object") return {};
  const out: Record<string, StoredConsumerPlace> = {};
  for (const [id, value] of Object.entries(raw as Record<string, unknown>)) {
    if (!id || !value || typeof value !== "object") continue;
    const row = value as Record<string, unknown>;
    if (isFree(row)) {
      out[id] = { dx: row.dx, dy: row.dy };
      continue;
    }
    if (isLegacy(row)) {
      out[id] = { t: Math.min(1, Math.max(0, row.t)), r: Math.min(1.35, Math.max(0.35, row.r)) };
    }
  }
  return out;
}

function readStorage(key: string): unknown {
  try {
    return JSON.parse(localStorage.getItem(key) ?? "null");
  } catch {
    return null;
  }
}

export function loadConsumerPlaces(): Record<string, StoredConsumerPlace> {
  const v2 = parseConsumerPlaces(readStorage(STORAGE_KEY));
  if (Object.keys(v2).length) return v2;
  return parseConsumerPlaces(readStorage(LEGACY_STORAGE_KEY));
}

export function saveConsumerPlaces(places: Record<string, ConsumerPlace>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(places));
  } catch {
    // storage blocked
  }
}

export function clearConsumerPlaces(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
  } catch {
    // ignore
  }
}

/** Even fan slots when the user has not placed a consumer. */
export function defaultFanT(index: number, count: number): number {
  if (count <= 1) return 0.5;
  return index / (count - 1);
}

export function fanPoint(t: number, rScale: number, fan: FanOpts): { x: number; y: number } {
  const tClamped = Math.min(1, Math.max(0, t));
  const r = fan.radius * Math.min(1.35, Math.max(0.35, rScale));
  const angle = fan.startAngle + tClamped * (fan.endAngle - fan.startAngle);
  return {
    x: fan.origin.x + Math.cos(angle) * r,
    y: fan.origin.y + Math.sin(angle) * r,
  };
}

/** Default east-facing fan used by nodes and blob (house on the right of the hub). */
export function houseFan(origin: { x: number; y: number }, count: number): FanOpts {
  const radius = 112 + Math.min(count, 6) * 8;
  return {
    origin,
    radius,
    startAngle: -0.95,
    endAngle: 0.95,
  };
}

function defaultOffset(
  index: number,
  count: number,
  fan: FanOpts,
  mode: ConsumerMode | undefined,
): ConsumerPlace {
  const r = mode === "separate" ? R_DEFAULT_SEPARATE : R_DEFAULT_INCLUDED;
  const pt = fanPoint(defaultFanT(index, count), r, fan);
  return { dx: pt.x - fan.origin.x, dy: pt.y - fan.origin.y };
}

function asOffset(
  raw: StoredConsumerPlace | undefined,
  index: number,
  count: number,
  fan: FanOpts,
  mode: ConsumerMode | undefined,
): ConsumerPlace {
  if (!raw) return defaultOffset(index, count, fan, mode);
  if ("dx" in raw) return raw;
  const pt = fanPoint(raw.t, raw.r, fan);
  return { dx: pt.x - fan.origin.x, dy: pt.y - fan.origin.y };
}

/** Resolve pixel positions for the current consumer list. */
export function resolveConsumerPositions(
  ids: string[],
  places: Record<string, StoredConsumerPlace>,
  fan: FanOpts,
  modes?: readonly ConsumerMode[],
): ConsumerPos[] {
  return ids.map((id, index) => {
    const mode = modes?.[index];
    const offset = asOffset(places[id], index, ids.length, fan, mode);
    return {
      x: fan.origin.x + offset.dx,
      y: fan.origin.y + offset.dy,
      labelSide: "right" as const,
      labelDy: 0,
    };
  });
}

/** Map a pointer to a free offset from the house origin. */
export function placeFromPoint(
  x: number,
  y: number,
  origin: { x: number; y: number },
  bounds?: PlaceBounds,
): ConsumerPlace {
  let px = x;
  let py = y;
  if (bounds) {
    px = Math.min(bounds.maxX, Math.max(bounds.minX, px));
    py = Math.min(bounds.maxY, Math.max(bounds.minY, py));
  }
  return { dx: px - origin.x, dy: py - origin.y };
}

/** Extra width so right-side captions fit (defaults / empty places). */
export function fanBoxPad(count: number): number {
  if (!count) return 0;
  return 200;
}

/** ViewBox height so a default fan and captions stay inside. */
export function fanBoxHeight(originY: number, fan: FanOpts, baseH: number): number {
  const top = fanPoint(0, 1.35, fan).y - 36;
  const bottom = fanPoint(1, 1.35, fan).y + 36;
  const mirrored = top >= 0 ? originY + (originY - top) + 24 : bottom + 24;
  return Math.max(baseH, Math.ceil(bottom + 24), Math.ceil(mirrored));
}

/** Grow the viewBox so free-placed consumers and labels stay inside. */
export function freePlaceExtent(
  positions: readonly { x: number; y: number }[],
  baseW: number,
  baseH: number,
): { w: number; h: number } {
  if (!positions.length) return { w: baseW, h: baseH };
  let maxX = baseW;
  let maxY = baseH;
  let minY = 0;
  for (const p of positions) {
    maxX = Math.max(maxX, p.x + LABEL_W);
    maxY = Math.max(maxY, p.y + 44);
    minY = Math.min(minY, p.y - 36);
  }
  return { w: Math.ceil(maxX + 16), h: Math.ceil(maxY - Math.min(0, minY) + 16) };
}

/** Drag bounds covering the flow card plus room left of the house. */
export function placeBoundsForFan(fan: FanOpts, boxW: number, boxH: number): PlaceBounds {
  return {
    minX: Math.min(fan.origin.x - 120, DRAG_PAD),
    maxX: Math.max(boxW - DRAG_PAD, fan.origin.x + fan.radius * 1.5),
    minY: DRAG_PAD,
    maxY: Math.max(boxH - DRAG_PAD, fan.origin.y + fan.radius * 1.5),
  };
}

/** Client coordinates → SVG user space. */
export function svgPoint(svg: SVGSVGElement, clientX: number, clientY: number): { x: number; y: number } | undefined {
  const ctm = svg.getScreenCTM();
  if (!ctm) return undefined;
  const pt = svg.createSVGPoint();
  pt.x = clientX;
  pt.y = clientY;
  const local = pt.matrixTransform(ctm.inverse());
  return { x: local.x, y: local.y };
}

/** Pointer-drag a consumer freely. No-op when arrange is off. */
export function onConsumerDrag(
  e: PointerEvent,
  id: string,
  origin: { x: number; y: number },
  arrange: boolean | undefined,
  onPlace: ((id: string, place: ConsumerPlace) => void) | undefined,
  bounds?: PlaceBounds,
): void {
  if (!arrange || !onPlace) return;
  const target = e.currentTarget;
  if (!(target instanceof SVGElement)) return;
  const svg = target.ownerSVGElement;
  if (!svg) return;
  e.preventDefault();
  e.stopPropagation();
  target.setPointerCapture(e.pointerId);
  const move = (ev: PointerEvent) => {
    const p = svgPoint(svg, ev.clientX, ev.clientY);
    if (!p) return;
    onPlace(id, placeFromPoint(p.x, p.y, origin, bounds));
  };
  const up = (ev: PointerEvent) => {
    try {
      target.releasePointerCapture(ev.pointerId);
    } catch {
      // already released
    }
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", up);
  };
  window.addEventListener("pointermove", move);
  window.addEventListener("pointerup", up);
  move(e);
}
