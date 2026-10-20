import { describe, expect, it } from "vitest";
import {
  defaultFanT,
  fanPoint,
  houseFan,
  parseConsumerPlaces,
  placeFromPoint,
  resolveConsumerPositions,
} from "./consumer-layout";

describe("defaultFanT", () => {
  it("spreads consumers along the fan", () => {
    expect(defaultFanT(0, 1)).toBe(0.5);
    expect(defaultFanT(0, 3)).toBe(0);
    expect(defaultFanT(1, 3)).toBe(0.5);
    expect(defaultFanT(2, 3)).toBe(1);
  });
});

describe("fanPoint / placeFromPoint", () => {
  it("round-trips a point on the fan", () => {
    const fan = houseFan({ x: 500, y: 200 }, 4);
    const pt = fanPoint(0.25, 1.1, fan);
    const back = placeFromPoint(pt.x, pt.y, fan);
    expect(back.t).toBeCloseTo(0.25, 2);
    expect(back.r).toBeCloseTo(1.1, 2);
  });
});

describe("resolveConsumerPositions", () => {
  it("uses custom t when set, otherwise the default slot", () => {
    const fan = houseFan({ x: 400, y: 200 }, 2);
    const pos = resolveConsumerPositions(["a", "b"], { b: { t: 0.1, r: 1 } }, fan);
    expect(pos[0].y).toBeLessThan(pos[1].y);
    const custom = resolveConsumerPositions(["a", "b"], { a: { t: 1, r: 1 }, b: { t: 0, r: 1 } }, fan);
    expect(custom[0].y).toBeGreaterThan(custom[1].y);
  });
});

describe("parseConsumerPlaces", () => {
  it("keeps finite clamped places", () => {
    expect(parseConsumerPlaces({ x: { t: 0.4, r: 2 } })).toEqual({ x: { t: 0.4, r: 1.35 } });
    expect(parseConsumerPlaces({ x: { t: "no" } })).toEqual({});
  });
});
