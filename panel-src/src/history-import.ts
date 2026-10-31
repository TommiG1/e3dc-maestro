import type { Hass } from "./entities";
import type { Key } from "./i18n";
import { energyErrorText } from "./energy-dashboard";

export type HistoryImportMode = "extend" | "replace";

export type HistoryImportRole =
  | "solar"
  | "external"
  | "grid_import"
  | "grid_export"
  | "battery_charge"
  | "battery_discharge"
  | "house"
  | "wallbox"
  | "heat_pump"
  | "house_power";

export interface HistoryImportFileEntry {
  index: number;
  period: { first: string | null; last: string | null };
  hours: number;
  overlapHours: number;
}

export interface HistoryImportSeriesEntry {
  statisticId: string;
  hours: number;
  hoursExisting: number;
  hoursNew: number;
  hoursTotal: number;
  first: string | null;
  last: string | null;
  cutoff: string | null;
  cutoffSource: "live_statistics" | "now_minus_margin" | string;
  hoursSkippedCutoff: number;
  warnings: string[];
  totalKwh?: number;
  meanW?: number;
}

export interface HistoryImportResult {
  ok: boolean;
  mode: HistoryImportMode;
  files: HistoryImportFileEntry[];
  period: { start: string; end: string } | null;
  columns: Record<string, string>;
  sumsKwh: Record<string, number>;
  consumersKwh: Record<string, number>;
  series: Partial<Record<HistoryImportRole, HistoryImportSeriesEntry>>;
  existingHistory: string[];
  hoursToImport: number;
  hoursSkippedCutoff: number;
  warnings: string[];
  errors: string[];
  planHash: string | null;
  written?: Record<string, number>;
}

export type HistoryImportPhase = "idle" | "loading" | "preview" | "applying" | "applied" | "error";

export interface HistoryImportState {
  phase: HistoryImportPhase;
  csvTexts?: string[];
  fileNames?: string[];
  mode?: HistoryImportMode;
  result?: HistoryImportResult;
  error?: string;
  errorKey?: Key;
}

export interface HistoryDashboardSourceSummary {
  type: string;
  statisticIds: string[];
}

export interface HistoryImportDashboardStatus {
  ok: boolean;
  energyReady: boolean;
  ready?: boolean;
  importedStatistics: string[];
  toAdd: HistoryDashboardSourceSummary[];
  alreadyPresent: HistoryDashboardSourceSummary[];
  added?: HistoryDashboardSourceSummary[];
  removed?: string[];
  error?: string;
}

type SeriesRaw = {
  statistic_id?: string;
  hours?: number;
  hours_existing?: number;
  hours_new?: number;
  hours_total?: number;
  first?: string | null;
  last?: string | null;
  cutoff?: string | null;
  cutoff_source?: string;
  hours_skipped_cutoff?: number;
  warnings?: string[];
  total_kwh?: number;
  mean_w?: number;
};

type FileRaw = {
  index?: number;
  period?: { first?: string | null; last?: string | null };
  hours?: number;
  overlap_hours?: number;
};

type ResultRaw = {
  ok?: boolean;
  mode?: string;
  files?: FileRaw[];
  period?: { start?: string; end?: string } | null;
  columns?: Record<string, string>;
  sums_kwh?: Record<string, number>;
  consumers_kwh?: Record<string, number>;
  series?: Record<string, SeriesRaw>;
  existing_history?: string[];
  hours_to_import?: number;
  hours_skipped_cutoff?: number;
  warnings?: string[];
  errors?: string[];
  plan_hash?: string | null;
  written?: Record<string, number>;
};

type DashboardRaw = {
  ok?: boolean;
  energy_ready?: boolean;
  ready?: boolean;
  imported_statistics?: string[];
  to_add?: { type?: string; statistic_ids?: string[] }[];
  already_present?: { type?: string; statistic_ids?: string[] }[];
  added?: { type?: string; statistic_ids?: string[] }[];
  removed?: string[];
  error?: string;
};

function mapFiles(raw: FileRaw[] | undefined): HistoryImportFileEntry[] {
  return (raw ?? []).map((file, i) => ({
    index: file.index ?? i + 1,
    period: {
      first: file.period?.first ?? null,
      last: file.period?.last ?? null,
    },
    hours: file.hours ?? 0,
    overlapHours: file.overlap_hours ?? 0,
  }));
}

function mapSeries(raw: Record<string, SeriesRaw> | undefined): Partial<Record<HistoryImportRole, HistoryImportSeriesEntry>> {
  const out: Partial<Record<HistoryImportRole, HistoryImportSeriesEntry>> = {};
  for (const [role, info] of Object.entries(raw ?? {})) {
    if (!info?.statistic_id) continue;
    const hoursTotal = info.hours_total ?? info.hours ?? 0;
    out[role as HistoryImportRole] = {
      statisticId: info.statistic_id,
      hours: info.hours ?? hoursTotal,
      hoursExisting: info.hours_existing ?? 0,
      hoursNew: info.hours_new ?? 0,
      hoursTotal,
      first: info.first ?? null,
      last: info.last ?? null,
      cutoff: info.cutoff ?? null,
      cutoffSource: info.cutoff_source ?? "",
      hoursSkippedCutoff: info.hours_skipped_cutoff ?? 0,
      warnings: info.warnings ?? [],
      totalKwh: info.total_kwh,
      meanW: info.mean_w,
    };
  }
  return out;
}

function mapMode(raw: string | undefined): HistoryImportMode {
  return raw === "replace" ? "replace" : "extend";
}

function fromResult(raw: ResultRaw): HistoryImportResult {
  const period =
    raw.period?.start && raw.period?.end ? { start: raw.period.start, end: raw.period.end } : null;
  return {
    ok: raw.ok === true,
    mode: mapMode(raw.mode),
    files: mapFiles(raw.files),
    period,
    columns: raw.columns ?? {},
    sumsKwh: raw.sums_kwh ?? {},
    consumersKwh: raw.consumers_kwh ?? {},
    series: mapSeries(raw.series),
    existingHistory: raw.existing_history ?? [],
    hoursToImport: raw.hours_to_import ?? 0,
    hoursSkippedCutoff: raw.hours_skipped_cutoff ?? 0,
    warnings: raw.warnings ?? [],
    errors: raw.errors ?? [],
    planHash: raw.plan_hash ?? null,
    written: raw.written,
  };
}

function mapDashboardSources(
  items: { type?: string; statistic_ids?: string[] }[] | undefined,
): HistoryDashboardSourceSummary[] {
  return (items ?? []).map((item) => ({
    type: item.type ?? "",
    statisticIds: item.statistic_ids ?? [],
  }));
}

function fromDashboard(raw: DashboardRaw): HistoryImportDashboardStatus {
  return {
    ok: raw.ok === true,
    energyReady: raw.energy_ready === true,
    ready: raw.ready === true,
    importedStatistics: raw.imported_statistics ?? [],
    toAdd: mapDashboardSources(raw.to_add),
    alreadyPresent: mapDashboardSources(raw.already_present),
    added: raw.added ? mapDashboardSources(raw.added) : undefined,
    removed: raw.removed,
    error: raw.error,
  };
}

function wsPayload(csvTexts: string[], mode: HistoryImportMode): Record<string, unknown> {
  return {
    csv_texts: csvTexts,
    mode,
  };
}

export async function previewHistoryImport(
  hass: Hass,
  csvTexts: string[],
  mode: HistoryImportMode = "extend",
): Promise<HistoryImportResult> {
  const raw = await hass.callWS<ResultRaw>({
    type: "e3dc_maestro/history_import/preview",
    ...wsPayload(csvTexts, mode),
  });
  return fromResult(raw);
}

export async function applyHistoryImport(
  hass: Hass,
  csvTexts: string[],
  expectedHash?: string | null,
  mode: HistoryImportMode = "extend",
): Promise<HistoryImportResult> {
  const raw = await hass.callWS<ResultRaw>({
    type: "e3dc_maestro/history_import/apply",
    ...wsPayload(csvTexts, mode),
    ...(expectedHash ? { expected_hash: expectedHash } : {}),
  });
  return fromResult(raw);
}

export async function removeHistoryImport(
  hass: Hass,
  removeDashboard = false,
): Promise<{ ok: boolean; removed: string[]; errors: string[]; dashboardRemoved?: string[] }> {
  const raw = await hass.callWS<{
    ok?: boolean;
    removed?: string[];
    errors?: string[];
    dashboard_removed?: string[];
  }>({
    type: "e3dc_maestro/history_import/remove",
    ...(removeDashboard ? { remove_dashboard: true } : {}),
  });
  return {
    ok: raw.ok === true,
    removed: raw.removed ?? [],
    errors: raw.errors ?? [],
    dashboardRemoved: raw.dashboard_removed,
  };
}

export async function previewHistoryImportDashboard(hass: Hass): Promise<HistoryImportDashboardStatus> {
  const raw = await hass.callWS<DashboardRaw>({ type: "e3dc_maestro/history_import/dashboard_preview" });
  return fromDashboard(raw);
}

export async function applyHistoryImportDashboard(hass: Hass): Promise<HistoryImportDashboardStatus> {
  const raw = await hass.callWS<DashboardRaw>({ type: "e3dc_maestro/history_import/dashboard_apply" });
  return fromDashboard(raw);
}

export async function removeHistoryImportDashboard(hass: Hass): Promise<HistoryImportDashboardStatus> {
  const raw = await hass.callWS<DashboardRaw>({ type: "e3dc_maestro/history_import/dashboard_remove" });
  return fromDashboard(raw);
}

const splitCode = (code: string): [string, string] => {
  const idx = code.indexOf(":");
  if (idx < 0) return [code, ""];
  return [code.slice(0, idx), code.slice(idx + 1)];
};

const FILE_ERR = /^file_(\d+):(.+)$/;

export function parseHistoryFileError(code: string): { index: number; inner: string } | null {
  const m = FILE_ERR.exec(code);
  if (!m) return null;
  return { index: Number(m[1]), inner: m[2] };
}

/** Map backend warning codes to i18n keys (suffix in `detail` when needed). */
export function historyWarningMessage(code: string): { key: Key; detail?: string } {
  const [head, tail] = splitCode(code);
  switch (head) {
    case "rows_skipped":
      return { key: "historyWarnRowsSkipped", detail: tail };
    case "incomplete_hours":
      return { key: "historyWarnIncompleteHours", detail: tail };
    case "external_mismatch":
      return { key: "historyWarnExternalMismatch" };
    case "external_not_imported":
      return tail === "multiple_extra_solar"
        ? { key: "historyWarnExternalMultiple" }
        : { key: "historyWarnExternalNoExtra" };
    case "unit_mismatch":
      return { key: "historyWarnUnitMismatch", detail: tail };
    case "no_live_entity":
      return { key: "historyWarnNoLiveEntity", detail: tail };
    case "overlap_mismatch":
      return { key: "historyWarnOverlapMismatch", detail: tail };
    case "existing_hours_kept": {
      const roleSep = tail.indexOf(":");
      if (roleSep >= 0) {
        return {
          key: "historyWarnExistingHoursKept",
          detail: `${tail.slice(0, roleSep)}:${tail.slice(roleSep + 1)}`,
        };
      }
      return { key: "historyWarnExistingHoursKept", detail: tail };
    }
    default:
      return { key: "historyWarnUnknown", detail: code };
  }
}

export function historyErrorMessage(code: string): { key: Key; detail?: string } {
  const [head, tail] = splitCode(code);
  switch (head) {
    case "no_columns":
      return { key: "historyErrNoColumns" };
    case "no_timestamp":
      return { key: "historyErrNoTimestamp" };
    case "no_hours":
      return { key: "historyErrNoHours" };
    case "no_series":
      return { key: "historyErrNoSeries" };
    case "nothing_to_import":
      return { key: "historyNoteNothingToImport" };
    case "no_files":
      return { key: "historyErrNoFiles" };
    case "recorder_unavailable":
      return { key: "historyErrRecorder" };
    case "plan_changed":
      return { key: "historyErrPlanChanged" };
    case "verify_failed":
      return { key: "historyErrVerifyFailed", detail: tail };
    case "entity_state_unavailable":
      return { key: "historyErrEntityUnavailable", detail: tail };
    default:
      return { key: "historyErrUnknown", detail: code };
  }
}

export function historyImportWsErrorKey(code: string): Key | undefined {
  if (code === "csv_too_large") return "historyErrCsvTooLarge";
  if (code === "csv_missing") return "historyErrCsvMissing";
  return undefined;
}

export function wsErrorCode(err: unknown): string {
  if (typeof err === "object" && err && "code" in err) return String((err as { code: unknown }).code);
  return "";
}

export { energyErrorText as historyImportErrorText };
