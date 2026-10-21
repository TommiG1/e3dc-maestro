import { describe, expect, it } from "vitest";
import {
  alignTwinAxisZeros,
  asMonths,
  balancePulseOptions,
  forecastOptions,
  parseForecastHidden,
  planOptions,
  socArc,
  socRingGradient,
  useChartTheme,
} from "./charts";
import type { Slot } from "./transform";
import { makeFmt } from "./format";
import { makeI18n } from "./i18n";
import type { BalanceDay } from "./history";
import type { Trajectory } from "./transform";

const traj = (overrides: Partial<Trajectory> = {}): Trajectory => {
  const t0 = Date.parse("2026-10-21T12:00:00Z");
  const t1 = t0 + 3600_000;
  return {
    trajectory_points: [
      [t0, 40],
      [t1, 55],
    ],
    pv_points: [
      [t0, 2000],
      [t1, 3000],
    ],
    house_points: [
      [t0, 500],
      [t1, 600],
    ],
    grid_points: [
      [t0, 100],
      [t1, -200],
    ],
    trajectory_phases: ["idle", "corridor"],
    ...overrides,
  };
};

describe("asMonths", () => {
  it("keeps twelve monthly values", () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    expect(asMonths(values)).toEqual(values);
    expect(asMonths(values.slice(0, 11))).toBeUndefined();
    expect(asMonths([...values.slice(0, 11), "x"])).toBeUndefined();
  });
});

describe("alignTwinAxisZeros", () => {
  it("keeps both zeros on the same relative height", () => {
    const aligned = alignTwinAxisZeros([-5, 20], [10, 200]);
    const pFrac = (0 - aligned.primary.min) / (aligned.primary.max - aligned.primary.min);
    const sFrac = (0 - aligned.secondary.min) / (aligned.secondary.max - aligned.secondary.min);
    expect(pFrac).toBeCloseTo(sFrac, 5);
    expect(aligned.secondary.min).toBeLessThan(0);
    expect(aligned.secondary.max).toBeGreaterThanOrEqual(200);
  });
});

describe("balancePulseOptions", () => {
  it("builds diverging columns and a cumulative area on dual axes", () => {
    useChartTheme("dark");
    const days: BalanceDay[] = [
      { day: "2026-10-20", ts: new Date(2026, 9, 20).getTime(), balance: 2, feedRevenue: 3, saving: 1, costToday: 1.5, wear: 0.5 },
      { day: "2026-10-21", ts: new Date(2026, 9, 21).getTime(), balance: -1, feedRevenue: 0, saving: 0, costToday: 0.75, wear: 0.25 },
    ];
    const opts = balancePulseOptions({ days, fmt: makeFmt("de"), i18n: makeI18n("de") });
    const series = opts.series as { name: string; type: string; data: { y: number | null; fillColor?: string }[] }[];
    expect(series).toHaveLength(2);
    expect(series[0]?.type).toBe("column");
    expect(series[1]?.type).toBe("area");
    expect(series[0]?.name).toBe("Tagesbilanz");
    expect(series[1]?.name).toBe("Laufende Summe");
    expect(series[0]?.data.map((p) => p.y)).toEqual([2, -1]);
    expect(series[1]?.data.map((p) => p.y)).toEqual([2, 1]);
    expect(series[0]?.data[0]?.fillColor).toBeTruthy();
    expect(series[0]?.data[1]?.fillColor).toBeTruthy();
    expect(opts.legend?.show).toBe(true);
    const axes = opts.yaxis as { opposite?: boolean; min?: number; max?: number; title?: { text?: string } }[];
    expect(axes).toHaveLength(2);
    expect(axes[0]?.title?.text).toBe("€ / Tag");
    expect(axes[1]?.opposite).toBe(true);
    expect(axes[1]?.title?.text).toBe("Summe €");
    expect(axes[0]?.min).toBeLessThan(0);
    expect(axes[1]?.min).toBeLessThan(0);
    const pFrac = (0 - (axes[0]?.min ?? 0)) / ((axes[0]?.max ?? 1) - (axes[0]?.min ?? 0));
    const sFrac = (0 - (axes[1]?.min ?? 0)) / ((axes[1]?.max ?? 1) - (axes[1]?.min ?? 0));
    expect(pFrac).toBeCloseTo(sFrac, 5);
  });

  it("labels monthly bars for the year pulse", () => {
    useChartTheme("dark");
    const days: BalanceDay[] = [
      { day: "2026-01-01", ts: new Date(2026, 0, 1).getTime(), balance: 2 },
      { day: "2026-02-01", ts: new Date(2026, 1, 1).getTime(), balance: -1 },
    ];
    const opts = balancePulseOptions({ days, monthly: true, fmt: makeFmt("de"), i18n: makeI18n("de") });
    const series = opts.series as { name: string; data: { x: string }[] }[];
    expect(series[0]?.name).toBe("Monatsbilanz");
    expect(series[0]?.data[0]?.x.toLowerCase()).toContain("jan");
    const axes = opts.yaxis as { title?: { text?: string } }[];
    expect(axes[0]?.title?.text).toBe("€ / Monat");
  });
});

describe("parseForecastHidden", () => {
  it("keeps only known power keys", () => {
    expect([...parseForecastHidden(["pv", "nope", "feed"])]).toEqual(["pv", "feed"]);
    expect(parseForecastHidden(null).size).toBe(0);
  });
});

describe("forecastOptions", () => {
  it("hides power series and keeps SoC", () => {
    useChartTheme("dark");
    const opts = forecastOptions({
      traj: traj(),
      targetSoc: 90,
      planSoc: [
        [Date.parse("2026-10-21T12:00:00Z"), 50],
        [Date.parse("2026-10-21T13:00:00Z"), 70],
      ],
      ist: undefined,
      showIst: false,
      hiddenPower: new Set(["import", "feed"]),
      fmt: makeFmt("de"),
      i18n: makeI18n("de"),
    });
    const series = opts.series as { name: string }[];
    expect(series.map((s) => s.name)).toEqual(["PV", "Haus", "SoC geplant"]);
  });

  it("compacts axes and drops phase labels on narrow screens", () => {
    useChartTheme("dark");
    const opts = forecastOptions({
      traj: traj(),
      targetSoc: 100,
      planSoc: undefined,
      ist: undefined,
      showIst: false,
      compact: true,
      fmt: makeFmt("de"),
      i18n: makeI18n("de"),
    });
    expect(opts.chart?.height).toBe(300);
    const axes = opts.yaxis as { title?: { text?: string }; tickAmount?: number }[];
    expect(axes[0]?.title?.text).toBeUndefined();
    expect(axes.at(-1)?.title?.text).toBeUndefined();
    const bands = (opts.annotations as { xaxis: { label?: { orientation?: string } }[] }).xaxis;
    expect(bands.filter((b) => b.label?.orientation === "vertical")).toHaveLength(0);
  });

  it("labels shadow plan SoC", () => {
    useChartTheme("dark");
    const opts = forecastOptions({
      traj: traj(),
      targetSoc: undefined,
      planSoc: [
        [Date.parse("2026-10-21T12:00:00Z"), 50],
        [Date.parse("2026-10-21T13:00:00Z"), 70],
      ],
      planShadow: true,
      ist: undefined,
      showIst: false,
      hiddenPower: new Set(["pv", "house", "import"]),
      fmt: makeFmt("de"),
      i18n: makeI18n("de"),
    });
    const series = opts.series as { name: string }[];
    expect(series.map((s) => s.name)).toEqual(["Einspeisung", "SoC geplant · Schatten"]);
  });

  it("uses plan SoC label when plan points are provided", () => {
    useChartTheme("dark");
    const opts = forecastOptions({
      traj: traj(),
      targetSoc: undefined,
      planSoc: undefined,
      ist: undefined,
      showIst: false,
      fmt: makeFmt("de"),
      i18n: makeI18n("de"),
    });
    const series = opts.series as { name: string }[];
    expect(series.at(-1)?.name).toBe("SoC");
  });
});

describe("planOptions", () => {
  const slots: Slot[] = [
    {
      start: "2026-10-21T12:00:00+02:00",
      start_local: "12:00",
      price: 0.2,
      grid_charge_kwh: 0,
      hold: true,
      release: false,
      soc_pct: 40,
      consumption_kwh: 1,
    },
    {
      start: "2026-10-21T13:00:00+02:00",
      start_local: "13:00",
      price: 0.25,
      grid_charge_kwh: 0,
      hold: false,
      release: true,
      soc_pct: 38,
      consumption_kwh: 1.2,
    },
    {
      start: "2026-10-21T14:00:00+02:00",
      start_local: "14:00",
      price: 0.18,
      grid_charge_kwh: 1,
      hold: false,
      release: false,
      soc_pct: 50,
      consumption_kwh: 0.8,
    },
  ];

  it("compacts axes on narrow screens", () => {
    useChartTheme("dark");
    const opts = planOptions({ slots, fmt: makeFmt("de"), i18n: makeI18n("de"), compact: true });
    expect(opts.chart?.height).toBe(280);
    const axes = opts.yaxis as { title?: { text?: string } }[];
    expect(axes[0]?.title?.text).toBeUndefined();
    expect(axes[1]?.title?.text).toBeUndefined();
  });
});

describe("socArc", () => {
  it("starts at the lower left and skips an empty span", () => {
    const full = socArc(0, 1);
    expect(full.startsWith("M 49.09 142.91")).toBe(true);
    expect(full).toContain("A 72 72 0 1 1");
    expect(socArc(0.4, 0.4)).toBe("");
  });

  it("paints the reserve in front of the charge and keeps the bottom open", () => {
    const painted = socRingGradient(41, 30);
    expect(painted.startsWith("conic-gradient(from 225deg, var(--warn) 0deg")).toBe(true);
    expect(painted.indexOf("var(--warn)")).toBeLessThan(painted.indexOf("var(--bat)"));
    expect(painted).toContain("color-mix(in srgb, var(--bat) 55%, white)");
    expect(painted).not.toContain("var(--accent-2)");
    expect(painted).toContain("transparent 270deg");
    expect(socRingGradient(41)).not.toContain("var(--warn)");
  });
});
