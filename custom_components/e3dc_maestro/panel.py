"""Register the Maestro cockpit as a sidebar panel."""
from __future__ import annotations

import logging
from typing import Any

import voluptuous as vol

from homeassistant.components import frontend, panel_custom, websocket_api
from homeassistant.config_entries import ConfigEntryState
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import entity_registry as er

from .const import (
    CONF_FORCE_DISCHARGE_POWER_W,
    CONF_FIXED_RESERVE_ENABLED,
    CONF_FIXED_RESERVE_SOC,
    CONF_FORWARD_LOOKING_ENABLED,
    CONF_PRICE_PLAN_ACTIVE,
    CONF_PRICE_PLAN_ENABLED,
    CONF_PV_FORECAST_ENABLED,
    DOMAIN,
    VERSION,
)

_LOGGER = logging.getLogger(__name__)

# "e3dc-maestro" is taken by the Lovelace strategy dashboard.
PANEL_URL_PATH = "maestro-cockpit"
PANEL_COMPONENT = "e3dc-maestro-panel"
# Served by the static path registered in dashboard_frontend.async_setup_frontend.
_PANEL_MODULE = f"/{DOMAIN}/frontend/panel/maestro-panel.js"
_PANEL_FLAG = f"{DOMAIN}_panel_registered"
_WS_FLAG = f"{DOMAIN}_panel_ws_registered"
WS_PANEL_ENTITIES = f"{DOMAIN}/panel_entities"

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
    "saving": ("sensor", "pv_ersparnis_heute"),
    "selfUse": ("sensor", "eigenverbrauch_heute"),
    "importToday": ("sensor", "grid_draw_today"),
    "feedToday": ("sensor", "grid_feed_in_today"),
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
    "ctrlActive": ("switch", "regelung_aktiv"),
    "ctrlPredictive": ("switch", CONF_FORWARD_LOOKING_ENABLED),
    "ctrlPvDelay": ("switch", CONF_PV_FORECAST_ENABLED),
    "ctrlPlanControls": ("switch", CONF_PRICE_PLAN_ACTIVE),
    "ctrlPlanShadow": ("switch", CONF_PRICE_PLAN_ENABLED),
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
}

# Platforms whose entities are tunable from the settings screen. The key is the
# unique_id suffix ("<entry_id>_<key>"), so renamed entities keep working.
_SETTINGS_DOMAINS = frozenset({"number", "switch", "select", "button"})


def panel_module_url() -> str:
    return f"{_PANEL_MODULE}?v={VERSION}"


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
        return {"entry_id": None, "entities": {}, "disabled": [], "settings": {}, "settings_disabled": []}
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
    }


@websocket_api.websocket_command({vol.Required("type"): WS_PANEL_ENTITIES})
@callback
def _ws_panel_entities(hass: HomeAssistant, connection: Any, msg: dict[str, Any]) -> None:
    connection.send_result(msg["id"], panel_entities(hass))


async def async_register_panel(hass: HomeAssistant) -> None:
    """Add the Maestro panel to the sidebar (once, for all users).

    Never raises: a panel problem must not keep the control loop from starting.
    """
    if not hass.data.get(_WS_FLAG):
        # HA offers no way to unregister a command, so it stays across entry reloads.
        websocket_api.async_register_command(hass, _ws_panel_entities)
        hass.data[_WS_FLAG] = True
    if hass.data.get(_PANEL_FLAG):
        return
    try:
        await panel_custom.async_register_panel(
            hass,
            frontend_url_path=PANEL_URL_PATH,
            webcomponent_name=PANEL_COMPONENT,
            sidebar_title="Maestro",
            sidebar_icon="mdi:battery-charging-high",
            module_url=panel_module_url(),
            require_admin=False,
        )
    except ValueError as err:
        _LOGGER.warning("E3DC Maestro: Cockpit-Panel nicht registriert: %s", err)
        return
    hass.data[_PANEL_FLAG] = True


def async_unregister_panel(hass: HomeAssistant) -> None:
    """Remove the panel from the sidebar."""
    if hass.data.pop(_PANEL_FLAG, False):
        frontend.async_remove_panel(hass, PANEL_URL_PATH)
