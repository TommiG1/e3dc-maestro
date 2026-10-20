import { describe, expect, it } from "vitest";
import { E } from "./entities";
import {
  buildBalanceDays,
  calendarDay,
  dayBalance,
  isCalendarToday,
  parseCalendarDay,
  periodStart,
  shiftCalendarDay,
  statRowStartMs,
  sumChanges,
} from "./history";

describe("sumChanges", () => {
  it("sums numeric changes and ignores empty rows", () => {
    expect(sumChanges([{ change: 1.5 }, { change: null }, { change: 2 }])).toBe(3.5);
    expect(sumChanges([])).toBeUndefined();
    expect(sumChanges(undefined)).toBeUndefined();
  });
});

describe("dayBalance", () => {
  it("matches revenue + saving − cost − wear", () => {
    expect(dayBalance({ feedRevenue: 2, saving: 3, costToday: 1, wear: 0.5 })).toBe(3.5);
  });

  it("needs every part", () => {
    expect(dayBalance({ feedRevenue: 2, saving: 3, costToday: 1 })).toBeUndefined();
  });
});

describe("statRowStartMs", () => {
  it("accepts unix seconds, ms and ISO strings", () => {
    expect(statRowStartMs({ start: 1_700_000_000 })).toBe(1_700_000_000_000);
    expect(statRowStartMs({ start: 1_700_000_000_000 })).toBe(1_700_000_000_000);
    expect(statRowStartMs({ start: "2026-10-20T00:00:00.000Z" })).toBe(Date.parse("2026-10-20T00:00:00.000Z"));
    expect(statRowStartMs({})).toBeUndefined();
  });
});

describe("buildBalanceDays", () => {
  it("fills each local day and computes the balance", () => {
    const now = new Date(2026, 9, 20, 15, 0).getTime(); // Tue 2026-10-20 → Mon–Tue
    const monday = periodStart("week", now);
    expect(calendarDay(new Date(monday))).toBe("2026-10-19");
    const dayMs = (offset: number) => monday + offset * 86400000;
    const row = (offset: number, change: number) => ({ start: dayMs(offset) / 1000, change });
    const days = buildBalanceDays(
      {
        [E.costToday]: [row(0, 1), row(1, 2)],
        [E.feedRevenue]: [row(0, 4), row(1, 1)],
        [E.saving]: [row(0, 0.5), row(1, 0.5)],
        [E.wear]: [row(0, 0.25), row(1, 0.25)],
      },
      "week",
      now,
    );
    expect(days.map((d) => d.day)).toEqual(["2026-10-19", "2026-10-20"]);
    expect(days[0]?.balance).toBeCloseTo(4 + 0.5 - 1 - 0.25);
    expect(days[1]?.balance).toBeCloseTo(1 + 0.5 - 2 - 0.25);
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
