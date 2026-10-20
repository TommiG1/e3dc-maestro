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
  const time = (v: number | string): string =>
    new Date(v).toLocaleTimeString(loc, { hour: "2-digit", minute: "2-digit" });
  const dayTime = (v: number | string): string =>
    new Date(v).toLocaleString(loc, { weekday: "short", hour: "2-digit", minute: "2-digit" });
  const day = (v: number | string | Date): string =>
    new Date(v).toLocaleDateString(loc, { weekday: "short", day: "numeric", month: "short" });
  return { loc, n, w, time, dayTime, day };
};

export type Fmt = ReturnType<typeof makeFmt>;
