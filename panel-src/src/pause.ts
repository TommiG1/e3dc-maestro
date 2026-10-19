import { html, nothing, type TemplateResult } from "lit";
import type { Translate } from "./i18n";

export const PAUSE_HOURS = [1, 3, 6, 12, 24] as const;

export type PauseEntity = { attributes?: Record<string, unknown> } | undefined;

/** Unix seconds stored on the master switch while a temporary off period runs. */
export function pauseUntil(entity: PauseEntity): number | undefined {
  const raw = entity?.attributes?.pause_until;
  return typeof raw === "number" && Number.isFinite(raw) ? raw : undefined;
}

/** Whole hours and minutes still left. At least one minute until the end time. */
export function pauseLeft(untilSec: number, nowMs = Date.now()): { h: number; m: number } | undefined {
  const ms = untilSec * 1000 - nowMs;
  if (ms <= 0) return undefined;
  const total = Math.max(1, Math.ceil(ms / 60_000));
  return { h: Math.floor(total / 60), m: total % 60 };
}

export function pauseStatus(t: Translate, entity: PauseEntity, nowMs = Date.now()): string | undefined {
  const until = pauseUntil(entity);
  if (until === undefined) return undefined;
  const left = pauseLeft(until, nowMs);
  if (!left) return undefined;
  if (left.h > 0 && left.m > 0) return t("pauseLeftHours", { h: left.h, m: left.m });
  if (left.h > 0) return t("pauseLeftHour", { h: left.h });
  return t("pauseLeftMin", { m: left.m });
}

export function pauseMenu(
  t: Translate,
  active: boolean,
  onPick: (hours: number | null) => void,
  onResume: () => void,
  onClose: () => void,
): TemplateResult {
  const choice = (hours: number | null, label: string) => html`<button
    type="button"
    class="pause-choice"
    role="option"
    @click=${() => onPick(hours)}
  >${label}</button>`;
  return html`<div class="scrim open" @click=${onClose}></div>
    <div class="pause-menu" role="dialog" aria-modal="true" aria-label=${t(active ? "pauseTitle" : "pauseOffTitle")}>
      <h2>${t(active ? "pauseTitle" : "pauseOffTitle")}</h2>
      <p class="sub">${t(active ? "pauseHint" : "pauseOffHint")}</p>
      ${active
        ? nothing
        : html`<button type="button" class="pause-choice resume" @click=${onResume}>${t("pauseResume")}</button>`}
      <div class="pause-options" role="listbox" aria-label=${t("pauseTitle")}>
        ${PAUSE_HOURS.map((hours) => choice(hours, hours === 1 ? t("pauseOneHour") : t("pauseHours", { h: hours })))}
        ${choice(null, t("pausePermanent"))}
      </div>
      <button type="button" class="btn" @click=${onClose}>${t("close")}</button>
    </div>`;
}
