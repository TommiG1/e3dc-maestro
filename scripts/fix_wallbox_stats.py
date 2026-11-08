#!/usr/bin/env python3
"""Rebuild Maestro wallbox daily-energy hour stats from an openWB energy meter.

Dry-run by default. Writes only with --apply after dumping a JSON backup.

Env (Home Assistant project .env, or HA_URL / HA_TOKEN):
  homeassistant_url / HA_URL
  long_lived_token / HA_TOKEN

Example:
  python3 scripts/fix_wallbox_stats.py
  python3 scripts/fix_wallbox_stats.py --apply
"""
from __future__ import annotations

import argparse
import asyncio
import json
import os
import sys
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path

import aiohttp

DEFAULT_MAESTRO = "sensor.e3dc_maestro_wallbox_energie_heute"
DEFAULT_OPENWB = "sensor.openwb_chargepoint_4_geladene_energie_gesamt"
# First Maestro wallbox stats appeared mid-May 2026 in this install; openWB has full year.
DEFAULT_START = "2026-01-01T00:00:00+01:00"


def _load_env() -> dict[str, str]:
    env: dict[str, str] = {}
    for candidate in (
        Path(__file__).resolve().parent.parent / ".env",
        Path.home() / "Projects" / "Home Assistant" / ".env",
    ):
        if not candidate.is_file():
            continue
        for line in candidate.read_text().splitlines():
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, value = line.split("=", 1)
            env[key.strip()] = value.strip().strip('"').strip("'")
        break
    env.update({k: v for k, v in os.environ.items() if v})
    return env


def _ws_url(ha_url: str) -> str:
    base = ha_url.rstrip("/")
    if not base.startswith(("http://", "https://")):
        base = "http://" + base
    return base.replace("https://", "wss://").replace("http://", "ws://") + "/api/websocket"


class HaWs:
    def __init__(self, session: aiohttp.ClientSession, ws: aiohttp.ClientWebSocketResponse):
        self._ws = ws
        self._id = 0

    @classmethod
    async def connect(cls, session: aiohttp.ClientSession, ws_url: str, token: str) -> HaWs:
        ws = await session.ws_connect(ws_url)
        msg = await ws.receive_json()
        if msg.get("type") != "auth_required":
            raise RuntimeError(f"unexpected hello: {msg}")
        await ws.send_json({"type": "auth", "access_token": token})
        msg = await ws.receive_json()
        if msg.get("type") != "auth_ok":
            raise RuntimeError(f"auth failed: {msg}")
        return cls(session, ws)

    async def call(self, payload: dict) -> dict:
        self._id += 1
        req = {"id": self._id, **payload}
        await self._ws.send_json(req)
        while True:
            msg = await self._ws.receive_json()
            if msg.get("id") == self._id:
                if not msg.get("success"):
                    raise RuntimeError(f"ws call failed: {msg}")
                return msg.get("result")
            # Ignore events.

    async def close(self) -> None:
        await self._ws.close()


async def fetch_hour_stats(ha: HaWs, statistic_id: str, start: str, end: str) -> list[dict]:
    raw = await ha.call(
        {
            "type": "recorder/statistics_during_period",
            "start_time": start,
            "end_time": end,
            "statistic_ids": [statistic_id],
            "period": "hour",
            "types": ["change", "state", "sum"],
        }
    )
    rows = raw.get(statistic_id) if isinstance(raw, dict) else None
    return list(rows or [])


def _parse_start(row: dict) -> datetime:
    start = row.get("start")
    if isinstance(start, (int, float)):
        # HA may return ms or seconds.
        ts = float(start)
        if ts > 1e12:
            ts /= 1000.0
        return datetime.fromtimestamp(ts, tz=timezone.utc)
    if isinstance(start, str):
        return datetime.fromisoformat(start.replace("Z", "+00:00"))
    raise TypeError(f"bad start: {start!r}")


def _month_key(dt: datetime) -> str:
    local = dt.astimezone()
    return f"{local.year:04d}-{local.month:02d}"


def _day_key(dt: datetime) -> str:
    local = dt.astimezone()
    return f"{local.year:04d}-{local.month:02d}-{local.day:02d}"


def rebuild_maestro_rows(openwb_rows: list[dict], maestro_rows: list[dict]) -> list[dict]:
    """Map openWB hourly change onto Maestro hour starts; daily state, continuous sum."""
    openwb_by_start = {_parse_start(row): row for row in openwb_rows}
    starts = sorted({_parse_start(row) for row in maestro_rows} | set(openwb_by_start))
    if not starts:
        return []

    out: list[dict] = []
    running_sum = 0.0
    day_state = 0.0
    prev_day: str | None = None
    for start in starts:
        day = _day_key(start)
        if prev_day is not None and day != prev_day:
            day_state = 0.0
        prev_day = day
        src = openwb_by_start.get(start)
        change = 0.0
        if src is not None and isinstance(src.get("change"), (int, float)):
            change = float(src["change"])
        if change < 0:
            change = 0.0
        day_state += change
        running_sum += change
        out.append(
            {
                "start": start.isoformat(),
                "state": round(day_state, 6),
                "sum": round(running_sum, 6),
            }
        )
    return out


def month_totals(rows: list[dict], *, field: str = "change") -> dict[str, float]:
    totals: dict[str, float] = defaultdict(float)
    for row in rows:
        start = _parse_start(row) if "start" in row else datetime.fromisoformat(str(row["start"]))
        value = row.get(field)
        if value is None and field == "change":
            continue
        if field == "change" and isinstance(value, (int, float)):
            totals[_month_key(start)] += float(value)
        elif field == "sum" and isinstance(value, (int, float)):
            totals[_month_key(start)] = float(value)
    return dict(sorted(totals.items()))


def summarize(label: str, rows: list[dict]) -> None:
    months = month_totals(rows, field="change")
    total = sum(months.values())
    print(f"\n{label}: {total:.3f} kWh over {len(rows)} hour rows")
    for month, value in months.items():
        print(f"  {month}: {value:8.3f} kWh")


async def main_async(args: argparse.Namespace) -> int:
    env = _load_env()
    ha_url = env.get("HA_URL") or env.get("homeassistant_url")
    token = env.get("HA_TOKEN") or env.get("long_lived_token")
    if not ha_url or not token:
        print("Missing HA_URL/homeassistant_url or HA_TOKEN/long_lived_token", file=sys.stderr)
        return 2

    end = args.end or datetime.now(timezone.utc).isoformat()
    async with aiohttp.ClientSession() as session:
        ha = await HaWs.connect(session, _ws_url(ha_url), token)
        try:
            maestro_rows = await fetch_hour_stats(ha, args.maestro, args.start, end)
            openwb_rows = await fetch_hour_stats(ha, args.openwb, args.start, end)
            rebuilt = rebuild_maestro_rows(openwb_rows, maestro_rows)

            summarize(f"Maestro BEFORE ({args.maestro})", maestro_rows)
            summarize(f"openWB reference ({args.openwb})", openwb_rows)
            # Rebuilt uses sum/state; derive change for display.
            rebuilt_for_sum = []
            prev_sum = 0.0
            for row in rebuilt:
                change = float(row["sum"]) - prev_sum
                prev_sum = float(row["sum"])
                rebuilt_for_sum.append({"start": row["start"], "change": change})
            summarize("Maestro AFTER (planned)", rebuilt_for_sum)

            backup_path = Path(__file__).resolve().parent / f"wallbox_stats_backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
            backup_path.write_text(
                json.dumps(
                    {
                        "maestro_entity": args.maestro,
                        "openwb_entity": args.openwb,
                        "start": args.start,
                        "end": end,
                        "maestro_rows": maestro_rows,
                        "openwb_rows": openwb_rows,
                        "rebuilt": rebuilt,
                    },
                    indent=2,
                )
            )
            print(f"\nBackup written: {backup_path}")

            if not args.apply:
                print("\nDry-run only. Re-run with --apply to write via recorder/import_statistics.")
                return 0

            # HA 2025.10+: metadata object with mean_type + unit_class.
            # Batch writes — a full-year payload can exceed the WS message limit.
            metadata = {
                "statistic_id": args.maestro,
                "source": "recorder",
                "name": None,
                "unit_of_measurement": "kWh",
                "unit_class": "energy",
                "has_sum": True,
                "mean_type": 0,
            }
            batch_size = max(1, int(args.batch_size))
            total = len(rebuilt)
            for offset in range(0, total, batch_size):
                chunk = rebuilt[offset : offset + batch_size]
                await ha.call(
                    {
                        "type": "recorder/import_statistics",
                        "metadata": metadata,
                        "stats": chunk,
                    }
                )
                print(f"Imported {min(offset + batch_size, total)}/{total} hour rows")
            await asyncio.sleep(1)
            after = await fetch_hour_stats(ha, args.maestro, args.start, end)
            summarize(f"Maestro AFTER write ({args.maestro})", after)
            return 0
        finally:
            await ha.close()


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--maestro", default=DEFAULT_MAESTRO)
    parser.add_argument("--openwb", default=DEFAULT_OPENWB)
    parser.add_argument("--start", default=DEFAULT_START)
    parser.add_argument("--end", default=None)
    parser.add_argument("--apply", action="store_true", help="Write statistics (default: dry-run)")
    parser.add_argument("--batch-size", type=int, default=500, help="Hours per import_statistics call")
    args = parser.parse_args()
    raise SystemExit(asyncio.run(main_async(args)))


if __name__ == "__main__":
    main()
