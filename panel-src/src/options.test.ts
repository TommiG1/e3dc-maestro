import { describe, expect, it } from "vitest";
import { actionTo, entityChoices, selectValue, slotsFrom } from "./options";

describe("entityChoices", () => {
  const ids = ["sensor.soc", "sensor.price", "switch.pump", "binary_sensor.car"];

  it("keeps the requested domains and matches the query", () => {
    expect(entityChoices(ids, ["sensor"], "price")).toEqual(["sensor.price"]);
    expect(entityChoices(ids, ["switch", "binary_sensor"], "")).toEqual(["switch.pump", "binary_sensor.car"]);
  });
});

describe("slotsFrom", () => {
  it("keeps weekday windows and drops broken rows", () => {
    expect(
      slotsFrom([
        { weekdays: [0, 6], start_h: 5, end_h: 21, class_: "low", min_reserve_soc: 20 },
        { weekdays: "mon" },
        null,
      ]),
    ).toEqual([{ weekdays: [0, 6], start_h: 5, end_h: 21, class_: "low", min_reserve_soc: 20 }, { weekdays: [], start_h: 0, end_h: 24, class_: "normal" }]);
  });
});

describe("action and select helpers", () => {
  it("builds a service call and reads a numeric phase as text", () => {
    expect(actionTo("switch.turn_on", "switch.pump")).toEqual({ action: "switch.turn_on", target: { entity_id: "switch.pump" } });
    expect(actionTo("  ", "")).toBeNull();
    expect(selectValue(3, ["1", "3"])).toBe("3");
    expect(selectValue("1", ["1", "3"])).toBe("1");
  });
});
