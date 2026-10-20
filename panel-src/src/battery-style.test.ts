import { describe, expect, it } from "vitest";
import { parseBatteryStyle } from "./battery-style";

describe("parseBatteryStyle", () => {
  it("accepts pack and defaults everything else to ring", () => {
    expect(parseBatteryStyle("pack")).toBe("pack");
    expect(parseBatteryStyle("ring")).toBe("ring");
    expect(parseBatteryStyle("disc")).toBe("ring");
    expect(parseBatteryStyle(null)).toBe("ring");
  });
});
