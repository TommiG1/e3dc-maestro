import { describe, expect, it } from "vitest";
import { applyEnergyDashboard, checkEnergyDashboard, type EnergyDashboardStatus } from "./energy-dashboard";
import type { Hass } from "./entities";

function hassWith(handlers: Record<string, () => unknown>): Hass {
  return {
    states: {},
    language: "de",
    callWS: async (msg: { type: string }) => {
      const handler = handlers[msg.type];
      if (!handler) throw new Error(`unexpected ${msg.type}`);
      return handler();
    },
    callService: async () => undefined,
  } as Hass;
}

describe("energy dashboard client", () => {
  it("maps a preview payload", async () => {
    const status = await checkEnergyDashboard(
      hassWith({
        "e3dc_maestro/energy_dashboard/preview": () => ({
          energy_ready: true,
          ready: true,
          status: "empty",
          sensors: {
            solar: { entity_id: "sensor.pv", origin: "rscp" },
          },
          missing: ["grid_from", "grid_to"],
          has_solar: false,
          proposed_count: 1,
        }),
      }),
    );
    expect(status).toMatchObject<Partial<EnergyDashboardStatus>>({
      state: "empty",
      energyReady: true,
      ready: true,
      sensors: { solar: { entity_id: "sensor.pv", origin: "rscp" } },
      missing: ["grid_from", "grid_to"],
      proposedCount: 1,
    });
  });

  it("surfaces apply failures", async () => {
    const status = await applyEnergyDashboard(
      hassWith({
        "e3dc_maestro/energy_dashboard/apply": () => ({
          ok: false,
          error: "no_sensors",
          status: "unavailable",
          ready: false,
        }),
      }),
      "fill",
    );
    expect(status.state).toBe("error");
    expect(status.error).toBe("no_sensors");
  });
});
