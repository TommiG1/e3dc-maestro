"""Wallbox energy sensor helpers, autodetection, and freeze guard."""
from __future__ import annotations

from datetime import datetime, timedelta
from types import SimpleNamespace

from custom_components.e3dc_maestro import config_flow as cf
from custom_components.e3dc_maestro.const import (
    CONF_SIZING_WALLBOX_ENERGY_SENSOR,
    CONF_WALLBOX_ENERGY_SENSOR,
    WALLBOX_POWER_FREEZE_SECONDS,
    sync_wallbox_energy_options,
    wallbox_energy_sensor_id,
)
from custom_components.e3dc_maestro.coordinator import E3DCMaestroCoordinator


def test_wallbox_energy_sensor_id_prefers_loads_wiring():
    opts = {
        CONF_WALLBOX_ENERGY_SENSOR: "sensor.openwb_heute",
        CONF_SIZING_WALLBOX_ENERGY_SENSOR: "sensor.other",
    }
    assert wallbox_energy_sensor_id(opts) == "sensor.openwb_heute"


def test_wallbox_energy_sensor_id_falls_back_to_sizing():
    opts = {CONF_SIZING_WALLBOX_ENERGY_SENSOR: "sensor.openwb_gesamt"}
    assert wallbox_energy_sensor_id(opts) == "sensor.openwb_gesamt"


def test_sync_wallbox_energy_options_from_sizing():
    synced = sync_wallbox_energy_options(
        {CONF_SIZING_WALLBOX_ENERGY_SENSOR: "sensor.wb_kwh"}
    )
    assert synced[CONF_WALLBOX_ENERGY_SENSOR] == "sensor.wb_kwh"
    assert synced[CONF_SIZING_WALLBOX_ENERGY_SENSOR] == "sensor.wb_kwh"


def test_sync_wallbox_energy_options_loads_wins():
    synced = sync_wallbox_energy_options(
        {
            CONF_WALLBOX_ENERGY_SENSOR: "sensor.a",
            CONF_SIZING_WALLBOX_ENERGY_SENSOR: "sensor.b",
        }
    )
    assert synced[CONF_WALLBOX_ENERGY_SENSOR] == "sensor.a"
    assert synced[CONF_SIZING_WALLBOX_ENERGY_SENSOR] == "sensor.a"


def test_autodetect_openwb_wallbox_energy_prefers_heute():
    ents = {
        "a": SimpleNamespace(
            entity_id="sensor.openwb_chargepoint_4_geladene_energie_gesamt",
            disabled_by=None,
        ),
        "b": SimpleNamespace(
            entity_id="sensor.openwb_chargepoint_4_geladene_energie_heute",
            disabled_by=None,
        ),
    }
    hass = SimpleNamespace()
    original = cf.er.async_get
    cf.er.async_get = lambda _hass: SimpleNamespace(entities=ents)
    try:
        assert (
            cf._autodetect_openwb_wallbox_energy(hass)
            == "sensor.openwb_chargepoint_4_geladene_energie_heute"
        )
    finally:
        cf.er.async_get = original


def test_autodetect_e3dc_wallbox_energy_by_translation_key():
    ents = {
        "a": SimpleNamespace(
            entity_id="sensor.garage_energy_all",
            unique_id="uid_aabbccddeeff-energy-all",
            translation_key="wallbox-energy-all",
            disabled_by=None,
        ),
    }
    hass = SimpleNamespace()
    original = cf.er.async_get
    cf.er.async_get = lambda _hass: SimpleNamespace(entities=ents)
    try:
        assert cf._autodetect_e3dc_wallbox_energy(hass) == "sensor.garage_energy_all"
    finally:
        cf.er.async_get = original


def test_wallbox_power_for_energy_freezes_unchanged_reading():
    coord = object.__new__(E3DCMaestroCoordinator)
    coord._wallbox_energy_last_power = None
    coord._wallbox_energy_power_changed_at = None

    assert coord._wallbox_power_for_energy(10806.7) == 10806.7
    # Same reading shortly after: still counts.
    assert coord._wallbox_power_for_energy(10806.7) == 10806.7
    # Age the change timestamp past the freeze window (naive, like HA test stub).
    coord._wallbox_energy_power_changed_at = datetime.utcnow() - timedelta(
        seconds=WALLBOX_POWER_FREEZE_SECONDS + 5
    )
    assert coord._wallbox_power_for_energy(10806.7) == 0.0
    # A real change resumes counting.
    assert coord._wallbox_power_for_energy(9000.0) == 9000.0
