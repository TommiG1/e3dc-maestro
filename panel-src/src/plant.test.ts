import { describe, expect, it } from "vitest";
import type { HassEntity } from "./entities";
import { makeFmt } from "./format";
import { cellTone, currentError, formatPlant, modeLabel, packFill, plantKw, plantValue } from "./plant";

const fmt = makeFmt("de");
const entity = (state: string, unit?: string): HassEntity => ({
  entity_id: "sensor.x",
  state,
  attributes: unit ? { unit_of_measurement: unit } : {},
  last_changed: "",
});

describe("formatPlant", () => {
  it("rounds a denormal percentage to zero", () => {
    expect(formatPlant(entity("4.2e-43", "%"), fmt)).toBe("0 %");
  });

  it("keeps the sign of watt values", () => {
    expect(formatPlant(entity("-250", "W"), fmt)).toBe("−250 W");
  });

  it("formats kilowatts with one decimal", () => {
    expect(formatPlant(entity("19.125", "kW"), fmt)).toBe("19,1 kW");
  });
});

describe("modeLabel", () => {
  const t = (key: string) => (key === "plantMode0" ? "Normal" : key);

  it("maps the RSCP mode index", () => {
    expect(modeLabel("0", t as never)).toBe("Normal");
  });

  it("leaves an unknown mode as reported", () => {
    expect(modeLabel("9", t as never)).toBe("9");
  });
});

describe("plant scales", () => {
  it("treats a denormal percentage as zero", () => {
    expect(plantValue(entity("4.2e-43", "%"))).toBe(0);
  });

  it("scales watts into kilowatts", () => {
    expect(plantKw(entity("-250", "W"))).toBe(-0.25);
  });

  it("fills a pack from its share of the installed capacity", () => {
    expect(packFill(2.8, 19.6, 2)).toBeCloseTo(28.57, 1);
  });

  it("does not invent a fill without a capacity", () => {
    expect(packFill(2.8, undefined, 2)).toBeUndefined();
  });

  it("marks a tired cell from the device-reported state of health", () => {
    expect(cellTone(96)).toBe("soh-good");
    expect(cellTone(80)).toBe("soh-mid");
    expect(cellTone(40)).toBe("soh-low");
  });

  it("shows a saved error only while it is still from today", () => {
    const now = Date.parse("2026-10-17T20:00:00Z");
    const fresh = entity("1");
    fresh.attributes = { items: [{ time: now - 60 * 60 * 1000 }], latest_message: "Netz L1Min" };
    const stale = entity("41");
    stale.attributes = { items: [{ time: Date.parse("2026-08-30T18:34:00Z") }], latest_message: "Netz L3Min" };
    expect(currentError(fresh, now)).toBe("Netz L1Min");
    expect(currentError(stale, now)).toBeUndefined();
  });
});
