import { describe, expect, it } from "vitest";
import { parseTheme } from "./theme";

describe("parseTheme", () => {
  it("keeps the known looks and falls back to dark", () => {
    expect(parseTheme("classic")).toBe("classic");
    expect(parseTheme("e3dc")).toBe("e3dc");
    expect(parseTheme("dark")).toBe("dark");
    expect(parseTheme("light")).toBe("dark");
    expect(parseTheme(null)).toBe("dark");
  });
});
