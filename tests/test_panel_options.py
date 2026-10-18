"""Cockpit option read/write."""
from __future__ import annotations

from types import SimpleNamespace

import pytest

from custom_components.e3dc_maestro.const import CONF_BATTERY_CAPACITY_KWH, CONF_SOC_SENSOR, DOMAIN
from custom_components.e3dc_maestro.panel_options import (
    PanelOptionsError,
    apply_panel_options,
    panel_options_payload,
)
from homeassistant.config_entries import ConfigEntryState


class _States:
    def __init__(self, ids: set[str]):
        self._ids = ids

    def get(self, entity_id: str):
        if entity_id not in self._ids:
            return None
        return SimpleNamespace(domain=entity_id.split(".", 1)[0])


def _hass(options: dict, states: set[str], params: SimpleNamespace | None):
    entry = SimpleNamespace(entry_id="e1", state=ConfigEntryState.LOADED, options=dict(options))
    written: list[tuple[str, object]] = []
    reloaded: list[dict] = []

    def update_param(key, value):
        written.append((key, value))
        entry.options[key] = value

    def update(updated, *, options):
        reloaded.append(options)
        updated.options = options

    coordinator = None
    if params is not None:
        coordinator = SimpleNamespace(_params=params, _skip_reload=False, update_param=update_param)
    data = {} if coordinator is None else {DOMAIN: {"e1": coordinator}}
    hass = SimpleNamespace(
        data=data,
        states=_States(states),
        config_entries=SimpleNamespace(
            async_entries=lambda domain: [entry] if domain == DOMAIN else [],
            async_update_entry=update,
        ),
    )
    return hass, entry, written, reloaded


def test_capacity_goes_through_the_live_parameter():
    params = SimpleNamespace(battery_capacity_kwh=10)
    hass, _, written, reloaded = _hass({}, set(), params)
    result = apply_panel_options(hass, {CONF_BATTERY_CAPACITY_KWH: 12.5})
    assert written == [(CONF_BATTERY_CAPACITY_KWH, 12.5)]
    assert reloaded == []
    assert result["reloaded"] is False


def test_sensor_change_reloads():
    params = SimpleNamespace()
    hass, entry, _, reloaded = _hass({}, {"sensor.soc"}, params)
    result = apply_panel_options(hass, {CONF_SOC_SENSOR: "sensor.soc"})
    assert reloaded and reloaded[0][CONF_SOC_SENSOR] == "sensor.soc"
    assert entry.options[CONF_SOC_SENSOR] == "sensor.soc"
    assert result["reloaded"] is True


def test_rejects_unknown_missing_and_range():
    hass, _, _, _ = _hass({}, {"sensor.soc"}, SimpleNamespace())
    with pytest.raises(PanelOptionsError) as unknown:
        apply_panel_options(hass, {"not_a_key": 1})
    assert unknown.value.errors["not_a_key"] == "unknown"
    with pytest.raises(PanelOptionsError) as missing:
        apply_panel_options(hass, {CONF_SOC_SENSOR: "sensor.gone"})
    assert missing.value.errors[CONF_SOC_SENSOR] == "unknown_entity"
    with pytest.raises(PanelOptionsError) as high:
        apply_panel_options(hass, {CONF_BATTERY_CAPACITY_KWH: 500})
    assert high.value.errors[CONF_BATTERY_CAPACITY_KWH] == "range"


def test_flow_consumers_are_stored_without_a_reload():
    params = SimpleNamespace(battery_capacity_kwh=10)
    hass, entry, written, _reloaded = _hass({}, {"sensor.wb"}, params)
    row = {"id": "a", "entityId": "sensor.wb", "name": " Wallbox ", "mode": "separate", "icon": "nope"}
    result = apply_panel_options(hass, {"flow_consumers": [row, dict(row)]})
    assert result["reloaded"] is False
    assert written == []
    assert entry.options["flow_consumers"] == [
        {"id": "a", "entityId": "sensor.wb", "name": "Wallbox", "mode": "separate", "icon": "meter"}
    ]


def test_flow_consumers_reject_an_unknown_entity():
    hass, _, _, _ = _hass({}, set(), SimpleNamespace())
    with pytest.raises(PanelOptionsError) as err:
        apply_panel_options(hass, {"flow_consumers": [{"entityId": "sensor.gone", "name": "x", "mode": "included"}]})
    assert err.value.errors["flow_consumers"] == "unknown_entity"


def test_payload_hides_nothing_but_returns_stored_options():
    hass, _, _, _ = _hass({CONF_SOC_SENSOR: "sensor.soc"}, {"sensor.soc"}, None)
    assert panel_options_payload(hass)["options"][CONF_SOC_SENSOR] == "sensor.soc"


def test_ws_set_refuses_non_admin():
    from custom_components.e3dc_maestro.panel import _ws_panel_options_set

    errors: list[tuple] = []
    connection = SimpleNamespace(
        user=SimpleNamespace(is_admin=False),
        send_error=lambda *args: errors.append(args),
    )
    _ws_panel_options_set(SimpleNamespace(), connection, {"id": 7, "values": {}})
    assert errors[0][1] == "unauthorized"
