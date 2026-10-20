import { describe, expect, it } from "vitest";
import { cityBasementFill, cityLoadFills, cityRoofGlow } from "./flow-city";

describe("cityLoadFills", () => {
  it("stays empty when the house is idle", () => {
    expect(cityLoadFills(0, 12000)).toEqual([0, 0, 0, 0, 0, 0]);
    expect(cityLoadFills(20, 12000)).toEqual([0, 0, 0, 0, 0, 0]);
  });

  it("fills tanks one after another up to inverter power", () => {
    // 2 kW of 12 kW → 1/6 of capacity → first bar ~100%
    expect(cityLoadFills(2000, 12000)[0]).toBeCloseTo(1);
    expect(cityLoadFills(2000, 12000)[1]).toBeCloseTo(0);

    // 5 kW of 12 kW → 2.5 tanks
    const mid = cityLoadFills(5000, 12000);
    expect(mid[0]).toBeCloseTo(1);
    expect(mid[1]).toBeCloseTo(1);
    expect(mid[2]).toBeCloseTo(0.5);
    expect(mid[3]).toBeCloseTo(0);

    // full inverter rating → all six full
    expect(cityLoadFills(12000, 12000)).toEqual([1, 1, 1, 1, 1, 1]);
    expect(cityLoadFills(20000, 12000)).toEqual([1, 1, 1, 1, 1, 1]);
  });

  it("uses a smaller inverter as a tighter scale", () => {
    // 3 kW of 6 kW → half capacity → three full bars
    expect(cityLoadFills(3000, 6000)).toEqual([1, 1, 1, 0, 0, 0]);
  });
});

describe("cityRoofGlow", () => {
  it("is dim without PV and brighter with power", () => {
    expect(cityRoofGlow(0)).toBeLessThan(0.2);
    expect(cityRoofGlow(3000)).toBeGreaterThan(cityRoofGlow(500));
    expect(cityRoofGlow(6000)).toBeCloseTo(0.92);
  });
});

describe("cityBasementFill", () => {
  it("scales with SoC from the cellar floor", () => {
    expect(cityBasementFill(undefined, 40)).toBe(0);
    expect(cityBasementFill(50, 40)).toBe(20);
    expect(cityBasementFill(100, 40)).toBe(40);
  });
});
