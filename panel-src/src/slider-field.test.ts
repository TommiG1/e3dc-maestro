import { describe, expect, it } from "vitest";
import { rasterStep } from "./slider-field";

describe("rasterStep", () => {
  it("uses a tenth of a percent span", () => {
    expect(rasterStep(0, 100, 1)).toBe(10);
  });

  it("keeps both ends on the grid for a watt span", () => {
    expect(rasterStep(100, 10000, 100)).toBe(990);
  });

  it("does not make a coarse step finer", () => {
    expect(rasterStep(0, 100, 25)).toBe(25);
  });
});
