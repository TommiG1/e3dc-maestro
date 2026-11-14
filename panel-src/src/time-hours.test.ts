import { describe, expect, it } from "vitest";
import { hoursToTime, timeToHours } from "./time-hours";

describe("timeToHours", () => {
  it("parses quarter hours including Jena and Bayernwerk edges", () => {
    expect(timeToHours("06:15")).toBe(6.25);
    expect(timeToHours("16:45")).toBe(16.75);
    expect(timeToHours("21:45")).toBe(21.75);
    expect(timeToHours("22:15")).toBe(22.25);
    expect(timeToHours("00:00")).toBe(0);
    expect(timeToHours("00:00", true)).toBe(24);
  });

  it("rejects non-quarter minutes and bad strings", () => {
    expect(timeToHours("06:10")).toBeNull();
    expect(timeToHours("24:00")).toBeNull();
    expect(timeToHours("6:15")).toBeNull();
    expect(timeToHours("")).toBeNull();
  });
});

describe("hoursToTime", () => {
  it("formats fractional hours and maps 24 to midnight", () => {
    expect(hoursToTime(6.25)).toBe("06:15");
    expect(hoursToTime(16.75)).toBe("16:45");
    expect(hoursToTime(0)).toBe("00:00");
    expect(hoursToTime(24)).toBe("00:00");
  });

  it("rejects values outside the quarter-hour grid", () => {
    expect(hoursToTime(6.1)).toBeNull();
    expect(hoursToTime(-1)).toBeNull();
    expect(hoursToTime(24.25)).toBeNull();
  });
});

describe("midnight window round-trip", () => {
  it("keeps 22:15 → 06:15 as distinct start and end", () => {
    const start = timeToHours("22:15");
    const end = timeToHours("06:15");
    expect(start).toBe(22.25);
    expect(end).toBe(6.25);
    expect(start).not.toBe(end);
    expect(hoursToTime(start!)).toBe("22:15");
    expect(hoursToTime(end!)).toBe("06:15");
  });
});
