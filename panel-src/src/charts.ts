import type ApexChartsType from "apexcharts";
import type { Fmt } from "./format";
import type { I18n } from "./i18n";
import type { IstSeries } from "./history";
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

export const COLORS = {
  pv: "#fbbf24",
  house: "#a78bfa",
  gridIn: "#f87171",
  gridOut: "#34d399",
  bat: "#22d3ee",
  accent: "#38bdf8",
  accent2: "#818cf8",
  text: "#e8edf7",
  muted: "#8b96ad",
  faint: "#5a6580",
  bg: "#070b14",
} as const;

export const ACTION_COLOR: Record<SlotAction, string> = {
  charge: COLORS.gridOut,
  hold: COLORS.pv,
  release: COLORS.bat,
};

const base = {
  chart: {
    background: "transparent",
    foreColor: COLORS.muted,
    fontFamily: "Inter, system-ui, sans-serif",
    toolbar: { show: false },
    animations: { enabled: false },
  },
  theme: { mode: "dark" },
  grid: { borderColor: "rgba(255,255,255,0.06)", strokeDashArray: 4 },
  dataLabels: { enabled: false },
  legend: { show: false },
  tooltip: { theme: "dark" },
};

type Obj = Record<string, unknown>;
const isObj = (v: unknown): v is Obj => !!v && typeof v === "object" && !Array.isArray(v);
const merge = (a: Obj, b: Obj): Obj => {
  const out: Obj = { ...a };
  for (const [k, v] of Object.entries(b)) out[k] = isObj(v) && isObj(out[k]) ? merge(out[k] as Obj, v) : v;
  return out;
};
const withBase = (o: Obj): Opts => merge(base, o) as unknown as Opts;

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
  ist: IstSeries | undefined;
  showIst: boolean;
  fmt: Fmt;
  i18n: I18n;
}

export function forecastOptions({ traj, targetSoc, ist, showIst, fmt, i18n }: ForecastInput): Opts {
  const { imp, exp } = splitGrid(traj.grid_points);
  const bands = phaseBands(traj.trajectory_phases, traj.trajectory_points).map((b) => ({
    x: b.x,
    x2: b.x2,
    fillColor: COLORS.accent,
    opacity: 0.05,
    label: {
      text: i18n.phase(b.phase),
      borderWidth: 0,
      orientation: "horizontal",
      position: "top",
      style: { background: "transparent", color: COLORS.faint, fontSize: "11px" },
    },
  }));

  const series: Obj[] = [
    { name: i18n.t("legendPv"), type: "area", data: toKw(traj.pv_points) },
    { name: i18n.t("legendHouse"), type: "line", data: toKw(traj.house_points) },
    { name: i18n.t("legendImport"), type: "area", data: imp },
    { name: i18n.t("legendFeed"), type: "area", data: exp },
    { name: i18n.t("legendSoc"), type: "line", data: traj.trajectory_points },
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
      seriesName: i18n.t("legendSoc"),
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
      { seriesName: i18n.t("legendSoc"), opposite: true, min: 0, max: 100, show: false },
    );
  }

  return withBase({
    chart: { id: "fc", type: "line", height: 420, zoom: { enabled: true, type: "x" }, toolbar: { show: false, autoSelected: "zoom" } },
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
                  offsetX: 0,
                  offsetY: 22,
                  borderWidth: 0,
                  style: { background: "rgba(129,140,248,.25)", color: "#c7d2fe" },
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
    colors: [COLORS.bat, "#ffffff"],
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

export function ringOptions(soc: number, label: string): Opts {
  return withBase({
    chart: { type: "radialBar", height: 270, sparkline: { enabled: true } },
    series: [soc],
    colors: [COLORS.bat],
    fill: { type: "gradient", gradient: { shade: "dark", type: "horizontal", gradientToColors: [COLORS.accent2], stops: [0, 100] } },
    plotOptions: {
      radialBar: {
        hollow: { size: "68%" },
        startAngle: -135,
        endAngle: 135,
        track: { background: "rgba(255,255,255,0.06)", strokeWidth: "100%" },
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
