import { html, nothing, type TemplateResult } from "lit";
import { ref } from "lit/directives/ref.js";
import "./maestro-chart";
import { batteryGlyph } from "./battery-glyph";
import { wallboxDayOptions, wallboxDaysOptions } from "./charts";
import { E, isOn, num, plant, S } from "./entities";
import type { Fmt } from "./format";
import { calendarDay, energyPeriodSums, type EnergyDay } from "./history";
import type { Key, Translate } from "./i18n";
import { memo } from "./memo";
import { plantWallboxBody } from "./plant";
import type { Point } from "./transform";
import type { Ctx } from "./views";

export const WALLBOX_ICON =
  '<rect x="3" y="3" width="11" height="18" rx="2"/><path d="M9.5 7 7 11.5h3.5L8 16"/><path d="M14 9h2a2 2 0 0 1 2 2v5.5a1.5 1.5 0 0 0 3 0V8l-2-2"/>';

export type WallboxMode = "charging" | "unplugged" | "full" | "waiting" | "ready" | "idle";
const MODES: readonly WallboxMode[] = ["charging", "unplugged", "full", "waiting", "ready", "idle"];

export interface WallboxEvent {
  ts: number;
  kind: "start" | "current" | "stop" | "error" | "plug" | "unplug" | "mode_reset";
  current?: number;
  surplusW?: number;
  reason?: string;
  fromGrid?: boolean;
}

export type WallboxChargeMode = "solar" | "solar_grid" | "now" | "off";

export interface WallboxStatus {
  mode: WallboxMode;
  chargeMode: WallboxChargeMode;
  controlEnabled: boolean;
  surplusW: number;
  startW: number;
  minW: number;
  maxW: number;
  minCurrent: number;
  maxCurrent: number;
  phases: number;
  phasesSource?: "sensor" | "config";
  phasesEntity?: string;
  setCurrent?: number;
  fromGrid: boolean;
  explanation?: string;
  priorityActive: boolean;
  guardActive: boolean;
  controller: string;
  history: WallboxEvent[];
}

/** Panel-side facts the wallbox tab needs besides the status attributes. */
export interface WallboxData {
  configured: boolean;
  surplus?: Point[];
  power?: Point[];
  days?: EnergyDay[];
  soc?: number;
  plugged?: boolean;
}

const fin = (v: unknown): number | undefined => (typeof v === "number" && Number.isFinite(v) ? v : undefined);
const CHARGE_MODES = new Set<WallboxChargeMode>(["solar", "solar_grid", "now", "off"]);
const KINDS = new Set(["start", "current", "stop", "error", "plug", "unplug", "mode_reset"]);

/** Attributes of the Maestro wallbox power sensor → typed status (undefined before the first cycle). */
export function parseWallboxStatus(attrs: Record<string, unknown> | undefined): WallboxStatus | undefined {
  if (!attrs || !MODES.includes(attrs.mode as WallboxMode)) return undefined;
  const history = (Array.isArray(attrs.history) ? attrs.history : []).flatMap((raw): WallboxEvent[] => {
    const row = raw as Record<string, unknown>;
    const ts = typeof row.timestamp === "string" ? Date.parse(row.timestamp) : Number.NaN;
    if (!Number.isFinite(ts) || !KINDS.has(row.kind as string)) return [];
    return [
      {
        ts,
        kind: row.kind as WallboxEvent["kind"],
        current: fin(row.current),
        surplusW: fin(row.surplus_w),
        reason: typeof row.reason === "string" ? row.reason : undefined,
        fromGrid: row.from_grid === true,
      },
    ];
  });
  const setCurrent = fin(attrs.set_current);
  const rawMode = attrs.wallbox_mode;
  const chargeMode = typeof rawMode === "string" && CHARGE_MODES.has(rawMode as WallboxChargeMode) ? (rawMode as WallboxChargeMode) : "solar";
  const phasesSource = attrs.phases_source === "sensor" || attrs.phases_source === "config" ? attrs.phases_source : undefined;
  return {
    mode: attrs.mode as WallboxMode,
    chargeMode,
    controlEnabled: attrs.control_enabled === true,
    surplusW: fin(attrs.surplus_w) ?? 0,
    startW: fin(attrs.start_w) ?? 0,
    minW: fin(attrs.min_w) ?? 0,
    maxW: fin(attrs.max_w) ?? 0,
    minCurrent: fin(attrs.min_current) ?? 6,
    maxCurrent: fin(attrs.max_current) ?? 16,
    phases: fin(attrs.phases) ?? 1,
    phasesSource,
    phasesEntity: typeof attrs.phases_entity === "string" ? attrs.phases_entity : undefined,
    setCurrent: setCurrent && setCurrent > 0 ? setCurrent : undefined,
    fromGrid: attrs.from_grid === true,
    explanation: typeof attrs.explanation === "string" && attrs.explanation ? attrs.explanation : undefined,
    priorityActive: attrs.priority_active === true,
    guardActive: attrs.guard_active === true,
    controller: typeof attrs.controller === "string" ? attrs.controller : "e3dc",
    history,
  };
}

/** Wallbox surplus like the control loop: PV − house − battery charge (W, never negative), holding each series' last value between samples. */
export function surplusPoints(pv: readonly Point[], house: readonly Point[], battery: readonly Point[] = []): Point[] {
  const times = [...new Set([...pv, ...house, ...battery].map((p) => p[0]))].sort((a, b) => a - b);
  const out: Point[] = [];
  let i = 0;
  let j = 0;
  let k = 0;
  let pvNow: number | undefined;
  let houseNow: number | undefined;
  let batNow = 0;
  for (const ts of times) {
    while (i < pv.length && pv[i]![0] <= ts) pvNow = pv[i++]![1];
    while (j < house.length && house[j]![0] <= ts) houseNow = house[j++]![1];
    while (k < battery.length && battery[k]![0] <= ts) batNow = battery[k++]![1];
    if (pvNow !== undefined && houseNow !== undefined) out.push([ts, Math.max(0, pvNow - houseNow - Math.max(0, batNow))]);
  }
  return out;
}

const MODE_LABEL: Record<WallboxMode, Key> = {
  charging: "wbModeCharging",
  unplugged: "wbModeUnplugged",
  full: "wbModeFull",
  waiting: "wbModeWaiting",
  ready: "wbModeReady",
  idle: "wbModeIdle",
};

export const wallboxModeLabel = (mode: WallboxMode, t: Translate): string => t(MODE_LABEL[mode]);

/** One or two plain sentences: what the wallbox does right now and why. */
export function wallboxSentence(s: WallboxStatus, t: Translate, fmt: Fmt): string {
  const vars = { surplus: fmt.w(Math.max(0, s.surplusW)), start: fmt.w(s.startW), gap: fmt.w(Math.max(0, s.startW - s.surplusW)), a: s.setCurrent ?? 0 };
  let main: string;
  if (s.explanation) main = s.explanation;
  else if (s.mode === "charging") main = !s.controlEnabled ? t("wbSayChargingManual") : s.setCurrent ? t("wbSayCharging", vars) : t("wbSayChargingNoSet");
  else if (!s.controlEnabled) main = t("wbSayOff");
  else if (s.mode === "waiting") main = t("wbSayWaiting", vars);
  else if (s.mode === "ready") main = t("wbSayReady", vars);
  else if (s.mode === "full") main = t("wbSayFull");
  else if (s.mode === "unplugged") main = t("wbSayUnplugged");
  else main = s.surplusW < s.startW ? t("wbSayIdleLow", vars) : t("wbSayIdleOk", vars);
  const extra = [s.priorityActive ? t("wbSayPriority") : "", s.guardActive ? t("wbSayGuard") : ""].filter(Boolean);
  return [main, ...extra].join(" ");
}

const withReason = (base: string, reason?: string) => (reason ? `${base} ${reason}` : base);

export function wallboxEventText(e: WallboxEvent, t: Translate, fmt: Fmt): string {
  const surplus = e.surplusW !== undefined ? fmt.w(Math.max(0, e.surplusW)) : "";
  switch (e.kind) {
    case "start":
      return withReason(t("wbEvStart", { a: e.current ?? "?", surplus }), e.reason);
    case "current":
      return withReason(t("wbEvCurrent", { a: e.current ?? "?", surplus }), e.reason);
    case "stop":
      return withReason(t("wbEvStop", { surplus }), e.reason);
    case "error":
      return t("wbEvError");
    case "plug":
      return t("wbEvPlug");
    case "unplug":
      return t("wbEvUnplug");
    case "mode_reset":
      return t("wbEvModeReset");
  }
}

/** E3DC wallbox switches (e3dc_rscp); undefined when the entity is missing. */
export interface E3dcWallboxSwitches {
  sun?: boolean;
  batteryFirst?: boolean;
  batteryToCar?: boolean;
  mixedLock?: boolean;
}

/** E3DC settings that work against the Maestro wallbox control. */
export function e3dcConflicts(
  sw: E3dcWallboxSwitches,
  on: { control: boolean; priority: boolean; guard: boolean; mode?: string },
): Key[] {
  if (!on.control) return [];
  const out: Key[] = [];
  if (sw.sun) {
    if (on.mode === "now" || on.mode === "solar_grid") out.push("wbConflictSunGrid");
    else out.push("wbConflictSun");
  }
  if (on.priority && sw.batteryFirst) out.push("wbConflictBatteryFirst");
  if (on.guard && (sw.sun ? sw.batteryToCar === false : sw.mixedLock)) out.push("wbConflictDischarge");
  return out;
}

function e3dcSwitches(c: Ctx): E3dcWallboxSwitches {
  const state = (id: string | undefined) => {
    const s = id ? c.hass.states[id]?.state : undefined;
    return s === "on" ? true : s === "off" ? false : undefined;
  };
  const sys = plant.controls?.wallbox ?? {};
  const sun = plant.wallboxes.map((box) => state(box.controls?.sunMode)).find((v) => v !== undefined);
  return { sun, batteryFirst: state(sys.batteryBeforeCar), batteryToCar: state(sys.batteryToCar), mixedLock: state(sys.enforcePower) };
}

const pct = (v: number, max: number) => Math.max(0, Math.min(100, (v / max) * 100));

const QUICK = [
  { key: "wallbox_enabled", label: "wbSwControl", hint: "wbSwControlHint" },
  { key: "wallbox_priority_enabled", label: "wbSwPriority", hint: "wbSwPriorityHint" },
  { key: "wallbox_discharge_guard_enabled", label: "wbSwGuard", hint: "wbSwGuardHint" },
  { key: "wallbox_battery_to_car", label: "wbSwBatteryToCar", hint: "wbSwBatteryToCarHint" },
  { key: "wallbox_mode_reset", label: "wbSwModeReset", hint: "wbSwModeResetHint" },
] as const;

const wbInputFocused = (el: HTMLInputElement): boolean => {
  const root = el.getRootNode();
  const active = root instanceof ShadowRoot ? root.activeElement : document.activeElement;
  return active === el;
};

type RecCase = "e3dc" | "generic" | "self";

const REC_CASES: readonly { id: RecCase; title: Key; steps: readonly Key[] }[] = [
  { id: "e3dc", title: "wbRecE3dcTitle", steps: ["wbRecE3dc1", "wbRecE3dc2", "wbRecE3dc3", "wbRecE3dc4", "wbRecE3dc5"] },
  { id: "generic", title: "wbRecGenericTitle", steps: ["wbRecGeneric1", "wbRecGeneric2", "wbRecGeneric3", "wbRecGeneric4", "wbRecGeneric5", "wbRecGeneric6"] },
  { id: "self", title: "wbRecSelfTitle", steps: ["wbRecSelf1", "wbRecSelf2", "wbRecSelf3", "wbRecSelf4"] },
];

/** Welcher Fall zur Einrichtung passt: Maestro regelt nicht, E3DC-Box oder generische Box. */
export function recommendedCase(controlEnabled: boolean, controller: string): RecCase {
  if (!controlEnabled) return "self";
  return controller === "generic" ? "generic" : "e3dc";
}

/** Jeder Schritt heißt "Ort|Text": der Ort steht fett vor der Anweisung. */
function recommendations(c: Ctx, current: RecCase): TemplateResult {
  const { t } = c.i18n;
  return html`<section class="card wb-rec">
    <h3>${t("wbRecTitle")}</h3>
    <div class="sub">${t("wbRecSub")}</div>
    ${REC_CASES.map(
      ({ id, title, steps }) => html`<details class="wb-rec-case" ?open=${id === current}>
        <summary>${t(title)}</summary>
        <ol>
          ${steps.map((key) => {
            const [where, ...rest] = t(key).split("|");
            return html`<li><b>${where}</b><span>${rest.join("|")}</span></li>`;
          })}
        </ol>
      </details>`,
    )}
  </section>`;
}

function numberRow(
  c: Ctx,
  id: string | undefined,
  label: Key,
  hint: Key,
  unit: string,
  fallback: { min: number; max: number; step: number },
): TemplateResult | typeof nothing {
  const entity = id ? c.hass.states[id] : undefined;
  if (!id || !entity) return nothing;
  const { t } = c.i18n;
  const attr = (k: "min" | "max" | "step") => (typeof entity.attributes[k] === "number" ? (entity.attributes[k] as number) : fallback[k]);
  const shown = num(entity);
  const text = shown === undefined ? "" : String(shown);
  return html`<div class="ctrl setting-row stack">
    <div class="txt"><span class="name"><b>${t(label)}</b></span><span>${t(hint)}</span></div>
    <label class="setting-num">
      <input
        type="number"
        inputmode="decimal"
        aria-label=${t(label)}
        min=${attr("min")}
        max=${attr("max")}
        step=${attr("step")}
        ?disabled=${entity.state === "unavailable" || c.pending.has(id)}
        ${ref((el) => {
          if (el instanceof HTMLInputElement && !wbInputFocused(el) && el.value !== text) el.value = text;
        })}
        @change=${(e: Event) => {
          const value = Number.parseFloat((e.target as HTMLInputElement).value);
          if (Number.isFinite(value)) c.onNumber(id, value);
        }}
      />
      <span>${unit}</span>
    </label>
  </div>`;
}

export function wallboxView(c: Ctx): TemplateResult {
  const { t } = c.i18n;
  const { fmt } = c;
  const data: WallboxData = c.wallbox ?? { configured: false };
  const status = parseWallboxStatus(c.hass.states[E.wallboxPower]?.attributes);
  const power = Math.max(0, num(c.hass.states[E.wallboxPower]) ?? 0);
  const todayKwh = num(c.hass.states[E.wallboxEnergy]);

  const setup = data.configured
    ? nothing
    : html`<section class="card wb-setup">
        <div class="wb-setup-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" .innerHTML=${WALLBOX_ICON}></svg></div>
        <div>
          <h2>${t("wbSetupTitle")}</h2>
          <p class="sub">${t("wbSetupText")}</p>
        </div>
        <button type="button" class="btn primary" @click=${() => c.onOpenGroup("loads")}>${t("wbSetupBtn")}</button>
      </section>`;

  const hero = status ? heroCard(c, status, power, data) : nothing;

  const chargeMode = c.hass.states[S.wallbox_mode ?? ""]?.state;
  const conflicts = e3dcConflicts(e3dcSwitches(c), {
    control: isOn(c.hass.states[S.wallbox_enabled ?? ""]),
    priority: isOn(c.hass.states[S.wallbox_priority_enabled ?? ""]),
    guard: isOn(c.hass.states[S.wallbox_discharge_guard_enabled ?? ""]),
    mode: chargeMode,
  });
  const conflict = conflicts.length
    ? html`<section class="card wb-setup wb-conflict" role="note">
        <div class="wb-setup-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 2 20h20L12 3z"/><path d="M12 10v4"/><path d="M12 17h.01"/></svg></div>
        <div>
          <h2>${t("wbConflictTitle")}</h2>
          ${conflicts.map((key) => html`<p class="sub">${t(key)}</p>`)}
        </div>
      </section>`
    : nothing;

  const modeId = S.wallbox_mode;
  const modeEntity = modeId ? c.hass.states[modeId] : undefined;
  const modeOptions = Array.isArray(modeEntity?.attributes.options) ? (modeEntity.attributes.options as string[]) : [];
  const showPrice = chargeMode === "solar_grid" || status?.chargeMode === "solar_grid";

  const switches = html`<div class="card wb-switches">
    <div class="card-head">
      <div><h3>${t("wbSwitches")}</h3><div class="sub">${t("wbSwitchesSub")}</div></div>
      <button type="button" class="btn ghost" @click=${() => c.onOpenGroup("loads")}>${t("wbAllSettings")}</button>
    </div>
    ${modeId && modeEntity
      ? html`<div class="ctrl setting-row stack">
          <div class="txt"><span class="name"><b>${t("wbSwChargeMode")}</b></span><span>${t("wbSwChargeModeHint")}</span></div>
          <div class="seg wb-modes" role="group" aria-label=${t("wbSwChargeMode")}>
            ${modeOptions.map((option) => {
              const active = option === modeEntity.state;
              return html`<button
                type="button"
                class=${active ? "on" : ""}
                aria-pressed=${active}
                ?disabled=${modeEntity.state === "unavailable" || c.pending.has(modeId)}
                @click=${() => active || c.onSelect(modeId, option)}
              >${c.i18n.option(option)}</button>`;
            })}
          </div>
        </div>`
      : nothing}
    ${showPrice ? numberRow(c, S.wallbox_max_price, "wbSwMaxPrice", "wbSwMaxPriceHint", "€/kWh", { min: 0, max: 1, step: 0.005 }) : nothing}
    ${QUICK.map(({ key, label, hint }) => {
      const id = S[key];
      const entity = id ? c.hass.states[id] : undefined;
      if (!id || !entity) return nothing;
      const locked = entity.state === "unavailable" || c.pending.has(id);
      return html`<div class="ctrl setting-row">
          <div class="txt"><span class="name"><b>${t(label)}</b></span><span>${t(hint)}</span></div>
          <button class="switch ${isOn(entity) ? "on" : ""}" role="switch" aria-checked=${isOn(entity)} aria-label=${t(label)} ?disabled=${locked} @click=${() => c.onToggle(id)}></button>
        </div>
        ${key === "wallbox_priority_enabled" && isOn(entity)
          ? numberRow(c, S.wallbox_priority_min_soc, "wbSwPrioritySoc", "wbSwPrioritySocHint", "%", { min: 0, max: 100, step: 5 })
          : nothing}`;
    })}
  </div>`;

  const surplus = data.surplus ?? [];
  const powerPts = data.power ?? [];
  const startW = status?.controlEnabled ? status.startW : undefined;
  const dayChart = html`<div class="card wb-day">
    <h3>${t("wbDayTitle")}</h3>
    <div class="sub">${t("wbDaySub")}</div>
    ${surplus.length || powerPts.length
      ? html`<maestro-chart
          .options=${memo("wb-day", [c.theme, surplus, powerPts, startW], () =>
            wallboxDayOptions({ surplus, wallbox: powerPts, startW, names: [t("wbSurplus"), t("wbPower"), t("wbStartLine")], fmt }),
          )}
        ></maestro-chart>`
      : html`<p class="empty">${t("wbNoHistory")}</p>`}
  </div>`;

  const sums = energyPeriodSums(data.days ?? [], todayKwh);
  const kpi = (label: Key, value: number | undefined) =>
    html`<div class="card kpi"><h3>${t(label)}</h3><div class="v">${fmt.n(value)}<small>kWh</small></div></div>`;
  const today = calendarDay();
  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);
  const bars = (data.days ?? [])
    .filter((d) => d.ts >= monthStart.getTime() && d.day !== today)
    .concat(todayKwh !== undefined ? [{ day: today, ts: new Date().setHours(0, 0, 0, 0), kwh: todayKwh }] : []);
  const energy = html`<section class="wb-energy">
    <div class="grid kpis">
      ${kpi("wbKpiToday", todayKwh)}${kpi("wbKpiWeek", data.days ? sums.week : undefined)}${kpi("wbKpiMonth", data.days ? sums.month : undefined)}${kpi("wbKpiYear", data.days ? sums.year : undefined)}
    </div>
    ${bars.length > 1
      ? html`<div class="card"><h3>${t("wbDaysTitle")}</h3><maestro-chart .options=${memo("wb-days", [c.theme, data.days, todayKwh], () => wallboxDaysOptions(bars, t("wbEnergy"), fmt))}></maestro-chart></div>`
      : nothing}
  </section>`;

  const events = status?.history ?? [];
  const log = html`<div class="card wb-log">
    <h3>${t("wbLogTitle")}</h3>
    <div class="sub">${t("wbLogSub")}</div>
    ${events.length
      ? html`<div class="timeline">${events.map(
          (e) => html`<div class="tl-item" data-kind=${e.kind}>
            <div class="tl-time">${calendarDay(new Date(e.ts)) === today ? fmt.time(e.ts) : fmt.dayTime(e.ts)}</div>
            <div class="tl-reason">${wallboxEventText(e, t, fmt)}</div>
          </div>`,
        )}</div>`
      : html`<p class="empty">${t("wbLogEmpty")}</p>`}
  </div>`;

  const devices = plantWallboxBody(c);
  const rec = data.configured ? recommendations(c, recommendedCase(status?.controlEnabled ?? false, status?.controller ?? "e3dc")) : nothing;
  return html`${setup}${hero}${conflict}
    <div class="grid wb-row">${dayChart}${switches}</div>
    ${rec}
    ${energy}
    <div class="grid wb-row">${log}${devices === nothing
      ? nothing
      : html`<div class="wb-devices"><h3 class="wb-devices-title">${t("wbDevices")}</h3><div class="plant-body">${devices}</div></div>`}</div>`;
}

function heroCard(c: Ctx, s: WallboxStatus, power: number, data: WallboxData): TemplateResult {
  const { t } = c.i18n;
  const { fmt } = c;
  const plugged = data.plugged;
  const scaleMax = Math.max(s.maxW, s.startW, s.surplusW, power, 1000) * 1.1;
  const amps = Array.from({ length: Math.max(0, Math.round(s.maxCurrent - s.minCurrent) + 1) }, (_, i) => s.minCurrent + i);
  const active = s.mode === "charging" && s.setCurrent !== undefined;
  const phaseChip =
    s.phasesSource === "sensor"
      ? t("wbPhasesSensor", { n: s.phases })
      : s.phasesSource === "config"
        ? t("wbPhasesFixed", { n: s.phases })
        : t("wbPhases", { n: s.phases });
  const chips: [string, boolean, "on" | "warn" | ""][] = [
    [plugged === undefined ? t("wbPlugUnknown") : plugged ? t("wbPlugged") : t("wbUnplugged"), plugged === true, plugged ? "on" : ""],
    [phaseChip, false, ""],
    [s.controller === "generic" ? t("wbCtrlGeneric") : t("wbCtrlE3dc"), false, ""],
    [t("wbChipFromGrid"), s.fromGrid, "warn"],
    [t("wbChipPriority"), s.priorityActive, "on"],
    [t("wbChipGuard"), s.guardActive, "warn"],
  ];
  return html`<section class="card hero wb-hero" data-mode=${s.mode}>
    <div class="wb-hero-main">
      <div class="wb-state">
        <span class="wb-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" .innerHTML=${WALLBOX_ICON}></svg></span>
        <div class="hero-mode">
          <span>${s.controlEnabled ? t("wbControlOn") : t("wbControlOff")}</span>
          <b>${wallboxModeLabel(s.mode, t)}</b>
          <p class="wb-sentence">${wallboxSentence(s, t, fmt)}</p>
        </div>
      </div>
      <div class="wb-power">
        <div><span>${t("wbPower")}</span><b>${fmt.w(power)}</b></div>
        ${data.soc !== undefined
          ? html`<div class="wb-car">${batteryGlyph(t("plantCarSoc"), data.soc, s.mode === "charging" ? "charge" : "idle", { mini: true })}<div><span>${t("plantCarSoc")}</span><b>${fmt.n(data.soc, 0)} %</b></div></div>`
          : nothing}
      </div>
    </div>
    <div class="wb-scale-wrap">
      <div class="wb-scale" role="img" aria-label=${`${t("wbSurplus")} ${fmt.w(s.surplusW)}, ${t("wbStartLine")} ${fmt.w(s.startW)}`}>
        <i class="band" style="left:${pct(s.minW, scaleMax)}%;width:${pct(s.maxW - s.minW, scaleMax)}%"></i>
        <i class="surplus" style="width:${pct(s.surplusW, scaleMax)}%"></i>
        <i class="power" style="width:${pct(power, scaleMax)}%"></i>
        <b class="start" style="left:${pct(s.startW, scaleMax)}%"><span>${t("wbStartLine")} ${fmt.w(s.startW)}</span></b>
      </div>
      <div class="phase-legend">
        <span><i class="pvi"></i>${t("wbSurplus")} ${fmt.w(Math.max(0, s.surplusW))}</span>
        <span><i class="wb"></i>${t("wbPower")} ${fmt.w(power)}</span>
        <span><i class="band"></i>${t("wbWindow", { min: fmt.w(s.minW), max: fmt.w(s.maxW) })}</span>
      </div>
    </div>
    <div class="wb-amps">
      <span class="wb-amps-label">${t("wbCurrent")}</span>
      <div class="wb-amp-row" role="img" aria-label=${active ? `${s.setCurrent} A` : t("wbCurrentOff")}>
        ${amps.map((a) => html`<i class=${active && a <= (s.setCurrent ?? 0) ? "on" : ""}></i>`)}
      </div>
      <b>${active ? `${s.setCurrent} A` : t("wbCurrentOff")}</b>
      <span class="sub">${t("wbCurrentRange", { min: s.minCurrent, max: s.maxCurrent })}</span>
    </div>
    <div class="plant-flags">
      ${chips
        .filter(([, on, tone], i) => i < 3 || (on && tone))
        .map(([label, on, tone]) => html`<span class="chip ${on ? tone : ""}"><i></i>${label}</span>`)}
    </div>
  </section>`;
}
