/** RFC-style CSV cell. A leading quote, comma or newline would otherwise break the row. */
export function csvCell(value: string): string {
  return /[",\n\r]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

export function csvText(rows: string[][]): string {
  return rows.map((row) => row.map(csvCell).join(",")).join("\n");
}

export function downloadCsv(filename: string, rows: string[][]): void {
  const blob = new Blob([`\uFEFF${csvText(rows)}`], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

/** Download a JSON support dump (UTF-8). */
export function downloadJson(filename: string, data: unknown): void {
  const blob = new Blob([`${JSON.stringify(data, null, 2)}\n`], {
    type: "application/json;charset=utf-8",
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

export function debugDumpFilename(when = new Date()): string {
  const stamp = when.toISOString().slice(0, 19).replace(/[:T]/g, "-");
  return `maestro-debug-${stamp}.json`;
}
