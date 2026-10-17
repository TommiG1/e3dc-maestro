import { describe, expect, it } from "vitest";
import { checkClassic, classify, createClassic, hasResource, CLASSIC_PATH, CLASSIC_STRATEGY } from "./classic";
import type { Hass } from "./entities";

const fakeHass = (handlers: Record<string, (msg: Record<string, unknown>) => unknown>) => {
  const calls: Record<string, unknown>[] = [];
  const hass = {
    states: {},
    language: "de",
    callService: async () => undefined,
    callWS: async <T,>(msg: Record<string, unknown>): Promise<T> => {
      calls.push(msg);
      const handler = handlers[msg.type as string];
      if (!handler) throw new Error(`unexpected ${String(msg.type)}`);
      return handler(msg) as T;
    },
  } as Hass;
  return { hass, calls };
};

describe("classify", () => {
  it("recognises the Maestro strategy", () => {
    expect(classify({ strategy: { type: CLASSIC_STRATEGY } })).toBe("ours");
  });
  it("treats missing or blank configs as empty", () => {
    expect(classify(undefined)).toBe("empty");
    expect(classify({})).toBe("empty");
    expect(classify({ views: [] })).toBe("empty");
  });
  it("never claims somebody else's dashboard", () => {
    expect(classify({ views: [{ title: "Mein Dashboard" }] })).toBe("foreign");
    expect(classify({ strategy: { type: "original-states" } })).toBe("foreign");
  });
});

describe("hasResource", () => {
  it("matches HACS resource URLs", () => {
    expect(hasResource(["/hacsfiles/lovelace-mushroom/mushroom.js?hacstag=1"], "mushroom")).toBe(true);
    expect(hasResource(["/hacsfiles/mini-graph-card/x.js"], "apexcharts-card")).toBe(false);
  });
});

describe("checkClassic", () => {
  it("reports a missing dashboard and the installed cards", async () => {
    const { hass } = fakeHass({
      "lovelace/resources": () => [{ url: "/hacsfiles/lovelace-mushroom/mushroom.js" }],
      "lovelace/dashboards/list": () => [{ id: "x", url_path: "other" }],
    });
    expect(await checkClassic(hass)).toEqual({ state: "missing", mushroom: true, apex: false });
  });

  it("maps config_not_found to empty", async () => {
    const { hass } = fakeHass({
      "lovelace/resources": () => [],
      "lovelace/dashboards/list": () => [{ id: "x", url_path: CLASSIC_PATH }],
      "lovelace/config": () => {
        throw { code: "config_not_found", message: "No config found." };
      },
    });
    expect((await checkClassic(hass)).state).toBe("empty");
  });
});

describe("createClassic", () => {
  it("creates the dashboard and saves the strategy config", async () => {
    const { hass, calls } = fakeHass({ "lovelace/dashboards/create": () => ({}), "lovelace/config/save": () => null });
    await createClassic(hass, "missing");
    expect(calls.map((c) => c.type)).toEqual(["lovelace/dashboards/create", "lovelace/config/save"]);
    expect(calls[0]).toMatchObject({ url_path: CLASSIC_PATH, title: "E3DC Maestro" });
    expect(calls[1]).toMatchObject({ url_path: CLASSIC_PATH, config: { strategy: { type: CLASSIC_STRATEGY } } });
  });

  it("does not touch a foreign dashboard", async () => {
    const { hass, calls } = fakeHass({});
    await createClassic(hass, "foreign");
    expect(calls).toEqual([]);
  });
});
