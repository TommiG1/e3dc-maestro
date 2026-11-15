import { describe, expect, it } from "vitest";
import { makeFmt } from "./format";
import { energyPeriodSums } from "./history";
import { makeI18n } from "./i18n";
import { e3dcConflicts, parseWallboxStatus, surplusPoints, wallboxEventText, wallboxSentence } from "./wallbox";

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
});

describe("wallboxEventText", () => {
  it("formats start and stop", () => {
    expect(wallboxEventText({ ts: 0, kind: "start", current: 7, surplusW: 5000 }, t, fmt)).toBe("Ladung mit 7 A gestartet, Überschuss 5,0 kW");
    expect(wallboxEventText({ ts: 0, kind: "stop", surplusW: 800 }, t, fmt)).toContain("800 W");
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

  it("stays quiet when Maestro does not control or the feature is off", () => {
    const sw = { sun: true, batteryFirst: true, mixedLock: true };
    expect(e3dcConflicts(sw, { ...all, control: false })).toEqual([]);
    expect(e3dcConflicts({ batteryFirst: true, mixedLock: true }, { control: true, priority: false, guard: false })).toEqual([]);
    expect(e3dcConflicts({}, all)).toEqual([]);
  });
});
