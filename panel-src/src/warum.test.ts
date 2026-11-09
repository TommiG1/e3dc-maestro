import { describe, expect, it } from "vitest";
import {
  appendWarumThread,
  buildWhatIfParamsFromOverrides,
  clampTunableValue,
  hasActiveWhatIfOverrides,
  matchingWarumEntries,
  mergeTunableOverrides,
  parseWarumIntent,
  settingGroupFor,
  warumCatalog,
  warumHelpExamples,
  warumSuggestions,
  type WarumPayload,
  type WarumThreadItem,
  type WarumTunable,
} from "./warum";

describe("warumSuggestions", () => {
  it("always includes why current", () => {
    const s = warumSuggestions({ phase: "idle", soc: 80, chargeTarget: 90 });
    expect(s.some((x) => x.id === "why_current")).toBe(true);
  });

  it("suggests feed-in question when battery not full", () => {
    const s = warumSuggestions({ phase: "corridor", soc: 50, chargeTarget: 85 });
    expect(s.some((x) => x.id === "why_feed_in_not_full")).toBe(true);
  });

  it("skips grid charge suggestion when already charging", () => {
    const s = warumSuggestions({ phase: "grid_charge", soc: 40, chargeTarget: 60 });
    expect(s.some((x) => x.id === "why_no_grid_charge")).toBe(false);
  });
});

describe("matchingWarumEntries", () => {
  const catalog = warumCatalog(
    (id) => id,
    (key) => key,
  );

  it("returns undefined for empty query", () => {
    expect(matchingWarumEntries("  ", catalog)).toBeUndefined();
  });

  it("finds grid charge by keyword", () => {
    const hits = matchingWarumEntries("grid_charge", catalog);
    expect(hits?.some((h) => h.whyNotPhase === "grid_charge")).toBe(true);
  });
});

describe("settingGroupFor", () => {
  it("maps known setting keys", () => {
    expect(settingGroupFor("charge_threshold")).toBe("safety");
    expect(settingGroupFor("morning_cap_soc")).toBe("pv");
    expect(settingGroupFor("unknown_key")).toBeUndefined();
  });
});

describe("parseWarumIntent", () => {
  it("maps German no-discharge phrasing", () => {
    const r = parseWarumIntent("Warum entlädt der Akku nicht?", "de");
    expect(r?.topic).toBe("no_discharge");
  });

  it("maps English wallbox phrasing", () => {
    const r = parseWarumIntent("Why is the wallbox not charging?", "en");
    expect(r?.topic).toBe("wallbox");
  });

  it("parses lookback time 06:30", () => {
    const r = parseWarumIntent("Warum um 06:30?", "de");
    expect(r?.topic).toBe("lookback");
    expect(r?.lookbackAt).toMatch(/T06:30:00$/);
  });

  it("returns null for empty query", () => {
    expect(parseWarumIntent("  ", "de")).toBeNull();
  });

  it("maps hilfe and help to local help", () => {
    expect(parseWarumIntent("hilfe", "de")).toEqual({ help: true });
    expect(parseWarumIntent("help", "en")).toEqual({ help: true });
    expect(parseWarumIntent("Übersicht", "de")).toEqual({ help: true });
    expect(parseWarumIntent("?", "de")).toEqual({ help: true });
  });

  it("leaves normal topics untouched by help words inside questions", () => {
    const r = parseWarumIntent("Warum entlädt der Akku nicht?", "de");
    expect(r?.help).toBeUndefined();
    expect(r?.topic).toBe("no_discharge");
  });
});

describe("warumHelpExamples", () => {
  it("returns labeled examples with topics and lookback", () => {
    const examples = warumHelpExamples((key) => key, new Date("2026-11-09T12:00:00"));
    expect(examples.some((e) => e.topic === "current")).toBe(true);
    expect(examples.some((e) => e.topic === "lookback" && e.lookbackAt?.endsWith("T06:30:00"))).toBe(
      true,
    );
  });
});

describe("warumCatalog help", () => {
  it("offers hilfe in autocomplete haystack", () => {
    const catalog = warumCatalog(
      (id) => id,
      (key) => (key === "warumSearchHelp" ? "hilfe help übersicht" : key),
    );
    const hits = matchingWarumEntries("hilfe", catalog);
    expect(hits?.some((h) => h.help)).toBe(true);
  });
});

const sampleTunable: WarumTunable = {
  key: "charge_target",
  value: 80,
  min: 50,
  max: 100,
  step: 1,
  unit: "%",
};

describe("tunable overrides", () => {
  it("clamps to min, max, and step", () => {
    expect(clampTunableValue(40, sampleTunable)).toBe(50);
    expect(clampTunableValue(105, sampleTunable)).toBe(100);
    expect(clampTunableValue(82.4, { ...sampleTunable, step: 5 })).toBe(80);
  });

  it("mergeTunableOverrides fills baseline and applies overrides", () => {
    const merged = mergeTunableOverrides([sampleTunable], { charge_target: 90 });
    expect(merged.charge_target).toBe(90);
    expect(mergeTunableOverrides([sampleTunable], undefined).charge_target).toBe(80);
  });

  it("buildWhatIfParamsFromOverrides omits unchanged values", () => {
    expect(buildWhatIfParamsFromOverrides([sampleTunable], { charge_target: 80 })).toEqual({});
    expect(buildWhatIfParamsFromOverrides([sampleTunable], { charge_target: 85 })).toEqual({
      charge_target: 85,
    });
  });

  it("hasActiveWhatIfOverrides detects deviation", () => {
    expect(hasActiveWhatIfOverrides([sampleTunable], { charge_target: 80 })).toBe(false);
    expect(hasActiveWhatIfOverrides([sampleTunable], { charge_target: 85 })).toBe(true);
  });
});

describe("appendWarumThread", () => {
  it("prepends and trims to 10", () => {
    let thread: WarumThreadItem[] = [];
    for (let i = 0; i < 12; i++) {
      thread = appendWarumThread(thread, { id: String(i) });
    }
    expect(thread).toHaveLength(10);
    expect(thread[0].id).toBe("11");
    expect(thread[9].id).toBe("2");
  });
});

describe("WarumPayload extensions", () => {
  it("types context_notes and lookback snapshot", () => {
    const p: WarumPayload = {
      phase: "corridor",
      reason: null,
      short_explanation: "",
      winning_gate: "7.corridor",
      path: [],
      why_not: null,
      energy_balance: {},
      what_if: null,
      context_notes: [{ id: "price_plan", text: "Preisplan" }],
      lookback: {
        phase: "corridor",
        warum_snapshot: { winning_gate: "7.corridor", terms: [] },
      },
    };
    expect(p.context_notes?.[0].id).toBe("price_plan");
    expect(p.lookback?.warum_snapshot?.winning_gate).toBe("7.corridor");
  });
});
