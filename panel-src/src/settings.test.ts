import { describe, expect, it } from "vitest";
import { SETTING_TIPS } from "./setting-tips";
import { makeI18n } from "./i18n";
import { PLAN_CONTROLS, SETTINGS_GROUPS, bundleRows, matchingSettings, pvRowVisible, resolveSettingsArea, rowQuiet, rowVisible } from "./settings";

describe("SETTINGS_GROUPS", () => {
  const rows = SETTINGS_GROUPS.flatMap((group) => group.rows);

  it("lists each setting once", () => {
    expect(new Set(rows).size).toBe(rows.length);
  });

  it("follows the setup order and keeps old links", () => {
    expect(SETTINGS_GROUPS.map((group) => group.id)).toEqual([
      "plant",
      "safety",
      "tariff",
      "pv",
      "loads",
      "auto",
      "system",
    ]);
    expect(resolveSettingsArea("hardware")).toBe("plant");
    expect(resolveSettingsArea("flex")).toBe("loads");
    expect(resolveSettingsArea("classic")).toBe("classic");
    expect(resolveSettingsArea("sizing")).toBe("sizing");
    expect(resolveSettingsArea("setup")).toBe("setup");
    expect(resolveSettingsArea("nope")).toBeUndefined();
  });

  it("gives every area its own id and icon", () => {
    const ids = SETTINGS_GROUPS.map((group) => group.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const group of SETTINGS_GROUPS) expect(group.icon.length).toBeGreaterThan(0);
  });
});

describe("matchingSettings", () => {
  const t = makeI18n("de").t;

  it("returns undefined while the query is empty", () => {
    expect(matchingSettings("", t, "de", () => undefined)).toBeUndefined();
    expect(matchingSettings("   ", t, "de", () => undefined)).toBeUndefined();
  });

  it("finds groups, tips, and option fields", () => {
    const byReserve = matchingSettings("Notstrom", t, "de", () => undefined);
    expect(byReserve?.some((hit) => hit.groupId === "safety")).toBe(true);

    const byTip = matchingSettings("Notladung", t, "de", () => undefined);
    expect(byTip?.some((hit) => hit.id.includes("charge_threshold"))).toBe(true);

    const byOpt = matchingSettings("Preis-Sensor", t, "de", () => undefined);
    expect(byOpt?.some((hit) => hit.groupId === "tariff" && hit.id.includes("price_sensor"))).toBe(true);
  });

  it("uses entity labels when provided", () => {
    const hits = matchingSettings("Wunderreserve", t, "de", (key) =>
      key === "fixed_reserve_soc" ? "Wunderreserve %" : undefined,
    );
    expect(hits?.some((hit) => hit.title.includes("Wunderreserve"))).toBe(true);
  });
});

describe("PLAN_CONTROLS", () => {
  const tariff = SETTINGS_GROUPS.find((group) => group.id === "tariff")?.rows ?? [];

  it("only offers tariff settings, each once", () => {
    const rows = PLAN_CONTROLS.flatMap((group) => group.rows);
    expect(new Set(rows).size).toBe(rows.length);
    for (const key of rows) expect(tariff).toContain(key);
    expect(rows).toContain("grid_charge_strategy");
  });
});

describe("rowVisible", () => {
  const tariff = SETTINGS_GROUPS.find((group) => group.id === "tariff")?.rows ?? [];
  const shown = (strategy: Parameters<typeof rowVisible>[1]["strategy"], expert = false) =>
    tariff.filter((key) => rowVisible(key, { strategy, expert }));

  it("shows everything while the backend has no strategy select", () => {
    expect(shown(undefined)).toEqual(tariff);
  });

  it("keeps the standard view free of raw switches and plan tuning", () => {
    for (const strategy of ["off", "slots", "threshold", "dynamic_auto", "dynamic_expert"] as const) {
      const rows = shown(strategy);
      expect(rows).toContain("grid_charge_strategy");
      expect(rows).toContain("fixed_buy_price");
      expect(rows).toContain("tariff_mode");
      expect(rows).not.toContain("price_plan_enabled");
      expect(rows).not.toContain("dynamic_tariff_enabled");
    }
    expect(shown("dynamic_auto", true)).toContain("price_plan_enabled");
  });

  it("shows only what the strategy reads", () => {
    expect(shown("off")).not.toContain("max_grid_charge_kwh");
    expect(shown("slots")).toContain("low_slot_target_soc");
    expect(shown("slots")).not.toContain("cheap_threshold");
    expect(shown("threshold")).toContain("cheap_threshold");
    expect(shown("dynamic_auto")).toEqual(expect.arrayContaining(["price_plan_active", "price_plan_max_soc"]));
    expect(shown("dynamic_auto")).not.toContain("price_plan_efficiency");
    expect(shown("dynamic_expert")).toContain("price_plan_efficiency");
    expect(shown("slots")).not.toContain("low_slot_hold_discharge");
    expect(shown("slots", true)).toContain("low_slot_hold_discharge");
  });
});

describe("pv rows", () => {
  const pv = SETTINGS_GROUPS.find((group) => group.id === "pv");
  const rows = pv?.rows ?? [];

  it("hides the unused summer maximum and folds power and special cases", () => {
    expect(rows).not.toContain("summer_maximum_hour");
    expect(pv?.sections.filter((section) => section.fold).map((section) => section.title)).toEqual(["secShape", "secYield"]);
  });

  it("shows the time set the engine reads", () => {
    const shown = (astro: boolean | undefined, expert = false) => rows.filter((key) => pvRowVisible(key, { astro, expert }));
    expect(shown(undefined)).toEqual(expect.arrayContaining(["winter_minimum_hour", "charge_start_sunrise_offset_h"]));
    expect(shown(true)).toContain("charge_end_sunset_offset_h");
    expect(shown(true)).not.toContain("summer_charge_end");
    expect(shown(false)).toContain("summer_charge_end");
    expect(shown(false)).not.toContain("charge_start_sunrise_offset_h");
    expect(shown(false)).not.toContain("pv_forecast_safety_factor");
    expect(shown(false, true)).toContain("low_yield_reference_kwh");
  });

  it("greys a detail only when every parent switch is off", () => {
    const off = () => false as boolean | undefined;
    const on = () => true as boolean | undefined;
    expect(rowQuiet("charge_target", off)).toBe(false);
    expect(rowQuiet("charge_target_late", off)).toBe(true);
    expect(rowQuiet("charge_target_late", () => undefined)).toBe(false);
    expect(rowQuiet("lower_corridor", off)).toBe(true);
    expect(rowQuiet("lower_corridor", (key) => key === "lower_corridor_pause_enabled")).toBe(false);
    expect(rowQuiet("delay_min_soc", (key) => (key === "astro_enabled" ? true : false))).toBe(false);
    expect(rowQuiet("upper_corridor", on)).toBe(false);
  });

  it("puts a switch and its own fields in one block", () => {
    const target = bundleRows(["charge_target", "two_tier_enabled", "charge_target_late", "late_charge_end_h"]);
    expect(target).toEqual([
      { key: "charge_target", children: [] },
      { key: "two_tier_enabled", children: ["charge_target_late", "late_charge_end_h"] },
    ]);
    const corridor = bundleRows(["advanced_corridor", "lower_corridor", "upper_corridor", "lower_corridor_pause_enabled"]);
    expect(corridor.find((row) => row.key === "advanced_corridor")?.children).toEqual(["upper_corridor"]);
    expect(corridor.map((row) => row.key)).toContain("lower_corridor");
    expect(bundleRows(["pv_forecast_enabled", "delay_min_soc"]).find((row) => row.key === "pv_forecast_enabled")?.children).toEqual([
      "delay_min_soc",
    ]);
    expect(bundleRows(["charge_target_late"])).toEqual([{ key: "charge_target_late", children: [] }]);
    expect(
      bundleRows(["ht_enabled", "ht_on", "ht_off", "ht_min", "ht_sockel", "ht_sat", "ht_sun"]).find((row) => row.key === "ht_enabled")
        ?.children,
    ).toEqual(["ht_on", "ht_off", "ht_min", "ht_sockel", "ht_sat", "ht_sun"]);
  });
});

describe("SETTING_TIPS", () => {
  it("has a German and an English sentence for every setting", () => {
    const rows = SETTINGS_GROUPS.flatMap((group) => group.rows);
    for (const key of rows) {
      const tip = SETTING_TIPS[key];
      expect(tip?.de.length, key).toBeGreaterThan(20);
      expect(tip?.en.length, key).toBeGreaterThan(20);
    }
  });
});
