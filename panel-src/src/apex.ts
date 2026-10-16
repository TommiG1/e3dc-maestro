// Lazily loaded chunk: ApexCharts core plus only the chart types and features the panel uses.
import { foreignSVG } from "./svg-guard";
import ApexCharts from "apexcharts/core";
import "apexcharts/line";
import "apexcharts/area";
import "apexcharts/column";
import "apexcharts/radialBar";
import "apexcharts/features/annotations";
import "apexcharts/features/toolbar";

// ApexCharts reads window.SVG at render time, so the slot is shared with other chart cards
// on the page. Hold ours while the panel is visible and hand theirs back afterwards.
const w = window as unknown as { SVG?: unknown };
const ownSVG = w.SVG;
let foreign = foreignSVG;
if (foreign !== undefined) w.SVG = foreign;

export function claimSVG(): void {
  if (w.SVG === ownSVG) return;
  foreign = w.SVG;
  w.SVG = ownSVG;
}

export function releaseSVG(): void {
  if (w.SVG === ownSVG && foreign !== undefined) w.SVG = foreign;
}

export default ApexCharts;
