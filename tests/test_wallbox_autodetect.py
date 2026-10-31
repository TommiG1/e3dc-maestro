"""Wallbox power-sensor autodetection helpers (openWB / go-e)."""
from __future__ import annotations

from types import SimpleNamespace

from custom_components.e3dc_maestro import config_flow as cf


def test_goe_priority_prefers_nrg_11_over_tpa():
    assert cf._goe_power_priority("sensor.go_echarger_123_nrg_11") == 0
    assert cf._goe_power_priority("sensor.go_echarger_123_tpa") == 1
    assert cf._goe_power_priority(
        "sensor.go_echarger_123_nrg",
        unique_id="123-sensor-nrg-11",
    ) == 0
    assert cf._goe_power_priority("sensor.goe_123456_tpa") == 1


def test_goe_priority_rejects_non_charger_and_phase_power():
    assert cf._goe_power_priority("sensor.house_power") is None
    assert cf._goe_power_priority("sensor.go_echarger_123_pgrid") is None
    assert cf._goe_power_priority("sensor.go_echarger_123_nrg_7") is None
    assert cf._goe_power_priority("sensor.openwb_chargepoint_4_ladeleistung") is None


def test_goe_priority_accepts_platform_without_prefix():
    # Ambiguous suffix → None here; autodetection falls back to device_class.
    assert (
        cf._goe_power_priority(
            "sensor.garage_wallbox_power",
            platform="goecharger_api2",
        )
        is None
    )


def test_autodetect_goe_wallbox_picks_nrg_11():
    ents = {
        "a": SimpleNamespace(
            entity_id="sensor.go_echarger_1_tpa",
            platform="goecharger_mqtt",
            unique_id="1-sensor-tpa-0",
            disabled_by=None,
        ),
        "b": SimpleNamespace(
            entity_id="sensor.go_echarger_1_nrg_11",
            platform="goecharger_mqtt",
            unique_id="1-sensor-nrg-11",
            disabled_by=None,
        ),
        "c": SimpleNamespace(
            entity_id="sensor.go_echarger_1_pgrid",
            platform="goecharger_mqtt",
            unique_id="1-sensor-pgrid-0",
            disabled_by=None,
        ),
    }
    hass = SimpleNamespace(
        states=SimpleNamespace(get=lambda _eid: None),
    )
    # monkeypatch entity registry
    original = cf.er.async_get
    cf.er.async_get = lambda _hass: SimpleNamespace(entities=ents)
    try:
        assert cf._autodetect_goe_wallbox(hass) == "sensor.go_echarger_1_nrg_11"
    finally:
        cf.er.async_get = original


def test_autodetect_goe_wallbox_device_class_fallback():
    ents = {
        "a": SimpleNamespace(
            entity_id="sensor.garage_charger_load",
            platform="goecharger_api2",
            unique_id="serial-load",
            disabled_by=None,
        ),
    }
    state = SimpleNamespace(
        attributes={"device_class": "power", "unit_of_measurement": "W"}
    )
    hass = SimpleNamespace(states=SimpleNamespace(get=lambda _eid: state))
    original = cf.er.async_get
    cf.er.async_get = lambda _hass: SimpleNamespace(entities=ents)
    try:
        assert cf._autodetect_goe_wallbox(hass) == "sensor.garage_charger_load"
    finally:
        cf.er.async_get = original
