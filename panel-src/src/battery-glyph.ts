import { html, nothing, type TemplateResult } from "lit";

/** Charge / discharge / idle from plant current (A). Negative = discharge. */
export function batteryFlowFromAmps(amps: number | undefined): "charge" | "discharge" | "idle" {
  if (amps === undefined || Math.abs(amps) < 0.25) return "idle";
  return amps < 0 ? "discharge" : "charge";
}

/** Charge / discharge / idle from live battery power (W). Negative = discharge. */
export function batteryFlowFromWatts(watts: number | undefined, activeW = 30): "charge" | "discharge" | "idle" {
  if (watts === undefined || Math.abs(watts) < activeW) return "idle";
  return watts < 0 ? "discharge" : "charge";
}

const clampPct = (value: number): number => Math.max(0, Math.min(100, value));

/**
 * Vertical pack glyph shared by Anlage and the live battery tile.
 * `tone` is a CSS class suffix: charge / discharge / idle, or soh-good / soh-mid / soh-low.
 * With `reserve`, the bottom band mirrors the ring’s Notstrom-Sockel (warn fill + empty zone).
 */
export function batteryGlyph(
  label: string,
  level: number | undefined,
  tone: string,
  opts?: { mini?: boolean; live?: boolean; reserve?: number },
): TemplateResult {
  const size = opts?.mini ? "mini" : opts?.live ? "live" : "";
  const reservePct =
    opts?.reserve !== undefined && Number.isFinite(opts.reserve) ? clampPct(opts.reserve) : undefined;
  const levelPct = level === undefined ? undefined : clampPct(level);

  let fill: TemplateResult | typeof nothing = nothing;
  if (levelPct !== undefined) {
    if (reservePct !== undefined && reservePct > 0) {
      const warnH = Math.min(levelPct, reservePct);
      const batH = Math.max(0, levelPct - reservePct);
      fill = html`${batH > 0.05
          ? html`<div class="batt-fill" style="height:${batH}%; bottom:${warnH}%"></div>`
          : nothing}
        ${warnH > 0.05
          ? html`<div class="batt-fill batt-fill-reserve" style="height:${warnH}%"></div>`
          : nothing}`;
    } else {
      fill = html`<div class="batt-fill" style="height:${levelPct}%"></div>`;
    }
  }

  const reserveZone =
    reservePct !== undefined && reservePct > 0
      ? html`<div class="batt-reserve-zone" style="height:${reservePct}%" aria-hidden="true"></div>`
      : nothing;

  return html`<div class="batt ${tone} ${size}" role="img" aria-label=${label}>
    <div class="batt-nub"></div>
    <div class="batt-body">
      ${reserveZone}
      ${fill}
      <div class="batt-cells" aria-hidden="true"></div>
    </div>
  </div>`;
}
