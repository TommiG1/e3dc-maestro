"""Explicit clear of additional producers must survive save and RSCP seed (#34)."""
from __future__ import annotations

from types import SimpleNamespace

from custom_components.e3dc_maestro.config_flow import (
    _merge_list_source_options,
    _normalize_list_source_options,
    _suggested_list_source_options,
    seed_missing_rscp_source_options,
)
from custom_components.e3dc_maestro.const import (
    CONF_ADDITIONAL_ENERGY_TOTAL_SENSOR,
    CONF_ADDITIONAL_GENERATION_SENSOR,
    CONF_PV_PRODUCTION_TODAY_SENSOR,
    DOMAIN,
)
from custom_components.e3dc_maestro.panel_options import apply_panel_options
from homeassistant.config_entries import ConfigEntryState


def test_normalize_keeps_empty_list():
    out = _normalize_list_source_options({CONF_ADDITIONAL_GENERATION_SENSOR: []})
    assert out[CONF_ADDITIONAL_GENERATION_SENSOR] == []


def test_normalize_coerces_legacy_string():
    out = _normalize_list_source_options(
        {CONF_ADDITIONAL_GENERATION_SENSOR: "sensor.extra"}
    )
    assert out[CONF_ADDITIONAL_GENERATION_SENSOR] == ["sensor.extra"]


def test_merge_persists_empty_multi_select():
    target = {CONF_ADDITIONAL_GENERATION_SENSOR: ["sensor.extra"]}
    _merge_list_source_options(
        target,
        {
            CONF_ADDITIONAL_GENERATION_SENSOR: [],
            CONF_ADDITIONAL_ENERGY_TOTAL_SENSOR: [],
        },
    )
    assert target[CONF_ADDITIONAL_GENERATION_SENSOR] == []
    assert target[CONF_ADDITIONAL_ENERGY_TOTAL_SENSOR] == []


def test_suggested_options_override_auto_empty():
    auto = {CONF_ADDITIONAL_GENERATION_SENSOR: ["sensor.from_rscp"]}
    options = {CONF_ADDITIONAL_GENERATION_SENSOR: []}
    suggested = _suggested_list_source_options({**auto, **options})
    assert suggested[CONF_ADDITIONAL_GENERATION_SENSOR] == []


def test_seed_skips_explicit_empty(monkeypatch):
    monkeypatch.setattr(
        "custom_components.e3dc_maestro.config_flow._autodetect_rscp_sources",
        lambda _hass: {
            CONF_ADDITIONAL_GENERATION_SENSOR: ["sensor.from_rscp"],
            CONF_ADDITIONAL_ENERGY_TOTAL_SENSOR: ["sensor.from_rscp_total"],
            CONF_PV_PRODUCTION_TODAY_SENSOR: "sensor.pv_today",
        },
    )
    result = seed_missing_rscp_source_options(
        SimpleNamespace(),
        {
            CONF_ADDITIONAL_GENERATION_SENSOR: [],
            CONF_ADDITIONAL_ENERGY_TOTAL_SENSOR: [],
        },
    )
    # Only missing string keys may still be filled.
    assert result is not None
    assert result[CONF_ADDITIONAL_GENERATION_SENSOR] == []
    assert result[CONF_ADDITIONAL_ENERGY_TOTAL_SENSOR] == []
    assert result[CONF_PV_PRODUCTION_TODAY_SENSOR] == "sensor.pv_today"


def test_seed_fills_when_key_absent(monkeypatch):
    monkeypatch.setattr(
        "custom_components.e3dc_maestro.config_flow._autodetect_rscp_sources",
        lambda _hass: {
            CONF_ADDITIONAL_GENERATION_SENSOR: ["sensor.from_rscp"],
        },
    )
    result = seed_missing_rscp_source_options(SimpleNamespace(), {})
    assert result == {CONF_ADDITIONAL_GENERATION_SENSOR: ["sensor.from_rscp"]}


def test_panel_clear_persists_empty_list():
    entry = SimpleNamespace(
        entry_id="e1",
        state=ConfigEntryState.LOADED,
        options={CONF_ADDITIONAL_GENERATION_SENSOR: ["sensor.a"]},
    )
    stored: list[dict] = []

    def update(_entry, *, options):
        stored.append(options)
        _entry.options = options

    hass = SimpleNamespace(
        data={DOMAIN: {"e1": SimpleNamespace(_params=SimpleNamespace(), _skip_reload=False)}},
        states=SimpleNamespace(get=lambda _eid: None),
        config_entries=SimpleNamespace(
            async_entries=lambda domain: [entry] if domain == DOMAIN else [],
            async_update_entry=update,
        ),
    )
    # Empty list needs no entity existence check.
    result = apply_panel_options(hass, {CONF_ADDITIONAL_GENERATION_SENSOR: []})
    assert result["reloaded"] is True
    assert stored[-1][CONF_ADDITIONAL_GENERATION_SENSOR] == []
    assert entry.options[CONF_ADDITIONAL_GENERATION_SENSOR] == []
