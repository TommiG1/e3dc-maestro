import { describe, expect, it } from "vitest";
import { showHaMenu } from "./entities";

describe("showHaMenu", () => {
  it("matches ha-menu-button: narrow or always_hidden", () => {
    expect(showHaMenu(true, "docked")).toBe(true);
    expect(showHaMenu(true, "auto")).toBe(true);
    expect(showHaMenu(true, "always_hidden")).toBe(true);
    expect(showHaMenu(true, undefined)).toBe(true);
    expect(showHaMenu(false, "always_hidden")).toBe(true);
    expect(showHaMenu(false, "docked")).toBe(false);
    expect(showHaMenu(false, "auto")).toBe(false);
    expect(showHaMenu(false, undefined)).toBe(false);
  });
});
