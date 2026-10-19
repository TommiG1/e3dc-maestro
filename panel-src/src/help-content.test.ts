import { describe, expect, it } from "vitest";
import { HELP, helpAnchor, helpTargetExists, matchingSections, ruleBodiesCoverLadder } from "./help-content";
import { makeI18n } from "./i18n";
import { LADDER } from "./ladder";
import { CLASSIC_DASHBOARD, LOOK, SETTINGS_GROUPS, SETUP, SIZING } from "./settings";

describe("help", () => {
  const de = makeI18n("de").t;
  const en = makeI18n("en").t;

  it("keeps chapter and section ids unique", () => {
    const chapters = HELP.map((chapter) => chapter.id);
    const sections = HELP.flatMap((chapter) => chapter.sections.map((item) => item.id));
    expect(new Set(chapters).size).toBe(chapters.length);
    expect(new Set(sections).size).toBe(sections.length);
  });

  it("points every link at a chapter or section", () => {
    for (const chapter of HELP) {
      for (const item of chapter.sections) {
        for (const link of item.links ?? []) expect(helpTargetExists(link.id) || HELP.some((c) => c.id === link.id || c.sections.some((s) => s.id === link.id))).toBe(true);
      }
    }
  });

  it("explains every ladder rung", () => {
    const ids = new Set(HELP.flatMap((chapter) => chapter.sections.map((item) => item.id)));
    expect(ruleBodiesCoverLadder()).toEqual([]);
    for (const step of LADDER) expect(ids.has(step.id)).toBe(true);
  });

  it("has German and English text", () => {
    for (const chapter of HELP) {
      expect(de(chapter.title).length).toBeGreaterThan(0);
      expect(en(chapter.title).length).toBeGreaterThan(0);
      for (const item of chapter.sections) {
        expect(de(item.body).length).toBeGreaterThan(20);
        expect(en(item.body).length).toBeGreaterThan(20);
      }
    }
  });

  it("finds a rule by name and opens on the current page", () => {
    const hits = matchingSections("Notladung", de);
    expect(hits?.has("emergency")).toBe(true);
    expect(matchingSections("   ", de)).toBeUndefined();
    expect(helpAnchor("live")).toBe("ch-live");
    expect(helpAnchor("forecast")).toBe("ch-forecast");
    expect(helpAnchor("plan")).toBe("ch-plan");
    expect(helpAnchor("decision")).toBe("ch-decision");
    expect(helpAnchor("plant")).toBe("ch-plant");
    for (const id of [...SETTINGS_GROUPS.map((group) => group.id), SETUP.id, LOOK.id, CLASSIC_DASHBOARD.id, SIZING.id]) {
      expect(helpAnchor("settings", id)).toBe(`set-${id}`);
    }
    expect(helpAnchor("settings", "tariff")).toBe("set-tariff");
    expect(helpAnchor("settings")).toBe("ch-settings");
    expect(helpAnchor("settings", "missing")).toBe("ch-settings");
    expect(helpAnchor("nope")).toBe("ch-start");
  });
});
