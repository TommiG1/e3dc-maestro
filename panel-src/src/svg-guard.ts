// Must be evaluated before apexcharts/core: ApexCharts only installs its SVG library into
// window.SVG when the slot is empty, and other cards (apexcharts-card) put svg.js 2.x there.
const w = window as unknown as { SVG?: unknown };

export const foreignSVG = w.SVG;
delete w.SVG;
