/** Round watts to the same 0.1 kW / whole-W buckets that `fmt.w` uses. */
export function wattDisplayUnits(watts: number): { kind: "kW"; tenths: number } | { kind: "W"; watts: number } {
  const a = Math.abs(watts);
  if (a >= 1000) return { kind: "kW", tenths: Math.round(a / 100) };
  return { kind: "W", watts: Math.round(a) };
}

/**
 * Format Haupt + Zusatz so the displayed parts always add up to the displayed total.
 * Adjusts Haupt to match (total − Zusatz) after rounding.
 */
export function consistentWattParts(
  main: number,
  extra: number,
  formatKw: (tenths: number) => string,
  formatW: (watts: number) => string,
): { total: string; main: string; extra: string } {
  const mainW = Math.max(0, main);
  const extraW = Math.max(0, extra);
  const totalW = mainW + extraW;
  const totalU = wattDisplayUnits(totalW);
  const extraU = wattDisplayUnits(extraW);

  if (totalU.kind === "kW") {
    const extraTenths = extraU.kind === "kW" ? extraU.tenths : Math.round(extraW / 100);
    const mainTenths = Math.max(0, totalU.tenths - extraTenths);
    return {
      total: formatKw(totalU.tenths),
      main: formatKw(mainTenths),
      extra: formatKw(extraTenths),
    };
  }

  const extraWatts = extraU.kind === "W" ? extraU.watts : extraU.tenths * 100;
  const mainWatts = Math.max(0, totalU.watts - extraWatts);
  return {
    total: formatW(totalU.watts),
    main: formatW(mainWatts),
    extra: formatW(extraWatts),
  };
}

/** Same idea for day kWh: Haupt = total − Zusatz after 1-decimal rounding. */
export function consistentEnergyParts(
  total: number | undefined,
  extra: number,
  format: (v: number) => string,
): { total: string; main: string; extra: string } | undefined {
  if (total === undefined || !Number.isFinite(total)) return undefined;
  const totalTenth = Math.round(Math.max(0, total) * 10);
  const extraTenth = Math.round(Math.max(0, extra) * 10);
  const mainTenth = Math.max(0, totalTenth - extraTenth);
  return {
    total: format(totalTenth / 10),
    main: format(mainTenth / 10),
    extra: format(extraTenth / 10),
  };
}
