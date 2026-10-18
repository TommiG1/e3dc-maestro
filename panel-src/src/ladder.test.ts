import { describe, expect, it } from "vitest";
import { LADDER, LADDER_BANDS, ladderActive } from "./ladder";
import { SETTINGS_GROUPS } from "./settings";

describe("LADDER", () => {
  const groups = new Set(SETTINGS_GROUPS.map((group) => group.id));

  it("points every rung at a settings area", () => {
    for (const step of LADDER) expect(groups.has(step.group), step.id).toBe(true);
  });

  it("lists each rung in exactly one band", () => {
    const ids = LADDER_BANDS.flatMap((band) => band.steps);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(ids)).toEqual(new Set(LADDER.map((step) => step.id)));
  });

  it("highlights the rung that is actually deciding", () => {
    expect(ladderActive("emergency")).toBe("emergency");
    expect(ladderActive("grid_charge", true)).toBe("price");
    expect(ladderActive("grid_charge", false)).toBe("grid");
    expect(ladderActive("grid_hold", false)).toBe("hold");
    expect(ladderActive("corridor", false, true)).toBe("low");
    expect(ladderActive("corridor")).toBe("corridor");
    expect(ladderActive("pv_delay")).toBe("corridor");
    expect(ladderActive("manual")).toBeUndefined();
    expect(ladderActive(undefined)).toBeUndefined();
  });
});
