import { describe, expect, it } from "vitest";
import { emptyModul3Zones, modul3QuartersFrom, modul3StatusFrom } from "./options";

describe("modul3QuartersFrom", () => {
  it("defaults to all four and sorts", () => {
    expect(modul3QuartersFrom(undefined)).toEqual([1, 2, 3, 4]);
    expect(modul3QuartersFrom([4, 1, 1])).toEqual([1, 4]);
  });
});

describe("modul3StatusFrom", () => {
  const zones = emptyModul3Zones();
  zones.nt = { price_ct_kwh: 2.32, windows: [{ start_h: 22.25, end_h: 6.25 }] };
  zones.ht = { price_ct_kwh: 13.58, windows: [{ start_h: 17, end_h: 20 }] };

  it("reports ST outside selected quarters", () => {
    const status = modul3StatusFrom(
      { modul3_enabled: true, modul3_quarters: [1, 4], modul3_tariff_slots: true },
      zones,
      new Date(2026, 6, 15, 23, 0), // July = Q3
    );
    expect(status.active).toBe(false);
    expect(status.zone).toBe("st");
    expect(status.quarter).toBe(3);
    expect(status.derived_slots).toHaveLength(2);
  });

  it("reports NT inside a winter night window", () => {
    const status = modul3StatusFrom(
      { modul3_enabled: true, modul3_quarters: [1, 4], modul3_tariff_slots: true },
      zones,
      new Date(2026, 0, 14, 23, 0), // January = Q1
    );
    expect(status.active).toBe(true);
    expect(status.zone).toBe("nt");
  });

  it("hides derived slots when the switch is off", () => {
    const status = modul3StatusFrom(
      { modul3_enabled: true, modul3_tariff_slots: false },
      zones,
      new Date(2026, 0, 14, 23, 0),
    );
    expect(status.derived_slots).toEqual([]);
  });
});
