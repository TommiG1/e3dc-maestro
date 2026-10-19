import { html, nothing, type TemplateResult } from "lit";
import "./maestro-chart";
import { E, isOn, num, type Hass, type HassEntity } from "./entities";

const shown = (e: HassEntity | undefined): string =>
  !e || e.state === "unknown" || e.state === "unavailable" ? "–" : e.state;
import {
  brushOptions,
  COLORS,
  forecastOptions,
  planOptions,
  socRingGradient,
  sparkOptions,
} from "./charts";
import type { ClassicStatus } from "./classic";
import type { FlowConsumer } from "./consumers";
import { energyFlow, flowBoxHeight } from "./flow";
import { sliderField } from "./slider-field";
import { memo } from "./memo";
import type { ThemeId } from "./theme";
import type { Fmt } from "./format";
import type { I18n } from "./i18n";
import type { IstSeries, Period, PeriodKey, SparkKey } from "./history";
import { downloadCsv } from "./csv";
import { setupBanner } from "./onboarding-view";
import type { OptionCtx } from "./options-view";
import { isPlanStrategy, planControls, strategyOf } from "./settings";
import {
  parseSlots,
  parseTrajectory,
  priceExtremes,
  slotAction,
  type Point,
  type TimelineItem,
  type Trajectory,
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
  consumers: FlowConsumer[];
  consumerOverflow: boolean;
  onEditConsumers: () => void;
  onFlowNode: (key: string) => void;
  motion: boolean;
  collapsed: ReadonlySet<string>;
  onToggleGroup: (id: string) => void;
  controlsOpen: boolean;
  onToggleControls: () => void;
  autoOpen: boolean;
  onToggleAuto: () => void;
  groupId?: string;
  onOpenGroup: (id: string) => void;
  setupAck: boolean;
  onAckSetup: () => void;
  onOpenRoom: (id: string) => void;
  onOpenClassic: () => void;
  classic?: ClassicStatus;
  isAdmin: boolean;
  onCreateClassic: () => void;
  onCheckClassic: () => void;
  period: Period;
  periodSums?: Partial<Record<PeriodKey, number>>;
  onPeriod: (period: Period) => void;
  pending: ReadonlySet<string>;
  onToggle: (id: string) => void;
  onPress: (id: string) => void;
  onSelect: (id: string, option: string) => void;
  onNumber: (id: string, value: number) => void;
  forcePowerDraft?: number;
  onPowerDraft: (watts: number) => void;
  onPowerCommit: (watts: number) => void;
  reserveDraft?: number;
  onReserveDraft: (percent: number) => void;
  onReserveCommit: (percent: number) => void;
  debugOpen: boolean;
  onToggleDebug: () => void;
  theme: ThemeId;
  onTheme: (theme: ThemeId) => void;
  phasePoints?: Readonly<Record<string, Point[]>>;
  phaseHistory?: "idle" | "loading" | "ready" | "error";
  options: OptionCtx;
  expert: boolean;
  onExpert: (on: boolean) => void;
  planTuneOpen: boolean;
  onTogglePlanTune: () => void;
}

const st = (c: Ctx, id: string): HassEntity | undefined => c.hass.states[id];
const attrs = (c: Ctx, id: string): Record<string, unknown> => st(c, id)?.attributes ?? {};
const n = (v: unknown): number | undefined => (typeof v === "number" && Number.isFinite(v) ? v : undefined);

const unit = (v: string, u: string) => html`${v}<small>${u}</small>`;

const infoRow = (label: string, value: string) =>
  html`<div class="row"><span>${label}</span><b>${value}</b></div>`;

const forecastCsv = (traj: Trajectory): string[][] => [
  ["time", "soc_pct", "pv_w", "house_w", "grid_w", "phase"],
  ...traj.trajectory_points.map((point, i) => [
    new Date(point[0]).toISOString(),
    String(point[1]),
    String(traj.pv_points[i]?.[1] ?? ""),
    String(traj.house_points[i]?.[1] ?? ""),
    String(traj.grid_points[i]?.[1] ?? ""),
    traj.trajectory_phases[i] ?? "",
  ]),
];

const timelineCsv = (c: Ctx): string[][] => [
  ["time", "phase", "reason"],
  ...(c.timeline ?? []).map((item) => [new Date(item.ts).toISOString(), item.phase, item.reason]),
];

const onDebug = (c: Ctx): boolean => isOn(st(c, E.debug));

const debugText = (c: Ctx): string => {
  const state = st(c, E.debugLog)?.state;
  return !state || state === "unknown" || state === "unavailable" ? c.i18n.t("debugEmpty") : state;
};

// ---------------------------------------------------------------- Live

function socRing(soc: number, label: string, reserve?: number): TemplateResult {
  return html`<div class="soc-gauge" role="img" aria-label=${`${Math.round(soc)}% ${label}`}>
    <div class="soc-disc" style=${`background:${socRingGradient(soc, reserve)}`}></div>
    <div class="soc-readout">
      <b>${Math.round(soc)}%</b>
      <span>${label}</span>
    </div>
  </div>`;
}

export function liveView(c: Ctx): TemplateResult {
  const { t } = c.i18n;
  const soc = num(st(c, E.soc));
  const target = num(st(c, E.targetSoc));
  const bat = num(st(c, E.battery));
  const on = (id: string) => isOn(st(c, id));
  const reachable = on(E.reachable);
  const chips = (
    [
      [t("chipUnreachable"), !reachable, "warn"],
      [t("chipChargeLock"), on(E.chargeLock), "warn"],
      [t("chipDischargeLock"), on(E.dischargeLock), "warn"],
      [t("chipHt"), on(E.htProtect), "warn"],
      [t("chipCurtail"), on(E.curtail), "warn"],
      [t("chipEmergency"), on(E.emergency), "warn"],
      [t("chipFeedIn"), on(E.feedInLimit), "warn"],
      [t("chipGridCharge"), on(E.gridCharge), "on"],
      [t("chipBatteryPriority"), on(E.batteryPriority), "warn"],
      [t("chipLowYield"), on(E.lowYield), "warn"],
    ] as [string, boolean, "on" | "warn"][]
  ).filter(([, active]) => active);
  const sp = (key: SparkKey, color: string) =>
    c.period !== "today" || !c.sparks?.[key]?.length ? nothing : html`<maestro-chart class="spark" .options=${memo(`spark-${key}`, [c.theme, c.sparks[key]], () => sparkOptions(c.sparks![key], color))}></maestro-chart>`;
  const flowH = flowBoxHeight(c.mobile, c.consumers.length);
  const amount = (key: PeriodKey): number | undefined => (c.period === "today" ? num(st(c, E[key])) : c.periodSums?.[key]);
  const balanceParts = [amount("feedRevenue"), amount("saving"), amount("costToday"), amount("wear")];
  const balance = c.period === "today" ? num(st(c, E.balance)) : balanceParts.some((v) => v === undefined) ? undefined : balanceParts[0]! + balanceParts[1]! - balanceParts[2]! - balanceParts[3]!;
  const euroOf = (v: number | undefined) => `${c.fmt.n(v, 2)} €`;
  const when = t(c.period === "today" ? "whenToday" : c.period === "week" ? "whenWeek" : "whenMonth");
  const groupTitle = t(c.period === "today" ? "groupToday" : c.period === "week" ? "groupWeek" : "groupMonth");
  const balanceTitle = t(c.period === "today" ? "balanceTitle" : c.period === "week" ? "balanceWeek" : "balanceMonth");
  const balanceTone = balance === undefined || balance === 0 ? "" : balance > 0 ? "pos" : "neg";
  const power = st(c, E.forceDischargePower);
  const powerAttrs = power?.attributes ?? {};
  const powerMin = typeof powerAttrs.min === "number" ? powerAttrs.min : 100;
  const powerMax = typeof powerAttrs.max === "number" ? powerAttrs.max : 10000;
  const powerStep = typeof powerAttrs.step === "number" ? powerAttrs.step : 100;
  const powerValue = c.forcePowerDraft ?? num(power) ?? powerMin;
  const reserve = st(c, E.fixedReserveSoc);
  const reserveAttrs = reserve?.attributes ?? {};
  const reserveMin = typeof reserveAttrs.min === "number" ? reserveAttrs.min : 0;
  const reserveMax = typeof reserveAttrs.max === "number" ? reserveAttrs.max : 100;
  const reserveStep = typeof reserveAttrs.step === "number" ? reserveAttrs.step : 1;
  const reserveValue = c.reserveDraft ?? num(reserve) ?? reserveMin;
  const modes = [on(E.ctrlPredictive) ? t("modePredictive") : "", on(E.ctrlPlanShadow) ? t("modeShadow") : ""]
    .filter(Boolean)
    .join(" · ");
  const group = (id: string, title: string, summary: TemplateResult, body: TemplateResult, extra?: TemplateResult) => {
    const open = !c.collapsed.has(id);
    return html`<section class="group">
      <div class="group-bar">
        <button type="button" class="group-head ${open ? "open" : ""}" aria-expanded=${open} @click=${() => c.onToggleGroup(id)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
          <span>${title}</span>
          ${open ? nothing : summary}
        </button>
        ${extra ?? nothing}
      </div>
      ${open ? html`<div class="grid kpis">${body}</div>` : nothing}
    </section>`;
  };

  return html`
    ${setupBanner(c)}
    <div class="grid live-top">
      <div class="card">
        <div class="card-head">
          <div>
            <h3>${t("flowTitle")}</h3>
            <div class="sub live-state">${t("flowSub")}<i class="live-dot ${reachable ? "ok" : "bad"}" role="img" aria-label=${reachable ? t("chipReachable") : t("chipUnreachable")}></i></div>
            ${modes ? html`<div class="sub mode-line">${modes}</div>` : nothing}
          </div>
          <button type="button" class="icon-btn" aria-label=${t("editConsumers")} @click=${c.onEditConsumers}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>
          </button>
        </div>
        <div class="flow-wrap" style=${flowH ? `height:${flowH}px` : nothing}>
          ${energyFlow({
            pv: num(st(c, E.pv)),
            house: num(st(c, E.house)),
            grid: num(st(c, E.grid)),
            battery: bat,
            soc,
            consumers: c.consumers,
            motion: c.motion,
            onSelect: c.onFlowNode,
            compact: c.mobile,
            outline: c.theme !== "dark",
            fmt: c.fmt,
            i18n: c.i18n,
          })}
        </div>
        ${c.consumerOverflow ? html`<p class="err">${t("consumersOverflow")}</p>` : nothing}
      </div>
      <div class="card soc-card">
        <h3 class="self-start">${t("battery")}</h3>
        ${soc !== undefined
          ? socRing(soc, t("stateOfCharge"), on(E.fixedReserve) ? reserveValue : undefined)
          : html`<p class="empty">${t("unavailable")}</p>`}
        ${on(E.fixedReserve)
          ? html`<p class="reserve-hint"><i></i>${t("fixedReserve")} ${t("ctrlReserveSoc", { v: Math.round(reserveValue) })}</p>`
          : nothing}
        <div class="soc-meta">
          <div class="meta"><b>${target !== undefined ? `${Math.round(target)}%` : "–"}</b><span>${t("targetSoc")}</span></div>
          <div class="meta"><b>${shown(st(c, E.autonomy))}</b><span>${t("autonomy")}</span></div>
        </div>
      </div>
    </div>
    ${chips.length
      ? html`<div class="chips">
          ${chips.map(([label, , cls]) => html`<span class="chip ${cls}"><i></i>${label}</span>`)}
        </div>`
      : nothing}
    <section class="card grip">
      <button type="button" class="grip-head ${c.controlsOpen ? "open" : ""}" aria-expanded=${c.controlsOpen} @click=${() => c.onToggleControls()}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
        <span class="grip-title">${t("controlsPair")}</span>
        ${on(E.forceDischarge) ? html`<span class="grip-state warn">${t("controlsForceOn", { v: c.fmt.w(powerValue) })}</span>` : nothing}
        ${on(E.fixedReserve) ? html`<span class="grip-state on">${t("controlsReserveOn", { v: Math.round(reserveValue) })}</span>` : nothing}
      </button>
      ${c.controlsOpen
        ? html`<div class="grip-body">
            <div class="force">
              <div class="txt"><b>${t("forceTitle")}</b><span>${t("ctrlForcePower", { v: c.fmt.w(powerValue) })}</span></div>
              <button
                class="switch ${on(E.forceDischarge) ? "on" : ""}"
                role="switch"
                aria-checked=${on(E.forceDischarge)}
                aria-label=${t("forceTitle")}
                ?disabled=${!st(c, E.forceDischarge) || c.pending.has(E.forceDischarge)}
                @click=${() => c.onToggle(E.forceDischarge)}
              ></button>
              ${sliderField({
                label: t("ctrlForcePower", { v: "" }),
                min: powerMin,
                max: powerMax,
                step: powerStep,
                value: powerValue,
                disabled: !power || power.state === "unavailable",
                onPreview: c.onPowerDraft,
                onCommit: c.onPowerCommit,
              })}
            </div>
            <div class="force">
              <div class="txt"><b>${t("fixedReserve")}</b><span>${t("ctrlReserveSoc", { v: Math.round(reserveValue) })}</span></div>
              <button
                class="switch ${on(E.fixedReserve) ? "on" : ""}"
                role="switch"
                aria-checked=${on(E.fixedReserve)}
                aria-label=${t("fixedReserve")}
                ?disabled=${!st(c, E.fixedReserve) || c.pending.has(E.fixedReserve)}
                @click=${() => c.onToggle(E.fixedReserve)}
              ></button>
              ${sliderField({
                label: t("fixedReserve"),
                min: reserveMin,
                max: reserveMax,
                step: reserveStep,
                value: reserveValue,
                unit: "%",
                disabled: !reserve || reserve.state === "unavailable",
                onPreview: c.onReserveDraft,
                onCommit: c.onReserveCommit,
              })}
            </div>
          </div>`
        : nothing}
    </section>
    ${autoLive(c)}
    ${group(
      "today",
      groupTitle,
      html`<b class="group-sum">${euroOf(amount("costNet"))}<small>${t("groupNet")}</small></b>`,
      html`
      <div class="card kpi">
        <h3>${t("kpiCost", { when })}</h3>
        <div class="v">${unit(c.fmt.n(amount("costNet"), 2), "€")}</div>
        <div class="delta">${t("kpiCostSub")}</div>
        ${sp("costNet", COLORS.gridIn)}
      </div>
      <div class="card kpi">
        <h3>${t("kpiSaving", { when })}</h3>
        <div class="v">${unit(c.fmt.n(amount("saving"), 2), "€")}</div>
        <div class="delta">${t("kpiSavingSub")}</div>
        ${sp("saving", COLORS.gridOut)}
      </div>
      <div class="card kpi">
        <h3>${t("kpiSelf", { when })}</h3>
        <div class="v">${unit(c.fmt.n(amount("selfUse")), "kWh")}</div>
        <div class="delta">${t("kpiSelfSub", { imp: c.fmt.n(amount("importToday")), feed: c.fmt.n(amount("feedToday")) })}</div>
        ${sp("selfUse", COLORS.pv)}
      </div>
      <div class="card kpi">
        <h3>${t("kpiBattery", { when })}</h3>
        <div class="v">${unit(c.fmt.n(amount("chargedToday")), "kWh")}</div>
        <div class="delta">${t("kpiBatterySub", { out: c.fmt.n(amount("dischargedToday")) })}</div>
        ${sp("chargedToday", COLORS.bat)}
      </div>
    `,
      html`<div class="seg period" role="group" aria-label=${t("periodToday")}>
        ${(["today", "week", "month"] as const).map(
          (p) => html`<button class=${c.period === p ? "active" : ""} aria-pressed=${c.period === p} @click=${() => c.onPeriod(p)}>${t(p === "today" ? "periodToday" : p === "week" ? "periodWeek" : "periodMonth")}</button>`,
        )}
      </div>`,
    )}
    ${group("balance", balanceTitle, html`<b class="group-sum ${balanceTone}">${euroOf(balance)}</b>`, html`
      <div class="card kpi">
        <h3>${t("kpiCostGross")}</h3>
        <div class="v">${unit(c.fmt.n(amount("costToday"), 2), "€")}</div>
        <div class="delta">${t("kpiCostGrossSub")}</div>
        ${sp("costToday", COLORS.gridIn)}
      </div>
      <div class="card kpi">
        <h3>${t("kpiRevenue")}</h3>
        <div class="v">${unit(c.fmt.n(amount("feedRevenue"), 2), "€")}</div>
        <div class="delta">${t("kpiRevenueSub", { when })}</div>
        ${sp("feedRevenue", COLORS.gridOut)}
      </div>
      <div class="card kpi">
        <h3>${t("kpiWear")}</h3>
        <div class="v">${unit(c.fmt.n(amount("wear"), 2), "€")}</div>
        <div class="delta">${t("kpiWearSub")}</div>
        ${sp("wear", COLORS.accent2)}
      </div>
      <div class="card kpi">
        <h3>${t("kpiBalance")}</h3>
        <div class="v">${unit(c.fmt.n(balance, 2), "€")}</div>
        <div class="delta">${t("kpiBalanceSub")}</div>
        ${sp("balance", COLORS.accent)}
      </div>
      <div class="card kpi ${on(E.unjustified) ? "alert" : ""}">
        <h3>${t("kpiGridBat")}</h3>
        <div class="v">${unit(c.fmt.n(amount("gridToBattery")), "kWh")}</div>
        <div class="delta">${on(E.unjustified) ? t("kpiGridBatWarn") : t("kpiGridBatSub")}</div>
        ${sp("gridToBattery", COLORS.gridIn)}
      </div>
      <div class="card kpi">
        <h3>${t("kpiWallbox", { when })}</h3>
        <div class="v">${unit(c.fmt.n(amount("wallboxEnergy")), "kWh")}</div>
        <div class="delta">${t("kpiWallboxSub")}</div>
        ${sp("wallboxEnergy", COLORS.house)}
      </div>
      <div class="card kpi">
        <h3>${t("kpiFeedLimit")}</h3>
        <div class="v">${unit(c.fmt.n(amount("curtailAvoided")), "kWh")}</div>
        <div class="delta">${t("kpiFeedLimitSub", { n: c.fmt.n(amount("feedInInterventions"), 0), dc: c.fmt.n(amount("feedInAvoided")) })}</div>
        ${sp("curtailAvoided", COLORS.pv)}
      </div>
    `)}`;
}

const qualityLabel = (t: Ctx["i18n"]["t"], state: string | undefined): string => {
  if (state === "ok") return t("qualityOk");
  if (state === "pv_fallback") return t("qualityPv");
  if (state === "consumption_fallback") return t("qualityConsumption");
  if (state === "both_fallback") return t("qualityBoth");
  return t("qualityUnknown");
};

const pct = (c: Ctx, id: string): string => {
  const v = num(st(c, id));
  return v === undefined ? "–" : `${Math.round(v)} %`;
};

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
        <button class="toggle" @click=${() => downloadCsv("maestro-prognose.csv", forecastCsv(traj))}>${t("exportCsv")}</button>
        <div class="seg" role="group">
          ${[6, 12, 24].map(
            (h) => html`<button class=${c.range === h ? "active" : ""} aria-pressed=${c.range === h} @click=${() => c.onRange(h)}>${t("hoursShort", { h })}</button>`,
          )}
        </div>
      </div>
      <maestro-chart
        id="fc-main"
        .options=${memo("forecast", [c.theme, st(c, E.trajectory), st(c, E.targetSoc)?.state, c.ist, c.showIst, c.fmt.loc], () =>
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
      <maestro-chart id="fc-brush" .options=${memo("brush", [c.theme, st(c, E.trajectory)], () => brushOptions(traj))}></maestro-chart>
    </div>
    <div class="grid stat-row">
      ${stat(t("statMinMax"), html`${Math.round(n(a.min_soc) ?? 0)}<small>%</small> / ${Math.round(n(a.max_soc) ?? 0)}<small>%</small>`)}
      ${stat(t("statImport"), unit(c.fmt.n(n(a.grid_draw_kwh)), "kWh"))}
      ${stat(t("statFeed"), unit(c.fmt.n(n(a.grid_feed_in_kwh)), "kWh"))}
      ${stat(t("statAutarky"), unit(c.fmt.n(n(a.self_sufficiency_pct)), "%"))}
      ${stat(t("statPvTomorrow"), unit(c.fmt.n(num(st(c, E.pvTomorrow))), "kWh"))}
    </div>
    <div class="grid stat-row">
      ${stat(t("qualityLabel"), qualityLabel(t, st(c, E.forecastQuality)?.state))}
      ${stat(t("statP10"), unit(c.fmt.n(num(st(c, E.p10))), "kWh"))}
      ${stat(t("statDeficit"), unit(c.fmt.n(num(st(c, E.deficit))), "kWh"))}
      ${stat(t("statYield"), html`${c.fmt.n((() => { const r = num(st(c, E.yieldRatio)); return r === undefined ? undefined : r * 100; })())}<small>%</small>`)}
    </div>
    <p class="sub yield-note">${t("statYieldSub", { today: c.fmt.n(num(st(c, E.yieldToday))), ref: c.fmt.n(num(st(c, E.yieldRef))) })}</p>`;
}

// ---------------------------------------------------------------- Price plan

export function planView(c: Ctx): TemplateResult {
  const { t } = c.i18n;
  const a = attrs(c, E.plan);
  const slots = parseSlots(a.plan_slots);
  const strategy = strategyOf(c.hass);
  const controls = planControls({ ...c, priceSensor: c.options.ready ? !!c.options.options.price_sensor : undefined });
  if (!slots.length) {
    const why = strategy && !isPlanStrategy(strategy) ? t("noPlanStrategy") : t("noPlan");
    return html`<div class="card"><p class="empty">${why}</p></div>${controls}`;
  }
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
        <maestro-chart .options=${memo("plan", [c.theme, st(c, E.plan), c.fmt.loc], () => planOptions({ slots, fmt: c.fmt, i18n: c.i18n }))}></maestro-chart>
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
          <div class="plan-state">${shown(st(c, E.plan))}</div>
          <div class="sub msg">${typeof a.message === "string" ? a.message : ""}</div>
        </div>
        <div>
          ${row(t("planStrategy"), strategy ? c.i18n.option(strategy) : "–")}
          ${row(t("planGridCharge"), `${c.fmt.n(n(a.total_grid_charge_kwh), 2)} kWh`)}
          ${row(t("planSaving"), `${c.fmt.n(n(a.expected_saving_eur), 2)} €`, "var(--ok)")}
          ${ext ? row(t("planCheapest"), slotText(ext.min)) : nothing}
          ${ext ? row(t("planMostExpensive"), slotText(ext.max)) : nothing}
          ${row(t("planKnownUntil"), known)}
        </div>
      </div>
    </div>
    ${controls}`;
}

const hourLabel = (value: number): string => {
  const hours = Math.floor(value);
  const minutes = Math.round((value - hours) * 60);
  return minutes ? `${hours}:${String(minutes).padStart(2, "0")}` : String(hours);
};

function autoOverrideMap(c: Ctx): Record<string, unknown> {
  const raw = attrs(c, E.autoStrategy).overrides;
  return raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
}

/** Plain sentence for the morning cap Auto actually applied. */
function autoCapText(c: Ctx): string | undefined {
  const overrides = autoOverrideMap(c);
  const soc = n(overrides.morning_cap_soc);
  const until = n(overrides.morning_cap_until_h);
  if (soc === undefined || until === undefined) return undefined;
  return c.i18n.t("autoCap", { soc: Math.round(soc), hour: hourLabel(until) });
}

function autoSummary(c: Ctx): { text: string; tone: string } {
  const { t } = c.i18n;
  if (!isOn(st(c, E.ctrlAuto))) return { text: t("autoOff"), tone: "" };
  const a = attrs(c, E.autoStrategy);
  const goal = typeof a.objective === "string" && a.objective ? c.i18n.option(a.objective) : "–";
  if (a.fallback === true) return { text: t("autoData", { goal }), tone: "warn" };
  if (typeof a.last_run !== "string") return { text: t("autoPending", { goal }), tone: "" };
  const saving = num(st(c, E.autoSaving));
  const eur = saving === undefined ? "–" : `${saving > 0 ? "+" : ""}${c.fmt.n(saving, 2)} €`;
  return { text: t("autoOn", { goal, eur }), tone: "on" };
}

function autoLive(c: Ctx): TemplateResult {
  const { t } = c.i18n;
  const open = c.autoOpen;
  const summary = autoSummary(c);
  const enabled = isOn(st(c, E.ctrlAuto));
  const a = attrs(c, E.autoStrategy);
  const select = st(c, E.selAuto);
  const options = Array.isArray(select?.attributes.options) ? (select.attributes.options as string[]) : [];
  const saving = num(st(c, E.autoSaving));
  const ran = typeof a.last_run === "string";
  const cap = autoCapText(c);
  const detail = !enabled
    ? nothing
    : a.fallback === true
      ? html`<p class="sub">${t("autoFallback")}</p>`
      : !ran
        ? nothing
        : html`<p class="sub">${cap ?? t("autoNone")}</p>`;
  return html`<section class="card grip">
    <div class="auto-bar">
      <button type="button" class="grip-head ${open ? "open" : ""}" aria-expanded=${open} @click=${() => c.onToggleAuto()}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
        <span class="grip-title">${t("autoTitle")}</span>
        <span class="grip-state ${summary.tone}">${summary.text}</span>
      </button>
      <button
        class="switch ${enabled ? "on" : ""}"
        role="switch"
        aria-checked=${enabled}
        aria-label=${t("autoTitle")}
        ?disabled=${!st(c, E.ctrlAuto) || c.pending.has(E.ctrlAuto)}
        @click=${() => c.onToggle(E.ctrlAuto)}
      ></button>
    </div>
    ${open
      ? html`<div class="grip-body">
          <div class="force">
            <div class="txt"><b>${t("autoObjective")}</b></div>
            <select
              aria-label=${t("autoObjective")}
              .value=${select?.state ?? ""}
              ?disabled=${!select || select.state === "unavailable" || c.pending.has(E.selAuto)}
              @change=${(e: Event) => c.onSelect(E.selAuto, (e.target as HTMLSelectElement).value)}
            >
              ${options.map((option) => html`<option value=${option} ?selected=${option === select?.state}>${c.i18n.option(option)}</option>`)}
            </select>
          </div>
          ${enabled && a.fallback !== true && saving !== undefined
            ? html`<div class="row"><span>${t("autoSaving")}</span><b>${saving > 0 ? "+" : ""}${c.fmt.n(saving, 2)} €</b></div>`
            : nothing}
          ${detail}
          <p class="sub">${t("autoLiveHint")}</p>
        </div>`
      : nothing}
  </section>`;
}

const autoText = (value: unknown): string => {
  if (typeof value === "string" && value) return value;
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  if (typeof value === "boolean") return value ? "1" : "0";
  return "–";
};

function autoRows(c: Ctx): TemplateResult {
  const { t } = c.i18n;
  const a = attrs(c, E.autoStrategy);
  const signed = (label: string, value: unknown, digits: number, unit: string) =>
    infoRow(label, `${c.fmt.n(n(value), digits)} ${unit}`);
  return html`
    ${infoRow(t("autoTitle"), shown(st(c, E.autoStrategy)))}
    ${infoRow(t("autoObjective"), autoText(a.objective))}
    ${infoRow(t("autoLastRun"), typeof a.last_run === "string" ? c.fmt.dayTime(a.last_run) : "–")}
    ${infoRow(t("autoFallback"), a.fallback === true ? t("optYes") : a.fallback === false ? t("optNo") : "–")}
    ${typeof a.fallback_reason === "string" && a.fallback_reason ? infoRow(t("autoReason"), a.fallback_reason) : nothing}
    ${infoRow(t("autoGrid"), autoText(a.grid_size))}
    ${infoRow(t("autoSaving"), `${c.fmt.n(num(st(c, E.autoSaving)), 2)} €`)}
    ${signed(t("autoDeltaDraw"), a.delta_grid_draw_kwh, 2, "kWh")}
    ${signed(t("autoDeltaFeed"), a.delta_grid_feed_in_kwh, 2, "kWh")}
    ${signed(t("autoDeltaCurtail"), a.delta_curtailed_kwh, 2, "kWh")}
    ${signed(t("autoDeltaSelf"), n(a.delta_self_sufficiency) !== undefined ? (n(a.delta_self_sufficiency) as number) * 100 : undefined, 1, "%")}
    ${autoCapText(c)
      ? html`<p class="sub">${autoCapText(c)}</p>`
      : a.fallback === false && typeof a.last_run === "string"
        ? html`<p class="sub">${t("autoNone")}</p>`
        : nothing}`;
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
    t("tagTargetPower", { v: c.fmt.w(n(d.target_charge_power) ?? num(st(c, E.targetCharge)) ?? 0) }),
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
          <div class="limit-row">
            <div class="lbl"><span>${t("targetPower")}</span><span>${c.fmt.w(n(d.target_charge_power) ?? num(st(c, E.targetCharge)) ?? 0)}</span></div>
          </div>
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
      <div class="card-head">
        <h3>${t("timelineTitle")}</h3>
        <button class="toggle" ?disabled=${!c.timeline?.length} @click=${() => c.timeline && downloadCsv("maestro-entscheidungen.csv", timelineCsv(c))}>${t("exportCsv")}</button>
      </div>
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
    </div>
    <div class="grid stat-row dec-extra">
      <div class="card">
        <h3>${t("reserveTitle")}</h3>
        <div class="rows">
          ${infoRow(t("reserveSeasonal"), pct(c, E.seasonalReserve))}
          ${infoRow(t("reserveAdaptive"), pct(c, E.adaptiveReserve))}
          ${infoRow(t("reserveHt"), pct(c, E.htReserve))}
          ${infoRow(t("reserveForward"), pct(c, E.forwardTarget))}
          ${infoRow(t("targetSoc"), pct(c, E.targetSoc))}
        </div>
      </div>
      <div class="card">
        <h3>${t("windowsTitle")}</h3>
        <div class="rows">
          ${infoRow(t("windowAstro"), shown(st(c, E.astroStart)))}
          ${infoRow(t("windowSeasonalEnd"), shown(st(c, E.seasonalEnd)))}
          ${infoRow(t("windowPvDelay"), shown(st(c, E.pvDelayStart)))}
          ${infoRow(t("windowTomorrow"), `${shown(st(c, E.tomorrowStart))} – ${shown(st(c, E.tomorrowEnd))}`)}
        </div>
      </div>
      <div class="card">
        <h3>${t("autoTitle")}</h3>
        <div class="rows">${autoRows(c)}</div>
      </div>
    </div>
    <section class="group">
      <button type="button" class="group-head ${c.debugOpen ? "open" : ""}" aria-expanded=${c.debugOpen} @click=${c.onToggleDebug}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
        <span>${t("debugTitle")}</span>
      </button>
      ${c.debugOpen
        ? html`<div class="card debug-card">
            <div class="force">
              <div class="txt"><b>${t("debugSwitch")}</b></div>
              <button
                class="switch ${onDebug(c) ? "on" : ""}"
                role="switch"
                aria-checked=${onDebug(c)}
                aria-label=${t("debugSwitch")}
                ?disabled=${!st(c, E.debug) || c.pending.has(E.debug)}
                @click=${() => c.onToggle(E.debug)}
              ></button>
            </div>
            <pre class="debug-log">${debugText(c)}</pre>
          </div>`
        : nothing}
    </section>`;
}
