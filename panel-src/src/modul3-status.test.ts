import { describe, expect, it } from "vitest";
import {
  emptyModul3Zones,
  modul3HasOwnPrices,
  modul3HasOwnWindows,
  modul3PriceFor,
  modul3QuartersFrom,
  modul3StatusFrom,
  modul3WithoutQuarterPrices,
  modul3WithoutQuarterWindows,
  modul3WithPrice,
  modul3ZonesFrom,
} from "./options";

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

  it("uses own quarter windows and lists slot quarters", () => {
    const own = {
      ...zones,
      nt: { ...zones.nt, quarter_windows: { "4": [{ start_h: 23, end_h: 5 }] } },
    };
    const options = { modul3_enabled: true, modul3_quarters: [1, 4], modul3_tariff_slots: true };
    expect(modul3StatusFrom(options, own, new Date(2026, 10, 16, 22, 30)).zone).toBe("st");
    expect(modul3StatusFrom(options, own, new Date(2026, 10, 16, 23, 30)).zone).toBe("nt");
    expect(modul3StatusFrom(options, own, new Date(2026, 0, 14, 22, 30)).zone).toBe("nt");
    const lows = modul3StatusFrom(options, own).derived_slots.filter((s) => s.class_ === "low");
    expect(lows).toEqual([
      { start_h: 22.25, end_h: 6.25, class_: "low", quarters: [1] },
      { start_h: 23, end_h: 5, class_: "low", quarters: [4] },
    ]);
  });

  it("round-trips quarter windows through the parser", () => {
    const parsed = modul3ZonesFrom({
      nt: { price_ct_kwh: 2, windows: [], quarter_windows: { "4": [{ start_h: 23, end_h: 5 }], "9": [] } },
    });
    expect(parsed.nt.quarter_windows).toEqual({ "4": [{ start_h: 23, end_h: 5 }] });
    expect(modul3HasOwnWindows(parsed, 4)).toBe(true);
    expect(modul3HasOwnWindows({ ...parsed, nt: modul3WithoutQuarterWindows(parsed.nt, 4) }, 4)).toBe(false);
  });

  it("round-trips quarter prices and keeps windows when clearing prices", () => {
    const parsed = modul3ZonesFrom({
      nt: {
        price_ct_kwh: 2,
        windows: [{ start_h: 22, end_h: 6 }],
        quarter_windows: { "1": [{ start_h: 23, end_h: 5 }] },
        quarter_prices: { "1": 2.5, "9": 1 },
      },
      st: { price_ct_kwh: 6, windows: [], quarter_prices: { "1": 7 } },
    });
    expect(parsed.nt.quarter_prices).toEqual({ "1": 2.5 });
    expect(modul3PriceFor(parsed.nt, 1)).toBe(2.5);
    expect(modul3PriceFor(parsed.nt, 4)).toBe(2);
    expect(modul3HasOwnPrices(parsed, 1)).toBe(true);
    const cleared = {
      ...parsed,
      nt: modul3WithoutQuarterPrices(parsed.nt, 1),
      st: modul3WithoutQuarterPrices(parsed.st, 1),
    };
    expect(modul3HasOwnPrices(cleared, 1)).toBe(false);
    expect(cleared.nt.quarter_windows).toEqual({ "1": [{ start_h: 23, end_h: 5 }] });
    expect(modul3PriceFor(modul3WithPrice(parsed.nt, 1, 3), 1)).toBe(3);
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
