import { svg, type TemplateResult } from "lit";
import { CONSUMER_ICON_PATH, type FlowConsumer } from "./consumers";
import type { Fmt } from "./format";
import type { I18n } from "./i18n";

export interface FlowInput {
  pv?: number;
  house?: number;
  grid?: number; // negative = import
  battery?: number; // negative = discharging
  consumers?: FlowConsumer[];
  /** False when the user prefers reduced motion: the soft line stays, particles do not. */
  motion?: boolean;
  onSelect?: (key: string) => void;
  compact: boolean;
  /** Classic look: node discs and icons are stroked, not filled. */
  outline?: boolean;
  fmt: Fmt;
  i18n: I18n;
}

const ICONS = {
  pv: "M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
  grid: "M12 2 7 22M12 2l5 20M5 9h14M4 15h16",
  house: "M3 11 12 3l9 8M5 9.5V21h14V9.5M10 21v-6h4v6",
  bat: "M7 6h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zM10 3h4M9 13h6",
};

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

const ACTIVE_W = 30;
const NODE_R = 42;
const HUB_R = 16;
const CONSUMER_R = 26;

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

const clip = (name: string) => (name.length <= 16 ? name : `${name.slice(0, 15)}…`);

/** Darker than the night-theme inks, so a stroke still reads on the light Classic surface. */
const OUTLINE: Record<string, string> = {
  "var(--pv)": "#9a3412",
  "var(--house)": "#5b21b6",
  "var(--grid-in)": "#b91c1c",
  "var(--grid-out)": "#047857",
  "var(--bat)": "#0e7490",
  "var(--accent)": "#075985",
};

const tone = (color: string, outline: boolean) => (outline ? (OUTLINE[color] ?? "#152033") : color);

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

/** CSS height for the flow card. Undefined keeps the stylesheet default. */
export function flowBoxHeight(compact: boolean, count: number): number | undefined {
  if (!count) return undefined;
  return compact ? 500 + count * 52 : Math.round((380 * Math.max(420, 48 + count * 96)) / 420);
}

export function energyFlow(i: FlowInput): TemplateResult {
  const consumers = (i.consumers ?? []).slice(0, 6);
  const L = i.compact ? LAYOUTS.compact : LAYOUTS.wide;
  const boxW = L.box[0] + (!i.compact && consumers.length ? 160 : 0);
  const boxH = i.compact
    ? L.box[1] + consumers.length * 58 + (consumers.length ? 12 : 0)
    : Math.max(L.box[1], 48 + consumers.length * 96);
  const consumerAt = (index: number): Pos =>
    i.compact
      ? { x: L.hub.x, y: L.box[1] + 8 + index * 58, labelDy: 40 }
      : { x: L.box[0] + 78, y: boxH * ((index + 1) / (consumers.length + 1)), labelDy: 44 };
  const { pv = 0, house = 0, grid = 0, battery = 0 } = i;
  const motion = i.motion !== false;
  const outline = i.outline === true;
  const strokeOf = (color: string) => tone(color, outline);
  const t = i.i18n.t;
  const nodes: Record<NodeKey, { color: string; label: string; value: number; icon: string }> = {
    pv: { color: "var(--pv)", label: t("nodePv"), value: pv, icon: ICONS.pv },
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
  if (pv > ACTIVE_W) flows.push({ node: "pv", toHub: true });
  if (battery < -ACTIVE_W) flows.push({ node: "bat", toHub: true });
  if (battery > ACTIVE_W) flows.push({ node: "bat", toHub: false });
  if (grid < -ACTIVE_W) flows.push({ node: "grid", toHub: true });
  if (grid > ACTIVE_W) flows.push({ node: "grid", toHub: false });
  if (house > ACTIVE_W) flows.push({ node: "house", toHub: false });

  const keys: NodeKey[] = ["pv", "grid", "house", "bat"];
  const places = consumers.map((c, index) => ({ c, p: consumerAt(index) }));
  const aria = [
    ...keys.map((k) => `${nodes[k].label} ${i.fmt.w(nodes[k].value)}`),
    ...places.map(({ c }) => `${c.name} ${i.fmt.w(c.watts)}`),
  ].join(", ");
  return svg`<svg viewBox="0 0 ${boxW} ${boxH}" preserveAspectRatio="xMidYMid meet" role="img" aria-label=${aria}>
    <defs>
      <filter id="glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <radialGradient id="hubg"><stop offset="0" stop-color="rgba(56,189,248,.5)"/><stop offset="1" stop-color="rgba(56,189,248,0)"/></radialGradient>
    </defs>
    ${keys.map((k) => svg`<path class="flow-line" d=${flowSegment(L[k], L.hub, NODE_R, HUB_R)} stroke=${nodes[k].color}/>`)}
    ${places.map(({ c, p }) => {
      const from = c.mode === "included" ? L.house : L.hub;
      const fromR = c.mode === "included" ? NODE_R : HUB_R;
      const color = c.mode === "included" ? "var(--house)" : "var(--accent)";
      return svg`<path class="flow-line" d=${flowSegment(from, p, fromR, CONSUMER_R)} stroke=${color}/>
        ${electrons(from, p, fromR, CONSUMER_R, c.watts, color, motion)}`;
    })}
    ${flows.map((f) => {
      const a = f.toHub ? L[f.node] : L.hub;
      const b = f.toHub ? L.hub : L[f.node];
      const fromR = f.toHub ? NODE_R : HUB_R;
      const toR = f.toHub ? HUB_R : NODE_R;
      return electrons(a, b, fromR, toR, nodes[f.node].value, nodes[f.node].color, motion);
    })}
    ${outline
      ? svg`<circle cx=${L.hub.x} cy=${L.hub.y} r="16" fill="none" stroke="#075985" stroke-width="2.4"/>`
      : svg`<circle cx=${L.hub.x} cy=${L.hub.y} r="46" fill="url(#hubg)"/><circle cx=${L.hub.x} cy=${L.hub.y} r="9" fill="#fff" opacity=".9"/>`}
    ${keys.map((k) => {
      const n = nodes[k];
      const p = L[k];
      const idle = Math.abs(n.value) < ACTIVE_W;
      const above = p.labelDy < 0;
      return svg`<g class="flow-node" opacity=${idle ? 0.55 : 1} role="button" tabindex="0" aria-label=${n.label} @click=${() => i.onSelect?.(k)} @keydown=${(e: KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); i.onSelect?.(k); } }}>
        <circle cx=${p.x} cy=${p.y} r="42" fill=${outline ? "none" : "rgba(10,16,30,.9)"} stroke=${strokeOf(n.color)} stroke-width=${outline ? "2.4" : "2"} filter=${idle || outline ? "none" : "url(#glow)"}/>
        <g transform="translate(${p.x - 13} ${p.y - 13}) scale(1.08)" fill="none" stroke=${strokeOf(n.color)} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d=${n.icon}/></g>
        <text class="node-val" x=${p.x} y=${p.y + p.labelDy} text-anchor="middle">${i.fmt.w(n.value)}</text>
        <text class="node-lbl" x=${p.x} y=${p.y + p.labelDy + (above ? 19 : 18)} text-anchor="middle">${n.label}</text>
      </g>`;
    })}
    ${places.map(({ c, p }) => {
      const color = strokeOf(c.mode === "included" ? "var(--house)" : "var(--accent)");
      const idle = c.missing || Math.abs(c.watts) < ACTIVE_W;
      return svg`<g class="flow-node" opacity=${idle ? 0.55 : 1} role="button" tabindex="0" aria-label=${c.name} @click=${() => i.onSelect?.(c.id)} @keydown=${(e: KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); i.onSelect?.(c.id); } }}>
        <circle cx=${p.x} cy=${p.y} r="26" fill=${outline ? "none" : "rgba(10,16,30,.9)"} stroke=${color} stroke-width=${outline ? "2.4" : "2"} filter=${idle || outline ? "none" : "url(#glow)"}/>
        <g transform="translate(${p.x - 9} ${p.y - 9}) scale(0.75)" fill="none" stroke=${color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d=${CONSUMER_ICON_PATH[c.icon]}/></g>
        <text class="node-val-sm" x=${p.x} y=${p.y + p.labelDy} text-anchor="middle">${i.fmt.w(c.watts)}</text>
        <text class="node-lbl-sm" x=${p.x} y=${p.y + p.labelDy + 14} text-anchor="middle">${clip(c.name)}</text>
      </g>`;
    })}
  </svg>`;
}
