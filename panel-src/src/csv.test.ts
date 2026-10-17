import { describe, expect, it } from "vitest";
import { csvText } from "./csv";
import { sumChanges } from "./history";

describe("csvText", () => {
  it("quotes cells that contain a comma, quote or newline", () => {
    expect(csvText([["a", "b, c"], ['say "hi"', "ok\nnext"]])).toBe('a,"b, c"\n"say ""hi""","ok\nnext"');
  });
});

describe("sumChanges", () => {
  it("sums numeric changes and ignores empty rows", () => {
    expect(sumChanges([{ change: 1.5 }, { change: null }, { change: 2 }])).toBe(3.5);
    expect(sumChanges([])).toBeUndefined();
    expect(sumChanges(undefined)).toBeUndefined();
  });
});
