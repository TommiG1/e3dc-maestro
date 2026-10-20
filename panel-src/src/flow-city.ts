import { svg, type TemplateResult } from "lit";
import {
  fanBoxHeight,
  fanBoxPad,
  houseFan,
  onConsumerDrag,
  resolveConsumerPositions,
} from "./consumer-layout";
import { CONSUMER_ICON_PATH } from "./consumers";
import { compactBuses, electronCount, electronSpeed, flowEnds, iconFit, type FlowInput } from "./flow";
import maestroLogo from "./maestro-logo.png";

const ACTIVE_W = 30;
const CONSUMER_R = 26;
const COMPACT_LIST_R = 16;
const ICON_BOX = 24;
const ICON_STROKE = 2.15;
/** Fallback when Maestro WR-Leistung is unavailable (matches DEFAULT_INVERTER_POWER). */
const DEFAULT_LOAD_MAX_W = 12000;
const LOAD_BARS = 6;
const PV_W = 6000;

const OUTLINE: Record<string, string> = {
  "var(--pv)": "#9a3412",
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
  const side = consumerCount ? fanBoxPad(consumerCount) : 0;
  return {
    boxW: boxW + side,
    boxH: Math.max(440, mastY + 72),
    roof: { x: x - overhang, y: roofY, w: facadeW + overhang * 2, h: roofH },
    soffit: { x: x - overhang + 2, y: roofY + roofH, w: facadeW + overhang * 2 - 4, h: soffitH },
    facade: { x, y: facadeY, w: facadeW, h: facadeH },
    plinth: { x: x + 3, y: plinthY, w: facadeW - 6, h: plinthH },
    mast: { x: mastX, y: mastY, h: mastH },
    logo: { x: x + 10, y: facadeY + facadeH - 32, s: 22 },
    groundY: plinthY + plinthH + 3,
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
  const g = layout(i.compact, consumers.length);
  const { pv = 0, house = 0, grid = 0, battery = 0 } = i;
  const motion = i.motion !== false;
  const outline = i.outline === true;
  const strokeOf = (color: string) => tone(color, outline);
  const t = i.i18n.t;
  const roofGlow = cityRoofGlow(pv);
  const fills = cityLoadFills(house, i.loadMax ?? DEFAULT_LOAD_MAX_W);
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
  const loadLabelX = midFacade.x;
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
  const fanOrigin = { x: g.facade.x + g.facade.w, y: midFacade.y };
  const fan = houseFan(fanOrigin, consumers.length);
  const fanPlaces = i.compact
    ? []
    : resolveConsumerPositions(
        consumers.map((row) => row.id),
        i.consumerPlaces ?? {},
        fan,
      );

  // Compact: captions under the plinth, then the consumer list (clear of the mast).
  const compactCaptionY = g.plinth.y + g.plinth.h + 18;
  const compactListY0 = compactCaptionY + 52;
  const places = consumers.map((c, index) => {
    if (i.compact) {
      return {
        c,
        p: {
          x: g.boxW - 40,
          y: compactListY0 + index * 46,
          labelDy: 5,
        },
      };
    }
    return {
      c,
      p: {
        x: fanPlaces[index].x,
        y: fanPlaces[index].y,
        labelDy: 0,
      },
    };
  });
  const boxH = i.compact
    ? places.length
      ? places.at(-1)!.p.y + 40
      : g.mast.y + 56
    : consumers.length
      ? fanBoxHeight(midFacade.y, fan, g.boxH)
      : g.boxH;

  const aria = [
    `${t("nodePv")} ${i.fmt.w(pv)}`,
    `${t("nodeHouse")} ${i.fmt.w(house)}`,
    `${gridLabel} ${i.fmt.w(grid)}`,
    `${batLabel} ${i.fmt.w(battery)}`,
    ...places.map(({ c }) => `${c.name} ${i.fmt.w(c.watts)}`),
  ].join(", ");

  const facadeFill = outline ? "none" : "rgba(16,22,36,.9)";
  const shellStroke = outline ? 1.8 : 1.4;
  const cols = 5;
  const rows = 2;

  return svg`<svg viewBox="0 0 ${g.boxW} ${boxH}" preserveAspectRatio="xMidYMid meet" role="img" aria-label=${aria}>
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
    <circle cx=${houseTie.x} cy=${houseTie.y} r="3" fill=${strokeOf(gridColor)} opacity=${Math.abs(grid) > ACTIVE_W ? 0.9 : 0.45}/>

    ${hit(
      "house",
      t("nodeHouse"),
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
    ${house > ACTIVE_W && battery > ACTIVE_W ? electrons(batHub, batFoot, 2, 2, Math.min(house, battery), strokeOf("var(--bat)"), motion) : svg``}
    ${battery < -ACTIVE_W ? electrons(batFoot, batHub, 2, 2, Math.abs(battery), strokeOf("var(--bat)"), motion) : svg``}
    ${grid < -ACTIVE_W ? electrons(mastArm, houseTie, 4, 4, Math.abs(grid), strokeOf("var(--grid-in)"), motion) : svg``}
    ${grid > ACTIVE_W ? electrons(houseTie, mastArm, 4, 4, grid, strokeOf("var(--grid-out)"), motion) : svg``}

    ${i.compact ? compactBuses(places, { x: g.facade.x + g.facade.w, y: midFacade.y }, g.boxW, motion) : svg``}

    <g style="pointer-events:none">
      <text class="node-lbl-sm" x=${loadLabelX} y=${bars[0].y + bars[0].h + 14} text-anchor="middle" opacity="0.75">${t("flowCityLoad")}</text>
      <text class="node-val" x=${loadLabelX} y=${bars[0].y + bars[0].h + 34} text-anchor="middle">${i.fmt.w(house)}</text>
      <text class="node-lbl" x=${loadLabelX} y=${bars[0].y + bars[0].h + 50} text-anchor="middle">${t("nodeHouse")}</text>
    </g>

    ${places.map(({ c, p }) => {
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
      const drag = (e: PointerEvent) => onConsumerDrag(e, c.id, fan, i.arrange, i.onPlaceConsumer);
      const join = { x: g.facade.x + g.facade.w, y: Math.min(Math.max(p.y, g.facade.y + 24), g.facade.y + g.facade.h - 24) };
      if (i.compact) {
        return svg`<g class="flow-node" opacity=${idle ? 0.55 : 1} role="button" tabindex="0" aria-label=${c.name} @click=${open} @keydown=${key}>
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

/** CSS height hint for the city flow card. */
export function cityFlowBoxHeight(compact: boolean, count: number): number | undefined {
  const g = layout(compact, count);
  if (compact) {
    const captionY = g.plinth.y + g.plinth.h + 18;
    if (!count) return Math.round((captionY + 40) * 0.94);
    const lastY = captionY + 52 + (count - 1) * 46;
    return Math.round((lastY + 40) * 0.94);
  }
  if (!count) return Math.round(g.boxH * 0.95);
  const origin = { x: g.facade.x + g.facade.w, y: g.facade.y + g.facade.h * 0.45 };
  const fan = houseFan(origin, count);
  return Math.round(fanBoxHeight(origin.y, fan, g.boxH) * 0.95);
}
