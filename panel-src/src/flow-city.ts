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
import { CONSUMER_ICON_PATH } from "./consumers";
import {
  ACTIVE_W,
  compactBuses,
  electronCount,
  electronSpeed,
  flowEnds,
  flowSegment,
  iconFit,
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

const HOUSE_R = 30;
const PV_EXTRA_R = 26;
const CONSUMER_R = 26;
const COMPACT_LIST_R = 16;
const HOUSE_ICON = "M3 11 12 3l9 8M5 9.5V21h14V9.5M10 21v-6h4v6";
const ICON_BOX = 24;
const ICON_STROKE = 2.15;
/** Fallback when Maestro WR-Leistung is unavailable (matches DEFAULT_INVERTER_POWER). */
const DEFAULT_LOAD_MAX_W = 12000;
const LOAD_BARS = 6;
const PV_W = 6000;

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

const clip = (name: string, max = 16) => (name.length <= max ? name : `${name.slice(0, max - 1)}…`);

/**
 * Sequential tank fills for the facade load meter (0–1 each).
 * Capacity is Maestro WR-Leistung (total plant AC, incl. additional producers).
 * Bar 0 fills first, then bar 1, …
 */
export function cityLoadFills(houseWatts: number, maxWatts = DEFAULT_LOAD_MAX_W): number[] {
  const capacity = Math.max(1000, Number.isFinite(maxWatts) ? maxWatts : DEFAULT_LOAD_MAX_W);
  if (!(houseWatts > ACTIVE_W)) return Array.from({ length: LOAD_BARS }, () => 0);
  const level = Math.min(1, houseWatts / capacity) * LOAD_BARS;
  return Array.from({ length: LOAD_BARS }, (_, i) => Math.min(1, Math.max(0, level - i)));
}

/** Roof / PV slab glow opacity 0–1. */
export function cityRoofGlow(pvWatts: number): number {
  if (!(pvWatts > ACTIVE_W)) return 0.1;
  return 0.22 + 0.7 * Math.min(1, pvWatts / PV_W);
}

/** Battery band fill height from SoC. */
export function cityBasementFill(soc: number | undefined, bodyH: number): number {
  if (typeof soc !== "number" || !Number.isFinite(soc) || soc <= 0) return 0;
  return bodyH * (Math.min(100, soc) / 100);
}

function electrons(
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

interface HouseGeom {
  boxW: number;
  boxH: number;
  /** Flat PV canopy with overhang. */
  roof: { x: number; y: number; w: number; h: number };
  /** Thin eaves / soffit under the canopy. */
  soffit: { x: number; y: number; w: number; h: number };
  /** Glass facade. */
  facade: { x: number; y: number; w: number; h: number };
  /** Foundation / battery SoC band. */
  plinth: { x: number; y: number; w: number; h: number };
  /** Utility pole: base centre and height to the cross-arm. */
  mast: { x: number; y: number; h: number };
  logo: { x: number; y: number; s: number };
  /** Ground line under the house. */
  groundY: number;
}

function layout(compact: boolean, consumerCount: number): HouseGeom {
  if (compact) {
    const boxW = 360;
    const facadeW = 156;
    const x = (boxW - facadeW) / 2 + 24;
    const roofH = 26;
    const roofY = 72;
    const overhang = 18;
    const soffitH = 5;
    const facadeY = roofY + roofH + soffitH;
    const facadeH = 148;
    const plinthH = 18;
    const plinthY = facadeY + facadeH;
    const mastH = Math.round(facadeH * 0.48);
    const mastX = 34;
    const mastY = facadeY + 8 + mastH;
    const captionGap = 54;
    const listExtra = consumerCount ? captionGap + 12 + consumerCount * 46 : captionGap;
    return {
      boxW,
      boxH: Math.max(520, mastY + 40 + listExtra),
      roof: { x: x - overhang, y: roofY, w: facadeW + overhang * 2, h: roofH },
      soffit: { x: x - overhang + 2, y: roofY + roofH, w: facadeW + overhang * 2 - 4, h: soffitH },
      facade: { x, y: facadeY, w: facadeW, h: facadeH },
      plinth: { x: x + 2, y: plinthY, w: facadeW - 4, h: plinthH },
      mast: { x: mastX, y: mastY, h: mastH },
      logo: { x: x + 10, y: facadeY + facadeH - 30, s: 20 },
      groundY: plinthY + plinthH + 3,
    };
  }
  const boxW = 600;
  const facadeW = 196;
  const x = 206;
  const roofH = 28;
  const roofY = 52;
  const overhang = 22;
  const soffitH = 6;
  const facadeY = roofY + roofH + soffitH;
  const facadeH = 168;
  const plinthH = 20;
  const plinthY = facadeY + facadeH;
  const mastH = Math.round(facadeH * 0.48);
  const mastX = 76;
  const mastY = facadeY + 8 + mastH;
  const groundY = plinthY + plinthH + 3;
  const side = consumerCount ? fanBoxPad(consumerCount) : 0;
  return {
    boxW: boxW + side,
    // Sit just under the foundation; the consumer fan may grow the viewBox later.
    boxH: groundY + 20,
    roof: { x: x - overhang, y: roofY, w: facadeW + overhang * 2, h: roofH },
    soffit: { x: x - overhang + 2, y: roofY + roofH, w: facadeW + overhang * 2 - 4, h: soffitH },
    facade: { x, y: facadeY, w: facadeW, h: facadeH },
    plinth: { x: x + 3, y: plinthY, w: facadeW - 6, h: plinthH },
    mast: { x: mastX, y: mastY, h: mastH },
    logo: { x: x + 10, y: facadeY + facadeH - 32, s: 22 },
    groundY,
  };
}

/** Stylised utility pole: post, cross-arm, insulators. Drawn from the base up. */
function mastGlyph(
  mast: { x: number; y: number; h: number },
  color: string,
  active: boolean,
  outline: boolean,
): TemplateResult {
  const top = mast.y - mast.h;
  const armY = top + 14;
  const armW = 40;
  const postW = outline ? 3.6 : 3.2;
  const dropW = outline ? 2.2 : 2;
  const glow = active && !outline ? "url(#city-glow)" : "none";
  return svg`<g class="flow-city-mast" filter=${glow}>
    <line x1=${mast.x} y1=${mast.y} x2=${mast.x} y2=${top} stroke=${color} stroke-width=${postW} stroke-linecap="round"/>
    <line x1=${mast.x - armW / 2} y1=${armY} x2=${mast.x + armW / 2} y2=${armY} stroke=${color} stroke-width=${postW} stroke-linecap="round"/>
    <line x1=${mast.x - armW / 2 + 5} y1=${armY} x2=${mast.x - armW / 2 + 5} y2=${armY + 11} stroke=${color} stroke-width=${dropW} stroke-linecap="round"/>
    <line x1=${mast.x + armW / 2 - 5} y1=${armY} x2=${mast.x + armW / 2 - 5} y2=${armY + 11} stroke=${color} stroke-width=${dropW} stroke-linecap="round"/>
    <circle cx=${mast.x - armW / 2 + 5} cy=${armY + 13} r="2.8" fill=${color} opacity=${active ? 0.95 : 0.5}/>
    <circle cx=${mast.x + armW / 2 - 5} cy=${armY + 13} r="2.8" fill=${color} opacity=${active ? 0.95 : 0.5}/>
    <path d=${`M${mast.x - 12} ${mast.y} L${mast.x} ${mast.y - 9} L${mast.x + 12} ${mast.y} Z`} fill=${color} opacity="0.4"/>
  </g>`;
}

/** Window panes = house-load meter (fill sequentially up to inverter power). */
function lightBars(
  facade: { x: number; y: number; w: number; h: number },
): { x: number; y: number; w: number; h: number }[] {
  const bayX = facade.x + facade.w * 0.1;
  const bayW = facade.w * 0.8;
  const bayY = facade.y + facade.h * 0.12;
  const bayH = facade.h * 0.42;
  const pad = 5;
  const gap = 5;
  const inner = bayW - pad * 2 - gap * (LOAD_BARS - 1);
  const barW = Math.max(7, inner / LOAD_BARS);
  const barH = bayH - pad * 2;
  return Array.from({ length: LOAD_BARS }, (_, i) => ({
    x: bayX + pad + i * (barW + gap),
    y: bayY + pad,
    w: barW,
    h: barH,
  }));
}

function hit(
  key: string,
  label: string,
  onSelect: ((key: string) => void) | undefined,
  content: TemplateResult,
): TemplateResult {
  const open = () => onSelect?.(key);
  const keydown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  };
  return svg`<g class="flow-node flow-city-zone" role="button" tabindex="0" aria-label=${label} @click=${open} @keydown=${keydown}>${content}</g>`;
}

export function cityEnergyFlow(i: FlowInput): TemplateResult {
  const consumers = (i.consumers ?? []).slice(0, 6);
  const { included, separate } = splitByMode(consumers);
  const hasSplit = separate.length > 0;
  const g = layout(i.compact, consumers.length + (hasSplit && !i.compact ? 1 : 0));
  const { pv = 0, house = 0, grid = 0, battery = 0 } = i;
  const pvExtra = Math.max(0, i.pvExtra ?? 0);
  const showPvExtra = showPvExtraNode(pvExtra);
  const houseW = Math.max(0, house);
  const loadW = hasSplit ? totalConsumptionW(house, consumers) : houseW;
  const motion = i.motion !== false;
  const outline = i.outline === true;
  const strokeOf = (color: string) => tone(color, outline);
  const t = i.i18n.t;
  const roofGlow = cityRoofGlow(pv + pvExtra);
  const fills = cityLoadFills(loadW, i.loadMax ?? DEFAULT_LOAD_MAX_W);
  const bars = lightBars(g.facade);
  const fillW = cityBasementFill(i.soc, g.plinth.w - 6);
  const gridColor = grid < 0 ? "var(--grid-in)" : "var(--grid-out)";
  const gridLabel = grid < 0 ? t("nodeImport") : t("nodeFeed");
  const batLabel = battery < 0 ? t("nodeBatDischarge") : t("nodeBatCharge");

  const midRoof = { x: g.roof.x + g.roof.w / 2, y: g.roof.y + g.roof.h / 2 };
  const midFacade = { x: g.facade.x + g.facade.w / 2, y: g.facade.y + g.facade.h * 0.45 };
  const midPlinth = { x: g.plinth.x + g.plinth.w / 2, y: g.plinth.y + g.plinth.h / 2 };
  // Riser along the right wall, outside the window bay and the centred load caption.
  const spineX = g.facade.x + g.facade.w - 9;
  const pvTie = { x: spineX, y: g.facade.y + 14 };
  const batHub = { x: spineX, y: g.facade.y + g.facade.h * 0.36 };
  const batFoot = { x: spineX, y: midPlinth.y };
  const batActive = Math.abs(battery) > ACTIVE_W;
  const mastArm = { x: g.mast.x + 16, y: g.mast.y - g.mast.h + 14 };
  // Service drop lands on the left eaves under the PV canopy.
  const houseTie = { x: g.roof.x + 8, y: g.soffit.y + g.soffit.h / 2 };
  const midCableY = (mastArm.y + houseTie.y) / 2 - 8;
  const gridCable = `M${mastArm.x} ${mastArm.y} C${mastArm.x + 24} ${midCableY}, ${houseTie.x - 28} ${houseTie.y - 4}, ${houseTie.x} ${houseTie.y}`;
  const bay = {
    x: g.facade.x + g.facade.w * 0.1,
    y: g.facade.y + g.facade.h * 0.12,
    w: g.facade.w * 0.8,
    h: g.facade.h * 0.42,
  };
  const loadOrigin = { x: g.facade.x + g.facade.w, y: midFacade.y };
  const placesStore = i.consumerPlaces ?? {};
  const customPlaces = hasFreePlaces(placesStore, [
    ...(hasSplit ? ["__house__"] : []),
    ...consumers.map((c) => c.id),
  ]);
  const useFork = Boolean(i.compact && hasSplit && !customPlaces && !i.arrange);
  const useCompactList = i.compact && !hasSplit && !customPlaces && !i.arrange;
  const phone = useFork ? compactSplitGeomFromLoad(loadOrigin, separate.length, included.length) : null;
  // Compact (no split): captions under the plinth, then consumers.
  const compactCaptionY = g.plinth.y + g.plinth.h + 18;
  const compactListY0 = compactCaptionY + 52;
  const compactAt = (index: number) => ({
    x: g.boxW - 40,
    y: compactListY0 + index * 46,
    labelDy: 5,
  });
  const houseDefault = phone
    ? phone.house
    : i.compact
      ? { x: loadOrigin.x + 90, y: loadOrigin.y - 36 }
      : { x: loadOrigin.x + 120, y: loadOrigin.y - 56 };
  const housePos =
    hasSplit && placesStore["__house__"] && "dx" in placesStore["__house__"]
      ? {
          x: loadOrigin.x + (placesStore["__house__"] as ConsumerPlace).dx,
          y: loadOrigin.y + (placesStore["__house__"] as ConsumerPlace).dy,
        }
      : houseDefault;
  const houseDrawR = useFork ? HOUSE_R_COMPACT : i.compact ? COMPACT_LIST_R : HOUSE_R;
  const loadFan = houseFan(loadOrigin, hasSplit ? separate.length : consumers.length);
  const houseFanOpts = houseFan(housePos, included.length);
  const separateResolved = resolveConsumerPositions(
    (hasSplit ? separate : consumers).map((row) => row.id),
    placesStore,
    loadFan,
    (hasSplit ? separate : consumers).map((row) => row.mode),
  );
  const includedResolved = hasSplit
    ? resolveConsumerPositions(
        included.map((row) => row.id),
        placesStore,
        houseFanOpts,
        included.map((row) => row.mode),
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
    if (i.compact) return compactAt(consumers.indexOf(c));
    return { x: fanPt.x, y: fanPt.y, labelDy: 0 };
  };
  const places = hasSplit
    ? [
        ...separate.map((c, index) => ({
          c,
          p: atCompactOrSaved(c, separateResolved[index]!, loadOrigin, phone?.separate[index]),
          joinFrom: loadOrigin,
          dragOrigin: loadOrigin,
        })),
        ...included.map((c, index) => ({
          c,
          p: atCompactOrSaved(c, includedResolved[index]!, housePos, phone?.included[index]),
          joinFrom: housePos,
          dragOrigin: housePos,
        })),
      ]
    : consumers.map((c, index) => ({
        c,
        p: atCompactOrSaved(c, separateResolved[index]!, loadOrigin, undefined),
        joinFrom: loadOrigin,
        dragOrigin: loadOrigin,
      }));
  const separatePlaces = places.filter(({ c }) => c.mode === "separate");
  const includedPlaces = places.filter(({ c }) => c.mode === "included");
  const baseFanH = phone
    ? phone.boxBottom
    : hasSplit
      ? Math.max(
          separate.length ? fanBoxHeight(loadOrigin.y, loadFan, g.boxH) : g.boxH,
          included.length ? fanBoxHeight(housePos.y, houseFanOpts, g.boxH) : g.boxH,
        )
      : consumers.length
        ? fanBoxHeight(midFacade.y, loadFan, g.boxH)
        : g.boxH;
  const extentPts = hasSplit ? [housePos, ...places.map(({ p }) => p)] : places.map(({ p }) => p);
  const freeExtent = freePlaceExtent(
    extentPts,
    g.boxW + (i.compact ? 0 : consumers.length || hasSplit ? fanBoxPad(consumers.length + (hasSplit ? 1 : 0)) : 0),
    baseFanH,
  );
  const contentBottom = places.length || hasSplit
    ? Math.max(
        g.groundY + 20,
        housePos.y + (hasSplit ? houseDrawR + 40 : 0),
        ...places.map(({ p }) => p.y + 44),
      )
    : g.boxH;
  // Clear of the roof slab; caption sits to the right (not above, where it collides with PV).
  const extraGap = i.compact ? 24 : 36;
  const extraNode = showPvExtra
    ? {
        x: g.roof.x + g.roof.w + PV_EXTRA_R + extraGap,
        y: g.roof.y + g.roof.h / 2,
      }
    : { x: 0, y: 0 };
  const extraElbow = { x: extraNode.x, y: pvTie.y };
  const extraPad = showPvExtra ? extraNode.x + PV_EXTRA_R + 78 : 0;
  const boxW = Math.max(
    useFork || useCompactList ? g.boxW : i.compact ? Math.max(g.boxW, freeExtent.w) : freeExtent.w,
    extraPad,
  );
  const boxH = useFork
    ? Math.max(g.mast.y + 56, phone!.boxBottom)
    : useCompactList
      ? places.length
        ? Math.max(g.mast.y + 56, places.at(-1)!.p.y + 40)
        : g.mast.y + 56
      : Math.max(g.boxH, contentBottom, freeExtent.h);
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

  const facadeLabel = hasSplit ? t("nodeLoad") : t("nodeHouse");
  // Phone: Verbrauch caption beside the facade so windows stay clear.
  const loadCapX = i.compact ? g.facade.x + g.facade.w + 10 : midFacade.x;
  const loadCapAnchor = i.compact ? "start" : "middle";
  const loadCapValY = i.compact ? midFacade.y - 4 : bars[0].y + bars[0].h + 34;
  const loadCapLblY = i.compact ? midFacade.y + 14 : bars[0].y + bars[0].h + 50;
  const aria = [
    `${t("nodePv")} ${i.fmt.w(pv)}`,
    ...(showPvExtra ? [`${t("nodePvExtra")} ${i.fmt.w(pvExtra)}`] : []),
    `${facadeLabel} ${i.fmt.w(loadW)}`,
    ...(hasSplit ? [`${t("nodeHouse")} ${i.fmt.w(houseW)}`] : []),
    `${gridLabel} ${i.fmt.w(grid)}`,
    `${batLabel} ${i.fmt.w(battery)}`,
    ...places.map(({ c }) => `${c.name} ${i.fmt.w(c.watts)}`),
  ].join(", ");

  const facadeFill = outline ? "none" : "rgba(16,22,36,.9)";
  const shellStroke = outline ? 1.8 : 1.4;
  const cols = 5;
  const rows = 2;

  return svg`<svg viewBox="0 0 ${boxW} ${boxH}" preserveAspectRatio="xMidYMid meet" role="img" aria-label=${aria}>
    <defs>
      <filter id="city-glow"><feGaussianBlur stdDeviation="4.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <filter id="city-soft"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/></feMerge></filter>
      <linearGradient id="city-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="var(--pv)" stop-opacity=${(roofGlow * 0.2).toFixed(2)}/>
        <stop offset="70%" stop-color="var(--fill, #0a101e)" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="city-roof" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="var(--pv)" stop-opacity=${(roofGlow * 0.85).toFixed(2)}/>
        <stop offset="100%" stop-color="var(--pv)" stop-opacity=${(roofGlow * 0.5).toFixed(2)}/>
      </linearGradient>
      <linearGradient id="city-glass" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="var(--house)" stop-opacity="0.14"/>
        <stop offset="55%" stop-color="rgba(148,163,184,.06)"/>
        <stop offset="100%" stop-color="var(--house)" stop-opacity="0.08"/>
      </linearGradient>
      <linearGradient id="city-plinth" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="var(--bat)" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="var(--bat)" stop-opacity="0.35"/>
      </linearGradient>
      <clipPath id="city-roof-clip">
        <rect x=${g.roof.x + 2} y=${g.roof.y + 2} width=${g.roof.w - 4} height=${g.roof.h - 4} rx="3"/>
      </clipPath>
      <clipPath id="city-plinth-clip">
        <rect x=${g.plinth.x + 2} y=${g.plinth.y + 2} width=${g.plinth.w - 4} height=${g.plinth.h - 4} rx="1.5"/>
      </clipPath>
      ${bars.map((bar, index) => svg`<clipPath id=${`city-bar-${index}`}><rect x=${bar.x} y=${bar.y} width=${bar.w} height=${bar.h} rx="2"/></clipPath>`)}
    </defs>

    <rect x="0" y="0" width=${g.boxW} height=${g.roof.y + 36} fill="url(#city-sky)"/>
    <ellipse cx=${midRoof.x} cy=${g.roof.y + 6} rx=${g.roof.w * 0.34} ry="18" fill="var(--pv)" opacity=${(roofGlow * 0.14).toFixed(2)} filter="url(#city-soft)"/>
    <line x1=${g.mast.x - 18} y1=${g.groundY} x2=${g.plinth.x + g.plinth.w + 28} y2=${g.groundY} stroke="rgba(148,163,184,.3)" stroke-width="1.6" stroke-linecap="round"/>

    <path
      class="flow-line"
      d=${gridCable}
      stroke=${strokeOf(gridColor)}
      opacity=${Math.abs(grid) > ACTIVE_W ? 0.45 : 0.22}
    />

    ${hit(
      "pv",
      t("nodePv"),
      i.onSelect,
      svg`<rect class="flow-city-roof" x=${g.roof.x} y=${g.roof.y} width=${g.roof.w} height=${g.roof.h} rx="4" fill=${outline ? "none" : "rgba(10,16,28,.92)"} stroke=${strokeOf("var(--pv)")} stroke-width=${shellStroke} stroke-opacity=${pv > ACTIVE_W || outline ? 1 : 0.45} filter=${pv > ACTIVE_W && !outline ? "url(#city-glow)" : "none"}/>
        <rect x=${g.roof.x + 2} y=${g.roof.y + 2} width=${g.roof.w - 4} height=${g.roof.h - 4} rx="3" fill="url(#city-roof)"/>
        <g clip-path="url(#city-roof-clip)">
          ${Array.from({ length: cols + 1 }, (_, n) => {
            const x = g.roof.x + 6 + ((g.roof.w - 12) * n) / cols;
            return svg`<line x1=${x} y1=${g.roof.y + 4} x2=${x} y2=${g.roof.y + g.roof.h - 4} stroke="rgba(255,255,255,.18)" stroke-width="1"/>`;
          })}
          ${Array.from({ length: rows + 1 }, (_, n) => {
            const y = g.roof.y + 5 + ((g.roof.h - 10) * n) / rows;
            return svg`<line x1=${g.roof.x + 5} y1=${y} x2=${g.roof.x + g.roof.w - 5} y2=${y} stroke="rgba(255,255,255,.14)" stroke-width="1"/>`;
          })}
        </g>
        <rect x=${g.soffit.x} y=${g.soffit.y} width=${g.soffit.w} height=${g.soffit.h} fill=${outline ? "none" : "rgba(8,12,22,.85)"} stroke=${strokeOf("var(--pv)")} stroke-width="1" opacity="0.85"/>
        <text class="node-val" x=${midRoof.x} y=${g.roof.y - 18} text-anchor="middle">${i.fmt.w(pv)}</text>
        <text class="node-lbl" x=${midRoof.x} y=${g.roof.y - 2} text-anchor="middle">${t("nodePv")}</text>`,
    )}
    ${showPvExtra
      ? svg`<path class="flow-line" d=${`M${extraNode.x} ${extraNode.y} L${extraElbow.x} ${extraElbow.y} L${pvTie.x} ${pvTie.y}`} stroke="var(--pv-extra)" opacity=${pvExtra > ACTIVE_W ? 0.45 : 0.22} fill="none"/>
        ${electrons(extraNode, extraElbow, PV_EXTRA_R, 0, pvExtra, "var(--pv-extra)", motion)}
        ${electrons(extraElbow, pvTie, 0, 4, pvExtra, "var(--pv-extra)", motion)}
        ${hit(
          "pvExtra",
          t("nodePvExtra"),
          i.onSelect,
          svg`<g opacity=${pvExtra > ACTIVE_W ? 1 : 0.55}>
            <circle cx=${extraNode.x} cy=${extraNode.y} r=${PV_EXTRA_R} fill=${outline ? "none" : "rgba(10,16,28,.92)"} stroke=${strokeOf("var(--pv-extra)")} stroke-width=${shellStroke} filter=${pvExtra > ACTIVE_W && !outline ? "url(#city-glow)" : "none"}/>
            <text class="node-val" x=${extraNode.x + PV_EXTRA_R + 10} y=${extraNode.y - 4} text-anchor="start">${i.fmt.w(pvExtra)}</text>
            <text class="node-lbl" x=${extraNode.x + PV_EXTRA_R + 10} y=${extraNode.y + 14} text-anchor="start">${t("nodePvExtra")}</text>
          </g>`,
        )}`
      : svg``}
    <circle cx=${houseTie.x} cy=${houseTie.y} r="3" fill=${strokeOf(gridColor)} opacity=${Math.abs(grid) > ACTIVE_W ? 0.9 : 0.45}/>

    ${hit(
      hasSplit ? "load" : "house",
      facadeLabel,
      i.onSelect,
      svg`<rect class="flow-city-body" x=${g.facade.x} y=${g.facade.y} width=${g.facade.w} height=${g.facade.h} rx="2" fill=${facadeFill} stroke=${strokeOf("var(--house)")} stroke-width=${shellStroke}/>
        <rect x=${g.facade.x + 1} y=${g.facade.y + 1} width=${g.facade.w - 2} height=${g.facade.h - 2} rx="1.5" fill="url(#city-glass)"/>
        <rect x=${bay.x} y=${bay.y} width=${bay.w} height=${bay.h} rx="2" fill="rgba(8,12,22,.55)" stroke="rgba(148,163,184,.28)" stroke-width="1.2"/>
        ${bars.map((bar, index) => {
          const fill = fills[index] ?? 0;
          const fillH = bar.h * fill;
          const fillY = bar.y + bar.h - fillH;
          return svg`<g>
            <rect x=${bar.x} y=${bar.y} width=${bar.w} height=${bar.h} rx="2" fill="rgba(148,163,184,.2)" opacity="0.35"/>
            ${fill > 0.005
              ? svg`<rect clip-path=${`url(#city-bar-${index})`} x=${bar.x} y=${fillY} width=${bar.w} height=${fillH} fill="var(--house)" opacity=${(0.55 + 0.4 * fill).toFixed(2)} filter=${!outline ? "url(#city-glow)" : "none"}/>`
              : svg``}
            ${index < LOAD_BARS - 1
              ? svg`<line x1=${bar.x + bar.w + 2.5} y1=${bay.y + 3} x2=${bar.x + bar.w + 2.5} y2=${bay.y + bay.h - 3} stroke="rgba(148,163,184,.22)" stroke-width="1"/>`
              : svg``}
          </g>`;
        })}`,
    )}

    <image href=${maestroLogo} x=${g.logo.x} y=${g.logo.y} width=${g.logo.s} height=${g.logo.s} opacity="0.65" style="pointer-events:none" aria-label="Maestro"/>

    ${hit(
      "bat",
      batLabel,
      i.onSelect,
      svg`<rect class="flow-city-cellar" x=${g.plinth.x} y=${g.plinth.y} width=${g.plinth.w} height=${g.plinth.h} rx="1.5" fill=${outline ? "none" : "rgba(8,12,20,.94)"} stroke=${strokeOf("var(--bat)")} stroke-width=${shellStroke} filter=${Math.abs(battery) > ACTIVE_W && !outline ? "url(#city-glow)" : "none"}/>
        <rect clip-path="url(#city-plinth-clip)" x=${g.plinth.x + 2} y=${g.plinth.y + 2} width=${fillW} height=${g.plinth.h - 4} fill="url(#city-plinth)"/>
        ${i.compact
          ? svg`<text class="node-val-sm" x=${midPlinth.x} y=${compactCaptionY} text-anchor="middle">${i.fmt.w(battery)}</text>
            <text class="node-lbl-sm" x=${midPlinth.x} y=${compactCaptionY + 14} text-anchor="middle">${batLabel}</text>`
          : svg`<text class="node-val-sm" x=${g.plinth.x - 14} y=${midPlinth.y - 12} text-anchor="end">${i.fmt.w(battery)}</text>
            <text class="node-lbl-sm" x=${g.plinth.x - 14} y=${midPlinth.y + 3} text-anchor="end">${batLabel}</text>`}`,
    )}

    ${hit(
      "grid",
      gridLabel,
      i.onSelect,
      svg`<rect x=${g.mast.x - 28} y=${g.mast.y - g.mast.h - 4} width="56" height=${g.mast.h + 44} fill="transparent"/>
        ${mastGlyph(g.mast, strokeOf(gridColor), Math.abs(grid) > ACTIVE_W, outline)}
        <text class="node-val-sm" x=${g.mast.x} y=${i.compact ? compactCaptionY : g.mast.y + 20} text-anchor="middle">${i.fmt.w(grid)}</text>
        <text class="node-lbl-sm" x=${g.mast.x} y=${i.compact ? compactCaptionY + 14 : g.mast.y + 34} text-anchor="middle">${gridLabel}</text>`,
    )}

    <path
      class="flow-line"
      d=${`M${batFoot.x} ${batFoot.y} L${batHub.x} ${batHub.y}`}
      stroke=${strokeOf("var(--bat)")}
      opacity=${batActive ? 0.5 : 0.18}
    />
    ${pv > ACTIVE_W
      ? svg`<path class="flow-line" d=${`M${midRoof.x} ${midRoof.y} L${pvTie.x} ${pvTie.y}`} stroke=${strokeOf("var(--pv)")} opacity="0.45"/>
          ${electrons(midRoof, pvTie, 2, 2, pv, strokeOf("var(--pv)"), motion)}`
      : svg``}
    ${loadW > ACTIVE_W && battery > ACTIVE_W ? electrons(batHub, batFoot, 2, 2, Math.min(loadW, battery), strokeOf("var(--bat)"), motion) : svg``}
    ${battery < -ACTIVE_W ? electrons(batFoot, batHub, 2, 2, Math.abs(battery), strokeOf("var(--bat)"), motion) : svg``}
    ${grid < -ACTIVE_W ? electrons(mastArm, houseTie, 4, 4, Math.abs(grid), strokeOf("var(--grid-in)"), motion) : svg``}
    ${grid > ACTIVE_W ? electrons(houseTie, mastArm, 4, 4, grid, strokeOf("var(--grid-out)"), motion) : svg``}

    ${useFork && phone
      ? compactSplitForkLinks({
          load: loadOrigin,
          loadR: 4,
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
        ? svg`<path class="flow-line" d=${flowSegment(loadOrigin, housePos, 4, houseDrawR)} stroke=${strokeOf("var(--house)")} opacity=${houseW > ACTIVE_W ? 0.45 : 0.22}/>
          ${electrons(loadOrigin, housePos, 4, houseDrawR, houseW, strokeOf("var(--house)"), motion)}`
        : svg``}

    ${hasSplit
      ? svg`<g class="flow-node ${i.arrange ? "arrange" : ""}" opacity=${houseW < ACTIVE_W ? 0.55 : 1} role="button" tabindex="0" aria-label=${t("nodeHouse")}
            @click=${() => { if (!i.arrange) i.onSelect?.("house"); }}
            @keydown=${(e: KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); if (!i.arrange) i.onSelect?.("house"); } }}
            @pointerdown=${(e: PointerEvent) => onConsumerDrag(e, "__house__", loadOrigin, i.arrange, i.onPlaceConsumer, dragBoundsLoad)}
          >
            <circle cx=${housePos.x} cy=${housePos.y} r=${houseDrawR} fill=${outline ? "none" : "rgba(10,16,30,.9)"} stroke=${strokeOf("var(--house)")} stroke-width=${outline ? (useFork || i.compact ? "2.2" : "2.4") : "2"} filter=${houseW < ACTIVE_W || outline || (i.compact && !useFork) ? "none" : "url(#city-glow)"}/>
            <g transform=${iconTransform(housePos.x, housePos.y, iconFit(houseDrawR))} fill="none" stroke=${strokeOf("var(--house)")} stroke-width=${ICON_STROKE} stroke-linecap="round" stroke-linejoin="round">
              <path d=${HOUSE_ICON} vector-effect="non-scaling-stroke"/>
            </g>
            ${useFork
              ? svg`<text class="node-val-sm" x=${housePos.x} y=${housePos.y + 42} text-anchor="middle">${i.fmt.w(houseW)}</text>
                <text class="node-lbl-sm" x=${housePos.x} y=${housePos.y + 58} text-anchor="middle">${t("nodeHouse")}</text>`
              : i.compact
                ? svg`<text font-size="14" font-weight="700" fill="var(--text)" x=${housePos.x - 26} y=${housePos.y + 5} text-anchor="end">${i.fmt.w(houseW)}  ${t("nodeHouse")}</text>`
                : svg`<text class="node-val-sm" x=${housePos.x} y=${housePos.y + 48} text-anchor="middle">${i.fmt.w(houseW)}</text>
                  <text class="node-lbl-sm" x=${housePos.x} y=${housePos.y + 64} text-anchor="middle">${t("nodeHouse")}</text>`}
          </g>`
      : svg``}

    ${useCompactList ? compactBuses(places, loadOrigin, boxW, motion) : svg``}

    <g style="pointer-events:none">
      <text class=${i.compact ? "node-val-sm" : "node-val"} x=${loadCapX} y=${loadCapValY} text-anchor=${loadCapAnchor}>${i.fmt.w(loadW)}</text>
      <text class="node-lbl-sm" x=${loadCapX} y=${loadCapLblY} text-anchor=${loadCapAnchor}>${facadeLabel}</text>
    </g>

    ${places.map(({ c, p, joinFrom, dragOrigin }) => {
      const color = strokeOf(c.mode === "included" ? "var(--house)" : "var(--accent)");
      const idle = c.missing || Math.abs(c.watts) < ACTIVE_W;
      const open = () => {
        if (!i.arrange) i.onSelect?.(c.id);
      };
      const key = (e: KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      };
      const bounds = c.mode === "included" && hasSplit ? dragBoundsHouse : dragBoundsLoad;
      const drag = (e: PointerEvent) => onConsumerDrag(e, c.id, dragOrigin, i.arrange, i.onPlaceConsumer, bounds);
      const join =
        hasSplit && c.mode === "included"
          ? joinFrom
          : {
              x: joinFrom.x,
              y: Math.min(Math.max(p.y, g.facade.y + 24), g.facade.y + g.facade.h - 24),
            };
      if (i.compact) {
        return svg`<g class="flow-node ${i.arrange ? "arrange" : ""}" opacity=${idle ? 0.55 : 1} role="button" tabindex="0" aria-label=${c.name} @click=${open} @keydown=${key} @pointerdown=${drag}>
          ${useCompactList || useFork
            ? svg``
            : svg`<path class="flow-line" d=${flowSegment(joinFrom, p, 0, COMPACT_LIST_R)} stroke=${color}/>
              ${electrons(joinFrom, p, 0, COMPACT_LIST_R, c.watts, color, motion)}`}
          <circle cx=${p.x} cy=${p.y} r=${COMPACT_LIST_R} fill=${outline ? "none" : "rgba(10,16,30,.9)"} stroke=${color} stroke-width=${outline ? "2.2" : "2"}/>
          <g transform=${iconTransform(p.x, p.y, iconFit(COMPACT_LIST_R))} fill="none" stroke=${color} stroke-width=${ICON_STROKE} stroke-linecap="round" stroke-linejoin="round"><path d=${CONSUMER_ICON_PATH[c.icon]} vector-effect="non-scaling-stroke"/></g>
          <text font-size="14" font-weight="700" fill="var(--text)" x=${p.x - 26} y=${p.y + 5} text-anchor="end">${i.fmt.w(c.watts)}  ${clip(c.name, 24)}</text>
        </g>`;
      }
      return svg`<g class="flow-node ${i.arrange ? "arrange" : ""}" opacity=${idle ? 0.55 : 1} role="button" tabindex="0" aria-label=${c.name} @click=${open} @keydown=${key} @pointerdown=${drag}>
        <path class="flow-line" d=${`M${join.x} ${join.y} C${join.x + 28} ${join.y}, ${p.x - 36} ${p.y}, ${p.x - CONSUMER_R} ${p.y}`} stroke=${color}/>
        ${electrons(join, p, 0, CONSUMER_R, c.watts, color, motion)}
        <circle cx=${p.x} cy=${p.y} r="26" fill=${outline ? "none" : "rgba(10,16,30,.9)"} stroke=${color} stroke-width=${outline ? "2.4" : "2"} filter=${idle || outline ? "none" : "url(#city-glow)"}/>
        <g transform=${iconTransform(p.x, p.y, iconFit(CONSUMER_R))} fill="none" stroke=${color} stroke-width=${ICON_STROKE} stroke-linecap="round" stroke-linejoin="round"><path d=${CONSUMER_ICON_PATH[c.icon]} vector-effect="non-scaling-stroke"/></g>
        <text class="node-val-sm" x=${p.x + 36} y=${p.y - 2} text-anchor="start">${i.fmt.w(c.watts)}</text>
        <text class="node-lbl-sm" x=${p.x + 36} y=${p.y + 14} text-anchor="start">${clip(c.name, 18)}</text>
      </g>`;
    })}
  </svg>`;
}

