/** Convert ``HH:MM`` (``input type=time``) to fractional hours [0, 24].
 *
 * Quarter-hour steps only (``step=900``). ``00:00`` as end-of-day is ``24``.
 */
export function timeToHours(value: string, endOfDay = false): number | null {
  const match = /^(\d{2}):(\d{2})$/.exec(value.trim());
  if (!match) return null;
  const hour = Number(match[1]);
  const minute = Number(match[2]);
  if (!Number.isInteger(hour) || !Number.isInteger(minute)) return null;
  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return null;
  if (minute % 15 !== 0) return null;
  if (endOfDay && hour === 0 && minute === 0) return 24;
  return hour + minute / 60;
}

/** Convert fractional hours [0, 24] to ``HH:MM`` for ``input type=time``.
 *
 * ``24`` becomes ``00:00`` (end of day). Non-quarter minutes are rejected.
 */
export function hoursToTime(hours: number): string | null {
  if (!Number.isFinite(hours) || hours < 0 || hours > 24) return null;
  if (hours === 24) return "00:00";
  const total = Math.round(hours * 60);
  if (Math.abs(hours * 60 - total) > 1e-9) return null;
  if (total % 15 !== 0) return null;
  const hour = Math.floor(total / 60);
  const minute = total % 60;
  if (hour > 23) return null;
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}
