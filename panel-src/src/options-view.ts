import { html, nothing, type TemplateResult } from "lit";
import "./maestro-chart";
import { asMonths, sizingYearOptions } from "./charts";
import { memo } from "./memo";
import { ref } from "lit/directives/ref.js";
import { sliderField } from "./slider-field";
import { E, type Hass, type HassEntity } from "./entities";
import type { I18n, Key } from "./i18n";
import {
  actionFrom,
  actionTo,
  blocksFor,
  emptySlot,
  entityChoices,
  fieldLabel,
  selectValue,
  timeValue,
  type OptionArea,
  type OptionField,
  type Slot,
} from "./options";

export interface OptionCtx {
  hass: Hass;
  i18n: I18n;
  isAdmin: boolean;
  options: Record<string, unknown>;
  /** True after the panel options were read successfully. */
  ready: boolean;
  error?: string;
  notice?: string;
  query: Record<string, string>;
  pending: ReadonlySet<string>;
  slots: Slot[];
  onQuery: (key: string, query: string) => void;
  onChange: (key: string, value: unknown) => void;
  onSlots: (slots: Slot[]) => void;
  onSaveSlots: () => void;
  onRunSizing: () => void;
}

const idsOf = (hass: Hass): string[] => Object.keys(hass.states).sort();

const focused = (el: HTMLInputElement): boolean => {
  const root = el.getRootNode();
  const active = root instanceof ShadowRoot ? root.activeElement : document.activeElement;
  return active === el;
};

/** `wide` stacks the control under the label so long entity ids get the full row. */
const row = (label: string, control: TemplateResult, locked: boolean, wide = false): TemplateResult =>
  html`<div class="ctrl setting-row ${locked ? "locked" : ""} ${wide ? "wide" : ""}">
    <div class="txt"><span class="name"><b>${label}</b></span></div>
    ${control}
  </div>`;

function numberField(c: OptionCtx, field: OptionField, label: string): TemplateResult {
  const current = c.options[field.key];
  const text = typeof current === "number" ? String(current) : "";
  if (field.unit === "%" && field.min !== undefined && field.max !== undefined) {
    return sliderField({
      label,
      min: field.min,
      max: field.max,
      step: field.step ?? 1,
      value: typeof current === "number" ? current : field.min,
      unit: "%",
      disabled: !c.isAdmin || c.pending.has(field.key),
      onCommit: (value) => c.onChange(field.key, value),
    });
  }
  return html`<label class="setting-num">
    <input
      type="number"
      inputmode="decimal"
      aria-label=${label}
      min=${field.min ?? nothing}
      max=${field.max ?? nothing}
      step=${field.step ?? "any"}
      ?disabled=${!c.isAdmin || c.pending.has(field.key)}
      ${ref((el) => {
        if (el instanceof HTMLInputElement && !focused(el) && el.value !== text) el.value = text;
      })}
      @change=${(e: Event) => {
        const value = Number.parseFloat((e.target as HTMLInputElement).value);
        if (Number.isFinite(value)) c.onChange(field.key, value);
      }}
    />
  </label>`;
}

function entityField(c: OptionCtx, field: OptionField, label: string, multiple: boolean): TemplateResult {
  const query = c.query[field.key] ?? "";
  const choices = query.trim() ? entityChoices(idsOf(c.hass), field.domains, query) : [];
  const current = c.options[field.key];
  const selected = multiple && Array.isArray(current) ? current.filter((item): item is string => typeof item === "string") : [];
  const single = !multiple && typeof current === "string" ? current : "";
  return html`<div class="opt-entity">
    ${multiple
      ? html`<div class="opt-chips">
          ${selected.map(
            (id) => html`<button type="button" class="chip" ?disabled=${!c.isAdmin} @click=${() => c.onChange(field.key, selected.filter((item) => item !== id))}>${id}</button>`,
          )}
        </div>`
      : nothing}
    <input
      type="search"
      aria-label=${label}
      placeholder=${c.i18n.t("optSearch")}
      .value=${query || single}
      ?disabled=${!c.isAdmin}
      @input=${(e: Event) => c.onQuery(field.key, (e.target as HTMLInputElement).value)}
      @change=${(e: Event) => {
        const value = (e.target as HTMLInputElement).value.trim();
        if (multiple) {
          if (value && !selected.includes(value)) c.onChange(field.key, [...selected, value]);
          c.onQuery(field.key, "");
          return;
        }
        if (!value && field.required) return;
        c.onChange(field.key, value || null);
      }}
    />
    ${choices.length
      ? html`<div class="opt-choices">
          ${choices.map(
            (id) => html`<button
              type="button"
              ?disabled=${!c.isAdmin}
              @click=${() => {
                if (multiple) c.onChange(field.key, selected.includes(id) ? selected : [...selected, id]);
                else c.onChange(field.key, id);
                c.onQuery(field.key, "");
              }}
            >${id}</button>`,
          )}
        </div>`
      : nothing}
    ${!field.required && !multiple && single
      ? html`<button type="button" class="btn" ?disabled=${!c.isAdmin} @click=${() => c.onChange(field.key, null)}>${c.i18n.t("optClear")}</button>`
      : nothing}
  </div>`;
}

function actionField(c: OptionCtx, field: OptionField): TemplateResult {
  const parts = actionFrom(c.options[field.key]);
  const commit = (service: string, entity: string) => c.onChange(field.key, actionTo(service, entity));
  return html`<div class="opt-action">
    <input
      aria-label=${c.i18n.t("optService")}
      placeholder=${c.i18n.t("optService")}
      .value=${parts.service}
      ?disabled=${!c.isAdmin}
      @change=${(e: Event) => commit((e.target as HTMLInputElement).value, parts.entity)}
    />
    <input
      aria-label=${c.i18n.t("optTarget")}
      placeholder=${c.i18n.t("optTarget")}
      .value=${parts.entity}
      ?disabled=${!c.isAdmin}
      @change=${(e: Event) => commit(parts.service, (e.target as HTMLInputElement).value)}
    />
    <button type="button" class="btn" ?disabled=${!c.isAdmin} @click=${() => c.onChange(field.key, null)}>${c.i18n.t("optClear")}</button>
  </div>`;
}

const WEEKDAYS: Key[] = ["wd0", "wd1", "wd2", "wd3", "wd4", "wd5", "wd6"];

function slotsEditor(c: OptionCtx): TemplateResult {
  const { t } = c.i18n;
  const update = (index: number, next: Slot) => c.onSlots(c.slots.map((slot, i) => (i === index ? next : slot)));
  return html`<section class="settings-section">
    <h3>${t("secSlots")}</h3>
    <p class="sub">${t("secSlotsHint")}</p>
    ${c.slots.map(
      (slot, index) => html`<div class="slot-card">
        <div class="opt-days" role="group" aria-label=${t("optWeekdays")}>
          ${WEEKDAYS.map(
            (key, day) => html`<button
              type="button"
              class=${slot.weekdays.includes(day) ? "on" : ""}
              aria-pressed=${slot.weekdays.includes(day)}
              ?disabled=${!c.isAdmin}
              @click=${() => {
                const weekdays = slot.weekdays.includes(day) ? slot.weekdays.filter((item) => item !== day) : [...slot.weekdays, day].sort();
                update(index, { ...slot, weekdays });
              }}
            >${t(key)}</button>`,
          )}
        </div>
        <div class="opt-slot-fields">
          <label>${t("optFrom")}<input type="number" min="0" max="24" .value=${String(slot.start_h)} ?disabled=${!c.isAdmin} @change=${(e: Event) => update(index, { ...slot, start_h: Number((e.target as HTMLInputElement).value) })} /></label>
          <label>${t("optTo")}<input type="number" min="0" max="24" .value=${String(slot.end_h)} ?disabled=${!c.isAdmin} @change=${(e: Event) => update(index, { ...slot, end_h: Number((e.target as HTMLInputElement).value) })} /></label>
          <label>${t("optClass")}
            <select .value=${slot.class_} ?disabled=${!c.isAdmin} @change=${(e: Event) => update(index, { ...slot, class_: (e.target as HTMLSelectElement).value as Slot["class_"] })}>
              <option value="high">${t("classHigh")}</option>
              <option value="low">${t("classLow")}</option>
              <option value="normal">${t("classNormal")}</option>
            </select>
          </label>
          <label>${t("optReserve")}
            <input
              type="number"
              min="0"
              max="100"
              .value=${slot.min_reserve_soc === undefined ? "" : String(slot.min_reserve_soc)}
              ?disabled=${!c.isAdmin}
              @change=${(e: Event) => {
                const raw = (e.target as HTMLInputElement).value.trim();
                const next = { ...slot };
                if (!raw) delete next.min_reserve_soc;
                else next.min_reserve_soc = Number(raw);
                update(index, next);
              }}
            />
          </label>
          <button type="button" class="btn" ?disabled=${!c.isAdmin} @click=${() => c.onSlots(c.slots.filter((_, i) => i !== index))}>${t("optRemove")}</button>
        </div>
      </div>`,
    )}
    <div class="opt-actions">
      <button type="button" class="btn" ?disabled=${!c.isAdmin} @click=${() => c.onSlots([...c.slots, emptySlot()])}>${t("optAddSlot")}</button>
      <button type="button" class="btn" ?disabled=${!c.isAdmin || c.pending.has("tariff_slots")} @click=${() => c.onSaveSlots()}>${t("optSaveSlots")}</button>
    </div>
  </section>`;
}

function fieldRow(c: OptionCtx, field: OptionField): TemplateResult {
  const label = fieldLabel(c.hass.language, field.key);
  const locked = !c.isAdmin;
  if (field.kind === "bool") {
    const on = c.options[field.key] === true;
    return row(
      label,
      html`<button class="switch ${on ? "on" : ""}" role="switch" aria-checked=${on} aria-label=${label} ?disabled=${locked || c.pending.has(field.key)} @click=${() => c.onChange(field.key, !on)}></button>`,
      locked,
    );
  }
  if (field.kind === "number") return row(label, numberField(c, field, label), locked, field.unit === "%");
  if (field.kind === "select") {
    const choices = field.choices ?? [];
    const value = selectValue(c.options[field.key], choices);
    return row(
      label,
      html`<select aria-label=${label} .value=${value} ?disabled=${locked} @change=${(e: Event) => c.onChange(field.key, (e.target as HTMLSelectElement).value)}>
        ${choices.map((choice) => html`<option value=${choice} ?selected=${choice === value}>${choice}</option>`)}
      </select>`,
      locked,
    );
  }
  if (field.kind === "time") {
    return row(
      label,
      html`<input type="time" aria-label=${label} .value=${timeValue(c.options[field.key])} ?disabled=${locked} @change=${(e: Event) => c.onChange(field.key, (e.target as HTMLInputElement).value)} />`,
      locked,
    );
  }
  if (field.kind === "text") {
    const value = typeof c.options[field.key] === "string" ? (c.options[field.key] as string) : "";
    return row(
      label,
      html`<input aria-label=${label} .value=${value} maxlength="64" ?disabled=${locked} @change=${(e: Event) => c.onChange(field.key, (e.target as HTMLInputElement).value)} />`,
      locked,
    );
  }
  if (field.kind === "action") return row(label, actionField(c, field), locked, true);
  return row(label, entityField(c, field, label, field.kind === "entities"), locked, true);
}

const shown = (entity: HassEntity | undefined): string =>
  !entity || entity.state === "unknown" || entity.state === "unavailable" ? "–" : entity.state;

const REC_HINT: Record<string, Key> = {
  recommended_economic: "recEconomicHint",
  recommended_technical: "recTechnicalHint",
  recommended_balanced: "recBalancedHint",
};

const amount = (language: string, value: unknown, digits: number): string | undefined =>
  typeof value === "number" && Number.isFinite(value)
    ? value.toLocaleString(language || "de", { minimumFractionDigits: digits, maximumFractionDigits: digits })
    : undefined;

const recCard = (c: OptionCtx, key: string, title: Key): TemplateResult => {
  const raw = c.hass.states[E.sizingMatrix]?.attributes[key];
  if (!raw || typeof raw !== "object") return html``;
  const rec = raw as Record<string, unknown>;
  const line = (label: Key, value: unknown, unit: string) =>
    html`<div class="row"><span>${c.i18n.t(label)}</span><b>${value ?? "–"}${unit}</b></div>`;
  return html`<div class="card">
    <h3>${c.i18n.t(title)}</h3>
    <p class="sub">${c.i18n.t(REC_HINT[key])}</p>
    <div class="rows">
      ${line("sizingBattery", rec.battery_kwh, " kWh")}
      ${line("sizingPv", rec.pv_kwp, " kWp")}
      ${line("sizingAutarky", rec.self_sufficiency_pct, " %")}
      ${line("sizingSavings", rec.savings_eur_per_year, " €")}
      ${line("sizingPayback", rec.payback_years, " a")}
    </div>
    ${typeof rec.reason === "string" ? html`<p class="sub">${rec.reason}</p>` : nothing}
  </div>`;
};

const expansionStory = (c: OptionCtx, scenario: Record<string, unknown>): string | undefined => {
  const loc = c.hass.language;
  const bat = amount(loc, scenario.slider_battery_kwh, 1);
  const pv = amount(loc, scenario.slider_pv_kwp, 1);
  const aut = amount(loc, scenario.scenario_self_sufficiency_pct, 0);
  const save = amount(loc, scenario.scenario_savings_eur, 0);
  if (!bat || !pv || !aut || !save) return undefined;
  const years = amount(loc, scenario.scenario_payback_years, 1);
  return years
    ? c.i18n.t("sizingStory", { bat, pv, aut, save, years })
    : c.i18n.t("sizingStoryOpen", { bat, pv, aut, save });
};

export function sizingPage(c: OptionCtx, expansion: TemplateResult, prices: TemplateResult): TemplateResult {
  const { t } = c.i18n;
  const status = c.hass.states[E.sizingStatus]?.state;
  const statusText = status === "running" ? t("sizingRunning") : status === "ready" ? t("sizingReady") : t("sizingNotRun");
  const scenario = c.hass.states[E.sizingScenario]?.attributes ?? {};
  const matrix = c.hass.states[E.sizingMatrix]?.attributes ?? {};
  const top = Array.isArray(matrix.top_savings_scenarios) ? (matrix.top_savings_scenarios as Record<string, unknown>[]) : [];
  const numOf = (value: unknown): string => (typeof value === "number" && Number.isFinite(value) ? String(value) : "–");
  const story = expansionStory(c, scenario);
  return html`<div class="settings-detail">
    <section class="settings-section">
      <p class="sub">${t("sizingLead")}</p>
    </section>
    <section class="settings-section">
      <h3>${t("sizingAdd")}</h3>
      <p class="sub">${t("sizingAddHint")}</p>
      ${expansion}
    </section>
    <section class="settings-section">
      <div class="opt-actions">
        <button type="button" class="btn" ?disabled=${!c.hass.states[E.btnSizing] || status === "running"} @click=${() => c.onRunSizing()}>${t("sizingRun")}</button>
        <span class="hint">${statusText}</span>
      </div>
    </section>
    <section class="settings-section">
      <h3>${t("sizingScenario")}</h3>
      <p class="sub">${story ?? t("sizingNeedRun")}</p>
      ${(() => {
        const avoided = asMonths(scenario.scenario_monthly_avoided_kwh);
        const baseline = asMonths(scenario.scenario_monthly_baseline_grid_in);
        if (!avoided || !baseline) return nothing;
        return html`<maestro-chart .options=${memo("sizing-year", [c.hass.language, avoided.join(","), baseline.join(",")], () => sizingYearOptions(c.hass.language, avoided, baseline, t("sizingChartAvoided"), t("sizingChartBaseline")))}></maestro-chart>
          <p class="hint">${t("sizingChartCaption")}</p>`;
      })()}
      ${story
        ? html`<div class="rows">
            <div class="row"><span>${t("sizingAutarky")}</span><b>${numOf(scenario.scenario_self_sufficiency_pct)} %</b></div>
            <div class="row"><span>${t("sizingAvoided")}</span><b>${numOf(scenario.scenario_avoided_kwh)} kWh</b></div>
            <div class="row"><span>${t("sizingSavings")}</span><b>${numOf(scenario.scenario_savings_eur)} €</b></div>
            <div class="row"><span>${t("sizingInvestment")}</span><b>${numOf(scenario.scenario_investment_eur)} €</b></div>
            <div class="row"><span>${t("sizingPayback")}</span><b>${numOf(scenario.scenario_payback_years)} a</b></div>
            <div class="row"><span>${t("sizingInverter")}</span><b>${shown(c.hass.states[E.sizingInverter])}</b></div>
          </div>`
        : nothing}
    </section>
    <section class="settings-section">
      <h3>${t("sizingRecs")}</h3>
      <p class="sub">${t("sizingRecsHint")}</p>
      <div class="grid">${recCard(c, "recommended_economic", "recEconomic")}${recCard(c, "recommended_technical", "recTechnical")}${recCard(c, "recommended_balanced", "recBalanced")}</div>
      <div class="rows">
        <div class="row"><span>${t("matrixDays")}</span><b>${numOf(matrix.analysis_days)}</b></div>
        <div class="row"><span>${t("matrixRecords")}</span><b>${numOf(matrix.records_count)}</b></div>
        <div class="row"><span>${t("matrixAnomaly")}</span><b>${numOf(matrix.anomaly_rate_pct)} %</b></div>
        <div class="row"><span>${t("sizingBaseline")}</span><b>${numOf(matrix.baseline_grid_import_kwh)} kWh</b></div>
      </div>
      ${top.length
        ? html`<div class="opt-top">
            ${top.map((item) => html`<div class="row"><span>${numOf(item.b)} kWh · ${numOf(item.p)} kWp</span><b>${numOf(item.savings)} €</b></div>`)}
          </div>`
        : nothing}
    </section>
    <section class="settings-section">
      <h3>${t("sizingBasis")}</h3>
      <p class="sub">${t("sizingBasisHint")}</p>
      ${prices}
    </section>
    ${optionSections(c, "sizing")}
  </div>`;
}

export function optionSections(c: OptionCtx, area: string): TemplateResult {
  const blocks = blocksFor(area as OptionArea);
  if (!blocks.length && area !== "tariff") return html``;
  const { t } = c.i18n;
  return html`${c.notice ? html`<p class="hint">${c.notice === "reload" ? t("optReload") : t("optSaved")}</p>` : nothing}
    ${c.error ? html`<p class="err">${c.error}</p>` : nothing}
    ${!c.isAdmin ? html`<p class="hint">${t("optAdmin")}</p>` : nothing}
    ${blocks.map(
      (block) => html`<section class="settings-section">
        <h3>${t(block.title)}</h3>
        <p class="sub">${t(block.hint)}</p>
        ${block.fields.map((field) => fieldRow(c, field))}
      </section>`,
    )}
    ${area === "tariff" ? slotsEditor(c) : nothing}`;
}
