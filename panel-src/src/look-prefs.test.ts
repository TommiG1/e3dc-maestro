import { describe, expect, it } from "vitest";
import { parseCorners, parseDensity } from "./look-prefs";

describe("look prefs parsers", () => {
  it("keeps known density and corners values", () => {
    expect(parseDensity("compact")).toBe("compact");
    expect(parseDensity("airy")).toBe("airy");
    expect(parseDensity("normal")).toBe("normal");
    expect(parseDensity("wide")).toBe("normal");
    expect(parseCorners("soft")).toBe("soft");
    expect(parseCorners("sharp")).toBe("sharp");
    expect(parseCorners("medium")).toBe("medium");
    expect(parseCorners("auto")).toBe("auto");
    expect(parseCorners("round")).toBe("auto");
  });
});
