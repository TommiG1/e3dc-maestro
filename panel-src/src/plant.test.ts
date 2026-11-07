import { describe, expect, it } from "vitest";
import type { HassEntity } from "./entities";
import { makeFmt } from "./format";
import {
  cellTone,
  currentError,
  formatPlant,
  formatSohEta,
  modeLabel,
  moduleGrossKwh,
  moduleSohEntity,
  packFill,
  plantGrossKwh,
  plantKw,
  plantValue,
  sohForecastView,
  sohPackForecast,
  usableEnergyKwh,
} from "./plant";

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

describe("usableEnergyKwh", () => {
  const states: Record<string, HassEntity> = {
    ah1: entity("228.06", "Ah"),
    v1: entity("48.5", "V"),
    ah2: entity("114.03", "Ah"),
    v2: entity("48.4", "V"),
    off: entity("unavailable", "Ah"),
  };
  const lookup = (id: string) => states[id];

  it("sums usable Ah times voltage over all packs", () => {
    const kwh = usableEnergyKwh(
      [{ entities: { usableCapacity: "ah1", voltage: "v1" } }, { entities: { usableCapacity: "ah2", voltage: "v2" } }],
      lookup,
    );
    expect(kwh).toBeCloseTo((228.06 * 48.5 + 114.03 * 48.4) / 1000, 3);
  });

  it("skips packs without readable values", () => {
    expect(usableEnergyKwh([{ entities: { usableCapacity: "off", voltage: "v1" } }, { entities: {} }], lookup)).toBeUndefined();
  });
});

describe("moduleGrossKwh", () => {
  const states: Record<string, HassEntity> = {
    ah: entity("126", "Ah"),
    v: entity("51.8", "V"),
    sAh: entity("33.25", "Ah"),
    sV: entity("102.4", "V"),
    off: entity("unavailable", "Ah"),
  };
  const lookup = (id: string) => states[id];
  const lv = { entities: { designCapacity: "ah", designVoltage: "v" } };
  const hv = { entities: { designCapacity: "sAh", designVoltage: "sV" } };

  it("matches the installed capacity of the S10E (three 126 Ah modules)", () => {
    expect(moduleGrossKwh([lv, lv, lv], lookup)).toBeCloseTo(19.58, 2);
  });

  it("works for series modules of an S10X across packs", () => {
    expect(plantGrossKwh([{ modules: [hv, hv, hv, hv] }, { modules: [lv] }], lookup)).toBeCloseTo(4 * 3.405 + 6.527, 2);
  });

  it("skips modules without readable values", () => {
    expect(moduleGrossKwh([{ entities: { designCapacity: "off", designVoltage: "v" } }, { entities: {} }], lookup)).toBeUndefined();
    expect(plantGrossKwh([{}], lookup)).toBeUndefined();
  });
});

describe("moduleSohEntity", () => {
  const states: Record<string, HassEntity> = {
    rep: entity("87", "%"),
    calc: entity("91", "%"),
    gone: entity("unavailable", "%"),
  };
  const lookup = (id: string) => states[id];

  it("prefers the device-reported value", () => {
    expect(moduleSohEntity({ sohReported: "rep", sohCalc: "calc" }, lookup)).toBe(states.rep);
  });

  it("falls back to the calculated value", () => {
    expect(moduleSohEntity({ sohCalc: "calc" }, lookup)).toBe(states.calc);
    expect(moduleSohEntity({ sohReported: "gone", sohCalc: "calc" }, lookup)).toBe(states.calc);
  });

  it("returns nothing without sensors", () => {
    expect(moduleSohEntity({}, lookup)).toBeUndefined();
  });
});

describe("soh forecast helpers", () => {
  it("formats an eta month in German", () => {
    expect(formatSohEta("2028-11", "de")).toMatch(/2028/);
    expect(formatSohEta("bad", "de")).toBeUndefined();
  });

  it("reads the matching pack row from the forecast sensor", () => {
    const sensor = entity("24.5", "mo");
    sensor.attributes = {
      insufficient_history: false,
      packs: [
        { name: "Battery Pack 1", rate_pct_per_year: -3.3, months_to_80: 27, eta_80_iso: "2029-01" },
        { name: "Battery Pack 2", rate_pct_per_year: -3.5, months_to_80: 23, eta_80_iso: "2028-10" },
      ],
    };
    expect(sohPackForecast(sensor, "Battery Pack 2")?.eta_80_iso).toBe("2028-10");
    expect(sohPackForecast(sensor, "Missing")).toBeUndefined();
  });

  it("shows a collecting countdown instead of hiding the row", () => {
    const sensor = entity("62", "d");
    sensor.attributes = {
      status: "collecting",
      insufficient_history: true,
      days_until_ready: 62,
      packs: [{ name: "Battery Pack 1", insufficient_history: true, days_until_ready: 62, status: "collecting" }],
    };
    expect(sohPackForecast(sensor, "Battery Pack 1")).toBeUndefined();
    expect(sohForecastView(sensor, "Battery Pack 1")).toEqual({ kind: "collecting", days: 62 });
  });
});
