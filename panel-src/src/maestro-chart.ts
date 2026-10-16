import { LitElement } from "lit";
import type ApexChartsType from "apexcharts";

type Opts = ApexChartsType.ApexOptions;

interface ChartApi {
  render(): Promise<void>;
  updateOptions(o: Opts, redraw?: boolean, animate?: boolean): Promise<unknown>;
  zoomX(min: number, max: number): void;
  destroy(): void;
}

interface ApexStatic {
  new (el: HTMLElement, o: Opts): ChartApi;
  getChartByID(id: string): ChartApi | undefined;
}

const roots = new WeakMap<Node, string>();

/**
 * Thin ApexCharts host. Renders into itself (no shadow root) so the panel's
 * styles reach tooltips, and loads ApexCharts only when the first chart appears.
 */
export class MaestroChart extends LitElement {
  static properties = { options: { attribute: false } };

  options?: Opts;
  private _chart?: ChartApi;
  private _zoom?: [number, number];
  private _run = 0;

  createRenderRoot(): HTMLElement {
    return this;
  }

  protected updated(changed: Map<string, unknown>): void {
    if (changed.has("options")) {
      this._apply().catch((err: unknown) => {
        this.dispatchEvent(
          new CustomEvent("chart-error", {
            detail: err instanceof Error ? `${err.name}: ${err.message}` : String(err),
            bubbles: true,
            composed: true,
          }),
        );
      });
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    // Re-attached (e.g. after switching dashboards): the chart was destroyed on disconnect.
    if (this.hasUpdated && this.options && !this._chart) this.requestUpdate("options");
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._run++;
    try {
      this._chart?.destroy();
    } catch {
      /* chart already torn down */
    }
    this._chart = undefined;
    this.replaceChildren();
  }

  /** Make chart ids unique per instance so stale registry entries of a previous panel cannot collide. */
  private _scoped(o: Opts): Opts {
    const id = o.chart?.id;
    const target = o.chart?.brush?.target;
    const root = this.getRootNode();
    let uid = roots.get(root);
    if (!uid) roots.set(root, (uid = Math.random().toString(36).slice(2, 8)));
    const sfx = uid;
    return {
      ...o,
      chart: {
        ...o.chart,
        ...(id ? { id: `${id}-${sfx}` } : {}),
        ...(target ? { brush: { ...o.chart?.brush, target: `${target}-${sfx}` } } : {}),
      },
    } as Opts;
  }

  zoomX(min: number, max: number): void {
    this._zoom = [min, max];
    this._chart?.zoomX(min, max);
  }

  private async _apply(): Promise<void> {
    const raw = this.options;
    if (!raw) return;
    const opts = this._scoped(raw);
    const run = ++this._run;
    const Apex = (await import("./apex")).default as unknown as ApexStatic;
    if (run !== this._run || !this.isConnected) return;

    const target = opts.chart?.brush?.target;
    if (target) {
      // A brush chart needs its target chart to exist already.
      for (let i = 0; i < 120 && !Apex.getChartByID(target); i++) {
        await new Promise((r) => requestAnimationFrame(r));
        if (run !== this._run) return;
      }
    }

    if (this._chart) {
      await this._chart.updateOptions(opts, false, false);
    } else {
      this._chart = new Apex(this, opts);
      await this._chart.render();
    }
    if (run === this._run && this._zoom) this._chart.zoomX(...this._zoom);
  }
}

if (!customElements.get("maestro-chart")) {
  customElements.define("maestro-chart", MaestroChart);
}
