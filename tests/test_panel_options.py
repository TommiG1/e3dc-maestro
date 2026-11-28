"""Cockpit option read/write."""
from __future__ import annotations

from pathlib import Path
from types import SimpleNamespace

import pytest

from custom_components.e3dc_maestro.const import (
    CONF_ADDITIONAL_GENERATION_SENSOR,
    CONF_BATTERY_CAPACITY_KWH,
    CONF_SOC_SENSOR,
    CONF_WALLBOX_PLUG_ENTITY,
    CONF_WALLBOX_SOC_SENSOR,
    DOMAIN,
)
from custom_components.e3dc_maestro.panel_options import (
    PanelOptionsError,
    apply_panel_options,
    panel_options_payload,
    validate_panel_options,
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


def test_wallbox_soc_and_plug_are_display_only():
    params = SimpleNamespace()
    hass, entry, written, _reloaded = _hass(
        {},
        {"sensor.car_soc", "binary_sensor.ladekabel"},
        params,
    )
    result = apply_panel_options(
        hass,
        {
            CONF_WALLBOX_SOC_SENSOR: "sensor.car_soc",
            CONF_WALLBOX_PLUG_ENTITY: "binary_sensor.ladekabel",
        },
    )
    assert result["reloaded"] is False
    assert written == []
    assert entry.options[CONF_WALLBOX_SOC_SENSOR] == "sensor.car_soc"
    assert entry.options[CONF_WALLBOX_PLUG_ENTITY] == "binary_sensor.ladekabel"


def test_modul3_enabled_persists_without_reload():
    """Modul 3 is not on MaestroParams; a reload would drop the cockpit WS."""
    params = SimpleNamespace(tariff_schedule=None)
    hass, entry, written, stored = _hass({}, set(), params)
    result = apply_panel_options(hass, {"modul3_enabled": True})
    assert result["reloaded"] is False
    assert written == []
    assert entry.options["modul3_enabled"] is True
    assert stored and stored[0]["modul3_enabled"] is True


def test_modul3_zones_and_price_sensor_are_soft_options():
    params = SimpleNamespace(tariff_schedule=None)
    hass, entry, written, _ = _hass({}, {"sensor.preis"}, params)
    zones = {
        "nt": {"price_ct_kwh": 2.0, "windows": [{"start_h": 0, "end_h": 6}]},
        "st": {"price_ct_kwh": 5.0, "windows": []},
        "ht": {"price_ct_kwh": 8.0, "windows": [{"start_h": 17, "end_h": 21}]},
    }
    result = apply_panel_options(
        hass,
        {
            "modul3_zones": zones,
            "modul3_add_to_curve": False,
            "price_sensor": "sensor.preis",
        },
    )
    assert result["reloaded"] is False
    assert written == []
    assert entry.options["modul3_add_to_curve"] is False
    assert entry.options["price_sensor"] == "sensor.preis"
    assert entry.options["modul3_zones"]["nt"]["price_ct_kwh"] == 2.0


def test_pv_forecast_sensors_are_soft_options_and_reset_the_weak_day_latch():
    params = SimpleNamespace()
    hass, entry, written, _ = _hass(
        {"pv_forecast_sensor": "sensor.old"},
        {"sensor.rest", "sensor.today", "sensor.helios"},
        params,
    )
    coordinator = hass.data[DOMAIN]["e1"]
    coordinator._low_yield_latch_date = "2026-11-28"
    coordinator._forecast_fingerprint = ("old",)
    result = apply_panel_options(
        hass,
        {
            "pv_forecast_sensor": "sensor.rest",
            "pv_forecast_today_sensor": "sensor.today",
            "pv_forecast_sensor_day2": "sensor.helios",
            "pv_forecast_sensor_day3": None,
        },
    )
    assert result["reloaded"] is False
    assert written == []
    assert entry.options["pv_forecast_sensor"] == "sensor.rest"
    assert entry.options["pv_forecast_sensor_day2"] == "sensor.helios"
    assert coordinator._low_yield_latch_date is None
    assert coordinator._forecast_fingerprint is None

    cleared = apply_panel_options(hass, {"pv_forecast_sensor": None})
    assert cleared["reloaded"] is False
    assert "pv_forecast_sensor" not in entry.options


def test_modul3_quarters_and_tariff_slots_are_soft_options():
    params = SimpleNamespace(tariff_schedule=None)
    hass, entry, written, _ = _hass({}, set(), params)
    result = apply_panel_options(
        hass,
        {
            "modul3_quarters": [4, 1, 1],
            "modul3_tariff_slots": True,
        },
    )
    assert result["reloaded"] is False
    assert written == []
    assert entry.options["modul3_quarters"] == [1, 4]
    assert entry.options["modul3_tariff_slots"] is True


def test_modul3_change_rebuilds_live_slots_on_both_params():
    """Saving quarters must reach the engine this tick, also the optimizer copy."""
    zones = {
        "nt": {"price_ct_kwh": 2.0, "windows": [{"start_h": 22.25, "end_h": 6.25}]},
        "st": {"price_ct_kwh": 6.0, "windows": []},
        "ht": {"price_ct_kwh": 13.0, "windows": [{"start_h": 17, "end_h": 20}]},
    }
    params = SimpleNamespace(tariff_schedule=None, derived_tariff_slots=())
    auto = SimpleNamespace(tariff_schedule=None, derived_tariff_slots=())
    hass, entry, _, _ = _hass(
        {"modul3_enabled": True, "modul3_zones": zones, "modul3_tariff_slots": True},
        set(),
        params,
    )
    coordinator = hass.data[DOMAIN]["e1"]
    coordinator._auto_params = auto
    apply_panel_options(hass, {"modul3_quarters": [1, 4]})
    for target in (params, auto):
        assert [s.class_ for s in target.derived_tariff_slots] == ["low", "high"]
        assert all(s.quarters == frozenset({1, 4}) for s in target.derived_tariff_slots)
    apply_panel_options(hass, {"modul3_tariff_slots": False})
    assert params.derived_tariff_slots == ()
    assert auto.derived_tariff_slots == ()


def test_modul3_quarters_rejects_fewer_than_two():
    params = SimpleNamespace(tariff_schedule=None)
    hass, _, _, _ = _hass({}, set(), params)
    with pytest.raises(PanelOptionsError) as err:
        apply_panel_options(hass, {"modul3_quarters": [1]})
    assert err.value.errors["modul3_quarters"] == "modul3_quarters_min2"


def test_additional_producers_accept_list_and_legacy_string():
    params = SimpleNamespace()
    states = {"sensor.a", "sensor.b"}
    hass, entry, _, reloaded = _hass({}, states, params)
    result = apply_panel_options(
        hass, {CONF_ADDITIONAL_GENERATION_SENSOR: ["sensor.a", "sensor.b"]}
    )
    assert result["reloaded"] is True
    assert reloaded[-1][CONF_ADDITIONAL_GENERATION_SENSOR] == ["sensor.a", "sensor.b"]
    assert entry.options[CONF_ADDITIONAL_GENERATION_SENSOR] == ["sensor.a", "sensor.b"]

    hass2, entry2, _, _ = _hass({}, {"sensor.a"}, params)
    apply_panel_options(hass2, {CONF_ADDITIONAL_GENERATION_SENSOR: "sensor.a"})
    assert entry2.options[CONF_ADDITIONAL_GENERATION_SENSOR] == ["sensor.a"]


def test_lower_corridor_must_not_exceed_upper_including_existing():
    hass, _, _, _ = _hass({"upper_corridor": 400, "lower_corridor": 200}, set(), SimpleNamespace())
    _, errors = validate_panel_options(hass, {"lower_corridor": 500})
    assert errors.get("lower_corridor") == "order"

    _, errors = validate_panel_options(hass, {"upper_corridor": 100})
    assert errors.get("lower_corridor") == "order"


def test_wallbox_min_current_must_not_exceed_max_including_existing():
    hass, _, _, _ = _hass(
        {"wallbox_min_current": 6, "wallbox_max_current": 16},
        set(),
        SimpleNamespace(),
    )
    _, errors = validate_panel_options(hass, {"wallbox_min_current": 20})
    assert errors.get("wallbox_min_current") == "order"

    hass2, _, _, _ = _hass(
        {"wallbox_min_current": 12, "wallbox_max_current": 16},
        set(),
        SimpleNamespace(),
    )
    _, errors = validate_panel_options(hass2, {"wallbox_max_current": 10})
    assert errors.get("wallbox_min_current") == "order"


def test_corridor_and_wallbox_order_ok_when_consistent():
    hass, _, _, _ = _hass(
        {"upper_corridor": 800, "lower_corridor": 200, "wallbox_min_current": 6, "wallbox_max_current": 16},
        set(),
        SimpleNamespace(),
    )
    cleaned, errors = validate_panel_options(hass, {"lower_corridor": 300, "wallbox_max_current": 32})
    assert not errors
    assert cleaned["lower_corridor"] == 300
    assert cleaned["wallbox_max_current"] == 32


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


def test_sidebar_title_is_stored_without_a_reload():
    params = SimpleNamespace(battery_capacity_kwh=10)
    hass, entry, written, _ = _hass({}, set(), params)
    result = apply_panel_options(hass, {"sidebar_title": "  Hausakku  "})
    assert result["reloaded"] is False
    assert result["sidebar_title_changed"] is True
    assert written == []
    assert entry.options["sidebar_title"] == "Hausakku"
    cleared = apply_panel_options(hass, {"sidebar_title": "   "})
    assert cleared["sidebar_title_changed"] is True
    assert "sidebar_title" not in entry.options


def test_flow_consumers_reject_an_unknown_entity():
    hass, _, _, _ = _hass({}, set(), SimpleNamespace())
    with pytest.raises(PanelOptionsError) as err:
        apply_panel_options(hass, {"flow_consumers": [{"entityId": "sensor.gone", "name": "x", "mode": "included"}]})
    assert err.value.errors["flow_consumers"] == "unknown_entity"


def test_payload_returns_full_options_for_admin():
    hass, _, _, _ = _hass({CONF_SOC_SENSOR: "sensor.soc"}, {"sensor.soc"}, None)
    assert panel_options_payload(hass, admin=True)["options"][CONF_SOC_SENSOR] == "sensor.soc"


def test_payload_redacts_secrets_for_non_admin():
    opts = {
        CONF_SOC_SENSOR: "sensor.soc",
        "energyforecast_token": "secret-token",
        "wallbox_service_on": {"service": "switch.turn_on", "target": {}},
    }
    hass, _, _, _ = _hass(opts, {"sensor.soc"}, None)
    payload = panel_options_payload(hass, admin=False)["options"]
    assert payload[CONF_SOC_SENSOR] == "sensor.soc"
    assert payload["energyforecast_token"] == "**REDACTED**"
    assert payload["wallbox_service_on"] == "**REDACTED**"


def test_evcc_now_value_empty_or_none_defaults_to_now():
    params = SimpleNamespace(evcc_now_value="sofortladen")
    hass, entry, written, _ = _hass({"evcc_now_value": "sofortladen"}, set(), params)
    apply_panel_options(hass, {"evcc_now_value": ""})
    assert written == [("evcc_now_value", "now")]
    assert entry.options["evcc_now_value"] == "now"

    written.clear()
    apply_panel_options(hass, {"evcc_now_value": None})
    assert written == [("evcc_now_value", "now")]
    assert entry.options["evcc_now_value"] == "now"


def test_pause_and_debug_dump_require_admin_decorator():
    panel_py = Path(__file__).resolve().parents[1] / "custom_components/e3dc_maestro/panel.py"
    text = panel_py.read_text()
    for name in ("_ws_panel_pause", "_ws_debug_dump"):
        idx = text.index(f"def {name}")
        header = text[max(0, idx - 500) : idx]
        assert "@websocket_api.require_admin" in header


def test_ws_set_refuses_non_admin():
    from custom_components.e3dc_maestro.panel import _ws_panel_options_set

    errors: list[tuple] = []
    connection = SimpleNamespace(
        user=SimpleNamespace(is_admin=False),
        send_error=lambda *args: errors.append(args),
    )
    _ws_panel_options_set(SimpleNamespace(), connection, {"id": 7, "values": {}})
    assert errors[0][1] == "unauthorized"
