import { describe, expect, it } from "vitest";
import { asMonths, balancePulseOptions, socArc, socRingGradient, useChartTheme } from "./charts";
import { makeFmt } from "./format";
import { makeI18n } from "./i18n";
import type { BalanceDay } from "./history";

describe("asMonths", () => {
  it("keeps twelve monthly values", () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    expect(asMonths(values)).toEqual(values);
    expect(asMonths(values.slice(0, 11))).toBeUndefined();
    expect(asMonths([...values.slice(0, 11), "x"])).toBeUndefined();
  });
});

describe("balancePulseOptions", () => {
  it("builds diverging columns and a cumulative line", () => {
    useChartTheme("dark");
    const days: BalanceDay[] = [
      { day: "2026-10-20", ts: new Date(2026, 9, 20).getTime(), balance: 2, feedRevenue: 3, saving: 1, costToday: 1.5, wear: 0.5 },
      { day: "2026-10-21", ts: new Date(2026, 9, 21).getTime(), balance: -1, feedRevenue: 0, saving: 0, costToday: 0.75, wear: 0.25 },
    ];
    const opts = balancePulseOptions({ days, fmt: makeFmt("de"), i18n: makeI18n("de") });
    const series = opts.series as { name: string; type: string; data: { y: number | null; fillColor?: string }[] }[];
    expect(series).toHaveLength(2);
    expect(series[0]?.type).toBe("column");
    expect(series[1]?.type).toBe("line");
    expect(series[0]?.data.map((p) => p.y)).toEqual([2, -1]);
    expect(series[1]?.data.map((p) => p.y)).toEqual([2, 1]);
    expect(series[0]?.data[0]?.fillColor).toBeTruthy();
    expect(series[0]?.data[1]?.fillColor).toBeTruthy();
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
