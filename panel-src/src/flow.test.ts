import { describe, expect, it } from "vitest";
import { batteryFill, compactConsumerPositions, compactFlowHeight, electronCount, electronSpeed, flowSegment, iconFit, nodeIconFit, placeElectrons } from "./flow";

describe("flowSegment", () => {
  it("keeps the particles in the gap between the circles", () => {
    const d = flowSegment({ x: 180, y: 95 }, { x: 180, y: 250 }, 42, 16);
    expect(d).toBe("M180 137 L180 234");
  });
});

describe("compactConsumerPositions", () => {
  it("lists consumers down the right side, clear of the battery caption", () => {
    const places = compactConsumerPositions(3, 360);
    expect(places.map((p) => p.x)).toEqual([320, 320, 320]);
    expect(places[0].y).toBeGreaterThan(520);
    expect(places[1].y - places[0].y).toBeGreaterThanOrEqual(44);
    expect(places[2].y - places[1].y).toBeGreaterThanOrEqual(44);
    expect(compactFlowHeight(3)).toBeGreaterThan(places[2].y + 16);
  });
});

describe("iconFit", () => {
  it("fills most of the circle and keeps the tallest icon clear of the ring", () => {
    for (const radius of [42, 26, 16]) {
      const scale = iconFit(radius);
      expect(scale * 24).toBeLessThan(radius * 2);
      expect((scale * 20) / 2).toBeLessThan(radius - 4);
    }
    expect(iconFit(42)).toBeGreaterThan(3);
  });

  it("places the main nodes halfway between the old size and the full fit", () => {
    const mid = nodeIconFit(42);
    expect(mid).toBeGreaterThan(1.08);
    expect(mid).toBeLessThan(iconFit(42));
    expect(mid).toBeCloseTo((1.08 + iconFit(42)) / 2);
  });
});

describe("batteryFill", () => {
  it("rises from the bottom of the battery outline", () => {
    expect(batteryFill(undefined)).toBeUndefined();
    expect(batteryFill(0)?.height ?? 0).toBe(0);
    const half = batteryFill(50)!;
    const full = batteryFill(140)!;
    expect(half.height).toBeCloseTo(full.height / 2);
    expect(half.y).toBeGreaterThan(full.y);
    expect(half.y + half.height).toBeCloseTo(full.y + full.height);
  });
});

describe("electrons", () => {
  it("scales count and speed with power", () => {
    expect(electronCount(0)).toBe(0);
    expect(electronCount(100)).toBe(2);
    expect(electronCount(5000)).toBe(5);
    expect(electronSpeed(5000)).toBeGreaterThan(electronSpeed(100));
  });

  it("fades a particle in along the link", () => {
    const el = {
      attrs: {} as Record<string, string>,
      getAttribute(name: string) {
        return ({ "data-x1": "0", "data-y1": "0", "data-x2": "100", "data-y2": "0", "data-speed": "1", "data-phase": "0" })[name] ?? null;
      },
      setAttribute(name: string, value: string) {
        this.attrs[name] = value;
      },
    };
    placeElectrons([el as unknown as Element], 500);
    expect(el.attrs.transform).toBe("translate(50.0 0.0)");
    expect(Number(el.attrs.opacity)).toBeGreaterThan(0.9);
  });
});
