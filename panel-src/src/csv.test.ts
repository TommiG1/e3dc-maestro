import { describe, expect, it } from "vitest";
import { csvText } from "./csv";

describe("csvText", () => {
  it("quotes cells that contain a comma, quote or newline", () => {
    expect(csvText([["a", "b, c"], ['say "hi"', "ok\nnext"]])).toBe('a,"b, c"\n"say ""hi""","ok\nnext"');
  });
});
