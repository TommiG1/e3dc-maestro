import { describe, expect, it } from "vitest";
import { calendarDay, isCalendarToday, parseCalendarDay, shiftCalendarDay, sumChanges } from "./history";

describe("sumChanges", () => {
  it("sums numeric changes and ignores empty rows", () => {
    expect(sumChanges([{ change: 1.5 }, { change: null }, { change: 2 }])).toBe(3.5);
    expect(sumChanges([])).toBeUndefined();
    expect(sumChanges(undefined)).toBeUndefined();
  });
});

describe("calendar day helpers", () => {
  it("formats and parses local calendar days", () => {
    const d = new Date(2026, 9, 20, 15, 30);
    expect(calendarDay(d)).toBe("2026-10-20");
    expect(parseCalendarDay("2026-10-20")).toEqual(new Date(2026, 9, 20));
  });

  it("shifts across month boundaries", () => {
    expect(shiftCalendarDay("2026-10-01", -1)).toBe("2026-09-30");
    expect(shiftCalendarDay("2026-10-31", 1)).toBe("2026-11-01");
  });

  it("recognises today", () => {
    expect(isCalendarToday(calendarDay())).toBe(true);
    expect(isCalendarToday(shiftCalendarDay(calendarDay(), -1))).toBe(false);
  });

  it("falls back on invalid keys", () => {
    const parsed = parseCalendarDay("nope");
    expect(parsed.getHours()).toBe(0);
    expect(parsed.getMinutes()).toBe(0);
  });
});
