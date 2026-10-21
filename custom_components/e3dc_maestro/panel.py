"""Register the Maestro cockpit as a sidebar panel."""
from __future__ import annotations

import logging
from pathlib import Path
from typing import Any

import voluptuous as vol

from homeassistant.components import frontend, panel_custom, websocket_api
from homeassistant.config_entries import ConfigEntryState
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers import entity_registry as er

from .panel_options import (
    WS_PANEL_OPTIONS,
    WS_PANEL_OPTIONS_SET,
    ws_panel_options,
    ws_panel_options_set,
)
from .const import (
    E3DC_RSCP_DOMAIN,
    CONF_AUTO_MODE_ENABLED,
    CONF_FORCE_DISCHARGE_POWER_W,
    CONF_FIXED_RESERVE_ENABLED,
    CONF_FIXED_RESERVE_SOC,
    CONF_FORWARD_LOOKING_ENABLED,
    CONF_INVERTER_POWER,
    CONF_PRICE_PLAN_ACTIVE,
    CONF_PRICE_PLAN_ENABLED,
    CONF_PV_FORECAST_ENABLED,
    DOMAIN,
    PAUSE_HOURS,
)
from .frontend_cache import asset_query

_LOGGER = logging.getLogger(__name__)

# "e3dc-maestro" is taken by the Lovelace strategy dashboard.
PANEL_URL_PATH = "maestro-cockpit"
PANEL_COMPONENT = "e3dc-maestro-panel"
# Served by the static path registered in dashboard_frontend.async_setup_frontend.
_PANEL_MODULE = f"/{DOMAIN}/frontend/panel/maestro-panel.js"
_PANEL_FLAG = f"{DOMAIN}_panel_registered"
_WS_FLAG = f"{DOMAIN}_panel_ws_registered"
WS_PANEL_PAUSE = f"{DOMAIN}/pause"
WS_PANEL_ENTITIES = f"{DOMAIN}/panel_entities"
WS_ENERGY_PREVIEW = f"{DOMAIN}/energy_dashboard/preview"
WS_ENERGY_APPLY = f"{DOMAIN}/energy_dashboard/apply"

# Panel key -> (platform, entity description key). unique_id is "<entry_id>_<key>", so
# the panel finds its entities even after the user renamed them. Keys must match
# panel-src/src/entities.ts.
PANEL_ENTITIES: dict[str, tuple[str, str]] = {
    "phase": ("sensor", "phase"),
    "lastAction": ("sensor", "last_action"),
    "explanation": ("sensor", "decision_explanation"),
    "trajectory": ("sensor", "forecast_trajectory"),
    "plan": ("sensor", "price_plan"),
    "soc": ("sensor", "current_soc"),
    "targetSoc": ("sensor", "target_soc"),
    "pv": ("sensor", "pv_power"),
    "additionalPv": ("sensor", "additional_pv_power"),
    "house": ("sensor", "house_power"),
    "grid": ("sensor", "grid_power"),
    "battery": ("sensor", "battery_power"),
    "autonomy": ("sensor", "autonomy_time"),
    "costNet": ("sensor", "netto_kosten_heute"),
    "costToday": ("sensor", "kosten_heute"),
    "feedRevenue": ("sensor", "einspeise_erloes_heute"),
    "wear": ("sensor", "akku_verschleiss_heute"),
    "balance": ("sensor", "bilanz_heute"),
    "gridToBattery": ("sensor", "grid_to_battery_today"),
    "unjustified": ("binary_sensor", "unjustified_grid_charge"),
    "wallboxEnergy": ("sensor", "wallbox_energy_today"),
    "feedInInterventions": ("sensor", "feed_in_interventions"),
    "feedInAvoided": ("sensor", "feed_in_avoided_today"),
    "curtailAvoided": ("sensor", "curtailment_avoided_today"),
    "feedInLimit": ("binary_sensor", "feed_in_limit_active"),
    "gridCharge": ("binary_sensor", "grid_charge_active"),
    "batteryPriority": ("binary_sensor", "battery_priority_active"),
    "lowYield": ("binary_sensor", "low_yield_day_active"),
    "forecastQuality": ("sensor", "forecast_data_quality"),
    "p10": ("sensor", "pv_forecast_remaining_p10"),
    "yieldToday": ("sensor", "low_yield_today_kwh"),
    "yieldRef": ("sensor", "low_yield_reference_kwh"),
    "yieldRatio": ("sensor", "low_yield_ratio"),
    "deficit": ("sensor", "tomorrow_deficit_kwh"),
    "seasonalReserve": ("sensor", "seasonal_reserve_soc"),
    "adaptiveReserve": ("sensor", "adaptive_reserve_soc"),
    "htReserve": ("sensor", "adaptive_ht_reserve_soc"),
    "forwardTarget": ("sensor", "forward_looking_target_soc"),
    "astroStart": ("sensor", "astro_charge_start"),
    "seasonalEnd": ("sensor", "seasonal_charge_end"),
    "pvDelayStart": ("sensor", "pv_delay_charge_start"),
    "tomorrowStart": ("sensor", "tomorrow_charge_start"),
    "tomorrowEnd": ("sensor", "tomorrow_charge_end"),
    "autoStrategy": ("sensor", "auto_active_strategy"),
    "autoSaving": ("sensor", "auto_estimated_savings"),
    "targetCharge": ("sensor", "target_charge_power"),
    "sizingStatus": ("sensor", "sizing_status"),
    "sizingMatrix": ("sensor", "sizing_matrix"),
    "sizingScenario": ("sensor", "sizing_scenario"),
    "sizingInverter": ("binary_sensor", "sizing_inverter_upgrade_needed"),
    "btnSizing": ("button", "run_sizing"),
    "saving": ("sensor", "pv_ersparnis_heute"),
    "selfUse": ("sensor", "eigenverbrauch_heute"),
    "importToday": ("sensor", "grid_draw_today"),
    "feedToday": ("sensor", "grid_feed_in_today"),
    "pvToday": ("sensor", "pv_production_today"),
    "pvExtraToday": ("sensor", "pv_additional_today"),
    "houseToday": ("sensor", "house_consumption_today"),
    "chargedToday": ("sensor", "charged_today"),
    "dischargedToday": ("sensor", "discharged_today"),
    "pvTomorrow": ("sensor", "tomorrow_pv_kwh"),
    "reachable": ("binary_sensor", "e3dc_reachable"),
    "chargeLock": ("binary_sensor", "charge_block_active"),
    "dischargeLock": ("binary_sensor", "discharge_block_active"),
    "htProtect": ("binary_sensor", "ht_protection_active"),
    "curtail": ("binary_sensor", "curtailment_guard_active"),
    "emergency": ("binary_sensor", "emergency_charge_active"),
    "chargeLimit": ("sensor", "charge_power_limit"),
    "dischargeLimit": ("sensor", "discharge_power_limit"),
    "sentChargeLimit": ("sensor", "sent_charge_power_limit"),
    "sentDischargeLimit": ("sensor", "sent_discharge_power_limit"),
    "forceDischargePower": ("number", CONF_FORCE_DISCHARGE_POWER_W),
    "fixedReserveSoc": ("number", CONF_FIXED_RESERVE_SOC),
    "inverterPower": ("number", CONF_INVERTER_POWER),
    "ctrlActive": ("switch", "regelung_aktiv"),
    "ctrlPredictive": ("switch", CONF_FORWARD_LOOKING_ENABLED),
    "ctrlPvDelay": ("switch", CONF_PV_FORECAST_ENABLED),
    "ctrlPlanControls": ("switch", CONF_PRICE_PLAN_ACTIVE),
    "ctrlPlanShadow": ("switch", CONF_PRICE_PLAN_ENABLED),
    "ctrlAuto": ("switch", CONF_AUTO_MODE_ENABLED),
    "forceDischarge": ("switch", "force_discharge"),
    "fixedReserve": ("switch", CONF_FIXED_RESERVE_ENABLED),
    "debug": ("switch", "debug"),
    "debugLog": ("sensor", "debug_log"),
    "btnClear": ("button", "clear_limits"),
    "btnCharge": ("button", "manual_charge"),
    "selWallbox": ("select", "wallbox_type"),
    "selMorning": ("select", "morning_discharge_mode"),
    "selAuto": ("select", "auto_mode_objective"),
    "selTariff": ("select", "tariff_mode"),
    "selStrategy": ("select", "grid_charge_strategy"),
}

# Platforms whose entities are tunable from the settings screen. The key is the
# unique_id suffix ("<entry_id>_<key>"), so renamed entities keep working.
_SETTINGS_DOMAINS = frozenset({"number", "switch", "select", "button"})

# Panel key -> e3dc_rscp translation_key. One value per system, matched on the
# entity registry so renamed entity_ids keep working.
_PLANT_KEYS: dict[str, str] = {
    "mode": "pset-powermode",
    "powerValue": "pset-powervalue",
    "limitsOn": "pset-limit-enabled",
    "limitCharge": "pset-limit-charge",
    "limitDischarge": "pset-limit-discharge",
    "limitDischargeMin": "pset-limit-discharge-minimum",
    "manualCharge": "manual-charge-active",
    "manualEnergy": "manual-charge-energy",
    "pvDerated": "system-pv-derated",
    "emergencyPower": "system-emergency-power-started",
    "emergencyReserve": "system-emergency-reserve-reached",
    "rescueBattery": "system-rescue-battery-enabled",
    "weather": "pset-weatherregulationenabled",
    "weatherWait": "system-wait-for-weather-breakthrough",
    "autarky": "autarky",
    "selfConsumption": "selfconsumption",
    "houseL1": "house-l1",
    "houseL2": "house-l2",
    "houseL3": "house-l3",
    "gridL1": "grid-l1",
    "gridL2": "grid-l2",
    "gridL3": "grid-l3",
    "pviL1": "pvi-l1",
    "pviL2": "pvi-l2",
    "pviL3": "pvi-l3",
    "installedPeak": "system-battery-installed-peak",
    "batteryCapacity": "system-battery-installed-capacity",
    "acMax": "system-ac-maxpower",
    "chargeMax": "system-battery-charge-max",
    "dischargeMax": "system-battery-discharge-max",
    "deratePercent": "system-derate-percent",
    "deratePower": "system-derate-power",
    "extraProduction": "additional-production",
    "extraConsumption": "additional-consumption",
    "errors": "system-saved-errors",
}
_PACK_KEYS: dict[str, str] = {
    "soh": "battery-pack-state-of-health",
    "cycles": "battery-pack-charge-cycles",
    "energy": "battery-pack-usable-remaining-energy",
    "current": "battery-pack-current",
    "voltage": "battery-pack-module-voltage",
    "tempMax": "battery-pack-max-dcb-cell-temperature",
    "tempMin": "battery-pack-min-dcb-cell-temperature",
}
_WALLBOX_KEYS: dict[str, str] = {
    "plug": "wallbox-plug",
    "charging": "wallbox-charging",
    "phases": "wallbox-phases",
    "net": "wallbox-consumption-net",
    "sun": "wallbox-consumption-sun",
    "soc": "wallbox-soc",
    "current": "wallbox-max-charge-current",
}
# Device-reported module health. The calculated module SoH is a different entity.
_MODULE_KEYS: dict[str, str] = {
    "sohReported": "battery-module-soh-reported",
}
# System switches and numbers RSCP can write. Same translation may also exist as a sensor.
_GENERAL_CONTROLS: dict[str, str] = {
    "powersave": "pset-powersaving-enabled",
    "weather": "pset-weatherregulationenabled",
}
_WALLBOX_SYSTEM_CONTROLS: dict[str, str] = {
    "batteryBeforeCar": "battery-before-car-mode",
    "batteryToCar": "battery-to-car-mode",
    "enforcePower": "wallbox-enforce-power-assignment",
    "dischargeLimit": "battery-wallbox-discharge-limit",
}
_WALLBOX_CONTROLS: dict[str, str] = {
    "sunMode": "wallbox-sun-mode",
    "schuko": "wallbox-schuko",
    "maxCurrent": "wallbox-max-charge-current",
    "togglePhases": "wallbox-toggle-wallbox-phases",
    "toggleCharging": "wallbox-toggle-wallbox-charging",
}
# hacs-e3dc ships these with entity_registry_enabled_default=False. The plant
# view reads them, so setup re-enables a copy that the integration itself
# disabled. User opt-outs stay off. Keys that hacs-e3dc never creates
# (additional-production without an external source, system-saved-errors)
# are absent from the registry and are left alone.
_PLANT_ENABLE_KEYS = frozenset({
    "system-derate-power",
    "system-ac-maxpower",
    "system-pv-derated",
    "pset-limit-discharge-minimum",
    "battery-module-soh-reported",
    "system-rescue-battery-enabled",
    "pset-powersaving-enabled",
})
_WRITABLE = frozenset({"switch", "number", "select", "button"})
_PLANT_DEVICE_KEYS = frozenset(
    {
        *_PACK_KEYS.values(),
        *_WALLBOX_KEYS.values(),
        *_MODULE_KEYS.values(),
        *_WALLBOX_CONTROLS.values(),
    }
)


def empty_plant() -> dict[str, Any]:
    return {
        "entities": {},
        "packs": [],
        "wallboxes": [],
        "controls": {"general": {}, "wallbox": {}},
        "identity": {},
    }


_READONLY = frozenset({"sensor", "binary_sensor"})


def _prefer_sensor(current: Any | None, candidate: Any) -> Any:
    """A sensor wins over a same-named switch or number so status rows stay read-only."""
    if current is None:
        return candidate
    if getattr(current, "domain", None) not in _READONLY and getattr(candidate, "domain", None) in _READONLY:
        return candidate
    return current


def _prefer_writable(current: Any | None, candidate: Any) -> Any:
    """A switch or number wins over a same-named sensor so the control can be changed."""
    if current is None:
        return candidate
    if getattr(current, "domain", None) not in _WRITABLE and getattr(candidate, "domain", None) in _WRITABLE:
        return candidate
    return current


def _writable_ids(fields: dict[str, Any]) -> dict[str, str]:
    return {key: ent.entity_id for key, ent in fields.items() if getattr(ent, "domain", None) in _WRITABLE}


def plant_from_entries(reg_entries: list[Any], devices: dict[str, dict[str, Any]]) -> dict[str, Any]:
    """Group enabled e3dc_rscp registry entries into system, pack, module and control maps."""
    scalar_of = {translation: key for key, translation in _PLANT_KEYS.items()}
    pack_of = {translation: key for key, translation in _PACK_KEYS.items()}
    module_of = {translation: key for key, translation in _MODULE_KEYS.items()}
    wallbox_of = {translation: key for key, translation in _WALLBOX_KEYS.items()}
    general_of = {translation: key for key, translation in _GENERAL_CONTROLS.items()}
    wallbox_system_of = {translation: key for key, translation in _WALLBOX_SYSTEM_CONTROLS.items()}
    wallbox_control_of = {translation: key for key, translation in _WALLBOX_CONTROLS.items()}
    scalars: dict[str, Any] = {}
    packs: dict[str, dict[str, Any]] = {}
    modules: dict[str, dict[str, Any]] = {}
    wallboxes: dict[str, dict[str, Any]] = {}
    wallbox_controls: dict[str, dict[str, Any]] = {}
    general: dict[str, Any] = {}
    wallbox_system: dict[str, Any] = {}
    for ent in reg_entries:
        if getattr(ent, "disabled_by", None) is not None:
            continue
        translation = getattr(ent, "translation_key", None)
        if not translation:
            continue
        device_id = getattr(ent, "device_id", None) or ""
        if translation in scalar_of:
            key = scalar_of[translation]
            scalars[key] = _prefer_sensor(scalars.get(key), ent)
        if translation in general_of:
            key = general_of[translation]
            general[key] = _prefer_writable(general.get(key), ent)
        if translation in wallbox_system_of:
            key = wallbox_system_of[translation]
            wallbox_system[key] = _prefer_writable(wallbox_system.get(key), ent)
        if translation in pack_of:
            slot = packs.setdefault(device_id, {})
            key = pack_of[translation]
            slot[key] = _prefer_sensor(slot.get(key), ent)
        elif translation in module_of:
            slot = modules.setdefault(device_id, {})
            key = module_of[translation]
            slot[key] = _prefer_sensor(slot.get(key), ent)
        if translation in wallbox_of:
            slot = wallboxes.setdefault(device_id, {})
            key = wallbox_of[translation]
            slot[key] = _prefer_sensor(slot.get(key), ent)
        if translation in wallbox_control_of and getattr(ent, "domain", None) in _WRITABLE:
            slot = wallbox_controls.setdefault(device_id, {})
            key = wallbox_control_of[translation]
            slot[key] = _prefer_writable(slot.get(key), ent)

    def name_of(device_id: str) -> str:
        return str((devices.get(device_id) or {}).get("name") or "")

    modules_by_parent: dict[str, list[dict[str, Any]]] = {}
    for device_id, fields in modules.items():
        parent = str((devices.get(device_id) or {}).get("via") or device_id)
        modules_by_parent.setdefault(parent, []).append(
            {"name": name_of(device_id), "entities": {key: ent.entity_id for key, ent in fields.items()}}
        )
    for rows in modules_by_parent.values():
        rows.sort(key=lambda row: row["name"])

    pack_rows = []
    for device_id in set(packs) | set(modules_by_parent):
        fields = packs.get(device_id) or {}
        nested = modules_by_parent.get(device_id) or []
        if not fields and not nested:
            continue
        pack_rows.append(
            {
                "name": name_of(device_id),
                "entities": {key: ent.entity_id for key, ent in fields.items()},
                "modules": nested,
            }
        )
    pack_rows.sort(key=lambda row: row["name"])

    box_rows = []
    for device_id in set(wallboxes) | set(wallbox_controls):
        fields = wallboxes.get(device_id) or {}
        controls = wallbox_controls.get(device_id) or {}
        if not fields and not controls:
            continue
        box_rows.append(
            {
                "name": name_of(device_id),
                "entities": {key: ent.entity_id for key, ent in fields.items()},
                "controls": {key: ent.entity_id for key, ent in controls.items()},
            }
        )
    box_rows.sort(key=lambda row: row["name"])

    system = next(
        (
            getattr(scalars[key], "device_id", None)
            for key in ("mode", "autarky", "selfConsumption", "errors")
            if key in scalars and getattr(scalars[key], "device_id", None)
        ),
        None,
    )
    info = devices.get(system) or {} if system else {}
    identity = {
        key: str(info.get(key) or "")
        for key in ("name", "model", "serial", "firmware")
        if info.get(key)
    }
    return {
        "entities": {key: ent.entity_id for key, ent in scalars.items()},
        "packs": pack_rows,
        "wallboxes": box_rows,
        "controls": {"general": _writable_ids(general), "wallbox": _writable_ids(wallbox_system)},
        "identity": identity,
    }


def _device_facts(hass: HomeAssistant, device_ids: set[str]) -> dict[str, dict[str, Any]]:
    if not device_ids:
        return {}
    registry = dr.async_get(hass)
    facts: dict[str, dict[str, Any]] = {}
    for device_id in device_ids:
        device = registry.async_get(device_id)
        if device is None:
            continue
        facts[device_id] = {
            "name": device.name_by_user or device.name or "",
            "via": device.via_device_id,
            "model": device.model or "",
            "serial": device.serial_number or "",
            "firmware": device.sw_version or "",
        }
    return facts


def _rscp_plant(hass: HomeAssistant, registry: Any) -> dict[str, Any]:
    loaded = [
        entry
        for entry in hass.config_entries.async_entries(E3DC_RSCP_DOMAIN)
        if entry.state == ConfigEntryState.LOADED
    ]
    reg_entries: list[Any] = []
    for entry in loaded:
        reg_entries.extend(er.async_entries_for_config_entry(registry, entry.entry_id))
    device_ids = {
        device_id
        for ent in reg_entries
        if (device_id := getattr(ent, "device_id", None))
        and getattr(ent, "translation_key", None) in _PLANT_DEVICE_KEYS | set(_PLANT_KEYS.values())
        and getattr(ent, "disabled_by", None) is None
    }
    facts = _device_facts(hass, device_ids)
    parents = {via for fact in facts.values() if (via := fact.get("via")) and via not in facts}
    facts.update(_device_facts(hass, parents))
    return plant_from_entries(reg_entries, facts)


def panel_module_url() -> str:
    """Panel script URL. The file content is part of it so a new build is a new address.

    The iPad app and many browsers keep the previous script when the path stays
    the same. A content hash in the query forces them to fetch the new file
    without clearing the frontend cache.
    """
    script = Path(__file__).resolve().parent / "frontend" / "panel" / "maestro-panel.js"
    return f"{_PANEL_MODULE}?{asset_query(script)}"


def _settings_for(registry: Any, entry_id: str) -> tuple[dict[str, str], list[str]]:
    """Map every tunable entity of one config entry: unique_id suffix -> entity_id."""
    prefix = f"{entry_id}_"
    settings: dict[str, str] = {}
    disabled: list[str] = []
    for reg_entry in er.async_entries_for_config_entry(registry, entry_id):
        if reg_entry.domain not in _SETTINGS_DOMAINS:
            continue
        unique_id = reg_entry.unique_id or ""
        if not unique_id.startswith(prefix):
            continue
        key = unique_id[len(prefix):]
        if not key or key in settings:
            continue
        settings[key] = reg_entry.entity_id
        if reg_entry.disabled_by is not None:
            disabled.append(key)
    return settings, disabled


def panel_entities(hass: HomeAssistant) -> dict[str, Any]:
    """Resolve the panel keys to the current entity_ids of the (first loaded) Maestro entry."""
    entries = hass.config_entries.async_entries(DOMAIN)
    entry = next((e for e in entries if e.state == ConfigEntryState.LOADED), None)
    if entry is None:
        return {
            "entry_id": None,
            "entities": {},
            "disabled": [],
            "settings": {},
            "settings_disabled": [],
            "plant": empty_plant(),
        }
    registry = er.async_get(hass)
    entities: dict[str, str] = {}
    disabled: list[str] = []
    for key, (platform, description_key) in PANEL_ENTITIES.items():
        entity_id = registry.async_get_entity_id(platform, DOMAIN, f"{entry.entry_id}_{description_key}")
        if entity_id is None:
            continue
        entities[key] = entity_id
        reg_entry = registry.async_get(entity_id)
        if reg_entry is not None and reg_entry.disabled_by is not None:
            disabled.append(key)
    settings, settings_disabled = _settings_for(registry, entry.entry_id)
    return {
        "entry_id": entry.entry_id,
        "entities": entities,
        "disabled": disabled,
        "settings": settings,
        "settings_disabled": settings_disabled,
        "plant": _rscp_plant(hass, registry),
    }


@websocket_api.websocket_command({vol.Required("type"): WS_PANEL_ENTITIES})
@callback
def _ws_panel_entities(hass: HomeAssistant, connection: Any, msg: dict[str, Any]) -> None:
    connection.send_result(msg["id"], panel_entities(hass))


@websocket_api.websocket_command({vol.Required("type"): WS_PANEL_OPTIONS})
@callback
def _ws_panel_options(hass: HomeAssistant, connection: Any, msg: dict[str, Any]) -> None:
    ws_panel_options(hass, connection, msg)


@websocket_api.websocket_command(
    {vol.Required("type"): WS_PANEL_OPTIONS_SET, vol.Required("values"): dict}
)
@callback
def _ws_panel_options_set(hass: HomeAssistant, connection: Any, msg: dict[str, Any]) -> None:
    ws_panel_options_set(hass, connection, msg)


@websocket_api.websocket_command(
    {
        vol.Required("type"): WS_PANEL_PAUSE,
        vol.Required("hours"): vol.Any(None, vol.In(PAUSE_HOURS)),
    }
)
@callback
def _ws_panel_pause(hass: HomeAssistant, connection: Any, msg: dict[str, Any]) -> None:
    entries = hass.config_entries.async_entries(DOMAIN)
    entry = next((item for item in entries if item.state == ConfigEntryState.LOADED), None)
    coordinator = None if entry is None else hass.data.get(DOMAIN, {}).get(entry.entry_id)
    if coordinator is None:
        connection.send_error(msg["id"], "not_loaded", "Maestro is not loaded")
        return
    coordinator.pause_for(msg["hours"])
    connection.send_result(msg["id"], {"hours": msg["hours"]})


@websocket_api.websocket_command({vol.Required("type"): WS_ENERGY_PREVIEW})
@websocket_api.async_response
async def _ws_energy_preview(hass: HomeAssistant, connection: Any, msg: dict[str, Any]) -> None:
    from .energy_dashboard import async_energy_dashboard_preview

    connection.send_result(msg["id"], await async_energy_dashboard_preview(hass))


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): WS_ENERGY_APPLY,
        vol.Optional("mode", default="fill"): vol.In(["fill", "replace"]),
    }
)
@websocket_api.async_response
async def _ws_energy_apply(hass: HomeAssistant, connection: Any, msg: dict[str, Any]) -> None:
    from .energy_dashboard import async_energy_dashboard_apply

    connection.send_result(msg["id"], await async_energy_dashboard_apply(hass, msg["mode"]))


async def async_register_panel(hass: HomeAssistant) -> None:
    """Add the Maestro panel to the sidebar (for all users).

    Re-registers when the script content changed, so a HACS update or a live
    deploy gets a new module URL without clearing the browser cache.

    Never raises: a panel problem must not keep the control loop from starting.
    """
    if not hass.data.get(_WS_FLAG):
        # HA offers no way to unregister a command, so it stays across entry reloads.
        websocket_api.async_register_command(hass, _ws_panel_entities)
        websocket_api.async_register_command(hass, _ws_panel_options)
        websocket_api.async_register_command(hass, _ws_panel_options_set)
        websocket_api.async_register_command(hass, _ws_panel_pause)
        websocket_api.async_register_command(hass, _ws_energy_preview)
        websocket_api.async_register_command(hass, _ws_energy_apply)
        hass.data[_WS_FLAG] = True
    module_url = panel_module_url()
    registered = hass.data.get(_PANEL_FLAG)
    if registered == module_url:
        return
    if registered:
        frontend.async_remove_panel(hass, PANEL_URL_PATH)
        hass.data.pop(_PANEL_FLAG, None)
    try:
        await panel_custom.async_register_panel(
            hass,
            frontend_url_path=PANEL_URL_PATH,
            webcomponent_name=PANEL_COMPONENT,
            sidebar_title="Maestro",
            sidebar_icon="mdi:battery-charging-high",
            module_url=module_url,
            require_admin=False,
        )
    except ValueError as err:
        _LOGGER.warning("E3DC Maestro: Cockpit-Panel nicht registriert: %s", err)
        return
    hass.data[_PANEL_FLAG] = module_url


def async_unregister_panel(hass: HomeAssistant) -> None:
    """Remove the panel from the sidebar."""
    if hass.data.pop(_PANEL_FLAG, None) is not None:
        frontend.async_remove_panel(hass, PANEL_URL_PATH)
