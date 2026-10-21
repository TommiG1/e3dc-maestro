"""Energy Dashboard wizard: propose / merge / classify."""
from __future__ import annotations

from custom_components.e3dc_maestro.energy_dashboard import (
    build_proposed_devices,
    build_proposed_sources,
    classify_energy_prefs,
    merge_devices,
    merge_energy_sources,
)


def test_build_proposed_sources_requires_both_grid_legs():
    sensors = {
        "solar": {"entity_id": "sensor.pv", "origin": "rscp"},
        "grid_from": {"entity_id": "sensor.grid_in", "origin": "rscp"},
    }
    sources = build_proposed_sources(sensors)
    assert len(sources) == 1
    assert sources[0]["type"] == "solar"


def test_build_proposed_sources_full_set():
    sensors = {
        "solar": {"entity_id": "sensor.pv", "origin": "rscp"},
        "grid_from": {"entity_id": "sensor.grid_in", "origin": "rscp"},
        "grid_to": {"entity_id": "sensor.grid_out", "origin": "rscp"},
        "battery_from": {"entity_id": "sensor.bat_out", "origin": "rscp"},
        "battery_to": {"entity_id": "sensor.bat_in", "origin": "rscp"},
        "wallbox": {"entity_id": "sensor.wb", "origin": "maestro"},
    }
    sources = build_proposed_sources(sensors)
    assert [s["type"] for s in sources] == ["solar", "grid", "battery"]
    grid = sources[1]
    assert grid["flow_from"][0]["stat_energy_from"] == "sensor.grid_in"
    assert grid["flow_to"][0]["stat_energy_to"] == "sensor.grid_out"
    bat = sources[2]
    assert bat["stat_energy_from"] == "sensor.bat_out"
    assert bat["stat_energy_to"] == "sensor.bat_in"
    assert build_proposed_devices(sensors) == [{"stat_consumption": "sensor.wb", "name": "Wallbox"}]


def test_classify_empty_partial_ours_foreign():
    proposed = build_proposed_sources(
        {
            "solar": {"entity_id": "sensor.pv", "origin": "rscp"},
            "grid_from": {"entity_id": "sensor.grid_in", "origin": "rscp"},
            "grid_to": {"entity_id": "sensor.grid_out", "origin": "rscp"},
        }
    )
    assert classify_energy_prefs([], proposed)["status"] == "empty"
    assert classify_energy_prefs(proposed, proposed)["status"] == "ours"
    assert classify_energy_prefs([proposed[0]], proposed)["status"] == "partial"
    foreign = [{"type": "solar", "stat_energy_from": "sensor.other_pv", "config_entry_solar_forecast": None}]
    assert classify_energy_prefs(foreign, proposed)["status"] == "foreign"


def test_merge_fill_keeps_existing_and_adds_missing():
    current = [
        {"type": "solar", "stat_energy_from": "sensor.old_pv", "config_entry_solar_forecast": None},
        {"type": "gas", "stat_energy_from": "sensor.gas"},
    ]
    proposed = build_proposed_sources(
        {
            "solar": {"entity_id": "sensor.pv", "origin": "rscp"},
            "grid_from": {"entity_id": "sensor.grid_in", "origin": "rscp"},
            "grid_to": {"entity_id": "sensor.grid_out", "origin": "rscp"},
        }
    )
    filled = merge_energy_sources(current, proposed, "fill")
    types = [s["type"] for s in filled]
    assert types.count("solar") == 1
    assert "grid" in types
    assert "gas" in types
    solar = next(s for s in filled if s["type"] == "solar")
    assert solar["stat_energy_from"] == "sensor.old_pv"


def test_merge_replace_swaps_matching_solar_and_grid_keeps_gas():
    current = [
        {"type": "solar", "stat_energy_from": "sensor.pv", "config_entry_solar_forecast": None},
        {"type": "gas", "stat_energy_from": "sensor.gas"},
    ]
    proposed = build_proposed_sources(
        {
            "solar": {"entity_id": "sensor.pv", "origin": "rscp"},
            "grid_from": {"entity_id": "sensor.grid_in", "origin": "rscp"},
            "grid_to": {"entity_id": "sensor.grid_out", "origin": "rscp"},
        }
    )
    replaced = merge_energy_sources(current, proposed, "replace")
    assert [s["type"] for s in replaced] == ["solar", "grid", "gas"]
    assert replaced[0]["stat_energy_from"] == "sensor.pv"
    assert sum(1 for s in replaced if s.get("type") == "solar") == 1


def test_merge_replace_keeps_extra_solar_fremd_wr():
    current = [
        {"type": "solar", "stat_energy_from": "sensor.e3dc_pv", "config_entry_solar_forecast": None},
        {"type": "solar", "stat_energy_from": "sensor.fronius_day", "config_entry_solar_forecast": None},
        {"type": "grid", "flow_from": [], "flow_to": [], "cost_adjustment_day": 0.0},
    ]
    proposed = build_proposed_sources(
        {
            "solar": {"entity_id": "sensor.e3dc_pv", "origin": "rscp"},
            "grid_from": {"entity_id": "sensor.grid_in", "origin": "rscp"},
            "grid_to": {"entity_id": "sensor.grid_out", "origin": "rscp"},
        }
    )
    replaced = merge_energy_sources(current, proposed, "replace")
    solars = [s["stat_energy_from"] for s in replaced if s.get("type") == "solar"]
    assert solars == ["sensor.e3dc_pv", "sensor.fronius_day"]
    from custom_components.e3dc_maestro.energy_dashboard import extra_solar_entity_ids

    assert extra_solar_entity_ids(current, proposed) == ["sensor.fronius_day"]


def test_merge_devices_fill_skips_duplicates():
    current = [{"stat_consumption": "sensor.wb", "name": "Wallbox"}]
    proposed = [{"stat_consumption": "sensor.wb", "name": "Wallbox"}]
    assert merge_devices(current, proposed, "fill") == current
    assert merge_devices([], proposed, "fill") == proposed
