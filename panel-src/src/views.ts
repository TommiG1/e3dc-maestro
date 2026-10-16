import { html, nothing, type TemplateResult } from "lit";
import "./maestro-chart";
import { E, isOn, num, PLAN_SHADOW_SWITCH, PREDICTIVE_SWITCH, type Hass, type HassEntity } from "./entities";
import {
  brushOptions,
  COLORS,
  forecastOptions,
  planOptions,
  ringOptions,
  sparkOptions,
} from "./charts";
import { energyFlow } from "./flow";
import { memo } from "./memo";
import type { Fmt } from "./format";
import type { I18n } from "./i18n";
import type { IstSeries, SparkKey } from "./history";
import {
  parseSlots,
  parseTrajectory,
  priceExtremes,
  slotAction,
  type Point,
  type TimelineItem,
} from "./transform";

export interface Ctx {
  hass: Hass;
  i18n: I18n;
  fmt: Fmt;
  mobile: boolean;
  sparks?: Record<SparkKey, Point[]>;
  ist?: IstSeries;
  timeline?: TimelineItem[];
  range: number;
  showIst: boolean;
  onRange: (hours: number) => void;
  onToggleIst: () => void;
}

const st = (c: Ctx, id: string): HassEntity | undefined => c.hass.states[id];
const attrs = (c: Ctx, id: string): Record<string, unknown> => st(c, id)?.attributes ?? {};
const n = (v: unknown): number | undefined => (typeof v === "number" && Number.isFinite(v) ? v : undefined);

const unit = (v: string, u: string) => html`${v}<small>${u}</small>`;

// ---------------------------------------------------------------- Live

export function liveView(c: Ctx): TemplateResult {
  const { t } = c.i18n;
  const soc = num(st(c, E.soc));
  const target = num(st(c, E.targetSoc));
  const bat = num(st(c, E.battery));
  const on = (id: string) => isOn(st(c, id));
  const chips: [string, boolean, "on" | "warn"][] = [
    [t("chipReachable"), on(E.reachable), "on"],
    [t("chipChargeLock"), on(E.chargeLock), "warn"],
    [t("chipDischargeLock"), on(E.dischargeLock), "warn"],
    [t("chipHt"), on(E.htProtect), "warn"],
    [t("chipCurtail"), on(E.curtail), "warn"],
    [t("chipEmergency"), on(E.emergency), "warn"],
    [t("chipPredictive"), on(PREDICTIVE_SWITCH), "on"],
    [t("chipShadow"), on(PLAN_SHADOW_SWITCH), "on"],
  ];
  const sp = (key: SparkKey, color: string) =>
    c.sparks?.[key]?.length ? html`<maestro-chart class="spark" .options=${memo(`spark-${key}`, [c.sparks[key]], () => sparkOptions(c.sparks![key], color))}></maestro-chart>` : nothing;

  return html`
    <div class="grid live-top">
      <div class="card">
        <h3>${t("flowTitle")}</h3>
        <div class="sub">${t("flowSub")}</div>
        <div class="flow-wrap">
          ${energyFlow({
            pv: num(st(c, E.pv)),
            house: num(st(c, E.house)),
            grid: num(st(c, E.grid)),
            battery: bat,
            compact: c.mobile,
            fmt: c.fmt,
            i18n: c.i18n,
          })}
        </div>
      </div>
      <div class="card soc-card">
        <h3 class="self-start">${t("battery")}</h3>
        ${soc !== undefined
          ? html`<maestro-chart class="ring" .options=${memo("ring", [soc, c.fmt.loc], () => ringOptions(soc, t("stateOfCharge")))}></maestro-chart>`
          : html`<p class="empty">${t("unavailable")}</p>`}
        <div class="soc-meta">
          <div class="meta"><b>${target !== undefined ? `${Math.round(target)}%` : "–"}</b><span>${t("targetSoc")}</span></div>
          <div class="meta"><b>${st(c, E.autonomy)?.state ?? "–"}</b><span>${t("autonomy")}</span></div>
          <div class="meta"><b>${c.fmt.w(bat)}</b><span>${bat !== undefined && bat < 0 ? t("discharging") : t("charging")}</span></div>
        </div>
      </div>
    </div>
    <div class="chips">
      ${chips.map(([label, active, cls]) => html`<span class="chip ${active ? cls : ""}"><i></i>${label}</span>`)}
    </div>
    <div class="grid kpis">
      <div class="card kpi">
        <h3>${t("kpiCost")}</h3>
        <div class="v">${unit(c.fmt.n(num(st(c, E.costNet)), 2), "€")}</div>
        <div class="delta">${t("kpiCostSub")}</div>
        ${sp("costNet", COLORS.gridIn)}
      </div>
      <div class="card kpi">
        <h3>${t("kpiSaving")}</h3>
        <div class="v">${unit(c.fmt.n(num(st(c, E.saving)), 2), "€")}</div>
        <div class="delta">${t("kpiSavingSub")}</div>
        ${sp("saving", COLORS.gridOut)}
      </div>
      <div class="card kpi">
        <h3>${t("kpiSelf")}</h3>
        <div class="v">${unit(c.fmt.n(num(st(c, E.selfUse))), "kWh")}</div>
        <div class="delta">${t("kpiSelfSub", { imp: c.fmt.n(num(st(c, E.importToday))), feed: c.fmt.n(num(st(c, E.feedToday))) })}</div>
        ${sp("selfUse", COLORS.pv)}
      </div>
      <div class="card kpi">
        <h3>${t("kpiBattery")}</h3>
        <div class="v">${unit(c.fmt.n(num(st(c, E.chargedToday))), "kWh")}</div>
        <div class="delta">${t("kpiBatterySub", { out: c.fmt.n(num(st(c, E.dischargedToday))) })}</div>
        ${sp("chargedToday", COLORS.bat)}
      </div>
    </div>`;
}

// ---------------------------------------------------------------- Forecast

export function forecastView(c: Ctx): TemplateResult {
  const { t } = c.i18n;
  const a = attrs(c, E.trajectory);
  const traj = parseTrajectory(a);
  if (!traj) return html`<div class="card"><p class="empty">${t("noForecast")}</p></div>`;
  const legend: [string, string][] = [
    [COLORS.bat, t("legendSoc")],
    [COLORS.pv, t("legendPv")],
    [COLORS.house, t("legendHouse")],
    [COLORS.gridIn, t("legendImport")],
    [COLORS.gridOut, t("legendFeed")],
  ];
  const stat = (label: string, value: TemplateResult | string) =>
    html`<div class="card stat"><h3>${label}</h3><div class="v">${value}</div></div>`;

  return html`
    <div class="card">
      <div class="chart-head">
        <div class="grow">
          <h3>${t("chartTitle")}</h3>
          <div class="legend">${legend.map(([color, label]) => html`<span><i style="background:${color}"></i>${label}</span>`)}</div>
        </div>
        <button class="toggle ${c.showIst ? "active" : ""}" aria-pressed=${c.showIst} @click=${c.onToggleIst}>${t("actualOverlay")}</button>
        <div class="seg" role="group">
          ${[6, 12, 24].map(
            (h) => html`<button class=${c.range === h ? "active" : ""} aria-pressed=${c.range === h} @click=${() => c.onRange(h)}>${t("hoursShort", { h })}</button>`,
          )}
        </div>
      </div>
      <maestro-chart
        id="fc-main"
        .options=${memo("forecast", [st(c, E.trajectory), st(c, E.targetSoc)?.state, c.ist, c.showIst, c.fmt.loc], () =>
          forecastOptions({
            traj,
            targetSoc: num(st(c, E.targetSoc)),
            ist: c.ist,
            showIst: c.showIst,
            fmt: c.fmt,
            i18n: c.i18n,
          }),
        )}
      ></maestro-chart>
      <maestro-chart id="fc-brush" .options=${memo("brush", [st(c, E.trajectory)], () => brushOptions(traj))}></maestro-chart>
    </div>
    <div class="grid stat-row">
      ${stat(t("statMinMax"), html`${Math.round(n(a.min_soc) ?? 0)}<small>%</small> / ${Math.round(n(a.max_soc) ?? 0)}<small>%</small>`)}
      ${stat(t("statImport"), unit(c.fmt.n(n(a.grid_draw_kwh)), "kWh"))}
      ${stat(t("statFeed"), unit(c.fmt.n(n(a.grid_feed_in_kwh)), "kWh"))}
      ${stat(t("statAutarky"), unit(c.fmt.n(n(a.self_sufficiency_pct)), "%"))}
      ${stat(t("statPvTomorrow"), unit(c.fmt.n(num(st(c, E.pvTomorrow))), "kWh"))}
    </div>`;
}

// ---------------------------------------------------------------- Price plan

export function planView(c: Ctx): TemplateResult {
  const { t } = c.i18n;
  const a = attrs(c, E.plan);
  const slots = parseSlots(a.plan_slots);
  if (!slots.length) return html`<div class="card"><p class="empty">${t("noPlan")}</p></div>`;
  const ext = priceExtremes(slots);
  const legend: [string, string][] = [
    [COLORS.gridOut, t("legendCharge")],
    [COLORS.pv, t("legendHold")],
    [COLORS.bat, t("legendRelease")],
  ];
  const known = typeof a.known_until === "string" ? c.fmt.dayTime(a.known_until) : "–";
  const row = (label: string, value: string, color?: string) =>
    html`<div class="row"><span>${label}</span><b style=${color ? `color:${color}` : ""}>${value}</b></div>`;
  const slotText = (s: { price: number; start_local: string }) => `${c.fmt.n(s.price * 100)} ct · ${s.start_local}`;

  return html`
    <div class="grid plan-top">
      <div class="card">
        <div class="chart-head">
          <div class="grow">
            <h3>${t("priceTitle")}</h3>
            <div class="legend">
              ${legend.map(([color, label]) => html`<span><i style="background:${color}"></i>${label}</span>`)}
              <span><i style="background:#fff;height:2px;border-radius:0"></i>${t("legendPlanSoc")}</span>
            </div>
          </div>
          <span class="badge">${a.shadow_mode ? t("planShadow") : t("planActive")}</span>
        </div>
        <maestro-chart .options=${memo("plan", [st(c, E.plan), c.fmt.loc], () => planOptions({ slots, fmt: c.fmt, i18n: c.i18n }))}></maestro-chart>
        <div class="strip">
          ${slots.map(
            (s) => html`<div class="slot ${slotAction(s)}" title="${s.start_local} · ${c.fmt.n(s.price * 100)} ct"></div>`,
          )}
        </div>
        <div class="strip-axis">${slots.filter((_, i) => i % 4 === 0).map((s) => html`<span>${s.start_local}</span>`)}</div>
      </div>
      <div class="card plan-kpi">
        <div>
          <h3>${t("planTitle")}</h3>
          <div class="plan-state">${st(c, E.plan)?.state ?? "–"}</div>
          <div class="sub msg">${typeof a.message === "string" ? a.message : ""}</div>
        </div>
        <div>
          ${row(t("planGridCharge"), `${c.fmt.n(n(a.total_grid_charge_kwh), 2)} kWh`)}
          ${row(t("planSaving"), `${c.fmt.n(n(a.expected_saving_eur), 2)} €`, "var(--ok)")}
          ${ext ? row(t("planCheapest"), slotText(ext.min)) : nothing}
          ${ext ? row(t("planMostExpensive"), slotText(ext.max)) : nothing}
          ${row(t("planKnownUntil"), known)}
        </div>
      </div>
    </div>`;
}

// ---------------------------------------------------------------- Decision

export function decisionView(c: Ctx): TemplateResult {
  const { t, phase } = c.i18n;
  const d = attrs(c, E.explanation);
  if (typeof d.phase !== "string") return html`<div class="card"><p class="empty">${t("noDecision")}</p></div>`;
  const soc = num(st(c, E.soc));
  const targetSoc = n(d.target_soc);
  const stamp = typeof d.timestamp === "string" ? c.fmt.time(d.timestamp) : undefined;
  const tags = [
    targetSoc !== undefined ? t("tagTargetSoc", { v: Math.round(targetSoc) }) : null,
    (n(d.target_charge_power) ?? 0) > 0 ? t("tagTargetPower", { v: c.fmt.w(n(d.target_charge_power)) }) : null,
    d.battery_priority === true ? t("tagBatteryPriority") : null,
    stamp ? t("tagSince", { t: stamp }) : null,
  ].filter((x): x is string => !!x);

  // Older versions do not put the limits into the explanation attributes: fall back to the limit sensors.
  const lim = (attr: unknown, id: string) => n(attr) ?? num(st(c, id));
  const chargeSoll = lim(d.charge_power_limit, E.chargeLimit);
  const chargeSent = lim(d.sent_charge_power_limit, E.sentChargeLimit);
  const dischargeSoll = lim(d.discharge_power_limit, E.dischargeLimit);
  const dischargeSent = lim(d.sent_discharge_power_limit, E.sentDischargeLimit);
  const maxW = Math.max(9000, chargeSoll ?? 0, chargeSent ?? 0, dischargeSoll ?? 0, dischargeSent ?? 0);
  const limit = (label: string, soll: number | undefined, sent: number | undefined) => html`
    <div class="limit-row">
      <div class="lbl"><span>${label}</span><span>${t("limitTarget", { a: soll === undefined ? t("limitNone") : c.fmt.w(soll), b: sent === undefined ? t("limitNone") : c.fmt.w(sent) })}</span></div>
      <div class="bar"><div class="soll" style="width:${((soll ?? 0) / maxW) * 100}%"></div><div class="sent" style="width:${((sent ?? 0) / maxW) * 100}%"></div></div>
    </div>`;

  return html`
    <div class="grid dec-top">
      <div class="card phase-hero">
        <h3>${t("decisionPhase")}</h3>
        <div class="phase-name">${phase(d.phase)}</div>
        <div class="phase-reason">${typeof d.reason === "string" ? d.reason : ""}</div>
        <div class="chips">${tags.map((tag) => html`<span class="chip on"><i></i>${tag}</span>`)}</div>
      </div>
      <div class="card">
        <h3>${t("limitsTitle")}</h3>
        <div class="sub lim-sub">${t("limitsSub")}</div>
        <div class="limits">
          ${limit(t("limitCharge"), chargeSoll, chargeSent)}
          ${limit(t("limitDischarge"), dischargeSoll, dischargeSent)}
          ${targetSoc !== undefined
            ? html`<div class="limit-row">
                <div class="lbl"><span>${t("targetSoc")}</span><span>${t("limitSoc", { a: Math.round(soc ?? 0), b: Math.round(targetSoc) })}</span></div>
                <div class="bar"><div class="soll" style="width:${targetSoc}%"></div><div class="sent" style="width:${soc ?? 0}%"></div></div>
              </div>`
            : nothing}
        </div>
      </div>
    </div>
    <div class="card tl-card">
      <h3>${t("timelineTitle")}</h3>
      ${c.timeline?.length
        ? html`<div class="timeline">
            ${c.timeline.map(
              (h) => html`<div class="tl-item">
                <div class="tl-time">${c.fmt.dayTime(h.ts)}</div>
                <div class="tl-phase">${phase(h.phase)}</div>
                <div class="tl-reason">${h.reason}</div>
              </div>`,
            )}
          </div>`
        : html`<p class="empty">${c.timeline ? t("timelineEmpty") : t("loading")}</p>`}
    </div>`;
}
