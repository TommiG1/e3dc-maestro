import { svg, type TemplateResult } from "lit";
import {
  fanBoxHeight,
  fanBoxPad,
  freePlaceExtent,
  hasFreePlaces,
  houseFan,
  onConsumerDrag,
  placeBoundsForFan,
  resolveConsumerPositions,
  type ConsumerPlace,
  type StoredConsumerPlace,
} from "./consumer-layout";
import { CONSUMER_ICON_PATH, type FlowConsumer } from "./consumers";
import maestroLogo from "./maestro-logo.png";
import type { Fmt } from "./format";
import type { I18n } from "./i18n";

export interface FlowInput {
  /** Haupt-PV (W). Wenn `pvExtra` gesetzt ist, ohne Zusatzanteil. */
  pv?: number;
  /** Zusatz-PV / Fremd-WR (W). Eigener Knoten, wenn über der Aktivschwelle. */
  pvExtra?: number;
  house?: number;
  grid?: number; // negative = import
  battery?: number; // negative = discharging
  /** Total plant AC rating from Maestro WR-Leistung (W). Scales the city load bars. */
  loadMax?: number;
  /** State of charge, 0–100. Draws the level inside the battery outline. */
  soc?: number;
  consumers?: FlowConsumer[];
  /** Saved free offsets from the house (id → dx/dy). */
  consumerPlaces?: Record<string, StoredConsumerPlace>;
  /** Drag consumers freely instead of opening history. */
  arrange?: boolean;
  onPlaceConsumer?: (id: string, place: ConsumerPlace) => void;
  /** False when the user prefers reduced motion: the soft line stays, particles do not. */
  motion?: boolean;
  onSelect?: (key: string) => void;
  compact: boolean;
  /** Classic look: node discs and icons are stroked, not filled. */
  outline?: boolean;
  fmt: Fmt;
  i18n: I18n;
}

/** Split total PV (Haupt + Zusatz) into display parts for the energy flow. */
export function splitFlowPv(total?: number, extra?: number): { pv: number; pvExtra: number } {
  const e = Math.max(0, extra ?? 0);
  const t = Math.max(0, total ?? 0);
  if (e <= 0) return { pv: t, pvExtra: 0 };
  return { pv: Math.max(0, t - e), pvExtra: e };
}

const ICONS = {
  pv: "M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
  grid: "M12 2 7 22M12 2l5 20M5 9h14M4 15h16",
  house: "M3 11 12 3l9 8M5 9.5V21h14V9.5M10 21v-6h4v6",
  bat: "M7 6h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zM10 3h4",
};

const ICON_BOX = 24;
const ICON_STROKE = 2.15;

/** Scale for a 24-unit stroke icon. The artwork sits inside that box, so the box can run close to the ring. */
export function iconFit(radius: number): number {
  const diameter = radius * 2;
  const pad = Math.max(3, diameter * 0.05);
  return (diameter - pad * 2) / ICON_BOX;
}

/** Main nodes sat at this scale before they were enlarged. */
const NODE_ICON_BEFORE = 1.08;

/** Halfway between the previous main-node size and the full circle fit. */
export function nodeIconFit(radius: number): number {
  return (NODE_ICON_BEFORE + iconFit(radius)) / 2;
}

function iconTransform(x: number, y: number, scale: number): string {
  const origin = (ICON_BOX / 2) * scale;
  return `translate(${x - origin} ${y - origin}) scale(${scale})`;
}

/** Inner body of the battery outline, inset so the level stays inside the stroke. */
const BATTERY_BODY = { x: 6.6, y: 7.6, w: 10.8, h: 10.8 };

/** Level rectangle inside the battery, rising from the bottom. Undefined when the level is unknown or empty. */
export function batteryFill(level: number | undefined): { x: number; y: number; width: number; height: number } | undefined {
  if (typeof level !== "number" || !Number.isFinite(level) || level <= 0) return undefined;
  const pct = Math.min(100, level) / 100;
  const height = BATTERY_BODY.h * pct;
  return { x: BATTERY_BODY.x, y: BATTERY_BODY.y + BATTERY_BODY.h - height, width: BATTERY_BODY.w, height };
}

type NodeKey = "pv" | "grid" | "house" | "bat";
interface Pos {
  x: number;
  y: number;
  labelDy: number; // label offset from node centre (value above/below)
}

// Desktop: diamond around the hub. Compact: taller viewBox so labels stay readable on phones.
const LAYOUTS = {
  wide: {
    box: [600, 420] as const,
    hub: { x: 300, y: 215 },
    pv: { x: 300, y: 100, labelDy: -72 },
    grid: { x: 90, y: 215, labelDy: 70 },
    house: { x: 510, y: 215, labelDy: 70 },
    bat: { x: 300, y: 320, labelDy: 70 },
  },
  compact: {
    box: [360, 520] as const,
    hub: { x: 180, y: 250 },
    pv: { x: 180, y: 95, labelDy: -72 },
    grid: { x: 62, y: 250, labelDy: 70 },
    house: { x: 298, y: 250, labelDy: 70 },
    bat: { x: 180, y: 405, labelDy: 70 },
  },
} satisfies Record<string, { box: readonly [number, number]; hub: { x: number; y: number } } & Record<NodeKey, Pos>>;

export const ACTIVE_W = 30;
const NODE_R = 42;
/** Satellite radius when Zusatz sits in the PV cluster (bound to Haupt-PV). */
export const PV_EXTRA_R = 22;

/** TEMP: Zusatz-Knoten auch bei 0 W zeichnen (Layout-Check). */
export const TEMP_SHOW_PV_EXTRA_IDLE = false;

export function showPvExtraNode(watts: number): boolean {
  return watts > ACTIVE_W || TEMP_SHOW_PV_EXTRA_IDLE;
}

/** Live total shown on the PV node when Zusatz is present. */
export function pvClusterTotal(main: number, extra: number): number {
  return Math.max(0, main) + Math.max(0, extra);
}

/**
 * Satellite beside Haupt-PV (cluster), not pulled toward the hub.
 * Zusatz stays left of Haupt; same Y so labels stay clear.
 */
export function pvExtraPos(
  pv: { x: number; y: number },
  compact: boolean,
  pvR = NODE_R,
  extraR = PV_EXTRA_R,
): Pos {
  const gap = compact ? 8 : 10;
  const dx = pvR + extraR + gap;
  return { x: pv.x - dx, y: pv.y, labelDy: -38 };
}

/** Split caption: Zusatz first (left circle), then Haupt — matches cluster layout. */
export function pvSplitCaption(
  extraLabel: string,
  mainLabel: string,
  parts: { main: string; extra: string },
): string {
  return `${extraLabel} ${parts.extra} · ${mainLabel} ${parts.main}`;
}

/** Haupt·Zusatz sits under the PV circle so it never overlaps the icons. */
export function pvSplitLabelY(pvY: number, pvR = NODE_R): number {
  return pvY + pvR + 14;
}
const CONSUMER_R = 26;
/** Phone: one row per consumer, icon on the right, caption beside it. */
const COMPACT_ROW = 46;
const COMPACT_LIST_R = 16;

export interface FlowEnds {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

/** Visible part of a link. The node circles cover the centre-to-centre line. */
export function flowEnds(from: { x: number; y: number }, to: { x: number; y: number }, fromR: number, toR: number): FlowEnds {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy) || 1;
  const start = Math.min(fromR, len / 2);
  const end = Math.min(toR, len / 2);
  return {
    x1: from.x + (dx / len) * start,
    y1: from.y + (dy / len) * start,
    x2: to.x - (dx / len) * end,
    y2: to.y - (dy / len) * end,
  };
}

export function flowSegment(from: { x: number; y: number }, to: { x: number; y: number }, fromR: number, toR: number): string {
  const e = flowEnds(from, to, fromR, toR);
  return `M${e.x1} ${e.y1} L${e.x2} ${e.y2}`;
}

const SPEED_MIN = 0.22;
const SPEED_MAX = 1.35;
const SPEED_W = 6000;

/** More power, more particles. Idle links stay empty. */
export function electronCount(watts: number): number {
  const w = Math.abs(watts);
  if (w < ACTIVE_W) return 0;
  if (w < 600) return 2;
  if (w < 2000) return 3;
  if (w < 4500) return 4;
  return 5;
}

/** Cycles per second along the link. */
export function electronSpeed(watts: number): number {
  const w = Math.min(Math.abs(watts), SPEED_W);
  return SPEED_MIN + (w / SPEED_W) * (SPEED_MAX - SPEED_MIN);
}

/** Place glowing particles. Called every frame; Lit does not own their position. */
export function placeElectrons(elements: Iterable<Element>, now: number): void {
  const seconds = now / 1000;
  for (const el of elements) {
    const x1 = Number(el.getAttribute("data-x1"));
    const y1 = Number(el.getAttribute("data-y1"));
    const x2 = Number(el.getAttribute("data-x2"));
    const y2 = Number(el.getAttribute("data-y2"));
    const speed = Number(el.getAttribute("data-speed"));
    const phase = Number(el.getAttribute("data-phase"));
    if (!Number.isFinite(speed)) continue;
    const u = (((seconds * speed + phase) % 1) + 1) % 1;
    const fade = Math.sin(u * Math.PI);
    const x = x1 + (x2 - x1) * u;
    const y = y1 + (y2 - y1) * u;
    el.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
    el.setAttribute("opacity", (0.2 + 0.8 * fade).toFixed(3));
  }
}

const clip = (name: string, max = 16) => (name.length <= max ? name : `${name.slice(0, max - 1)}…`);

function batteryGlyph(level: number | undefined, color: string): TemplateResult {
  const fill = batteryFill(level);
  return svg`<clipPath id="batbody"><rect x=${BATTERY_BODY.x} y=${BATTERY_BODY.y} width=${BATTERY_BODY.w} height=${BATTERY_BODY.h} rx="1.3"/></clipPath>
    ${fill ? svg`<rect clip-path="url(#batbody)" x=${fill.x} y=${fill.y} width=${fill.width} height=${fill.height + 1} fill=${color} stroke="none" opacity="0.78"/>` : svg``}
    <path d=${ICONS.bat} vector-effect="non-scaling-stroke"/>`;
}

/** Darker than the night-theme inks, so a stroke still reads on the light Classic surface. */
const OUTLINE: Record<string, string> = {
  "var(--pv)": "#9a3412",
  "var(--pv-extra)": "#b45309",
  "var(--house)": "#5b21b6",
  "var(--grid-in)": "#b91c1c",
  "var(--grid-out)": "#047857",
  "var(--bat)": "#0e7490",
  "var(--accent)": "#075985",
};

const tone = (color: string, outline: boolean) => (outline ? (OUTLINE[color] ?? "#152033") : color);

export function electrons(
  from: { x: number; y: number },
  to: { x: number; y: number },
  fromR: number,
  toR: number,
  watts: number,
  color: string,
  motion: boolean,
): TemplateResult {
  const count = motion ? electronCount(watts) : 0;
  if (!count) return svg``;
  const ends = flowEnds(from, to, fromR, toR);
  const speed = electronSpeed(watts).toFixed(3);
  return svg`${Array.from({ length: count }, (_, i) => svg`<g class="electron" fill=${color} data-x1=${ends.x1} data-y1=${ends.y1} data-x2=${ends.x2} data-y2=${ends.y2} data-speed=${speed} data-phase=${i / count}><circle class="halo" r="3.4"/><circle r="1.5"/><circle r="0.75" fill="#fff"/></g>`)}`;
}

/** Icon positions for the phone list, clear of the battery caption. */
export function compactConsumerPositions(count: number, width: number): Pos[] {
  const firstY = LAYOUTS.compact.bat.y + LAYOUTS.compact.bat.labelDy + 52;
  return Array.from({ length: count }, (_, index) => ({
    x: width - 40,
    y: firstY + index * COMPACT_ROW,
    labelDy: 5,
  }));
}

export function compactFlowHeight(count: number): number {
  if (!count) return LAYOUTS.compact.box[1];
  const last = compactConsumerPositions(count, LAYOUTS.compact.box[0]).at(-1)!;
  return last.y + last.labelDy + 36;
}

/** CSS height for the flow card. Undefined keeps the stylesheet default. */
export function flowBoxHeight(compact: boolean, count: number): number | undefined {
  if (!count) return undefined;
  if (compact) return Math.round(compactFlowHeight(count) * 0.94);
  const fan = houseFan(LAYOUTS.wide.house, count);
  const h = fanBoxHeight(LAYOUTS.wide.house.y, fan, LAYOUTS.wide.box[1]);
  return Math.round((380 * h) / 420);
}

/** Phone list: trunk from a node to a right rail, then stubs into each consumer. */
export function compactBuses(
  places: { c: FlowConsumer; p: { x: number; y: number } }[],
  from: { x: number; y: number },
  boxW: number,
  motion: boolean,
  fromR = 0,
): TemplateResult {
  if (!places.length) return svg``;
  const railX = boxW - 14;
  const bottom = Math.max(...places.map(({ p }) => p.y));
  const x0 = from.x + fromR;
  return svg`<path class="flow-line" d="M${x0} ${from.y} L${railX} ${from.y} L${railX} ${bottom}" stroke="var(--house)"/>
    ${places.map(({ c, p }) => {
      const color = c.mode === "included" ? "var(--house)" : "var(--accent)";
      const end = flowEnds({ x: railX, y: p.y }, p, 0, COMPACT_LIST_R);
      return svg`<path class="flow-line" d="M${railX} ${p.y} L${end.x2} ${p.y}" stroke=${color}/>
        ${electrons({ x: railX, y: p.y }, p, 0, COMPACT_LIST_R, c.watts, color, motion)}`;
    })}`;
}

export function energyFlow(i: FlowInput): TemplateResult {
  const consumers = (i.consumers ?? []).slice(0, 6);
  const L = i.compact ? LAYOUTS.compact : LAYOUTS.wide;
  const fan = houseFan(L.house, consumers.length);
  const placesStore = i.consumerPlaces ?? {};
  const customPlaces = hasFreePlaces(
    placesStore,
    consumers.map((c) => c.id),
  );
  const useCompactList = i.compact && !customPlaces && !i.arrange;
  const baseW = L.box[0] + (i.compact ? 0 : fanBoxPad(consumers.length));
  const baseH = i.compact
    ? compactFlowHeight(consumers.length)
    : fanBoxHeight(L.house.y, fan, L.box[1]);
  const fanPlaces = resolveConsumerPositions(
    consumers.map((c) => c.id),
    placesStore,
    fan,
    consumers.map((c) => c.mode),
  );
  const compactDefaults = i.compact ? compactConsumerPositions(consumers.length, L.box[0]) : [];
  const resolved = consumers.map((c, index) => {
    const raw = placesStore[c.id];
    if (raw && "dx" in raw) {
      return { x: L.house.x + raw.dx, y: L.house.y + raw.dy, labelDy: 0 };
    }
    if (useCompactList) return compactDefaults[index]!;
    // Phone arrange / free place: start from list defaults, not the wide fan.
    if (i.compact) return compactDefaults[index]!;
    return { x: fanPlaces[index].x, y: fanPlaces[index].y, labelDy: 0 };
  });
  const extent = useCompactList ? { w: baseW, h: baseH } : freePlaceExtent(resolved, baseW, baseH);
  const boxW = extent.w;
  const boxH = extent.h;
  const dragBounds = placeBoundsForFan(fan, Math.max(boxW, i.compact ? 420 : 920), Math.max(boxH, i.compact ? 720 : 640));
  const consumerAt = (index: number): Pos => resolved[index]!;
  const { pv = 0, house = 0, grid = 0, battery = 0 } = i;
  const pvMain = Math.max(0, pv);
  const pvExtra = Math.max(0, i.pvExtra ?? 0);
  const showPvExtra = showPvExtraNode(pvExtra);
  const pvTotal = showPvExtra ? pvClusterTotal(pvMain, pvExtra) : pvMain;
  const extraPos = pvExtraPos(L.pv, i.compact);
  const motion = i.motion !== false;
  const outline = i.outline === true;
  const strokeOf = (color: string) => tone(color, outline);
  const t = i.i18n.t;
  const nodes: Record<NodeKey, { color: string; label: string; value: number; icon: string }> = {
    pv: { color: "var(--pv)", label: t("nodePv"), value: pvTotal, icon: ICONS.pv },
    grid: {
      color: grid < 0 ? "var(--grid-in)" : "var(--grid-out)",
      label: grid < 0 ? t("nodeImport") : t("nodeFeed"),
      value: grid,
      icon: ICONS.grid,
    },
    house: { color: "var(--house)", label: t("nodeHouse"), value: house, icon: ICONS.house },
    bat: {
      color: "var(--bat)",
      label: battery < 0 ? t("nodeBatDischarge") : t("nodeBatCharge"),
      value: battery,
      icon: ICONS.bat,
    },
  };
  const flows: { node: NodeKey; toHub: boolean }[] = [];
  if (pvTotal > ACTIVE_W) flows.push({ node: "pv", toHub: true });
  if (battery < -ACTIVE_W) flows.push({ node: "bat", toHub: true });
  if (battery > ACTIVE_W) flows.push({ node: "bat", toHub: false });
  if (grid < -ACTIVE_W) flows.push({ node: "grid", toHub: true });
  if (grid > ACTIVE_W) flows.push({ node: "grid", toHub: false });
  if (house > ACTIVE_W) flows.push({ node: "house", toHub: false });

  const hubR = i.compact ? COMPACT_LIST_R : CONSUMER_R;
  const keys: NodeKey[] = ["pv", "grid", "house", "bat"];
  const places = consumers.map((c, index) => ({ c, p: consumerAt(index) }));
  const pvParts = showPvExtra ? i.fmt.wParts(pvMain, pvExtra) : undefined;
  const aria = [
    ...keys.map((k) => `${nodes[k].label} ${i.fmt.w(nodes[k].value)}`),
    ...(pvParts ? [`${t("nodePvExtra")} ${pvParts.extra}`, `${t("nodePvMain")} ${pvParts.main}`] : []),
    ...places.map(({ c }) => `${c.name} ${i.fmt.w(c.watts)}`),
  ].join(", ");
  return svg`<svg viewBox="0 0 ${boxW} ${boxH}" preserveAspectRatio="xMidYMid meet" role="img" aria-label=${aria}>
    <defs>
      <filter id="glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <radialGradient id="hubg"><stop offset="0" stop-color="rgba(56,189,248,.5)"/><stop offset="1" stop-color="rgba(56,189,248,0)"/></radialGradient>
    </defs>
    ${keys.map((k) => svg`<path class="flow-line" d=${flowSegment(L[k], L.hub, NODE_R, hubR)} stroke=${nodes[k].color}/>`)}
    ${showPvExtra
      ? svg`<path class="flow-line" d=${flowSegment(extraPos, L.pv, PV_EXTRA_R, NODE_R)} stroke="var(--pv-extra)" opacity="0.55"/>`
      : svg``}
    ${useCompactList
      ? compactBuses(places, L.house, boxW, motion, NODE_R)
      : places.map(({ c, p }) => {
          const from = c.mode === "included" ? L.house : L.hub;
          const fromR = c.mode === "included" ? NODE_R : hubR;
          const toR = i.compact ? COMPACT_LIST_R : CONSUMER_R;
          const color = c.mode === "included" ? "var(--house)" : "var(--accent)";
          return svg`<path class="flow-line" d=${flowSegment(from, p, fromR, toR)} stroke=${color}/>
            ${electrons(from, p, fromR, toR, c.watts, color, motion)}`;
        })}
    ${flows.map((f) => {
      const a = f.toHub ? L[f.node] : L.hub;
      const b = f.toHub ? L.hub : L[f.node];
      const fromR = f.toHub ? NODE_R : hubR;
      const toR = f.toHub ? hubR : NODE_R;
      return electrons(a, b, fromR, toR, nodes[f.node].value, nodes[f.node].color, motion);
    })}
    ${showPvExtra
      ? electrons(extraPos, L.pv, PV_EXTRA_R, NODE_R, pvExtra, "var(--pv-extra)", motion)
      : svg``}
    <image href=${maestroLogo} x=${L.hub.x - hubR} y=${L.hub.y - hubR} width=${hubR * 2} height=${hubR * 2} aria-label="Maestro"/>
    ${keys.map((k) => {
      const n = nodes[k];
      const p = L[k];
      const idle = Math.abs(n.value) < ACTIVE_W;
      const above = p.labelDy < 0;
      const split =
        k === "pv" && pvParts
          ? pvSplitCaption(t("nodePvExtra"), t("nodePvMain"), pvParts)
          : undefined;
      const valueLabel = k === "pv" && pvParts ? pvParts.total : i.fmt.w(n.value);
      return svg`<g class="flow-node" opacity=${idle ? 0.55 : 1} role="button" tabindex="0" aria-label=${n.label} @click=${() => i.onSelect?.(k)} @keydown=${(e: KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); i.onSelect?.(k); } }}>
        <circle cx=${p.x} cy=${p.y} r="42" fill=${outline ? "none" : "rgba(10,16,30,.9)"} stroke=${strokeOf(n.color)} stroke-width=${outline ? "2.4" : "2"} filter=${idle || outline ? "none" : "url(#glow)"}/>
        <g transform=${iconTransform(p.x, p.y, nodeIconFit(NODE_R))} fill="none" stroke=${strokeOf(n.color)} stroke-width=${ICON_STROKE} stroke-linecap="round" stroke-linejoin="round">
          ${k === "bat" ? batteryGlyph(i.soc, strokeOf(n.color)) : svg`<path d=${n.icon} vector-effect="non-scaling-stroke"/>`}
        </g>
        <text class="node-val" x=${p.x} y=${p.y + p.labelDy} text-anchor="middle">${valueLabel}</text>
        <text class="node-lbl" x=${p.x} y=${p.y + p.labelDy + (above ? 19 : 18)} text-anchor="middle">${n.label}</text>
        ${split
          ? svg`<text class="node-lbl-sm" x=${p.x} y=${pvSplitLabelY(p.y)} text-anchor="middle">${split}</text>`
          : svg``}
      </g>`;
    })}
    ${showPvExtra
      ? svg`<g class="flow-node" opacity=${pvExtra > ACTIVE_W ? 1 : 0.55} role="button" tabindex="0" aria-label=${t("nodePvExtra")} @click=${() => i.onSelect?.("pvExtra")} @keydown=${(e: KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); i.onSelect?.("pvExtra"); } }}>
          <circle cx=${extraPos.x} cy=${extraPos.y} r=${PV_EXTRA_R} fill=${outline ? "none" : "rgba(10,16,30,.9)"} stroke=${strokeOf("var(--pv-extra)")} stroke-width=${outline ? "2.4" : "2"} filter=${pvExtra > ACTIVE_W && !outline ? "url(#glow)" : "none"}/>
          <g transform=${iconTransform(extraPos.x, extraPos.y, nodeIconFit(PV_EXTRA_R))} fill="none" stroke=${strokeOf("var(--pv-extra)")} stroke-width=${ICON_STROKE} stroke-linecap="round" stroke-linejoin="round">
            <path d=${ICONS.pv} vector-effect="non-scaling-stroke"/>
          </g>
        </g>`
      : svg``}
    ${places.map(({ c, p }) => {
      const color = strokeOf(c.mode === "included" ? "var(--house)" : "var(--accent)");
      const idle = c.missing || Math.abs(c.watts) < ACTIVE_W;
      const open = () => {
        if (!i.arrange) i.onSelect?.(c.id);
      };
      const key = (e: KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } };
      const drag = (e: PointerEvent) => onConsumerDrag(e, c.id, fan.origin, i.arrange, i.onPlaceConsumer, dragBounds);
      if (i.compact) {
        return svg`<g class="flow-node ${i.arrange ? "arrange" : ""}" opacity=${idle ? 0.55 : 1} role="button" tabindex="0" aria-label=${c.name} @click=${open} @keydown=${key} @pointerdown=${drag}>
          <circle cx=${p.x} cy=${p.y} r=${COMPACT_LIST_R} fill=${outline ? "none" : "rgba(10,16,30,.9)"} stroke=${color} stroke-width=${outline ? "2.2" : "2"}/>
          <g transform=${iconTransform(p.x, p.y, iconFit(COMPACT_LIST_R))} fill="none" stroke=${color} stroke-width=${ICON_STROKE} stroke-linecap="round" stroke-linejoin="round"><path d=${CONSUMER_ICON_PATH[c.icon]} vector-effect="non-scaling-stroke"/></g>
          <text font-size="14" font-weight="700" fill="var(--text)" x=${p.x - 26} y=${p.y + 5} text-anchor="end">${i.fmt.w(c.watts)}  ${clip(c.name, 24)}</text>
        </g>`;
      }
      return svg`<g class="flow-node ${i.arrange ? "arrange" : ""}" opacity=${idle ? 0.55 : 1} role="button" tabindex="0" aria-label=${c.name} @click=${open} @keydown=${key} @pointerdown=${drag}>
        <circle cx=${p.x} cy=${p.y} r="26" fill=${outline ? "none" : "rgba(10,16,30,.9)"} stroke=${color} stroke-width=${outline ? "2.4" : "2"} filter=${idle || outline ? "none" : "url(#glow)"}/>
        <g transform=${iconTransform(p.x, p.y, iconFit(CONSUMER_R))} fill="none" stroke=${color} stroke-width=${ICON_STROKE} stroke-linecap="round" stroke-linejoin="round"><path d=${CONSUMER_ICON_PATH[c.icon]} vector-effect="non-scaling-stroke"/></g>
        <text class="node-val-sm" x=${p.x + 34} y=${p.y - 2} text-anchor="start">${i.fmt.w(c.watts)}</text>
        <text class="node-lbl-sm" x=${p.x + 34} y=${p.y + 14} text-anchor="start">${clip(c.name, 18)}</text>
      </g>`;
    })}
  </svg>`;
}
