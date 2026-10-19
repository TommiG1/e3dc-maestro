import { describe, expect, it } from "vitest";
import { SETTING_TIPS } from "./setting-tips";
import { PLAN_CONTROLS, SETTINGS_GROUPS, resolveSettingsArea, rowVisible } from "./settings";

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
      expect(rows).not.toContain("price_plan_enabled");
      expect(rows).not.toContain("tariff_mode");
    }
    expect(shown("dynamic_auto", true)).toContain("tariff_mode");
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
