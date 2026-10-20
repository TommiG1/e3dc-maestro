import { describe, expect, it } from "vitest";
import {
  bannerVisible,
  parseBannerHidden,
  parseDismissed,
  pruneDismissed,
  type AlertKey,
} from "./alert-banner";

describe("pruneDismissed", () => {
  it("keeps only keys that are still active", () => {
    const dismissed = new Set<AlertKey>(["reserve_charge", "unreachable"]);
    expect([...pruneDismissed(dismissed, ["reserve_charge"])]).toEqual(["reserve_charge"]);
  });

  it("clears everything when alerts are gone", () => {
    const dismissed = new Set<AlertKey>(["reserve_charge"]);
    expect(pruneDismissed(dismissed, []).size).toBe(0);
  });
});

describe("bannerVisible", () => {
  it("hides when permanently disabled", () => {
    expect(bannerVisible(["unreachable"], new Set(), true)).toBe(false);
  });

  it("hides after dismiss until a new key appears", () => {
    const dismissed = new Set<AlertKey>(["reserve_charge"]);
    expect(bannerVisible(["reserve_charge"], dismissed, false)).toBe(false);
    expect(bannerVisible(["reserve_charge", "unreachable"], dismissed, false)).toBe(true);
  });

  it("shows again after the same alert cleared and returns", () => {
    let dismissed = new Set<AlertKey>(["reserve_charge"]);
    dismissed = pruneDismissed(dismissed, []);
    expect(bannerVisible(["reserve_charge"], dismissed, false)).toBe(true);
  });
});

describe("parseDismissed", () => {
  it("ignores unknown entries", () => {
    expect([...parseDismissed(["reserve_charge", "nope", 3])]).toEqual(["reserve_charge"]);
  });
});

describe("parseBannerHidden", () => {
  it("reads the stored flag", () => {
    expect(parseBannerHidden("1")).toBe(true);
    expect(parseBannerHidden("0")).toBe(false);
    expect(parseBannerHidden(null)).toBe(false);
  });
});
