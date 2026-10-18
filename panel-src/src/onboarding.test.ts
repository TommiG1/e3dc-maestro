import { describe, expect, it } from "vitest";
import { parseSetupAck, setupComplete, setupSteps, type SetupFacts } from "./onboarding";

const ready = (patch: Partial<SetupFacts> = {}): SetupFacts => ({
  ready: true,
  options: {
    battery_capacity_kwh: 10,
    soc_sensor: "sensor.soc",
    pv_power_sensor: "sensor.pv",
    house_power_sensor: "sensor.house",
    grid_power_sensor: "sensor.grid",
    battery_power_sensor: "sensor.bat",
    price_sensor: "sensor.price",
    pv_forecast_sensor: "sensor.forecast",
  },
  slots: 0,
  state: () => "12",
  on: (key) => key === "fixed_reserve_enabled",
  number: (key) => (key === "fixed_buy_price" ? 0.32 : undefined),
  select: (key) => (key === "tariff_mode" ? "fixed" : undefined),
  phase: "idle",
  explanation: "Leerlauf, der Akku deckt das Haus.",
  regulation: true,
  ...patch,
});

const status = (facts: SetupFacts) => Object.fromEntries(setupSteps(facts).map((step) => [step.id, step.status]));

describe("parseSetupAck", () => {
  it("accepts only the stored confirmation", () => {
    expect(parseSetupAck("1")).toBe(true);
    expect(parseSetupAck(null)).toBe(false);
    expect(parseSetupAck("true")).toBe(false);
  });
});

describe("setupSteps", () => {
  it("marks a finished plant as complete", () => {
    const steps = setupSteps(ready());
    expect(status(ready())).toEqual({
      plant: "done",
      tariff: "done",
      forecast: "done",
      safety: "done",
      loads: "optional",
      regulation: "done",
      run: "done",
    });
    expect(setupComplete(steps)).toBe(true);
    expect(steps.find((step) => step.id === "run")?.note).toContain("Leerlauf");
  });

  it("waits for panel options before calling sensors missing", () => {
    expect(status(ready({ ready: false, options: {} })).plant).toBe("wait");
    expect(status(ready({ ready: false, options: {} })).forecast).toBe("wait");
  });

  it("lists plant sensors that are not live", () => {
    const facts = ready({
      state: (id) => (id === "sensor.grid" ? "unavailable" : "12"),
      options: { ...ready().options, battery_capacity_kwh: 0 },
    });
    const plant = setupSteps(facts).find((step) => step.id === "plant");
    expect(plant?.status).toBe("todo");
    expect(plant?.missing).toEqual(["grid_power_sensor", "battery_capacity_kwh"]);
    expect(setupComplete(setupSteps(facts))).toBe(false);
  });

  it("accepts a dynamic price sensor or tariff slots, and rejects a dynamic tariff without either", () => {
    expect(status(ready({ select: () => "dynamic", number: () => undefined })).tariff).toBe("done");
    expect(
      status(
        ready({
          select: () => "dynamic",
          number: () => undefined,
          options: { ...ready().options, price_sensor: "" },
          slots: 2,
        }),
      ).tariff,
    ).toBe("done");
    expect(
      status(
        ready({
          select: () => "dynamic",
          number: () => undefined,
          options: { ...ready().options, price_sensor: "" },
        }),
      ).tariff,
    ).toBe("todo");
  });

  it("treats forecast, reserve and loads as optional until something is connected", () => {
    const open = status(
      ready({
        options: { ...ready().options, pv_forecast_sensor: "" },
        on: () => false,
      }),
    );
    expect(open.forecast).toBe("optional");
    expect(open.safety).toBe("optional");
    expect(open.loads).toBe("optional");
    expect(status(ready({ on: (key) => key === "hp_enabled" })).loads).toBe("done");
  });

  it("keeps the first decision open until the regulation has run", () => {
    expect(status(ready({ regulation: false, phase: undefined, explanation: undefined })).regulation).toBe("todo");
    expect(status(ready({ regulation: false, phase: undefined })).run).toBe("todo");
    expect(status(ready({ regulation: true, phase: "unknown" })).run).toBe("wait");
    expect(status(ready({ regulation: false, phase: "off" })).run).toBe("done");
  });
});
