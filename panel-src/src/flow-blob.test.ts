import { describe, expect, it } from "vitest";
import { autonomyTone, blobBaseRadius, blobPath, blobPulls, blobRadiusAt } from "./flow-blob";

describe("autonomyTone", () => {
  it("is high when the house runs without grid import", () => {
    expect(autonomyTone(2000, 500)).toBe(1);
    expect(autonomyTone(2000, 0)).toBe(1);
  });

  it("falls as grid import covers the house", () => {
    expect(autonomyTone(2000, -1000)).toBeCloseTo(0.5);
    expect(autonomyTone(2000, -2000)).toBe(0);
    expect(autonomyTone(2000, -4000)).toBe(0);
  });
});

describe("blobPulls", () => {
  it("points lobes at the four main nodes", () => {
    const pulls = blobPulls({ pv: 3000, house: 1500, grid: -800, battery: -1200 });
    expect(pulls).toHaveLength(4);
    expect(pulls.map((p) => p.angle)).toEqual([-Math.PI / 2, Math.PI, 0, Math.PI / 2]);
    expect(pulls[0].strength).toBeGreaterThan(pulls[2].strength);
  });

  it("skips idle consumers", () => {
    const pulls = blobPulls({
      pv: 0,
      house: 0,
      grid: 0,
      battery: 0,
      consumers: [
        { angle: 0.2, watts: 10 },
        { angle: 0.4, watts: 900 },
      ],
    });
    expect(pulls).toHaveLength(1);
    expect(pulls[0].angle).toBe(0.4);
  });
});

describe("blobPath", () => {
  it("closes and stretches toward the strongest pull", () => {
    const base = blobBaseRadius(4000, false);
    const pulls = blobPulls({ pv: 4000, house: 0, grid: 0, battery: 0 });
    const d = blobPath(base, pulls, 36);
    expect(d.startsWith("M")).toBe(true);
    expect(d.endsWith(" Z")).toBe(true);
    const top = blobRadiusAt(-Math.PI / 2, base, pulls);
    const side = blobRadiusAt(0, base, pulls);
    expect(top).toBeGreaterThan(side);
  });
});
