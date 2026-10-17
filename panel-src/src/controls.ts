import { html, nothing, type TemplateResult } from "lit";
import { ref } from "lit/directives/ref.js";
import { CONSUMER_ICON_PATH, CONSUMER_ICONS, MAX_CONSUMERS, consumerUnavailable, type Consumer, type ConsumerIcon, type ConsumerMode } from "./consumers";
import { CONTROL_SWITCHES, E, isOn, num, type Hass } from "./entities";
import type { Fmt } from "./format";
import type { I18n } from "./i18n";

export interface ControlsInput {
  hass: Hass;
  i18n: I18n;
  fmt: Fmt;
  open: boolean;
  pending: ReadonlySet<string>;
  error?: string;
  forcePowerDraft?: number;
  onClose: () => void;
  onToggle: (entityId: string) => void;
  onPowerDraft: (watts: number) => void;
  onPowerCommit: (watts: number) => void;
  onAllSettings: () => void;
  consumers: Consumer[];
  picking: boolean;
  pickQuery: string;
  choices: { id: string; name: string }[];
  wallbox: { id: string; name: string } | undefined;
  onPick: (open: boolean) => void;
  onPickQuery: (query: string) => void;
  onAddConsumer: (entityId: string, name: string) => void;
  onUseWallbox: () => void;
  onRenameConsumer: (id: string, name: string) => void;
  onConsumerMode: (id: string, mode: ConsumerMode) => void;
  onConsumerIcon: (id: string, icon: ConsumerIcon) => void;
  onRemoveConsumer: (id: string) => void;
}

const ICON_LABEL = {
  wallbox: "iconWallbox",
  heater: "iconHeater",
  climate: "iconClimate",
  heatpump: "iconHeatpump",
  meter: "iconMeter",
} as const;

const focused = (el: HTMLInputElement): boolean => {
  const root = el.getRootNode();
  const active = root instanceof ShadowRoot ? root.activeElement : document.activeElement;
  return active === el;
};

const SUBS = {
  ctrlActive: "ctrlActiveSub",
  ctrlPredictive: "ctrlPredictiveSub",
  ctrlPvDelay: "ctrlPvDelaySub",
  ctrlPlanControls: "ctrlPlanControlsSub",
  ctrlPlanShadow: "ctrlPlanShadowSub",
} as const;

export function controlsSheet(c: ControlsInput): TemplateResult {
  const { t } = c.i18n;
  const power = c.hass.states[E.forceDischargePower];
  const powerAttrs = power?.attributes ?? {};
  const min = typeof powerAttrs.min === "number" ? powerAttrs.min : 100;
  const max = typeof powerAttrs.max === "number" ? powerAttrs.max : 10000;
  const step = typeof powerAttrs.step === "number" ? powerAttrs.step : 100;
  const powerValue = c.forcePowerDraft ?? num(power) ?? min;

  const toggle = (id: string, label: string) => {
    const entity = c.hass.states[id];
    const on = isOn(entity);
    const gone = !entity || entity.state === "unavailable";
    return html`<button
      class="switch ${on ? "on" : ""}"
      role="switch"
      aria-checked=${on}
      aria-label=${label}
      ?disabled=${gone || c.pending.has(id)}
      @click=${() => c.onToggle(id)}
    ></button>`;
  };

  return html`
    <div class="scrim ${c.open ? "open" : ""}" @click=${c.onClose}></div>
    <aside class="sheet ${c.open ? "open" : ""}" role="dialog" aria-modal="true" aria-label=${t("controlsTitle")} ?inert=${!c.open}>
      <div class="sheet-head">
        <div class="grow"><h2>${t("controlsTitle")}</h2><div class="sub">${t("controlsSub")}</div></div>
        <button class="btn" @click=${c.onClose}>${t("close")}</button>
      </div>
      ${c.error ? html`<p class="err">${c.error}</p>` : nothing}
      ${CONTROL_SWITCHES.map(
        (key) => html`<div class="ctrl">
          <div class="txt"><b>${t(key)}</b><span>${t(SUBS[key])}</span></div>
          ${toggle(E[key], t(key))}
        </div>`,
      )}
      <div class="ctrl wrap">
        <div class="txt"><b>${t("ctrlForce")}</b><span>${t("ctrlForcePower", { v: c.fmt.w(powerValue) })}</span></div>
        ${toggle(E.forceDischarge, t("ctrlForce"))}
        <input
          type="range"
          min=${min}
          max=${max}
          step=${step}
          .value=${String(powerValue)}
          aria-label=${t("ctrlForcePower", { v: "" })}
          ?disabled=${!power || power.state === "unavailable"}
          @input=${(e: Event) => c.onPowerDraft(Number((e.target as HTMLInputElement).value))}
          @change=${(e: Event) => c.onPowerCommit(Number((e.target as HTMLInputElement).value))}
        />
      </div>
      <div class="sheet-section" id="display-consumers">
        <h3>${t("displayTitle")}</h3>
        <div class="sub">${t("consumersSub")}</div>
        ${c.consumers.length
          ? c.consumers.map((row) => {
              const entity = c.hass.states[row.entityId];
              const missing = consumerUnavailable(entity);
              return html`<div class="consumer">
                <label class="txt">
                  <span class="lbl">${t("consumerName")}</span>
                  <input
                    ${ref((el) => {
                      if (el instanceof HTMLInputElement && !focused(el) && el.value !== row.name) el.value = row.name;
                    })}
                    maxlength="40"
                    aria-label=${t("consumerName")}
                    @input=${(e: Event) => c.onRenameConsumer(row.id, (e.target as HTMLInputElement).value)}
                  />
                  <span>${missing ? t("consumerMissing") : row.entityId}</span>
                </label>
                <div class="icon-pick" role="group" aria-label=${t("consumerIcon")}>
                  ${CONSUMER_ICONS.map(
                    (icon) => html`<button
                      type="button"
                      class=${row.icon === icon ? "on" : ""}
                      aria-pressed=${row.icon === icon}
                      aria-label=${t(ICON_LABEL[icon])}
                      @click=${() => c.onConsumerIcon(row.id, icon)}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d=${CONSUMER_ICON_PATH[icon]} /></svg>
                    </button>`,
                  )}
                </div>
                <div class="seg" role="group" aria-label=${row.name}>
                  <button type="button" class=${row.mode === "included" ? "on" : ""} aria-pressed=${row.mode === "included"} @click=${() => c.onConsumerMode(row.id, "included")}>${t("modeIncluded")}</button>
                  <button type="button" class=${row.mode === "separate" ? "on" : ""} aria-pressed=${row.mode === "separate"} @click=${() => c.onConsumerMode(row.id, "separate")}>${t("modeSeparate")}</button>
                </div>
                <button type="button" class="btn ghost" @click=${() => c.onRemoveConsumer(row.id)}>${t("removeConsumer")}</button>
              </div>`;
            })
          : html`<p class="hint">${t("consumersEmpty")}</p>`}
        ${c.wallbox ? html`<button type="button" class="btn add" @click=${c.onUseWallbox}>${t("useWallbox")}</button>` : nothing}
        ${c.consumers.length < MAX_CONSUMERS
          ? html`<button type="button" class="btn add" @click=${() => c.onPick(!c.picking)}>${t("addConsumer")}</button>`
          : nothing}
        ${c.picking
          ? html`<div class="picker">
              <input
                type="search"
                placeholder=${t("consumerSearch")}
                aria-label=${t("consumerSearch")}
                .value=${c.pickQuery}
                @input=${(e: Event) => c.onPickQuery((e.target as HTMLInputElement).value)}
              />
              ${c.choices.length
                ? c.choices.map(
                    (choice) => html`<button type="button" class="pick" @click=${() => c.onAddConsumer(choice.id, choice.name)}>
                      <b>${choice.name}</b><span>${choice.id}</span>
                    </button>`,
                  )
                : html`<p class="hint">${t("noPowerSensors")}</p>`}
            </div>`
          : nothing}
      </div>
      <a class="link" href="/e3dc-maestro" @click=${(e: Event) => { e.preventDefault(); c.onAllSettings(); }}>${t("allSettings")}</a>
    </aside>`;
}
