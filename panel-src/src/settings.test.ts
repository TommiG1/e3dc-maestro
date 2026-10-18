import { describe, expect, it } from "vitest";
import { SETTING_TIPS } from "./setting-tips";
import { PLAN_CONTROLS, SETTINGS_GROUPS, resolveSettingsArea } from "./settings";

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
