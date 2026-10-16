import { html, nothing, type TemplateResult } from "lit";
import { CONTROL_SWITCHES, E, FORCE_DISCHARGE_SWITCH, isOn, num, type Hass } from "./entities";
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
}

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
        (s) => html`<div class="ctrl">
          <div class="txt"><b>${t(s.key)}</b><span>${t(SUBS[s.key])}</span></div>
          ${toggle(s.id, t(s.key))}
        </div>`,
      )}
      <div class="ctrl wrap">
        <div class="txt"><b>${t("ctrlForce")}</b><span>${t("ctrlForcePower", { v: c.fmt.w(powerValue) })}</span></div>
        ${toggle(FORCE_DISCHARGE_SWITCH, t("ctrlForce"))}
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
      <a class="link" href="/e3dc-maestro" @click=${(e: Event) => { e.preventDefault(); c.onAllSettings(); }}>${t("allSettings")}</a>
    </aside>`;
}
