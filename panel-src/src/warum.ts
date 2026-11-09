/** Warum helpers: suggested questions, search, and WS payload types. */

import type { Key, Translate } from "./i18n";

export const WARUM_PHASES = [
  "off",
  "force_discharge",
  "discharge_lock",
  "emergency",
  "feed_in_limit",
  "reserve_protection",
  "evcc_pause",
  "ht_protection",
  "morning_discharge",
  "astro_wait",
  "morning_cap",
  "hard_soc_limit",
  "fast_floor",
  "grid_charge",
  "grid_hold",
  "corridor",
  "pv_delay",
  "spreading",
  "curtailment_guard",
  "idle",
] as const;

export type WarumPhase = (typeof WARUM_PHASES)[number];

export interface WarumTerm {
  name: string;
  actual: string | number | boolean | null;
  expected: string | number | boolean | null;
  setting_key: string | null;
  passed: boolean;
}

export interface WarumGate {
  name: string;
  result: boolean;
  terms: WarumTerm[];
}

export interface WarumWhyNot {
  phase: string;
  status: "higher_priority_won" | "evaluated_failed" | "is_current" | "unknown_phase";
  message: string;
  failed_terms: WarumTerm[];
  blocking_gate: string | null;
}

export interface WarumWhatIfDiff {
  phase_before: string;
  phase_after: string;
  charge_limit_before: number | null;
  charge_limit_after: number | null;
  discharge_limit_before: number | null;
  discharge_limit_after: number | null;
}

export interface WarumWhatIf {
  overrides: { params: Record<string, unknown>; state: Record<string, unknown> };
  baseline_phase: string | null;
  result_phase: string;
  result_reason: string;
  changed: boolean;
  decision: Record<string, unknown>;
  winning_gate: string | null;
  path?: WarumGate[];
  diff_text?: string;
  diff?: WarumWhatIfDiff;
}

export interface WarumLookback {
  phase?: string;
  reason?: string;
  timestamp?: string;
  timestamp_display?: string;
  warum_snapshot?: {
    winning_gate?: string | null;
    terms?: WarumTerm[];
    path?: { name: string; result: boolean }[];
  };
}

export type WarumTopic =
  | "current" | "no_discharge" | "no_charge" | "no_grid_charge"
  | "feed_in" | "price_plan" | "wallbox" | "heat_pump" | "lookback";

export interface WarumAnswerBullet {
  ok: boolean;
  text: string;
  setting_key?: string | null;
}
export interface WarumFollowUp {
  topic?: WarumTopic | null;
  why_not_phase?: string | null;
  label: string;
}
export interface WarumTunable {
  key: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  label?: string;
}
export interface WarumAnswer {
  topic: WarumTopic | string;
  headline: string;
  bullets: WarumAnswerBullet[];
  setting_keys: string[];
  follow_ups: WarumFollowUp[];
  tunables: WarumTunable[];
}

export interface WarumPayload {
  phase: string | null;
  reason: string | null;
  short_explanation: string;
  winning_gate: string | null;
  path: WarumGate[];
  why_not: WarumWhyNot | null;
  energy_balance: Record<string, unknown>;
  what_if: WarumWhatIf | null;
  context_notes?: { id: string; text: string }[];
  lookback?: WarumLookback | null;
  answer?: WarumAnswer | null;
}

export type WarumSuggestionId =
  | "why_current"
  | "why_feed_in_not_full"
  | "why_no_grid_charge"
  | "why_no_discharge"
  | "why_not_phase";

export interface WarumSuggestion {
  id: WarumSuggestionId;
  /** i18n key */
  labelKey: Key;
  topic?: WarumTopic;
  whyNotPhase?: string;
  whatIfParams?: Record<string, unknown>;
}

export interface WarumThreadItem {
  id: string;
  query?: string;
  topic?: WarumTopic;
  whyNotPhase?: string;
  lookbackAt?: string;
  payload?: WarumPayload;
  error?: string;
  pending?: boolean;
  /** Spinner on the what-if sliders block while re-fetching. */
  whatIfPending?: boolean;
  /** Set when a what-if re-fetch failed; the previous answer stays visible. */
  whatIfError?: boolean;
}

export function clampTunableValue(value: number, tunable: WarumTunable): number {
  const step = tunable.step > 0 ? tunable.step : 1;
  const clamped = Math.min(tunable.max, Math.max(tunable.min, value));
  return Math.round(clamped / step) * step;
}

/** Slider display values: baseline from tunables merged with local overrides. */
export function mergeTunableOverrides(
  tunables: WarumTunable[],
  overrides: Record<string, number> | undefined,
): Record<string, number> {
  const out: Record<string, number> = {};
  for (const t of tunables) {
    const raw = overrides?.[t.key];
    out[t.key] = raw !== undefined ? clampTunableValue(raw, t) : t.value;
  }
  return out;
}

/** WS what_if_params: only keys that differ from the live baseline in tunables. */
export function buildWhatIfParamsFromOverrides(
  tunables: WarumTunable[],
  overrides: Record<string, number>,
): Record<string, number> {
  const out: Record<string, number> = {};
  for (const t of tunables) {
    const v = overrides[t.key];
    if (v !== undefined && v !== t.value) {
      out[t.key] = clampTunableValue(v, t);
    }
  }
  return out;
}

export function hasActiveWhatIfOverrides(
  tunables: WarumTunable[],
  overrides: Record<string, number> | undefined,
): boolean {
  if (!overrides) return false;
  return tunables.some((t) => overrides[t.key] !== undefined && overrides[t.key] !== t.value);
}

export interface WarumParsedIntent {
  topic?: WarumTopic;
  whyNotPhase?: string;
  lookbackAt?: string;
}

const INTENT_RULES: { topic: WarumTopic; whyNotPhase?: string; patterns: RegExp[] }[] = [
  {
    topic: "no_discharge",
    whyNotPhase: "force_discharge",
    patterns: [
      /entl[aä]d\w*[^?]{0,40}nicht/,
      /kein(e|en)?\s+entlad/,
      /not\s+discharg/,
      /no\s+discharg/,
      /without\s+discharg/,
    ],
  },
  {
    topic: "wallbox",
    patterns: [/wallbox/, /\bev\b/, /ladepunkt/, /charging\s+point/],
  },
  {
    topic: "heat_pump",
    patterns: [/w[aä]rmepumpe/, /heat\s+pump/, /\bwp\b/],
  },
  {
    topic: "no_grid_charge",
    whyNotPhase: "grid_charge",
    patterns: [/keine?\s+netzlad/, /netzladung/, /no\s+grid\s+charg/, /grid\s+charg/],
  },
  {
    topic: "feed_in",
    whyNotPhase: "feed_in_limit",
    patterns: [/einspeis/, /feed[\s-]?in/, /overflow/],
  },
  {
    topic: "price_plan",
    patterns: [/preis(plan)?/, /price\s*plan/, /strompreis/, /tariff/],
  },
  {
    topic: "no_charge",
    patterns: [
      /l[aä]d\w*[^?]{0,40}nicht/,
      /kein(e|en)?\s+lad(ung|en)/,
      /not\s+charg/,
      /no\s+charg/,
    ],
  },
  {
    topic: "current",
    patterns: [
      /diese\s+phase/,
      /aktuell/,
      /warum\s+jetzt/,
      /why\s+this\s+phase/,
      /current\s+phase/,
    ],
  },
];

function parseLookbackTime(query: string, now = new Date()): string | undefined {
  const q = query.toLowerCase();
  const lookbackCue =
    /\b(warum|why|rückblick|look\s*back|um|at)\b/.test(q) || /\d{1,2}[:.]\d{2}/.test(q);
  if (!lookbackCue) return undefined;
  const m =
    q.match(/(?:um|at)\s*(\d{1,2})[:.](\d{2})/) ??
    q.match(/\b(\d{1,2})[:.](\d{2})\b/);
  if (!m) return undefined;
  const h = Number(m[1]);
  const mi = Number(m[2]);
  if (h > 23 || mi > 59) return undefined;
  const y = now.getFullYear();
  const mo = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const hh = String(h).padStart(2, "0");
  const mm = String(mi).padStart(2, "0");
  return `${y}-${mo}-${d}T${hh}:${mm}:00`;
}

function parsePhaseFromQuery(query: string): string | undefined {
  const q = query.toLowerCase();
  for (const phase of WARUM_PHASES) {
    if (q.includes(phase.replace(/_/g, " ")) || q.includes(phase)) return phase;
  }
  return undefined;
}

/** Map free-text question to WS topic / lookback / why-not phase. */
export function parseWarumIntent(
  query: string,
  lang: "de" | "en" = "de",
): WarumParsedIntent | null {
  const trimmed = query.trim();
  if (!trimmed) return null;

  const lookbackAt = parseLookbackTime(trimmed);
  if (lookbackAt) {
    return { topic: "lookback", lookbackAt };
  }

  const q = trimmed.toLowerCase();
  for (const rule of INTENT_RULES) {
    if (rule.patterns.some((p) => p.test(q))) {
      return { topic: rule.topic, whyNotPhase: rule.whyNotPhase };
    }
  }

  const phase = parsePhaseFromQuery(trimmed);
  if (phase && (/\bwarum\s+nicht\b/.test(q) || /\bwhy\s+not\b/.test(q) || lang === "de" || lang === "en")) {
    return { whyNotPhase: phase };
  }

  if (/\bwarum\b/.test(q) || /\bwhy\b/.test(q)) {
    return { topic: "current" };
  }

  return null;
}

export function appendWarumThread(
  thread: WarumThreadItem[],
  card: WarumThreadItem,
  max = 10,
): WarumThreadItem[] {
  return [card, ...thread].slice(0, max);
}

/** Map engine setting_key → settings group id used by onOpenGroup. */
export const SETTING_GROUP: Record<string, string> = {
  charge_threshold: "safety",
  charge_target: "pv",
  hard_soc_limit: "safety",
  morning_cap_soc: "pv",
  morning_cap_until_h: "pv",
  delay_min_soc: "pv",
  fast_charge_floor_soc: "pv",
  morning_unload_start_soc: "loads",
  morning_unload_soc: "loads",
  fixed_reserve_soc: "safety",
  lower_corridor: "pv",
  min_charge_power: "pv",
  wallbox_discharge_guard_threshold_w: "loads",
};

export function settingGroupFor(key: string | null | undefined): string | undefined {
  if (!key) return undefined;
  return SETTING_GROUP[key];
}

export interface WarumContext {
  phase?: string;
  soc?: number;
  chargeTarget?: number;
  gridChargeEnabled?: boolean;
  dischargeLocked?: boolean;
}

/** Suggested questions from the current state (plan Stufe 6). */
export function warumSuggestions(ctx: WarumContext): WarumSuggestion[] {
  const out: WarumSuggestion[] = [
    { id: "why_current", labelKey: "warumWhyCurrent", topic: "current" },
  ];
  const soc = ctx.soc ?? 0;
  const target = ctx.chargeTarget ?? 100;
  if (ctx.phase !== "feed_in_limit" && soc < target - 1) {
    out.push({
      id: "why_feed_in_not_full",
      labelKey: "warumWhyFeedInNotFull",
      topic: "feed_in",
      whyNotPhase: "feed_in_limit",
    });
  }
  if (ctx.phase !== "grid_charge") {
    out.push({
      id: "why_no_grid_charge",
      labelKey: "warumWhyNoGridCharge",
      topic: "no_grid_charge",
      whyNotPhase: "grid_charge",
    });
  }
  if (ctx.phase !== "force_discharge" && !ctx.dischargeLocked) {
    out.push({
      id: "why_no_discharge",
      labelKey: "warumWhyNoDischarge",
      topic: "no_discharge",
      whyNotPhase: "force_discharge",
    });
  }
  if (ctx.phase) {
    out.push({
      id: "why_not_phase",
      labelKey: "warumWhyNotPhasePick",
    });
  }
  return out;
}

export interface WarumCatalogEntry {
  id: string;
  /** Raw searchable text (already translated by caller). */
  haystack: string;
  topic?: WarumTopic;
  whyNotPhase?: string;
}

/** Keyword search against a translated catalog (like matchingSections). */
export function matchingWarumEntries(
  query: string,
  catalog: WarumCatalogEntry[],
): WarumCatalogEntry[] | undefined {
  const needle = query.trim().toLowerCase();
  if (!needle) return undefined;
  return catalog.filter((e) => e.haystack.toLowerCase().includes(needle));
}

export function warumCatalog(
  phaseLabel: (id: string) => string,
  t: Translate,
): WarumCatalogEntry[] {
  const base: WarumCatalogEntry[] = [
    {
      id: "why_current",
      haystack: `${t("warumWhyCurrent")} ${t("warumSearchCurrent")}`,
      topic: "current",
    },
    {
      id: "feed_in",
      haystack: `${t("warumWhyFeedInNotFull")} ${t("warumSearchFeedIn")}`,
      topic: "feed_in",
      whyNotPhase: "feed_in_limit",
    },
    {
      id: "grid_charge",
      haystack: `${t("warumWhyNoGridCharge")} ${t("warumSearchGrid")}`,
      topic: "no_grid_charge",
      whyNotPhase: "grid_charge",
    },
    {
      id: "discharge",
      haystack: `${t("warumWhyNoDischarge")} ${t("warumSearchDischarge")}`,
      topic: "no_discharge",
      whyNotPhase: "force_discharge",
    },
    {
      id: "price_plan",
      haystack: `${t("warumSearchPricePlan")}`,
      topic: "price_plan",
    },
    {
      id: "wallbox",
      haystack: `${t("warumSearchWallbox")}`,
      topic: "wallbox",
    },
    {
      id: "heat_pump",
      haystack: `${t("warumSearchHeatPump")}`,
      topic: "heat_pump",
    },
    {
      id: "lookback",
      haystack: `${t("warumSearchLookback")}`,
      topic: "lookback",
    },
  ];
  for (const phase of WARUM_PHASES) {
    base.push({
      id: `phase:${phase}`,
      haystack: `${t("warumWhyNotPrefix")} ${phaseLabel(phase)} ${phase}`,
      whyNotPhase: phase,
    });
  }
  return base;
}
