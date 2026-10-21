import type { Key, Translate } from "./i18n";
import { LADDER } from "./ladder";

export type HelpScreen = "live" | "forecast" | "plan" | "decision" | "plant" | "settings";

export type HelpAction =
  | { kind: "screen"; screen: HelpScreen; group?: string }
  | { kind: "controls" };

export interface HelpSection {
  id: string;
  title: Key;
  body: Key;
  links?: readonly { id: string; label: Key }[];
  actions?: readonly { label: Key; action: HelpAction }[];
  /** Show the live ladder under this section. */
  ladder?: boolean;
}

export interface HelpChapter {
  id: string;
  title: Key;
  sections: readonly HelpSection[];
}

const RULE_BODY: Record<string, Key> = {
  off: "helpRuleOff",
  force: "helpRuleForce",
  emergency: "helpRuleEmergency",
  feed: "helpRuleFeed",
  reserve: "helpRuleReserve",
  evcc: "helpRuleEvcc",
  price: "helpRulePrice",
  ht: "helpRuleHt",
  hold: "helpRuleHold",
  morning: "helpRuleMorning",
  cap: "helpRuleCap",
  astro: "helpRuleAstro",
  hard: "helpRuleHard",
  floor: "helpRuleFloor",
  low: "helpRuleLow",
  grid: "helpRuleGrid",
  corridor: "helpRuleCorridor",
  spread: "helpRuleSpread",
  curtail: "helpRuleCurtail",
  idle: "helpRuleIdle",
};

const ruleSections = (): HelpSection[] =>
  LADDER.map((step) => ({
    id: step.id,
    title: step.label,
    body: RULE_BODY[step.id] ?? "helpRuleIdle",
    actions: [{ label: "helpOpenSettings", action: { kind: "screen", screen: "settings", group: step.group } }],
  }));

const section = (
  id: string,
  title: Key,
  body: Key,
  extra?: Pick<HelpSection, "links" | "actions" | "ladder">,
): HelpSection => ({ id, title, body, ...extra });

export const HELP: readonly HelpChapter[] = [
  {
    id: "start",
    title: "helpChStart",
    sections: [
      section("start-lead", "helpStartLead", "helpStartLeadBody", {
        links: [{ id: "rules", label: "helpSeeRules" }],
        actions: [{ label: "helpOpenSetup", action: { kind: "screen", screen: "settings", group: "setup" } }],
      }),
      section("start-steps", "helpStartSteps", "helpStartStepsBody"),
    ],
  },
  {
    id: "live",
    title: "helpChLive",
    sections: [section("live-page", "helpChLive", "helpLiveBody")],
  },
  {
    id: "forecast",
    title: "helpChForecast",
    sections: [section("forecast-page", "helpChForecast", "helpForecastBody")],
  },
  {
    id: "plan",
    title: "helpChPlan",
    sections: [
      section("plan-page", "helpChPlan", "helpPlanBody", {
        actions: [{ label: "helpOpenSettings", action: { kind: "screen", screen: "settings", group: "tariff" } }],
      }),
    ],
  },
  {
    id: "decision",
    title: "helpChDecision",
    sections: [
      section("decision-page", "helpChDecision", "helpDecisionBody", {
        links: [{ id: "rules", label: "helpSeeLadder" }],
      }),
    ],
  },
  {
    id: "plant",
    title: "helpChPlant",
    sections: [section("plant-page", "helpChPlant", "helpPlantBody")],
  },
  {
    id: "settings",
    title: "helpChSettings",
    sections: [
      section("set-intro", "helpSetIntro", "helpSetIntroBody"),
      section("set-setup", "helpSetSetup", "helpSetSetupBody"),
      section("set-plant", "helpSetPlant", "helpSetPlantBody"),
      section("set-safety", "helpSetSafety", "helpSetSafetyBody"),
      section("set-tariff", "helpSetTariff", "helpSetTariffBody"),
      section("set-pv", "helpSetPv", "helpSetPvBody"),
      section("set-loads", "helpSetLoads", "helpSetLoadsBody"),
      section("set-auto", "helpSetAuto", "helpSetAutoBody"),
      section("set-system", "helpSetSystem", "helpSetSystemBody"),
      section("set-look", "helpSetLook", "helpSetLookBody"),
      section("set-classic", "helpSetClassic", "helpSetClassicBody"),
      section("set-energy", "helpSetEnergy", "helpSetEnergyBody"),
      section("set-sizing", "helpSetSizing", "helpSetSizingBody"),
    ],
  },
  {
    id: "controls",
    title: "helpChControls",
    sections: [
      section("controls-page", "helpChControls", "helpControlsBody", {
        actions: [{ label: "helpOpenControls", action: { kind: "controls" } }],
      }),
    ],
  },
  {
    id: "rules",
    title: "helpChRules",
    sections: [
      section("rules-how", "helpRulesHow", "helpRulesHowBody", { ladder: true }),
      ...ruleSections(),
      section("why-grid", "helpWhyGrid", "helpWhyGridBody"),
    ],
  },
  {
    id: "concepts",
    title: "helpChConcepts",
    sections: [
      section("concept-plan", "helpConceptPlan", "helpConceptPlanBody"),
      section("concept-pv", "helpConceptPv", "helpConceptPvBody"),
      section("concept-low", "helpConceptLow", "helpConceptLowBody"),
      section("concept-feed", "helpConceptFeed", "helpConceptFeedBody"),
      section("concept-loads", "helpConceptLoads", "helpConceptLoadsBody"),
    ],
  },
  {
    id: "trouble",
    title: "helpChTrouble",
    sections: [
      section("trouble-off", "helpTroubleOff", "helpTroubleOffBody", {
        links: [{ id: "decision", label: "helpChDecision" }],
      }),
      section("trouble-entities", "helpTroubleEntities", "helpTroubleEntitiesBody"),
      section("trouble-alerts", "helpTroubleAlerts", "helpTroubleAlertsBody"),
      section("trouble-history", "helpTroubleHistory", "helpTroubleHistoryBody"),
      section("faq-nogrid", "helpFaqNoGrid", "helpFaqNoGridBody", {
        links: [{ id: "why-grid", label: "helpWhyGrid" }],
      }),
      section("faq-swing", "helpFaqSwing", "helpFaqSwingBody"),
      section("faq-ht", "helpFaqHt", "helpFaqHtBody"),
      section("faq-pause", "helpFaqPause", "helpFaqPauseBody"),
      section("faq-min", "helpFaqMin", "helpFaqMinBody"),
      section("faq-restart", "helpFaqRestart", "helpFaqRestartBody"),
      section("faq-tibber", "helpFaqTibber", "helpFaqTibberBody"),
      section("faq-plan", "helpFaqPlan", "helpFaqPlanBody"),
      section("faq-plan-hold", "helpFaqPlanHold", "helpFaqPlanHoldBody", {
        links: [{ id: "faq-plan", label: "helpFaqPlan" }],
      }),
      section("faq-plan-pv", "helpFaqPlanPv", "helpFaqPlanPvBody", {
        links: [
          { id: "faq-plan", label: "helpFaqPlan" },
          { id: "set-tariff", label: "helpSetTariff" },
        ],
      }),
      section("faq-old", "helpFaqOld", "helpFaqOldBody"),
      section("faq-balance-stats", "helpFaqBalanceStats", "helpFaqBalanceStatsBody", {
        links: [{ id: "trouble-history", label: "helpTroubleHistory" }],
      }),
    ],
  },
  {
    id: "glossary",
    title: "helpChGlossary",
    sections: [section("glossary-page", "helpChGlossary", "helpGlossaryBody")],
  },
];

const chapterIds = new Set(HELP.map((chapter) => chapter.id));
const sectionIds = new Set(HELP.flatMap((chapter) => chapter.sections.map((item) => item.id)));

/** Scroll target for the page that is open behind the help. */
export function helpAnchor(screen: string, settingsGroup?: string): string {
  if (screen === "settings") {
    if (settingsGroup && sectionIds.has(`set-${settingsGroup}`)) return `set-${settingsGroup}`;
    return "ch-settings";
  }
  if (chapterIds.has(screen)) return `ch-${screen}`;
  return "ch-start";
}

export function helpTargetExists(id: string): boolean {
  return id.startsWith("ch-") ? chapterIds.has(id.slice(3)) : sectionIds.has(id) || chapterIds.has(id);
}

/** Section ids that match the query. Undefined means show everything. */
export function matchingSections(query: string, t: Translate): Set<string> | undefined {
  const needle = query.trim().toLowerCase();
  if (!needle) return undefined;
  const hits = new Set<string>();
  for (const chapter of HELP) {
    const chapterHit = t(chapter.title).toLowerCase().includes(needle);
    for (const item of chapter.sections) {
      const hay = `${t(item.title)}\n${t(item.body)}`.toLowerCase();
      if (chapterHit || hay.includes(needle)) hits.add(item.id);
    }
  }
  return hits;
}

export function ruleBodiesCoverLadder(): string[] {
  return LADDER.filter((step) => !RULE_BODY[step.id]).map((step) => step.id);
}
