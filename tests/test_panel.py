"""Sidebar panel registration for the Maestro cockpit."""
from __future__ import annotations

import json
import re
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import AsyncMock, MagicMock

import pytest

from custom_components.e3dc_maestro import panel
from custom_components.e3dc_maestro.const import DOMAIN, VERSION

ROOT = Path(__file__).resolve().parents[1]


@pytest.fixture
def ha_frontend(monkeypatch):
    register = AsyncMock()
    remove = MagicMock()
    monkeypatch.setattr(panel, "panel_custom", SimpleNamespace(async_register_panel=register))
    monkeypatch.setattr(panel, "frontend", SimpleNamespace(async_remove_panel=remove))
    return register, remove


@pytest.mark.asyncio
async def test_register_panel_once_for_all_users(ha_frontend):
    register, _ = ha_frontend
    hass = SimpleNamespace(data={})

    await panel.async_register_panel(hass)
    await panel.async_register_panel(hass)

    register.assert_awaited_once()
    kwargs = register.await_args.kwargs
    assert kwargs["frontend_url_path"] == "maestro-cockpit"
    assert kwargs["webcomponent_name"] == "e3dc-maestro-panel"
    assert kwargs["sidebar_title"] == "E3DC Maestro Cockpit"
    assert kwargs["require_admin"] is False
    # The file content follows the version, so a new build is a new address for the app cache.
    prefix = f"/{DOMAIN}/frontend/panel/maestro-panel.js?v={VERSION}-"
    assert kwargs["module_url"] == panel.panel_module_url()
    assert kwargs["module_url"].startswith(prefix)
    token = kwargs["module_url"][len(prefix) :]
    assert len(token) == 12
    assert all(ch in "0123456789abcdef" for ch in token)


@pytest.mark.asyncio
async def test_register_panel_again_when_script_url_changes(ha_frontend, monkeypatch):
    register, remove = ha_frontend
    hass = SimpleNamespace(data={})
    await panel.async_register_panel(hass)
    monkeypatch.setattr(panel, "panel_module_url", lambda: "/e3dc_maestro/frontend/panel/maestro-panel.js?v=new")
    await panel.async_register_panel(hass)
    remove.assert_called_once_with(hass, "maestro-cockpit")
    assert register.await_count == 2
    assert register.await_args.kwargs["module_url"].endswith("v=new")


@pytest.mark.asyncio
async def test_register_panel_again_when_sidebar_title_changes(ha_frontend):
    from homeassistant.config_entries import ConfigEntryState

    register, remove = ha_frontend
    entry = SimpleNamespace(state=ConfigEntryState.LOADED, options={})
    hass = SimpleNamespace(
        data={},
        config_entries=SimpleNamespace(async_entries=lambda _domain: [entry]),
    )
    await panel.async_register_panel(hass)
    assert register.await_args.kwargs["sidebar_title"] == "E3DC Maestro Cockpit"
    entry.options = {"sidebar_title": "Hausakku"}
    await panel.async_register_panel(hass)
    remove.assert_called_once_with(hass, "maestro-cockpit")
    assert register.await_count == 2
    assert register.await_args.kwargs["sidebar_title"] == "Hausakku"


@pytest.mark.asyncio
async def test_unregister_panel_only_when_registered(ha_frontend):
    _, remove = ha_frontend
    hass = SimpleNamespace(data={})

    panel.async_unregister_panel(hass)
    remove.assert_not_called()

    await panel.async_register_panel(hass)
    panel.async_unregister_panel(hass)
    remove.assert_called_once_with(hass, "maestro-cockpit")


@pytest.mark.asyncio
async def test_register_panel_conflict_does_not_break_setup(ha_frontend):
    register, remove = ha_frontend
    register.side_effect = ValueError("Overwriting panel maestro-cockpit owned by lovelace")
    hass = SimpleNamespace(data={})

    await panel.async_register_panel(hass)
    panel.async_unregister_panel(hass)

    remove.assert_not_called()


def test_panel_bundle_and_manifest_dependency():
    bundle = ROOT / "custom_components" / "e3dc_maestro" / "frontend" / "panel" / "maestro-panel.js"
    assert bundle.is_file()
    assert "e3dc-maestro-panel" in bundle.read_text(encoding="utf-8")
    manifest = json.loads(
        (ROOT / "custom_components" / "e3dc_maestro" / "manifest.json").read_text(encoding="utf-8")
    )
    assert "panel_custom" in manifest["dependencies"]


class _Registry:
    def __init__(
        self,
        ids: dict[tuple[str, str], str],
        disabled: set[str] = frozenset(),
        entries: tuple = (),
    ):
        self._ids = ids
        self._disabled = disabled
        self._entries = entries

    def async_get_entity_id(self, platform, domain, unique_id):
        assert domain == DOMAIN
        return self._ids.get((platform, unique_id))

    def async_get(self, entity_id):
        return SimpleNamespace(disabled_by="user" if entity_id in self._disabled else None)

    def entries_for(self, entry_id):
        prefix = f"{entry_id}_"
        return [entry for entry in self._entries if (entry.unique_id or "").startswith(prefix)]


def _hass_with_entries(*entries):
    filled = [
        e if getattr(e, "data", None) is not None else SimpleNamespace(**vars(e), data={})
        for e in entries
    ]
    return SimpleNamespace(
        data={},
        config_entries=SimpleNamespace(async_entries=lambda _domain: list(filled)),
    )


def test_panel_entities_resolves_renamed_and_flags_disabled(monkeypatch):
    registry = _Registry(
        {
            ("sensor", "e1_phase"): "sensor.meine_phase",
            ("switch", "e1_force_discharge"): "switch.e3dc_maestro_erzwungene_entladung",
        },
        disabled={"switch.e3dc_maestro_erzwungene_entladung"},
    )
    monkeypatch.setattr(
        panel,
        "er",
        SimpleNamespace(
            async_get=lambda _hass: registry,
            async_entries_for_config_entry=lambda reg, entry_id: reg.entries_for(entry_id),
        ),
    )
    hass = _hass_with_entries(
        SimpleNamespace(entry_id="e0", state="not_loaded"),
        SimpleNamespace(entry_id="e1", state="loaded"),
    )

    result = panel.panel_entities(hass)

    assert result["entry_id"] == "e1"
    assert result["entities"] == {
        "phase": "sensor.meine_phase",
        "forceDischarge": "switch.e3dc_maestro_erzwungene_entladung",
    }
    assert result["disabled"] == ["forceDischarge"]


def test_panel_entities_without_loaded_entry():
    hass = _hass_with_entries(SimpleNamespace(entry_id="e0", state="not_loaded"))
    assert panel.panel_entities(hass) == {
        "entry_id": None,
        "entities": {},
        "disabled": [],
        "settings": {},
        "settings_disabled": [],
        "plant": {"entities": {}, "packs": [], "wallboxes": [], "controls": {"general": {}, "wallbox": {}}, "identity": {}},
    }


def test_plant_from_entries_groups_packs_and_skips_disabled():
    entries = [
        SimpleNamespace(
            translation_key="autarky",
            entity_id="sensor.autarky",
            domain="sensor",
            device_id="sys",
            disabled_by=None,
        ),
        SimpleNamespace(
            translation_key="battery-pack-state-of-health",
            entity_id="sensor.pack_b_soh",
            domain="sensor",
            device_id="b",
            disabled_by=None,
        ),
        SimpleNamespace(
            translation_key="battery-pack-state-of-health",
            entity_id="sensor.pack_a_soh",
            domain="sensor",
            device_id="a",
            disabled_by=None,
        ),
        SimpleNamespace(
            translation_key="battery-pack-current",
            entity_id="sensor.hidden_current",
            domain="sensor",
            device_id="a",
            disabled_by="user",
        ),
        SimpleNamespace(
            translation_key="wallbox-max-charge-current",
            entity_id="number.wb_current",
            domain="number",
            device_id="wb",
            disabled_by=None,
        ),
        SimpleNamespace(
            translation_key="wallbox-max-charge-current",
            entity_id="sensor.wb_current",
            domain="sensor",
            device_id="wb",
            disabled_by=None,
        ),
        SimpleNamespace(
            translation_key="wallbox-plug",
            entity_id="binary_sensor.wb_plug",
            domain="binary_sensor",
            device_id="wb",
            disabled_by=None,
        ),
        SimpleNamespace(entity_id="sensor.other", domain="sensor", device_id="sys", disabled_by=None),
    ]

    entries.extend(
        [
            SimpleNamespace(
                translation_key="battery-module-soh-reported",
                entity_id="sensor.mod_soh",
                domain="sensor",
                device_id="m1",
                disabled_by=None,
            ),
            SimpleNamespace(
                translation_key="pset-weatherregulationenabled",
                entity_id="binary_sensor.weather",
                domain="binary_sensor",
                device_id="sys",
                disabled_by=None,
            ),
            SimpleNamespace(
                translation_key="pset-weatherregulationenabled",
                entity_id="switch.weather",
                domain="switch",
                device_id="sys",
                disabled_by=None,
            ),
            SimpleNamespace(
                translation_key="wallbox-sun-mode",
                entity_id="switch.wb_sun",
                domain="switch",
                device_id="wb",
                disabled_by=None,
            ),
        ]
    )
    result = panel.plant_from_entries(
        entries,
        {
            "a": {"name": "Pack A", "via": None},
            "b": {"name": "Pack B", "via": None},
            "m1": {"name": "Module 1", "via": "a"},
            "wb": {"name": "Wallbox", "via": None},
            "sys": {"name": "S10", "via": None, "model": "S10E_Pro", "serial": "702207024837", "firmware": "P10_2026_027"},
        },
    )

    assert result["entities"]["autarky"] == "sensor.autarky"
    assert result["entities"]["weather"] == "binary_sensor.weather"
    assert result["packs"] == [
        {
            "name": "Pack A",
            "entities": {"soh": "sensor.pack_a_soh"},
            "modules": [{"name": "Module 1", "entities": {"sohReported": "sensor.mod_soh"}}],
        },
        {"name": "Pack B", "entities": {"soh": "sensor.pack_b_soh"}, "modules": []},
    ]
    assert result["wallboxes"] == [
        {
            "name": "Wallbox",
            "entities": {"current": "sensor.wb_current", "plug": "binary_sensor.wb_plug"},
            "controls": {"maxCurrent": "number.wb_current", "sunMode": "switch.wb_sun"},
        }
    ]
    assert result["controls"] == {"general": {"weather": "switch.weather"}, "wallbox": {}}
    assert result["identity"] == {"name": "S10", "model": "S10E_Pro", "serial": "702207024837", "firmware": "P10_2026_027"}


def test_plant_from_entries_prefers_farm_controller_scalars():
    """Farm system charge/discharge max wins over an earlier master copy."""
    entries = [
        SimpleNamespace(
            translation_key="system-battery-charge-max",
            entity_id="sensor.master_charge_max",
            domain="sensor",
            device_id="master",
            config_entry_id="child",
            disabled_by=None,
        ),
        SimpleNamespace(
            translation_key="system-battery-discharge-max",
            entity_id="sensor.master_discharge_max",
            domain="sensor",
            device_id="master",
            config_entry_id="child",
            disabled_by=None,
        ),
        SimpleNamespace(
            translation_key="system-battery-charge-max",
            entity_id="sensor.farm_charge_max",
            domain="sensor",
            device_id="farm",
            config_entry_id="farm",
            disabled_by=None,
        ),
        SimpleNamespace(
            translation_key="system-battery-discharge-max",
            entity_id="sensor.farm_discharge_max",
            domain="sensor",
            device_id="farm",
            config_entry_id="farm",
            disabled_by=None,
        ),
        SimpleNamespace(
            translation_key="autarky",
            entity_id="sensor.farm_autarky",
            domain="sensor",
            device_id="farm",
            config_entry_id="farm",
            disabled_by=None,
        ),
        SimpleNamespace(
            translation_key="pset-weatherregulationenabled",
            entity_id="switch.master_weather",
            domain="switch",
            device_id="master",
            config_entry_id="child",
            disabled_by=None,
        ),
        SimpleNamespace(
            translation_key="pset-weatherregulationenabled",
            entity_id="switch.farm_weather",
            domain="switch",
            device_id="farm",
            config_entry_id="farm",
            disabled_by=None,
        ),
        SimpleNamespace(
            translation_key="battery-pack-state-of-health",
            entity_id="sensor.master_pack_soh",
            domain="sensor",
            device_id="pack_m",
            config_entry_id="child",
            disabled_by=None,
        ),
    ]
    result = panel.plant_from_entries(
        entries,
        {
            "master": {"name": "Master", "via": None},
            "farm": {"name": "Farm", "via": None, "model": "S10E Farm Controller"},
            "pack_m": {"name": "Pack Master", "via": None},
        },
        farm_entry_ids={"farm"},
    )

    assert result["entities"]["chargeMax"] == "sensor.farm_charge_max"
    assert result["entities"]["dischargeMax"] == "sensor.farm_discharge_max"
    assert result["entities"]["autarky"] == "sensor.farm_autarky"
    assert result["controls"]["general"]["weather"] == "switch.farm_weather"
    assert result["identity"]["name"] == "Farm"
    # Physical packs stay visible even when they belong to a child entry.
    assert result["packs"] == [
        {"name": "Pack Master", "entities": {"soh": "sensor.master_pack_soh"}, "modules": []}
    ]


def test_panel_entities_settings_map_keeps_renames_and_skips_sensors(monkeypatch):
    registry = _Registry(
        {},
        entries=(
            SimpleNamespace(domain="number", unique_id="e1_inverter_power", entity_id="number.mein_wr", disabled_by=None),
            SimpleNamespace(domain="switch", unique_id="e1_ht_enabled", entity_id="switch.e3dc_maestro_entladeschutz", disabled_by="user"),
            SimpleNamespace(domain="sensor", unique_id="e1_phase", entity_id="sensor.phase", disabled_by=None),
            SimpleNamespace(domain="number", unique_id="other_inverter_power", entity_id="number.other", disabled_by=None),
            SimpleNamespace(domain="button", unique_id="e1_reset_stats", entity_id="button.reset", disabled_by=None),
        ),
    )
    monkeypatch.setattr(
        panel,
        "er",
        SimpleNamespace(
            async_get=lambda _hass: registry,
            async_entries_for_config_entry=lambda reg, entry_id: reg.entries_for(entry_id),
        ),
    )
    hass = _hass_with_entries(SimpleNamespace(entry_id="e1", state="loaded"))

    result = panel.panel_entities(hass)

    assert result["settings"] == {
        "inverter_power": "number.mein_wr",
        "ht_enabled": "switch.e3dc_maestro_entladeschutz",
        "reset_stats": "button.reset",
    }
    assert result["settings_disabled"] == ["ht_enabled"]


@pytest.mark.asyncio
async def test_websocket_command_registered_once(ha_frontend, monkeypatch):
    registered = []
    monkeypatch.setattr(
        panel,
        "websocket_api",
        SimpleNamespace(async_register_command=lambda hass, handler: registered.append(handler)),
    )
    hass = SimpleNamespace(data={})

    await panel.async_register_panel(hass)
    panel.async_unregister_panel(hass)
    await panel.async_register_panel(hass)

    assert registered == [
        panel._ws_panel_entities,
        panel._ws_panel_options,
        panel._ws_panel_options_set,
        panel._ws_panel_pause,
        panel._ws_debug_dump,
        panel._ws_energy_preview,
        panel._ws_energy_apply,
    ]


def test_panel_entity_keys_exist_in_platforms():
    """Every description key the panel resolves must be defined on its platform."""
    from custom_components.e3dc_maestro import const

    conf_values = {getattr(const, n): n for n in dir(const) if n.startswith("CONF_")}
    for panel_key, (platform, description_key) in panel.PANEL_ENTITIES.items():
        src = (ROOT / "custom_components" / "e3dc_maestro" / f"{platform}.py").read_text(encoding="utf-8")
        literal = f'key="{description_key}"' in src
        constant = description_key in conf_values and f"key={conf_values[description_key]}," in src
        unique = f'_{description_key}"' in src
        assert literal or constant or unique, f"{panel_key}: {platform} key {description_key!r} not found"


def test_settings_group_keys_exist_on_platforms():
    """Every row in the settings screen must be a real number, switch, select or button."""
    src = (ROOT / "panel-src" / "src" / "settings.ts").read_text(encoding="utf-8")
    groups = re.search(r"export const SETTINGS_GROUPS\b.*?= \[(.*?)\n\];", src, re.S)
    assert groups, "SETTINGS_GROUPS not found"
    keys = [
        key
        for block in re.findall(r"\[((?:\s*\"[a-z0-9_]+\",?)+)\s*\]", groups.group(1))
        for key in re.findall(r'"([a-z0-9_]+)"', block)
    ]
    assert len(keys) == len(set(keys))
    blob = "\n".join(
        (ROOT / "custom_components" / "e3dc_maestro" / name).read_text(encoding="utf-8")
        for name in ("const.py", "number.py", "switch.py", "select.py", "button.py")
    )
    missing = [key for key in keys if f'"{key}"' not in blob and f'_{key}"' not in blob]
    assert missing == []


def test_panel_entity_keys_match_frontend():
    src = (ROOT / "panel-src" / "src" / "entities.ts").read_text(encoding="utf-8")
    block = re.search(r"export const DEFAULT_IDS = \{(.*?)\n\}", src, re.S)
    assert block, "DEFAULT_IDS not found in entities.ts"
    frontend_keys = set(re.findall(r"^\s+(\w+):", block.group(1), re.M))
    assert frontend_keys == set(panel.PANEL_ENTITIES)
