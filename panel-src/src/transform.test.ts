import { describe, expect, it } from "vitest";
import {
  batteryForecast,
  bucket,
  chartSlots,
  buildTimeline,
  etaToTargetMs,
  formatEtaLabel,
  normalizeHistory,
  numericPoints,
  parseAutonomyHours,
  parseSlots,
  parseTrajectory,
  phaseBands,
  planEmptyKind,
  planSocPoints,
  priceExtremes,
  slotAction,
  splitGrid,
} from "./transform";

describe("trajectory", () => {
  const pts = (n: number): [number, number][] => Array.from({ length: n }, (_, i) => [i * 900000, i]);
  const valid = () => ({
    trajectory_points: pts(4),
    pv_points: pts(4),
    house_points: pts(4),
    grid_points: pts(4),
    trajectory_phases: ["a", "a", "b", "b"],
  });

  it("accepts a complete payload and rejects partial ones", () => {
    expect(parseTrajectory(valid())).toBeDefined();
    expect(parseTrajectory({ ...valid(), pv_points: undefined })).toBeUndefined();
    expect(parseTrajectory({ ...valid(), trajectory_points: pts(1) })).toBeUndefined();
    expect(parseTrajectory({ ...valid(), grid_points: [["x", 1]] })).toBeUndefined();
    expect(parseTrajectory(undefined)).toBeUndefined();
  });

  it("groups consecutive phases into bands", () => {
    const v = valid();
    expect(phaseBands(v.trajectory_phases, v.trajectory_points)).toEqual([
      { phase: "a", x: 0, x2: 900000 },
      { phase: "b", x: 1800000, x2: 2700000 },
    ]);
  });

  it("splits grid power: negative is import, positive is feed-in, in kW", () => {
    expect(splitGrid([[0, -2000], [1, 500]])).toEqual({
      imp: [[0, 2], [1, 0]],
      exp: [[0, 0], [1, 0.5]],
    });
  });

  it("finds when the trajectory reaches the target SoC", () => {
    const now = 1_000_000;
    const points: [number, number][] = [
      [now - 600_000, 30],
      [now, 34],
      [now + 3_600_000, 70],
      [now + 7_200_000, 100],
    ];
    expect(etaToTargetMs(points, 34, now)).toBe(0);
    expect(etaToTargetMs(points, 100, now)).toBe(7_200_000);
    expect(etaToTargetMs(points, 85, now)).toBeCloseTo(5_400_000, -2);
    expect(etaToTargetMs(points, 100, now + 8_000_000)).toBe(0);
    expect(etaToTargetMs([[now, 40]], 80, now)).toBeUndefined();
  });
});

describe("batteryForecast", () => {
  const now = Date.UTC(2026, 9, 16, 20, 0, 0); // 2026-10-16 20:00 UTC
  const midnight = Date.UTC(2026, 9, 17, 0, 0, 0);
  const h = (n: number) => now + n * 3_600_000;

  it("finds today's peak while the trajectory is still climbing before midnight", () => {
    const soc: [number, number][] = [
      [h(1), 40],
      [h(3), 50], // peak before midnight (00:00)
      [h(5), 20], // declines after midnight
    ];
    const result = batteryForecast(soc, [], { now, timeZone: "UTC" });
    expect(result).toMatchObject({ peakSoc: 50, peakAt: h(3), peakDay: "today" });
  });

  it("falls back to tomorrow once today's high is already behind us", () => {
    const soc: [number, number][] = [
      [h(1), 58], // already declining from today's high
      [h(3), 30],
      [h(4), 25], // last point before midnight
      [h(6), 80], // tomorrow's peak
      [h(8), 60],
    ];
    const result = batteryForecast(soc, [], { now, timeZone: "UTC" });
    expect(result).toMatchObject({ peakSoc: 80, peakAt: h(6), peakDay: "tomorrow" });
    expect(h(4)).toBeLessThanOrEqual(midnight);
    expect(h(6)).toBeGreaterThan(midnight);
  });

  it("keeps today's higher max instead of jumping to a lower tomorrow blip", () => {
    const soc: [number, number][] = [
      [h(1), 50], // current level
      [h(2), 50.3], // trivial uptick today — still the best value in the whole window
      [h(3.5), 10], // declines hard before midnight
      [h(6), 8], // tomorrow never recovers above today's trivial high
    ];
    const result = batteryForecast(soc, [], { now, timeZone: "UTC" });
    expect(result).toMatchObject({ peakSoc: 50.3, peakAt: h(2), peakDay: "today" });
  });

  it("skips the night discharge and puts the peak at tomorrow's PV rise", () => {
    const nightNow = Date.UTC(2026, 9, 16, 20, 0, 0);
    const n = (x: number) => nightNow + x * 3_600_000;
    const soc: [number, number][] = [
      [n(0.25), 34], // current level, only falling from here
      [n(2), 30],
      [n(8), 10], // trough before sunrise
      [n(14), 60], // tomorrow midday peak
      [n(18), 45],
    ];
    const result = batteryForecast(soc, [], { now: nightNow, timeZone: "UTC" });
    expect(result).toMatchObject({ peakSoc: 60, peakAt: n(14), peakDay: "tomorrow" });
  });

  it("reports no peak when the SoC only falls", () => {
    const soc: [number, number][] = [
      [h(1), 34],
      [h(5), 20],
      [h(10), 8],
    ];
    const result = batteryForecast(soc, [], { now, timeZone: "UTC" });
    expect(result?.peakSoc).toBeUndefined();
    expect(result?.peakDay).toBeUndefined();
  });

  it("reports the reserve floor when discharging from above, or empty without a reserve", () => {
    const soc: [number, number][] = [
      [h(1), 40],
      [h(2), 22],
      [h(3), 18],
      [h(4), 0.2],
    ];
    expect(batteryForecast(soc, [], { now, timeZone: "UTC" })).toMatchObject({
      floorAt: h(4),
      floorKind: "down",
    });
    expect(batteryForecast(soc, [], { now, timeZone: "UTC", reserve: 20 })).toMatchObject({
      floorAt: h(3),
      floorKind: "down",
    });
  });

  it("reports Sockel erreicht when recovering from below the reserve (live emergency charge)", () => {
    // Mirrors live HA: SoC 29 %, reserve 50 %, trajectory climbs to 50 % and stays there.
    const soc: [number, number][] = [
      [h(0.25), 39.5],
      [h(0.5), 50],
      [h(1), 50],
      [h(8), 50],
    ];
    const result = batteryForecast(soc, [], { now, timeZone: "UTC", reserve: 50, currentSoc: 29 });
    expect(result).toMatchObject({
      peakSoc: 50,
      peakAt: h(0.5),
      floorAt: h(0.5),
      floorKind: "up",
    });
  });

  it("finds sustained grid import start and ignores a single-point spike", () => {
    const spike: [number, number][] = [
      [h(1), 0],
      [h(2), -200], // spike, recovers immediately
      [h(3), 0],
    ];
    expect(batteryForecast([[h(1), 40]], spike, { now, timeZone: "UTC" })?.gridImportKind).toBeUndefined();

    const sustained: [number, number][] = [
      [h(1), 0],
      [h(2), -200],
      [h(3), -150],
    ];
    expect(batteryForecast([[h(1), 40]], sustained, { now, timeZone: "UTC" })).toMatchObject({
      gridImportAt: h(2),
      gridImportKind: "starts",
    });
  });

  it("reports Netz bis / durchgehend when import is already running", () => {
    const until: [number, number][] = [
      [h(1), -800],
      [h(2), -700],
      [h(3), 0],
      [h(4), 100],
    ];
    expect(batteryForecast([[h(1), 40]], until, { now, timeZone: "UTC" })).toMatchObject({
      gridImportAt: h(3),
      gridImportKind: "until",
    });

    const ongoing: [number, number][] = [
      [h(1), -800],
      [h(2), -700],
      [h(8), -500],
    ];
    expect(batteryForecast([[h(1), 40]], ongoing, { now, timeZone: "UTC" })).toMatchObject({
      gridImportKind: "ongoing",
    });
  });

  it("ignores simulated import while the battery covers the house (live 2026-10-20 22:06)", () => {
    const grid: [number, number][] = [
      [h(1), -577],
      [h(2), -212],
      [h(3), -29],
      [h(4), -1],
      [h(5), -547],
      [h(6), -726],
      [h(7), -841],
    ];
    const battery: [number, number][] = [
      [h(1), -777],
      [h(2), -837],
      [h(3), -647],
      [h(4), -692],
      [h(5), -162],
      [h(6), 0],
      [h(7), 0],
    ];
    const result = batteryForecast([[h(1), 29]], grid, {
      now,
      timeZone: "UTC",
      currentGrid: -6,
      battery,
    });
    expect(result).toMatchObject({ gridImportAt: h(5), gridImportKind: "starts" });
  });

  it("keeps grid charging as running import", () => {
    const grid: [number, number][] = [
      [h(1), -9800],
      [h(2), -9500],
      [h(3), 0],
    ];
    const battery: [number, number][] = [
      [h(1), 7300],
      [h(2), 7000],
      [h(3), 0],
    ];
    expect(
      batteryForecast([[h(1), 40]], grid, { now, timeZone: "UTC", currentGrid: -9858, battery }),
    ).toMatchObject({ gridImportAt: h(3), gridImportKind: "until" });
  });

  it("returns undefined when the trajectory has no future points", () => {
    expect(batteryForecast([[now - 1000, 40]], [], { now, timeZone: "UTC" })).toBeUndefined();
    expect(batteryForecast([], [], { now, timeZone: "UTC" })).toBeUndefined();
  });
});

describe("autonomy helpers", () => {
  it("parses Maestro autonomy strings and formats ETA labels", () => {
    expect(parseAutonomyHours("2h 54min")).toBeCloseTo(2.9, 5);
    expect(parseAutonomyHours("54min")).toBeCloseTo(0.9, 5);
    expect(parseAutonomyHours("unavailable")).toBeUndefined();
    expect(formatEtaLabel(45 * 60_000)).toBe("45 min");
    expect(formatEtaLabel(3 * 3_600_000)).toBe("3 h");
    expect(formatEtaLabel(3.5 * 3_600_000)).toBe("3 h 30 min");
  });
});

describe("price plan", () => {
  const slot = (price: number, extra = {}) => ({
    start: "2026-10-16T13:00:00+02:00",
    start_local: "13:00",
    price,
    grid_charge_kwh: 0,
    hold: false,
    release: true,
    soc_pct: 10,
    consumption_kwh: 1,
    ...extra,
  });

  it("classifies slots; charging wins over hold", () => {
    expect(slotAction({ grid_charge_kwh: 1.2, hold: true })).toBe("charge");
    expect(slotAction({ grid_charge_kwh: 0, hold: true })).toBe("hold");
    expect(slotAction({ grid_charge_kwh: 0, hold: false })).toBe("release");
  });

  it("drops transitional stub slots so bar width stays sane", () => {
    const at = (iso: string) => slot(0.3, { start: iso });
    const slots = [
      at("2026-10-16T20:15:05+02:00"),
      at("2026-10-16T20:20:00+02:00"),
      at("2026-10-16T21:00:00+02:00"),
      at("2026-10-16T22:00:00+02:00"),
      at("2026-10-16T23:00:00+02:00"),
    ];
    expect(chartSlots(slots).map((s) => s.start)).toEqual(slots.slice(1).map((s) => s.start));
    expect(chartSlots(slots.slice(2))).toHaveLength(3);
    expect(chartSlots(slots.slice(3))).toHaveLength(2);
  });

  it("drops malformed slots and finds price extremes", () => {
    const slots = parseSlots([slot(0.3), slot(0.5), { start: "bad", price: 1 }, null, { start: "2026-10-16T13:00:00+02:00" }]);
    expect(slots).toHaveLength(2);
    expect(priceExtremes(slots)).toMatchObject({ min: { price: 0.3 }, max: { price: 0.5 } });
    expect(priceExtremes([])).toBeUndefined();
    expect(parseSlots("nope")).toEqual([]);
  });

  it("maps plan slots to SoC points for the forecast chart", () => {
    const slots = parseSlots([
      slot(0.3, { start: "2026-10-16T12:00:00+02:00", start_local: "12:00", soc_pct: 40 }),
      slot(0.5, { start: "2026-10-16T13:00:00+02:00", start_local: "13:00", soc_pct: 55 }),
      { start: "2026-10-16T14:00:00+02:00", start_local: "14:00", price: 0.4 },
    ]);
    expect(planSocPoints(slots)).toEqual([
      [Date.parse("2026-10-16T12:00:00+02:00"), 40],
      [Date.parse("2026-10-16T13:00:00+02:00"), 55],
    ]);
    expect(planSocPoints([])).toEqual([]);
  });
});

describe("history", () => {
  it("normalizes compressed and full rows", () => {
    const rows = normalizeHistory([
      { s: "5", lu: 100 },
      { s: "6", lc: 200, lu: 250 },
      { state: "7", last_changed: "1970-01-01T00:05:00Z", attributes: { a: 1 } },
      { s: "x" },
    ]);
    expect(rows.map((r) => [r.state, r.ts])).toEqual([["5", 100000], ["6", 200000], ["7", 300000]]);
    expect(rows[2].attrs).toEqual({ a: 1 });
  });

  it("keeps only numeric states", () => {
    expect(numericPoints(normalizeHistory([{ s: "1", lu: 1 }, { s: "unavailable", lu: 2 }, { s: "3", lu: 3 }]))).toEqual([[1000, 1], [3000, 3]]);
  });

  it("buckets by mean or last value", () => {
    const pts: [number, number][] = [[0, 1], [10, 3], [60, 5], [70, 9]];
    expect(bucket(pts, 60, "mean")).toEqual([[0, 2], [60, 7]]);
    expect(bucket(pts, 60, "last")).toEqual([[0, 3], [60, 9]]);
  });
});

describe("planEmptyKind", () => {
  it("explains strategies that never draw a price-plan chart", () => {
    expect(planEmptyKind("off", {})).toBe("off");
    expect(planEmptyKind("slots", {})).toBe("slots");
    expect(planEmptyKind("threshold", { status: "ok" })).toBe("threshold");
  });

  it("shows computing until the plan snapshot is ready", () => {
    expect(planEmptyKind("dynamic_auto", { enabled: false })).toBe("computing");
    expect(planEmptyKind("dynamic_expert", {})).toBe("computing");
    expect(planEmptyKind("dynamic_auto", { enabled: true })).toBe("computing");
  });

  it("surfaces runner status codes", () => {
    expect(planEmptyKind("dynamic_auto", { enabled: true, status: "no_prices" })).toBe("no_prices");
    expect(planEmptyKind("dynamic_auto", { enabled: true, status: "no_profile" })).toBe("no_profile");
    expect(planEmptyKind("dynamic_auto", { enabled: true, status: "no_room" })).toBe("no_room");
    expect(planEmptyKind("dynamic_auto", { enabled: true, status: "ok" })).toBe("no_plan");
  });
});

describe("timeline", () => {
  const entry = (phase: string, reason: string, ts: string) => ({ phase, reason, timestamp: ts });

  it("is newest first, collapses duplicates and merges the live fallback", () => {
    const hist = normalizeHistory([
      { s: "idle", lu: 1, a: entry("idle", "r1", "2026-10-16T08:00:00+02:00") },
      { s: "corridor", lu: 2, a: entry("corridor", "r2", "2026-10-16T10:00:00+02:00") },
      { s: "corridor", lu: 3, a: entry("corridor", "r2", "2026-10-16T10:05:00+02:00") },
    ]);
    const live = [entry("corridor", "r2", "2026-10-16T10:00:00+02:00"), entry("pv_delay", "r0", "2026-10-16T06:00:00+02:00")];
    const out = buildTimeline(hist, live);
    expect(out.map((o) => o.phase)).toEqual(["corridor", "idle", "pv_delay"]);
    expect(out[0].ts).toBe(Date.parse("2026-10-16T10:00:00+02:00"));
  });

  it("skips unavailable/unknown restarts", () => {
    const hist = normalizeHistory([
      { s: "corridor", lu: 1, a: entry("corridor", "r", "2026-10-16T08:00:00+02:00") },
      { s: "unavailable", lu: 2, a: {} },
      { s: "idle", lu: 3, a: entry("idle", "r", "2026-10-16T09:00:00+02:00") },
    ]);
    expect(buildTimeline(hist, undefined).map((o) => o.phase)).toEqual(["idle", "corridor"]);
  });

  it("respects the limit and ignores rows without a phase", () => {
    const hist = normalizeHistory(
      Array.from({ length: 20 }, (_, i) => ({ s: `p${i}`, lu: i, a: entry(`p${i}`, "", `2026-10-16T${String(i).padStart(2, "0")}:00:00+02:00`) })),
    );
    expect(buildTimeline(hist, undefined, 5)).toHaveLength(5);
    expect(buildTimeline(normalizeHistory([{ s: "", lu: 1 }]), undefined)).toEqual([]);
  });
});
