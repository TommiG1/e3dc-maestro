import { html, type TemplateResult } from "lit";
import type { I18n, Key } from "./i18n";

/** One rung of the control cascade, in the order `decide()` checks them. */
export interface LadderStep {
  id: string;
  /** Phase ids that mean this rung is the one currently deciding. */
  phases: readonly string[];
  /** Settings area that holds the knobs for this rung. */
  group: string;
  label: Key;
}

export interface LadderBand {
  id: string;
  label: Key;
  steps: readonly string[];
}

/**
 * Same order as `_decide_core` in control_engine.py.
 * `grid_charge` and `grid_hold` are shared by the price plan and the cheap slot,
 * so both light up the tariff rung. A weak-PV day reports phase `corridor`.
 */
export const LADDER: readonly LadderStep[] = [
  { id: "off", phases: ["off"], group: "system", label: "ladderOff" },
  { id: "force", phases: ["force_discharge"], group: "system", label: "ladderForce" },
  { id: "emergency", phases: ["emergency"], group: "safety", label: "ladderEmergency" },
  { id: "feed", phases: ["feed_in_limit"], group: "plant", label: "ladderFeed" },
  { id: "reserve", phases: ["reserve_protection"], group: "safety", label: "ladderReserve" },
  { id: "evcc", phases: ["evcc_pause"], group: "loads", label: "ladderEvcc" },
  { id: "price", phases: ["grid_charge", "grid_hold"], group: "tariff", label: "ladderPrice" },
  { id: "ht", phases: ["ht_protection"], group: "tariff", label: "ladderHt" },
  { id: "hold", phases: ["grid_hold"], group: "tariff", label: "ladderHold" },
  { id: "morning", phases: ["morning_discharge"], group: "loads", label: "ladderMorning" },
  { id: "cap", phases: ["morning_cap"], group: "pv", label: "ladderCap" },
  { id: "astro", phases: ["astro_wait"], group: "pv", label: "ladderAstro" },
  { id: "hard", phases: ["hard_soc_limit"], group: "safety", label: "ladderHard" },
  { id: "floor", phases: ["fast_floor"], group: "pv", label: "ladderFloor" },
  { id: "low", phases: ["corridor"], group: "pv", label: "ladderLow" },
  { id: "grid", phases: ["grid_charge"], group: "tariff", label: "ladderGrid" },
  { id: "corridor", phases: ["corridor", "pv_delay"], group: "pv", label: "ladderCorridor" },
  { id: "spread", phases: ["spreading"], group: "pv", label: "ladderSpread" },
  { id: "curtail", phases: ["curtailment_guard"], group: "pv", label: "ladderCurtail" },
  { id: "idle", phases: ["idle"], group: "pv", label: "ladderIdle" },
];

export const LADDER_BANDS: readonly LadderBand[] = [
  { id: "safety", label: "ladderBandSafety", steps: ["off", "force", "emergency", "feed", "reserve"] },
  { id: "tariff", label: "ladderBandTariff", steps: ["evcc", "price", "ht", "hold"] },
  { id: "blocks", label: "ladderBandBlocks", steps: ["morning", "cap", "astro", "hard"] },
  { id: "pv", label: "ladderBandPv", steps: ["floor", "low", "grid", "corridor", "spread"] },
  { id: "rest", label: "ladderBandRest", steps: ["curtail", "idle"] },
];

const byId = new Map(LADDER.map((step) => [step.id, step]));

/** First rung whose phases include the current rule phase.

`grid_charge` and `grid_hold` belong to the price plan when that plan may
control the battery, otherwise to the cheap-slot charge. `corridor` belongs
to the weak-PV rule while that day is latched.
*/
export function ladderActive(
  phase: string | undefined,
  planActive = false,
  lowYield = false,
): string | undefined {
  if (!phase) return undefined;
  if (phase === "grid_charge") return planActive ? "price" : "grid";
  if (phase === "grid_hold") return planActive ? "price" : "hold";
  if (phase === "corridor") return lowYield ? "low" : "corridor";
  return LADDER.find((step) => step.phases.includes(phase))?.id;
}

export function ladderView(
  i18n: I18n,
  phase: string | undefined,
  planActive: boolean,
  lowYield: boolean,
  onOpen: (group: string) => void,
): TemplateResult {
  const { t } = i18n;
  const active = ladderActive(phase, planActive, lowYield);
  return html`<section class="ladder" aria-label=${t("ladderTitle")}>
    <div class="ladder-head">
      <h3>${t("ladderTitle")}</h3>
      <p>${t("ladderHint")}</p>
    </div>
    ${LADDER_BANDS.map((band) => html`<div class="ladder-band">
      <h4>${t(band.label)}</h4>
      <div class="ladder-steps">
        ${band.steps.map((id) => {
          const step = byId.get(id);
          if (!step) return html``;
          const on = id === active;
          return html`<button
            type="button"
            class="ladder-step ${on ? "on" : ""}"
            aria-current=${on ? "true" : "false"}
            @click=${() => onOpen(step.group)}
          >${t(step.label)}</button>`;
        })}
      </div>
    </div>`)}
  </section>`;
}
