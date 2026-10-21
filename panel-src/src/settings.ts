import { html, nothing, type TemplateResult } from "lit";
import { ref } from "lit/directives/ref.js";
import { E, S, isOn, isSettingDisabled, num, type Hass, type HassEntity } from "./entities";
import type { ClassicStatus } from "./classic";
import type { I18n, Key } from "./i18n";
import { ladderView } from "./ladder";
import { setupPage } from "./onboarding-view";
import { optionSections, sizingPage, type OptionCtx } from "./options-view";
import { settingTip } from "./setting-tips";
import { pauseStatus } from "./pause";
import { sliderField } from "./slider-field";
import "./setting-tip";
import { FLOW_STYLES, type FlowStyleId } from "./flow-style";
import { THEMES, type ThemeId } from "./theme";

/** One labelled block inside a settings area. */
export interface SettingsSection {
  title: Key;
  hint: Key;
  rows: readonly string[];
  /** Starts closed. The one-line summary stays visible. */
  fold?: boolean;
}

/** One settings area. `rows` are unique_id suffixes resolved by the backend settings map. */
export interface SettingsGroup {
  id: string;
  title: Key;
  hint: Key;
  icon: string;
  rows: readonly string[];
  sections: readonly SettingsSection[];
}

const area = (
  id: string,
  title: Key,
  hint: Key,
  icon: string,
  sections: readonly SettingsSection[],
): SettingsGroup => ({
  id,
  title,
  hint,
  icon,
  sections,
  rows: sections.flatMap((section) => section.rows),
});

const sec = (title: Key, hint: Key, rows: readonly string[], fold = false): SettingsSection => ({
  title,
  hint,
  rows,
  ...(fold ? { fold: true } : {}),
});

/** Areas follow setup order: plant, safety, tariff, PV charging, loads, automation, system. */
export const SETTINGS_GROUPS: readonly SettingsGroup[] = [
  area("plant", "setPlant", "setPlantHint", '<path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z"/>', [
    sec("secPlantPower", "secPlantPowerHint", [
      "inverter_power",
      "installed_kwp",
      "max_charge_power",
      "min_charge_power",
      "feed_in_limit_percent",
    ]),
  ]),
  area("safety", "setSafety", "setSafetyHint", '<path d="M12 3 5 6v6c0 4.5 3 7 7 9 4-2 7-4.5 7-9V6z"/>', [
    sec("secEmergency", "secEmergencyHint", ["charge_threshold"]),
    sec("secReserve", "secReserveHint", [
      "fixed_reserve_enabled",
      "fixed_reserve_soc",
      "seasonal_reserve_enabled",
      "reserve_winter_percent",
      "reserve_equinox_percent",
      "adaptive_reserve_enabled",
    ]),
    sec("secHard", "secHardHint", ["hard_soc_limit_enabled", "hard_soc_limit"]),
    sec("secWatchdog", "secWatchdogHint", ["watchdog_timeout"]),
  ]),
  area(
    "tariff",
    "setTariff",
    "setTariffHint",
    '<path d="M12 3v18"/><path d="M16 7.5A3.2 3.2 0 0 0 12.8 5H10a2.8 2.8 0 0 0 0 5.6h4a2.8 2.8 0 0 1 0 5.6H9.5A3.2 3.2 0 0 1 7 13.5"/>',
    [
      sec("secStrategy", "secStrategyHint", ["grid_charge_strategy", "price_plan_active"]),
      sec("secLimits", "secLimitsHint", [
        "max_grid_charge_kwh",
        "cheap_threshold",
        "low_slot_target_soc",
        "price_plan_max_soc",
        "low_slot_forecast_based",
        "price_plan_safety_factor",
        "low_slot_hold_discharge",
      ]),
      sec("secPlanTune", "secPlanTuneHint", [
        "price_plan_min_spread",
        "price_plan_efficiency",
      ]),
      sec("secHt", "secHtHint", ["ht_enabled", "ht_on", "ht_off", "ht_min", "ht_sockel", "ht_sat", "ht_sun"]),
      sec("secCosts", "secCostsHint", ["fixed_buy_price", "feed_in_price", "battery_capex_eur", "battery_total_cycles"]),
      sec("secSwitches", "secSwitchesHint", [
        "tariff_mode",
        "dynamic_tariff_enabled",
        "low_slot_grid_charge_enabled",
        "price_plan_enabled",
      ]),
    ],
  ),
  area(
    "pv",
    "setPv",
    "setPvHint",
    '<circle cx="12" cy="12" r="3.5"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8"/>',
    [
      sec("secCorridor", "secCorridorHint", [
        "charge_target",
        "two_tier_enabled",
        "charge_target_late",
        "late_charge_end_h",
      ]),
      sec("secWindows", "secWindowsHint", [
        "astro_enabled",
        "charge_start_sunrise_offset_h",
        "charge_end_sunset_offset_h",
        "winter_minimum_hour",
        "summer_charge_end",
        "morning_cap_enabled",
        "morning_cap_soc",
        "morning_cap_until_h",
      ]),
      sec(
        "secShape",
        "secShapeHint",
        [
          "fast_charge_floor_enabled",
          "fast_charge_floor_soc",
          "spreading_enabled",
          "spreading_target_soc",
          "gentle_charge_enabled",
          "gentle_charge_factor",
          "advanced_corridor",
          "lower_corridor",
          "upper_corridor",
          "lower_corridor_pause_enabled",
        ],
        true,
      ),
      sec(
        "secYield",
        "secYieldHint",
        [
          "pv_forecast_enabled",
          "delay_min_soc",
          "pv_forecast_threshold_kwh",
          "pv_forecast_safety_factor",
          "forward_looking_enabled",
          "forward_looking_max_soc",
          "low_yield_priority_enabled",
          "low_yield_threshold",
          "low_yield_reference_kwh",
          "low_yield_reference_kwh_per_kwp",
          "curtailment_guard_enabled",
          "curtailment_activation_w",
          "curtailment_release_w",
        ],
        true,
      ),
    ],
  ),
  area("loads", "setLoads", "setLoadsHint", '<path d="M9 7v4M15 7v4"/><path d="M8 11h8v2a4 4 0 0 1-8 0z"/><path d="M12 17v3"/>', [
    sec("secWallbox", "secWallboxHint", [
      "wallbox_enabled",
      "wallbox_type",
      "wallbox_min_current",
      "wallbox_max_current",
      "wallbox_min_surplus",
      "wallbox_discharge_guard_enabled",
      "wallbox_discharge_guard_threshold_w",
    ]),
    sec("secEvcc", "secEvccHint", ["evcc_enabled", "evcc_discharge_limit_w"]),
    sec("secHp", "secHpHint", ["hp_enabled", "hp_min_surplus", "hp_max_price", "hp_min_run_minutes", "hp_min_pause_minutes"]),
    sec("secMorning", "secMorningHint", [
      "morning_discharge_mode",
      "morning_unload_soc",
      "morning_unload_start_soc",
      "pre_discharge_offset_h",
      "pre_discharge_max_power_w",
      "pre_discharge_tibber_auto",
      "morning_grid_export_threshold",
    ]),
  ]),
  area("auto", "setAuto", "setAutoHint", '<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/><circle cx="12" cy="12" r="3"/>', [
    sec("secAuto", "secAutoHint", ["auto_mode_enabled", "auto_mode_objective"]),
  ]),
  area("system", "setSystem", "setSystemHint", '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>', [
    sec("secRun", "secRunHint", ["regelung_aktiv", "force_discharge", "force_discharge_power_w"]),
    sec("secPace", "secPaceHint", ["soc_hysteresis_percent", "charge_ramp_w_per_cycle", "update_interval"]),
    sec("secDiag", "secDiagHint", ["debug", "reset_stats", "clear_limits"]),
  ]),
];

/** Old area ids from before the setup-order regroup. */
const LEGACY_AREAS: Record<string, string> = {
  hardware: "plant",
  corridor: "pv",
  windows: "pv",
  yield: "pv",
  reserve: "safety",
  flex: "loads",
  control: "system",
  diag: "system",
};

const CONFIRM: Record<string, Key> = { reset_stats: "confirmReset" };

/** Guide page for adding the classic Lovelace dashboard. Not an entity group. */
export const CLASSIC_DASHBOARD = {
  id: "classic",
  title: "setClassic" as const,
  hint: "setClassicHint" as const,
  icon: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
};

/** Look of the cockpit. Not an entity group, so more themes can be added here. */
export const LOOK = {
  id: "look",
  title: "setLook" as const,
  hint: "setLookHint" as const,
  icon: '<circle cx="12" cy="12" r="4"/><path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.8 5.8l1.6 1.6M16.6 16.6l1.6 1.6M18.2 5.8l-1.6 1.6M7.4 16.6l-1.6 1.6"/>',
};

/** First-run checklist. Same list as the banner on the live screen. */
export const SETUP = {
  id: "setup",
  title: "setSetup" as const,
  hint: "setSetupHint" as const,
  icon: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/>',
};

/** Akku & PV sizing. Results come from sensors; inputs that have no entity go through panel options. */
export const SIZING = {
  id: "sizing",
  title: "setSizing" as const,
  hint: "setSizingHint" as const,
  icon: '<path d="M4 19V5M4 19h16"/><path d="M8 16v-4M12 16V8M16 16v-6"/>',
};

const SIZING_EXPANSION = ["sizing_hypothetical_battery_kwh", "sizing_hypothetical_pv_kwp"] as const;
const SIZING_PRICES = ["sizing_price_battery_kwh", "sizing_price_pv_kwp", "sizing_price_inverter", "sizing_price_extra"] as const;

export const isSettingsArea = (id: string | undefined): boolean =>
  id === CLASSIC_DASHBOARD.id ||
  id === LOOK.id ||
  id === SIZING.id ||
  id === SETUP.id ||
  SETTINGS_GROUPS.some((group) => group.id === id);

/** Map a hash fragment to a current area, including ids from the previous grouping. */
export function resolveSettingsArea(id: string | undefined): string | undefined {
  if (!id) return undefined;
  const next = LEGACY_AREAS[id] ?? id;
  return isSettingsArea(next) ? next : undefined;
}

export const settingsHeading = (id: string | undefined): { title: Key; hint: Key } | undefined => {
  if (id === CLASSIC_DASHBOARD.id) return CLASSIC_DASHBOARD;
  if (id === LOOK.id) return LOOK;
  if (id === SIZING.id) return SIZING;
  if (id === SETUP.id) return SETUP;
  return SETTINGS_GROUPS.find((group) => group.id === id);
};

export interface SettingsCtx {
  hass: Hass;
  i18n: I18n;
  pending: ReadonlySet<string>;
  groupId?: string;
  onOpenGroup: (id: string) => void;
  onOpenClassic: () => void;
  classic?: ClassicStatus;
  isAdmin: boolean;
  onCreateClassic: () => void;
  onCheckClassic: () => void;
  onToggle: (entityId: string) => void;
  onSelect: (entityId: string, option: string) => void;
  onNumber: (entityId: string, value: number) => void;
  onPress: (entityId: string) => void;
  theme: ThemeId;
  onTheme: (theme: ThemeId) => void;
  flowStyle: FlowStyleId;
  onFlowStyle: (style: FlowStyleId) => void;
  /** When true the live alert banner stays hidden; chips still show the same info. */
  alertBannerHidden: boolean;
  onAlertBannerHidden: (hidden: boolean) => void;
  options: OptionCtx;
  expert: boolean;
  onExpert: (on: boolean) => void;
  /** Section titles the user has opened. Folded sections start closed. */
  pvOpen: ReadonlySet<string>;
  onTogglePv: (section: string) => void;
}

const focused = (el: HTMLInputElement): boolean => {
  const root = el.getRootNode();
  const active = root instanceof ShadowRoot ? root.activeElement : document.activeElement;
  return active === el;
};

const labelOf = (entity: HassEntity | undefined, key: string): string => {
  const name = entity?.attributes.friendly_name;
  return typeof name === "string" && name.trim() ? name.trim() : key;
};

const unitOf = (entity: HassEntity | undefined): string => {
  const unit = entity?.attributes.unit_of_measurement;
  return typeof unit === "string" ? unit : "";
};

const bound = (entity: HassEntity | undefined, attr: "min" | "max" | "step"): number | undefined => {
  const value = entity?.attributes[attr];
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
};

type ControlCtx = Pick<SettingsCtx, "hass" | "i18n" | "pending" | "onToggle" | "onSelect" | "onNumber" | "onPress">;

function toggle(c: ControlCtx, id: string, label: string, locked: boolean): TemplateResult {
  const entity = c.hass.states[id];
  const on = isOn(entity);
  return html`<button
    class="switch ${on ? "on" : ""}"
    role="switch"
    aria-checked=${on}
    aria-label=${label}
    ?disabled=${locked || c.pending.has(id)}
    @click=${() => c.onToggle(id)}
  ></button>`;
}

function numberField(c: ControlCtx, id: string, entity: HassEntity | undefined, label: string, locked: boolean): TemplateResult {
  const shown = num(entity);
  const text = shown === undefined ? "" : String(shown);
  const min = bound(entity, "min");
  const max = bound(entity, "max");
  const step = bound(entity, "step");
  const unit = unitOf(entity);
  const percent = unit === "%";
  if ((entity?.attributes.mode === "slider" || percent) && min !== undefined && max !== undefined) {
    return sliderField({
      label,
      min,
      max,
      step: step ?? 1,
      value: shown ?? min,
      unit,
      disabled: locked || c.pending.has(id),
      onCommit: (value) => c.onNumber(id, value),
    });
  }
  return html`<label class="setting-num">
    <input
      type="number"
      inputmode="decimal"
      aria-label=${label}
      min=${min ?? nothing}
      max=${max ?? nothing}
      step=${step ?? "any"}
      ?disabled=${locked || c.pending.has(id)}
      ${ref((el) => {
        if (el instanceof HTMLInputElement && !focused(el) && el.value !== text) el.value = text;
      })}
      @change=${(e: Event) => {
        const value = Number.parseFloat((e.target as HTMLInputElement).value);
        if (Number.isFinite(value)) c.onNumber(id, value);
      }}
    />
    ${unit ? html`<span>${unit}</span>` : nothing}
  </label>`;
}

function selectField(c: ControlCtx, id: string, entity: HassEntity | undefined, locked: boolean): TemplateResult {
  const options = Array.isArray(entity?.attributes.options) ? (entity.attributes.options as string[]) : [];
  return html`<select
    .value=${entity?.state ?? ""}
    aria-label=${labelOf(entity, id)}
    ?disabled=${locked || !options.length || c.pending.has(id)}
    @change=${(e: Event) => c.onSelect(id, (e.target as HTMLSelectElement).value)}
  >
    ${options.map((option) => html`<option value=${option} ?selected=${option === entity?.state}>${c.i18n.option(option)}</option>`)}
  </select>`;
}

function settingRow(c: ControlCtx, key: string, quiet = false, plain = false): TemplateResult | typeof nothing {
  const id = S[key];
  if (!id) return nothing;
  const entity = c.hass.states[id];
  const registryOff = isSettingDisabled(key);
  if (!entity && !registryOff) return nothing;
  const locked = registryOff || !entity || entity.state === "unavailable";
  const held = locked || quiet;
  const label = labelOf(entity, key);
  const domain = id.split(".", 1)[0];
  const control =
    domain === "switch"
      ? toggle(c, id, label, held)
      : domain === "number"
        ? numberField(c, id, entity, label, held)
        : domain === "select"
          ? selectField(c, id, entity, held)
          : domain === "button"
            ? html`<button
                class="btn"
                ?disabled=${held || c.pending.has(id)}
                @click=${() => {
                  const confirm = CONFIRM[key];
                  if (confirm && !window.confirm(c.i18n.t(confirm))) return;
                  c.onPress(id);
                }}
              >${label}</button>`
            : nothing;
  const tip = settingTip(c.hass.language, key);
  const paused = key === "regelung_aktiv" ? pauseStatus(c.i18n.t, entity) : undefined;
  const dim = locked || (quiet && !plain);
  return html`<div class="${plain ? "setting-line" : "ctrl setting-row"} ${plain && domain === "number" ? "stack" : ""} ${dim ? "locked" : ""}">
    <div class="txt">
      <span class="name"><b>${label}</b>${tip ? html`<maestro-setting-tip .text=${tip} .label=${c.i18n.t("settingHelp")}></maestro-setting-tip>` : nothing}</span>
      ${paused ? html`<span>${paused}</span>` : nothing}
      ${registryOff ? html`<span>${c.i18n.t("entityDisabled")}</span>` : nothing}
    </div>
    ${control}
  </div>`;
}

export type StrategyCtx = ControlCtx & {
  expert: boolean;
  onExpert: (on: boolean) => void;
  /** Saved tariff slots of class "low". Undefined while the options are not loaded. */
  lowSlots?: number;
  /** False when the options are loaded and no price sensor is set. */
  priceSensor?: boolean;
};

const groupHasRows = (c: SettingsCtx, group: SettingsGroup): boolean =>
  group.rows.some((key) => {
    const id = S[key];
    return !!id && (!!c.hass.states[id] || isSettingDisabled(key));
  });

const tile = (c: SettingsCtx, id: string, icon: string, title: Key, hint: Key) => html`<button type="button" class="settings-tile" @click=${() => c.onOpenGroup(id)}>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" .innerHTML=${icon}></svg>
  <b>${c.i18n.t(title)}</b>
  <span>${c.i18n.t(hint)}</span>
</button>`;

function dep(c: SettingsCtx, name: Key, installed: boolean | undefined): TemplateResult {
  const { t } = c.i18n;
  const status = installed === undefined ? t("classicDepVia") : installed ? t("classicInstalled") : t("classicMissing");
  return html`<div class="dep"><b>${t(name)}</b><span class=${installed === undefined ? "" : installed ? "ok" : "bad"}>${status}</span></div>`;
}

function classicAction(c: SettingsCtx): TemplateResult {
  const { t } = c.i18n;
  const status = c.classic;
  const state = status?.state ?? "checking";
  const open = html`<button type="button" class="btn primary" @click=${() => c.onOpenClassic()}>${t("classicOpen")}</button>`;
  if (state === "checking") return html`<p>${t("classicChecking")}</p>`;
  if (state === "ours") return html`<p class="ok">${t("classicReady")}</p>${open}`;
  if (state === "foreign") return html`<p class="bad">${t("classicForeign")}</p>`;
  if (state === "error") {
    return html`<p class="bad">${t("classicFailed", { err: status?.error ?? "" })}</p>
      <button type="button" class="btn" @click=${() => c.onCheckClassic()}>${t("classicRetry")}</button>`;
  }
  if (!c.isAdmin) return html`<p>${t("classicAdminOnly")}</p>`;
  const creating = state === "creating";
  return html`${state === "empty" ? html`<p>${t("classicEmpty")}</p>` : nothing}
    <button type="button" class="btn primary" ?disabled=${creating} @click=${() => c.onCreateClassic()}>
      ${creating ? t("classicCreating") : state === "empty" ? t("classicSetup") : t("classicCreate")}
    </button>`;
}

function classicGuide(c: SettingsCtx): TemplateResult {
  const { t } = c.i18n;
  const steps = ["classicStep1", "classicStep2", "classicStep3", "classicStep4", "classicStep5"] as const;
  const missingCard = c.classic?.mushroom === false || c.classic?.apex === false;
  return html`<div class="guide">
    <p>${t("classicLead")}</p>
    <h3>${t("classicDepsTitle")}</h3>
    ${dep(c, "classicDepMushroom", c.classic?.mushroom)}
    ${dep(c, "classicDepApex", c.classic?.apex)}
    ${missingCard ? html`<p class="bad">${t("classicDepsMissing")}</p>` : nothing}
    <h3>${t("classicActionTitle")}</h3>
    <div class="classic-action">${classicAction(c)}</div>
    <p>${t("classicAfter")}</p>
    <details>
      <summary>${t("classicManual")}</summary>
      <ol>${steps.map((key) => html`<li>${t(key)}</li>`)}</ol>
      <p>${t("classicHa")}</p>
      <p>${t("classicPath")}</p>
      <p>${t("classicTimeout")}</p>
    </details>
  </div>`;
}

export type GridChargeStrategy = "off" | "slots" | "threshold" | "dynamic_auto" | "dynamic_expert";

export interface StrategyView {
  /** Undefined when the backend has no strategy select yet: then every row stays visible. */
  strategy?: GridChargeStrategy;
  expert: boolean;
}

const STRATEGIES: readonly GridChargeStrategy[] = ["off", "slots", "threshold", "dynamic_auto", "dynamic_expert"];

export const strategyOf = (hass: Hass): GridChargeStrategy | undefined => {
  const id = S.grid_charge_strategy;
  const state = id ? hass.states[id]?.state : undefined;
  return STRATEGIES.find((item) => item === state);
};

export const isPlanStrategy = (strategy: GridChargeStrategy | undefined): boolean =>
  strategy === "dynamic_auto" || strategy === "dynamic_expert";

const ruleRows = (strategy: GridChargeStrategy | undefined): boolean => strategy === "slots" || strategy === "threshold";

/** Which tariff rows the chosen strategy reads. Rows without a rule are always shown. */
const ROW_WHEN: Record<string, (v: Required<StrategyView>) => boolean> = {
  price_plan_active: (v) => isPlanStrategy(v.strategy),
  max_grid_charge_kwh: (v) => v.strategy !== "off",
  cheap_threshold: (v) => v.strategy === "threshold",
  low_slot_target_soc: (v) => ruleRows(v.strategy),
  price_plan_max_soc: (v) => isPlanStrategy(v.strategy),
  low_slot_forecast_based: (v) => ruleRows(v.strategy) && v.expert,
  low_slot_hold_discharge: (v) => ruleRows(v.strategy) && v.expert,
  price_plan_min_spread: (v) => v.strategy === "dynamic_expert",
  price_plan_efficiency: (v) => v.strategy === "dynamic_expert",
  price_plan_safety_factor: (v) => v.strategy === "dynamic_expert" || (ruleRows(v.strategy) && v.expert),
  tariff_mode: (v) => v.expert,
  dynamic_tariff_enabled: (v) => v.expert,
  low_slot_grid_charge_enabled: (v) => v.expert,
  price_plan_enabled: (v) => v.expert,
};

export function rowVisible(key: string, view: StrategyView): boolean {
  if (!view.strategy) return true;
  const when = ROW_WHEN[key];
  return !when || when({ strategy: view.strategy, expert: view.expert });
}

export interface PvView {
  /** Undefined while the astro switch is not loaded: both time sets stay visible. */
  astro?: boolean;
  expert: boolean;
}

/** Astro replaces the fixed end hours. Tuning numbers stay in the expert view. */
const PV_WHEN: Record<string, (v: PvView) => boolean> = {
  charge_start_sunrise_offset_h: (v) => v.astro !== false,
  charge_end_sunset_offset_h: (v) => v.astro !== false,
  winter_minimum_hour: (v) => v.astro !== true,
  summer_charge_end: (v) => v.astro !== true,
  pv_forecast_threshold_kwh: (v) => v.expert,
  pv_forecast_safety_factor: (v) => v.expert,
  low_yield_threshold: (v) => v.expert,
  low_yield_reference_kwh: (v) => v.expert,
  low_yield_reference_kwh_per_kwp: (v) => v.expert,
};

export function pvRowVisible(key: string, view: PvView): boolean {
  const when = PV_WHEN[key];
  return !when || when(view);
}

/** Detail fields stay on screen and go quiet while every listed switch is off. */
const QUIET_IF_ALL_OFF: Record<string, readonly string[]> = {
  charge_target_late: ["two_tier_enabled"],
  late_charge_end_h: ["two_tier_enabled"],
  morning_cap_soc: ["morning_cap_enabled"],
  morning_cap_until_h: ["morning_cap_enabled"],
  fast_charge_floor_soc: ["fast_charge_floor_enabled"],
  spreading_target_soc: ["spreading_enabled"],
  gentle_charge_factor: ["gentle_charge_enabled"],
  upper_corridor: ["advanced_corridor"],
  lower_corridor: ["advanced_corridor", "lower_corridor_pause_enabled"],
  delay_min_soc: ["pv_forecast_enabled", "astro_enabled"],
  pv_forecast_threshold_kwh: ["pv_forecast_enabled"],
  pv_forecast_safety_factor: ["pv_forecast_enabled"],
  forward_looking_max_soc: ["forward_looking_enabled"],
  low_yield_threshold: ["low_yield_priority_enabled"],
  low_yield_reference_kwh: ["low_yield_priority_enabled"],
  low_yield_reference_kwh_per_kwp: ["low_yield_priority_enabled"],
  curtailment_activation_w: ["curtailment_guard_enabled"],
  curtailment_release_w: ["curtailment_guard_enabled"],
};

export function rowQuiet(key: string, on: (parent: string) => boolean | undefined): boolean {
  const parents = QUIET_IF_ALL_OFF[key];
  if (!parents) return false;
  const states = parents.map(on);
  if (states.some((state) => state === undefined)) return false;
  return states.every((state) => !state);
}

/** Values that exist only for this switch. They render inside its card. */
export const SWITCH_FIELDS: Record<string, readonly string[]> = {
  fixed_reserve_enabled: ["fixed_reserve_soc"],
  seasonal_reserve_enabled: ["reserve_winter_percent", "reserve_equinox_percent"],
  hard_soc_limit_enabled: ["hard_soc_limit"],
  ht_enabled: ["ht_on", "ht_off", "ht_min", "ht_sockel", "ht_sat", "ht_sun"],
  two_tier_enabled: ["charge_target_late", "late_charge_end_h"],
  astro_enabled: ["charge_start_sunrise_offset_h", "charge_end_sunset_offset_h"],
  morning_cap_enabled: ["morning_cap_soc", "morning_cap_until_h"],
  fast_charge_floor_enabled: ["fast_charge_floor_soc"],
  spreading_enabled: ["spreading_target_soc"],
  gentle_charge_enabled: ["gentle_charge_factor"],
  advanced_corridor: ["upper_corridor"],
  pv_forecast_enabled: ["delay_min_soc", "pv_forecast_threshold_kwh", "pv_forecast_safety_factor"],
  forward_looking_enabled: ["forward_looking_max_soc"],
  low_yield_priority_enabled: ["low_yield_threshold", "low_yield_reference_kwh", "low_yield_reference_kwh_per_kwp"],
  curtailment_guard_enabled: ["curtailment_activation_w", "curtailment_release_w"],
  wallbox_enabled: ["wallbox_type", "wallbox_min_current", "wallbox_max_current", "wallbox_min_surplus"],
  wallbox_discharge_guard_enabled: ["wallbox_discharge_guard_threshold_w"],
  evcc_enabled: ["evcc_discharge_limit_w"],
  hp_enabled: ["hp_min_surplus", "hp_max_price", "hp_min_run_minutes", "hp_min_pause_minutes"],
  auto_mode_enabled: ["auto_mode_objective"],
  force_discharge: ["force_discharge_power_w"],
};

/** Group a visible row list so a switch's own fields are not separate cards. */
export function bundleRows(keys: readonly string[]): { key: string; children: string[] }[] {
  const visible = new Set(keys);
  const nested = new Set<string>();
  for (const [parent, children] of Object.entries(SWITCH_FIELDS)) {
    if (!visible.has(parent)) continue;
    for (const child of children) if (visible.has(child)) nested.add(child);
  }
  return keys
    .filter((key) => !nested.has(key))
    .map((key) => ({
      key,
      children: (SWITCH_FIELDS[key] ?? []).filter((child) => visible.has(child)),
    }));
}

const switchOn = (hass: Hass, key: string): boolean | undefined => {
  const id = S[key];
  const state = id ? hass.states[id]?.state : undefined;
  if (state === "on") return true;
  if (state === "off") return false;
  return undefined;
};

function settingBlocks(
  c: ControlCtx,
  keys: readonly string[],
  extraQuiet: (key: string) => boolean = () => false,
): Array<TemplateResult | typeof nothing> {
  return bundleRows(keys).map(({ key, children }) => {
    if (!children.length) return settingRow(c, key, extraQuiet(key));
    const off = switchOn(c.hass, key) === false;
    const held = (child: string) => {
      const parents = QUIET_IF_ALL_OFF[child];
      const shared = !!parents && (parents.length > 1 || parents[0] !== key);
      return shared ? extraQuiet(child) : off || extraQuiet(child);
    };
    const quietFields = children.every(held);
    return html`<div class="ctrl setting-bundle">
      ${settingRow(c, key, false, true)}
      <div class="bundle-fields ${quietFields ? "quiet" : ""}">
        ${children.map((child) => settingRow(c, child, held(child), true))}
      </div>
    </div>`;
  });
}

const clock = (hass: Hass, key: string): string => {
  const id = S[key];
  const value = id ? num(hass.states[id]) : undefined;
  if (value === undefined) return "–";
  const total = Math.round(value * 60);
  const hour = Math.floor(total / 60) % 24;
  const minute = ((total % 60) + 60) % 60;
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
};

/** The grid-charge part of the tariff area, also shown below the price plan. */
export const PLAN_CONTROLS: readonly SettingsSection[] = (
  SETTINGS_GROUPS.find((group) => group.id === "tariff")?.sections ?? []
).filter((section) => ["secStrategy", "secLimits", "secPlanTune", "secSwitches"].includes(section.title));

const EXPERT_KEY = "e3dc-maestro.settings-expert";
const PLAN_TUNE_KEY = "e3dc-maestro.plan-tune";

/** The price-plan settings start collapsed so the chart stays in view. */
export function loadPlanTuneOpen(): boolean {
  try {
    return localStorage.getItem(PLAN_TUNE_KEY) === "1";
  } catch {
    return false;
  }
}

export function savePlanTuneOpen(open: boolean): void {
  try {
    localStorage.setItem(PLAN_TUNE_KEY, open ? "1" : "0");
  } catch {
    // storage blocked or full: the block still toggles for this session
  }
}

export function loadExpert(): boolean {
  try {
    return localStorage.getItem(EXPERT_KEY) === "1";
  } catch {
    return false;
  }
}

export function saveExpert(on: boolean): void {
  try {
    localStorage.setItem(EXPERT_KEY, on ? "1" : "0");
  } catch {
    // storage blocked or full: the view still switches for this session
  }
}

const PV_OPEN_KEY = "e3dc-maestro.pv-open";

/** Folded PV sections the user has opened. Missing storage means all of them start closed. */
export function loadPvOpen(): Set<string> {
  try {
    const raw = localStorage.getItem(PV_OPEN_KEY);
    if (!raw) return new Set();
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((item): item is string => typeof item === "string"));
  } catch {
    return new Set();
  }
}

export function savePvOpen(open: ReadonlySet<string>): void {
  try {
    localStorage.setItem(PV_OPEN_KEY, JSON.stringify([...open]));
  } catch {
    // storage blocked or full: the sections still toggle for this session
  }
}

const fmt = (hass: Hass, key: string, digits = 0): string => {
  const id = S[key];
  const value = id ? num(hass.states[id]) : undefined;
  return value === undefined ? "–" : value.toLocaleString(hass.language, { maximumFractionDigits: digits });
};

/** One sentence for a PV section, from the switches the engine actually reads. */
function pvSummary(hass: Hass, i18n: I18n, title: Key): string {
  const { t } = i18n;
  const on = (key: string) => switchOn(hass, key) === true;
  if (title === "secCorridor") {
    const soc = fmt(hass, "charge_target");
    return on("two_tier_enabled")
      ? t("sumTargetLate", { soc, late: fmt(hass, "charge_target_late"), hour: clock(hass, "late_charge_end_h") })
      : t("sumTarget", { soc });
  }
  if (title === "secWindows") {
    const line =
      switchOn(hass, "astro_enabled") === true
        ? t("sumWindowAstro", {
            start: fmt(hass, "charge_start_sunrise_offset_h", 1),
            end: fmt(hass, "charge_end_sunset_offset_h", 1),
          })
        : t("sumWindowHours", { winter: clock(hass, "winter_minimum_hour"), summer: clock(hass, "summer_charge_end") });
    return on("morning_cap_enabled")
      ? `${line} ${t("sumWindowCap", { soc: fmt(hass, "morning_cap_soc"), hour: clock(hass, "morning_cap_until_h") })}`
      : line;
  }
  if (title === "secShape") {
    const parts: string[] = [];
    if (on("fast_charge_floor_enabled")) parts.push(t("sumPowerFloor", { soc: fmt(hass, "fast_charge_floor_soc") }));
    if (on("spreading_enabled")) parts.push(t("sumPowerSpread", { soc: fmt(hass, "spreading_target_soc") }));
    if (on("gentle_charge_enabled")) parts.push(t("sumPowerGentle", { factor: fmt(hass, "gentle_charge_factor", 2) }));
    if (on("advanced_corridor")) {
      parts.push(t("sumPowerCorridor", { low: fmt(hass, "lower_corridor"), high: fmt(hass, "upper_corridor") }));
    } else if (on("lower_corridor_pause_enabled")) {
      parts.push(t("sumPowerPause", { low: fmt(hass, "lower_corridor") }));
    }
    return parts.length ? parts.join(" ") : t("sumPowerAuto");
  }
  const parts: string[] = [];
  if (on("pv_forecast_enabled")) parts.push(t("sumPvForecast"));
  if (on("forward_looking_enabled")) parts.push(t("sumPvForward", { soc: fmt(hass, "forward_looking_max_soc") }));
  if (on("low_yield_priority_enabled")) parts.push(t("sumPvLow"));
  if (on("curtailment_guard_enabled")) parts.push(t("sumPvCurtail"));
  return parts.length ? parts.join(" ") : t("sumPvNone");
}

const FOLD_CHEVRON = html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>`;

function pvSections(c: SettingsCtx, sections: readonly SettingsSection[]): TemplateResult {
  const { t } = c.i18n;
  const view: PvView = { astro: switchOn(c.hass, "astro_enabled"), expert: c.expert };
  const quiet = (key: string) => rowQuiet(key, (parent) => switchOn(c.hass, parent));
  return html`${expertToggle(c)}
    ${sections.map((section) => {
      const rows = section.rows.filter((key) => pvRowVisible(key, view));
      const summary = html`<div class="strategy-summary"><p>${pvSummary(c.hass, c.i18n, section.title)}</p></div>`;
      if (!section.fold) {
        return html`<section class="settings-section">
          <h3>${t(section.title)}</h3>
          <p class="sub">${t(section.hint)}</p>
          ${settingBlocks(c, rows, quiet)}
          ${summary}
        </section>`;
      }
      const open = c.pvOpen.has(section.title);
      return html`<section class="settings-section settings-fold">
        <button type="button" class="group-head ${open ? "open" : ""}" aria-expanded=${open} @click=${() => c.onTogglePv(section.title)}>
          ${FOLD_CHEVRON}
          <span>${t(section.title)}</span>
        </button>
        ${summary}
        ${open
          ? html`<p class="sub">${t(section.hint)}</p>${settingBlocks(c, rows, quiet)}`
          : nothing}
      </section>`;
    })}`;
}

/** One sentence that says what the chosen strategy does with the current values. */
function strategySummary(c: StrategyCtx, strategy: GridChargeStrategy): TemplateResult {
  const { t } = c.i18n;
  const capId = S.max_grid_charge_kwh;
  const cap = capId ? num(c.hass.states[capId]) : undefined;
  const lines: string[] = [];
  if (strategy === "off") lines.push(t("sumOff"));
  if (strategy === "slots") {
    lines.push(t("sumSlots", { soc: fmt(c.hass, "low_slot_target_soc") }));
    if (c.lowSlots === 0) lines.push(t("sumSlotsNone"));
  }
  if (strategy === "threshold") {
    lines.push(t("sumThreshold", { price: fmt(c.hass, "cheap_threshold", 3), soc: fmt(c.hass, "low_slot_target_soc") }));
  }
  if (strategy !== "off" && cap !== undefined && cap > 0) {
    lines.push(t("sumCap", { kwh: fmt(c.hass, "max_grid_charge_kwh", 1) }));
  }
  if (isPlanStrategy(strategy)) {
    lines.push(t("sumPlan", { soc: fmt(c.hass, "price_plan_max_soc") }));
    lines.push(t(strategy === "dynamic_auto" ? "sumAuto" : "sumExpert"));
    const active = S.price_plan_active ? isOn(c.hass.states[S.price_plan_active]) : false;
    lines.push(t(active ? "sumActive" : "sumShadow"));
  }
  if ((strategy === "threshold" || isPlanStrategy(strategy)) && c.priceSensor === false) lines.push(t("sumNoPrice"));
  return html`<div class="strategy-summary">${lines.map((line) => html`<p>${line}</p>`)}</div>`;
}

function expertToggle(c: { i18n: I18n; expert: boolean; onExpert: (on: boolean) => void }): TemplateResult {
  const { t } = c.i18n;
  return html`<div class="ctrl setting-row">
    <div class="txt"><span class="name"><b>${t("expertView")}</b></span><span>${t("expertViewHint")}</span></div>
    <button
      class="switch ${c.expert ? "on" : ""}"
      role="switch"
      aria-checked=${c.expert}
      aria-label=${t("expertView")}
      @click=${() => c.onExpert(!c.expert)}
    ></button>
  </div>`;
}

function strategySections(c: StrategyCtx, sections: readonly SettingsSection[], headings: boolean): TemplateResult[] {
  const { t } = c.i18n;
  const strategy = strategyOf(c.hass);
  const view: StrategyView = { strategy, expert: c.expert };
  return sections.flatMap((section) => {
    const rows = section.rows.filter((key) => rowVisible(key, view));
    const lead = section.title === "secStrategy";
    if (!rows.length && !lead) return [];
    return [
      html`<section class="settings-section">
        ${headings ? html`<h3>${t(section.title)}</h3><p class="sub">${t(section.hint)}</p>` : nothing}
        ${settingBlocks(c, rows)}
        ${lead && strategy ? strategySummary(c, strategy) : nothing}
        ${lead ? expertToggle(c) : nothing}
      </section>`,
    ];
  });
}

export function planControls(c: StrategyCtx & { planTuneOpen: boolean; onTogglePlanTune: () => void }): TemplateResult {
  const { t } = c.i18n;
  const strategy = strategyOf(c.hass);
  const open = c.planTuneOpen;
  return html`<div class="card plan-tune">
    <button
      type="button"
      class="group-head ${open ? "open" : ""}"
      aria-expanded=${open}
      @click=${() => c.onTogglePlanTune()}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
      <span>${t("planTune")}</span>
      ${open || !strategy ? nothing : html`<b class="group-sum">${c.i18n.option(strategy)}</b>`}
    </button>
    ${open
      ? html`<p class="hint">${t("planTuneHint")}</p>
        ${strategySections(c, PLAN_CONTROLS, true)}`
      : nothing}
  </div>`;
}

function lookView(c: SettingsCtx): TemplateResult {
  const { t } = c.i18n;
  const copy: Record<ThemeId, { title: Key; hint: Key }> = {
    dark: { title: "themeDark", hint: "themeDarkHint" },
    classic: { title: "themeClassic", hint: "themeClassicHint" },
    e3dc: { title: "themeE3dc", hint: "themeE3dcHint" },
  };
  const flowCopy: Record<FlowStyleId, { title: Key; hint: Key }> = {
    nodes: { title: "flowStyleNodes", hint: "flowStyleNodesHint" },
    blob: { title: "flowStyleBlob", hint: "flowStyleBlobHint" },
    city: { title: "flowStyleCity", hint: "flowStyleCityHint" },
  };
  const showBanner = !c.alertBannerHidden;
  return html`<div class="theme-choices" role="radiogroup" aria-label=${t("setLook")}>
    ${THEMES.map(
      (id) => html`<button
        type="button"
        class="theme-choice ${c.theme === id ? "on" : ""}"
        role="radio"
        aria-checked=${c.theme === id}
        @click=${() => c.onTheme(id)}
      >
        <span class="swatch ${id}" aria-hidden="true"></span>
        <span class="txt"><b>${t(copy[id].title)}</b><span>${t(copy[id].hint)}</span></span>
      </button>`,
    )}
  </div>
  <h3 class="look-flow-title">${t("flowStyleTitle")}</h3>
  <p class="hint">${t("flowStyleHint")}</p>
  <div class="theme-choices" role="radiogroup" aria-label=${t("flowStyleLabel")}>
    ${FLOW_STYLES.map(
      (id) => html`<button
        type="button"
        class="theme-choice ${c.flowStyle === id ? "on" : ""}"
        role="radio"
        aria-checked=${c.flowStyle === id}
        @click=${() => c.onFlowStyle(id)}
      >
        <span class="swatch flow-${id}" aria-hidden="true"></span>
        <span class="txt"><b>${t(flowCopy[id].title)}</b><span>${t(flowCopy[id].hint)}</span></span>
      </button>`,
    )}
  </div>
  <div class="ctrl setting-row look-banner">
    <div class="txt"><span class="name"><b>${t("alertBannerShow")}</b></span><span>${t("alertBannerShowHint")}</span></div>
    <button
      class="switch ${showBanner ? "on" : ""}"
      role="switch"
      aria-checked=${showBanner}
      aria-label=${t("alertBannerShow")}
      @click=${() => c.onAlertBannerHidden(showBanner)}
    ></button>
  </div>`;
}

export function settingsView(c: SettingsCtx): TemplateResult {
  const { t } = c.i18n;
  if (c.groupId === SETUP.id) return setupPage(c);
  if (c.groupId === LOOK.id) return lookView(c);
  if (c.groupId === CLASSIC_DASHBOARD.id) return classicGuide(c);
  if (c.groupId === SIZING.id) {
    return sizingPage(
      c.options,
      html`${SIZING_EXPANSION.map((key) => settingRow(c, key))}`,
      html`${SIZING_PRICES.map((key) => settingRow(c, key))}`,
    );
  }
  const current = SETTINGS_GROUPS.find((group) => group.id === c.groupId);
  if (current?.id === "pv") {
    return html`<div class="settings-detail">
      ${pvSections(c, current.sections)}
      ${optionSections(c.options, current.id)}
    </div>`;
  }
  if (current?.id === "tariff") {
    const strategyCtx: StrategyCtx = {
      ...c,
      lowSlots: c.options.ready ? c.options.slots.filter((slot) => slot.class_ === "low").length : undefined,
      priceSensor: c.options.ready ? !!c.options.options.price_sensor : undefined,
    };
    return html`<div class="settings-detail">
      ${strategySections(strategyCtx, current.sections, true)}
      ${optionSections(c.options, current.id)}
    </div>`;
  }
  if (current) {
    return html`<div class="settings-detail">
      ${current.sections.map(
        (section) => html`<section class="settings-section">
          ${current.sections.length > 1 ? html`<h3>${t(section.title)}</h3><p class="sub">${t(section.hint)}</p>` : nothing}
          ${settingBlocks(c, section.rows)}
        </section>`,
      )}
      ${optionSections(c.options, current.id)}
    </div>`;
  }
  const ready = Object.keys(S).length > 0;
  const phase = c.hass.states[E.phase]?.state;
  return html`${ladderView(
    c.i18n,
    phase,
    isOn(c.hass.states[E.ctrlPlanControls]),
    isOn(c.hass.states[E.lowYield]),
    c.onOpenGroup,
  )}
    <div class="settings-tiles">
    ${tile(c, SETUP.id, SETUP.icon, SETUP.title, SETUP.hint)}
    ${tile(c, LOOK.id, LOOK.icon, LOOK.title, LOOK.hint)}
    ${tile(c, SIZING.id, SIZING.icon, "setSizingTile", "setSizingTileHint")}
    ${tile(c, CLASSIC_DASHBOARD.id, CLASSIC_DASHBOARD.icon, CLASSIC_DASHBOARD.title, CLASSIC_DASHBOARD.hint)}
    ${ready
      ? SETTINGS_GROUPS.map((group) => (groupHasRows(c, group) ? tile(c, group.id, group.icon, group.title, group.hint) : nothing))
      : html`<p class="hint">${t("settingsPending")}</p>`}
  </div>`;
}
