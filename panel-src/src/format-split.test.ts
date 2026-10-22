import { describe, expect, it } from "vitest";
import { consistentEnergyParts, consistentWattParts } from "./format-split";

const kw = (tenths: number) => `${(tenths / 10).toFixed(1)} kW`;
const w = (watts: number) => `${watts} W`;
const kwh = (v: number) => v.toFixed(1);

describe("consistentWattParts", () => {
  it("keeps Haupt + Zusatz equal to the displayed total", () => {
    // Independent rounding would be 5.1 + 2.1 = 7.2 while total is 7.1
    const parts = consistentWattParts(5050, 2090, kw, w);
    expect(parts.total).toBe("7.1 kW");
    expect(parts.main).toBe("5.0 kW");
    expect(parts.extra).toBe("2.1 kW");
  });

  it("stays in watts below 1 kW", () => {
    const parts = consistentWattParts(400, 250, kw, w);
    expect(parts.total).toBe("650 W");
    expect(parts.main).toBe("400 W");
    expect(parts.extra).toBe("250 W");
  });
});

describe("consistentEnergyParts", () => {
  it("keeps day Haupt + Zusatz equal to PV total", () => {
    const parts = consistentEnergyParts(55.86, 18.84, kwh);
    expect(parts).toEqual({ total: "55.9", main: "37.1", extra: "18.8" });
  });
});
