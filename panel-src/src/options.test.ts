import { describe, expect, it } from "vitest";
import { actionTo, entityChoices, entityInputAction, selectValue, slotsFrom } from "./options";

describe("entityInputAction", () => {
  const exists = (id: string) => id === "sensor.helios_forecast_power_now";

  it("never saves a half-typed search text", () => {
    expect(entityInputAction("helios", exists)).toEqual({ kind: "ignore" });
    expect(entityInputAction("sensor.helios_forecast_power", exists)).toEqual({ kind: "ignore" });
  });

  it("saves a pasted id that exists and clears an empty field", () => {
    expect(entityInputAction(" sensor.helios_forecast_power_now ", exists)).toEqual({
      kind: "set",
      id: "sensor.helios_forecast_power_now",
    });
    expect(entityInputAction("  ", exists)).toEqual({ kind: "clear" });
  });
});

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
