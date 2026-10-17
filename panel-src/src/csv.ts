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
