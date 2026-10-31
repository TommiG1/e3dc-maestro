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


def test_build_history_import_sources_only_when_imported():
    from custom_components.e3dc_maestro.energy_dashboard import build_history_import_sources
    from custom_components.e3dc_maestro.statistic_ids import HISTORY_GRID_EXPORT, HISTORY_GRID_IMPORT, HISTORY_SOLAR

    empty = build_history_import_sources(set())
    assert empty == []
    partial = build_history_import_sources({HISTORY_SOLAR})
    assert len(partial) == 1 and partial[0]["type"] == "solar"
    grid = build_history_import_sources({HISTORY_GRID_IMPORT, HISTORY_GRID_EXPORT})
    assert len(grid) == 1 and grid[0]["type"] == "grid"


def test_merge_history_import_sources_idempotent_and_non_destructive():
    from custom_components.e3dc_maestro.energy_dashboard import (
        build_history_import_sources,
        merge_history_import_sources,
        remove_history_import_sources,
    )
    from custom_components.e3dc_maestro.statistic_ids import HISTORY_SOLAR

    current = [
        {"type": "solar", "stat_energy_from": "sensor.live_pv", "config_entry_solar_forecast": None},
        {"type": "gas", "stat_energy_from": "sensor.gas"},
    ]
    proposed = build_history_import_sources({HISTORY_SOLAR})
    merged = merge_history_import_sources(current, proposed)
    assert len(merged) == 3
    live = next(s for s in merged if s.get("stat_energy_from") == "sensor.live_pv")
    assert live["type"] == "solar"
    hist = next(s for s in merged if s.get("stat_energy_from") == HISTORY_SOLAR)
    assert hist["type"] == "solar"
    again = merge_history_import_sources(merged, proposed)
    assert len(again) == len(merged)
    stripped, removed = remove_history_import_sources(merged)
    assert HISTORY_SOLAR in removed
    assert any(s.get("type") == "gas" for s in stripped)
    assert not any(s.get("stat_energy_from") == HISTORY_SOLAR for s in stripped)


def test_detect_grid_format_follows_existing_entries_then_core():
    from custom_components.e3dc_maestro.energy_dashboard import detect_grid_format

    flat = {"type": "grid", "stat_energy_from": "sensor.in", "stat_energy_to": "sensor.out"}
    legacy = {"type": "grid", "flow_from": [], "flow_to": [], "cost_adjustment_day": 0.0}
    assert detect_grid_format([flat], core_supports_unified=False) == "unified"
    assert detect_grid_format([legacy], core_supports_unified=True) == "legacy"
    assert detect_grid_format([flat, legacy], core_supports_unified=True) is None
    assert detect_grid_format([], core_supports_unified=True) == "unified"
    assert detect_grid_format([], core_supports_unified=False) == "legacy"
    assert detect_grid_format([{"type": "gas", "stat_energy_from": "sensor.g"}], True) == "unified"


def test_history_grid_source_matches_format_and_removal_works_for_both():
    from custom_components.e3dc_maestro.energy_dashboard import (
        build_history_import_sources,
        merge_history_import_sources,
        remove_history_import_sources,
    )
    from custom_components.e3dc_maestro.statistic_ids import HISTORY_GRID_EXPORT, HISTORY_GRID_IMPORT

    imported = {HISTORY_GRID_IMPORT, HISTORY_GRID_EXPORT}
    flat = build_history_import_sources(imported, "unified")[0]
    assert flat["stat_energy_from"] == HISTORY_GRID_IMPORT
    assert flat["stat_energy_to"] == HISTORY_GRID_EXPORT
    assert "flow_from" not in flat
    legacy = build_history_import_sources(imported, "legacy")[0]
    assert legacy["flow_from"][0]["stat_energy_from"] == HISTORY_GRID_IMPORT
    assert "stat_energy_from" not in legacy
    assert build_history_import_sources(imported, None) == []

    live = {"type": "grid", "stat_energy_from": "sensor.in", "stat_energy_to": "sensor.out", "number_energy_price": 0.2}
    for src in (flat, legacy):
        merged = merge_history_import_sources([live], [src])
        assert merged[0] == live and len(merged) == 2
        assert merge_history_import_sources(merged, [src]) == merged
        stripped, removed = remove_history_import_sources(merged)
        assert stripped == [live]
        assert set(removed) == imported


def test_build_proposed_sources_grid_format():
    sensors = {
        "solar": {"entity_id": "sensor.pv", "origin": "options"},
        "grid_from": {"entity_id": "sensor.grid_in", "origin": "options"},
        "grid_to": {"entity_id": "sensor.grid_out", "origin": "options"},
    }
    flat = next(s for s in build_proposed_sources(sensors, "unified") if s["type"] == "grid")
    assert flat["stat_energy_from"] == "sensor.grid_in" and flat["stat_energy_to"] == "sensor.grid_out"
    assert "flow_from" not in flat
    old = next(s for s in build_proposed_sources(sensors, "legacy") if s["type"] == "grid")
    assert old["flow_from"][0]["stat_energy_from"] == "sensor.grid_in"
    assert not any(s["type"] == "grid" for s in build_proposed_sources(sensors, None))
