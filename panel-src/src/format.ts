import { consistentEnergyParts, consistentWattParts } from "./format-split";

export const makeFmt = (lang: string) => {
  const loc = lang || "de";
  const n = (v: number | undefined, digits = 1): string =>
    v === undefined || !Number.isFinite(v)
      ? "–"
      : v.toLocaleString(loc, { minimumFractionDigits: digits, maximumFractionDigits: digits });
  const w = (v: number | undefined): string =>
    v === undefined || !Number.isFinite(v)
      ? "–"
      : Math.abs(v) >= 1000
        ? `${n(Math.abs(v) / 1000, 1)} kW`
        : `${Math.round(Math.abs(v))} W`;
  /** Haupt/Zusatz parts that always sum to the displayed total (avoids 5,1+2,1≠7,1). */
  const wParts = (main: number, extra: number) =>
    consistentWattParts(
      main,
      extra,
      (tenths) => `${n(tenths / 10, 1)} kW`,
      (watts) => `${watts} W`,
    );
  /** Day kWh parts that always sum to the displayed PV total. */
  const kwhParts = (total: number | undefined, extra: number) =>
    consistentEnergyParts(total, extra, (v) => n(v, 1));
  const time = (v: number | string): string =>
    new Date(v).toLocaleTimeString(loc, { hour: "2-digit", minute: "2-digit" });
  const dayTime = (v: number | string): string =>
    new Date(v).toLocaleString(loc, { weekday: "short", hour: "2-digit", minute: "2-digit" });
  const day = (v: number | string | Date): string =>
    new Date(v).toLocaleDateString(loc, { weekday: "short", day: "numeric", month: "short" });
  return { loc, n, w, wParts, kwhParts, time, dayTime, day };
};

export type Fmt = ReturnType<typeof makeFmt>;
