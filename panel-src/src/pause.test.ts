import { describe, expect, it } from "vitest";
import { pauseLeft, pauseUntil } from "./pause";

describe("pause", () => {
  it("reads the end time from the switch", () => {
    expect(pauseUntil({ attributes: { pause_until: 1_700_000_000 } })).toBe(1_700_000_000);
    expect(pauseUntil({ attributes: {} })).toBeUndefined();
  });

  it("counts whole minutes that are still left", () => {
    const until = 1_700_000_000;
    expect(pauseLeft(until, until * 1000 - 90 * 60_000)).toEqual({ h: 1, m: 30 });
    expect(pauseLeft(until, until * 1000 - 3 * 3_600_000)).toEqual({ h: 3, m: 0 });
    expect(pauseLeft(until, until * 1000 + 1)).toBeUndefined();
  });
});
