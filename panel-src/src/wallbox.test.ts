import { describe, expect, it } from "vitest";
import { makeFmt } from "./format";
import { energyPeriodSums } from "./history";
import { makeI18n, type Key } from "./i18n";
import { e3dcConflicts, parseWallboxStatus, recommendedCase, surplusPoints, wallboxEventText, wallboxSentence } from "./wallbox";

const { t } = makeI18n("de");
const fmt = makeFmt("de");

const attrs = (over: Record<string, unknown> = {}) => ({
  mode: "waiting",
  control_enabled: true,
  surplus_w: 2500,
  start_w: 4140,
  min_w: 4140,
  max_w: 11040,
  min_current: 6,
  max_current: 16,
  phases: 3,
  set_current: 0,
  priority_active: false,
  guard_active: false,
  controller: "e3dc",
  history: [
    { timestamp: "2026-11-15T12:00:00+01:00", kind: "start", current: 7, surplus_w: 5000 },
    { timestamp: "kaputt", kind: "start" },
    { timestamp: "2026-11-15T11:00:00+01:00", kind: "weird" },
  ],
  ...over,
});

describe("parseWallboxStatus", () => {
  it("returns undefined before the first cycle", () => {
    expect(parseWallboxStatus(undefined)).toBeUndefined();
    expect(parseWallboxStatus({ mode: "nope" })).toBeUndefined();
  });

  it("reads numbers, treats 0 A as off and drops broken history rows", () => {
    const s = parseWallboxStatus(attrs())!;
    expect(s.mode).toBe("waiting");
    expect(s.setCurrent).toBeUndefined();
    expect(s.history).toHaveLength(1);
    expect(s.history[0]).toMatchObject({ kind: "start", current: 7, surplusW: 5000 });
  });

  it("reads charge mode, grid flag, explanation and history details", () => {
    const s = parseWallboxStatus(
      attrs({
        wallbox_mode: "now",
        from_grid: true,
        explanation: "Sofort: Volllast aus dem Netz",
        phases_source: "sensor",
        phases_entity: "sensor.wallbox_phases",
        history: [
          { timestamp: "2026-11-15T12:00:00+01:00", kind: "mode_reset" },
          { timestamp: "2026-11-15T12:01:00+01:00", kind: "start", current: 16, reason: "Sofort", from_grid: true },
        ],
      }),
    )!;
    expect(s.chargeMode).toBe("now");
    expect(s.fromGrid).toBe(true);
    expect(s.explanation).toBe("Sofort: Volllast aus dem Netz");
    expect(s.phasesSource).toBe("sensor");
    expect(s.phasesEntity).toBe("sensor.wallbox_phases");
    expect(s.history).toHaveLength(2);
    expect(s.history[1]).toMatchObject({ kind: "start", reason: "Sofort", fromGrid: true });
  });
});

describe("wallboxSentence", () => {
  it("names the missing surplus while waiting", () => {
    const text = wallboxSentence(parseWallboxStatus(attrs())!, t, fmt);
    expect(text).toContain("1,6 kW");
    expect(text).toContain("4,1 kW");
  });

  it("says when control is off and appends active guards", () => {
    expect(wallboxSentence(parseWallboxStatus(attrs({ control_enabled: false, mode: "idle" }))!, t, fmt)).toBe(t("wbSayOff"));
    const charging = wallboxSentence(parseWallboxStatus(attrs({ mode: "charging", set_current: 10, guard_active: true }))!, t, fmt);
    expect(charging).toContain("10 A");
    expect(charging).toContain(t("wbSayGuard"));
  });

  it("prefers the backend explanation when present", () => {
    const line = "Solar + Netz: Preis 24,9 ct unter Grenze 28 ct, 16 A × 1 Phase";
    expect(wallboxSentence(parseWallboxStatus(attrs({ explanation: line }))!, t, fmt)).toBe(line);
  });
});

describe("wallboxEventText", () => {
  it("formats start and stop", () => {
    expect(wallboxEventText({ ts: 0, kind: "start", current: 7, surplusW: 5000 }, t, fmt)).toBe("Ladung mit 7 A gestartet, Überschuss 5,0 kW");
    expect(wallboxEventText({ ts: 0, kind: "stop", surplusW: 800 }, t, fmt)).toContain("800 W");
  });

  it("appends reason and handles mode reset", () => {
    expect(wallboxEventText({ ts: 0, kind: "start", current: 16, reason: "Sofort" }, t, fmt)).toContain("Sofort");
    expect(wallboxEventText({ ts: 0, kind: "mode_reset" }, t, fmt)).toBe(t("wbEvModeReset"));
  });
});

describe("surplusPoints", () => {
  it("holds the last value of each series and never goes negative", () => {
    const pv: [number, number][] = [[0, 3000], [10, 1000]];
    const house: [number, number][] = [[5, 500]];
    expect(surplusPoints(pv, house)).toEqual([[5, 2500], [10, 500]]);
    expect(surplusPoints([[0, 200]], [[0, 900]])).toEqual([[0, 0]]);
  });
});

describe("energyPeriodSums", () => {
  it("adds past days and the live today value without double counting", () => {
    const now = new Date(2026, 10, 15, 12).getTime(); // Sonntag
    const day = (d: number, kwh: number) => {
      const date = new Date(2026, 10, d);
      return { day: `2026-11-${String(d).padStart(2, "0")}`, ts: date.getTime(), kwh };
    };
    const days = [day(1, 5), day(10, 4), day(14, 3), day(15, 99)];
    expect(energyPeriodSums(days, 2, now)).toEqual({ week: 9, month: 14, year: 14 });
  });
});

describe("e3dcConflicts", () => {
  const all = { control: true, priority: true, guard: true };

  it("flags sun mode, battery first and blocked discharge", () => {
    expect(e3dcConflicts({ sun: true, batteryFirst: true, batteryToCar: false }, all)).toEqual([
      "wbConflictSun",
      "wbConflictBatteryFirst",
      "wbConflictDischarge",
    ]);
    expect(e3dcConflicts({ sun: false, mixedLock: true }, all)).toEqual(["wbConflictDischarge"]);
  });

  it("uses the grid-charging sun conflict for Now and Solar + grid", () => {
    expect(e3dcConflicts({ sun: true }, { ...all, mode: "now" })).toEqual(["wbConflictSunGrid"]);
    expect(e3dcConflicts({ sun: true }, { ...all, mode: "solar_grid" })).toEqual(["wbConflictSunGrid"]);
    expect(e3dcConflicts({ sun: true }, { ...all, mode: "solar" })).toEqual(["wbConflictSun"]);
  });

  it("stays quiet when Maestro does not control or the feature is off", () => {
    const sw = { sun: true, batteryFirst: true, mixedLock: true };
    expect(e3dcConflicts(sw, { ...all, control: false })).toEqual([]);
    expect(e3dcConflicts({ batteryFirst: true, mixedLock: true }, { control: true, priority: false, guard: false })).toEqual([]);
    expect(e3dcConflicts({}, all)).toEqual([]);
  });
});

describe("Empfohlene Einstellungen", () => {
  it("wählt den Fall nach Regelung und Typ", () => {
    expect(recommendedCase(false, "e3dc")).toBe("self");
    expect(recommendedCase(false, "generic")).toBe("self");
    expect(recommendedCase(true, "generic")).toBe("generic");
    expect(recommendedCase(true, "e3dc")).toBe("e3dc");
  });

  it("nennt je Schritt Ort und Anweisung in beiden Sprachen", () => {
    for (const lang of ["de", "en"]) {
      const { t: tr } = makeI18n(lang);
      for (const [name, count] of [["wbRecE3dc", 5], ["wbRecGeneric", 6], ["wbRecSelf", 4]] as const) {
        for (let i = 1; i <= count; i++) {
          const [where, text] = tr(`${name}${i}` as Key).split("|");
          expect(where.length).toBeGreaterThan(3);
          expect(text?.length).toBeGreaterThan(10);
        }
      }
    }
  });
});
