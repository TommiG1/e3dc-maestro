import { describe, expect, it } from "vitest";
import { percentMarks, percentStep, rasterStep } from "./slider-field";

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

describe("percentStep", () => {
  it("keeps a 0 to 100 slider on tens", () => {
    expect(percentStep(0, 100, 1)).toBe(10);
    expect(percentMarks(0, 100, 10)).toEqual([0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
  });

  it("uses whole numbers for a 30 to 95 threshold", () => {
    expect(percentStep(30, 95, 1)).toBe(5);
    const marks = percentMarks(30, 95, 5);
    expect(marks[0]).toBe(30);
    expect(marks.at(-1)).toBe(95);
    expect(marks.every(Number.isInteger)).toBe(true);
    expect(marks).not.toContain(36.5);
  });
});
