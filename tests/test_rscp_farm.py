"""Farm-controller preference for RSCP autodetection."""
from __future__ import annotations

from types import SimpleNamespace

from custom_components.e3dc_maestro import config_flow
from custom_components.e3dc_maestro.const import (
    CONF_BATTERY_POWER_SENSOR,
    CONF_MAX_CHARGE_POWER,
    CONF_SOC_SENSOR,
    E3DC_RSCP_DOMAIN,
    RSCP_CONF_FARMCONTROLLER,
    farm_controller_entry_ids,
)


def _hass(entries, entities, states=None):
    registry = SimpleNamespace(
        entities={ent.entity_id: ent for ent in entities},
    )
    return SimpleNamespace(
        config_entries=SimpleNamespace(async_entries=lambda domain: entries if domain == E3DC_RSCP_DOMAIN else []),
        states=SimpleNamespace(get=lambda eid: (states or {}).get(eid)),
        _registry=registry,
    )


def test_farm_controller_entry_ids():
    hass = _hass(
        [
            SimpleNamespace(entry_id="master", data={}),
            SimpleNamespace(entry_id="farm", data={RSCP_CONF_FARMCONTROLLER: True}),
        ],
        [],
    )
    assert farm_controller_entry_ids(hass) == frozenset({"farm"})


def test_autodetect_sources_prefers_farm_controller(monkeypatch):
    entities = [
        SimpleNamespace(
            entity_id="sensor.master_state_of_charge",
            config_entry_id="master",
        ),
        SimpleNamespace(
            entity_id="sensor.farm_state_of_charge",
            config_entry_id="farm",
        ),
        SimpleNamespace(
            entity_id="sensor.master_battery_net_change",
            config_entry_id="master",
        ),
        SimpleNamespace(
            entity_id="sensor.farm_battery_net_change",
            config_entry_id="farm",
        ),
    ]
    hass = _hass(
        [
            SimpleNamespace(entry_id="master", data={}),
            SimpleNamespace(entry_id="farm", data={RSCP_CONF_FARMCONTROLLER: True}),
        ],
        entities,
    )
    monkeypatch.setattr(config_flow.er, "async_get", lambda _hass: _hass._registry)

    detected = config_flow._autodetect_rscp_sources(hass)

    assert detected[CONF_SOC_SENSOR] == "sensor.farm_state_of_charge"
    assert detected[CONF_BATTERY_POWER_SENSOR] == "sensor.farm_battery_net_change"


def test_autodetect_system_params_prefers_farm_controller(monkeypatch):
    entities = [
        SimpleNamespace(
            entity_id="sensor.master_system_maximum_charge",
            config_entry_id="master",
        ),
        SimpleNamespace(
            entity_id="sensor.farm_system_maximum_charge",
            config_entry_id="farm",
        ),
    ]
    states = {
        "sensor.master_system_maximum_charge": SimpleNamespace(
            state="3",
            attributes={"unit_of_measurement": "kW"},
        ),
        "sensor.farm_system_maximum_charge": SimpleNamespace(
            state="9",
            attributes={"unit_of_measurement": "kW"},
        ),
    }
    hass = _hass(
        [
            SimpleNamespace(entry_id="master", data={}),
            SimpleNamespace(entry_id="farm", data={RSCP_CONF_FARMCONTROLLER: True}),
        ],
        entities,
        states,
    )
    monkeypatch.setattr(config_flow.er, "async_get", lambda _hass: _hass._registry)

    detected = config_flow._autodetect_rscp_system_params(hass)

    assert detected[CONF_MAX_CHARGE_POWER] == 9000
