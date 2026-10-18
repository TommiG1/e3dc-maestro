import { describe, expect, it } from "vitest";
import { asMonths } from "./charts";

describe("asMonths", () => {
  it("keeps twelve monthly values", () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    expect(asMonths(values)).toEqual(values);
    expect(asMonths(values.slice(0, 11))).toBeUndefined();
    expect(asMonths([...values.slice(0, 11), "x"])).toBeUndefined();
  });
});
