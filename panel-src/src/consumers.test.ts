import { describe, expect, it } from "vitest";
import { consumerUnavailable, consumersFromOptions, includedOverflow, newConsumerId, parseConsumers, wattsOf, type Consumer, type FlowConsumer } from "./consumers";
import type { HassEntity } from "./entities";

const entity = (state: string, unit: string): HassEntity => ({
  entity_id: "sensor.x",
  state,
  attributes: { unit_of_measurement: unit },
  last_changed: "",
});

const flow = (watts: number, mode: FlowConsumer["mode"]): FlowConsumer => ({
  id: String(watts),
  name: "x",
  watts,
  mode,
  missing: false,
  icon: "meter",
});

const stored = (entityId: string): Consumer => ({
  id: "a",
  entityId,
  name: "Wallbox",
  mode: "separate",
  icon: "wallbox",
});

describe("consumersFromOptions", () => {
  it("uses the stored list on every device and publishes a local list only once", () => {
    const local = [stored("sensor.local")];
    expect(consumersFromOptions([stored("sensor.server")], local)).toEqual({
      list: [stored("sensor.server")],
      publishLocal: false,
    });
    expect(consumersFromOptions(undefined, local)).toEqual({ list: local, publishLocal: true });
    expect(consumersFromOptions([], local)).toEqual({ list: [], publishLocal: false });
  });
});

describe("newConsumerId", () => {
  it("works without randomUUID", () => {
    expect(newConsumerId()).toMatch(/^[0-9a-f]{16}$/);
  });
});

describe("parseConsumers", () => {
  it("keeps valid rows and drops the rest", () => {
    const rows = parseConsumers([
      { id: "a", entityId: "sensor.wb", name: " Wallbox ", mode: "separate" },
      { entityId: "sensor.wb", name: "dup", mode: "included" },
      { entityId: "number.nope", name: "x", mode: "included" },
      { entityId: "sensor.hp", name: "", mode: "included" },
      { entityId: "sensor.bad", name: "x", mode: "both" },
    ]);
    expect(rows).toEqual([
      { id: "a", entityId: "sensor.wb", name: "Wallbox", mode: "separate", icon: "meter" },
      { id: "sensor.hp", entityId: "sensor.hp", name: "sensor.hp", mode: "included", icon: "meter" },
    ]);
  });

  it("keeps a chosen icon and guesses the wallbox", () => {
    const rows = parseConsumers([
      { entityId: "sensor.e3dc_maestro_wallbox_leistung", name: "Auto", mode: "separate" },
      { entityId: "sensor.klima", name: "Klima", mode: "included", icon: "climate" },
    ]);
    expect(rows.map((row) => row.icon)).toEqual(["wallbox", "climate"]);
  });
});

describe("wattsOf", () => {
  it("scales kilowatts", () => {
    expect(wattsOf(entity("1.5", "kW"))).toBe(1500);
    expect(wattsOf(entity("400", "W"))).toBe(400);
    expect(wattsOf(entity("unavailable", "W"))).toBeUndefined();
    expect(wattsOf(entity("unknown", "W"))).toBeUndefined();
  });
});

describe("consumerUnavailable", () => {
  it("treats unknown as present", () => {
    expect(consumerUnavailable(undefined)).toBe(true);
    expect(consumerUnavailable(entity("unavailable", "W"))).toBe(true);
    expect(consumerUnavailable(entity("unknown", "W"))).toBe(false);
    expect(consumerUnavailable(entity("0", "W"))).toBe(false);
  });
});

describe("includedOverflow", () => {
  it("ignores separately measured loads", () => {
    expect(includedOverflow(2000, [flow(1800, "included"), flow(5000, "separate")])).toBe(false);
    expect(includedOverflow(2000, [flow(2100, "included")])).toBe(true);
    expect(includedOverflow(undefined, [flow(2100, "included")])).toBe(false);
  });
});
