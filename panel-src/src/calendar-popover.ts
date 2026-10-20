import { html, nothing, type TemplateResult } from "lit";
import {
  calendarDay,
  clampAnchor,
  parseCalendarDay,
  type BalanceGrain,
  type BalanceRange,
} from "./history";
import type { I18n } from "./i18n";

export interface CalendarPopoverProps {
  open: boolean;
  grain: BalanceGrain;
  /** Currently selected range (for highlighting). */
  selected: BalanceRange;
  /** Cursor for the visible grid: any day in the shown month/year. */
  viewAnchor: string;
  i18n: I18n;
  loc: string;
  onClose: () => void;
  onGrain: (grain: BalanceGrain) => void;
  onViewAnchor: (day: string) => void;
  onPick: (grain: BalanceGrain, anchor: string) => void;
}

const GRAINS: BalanceGrain[] = ["day", "week", "month", "year"];

const grainLabel = (t: I18n["t"], g: BalanceGrain): string =>
  t(g === "day" ? "calGrainDay" : g === "week" ? "calGrainWeek" : g === "month" ? "calGrainMonth" : "calGrainYear");

const weekdayLabels = (loc: string): string[] => {
  // Monday-first short names via a fixed week in 2024.
  return Array.from({ length: 7 }, (_, i) =>
    new Date(2024, 0, 1 + i).toLocaleDateString(loc, { weekday: "narrow" }),
  );
};

function monthCells(viewMonth: Date): { day: string; inMonth: boolean }[] {
  const first = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
  const startOffset = (first.getDay() + 6) % 7;
  const gridStart = new Date(first);
  gridStart.setDate(1 - startOffset);
  const cells: { day: string; inMonth: boolean }[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    cells.push({ day: calendarDay(d), inMonth: d.getMonth() === viewMonth.getMonth() });
  }
  return cells;
}

function shiftView(viewAnchor: string, grain: BalanceGrain, delta: number): string {
  const d = parseCalendarDay(viewAnchor);
  if (grain === "year") d.setFullYear(d.getFullYear() + delta * 12);
  else if (grain === "month") d.setFullYear(d.getFullYear() + delta);
  else d.setMonth(d.getMonth() + delta);
  return calendarDay(d);
}

function viewTitle(viewAnchor: string, grain: BalanceGrain, loc: string): string {
  const d = parseCalendarDay(viewAnchor);
  if (grain === "year") {
    const y = d.getFullYear();
    return `${y - 5} – ${y + 1}`;
  }
  if (grain === "month") return String(d.getFullYear());
  return d.toLocaleDateString(loc, { month: "long", year: "numeric" });
}

export function calendarPopover(p: CalendarPopoverProps): TemplateResult | typeof nothing {
  if (!p.open) return nothing;
  const { t } = p.i18n;
  const today = calendarDay();
  const view = parseCalendarDay(p.viewAnchor);
  const selected = p.selected;
  const wd = weekdayLabels(p.loc);

  const pick = (grain: BalanceGrain, anchor: string) => {
    const day = clampAnchor(anchor);
    p.onPick(grain, day);
  };

  const dayGrid = () => {
    const cells = monthCells(view);
    return html`<div class="cal-weekdays">${wd.map((l) => html`<span>${l}</span>`)}</div>
      <div class="cal-grid days" role="grid">
        ${cells.map(({ day, inMonth }) => {
          const disabled = day > today;
          const isSel = selected.grain === "day" && selected.start === day;
          const isToday = day === today;
          const inWeek =
            selected.grain === "week" && day >= selected.start && day < selected.end;
          return html`<button
            type="button"
            class="cal-cell ${inMonth ? "" : "muted"} ${isSel ? "sel" : ""} ${inWeek ? "in-week" : ""} ${isToday ? "today" : ""}"
            ?disabled=${disabled}
            @click=${() => pick(p.grain === "week" ? "week" : "day", day)}
          >${parseCalendarDay(day).getDate()}</button>`;
        })}
      </div>`;
  };

  const monthGrid = () => {
    const y = view.getFullYear();
    const todayDate = parseCalendarDay(today);
    return html`<div class="cal-grid months">
      ${Array.from({ length: 12 }, (_, m) => {
        const first = new Date(y, m, 1);
        const anchor = calendarDay(first);
        const future = first > todayDate;
        const isSel = selected.grain === "month" && selected.start === `${y}-${String(m + 1).padStart(2, "0")}-01`;
        return html`<button
          type="button"
          class="cal-cell ${isSel ? "sel" : ""}"
          ?disabled=${future}
          @click=${() => pick("month", clampAnchor(anchor))}
        >${first.toLocaleDateString(p.loc, { month: "short" })}</button>`;
      })}
    </div>`;
  };

  const yearGrid = () => {
    const center = view.getFullYear();
    const years = Array.from({ length: 12 }, (_, i) => center - 5 + i);
    const curY = parseCalendarDay(today).getFullYear();
    return html`<div class="cal-grid years">
      ${years.map((y) => {
        const anchor = `${y}-01-01`;
        const isSel = selected.grain === "year" && parseCalendarDay(selected.start).getFullYear() === y;
        return html`<button
          type="button"
          class="cal-cell ${isSel ? "sel" : ""}"
          ?disabled=${y > curY}
          @click=${() => pick("year", clampAnchor(anchor))}
        >${y}</button>`;
      })}
    </div>`;
  };

  // Week mode reuses the day grid; clicking a day selects its week.
  const body =
    p.grain === "month" ? monthGrid() : p.grain === "year" ? yearGrid() : dayGrid();

  return html`<div class="cal-backdrop" @click=${p.onClose}></div>
    <div class="cal-pop" role="dialog" aria-label=${t("dayPick")} @click=${(e: Event) => e.stopPropagation()}>
      <div class="seg cal-grains" role="group">
        ${GRAINS.map(
          (g) =>
            html`<button
              type="button"
              class=${p.grain === g ? "active" : ""}
              aria-pressed=${p.grain === g}
              @click=${() => p.onGrain(g)}
            >${grainLabel(t, g)}</button>`,
        )}
      </div>
      <div class="cal-head">
        <button type="button" class="day-nav-btn" aria-label=${t("dayPrev")} @click=${() => p.onViewAnchor(shiftView(p.viewAnchor, p.grain, -1))}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>
        </button>
        <span class="cal-title">${viewTitle(p.viewAnchor, p.grain, p.loc)}</span>
        <button type="button" class="day-nav-btn" aria-label=${t("dayNext")} @click=${() => p.onViewAnchor(shiftView(p.viewAnchor, p.grain, 1))}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
        </button>
      </div>
      ${body}
      <button type="button" class="cal-today" @click=${() => pick(p.grain, today)}>${t("periodToday")}</button>
    </div>`;
}
