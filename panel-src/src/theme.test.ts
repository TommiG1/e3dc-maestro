import { describe, expect, it } from "vitest";
import { flowNeedsOutline, isDarkTheme, parseTheme, THEMES } from "./theme";

describe("parseTheme", () => {
  it("keeps the known looks and falls back to dark", () => {
    for (const id of THEMES) {
      expect(parseTheme(id)).toBe(id);
    }
    expect(parseTheme("light")).toBe("dark");
    expect(parseTheme(null)).toBe("dark");
  });
});

describe("isDarkTheme / flowNeedsOutline", () => {
  it("treats classic and myE3DC as light", () => {
    expect(isDarkTheme("classic")).toBe(false);
    expect(isDarkTheme("e3dc")).toBe(false);
    expect(flowNeedsOutline("classic")).toBe(true);
    expect(flowNeedsOutline("e3dc")).toBe(true);
  });

  it("treats the night looks as dark", () => {
    for (const id of ["dark", "oled", "amber", "leitstand", "tibber"] as const) {
      expect(isDarkTheme(id)).toBe(true);
      expect(flowNeedsOutline(id)).toBe(false);
    }
  });
});
