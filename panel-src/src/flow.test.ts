import { describe, expect, it } from "vitest";
import { electronCount, electronSpeed, flowSegment, placeElectrons } from "./flow";

describe("flowSegment", () => {
  it("keeps the particles in the gap between the circles", () => {
    const d = flowSegment({ x: 180, y: 95 }, { x: 180, y: 250 }, 42, 16);
    expect(d).toBe("M180 137 L180 234");
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
