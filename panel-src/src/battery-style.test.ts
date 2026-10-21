import { describe, expect, it } from "vitest";
import { parseBatteryStyle } from "./battery-style";

describe("parseBatteryStyle", () => {
  it("accepts ring and defaults everything else to pack", () => {
    expect(parseBatteryStyle("pack")).toBe("pack");
    expect(parseBatteryStyle("ring")).toBe("ring");
    expect(parseBatteryStyle("disc")).toBe("pack");
    expect(parseBatteryStyle(null)).toBe("pack");
  });
});
