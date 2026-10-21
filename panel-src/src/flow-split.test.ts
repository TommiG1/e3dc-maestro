import { describe, expect, it } from "vitest";
import type { FlowConsumer } from "./consumers";
import { splitByMode, totalConsumptionW } from "./flow-split";

const row = (watts: number, mode: FlowConsumer["mode"], id = String(watts)): FlowConsumer => ({
  id,
  name: id,
  entityId: `sensor.${id}`,
  watts,
  mode,
  missing: false,
  icon: "meter",
});

describe("totalConsumptionW", () => {
  it("adds separately measured loads to the house meter", () => {
    expect(totalConsumptionW(273, [row(35, "separate"), row(100, "included")])).toBe(308);
    expect(totalConsumptionW(undefined, [row(50, "separate")])).toBe(50);
    expect(totalConsumptionW(200, [])).toBe(200);
  });
});

describe("splitByMode", () => {
  it("groups included under house and separate under Verbrauch", () => {
    const { included, separate } = splitByMode([row(10, "included", "a"), row(20, "separate", "b")]);
    expect(included.map((c) => c.id)).toEqual(["a"]);
    expect(separate.map((c) => c.id)).toEqual(["b"]);
  });
});
