import { describe, expect, it } from "vitest";
import {
  bucket,
  chartSlots,
  buildTimeline,
  normalizeHistory,
  numericPoints,
  parseSlots,
  parseTrajectory,
  phaseBands,
  planEmptyKind,
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
