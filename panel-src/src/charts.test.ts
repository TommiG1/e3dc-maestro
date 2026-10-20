import { describe, expect, it } from "vitest";
import { asMonths, socArc, socRingGradient } from "./charts";

describe("asMonths", () => {
  it("keeps twelve monthly values", () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    expect(asMonths(values)).toEqual(values);
    expect(asMonths(values.slice(0, 11))).toBeUndefined();
    expect(asMonths([...values.slice(0, 11), "x"])).toBeUndefined();
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
