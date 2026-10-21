/**
 * E3DC-style consumption split helpers + nodes layout.
 * Used automatically in nodes / blob / city when a separately metered
 * consumer exists: Verbrauch (= house + separate) → Haus (= house meter),
 * separate loads from Verbrauch, included loads from Haus.
 */
import { svg, type TemplateResult } from "lit";
import {
  freePlaceExtent,
  hasFreePlaces,
  onConsumerDrag,
  placeBoundsForFan,
  type ConsumerPlace,
  type StoredConsumerPlace,
} from "./consumer-layout";
import { CONSUMER_ICON_PATH, type FlowConsumer } from "./consumers";
import {
  ACTIVE_W,
  compactBuses,
  electrons,
  flowSegment,
  iconFit,
  nodeIconFit,
  pvExtraPos,
  showPvExtraNode,
  type FlowInput,
} from "./flow";
import maestroLogo from "./maestro-logo.png";

/** Same size as PV / Netz / Akku. */
const NODE_R = 42;
const NODE_R_COMPACT = 34;
const PV_EXTRA_R = 28;
const PV_EXTRA_R_COMPACT = 24;
/** Verbrauch matches Netzbezug. */
const LOAD_R = NODE_R;
const LOAD_R_COMPACT = NODE_R_COMPACT;
/** Haus matches the previous Verbrauch size (wide); phone uses list size. */
const HOUSE_R = 34;
/** Phone: Haus is a real branch node, not a flat list row. */
export const HOUSE_R_COMPACT = 26;
const CONSUMER_R = 26;
export const COMPACT_LIST_R = 16;
export const COMPACT_ROW = 46;
const ICON_STROKE = 2.15;

const ICONS = {
  pv: "M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
  grid: "M12 2 7 22M12 2l5 20M5 9h14M4 15h16",
  house: "M3 11 12 3l9 8M5 9.5V21h14V9.5M10 21v-6h4v6",
  bat: "M7 6h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zM10 3h4",
  load: "M4 12h16M12 4v16M7 7l10 10M17 7 7 17",
};

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

const clip = (name: string, max = 16) => (name.length <= max ? name : `${name.slice(0, max - 1)}…`);

function iconTransform(x: number, y: number, scale: number): string {
  const origin = 12 * scale;
  return `translate(${x - origin} ${y - origin}) scale(${scale})`;
}

const positiveSum = (items: FlowConsumer[], mode: FlowConsumer["mode"]): number =>
  items.filter((c) => c.mode === mode).reduce((sum, c) => sum + Math.max(0, c.watts), 0);

/** Sum for the Verbrauch node: house meter + separately measured loads. */
export function totalConsumptionW(house: number | undefined, consumers: FlowConsumer[]): number {
  const houseW = Math.max(0, house ?? 0);
  return houseW + positiveSum(consumers, "separate");
}

export function splitByMode(consumers: FlowConsumer[]): { included: FlowConsumer[]; separate: FlowConsumer[] } {
  return {
    included: consumers.filter((c) => c.mode === "included"),
    separate: consumers.filter((c) => c.mode === "separate"),
  };
}

type Pt = { x: number; y: number };

function defaultLeafPositions(origin: Pt, count: number, dx = 120): Pt[] {
  if (count <= 0) return [];
  if (count === 1) return [{ x: origin.x + dx, y: origin.y }];
  const span = Math.min(200, 36 + count * 34);
  const y0 = origin.y - span / 2;
  return Array.from({ length: count }, (_, i) => ({
    x: origin.x + dx,
    y: y0 + (i / (count - 1)) * span,
  }));
}

function resolveAt(
  id: string,
  index: number,
  count: number,
  origin: Pt,
  places: Record<string, StoredConsumerPlace>,
  fallback: Pt[],
): Pt {
  const raw = places[id];
  if (raw && "dx" in raw) return { x: origin.x + raw.dx, y: origin.y + raw.dy };
  return fallback[index] ?? { x: origin.x + 120, y: origin.y };
}

export type CompactSplitPt = { x: number; y: number };

/**
 * Phone split relative to Verbrauch/load: junction, then forks —
 * left/down to Haus, right rail to separately metered loads.
 * Shared by nodes, blob and city.
 */
export function compactSplitGeomFromLoad(
  load: CompactSplitPt,
  separateCount: number,
  includedCount: number,
): {
  fork: CompactSplitPt;
  house: CompactSplitPt;
  separate: CompactSplitPt[];
  included: CompactSplitPt[];
  boxBottom: number;
} {
  const fork = { x: load.x, y: load.y + 88 };
  const house = { x: load.x - 98, y: load.y + 195 };
  const listX = Math.min(318, load.x + 70);
  const sepY0 = load.y + 158;
  const separate = Array.from({ length: separateCount }, (_, i) => ({
    x: listX,
    y: sepY0 + i * COMPACT_ROW,
  }));
  const incY0 = house.y + HOUSE_R_COMPACT + 48;
  const included = Array.from({ length: includedCount }, (_, i) => ({
    x: listX,
    y: incY0 + i * COMPACT_ROW,
  }));
  const boxBottom =
    Math.max(
      house.y + HOUSE_R_COMPACT + 56,
      separate.at(-1)?.y ?? 0,
      included.at(-1)?.y ?? 0,
    ) + 36;
  return { fork, house, separate, included, boxBottom };
}

/** Default phone load position for the nodes cross. */
function compactSplitGeom(separateCount: number, includedCount: number) {
  const load = { x: 248, y: 160 };
  const g = compactSplitGeomFromLoad(load, separateCount, includedCount);
  return { load, ...g, boxH: g.boxBottom };
}

/** Stem + junction + Haus branch + accent rail for separate loads + included under Haus. */
export function compactSplitForkLinks(input: {
  load: CompactSplitPt;
  loadR: number;
  fork: CompactSplitPt;
  house: CompactSplitPt;
  houseR: number;
  houseW: number;
  total: number;
  separate: { c: FlowConsumer; p: CompactSplitPt }[];
  included: { c: FlowConsumer; p: CompactSplitPt }[];
  boxW: number;
  motion: boolean;
  strokeOf: (color: string) => string;
}): TemplateResult {
  const {
    load,
    loadR,
    fork,
    house,
    houseR,
    houseW,
    total,
    separate,
    included,
    boxW,
    motion,
    strokeOf,
  } = input;
  const railX = boxW - 14;
  return svg`<path class="flow-line" d=${flowSegment(load, fork, loadR, 4)} stroke="var(--house)"/>
    ${electrons(load, fork, loadR, 4, total, "var(--house)", motion)}
    <circle cx=${fork.x} cy=${fork.y} r="4" fill=${strokeOf("var(--house)")} opacity="0.9"/>
    <path class="flow-line" d=${flowSegment(fork, house, 4, houseR)} stroke="var(--house)"/>
    ${electrons(fork, house, 4, houseR, houseW, "var(--house)", motion)}
    ${separate.length
      ? svg`<path class="flow-line" d="M${fork.x} ${fork.y} L${railX} ${fork.y} L${railX} ${separate.at(-1)!.p.y}" stroke="var(--accent)"/>
        ${separate.map(({ c, p }) => {
          const end = { x: p.x - COMPACT_LIST_R, y: p.y };
          return svg`<path class="flow-line" d="M${railX} ${p.y} L${end.x} ${end.y}" stroke="var(--accent)"/>
            ${electrons({ x: railX, y: p.y }, p, 0, COMPACT_LIST_R, c.watts, "var(--accent)", motion)}`;
        })}`
      : svg``}
    ${compactBuses(included, house, boxW, motion, houseR)}`;
}

export function splitFlowBoxHeight(compact: boolean, leafCount: number): number | undefined {
  if (compact) {
    // Upper bound: every leaf under Haus (taller than the separate rail).
    return compactSplitGeom(0, leafCount).boxH;
  }
  if (!leafCount) return 420;
  return Math.round(420 + Math.max(0, leafCount - 3) * 28);
}

export function splitEnergyFlow(i: FlowInput): TemplateResult {
  const { pv = 0, house = 0, grid = 0, battery = 0 } = i;
  const pvExtra = Math.max(0, i.pvExtra ?? 0);
  const showPvExtra = showPvExtraNode(pvExtra);
  const motion = i.motion !== false;
  const outline = i.outline === true;
  const strokeOf = (color: string) => tone(color, outline);
  const t = i.i18n.t;
  const all = (i.consumers ?? []).slice(0, 6);
  const { included, separate } = splitByMode(all);
  const total = totalConsumptionW(house, all);
  const houseW = Math.max(0, house);
  const compact = i.compact;
  const phone = compact ? compactSplitGeom(separate.length, included.length) : null;

  const nodeR = compact ? NODE_R_COMPACT : NODE_R;
  const pvExtraR = compact ? PV_EXTRA_R_COMPACT : PV_EXTRA_R;
  const loadR = compact ? LOAD_R_COMPACT : LOAD_R;
  const houseR = compact ? HOUSE_R_COMPACT : HOUSE_R;
  const leafR = compact ? COMPACT_LIST_R : CONSUMER_R;

  const hub: Pt = compact ? { x: 125, y: 160 } : { x: 240, y: 215 };
  const pvPos: Pt = compact ? { x: 125, y: 55 } : { x: 240, y: 95 };
  const extraPos = pvExtraPos(pvPos, compact);
  const gridPos: Pt = compact ? { x: 42, y: 160 } : { x: 80, y: 215 };
  const batPos: Pt = compact ? { x: 125, y: 275 } : { x: 240, y: 335 };
  const loadPos: Pt = phone ? phone.load : { x: 420, y: 215 };
  const forkPos: Pt | null = phone ? phone.fork : null;

  const boxWFixed = compact ? 360 : 760;

  const places = i.consumerPlaces ?? {};
  const customPlaces = hasFreePlaces(places, ["__house__", ...all.map((c) => c.id)]);
  // Fixed phone fork only while nothing was moved; arrange / saved places use free links.
  const useFork = Boolean(phone && !customPlaces && !i.arrange);

  const houseDefault: Pt = phone
    ? phone.house
    : { x: loadPos.x + 140, y: loadPos.y - 70 };
  const housePos =
    places["__house__"] && "dx" in places["__house__"]
      ? {
          x: loadPos.x + (places["__house__"] as ConsumerPlace).dx,
          y: loadPos.y + (places["__house__"] as ConsumerPlace).dy,
        }
      : houseDefault;

  const separateDefaults = phone
    ? phone.separate
    : defaultLeafPositions(loadPos, separate.length, 140).map((p) => ({ x: p.x, y: p.y + 55 }));
  const includedDefaults = phone
    ? phone.included
    : defaultLeafPositions(housePos, included.length, 110);

  const separateNodes = separate.map((c, index) => ({
    c,
    p: resolveAt(c.id, index, separate.length, loadPos, places, separateDefaults),
    from: loadPos,
  }));
  const includedNodes = included.map((c, index) => ({
    c,
    p: resolveAt(c.id, index, included.length, housePos, places, includedDefaults),
    from: housePos,
  }));

  const positions = [
    housePos,
    ...separateNodes.map(({ p }) => p),
    ...includedNodes.map(({ p }) => p),
  ];
  const baseW = boxWFixed;
  const baseH = phone ? phone.boxH : (splitFlowBoxHeight(false, all.length) ?? 420);
  const extent =
    compact && useFork ? { w: baseW, h: baseH } : freePlaceExtent(positions, baseW, baseH);
  const boxW = extent.w;
  const boxH = extent.h;
  const dragBoundsLoad = placeBoundsForFan(
    { origin: loadPos, radius: 180, startAngle: -1, endAngle: 1 },
    Math.max(boxW, compact ? 420 : 960),
    Math.max(boxH, compact ? 720 : 680),
  );
  const dragBoundsHouse = placeBoundsForFan(
    { origin: housePos, radius: 140, startAngle: -1, endAngle: 1 },
    Math.max(boxW, compact ? 420 : 960),
    Math.max(boxH, compact ? 720 : 680),
  );

  const sources: { key: string; pos: Pt; color: string; label: string; value: number; icon: string; r?: number }[] = [
    { key: "pv", pos: pvPos, color: "var(--pv)", label: t("nodePv"), value: pv, icon: ICONS.pv },
    ...(showPvExtra
      ? [
          {
            key: "pvExtra",
            pos: { x: extraPos.x, y: extraPos.y },
            color: "var(--pv-extra)",
            label: t("nodePvExtra"),
            value: pvExtra,
            icon: ICONS.pv,
            r: pvExtraR,
          },
        ]
      : []),
    {
      key: "grid",
      pos: gridPos,
      color: grid < 0 ? "var(--grid-in)" : "var(--grid-out)",
      label: grid < 0 ? t("nodeImport") : t("nodeFeed"),
      value: grid,
      icon: ICONS.grid,
    },
    {
      key: "bat",
      pos: batPos,
      color: "var(--bat)",
      label: battery < 0 ? t("nodeBatDischarge") : t("nodeBatCharge"),
      value: battery,
      icon: ICONS.bat,
    },
  ];

  const hubR = loadR;
  // Phone: Verbrauch labels above so the fork can drop cleanly underneath.
  const loadLabelDy = compact ? -52 : 70;
  const labelBelow = compact ? 48 : 70;
  const aria = [
    ...sources.map((s) => `${s.label} ${i.fmt.w(s.value)}`),
    `${t("nodeLoad")} ${i.fmt.w(total)}`,
    `${t("nodeHouse")} ${i.fmt.w(houseW)}`,
    ...all.map((c) => `${c.name} ${i.fmt.w(c.watts)}`),
  ].join(", ");

  const node = (
    key: string,
    pos: Pt,
    color: string,
    label: string,
    value: number,
    icon: string,
    r: number,
    labelDy: number,
    onDrag?: (e: PointerEvent) => void,
  ) => {
    const idle = Math.abs(value) < ACTIVE_W;
    const above = labelDy < 0;
    const open = () => {
      if (!i.arrange) i.onSelect?.(key);
    };
    const valClass = r >= HOUSE_R ? "node-val" : "node-val-sm";
    const lblClass = r >= HOUSE_R ? "node-lbl" : "node-lbl-sm";
    return svg`<g class="flow-node ${onDrag && i.arrange ? "arrange" : ""}" opacity=${idle ? 0.55 : 1} role="button" tabindex="0" aria-label=${label}
      @click=${open}
      @keydown=${(e: KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } }}
      @pointerdown=${onDrag}
    >
      <circle cx=${pos.x} cy=${pos.y} r=${r} fill=${outline ? "none" : "rgba(10,16,30,.9)"} stroke=${strokeOf(color)} stroke-width=${outline ? "2.4" : "2"} filter=${idle || outline ? "none" : "url(#glow)"}/>
      <g transform=${iconTransform(pos.x, pos.y, r >= NODE_R_COMPACT ? nodeIconFit(r) : iconFit(r))} fill="none" stroke=${strokeOf(color)} stroke-width=${ICON_STROKE} stroke-linecap="round" stroke-linejoin="round">
        <path d=${icon} vector-effect="non-scaling-stroke"/>
      </g>
      <text class=${valClass} x=${pos.x} y=${pos.y + labelDy} text-anchor="middle">${i.fmt.w(value)}</text>
      <text class=${lblClass} x=${pos.x} y=${pos.y + labelDy + (above ? 19 : 16)} text-anchor="middle">${clip(label, 18)}</text>
    </g>`;
  };

  const listRow = (
    key: string,
    pos: Pt,
    color: string,
    label: string,
    value: number,
    icon: string,
    onDrag?: (e: PointerEvent) => void,
  ) => {
    const idle = Math.abs(value) < ACTIVE_W;
    const open = () => {
      if (!i.arrange) i.onSelect?.(key);
    };
    return svg`<g class="flow-node ${onDrag && i.arrange ? "arrange" : ""}" opacity=${idle ? 0.55 : 1} role="button" tabindex="0" aria-label=${label}
      @click=${open}
      @keydown=${(e: KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } }}
      @pointerdown=${onDrag}
    >
      <circle cx=${pos.x} cy=${pos.y} r=${COMPACT_LIST_R} fill=${outline ? "none" : "rgba(10,16,30,.9)"} stroke=${strokeOf(color)} stroke-width=${outline ? "2.2" : "2"}/>
      <g transform=${iconTransform(pos.x, pos.y, iconFit(COMPACT_LIST_R))} fill="none" stroke=${strokeOf(color)} stroke-width=${ICON_STROKE} stroke-linecap="round" stroke-linejoin="round">
        <path d=${icon} vector-effect="non-scaling-stroke"/>
      </g>
      <text font-size="14" font-weight="700" fill="var(--text)" x=${pos.x - 26} y=${pos.y + 5} text-anchor="end">${i.fmt.w(value)}  ${clip(label, 24)}</text>
    </g>`;
  };

  const leaf = (
    c: FlowConsumer,
    p: Pt,
    from: Pt,
    color: string,
    dragOrigin: Pt,
    bounds: ReturnType<typeof placeBoundsForFan>,
  ) => {
    const idle = c.missing || Math.abs(c.watts) < ACTIVE_W;
    const open = () => {
      if (!i.arrange) i.onSelect?.(c.id);
    };
    const drag = (e: PointerEvent) => onConsumerDrag(e, c.id, dragOrigin, i.arrange, i.onPlaceConsumer, bounds);
    if (compact) {
      return listRow(c.id, p, color, c.name, c.watts, CONSUMER_ICON_PATH[c.icon], i.arrange ? drag : undefined);
    }
    return svg`<path class="flow-line" d=${flowSegment(from, p, from === loadPos ? loadR : houseR, leafR)} stroke=${color}/>
      ${electrons(from, p, from === loadPos ? loadR : houseR, leafR, c.watts, color, motion)}
      <g class="flow-node ${i.arrange ? "arrange" : ""}" opacity=${idle ? 0.55 : 1} role="button" tabindex="0" aria-label=${c.name}
        @click=${open}
        @keydown=${(e: KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } }}
        @pointerdown=${drag}
      >
        <circle cx=${p.x} cy=${p.y} r=${CONSUMER_R} fill=${outline ? "none" : "rgba(10,16,30,.9)"} stroke=${strokeOf(color)} stroke-width=${outline ? "2.4" : "2"} filter=${idle || outline ? "none" : "url(#glow)"}/>
        <g transform=${iconTransform(p.x, p.y, iconFit(CONSUMER_R))} fill="none" stroke=${strokeOf(color)} stroke-width=${ICON_STROKE} stroke-linecap="round" stroke-linejoin="round">
          <path d=${CONSUMER_ICON_PATH[c.icon]} vector-effect="non-scaling-stroke"/>
        </g>
        <text class="node-val-sm" x=${p.x + 34} y=${p.y - 2} text-anchor="start">${i.fmt.w(c.watts)}</text>
        <text class="node-lbl-sm" x=${p.x + 34} y=${p.y + 14} text-anchor="start">${clip(c.name, 18)}</text>
      </g>`;
  };

  const houseDrag = i.arrange
    ? (e: PointerEvent) => onConsumerDrag(e, "__house__", loadPos, i.arrange, i.onPlaceConsumer, dragBoundsLoad)
    : undefined;

  const forkSvg =
    useFork && forkPos
      ? compactSplitForkLinks({
          load: loadPos,
          loadR,
          fork: forkPos,
          house: housePos,
          houseR,
          houseW,
          total,
          separate: separateNodes,
          included: includedNodes,
          boxW,
          motion,
          strokeOf,
        })
      : svg``;

  const freeLinks = svg`<path class="flow-line" d=${flowSegment(loadPos, housePos, loadR, houseR)} stroke="var(--house)"/>
    ${electrons(loadPos, housePos, loadR, houseR, houseW, "var(--house)", motion)}
    ${separateNodes.map(
      ({ c, p }) => svg`<path class="flow-line" d=${flowSegment(loadPos, p, loadR, leafR)} stroke="var(--accent)"/>
        ${electrons(loadPos, p, loadR, leafR, c.watts, "var(--accent)", motion)}`,
    )}
    ${includedNodes.map(
      ({ c, p }) => svg`<path class="flow-line" d=${flowSegment(housePos, p, houseR, leafR)} stroke="var(--house)"/>
        ${electrons(housePos, p, houseR, leafR, c.watts, "var(--house)", motion)}`,
    )}`;

  return svg`<svg viewBox="0 0 ${boxW} ${boxH}" preserveAspectRatio="xMidYMid meet" role="img" aria-label=${aria}>
    <defs>
      <filter id="glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    ${sources.map((s) => svg`<path class="flow-line" d=${flowSegment(s.pos, hub, s.r ?? nodeR, hubR)} stroke=${s.color}/>`)}
    <path class="flow-line" d=${flowSegment(hub, loadPos, hubR, loadR)} stroke="var(--house)"/>
    ${useFork
      ? forkSvg
      : compact
        ? freeLinks
        : svg`<path class="flow-line" d=${flowSegment(loadPos, housePos, loadR, houseR)} stroke="var(--house)"/>
          ${electrons(loadPos, housePos, loadR, houseR, houseW, "var(--house)", motion)}`}

    ${sources.map((s) => {
      const r = s.r ?? nodeR;
      const toHub =
        (s.key === "pv" && pv > ACTIVE_W) ||
        (s.key === "pvExtra" && showPvExtra) ||
        (s.key === "bat" && battery < -ACTIVE_W) ||
        (s.key === "grid" && grid < -ACTIVE_W);
      const fromHub = (s.key === "bat" && battery > ACTIVE_W) || (s.key === "grid" && grid > ACTIVE_W);
      if (toHub) return electrons(s.pos, hub, r, hubR, s.value, s.color, motion);
      if (fromHub) return electrons(hub, s.pos, hubR, r, s.value, s.color, motion);
      return svg``;
    })}
    ${electrons(hub, loadPos, hubR, loadR, total, "var(--house)", motion)}

    <image href=${maestroLogo} x=${hub.x - hubR} y=${hub.y - hubR} width=${hubR * 2} height=${hubR * 2} aria-label="Maestro"/>
    ${sources.map((s) =>
      node(
        s.key,
        s.pos,
        s.color,
        s.label,
        s.value,
        s.icon,
        s.r ?? nodeR,
        s.key === "pv" || s.key === "pvExtra" ? (compact ? -52 : s.key === "pvExtra" ? -56 : -72) : labelBelow,
      ),
    )}
    ${node("load", loadPos, "var(--house)", t("nodeLoad"), total, ICONS.load, loadR, loadLabelDy)}
    ${node("house", housePos, "var(--house)", t("nodeHouse"), houseW, ICONS.house, houseR, compact ? 42 : 58, houseDrag)}
    ${separateNodes.map(({ c, p }) => leaf(c, p, loadPos, "var(--accent)", loadPos, dragBoundsLoad))}
    ${includedNodes.map(({ c, p }) => leaf(c, p, housePos, "var(--house)", housePos, dragBoundsHouse))}
  </svg>`;
}
