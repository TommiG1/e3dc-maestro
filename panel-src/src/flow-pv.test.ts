import { describe, expect, it } from "vitest";
import { pvClusterTotal, pvExtraPos, splitFlowPv } from "./flow";

describe("splitFlowPv", () => {
  it("keeps total as Haupt-PV when no Zusatz", () => {
    expect(splitFlowPv(3200)).toEqual({ pv: 3200, pvExtra: 0 });
    expect(splitFlowPv(3200, 0)).toEqual({ pv: 3200, pvExtra: 0 });
  });

  it("splits Haupt and Zusatz without double-counting", () => {
    expect(splitFlowPv(4500, 1200)).toEqual({ pv: 3300, pvExtra: 1200 });
  });

  it("clamps when Zusatz exceeds total", () => {
    expect(splitFlowPv(800, 1200)).toEqual({ pv: 0, pvExtra: 1200 });
  });

  it("treats missing values as zero", () => {
    expect(splitFlowPv(undefined, undefined)).toEqual({ pv: 0, pvExtra: 0 });
  });
});

describe("pvClusterTotal", () => {
  it("sums Haupt and Zusatz for the PV node label", () => {
    expect(pvClusterTotal(3300, 1200)).toBe(4500);
  });

  it("ignores negative parts", () => {
    expect(pvClusterTotal(-10, 500)).toBe(500);
  });
});

describe("pvExtraPos", () => {
  it("places Zusatz to the left of Haupt-PV on the same baseline", () => {
    const pos = pvExtraPos({ x: 200, y: 80 }, false);
    expect(pos.x).toBe(200 - (42 + 22 + 10));
    expect(pos.y).toBe(80);
  });
});
