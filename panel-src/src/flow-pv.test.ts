import { describe, expect, it } from "vitest";
import { splitFlowPv } from "./flow";

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
