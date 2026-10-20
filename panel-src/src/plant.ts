import { html, nothing, type TemplateResult } from "lit";
import { ref } from "lit/directives/ref.js";
import { batteryFlowFromAmps, batteryGlyph } from "./battery-glyph";
import "./maestro-chart";
import { phaseHistoryOptions } from "./charts";
import { isOn, num, plant, type HassEntity } from "./entities";
import type { Fmt } from "./format";
import type { I18n, Key } from "./i18n";
import { memo } from "./memo";
import { sliderField } from "./slider-field";
import type { Point } from "./transform";

type T = I18n["t"];

const blank = (state: string | undefined): boolean =>
  !state || state === "unknown" || state === "unavailable";

/** RSCP reports a tiny denormal instead of 0 for some percentages. */
export function formatPlant(entity: HassEntity | undefined, fmt: Fmt): string {
  if (!entity || blank(entity.state)) return "–";
  const raw = Number.parseFloat(entity.state);
  if (!Number.isFinite(raw)) return entity.state;
  const unit = typeof entity.attributes.unit_of_measurement === "string" ? entity.attributes.unit_of_measurement : "";
  if (unit === "%") return `${fmt.n(Math.abs(raw) < 0.05 ? 0 : raw, 0)} %`;
  if (unit === "W") {
    const sign = raw < 0 ? "−" : "";
    return sign + fmt.w(raw);
  }
  const digits = unit === "kW" || unit === "kWh" || unit === "A" || unit === "V" || unit === "°C" ? 1 : 0;
  return unit ? `${fmt.n(raw, digits)} ${unit}` : fmt.n(raw, 0);
}

/** Finite sensor value. Percentages below 0.05 become 0, matching formatPlant. */
export function plantValue(entity: HassEntity | undefined): number | undefined {
  if (!entity || blank(entity.state)) return undefined;
  const raw = Number.parseFloat(entity.state);
  if (!Number.isFinite(raw)) return undefined;
  const unit = typeof entity.attributes.unit_of_measurement === "string" ? entity.attributes.unit_of_measurement : "";
  if (unit === "%" && Math.abs(raw) < 0.05) return 0;
  return raw;
}

/** Same quantity in kW. Watts are scaled; other units are left as reported. */
export function plantKw(entity: HassEntity | undefined): number | undefined {
  const raw = plantValue(entity);
  if (raw === undefined) return undefined;
  const unit = typeof entity?.attributes.unit_of_measurement === "string" ? entity.attributes.unit_of_measurement : "";
  return unit === "W" ? raw / 1000 : raw;
}

/**
 * Fill of one pack against an equal share of the installed capacity.
 * Without a capacity there is no honest scale, so the battery stays an outline.
 */
const ERROR_WINDOW_MS = 24 * 60 * 60 * 1000;

/**
 * Newest saved RSCP message, when it was stored within the last day.
 * Older history is not a current fault. E3DC does not expose live diagnostics.
 */
export function currentError(entity: HassEntity | undefined, now = Date.now()): string | undefined {
  const items = entity?.attributes.items;
  if (!Array.isArray(items) || items.length === 0) return undefined;
  const latest = items[0];
  if (!latest || typeof latest !== "object") return undefined;
  const time = (latest as { time?: unknown }).time;
  if (typeof time !== "number" || now - time > ERROR_WINDOW_MS) return undefined;
  const message = entity?.attributes.latest_message;
  return typeof message === "string" && message.trim() ? message.trim() : undefined;
}

/** Cell colour from the device-reported state of health. */
export function cellTone(soh: number | undefined): string {
  if (soh === undefined || !Number.isFinite(soh)) return "idle";
  if (soh >= 90) return "soh-good";
  if (soh >= 70) return "soh-mid";
  return "soh-low";
}

export function packFill(energy: number | undefined, capacity: number | undefined, count: number): number | undefined {
  if (energy === undefined || !Number.isFinite(energy) || energy < 0) return undefined;
  if (capacity === undefined || !(capacity > 0) || count < 1) return undefined;
  return Math.min(100, (energy / (capacity / count)) * 100);
}

const MODES: Record<string, Key> = {
  "0": "plantMode0",
  "1": "plantMode1",
  "2": "plantMode2",
  "3": "plantMode3",
  "4": "plantMode4",
};

export function modeLabel(state: string | undefined, t: T): string {
  if (!state || state === "unknown" || state === "unavailable") return "–";
  const key = MODES[state];
  return key ? t(key) : state;
}

const flagLabel = (entity: HassEntity | undefined, t: T): string => {
  if (!entity || blank(entity.state)) return "–";
  if (entity.state === "on") return t("plantOn");
  if (entity.state === "off") return t("plantOff");
  return entity.state;
};

const RING_R = 46;
const RING_C = 2 * Math.PI * RING_R;

interface Row {
  label: string;
  value: string;
}

const shown = (rows: Row[]): TemplateResult | typeof nothing =>
  rows.length
    ? html`<div class="card"><div class="rows">${rows.map((row) => html`<div class="row"><span>${row.label}</span><b>${row.value}</b></div>`)}</div></div>`
    : nothing;

export const PLANT_ROOMS = ["grid", "battery", "pv", "wallbox", "controls"] as const;
export type PlantRoom = (typeof PLANT_ROOMS)[number];

const ROOM_COPY: Record<PlantRoom, { title: Key; hint: Key; icon: string }> = {
  grid: {
    title: "plantRoomGrid",
    hint: "plantRoomGridHint",
    icon: '<path d="M4 8h16M4 16h16"/><path d="M8 4v16M16 4v16"/>',
  },
  battery: {
    title: "plantRoomBattery",
    hint: "plantRoomBatteryHint",
    icon: '<rect x="7" y="6" width="10" height="15" rx="2"/><path d="M10 4h4"/>',
  },
  pv: {
    title: "plantRoomPv",
    hint: "plantRoomPvHint",
    icon: '<circle cx="12" cy="12" r="4"/><path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21"/>',
  },
  wallbox: {
    title: "plantRoomWallbox",
    hint: "plantRoomWallboxHint",
    icon: '<path d="M7 17V7a2 2 0 0 1 2-2h4l2 3h2a2 2 0 0 1 2 2v7"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/>',
  },
  controls: {
    title: "plantRoomControls",
    hint: "plantRoomControlsHint",
    icon: '<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="2"/><circle cx="15" cy="17" r="2"/>',
  },
};

export const isPlantRoom = (id: string | undefined): id is PlantRoom =>
  !!id && (PLANT_ROOMS as readonly string[]).includes(id);

export const plantHeading = (id: string | undefined): { title: Key; hint: Key } | undefined =>
  isPlantRoom(id) ? ROOM_COPY[id] : undefined;

export interface PlantCtx {
  hass: { states: Record<string, HassEntity | undefined> };
  i18n: I18n;
  fmt: Fmt;
  collapsed: ReadonlySet<string>;
  onToggleGroup: (id: string) => void;
  groupId?: string;
  onOpenRoom: (id: string) => void;
  pending: ReadonlySet<string>;
  onToggle: (id: string) => void;
  onNumber: (id: string, value: number) => void;
  onPress: (id: string) => void;
  phasePoints?: Readonly<Record<string, Point[]>>;
  phaseHistory?: "idle" | "loading" | "ready" | "error";
  theme?: string;
}

const ent = (c: PlantCtx, id: string | undefined): HassEntity | undefined => (id ? c.hass.states[id] : undefined);

const metric = (c: PlantCtx, key: string): string => formatPlant(ent(c, plant.entities[key]), c.fmt);

const flag = (c: PlantCtx, key: string): string => flagLabel(ent(c, plant.entities[key]), c.i18n.t);

const has = (key: string): boolean => key in plant.entities;

const gauge = (label: string, value: string, pct: number | undefined, kind: string): TemplateResult => {
  const shownPct = pct === undefined ? 0 : Math.max(0, Math.min(100, pct));
  const dash = (shownPct / 100) * RING_C;
  return html`<div class="gauge ${kind}">
    <div class="gauge-face">
      <svg viewBox="0 0 120 120" role="img" aria-label="${label}: ${value}">
        <circle class="gauge-track" cx="60" cy="60" r="${RING_R}"></circle>
        <circle class="gauge-arc" cx="60" cy="60" r="${RING_R}" stroke-dasharray="${dash} ${RING_C}"></circle>
      </svg>
      <b>${value}</b>
    </div>
    <span>${label}</span>
  </div>`;
};

const flowOf = batteryFlowFromAmps;

const battery = (label: string, level: number | undefined, flow: string, mini = false): TemplateResult =>
  batteryGlyph(label, level, flow, { mini });

const bars = (
  rows: { label: string; value: string; pct: number; cls: string }[],
): TemplateResult | typeof nothing =>
  rows.length
    ? html`<div class="card budget">${rows.map(
        (row) => html`<div class="budget-row">
          <span>${row.label}</span>
          <div class="track"><i class="${row.cls}" style="width:${Math.max(0, Math.min(100, row.pct))}%"></i></div>
          <b>${row.value}</b>
        </div>`,
      )}</div>`
    : nothing;

export function plantView(c: PlantCtx): TemplateResult {
  const { t } = c.i18n;
  const any = Object.keys(plant.entities).length > 0 || plant.packs.length > 0 || plant.wallboxes.length > 0;
  if (!any) return html`<p class="empty">${t("plantEmpty")}</p>`;

  const numberRows: Row[] = [
    has("powerValue") ? { label: t("plantPower"), value: metric(c, "powerValue") } : null,
    has("manualEnergy") ? { label: t("plantManualEnergy"), value: metric(c, "manualEnergy") } : null,
  ].filter((row): row is Row => row !== null);

  const limitKeys = [
    { key: "limitCharge", label: t("plantLimitCharge"), cls: "bat" },
    { key: "limitDischarge", label: t("plantLimitDischarge"), cls: "warn" },
    { key: "limitDischargeMin", label: t("plantLimitMin"), cls: "muted" },
  ] as const;
  const limitKw = limitKeys.map((item) => ({ ...item, kw: has(item.key) ? plantKw(ent(c, plant.entities[item.key])) : undefined }));
  const limitMax = Math.max(0, ...limitKw.map((item) => Math.abs(item.kw ?? 0)));
  const limitChart = bars(
    limitKw
      .filter((item): item is typeof item & { kw: number } => item.kw !== undefined)
      .map((item) => ({
        label: item.label,
        value: metric(c, item.key),
        pct: limitMax > 0 ? (Math.abs(item.kw) / limitMax) * 100 : 0,
        cls: item.cls,
      })),
  );

  const flagKeys: { key: string; label: Key; warn?: boolean }[] = [
    { key: "limitsOn", label: "plantLimits" },
    { key: "manualCharge", label: "plantManual" },
    { key: "pvDerated", label: "plantDerated", warn: true },
    { key: "emergencyPower", label: "plantEmergency", warn: true },
    { key: "emergencyReserve", label: "plantReserveHit" },
    { key: "rescueBattery", label: "plantReserveOn" },
    { key: "weather", label: "plantWeather" },
    { key: "weatherWait", label: "plantWeatherWait" },
  ];
  const flagChips = flagKeys.filter((item) => has(item.key));

  const phaseKw = (key: string): number | undefined => (has(key) ? plantKw(ent(c, plant.entities[key])) : undefined);
  const phaseChart = (keys: readonly [string, string, string]): TemplateResult | typeof nothing => {
    const ids = keys.map((key) => plant.entities[key]).filter((id): id is string => !!id);
    if (!ids.length) return nothing;
    const series = keys.flatMap((key, index) => {
      const id = plant.entities[key];
      const points = id ? c.phasePoints?.[id] : undefined;
      return points?.length ? [{ name: `L${index + 1}`, points }] : [];
    });
    const state = c.phaseHistory ?? "idle";
    if (!series.length && state === "error") return html`<p class="err">${t("historyFailed")}</p>`;
    if (!series.length && state !== "ready") return html`<p class="hint">${t("loading")}</p>`;
    if (!series.length) return html`<p class="hint">${t("historyEmpty")}</p>`;
    const stamp = series.map((item) => item.points[item.points.length - 1]?.[0] ?? 0).join(",");
    const swatches = ["var(--accent)", "var(--house)", "var(--pv)"];
    return html`<div class="phase-legend">
        ${series.map((item, index) => html`<span style="--swatch:${swatches[index] ?? swatches[0]}"><i></i>${item.name}</span>`)}
      </div>
      <maestro-chart
        class="phase-chart"
        .options=${memo(`phase-${ids.join(",")}`, [c.theme, c.fmt.loc, stamp], () => phaseHistoryOptions(series, c.fmt))}
      ></maestro-chart>`;
  };
  const phaseGauges = (cls: string, label: string, keys: readonly [string, string, string]): TemplateResult | typeof nothing => {
    if (!keys.some(has)) return nothing;
    const max = Math.max(0.001, ...keys.map((key) => Math.abs(phaseKw(key) ?? 0)));
    return html`<div class="card phase-gauges">
      <h3>${label}</h3>
      <div class="phase-gauge-row">
        ${keys.map((key, index) => {
          const kw = phaseKw(key);
          const pct = kw === undefined ? undefined : (Math.abs(kw) / max) * 100;
          const kind = `${cls}${kw !== undefined && kw < 0 ? " neg" : ""}`;
          return gauge(`L${index + 1}`, has(key) ? metric(c, key) : "–", pct, kind);
        })}
      </div>
      <div class="phase-history">
        <div class="sub">${t("historySub")}</div>
        ${phaseChart(keys)}
      </div>
    </div>`;
  };
  const housePhases = phaseGauges("house", t("plantHouse"), ["houseL1", "houseL2", "houseL3"]);
  const gridPhases = phaseGauges("grid", t("plantGrid"), ["gridL1", "gridL2", "gridL3"]);
  const pvPhases = phaseGauges("pvi", t("plantInverter"), ["pviL1", "pviL2", "pviL3"]);

  const specKeys = [
    { key: "installedPeak", label: t("plantPeak"), cls: "pv" },
    { key: "acMax", label: t("plantAc"), cls: "house" },
    { key: "chargeMax", label: t("plantSysCharge"), cls: "bat" },
    { key: "dischargeMax", label: t("plantSysDischarge"), cls: "warn" },
    { key: "deratePower", label: t("plantDeratePower"), cls: "pv" },
    { key: "extraProduction", label: t("plantExtraPv"), cls: "pv" },
    { key: "extraConsumption", label: t("plantExtraUse"), cls: "house" },
  ] as const;
  const specKw = specKeys.map((item) => ({ ...item, kw: has(item.key) ? plantKw(ent(c, plant.entities[item.key])) : undefined }));
  const specView = (keys: readonly string[]) => {
    const rows = specKw.filter((item): item is typeof item & { kw: number } => keys.includes(item.key) && item.kw !== undefined);
    const max = Math.max(0, ...rows.map((item) => Math.abs(item.kw)));
    return bars(rows.map((item) => ({ label: item.label, value: metric(c, item.key), pct: max > 0 ? (Math.abs(item.kw) / max) * 100 : 0, cls: item.cls })));
  };
  const capacity = has("batteryCapacity") ? plantValue(ent(c, plant.entities.batteryCapacity)) : undefined;

  const packCard = (name: string, entities: Record<string, string>, modules: { name: string; entities: Record<string, string> }[]) => {
    const value = (key: string) => formatPlant(ent(c, entities[key]), c.fmt);
    const num = (key: string) => plantValue(ent(c, entities[key]));
    const energy = entities.energy ? num("energy") : undefined;
    const level = packFill(energy, capacity, plant.packs.length);
    const amps = entities.current ? num("current") : undefined;
    const flow = flowOf(amps);
    const tempMin = entities.tempMin ? num("tempMin") : undefined;
    const tempMax = entities.tempMax ? num("tempMax") : undefined;
    const tempText =
      entities.tempMin && entities.tempMax
        ? `${value("tempMin")} – ${value("tempMax")}`
        : entities.tempMin
          ? value("tempMin")
          : entities.tempMax
            ? value("tempMax")
            : "";
    const tempLo = tempMin ?? tempMax;
    const tempHi = tempMax ?? tempMin;
    const tempScale = (deg: number) => Math.max(0, Math.min(100, (deg / 50) * 100));
    const soh = entities.soh ? num("soh") : undefined;
    const title = name || t("plantPack");
    return html`<article class="card pack">
      <div class="pack-visual">
        ${battery(`${title}, ${entities.energy ? value("energy") : ""}`, level, flow)}
        ${soh !== undefined ? html`<b class="pack-soh">${value("soh")}</b><span>${t("plantSoh")}</span>` : nothing}
      </div>
      <div class="pack-stats">
        <h3>${title}</h3>
        ${entities.energy ? html`<div class="pack-energy">${value("energy")}</div><div class="pack-share">${level === undefined ? t("plantEnergy") : t("plantShare")}</div>` : nothing}
        <div class="pack-meta">
          ${entities.current ? html`<div><span>${t("plantCurrent")}</span><b class="${flow}">${value("current")}</b></div>` : nothing}
          ${entities.voltage ? html`<div><span>${t("plantVoltage")}</span><b>${value("voltage")}</b></div>` : nothing}
          ${entities.cycles ? html`<div><span>${t("plantCycles")}</span><b>${value("cycles")}</b></div>` : nothing}
        </div>
        ${tempText
          ? html`<div class="temp">
              <div class="temp-top"><span>${t("plantTemp")}</span><b>${tempText}</b></div>
              ${tempLo !== undefined && tempHi !== undefined
                ? html`<div class="temp-track"><i style="left:${tempScale(Math.min(tempLo, tempHi))}%;width:${Math.max(4, tempScale(Math.max(tempLo, tempHi)) - tempScale(Math.min(tempLo, tempHi)))}%"></i></div>`
                : nothing}
            </div>`
          : nothing}
      </div>
      ${modules.length
        ? html`<div class="cells">
            <span class="cells-label">${t("plantCells")}</span>
            ${modules.map((mod) => {
              const soh = plantValue(ent(c, mod.entities.sohReported));
              const text = formatPlant(ent(c, mod.entities.sohReported), c.fmt);
              return html`<div class="cell">
                ${battery(`${mod.name}, ${text}`, soh, cellTone(soh), true)}
                <b>${text}</b>
                <span>${mod.name || t("plantCell")}</span>
              </div>`;
            })}
          </div>`
        : nothing}
    </article>`;
  };

  const wallboxCard = (name: string, entities: Record<string, string>) => {
    const value = (key: string) => formatPlant(ent(c, entities[key]), c.fmt);
    const onOff = (key: string) => flagLabel(ent(c, entities[key]), t);
    const soc = entities.soc ? plantValue(ent(c, entities.soc)) : undefined;
    const sun = entities.sun ? plantKw(ent(c, entities.sun)) : undefined;
    const net = entities.net ? plantKw(ent(c, entities.net)) : undefined;
    const mix = (sun ?? 0) + (net ?? 0);
    const rows: Row[] = [
      entities.phases ? { label: t("plantPhaseCount"), value: value("phases") } : null,
      entities.current ? { label: t("plantMaxCurrent"), value: value("current") } : null,
    ].filter((row): row is Row => row !== null);
    return html`<article class="card pack wall">
      ${soc !== undefined ? html`<div class="pack-visual">${battery(`${name || t("plantWallbox")}, ${value("soc")}`, soc, entities.charging && ent(c, entities.charging)?.state === "on" ? "charge" : "idle")}<b class="pack-soh">${value("soc")}</b><span>${t("plantCarSoc")}</span></div>` : nothing}
      <div class="pack-stats">
        ${plant.wallboxes.length > 1 ? html`<h3>${name || t("plantWallbox")}</h3>` : nothing}
        <div class="plant-flags">
          ${entities.plug ? html`<span class="chip ${ent(c, entities.plug)?.state === "on" ? "on" : ""}"><i></i>${t("plantPlug")} ${onOff("plug")}</span>` : nothing}
          ${entities.charging ? html`<span class="chip ${ent(c, entities.charging)?.state === "on" ? "on" : ""}"><i></i>${t("plantCharging")} ${onOff("charging")}</span>` : nothing}
        </div>
        ${sun !== undefined || net !== undefined
          ? html`<div class="mix" title="${t("plantSun")} ${entities.sun ? value("sun") : ""} · ${t("plantNet")} ${entities.net ? value("net") : ""}">
              ${sun !== undefined ? html`<i class="sun" style="width:${mix > 0 ? (Math.abs(sun) / mix) * 100 : 0}%"></i>` : nothing}
              ${net !== undefined ? html`<i class="net" style="width:${mix > 0 ? (Math.abs(net) / mix) * 100 : 0}%"></i>` : nothing}
            </div>
            <div class="phase-legend">
              ${entities.sun ? html`<span><i class="pvi"></i>${t("plantSun")} ${value("sun")}</span>` : nothing}
              ${entities.net ? html`<span><i class="grid"></i>${t("plantNet")} ${value("net")}</span>` : nothing}
            </div>`
          : nothing}
        ${rows.length ? html`<div class="rows">${rows.map((row) => html`<div class="row"><span>${row.label}</span><b>${row.value}</b></div>`)}</div>` : nothing}
      </div>
    </article>`;
  };

  const modeState = ent(c, plant.entities.mode)?.state;
  const chips = (keys: readonly string[]) => {
    const items = flagChips.filter((item) => keys.includes(item.key));
    return items.length
      ? html`<div class="plant-flags">${items.map((item) => {
          const on = ent(c, plant.entities[item.key])?.state === "on";
          return html`<span class="chip ${on ? (item.warn ? "warn" : "on") : ""}"><i></i>${t(item.label)}</span>`;
        })}</div>`
      : nothing;
  };
  const labelOf = (entity: HassEntity | undefined, id: string): string => {
    const name = entity?.attributes.friendly_name;
    return typeof name === "string" && name.trim() ? name.trim() : id;
  };
  const controlRow = (id: string): TemplateResult | typeof nothing => {
    const entity = ent(c, id);
    if (!entity) return nothing;
    const label = labelOf(entity, id);
    const domain = id.split(".", 1)[0];
    const locked = entity.state === "unavailable" || c.pending.has(id);
    const unit = typeof entity.attributes.unit_of_measurement === "string" ? entity.attributes.unit_of_measurement : "";
    const min = typeof entity.attributes.min === "number" ? entity.attributes.min : undefined;
    const max = typeof entity.attributes.max === "number" ? entity.attributes.max : undefined;
    const step = typeof entity.attributes.step === "number" ? entity.attributes.step : 1;
    const percent = unit === "%" || entity.attributes.mode === "slider";
    const control =
      domain === "switch"
        ? html`<button class="switch ${isOn(entity) ? "on" : ""}" role="switch" aria-checked=${isOn(entity)} aria-label=${label} ?disabled=${locked} @click=${() => c.onToggle(id)}></button>`
        : domain === "number" && percent && min !== undefined && max !== undefined
          ? sliderField({
              label,
              min,
              max,
              step,
              value: num(entity) ?? min,
              unit,
              disabled: locked,
              onCommit: (value) => c.onNumber(id, value),
            })
        : domain === "number"
          ? html`<label class="setting-num">
              <input
                type="number"
                inputmode="decimal"
                aria-label=${label}
                step=${typeof entity.attributes.step === "number" ? entity.attributes.step : "any"}
                ?disabled=${locked}
                ${ref((el: Element | undefined) => {
                  const root = el?.getRootNode();
                  const active = root instanceof ShadowRoot ? root.activeElement : null;
                  if (!(el instanceof HTMLInputElement) || el === active) return;
                  const shown = num(entity);
                  const text = shown === undefined ? "" : String(shown);
                  if (el.value !== text) el.value = text;
                })}
                @change=${(e: Event) => {
                  const value = Number.parseFloat((e.target as HTMLInputElement).value);
                  if (Number.isFinite(value)) c.onNumber(id, value);
                }}
              />
              ${typeof entity.attributes.unit_of_measurement === "string" ? html`<span>${entity.attributes.unit_of_measurement}</span>` : nothing}
            </label>`
          : domain === "button"
            ? html`<button class="btn" ?disabled=${locked} @click=${() => {
                if (window.confirm(t("plantSend"))) c.onPress(id);
              }}>${label}</button>`
            : nothing;
    return html`<div class="ctrl setting-row ${percent && domain === "number" ? "wide" : ""}"><div class="txt"><span class="name"><b>${label}</b></span></div>${control}</div>`;
  };
  const controlCard = (ids: Record<string, string> | undefined) => {
    const rows = Object.values(ids ?? {}).map((id) => controlRow(id));
    return rows.some((row) => row !== nothing) ? html`<div class="card">${rows}</div>` : nothing;
  };
  const identity = plant.identity ?? {};
  const facts = [
    identity.model ? { label: t("plantModel"), value: identity.model } : null,
    identity.serial ? { label: t("plantSerial"), value: identity.serial } : null,
    identity.firmware ? { label: t("plantFirmware"), value: identity.firmware } : null,
  ].filter((row): row is { label: string; value: string } => row !== null);
  const fault = currentError(ent(c, plant.entities.errors));
  const hero = html`<section class="card hero">
    <div class="hero-main">
      <div class="hero-mode" data-mode=${modeState ?? ""}>
        <span>${t("plantMode")}</span>
        <b>${has("mode") ? modeLabel(modeState, t) : "–"}</b>
      </div>
      <div class="hero-gauges">
        ${gauge(t("plantAutarky"), has("autarky") ? metric(c, "autarky") : "–", has("autarky") ? plantValue(ent(c, plant.entities.autarky)) : undefined, "autarky")}
        ${gauge(t("plantSelf"), has("selfConsumption") ? metric(c, "selfConsumption") : "–", has("selfConsumption") ? plantValue(ent(c, plant.entities.selfConsumption)) : undefined, "self")}
      </div>
    </div>
    ${facts.length
      ? html`<div class="hero-meta">${facts.map((fact) => html`<div><span>${fact.label}</span><b>${fact.value}</b></div>`)}</div>`
      : nothing}
    ${fault ? html`<p class="hero-fault" role="status">${t("plantFault")}: ${fault}</p>` : nothing}
  </section>`;
  const capacityRow: Row[] = has("batteryCapacity") ? [{ label: t("plantCapacity"), value: metric(c, "batteryCapacity") }] : [];
  const derateRow: Row[] = has("deratePercent") ? [{ label: t("plantDeratePct"), value: metric(c, "deratePercent") }] : [];
  const rooms: Record<PlantRoom, { show: boolean; body: TemplateResult }> = {
    grid: {
      show: housePhases !== nothing || gridPhases !== nothing || has("extraConsumption"),
      body: html`${housePhases}${gridPhases}${specView(["extraConsumption"])}`,
    },
    battery: {
      show: plant.packs.length > 0 || limitChart !== nothing || has("chargeMax") || has("dischargeMax") || has("batteryCapacity"),
      body: html`${plant.packs.length ? html`<div class="plant-packs">${plant.packs.map((pack) => packCard(pack.name, pack.entities, pack.modules ?? []))}</div>` : nothing}${chips(["manualCharge", "emergencyPower", "emergencyReserve", "rescueBattery"])}${limitChart}${specView(["chargeMax", "dischargeMax"])}${shown(capacityRow)}`,
    },
    pv: {
      show: pvPhases !== nothing || has("installedPeak") || has("acMax") || has("deratePower") || has("deratePercent") || has("extraProduction") || has("pvDerated"),
      body: html`${pvPhases}${chips(["pvDerated"])}${specView(["installedPeak", "acMax", "deratePower", "extraProduction"])}${shown(derateRow)}`,
    },
    wallbox: {
      show: plant.wallboxes.length > 0 || Object.keys(plant.controls?.wallbox ?? {}).length > 0,
      body: html`${plant.wallboxes.length ? html`<div class="plant-packs">${plant.wallboxes.map((box) => html`<div class="wall-stack">${wallboxCard(box.name, box.entities)}${controlCard(box.controls)}</div>`)}</div>` : nothing}${controlCard(plant.controls?.wallbox)}`,
    },
    controls: {
      show: Object.keys(plant.controls?.general ?? {}).length > 0 || has("mode") || numberRows.length > 0 || has("limitsOn") || has("weatherWait"),
      body: html`${controlCard(plant.controls?.general)}${chips(["limitsOn", "weatherWait"])}${shown(numberRows)}`,
    },
  };
  const open = isPlantRoom(c.groupId) ? c.groupId : undefined;
  if (open && rooms[open].show) return html`<div class="plant-body">${rooms[open].body}</div>`;

  const tiles = (Object.keys(rooms) as PlantRoom[]).filter((id) => rooms[id].show);
  return html`${hero}
    <div class="settings-tiles">
      ${tiles.map((id) => {
        const room = ROOM_COPY[id];
        return html`<button type="button" class="settings-tile" @click=${() => c.onOpenRoom(id)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" .innerHTML=${room.icon}></svg>
          <b>${t(room.title)}</b>
          <span>${t(room.hint)}</span>
        </button>`;
      })}
    </div>`;
}
