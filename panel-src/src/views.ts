import { html, nothing, type TemplateResult } from "lit";
import "./maestro-chart";
import { E, isOn, num, type Hass, type HassEntity } from "./entities";

const shown = (e: HassEntity | undefined): string =>
  !e || e.state === "unknown" || e.state === "unavailable" ? "–" : e.state;
import {
  balancePulseOptions,
  brushOptions,
  COLORS,
  forecastOptions,
  planOptions,
  socRingGradient,
  sparkOptions,
} from "./charts";
import type { ClassicStatus } from "./classic";
import { separateDayEnergy, type FlowConsumer } from "./consumers";
import type { ConsumerPlace } from "./consumer-layout";
import { batteryFlowFromWatts, batteryGlyph } from "./battery-glyph";
import { BATTERY_STYLES, type BatteryStyleId } from "./battery-style";
import { blobEnergyFlow, blobFlowBoxHeight } from "./flow-blob";
import { cityEnergyFlow } from "./flow-city";
import { energyFlow, flowBoxHeight } from "./flow";
import { FLOW_STYLES, type FlowStyleId } from "./flow-style";
import { sliderField } from "./slider-field";
import { memo } from "./memo";
import type { ThemeId } from "./theme";
import type { Fmt } from "./format";
import type { I18n } from "./i18n";
import { calendarPopover } from "./calendar-popover";
import {
  calendarDay,
  canShiftBalanceForward,
  dayBalance,
  formatBalanceRange,
  parseCalendarDay,
  shiftBalanceAnchor,
  type BalanceDay,
  type BalanceGrain,
  type BalanceRange,
  type IstSeries,
  type PeriodKey,
  type PulseRange,
  type SparkKey,
} from "./history";
import { downloadCsv } from "./csv";
import { setupBanner } from "./onboarding-view";
import type { OptionCtx } from "./options-view";
import { planControls, strategyOf } from "./settings";
import {
  AUTONOMY_BAR_HOURS,
  batteryForecast,
  parseAutonomyHours,
  parseSlots,
  parseTrajectory,
  planEmptyKind,
  planSocPoints,
  priceExtremes,
  slotAction,
  type PlanEmptyKind,
  type Point,
  type TimelineItem,
  type Trajectory,
} from "./transform";

const PLAN_EMPTY_KEY: Record<PlanEmptyKind, "noPlanOff" | "noPlanSlots" | "noPlanThreshold" | "planComputing" | "noPlanPrices" | "noPlanProfile" | "noPlanRoom" | "noPlan"> = {
  off: "noPlanOff",
  slots: "noPlanSlots",
  threshold: "noPlanThreshold",
  computing: "planComputing",
  no_prices: "noPlanPrices",
  no_profile: "noPlanProfile",
  no_room: "noPlanRoom",
  no_plan: "noPlan",
};

export interface Ctx {
  hass: Hass;
  i18n: I18n;
  fmt: Fmt;
  mobile: boolean;
  sparks?: Record<SparkKey, Point[]>;
  /** Sparks for a past day grain; unused for week/month/year. */
  daySparks?: Record<SparkKey, Point[]>;
  ist?: IstSeries;
  timeline?: TimelineItem[];
  range: number;
  showIst: boolean;
  onRange: (hours: number) => void;
  onToggleIst: () => void;
  consumers: FlowConsumer[];
  consumerOverflow: boolean;
  onEditConsumers: () => void;
  arrangeConsumers: boolean;
  onToggleArrange: () => void;
  onResetConsumerPlaces: () => void;
  consumerPlaces: Record<string, ConsumerPlace>;
  onPlaceConsumer: (id: string, place: ConsumerPlace) => void;
  onFlowNode: (key: string) => void;
  motion: boolean;
  collapsed: ReadonlySet<string>;
  onToggleGroup: (id: string) => void;
  batteryCtrlOpen: boolean;
  onOpenBatteryCtrl: () => void;
  onCloseBatteryCtrl: () => void;
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
  balanceRange: BalanceRange;
  rangeSums?: Partial<Record<PeriodKey, number>>;
  onBalanceSelect: (grain: BalanceGrain, anchor: string) => void;
  calOpen: boolean;
  calViewAnchor: string;
  onCalOpen: (open: boolean) => void;
  onCalViewAnchor: (day: string) => void;
  pulseRange: PulseRange;
  onPulseRange: (range: PulseRange) => void;
  pulseDays?: BalanceDay[];
  pulseState?: "idle" | "loading" | "ready" | "error";
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
  flowStyle: FlowStyleId;
  onFlowStyle: (style: FlowStyleId) => void;
  alertBannerHidden: boolean;
  onAlertBannerHidden: (hidden: boolean) => void;
  batteryStyle: BatteryStyleId;
  onBatteryStyle: (style: BatteryStyleId) => void;
  phasePoints?: Readonly<Record<string, Point[]>>;
  phaseHistory?: "idle" | "loading" | "ready" | "error";
  options: OptionCtx;
  expert: boolean;
  onExpert: (on: boolean) => void;
  planTuneOpen: boolean;
  onTogglePlanTune: () => void;
  pvOpen: ReadonlySet<string>;
  onTogglePv: (section: string) => void;
}

const st = (c: Ctx, id: string): HassEntity | undefined => c.hass.states[id];
const attrs = (c: Ctx, id: string): Record<string, unknown> => st(c, id)?.attributes ?? {};
const n = (v: unknown): number | undefined => (typeof v === "number" && Number.isFinite(v) ? v : undefined);

const unit = (v: string, u: string) => html`${v}<small>${u}</small>`;

/** Dynamic-tariff simulation while billing stays on the fixed buy price. */
const simDynamic = (
  c: Ctx,
  id: string,
): { sim: number; delta?: number; kind: "cost" | "saving"; comparable: boolean } | undefined => {
  const a = attrs(c, id);
  if (a.simulation !== "dynamic_buy_price") return undefined;
  const sim = n(a.simulation_dynamic_eur);
  if (sim === undefined) return undefined;
  const kind = a.simulation_kind === "saving" ? "saving" : "cost";
  const comparable = a.simulation_comparable === true;
  const delta = comparable ? n(a.simulation_delta_eur) : undefined;
  return { sim, delta, kind, comparable };
};

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
  const entity = st(c, E.debugLog);
  const lines = entity?.attributes?.lines;
  if (Array.isArray(lines) && lines.length > 0) {
    return lines.map(String).join("\n");
  }
  const state = entity?.state;
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

function socPack(
  soc: number,
  label: string,
  watts: number | undefined,
  reserve?: number,
): TemplateResult {
  const flow = batteryFlowFromWatts(watts);
  return html`<div class="soc-pack">
    ${batteryGlyph(`${Math.round(soc)}% ${label}`, soc, flow, { live: true, reserve })}
    <div class="soc-pack-readout">
      <b>${Math.round(soc)}%</b>
      <span>${label}</span>
    </div>
  </div>`;
}

function socMetrics(
  c: Ctx,
  soc: number | undefined,
  target: number | undefined,
  reserve?: number,
): TemplateResult {
  const { t } = c.i18n;
  const autonomyRaw = shown(st(c, E.autonomy));
  const autonomyH = parseAutonomyHours(autonomyRaw === "–" ? undefined : autonomyRaw);
  const autonomyPct =
    autonomyH === undefined ? (soc ?? 0) : Math.min(100, (autonomyH / AUTONOMY_BAR_HOURS) * 100);

  const traj = parseTrajectory(attrs(c, E.trajectory));
  const forecast = traj
    ? batteryForecast(traj.trajectory_points, traj.grid_points, {
        reserve,
        currentSoc: soc,
        currentGrid: num(st(c, E.grid)),
        battery: traj.battery_points,
      })
    : undefined;

  const peakSoc = forecast?.peakSoc;
  const peakPct = Math.max(0, Math.min(100, peakSoc ?? soc ?? 0));
  const socPct = Math.max(0, Math.min(100, soc ?? 0));
  const reservePct =
    reserve !== undefined && Number.isFinite(reserve) ? Math.max(0, Math.min(100, reserve)) : undefined;

  const peakLabel = forecast
    ? forecast.peakAt !== undefined
      ? t(forecast.peakDay === "today" ? "forecastPeakToday" : "forecastPeakTomorrow", { v: c.fmt.time(forecast.peakAt) })
      : t("forecastNoPeak")
    : undefined;
  const floorLabel =
    forecast?.floorAt !== undefined
      ? t(
          forecast.floorKind === "up"
            ? "forecastFloorReach"
            : reservePct
              ? "forecastFloor"
              : "forecastEmpty",
          { v: c.fmt.time(forecast.floorAt) },
        )
      : undefined;
  const gridLabel = forecast
    ? forecast.gridImportKind === "ongoing"
      ? t("forecastGridOngoing")
      : forecast.gridImportKind === "until" && forecast.gridImportAt !== undefined
        ? t("forecastGridUntil", { v: c.fmt.time(forecast.gridImportAt) })
        : forecast.gridImportKind === "starts" && forecast.gridImportAt !== undefined
          ? t("forecastGrid", { v: c.fmt.time(forecast.gridImportAt) })
          : t("forecastNoGrid")
    : undefined;
  const targetLabel =
    target !== undefined && (peakSoc === undefined || Math.round(target) !== Math.round(peakSoc))
      ? t("tagTargetSoc", { v: Math.round(target) })
      : undefined;
  const forecastBits = [peakLabel, floorLabel, gridLabel, targetLabel].filter(Boolean) as string[];

  return html`<div class="soc-metrics">
    <div class="soc-metric">
      <div class="soc-metric-head">
        <span>${t("forecastPeak")}</span>
        <b>${peakSoc !== undefined ? `${Math.round(peakSoc)}%` : "–"}</b>
      </div>
      <div class="soc-track" role="img" aria-label=${`${t("forecastPeak")} ${peakSoc !== undefined ? `${Math.round(peakSoc)}%` : "–"}`}>
        ${reservePct !== undefined
          ? html`<i class="soc-track-reserve" style="width:${reservePct}%"></i>`
          : nothing}
        <i class="soc-track-fill" style="width:${socPct}%"></i>
        ${peakSoc !== undefined
          ? html`<i class="soc-track-mark" style="left:${peakPct}%"></i>`
          : nothing}
      </div>
      ${forecastBits.length
        ? html`<div class="soc-metric-sub">
            ${forecastBits.map(
              (bit, index) => html`${index ? html`<span class="soc-metric-sep" aria-hidden="true">·</span>` : nothing}<span>${bit}</span>`,
            )}
          </div>`
        : nothing}
    </div>
    <div class="soc-metric">
      <div class="soc-metric-head">
        <span>${t("autonomy")}</span>
        <b>${autonomyRaw}</b>
      </div>
      <div class="soc-track" role="img" aria-label=${`${t("autonomy")} ${autonomyRaw}`}>
        <i class="soc-track-fill" style="width:${autonomyPct}%"></i>
      </div>
      <div class="soc-metric-sub">${t("autonomyHint")}</div>
    </div>
  </div>`;
}

const gridBatDelta = (
  c: Ctx,
  t: Ctx["i18n"]["t"],
  on: (id: string) => boolean,
): string => {
  if (on(E.unjustified)) return t("kpiGridBatWarn");
  const phase = st(c, E.phase)?.state;
  if (phase === "reserve_protection") return t("kpiGridBatReserve");
  if (phase === "emergency") return t("kpiGridBatEmergency");
  const reason = String(st(c, E.gridToBattery)?.attributes?.charge_reason ?? "");
  if (reason === "reserve") return t("kpiGridBatReserve");
  if (reason === "emergency") return t("kpiGridBatEmergency");
  // After a reserve top-up the phase may already be corridor again — still
  // label the day's justified G→B as reserve when that switch is on.
  if (reason === "justified" && on(E.fixedReserve)) {
    return t("kpiGridBatReserve");
  }
  if (reason === "justified" || reason === "curtailment" || reason === "feed_in_limit") {
    return t("kpiGridBatJustified");
  }
  return t("kpiGridBatSub");
};

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
      [t("chipReserveCharge"), st(c, E.phase)?.state === "reserve_protection", "on"],
      [t("chipGridCharge"), on(E.gridCharge), "on"],
      [t("chipBatteryPriority"), on(E.batteryPriority), "warn"],
      [t("chipLowYield"), on(E.lowYield), "warn"],
    ] as [string, boolean, "on" | "warn"][]
  ).filter(([, active]) => active);
  const br = c.balanceRange;
  const dayLive = br.grain === "day" && br.live;
  const sp = (
    key: SparkKey,
    color: string,
    mode: boolean | "day" = dayLive ? true : br.grain === "day" ? "day" : false,
  ) => {
    const points = mode === "day" ? c.daySparks?.[key] : mode ? c.sparks?.[key] : undefined;
    if (!points?.length) return nothing;
    return html`<maestro-chart
      class="spark"
      .options=${memo(`spark-${key}-${mode === "day" ? br.start : "live"}`, [c.theme, points], () => sparkOptions(points, color))}
    ></maestro-chart>`;
  };
  const balanceSpark = (key: SparkKey, color: string) =>
    sp(key, color, dayLive ? true : br.grain === "day" ? "day" : false);
  // City: never pin a pixel height. The SVG uses height:auto (viewBox aspect ratio);
  // a fixed wrap height (treated as 1 unit = 1px) undershoots on wider phones and the
  // consumer list paints over the day totals.
  const flowH =
    c.flowStyle === "city"
      ? undefined
      : c.flowStyle === "blob"
        ? blobFlowBoxHeight(c.mobile, c.consumers.length)
        : flowBoxHeight(c.mobile, c.consumers.length);
  const renderFlow = c.flowStyle === "blob" ? blobEnergyFlow : c.flowStyle === "city" ? cityEnergyFlow : energyFlow;
  const amount = (key: PeriodKey): number | undefined => (dayLive ? num(st(c, E[key])) : c.rangeSums?.[key]);
  const balanceAmount = amount;
  const balance = dayLive
    ? num(st(c, E.balance))
    : dayBalance({
        feedRevenue: balanceAmount("feedRevenue"),
        saving: balanceAmount("saving"),
        costToday: balanceAmount("costToday"),
        wear: balanceAmount("wear"),
      });
  const rangeEmpty =
    !dayLive &&
    c.rangeSums !== undefined &&
    balance === undefined &&
    amount("costNet") === undefined &&
    amount("saving") === undefined;
  const euroOf = (v: number | undefined) => `${c.fmt.n(v, 2)} €`;
  const whenKey =
    br.grain === "day" ? (br.live ? "whenToday" : "whenToday") : br.grain === "week" ? "whenWeek" : br.grain === "month" ? "whenMonth" : "whenYear";
  const when =
    br.grain === "day" && !br.live
      ? c.fmt.day(parseCalendarDay(br.start))
      : br.live
        ? t(whenKey)
        : formatBalanceRange(br, c.fmt.loc, t("periodToday"));
  const balanceWhen = when;
  const groupTitle = t(
    br.grain === "day" ? "groupToday" : br.grain === "week" ? "groupWeek" : br.grain === "month" ? "groupMonth" : "groupYear",
  );
  const balanceTitle = t(
    br.grain === "day" ? "balanceTitle" : br.grain === "week" ? "balanceWeek" : br.grain === "month" ? "balanceMonth" : "balanceYear",
  );
  const balanceTone = balance === undefined || balance === 0 ? "" : balance > 0 ? "pos" : "neg";
  const todayKey = calendarDay();
  const simLine = (id: string, live = dayLive) => {
    if (!live) return nothing;
    const info = simDynamic(c, id);
    if (!info) return nothing;
    let deltaNode: typeof nothing | ReturnType<typeof html> = nothing;
    if (!info.comparable) {
      deltaNode = html`<span class="sim-delta muted">${t("kpiSimPending")}</span>`;
    } else if (info.delta !== undefined && Math.abs(info.delta) >= 0.005) {
      const abs = c.fmt.n(Math.abs(info.delta), 2);
      // Costs: lower sim is better (green). Savings: higher sim is better (green).
      const better =
        info.kind === "cost" ? info.delta < 0 : info.delta > 0;
      const label =
        info.kind === "cost"
          ? t(info.delta > 0 ? "kpiSimCostlier" : "kpiSimCheaper", { v: abs })
          : t(info.delta > 0 ? "kpiSimMoreSaving" : "kpiSimLessSaving", { v: abs });
      deltaNode = html`<span class="sim-delta ${better ? "pos" : "neg"}">${label}</span>`;
    }
    return html`<div class="sim-dyn">${t("kpiSimDynamic", { v: c.fmt.n(info.sim, 2) })} ${deltaNode}</div>`;
  };
  const rangeLabel = formatBalanceRange(br, c.fmt.loc, t("periodToday"));
  const canForward = canShiftBalanceForward(br);
  const rangeNav = html`<div class="day-nav cal-nav" role="group" aria-label=${t("dayNav")}>
      <button
        type="button"
        class="day-nav-btn"
        aria-label=${t("dayPrev")}
        @click=${() => c.onBalanceSelect(br.grain, shiftBalanceAnchor(br.grain, br.anchor, -1))}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>
      </button>
      <div class="day-nav-pick">
        <button type="button" class="day-nav-date" aria-label=${t("dayPick")} aria-expanded=${c.calOpen} @click=${() => c.onCalOpen(!c.calOpen)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>
          <span class="day-nav-label">${rangeLabel}</span>
        </button>
        ${calendarPopover({
          open: c.calOpen,
          grain: br.grain,
          selected: br,
          viewAnchor: c.calViewAnchor,
          i18n: c.i18n,
          loc: c.fmt.loc,
          onClose: () => c.onCalOpen(false),
          onGrain: (g) => {
            c.onCalViewAnchor(br.anchor);
            c.onBalanceSelect(g, br.anchor);
          },
          onViewAnchor: c.onCalViewAnchor,
          onPick: (g, a) => {
            c.onBalanceSelect(g, a);
            c.onCalOpen(false);
          },
        })}
      </div>
      <button
        type="button"
        class="day-nav-btn"
        aria-label=${t("dayNext")}
        ?disabled=${!canForward}
        @click=${() => c.onBalanceSelect(br.grain, shiftBalanceAnchor(br.grain, br.anchor, 1))}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
      </button>
      ${br.live && br.grain === "day"
        ? nothing
        : html`<button type="button" class="day-nav-today" @click=${() => c.onBalanceSelect("day", todayKey)}>${t("periodToday")}</button>`}
    </div>`;
  const powerValue = c.forcePowerDraft ?? num(st(c, E.forceDischargePower)) ?? 100;
  const reserveValue = c.reserveDraft ?? num(st(c, E.fixedReserveSoc)) ?? 0;
  const modes = [on(E.ctrlPredictive) ? t("modePredictive") : "", on(E.ctrlPlanShadow) ? t("modeShadow") : ""]
    .filter(Boolean)
    .join(" · ");
  const dayKwh = (key: "pvToday" | "houseToday" | "importToday" | "feedToday") => c.fmt.n(num(st(c, E[key])));
  const separateDay = separateDayEnergy(c.consumers, num(st(c, E.wallboxEnergy)));
  const openToday = () => {
    if (c.collapsed.has("today")) c.onToggleGroup("today");
  };
  const group = (
    id: string,
    title: string,
    summary: TemplateResult,
    body: TemplateResult,
    extra?: TemplateResult | typeof nothing,
    bodyClass = "grid kpis",
  ) => {
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
      ${open ? html`<div class=${bodyClass}>${body}</div>` : nothing}
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
          <div class="flow-head-actions">
            <div class="flow-style" role="radiogroup" aria-label=${t("flowStyleLabel")}>
              ${FLOW_STYLES.map(
                (id) => html`<button
                  type="button"
                  class="flow-style-btn ${c.flowStyle === id ? "on" : ""}"
                  role="radio"
                  aria-checked=${c.flowStyle === id}
                  @click=${() => c.onFlowStyle(id)}
                >${t(
                  id === "nodes" ? "flowStyleNodes" : id === "blob" ? "flowStyleBlob" : "flowStyleCity",
                )}</button>`,
              )}
            </div>
            ${c.consumers.length && !c.mobile
              ? html`<button
                  type="button"
                  class="flow-style-btn arrange-btn ${c.arrangeConsumers ? "on" : ""}"
                  aria-pressed=${c.arrangeConsumers}
                  @click=${c.onToggleArrange}
                >${c.arrangeConsumers ? t("arrangeDone") : t("arrangeConsumers")}</button>`
              : nothing}
            <button type="button" class="icon-btn" aria-label=${t("editConsumers")} @click=${c.onEditConsumers}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>
            </button>
          </div>
        </div>
        ${c.arrangeConsumers
          ? html`<p class="flow-arrange-hint">${t("arrangeHint")}
              <button type="button" class="linkish" @click=${c.onResetConsumerPlaces}>${t("arrangeReset")}</button>
            </p>`
          : nothing}
        <div class="flow-wrap ${c.flowStyle} ${c.arrangeConsumers ? "arrange" : ""}" style=${flowH ? `height:${flowH}px` : nothing}>
          ${renderFlow({
            pv: num(st(c, E.pv)),
            house: num(st(c, E.house)),
            grid: num(st(c, E.grid)),
            battery: bat,
            loadMax: num(st(c, E.inverterPower)),
            soc,
            consumers: c.consumers,
            consumerPlaces: c.consumerPlaces,
            arrange: c.arrangeConsumers,
            onPlaceConsumer: c.onPlaceConsumer,
            motion: c.motion,
            onSelect: c.onFlowNode,
            compact: c.mobile,
            outline: c.theme !== "dark",
            fmt: c.fmt,
            i18n: c.i18n,
          })}
        </div>
        <button type="button" class="flow-day" @click=${openToday} aria-label=${t("flowDayOpen")}>
          <span class="flow-day-label">${t("flowDay")}</span>
          <span>${t("nodePv")} ${dayKwh("pvToday")}</span>
          <span class="flow-day-sep" aria-hidden="true">·</span>
          <span>${t("nodeHouse")} ${dayKwh("houseToday")}</span>
          <span class="flow-day-sep" aria-hidden="true">·</span>
          <span>${t("flowDayImport")} ${dayKwh("importToday")}</span>
          <span class="flow-day-sep" aria-hidden="true">·</span>
          <span>${t("flowDayFeed")} ${dayKwh("feedToday")}</span>
          <span class="flow-day-unit">kWh</span>
        </button>
        ${separateDay.length
          ? html`<div class="flow-day flow-day-extra">
              <span class="flow-day-label">${t("flowDaySeparate")}</span>
              ${separateDay.map(
                (item, index) => html`${index ? html`<span class="flow-day-sep" aria-hidden="true">·</span>` : nothing}
                  <span>${item.name} ${c.fmt.n(item.kwh)}</span>`,
              )}
              <span class="flow-day-unit">kWh</span>
            </div>`
          : nothing}
        ${c.consumerOverflow ? html`<p class="err">${t("consumersOverflow")}</p>` : nothing}
      </div>
      <div class="card soc-card">
        <div class="card-head soc-head">
          <h3>${t("battery")}</h3>
          <div class="flow-style" role="radiogroup" aria-label=${t("batteryStyleLabel")}>
            ${BATTERY_STYLES.map(
              (id) => html`<button
                type="button"
                class="flow-style-btn ${c.batteryStyle === id ? "on" : ""}"
                role="radio"
                aria-checked=${c.batteryStyle === id}
                @click=${() => c.onBatteryStyle(id)}
              >${t(id === "pack" ? "batteryStylePack" : "batteryStyleRing")}</button>`,
            )}
          </div>
        </div>
        <div class="soc-visual">
          ${soc !== undefined
            ? c.batteryStyle === "pack"
              ? socPack(soc, t("stateOfCharge"), bat, on(E.fixedReserve) ? reserveValue : undefined)
              : socRing(soc, t("stateOfCharge"), on(E.fixedReserve) ? reserveValue : undefined)
            : html`<p class="empty">${t("unavailable")}</p>`}
          ${on(E.fixedReserve)
            ? html`<p class="reserve-hint"><i></i>${t("fixedReserve")} ${t("ctrlReserveSoc", { v: Math.round(reserveValue) })}</p>`
            : nothing}
        </div>
        ${socMetrics(c, soc, target, on(E.fixedReserve) ? reserveValue : undefined)}
        <button type="button" class="soc-ctrl-btn" @click=${() => c.onOpenBatteryCtrl()}>
          <span class="soc-ctrl-copy">
            <span class="soc-ctrl-label">${t("batteryCtrl")}</span>
            <span class="soc-ctrl-meta">${batteryCtrlMeta(c, powerValue, reserveValue)}</span>
          </span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
        </button>
      </div>
    </div>
    ${chips.length
      ? html`<div class="chips">
          ${chips.map(([label, , cls]) => html`<span class="chip ${cls}"><i></i>${label}</span>`)}
        </div>`
      : nothing}
    <div class="range-bar">${rangeNav}</div>
    ${rangeEmpty ? html`<p class="hint range-empty">${t("rangeEmpty")}</p>` : nothing}
    ${group(
      "today",
      groupTitle,
      html`<b class="group-sum">${euroOf(amount("costNet"))}<small>${t("groupNet")}</small></b>`,
      html`
      <div class="card kpi">
        <h3>${t("kpiCost", { when })}</h3>
        <div class="v">${unit(c.fmt.n(amount("costNet"), 2), "€")}${simLine(E.costNet)}</div>
        <div class="delta">${t("kpiCostSub")}</div>
        ${sp("costNet", COLORS.gridIn)}
      </div>
      <div class="card kpi">
        <h3>${t("kpiSaving", { when })}</h3>
        <div class="v">${unit(c.fmt.n(amount("saving"), 2), "€")}${simLine(E.saving)}</div>
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
    )}
    ${group(
      "balance",
      balanceTitle,
      html`<b class="group-sum ${balanceTone}">${euroOf(balance)}</b>`,
      html`
      <div class="card kpi">
        <h3>${t("kpiCostGross")}</h3>
        <div class="v">${unit(c.fmt.n(balanceAmount("costToday"), 2), "€")}${simLine(E.costToday, dayLive)}</div>
        <div class="delta">${t("kpiCostGrossSub")}</div>
        ${balanceSpark("costToday", COLORS.gridIn)}
      </div>
      <div class="card kpi">
        <h3>${t("kpiRevenue")}</h3>
        <div class="v">${unit(c.fmt.n(balanceAmount("feedRevenue"), 2), "€")}</div>
        <div class="delta">${t("kpiRevenueSub", { when: balanceWhen })}</div>
        ${balanceSpark("feedRevenue", COLORS.gridOut)}
      </div>
      <div class="card kpi">
        <h3>${t("kpiWear")}</h3>
        <div class="v">${unit(c.fmt.n(balanceAmount("wear"), 2), "€")}</div>
        <div class="delta">${t("kpiWearSub")}</div>
        ${balanceSpark("wear", COLORS.accent2)}
      </div>
      <div class="card kpi">
        <h3>${t("kpiBalance")}</h3>
        <div class="v">${unit(c.fmt.n(balance, 2), "€")}</div>
        <div class="delta">${t("kpiBalanceSub")}</div>
        ${balanceSpark("balance", COLORS.accent)}
      </div>
      <div class="card kpi ${dayLive && on(E.unjustified) ? "alert" : ""}">
        <h3>${t("kpiGridBat")}</h3>
        <div class="v">${unit(c.fmt.n(balanceAmount("gridToBattery")), "kWh")}</div>
        <div class="delta">${dayLive ? gridBatDelta(c, t, on) : t("kpiGridBatSub")}</div>
        ${balanceSpark("gridToBattery", COLORS.gridIn)}
      </div>
      <div class="card kpi">
        <h3>${t("kpiWallbox", { when: balanceWhen })}</h3>
        <div class="v">${unit(c.fmt.n(balanceAmount("wallboxEnergy")), "kWh")}</div>
        <div class="delta">${t("kpiWallboxSub")}</div>
        ${balanceSpark("wallboxEnergy", COLORS.house)}
      </div>
      <div class="card kpi">
        <h3>${t("kpiFeedLimit")}</h3>
        <div class="v">${unit(c.fmt.n(balanceAmount("curtailAvoided")), "kWh")}</div>
        <div class="delta">${t("kpiFeedLimitSub", { n: c.fmt.n(balanceAmount("feedInInterventions"), 0), dc: c.fmt.n(balanceAmount("feedInAvoided")) })}</div>
        ${balanceSpark("curtailAvoided", COLORS.pv)}
      </div>
    `,
    )}
    ${(() => {
      const days = c.pulseDays ?? [];
      const defined = days.filter((d) => d.balance !== undefined);
      const pulseSum = defined.length ? defined.reduce((acc, d) => acc + d.balance!, 0) : undefined;
      const pulseTone = pulseSum === undefined || pulseSum === 0 ? "" : pulseSum > 0 ? "pos" : "neg";
      const sparkPts = defined.map((d) => [d.ts, d.balance!] as [number, number]);
      const sparkColor = pulseTone === "neg" ? COLORS.gridIn : COLORS.gridOut;
      const pulseState = c.pulseState ?? "idle";
      const pulseBody =
        pulseState === "error"
          ? html`<p class="err">${t("historyFailed")}</p>`
          : pulseState === "loading" && !days.length
            ? html`<p class="hint">${t("loading")}</p>`
            : !defined.length
              ? html`<p class="hint">${t("pulseEmpty")}</p>`
              : html`<maestro-chart
                  class="pulse-chart"
                  .options=${memo(
                    `pulse-${c.pulseRange}`,
                    [c.theme, c.fmt.loc, days],
                    () =>
                      balancePulseOptions({
                        days,
                        fmt: c.fmt,
                        i18n: c.i18n,
                        onDay: (day) => c.onBalanceSelect("day", day),
                      }),
                  )}
                ></maestro-chart>`;
      return group(
        "balancePulse",
        t("pulseTitle"),
        html`<span class="pulse-sum">
          ${sparkPts.length
            ? html`<maestro-chart class="pulse-spark" .options=${memo(`pulse-spark-${c.pulseRange}`, [c.theme, sparkPts], () => sparkOptions(sparkPts, sparkColor))}></maestro-chart>`
            : nothing}
          <b class="group-sum ${pulseTone}">${euroOf(pulseSum)}</b>
        </span>`,
        pulseBody,
        html`<div class="seg period" role="group" aria-label=${t("pulseTitle")}>
          ${(["week", "month"] as const).map(
            (r) =>
              html`<button class=${c.pulseRange === r ? "active" : ""} aria-pressed=${c.pulseRange === r} @click=${() => c.onPulseRange(r)}>${t(r === "week" ? "periodWeek" : "periodMonth")}</button>`,
          )}
        </div>`,
        "pulse-body",
      );
    })()}`;
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
  const planAttrs = attrs(c, E.plan);
  const planSoc =
    planAttrs.controlling === true ? planSocPoints(parseSlots(planAttrs.plan_slots)) : undefined;
  const usePlanSoc = !!planSoc && planSoc.length >= 2;
  const legend: [string, string][] = [
    [COLORS.bat, usePlanSoc ? t("legendPlanSoc") : t("legendSoc")],
    [COLORS.pv, t("legendPv")],
    [COLORS.house, t("legendHouse")],
    [COLORS.gridIn, t("legendImport")],
    [COLORS.gridOut, t("legendFeed")],
  ];
  const socMin = usePlanSoc ? Math.min(...planSoc!.map((p) => p[1])) : n(a.min_soc);
  const socMax = usePlanSoc ? Math.max(...planSoc!.map((p) => p[1])) : n(a.max_soc);
  const stat = (label: string, value: TemplateResult | string) =>
    html`<div class="card stat"><h3>${label}</h3><div class="v">${value}</div></div>`;

  return html`
    <div class="card">
      <div class="chart-head">
        <div class="grow">
          <h3>${t(usePlanSoc ? "chartTitlePlan" : "chartTitle")}</h3>
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
        .options=${memo("forecast", [c.theme, st(c, E.trajectory), st(c, E.plan), st(c, E.targetSoc)?.state, c.ist, c.showIst, c.fmt.loc], () =>
          forecastOptions({
            traj,
            targetSoc: num(st(c, E.targetSoc)),
            planSoc: usePlanSoc ? planSoc : undefined,
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
      ${stat(t("statMinMax"), html`${Math.round(socMin ?? 0)}<small>%</small> / ${Math.round(socMax ?? 0)}<small>%</small>`)}
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

const planRow = (label: string, value: string, color?: string) =>
  html`<div class="row"><span>${label}</span><b style=${color ? `color:${color}` : ""}>${value}</b></div>`;

/** Inputs the planner used — explains empty charts and missing overnight charge. */
function planDiagRows(c: Ctx, a: Record<string, unknown>): TemplateResult | typeof nothing {
  const { t } = c.i18n;
  const { fmt } = c;
  const floor = n(a.floor_pct);
  const ceiling = n(a.ceiling_pct);
  const efficiency = n(a.efficiency);
  const spread = n(a.min_spread);
  const wear = n(a.wear_eur_per_kwh);
  const safety = n(a.safety_factor);
  if (
    floor === undefined &&
    ceiling === undefined &&
    efficiency === undefined &&
    spread === undefined
  ) {
    return nothing;
  }
  return html`<div class="plan-diag">
    <h4>${t("planDiag")}</h4>
    ${floor !== undefined ? planRow(t("planFloor"), `${fmt.n(floor, 0)} %`) : nothing}
    ${ceiling !== undefined ? planRow(t("planCeiling"), `${fmt.n(ceiling, 0)} %`) : nothing}
    ${efficiency !== undefined ? planRow(t("planEfficiency"), fmt.n(efficiency, 2)) : nothing}
    ${spread !== undefined ? planRow(t("planMinSpread"), `${fmt.n(spread * 100, 1)} ct/kWh`) : nothing}
    ${wear !== undefined ? planRow(t("planWear"), `${fmt.n(wear, 3)} €/kWh`) : nothing}
    ${safety !== undefined ? planRow(t("planSafety"), fmt.n(safety, 2)) : nothing}
  </div>`;
}

export function planView(c: Ctx): TemplateResult {
  const { t } = c.i18n;
  const a = attrs(c, E.plan);
  const slots = parseSlots(a.plan_slots);
  const strategy = strategyOf(c.hass);
  const controls = planControls({ ...c, priceSensor: c.options.ready ? !!c.options.options.price_sensor : undefined });
  const diag = planDiagRows(c, a);
  if (!slots.length) {
    const kind = planEmptyKind(strategy, a);
    const detail = typeof a.message === "string" && a.message && kind !== "computing" ? a.message : "";
    return html`<div class="card">
      <div class="empty plan-empty ${kind === "computing" ? "busy" : ""}" role="status">
        ${kind === "computing" ? html`<span class="spinner" aria-hidden="true"></span>` : nothing}
        <p>${t(PLAN_EMPTY_KEY[kind])}</p>
        ${detail ? html`<p class="sub">${detail}</p>` : nothing}
      </div>
      ${diag}
    </div>${controls}`;
  }
  const ext = priceExtremes(slots);
  const legend: [string, string][] = [
    [COLORS.gridOut, t("legendCharge")],
    [COLORS.pv, t("legendHold")],
    [COLORS.bat, t("legendRelease")],
  ];
  const known = typeof a.known_until === "string" ? c.fmt.dayTime(a.known_until) : "–";
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
          ${planRow(t("planStrategy"), strategy ? c.i18n.option(strategy) : "–")}
          ${planRow(t("planGridCharge"), `${c.fmt.n(n(a.total_grid_charge_kwh), 2)} kWh`)}
          ${planRow(t("planSaving"), `${c.fmt.n(n(a.expected_saving_eur), 2)} €`, "var(--ok)")}
          ${ext ? planRow(t("planCheapest"), slotText(ext.min)) : nothing}
          ${ext ? planRow(t("planMostExpensive"), slotText(ext.max)) : nothing}
          ${planRow(t("planKnownUntil"), known)}
        </div>
        ${diag}
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

function batteryCtrlMeta(c: Ctx, powerValue: number, reserveValue: number): string {
  const { t } = c.i18n;
  const parts: string[] = [];
  if (isOn(st(c, E.forceDischarge))) parts.push(t("controlsForceOn", { v: c.fmt.w(powerValue) }));
  if (isOn(st(c, E.fixedReserve))) parts.push(t("controlsReserveOn", { v: Math.round(reserveValue) }));
  if (isOn(st(c, E.ctrlAuto))) parts.push(autoSummary(c).text);
  return parts.length ? parts.join(" · ") : t("batteryCtrlIdle");
}

/** Overlay from the battery card: forced discharge, reserve, and auto strategy. */
export function batteryControlOverlay(c: Ctx): TemplateResult {
  const { t } = c.i18n;
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
  const enabled = isOn(st(c, E.ctrlAuto));
  const a = attrs(c, E.autoStrategy);
  const select = st(c, E.selAuto);
  const options = Array.isArray(select?.attributes.options) ? (select.attributes.options as string[]) : [];
  const saving = num(st(c, E.autoSaving));
  const ran = typeof a.last_run === "string";
  const cap = autoCapText(c);
  const summary = autoSummary(c);
  const autoDetail = !enabled
    ? nothing
    : a.fallback === true
      ? html`<p class="sub">${t("autoFallback")}</p>`
      : !ran
        ? nothing
        : html`<p class="sub">${cap ?? t("autoNone")}</p>`;
  const toggle = (id: string, label: string) => html`<button
    class="switch ${isOn(st(c, id)) ? "on" : ""}"
    role="switch"
    aria-checked=${isOn(st(c, id))}
    aria-label=${label}
    ?disabled=${!st(c, id) || c.pending.has(id)}
    @click=${() => c.onToggle(id)}
  ></button>`;

  return html`
    <div class="scrim open hist-scrim" @click=${() => c.onCloseBatteryCtrl()}></div>
    <aside class="overlay battery-ctrl" role="dialog" aria-modal="true" aria-label=${t("batteryCtrlTitle")} ?inert=${!c.batteryCtrlOpen}>
      <div class="sheet-head">
        <div class="grow">
          <h2>${t("batteryCtrlTitle")}</h2>
          <div class="sub">${t("batteryCtrlSub")}</div>
        </div>
        <button class="btn" @click=${() => c.onCloseBatteryCtrl()}>${t("close")}</button>
      </div>
      <div class="battery-ctrl-body">
        <section class="battery-ctrl-block">
          <div class="force">
            <div class="txt"><b>${t("forceTitle")}</b><span>${t("ctrlForcePower", { v: c.fmt.w(powerValue) })}</span></div>
            ${toggle(E.forceDischarge, t("forceTitle"))}
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
        </section>
        <section class="battery-ctrl-block">
          <div class="force">
            <div class="txt"><b>${t("fixedReserve")}</b><span>${t("ctrlReserveSoc", { v: Math.round(reserveValue) })}</span></div>
            ${toggle(E.fixedReserve, t("fixedReserve"))}
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
        </section>
        <section class="battery-ctrl-block">
          <div class="force">
            <div class="txt"><b>${t("autoTitle")}</b><span class="grip-state ${summary.tone}">${summary.text}</span></div>
            ${toggle(E.ctrlAuto, t("autoTitle"))}
          </div>
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
          ${autoDetail}
          <p class="sub">${t("autoLiveHint")}</p>
        </section>
      </div>
    </aside>
  `;
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
