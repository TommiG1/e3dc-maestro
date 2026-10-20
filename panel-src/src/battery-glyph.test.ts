import { describe, expect, it } from "vitest";
import { batteryFlowFromAmps, batteryFlowFromWatts } from "./battery-glyph";

describe("batteryFlowFromAmps", () => {
  it("maps plant current to charge, discharge or idle", () => {
    expect(batteryFlowFromAmps(undefined)).toBe("idle");
    expect(batteryFlowFromAmps(0.1)).toBe("idle");
    expect(batteryFlowFromAmps(2)).toBe("charge");
    expect(batteryFlowFromAmps(-3)).toBe("discharge");
  });
});

describe("batteryFlowFromWatts", () => {
  it("maps live power to charge, discharge or idle", () => {
    expect(batteryFlowFromWatts(undefined)).toBe("idle");
    expect(batteryFlowFromWatts(20)).toBe("idle");
    expect(batteryFlowFromWatts(200)).toBe("charge");
    expect(batteryFlowFromWatts(-400)).toBe("discharge");
  });
});
