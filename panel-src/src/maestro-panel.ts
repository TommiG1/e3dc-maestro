import { LitElement, html, nothing, type TemplateResult } from "lit";
import "./maestro-chart";
import type { MaestroChart } from "./maestro-chart";
import { controlsSheet } from "./controls";
import { applyEntityMap, DEFAULT_IDS, E, isOn, watched, type EntityKey, type EntityMap, type Hass } from "./entities";
import { makeFmt } from "./format";
import { loadIst, loadSparks, loadTimeline, type IstSeries, type SparkKey } from "./history";
import { makeI18n, type Key } from "./i18n";
import { styles } from "./styles";
import { parseTrajectory, type Point, type TimelineItem } from "./transform";
import { decisionView, forecastView, liveView, planView, type Ctx } from "./views";

const DEBUG = new URLSearchParams(location.search).has("debug");

type Screen = "live" | "forecast" | "plan" | "decision";
const SCREENS: { id: Screen; label: Key; sub: Key; icon: string }[] = [
  { id: "live", label: "navLive", sub: "subLive", icon: '<circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>' },
  { id: "forecast", label: "navForecast", sub: "subForecast", icon: '<path d="M3 3v18h18"/><path d="m7 15 4-5 3 3 5-7"/>' },
  { id: "plan", label: "navPlan", sub: "subPlan", icon: '<rect x="3" y="10" width="4" height="11" rx="1"/><rect x="10" y="5" width="4" height="16" rx="1"/><rect x="17" y="13" width="4" height="8" rx="1"/>' },
  { id: "decision", label: "navDecision", sub: "subDecision", icon: '<circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 2"/>' },
];
const SLIDERS_ICON = '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>';
const MOBILE = "(max-width: 960px)";
const HISTORY_TTL = 5 * 60e3;
const HISTORY_RETRY = 60e3;
const IST_HOURS = 6;
const RESOLVE_RETRY = 30e3;
const MISSING_SHOWN = 6;

const icon = (paths: string, cls = "") =>
  html`<svg class=${cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" .innerHTML=${paths}></svg>`;

const initialScreen = (): Screen => {
  const h = location.hash.slice(1);
  return SCREENS.some((s) => s.id === h) ? (h as Screen) : "live";
};

class MaestroPanel extends LitElement {
  static styles = styles;

  private _hass?: Hass;
  private _narrow = false;
  private _screen: Screen = initialScreen();
  private _sheet = false;
  private _mobile = window.matchMedia(MOBILE).matches;
  private _mq = window.matchMedia(MOBILE);
  private _range = 24;
  private _showIst = true;
  private _sparks?: Record<SparkKey, Point[]>;
  private _ist?: IstSeries;
  private _timeline?: TimelineItem[];
  private _loadedAt = new Map<string, number>();
  private _pending = new Set<string>();
  private _error?: string;
  private _chartError?: string;
  private _powerDraft?: number;
  private _zoomKey?: string;
  private _timer?: number;
  private _stats = { hassUpdates: 0, renders: 0 };
  private _entityMap?: EntityMap;
  private _resolvedAt = 0;

  // HA sets `hass` on every state change in the house; only re-render for our entities.
  set hass(hass: Hass) {
    this._stats.hassUpdates++;
    const prev = this._hass;
    this._hass = hass;
    if (!prev || this._missingKeys(hass).length) void this._resolveEntities();
    if (!prev || prev.language !== hass.language || watched().some((id) => prev.states[id] !== hass.states[id])) {
      this.requestUpdate();
    } else if (DEBUG) {
      this.requestUpdate();
    }
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
    this._mq.addEventListener("change", this._onMq);
    this._mobile = this._mq.matches;
    this._timer = window.setInterval(() => void this._ensureHistory(), HISTORY_RETRY);
    this.addEventListener("chart-error", this._onChartError as EventListener);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._mq.removeEventListener("change", this._onMq);
    window.clearInterval(this._timer);
    this.removeEventListener("chart-error", this._onChartError as EventListener);
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

  // ------------------------------------------------------------ history

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
    if (this._screen === "forecast" && this._showIst) {
      await run("ist", async () => void (this._ist = await loadIst(hass, IST_HOURS)));
    }
    if (this._screen === "decision") await run("timeline", async () => void (this._timeline = await loadTimeline(hass)));
  }

  // ------------------------------------------------------------ actions

  private _go(screen: Screen): void {
    this._screen = screen;
    this._zoomKey = undefined;
    history.replaceState(null, "", `#${screen}`);
    this.requestUpdate();
    void this._ensureHistory();
  }

  private _setSheet(open: boolean): void {
    this._sheet = open;
    if (!open) this._error = undefined;
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

  private _toggle(id: string): void {
    const on = isOn(this._hass?.states[id]);
    void this._call(id, "switch", on ? "turn_off" : "turn_on", { entity_id: id });
  }

  private _commitPower(watts: number): void {
    void this._call(E.forceDischargePower, "number", "set_value", { entity_id: E.forceDischargePower, value: watts }).then(() => {
      this._powerDraft = undefined;
      this.requestUpdate();
    });
  }

  private _openSettings(): void {
    this._setSheet(false);
    history.pushState(null, "", "/e3dc-maestro");
    window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false } }));
  }

  private _toggleMenu(): void {
    this.dispatchEvent(new Event("hass-toggle-menu", { bubbles: true, composed: true }));
  }

  // ------------------------------------------------------------ render

  protected render(): TemplateResult {
    this._stats.renders++;
    const hass = this._hass;
    if (!hass) return html``;
    const i18n = makeI18n(hass.language);
    const fmt = makeFmt(hass.language);
    const { t } = i18n;
    const ctx: Ctx = {
      hass,
      i18n,
      fmt,
      mobile: this._mobile,
      sparks: this._sparks,
      ist: this._ist,
      timeline: this._timeline,
      range: this._range,
      showIst: this._showIst,
      onRange: (h) => {
        this._range = h;
        this.requestUpdate();
      },
      onToggleIst: () => {
        this._showIst = !this._showIst;
        this.requestUpdate();
        void this._ensureHistory();
      },
    };
    const current = SCREENS.find((s) => s.id === this._screen) ?? SCREENS[0];
    const regulation = isOn(hass.states[E.ctrlActive]);
    const phase = hass.states[E.phase]?.state;
    const view = { live: liveView, forecast: forecastView, plan: planView, decision: decisionView }[current.id](ctx);

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
            <svg viewBox="0 0 24 24" fill="none" stroke="#06101f" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" /></svg>
          </div>
          ${SCREENS.map(navButton)}
          <div class="spacer"></div>
          <button class="nav-btn" @click=${() => this._setSheet(true)}>${icon(SLIDERS_ICON)}${t("navControls")}</button>
        </nav>
        <main>
          <header class="topbar">
            ${this._narrow
              ? html`<button class="menu" aria-label=${t("menu")} @click=${this._toggleMenu}>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" /></svg>
                </button>`
              : nothing}
            <div class="title grow">
              <h1>${t(current.label)}</h1>
              <p>${t(current.sub)}</p>
            </div>
            <span class="pill hide-sm"><span class="dot ${regulation ? "" : "off"}"></span>${regulation ? t("regulationOn") : t("regulationOff")}${phase ? ` · ${i18n.phase(phase)}` : ""}</span>
          </header>
          ${this._entityNotice(hass, t)}
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
        onAllSettings: () => this._openSettings(),
      })}
    `;
  }

  protected firstUpdated(): void {
    void this._ensureHistory();
  }

  protected updated(): void {
    if (this._screen !== "forecast" || !this._hass) return;
    const traj = parseTrajectory(this._hass.states[E.trajectory]?.attributes);
    const el = this.renderRoot.querySelector<MaestroChart>("#fc-main");
    if (!traj || !el) return;
    // Re-zoom only when the window inputs change, never on live updates (keeps the user's drag-zoom).
    const x0 = traj.trajectory_points[0][0];
    const x1 = traj.trajectory_points[traj.trajectory_points.length - 1][0];
    const from = this._showIst && this._ist?.pv.length ? Math.min(x0, this._ist.pv[0][0]) : x0;
    const key = `${this._range}|${from}|${x0}`;
    if (key === this._zoomKey) return;
    this._zoomKey = key;
    el.zoomX(from, Math.min(x1, x0 + this._range * 3600e3));
  }
}

if (!customElements.get("e3dc-maestro-panel")) {
  customElements.define("e3dc-maestro-panel", MaestroPanel);
}
