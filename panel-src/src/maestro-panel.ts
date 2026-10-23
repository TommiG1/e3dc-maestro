import { LitElement, html, nothing, type TemplateResult } from "lit";
import "./maestro-chart";
import type { MaestroChart } from "./maestro-chart";
import {
  friendlyName,
  guessIcon,
  includedOverflow,
  OVERFLOW_HOLD_MS,
  overflowHeld,
  consumersFromOptions,
  loadConsumers,
  MAX_CONSUMERS,
  newConsumerId,
  powerSensorChoices,
  saveConsumers,
  FLOW_CONSUMER_MIN_W,
  pluggedOf,
  socOf,
  toFlow,
  wallboxEntityIds,
  wattsOf,
  withWallboxMeta,
  WALLBOX_ENTITY,
  type Consumer,
  type ConsumerIcon,
  type ConsumerMode,
  type FlowConsumer,
} from "./consumers";
import { controlsSheet } from "./controls";
import { applyEntityMap, applyPlantMap, applySettingsMap, DEFAULT_IDS, E, isOn, num, plant, watched, type EntityKey, type EntityMap, type Hass } from "./entities";
import {
  loadExpectedSocHidden,
  loadForecastHidden,
  loadShadowImportHidden,
  loadShadowSocHidden,
  powerHistoryOptions,
  saveExpectedSocHidden,
  saveForecastHidden,
  saveShadowImportHidden,
  saveShadowSocHidden,
  useChartTheme,
  type ForecastPowerKey,
} from "./charts";
import { placeElectrons } from "./flow";
import maestroLogo from "./maestro-logo.png";
import { makeFmt, type Fmt } from "./format";
import { loadCollapsed, saveCollapsed } from "./groups";
import {
  calendarDay,
  loadBalanceDays,
  loadIst,
  loadPowerSeries,
  loadPowerSeriesMany,
  loadPowerSeriesSum,
  loadRangeSums,
  loadSparks,
  loadTimeline,
  peekLruCache,
  resolveBalanceRange,
  shiftBalanceAnchor,
  touchLruCache,
  type BalanceDay,
  type BalanceGrain,
  type IstSeries,
  type PeriodKey,
  type PulseRange,
  type SparkKey,
} from "./history";
import { memo } from "./memo";
import { makeI18n, type Key } from "./i18n";
import { pauseMenu, pauseStatus, pauseUntil } from "./pause";
import { styles } from "./styles";
import {
  loadConsumerPlacesByStyle,
  saveConsumerPlacesByStyle,
  type ConsumerPlace,
} from "./consumer-layout";
import {
  activeAlertKeys,
  alertLabelKey,
  bannerVisible,
  loadBannerHidden,
  loadDismissed,
  pruneDismissed,
  saveBannerHidden,
  saveDismissed,
  type AlertKey,
} from "./alert-banner";
import { loadBatteryStyle, saveBatteryStyle, type BatteryStyleId } from "./battery-style";
import { loadFlowStyle, saveFlowStyle, type FlowStyleId } from "./flow-style";
import {
  loadLookPrefs,
  saveLookPrefs,
  type CornersId,
  type DensityId,
  type LookPrefs,
} from "./look-prefs";
import { isDarkTheme, loadTheme, saveTheme, type ThemeId } from "./theme";
import { forecastWindow, parseTrajectory, type Point, type TimelineItem } from "./transform";

const NODE_META = {
  pv: { entity: "pv" as const, color: "#fbbf24", label: "nodePv" as const },
  pvExtra: { entity: "additionalPv" as const, color: "#f59e0b", label: "nodePvExtra" as const },
  grid: { entity: "grid" as const, color: "#f87171", label: "nodeImport" as const },
  house: { entity: "house" as const, color: "#a78bfa", label: "nodeHouse" as const },
  bat: { entity: "battery" as const, color: "#22d3ee", label: "nodeBatCharge" as const },
};
import { checkClassic, classicErrorText, createClassic, type ClassicStatus } from "./classic";
import {
  applyEnergyDashboard,
  checkEnergyDashboard,
  energyErrorText,
  type EnergyApplyMode,
  type EnergyDashboardStatus,
} from "./energy-dashboard";
import { loadSetupAck, saveSetupAck } from "./onboarding";
import { slotsFrom, type Slot } from "./options";
import type { OptionCtx } from "./options-view";
import { CLASSIC_DASHBOARD, ENERGY_DASHBOARD, loadExpert, loadPlanTuneOpen, loadPvOpen, resolveSettingsArea, saveExpert, savePlanTuneOpen, savePvOpen, settingsHeading, settingsView } from "./settings";
import { isPlantRoom, plantHeading, plantView } from "./plant";
import { batteryControlOverlay, decisionView, forecastView, liveView, planView, type Ctx } from "./views";
import { helpAnchor, type HelpAction } from "./help-content";
import { helpOverlay } from "./help-view";

const DEBUG = new URLSearchParams(location.search).has("debug");

type Screen = "live" | "forecast" | "plan" | "decision" | "plant" | "settings";
const SCREENS: { id: Screen; label: Key; sub: Key; icon: string }[] = [
  { id: "live", label: "navLive", sub: "subLive", icon: '<circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>' },
  { id: "forecast", label: "navForecast", sub: "subForecast", icon: '<path d="M3 3v18h18"/><path d="m7 15 4-5 3 3 5-7"/>' },
  { id: "plan", label: "navPlan", sub: "subPlan", icon: '<rect x="3" y="10" width="4" height="11" rx="1"/><rect x="10" y="5" width="4" height="16" rx="1"/><rect x="17" y="13" width="4" height="8" rx="1"/>' },
  { id: "decision", label: "navDecision", sub: "subDecision", icon: '<circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 2"/>' },
  { id: "plant", label: "navPlant", sub: "subPlant", icon: '<path d="M4 21V10l8-7 8 7v11"/><path d="M9 21v-6h6v6"/>' },
  { id: "settings", label: "navSettings", sub: "subSettings", icon: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>' },
];
const SLIDERS_ICON = '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>';
const HELP_ICON = '<circle cx="12" cy="12" r="9"/><path d="M9.1 9a3 3 0 1 1 4.2 2.7c-.8.4-1.3 1-1.3 1.8V14"/><path d="M12 17h.01"/>';
/** Shown while dark — tap switches to myE3DC (light). */
const SUN_ICON =
  '<circle cx="12" cy="12" r="4"/><path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.8 5.8l1.6 1.6M16.6 16.6l1.6 1.6M18.2 5.8l-1.6 1.6M7.4 16.6l-1.6 1.6"/>';
/** Shown while light — tap switches to dark. */
const MOON_ICON = '<path d="M20.2 14.2A7.5 7.5 0 0 1 9.8 3.8 8.5 8.5 0 1 0 20.2 14.2z"/>';
const MOBILE = "(max-width: 960px)";
const HISTORY_TTL = 5 * 60e3;
const HISTORY_RETRY = 60e3;
const IST_HOURS = 6;
const RESOLVE_RETRY = 30e3;
const MISSING_SHOWN = 6;

const icon = (paths: string, cls = "") =>
  html`<svg class=${cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" .innerHTML=${paths}></svg>`;

const readLocation = (): { screen: Screen; settingsGroup?: string; plantGroup?: string } => {
  const [rawScreen, rawGroup] = location.hash.slice(1).split("/");
  const screen = SCREENS.some((s) => s.id === rawScreen) ? (rawScreen as Screen) : "live";
  const settingsGroup = screen === "settings" ? resolveSettingsArea(rawGroup) : undefined;
  const plantGroup = screen === "plant" && isPlantRoom(rawGroup) ? rawGroup : undefined;
  return { screen, settingsGroup, plantGroup };
};

const initialLocation = readLocation();

class MaestroPanel extends LitElement {
  static styles = styles;

  private _hass?: Hass;
  private _narrow = false;
  private _screen: Screen = initialLocation.screen;
  private _settingsGroup?: string = initialLocation.settingsGroup;
  private _plantGroup?: string = initialLocation.plantGroup;
  private _theme: ThemeId = loadTheme();
  /** Hover preview on the look page; does not persist until `_setTheme`. */
  private _themePreview?: ThemeId;
  private _scrollToLadder = false;
  private _flowStyle: FlowStyleId = loadFlowStyle();
  private _batteryStyle: BatteryStyleId = loadBatteryStyle();
  private _bannerHidden = loadBannerHidden();
  private _alertDismissed: Set<AlertKey> = loadDismissed();
  private _consumerPlacesByStyle = loadConsumerPlacesByStyle();
  private _arrangeConsumers = false;
  private _sheet = false;
  private _pauseOpen = false;
  private _pauseClock?: number;
  private _help = false;
  private _helpQuery = "";
  private _helpAnchor?: string;
  private _helpCurrent = "";
  private _helpListening = false;
  private _mobile = window.matchMedia(MOBILE).matches;
  private _mq = window.matchMedia(MOBILE);
  /** Phones start at 12 h so the forecast plot is readable; user can still pick 24. */
  private _range = window.matchMedia(MOBILE).matches ? 12 : 48;
  private _showIst = true;
  private _forecastHidden = loadForecastHidden();
  private _hideShadowSoc = loadShadowSocHidden();
  private _hideExpectedSoc = loadExpectedSocHidden();
  private _hideShadowImport = loadShadowImportHidden();
  private _forecastZoom?: [number, number];
  private _planZoom?: [number, number];
  private _settingsQuery = "";
  private _sparks?: Record<SparkKey, Point[]>;
  private _ist?: IstSeries;
  private _timeline?: TimelineItem[];
  private _loadedAt = new Map<string, number>();
  private _pending = new Set<string>();
  private _error?: string;
  private _chartError?: string;
  private _powerDraft?: number;
  private _reserveDraft?: number;
  private _zoomKey?: string;
  private _timer?: number;
  private _flowRaf = 0;
  private _lookPrefs: LookPrefs = loadLookPrefs();
  private _motion = this._lookPrefs.motion;
  private _hist?: { name: string; color: string; entityId: string };
  private _histPoints?: Point[];
  private _histState: "loading" | "ready" | "empty" | "error" = "loading";
  private _stats = { hassUpdates: 0, renders: 0 };
  private _entityMap?: EntityMap;
  private _resolvedAt = 0;
  private _consumers: Consumer[] = loadConsumers();
  private _collapsed = loadCollapsed();
  private _batteryCtrlOpen = false;
  private _flowOptsOpen = false;
  private _expert = loadExpert();
  private _planTuneOpen = loadPlanTuneOpen();
  private _pvOpen = loadPvOpen();
  private _setupAck = loadSetupAck();
  private _grain: BalanceGrain = "day";
  /** Anchor day inside the selected range; undefined follows today for day grain. */
  private _anchor?: string;
  private _rangeSums?: Partial<Record<PeriodKey, number>>;
  private _daySparks?: Record<SparkKey, Point[]>;
  /** Past ranges / days; capped LRU so browsing stays snappy without unbounded RAM. */
  private _rangeSumsCache = new Map<string, Partial<Record<PeriodKey, number>>>();
  private _daySparksCache = new Map<string, Record<SparkKey, Point[]>>();
  private _rangePrefetch = new Set<string>();
  private _calOpen = false;
  private _calViewAnchor = calendarDay();
  private _pulseRange: PulseRange = "month";
  private _pulseDays?: BalanceDay[];
  private _pulseState: "idle" | "loading" | "ready" | "error" = "idle";
  private _debugOpen = false;
  private _picking = false;
  private _pickQuery = "";
  private _focusConsumers = false;
  private _consumersSheet = false;
  private _classic?: ClassicStatus;
  private _energy?: EnergyDashboardStatus;
  private _storedOptions: Record<string, unknown> = {};
  private _optionsReady = false;
  private _optionsLoading = false;
  private _optionsRetry?: number;
  private _optionError?: string;
  private _optionNotice?: string;
  private _optionQuery: Record<string, string> = {};
  private _slots: Slot[] = [];
  private _slotsDirty = false;
  private _phasePoints: Record<string, Point[]> = {};
  private _phaseHistory: "idle" | "loading" | "ready" | "error" = "idle";
  private _phaseTicket = 0;
  private _watchSig = "";
  private _overflowSince?: number;
  private _overflowTimer?: number;

  // HA sets `hass` on every state change in the house; only re-render for our entities.
  // Attribute-only updates (the sizing scenario keeps its state and changes the monthly
  // series) must count too, so the signature includes last_updated and those attributes.
  set hass(hass: Hass) {
    this._stats.hassUpdates++;
    const prev = this._hass;
    this._hass = hass;
    if (!prev || this._missingKeys(hass).length) void this._resolveEntities();
    const sig = this._watchSignature(hass);
    if (!prev || prev.language !== hass.language || sig !== this._watchSig) {
      this._watchSig = sig;
      this.requestUpdate();
    } else if (DEBUG) {
      this.requestUpdate();
    }
  }

  private _watchSignature(hass: Hass): string {
    let sig = "";
    for (const id of watched()) {
      const entity = hass.states[id];
      const stamp = entity ? ((entity as { last_updated?: string }).last_updated ?? entity.last_changed) : "";
      sig += `${id}:${entity?.state ?? ""}:${stamp};`;
    }
    const scenario = hass.states[E.sizingScenario]?.attributes;
    if (scenario) sig += JSON.stringify(scenario.slider_battery_kwh) + JSON.stringify(scenario.slider_pv_kwp) + JSON.stringify(scenario.scenario_monthly_avoided_kwh);
    return sig;
  }
  get hass(): Hass | undefined {
    return this._hass;
  }

  set narrow(v: boolean) {
    if (v !== this._narrow) {
      this._narrow = v;
      this.requestUpdate();
    }
  }
  get narrow(): boolean {
    return this._narrow;
  }

  private _onMq = (e: MediaQueryListEvent) => {
    this._mobile = e.matches;
    this.requestUpdate();
  };

  connectedCallback(): void {
    super.connectedCallback();
    useChartTheme(this._theme);
    this._mq.addEventListener("change", this._onMq);
    this._mobile = this._mq.matches;
    this._timer = window.setInterval(() => void this._ensureHistory(), HISTORY_RETRY);
    this.addEventListener("chart-error", this._onChartError as EventListener);
    window.addEventListener("keydown", this._onKey);
    window.addEventListener("popstate", this._onPop);
    const rawGroup = location.hash.slice(1).split("/")[1];
    if (this._screen === "settings" && rawGroup && this._settingsGroup && rawGroup !== this._settingsGroup) {
      history.replaceState(null, "", `#settings/${this._settingsGroup}`);
    }
    if (this._motion) this._flowRaf = requestAnimationFrame(this._animateFlows);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._mq.removeEventListener("change", this._onMq);
    window.clearInterval(this._timer);
    window.clearInterval(this._pauseClock);
    window.clearTimeout(this._overflowTimer);
    window.clearTimeout(this._optionsRetry);
    this._optionsRetry = undefined;
    cancelAnimationFrame(this._flowRaf);
    this.removeEventListener("chart-error", this._onChartError as EventListener);
    window.removeEventListener("keydown", this._onKey);
    this._unbindHelpScroll();
    window.removeEventListener("popstate", this._onPop);
  }

  private _onPop = () => {
    const next = readLocation();
    this._screen = next.screen;
    this._settingsGroup = next.settingsGroup;
    this._plantGroup = next.plantGroup;
    this.requestUpdate();
    void this._loadPhaseHistory();
  };

  private _animateFlows = (now: number) => {
    if (!this._motion) {
      this._flowRaf = 0;
      return;
    }
    placeElectrons(this.renderRoot.querySelectorAll(".electron"), now);
    this._flowRaf = requestAnimationFrame(this._animateFlows);
  };

  private _onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      if (this._pauseOpen) {
        this._pauseOpen = false;
        this.requestUpdate();
      } else if (this._help) this._closeHelp();
      else if (this._batteryCtrlOpen) {
        this._batteryCtrlOpen = false;
        this.requestUpdate();
      } else if (this._flowOptsOpen) {
        this._flowOptsOpen = false;
        this.requestUpdate();
      } else if (this._hist) this._closeHistory();
      else if (this._sheet) this._setSheet(false);
      return;
    }
    if (e.key !== "?" || e.metaKey || e.ctrlKey || e.altKey || this._help) return;
    const typing = e.composedPath().some((node) => node instanceof HTMLElement && (node.tagName === "INPUT" || node.tagName === "TEXTAREA" || node.tagName === "SELECT" || node.isContentEditable));
    if (typing) return;
    e.preventDefault();
    this._openHelp();
  };

  private _openHelp(): void {
    this._help = true;
    this._helpAnchor = helpAnchor(this._screen, this._settingsGroup);
    this._helpCurrent = this._helpAnchor.startsWith("ch-") ? this._helpAnchor.slice(3) : this._helpAnchor;
    this.requestUpdate();
  }

  private _closeHelp(): void {
    this._help = false;
    this._helpQuery = "";
    this._helpAnchor = undefined;
    this._unbindHelpScroll();
    this.requestUpdate();
  }

  private _jumpHelp(id: string): void {
    this._helpCurrent = id;
    if (this._helpQuery) {
      this._helpQuery = "";
      this._helpAnchor = id;
      this.requestUpdate();
      return;
    }
    const fold = this.renderRoot.querySelector(".help-fold");
    if (fold instanceof HTMLDetailsElement) fold.open = false;
    this._scrollHelp(id);
  }

  private _scrollHelp(id: string): void {
    const align = () => {
      const doc = this.renderRoot.querySelector(".help-doc");
      if (!(doc instanceof HTMLElement)) return;
      const chapterId = id.startsWith("ch-") ? id.slice(3) : id;
      const el = doc.querySelector(`[data-help="${chapterId}"]`) ?? doc.querySelector(`[data-chapter="${chapterId}"]`);
      if (!(el instanceof HTMLElement)) return;
      const top = el.getBoundingClientRect().top - doc.getBoundingClientRect().top + doc.scrollTop;
      doc.scrollTop = Math.max(0, top - 4);
    };
    align();
    requestAnimationFrame(align);
  }

  private _helpAction(action: HelpAction): void {
    this._closeHelp();
    if (action.kind === "controls") {
      this._setSheet(true);
      return;
    }
    if (action.group && action.screen === "settings") this._openSettingsGroup(action.group);
    else if (action.group && action.screen === "plant") this._openPlantRoom(action.group);
    else this._go(action.screen);
  }

  private _onHelpScroll = () => {
    const doc = this.renderRoot.querySelector(".help-doc");
    if (!(doc instanceof HTMLElement)) return;
    const edge = doc.getBoundingClientRect().top + 12;
    let id = "";
    for (const el of doc.querySelectorAll<HTMLElement>("[data-help]")) {
      if (el.getBoundingClientRect().top <= edge) id = el.dataset.help ?? id;
    }
    if (!id || id === this._helpCurrent) return;
    this._helpCurrent = id;
    this.requestUpdate();
  };

  private _bindHelpScroll(): void {
    const doc = this.renderRoot.querySelector(".help-doc");
    if (!(doc instanceof HTMLElement) || this._helpListening) return;
    doc.addEventListener("scroll", this._onHelpScroll, { passive: true });
    this._helpListening = true;
  }

  private _unbindHelpScroll(): void {
    this.renderRoot.querySelector(".help-doc")?.removeEventListener("scroll", this._onHelpScroll);
    this._helpListening = false;
  }

  private _closeHistory(): void {
    this._hist = undefined;
    this._histPoints = undefined;
    this.requestUpdate();
  }

  /** Recorder sources for Zusatz-PV (options / RSCP), not the young Maestro mirror. */
  private _additionalPvHistoryIds(): string[] {
    const raw = this._storedOptions.additional_generation_sensor;
    const fromOpts = Array.isArray(raw)
      ? raw.filter((id): id is string => typeof id === "string" && !!id)
      : typeof raw === "string" && raw
        ? [raw]
        : [];
    if (fromOpts.length) return fromOpts;
    const plantExtra = plant.entities.extraProduction;
    if (plantExtra) return [plantExtra];
    return E.additionalPv ? [E.additionalPv] : [];
  }

  private _openFlow(key: string): void {
    const hass = this._hass;
    if (!hass) return;
    const i18n = makeI18n(hass.language);
    const main = NODE_META[key as keyof typeof NODE_META];
    const consumer = this._consumers.find((c) => c.id === key);
    const entityId = main ? E[main.entity] : consumer?.entityId;
    if (!entityId) return;
    const entity = hass.states[entityId];
    const watts = num(entity);
    const feeding = key === "grid" && watts !== undefined && watts >= 0;
    const name = key === "grid" ? i18n.t(feeding ? "nodeFeed" : "nodeImport") : main ? i18n.t(main.label) : (consumer?.name ?? entityId);
    const color = feeding ? "#34d399" : (main?.color ?? "#38bdf8");
    const unit = entity?.attributes.unit_of_measurement;
    const histKey = key === "pvExtra" ? `pvExtra:${this._additionalPvHistoryIds().join(",")}` : entityId;
    this._hist = { name, color, entityId: histKey };
    this._histPoints = undefined;
    this._histState = "loading";
    this.requestUpdate();
    const series =
      key === "pvExtra"
        ? loadPowerSeriesSum(hass, this._additionalPvHistoryIds())
        : loadPowerSeries(hass, entityId, unit === "kW" ? 1000 : 1);
    void series
      .then((points) => {
        if (this._hist?.entityId !== histKey) return;
        this._histPoints = points;
        this._histState = points.length ? "ready" : "empty";
        this.requestUpdate();
      })
      .catch(() => {
        if (this._hist?.entityId !== histKey) return;
        this._histState = "error";
        this.requestUpdate();
      });
  }

  private _onChartError = (e: CustomEvent<string>) => {
    this._chartError = e.detail;
    this.requestUpdate();
  };

  // ------------------------------------------------------------ entities

  /** Ask the backend for the registry-resolved entity_ids (renamed entities keep working). */
  private async _resolveEntities(): Promise<void> {
    const hass = this._hass;
    if (!hass || Date.now() - this._resolvedAt < RESOLVE_RETRY) return;
    this._resolvedAt = Date.now();
    try {
      const map = await hass.callWS<EntityMap>({ type: "e3dc_maestro/panel_entities" });
      const before = JSON.stringify(E);
      applyEntityMap(map);
      applySettingsMap(map);
      const plantBefore = JSON.stringify(plant.entities);
      applyPlantMap(map);
      if (JSON.stringify(plant.entities) !== plantBefore) {
        this._phasePoints = {};
        this._loadedAt.delete("plant-grid");
        this._loadedAt.delete("plant-pv");
      }
      this._entityMap = map;
      if (JSON.stringify(E) !== before) this._loadedAt.clear(); // history was loaded for other ids
      this.requestUpdate();
      void this._ensureHistory();
    } catch {
      // backend without the command: keep the default ids
    }
  }

  private _missingKeys(hass: Hass): EntityKey[] {
    return (Object.keys(DEFAULT_IDS) as EntityKey[]).filter((k) => !hass.states[E[k]]);
  }

  private _entityNotice(hass: Hass, t: ReturnType<typeof makeI18n>["t"]): TemplateResult | typeof nothing {
    const map = this._entityMap;
    if (map && map.entry_id === null) return html`<p class="err">${t("notSetUp")}</p>`;
    const missing = this._missingKeys(hass);
    if (!missing.length) return nothing;
    const disabled = new Set(map?.disabled ?? []);
    const names = missing
      .slice(0, MISSING_SHOWN)
      .map((k) => (disabled.has(k) ? `${E[k]} (${t("entityDisabled")})` : E[k]));
    const more = missing.length > MISSING_SHOWN ? ` +${missing.length - MISSING_SHOWN}` : "";
    return html`<p class="err">${t("entitiesMissing", { list: names.join(", ") + more })}</p>`;
  }

  private _liveFacts(hass: Hass, fmt: Fmt, t: ReturnType<typeof makeI18n>["t"]): TemplateResult | typeof nothing {
    if (this._screen !== "live") return nothing;
    const kwh = (value: number | undefined) => (value === undefined ? "–" : `${fmt.n(value)} kWh`);
    const configured = (key: string): number | undefined => {
      const id = this._storedOptions[key];
      return typeof id === "string" ? num(hass.states[id]) : undefined;
    };
    const p10 = hass.states[E.p10];
    const p50 = p10?.attributes.p50_remaining_kwh;
    const rest = configured("pv_forecast_sensor") ?? (typeof p50 === "number" ? p50 : num(p10));
    const dayAfter = configured("pv_forecast_sensor_day2");
    return html`<p class="facts">
      <span>${t("factRest")} <b>${kwh(rest)}</b></span>
      <span>${t("factTomorrow")} <b>${kwh(num(hass.states[E.pvTomorrow]))}</b></span>
      ${dayAfter === undefined ? nothing : html`<span>${t("factDayAfter")} <b>${kwh(dayAfter)}</b></span>`}
    </p>`;
  }

  private _syncAlertDismissed(active: readonly AlertKey[]): void {
    const next = pruneDismissed(this._alertDismissed, active);
    if (next.size === this._alertDismissed.size && [...next].every((k) => this._alertDismissed.has(k))) {
      return;
    }
    this._alertDismissed = next;
    saveDismissed(next);
  }

  private _dismissAlerts(active: readonly AlertKey[]): void {
    const next = new Set(active);
    this._alertDismissed = next;
    saveDismissed(next);
    this.requestUpdate();
  }

  private _setBannerHidden(hidden: boolean): void {
    this._bannerHidden = hidden;
    saveBannerHidden(hidden);
    this.requestUpdate();
  }

  private _alerts(hass: Hass, t: ReturnType<typeof makeI18n>["t"]): TemplateResult | typeof nothing {
    const active = activeAlertKeys(hass);
    if (!bannerVisible(active, this._alertDismissed, this._bannerHidden)) return nothing;
    const down = active.includes("unreachable");
    return html`<div class="banner ${down ? "bad" : ""}" role="status">
      <div class="banner-notes">${active.map((key) => html`<span>${t(alertLabelKey(key))}</span>`)}</div>
      <button type="button" class="banner-ack" @click=${() => this._dismissAlerts(active)}>${t("alertDismiss")}</button>
    </div>`;
  }

  // ------------------------------------------------------------ history

  private _balanceRange() {
    return resolveBalanceRange(this._grain, this._anchor ?? calendarDay());
  }

  /** Load range sums (and day sparks) from LRU/recorder; prefetch ±1 grain in the background. */
  private async _ensureBalanceRange(hass: Hass): Promise<void> {
    const range = this._balanceRange();
    if (range.grain === "day" && range.live) {
      this._rangeSums = undefined;
      this._daySparks = undefined;
      return;
    }
    const sumsHit = peekLruCache(this._rangeSumsCache, range.cacheKey);
    if (sumsHit) this._rangeSums = sumsHit;
    let sparksHit: Record<SparkKey, Point[]> | undefined;
    if (range.grain === "day") {
      sparksHit = peekLruCache(this._daySparksCache, range.start);
      if (sparksHit) this._daySparks = sparksHit;
    } else {
      this._daySparks = undefined;
    }
    const needSums = !sumsHit;
    const needSparks = range.grain === "day" && !sparksHit;
    if (!needSums && !needSparks) {
      this.requestUpdate();
      this._prefetchNeighborRanges(hass, range.grain, range.anchor);
      return;
    }
    const tasks: Promise<void>[] = [];
    if (needSums) {
      tasks.push(
        loadRangeSums(hass, range).then((sums) => {
          touchLruCache(this._rangeSumsCache, range.cacheKey, sums);
          if (this._balanceRange().cacheKey === range.cacheKey) this._rangeSums = sums;
        }),
      );
    }
    if (needSparks) {
      tasks.push(
        loadSparks(hass, range.start).then((sparks) => {
          touchLruCache(this._daySparksCache, range.start, sparks);
          if (this._balanceRange().cacheKey === range.cacheKey) this._daySparks = sparks;
        }),
      );
    }
    try {
      await Promise.all(tasks);
    } catch {
      // recorder excluded / not ready — mark the range loaded so the UI can show empty state
      if (this._balanceRange().cacheKey === range.cacheKey && this._rangeSums === undefined) {
        this._rangeSums = {};
        touchLruCache(this._rangeSumsCache, range.cacheKey, {});
      }
    }
    this.requestUpdate();
    this._prefetchNeighborRanges(hass, range.grain, range.anchor);
  }

  private _prefetchNeighborRanges(hass: Hass, grain: BalanceGrain, anchor: string): void {
    for (const delta of [-1, 1] as const) {
      const neighborAnchor = shiftBalanceAnchor(grain, anchor, delta);
      const neighbor = resolveBalanceRange(grain, neighborAnchor);
      if (neighbor.live && neighbor.grain === "day") continue;
      if (this._rangeSumsCache.has(neighbor.cacheKey) && (grain !== "day" || this._daySparksCache.has(neighbor.start))) {
        continue;
      }
      if (this._rangePrefetch.has(neighbor.cacheKey)) continue;
      this._rangePrefetch.add(neighbor.cacheKey);
      void (async () => {
        try {
          const needSums = !this._rangeSumsCache.has(neighbor.cacheKey);
          const needSparks = grain === "day" && !this._daySparksCache.has(neighbor.start);
          const [sums, sparks] = await Promise.all([
            needSums ? loadRangeSums(hass, neighbor) : Promise.resolve(undefined),
            needSparks ? loadSparks(hass, neighbor.start) : Promise.resolve(undefined),
          ]);
          if (sums) touchLruCache(this._rangeSumsCache, neighbor.cacheKey, sums);
          if (sparks) touchLruCache(this._daySparksCache, neighbor.start, sparks);
        } catch {
          // ignore prefetch failures
        } finally {
          this._rangePrefetch.delete(neighbor.cacheKey);
        }
      })();
    }
  }

  private async _ensureHistory(): Promise<void> {
    const hass = this._hass;
    if (!hass || document.hidden) return;
    const stale = (key: string) => Date.now() - (this._loadedAt.get(key) ?? 0) > HISTORY_TTL;
    const run = async (key: string, task: () => Promise<void>) => {
      if (!stale(key)) return;
      this._loadedAt.set(key, Date.now() - HISTORY_TTL + HISTORY_RETRY); // retry soon on failure
      try {
        await task();
        this._loadedAt.set(key, Date.now());
        this.requestUpdate();
      } catch {
        // recorder excluded / not ready: views fall back to their empty states
      }
    };
    if (this._screen === "live") await run("sparks", async () => void (this._sparks = await loadSparks(hass)));
    if (this._screen === "live") await this._ensureBalanceRange(hass);
    if (this._screen === "live" && !this._collapsed.has("balancePulse")) {
      const range = this._pulseRange;
      const key = `pulse-${range}`;
      if (stale(key)) {
        if (!this._pulseDays) {
          this._pulseState = "loading";
          this.requestUpdate();
        }
        this._loadedAt.set(key, Date.now() - HISTORY_TTL + HISTORY_RETRY);
        try {
          this._pulseDays = await loadBalanceDays(hass, range);
          this._pulseState = "ready";
          this._loadedAt.set(key, Date.now());
          this.requestUpdate();
        } catch {
          this._pulseState = "error";
          this.requestUpdate();
        }
      }
    }
    if (this._screen === "forecast" && this._showIst) {
      await run("ist", async () => void (this._ist = await loadIst(hass, IST_HOURS)));
    }
    if (this._screen === "decision") await run("timeline", async () => void (this._timeline = await loadTimeline(hass)));
    await this._loadPhaseHistory();
  }

  private async _loadPhaseHistory(): Promise<void> {
    const hass = this._hass;
    const group = this._plantGroup;
    if (!hass || document.hidden || this._screen !== "plant" || (group !== "grid" && group !== "pv")) return;
    const keys = group === "grid" ? ["houseL1", "houseL2", "houseL3", "gridL1", "gridL2", "gridL3"] : ["pviL1", "pviL2", "pviL3"];
    const ids = keys.map((key) => plant.entities[key]).filter((id): id is string => !!id);
    if (!ids.length) return;
    const cacheKey = `plant-${group}`;
    if (ids.every((id) => id in this._phasePoints) && Date.now() - (this._loadedAt.get(cacheKey) ?? 0) <= HISTORY_TTL) {
      if (this._phaseHistory !== "ready") {
        this._phaseHistory = "ready";
        this.requestUpdate();
      }
      return;
    }
    const ticket = ++this._phaseTicket;
    if (!ids.every((id) => id in this._phasePoints)) {
      this._phaseHistory = "loading";
      this.requestUpdate();
    }
    try {
      const got = await loadPowerSeriesMany(hass, ids);
      this._phasePoints = { ...this._phasePoints, ...Object.fromEntries(ids.map((id) => [id, got[id] ?? []])) };
      this._loadedAt.set(cacheKey, Date.now());
      if (ticket !== this._phaseTicket) return;
      this._phaseHistory = "ready";
    } catch {
      if (ticket !== this._phaseTicket) return;
      this._loadedAt.set(cacheKey, Date.now() - HISTORY_TTL + HISTORY_RETRY);
      this._phaseHistory = "error";
    }
    this.requestUpdate();
  }

  // ------------------------------------------------------------ actions

  private _setTheme(theme: ThemeId): void {
    this._theme = theme;
    this._themePreview = undefined;
    useChartTheme(theme);
    saveTheme(theme);
    this.requestUpdate();
  }

  private _persistLookPrefs(patch: Partial<LookPrefs>): void {
    this._lookPrefs = { ...this._lookPrefs, ...patch };
    saveLookPrefs(this._lookPrefs);
    this.requestUpdate();
  }

  private _setMotion(on: boolean): void {
    this._motion = on;
    this._persistLookPrefs({ motion: on });
    if (on) {
      if (!this._flowRaf) this._flowRaf = requestAnimationFrame(this._animateFlows);
    } else {
      cancelAnimationFrame(this._flowRaf);
      this._flowRaf = 0;
    }
  }

  private _setDensity(density: DensityId): void {
    this._persistLookPrefs({ density });
  }

  private _setCorners(corners: CornersId): void {
    this._persistLookPrefs({ corners });
  }

  /** Quick toggle in the top bar: any night look ↔ myE3DC. */
  private _toggleLightDark(): void {
    this._setTheme(isDarkTheme(this._theme) ? "e3dc" : "dark");
  }

  private _previewTheme(theme: ThemeId | undefined): void {
    if (theme === this._themePreview) return;
    this._themePreview = theme;
    this.requestUpdate();
  }

  private _showLadder(): void {
    if (this._screen !== "decision") {
      this._go("decision");
    }
    this._scrollToLadder = true;
    this.requestUpdate();
  }

  private _setFlowStyle(style: FlowStyleId): void {
    this._flowStyle = style;
    saveFlowStyle(style);
    this.requestUpdate();
  }

  private _setBatteryStyle(style: BatteryStyleId): void {
    this._batteryStyle = style;
    saveBatteryStyle(style);
    this.requestUpdate();
  }

  private _placeConsumer(id: string, place: ConsumerPlace): void {
    const style = this._flowStyle;
    const nextStyle = { ...this._consumerPlacesByStyle[style], [id]: place };
    this._consumerPlacesByStyle = { ...this._consumerPlacesByStyle, [style]: nextStyle };
    saveConsumerPlacesByStyle(this._consumerPlacesByStyle);
    this.requestUpdate();
  }

  private _resetConsumerPlaces(): void {
    const style = this._flowStyle;
    this._consumerPlacesByStyle = { ...this._consumerPlacesByStyle, [style]: {} };
    saveConsumerPlacesByStyle(this._consumerPlacesByStyle);
    this.requestUpdate();
  }

  private _go(screen: Screen): void {
    this._screen = screen;
    this._settingsGroup = undefined;
    this._plantGroup = undefined;
    this._zoomKey = undefined;
    this._planZoom = undefined;
    this._error = undefined;
    history.replaceState(null, "", `#${screen}`);
    this.requestUpdate();
    void this._ensureHistory();
  }

  private _openSettingsGroup(id: string): void {
    this._screen = "settings";
    this._settingsGroup = id;
    this._settingsQuery = "";
    if (id === CLASSIC_DASHBOARD.id) this._classic = undefined;
    if (id === ENERGY_DASHBOARD.id) this._energy = undefined;
    history.pushState({ maestroGroup: true }, "", `#settings/${id}`);
    this.requestUpdate();
  }

  private _openPlantRoom(id: string): void {
    this._screen = "plant";
    this._plantGroup = id;
    history.pushState({ maestroGroup: true }, "", `#plant/${id}`);
    this.requestUpdate();
    void this._loadPhaseHistory();
  }

  private _closeArea(): void {
    // A deep link has no pushed entry to go back to; back() would leave the panel.
    if ((history.state as { maestroGroup?: boolean } | null)?.maestroGroup) {
      history.back();
      return;
    }
    if (this._screen === "plant") {
      this._plantGroup = undefined;
      history.replaceState(null, "", "#plant");
    } else {
      this._settingsGroup = undefined;
      history.replaceState(null, "", "#settings");
    }
    this.requestUpdate();
  }

  private _setSheet(open: boolean): void {
    this._sheet = open;
    if (!open) {
      this._error = undefined;
      this._picking = false;
      this._consumersSheet = false;
    }
    this.requestUpdate();
  }

  private _openConsumers(): void {
    this._sheet = true;
    this._focusConsumers = true;
    this._consumersSheet = true;
    this.requestUpdate();
  }

  private _heldOverflow(active: boolean): boolean {
    const now = Date.now();
    const held = overflowHeld(active, this._overflowSince, now);
    this._overflowSince = held.since;
    window.clearTimeout(this._overflowTimer);
    this._overflowTimer = undefined;
    if (held.since !== undefined && !held.show) {
      const wait = Math.max(0, OVERFLOW_HOLD_MS - (now - held.since));
      this._overflowTimer = window.setTimeout(() => this.requestUpdate(), wait);
    }
    return held.show;
  }

  private _wallboxIds(): string[] {
    return wallboxEntityIds(
      typeof this._storedOptions.wallbox_power_sensor === "string"
        ? this._storedOptions.wallbox_power_sensor
        : undefined,
    );
  }

  /** Configured vehicle SoC, else first RSCP wallbox-soc from the plant map. */
  private _wallboxSoc(hass: Hass): number | undefined {
    const configured =
      typeof this._storedOptions.wallbox_soc_sensor === "string"
        ? this._storedOptions.wallbox_soc_sensor
        : undefined;
    if (configured) return socOf(hass.states[configured]);
    for (const box of plant.wallboxes) {
      const id = box.entities.soc;
      if (typeof id !== "string") continue;
      const value = socOf(hass.states[id]);
      if (value !== undefined) return value;
    }
    return undefined;
  }

  /** Configured plug binary, else plant / openWB Ladekabel. */
  private _wallboxPlugged(hass: Hass): boolean | undefined {
    const configured =
      typeof this._storedOptions.wallbox_plug_entity === "string"
        ? this._storedOptions.wallbox_plug_entity
        : undefined;
    if (configured) return pluggedOf(hass.states[configured]);
    for (const box of plant.wallboxes) {
      const id = box.entities.plug;
      if (typeof id !== "string") continue;
      const value = pluggedOf(hass.states[id]);
      if (value !== undefined) return value;
    }
    const power =
      typeof this._storedOptions.wallbox_power_sensor === "string"
        ? this._storedOptions.wallbox_power_sensor
        : undefined;
    const openwb = power?.match(/^sensor\.(openwb_chargepoint_\d+)_ladeleistung$/);
    if (openwb) {
      const value = pluggedOf(hass.states[`binary_sensor.${openwb[1]}_ladekabel`]);
      if (value !== undefined) return value;
    }
    return undefined;
  }

  private _flowConsumers(hass: Hass): FlowConsumer[] {
    const ids = this._wallboxIds();
    const flows = toFlow(this._consumers, hass);
    let plugged = this._wallboxPlugged(hass);
    // No plug sensor: charging still means the cable is in.
    if (plugged === undefined) {
      const charging = flows.some(
        (item) => ids.includes(item.entityId) && Math.abs(item.watts) > FLOW_CONSUMER_MIN_W,
      );
      if (charging) plugged = true;
    }
    return withWallboxMeta(flows, { soc: this._wallboxSoc(hass), plugged }, ids);
  }

  /** Compare included loads to the raw house meter when possible — Maestro house is EWMA + 30 s tick. */
  private _consumerOverflow(hass: Hass): boolean {
    const flows = toFlow(this._consumers, hass);
    const wallboxIds = this._wallboxIds();
    // Prefer openWB (or configured wallbox sensor) over the Maestro mirror for the sum —
    // same source the coordinator subtracts from the E3DC meter.
    const wbSource =
      typeof this._storedOptions.wallbox_power_sensor === "string"
        ? this._storedOptions.wallbox_power_sensor
        : undefined;
    const wbWatts = wbSource ? wattsOf(hass.states[wbSource]) : undefined;
    const aligned =
      wbWatts === undefined
        ? flows
        : flows.map((item) =>
            wallboxIds.includes(item.entityId) ? { ...item, watts: Math.max(0, wbWatts) } : item,
          );
    const meterId =
      typeof this._storedOptions.house_power_sensor === "string"
        ? this._storedOptions.house_power_sensor
        : undefined;
    const meterEntity = meterId ? hass.states[meterId] : undefined;
    const meterHouse = wattsOf(meterEntity);
    const houseEntity = meterEntity ?? hass.states[E.house];
    const itemUpdatedAt = new Map<string, number>();
    for (const item of aligned) {
      const stamp = hass.states[item.entityId]?.last_updated;
      if (!stamp) continue;
      const ms = Date.parse(stamp);
      if (Number.isFinite(ms)) itemUpdatedAt.set(item.entityId, ms);
      // Wallbox row may use the Maestro entity id but watts from openWB — stamp from the source.
      if (wbSource && wallboxIds.includes(item.entityId)) {
        const srcStamp = hass.states[wbSource]?.last_updated;
        const srcMs = srcStamp ? Date.parse(srcStamp) : NaN;
        if (Number.isFinite(srcMs)) itemUpdatedAt.set(item.entityId, srcMs);
      }
    }
    const houseUpdatedAt = houseEntity?.last_updated ? Date.parse(houseEntity.last_updated) : undefined;
    return includedOverflow(num(hass.states[E.house]), aligned, {
      wallboxInHouse: this._storedOptions.wallbox_included_in_house === true,
      wallboxEntityIds: wallboxIds,
      meterHouse: meterHouse,
      houseUpdatedAt: Number.isFinite(houseUpdatedAt) ? houseUpdatedAt : undefined,
      itemUpdatedAt,
    });
  }

  private _setConsumers(next: Consumer[], closePicker = false): void {
    this._consumers = next.slice(0, MAX_CONSUMERS);
    saveConsumers(this._consumers);
    void this._setOption("flow_consumers", this._consumers, true);
    if (closePicker) {
      this._picking = false;
      this._pickQuery = "";
    }
    this.requestUpdate();
  }

  private async _call(id: string, domain: string, service: string, data: Record<string, unknown>): Promise<void> {
    const hass = this._hass;
    if (!hass) return;
    this._pending.add(id);
    this._error = undefined;
    this.requestUpdate();
    try {
      await hass.callService(domain, service, data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : typeof err === "object" && err && "message" in err ? String((err as { message: unknown }).message) : String(err);
      this._error = makeI18n(hass.language).t("callFailed", { err: msg });
    } finally {
      this._pending.delete(id);
      this.requestUpdate();
    }
  }

  private _openPause(): void {
    this._pauseOpen = true;
    this.requestUpdate();
  }

  private _resumeRegulation(): void {
    this._pauseOpen = false;
    void this._call(E.ctrlActive, "switch", "turn_on", { entity_id: E.ctrlActive });
  }

  private _toggle(id: string): void {
    const on = isOn(this._hass?.states[id]);
    if (id === E.ctrlActive && on) {
      this._openPause();
      return;
    }
    void this._call(id, "switch", on ? "turn_off" : "turn_on", { entity_id: id });
  }

  private async _pause(hours: number | null): Promise<void> {
    const hass = this._hass;
    this._pauseOpen = false;
    if (!hass) return;
    this._pending.add(E.ctrlActive);
    this._error = undefined;
    this.requestUpdate();
    try {
      await hass.callWS({ type: "e3dc_maestro/pause", hours });
    } catch (err) {
      const msg = err instanceof Error ? err.message : typeof err === "object" && err && "message" in err ? String((err as { message: unknown }).message) : String(err);
      this._error = makeI18n(hass.language).t("callFailed", { err: msg });
    } finally {
      this._pending.delete(E.ctrlActive);
      this.requestUpdate();
    }
  }

  private _syncPauseClock(until: number | undefined): void {
    const running = until !== undefined && until * 1000 > Date.now();
    if (running && this._pauseClock === undefined) {
      this._pauseClock = window.setInterval(() => this.requestUpdate(), 30_000);
    } else if (!running && this._pauseClock !== undefined) {
      window.clearInterval(this._pauseClock);
      this._pauseClock = undefined;
    }
  }

  private _press(id: string): void {
    void this._call(id, "button", "press", { entity_id: id });
  }

  private _select(id: string, option: string): void {
    void this._call(id, "select", "select_option", { entity_id: id, option });
  }

  private _commitPower(watts: number): void {
    void this._commitNumber(E.forceDischargePower, watts).then(() => {
      this._powerDraft = undefined;
      this.requestUpdate();
    });
  }

  private _commitReserve(percent: number): void {
    void this._commitNumber(E.fixedReserveSoc, percent).then(() => {
      this._reserveDraft = undefined;
      this.requestUpdate();
    });
  }

  private _commitNumber(id: string, value: number): Promise<void> {
    return this._call(id, "number", "set_value", { entity_id: id, value });
  }

  private async _checkClassic(): Promise<void> {
    const hass = this._hass;
    if (!hass) return;
    this._classic = { ...this._classic, state: "checking" };
    this.requestUpdate();
    this._classic = await checkClassic(hass);
    this.requestUpdate();
  }

  private async _createClassic(): Promise<void> {
    const hass = this._hass;
    const current = this._classic;
    if (!hass || !current) return;
    this._classic = { ...current, state: "creating" };
    this.requestUpdate();
    try {
      await createClassic(hass, current.state);
      await this._checkClassic();
    } catch (err) {
      this._classic = { ...current, state: "error", error: classicErrorText(err) };
      this.requestUpdate();
    }
  }

  private _openClassic(): void {
    history.pushState(null, "", "/e3dc-maestro");
    window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false } }));
  }

  private async _checkEnergy(): Promise<void> {
    const hass = this._hass;
    if (!hass) return;
    this._energy = { ...this._energy, state: "checking" };
    this.requestUpdate();
    this._energy = await checkEnergyDashboard(hass);
    this.requestUpdate();
  }

  private async _applyEnergy(mode: EnergyApplyMode): Promise<void> {
    const hass = this._hass;
    const current = this._energy;
    if (!hass || !current) return;
    this._energy = { ...current, state: "applying" };
    this.requestUpdate();
    try {
      this._energy = await applyEnergyDashboard(hass, mode);
    } catch (err) {
      this._energy = { ...current, state: "error", error: energyErrorText(err) };
    }
    this.requestUpdate();
  }

  private _openEnergy(): void {
    history.pushState(null, "", "/config/energy");
    window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false } }));
  }

  private _toggleMenu(): void {
    this.dispatchEvent(new Event("hass-toggle-menu", { bubbles: true, composed: true }));
  }

  private _fault(err: unknown): string {
    // home-assistant-js-websocket rejects with bare ERR_CONNECTION_LOST (= 3) after
    // iOS background suspend; prefer the nested HA result shape when present.
    if (err === 3) return "Connection lost";
    if (typeof err === "number") return String(err);
    if (err instanceof Error) return err.message;
    if (err && typeof err === "object") {
      const o = err as { message?: unknown; code?: unknown; error?: { message?: unknown; code?: unknown } };
      if (typeof o.message === "string" && o.message) return o.message;
      const nested = o.error;
      if (nested && typeof nested === "object") {
        if (typeof nested.message === "string" && nested.message) return nested.message;
        if (nested.code === 3) return "Connection lost";
      }
      if (o.code === 3) return "Connection lost";
    }
    return String(err);
  }

  private async _loadOptions(): Promise<void> {
    const hass = this._hass;
    if (!hass || this._optionsReady || this._optionsLoading) return;
    this._optionsLoading = true;
    try {
      const res = await hass.callWS<{ options?: Record<string, unknown> }>({ type: "e3dc_maestro/panel_options" });
      this._storedOptions = res.options ?? {};
      this._optionsReady = true;
      this._optionError = undefined;
      window.clearTimeout(this._optionsRetry);
      this._optionsRetry = undefined;
      if (!this._slotsDirty) this._slots = slotsFrom(this._storedOptions.tariff_slots);
      const stored = consumersFromOptions(this._storedOptions.flow_consumers, this._consumers);
      this._consumers = stored.list;
      saveConsumers(stored.list);
      if (stored.publishLocal) void this._setOption("flow_consumers", stored.list, true);
    } catch (err) {
      this._optionError = this._fault(err);
      // iPhone Companion drops the websocket while backgrounded; retry when it is back.
      if (this._isConnectionLost(err) && this._optionsRetry === undefined) {
        this._optionsRetry = window.setTimeout(() => {
          this._optionsRetry = undefined;
          void this._loadOptions();
        }, 1500);
      }
    } finally {
      this._optionsLoading = false;
      this.requestUpdate();
    }
  }

  private _isConnectionLost(err: unknown): boolean {
    if (err === 3) return true;
    if (!err || typeof err !== "object") return false;
    const o = err as { code?: unknown; error?: { code?: unknown }; message?: unknown };
    if (o.code === 3) return true;
    if (o.error && typeof o.error === "object" && (o.error as { code?: unknown }).code === 3) return true;
    return typeof o.message === "string" && /connection lost/i.test(o.message);
  }

  private async _setOption(key: string, value: unknown, quiet = false): Promise<void> {
    const hass = this._hass;
    if (!hass) return;
    this._pending.add(key);
    this._optionError = undefined;
    this.requestUpdate();
    try {
      const res = await hass.callWS<{ reloaded?: boolean }>({
        type: "e3dc_maestro/panel_options/set",
        values: { [key]: value },
      });
      const next = { ...this._storedOptions };
      if (value === null) delete next[key];
      else next[key] = value;
      this._storedOptions = next;
      if (!quiet) this._optionNotice = res.reloaded ? "reload" : "saved";
      if (key === "tariff_slots") this._slotsDirty = false;
      if (res.reloaded) {
        this._resolvedAt = 0;
        void this._resolveEntities();
      }
    } catch (err) {
      this._optionError = this._fault(err);
    } finally {
      this._pending.delete(key);
      this.requestUpdate();
    }
  }

  // ------------------------------------------------------------ render

  protected render(): TemplateResult {
    this._stats.renders++;
    const hass = this._hass;
    if (!hass) return html``;
    const i18n = makeI18n(hass.language);
    const fmt = makeFmt(hass.language);
    const { t } = i18n;
    const options: OptionCtx = {
      hass,
      i18n,
      isAdmin: hass.user?.is_admin === true,
      options: this._storedOptions,
      ready: this._optionsReady,
      error: this._optionError,
      notice: this._optionNotice,
      query: this._optionQuery,
      pending: this._pending,
      slots: this._slots,
      onQuery: (key, query) => {
        this._optionQuery = { ...this._optionQuery, [key]: query };
        this.requestUpdate();
      },
      onChange: (key, value) => void this._setOption(key, value),
      onSlots: (slots) => {
        this._slots = slots;
        this._slotsDirty = true;
        this.requestUpdate();
      },
      onSaveSlots: () => void this._setOption("tariff_slots", this._slots),
      onRunSizing: () => this._press(E.btnSizing),
    };
    const ctx: Ctx = {
      hass,
      i18n,
      fmt,
      mobile: this._mobile,
      sparks: this._sparks,
      daySparks: this._daySparks,
      ist: this._ist,
      timeline: this._timeline,
      range: this._range,
      showIst: this._showIst,
      forecastZoom: this._forecastZoom,
      forecastHidden: this._forecastHidden,
      hideShadowSoc: this._hideShadowSoc,
      hideExpectedSoc: this._hideExpectedSoc,
      hideShadowImport: this._hideShadowImport,
      planZoom: this._planZoom,
      onRange: (h) => {
        this._range = h;
        this._zoomKey = undefined;
        this._forecastZoom = undefined;
        this.requestUpdate();
      },
      onToggleIst: () => {
        this._showIst = !this._showIst;
        this._zoomKey = undefined;
        this._forecastZoom = undefined;
        this.requestUpdate();
        void this._ensureHistory();
      },
      onForecastZoom: (from, to) => {
        const cur = this._forecastZoom;
        if (cur && Math.abs(cur[0] - from) < 1 && Math.abs(cur[1] - to) < 1) return;
        this._forecastZoom = [from, to];
        this.requestUpdate();
      },
      onForecastLayout: () => this._syncPlotStrips(),
      onPlanZoom: (from, to) => {
        const cur = this._planZoom;
        if (cur && Math.abs(cur[0] - from) < 1 && Math.abs(cur[1] - to) < 1) return;
        this._planZoom = [from, to];
        this.requestUpdate();
      },
      onPlanLayout: () => this._syncPlotStrips(),
      onToggleForecastSeries: (key: ForecastPowerKey) => {
        // SoC (+ shadow overlays) always stay — power series may all be hidden.
        const next = new Set(this._forecastHidden);
        if (next.has(key)) next.delete(key);
        else next.add(key);
        this._forecastHidden = next;
        saveForecastHidden(next);
        this.requestUpdate();
      },
      onToggleHideShadowSoc: () => {
        this._hideShadowSoc = !this._hideShadowSoc;
        saveShadowSocHidden(this._hideShadowSoc);
        this.requestUpdate();
      },
      onToggleHideExpectedSoc: () => {
        this._hideExpectedSoc = !this._hideExpectedSoc;
        saveExpectedSocHidden(this._hideExpectedSoc);
        this.requestUpdate();
      },
      onToggleHideShadowImport: () => {
        this._hideShadowImport = !this._hideShadowImport;
        saveShadowImportHidden(this._hideShadowImport);
        this.requestUpdate();
      },
      consumers: this._flowConsumers(hass),
      consumerOverflow: this._heldOverflow(this._consumerOverflow(hass)),
      onEditConsumers: () => this._openConsumers(),
      arrangeConsumers: this._arrangeConsumers,
      onToggleArrange: () => {
        this._arrangeConsumers = !this._arrangeConsumers;
        this.requestUpdate();
      },
      onResetConsumerPlaces: () => this._resetConsumerPlaces(),
      consumerPlaces: this._consumerPlacesByStyle[this._flowStyle] ?? {},
      onPlaceConsumer: (id, place) => this._placeConsumer(id, place),
      onFlowNode: (key) => this._openFlow(key),
      motion: this._motion,
      onMotion: (on) => this._setMotion(on),
      collapsed: this._collapsed,
      onToggleGroup: (id) => {
        const next = new Set(this._collapsed);
        if (!next.delete(id)) next.add(id);
        this._collapsed = next;
        saveCollapsed(next);
        this.requestUpdate();
        if (id === "balancePulse" && !next.has("balancePulse")) void this._ensureHistory();
      },
      batteryCtrlOpen: this._batteryCtrlOpen,
      onOpenBatteryCtrl: () => {
        this._batteryCtrlOpen = true;
        this.requestUpdate();
      },
      onCloseBatteryCtrl: () => {
        this._batteryCtrlOpen = false;
        this.requestUpdate();
      },
      flowOptsOpen: this._flowOptsOpen,
      onOpenFlowOpts: () => {
        this._flowOptsOpen = !this._flowOptsOpen;
        this.requestUpdate();
      },
      onCloseFlowOpts: () => {
        this._flowOptsOpen = false;
        this.requestUpdate();
      },
      balanceRange: this._balanceRange(),
      rangeSums: this._rangeSums,
      onBalanceSelect: (grain, anchor) => {
        const range = resolveBalanceRange(grain, anchor);
        const nextAnchor = range.grain === "day" && range.live ? undefined : range.anchor;
        if (grain === this._grain && nextAnchor === this._anchor) return;
        this._grain = grain;
        this._anchor = nextAnchor;
        this._calViewAnchor = range.anchor;
        if (range.grain === "day" && range.live) {
          this._rangeSums = undefined;
          this._daySparks = undefined;
        } else {
          this._rangeSums = peekLruCache(this._rangeSumsCache, range.cacheKey);
          this._daySparks = range.grain === "day" ? peekLruCache(this._daySparksCache, range.start) : undefined;
        }
        this.requestUpdate();
        void this._ensureHistory();
      },
      calOpen: this._calOpen,
      calViewAnchor: this._calViewAnchor,
      onCalOpen: (open) => {
        this._calOpen = open;
        if (open) this._calViewAnchor = this._balanceRange().anchor;
        this.requestUpdate();
      },
      onCalViewAnchor: (day) => {
        this._calViewAnchor = day;
        this.requestUpdate();
      },
      pulseRange: this._pulseRange,
      onPulseRange: (range) => {
        if (range === this._pulseRange) return;
        this._pulseRange = range;
        this._pulseDays = undefined;
        this._pulseState = "idle";
        this._loadedAt.delete(`pulse-${range}`);
        this.requestUpdate();
        void this._ensureHistory();
      },
      pulseDays: this._pulseDays,
      pulseState: this._pulseState,
      pending: this._pending,
      groupId: this._screen === "plant" ? this._plantGroup : this._settingsGroup,
      onOpenGroup: (id) => this._openSettingsGroup(id),
      setupAck: this._setupAck,
      onAckSetup: () => {
        this._setupAck = true;
        saveSetupAck();
        this.requestUpdate();
      },
      onOpenRoom: (id: string) => this._openPlantRoom(id),
      onOpenClassic: () => this._openClassic(),
      classic: this._classic,
      energy: this._energy,
      isAdmin: hass.user?.is_admin === true,
      onCreateClassic: () => void this._createClassic(),
      onCheckClassic: () => void this._checkClassic(),
      onCheckEnergy: () => void this._checkEnergy(),
      onApplyEnergy: (mode) => void this._applyEnergy(mode),
      onOpenEnergy: () => this._openEnergy(),
      onToggle: (id) => this._toggle(id),
      onPress: (id) => this._press(id),
      onSelect: (id, option) => this._select(id, option),
      onNumber: (id, value) => void this._commitNumber(id, value),
      forcePowerDraft: this._powerDraft,
      onPowerDraft: (w) => {
        this._powerDraft = w;
        this.requestUpdate();
      },
      onPowerCommit: (w) => this._commitPower(w),
      reserveDraft: this._reserveDraft,
      onReserveDraft: (percent) => {
        this._reserveDraft = percent;
        this.requestUpdate();
      },
      onReserveCommit: (percent) => this._commitReserve(percent),
      debugOpen: this._debugOpen,
      onToggleDebug: () => {
        this._debugOpen = !this._debugOpen;
        this.requestUpdate();
      },
      theme: this._theme,
      onTheme: (theme) => this._setTheme(theme),
      onThemePreview: (theme) => this._previewTheme(theme),
      themePreviewing: this._themePreview !== undefined && this._themePreview !== this._theme,
      onShowLadder: () => this._showLadder(),
      flowStyle: this._flowStyle,
      onFlowStyle: (style) => this._setFlowStyle(style),
      density: this._lookPrefs.density,
      onDensity: (density) => this._setDensity(density),
      corners: this._lookPrefs.corners,
      onCorners: (corners) => this._setCorners(corners),
      alertBannerHidden: this._bannerHidden,
      onAlertBannerHidden: (hidden) => this._setBannerHidden(hidden),
      batteryStyle: this._batteryStyle,
      onBatteryStyle: (style) => this._setBatteryStyle(style),
      phasePoints: this._phasePoints,
      phaseHistory: this._phaseHistory,
      options,
      expert: this._expert,
      onExpert: (on) => {
        this._expert = on;
        saveExpert(on);
        this.requestUpdate();
      },
      planTuneOpen: this._planTuneOpen,
      onTogglePlanTune: () => {
        this._planTuneOpen = !this._planTuneOpen;
        savePlanTuneOpen(this._planTuneOpen);
        this.requestUpdate();
      },
      pvOpen: this._pvOpen,
      onTogglePv: (section) => {
        const next = new Set(this._pvOpen);
        if (!next.delete(section)) next.add(section);
        this._pvOpen = next;
        savePvOpen(next);
        this.requestUpdate();
      },
      settingsQuery: this._settingsQuery,
      onSettingsQuery: (query) => {
        this._settingsQuery = query;
        this.requestUpdate();
      },
    };
    const current = SCREENS.find((s) => s.id === this._screen) ?? SCREENS[0];
    const settingsGroup = this._screen === "settings" ? settingsHeading(this._settingsGroup) : undefined;
    const plantGroup = this._screen === "plant" ? plantHeading(this._plantGroup) : undefined;
    const area = settingsGroup ?? plantGroup;
    const regulation = isOn(hass.states[E.ctrlActive]);
    const pauseEnd = pauseUntil(hass.states[E.ctrlActive]);
    this._syncPauseClock(pauseEnd);
    const pauseText = pauseStatus(t, hass.states[E.ctrlActive]);
    const phase = hass.states[E.phase]?.state;
    const view = { live: liveView, forecast: forecastView, plan: planView, decision: decisionView, plant: plantView, settings: settingsView }[current.id](ctx);

    const navButton = (s: (typeof SCREENS)[number]) => html`<button
      class="nav-btn ${s.id === current.id ? "active" : ""}"
      aria-current=${s.id === current.id ? "page" : "false"}
      @click=${() => this._go(s.id)}
    >
      ${icon(s.icon)}${t(s.label)}
    </button>`;

    return html`
      <div class="app">
        <nav class="rail" aria-label="Maestro">
          <div class="logo">
            <img src=${maestroLogo} alt="Maestro" />
          </div>
          ${SCREENS.map(navButton)}
          <div class="spacer"></div>
          <button class="nav-btn" @click=${() => this._setSheet(true)}>${icon(SLIDERS_ICON)}${t("navControls")}</button>
          <button class="nav-btn ${this._help ? "active" : ""}" aria-expanded=${this._help ? "true" : "false"} @click=${() => (this._help ? this._closeHelp() : this._openHelp())}>${icon(HELP_ICON)}${t("navHelp")}</button>
        </nav>
        <main>
          <header class="topbar">
            ${this._narrow
              ? html`<button class="menu" aria-label=${t("menu")} @click=${this._toggleMenu}>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" /></svg>
                </button>`
              : nothing}
            ${area
              ? html`<button class="menu" aria-label=${t("settingsBack")} @click=${() => this._closeArea()}>
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M15.4 5.4 9.8 11H21v2H9.8l5.6 5.6L14 20l-8-8 8-8z"/></svg>
                </button>`
              : nothing}
            <div class="title grow">
              <h1>${area ? t(area.title) : t(current.label)}</h1>
              <p>${area ? t(area.hint) : t(current.sub)}</p>
              ${pauseText ? html`<p class="sub">${pauseText}</p>` : nothing}
              ${area ? nothing : this._liveFacts(hass, fmt, t)}
            </div>
            <button
              type="button"
              class="menu theme-toggle"
              aria-label=${isDarkTheme(this._theme) ? t("themeToggleToLight") : t("themeToggleToDark")}
              title=${isDarkTheme(this._theme) ? t("themeToggleToLight") : t("themeToggleToDark")}
              @click=${() => this._toggleLightDark()}
            >${icon(isDarkTheme(this._theme) ? SUN_ICON : MOON_ICON)}</button>
            <button class="menu help-menu" aria-label=${t("navHelp")} @click=${() => (this._help ? this._closeHelp() : this._openHelp())}>${icon(HELP_ICON)}</button>
            <button type="button" class="pill hide-sm" @click=${() => this._openPause()}>
              <span class="dot ${regulation ? "" : "off"}"></span>${regulation ? t("regulationOn") : pauseText ?? t("regulationOff")}${phase ? ` · ${i18n.phase(phase)}` : ""}
            </button>
          </header>
          ${this._entityNotice(hass, t)}
          ${this._alerts(hass, t)}
          ${this._error && !this._sheet ? html`<p class="err" role="alert">${this._error}</p>` : nothing}
          ${this._chartError ? html`<p class="err">${t("chartError", { err: this._chartError })}</p>` : nothing}
          <section class="screen" id=${`screen-${current.id}`}>${view}</section>
          ${DEBUG
            ? html`<footer class="debug">hass-Updates ${this._stats.hassUpdates} · Renders ${this._stats.renders}</footer>`
            : nothing}
        </main>
      </div>
      ${controlsSheet({
        hass,
        i18n,
        fmt,
        open: this._sheet,
        pending: this._pending,
        error: this._error,
        forcePowerDraft: this._powerDraft,
        onClose: () => this._setSheet(false),
        onToggle: (id) => this._toggle(id),
        onPowerDraft: (w) => {
          this._powerDraft = w;
          this.requestUpdate();
        },
        onPowerCommit: (w) => this._commitPower(w),
        reserveDraft: this._reserveDraft,
        onReserveDraft: (percent) => {
          this._reserveDraft = percent;
          this.requestUpdate();
        },
        onReserveCommit: (percent) => this._commitReserve(percent),
        onPress: (id) => this._press(id),
        onSelect: (id, option) => this._select(id, option),
        onAllSettings: () => {
          this._setSheet(false);
          this._go("settings");
        },
        consumers: this._consumers,
        consumersSheet: this._consumersSheet,
        picking: this._picking,
        pickQuery: this._pickQuery,
        choices: powerSensorChoices(hass, new Set(this._consumers.map((c) => c.entityId)), this._pickQuery),
        wallbox:
          hass.states[WALLBOX_ENTITY] && !this._consumers.some((c) => c.entityId === WALLBOX_ENTITY)
            ? { id: WALLBOX_ENTITY, name: friendlyName(hass.states[WALLBOX_ENTITY], i18n.t("useWallbox")) }
            : undefined,
        onPick: (open) => {
          this._picking = open;
          this.requestUpdate();
        },
        onPickQuery: (query) => {
          this._pickQuery = query;
          this.requestUpdate();
        },
        onAddConsumer: (entityId, name) => {
          if (this._consumers.some((c) => c.entityId === entityId)) return;
          this._setConsumers([...this._consumers, { id: newConsumerId(), entityId, name, mode: "included", icon: guessIcon(entityId) }], true);
        },
        onUseWallbox: () => {
          const name = friendlyName(hass.states[WALLBOX_ENTITY], i18n.t("useWallbox"));
          this._setConsumers([...this._consumers, { id: newConsumerId(), entityId: WALLBOX_ENTITY, name, mode: "separate", icon: "wallbox" }], true);
        },
        onRenameConsumer: (id, name) => {
          const next = name.slice(0, 40);
          if (!next.trim()) return;
          this._setConsumers(this._consumers.map((c) => (c.id === id ? { ...c, name: next } : c)));
        },
        onConsumerMode: (id, mode: ConsumerMode) => {
          this._setConsumers(this._consumers.map((c) => (c.id === id ? { ...c, mode } : c)));
        },
        onConsumerIcon: (id, icon: ConsumerIcon) => {
          this._setConsumers(this._consumers.map((c) => (c.id === id ? { ...c, icon } : c)));
        },
        onRemoveConsumer: (id) => this._setConsumers(this._consumers.filter((c) => c.id !== id)),
      })}
      ${this._help
        ? helpOverlay({
            i18n,
            query: this._helpQuery,
            phase,
            planActive: isOn(hass.states[E.ctrlPlanControls]),
            lowYield: isOn(hass.states[E.lowYield]),
            current: this._helpCurrent,
            onQuery: (query) => {
              this._helpQuery = query;
              this.requestUpdate();
            },
            onClose: () => this._closeHelp(),
            onJump: (id) => this._jumpHelp(id),
            onAction: (action) => this._helpAction(action),
            onTop: () => {
              const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
              this.renderRoot.querySelector(".help-doc")?.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
            },
          })
        : nothing}
      ${this._pauseOpen
        ? pauseMenu(
            t,
            regulation,
            (hours) => void this._pause(hours),
            () => this._resumeRegulation(),
            () => {
              this._pauseOpen = false;
              this.requestUpdate();
            },
          )
        : nothing}
      ${this._batteryCtrlOpen ? batteryControlOverlay(ctx) : nothing}
      ${this._hist
        ? html`<div class="scrim open hist-scrim" @click=${() => this._closeHistory()}></div>
            <aside class="overlay" role="dialog" aria-modal="true" aria-label=${this._hist.name}>
              <div class="sheet-head">
                <div class="grow"><h2>${this._hist.name}</h2><div class="sub">${t("historySub")}</div></div>
                <button class="btn" @click=${() => this._closeHistory()}>${t("close")}</button>
              </div>
              ${this._histState === "loading" ? html`<p class="hint">${t("loading")}</p>` : nothing}
              ${this._histState === "empty" ? html`<p class="hint">${t("historyEmpty")}</p>` : nothing}
              ${this._histState === "error" ? html`<p class="err">${t("historyFailed")}</p>` : nothing}
              ${this._histState === "ready" && this._histPoints
                ? html`<maestro-chart .options=${memo(`hist-${this._hist.entityId}`, [this._theme, this._histPoints, this._hist.color, fmt.loc], () => powerHistoryOptions(this._histPoints!, this._hist!.color, fmt))}></maestro-chart>`
                : nothing}
            </aside>`
        : nothing}
    `;
  }

  protected firstUpdated(): void {
    void this._ensureHistory();
  }

  private _scrollKey = "";

  protected willUpdate(): void {
    const theme = this._themePreview ?? this._theme;
    if (this.getAttribute("theme") !== theme) this.setAttribute("theme", theme);
    const { density, corners } = this._lookPrefs;
    if (this.getAttribute("density") !== density) this.setAttribute("density", density);
    if (corners === "auto") this.removeAttribute("corners");
    else if (this.getAttribute("corners") !== corners) this.setAttribute("corners", corners);
    if (this._hass) {
      // Drop confirmed keys that cleared so the same alarm can show again later.
      this._syncAlertDismissed(activeAlertKeys(this._hass));
    }
  }

  protected updated(): void {
    const scrollKey = `${this._screen}/${this._settingsGroup ?? ""}/${this._plantGroup ?? ""}`;
    if (scrollKey !== this._scrollKey) {
      this._scrollKey = scrollKey;
      const main = this.renderRoot.querySelector("main");
      if (main && !this._focusConsumers && !this._scrollToLadder) main.scrollTop = 0;
    }
    if (this._scrollToLadder) {
      this._scrollToLadder = false;
      const ladder = this.renderRoot.querySelector<HTMLElement>("#regelleiter");
      if (ladder) {
        ladder.scrollIntoView({ behavior: "smooth", block: "start" });
        ladder.classList.remove("ladder-flash");
        // Restart CSS animation if the user taps the link again.
        void ladder.offsetWidth;
        ladder.classList.add("ladder-flash");
      }
    }
    void this._loadOptions();
    if (this._screen === "settings" && this._settingsGroup === CLASSIC_DASHBOARD.id && !this._classic) {
      void this._checkClassic();
    }
    if (this._screen === "settings" && this._settingsGroup === ENERGY_DASHBOARD.id && !this._energy) {
      void this._checkEnergy();
    }
    if (this._focusConsumers) {
      this._focusConsumers = false;
      this.renderRoot.querySelector("#display-consumers")?.scrollIntoView({ block: "start" });
    }
    if (this._help) this._bindHelpScroll();
    else this._unbindHelpScroll();
    if (this._helpAnchor) {
      const anchor = this._helpAnchor;
      this._helpAnchor = undefined;
      this._helpCurrent = anchor.startsWith("ch-") ? anchor.slice(3) : anchor;
      this._scrollHelp(anchor);
      this.renderRoot.querySelector<HTMLInputElement>(".help-query")?.focus({ preventScroll: true });
    }
    if (!this._hass) return;
    if (this._screen === "forecast") {
      const traj = parseTrajectory(this._hass.states[E.trajectory]?.attributes);
      const el = this.renderRoot.querySelector<MaestroChart>("#fc-main");
      if (traj && el) {
        // Re-zoom only when the window inputs change, never on live updates (keeps the user's drag-zoom).
        const win = forecastWindow(traj, this._range, {
          showIst: this._showIst,
          istStart: this._ist?.pv[0]?.[0] ?? this._ist?.soc[0]?.[0],
        });
        const key = `${this._range}|${win.from}|${win.to}`;
        if (key !== this._zoomKey) {
          this._zoomKey = key;
          this._forecastZoom = [win.from, win.to];
          el.zoomX(win.from, win.to);
        }
      }
    }
    this._syncPlotStrips();
  }

  /**
   * Align HTML slot strips (+ forecast brush) to the Apex plot: same pixel
   * inset/width and the same x-window Apex is actually showing.
   */
  private _syncPlotStrips(): void {
    const run = () => {
      this._syncOnePlotStrip("#fc-main", ".strategy-strip .strip-track", "forecast");
      this._syncOnePlotStrip("#plan-main", ".plan-slots-strip .strip-track", "plan");
    };
    // Apex finishes layout after zoom/render — wait two frames.
    requestAnimationFrame(() => requestAnimationFrame(run));
  }

  private _syncOnePlotStrip(
    chartSel: string,
    trackSel: string,
    zoom: "forecast" | "plan",
  ): void {
    const chart = this.renderRoot.querySelector<MaestroChart>(chartSel);
    if (!chart) return;
    const m = chart.plotMetrics();
    if (!m) return;
    const left = Math.round(m.left);
    const width = Math.round(m.width);
    const track = this.renderRoot.querySelector<HTMLElement>(trackSel);
    if (track) {
      track.style.marginLeft = `${left}px`;
      track.style.width = `${width}px`;
      track.style.maxWidth = `${width}px`;
      track.style.marginRight = "auto";
    }
    if (zoom === "forecast") {
      // Brush has no kW/SoC axes, so Apex gives it a wider plot — match main padding.
      const brush = this.renderRoot.querySelector<MaestroChart>("#fc-brush");
      if (brush) {
        const right = Math.max(0, Math.round(chart.getBoundingClientRect().width - m.left - m.width));
        brush.setPlotPadding(left, right);
      }
      const cur = this._forecastZoom;
      if (!cur || Math.abs(cur[0] - m.minX) > 1 || Math.abs(cur[1] - m.maxX) > 1) {
        this._forecastZoom = [m.minX, m.maxX];
        this.requestUpdate();
      }
    } else {
      // Pin each strip slot to the rendered column — Apex bar geometry ≠ pure time %.
      if (track) this._syncPlanStripToBars(chart, track);
      const cur = this._planZoom;
      if (!cur || Math.abs(cur[0] - m.minX) > 1 || Math.abs(cur[1] - m.maxX) > 1) {
        this._planZoom = [m.minX, m.maxX];
        this.requestUpdate();
      }
    }
  }

  /** Overlay plan strip slots onto the Apex column paths (same left/width). */
  private _syncPlanStripToBars(chart: MaestroChart, track: HTMLElement): void {
    const bars = [...chart.querySelectorAll<SVGPathElement>(".apexcharts-bar-series path")].filter(
      (p) => p.getBoundingClientRect().width > 1,
    );
    const slots = [...track.querySelectorAll<HTMLElement>(".strip.timed .slot")];
    if (!bars.length || bars.length !== slots.length) return;
    const origin = track.getBoundingClientRect().left;
    const trackW = track.getBoundingClientRect().width;
    if (!(trackW > 0)) return;
    for (let i = 0; i < slots.length; i++) {
      const b = bars[i].getBoundingClientRect();
      const leftPct = ((b.left - origin) / trackW) * 100;
      const widthPct = (b.width / trackW) * 100;
      if (!Number.isFinite(leftPct) || !Number.isFinite(widthPct)) continue;
      slots[i].style.left = `${leftPct}%`;
      slots[i].style.width = `${Math.max(widthPct, 0.15)}%`;
    }
  }
}

if (!customElements.get("e3dc-maestro-panel")) {
  customElements.define("e3dc-maestro-panel", MaestroPanel);
}
