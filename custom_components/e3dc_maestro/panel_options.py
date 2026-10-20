"""Read and patch Maestro options from the cockpit.

The allow-list mirrors the config-flow schemas. Live parameters (fields on
``MaestroParams``) go through ``update_param`` and do not reload. Everything
else, including entity wiring, is written to the config entry so the update
listener reloads the integration.
"""
from __future__ import annotations

import re
from typing import Any

from homeassistant.config_entries import ConfigEntryState
from homeassistant.core import HomeAssistant
from homeassistant.helpers import entity_registry as er

from .const import (
    AUTO_MODE_OBJECTIVES,
    DOMAIN,
    MAX_ADDITIONAL_PRODUCERS,
    TARIFF_MODES,
    WALLBOX_TYPE_E3DC,
    WALLBOX_TYPE_GENERIC,
    as_entity_list,
)

WS_PANEL_OPTIONS = f"{DOMAIN}/panel_options"
WS_PANEL_OPTIONS_SET = f"{DOMAIN}/panel_options/set"

_TIME = re.compile(r"^(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$")
_SLOT_CLASS = ("high", "low", "normal")

# kind, then bounds or choices. "entity!" cannot be cleared.
_Spec = tuple


def _n(low: float, high: float) -> _Spec:
    return ("number", low, high)


def _entity(required: bool = False) -> _Spec:
    return ("entity", required)


def _entities(max_n: int | None = None) -> _Spec:
    return ("entities", max_n)


_SPECS: dict[str, _Spec] = {
    # Sources
    "soc_sensor": _entity(True),
    "pv_power_sensor": _entity(True),
    "additional_generation_sensor": _entities(MAX_ADDITIONAL_PRODUCERS),
    "additional_energy_total_sensor": _entities(MAX_ADDITIONAL_PRODUCERS),
    "house_power_sensor": _entity(True),
    "grid_power_sensor": _entity(True),
    "grid_power_invert": ("bool",),
    "battery_power_sensor": _entity(True),
    "battery_charged_today_sensor": _entity(),
    "battery_discharged_today_sensor": _entity(),
    "pv_production_today_sensor": _entity(),
    "house_consumption_today_sensor": _entity(),
    # Plant
    "inverter_power": _n(1000, 30000),
    "max_charge_power": _n(500, 15000),
    "min_charge_power": _n(50, 5000),
    "installed_kwp": _n(0.5, 100),
    "feed_in_limit_percent": _n(0, 100),
    "battery_capacity_kwh": _n(1, 100),
    "update_interval": _n(10, 120),
    "advanced_corridor": ("bool",),
    "lower_corridor": _n(0, 5000),
    "upper_corridor": _n(0, 15000),
    "soc_hysteresis_percent": _n(0, 10),
    "charge_ramp_w_per_cycle": _n(0, 2000),
    # Season and reserve
    "charge_threshold": _n(0, 50),
    "charge_target": _n(50, 100),
    "winter_minimum_hour": _n(6, 18),
    "summer_maximum_hour": _n(8, 20),
    "summer_charge_end": _n(12, 23),
    "seasonal_reserve_enabled": ("bool",),
    "reserve_winter_percent": _n(0, 80),
    "reserve_equinox_percent": _n(0, 50),
    "adaptive_reserve_enabled": ("bool",),
    "adaptive_reserve_lookback_days": _n(1, 60),
    "adaptive_reserve_min_days": _n(1, 30),
    "adaptive_reserve_safety_factor": _n(1.0, 3.0),
    "adaptive_reserve_max_soc": _n(5, 90),
    # High tariff
    "ht_enabled": ("bool",),
    "ht_on": _n(0, 23),
    "ht_off": _n(0, 23),
    "ht_min": _n(0, 100),
    "ht_sockel": _n(0, 100),
    "ht_sat": ("bool",),
    "ht_sun": ("bool",),
    # Tariff and price plan
    "tariff_mode": ("select", tuple(TARIFF_MODES)),
    "fixed_buy_price": _n(0, 1),
    "feed_in_price": _n(0, 1),
    "battery_capex_eur": _n(0, 50000),
    "battery_total_cycles": _n(500, 20000),
    "dynamic_tariff_enabled": ("bool",),
    "price_sensor": _entity(),
    "cheap_threshold": _n(0, 1),
    "max_grid_charge_kwh": _n(0, 20),
    "low_slot_grid_charge_enabled": ("bool",),
    "low_slot_target_soc": _n(0, 100),
    "low_slot_forecast_based": ("bool",),
    "low_slot_hold_discharge": ("bool",),
    "price_plan_enabled": ("bool",),
    "price_plan_active": ("bool",),
    "price_plan_max_soc": _n(10, 100),
    "price_plan_min_spread": _n(0, 0.5),
    "price_plan_efficiency": _n(0.5, 1),
    "price_plan_safety_factor": _n(1, 2),
    "tariff_slots": ("slots",),
    # Wallbox, EVCC, heat pump
    "wallbox_enabled": ("bool",),
    "wallbox_type": ("select", (WALLBOX_TYPE_E3DC, WALLBOX_TYPE_GENERIC)),
    "wallbox_power_sensor": _entity(),
    "wallbox_included_in_house": ("bool",),
    "wallbox_min_current": _n(6, 32),
    "wallbox_max_current": _n(6, 32),
    "wallbox_phases": ("select", ("1", "3")),
    "wallbox_min_surplus": _n(0, 10000),
    "wallbox_service_on": ("action",),
    "wallbox_service_off": ("action",),
    "evcc_enabled": ("bool",),
    "evcc_charging_entity": _entity(),
    "evcc_mode_entity": _entity(),
    "evcc_now_value": ("text",),
    "evcc_discharge_limit_w": _n(0, 15000),
    "hp_enabled": ("bool",),
    "hp_switch_entity": _entity(),
    "hp_service_on": ("action",),
    "hp_service_off": ("action",),
    "hp_min_surplus": _n(0, 10000),
    "hp_max_price": _n(0, 1),
    "hp_time_start": ("time",),
    "hp_time_end": ("time",),
    "hp_min_run_minutes": _n(0, 120),
    "hp_min_pause_minutes": _n(0, 120),
    "watchdog_timeout": _n(0, 60),
    # Forecast and charge shape
    "pv_forecast_enabled": ("bool",),
    "pv_forecast_sensor": _entity(),
    "tomorrow_pv_sensor": _entity(),
    "pv_forecast_sensor_day2": _entity(),
    "pv_forecast_threshold_kwh": _n(0, 100),
    "pv_forecast_safety_factor": _n(1, 3),
    "delay_min_soc": _n(0, 80),
    "spreading_enabled": ("bool",),
    "spreading_target_soc": _n(50, 100),
    "forward_looking_enabled": ("bool",),
    "forward_looking_max_soc": _n(60, 100),
    "low_yield_priority_enabled": ("bool",),
    "pv_forecast_today_sensor": _entity(),
    "low_yield_threshold": _n(0.1, 1),
    "low_yield_reference_kwh": _n(0, 500),
    "low_yield_reference_kwh_per_kwp": _n(1, 10),
    "morning_cap_enabled": ("bool",),
    "morning_cap_soc": _n(10, 80),
    "morning_cap_until_h": _n(0, 14),
    "gentle_charge_enabled": ("bool",),
    "gentle_charge_factor": _n(0.05, 1),
    "auto_mode_enabled": ("bool",),
    "auto_mode_objective": ("select", tuple(AUTO_MODE_OBJECTIVES)),
    # Sizing advisor
    "sizing_pv_energy_sensor": _entities(),
    "sizing_house_energy_sensor": _entity(),
    "sizing_house_from_balance": ("bool",),
    "sizing_grid_import_energy_sensor": _entity(),
    "sizing_grid_export_energy_sensor": _entity(),
    "sizing_battery_charge_energy_sensor": _entity(),
    "sizing_battery_discharge_energy_sensor": _entity(),
    "sizing_wallbox_energy_sensor": _entity(),
    "sizing_heat_pump_energy_sensor": _entity(),
    "sizing_analysis_days": _n(30, 730),
    "sizing_electricity_price_eur_kwh": _n(0.05, 2),
    "sizing_feed_in_price_eur_kwh": _n(0, 1),
    "sizing_battery_price_eur_kwh": _n(100, 5000),
    "sizing_pv_price_eur_per_kwp": _n(200, 5000),
    "sizing_inverter_upgrade_price_eur": _n(0, 20000),
    "sizing_round_trip_efficiency": _n(0.5, 1),
    "sizing_max_battery_sweep_kwh": _n(5, 200),
    "sizing_battery_step_kwh": _n(0.5, 10),
    "sizing_max_pv_expansion_kwp": _n(0, 200),
    "sizing_pv_step_kwp": _n(0.5, 10),
    # Display only. Stored on the entry so every browser shows the same flow.
    "flow_consumers": ("consumers",),
}

_DISPLAY_OPTIONS = frozenset({"flow_consumers"})
_CONSUMER_ICONS = frozenset({"wallbox", "heater", "climate", "heatpump", "meter"})
_CONSUMER_ENTITY = re.compile(r"wallbox|evcc|easee|go-?e", re.IGNORECASE)


class PanelOptionsError(Exception):
    """One or more option values failed validation. ``errors`` maps key to reason."""

    def __init__(self, errors: dict[str, str]) -> None:
        super().__init__(", ".join(f"{key}: {reason}" for key, reason in errors.items()))
        self.errors = errors


def entity_known(hass: HomeAssistant, entity_id: str) -> bool:
    """True when the entity is in the state machine or the entity registry."""
    if hass.states.get(entity_id) is not None:
        return True
    try:
        registry = er.async_get(hass)
    except Exception:  # noqa: BLE001 — registry is optional in unit tests
        return False
    get = getattr(registry, "async_get", None)
    if not callable(get):
        return False
    try:
        found = get(entity_id)
    except Exception:  # noqa: BLE001
        return False
    return found is not None and not isinstance(found, type)


def _number(value: Any, low: float, high: float) -> str | None:
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        return "number"
    if not low <= float(value) <= high:
        return "range"
    return None


def _entity_id(value: Any, known) -> str | None:
    if not isinstance(value, str) or not value:
        return "entity"
    return None if known(value) else "unknown_entity"


def _slot(value: Any) -> str | None:
    if not isinstance(value, dict):
        return "slot"
    days = value.get("weekdays")
    if not isinstance(days, list) or not days or not all(isinstance(d, int) and 0 <= d <= 6 for d in days):
        return "weekdays"
    if _number(value.get("start_h"), 0, 24) or _number(value.get("end_h"), 0, 24):
        return "hours"
    if value.get("class_") not in _SLOT_CLASS:
        return "class"
    reserve = value.get("min_reserve_soc")
    if reserve is not None and _number(reserve, 0, 100):
        return "reserve"
    return None


def _flow_consumers(value: Any, known) -> tuple[list[dict[str, str]] | None, str | None]:
    """Clean the live-flow consumer list. Empty is valid."""
    if not isinstance(value, list) or len(value) > 6:
        return None, "consumers"
    cleaned: list[dict[str, str]] = []
    seen: set[str] = set()
    for item in value:
        if not isinstance(item, dict):
            return None, "consumers"
        entity_id = item.get("entityId")
        mode = item.get("mode")
        if not isinstance(entity_id, str) or not entity_id.startswith("sensor."):
            return None, "consumers"
        if entity_id in seen:
            continue
        if mode not in ("included", "separate"):
            return None, "consumers"
        if not known(entity_id):
            return None, "unknown_entity"
        name = item.get("name")
        name = name.strip()[:40] if isinstance(name, str) and name.strip() else entity_id
        icon = item.get("icon")
        if icon not in _CONSUMER_ICONS:
            icon = "wallbox" if _CONSUMER_ENTITY.search(entity_id) else "meter"
        row_id = item.get("id")
        row_id = row_id[:64] if isinstance(row_id, str) and row_id else entity_id
        cleaned.append({"id": row_id, "entityId": entity_id, "name": name, "mode": mode, "icon": icon})
        seen.add(entity_id)
    return cleaned, None


def _check(spec: _Spec, value: Any, known) -> str | None:
    kind = spec[0]
    if kind == "number":
        return _number(value, spec[1], spec[2])
    if kind == "bool":
        return None if isinstance(value, bool) else "bool"
    if kind == "select":
        return None if value in spec[1] else "choice"
    if kind == "entity":
        return _entity_id(value, known)
    if kind == "entities":
        if not isinstance(value, list) or not all(isinstance(item, str) and item for item in value):
            return "entities"
        max_n = spec[1] if len(spec) > 1 else None
        if max_n is not None and len(value) > max_n:
            return "entities"
        missing = [item for item in value if not known(item)]
        return "unknown_entity" if missing else None
    if kind == "time":
        return None if isinstance(value, str) and _TIME.match(value) else "time"
    if kind == "text":
        return None if isinstance(value, str) and len(value) <= 64 else "text"
    if kind == "action":
        return None if isinstance(value, dict) else "action"
    if kind == "slots":
        if not isinstance(value, list):
            return "slots"
        for slot in value:
            reason = _slot(slot)
            if reason:
                return reason
        return None
    return "type"


def validate_panel_options(hass: HomeAssistant, values: dict[str, Any]) -> tuple[dict[str, Any], dict[str, str]]:
    """Return cleaned values and a map of key to error code."""
    if not isinstance(values, dict) or not values:
        return {}, {"values": "empty"}
    cleaned: dict[str, Any] = {}
    errors: dict[str, str] = {}
    known = lambda entity_id: entity_known(hass, entity_id)  # noqa: E731
    for key, value in values.items():
        spec = _SPECS.get(key)
        if spec is None:
            errors[key] = "unknown"
            continue
        if value is None:
            clearable = spec[0] in {"entity", "entities", "action", "text", "slots"}
            if not clearable or (spec[0] == "entity" and spec[1]):
                errors[key] = "required"
            else:
                cleaned[key] = None
            continue
        if spec[0] == "consumers":
            parsed, reason = _flow_consumers(value, known)
            if reason:
                errors[key] = reason
            else:
                cleaned[key] = parsed
            continue
        if spec[0] == "entities":
            if isinstance(value, str):
                value = as_entity_list(value)
            elif isinstance(value, list):
                value = as_entity_list(value)
            else:
                errors[key] = "entities"
                continue
            # Empty producer lists clear the option (RSCP fallback can apply).
            if not value and key in {
                "additional_generation_sensor",
                "additional_energy_total_sensor",
            }:
                cleaned[key] = None
                continue
        reason = _check(spec, value, known)
        if reason:
            errors[key] = reason
        else:
            cleaned[key] = value
    return cleaned, errors


def _loaded_entry(hass: HomeAssistant):
    entries = hass.config_entries.async_entries(DOMAIN)
    return next((entry for entry in entries if entry.state == ConfigEntryState.LOADED), None)


def _store_options(hass: HomeAssistant, entry: Any, coordinator: Any, values: dict[str, Any], *, reload: bool) -> None:
    """Write options. Display settings skip the integration reload."""
    new_options = dict(entry.options)
    for key, value in values.items():
        if value is None:
            new_options.pop(key, None)
        else:
            new_options[key] = value
    if coordinator is not None:
        coordinator._skip_reload = not reload
    try:
        hass.config_entries.async_update_entry(entry, options=new_options)
    finally:
        if coordinator is not None and not reload:
            coordinator._skip_reload = False


def apply_panel_options(hass: HomeAssistant, values: dict[str, Any]) -> dict[str, Any]:
    """Validate and store a partial options update for the loaded Maestro entry."""
    cleaned, errors = validate_panel_options(hass, values)
    if errors:
        raise PanelOptionsError(errors)
    entry = _loaded_entry(hass)
    if entry is None:
        raise PanelOptionsError({"entry": "not_loaded"})
    coordinator = hass.data.get(DOMAIN, {}).get(entry.entry_id)
    display = {key: value for key, value in cleaned.items() if key in _DISPLAY_OPTIONS}
    live = {key: value for key, value in cleaned.items() if key not in _DISPLAY_OPTIONS}
    if display:
        _store_options(hass, entry, coordinator, display, reload=False)
    if not live:
        return {"entry_id": entry.entry_id, "reloaded": False}
    cleaned = live
    needs_reload = coordinator is None or any(
        not hasattr(getattr(coordinator, "_params", None), key) for key in cleaned
    )
    if needs_reload:
        new_options = dict(entry.options)
        for key, value in cleaned.items():
            if value is None:
                new_options.pop(key, None)
            else:
                new_options[key] = value
        if coordinator is not None:
            coordinator._skip_reload = False
        hass.config_entries.async_update_entry(entry, options=new_options)
        return {"entry_id": entry.entry_id, "reloaded": True}
    for key, value in cleaned.items():
        coordinator.update_param(key, value)
    return {"entry_id": entry.entry_id, "reloaded": False}


def panel_options_payload(hass: HomeAssistant) -> dict[str, Any]:
    """Current options of the loaded entry. Unknown to non-setup users as an empty payload."""
    entry = _loaded_entry(hass)
    if entry is None:
        return {"entry_id": None, "options": {}}
    return {"entry_id": entry.entry_id, "options": dict(entry.options)}


def _admin(connection: Any) -> bool:
    user = getattr(connection, "user", None)
    return bool(user and getattr(user, "is_admin", False))


def ws_panel_options(hass: HomeAssistant, connection: Any, msg: dict[str, Any]) -> None:
    connection.send_result(msg["id"], panel_options_payload(hass))


def ws_panel_options_set(hass: HomeAssistant, connection: Any, msg: dict[str, Any]) -> None:
    if not _admin(connection):
        connection.send_error(msg["id"], "unauthorized", "admin required")
        return
    try:
        result = apply_panel_options(hass, msg.get("values") or {})
    except PanelOptionsError as err:
        connection.send_error(msg["id"], "invalid_format", str(err))
        return
    connection.send_result(msg["id"], result)
