import { describe, expect, it } from "vitest";
import {
  defaultFanT,
  fanPoint,
  freePlaceExtent,
  houseFan,
  parseConsumerPlaces,
  placeFromPoint,
  R_DEFAULT_SEPARATE,
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

describe("placeFromPoint", () => {
  it("stores a free offset from the house origin", () => {
    const origin = { x: 400, y: 200 };
    expect(placeFromPoint(450, 160, origin)).toEqual({ dx: 50, dy: -40 });
  });

  it("clamps to bounds when given", () => {
    const origin = { x: 400, y: 200 };
    const place = placeFromPoint(10, 10, origin, { minX: 40, maxX: 500, minY: 40, maxY: 400 });
    expect(place).toEqual({ dx: -360, dy: -160 });
  });
});

describe("resolveConsumerPositions", () => {
  it("uses custom free offsets when set", () => {
    const fan = houseFan({ x: 400, y: 200 }, 2);
    const pos = resolveConsumerPositions(["a", "b"], { a: { dx: 20, dy: -30 } }, fan);
    expect(pos[0].x).toBeCloseTo(420, 5);
    expect(pos[0].y).toBeCloseTo(170, 5);
  });

  it("converts legacy fan slots", () => {
    const fan = houseFan({ x: 400, y: 200 }, 1);
    const expected = fanPoint(0.5, 1, fan);
    const [pos] = resolveConsumerPositions(["a"], { a: { t: 0.5, r: 1 } }, fan);
    expect(pos.x).toBeCloseTo(expected.x, 5);
    expect(pos.y).toBeCloseTo(expected.y, 5);
  });

  it("defaults separately measured loads closer to the house", () => {
    const fan = houseFan({ x: 400, y: 200 }, 1);
    const [included] = resolveConsumerPositions(["a"], {}, fan, ["included"]);
    const [separate] = resolveConsumerPositions(["b"], {}, fan, ["separate"]);
    const dist = (p: { x: number; y: number }) => Math.hypot(p.x - fan.origin.x, p.y - fan.origin.y);
    expect(dist(separate)).toBeCloseTo(fan.radius * R_DEFAULT_SEPARATE, 5);
    expect(dist(included)).toBeCloseTo(fan.radius, 5);
  });
});

describe("parseConsumerPlaces", () => {
  it("keeps free offsets and legacy fan slots", () => {
    expect(parseConsumerPlaces({ x: { dx: 12, dy: -8 } })).toEqual({ x: { dx: 12, dy: -8 } });
    expect(parseConsumerPlaces({ x: { t: 0.4, r: 1.1 } })).toEqual({ x: { t: 0.4, r: 1.1 } });
    expect(parseConsumerPlaces({ x: { t: "no" } })).toEqual({});
  });
});

describe("freePlaceExtent", () => {
  it("grows the viewBox for free placements", () => {
    expect(freePlaceExtent([{ x: 700, y: 100 }], 600, 420).w).toBeGreaterThan(600);
  });
});
