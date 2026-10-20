import type ApexChartsType from "apexcharts";
import type { Fmt } from "./format";
import type { I18n } from "./i18n";
import { calendarDay, type BalanceDay, type IstSeries } from "./history";
import type { ThemeId } from "./theme";
import {
  chartSlots,
  phaseBands,
  slotAction,
  splitGrid,
  toKw,
  type Point,
  type Slot,
  type SlotAction,
  type Trajectory,
} from "./transform";

type Opts = ApexChartsType.ApexOptions;

type Surface = { text: string; muted: string; faint: string; bg: string; grid: string; series: string; track: string; mode: "dark" | "light" };

const SURFACES: Record<ThemeId, Surface> = {
  dark: { text: "#e8edf7", muted: "#8b96ad", faint: "#5a6580", bg: "#070b14", grid: "rgba(255,255,255,0.06)", series: "#ffffff", track: "rgba(255,255,255,0.06)", mode: "dark" as const },
  classic: { text: "#152033", muted: "#5b6b80", faint: "#8b97a8", bg: "#eef2f6", grid: "rgba(21,32,51,0.08)", series: "#152033", track: "rgba(21,32,51,0.08)", mode: "light" as const },
  e3dc: { text: "#4a4a4a", muted: "#6e767c", faint: "#a4aaae", bg: "#f7f7f7", grid: "rgba(30,37,43,0.08)", series: "#4a4a4a", track: "rgba(30,37,43,0.08)", mode: "light" as const },
};

let surface: Surface = SURFACES.dark;

/** Chart ink follows the panel look. Call this before building options. */
export function useChartTheme(theme: ThemeId): void {
  surface = SURFACES[theme];
}

export const COLORS = {
  pv: "#fbbf24",
  house: "#a78bfa",
  gridIn: "#f87171",
  gridOut: "#34d399",
  bat: "#22d3ee",
  accent: "#38bdf8",
  accent2: "#818cf8",
  get text() {
    return surface.text;
  },
  get muted() {
    return surface.muted;
  },
  get faint() {
    return surface.faint;
  },
  get bg() {
    return surface.bg;
  },
  get grid() {
    return surface.grid;
  },
  get series() {
    return surface.series;
  },
  get track() {
    return surface.track;
  },
  get mode() {
    return surface.mode;
  },
};

export const ACTION_COLOR: Record<SlotAction, string> = {
  charge: COLORS.gridOut,
  hold: COLORS.pv,
  release: COLORS.bat,
};

const chartBase = (): Obj => ({
  chart: {
    background: "transparent",
    foreColor: COLORS.muted,
    fontFamily: "Inter, system-ui, sans-serif",
    toolbar: { show: false },
    animations: { enabled: false },
  },
  theme: { mode: COLORS.mode },
  grid: { borderColor: COLORS.grid, strokeDashArray: 4 },
  dataLabels: { enabled: false },
  legend: { show: false },
  tooltip: { theme: COLORS.mode },
});

type Obj = Record<string, unknown>;
const isObj = (v: unknown): v is Obj => !!v && typeof v === "object" && !Array.isArray(v);
const merge = (a: Obj, b: Obj): Obj => {
  const out: Obj = { ...a };
  for (const [k, v] of Object.entries(b)) out[k] = isObj(v) && isObj(out[k]) ? merge(out[k] as Obj, v) : v;
  return out;
};
const withBase = (o: Obj): Opts => merge(chartBase(), o) as unknown as Opts;

const nowMarker = (label: string) => ({
  x: Date.now(),
  borderColor: COLORS.text,
  opacity: 0.6,
  label: {
    text: label,
    orientation: "horizontal",
    borderWidth: 0,
    style: { background: COLORS.text, color: COLORS.bg, fontWeight: 700 },
  },
});

/** Twelve finite monthly values, or nothing when the series is missing. */
export function asMonths(value: unknown): number[] | undefined {
  if (!Array.isArray(value) || value.length !== 12) return undefined;
  const months = value.map((item) => (typeof item === "number" && Number.isFinite(item) ? item : Number.NaN));
  return months.some((item) => Number.isNaN(item)) ? undefined : months;
}

/** Area for avoided import and a line for the baseline, one point per month. */
export function sizingYearOptions(language: string, avoided: number[], baseline: number[], avoidedName: string, baselineName: string): Opts {
  const months = Array.from({ length: 12 }, (_, index) =>
    new Intl.DateTimeFormat(language || "de", { month: "short" }).format(new Date(2024, index, 1)),
  );
  return withBase({
    chart: { type: "line", height: 260 },
    series: [
      { name: avoidedName, type: "area", data: avoided },
      { name: baselineName, type: "line", data: baseline },
    ],
    colors: [COLORS.bat, COLORS.gridIn],
    stroke: { curve: "smooth", width: [2.5, 1.5] },
    fill: {
      type: ["gradient", "solid"],
      gradient: { shadeIntensity: 0.2, opacityFrom: 0.45, opacityTo: 0.02, stops: [0, 100] },
    },
    xaxis: {
      categories: months,
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      min: 0,
      title: { text: "kWh" },
      labels: { formatter: (value: number) => String(Math.round(value)) },
    },
  });
}

const xaxis = (extra: Obj = {}) => ({
  type: "datetime",
  labels: { datetimeUTC: false, format: "HH:mm" },
  axisBorder: { show: false },
  axisTicks: { show: false },
  ...extra,
});

export interface ForecastInput {
  traj: Trajectory;
  targetSoc: number | undefined;
  /** When set (price plan controls the battery), replaces the generic SoC trajectory. */
  planSoc: Point[] | undefined;
  ist: IstSeries | undefined;
  showIst: boolean;
  fmt: Fmt;
  i18n: I18n;
}

export function forecastOptions({ traj, targetSoc, planSoc, ist, showIst, fmt, i18n }: ForecastInput): Opts {
  const { imp, exp } = splitGrid(traj.grid_points);
  const usePlanSoc = !!planSoc && planSoc.length >= 2;
  const socSeries = usePlanSoc ? planSoc : traj.trajectory_points;
  const socName = usePlanSoc ? i18n.t("legendPlanSoc") : i18n.t("legendSoc");
  const bands = phaseBands(traj.trajectory_phases, traj.trajectory_points).map((b) => {
    const ann: Obj = { x: b.x, x2: b.x2, fillColor: COLORS.accent, opacity: 0.05 };
    // Vertical text (bottom to top) keeps the name off the 100 % line at the top edge and fits
    // narrow bands. A one-step phase is only minutes wide, so labeling every one would stack text.
    if (b.x2 - b.x >= 30 * 60e3) {
      ann.label = {
        text: i18n.phase(b.phase),
        borderWidth: 0,
        orientation: "vertical",
        position: "top",
        offsetX: 10,
        offsetY: 10,
        style: { background: "transparent", color: COLORS.muted, fontSize: "11px" },
      };
    }
    return ann;
  });

  const series: Obj[] = [
    { name: i18n.t("legendPv"), type: "area", data: toKw(traj.pv_points) },
    { name: i18n.t("legendHouse"), type: "line", data: toKw(traj.house_points) },
    { name: i18n.t("legendImport"), type: "area", data: imp },
    { name: i18n.t("legendFeed"), type: "area", data: exp },
    { name: socName, type: "line", data: socSeries },
  ];
  const colors: string[] = [COLORS.pv, COLORS.house, COLORS.gridIn, COLORS.gridOut, COLORS.bat];
  const widths = [2, 2, 1.5, 1.5, 3.5];
  const dashes = [0, 4, 0, 0, 0];
  const fillTypes = ["gradient", "solid", "gradient", "gradient", "solid"];
  const yaxis: Obj[] = [
    { seriesName: i18n.t("legendPv"), min: 0, title: { text: "kW" }, labels: { formatter: (v: number) => fmt.n(v, 1) } },
    { seriesName: i18n.t("legendPv"), show: false },
    { seriesName: i18n.t("legendPv"), show: false },
    { seriesName: i18n.t("legendPv"), show: false },
    {
      seriesName: socName,
      opposite: true,
      min: 0,
      max: 100,
      tickAmount: 5,
      title: { text: "SoC %" },
      labels: { formatter: (v: number) => `${Math.round(v)}%` },
    },
  ];

  const socIndex = 4;
  let actualFrom = -1;
  if (showIst && ist && (ist.pv.length > 1 || ist.house.length > 1)) {
    actualFrom = series.length;
    series.push(
      { name: `${i18n.t("legendPv")} ${i18n.t("legendActual")}`, type: "line", data: toKw(ist.pv) },
      { name: `${i18n.t("legendHouse")} ${i18n.t("legendActual")}`, type: "line", data: toKw(ist.house) },
      { name: `${i18n.t("legendSoc")} ${i18n.t("legendActual")}`, type: "line", data: ist.soc },
    );
    colors.push(COLORS.pv, COLORS.house, COLORS.bat);
    widths.push(1.5, 1.5, 1.5);
    dashes.push(0, 0, 0);
    fillTypes.push("solid", "solid", "solid");
    yaxis.push(
      { seriesName: i18n.t("legendPv"), show: false },
      { seriesName: i18n.t("legendPv"), show: false },
      { seriesName: socName, opposite: true, min: 0, max: 100, show: false },
    );
  }

  const lineAtTop = targetSoc !== undefined && targetSoc >= 90;
  return withBase({
    chart: { id: "fc", type: "line", height: 420, zoom: { enabled: true, type: "x" }, toolbar: { show: false, autoSelected: "zoom" } },
    grid: { padding: { top: lineAtTop ? 28 : 8 } },
    series,
    colors,
    stroke: { width: widths, curve: "smooth", dashArray: dashes },
    fill: { type: fillTypes, gradient: { opacityFrom: 0.45, opacityTo: 0.02 }, opacity: series.map((_, i) => (actualFrom >= 0 && i >= actualFrom ? 0.55 : 1)) },
    xaxis: xaxis({ tooltip: { enabled: false } }),
    yaxis,
    tooltip: {
      shared: true,
      intersect: false,
      x: { format: "HH:mm" },
      y: {
        formatter: (v: number | null, o?: { seriesIndex: number }) =>
          v == null ? "–" : o?.seriesIndex === socIndex || (actualFrom >= 0 && o?.seriesIndex === actualFrom + 2) ? `${fmt.n(v)} %` : `${fmt.n(v, 2)} kW`,
      },
    },
    markers: { size: 0, hover: { size: 5 } },
    annotations: {
      xaxis: [...bands, nowMarker(i18n.t("now"))],
      yaxis:
        targetSoc === undefined
          ? []
          : [
              {
                y: targetSoc,
                yAxisIndex: socIndex,
                borderColor: COLORS.accent2,
                strokeDashArray: 6,
                label: {
                  text: i18n.t("targetLabel", { v: Math.round(targetSoc) }),
                  position: "right",
                  textAnchor: "end",
                  offsetX: -8,
                  // Apex places the baseline at y + offsetY - 3. Negative offsetY lifts the label off the line.
                  offsetY: -16,
                  borderWidth: 0,
                  style: {
                    background: "rgba(7,11,20,.85)",
                    color: "#c7d2fe",
                    fontSize: "12px",
                    padding: { left: 6, right: 6, top: 3, bottom: 3 },
                  },
                },
              },
            ],
    },
  });
}

export function brushOptions(traj: Trajectory): Opts {
  const x0 = traj.trajectory_points[0][0];
  const x1 = traj.trajectory_points[traj.trajectory_points.length - 1][0];
  return withBase({
    chart: {
      id: "fc-brush",
      type: "area",
      height: 90,
      brush: { enabled: true, target: "fc" },
      selection: { enabled: true, xaxis: { min: x0, max: x1 }, fill: { color: COLORS.accent, opacity: 0.12 }, stroke: { color: COLORS.accent } },
    },
    series: [
      { name: "PV", data: toKw(traj.pv_points) },
      { name: "House", data: toKw(traj.house_points) },
    ],
    colors: [COLORS.pv, COLORS.house],
    stroke: { width: 1.5, curve: "smooth" },
    fill: { type: "gradient", gradient: { opacityFrom: 0.35, opacityTo: 0 } },
    xaxis: xaxis(),
    yaxis: { show: false, min: 0 },
    grid: { show: false },
    tooltip: { enabled: false },
  });
}

export interface PlanInput {
  slots: Slot[];
  fmt: Fmt;
  i18n: I18n;
}

export function planOptions({ slots: allSlots, fmt, i18n }: PlanInput): Opts {
  const slots = chartSlots(allSlots);
  const ts = (s: Slot) => Date.parse(s.start);
  const actionLabel = (s: Slot) => {
    const a = slotAction(s);
    return a === "charge"
      ? i18n.t("slotCharge", { kwh: fmt.n(s.grid_charge_kwh, 2) })
      : a === "hold"
        ? i18n.t("slotHold")
        : i18n.t("slotRelease");
  };
  const row = (label: string, value: string) =>
    `<div style="display:flex;justify-content:space-between;gap:16px;color:${COLORS.muted}"><span>${label}</span><b style="color:${COLORS.text}">${value}</b></div>`;

  return withBase({
    chart: { type: "line", height: 360, zoom: { enabled: true, type: "x" }, toolbar: { show: false, autoSelected: "zoom" } },
    series: [
      {
        name: i18n.t("slotPrice"),
        type: "column",
        data: slots.map((s) => ({ x: ts(s), y: +(s.price * 100).toFixed(1), fillColor: ACTION_COLOR[slotAction(s)] })),
      },
      { name: i18n.t("legendPlanSoc"), type: "line", data: slots.map((s) => ({ x: ts(s), y: s.soc_pct })) },
    ],
    colors: [COLORS.bat, COLORS.series],
    stroke: { width: [0, 2.5], curve: "stepline" },
    plotOptions: { bar: { columnWidth: "78%", borderRadius: 4, borderRadiusApplication: "end" } },
    fill: { opacity: [0.85, 1] },
    xaxis: xaxis(),
    yaxis: [
      { title: { text: "ct/kWh" }, labels: { formatter: (v: number) => fmt.n(v, 0) } },
      { opposite: true, min: 0, max: 100, title: { text: "SoC %" }, labels: { formatter: (v: number) => `${Math.round(v)}%` } },
    ],
    tooltip: {
      shared: true,
      intersect: false,
      custom: ({ dataPointIndex }: { dataPointIndex: number }) => {
        const s = slots[dataPointIndex];
        if (!s) return "";
        return `<div style="padding:12px 14px;min-width:190px">
          <div style="font-weight:700;margin-bottom:8px">${fmt.dayTime(s.start)}</div>
          ${row(i18n.t("slotPrice"), `${fmt.n(s.price * 100)} ct`)}
          ${row(i18n.t("slotSoc"), `${fmt.n(s.soc_pct)} %`)}
          ${row(i18n.t("slotConsumption"), `${fmt.n(s.consumption_kwh, 2)} kWh`)}
          <div style="margin-top:8px;color:${ACTION_COLOR[slotAction(s)]};font-weight:600">${actionLabel(s)}</div></div>`;
      },
    },
    annotations: { xaxis: [nowMarker(i18n.t("now"))] },
  });
}

/** Arc of the battery ring. 0 is the lower left, 1 the lower right, clockwise over the top. */
export function socArc(fromPct: number, toPct: number, cx = 100, cy = 92, r = 72): string {
  const from = Math.min(1, Math.max(0, fromPct));
  const to = Math.min(1, Math.max(0, toPct));
  if (to - from < 0.001) return "";
  const start = 135;
  const sweep = 270;
  const at = (pct: number) => {
    const rad = ((start + sweep * pct) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };
  const a = at(from);
  const b = at(to);
  const large = sweep * (to - from) > 180 ? 1 : 0;
  return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${b.x.toFixed(2)} ${b.y.toFixed(2)}`;
}

/** Conic fill for the battery ring. 0 sits at the lower left and runs clockwise over the top. */
export function socRingGradient(soc: number, reserve?: number): string {
  const clamp = (value: number) => Math.min(1, Math.max(0, value / 100));
  const socPct = clamp(soc);
  const reservePct = reserve === undefined ? undefined : clamp(reserve);
  const sweep = 270;
  const deg = (pct: number) => `${+(pct * sweep).toFixed(2)}deg`;
  const stops: string[] = [];
  const band = (color: string, from: number, to: number) => {
    if (to - from < 0.001) return;
    stops.push(`${color} ${deg(from)}`, `${color} ${deg(to)}`);
  };
  const split = reservePct === undefined ? 0 : Math.min(socPct, reservePct);
  // Same palette as the flow: SoC = --bat, Notstrom-Sockel = --warn (filled + empty zone).
  if (reservePct !== undefined && reservePct > 0) {
    band("var(--warn)", 0, split);
    band("color-mix(in srgb, var(--warn) 40%, transparent)", split, reservePct);
  }
  const chargeFrom = reservePct === undefined ? 0 : split;
  if (socPct > chargeFrom) {
    stops.push(
      `var(--bat) ${deg(chargeFrom)}`,
      `color-mix(in srgb, var(--bat) 55%, white) ${deg(socPct)}`,
    );
  }
  band("var(--switch-track)", Math.max(socPct, reservePct ?? 0), 1);
  stops.push(`transparent ${deg(1)}`, "transparent 360deg");
  return `conic-gradient(from 225deg, ${stops.join(", ")})`;
}

export function ringOptions(soc: number, label: string): Opts {
  return withBase({
    chart: { type: "radialBar", height: 270, sparkline: { enabled: true } },
    series: [soc],
    colors: [COLORS.bat],
    fill: { type: "gradient", gradient: { shade: COLORS.mode, type: "horizontal", gradientToColors: [COLORS.accent2], stops: [0, 100] } },
    plotOptions: {
      radialBar: {
        hollow: { size: "68%" },
        startAngle: -135,
        endAngle: 135,
        track: { background: COLORS.track, strokeWidth: "100%" },
        dataLabels: {
          name: { show: true, offsetY: 26, color: COLORS.muted, fontSize: "13px" },
          value: { offsetY: -14, fontSize: "46px", fontWeight: 800, color: COLORS.text, formatter: (v: number) => `${Math.round(v)}%` },
        },
      },
    },
    stroke: { lineCap: "round" },
    labels: [label],
  });
}

/** L1–L3 of one phase group over time, in kW. */
export function phaseHistoryOptions(series: { name: string; points: Point[] }[], fmt: Fmt): Opts {
  return withBase({
    chart: { type: "line", height: 220 },
    series: series.map((item) => ({ name: item.name, data: toKw(item.points) })),
    colors: [COLORS.accent, COLORS.house, COLORS.pv],
    stroke: { width: 2, curve: "smooth" },
    legend: { show: false },
    xaxis: xaxis(),
    yaxis: { decimalsInFloat: 1, title: { text: "kW" }, labels: { formatter: (v: number) => fmt.n(v, 1) } },
    tooltip: { shared: true, intersect: false, x: { format: "dd.MM. HH:mm" }, y: { formatter: (v: number) => `${fmt.n(v, 2)} kW` } },
  });
}

/** Signed power over time, in kW. */
export function powerHistoryOptions(data: Point[], color: string, fmt: Fmt): Opts {
  return withBase({
    chart: { type: "area", height: 280 },
    series: [{ data: toKw(data) }],
    colors: [color],
    stroke: { width: 2, curve: "smooth" },
    fill: { type: "gradient", gradient: { opacityFrom: 0.32, opacityTo: 0.02 } },
    xaxis: xaxis(),
    yaxis: { decimalsInFloat: 1, title: { text: "kW" }, labels: { formatter: (v: number) => fmt.n(v, 1) } },
    tooltip: { x: { format: "dd.MM. HH:mm" }, y: { formatter: (v: number) => `${fmt.n(v, 2)} kW` } },
  });
}

export function sparkOptions(data: Point[], color: string): Opts {
  return withBase({
    chart: { type: "area", height: 56, sparkline: { enabled: true } },
    series: [{ data }],
    colors: [color],
    stroke: { width: 2, curve: "smooth" },
    fill: { type: "gradient", gradient: { opacityFrom: 0.35, opacityTo: 0 } },
    xaxis: { type: "datetime" },
    tooltip: { enabled: false },
  });
}

export interface BalancePulseInput {
  days: BalanceDay[];
  fmt: Fmt;
  i18n: I18n;
  onDay?: (day: string) => void;
}

const pulseBarColor = (value: number, today: boolean): string => {
  if (value >= 0) return today ? "#6ee7b7" : "rgba(52, 211, 153, 0.78)";
  return today ? "#fca5a5" : "rgba(248, 113, 113, 0.78)";
};

const pulseDayLabel = (ts: number, loc: string, dense: boolean): string => {
  const d = new Date(ts);
  if (dense) return d.toLocaleDateString(loc, { day: "numeric" });
  return d.toLocaleDateString(loc, { weekday: "short", day: "numeric" });
};

const pulseNiceCeil = (value: number): number => {
  if (!Number.isFinite(value) || value === 0) return 0;
  const sign = value < 0 ? -1 : 1;
  const abs = Math.abs(value);
  const exp = Math.floor(Math.log10(abs));
  const frac = abs / 10 ** exp;
  const nice = frac <= 1 ? 1 : frac <= 2 ? 2 : frac <= 5 ? 5 : 10;
  return sign * nice * 10 ** exp;
};

const pulseNiceFloor = (value: number): number => {
  if (!Number.isFinite(value) || value === 0) return 0;
  return -pulseNiceCeil(-value);
};

/**
 * Twin y-axes share one horizontal zero. Without this, a positive cumulative
 * line sits under the daily-balance zero whenever the left axis dips below 0.
 */
export function alignTwinAxisZeros(
  primaryValues: number[],
  secondaryValues: number[],
  pad = 0.1,
): { primary: { min: number; max: number }; secondary: { min: number; max: number } } {
  const pVals = primaryValues.filter((v) => Number.isFinite(v));
  const sVals = secondaryValues.filter((v) => Number.isFinite(v));
  let pMin = pVals.length ? Math.min(...pVals, 0) : 0;
  let pMax = pVals.length ? Math.max(...pVals, 0) : 1;
  const pSpan = pMax - pMin || 1;
  pMin -= pSpan * pad;
  pMax += pSpan * pad;
  if (pMin > 0) pMin = 0;
  if (pMax < 0) pMax = 0;
  pMin = pulseNiceFloor(pMin);
  pMax = pulseNiceCeil(pMax);
  if (pMin === pMax) {
    pMin = Math.min(0, pMin - 1);
    pMax = Math.max(0, pMax + 1);
  }

  const sDataMin = sVals.length ? Math.min(...sVals) : 0;
  const sDataMax = sVals.length ? Math.max(...sVals) : 1;
  const pRange = pMax - pMin;
  const zeroFrac = (0 - pMin) / pRange;

  if (zeroFrac <= 1e-6) {
    const sMax = pulseNiceCeil(Math.max(sDataMax, 0) * (1 + pad) || 1);
    return { primary: { min: pMin, max: pMax }, secondary: { min: 0, max: Math.max(sMax, 1) } };
  }
  if (zeroFrac >= 1 - 1e-6) {
    const sMin = pulseNiceFloor(Math.min(sDataMin, 0) * (1 + pad) || -1);
    return { primary: { min: pMin, max: pMax }, secondary: { min: Math.min(sMin, -1), max: 0 } };
  }

  const needBelow = Math.max(0, -Math.min(sDataMin, 0));
  const needAbove = Math.max(0, Math.max(sDataMax, 0));
  const total =
    Math.max(needBelow / zeroFrac, needAbove / (1 - zeroFrac), Number.EPSILON) * (1 + pad);
  // Keep zeroFrac exact; round the positive side up so ticks stay readable.
  const sMax = pulseNiceCeil((1 - zeroFrac) * total);
  const sMin = sMax === 0 ? pulseNiceFloor(-zeroFrac * total) : -(zeroFrac / (1 - zeroFrac)) * sMax;
  return { primary: { min: pMin, max: pMax }, secondary: { min: sMin, max: Math.max(sMax, 1e-6) } };
}

/** Diverging daily balance bars (left €) plus cumulative running total (right €). */
export function balancePulseOptions({ days, fmt, i18n, onDay }: BalancePulseInput): Opts {
  const todayKey = calendarDay();
  const dense = days.length > 14;
  const row = (label: string, value: string, accent?: string) =>
    `<div style="display:flex;justify-content:space-between;gap:18px;color:${COLORS.muted}"><span>${label}</span><b style="color:${accent ?? COLORS.text};font-variant-numeric:tabular-nums">${value}</b></div>`;
  let running = 0;
  const categories = days.map((d) => pulseDayLabel(d.ts, fmt.loc, dense));
  const columns = days.map((d) => {
    const today = d.day === todayKey;
    return {
      x: pulseDayLabel(d.ts, fmt.loc, dense),
      y: d.balance === undefined ? null : +d.balance.toFixed(2),
      fillColor: d.balance === undefined ? COLORS.faint : pulseBarColor(d.balance, today),
    };
  });
  const cumulative = days.map((d) => {
    if (d.balance !== undefined) running += d.balance;
    return { x: pulseDayLabel(d.ts, fmt.loc, dense), y: +running.toFixed(2) };
  });
  const axes = alignTwinAxisZeros(
    columns.map((p) => p.y).filter((v): v is number => v !== null),
    cumulative.map((p) => p.y),
  );
  const todayIndex = days.findIndex((d) => d.day === todayKey);
  const dailyName = i18n.t("pulseDaily");
  const sumName = i18n.t("pulseCumulative");
  const axisTitle = (text: string, color: string) => ({
    text,
    offsetX: 0,
    offsetY: 0,
    style: { color, fontSize: "12px", fontWeight: 700, fontFamily: "Inter, system-ui, sans-serif" },
  });

  return withBase({
    chart: {
      type: "line",
      height: 268,
      parentHeightOffset: 0,
      animations: {
        enabled: true,
        speed: 480,
        animateGradually: { enabled: true, delay: 24 },
        dynamicAnimation: { enabled: false },
      },
      events: {
        click: (_event: unknown, _ctx: unknown, config: { dataPointIndex?: number; seriesIndex?: number }) => {
          const index = config.dataPointIndex;
          if (index === undefined || index < 0 || (config.seriesIndex ?? 0) > 0) return;
          const day = days[index];
          if (day) onDay?.(day.day);
        },
      },
    },
    series: [
      { name: dailyName, type: "column", data: columns },
      { name: sumName, type: "area", data: cumulative },
    ],
    colors: [COLORS.gridOut, COLORS.accent],
    stroke: { width: [0, 2.5], curve: ["smooth", "straight"], lineCap: "round" },
    plotOptions: {
      bar: {
        columnWidth: dense ? "42%" : "46%",
        borderRadius: 4,
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
      },
    },
    fill: {
      type: ["solid", "gradient"],
      opacity: [0.9, 1],
      gradient: {
        type: "vertical",
        shadeIntensity: 0.15,
        gradientToColors: [COLORS.accent],
        inverseColors: false,
        opacityFrom: 0.28,
        opacityTo: 0.02,
        stops: [0, 95],
      },
    },
    markers: {
      size: [0, 0],
      hover: { size: 5, sizeOffset: 1 },
      strokeWidth: 0,
      colors: [COLORS.accent],
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontSize: "12px",
      fontWeight: 600,
      markers: { size: 5, shape: "circle", offsetX: -2 },
      itemMargin: { horizontal: 14, vertical: 0 },
      labels: { colors: COLORS.text },
      onItemClick: { toggleDataSeries: false },
      onItemHover: { highlightDataSeries: true },
    },
    grid: {
      borderColor: COLORS.grid,
      strokeDashArray: 3,
      padding: { left: 8, right: 8, top: 4, bottom: 0 },
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    xaxis: {
      type: "category",
      categories,
      tickPlacement: "on",
      tickAmount: dense ? Math.min(10, days.length) : days.length,
      labels: {
        rotate: 0,
        hideOverlappingLabels: true,
        style: { colors: COLORS.muted, fontSize: dense ? "10px" : "11px", fontWeight: 550 },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
      crosshairs: {
        show: true,
        width: 1,
        stroke: { color: COLORS.accent, width: 1, dashArray: 4 },
      },
    },
    yaxis: [
      {
        seriesName: dailyName,
        min: axes.primary.min,
        max: axes.primary.max,
        tickAmount: 5,
        forceNiceScale: false,
        decimalsInFloat: 0,
        title: axisTitle(i18n.t("pulseDailyAxis"), COLORS.muted),
        labels: {
          style: { colors: COLORS.muted, fontSize: "11px", fontWeight: 550 },
          formatter: (v: number) => `${fmt.n(v, 0)} €`,
        },
      },
      {
        seriesName: sumName,
        opposite: true,
        min: axes.secondary.min,
        max: axes.secondary.max,
        tickAmount: 5,
        forceNiceScale: false,
        decimalsInFloat: 0,
        title: axisTitle(i18n.t("pulseSumAxis"), COLORS.accent),
        labels: {
          style: { colors: COLORS.accent, fontSize: "11px", fontWeight: 600 },
          // Padding below the shared zero is empty; hide negative ticks on the sum axis.
          formatter: (v: number) => (v < -1e-9 ? "" : `${fmt.n(v, 0)} €`),
        },
      },
    ],
    annotations: {
      yaxis: [{ y: 0, yAxisIndex: 0, borderColor: "rgba(148,163,184,0.55)", strokeDashArray: 0, opacity: 0.9 }],
      ...(todayIndex >= 0
        ? {
            xaxis: [
              {
                x: categories[todayIndex],
                borderColor: COLORS.accent,
                strokeDashArray: 5,
                opacity: 0.55,
                label: {
                  text: i18n.t("periodToday"),
                  orientation: "horizontal",
                  borderWidth: 0,
                  offsetY: -2,
                  style: {
                    background: COLORS.accent,
                    color: COLORS.bg,
                    fontSize: "10px",
                    fontWeight: 700,
                    padding: { left: 6, right: 6, top: 2, bottom: 2 },
                  },
                },
              },
            ],
          }
        : {}),
    },
    tooltip: {
      shared: true,
      intersect: false,
      custom: ({ dataPointIndex }: { dataPointIndex: number }) => {
        const d = days[dataPointIndex];
        if (!d) return "";
        const sum = cumulative[dataPointIndex]?.y;
        return `<div style="padding:12px 14px;min-width:212px">
          <div style="font-weight:700;margin-bottom:8px;color:${COLORS.text}">${fmt.day(d.ts)}</div>
          ${row(dailyName, `${fmt.n(d.balance, 2)} €`, d.balance !== undefined && d.balance < 0 ? COLORS.gridIn : COLORS.gridOut)}
          ${row(sumName, `${fmt.n(sum, 2)} €`, COLORS.accent)}
          <div style="height:1px;background:${COLORS.grid};margin:8px 0"></div>
          ${row(i18n.t("kpiRevenue"), `${fmt.n(d.feedRevenue, 2)} €`)}
          ${row(i18n.t("kpiSaving", { when: "" }).trim(), `${fmt.n(d.saving, 2)} €`)}
          ${row(i18n.t("kpiCostGross"), `${fmt.n(d.costToday, 2)} €`)}
          ${row(i18n.t("kpiWear"), `${fmt.n(d.wear, 2)} €`)}
          <div style="margin-top:8px;color:${COLORS.muted};font-size:11px">${i18n.t("pulseClickDay")}</div>
        </div>`;
      },
    },
  });
}
