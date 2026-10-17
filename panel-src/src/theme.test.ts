import { describe, expect, it } from "vitest";
import { parseTheme } from "./theme";

describe("parseTheme", () => {
  it("keeps the two looks and falls back to dark", () => {
    expect(parseTheme("classic")).toBe("classic");
    expect(parseTheme("dark")).toBe("dark");
    expect(parseTheme("light")).toBe("dark");
    expect(parseTheme(null)).toBe("dark");
  });
});
