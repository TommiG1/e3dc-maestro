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
} from "./consumer-layout";
import { consumerPowerCaption } from "./consumers";
import {
  ACTIVE_W,
  batteryFill,
  compactBuses,
  consumerGlyph,
  consumerIdle,
  electrons,
  flowSegment,
  iconFit,
  nodeIconFit,
  pvClusterTotal,
  pvExtraPos,
  pvSplitCaption,
  pvSplitLabelY,
  showPvExtraNode,
  type FlowInput,
} from "./flow";
import {
  HOUSE_R_COMPACT,
  compactSplitForkLinks,
  compactSplitGeomFromLoad,
  splitByMode,
  totalConsumptionW,
} from "./flow-split";
import maestroLogo from "./maestro-logo.png";

const ICONS = {
  pv: "M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
  grid: "M12 2 7 22M12 2l5 20M5 9h14M4 15h16",
  house: "M3 11 12 3l9 8M5 9.5V21h14V9.5M10 21v-6h4v6",
  bat: "M7 6h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zM10 3h4",
  load: "M4 12h16M12 4v16M7 7l10 10M17 7 7 17",
};

const ICON_BOX = 24;
const ICON_STROKE = 2.15;
const NODE_R = 42;
const HOUSE_R = 30;
const CONSUMER_R = 26;
const COMPACT_LIST_R = 16;
const PULL_W = 5500;
const BASE_R_WIDE = 72;
const BASE_R_COMPACT = 52;
const MAX_LOBE = 48;
const POINTS = 72;

type NodeKey = "pv" | "grid" | "house" | "bat";

interface Pos {
  x: number;
  y: number;
  labelDy: number;
}

const LAYOUTS = {
  wide: {
    box: [600, 420] as const,
    hub: { x: 300, y: 215 },
    pv: { x: 300, y: 88, labelDy: -58 },
    grid: { x: 78, y: 215, labelDy: 70 },
    house: { x: 522, y: 215, labelDy: 70 },
    bat: { x: 300, y: 342, labelDy: 58 },
  },
  compact: {
    // Extra headroom so PV watts and side captions stay inside the phone card.
    box: [360, 600] as const,
    hub: { x: 180, y: 255 },
    pv: { x: 180, y: 100, labelDy: -56 },
    // Below the nodes — side captions clipped the iPhone edges.
    grid: { x: 72, y: 255, labelDy: 58 },
    house: { x: 288, y: 255, labelDy: 58 },
    bat: { x: 180, y: 430, labelDy: 52 },
  },
} satisfies Record<string, { box: readonly [number, number]; hub: { x: number; y: number } } & Record<NodeKey, Pos>>;

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

function iconTransform(x: number, y: number, scale: number): string {
  const origin = (ICON_BOX / 2) * scale;
  return `translate(${x - origin} ${y - origin}) scale(${scale})`;
}

function batteryGlyph(level: number | undefined, color: string): TemplateResult {
  const fill = batteryFill(level);
  return svg`<clipPath id="blob-batbody"><rect x="6.6" y="7.6" width="10.8" height="10.8" rx="1.3"/></clipPath>
    ${fill ? svg`<rect clip-path="url(#blob-batbody)" x=${fill.x} y=${fill.y} width=${fill.width} height=${fill.height + 1} fill=${color} stroke="none" opacity="0.78"/>` : svg``}
    <path d=${ICONS.bat} vector-effect="non-scaling-stroke"/>`;
}

const clip = (name: string, max = 16) => (name.length <= max ? name : `${name.slice(0, max - 1)}…`);

export interface BlobPull {
  angle: number;
  strength: number;
}

/** 1 = self-supplied, 0 = house load covered by grid import. */
export function autonomyTone(house: number, grid: number): number {
  if (!(house > 0)) return grid >= 0 ? 1 : 0;
  return 1 - Math.min(1, Math.max(0, -grid) / house);
}

/** Base radius grows gently with total traffic so quiet hours look calmer. */
export function blobBaseRadius(totalWatts: number, compact: boolean): number {
  const base = compact ? BASE_R_COMPACT : BASE_R_WIDE;
  const boost = Math.min(1, Math.abs(totalWatts) / PULL_W);
  return base * (0.88 + 0.22 * boost);
}

export function blobPulls(input: {
  pv: number;
  pvExtra?: number;
  house: number;
  grid: number;
  battery: number;
  consumers?: { angle: number; watts: number }[];
}): BlobPull[] {
  const strength = (watts: number) => Math.min(1, Math.abs(watts) / PULL_W);
  const pulls: BlobPull[] = [
    { angle: -Math.PI / 2, strength: strength(input.pv + Math.max(0, input.pvExtra ?? 0)) },
    { angle: Math.PI, strength: strength(input.grid) },
    { angle: 0, strength: strength(input.house) },
    { angle: Math.PI / 2, strength: strength(input.battery) },
  ];
  for (const c of input.consumers ?? []) {
    if (Math.abs(c.watts) < ACTIVE_W) continue;
    pulls.push({ angle: c.angle, strength: strength(c.watts) * 0.55 });
  }
  return pulls.filter((p) => p.strength > 0.02);
}

export function blobRadiusAt(angle: number, base: number, pulls: BlobPull[]): number {
  let r = base;
  for (const pull of pulls) {
    let d = Math.abs(angle - pull.angle);
    if (d > Math.PI) d = 2 * Math.PI - d;
    const lobe = Math.max(0, Math.cos(d));
    r += pull.strength * MAX_LOBE * lobe * lobe * lobe;
  }
  return r;
}

/** Closed path centred on the origin. */
export function blobPath(base: number, pulls: BlobPull[], points = POINTS): string {
  const parts: string[] = [];
  for (let i = 0; i < points; i++) {
    const angle = (i / points) * Math.PI * 2 - Math.PI / 2;
    const r = blobRadiusAt(angle, base, pulls);
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    parts.push(`${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return `${parts.join(" ")} Z`;
}

function angleOf(from: { x: number; y: number }, to: { x: number; y: number }): number {
  return Math.atan2(to.y - from.y, to.x - from.x);
}

const COMPACT_ROW = 46;

/** Consumer list under the blob battery caption (own geometry, not the nodes layout). */
function blobCompactConsumerPlaces(count: number, width: number): { x: number; y: number; labelDy: number }[] {
  const bat = LAYOUTS.compact.bat;
  const firstY = bat.y + bat.labelDy + 44;
  return Array.from({ length: count }, (_, index) => ({
    x: width - 40,
    y: firstY + index * COMPACT_ROW,
    labelDy: 5,
  }));
}

export function blobFlowBoxHeight(compact: boolean, count: number, split = false): number | undefined {
  if (!compact) {
    if (!count && !split) return undefined;
    const L = LAYOUTS.wide;
    const origin = split
      ? { x: L.house.x + 140, y: L.house.y - 70 }
      : { x: L.house.x, y: L.house.y };
    const fan = houseFan(origin, Math.max(1, count));
    return Math.round(fanBoxHeight(origin.y, fan, L.box[1]) * 0.95);
  }
  if (split) {
    return Math.round(compactSplitGeomFromLoad({ x: 255, y: 165 }, 0, count).boxBottom * 0.94);
  }
  const L = LAYOUTS.compact;
  if (!count) return Math.round(L.box[1] * 0.94);
  const last = blobCompactConsumerPlaces(count, L.box[0]).at(-1)!;
  return Math.round((last.y + 36) * 0.94);
}

/** Tighter phone cross when Aufteilung needs room for the fork. */
const SPLIT_COMPACT_LAYOUT = {
  hub: { x: 140, y: 165 },
  pv: { x: 140, y: 60, labelDy: -52 },
  grid: { x: 48, y: 165, labelDy: 48 },
  house: { x: 255, y: 165, labelDy: -52 },
  bat: { x: 140, y: 285, labelDy: 48 },
} as const;

export function blobEnergyFlow(i: FlowInput): TemplateResult {
  const consumers = (i.consumers ?? []).slice(0, 6);
  const { included, separate } = splitByMode(consumers);
  const hasSplit = separate.length > 0;
  const placesStore = i.consumerPlaces ?? {};
  const customPlaces = hasFreePlaces(placesStore, [
    ...(hasSplit ? ["__house__"] : []),
    ...consumers.map((c) => c.id),
  ]);
  const useFork = Boolean(i.compact && hasSplit && !customPlaces && !i.arrange);
  const useCompactList = i.compact && !hasSplit && !customPlaces && !i.arrange;
  const baseL = i.compact ? LAYOUTS.compact : LAYOUTS.wide;
  const L = useFork
    ? { ...baseL, ...SPLIT_COMPACT_LAYOUT, box: baseL.box }
    : baseL;
  const loadPos = { x: L.house.x, y: L.house.y };
  const phone = useFork ? compactSplitGeomFromLoad(loadPos, separate.length, included.length) : null;
  const baseW = L.box[0] + (i.compact ? 0 : fanBoxPad(consumers.length + (hasSplit ? 1 : 0)));
  const compactPlaces = i.compact && !useFork ? blobCompactConsumerPlaces(consumers.length, baseW) : [];
  const houseDefault = phone
    ? phone.house
    : i.compact
      ? { x: loadPos.x, y: loadPos.y }
      : { x: loadPos.x + 140, y: loadPos.y - 70 };
  const housePos =
    hasSplit && placesStore["__house__"] && "dx" in placesStore["__house__"]
      ? {
          x: loadPos.x + (placesStore["__house__"] as ConsumerPlace).dx,
          y: loadPos.y + (placesStore["__house__"] as ConsumerPlace).dy,
        }
      : houseDefault;
  const loadFan = houseFan(loadPos, hasSplit ? separate.length : consumers.length);
  const houseFanOpts = houseFan(housePos, included.length);
  const separateResolved = resolveConsumerPositions(
    (hasSplit ? separate : consumers).map((c) => c.id),
    placesStore,
    loadFan,
    (hasSplit ? separate : consumers).map((c) => c.mode),
  );
  const includedResolved = hasSplit
    ? resolveConsumerPositions(
        included.map((c) => c.id),
        placesStore,
        houseFanOpts,
        included.map((c) => c.mode),
      )
    : [];
  const atCompactOrSaved = (
    c: (typeof consumers)[number],
    fanPt: { x: number; y: number },
    origin: { x: number; y: number },
    forkDefault: { x: number; y: number } | undefined,
  ) => {
    const raw = placesStore[c.id];
    if (raw && "dx" in raw) return { x: origin.x + raw.dx, y: origin.y + raw.dy, labelDy: 0 };
    if (forkDefault) return { x: forkDefault.x, y: forkDefault.y, labelDy: 0 };
    if (i.compact) {
      const row = compactPlaces[consumers.indexOf(c)] ?? compactPlaces[0]!;
      return { x: row.x, y: row.y, labelDy: 0 };
    }
    return { x: fanPt.x, y: fanPt.y, labelDy: 0 };
  };
  const baseH = phone
    ? phone.boxBottom
    : i.compact
      ? consumers.length
        ? compactPlaces.at(-1)!.y + 36
        : L.box[1]
      : hasSplit
        ? Math.max(fanBoxHeight(loadPos.y, loadFan, L.box[1]), fanBoxHeight(housePos.y, houseFanOpts, L.box[1]))
        : fanBoxHeight(loadPos.y, loadFan, L.box[1]);

  const places = hasSplit
    ? [
        ...separate.map((c, index) => ({
          c,
          p: atCompactOrSaved(c, separateResolved[index]!, loadPos, phone?.separate[index]),
          from: loadPos,
          fromR: 36 as number,
          dragOrigin: loadPos,
          bounds: null as ReturnType<typeof placeBoundsForFan> | null,
        })),
        ...included.map((c, index) => ({
          c,
          p: atCompactOrSaved(c, includedResolved[index]!, housePos, phone?.included[index]),
          from: housePos,
          fromR: useFork || i.compact ? (useFork ? HOUSE_R_COMPACT : COMPACT_LIST_R) : HOUSE_R,
          dragOrigin: housePos,
          bounds: null as ReturnType<typeof placeBoundsForFan> | null,
        })),
      ]
    : consumers.map((c, index) => ({
        c,
        p: atCompactOrSaved(c, separateResolved[index]!, loadFan.origin, undefined),
        from: c.mode === "included" ? loadPos : L.hub,
        fromR: c.mode === "included" ? 36 : i.compact ? 22 : 28,
        dragOrigin: loadFan.origin,
        bounds: null as ReturnType<typeof placeBoundsForFan> | null,
      }));
  const extentPositions = hasSplit ? [housePos, ...places.map(({ p }) => p)] : places.map(({ p }) => p);
  const extent =
    useFork || useCompactList ? { w: baseW, h: baseH } : freePlaceExtent(extentPositions, baseW, baseH);
  const boxW = extent.w;
  const boxH = extent.h;
  const dragBoundsLoad = placeBoundsForFan(
    loadFan,
    Math.max(boxW, i.compact ? 420 : 920),
    Math.max(boxH, i.compact ? 720 : 640),
  );
  const dragBoundsHouse = placeBoundsForFan(
    houseFanOpts,
    Math.max(boxW, i.compact ? 420 : 920),
    Math.max(boxH, i.compact ? 720 : 640),
  );
  for (const row of places) {
    row.bounds = row.dragOrigin === housePos ? dragBoundsHouse : dragBoundsLoad;
  }
  const { pv = 0, house = 0, grid = 0, battery = 0 } = i;
  const pvMain = Math.max(0, pv);
  const pvExtra = Math.max(0, i.pvExtra ?? 0);
  const showPvExtra = showPvExtraNode(pvExtra);
  const nodeR = i.compact ? 32 : 36;
  const pvExtraR = i.compact ? 20 : 22;
  const pvTotal = showPvExtra ? pvClusterTotal(pvMain, pvExtra) : pvMain;
  const extraPos = pvExtraPos(L.pv, i.compact, nodeR, pvExtraR);
  const houseW = Math.max(0, house);
  const loadW = hasSplit ? totalConsumptionW(house, consumers) : houseW;
  const outline = i.outline === true;
  const motion = i.motion !== false;
  const strokeOf = (color: string) => tone(color, outline);
  const t = i.i18n.t;

  const traffic = Math.abs(pvTotal) + Math.abs(loadW) + Math.abs(grid) + Math.abs(battery);
  const base = blobBaseRadius(traffic, i.compact);
  const pulls = blobPulls({
    pv: pvTotal,
    pvExtra: 0,
    house: loadW,
    grid,
    battery,
    consumers: places.map(({ c, p }) => ({ angle: angleOf(L.hub, p), watts: c.watts })),
  });
  const path = blobPath(base, pulls);
  const auto = autonomyTone(loadW, grid);
  const hubR = i.compact ? 22 : 28;
  const soc = typeof i.soc === "number" && Number.isFinite(i.soc) ? Math.min(100, Math.max(0, i.soc)) : undefined;
  const coreR = soc === undefined ? hubR * 0.9 : hubR * 0.55 + hubR * 0.55 * (soc / 100);

  const nodes: Record<NodeKey, { color: string; label: string; value: number; icon: string }> = {
    pv: { color: "var(--pv)", label: t("nodePv"), value: pvTotal, icon: ICONS.pv },
    grid: {
      color: grid < 0 ? "var(--grid-in)" : "var(--grid-out)",
      label: grid < 0 ? t("nodeImport") : t("nodeFeed"),
      value: grid,
      icon: ICONS.grid,
    },
    house: {
      color: "var(--house)",
      label: hasSplit ? t("nodeLoad") : t("nodeHouse"),
      value: loadW,
      icon: hasSplit ? ICONS.load : ICONS.house,
    },
    bat: {
      color: "var(--bat)",
      label: battery < 0 ? t("nodeBatDischarge") : t("nodeBatCharge"),
      value: battery,
      icon: ICONS.bat,
    },
  };
  const keys: NodeKey[] = ["pv", "grid", "house", "bat"];
  const pvParts = showPvExtra ? i.fmt.wParts(pvMain, pvExtra) : undefined;
  const aria = [
    ...keys.map((k) => `${nodes[k].label} ${i.fmt.w(nodes[k].value)}`),
    ...(pvParts ? [`${t("nodePvExtra")} ${pvParts.extra}`, `${t("nodePvMain")} ${pvParts.main}`] : []),
    ...(hasSplit ? [`${t("nodeHouse")} ${i.fmt.w(houseW)}`] : []),
    ...places.map(({ c }) => `${c.name} ${i.fmt.w(c.watts)}`),
  ].join(", ");

  // Warm self-supply → cool grid dependence (theme tokens, not a fixed palette).
  const fillA = auto > 0.55 ? "var(--pv)" : auto > 0.25 ? "var(--bat)" : "var(--grid-in)";
  const fillB = auto > 0.55 ? "var(--bat)" : auto > 0.25 ? "var(--house)" : "var(--grid-in)";
  const busy = Math.min(1, traffic / PULL_W);
  const blobPeriod = `${(3.2 - 1.4 * busy).toFixed(2)}s`;
  const houseDrawR = useFork ? HOUSE_R_COMPACT : i.compact ? COMPACT_LIST_R : HOUSE_R;
  const separatePlaces = places.filter(({ c }) => c.mode === "separate");
  const includedPlaces = places.filter(({ c }) => c.mode === "included");
  const flows: { node: NodeKey; toHub: boolean }[] = [];
  if (pvTotal > ACTIVE_W) flows.push({ node: "pv", toHub: true });
  if (battery < -ACTIVE_W) flows.push({ node: "bat", toHub: true });
  if (battery > ACTIVE_W) flows.push({ node: "bat", toHub: false });
  if (grid < -ACTIVE_W) flows.push({ node: "grid", toHub: true });
  if (grid > ACTIVE_W) flows.push({ node: "grid", toHub: false });
  if (loadW > ACTIVE_W) flows.push({ node: "house", toHub: false });
  const haloR = base * (0.72 + 0.18 * busy);

  return svg`<svg viewBox="0 0 ${boxW} ${boxH}" preserveAspectRatio="xMidYMid meet" role="img" aria-label=${aria}>
    <defs>
      <filter id="blob-glow"><feGaussianBlur stdDeviation="7" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <radialGradient id="blob-fill" cx="50%" cy="45%" r="70%">
        <stop offset="0%" stop-color=${fillA} stop-opacity="0.55"/>
        <stop offset="55%" stop-color=${fillB} stop-opacity="0.32"/>
        <stop offset="100%" stop-color=${fillB} stop-opacity="0.08"/>
      </radialGradient>
      <radialGradient id="blob-core" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="var(--bat)" stop-opacity="0.55"/>
        <stop offset="100%" stop-color="var(--bat)" stop-opacity="0.08"/>
      </radialGradient>
    </defs>
    ${keys.map((k) => svg`<path class="flow-line" d=${flowSegment(L[k], L.hub, nodeR, hubR)} stroke=${nodes[k].color} opacity=${Math.abs(nodes[k].value) > ACTIVE_W ? 0.4 : 0.16}/>`)}
    ${showPvExtra
      ? svg`<path class="flow-line" d=${flowSegment(extraPos, L.pv, pvExtraR, nodeR)} stroke="var(--pv-extra)" opacity="0.5"/>`
      : svg``}
    ${useFork && phone
      ? compactSplitForkLinks({
          load: loadPos,
          loadR: nodeR,
          fork: phone.fork,
          house: housePos,
          houseR: houseDrawR,
          houseW,
          total: loadW,
          separate: separatePlaces,
          included: includedPlaces,
          boxW,
          motion,
          strokeOf,
        })
      : hasSplit
        ? svg`<path class="flow-line" d=${flowSegment(loadPos, housePos, nodeR, houseDrawR)} stroke="var(--house)" opacity=${houseW > ACTIVE_W ? 0.4 : 0.16}/>
          ${electrons(loadPos, housePos, nodeR, houseDrawR, houseW, "var(--house)", motion)}`
        : svg``}
    ${flows.map((f) => {
      const a = f.toHub ? L[f.node] : L.hub;
      const b = f.toHub ? L.hub : L[f.node];
      const fromR = f.toHub ? nodeR : hubR;
      const toR = f.toHub ? hubR : nodeR;
      return electrons(a, b, fromR, toR, nodes[f.node].value, nodes[f.node].color, motion);
    })}
    ${showPvExtra ? electrons(extraPos, L.pv, pvExtraR, nodeR, pvExtra, "var(--pv-extra)", motion) : svg``}
    <g class="flow-blob ${motion ? "motion" : ""}" style=${`--blob-period:${blobPeriod}`} transform=${`translate(${L.hub.x} ${L.hub.y})`}>
      <ellipse class="flow-blob-halo" cx="0" cy="0" rx=${(haloR * 1.15).toFixed(1)} ry=${(haloR * 0.92).toFixed(1)} fill="none" stroke=${strokeOf(fillA)} stroke-width="1.2" stroke-dasharray="6 10" opacity=${(0.2 + 0.35 * busy).toFixed(2)}/>
      <path class="flow-blob-shape" d=${path} fill="url(#blob-fill)" stroke=${strokeOf(fillA)} stroke-width=${outline ? "2.2" : "1.4"} filter=${outline ? "none" : "url(#blob-glow)"} opacity="0.95"/>
      <circle class="flow-blob-core" r=${coreR.toFixed(1)} fill="url(#blob-core)" opacity=${soc === undefined ? 0.35 : 0.75}/>
      <image href=${maestroLogo} x=${-hubR} y=${-hubR} width=${hubR * 2} height=${hubR * 2} aria-label="Maestro"/>
    </g>
    ${keys.map((k) => {
      const n = nodes[k];
      const p = L[k];
      const idle = Math.abs(n.value) < ACTIVE_W;
      const above = p.labelDy < 0;
      const ly = p.y + p.labelDy;
      const split =
        k === "pv" && pvParts
          ? pvSplitCaption(t("nodePvExtra"), t("nodePvMain"), pvParts)
          : undefined;
      const valueLabel = k === "pv" && pvParts ? pvParts.total : i.fmt.w(n.value);
      return svg`<g class="flow-node" opacity=${idle ? 0.55 : 1} role="button" tabindex="0" aria-label=${n.label} @click=${() => i.onSelect?.(k === "house" && hasSplit ? "load" : k)} @keydown=${(e: KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); i.onSelect?.(k === "house" && hasSplit ? "load" : k); } }}>
        <circle cx=${p.x} cy=${p.y} r=${nodeR} fill=${outline ? "none" : "rgba(10,16,30,.88)"} stroke=${strokeOf(n.color)} stroke-width=${outline ? "2.4" : "2"} filter=${idle || outline ? "none" : "url(#blob-glow)"}/>
        <g transform=${iconTransform(p.x, p.y, nodeIconFit(nodeR))} fill="none" stroke=${strokeOf(n.color)} stroke-width=${ICON_STROKE} stroke-linecap="round" stroke-linejoin="round">
          ${k === "bat" ? batteryGlyph(i.soc, strokeOf(n.color)) : svg`<path d=${n.icon} vector-effect="non-scaling-stroke"/>`}
        </g>
        <text class="node-val" x=${p.x} y=${ly} text-anchor="middle">${valueLabel}</text>
        <text class="node-lbl" x=${p.x} y=${ly + (above ? 19 : 18)} text-anchor="middle">${n.label}</text>
        ${split
          ? svg`<text class="node-lbl-sm" x=${p.x} y=${pvSplitLabelY(p.y, nodeR)} text-anchor="middle">${split}</text>`
          : svg``}
      </g>`;
    })}
    ${showPvExtra
      ? svg`<g class="flow-node" opacity=${pvExtra > ACTIVE_W ? 1 : 0.55} role="button" tabindex="0" aria-label=${t("nodePvExtra")} @click=${() => i.onSelect?.("pvExtra")} @keydown=${(e: KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); i.onSelect?.("pvExtra"); } }}>
          <circle cx=${extraPos.x} cy=${extraPos.y} r=${pvExtraR} fill=${outline ? "none" : "rgba(10,16,30,.88)"} stroke=${strokeOf("var(--pv-extra)")} stroke-width=${outline ? "2.4" : "2"} filter=${pvExtra > ACTIVE_W && !outline ? "url(#blob-glow)" : "none"}/>
          <g transform=${iconTransform(extraPos.x, extraPos.y, nodeIconFit(pvExtraR))} fill="none" stroke=${strokeOf("var(--pv-extra)")} stroke-width=${ICON_STROKE} stroke-linecap="round" stroke-linejoin="round">
            <path d=${ICONS.pv} vector-effect="non-scaling-stroke"/>
          </g>
        </g>`
      : svg``}
    ${hasSplit
      ? svg`<g class="flow-node ${i.arrange ? "arrange" : ""}" opacity=${houseW < ACTIVE_W ? 0.55 : 1} role="button" tabindex="0" aria-label=${t("nodeHouse")}
          @click=${() => { if (!i.arrange) i.onSelect?.("house"); }}
          @keydown=${(e: KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); if (!i.arrange) i.onSelect?.("house"); } }}
          @pointerdown=${(e: PointerEvent) => onConsumerDrag(e, "__house__", loadPos, i.arrange, i.onPlaceConsumer, dragBoundsLoad)}
        >
          <circle cx=${housePos.x} cy=${housePos.y} r=${houseDrawR} fill=${outline ? "none" : "rgba(10,16,30,.88)"} stroke=${strokeOf("var(--house)")} stroke-width=${outline ? (useFork || i.compact ? "2.2" : "2.4") : "2"} filter=${houseW < ACTIVE_W || outline || (i.compact && !useFork) ? "none" : "url(#blob-glow)"}/>
          <g transform=${iconTransform(housePos.x, housePos.y, useFork || i.compact ? iconFit(houseDrawR) : nodeIconFit(HOUSE_R))} fill="none" stroke=${strokeOf("var(--house)")} stroke-width=${ICON_STROKE} stroke-linecap="round" stroke-linejoin="round">
            <path d=${ICONS.house} vector-effect="non-scaling-stroke"/>
          </g>
          ${useFork
            ? svg`<text class="node-val-sm" x=${housePos.x} y=${housePos.y + 42} text-anchor="middle">${i.fmt.w(houseW)}</text>
              <text class="node-lbl-sm" x=${housePos.x} y=${housePos.y + 58} text-anchor="middle">${t("nodeHouse")}</text>`
            : i.compact
              ? svg`<text font-size="14" font-weight="700" fill="var(--text)" x=${housePos.x - 26} y=${housePos.y + 5} text-anchor="end">${i.fmt.w(houseW)}  ${t("nodeHouse")}</text>`
              : svg`<text class="node-val-sm" x=${housePos.x} y=${housePos.y + 52} text-anchor="middle">${i.fmt.w(houseW)}</text>
                <text class="node-lbl-sm" x=${housePos.x} y=${housePos.y + 68} text-anchor="middle">${t("nodeHouse")}</text>`}
        </g>`
      : svg``}
    ${useFork
      ? svg``
      : useCompactList
        ? compactBuses(places, loadPos, boxW, motion, nodeR)
        : places.map(({ c, p, from, fromR }) => {
            const color = c.mode === "included" ? "var(--house)" : "var(--accent)";
            const toR = i.compact ? COMPACT_LIST_R : CONSUMER_R;
            return svg`<path class="flow-line" d=${flowSegment(from, p, fromR, toR)} stroke=${color} opacity=${Math.abs(c.watts) > ACTIVE_W ? 0.4 : 0.16}/>
              ${electrons(from, p, fromR, toR, c.watts, color, motion)}`;
          })}
    ${places.map(({ c, p, dragOrigin, bounds }) => {
      const nodeColor = c.mode === "included" ? "var(--house)" : "var(--accent)";
      const color = strokeOf(nodeColor);
      const idle = consumerIdle(c, ACTIVE_W);
      const power = consumerPowerCaption(i.fmt, c.watts, c.soc);
      const aria = [c.name, power, c.plugged === true ? i.i18n.t("plantPlug") : undefined].filter(Boolean).join(", ");
      const open = () => {
        if (!i.arrange) i.onSelect?.(c.id);
      };
      const key = (e: KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } };
      const drag = (e: PointerEvent) => onConsumerDrag(e, c.id, dragOrigin, i.arrange, i.onPlaceConsumer, bounds ?? undefined);
      if (i.compact) {
        return svg`<g class="flow-node ${i.arrange ? "arrange" : ""}" opacity=${idle ? 0.55 : 1} role="button" tabindex="0" aria-label=${aria} @click=${open} @keydown=${key} @pointerdown=${drag}>
          <circle cx=${p.x} cy=${p.y} r=${COMPACT_LIST_R} fill=${outline ? "none" : "rgba(10,16,30,.9)"} stroke=${color} stroke-width=${outline ? "2.2" : "2"}/>
          <g transform=${iconTransform(p.x, p.y, iconFit(COMPACT_LIST_R))} fill="none" stroke=${color} stroke-width=${ICON_STROKE} stroke-linecap="round" stroke-linejoin="round">${consumerGlyph(c, nodeColor, outline)}</g>
          <text font-size="14" font-weight="700" fill="var(--text)" x=${p.x - 26} y=${p.y + 5} text-anchor="end">${power}  ${clip(c.name, 24)}</text>
        </g>`;
      }
      return svg`<g class="flow-node ${i.arrange ? "arrange" : ""}" opacity=${idle ? 0.55 : 1} role="button" tabindex="0" aria-label=${aria} @click=${open} @keydown=${key} @pointerdown=${drag}>
        <circle cx=${p.x} cy=${p.y} r="26" fill=${outline ? "none" : "rgba(10,16,30,.9)"} stroke=${color} stroke-width=${outline ? "2.4" : "2"} filter=${idle || outline ? "none" : "url(#blob-glow)"}/>
        <g transform=${iconTransform(p.x, p.y, iconFit(CONSUMER_R))} fill="none" stroke=${color} stroke-width=${ICON_STROKE} stroke-linecap="round" stroke-linejoin="round">${consumerGlyph(c, nodeColor, outline)}</g>
        <text class="node-val-sm" x=${p.x + 34} y=${p.y - 2} text-anchor="start">${power}</text>
        <text class="node-lbl-sm" x=${p.x + 34} y=${p.y + 14} text-anchor="start">${clip(c.name, 18)}</text>
      </g>`;
    })}
  </svg>`;
}
