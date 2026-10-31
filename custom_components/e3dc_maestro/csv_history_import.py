"""Import my.e3dc "Leistungswerte" CSV as NEW external statistics (``e3dc_maestro:history_*``).

Existing entity statistics are never touched. Each role gets its own series with a
forward running sum (starts at 0 in the first hour). Several CSV files can be merged and
an existing import can be extended: existing hours always win, the sums are rebuilt. Only hours strictly
before the earliest live statistics row of the matching entity are imported; without
live data the cutoff is the current hour minus one full hour. Pure parsing/planning
functions come first, recorder access (lazy imports) at the bottom.
"""
from __future__ import annotations

import csv
import hashlib
import json
import logging
import re
from datetime import datetime, timedelta, timezone
from typing import Any
from zoneinfo import ZoneInfo

from homeassistant.config_entries import ConfigEntryState
from homeassistant.core import HomeAssistant

from .const import (
    CONF_HOUSE_POWER_SENSOR,
    CONF_SIZING_HEAT_PUMP_ENERGY_SENSOR,
    CONF_SIZING_HOUSE_ENERGY_SENSOR,
    DOMAIN,
)
from .energy_dashboard import _first_option, async_energy_dashboard_preview
from .statistic_ids import (
    HISTORY_ENERGY_ROLES,
    HISTORY_POWER_ROLES,
    HISTORY_PREFIX,
    STAT_SOURCE,
    history_statistic_id,
)

_LOGGER = logging.getLogger(__name__)
_UTC = timezone.utc

# normalized header (lower, no unit) -> role
_ROLE_COLUMNS = {
    "solarproduktion": "solar",
    "hausverbrauch": "house",
    "netzbezug": "grid_from",
    "netzeinspeisung": "grid_to",
    "batterie laden": "battery_to",
    "batterie entladen": "battery_from",
}


def _norm(header: str) -> str:
    text = re.sub(r"\[.*?\]", "", header).strip().lower()
    for src, dst in (("ä", "ae"), ("ö", "oe"), ("ü", "ue"), ("ß", "ss")):
        text = text.replace(src, dst)
    return re.sub(r"\s+", " ", text)


def _watts(cell: str) -> float | None:
    cell = cell.strip()
    if not cell:
        return 0.0
    try:
        return float(cell.replace(",", "."))
    except ValueError:
        return None


def _resolve_utc(local: datetime, tz: ZoneInfo, prev: datetime | None) -> datetime | None:
    """Local naive time -> UTC. Repeated fall-back hour via ``prev``; gap -> None."""
    first = local.replace(tzinfo=tz, fold=0).astimezone(_UTC)
    if first.astimezone(tz).replace(tzinfo=None) != local:
        return None  # spring-forward gap
    second = local.replace(tzinfo=tz, fold=1).astimezone(_UTC)
    if first != second and prev is not None and prev >= first:
        return second
    return first


def parse_csv(text: str, tz_name: str) -> dict[str, Any]:
    """Parse export text -> ``{quarters, columns, errors, rows_skipped}``.

    ``quarters`` maps interval-start (UTC) to Watt values per key: the roles,
    ``summe`` (Summe Produktion), ``others`` (other producer columns summed),
    ``external`` (max(0, summe - solar)) and ``consumer:<header>`` (preview only).
    """
    tz = ZoneInfo(tz_name)
    rows = list(csv.reader(text.lstrip("\ufeff").splitlines(), delimiter=";"))
    out: dict[str, Any] = {"quarters": {}, "columns": {}, "errors": [], "rows_skipped": 0}
    if not rows:
        out["errors"].append("no_columns")
        return out
    header = [h.strip() for h in rows[0]]
    names = [_norm(h) for h in header]
    if "zeitstempel" not in names:
        out["errors"].append("no_timestamp")
        return out
    ts_idx = names.index("zeitstempel")
    cols: dict[int, str] = {}  # column index -> key
    summe_idx: int | None = None
    others: list[int] = []
    for idx, (raw, name) in enumerate(zip(header, names)):
        if not raw.lower().endswith("[w]"):
            continue
        if name == "summe produktion":
            summe_idx = idx
        elif name in _ROLE_COLUMNS:
            cols[idx] = _ROLE_COLUMNS[name]
        elif "wallbox" in name and "laden" in name and "entladen" not in name:
            cols[idx] = "wallbox"
        elif "produktion" in name:
            others.append(idx)
        elif "ext. verbrauch" in name:
            cols[idx] = f"consumer:{_norm(raw)}"
    out["columns"] = {
        **{header[i]: k for i, k in cols.items()},
        **({header[summe_idx]: "summe"} if summe_idx is not None else {}),
        **{header[i]: "other_producer" for i in others},
    }
    if not cols and summe_idx is None:
        out["errors"].append("no_columns")
        return out

    wanted = [*cols, *others, *([summe_idx] if summe_idx is not None else [])]
    prev: datetime | None = None
    for row in rows[1:]:
        if len(row) <= ts_idx or not any(row[i].strip() for i in wanted if i < len(row)):
            continue  # blank / still-running interval without values
        try:
            local = datetime.strptime(row[ts_idx].strip(), "%d.%m.%Y %H:%M:%S")
        except ValueError:
            out["rows_skipped"] += 1
            continue
        utc = _resolve_utc(local, tz, prev)
        values = {i: _watts(row[i]) if i < len(row) else 0.0 for i in wanted}
        if utc is None or any(v is None for v in values.values()):
            out["rows_skipped"] += 1
            continue
        prev = utc
        quarter: dict[str, float] = {}
        for i, key in cols.items():  # several wallbox columns add up
            quarter[key] = quarter.get(key, 0.0) + values[i]
        if summe_idx is not None:
            quarter["summe"] = values[summe_idx]
            quarter["external"] = max(0.0, values[summe_idx] - quarter.get("solar", 0.0))
        quarter["others"] = sum(values[i] for i in others)
        out["quarters"][utc] = quarter
    return out


def hourly_series(quarters: dict[datetime, dict[str, float]]) -> tuple[dict[str, dict[datetime, float]], int]:
    """15-min W -> hourly kWh per key; only hours with 4 quarter-hours. Returns (series, skipped)."""
    per_hour: dict[datetime, list[dict[str, float]]] = {}
    for ts, quarter in quarters.items():
        per_hour.setdefault(ts.replace(minute=0, second=0, microsecond=0), []).append(quarter)
    series: dict[str, dict[datetime, float]] = {}
    skipped = 0
    for hour, items in per_hour.items():
        if len(items) != 4:
            skipped += 1
            continue
        for key in {k for q in items for k in q}:
            series.setdefault(key, {})[hour] = sum(q.get(key, 0.0) for q in items) * 0.25 / 1000.0
    return series, skipped


def external_plausible(series: dict[str, dict[datetime, float]]) -> bool:
    """Summe Produktion ~ Solar + other producer columns (3 % or 50 Wh tolerance)."""
    total = sum(series.get("summe", {}).values())
    calc = sum(series.get("solar", {}).values()) + sum(series.get("others", {}).values())
    return abs(total - calc) <= max(0.05, 0.03 * total)


def _to_dt(value: Any) -> datetime:
    if isinstance(value, datetime):
        return value if value.tzinfo else value.replace(tzinfo=_UTC)
    return datetime.fromtimestamp(float(value), tz=_UTC)


# ---------------------------------------------------------------- planning

# parser key -> statistic role
_KEY_ROLE = {
    "solar": "solar",
    "external": "external",
    "grid_from": "grid_import",
    "grid_to": "grid_export",
    "battery_to": "battery_charge",
    "battery_from": "battery_discharge",
    "house": "house",
    "wallbox": "wallbox",
}
_ROLE_NAMES = {
    "solar": "Solar",
    "external": "Fremderzeuger",
    "grid_import": "Netzbezug",
    "grid_export": "Netzeinspeisung",
    "battery_charge": "Batterie laden",
    "battery_discharge": "Batterie entladen",
    "house": "Haus",
    "wallbox": "Wallbox",
    "heat_pump": "Wärmepumpe",
    "house_power": "Hausverbrauch Leistung",
}
_HEAT_PUMP_RE = re.compile(r"(^|[^a-z])wp([^a-z]|$)|waermepumpe|heat ?pump")
# Hours at or after (now floored to the hour) minus this margin are never imported
# when there is no live statistics row for a role.
_SAFETY_MARGIN = timedelta(hours=1)
_LIVE_FROM = datetime(2000, 1, 1, tzinfo=_UTC)


def _now() -> datetime:
    return datetime.now(_UTC)


def _default_cutoff() -> datetime:
    return _now().replace(minute=0, second=0, microsecond=0) - _SAFETY_MARGIN


def role_series(
    series: dict[str, dict[datetime, float]], warnings: list[str]
) -> dict[str, dict[datetime, float]]:
    """Hourly kWh per statistic role (``house_power`` is derived separately)."""
    out = {role: series[key] for key, role in _KEY_ROLE.items() if key in series}
    if "external" in out:
        if sum(out["external"].values()) <= 0:
            del out["external"]
        elif not external_plausible(series):
            warnings.append("external_mismatch")
            del out["external"]
    heat = [s for k, s in series.items() if k.startswith("consumer:") and _HEAT_PUMP_RE.search(k[9:])]
    if heat:
        out["heat_pump"] = {h: sum(s.get(h, 0.0) for s in heat) for h in {h for s in heat for h in s}}
    return out


def plan_forward_sum(hourly: dict[datetime, float], cutoff: datetime) -> list[dict[str, Any]]:
    """Rows for all hours strictly before ``cutoff``; running sum starts at 0, never decreases."""
    rows: list[dict[str, Any]] = []
    total = 0.0
    for hour in sorted(h for h in hourly if h < cutoff):
        total += max(0.0, hourly[hour])
        rows.append({"start": hour, "state": round(total, 6), "sum": round(total, 6)})
    return rows


def plan_mean(hourly_w: dict[datetime, float], cutoff: datetime) -> list[dict[str, Any]]:
    return [
        {"start": h, "mean": round(max(0.0, hourly_w[h]), 3)} for h in sorted(hourly_w) if h < cutoff
    ]


def _options(hass: HomeAssistant) -> dict[str, Any]:
    entries_api = getattr(getattr(hass, "config_entries", None), "async_entries", None)
    if entries_api is None:
        return {}
    for entry in entries_api(DOMAIN):
        if entry.state == ConfigEntryState.LOADED:
            return dict(entry.options)
    return {}


def _live_entities(
    hass: HomeAssistant, sensors: dict[str, dict[str, str]], extra_solar: list[str]
) -> dict[str, str | list[str]]:
    """Statistic role -> configured/resolved live entity id(s) (only roles that are known)."""
    opts = _options(hass)
    live: dict[str, str | list[str]] = {}
    for sensor_role, role in (
        ("solar", "solar"), ("grid_from", "grid_import"), ("grid_to", "grid_export"),
        ("battery_to", "battery_charge"), ("battery_from", "battery_discharge"), ("wallbox", "wallbox"),
    ):
        if sensor_role in sensors:
            live[role] = sensors[sensor_role]["entity_id"]
    if extra_solar:
        live["external"] = list(extra_solar)
    for role, key in (
        ("house", CONF_SIZING_HOUSE_ENERGY_SENSOR),
        ("heat_pump", CONF_SIZING_HEAT_PUMP_ENERGY_SENSOR),
        ("house_power", CONF_HOUSE_POWER_SENSOR),
    ):
        entity = _first_option(opts.get(key))
        if entity:
            live[role] = entity
    return live


def _cutoffs(
    live: dict[str, str | list[str]], first_starts: dict[str, datetime | None], roles: list[str]
) -> dict[str, dict[str, Any]]:
    """Role -> ``{cutoff, live_first}``: earliest live statistics start, capped by now - margin."""
    default = _default_cutoff()
    out: dict[str, dict[str, Any]] = {}
    for role in roles:
        ids = live.get(role) or []
        ids = [ids] if isinstance(ids, str) else ids
        starts = [first_starts[i] for i in ids if first_starts.get(i) is not None]
        live_first = min(starts) if starts else None
        out[role] = {"cutoff": min(live_first, default) if live_first else default, "live_first": live_first}
    return out


# ---------------------------------------------------------------- recorder side

async def _read_first_starts(
    hass: HomeAssistant, ids: set[str], types: set[str]
) -> dict[str, datetime | None]:
    """Earliest statistics row start per entity id (None when there is no row)."""
    from homeassistant.components.recorder import get_instance  # noqa: PLC0415
    from homeassistant.components.recorder.statistics import statistics_during_period  # noqa: PLC0415

    if not ids:
        return {}
    stats = await get_instance(hass).async_add_executor_job(
        statistics_during_period, hass, _LIVE_FROM, None, ids, "hour", None, types
    )
    return {
        sid: min((_to_dt(r["start"]) for r in rows), default=None)
        for sid in ids
        for rows in [stats.get(sid) or []]
    }


async def _existing_history_ids(hass: HomeAssistant) -> set[str]:
    """Statistic ids of already imported ``e3dc_maestro:history_*`` series."""
    from functools import partial  # noqa: PLC0415

    from homeassistant.components.recorder import get_instance  # noqa: PLC0415
    from homeassistant.components.recorder.statistics import get_metadata  # noqa: PLC0415

    found = await get_instance(hass).async_add_executor_job(
        partial(get_metadata, hass, statistic_source=STAT_SOURCE)
    )
    return {sid for sid in found if sid.startswith(HISTORY_PREFIX)}


def _metadata(role: str) -> dict[str, Any]:
    power = role in HISTORY_POWER_ROLES
    meta: dict[str, Any] = {
        "source": STAT_SOURCE,
        "statistic_id": history_statistic_id(role),
        "name": f"E3DC Maestro Verlauf {_ROLE_NAMES[role]}",
        "unit_of_measurement": "W" if power else "kWh",
        "has_sum": not power,
        "has_mean": power,
    }
    try:
        from homeassistant.components.recorder.models import StatisticMeanType  # noqa: PLC0415

        meta["mean_type"] = StatisticMeanType.ARITHMETIC if power else StatisticMeanType.NONE
    except Exception:  # noqa: BLE001 - older HA without mean_type
        pass
    meta["unit_class"] = "power" if power else "energy"
    return meta


async def _write(hass: HomeAssistant, metadata: dict[str, Any], rows: list[dict[str, Any]]) -> None:
    from homeassistant.components.recorder.statistics import async_add_external_statistics  # noqa: PLC0415

    async_add_external_statistics(hass, metadata, rows)


async def _clear(hass: HomeAssistant, statistic_ids: list[str]) -> None:
    """Delete the given external series (callers pass only ``e3dc_maestro:history_*`` ids)."""
    from homeassistant.components.recorder import get_instance  # noqa: PLC0415

    safe = [s for s in statistic_ids if s.startswith(HISTORY_PREFIX)]
    if safe:
        get_instance(hass).async_clear_statistics(safe)


async def _read_existing(
    hass: HomeAssistant, ids: set[str]
) -> dict[str, tuple[dict[str, Any] | None, dict[datetime, float]]]:
    """Existing history series -> ``{id: (metadata, {hour: kWh change | mean W})}`` (full range).

    Energy changes are derived from the stored sums (first row change == its sum, the
    series always starts from 0), which does not depend on recorder ``change`` semantics.
    """
    from functools import partial  # noqa: PLC0415

    from homeassistant.components.recorder import get_instance  # noqa: PLC0415
    from homeassistant.components.recorder.statistics import (  # noqa: PLC0415
        get_metadata,
        statistics_during_period,
    )

    if not ids:
        return {}
    instance = get_instance(hass)
    metas = await instance.async_add_executor_job(partial(get_metadata, hass, statistic_ids=ids))
    out: dict[str, tuple[dict[str, Any] | None, dict[datetime, float]]] = {}
    for sid in ids:
        meta = metas.get(sid, (None, None))[1]
        power = bool(meta and meta.get("has_mean") and not meta.get("has_sum"))
        if meta is None:
            power = sid.rsplit("history_", 1)[-1] in HISTORY_POWER_ROLES
        types = {"mean"} if power else {"sum"}
        stats = await instance.async_add_executor_job(
            statistics_during_period, hass, _LIVE_FROM, None, {sid}, "hour", None, types
        )
        values: dict[datetime, float] = {}
        previous = 0.0
        for row in sorted(stats.get(sid) or [], key=lambda r: _to_dt(r["start"])):
            hour = _to_dt(row["start"])
            if power:
                values[hour] = float(row.get("mean") or 0.0)
            else:
                total = float(row.get("sum") or 0.0)
                values[hour] = max(0.0, total - previous)
                previous = total
        out[sid] = (dict(meta) if meta else None, values)
    return out


async def _flush(hass: HomeAssistant) -> None:
    from homeassistant.components.recorder import get_instance  # noqa: PLC0415

    await get_instance(hass).async_block_till_done()


def _iso(value: datetime | None) -> str | None:
    return value.isoformat() if value else None


async def remove_history(hass: HomeAssistant) -> dict[str, Any]:
    """Delete all imported ``e3dc_maestro:history_*`` statistics (nothing else)."""
    try:
        existing = sorted(await _existing_history_ids(hass))
        await _clear(hass, existing)
        await _flush(hass)
    except Exception as err:  # noqa: BLE001
        _LOGGER.warning("CSV history import: remove failed: %s", err)
        return {"ok": False, "removed": [], "errors": ["recorder_unavailable"]}
    return {"ok": True, "removed": existing, "errors": []}


def _merge_files(
    hass: HomeAssistant, csv_texts: list[str], warnings: list[str], errors: list[str]
) -> tuple[dict[str, dict[datetime, float]], dict[str, str], list[dict[str, Any]], int]:
    """Parse all files, union hourly series per key (first file wins) -> (series, columns, files, incomplete)."""
    merged: dict[str, dict[datetime, float]] = {}
    columns: dict[str, str] = {}
    files: list[dict[str, Any]] = []
    seen_hours: set[datetime] = set()
    mismatch: set[str] = set()
    incomplete = skipped_rows = 0
    for index, text in enumerate(csv_texts, start=1):
        parsed = parse_csv(text, hass.config.time_zone)
        series, incomplete_file = hourly_series(parsed["quarters"])
        incomplete += incomplete_file
        skipped_rows += parsed["rows_skipped"]
        errors.extend(f"file_{index}:{err}" for err in parsed["errors"])
        hours = {h for s in series.values() for h in s}
        if not parsed["errors"] and not hours:
            errors.append(f"file_{index}:no_hours")
        files.append({
            "index": index,
            "period": {"first": _iso(min(hours)) if hours else None, "last": _iso(max(hours)) if hours else None},
            "hours": len(hours),
            "overlap_hours": len(hours & seen_hours),
        })
        seen_hours |= hours
        columns.update(parsed["columns"])
        for key, values in series.items():
            target = merged.setdefault(key, {})
            tol = 0.01
            role = _KEY_ROLE.get(key) or ("external" if key in ("summe", "others") else None)
            if role is None and key.startswith("consumer:") and _HEAT_PUMP_RE.search(key[9:]):
                role = "heat_pump"
            for hour, value in values.items():
                if hour not in target:
                    target[hour] = value
                elif role and role not in mismatch and abs(target[hour] - value) > tol:
                    mismatch.add(role)
                    warnings.append(f"overlap_mismatch:{role}")
    if skipped_rows:
        warnings.append(f"rows_skipped:{skipped_rows}")
    if incomplete:
        warnings.append(f"incomplete_hours:{incomplete}")
    return merged, columns, files, incomplete


def _rebuild(
    role: str, values: dict[datetime, float]
) -> list[dict[str, Any]]:
    if role in HISTORY_POWER_ROLES:
        return plan_mean(values, datetime.max.replace(tzinfo=_UTC))
    return plan_forward_sum(values, datetime.max.replace(tzinfo=_UTC))


def _plan_role(
    role: str, new_hourly: dict[datetime, float], cutoff: datetime, existing: dict[datetime, float]
) -> tuple[list[dict[str, Any]], dict[str, int]]:
    """Final rows (existing hours win, union with new hours before cutoff) + counters."""
    new = {h: v for h, v in new_hourly.items() if h < cutoff}
    fresh = {h: v for h, v in new.items() if h not in existing}
    counts = {
        "hours_existing": len(existing),
        "hours_new": len(fresh),
        "hours_kept": len(new) - len(fresh),
        "hours_skipped_cutoff": len(new_hourly) - len(new),
    }
    return _rebuild(role, {**fresh, **existing}), counts


async def _build(
    hass: HomeAssistant, csv_texts: list[str] | str, mode: str = "extend"
) -> tuple[dict[str, Any], dict[str, tuple[dict[str, Any], list[dict[str, Any]]]]]:
    """Shared plan for preview/apply -> (result dict, {statistic_id: (metadata, rows)})."""
    if isinstance(csv_texts, str):
        csv_texts = [csv_texts]
    if mode not in ("extend", "replace"):
        mode = "extend"
    extend = mode == "extend"
    warnings: list[str] = []
    errors: list[str] = []
    merged, columns, files, _incomplete = _merge_files(hass, list(csv_texts), warnings, errors)
    all_hours = sorted({h for s in merged.values() for h in s})
    if not csv_texts:
        errors.append("no_files")
    result: dict[str, Any] = {
        "ok": False,
        "mode": mode,
        "files": files,
        "period": {"start": _iso(all_hours[0]), "end": _iso(all_hours[-1] + timedelta(hours=1))} if all_hours else None,
        "columns": columns,
        "sums_kwh": {k: round(sum(s.values()), 3) for k, s in merged.items() if not k.startswith("consumer:")},
        "consumers_kwh": {k[9:]: round(sum(s.values()), 3) for k, s in merged.items() if k.startswith("consumer:")},
        "series": {},
        "existing_history": [],
        "hours_to_import": 0,
        "hours_skipped_cutoff": 0,
        "warnings": warnings,
        "errors": errors,
        "plan_hash": None,
    }
    if errors:
        return result, {}

    hourly = role_series(merged, warnings)
    if "house" in merged:  # hourly mean W of the house load (4 valid quarters per hour)
        hourly["house_power"] = {h: kwh * 1000.0 for h, kwh in merged["house"].items()}
    if not hourly:
        errors.append("no_series")
        return result, {}

    energy = await async_energy_dashboard_preview(hass)
    live = _live_entities(hass, energy["sensors"], energy.get("extra_solar") or [])
    wanted = {role: live[role] for role in hourly if role in live}
    sum_ids = {i for r, v in wanted.items() if r != "house_power" for i in ([v] if isinstance(v, str) else v)}
    mean_ids = {wanted["house_power"]} if "house_power" in wanted and isinstance(wanted["house_power"], str) else set()
    try:
        first_starts = {
            **await _read_first_starts(hass, sum_ids, {"sum"}),
            **await _read_first_starts(hass, mean_ids, {"mean"}),
        }
        existing_ids = await _existing_history_ids(hass)
        existing_rows = await _read_existing(hass, existing_ids)
    except Exception as err:  # noqa: BLE001
        _LOGGER.warning("CSV history import: recorder read failed: %s", err)
        errors.append("recorder_unavailable")
        return result, {}

    cutoffs = _cutoffs(live, first_starts, list(hourly))
    result["existing_history"] = sorted(existing_ids)

    writes: dict[str, tuple[dict[str, Any], list[dict[str, Any]]]] = {}
    for role in [r for r in (*HISTORY_ENERGY_ROLES, *HISTORY_POWER_ROLES) if r in hourly]:
        cut = cutoffs[role]["cutoff"]
        sid = history_statistic_id(role)
        old_meta, old_values = existing_rows.get(sid, (None, {})) if extend else (None, {})
        rows, counts = _plan_role(role, hourly[role], cut, old_values)
        entry: dict[str, Any] = {
            "statistic_id": sid,
            "hours": len(rows),
            "hours_existing": counts["hours_existing"],
            "hours_new": counts["hours_new"],
            "hours_total": len(rows),
            "first": _iso(rows[0]["start"]) if rows else None,
            "last": _iso(rows[-1]["start"]) if rows else None,
            "cutoff": _iso(cut),
            "cutoff_source": "live_statistics" if cutoffs[role]["live_first"] and cutoffs[role]["live_first"] <= _default_cutoff() else "now_minus_margin",
            "hours_skipped_cutoff": counts["hours_skipped_cutoff"],
            "warnings": [],
        }
        if role in HISTORY_POWER_ROLES:
            entry["mean_w"] = round(sum(r["mean"] for r in rows) / len(rows), 1) if rows else None
        else:
            entry["total_kwh"] = round(rows[-1]["sum"], 3) if rows else 0.0
        if role not in live:
            entry["warnings"].append("no_live_entity")
        if counts["hours_kept"]:
            warnings.append(f"existing_hours_kept:{role}:{counts['hours_kept']}")
        result["series"][role] = entry
        result["hours_skipped_cutoff"] += counts["hours_skipped_cutoff"]
        if counts["hours_new"]:
            result["hours_to_import"] += counts["hours_new"]
            writes[sid] = (old_meta or _metadata(role), rows)
    if not writes:
        errors.append("nothing_to_import")
    fingerprint = [[r, _iso(c["live_first"])] for r, c in sorted(cutoffs.items())]
    existing_fp = sorted(
        [sid, _iso(max(vals)) if vals else None, len(vals)] for sid, (_m, vals) in existing_rows.items()
    )
    result["plan_hash"] = hashlib.sha256(
        json.dumps(
            [[hashlib.sha256(t.encode()).hexdigest() for t in csv_texts], mode, fingerprint,
             sorted(existing_ids), existing_fp],
            sort_keys=True,
        ).encode()
    ).hexdigest()
    result["ok"] = not errors
    return result, writes


def _mode(mode: str | bool | None) -> str:
    if isinstance(mode, bool):  # legacy ``replace`` flag
        return "replace" if mode else "extend"
    return mode or "extend"


async def preview(hass: HomeAssistant, csv_texts: list[str] | str, mode: str | bool = "extend") -> dict[str, Any]:
    """Dry run: what would be written per role (no recorder writes)."""
    return (await _build(hass, csv_texts, _mode(mode)))[0]


async def apply(
    hass: HomeAssistant,
    csv_texts: list[str] | str,
    expected_hash: str | None = None,
    mode: str | bool = "extend",
) -> dict[str, Any]:
    """Write ``e3dc_maestro:history_*`` series. Aborts if inputs changed since preview.

    ``extend`` merges new hours into existing series (existing hours win, sums rebuilt);
    ``replace`` clears only the series being rewritten and writes from the given files.
    """
    mode = _mode(mode)
    result, writes = await _build(hass, csv_texts, mode)
    if not result["ok"]:
        return {**result, "written": {}}
    if expected_hash is not None and expected_hash != result["plan_hash"]:
        return {**result, "ok": False, "errors": [*result["errors"], "plan_changed"], "written": {}}
    if mode == "replace":
        await _clear(hass, [sid for sid in result["existing_history"] if sid in writes])
    for meta, rows in writes.values():
        await _write(hass, meta, rows)
    await _flush(hass)
    return {**result, "written": {sid: len(rows) for sid, (_m, rows) in writes.items()}}
