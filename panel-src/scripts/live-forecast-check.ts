// Diagnostic: run batteryForecast against live HA data. Usage: HA_URL=… HA_TOKEN=… npx tsx scripts/live-forecast-check.ts
import { batteryForecast, parseTrajectory } from "../src/transform";

const url = process.env.HA_URL!;
const token = process.env.HA_TOKEN!;
const get = async (id: string) => {
  const res = await fetch(`${url}/api/states/${id}`, { headers: { Authorization: `Bearer ${token}` } });
  return res.json() as Promise<{ state: string; attributes: Record<string, unknown> }>;
};
const fmt = (ms?: number) =>
  ms === undefined ? "–" : new Date(ms).toLocaleString("de-DE", { timeZone: "Europe/Berlin", weekday: "short", hour: "2-digit", minute: "2-digit" });

const [socE, gridE, resOn, resPct, traj] = await Promise.all([
  get("sensor.e3dc_maestro_aktueller_soc"),
  get("sensor.e3dc_maestro_grid_power"),
  get("switch.e3dc_maestro_notstromreserve"),
  get("number.e3dc_maestro_notstromreserve_prozent"),
  get("sensor.e3dc_maestro_forecast_soc_trajektorie_24h"),
]);
const soc = Number(socE.state);
const reserve = resOn.state === "on" ? Number(resPct.state) : undefined;
const t = parseTrajectory(traj.attributes)!;
const now = Date.now();
console.log(`now ${fmt(now)} | SoC ${soc} % | reserve ${reserve ?? "off"} | traj updated ${traj.attributes && (traj as { last_updated?: string }).last_updated}`);
const pts = t.trajectory_points;
const phases = t.trajectory_phases;
const grid = new Map(t.grid_points.map(([x, v]) => [x, v]));
const bat = new Map(((traj.attributes.battery_points as [number, number][]) ?? []).map(([x, v]) => [x, v]));
const step = Number(process.env.STEP ?? 4);
for (let i = 0; i < pts.length; i += step) {
  const [x, s] = pts[i];
  console.log(
    `${fmt(x)}  soc ${String(s).padStart(5)}  grid ${String(grid.get(x) ?? "").padStart(6)}  bat ${String(bat.get(x) ?? "").padStart(6)}  ${phases[i] ?? ""}`,
  );
}
const currentGrid = Number(gridE.state);
console.log(`live grid ${currentGrid} W`);
const f = batteryForecast(pts, t.grid_points, {
  reserve,
  currentSoc: soc,
  currentGrid,
  battery: t.battery_points,
  timeZone: "Europe/Berlin",
});
console.log("\nforecast:", {
  peak: f?.peakSoc,
  peakAt: fmt(f?.peakAt),
  peakDay: f?.peakDay,
  floor: f?.floorKind,
  floorAt: fmt(f?.floorAt),
  grid: f?.gridImportKind,
  gridAt: fmt(f?.gridImportAt),
});
