"""Runtime wallbox phase count from entity or E3DC autodetect."""
from __future__ import annotations

from types import SimpleNamespace

from homeassistant.const import STATE_UNAVAILABLE, STATE_UNKNOWN

from custom_components.e3dc_maestro.const import (
    CONF_WALLBOX_ENABLED,
    CONF_WALLBOX_PHASES,
    CONF_WALLBOX_PHASES_ENTITY,
    CONF_WALLBOX_TYPE,
    E3DC_RSCP_DOMAIN,
    WALLBOX_TYPE_E3DC,
)
from custom_components.e3dc_maestro.control_engine import MaestroParams
from custom_components.e3dc_maestro.coordinator import E3DCMaestroCoordinator
from custom_components.e3dc_maestro.coordinator_helpers import (
    config_wallbox_phases_int,
    parse_wallbox_phases_value,
)
from custom_components.e3dc_maestro import coordinator_act as act


def test_parse_wallbox_phases_accepts_one_to_three():
    assert parse_wallbox_phases_value("3") == 3
    assert parse_wallbox_phases_value("3.0") == 3
    assert parse_wallbox_phases_value("1") == 1


def test_parse_wallbox_phases_rejects_invalid():
    assert parse_wallbox_phases_value("0") is None
    assert parse_wallbox_phases_value("4") is None
    assert parse_wallbox_phases_value(STATE_UNAVAILABLE) is None
    assert parse_wallbox_phases_value(STATE_UNKNOWN) is None
    assert parse_wallbox_phases_value("off") is None


def _wallbox_coord(opts: dict, states: dict[str, SimpleNamespace] | None = None):
    coord = object.__new__(E3DCMaestroCoordinator)
    states = states or {}

    def _get(eid: str):
        return states.get(eid)

    coord.hass = SimpleNamespace(states=SimpleNamespace(get=_get))
    coord.entry = SimpleNamespace(options=opts)
    coord._params = MaestroParams(wallbox_phases=config_wallbox_phases_int(opts))
    coord._auto_params = None
    coord._wallbox_phases_latched = None
    coord._wallbox_phases_source = "config"
    coord._wallbox_phases_entity_effective = None
    coord._e3dc_wallbox = None
    return coord


def test_entity_phases_override_config():
    opts = {
        CONF_WALLBOX_PHASES: "3",
        CONF_WALLBOX_PHASES_ENTITY: "sensor.wb_phases",
    }
    coord = _wallbox_coord(opts, {"sensor.wb_phases": SimpleNamespace(state="1")})
    coord._update_wallbox_phases(opts)
    assert coord._params.wallbox_phases == 1
    assert coord._wallbox_phases_source == "sensor"
    assert coord._wallbox_phases_entity_effective == "sensor.wb_phases"


def test_invalid_read_keeps_last_valid_latch():
    opts = {
        CONF_WALLBOX_PHASES: "3",
        CONF_WALLBOX_PHASES_ENTITY: "sensor.wb_phases",
    }
    coord = _wallbox_coord(opts, {"sensor.wb_phases": SimpleNamespace(state="1")})
    coord._update_wallbox_phases(opts)
    assert coord._params.wallbox_phases == 1

    coord.hass.states.get = lambda _eid: SimpleNamespace(state="0")
    coord._update_wallbox_phases(opts)
    assert coord._params.wallbox_phases == 1
    assert coord._wallbox_phases_source == "sensor"

    coord.hass.states.get = lambda _eid: SimpleNamespace(state=STATE_UNAVAILABLE)
    coord._update_wallbox_phases(opts)
    assert coord._params.wallbox_phases == 1


def test_no_valid_sensor_uses_config():
    opts = {
        CONF_WALLBOX_PHASES: "3",
        CONF_WALLBOX_PHASES_ENTITY: "sensor.wb_phases",
    }
    coord = _wallbox_coord(opts, {"sensor.wb_phases": SimpleNamespace(state=STATE_UNKNOWN)})
    coord._update_wallbox_phases(opts)
    assert coord._params.wallbox_phases == 3
    assert coord._wallbox_phases_source == "config"


def test_e3dc_autodetect_phases_sensor():
    ents = {
        "a": SimpleNamespace(
            entity_id="button.wb_toggle",
            platform=E3DC_RSCP_DOMAIN,
            device_id="dev1",
            translation_key="wallbox-toggle-wallbox-charging",
            disabled_by=None,
        ),
        "b": SimpleNamespace(
            entity_id="sensor.wb_phases",
            platform=E3DC_RSCP_DOMAIN,
            device_id="dev1",
            translation_key="wallbox-phases",
            disabled_by=None,
        ),
    }
    opts = {
        CONF_WALLBOX_ENABLED: True,
        CONF_WALLBOX_PHASES: "3",
        CONF_WALLBOX_TYPE: WALLBOX_TYPE_E3DC,
    }
    coord = _wallbox_coord(opts, {"sensor.wb_phases": SimpleNamespace(state="1")})
    original = act.er.async_get
    act.er.async_get = lambda _hass: SimpleNamespace(entities=ents)
    try:
        coord._update_wallbox_phases(opts)
        assert coord._wallbox_phases_entity_effective == "sensor.wb_phases"
        assert coord._params.wallbox_phases == 1
        assert coord._wallbox_phases_source == "sensor"
    finally:
        act.er.async_get = original