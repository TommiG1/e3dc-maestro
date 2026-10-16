import { LitElement, css, html, nothing } from "lit";
import { ENTITIES, PHASES, WATCHED, num, type Hass, type HassEntity } from "./entities";
import type { ForecastChart } from "./forecast-chart";

const DEBUG = new URLSearchParams(location.search).has("debug");
const RANGES = [6, 12, 24] as const;

class MaestroPanel extends LitElement {
  private _hass?: Hass;
  private _range: number = 24;
  private _chart?: ForecastChart;
  private _chartInput?: [HassEntity | undefined, HassEntity | undefined];
  private _stats = { hassUpdates: 0, renders: 0, chartDraws: 0, chartMs: 0 };

  // HA sets `hass` on every state change in the house; only re-render for our entities.
  set hass(hass: Hass) {
    this._stats.hassUpdates++;
    const prev = this._hass;
    this._hass = hass;
    if (!prev || WATCHED.some((id) => prev.states[id] !== hass.states[id])) {
      this.requestUpdate();
    } else if (DEBUG) {
      this.requestUpdate();
    }
  }

  get hass(): Hass | undefined {
    return this._hass;
  }

  private _narrow = false;

  set narrow(narrow: boolean) {
    if (narrow === this._narrow) return;
    this._narrow = narrow;
    this.requestUpdate();
  }

  get narrow(): boolean {
    return this._narrow;
  }

  private _toggleMenu() {
    this.dispatchEvent(new Event("hass-toggle-menu", { bubbles: true, composed: true }));
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._chartInput = undefined;
    this.requestUpdate();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._chart?.destroy();
    this._chart = undefined;
  }

  private _state(id: string): HassEntity | undefined {
    return this._hass?.states[id];
  }

  protected render() {
    this._stats.renders++;
    const traj = this._state(ENTITIES.trajectory);
    const phase = this._state(ENTITIES.phase)?.state;
    const soc = num(this._state(ENTITIES.soc));
    const hasTrajectory = Array.isArray(traj?.attributes.trajectory_points);

    return html`
      <header>
        <div class="brand">
          ${this._narrow
            ? html`<button class="menu" aria-label="Menü" @click=${this._toggleMenu}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
                </svg>
              </button>`
            : nothing}
          <span class="logo"></span>
          <div>
            <h1>Maestro</h1>
            <p>Prognose der nächsten 24 Stunden</p>
          </div>
        </div>
        <div class="chips">
          ${phase ? html`<span class="chip accent">${PHASES[phase] ?? phase}</span>` : nothing}
          ${soc !== undefined ? html`<span class="chip">SoC ${Math.round(soc)} %</span>` : nothing}
        </div>
      </header>

      <section class="card">
        <div class="card-head">
          <h2>SoC-Trajektorie und Leistung</h2>
          <div class="seg" role="group" aria-label="Zeitraum">
            ${RANGES.map(
              (h) => html`<button
                class=${this._range === h ? "active" : ""}
                aria-pressed=${this._range === h}
                @click=${() => this._zoom(h)}
              >
                ${h} h
              </button>`,
            )}
          </div>
        </div>
        <div id="chart" ?hidden=${!hasTrajectory}></div>
        ${hasTrajectory
          ? nothing
          : html`<p class="empty">
              Noch keine Prognose verfügbar. Maestro braucht mindestens 7 Tage Verlauf.
            </p>`}
      </section>

      ${DEBUG
        ? html`<footer>
            hass-Updates ${this._stats.hassUpdates} · Renders ${this._stats.renders} · Chart-Draws
            ${this._stats.chartDraws} · letzter Chart ${this._stats.chartMs.toFixed(0)} ms
          </footer>`
        : nothing}
    `;
  }

  protected updated(): void {
    const traj = this._state(ENTITIES.trajectory);
    const target = this._state(ENTITIES.targetSoc);
    if (this._chartInput?.[0] === traj && this._chartInput?.[1] === target) return;
    this._chartInput = [traj, target];
    void this._drawChart(traj, target);
  }

  private async _drawChart(traj: HassEntity | undefined, target: HassEntity | undefined) {
    const el = this.renderRoot.querySelector<HTMLElement>("#chart");
    const { ForecastChart, isTrajectory } = await import("./forecast-chart");
    if (!el || !isTrajectory(traj?.attributes)) {
      this._chart?.destroy();
      this._chart = undefined;
      return;
    }
    const t0 = performance.now();
    this._chart ??= new ForecastChart(el);
    await this._chart.update(traj.attributes, num(target));
    if (this._range !== 24) this._chart.zoomHours(this._range);
    this._stats.chartDraws++;
    this._stats.chartMs = performance.now() - t0;
    if (DEBUG) this.requestUpdate();
  }

  private _zoom(hours: number) {
    this._range = hours;
    this._chart?.zoomHours(hours);
    this.requestUpdate();
  }

  static styles = css`
    :host {
      --bg: #070b14;
      --glass: rgba(255, 255, 255, 0.045);
      --stroke: rgba(255, 255, 255, 0.08);
      --text: #e8edf7;
      --muted: #8b96ad;
      --faint: #5a6580;
      --accent: #38bdf8;
      --radius: 20px;
      display: block;
      min-height: 100%;
      box-sizing: border-box;
      padding: 24px;
      color: var(--text);
      font-family: Inter, system-ui, sans-serif;
      background:
        radial-gradient(1200px 600px at 10% -10%, rgba(56, 189, 248, 0.12), transparent 60%),
        radial-gradient(900px 500px at 110% 10%, rgba(167, 139, 250, 0.1), transparent 60%),
        var(--bg);
    }
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 20px;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .menu {
      width: 40px;
      height: 40px;
      border: 0;
      border-radius: 12px;
      background: var(--glass);
      color: var(--text);
      cursor: pointer;
    }
    .menu svg {
      width: 22px;
      height: 22px;
      fill: currentColor;
    }
    .logo {
      width: 40px;
      height: 40px;
      border-radius: 12px;
      background: linear-gradient(135deg, #38bdf8, #a78bfa);
    }
    h1 {
      margin: 0;
      font-size: 22px;
      font-weight: 700;
    }
    h1 + p {
      margin: 2px 0 0;
      color: var(--muted);
      font-size: 13px;
    }
    .chips {
      display: flex;
      gap: 8px;
    }
    .chip {
      padding: 6px 12px;
      border-radius: 999px;
      border: 1px solid var(--stroke);
      background: var(--glass);
      font-size: 13px;
    }
    .chip.accent {
      color: var(--accent);
      border-color: rgba(56, 189, 248, 0.35);
    }
    .card {
      background: var(--glass);
      border: 1px solid var(--stroke);
      border-radius: var(--radius);
      backdrop-filter: blur(20px);
      padding: 20px;
    }
    .card-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }
    h2 {
      margin: 0;
      font-size: 15px;
      font-weight: 600;
    }
    .seg {
      display: inline-flex;
      padding: 3px;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.05);
    }
    .seg button {
      border: 0;
      background: transparent;
      color: var(--muted);
      font: inherit;
      font-size: 13px;
      padding: 6px 12px;
      border-radius: 8px;
      cursor: pointer;
    }
    .seg button.active {
      background: rgba(255, 255, 255, 0.1);
      color: var(--text);
    }
    .seg button:focus-visible {
      outline: 2px solid var(--accent);
    }
    #chart {
      margin-top: 8px;
      min-height: 420px;
    }
    .empty {
      color: var(--muted);
      padding: 48px 0;
      text-align: center;
    }
    footer {
      margin-top: 12px;
      color: var(--faint);
      font: 12px ui-monospace, monospace;
    }
    @media (max-width: 600px) {
      :host {
        padding: 16px;
      }
      .card {
        padding: 14px;
      }
    }
  `;
}

if (!customElements.get("e3dc-maestro-panel")) {
  customElements.define("e3dc-maestro-panel", MaestroPanel);
}
