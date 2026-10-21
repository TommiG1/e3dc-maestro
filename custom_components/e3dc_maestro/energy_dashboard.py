"""Propose and apply HA Energy Dashboard sources from Maestro / RSCP meters."""
from __future__ import annotations

import logging
from typing import Any, Literal

from homeassistant.config_entries import ConfigEntryState
from homeassistant.core import HomeAssistant
from homeassistant.helpers import entity_registry as er

from .const import (
    CONF_SIZING_BATTERY_CHARGE_ENERGY_SENSOR,
    CONF_SIZING_BATTERY_DISCHARGE_ENERGY_SENSOR,
    CONF_SIZING_GRID_EXPORT_ENERGY_SENSOR,
    CONF_SIZING_GRID_IMPORT_ENERGY_SENSOR,
    CONF_SIZING_PV_ENERGY_SENSOR,
    CONF_SIZING_WALLBOX_ENERGY_SENSOR,
    DOMAIN,
    E3DC_RSCP_DOMAIN,
)

_LOGGER = logging.getLogger(__name__)

# HA Energy: battery "from" = discharge, "to" = charge.
Role = Literal["solar", "grid_from", "grid_to", "battery_from", "battery_to", "wallbox"]

_RSCP_SUFFIX: dict[Role, str] = {
    "solar": "_solar_energy_produced",
    "grid_from": "_grid_in_energy",
    "grid_to": "_grid_out_energy",
    "battery_from": "_battery_energy_discharged",
    "battery_to": "_battery_energy_charged",
}

_OPTION_KEY: dict[Role, str] = {
    "solar": CONF_SIZING_PV_ENERGY_SENSOR,
    "grid_from": CONF_SIZING_GRID_IMPORT_ENERGY_SENSOR,
    "grid_to": CONF_SIZING_GRID_EXPORT_ENERGY_SENSOR,
    "battery_from": CONF_SIZING_BATTERY_DISCHARGE_ENERGY_SENSOR,
    "battery_to": CONF_SIZING_BATTERY_CHARGE_ENERGY_SENSOR,
    "wallbox": CONF_SIZING_WALLBOX_ENERGY_SENSOR,
}

# Maestro panel description keys (daily TOTAL_INCREASING — last resort).
_PANEL_DESC: dict[Role, str] = {
    "solar": "pv_production_today",
    "grid_from": "grid_draw_today",
    "grid_to": "grid_feed_in_today",
    "battery_from": "discharged_today",
    "battery_to": "charged_today",
    "wallbox": "wallbox_energy_today",
}

_SOURCE_ROLES: tuple[Role, ...] = (
    "solar",
    "grid_from",
    "grid_to",
    "battery_from",
    "battery_to",
)


def _alive(hass: HomeAssistant, entity_id: str | None) -> str | None:
    if not entity_id or not isinstance(entity_id, str):
        return None
    if hass.states.get(entity_id) is not None:
        return entity_id
    registry = er.async_get(hass)
    return entity_id if registry.async_get(entity_id) is not None else None


def _first_option(value: Any) -> str | None:
    if isinstance(value, list):
        return next((item for item in value if isinstance(item, str) and item), None)
    return value if isinstance(value, str) and value else None


def _rscp_energy_ids(hass: HomeAssistant) -> dict[Role, str]:
    entries = hass.config_entries.async_entries(E3DC_RSCP_DOMAIN)
    if not entries:
        return {}
    entry_ids = {item.entry_id for item in entries}
    registry = er.async_get(hass)
    sensor_ids = [
        ent.entity_id
        for ent in registry.entities.values()
        if ent.config_entry_id in entry_ids and ent.entity_id.startswith("sensor.")
    ]
    found: dict[Role, str] = {}
    for role, suffix in _RSCP_SUFFIX.items():
        match = next((eid for eid in sensor_ids if eid.endswith(suffix)), None)
        if match:
            found[role] = match
    return found


def _maestro_panel_ids(hass: HomeAssistant) -> dict[Role, str]:
    entries = [
        item
        for item in hass.config_entries.async_entries(DOMAIN)
        if item.state == ConfigEntryState.LOADED
    ]
    if not entries:
        return {}
    entry = entries[0]
    registry = er.async_get(hass)
    found: dict[Role, str] = {}
    for role, desc_key in _PANEL_DESC.items():
        entity_id = registry.async_get_entity_id("sensor", DOMAIN, f"{entry.entry_id}_{desc_key}")
        if entity_id:
            found[role] = entity_id
    return found


def resolve_energy_sensors(hass: HomeAssistant) -> dict[Role, dict[str, str]]:
    """Resolve best entity per role: options → RSCP lifetime → Maestro daily.

    Each value is ``{entity_id, origin}`` with origin in options|rscp|maestro.
    """
    entries = [
        item
        for item in hass.config_entries.async_entries(DOMAIN)
        if item.state == ConfigEntryState.LOADED
    ]
    options = dict(entries[0].options) if entries else {}
    rscp = _rscp_energy_ids(hass)
    panel = _maestro_panel_ids(hass)
    out: dict[Role, dict[str, str]] = {}
    for role in (*_SOURCE_ROLES, "wallbox"):
        opt = _alive(hass, _first_option(options.get(_OPTION_KEY[role])))
        if opt:
            out[role] = {"entity_id": opt, "origin": "options"}
            continue
        if role in rscp and _alive(hass, rscp[role]):
            out[role] = {"entity_id": rscp[role], "origin": "rscp"}
            continue
        if role in panel and _alive(hass, panel[role]):
            out[role] = {"entity_id": panel[role], "origin": "maestro"}
    return out


def _grid_source(grid_from: str, grid_to: str) -> dict[str, Any]:
    return {
        "type": "grid",
        "flow_from": [
            {
                "stat_energy_from": grid_from,
                "stat_cost": None,
                "entity_energy_price": None,
                "number_energy_price": None,
            }
        ],
        "flow_to": [
            {
                "stat_energy_to": grid_to,
                "stat_compensation": None,
                "entity_energy_price": None,
                "number_energy_price": None,
            }
        ],
        "cost_adjustment_day": 0.0,
    }


def _solar_source(entity_id: str) -> dict[str, Any]:
    return {
        "type": "solar",
        "stat_energy_from": entity_id,
        "config_entry_solar_forecast": None,
    }


def _battery_source(discharge: str, charge: str) -> dict[str, Any]:
    return {
        "type": "battery",
        "stat_energy_from": discharge,
        "stat_energy_to": charge,
    }


def build_proposed_sources(sensors: dict[Role, dict[str, str]]) -> list[dict[str, Any]]:
    """Build solar / grid / battery source objects from resolved sensors."""
    sources: list[dict[str, Any]] = []
    solar = sensors.get("solar")
    if solar:
        sources.append(_solar_source(solar["entity_id"]))
    grid_from = sensors.get("grid_from")
    grid_to = sensors.get("grid_to")
    if grid_from and grid_to:
        sources.append(_grid_source(grid_from["entity_id"], grid_to["entity_id"]))
    bat_from = sensors.get("battery_from")
    bat_to = sensors.get("battery_to")
    if bat_from and bat_to:
        sources.append(_battery_source(bat_from["entity_id"], bat_to["entity_id"]))
    return sources


def build_proposed_devices(sensors: dict[Role, dict[str, str]]) -> list[dict[str, Any]]:
    wallbox = sensors.get("wallbox")
    if not wallbox:
        return []
    return [{"stat_consumption": wallbox["entity_id"], "name": "Wallbox"}]


def _source_entity_ids(source: dict[str, Any]) -> set[str]:
    ids: set[str] = set()
    src_type = source.get("type")
    if src_type == "solar":
        if source.get("stat_energy_from"):
            ids.add(source["stat_energy_from"])
    elif src_type == "battery":
        for key in ("stat_energy_from", "stat_energy_to"):
            if source.get(key):
                ids.add(source[key])
    elif src_type == "grid":
        if source.get("stat_energy_from"):
            ids.add(source["stat_energy_from"])
        if source.get("stat_energy_to"):
            ids.add(source["stat_energy_to"])
        for flow in source.get("flow_from") or []:
            if flow.get("stat_energy_from"):
                ids.add(flow["stat_energy_from"])
        for flow in source.get("flow_to") or []:
            if flow.get("stat_energy_to"):
                ids.add(flow["stat_energy_to"])
    return ids


def _current_power_types(sources: list[dict[str, Any]]) -> set[str]:
    return {s.get("type") for s in sources if s.get("type") in {"solar", "grid", "battery"}}


def extra_solar_entity_ids(
    current_sources: list[dict[str, Any]],
    proposed: list[dict[str, Any]],
) -> list[str]:
    """Solar meters already in the Energy dashboard that Maestro does not propose.

    Typical case: a Fronius/Symo day meter next to E3DC ``solar_production_today``.
    Those often measure the same physical inverter as RSCP ``additional_production`` —
    keep them, but never add both the direct WR meter and a second copy of additional.
    """
    proposed_ids = {eid for src in proposed for eid in _source_entity_ids(src)}
    extra: list[str] = []
    for src in current_sources:
        if src.get("type") != "solar":
            continue
        for eid in sorted(_source_entity_ids(src)):
            if eid not in proposed_ids and eid not in extra:
                extra.append(eid)
    return extra


def classify_energy_prefs(
    current_sources: list[dict[str, Any]],
    proposed: list[dict[str, Any]],
) -> dict[str, Any]:
    """Compare existing prefs to the Maestro proposal."""
    proposed_ids = {eid for src in proposed for eid in _source_entity_ids(src)}
    power = [s for s in current_sources if s.get("type") in {"solar", "grid", "battery"}]
    other = [s for s in current_sources if s.get("type") not in {"solar", "grid", "battery"}]
    current_ids = {eid for src in power for eid in _source_entity_ids(src)}
    if not proposed:
        status = "unavailable"
    elif not power:
        status = "empty"
    elif proposed_ids and proposed_ids <= current_ids:
        status = "ours"
    elif current_ids & proposed_ids:
        status = "partial"
    else:
        status = "foreign"
    return {
        "status": status,
        "has_solar": any(s.get("type") == "solar" for s in power),
        "has_grid": any(s.get("type") == "grid" for s in power),
        "has_battery": any(s.get("type") == "battery" for s in power),
        "other_sources": len(other),
        "extra_solar": extra_solar_entity_ids(current_sources, proposed),
        "proposed_count": len(proposed),
        "power_types": sorted(_current_power_types(current_sources)),
    }


def merge_energy_sources(
    current: list[dict[str, Any]],
    proposed: list[dict[str, Any]],
    mode: Literal["fill", "replace"],
) -> list[dict[str, Any]]:
    """Merge proposed solar/grid/battery into existing prefs.

    ``fill`` only adds missing types. ``replace`` updates grid/battery and the
    Maestro solar meter, but keeps additional solar sources (Fremd-WR) and
    gas/water.
    """
    keep = [s for s in current if s.get("type") not in {"solar", "grid", "battery"}]
    if mode == "replace":
        proposed_ids = {eid for src in proposed for eid in _source_entity_ids(src)}
        kept_solar = [
            src
            for src in current
            if src.get("type") == "solar" and not (_source_entity_ids(src) & proposed_ids)
        ]
        return [*proposed, *kept_solar, *keep]
    existing_types = {s.get("type") for s in current}
    filled = [s for s in current if s.get("type") in {"solar", "grid", "battery"}]
    for src in proposed:
        if src.get("type") not in existing_types:
            filled.append(src)
    return [*filled, *keep]


def merge_devices(
    current: list[dict[str, Any]],
    proposed: list[dict[str, Any]],
    mode: Literal["fill", "replace"],
) -> list[dict[str, Any]]:
    proposed_ids = {d.get("stat_consumption") for d in proposed if d.get("stat_consumption")}
    if mode == "replace":
        kept = [d for d in current if d.get("stat_consumption") not in proposed_ids]
        return [*kept, *proposed]
    existing = {d.get("stat_consumption") for d in current}
    extra = [d for d in proposed if d.get("stat_consumption") not in existing]
    return [*current, *extra]


def _missing_roles(sensors: dict[Role, dict[str, str]]) -> list[str]:
    missing = [role for role in _SOURCE_ROLES if role not in sensors]
    if ("grid_from" in sensors) ^ ("grid_to" in sensors):
        missing.extend(role for role in ("grid_from", "grid_to") if role not in sensors)
    if ("battery_from" in sensors) ^ ("battery_to" in sensors):
        missing.extend(role for role in ("battery_from", "battery_to") if role not in sensors)
    return sorted(set(missing))


def _rscp_wallbox_power(hass: HomeAssistant) -> dict[str, Any] | None:
    """E3DC wallbox power meter from hacs-e3dc (kW) — not usable as Energy device alone."""
    entries = hass.config_entries.async_entries(E3DC_RSCP_DOMAIN)
    if not entries:
        return None
    entry_ids = {item.entry_id for item in entries}
    registry = er.async_get(hass)
    for ent in registry.entities.values():
        if ent.config_entry_id not in entry_ids:
            continue
        if (ent.translation_key or "") != "wallbox-consumption":
            continue
        state = hass.states.get(ent.entity_id)
        available = state is not None and state.state not in ("unavailable", "unknown")
        return {"entity_id": ent.entity_id, "available": available}
    return None


def _extra_device_ids(
    current_devices: list[dict[str, Any]],
    proposed_devices: list[dict[str, Any]],
) -> list[str]:
    proposed = {d.get("stat_consumption") for d in proposed_devices if d.get("stat_consumption")}
    extra: list[str] = []
    for device in current_devices:
        eid = device.get("stat_consumption")
        if isinstance(eid, str) and eid and eid not in proposed and eid not in extra:
            extra.append(eid)
    return extra


def _preview_payload(
    hass: HomeAssistant,
    current_sources: list[dict[str, Any]],
    current_devices: list[dict[str, Any]],
    energy_ready: bool,
) -> dict[str, Any]:
    sensors = resolve_energy_sensors(hass)
    proposed_sources = build_proposed_sources(sensors)
    proposed_devices = build_proposed_devices(sensors)
    comparison = classify_energy_prefs(current_sources, proposed_sources)
    wallbox_power = _rscp_wallbox_power(hass)
    return {
        "energy_ready": energy_ready,
        "sensors": {
            role: {"entity_id": info["entity_id"], "origin": info["origin"]}
            for role, info in sensors.items()
        },
        "proposed_sources": proposed_sources,
        "proposed_devices": proposed_devices,
        "missing": _missing_roles(sensors),
        "ready": bool(proposed_sources),
        "extra_devices": _extra_device_ids(current_devices, proposed_devices),
        "wallbox_power": wallbox_power,
        **comparison,
    }


async def async_energy_dashboard_preview(hass: HomeAssistant) -> dict[str, Any]:
    """Snapshot for the panel wizard (no writes)."""
    energy_ready = "energy" in hass.config.components
    current_sources: list[dict[str, Any]] = []
    current_devices: list[dict[str, Any]] = []
    if energy_ready:
        try:
            from homeassistant.components.energy.data import async_get_manager  # noqa: PLC0415

            manager = await async_get_manager(hass)
            if manager.data is not None:
                current_sources = list(manager.data.get("energy_sources") or [])
                current_devices = list(manager.data.get("device_consumption") or [])
        except Exception as err:  # noqa: BLE001
            _LOGGER.debug("Energy preview without manager: %s", err)
            energy_ready = False
    return _preview_payload(hass, current_sources, current_devices, energy_ready)


async def async_energy_dashboard_apply(
    hass: HomeAssistant,
    mode: Literal["fill", "replace"] = "fill",
) -> dict[str, Any]:
    """Write merged solar/grid/battery (+ optional wallbox) into Energy prefs."""
    from homeassistant.components.energy.data import async_get_manager  # noqa: PLC0415

    sensors = resolve_energy_sensors(hass)
    proposed_sources = build_proposed_sources(sensors)
    proposed_devices = build_proposed_devices(sensors)
    if not proposed_sources:
        preview = await async_energy_dashboard_preview(hass)
        return {"ok": False, "error": "no_sensors", **preview}

    manager = await async_get_manager(hass)
    if manager.data is None:
        current_sources: list[dict[str, Any]] = []
        current_devices: list[dict[str, Any]] = []
    else:
        current_sources = list(manager.data.get("energy_sources") or [])
        current_devices = list(manager.data.get("device_consumption") or [])

    merged_sources = merge_energy_sources(current_sources, proposed_sources, mode)
    merged_devices = merge_devices(current_devices, proposed_devices, mode)

    update: dict[str, Any] = {"energy_sources": merged_sources}
    if proposed_devices:
        update["device_consumption"] = merged_devices

    await manager.async_update(update)
    after = await async_energy_dashboard_preview(hass)
    return {"ok": True, "mode": mode, **after}
