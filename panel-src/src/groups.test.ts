import { describe, expect, it } from "vitest";
import { collapsedFromStorage, parseCollapsed } from "./groups";

describe("parseCollapsed", () => {
  it("keeps known group ids", () => {
    expect([...parseCollapsed(["today", "balance"])]).toEqual(["today", "balance"]);
  });

  it("drops unknown ids and non-strings", () => {
    expect([...parseCollapsed(["today", "nope", 3, null])]).toEqual(["today"]);
  });

  it("falls back to everything open for bad input", () => {
    expect(parseCollapsed(null).size).toBe(0);
    expect(parseCollapsed({ today: true }).size).toBe(0);
  });
});

describe("collapsedFromStorage", () => {
  it("starts with the live number groups closed", () => {
    expect([...collapsedFromStorage(null, null)].sort()).toEqual(["balance", "balancePulse", "today"]);
  });

  it("keeps a saved choice and a previously closed plant group", () => {
    expect([...collapsedFromStorage(null, '["plant-phases"]')].sort()).toEqual(["balance", "balancePulse", "plant-phases", "today"]);
    expect([...collapsedFromStorage("[]", '["today"]')]).toEqual([]);
  });
});
