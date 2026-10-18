import { html, nothing, type TemplateResult } from "lit";
import { E, S, isOn, num, type Hass } from "./entities";
import type { I18n, Key } from "./i18n";
import { fieldLabel } from "./options";
import type { OptionCtx } from "./options-view";
import { setupComplete, setupSteps, type SetupFacts, type SetupId, type SetupStatus, type SetupStep } from "./onboarding";

export interface SetupView {
  hass: Hass;
  i18n: I18n;
  options: OptionCtx;
  pending: ReadonlySet<string>;
  onOpenGroup: (id: string) => void;
  onToggle: (id: string) => void;
  /** Live banner only. Set once the user has confirmed a complete setup. */
  setupAck?: boolean;
  onAckSetup?: () => void;
}

const gone = (state: string | undefined): boolean =>
  !state || state === "unknown" || state === "unavailable" || state === "none";

const factsOf = (c: SetupView): SetupFacts => {
  const entity = (key: string) => {
    const id = S[key];
    return id ? c.hass.states[id] : undefined;
  };
  const reg = c.hass.states[E.ctrlActive];
  const phase = c.hass.states[E.phase]?.state;
  const explanation = c.hass.states[E.explanation]?.state;
  return {
    ready: c.options.ready,
    options: c.options.options,
    slots: c.options.slots.length,
    state: (id) => c.hass.states[id]?.state,
    on: (key) => {
      const row = entity(key);
      if (!row || row.state === "unavailable" || row.state === "unknown") return undefined;
      return isOn(row);
    },
    number: (key) => num(entity(key)),
    select: (key) => {
      const state = entity(key)?.state;
      return gone(state) ? undefined : state;
    },
    phase: gone(phase) ? undefined : phase,
    explanation: gone(explanation) ? undefined : explanation,
    regulation: !reg || gone(reg.state) ? undefined : reg.state === "on",
  };
};

const COPY: Record<SetupId, { title: Key; hint: Key; done: Key; open: Key }> = {
  plant: { title: "setupPlant", hint: "setupPlantHint", done: "setupPlantOk", open: "setupPlantMissing" },
  tariff: { title: "setupTariff", hint: "setupTariffHint", done: "setupTariffOk", open: "setupTariffMissing" },
  forecast: { title: "setupForecast", hint: "setupForecastHint", done: "setupForecastOk", open: "setupForecastOpen" },
  safety: { title: "setupSafety", hint: "setupSafetyHint", done: "setupSafetyOk", open: "setupSafetyOpen" },
  loads: { title: "setupLoads", hint: "setupLoadsHint", done: "setupLoadsOk", open: "setupLoadsOpen" },
  regulation: { title: "setupRegulation", hint: "setupRegulationHint", done: "setupRegulationOk", open: "setupRegulationOff" },
  run: { title: "setupRun", hint: "setupRunHint", done: "setupRunOk", open: "setupRunOff" },
};

const MARK: Record<SetupStatus, string> = { done: "✓", todo: "!", optional: "·", wait: "…" };

const detail = (c: SetupView, step: SetupStep): string => {
  const { t } = c.i18n;
  if (step.status === "wait") return step.id === "run" ? t("setupRunWait") : t("setupStatusWait");
  if (step.status === "done") return step.note ?? t(COPY[step.id].done);
  if (step.id === "plant" && step.missing.length) {
    const names = step.missing.map((key) => fieldLabel(c.hass.language, key)).join(", ");
    return t("setupPlantMissing", { names });
  }
  return t(COPY[step.id].open);
};

const stepRow = (c: SetupView, step: SetupStep): TemplateResult => {
  const { t } = c.i18n;
  const copy = COPY[step.id];
  const id = E.ctrlActive;
  const on = c.hass.states[id]?.state === "on";
  const action =
    step.id === "regulation"
      ? html`<button
          class="switch ${on ? "on" : ""}"
          role="switch"
          aria-checked=${on}
          aria-label=${t(copy.title)}
          ?disabled=${c.pending.has(id) || !c.hass.states[id]}
          @click=${() => c.onToggle(id)}
        ></button>`
      : step.area
        ? html`<button type="button" class="btn" @click=${() => c.onOpenGroup(step.area!)}>${t("setupOpen")}</button>`
        : nothing;
  return html`<li class="setup-step ${step.status}">
    <span class="setup-mark ${step.status}" aria-hidden="true">${MARK[step.status]}</span>
    <div>
      <b>${t(copy.title)}</b>
      <span class="tag">${t(step.status === "done" ? "setupStatusDone" : step.status === "todo" ? "setupStatusTodo" : step.status === "optional" ? "setupStatusOptional" : "setupStatusWait")}</span>
      <p>${t(copy.hint)}</p>
      <p class="sub">${detail(c, step)}</p>
    </div>
    ${action}
  </li>`;
};

const list = (c: SetupView, steps: SetupStep[]): TemplateResult => {
  const { t } = c.i18n;
  const required = steps.filter((step) => step.required);
  const done = required.filter((step) => step.status === "done").length;
  return html`<p class="setup-progress">${t("setupProgress", { done, total: required.length })}</p>
    ${c.options.error ? html`<p class="err">${t("setupOptionsError", { err: c.options.error })}</p>` : nothing}
    <ol class="setup-steps">
      ${steps.map((step) => stepRow(c, step))}
    </ol>`;
};

/** Full checklist, used from the settings area. */
export function setupPage(c: SetupView): TemplateResult {
  return html`<div class="settings-detail">${list(c, setupSteps(factsOf(c)))}</div>`;
}

/** Banner on the live screen. Collapses once every required step is done. */
export function setupBanner(c: SetupView): TemplateResult {
  const { t } = c.i18n;
  const steps = setupSteps(factsOf(c));
  if (setupComplete(steps)) {
    if (c.setupAck) return html``;
    return html`<div class="setup-done">
      <button type="button" class="setup-done-open" @click=${() => c.onOpenGroup("setup")}>
        <span class="setup-mark done" aria-hidden="true">✓</span>
        <span><b>${t("setupDone")}</b><span>${t("setupDoneHint")}</span></span>
      </button>
      <button type="button" class="btn" @click=${() => c.onAckSetup?.()}>${t("setupAck")}</button>
    </div>`;
  }
  return html`<section class="card setup-card" aria-label=${t("setupTitle")}>
    <h2>${t("setupTitle")}</h2>
    <p class="sub">${t("setupLead")}</p>
    ${list(c, steps)}
  </section>`;
}
