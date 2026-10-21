import { describe, expect, it } from "vitest";
import { parseFlowStyle } from "./flow-style";

describe("parseFlowStyle", () => {
  it("accepts blob and city, and defaults everything else to nodes", () => {
    expect(parseFlowStyle("blob")).toBe("blob");
    expect(parseFlowStyle("city")).toBe("city");
    expect(parseFlowStyle("split")).toBe("nodes");
    expect(parseFlowStyle("nodes")).toBe("nodes");
    expect(parseFlowStyle("sankey")).toBe("nodes");
    expect(parseFlowStyle(null)).toBe("nodes");
  });
});
