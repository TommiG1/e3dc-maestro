import { describe, expect, it } from "vitest";
import { parseCollapsed } from "./groups";

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
