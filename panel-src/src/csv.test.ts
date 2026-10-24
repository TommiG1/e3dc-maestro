import { describe, expect, it } from "vitest";
import { csvText, debugDumpFilename } from "./csv";

describe("csv helpers", () => {
  it("escapes commas", () => {
    expect(csvText([["a,b", "c"]])).toBe('"a,b",c');
  });

  it("builds a stable debug dump filename", () => {
    const name = debugDumpFilename(new Date("2026-10-24T12:34:56.000Z"));
    expect(name).toBe("maestro-debug-2026-10-24-12-34-56.json");
  });
});
