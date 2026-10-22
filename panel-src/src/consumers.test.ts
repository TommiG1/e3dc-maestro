import { describe, expect, it } from "vitest";
import {
  consumerUnavailable,
  consumersFromOptions,
  includedOverflow,
  newConsumerId,
  OVERFLOW_HOLD_MS,
  overflowHeld,
  parseConsumers,
  separateDayEnergy,
  visibleInFlow,
  WALLBOX_ENTITY,
  wattsOf,
  type Consumer,
  type FlowConsumer,
} from "./consumers";
import type { HassEntity } from "./entities";

const entity = (state: string, unit: string): HassEntity => ({
  entity_id: "sensor.x",
  state,
  attributes: { unit_of_measurement: unit },
  last_changed: "",
});

const flow = (watts: number, mode: FlowConsumer["mode"], entityId = "sensor.x"): FlowConsumer => ({
  id: String(watts),
  name: "x",
  entityId,
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

  it("skips the wallbox when Maestro house already had it subtracted", () => {
    const wallbox = {
      id: "wb",
      name: "openWB",
      entityId: WALLBOX_ENTITY,
      watts: 9000,
      mode: "included" as const,
      missing: false,
      icon: "wallbox" as const,
    };
    // wallbox_included_in_house: house sensor is pure household; wallbox must not re-enter the sum.
    expect(includedOverflow(2000, [wallbox, flow(100, "included")], { wallboxInHouse: true })).toBe(false);
    expect(includedOverflow(2000, [wallbox, flow(2100, "included")], { wallboxInHouse: true })).toBe(true);
    // Without that flag the wallbox counts like any other included load.
    expect(includedOverflow(2000, [wallbox], { wallboxInHouse: false })).toBe(true);
  });

  it("uses the raw meter and ignores loads that jumped ahead of it", () => {
    const wallbox = {
      id: "wb",
      name: "openWB",
      entityId: WALLBOX_ENTITY,
      watts: 9000,
      mode: "included" as const,
      missing: false,
      icon: "wallbox" as const,
    };
    const houseAt = 1_000_000;
    const stamps = new Map([[WALLBOX_ENTITY, houseAt + 20_000]]);
    // Wallbox 20s newer than meter → ignore until the meter catches up.
    expect(
      includedOverflow(2000, [wallbox], {
        wallboxInHouse: true,
        meterHouse: 3000,
        houseUpdatedAt: houseAt,
        itemUpdatedAt: stamps,
      }),
    ).toBe(false);
    // Same timestamps → wallbox counts against the raw meter.
    expect(
      includedOverflow(2000, [wallbox], {
        wallboxInHouse: true,
        meterHouse: 3000,
        houseUpdatedAt: houseAt,
        itemUpdatedAt: new Map([[WALLBOX_ENTITY, houseAt]]),
      }),
    ).toBe(true);
    expect(
      includedOverflow(2000, [wallbox], {
        wallboxInHouse: true,
        meterHouse: 9100,
        houseUpdatedAt: houseAt,
        itemUpdatedAt: new Map([[WALLBOX_ENTITY, houseAt]]),
      }),
    ).toBe(false);
  });
});

describe("overflowHeld", () => {
  it("waits out a short mismatch and starts again after the values agree", () => {
    expect(overflowHeld(true, undefined, 1_000)).toEqual({ show: false, since: 1_000 });
    expect(overflowHeld(true, 1_000, 1_000 + OVERFLOW_HOLD_MS - 1)).toEqual({ show: false, since: 1_000 });
    expect(overflowHeld(true, 1_000, 1_000 + OVERFLOW_HOLD_MS)).toEqual({ show: true, since: 1_000 });
    expect(overflowHeld(false, 1_000, 1_000 + OVERFLOW_HOLD_MS + 1_000)).toEqual({ show: false, since: undefined });
  });
});

describe("visibleInFlow", () => {
  it("hides loads at or below 10 W unless arranging", () => {
    const items = [flow(0, "included"), flow(10, "included"), flow(11, "separate"), flow(458, "included")];
    expect(visibleInFlow(items).map((c) => c.watts)).toEqual([11, 458]);
    expect(visibleInFlow(items, { arrange: true })).toHaveLength(4);
    expect(visibleInFlow([flow(-50, "included")]).map((c) => c.watts)).toEqual([-50]);
  });
});

describe("separateDayEnergy", () => {
  it("lists only separately measured wallbox energy above zero", () => {
    const wb = flow(1000, "separate", WALLBOX_ENTITY);
    wb.name = "Wallbox";
    expect(separateDayEnergy([wb], 8.2)).toEqual([{ name: "Wallbox", kwh: 8.2 }]);
    expect(separateDayEnergy([flow(1000, "included", WALLBOX_ENTITY)], 8.2)).toEqual([]);
    expect(separateDayEnergy([flow(1000, "separate", "sensor.other")], 8.2)).toEqual([]);
    expect(separateDayEnergy([wb], 0)).toEqual([]);
    expect(separateDayEnergy([wb], undefined)).toEqual([]);
  });
});
