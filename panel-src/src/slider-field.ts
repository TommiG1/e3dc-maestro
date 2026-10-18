import { html, nothing, type TemplateResult } from "lit";
import { ref } from "lit/directives/ref.js";

export interface SliderField {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  unit?: string;
  disabled?: boolean;
  /** Live update while the slider moves or the box changes. */
  onPreview?: (value: number) => void;
  onCommit: (value: number) => void;
}

const focused = (el: HTMLInputElement): boolean => {
  const root = el.getRootNode();
  const active = root instanceof ShadowRoot ? root.activeElement : document.activeElement;
  return active === el;
};

const pair = (source: HTMLInputElement): void => {
  const root = source.closest(".slider-field");
  const kind = source.type === "range" ? "number" : "range";
  const other = root?.querySelector(`input[type="${kind}"]`);
  if (other instanceof HTMLInputElement) other.value = source.value;
};

/** One tenth of the span, unless the field step is already coarser. */
export function rasterStep(min: number, max: number, step: number): number {
  const span = max - min;
  if (!(span > 0)) return step > 0 ? step : 1;
  const tenth = span / 10;
  if (step > 0 && step >= tenth) return step;
  return tenth;
}

/** Slider plus a number box for the same value. The box is how a precise value is entered. */
export function sliderField(field: SliderField): TemplateResult {
  const text = String(field.value);
  const percent = field.unit === "%";
  const coarse = percent ? rasterStep(field.min, field.max, field.step) : field.step;
  const commit = (raw: string) => {
    const value = Number.parseFloat(raw);
    if (!Number.isFinite(value)) return;
    field.onCommit(Math.min(field.max, Math.max(field.min, value)));
  };
  const preview = (raw: string) => {
    const value = Number.parseFloat(raw);
    if (Number.isFinite(value)) field.onPreview?.(value);
  };
  return html`<div class="slider-field">
    <div class="slider-track">
    <input
      type="range"
      aria-label=${field.label}
      min=${field.min}
      max=${field.max}
      step=${coarse}
      ?disabled=${field.disabled}
      ${ref((el) => {
        if (el instanceof HTMLInputElement && !focused(el) && el.value !== text) el.value = text;
      })}
      @input=${(e: Event) => {
        const input = e.target as HTMLInputElement & { _commit?: number };
        pair(input);
        preview(input.value);
        window.clearTimeout(input._commit);
        input._commit = window.setTimeout(() => commit(input.value), 200);
      }}
      @change=${(e: Event) => {
        const input = e.target as HTMLInputElement & { _commit?: number };
        window.clearTimeout(input._commit);
        commit(input.value);
      }}
    />
    <div class="slider-ticks" aria-hidden="true">${percent ? Array.from({ length: 11 }, () => html`<i></i>`) : nothing}</div>
    </div>
    <input
      type="number"
      inputmode="decimal"
      aria-label=${field.label}
      min=${field.min}
      max=${field.max}
      step=${field.step}
      ?disabled=${field.disabled}
      ${ref((el) => {
        if (el instanceof HTMLInputElement && !focused(el) && el.value !== text) el.value = text;
      })}
      @input=${(e: Event) => {
        const input = e.target as HTMLInputElement;
        pair(input);
        preview(input.value);
      }}
      @change=${(e: Event) => commit((e.target as HTMLInputElement).value)}
    />
    ${field.unit ? html`<span>${field.unit}</span>` : nothing}
  </div>`;
}
