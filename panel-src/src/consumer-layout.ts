/** Shared consumer dock for the live energy-flow views (nodes / blob / city). */

export interface ConsumerPlace {
  /** 0–1 along the fan (top → bottom). */
  t: number;
  /** Radius scale, 0.75–1.35. */
  r: number;
}

export interface ConsumerPos {
  x: number;
  y: number;
  /** Value/name sit to the right of the icon (wide fan). */
  labelSide: "right" | "below";
  labelDy: number;
}

export interface FanOpts {
  origin: { x: number; y: number };
  /** Base radius in SVG units. */
  radius: number;
  /** Start/end angle in radians (0 = east, positive clockwise in SVG y-down). */
  startAngle: number;
  endAngle: number;
}

const STORAGE_KEY = "e3dc-maestro.consumer-places.v1";

export function parseConsumerPlaces(raw: unknown): Record<string, ConsumerPlace> {
  if (!raw || typeof raw !== "object") return {};
  const out: Record<string, ConsumerPlace> = {};
  for (const [id, value] of Object.entries(raw as Record<string, unknown>)) {
    if (!id || !value || typeof value !== "object") continue;
    const row = value as Record<string, unknown>;
    const t = typeof row.t === "number" && Number.isFinite(row.t) ? Math.min(1, Math.max(0, row.t)) : undefined;
    const r =
      typeof row.r === "number" && Number.isFinite(row.r) ? Math.min(1.35, Math.max(0.75, row.r)) : 1;
    if (t === undefined) continue;
    out[id] = { t, r };
  }
  return out;
}

export function loadConsumerPlaces(): Record<string, ConsumerPlace> {
  try {
    return parseConsumerPlaces(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null"));
  } catch {
    return {};
  }
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
  const r = fan.radius * Math.min(1.35, Math.max(0.75, rScale));
  const angle = fan.startAngle + tClamped * (fan.endAngle - fan.startAngle);
  return {
    x: fan.origin.x + Math.cos(angle) * r,
    y: fan.origin.y + Math.sin(angle) * r,
  };
}

/** Map a point back onto the fan (for drag). */
export function placeFromPoint(x: number, y: number, fan: FanOpts): ConsumerPlace {
  const dx = x - fan.origin.x;
  const dy = y - fan.origin.y;
  let angle = Math.atan2(dy, dx);
  const a0 = fan.startAngle;
  const a1 = fan.endAngle;
  const lo = Math.min(a0, a1);
  const hi = Math.max(a0, a1);
  if (angle < lo) angle = lo;
  if (angle > hi) angle = hi;
  const span = a1 - a0 || 1;
  const t = Math.min(1, Math.max(0, (angle - a0) / span));
  const dist = Math.hypot(dx, dy);
  const r = fan.radius > 0 ? dist / fan.radius : 1;
  return { t, r: Math.min(1.35, Math.max(0.75, r)) };
}

/** Default east-facing fan used by nodes and blob (house on the right of the hub). */
export function houseFan(origin: { x: number; y: number }, count: number): FanOpts {
  const radius = 112 + Math.min(count, 6) * 8;
  // SVG y grows downward: negative angle = up.
  return {
    origin,
    radius,
    startAngle: -0.95,
    endAngle: 0.95,
  };
}

/** Resolve pixel positions for the current consumer list. */
export function resolveConsumerPositions(
  ids: string[],
  places: Record<string, ConsumerPlace>,
  fan: FanOpts,
): ConsumerPos[] {
  return ids.map((id, index) => {
    const custom = places[id];
    const t = custom?.t ?? defaultFanT(index, ids.length);
    const r = custom?.r ?? 1;
    const pt = fanPoint(t, r, fan);
    return { x: pt.x, y: pt.y, labelSide: "right" as const, labelDy: 0 };
  });
}

/** Extra width so right-side captions fit. */
export function fanBoxPad(count: number): number {
  if (!count) return 0;
  return 200;
}

/** ViewBox height so the fan and captions stay inside. */
export function fanBoxHeight(originY: number, fan: FanOpts, baseH: number): number {
  const top = fanPoint(0, 1.35, fan).y - 36;
  const bottom = fanPoint(1, 1.35, fan).y + 36;
  return Math.max(baseH, Math.ceil(bottom + 24), Math.ceil(originY + (originY - top) + 24));
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

/** Pointer-drag a consumer onto a new fan slot. No-op when arrange is off. */
export function onConsumerDrag(
  e: PointerEvent,
  id: string,
  fan: FanOpts,
  arrange: boolean | undefined,
  onPlace: ((id: string, place: ConsumerPlace) => void) | undefined,
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
    onPlace(id, placeFromPoint(p.x, p.y, fan));
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
