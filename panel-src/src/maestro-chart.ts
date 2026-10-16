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

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._run++;
    this._chart?.destroy();
    this._chart = undefined;
  }

  zoomX(min: number, max: number): void {
    this._zoom = [min, max];
    this._chart?.zoomX(min, max);
  }

  private async _apply(): Promise<void> {
    const opts = this.options;
    if (!opts) return;
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
