import ApexCharts from "apexcharts/core";
import "apexcharts/line";
import "apexcharts/area";
import "apexcharts/features/annotations";
import "apexcharts/features/toolbar";
import { PHASES } from "./entities";

type Point = [number, number];
type XAxisAnnotations = NonNullable<NonNullable<ApexCharts.ApexOptions["annotations"]>["xaxis"]>[number];

export interface Trajectory {
  trajectory_points: Point[];
  pv_points: Point[];
  house_points: Point[];
  grid_points: Point[];
  trajectory_phases: string[];
}

export const isTrajectory = (a: Record<string, unknown> | undefined): a is Record<string, unknown> & Trajectory =>
  !!a &&
  ["trajectory_points", "pv_points", "house_points", "grid_points", "trajectory_phases"].every((k) =>
    Array.isArray(a[k]),
  ) &&
  (a.trajectory_points as unknown[]).length > 1;

const de = (v: number, digits = 1) =>
  v.toLocaleString("de-DE", { minimumFractionDigits: digits, maximumFractionDigits: digits });
const kw = (pts: Point[]): Point[] => pts.map(([x, v]) => [x, v / 1000]);

function phaseBands(t: Trajectory): XAxisAnnotations[] {
  const bands: XAxisAnnotations[] = [];
  let start = 0;
  const phases = t.trajectory_phases;
  for (let i = 1; i <= phases.length; i++) {
    if (i === phases.length || phases[i] !== phases[start]) {
      bands.push({
        x: t.trajectory_points[start][0],
        x2: t.trajectory_points[i - 1][0],
        fillColor: "#38bdf8",
        opacity: 0.05,
        label: {
          text: PHASES[phases[start]] ?? phases[start],
          borderWidth: 0,
          orientation: "horizontal",
          position: "top",
          style: { background: "transparent", color: "#5a6580", fontSize: "11px" },
        },
      });
      start = i;
    }
  }
  return bands;
}

function options(t: Trajectory, targetSoc: number | undefined): ApexCharts.ApexOptions {
  return {
    chart: {
      type: "line",
      height: 420,
      background: "transparent",
      foreColor: "#8b96ad",
      fontFamily: "Inter, system-ui, sans-serif",
      zoom: { enabled: true, type: "x" },
      toolbar: { show: false, autoSelected: "zoom" },
      animations: { enabled: false },
    },
    theme: { mode: "dark" },
    grid: { borderColor: "rgba(255,255,255,0.06)", strokeDashArray: 4 },
    dataLabels: { enabled: false },
    legend: { show: false },
    series: [
      { name: "PV", type: "area", data: kw(t.pv_points) },
      { name: "Haus", type: "line", data: kw(t.house_points) },
      { name: "Netzbezug", type: "area", data: t.grid_points.map(([x, v]) => [x, Math.max(0, -v) / 1000]) },
      { name: "Einspeisung", type: "area", data: t.grid_points.map(([x, v]) => [x, Math.max(0, v) / 1000]) },
      { name: "SoC", type: "line", data: t.trajectory_points },
    ],
    colors: ["#fbbf24", "#a78bfa", "#f87171", "#34d399", "#22d3ee"],
    stroke: { width: [2, 2, 1.5, 1.5, 3.5], curve: "smooth", dashArray: [0, 4, 0, 0, 0] },
    fill: {
      type: ["gradient", "solid", "gradient", "gradient", "solid"],
      gradient: { opacityFrom: 0.45, opacityTo: 0.02 },
    },
    xaxis: {
      type: "datetime",
      labels: { datetimeUTC: false, format: "HH:mm" },
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: false },
    },
    yaxis: [
      { seriesName: "PV", min: 0, title: { text: "kW" }, labels: { formatter: (v: number) => de(v) } },
      { seriesName: "PV", show: false },
      { seriesName: "PV", show: false },
      { seriesName: "PV", show: false },
      {
        seriesName: "SoC",
        opposite: true,
        min: 0,
        max: 100,
        tickAmount: 5,
        title: { text: "SoC %" },
        labels: { formatter: (v: number) => `${Math.round(v)}%` },
      },
    ],
    tooltip: {
      theme: "dark",
      shared: true,
      intersect: false,
      x: { format: "HH:mm" },
      y: {
        formatter: (v, opts) => (v == null ? "–" : opts?.seriesIndex === 4 ? `${de(v)} %` : `${de(v, 2)} kW`),
      },
    },
    markers: { size: 0, hover: { size: 5 } },
    annotations: {
      xaxis: [
        ...phaseBands(t),
        {
          x: Date.now(),
          borderColor: "#e8edf7",
          opacity: 0.6,
          label: {
            text: "Jetzt",
            orientation: "horizontal",
            borderWidth: 0,
            style: { background: "#e8edf7", color: "#070b14", fontWeight: 700 },
          },
        },
      ],
      yaxis:
        targetSoc === undefined
          ? []
          : [
              {
                y: targetSoc,
                yAxisIndex: 4,
                borderColor: "#818cf8",
                strokeDashArray: 6,
                label: {
                  text: `Ziel-SoC ${Math.round(targetSoc)}%`,
                  position: "left",
                  textAnchor: "start",
                  offsetX: 60,
                  borderWidth: 0,
                  style: { background: "rgba(129,140,248,.25)", color: "#c7d2fe" },
                },
              },
            ],
    },
  };
}

export class ForecastChart {
  private chart?: ApexCharts;
  private x0 = 0;

  constructor(private readonly el: HTMLElement) {}

  async update(t: Trajectory, targetSoc: number | undefined): Promise<void> {
    this.x0 = t.trajectory_points[0][0];
    const opts = options(t, targetSoc);
    if (this.chart) {
      await this.chart.updateOptions(opts, false, false);
    } else {
      this.chart = new ApexCharts(this.el, opts);
      await this.chart.render();
    }
  }

  zoomHours(hours: number): void {
    this.chart?.zoomX(this.x0, this.x0 + hours * 3600e3);
  }

  destroy(): void {
    this.chart?.destroy();
    this.chart = undefined;
  }
}
