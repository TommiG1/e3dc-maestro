import { svg, type TemplateResult } from "lit";
import type { Fmt } from "./format";
import type { I18n } from "./i18n";

export interface FlowInput {
  pv?: number;
  house?: number;
  grid?: number; // negative = import
  battery?: number; // negative = discharging
  compact: boolean;
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

export function energyFlow(i: FlowInput): TemplateResult {
  const L = i.compact ? LAYOUTS.compact : LAYOUTS.wide;
  const { pv = 0, house = 0, grid = 0, battery = 0 } = i;
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
  return svg`<svg viewBox="0 0 ${L.box[0]} ${L.box[1]}" preserveAspectRatio="xMidYMid meet" role="img"
      aria-label=${keys.map((k) => `${nodes[k].label} ${i.fmt.w(nodes[k].value)}`).join(", ")}>
    <defs>
      <filter id="glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <radialGradient id="hubg"><stop offset="0" stop-color="rgba(56,189,248,.5)"/><stop offset="1" stop-color="rgba(56,189,248,0)"/></radialGradient>
    </defs>
    ${keys.map((k) => svg`<path class="flow-line" d="M${L[k].x} ${L[k].y} L${L.hub.x} ${L.hub.y}" stroke=${nodes[k].color}/>`)}
    ${flows.map((f) => {
      const a = f.toHub ? L[f.node] : L.hub;
      const b = f.toHub ? L.hub : L[f.node];
      return svg`<path class="flow-anim" d="M${a.x} ${a.y} L${b.x} ${b.y}" stroke=${nodes[f.node].color} filter="url(#glow)"/>`;
    })}
    <circle cx=${L.hub.x} cy=${L.hub.y} r="46" fill="url(#hubg)"/>
    <circle cx=${L.hub.x} cy=${L.hub.y} r="9" fill="#fff" opacity=".9"/>
    ${keys.map((k) => {
      const n = nodes[k];
      const p = L[k];
      const idle = Math.abs(n.value) < ACTIVE_W;
      const above = p.labelDy < 0;
      return svg`<g opacity=${idle ? 0.55 : 1}>
        <circle cx=${p.x} cy=${p.y} r="42" fill="rgba(10,16,30,.9)" stroke=${n.color} stroke-width="2" filter=${idle ? "none" : "url(#glow)"}/>
        <g transform="translate(${p.x - 13} ${p.y - 13}) scale(1.08)" fill="none" stroke=${n.color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d=${n.icon}/></g>
        <text class="node-val" x=${p.x} y=${p.y + p.labelDy} text-anchor="middle">${i.fmt.w(n.value)}</text>
        <text class="node-lbl" x=${p.x} y=${p.y + p.labelDy + (above ? 19 : 18)} text-anchor="middle">${n.label}</text>
      </g>`;
    })}
  </svg>`;
}
