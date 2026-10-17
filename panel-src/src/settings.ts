import { html, nothing, type TemplateResult } from "lit";
import { ref } from "lit/directives/ref.js";
import { S, isOn, isSettingDisabled, num, type Hass, type HassEntity } from "./entities";
import type { ClassicStatus } from "./classic";
import type { I18n, Key } from "./i18n";
import { settingTip } from "./setting-tips";
import "./setting-tip";
import { THEMES, type ThemeId } from "./theme";

/** One settings area. `rows` are unique_id suffixes resolved by the backend settings map. */
export interface SettingsGroup {
  id: string;
  title: Key;
  hint: Key;
  icon: string;
  rows: readonly string[];
}

export const SETTINGS_GROUPS: readonly SettingsGroup[] = [
  {
    id: "hardware",
    title: "setHardware",
    hint: "setHardwareHint",
    icon: '<path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z"/>',
    rows: ["inverter_power", "installed_kwp", "max_charge_power", "min_charge_power", "feed_in_limit_percent"],
  },
  {
    id: "corridor",
    title: "setCorridor",
    hint: "setCorridorHint",
    icon: '<rect x="7" y="7" width="10" height="13" rx="2"/><path d="M10 4h4"/>',
    rows: [
      "charge_threshold",
      "advanced_corridor",
      "lower_corridor",
      "upper_corridor",
      "charge_target",
      "winter_minimum_hour",
      "summer_maximum_hour",
      "summer_charge_end",
      "hard_soc_limit_enabled",
      "hard_soc_limit",
      "fast_charge_floor_enabled",
      "fast_charge_floor_soc",
    ],
  },
  {
    id: "windows",
    title: "setWindows",
    hint: "setWindowsHint",
    icon: '<circle cx="12" cy="12" r="8"/><path d="M12 8v5l3 2"/>',
    rows: [
      "forward_looking_enabled",
      "forward_looking_max_soc",
      "pv_forecast_enabled",
      "delay_min_soc",
      "pv_forecast_threshold_kwh",
      "pv_forecast_safety_factor",
      "astro_enabled",
      "charge_start_sunrise_offset_h",
      "charge_end_sunset_offset_h",
      "morning_cap_enabled",
      "morning_cap_soc",
      "morning_cap_until_h",
      "gentle_charge_enabled",
      "gentle_charge_factor",
      "spreading_enabled",
      "spreading_target_soc",
    ],
  },
  {
    id: "yield",
    title: "setYield",
    hint: "setYieldHint",
    icon: '<circle cx="12" cy="12" r="3.5"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8"/>',
    rows: [
      "low_yield_priority_enabled",
      "low_yield_threshold",
      "low_yield_reference_kwh",
      "low_yield_reference_kwh_per_kwp",
      "curtailment_guard_enabled",
      "curtailment_activation_w",
      "curtailment_release_w",
      "two_tier_enabled",
      "charge_target_late",
      "late_charge_end_h",
      "lower_corridor_pause_enabled",
    ],
  },
  {
    id: "tariff",
    title: "setTariff",
    hint: "setTariffHint",
    icon: '<path d="M12 3v18"/><path d="M16 7.5A3.2 3.2 0 0 0 12.8 5H10a2.8 2.8 0 0 0 0 5.6h4a2.8 2.8 0 0 1 0 5.6H9.5A3.2 3.2 0 0 1 7 13.5"/>',
    rows: [
      "tariff_mode",
      "dynamic_tariff_enabled",
      "fixed_buy_price",
      "feed_in_price",
      "battery_capex_eur",
      "battery_total_cycles",
      "cheap_threshold",
      "max_grid_charge_kwh",
      "low_slot_grid_charge_enabled",
      "low_slot_target_soc",
      "low_slot_forecast_based",
      "low_slot_hold_discharge",
      "price_plan_enabled",
      "price_plan_active",
      "price_plan_max_soc",
      "price_plan_min_spread",
      "price_plan_efficiency",
      "price_plan_safety_factor",
    ],
  },
  {
    id: "reserve",
    title: "setReserve",
    hint: "setReserveHint",
    icon: '<path d="M12 3 5 6v6c0 4.5 3 7 7 9 4-2 7-4.5 7-9V6z"/>',
    rows: [
      "ht_enabled",
      "ht_sat",
      "ht_sun",
      "ht_on",
      "ht_off",
      "ht_min",
      "ht_sockel",
      "seasonal_reserve_enabled",
      "reserve_winter_percent",
      "reserve_equinox_percent",
      "fixed_reserve_enabled",
      "fixed_reserve_soc",
      "adaptive_reserve_enabled",
    ],
  },
  {
    id: "flex",
    title: "setFlex",
    hint: "setFlexHint",
    icon: '<path d="M9 7v4M15 7v4"/><path d="M8 11h8v2a4 4 0 0 1-8 0z"/><path d="M12 17v3"/>',
    rows: [
      "evcc_enabled",
      "evcc_discharge_limit_w",
      "wallbox_enabled",
      "wallbox_type",
      "wallbox_min_current",
      "wallbox_max_current",
      "wallbox_min_surplus",
      "wallbox_discharge_guard_enabled",
      "wallbox_discharge_guard_threshold_w",
      "hp_enabled",
      "hp_min_surplus",
      "hp_max_price",
      "hp_min_run_minutes",
      "hp_min_pause_minutes",
      "morning_discharge_mode",
      "morning_unload_soc",
      "morning_unload_start_soc",
      "pre_discharge_offset_h",
      "pre_discharge_max_power_w",
      "pre_discharge_tibber_auto",
      "morning_grid_export_threshold",
    ],
  },
  {
    id: "control",
    title: "setControl",
    hint: "setControlHint",
    icon: '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
    rows: [
      "regelung_aktiv",
      "auto_mode_enabled",
      "auto_mode_objective",
      "force_discharge",
      "force_discharge_power_w",
      "soc_hysteresis_percent",
      "charge_ramp_w_per_cycle",
      "update_interval",
      "watchdog_timeout",
    ],
  },
  {
    id: "diag",
    title: "setDiag",
    hint: "setDiagHint",
    icon: '<path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4z"/><path d="M16.5 13v7M13 16.5h7"/>',
    rows: ["debug", "reset_stats", "clear_limits"],
  },
];

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

export const isSettingsArea = (id: string | undefined): boolean =>
  id === CLASSIC_DASHBOARD.id || id === LOOK.id || SETTINGS_GROUPS.some((group) => group.id === id);

export const settingsHeading = (id: string | undefined): { title: Key; hint: Key } | undefined => {
  if (id === CLASSIC_DASHBOARD.id) return CLASSIC_DASHBOARD;
  if (id === LOOK.id) return LOOK;
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
  if (c.groupId === LOOK.id) return lookView(c);
  if (c.groupId === CLASSIC_DASHBOARD.id) return classicGuide(c);
  const current = SETTINGS_GROUPS.find((group) => group.id === c.groupId);
  if (current) {
    return html`<div class="settings-detail">${current.rows.map((key) => settingRow(c, key))}</div>`;
  }
  const ready = Object.keys(S).length > 0;
  return html`<div class="settings-tiles">
    ${tile(c, LOOK.id, LOOK.icon, LOOK.title, LOOK.hint)}
    ${tile(c, CLASSIC_DASHBOARD.id, CLASSIC_DASHBOARD.icon, CLASSIC_DASHBOARD.title, CLASSIC_DASHBOARD.hint)}
    ${ready
      ? SETTINGS_GROUPS.map((group) => (groupHasRows(c, group) ? tile(c, group.id, group.icon, group.title, group.hint) : nothing))
      : html`<p class="hint">${t("settingsPending")}</p>`}
  </div>`;
}
