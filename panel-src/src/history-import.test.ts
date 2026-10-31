import { describe, expect, it } from "vitest";
import {
  applyHistoryImport,
  historyErrorMessage,
  historyWarningMessage,
  parseHistoryFileError,
  previewHistoryImport,
  previewHistoryImportDashboard,
  removeHistoryImport,
} from "./history-import";
import type { Hass } from "./entities";

function hassWith(handlers: Record<string, (msg: Record<string, unknown>) => unknown>): Hass {
  return {
    states: {},
    language: "de",
    callWS: async (msg: {
      type: string;
      csv_texts?: string[];
      mode?: string;
      expected_hash?: string;
      remove_dashboard?: boolean;
    }) => {
      const handler = handlers[msg.type];
      if (!handler) throw new Error(`unexpected ${msg.type}`);
      return handler(msg);
    },
    callService: async () => undefined,
  } as Hass;
}

describe("history import client", () => {
  it("maps a preview payload with series, files and extend mode", async () => {
    const result = await previewHistoryImport(
      hassWith({
        "e3dc_maestro/history_import/preview": (msg) => {
          expect(msg.csv_texts).toEqual(["a", "b"]);
          expect(msg.mode).toBe("extend");
          return {
            ok: true,
            mode: "extend",
            files: [
              {
                index: 1,
                period: { first: "2026-01-01T00:00:00+01:00", last: "2026-01-01T23:00:00+01:00" },
                hours: 24,
                overlap_hours: 0,
              },
              {
                index: 2,
                period: { first: "2026-01-02T00:00:00+01:00", last: "2026-01-02T23:00:00+01:00" },
                hours: 24,
                overlap_hours: 3,
              },
            ],
            period: { start: "2026-01-01T00:00:00+01:00", end: "2026-01-03T00:00:00+01:00" },
            sums_kwh: { solar: 12.5 },
            series: {
              solar: {
                statistic_id: "e3dc_maestro:history_solar",
                hours: 48,
                hours_existing: 10,
                hours_new: 38,
                hours_total: 48,
                first: "2026-01-01T00:00:00+01:00",
                last: "2026-01-02T23:00:00+01:00",
                cutoff: "2026-01-03T00:00:00+01:00",
                cutoff_source: "live_statistics",
                hours_skipped_cutoff: 0,
                total_kwh: 12.5,
                warnings: [],
              },
            },
            existing_history: ["e3dc_maestro:history_solar"],
            hours_to_import: 38,
            hours_skipped_cutoff: 0,
            warnings: ["existing_hours_kept:solar:10", "overlap_mismatch:grid_import"],
            errors: [],
            plan_hash: "abc",
          };
        },
      }),
      ["a", "b"],
      "extend",
    );
    expect(result.ok).toBe(true);
    expect(result.mode).toBe("extend");
    expect(result.files).toHaveLength(2);
    expect(result.files[1].overlapHours).toBe(3);
    expect(result.hoursToImport).toBe(38);
    expect(result.series.solar).toMatchObject({
      statisticId: "e3dc_maestro:history_solar",
      hoursExisting: 10,
      hoursNew: 38,
      hoursTotal: 48,
      totalKwh: 12.5,
    });
    expect(result.warnings).toContain("overlap_mismatch:grid_import");
    expect(result.planHash).toBe("abc");
  });

  it("passes mode and expected_hash on apply", async () => {
    let seenHash: string | undefined;
    let seenMode: string | undefined;
    let seenTexts: string[] | undefined;
    const result = await applyHistoryImport(
      hassWith({
        "e3dc_maestro/history_import/apply": (msg) => {
          seenHash = msg.expected_hash as string | undefined;
          seenMode = msg.mode as string | undefined;
          seenTexts = msg.csv_texts as string[] | undefined;
          return {
            ok: true,
            mode: "replace",
            files: [],
            hours_to_import: 1,
            hours_skipped_cutoff: 0,
            warnings: [],
            errors: [],
            plan_hash: "abc",
            written: { "e3dc_maestro:history_solar": 1 },
          };
        },
      }),
      ["csv-one", "csv-two"],
      "abc",
      "replace",
    );
    expect(seenHash).toBe("abc");
    expect(seenMode).toBe("replace");
    expect(seenTexts).toEqual(["csv-one", "csv-two"]);
    expect(result.written).toEqual({ "e3dc_maestro:history_solar": 1 });
    expect(result.mode).toBe("replace");
  });

  it("maps warning and error codes including file index", () => {
    expect(historyWarningMessage("overlap_mismatch:solar")).toEqual({
      key: "historyWarnOverlapMismatch",
      detail: "solar",
    });
    expect(historyWarningMessage("existing_hours_kept:house:5")).toEqual({
      key: "historyWarnExistingHoursKept",
      detail: "house:5",
    });
    expect(historyErrorMessage("nothing_to_import")).toEqual({ key: "historyNoteNothingToImport" });
    expect(parseHistoryFileError("file_2:no_timestamp")).toEqual({ index: 2, inner: "no_timestamp" });
    expect(historyErrorMessage("no_timestamp")).toEqual({ key: "historyErrNoTimestamp" });
  });

  it("maps dashboard preview", async () => {
    const dash = await previewHistoryImportDashboard(
      hassWith({
        "e3dc_maestro/history_import/dashboard_preview": () => ({
          ok: true,
          energy_ready: true,
          imported_statistics: ["e3dc_maestro:history_solar"],
          to_add: [{ type: "solar", statistic_ids: ["e3dc_maestro:history_solar"] }],
          already_present: [],
          ready: true,
        }),
      }),
    );
    expect(dash.toAdd[0].statisticIds).toEqual(["e3dc_maestro:history_solar"]);
  });

  it("passes remove_dashboard on remove", async () => {
    let removeDash: boolean | undefined;
    await removeHistoryImport(
      hassWith({
        "e3dc_maestro/history_import/remove": (msg) => {
          removeDash = msg.remove_dashboard as boolean | undefined;
          return { ok: true, removed: ["e3dc_maestro:history_solar"], errors: [] };
        },
      }),
      true,
    );
    expect(removeDash).toBe(true);
  });
});
