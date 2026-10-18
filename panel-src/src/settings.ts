import { html, nothing, type TemplateResult } from "lit";
import { ref } from "lit/directives/ref.js";
import { E, S, isOn, isSettingDisabled, num, type Hass, type HassEntity } from "./entities";
import type { ClassicStatus } from "./classic";
import type { I18n, Key } from "./i18n";
import { ladderView } from "./ladder";
import { setupPage } from "./onboarding-view";
import { optionSections, sizingPage, type OptionCtx } from "./options-view";
import { settingTip } from "./setting-tips";
import "./setting-tip";
import { THEMES, type ThemeId } from "./theme";

/** One labelled block inside a settings area. */
export interface SettingsSection {
  title: Key;
  hint: Key;
  rows: readonly string[];
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

const sec = (title: Key, hint: Key, rows: readonly string[]): SettingsSection => ({ title, hint, rows });

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
      sec("secPrices", "secPricesHint", [
        "tariff_mode",
        "dynamic_tariff_enabled",
        "fixed_buy_price",
        "feed_in_price",
        "battery_capex_eur",
        "battery_total_cycles",
        "cheap_threshold",
      ]),
      sec("secGridCharge", "secGridChargeHint", [
        "max_grid_charge_kwh",
        "low_slot_grid_charge_enabled",
        "low_slot_target_soc",
        "low_slot_forecast_based",
        "low_slot_hold_discharge",
      ]),
      sec("secPlan", "secPlanHint", [
        "price_plan_enabled",
        "price_plan_active",
        "price_plan_max_soc",
        "price_plan_min_spread",
        "price_plan_efficiency",
        "price_plan_safety_factor",
      ]),
      sec("secHt", "secHtHint", ["ht_enabled", "ht_on", "ht_off", "ht_min", "ht_sockel", "ht_sat", "ht_sun"]),
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
        "advanced_corridor",
        "lower_corridor",
        "upper_corridor",
        "winter_minimum_hour",
        "summer_maximum_hour",
        "summer_charge_end",
        "lower_corridor_pause_enabled",
      ]),
      sec("secForecast", "secForecastHint", [
        "pv_forecast_enabled",
        "delay_min_soc",
        "pv_forecast_threshold_kwh",
        "pv_forecast_safety_factor",
        "forward_looking_enabled",
        "forward_looking_max_soc",
      ]),
      sec("secWindows", "secWindowsHint", [
        "astro_enabled",
        "charge_start_sunrise_offset_h",
        "charge_end_sunset_offset_h",
        "morning_cap_enabled",
        "morning_cap_soc",
        "morning_cap_until_h",
      ]),
      sec("secShape", "secShapeHint", [
        "fast_charge_floor_enabled",
        "fast_charge_floor_soc",
        "spreading_enabled",
        "spreading_target_soc",
        "gentle_charge_enabled",
        "gentle_charge_factor",
        "two_tier_enabled",
        "charge_target_late",
        "late_charge_end_h",
      ]),
      sec("secYield", "secYieldHint", [
        "low_yield_priority_enabled",
        "low_yield_threshold",
        "low_yield_reference_kwh",
        "low_yield_reference_kwh_per_kwp",
        "curtailment_guard_enabled",
        "curtailment_activation_w",
        "curtailment_release_w",
      ]),
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
  options: OptionCtx;
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
  const commit = (raw: string) => {
    const value = Number.parseFloat(raw);
    if (Number.isFinite(value)) c.onNumber(id, value);
  };
  if (entity?.attributes.mode === "slider" && min !== undefined && max !== undefined) {
    return html`<label class="setting-num range">
      <input
        type="range"
        aria-label=${label}
        min=${min}
        max=${max}
        step=${step ?? 1}
        ?disabled=${locked || c.pending.has(id)}
        ${ref((el) => {
          if (el instanceof HTMLInputElement && !focused(el) && el.value !== text) el.value = text;
        })}
        @input=${(e: Event) => {
          const input = e.target as HTMLInputElement & { _commit?: number };
          const value = input.parentElement?.querySelector("b");
          if (value) value.textContent = unit ? `${input.value} ${unit}` : input.value;
          window.clearTimeout(input._commit);
          input._commit = window.setTimeout(() => commit(input.value), 200);
        }}
        @change=${(e: Event) => {
          const input = e.target as HTMLInputElement & { _commit?: number };
          window.clearTimeout(input._commit);
          commit(input.value);
        }}
      />
      <b .textContent=${unit ? `${text} ${unit}` : text}></b>
    </label>`;
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

function settingRow(c: ControlCtx, key: string): TemplateResult | typeof nothing {
  const id = S[key];
  if (!id) return nothing;
  const entity = c.hass.states[id];
  const registryOff = isSettingDisabled(key);
  if (!entity && !registryOff) return nothing;
  const locked = registryOff || !entity || entity.state === "unavailable";
  const label = labelOf(entity, key);
  const domain = id.split(".", 1)[0];
  const control =
    domain === "switch"
      ? toggle(c, id, label, locked)
      : domain === "number"
        ? numberField(c, id, entity, label, locked)
        : domain === "select"
          ? selectField(c, id, entity, locked)
          : domain === "button"
            ? html`<button
                class="btn"
                ?disabled=${locked || c.pending.has(id)}
                @click=${() => {
                  const confirm = CONFIRM[key];
                  if (confirm && !window.confirm(c.i18n.t(confirm))) return;
                  c.onPress(id);
                }}
              >${label}</button>`
            : nothing;
  const tip = settingTip(c.hass.language, key);
  return html`<div class="ctrl setting-row ${locked ? "locked" : ""}">
    <div class="txt">
      <span class="name"><b>${label}</b>${tip ? html`<maestro-setting-tip .text=${tip} .label=${c.i18n.t("settingHelp")}></maestro-setting-tip>` : nothing}</span>
      ${registryOff ? html`<span>${c.i18n.t("entityDisabled")}</span>` : nothing}
    </div>
    ${control}
  </div>`;
}

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

/** Knobs that decide when the price plan charges from the grid. Same entities as the tariff settings area. */
export const PLAN_CONTROLS: readonly { title: Key; hint: Key; rows: readonly string[] }[] = [
  {
    title: "planTuneTariff",
    hint: "planTuneTariffHint",
    rows: ["tariff_mode", "dynamic_tariff_enabled", "cheap_threshold", "fixed_buy_price", "feed_in_price"],
  },
  {
    title: "planTuneGrid",
    hint: "planTuneGridHint",
    rows: [
      "low_slot_grid_charge_enabled",
      "low_slot_target_soc",
      "max_grid_charge_kwh",
      "low_slot_forecast_based",
      "low_slot_hold_discharge",
    ],
  },
  {
    title: "planTunePlan",
    hint: "planTunePlanHint",
    rows: [
      "price_plan_enabled",
      "price_plan_active",
      "price_plan_max_soc",
      "price_plan_min_spread",
      "price_plan_efficiency",
      "price_plan_safety_factor",
      "battery_capex_eur",
      "battery_total_cycles",
    ],
  },
];

export function planControls(c: ControlCtx): TemplateResult {
  const { t } = c.i18n;
  return html`<div class="card plan-tune">
    <h3>${t("planTune")}</h3>
    <p class="hint">${t("planTuneHint")}</p>
    ${PLAN_CONTROLS.map(
      (group) => html`<h4>${t(group.title)}</h4>
        <p class="sub">${t(group.hint)}</p>
        ${group.rows.map((key) => settingRow(c, key))}`,
    )}
  </div>`;
}

function lookView(c: SettingsCtx): TemplateResult {
  const { t } = c.i18n;
  const copy: Record<ThemeId, { title: Key; hint: Key }> = {
    dark: { title: "themeDark", hint: "themeDarkHint" },
    classic: { title: "themeClassic", hint: "themeClassicHint" },
    e3dc: { title: "themeE3dc", hint: "themeE3dcHint" },
  };
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
  if (current) {
    return html`<div class="settings-detail">
      ${current.sections.map(
        (section) => html`<section class="settings-section">
          ${current.sections.length > 1 ? html`<h3>${t(section.title)}</h3><p class="sub">${t(section.hint)}</p>` : nothing}
          ${section.rows.map((key) => settingRow(c, key))}
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
