import { describe, expect, it } from "vitest";
import { E } from "./entities";
import {
  buildBalanceDays,
  calendarDay,
  canShiftBalanceForward,
  dayBalance,
  formatBalanceRange,
  isCalendarToday,
  parseCalendarDay,
  peekLruCache,
  periodStart,
  resolveBalanceRange,
  shiftBalanceAnchor,
  shiftCalendarDay,
  statRowStartMs,
  sumChanges,
  touchLruCache,
  weekStartOf,
} from "./history";

describe("touchLruCache", () => {
  it("evicts the oldest entry when over the limit", () => {
    const map = new Map<string, number>();
    touchLruCache(map, "a", 1, 2);
    touchLruCache(map, "b", 2, 2);
    touchLruCache(map, "c", 3, 2);
    expect([...map.keys()]).toEqual(["b", "c"]);
    expect(peekLruCache(map, "b")).toBe(2);
    touchLruCache(map, "d", 4, 2);
    expect([...map.keys()]).toEqual(["b", "d"]);
  });
});

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

  it("treats missing parts as zero so month/year totals still resolve", () => {
    expect(dayBalance({ feedRevenue: 107.65, saving: 285.1, costToday: 4.98 })).toBeCloseTo(387.77);
    expect(dayBalance({})).toBeUndefined();
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

describe("resolveBalanceRange", () => {
  const now = new Date(2026, 9, 20, 15, 0).getTime(); // Tue

  it("resolves Monday-start weeks and live end", () => {
    const range = resolveBalanceRange("week", "2026-10-20", now);
    expect(calendarDay(weekStartOf("2026-10-20"))).toBe("2026-10-19");
    expect(range.start).toBe("2026-10-19");
    expect(range.end).toBe("2026-10-26");
    expect(range.live).toBe(true);
    expect(range.endMs).toBe(now);
  });

  it("resolves a past month fully", () => {
    const range = resolveBalanceRange("month", "2026-09-15", now);
    expect(range.start).toBe("2026-09-01");
    expect(range.end).toBe("2026-10-01");
    expect(range.live).toBe(false);
    expect(range.endMs).toBe(parseCalendarDay("2026-10-01").getTime());
  });

  it("resolves a year and clamps future anchors", () => {
    const range = resolveBalanceRange("year", "2027-06-01", now);
    expect(range.anchor).toBe("2026-10-20");
    expect(range.start).toBe("2026-01-01");
    expect(range.live).toBe(true);
  });

  it("shifts grain units and blocks forward on live day", () => {
    expect(shiftBalanceAnchor("month", "2026-10-20", -1, now)).toBe("2026-09-20");
    const liveDay = resolveBalanceRange("day", "2026-10-20", now);
    expect(canShiftBalanceForward(liveDay, now)).toBe(false);
    const past = resolveBalanceRange("day", "2026-10-18", now);
    expect(canShiftBalanceForward(past, now)).toBe(true);
  });

  it("formats labels", () => {
    const live = resolveBalanceRange("day", "2026-10-20", now);
    expect(formatBalanceRange(live, "de", "Heute")).toBe("Heute");
    const month = resolveBalanceRange("month", "2026-09-01", now);
    expect(formatBalanceRange(month, "de", "Heute")).toMatch(/September/i);
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
