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
    assert kwargs["require_admin"] is False
    assert kwargs["module_url"] == f"/{DOMAIN}/frontend/panel/maestro-panel.js?v={VERSION}"


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
    def __init__(self, ids: dict[tuple[str, str], str], disabled: set[str] = frozenset()):
        self._ids = ids
        self._disabled = disabled

    def async_get_entity_id(self, platform, domain, unique_id):
        assert domain == DOMAIN
        return self._ids.get((platform, unique_id))

    def async_get(self, entity_id):
        return SimpleNamespace(disabled_by="user" if entity_id in self._disabled else None)


def _hass_with_entries(*entries):
    return SimpleNamespace(
        data={},
        config_entries=SimpleNamespace(async_entries=lambda domain: list(entries)),
    )


def test_panel_entities_resolves_renamed_and_flags_disabled(monkeypatch):
    registry = _Registry(
        {
            ("sensor", "e1_phase"): "sensor.meine_phase",
            ("switch", "e1_force_discharge"): "switch.e3dc_maestro_erzwungene_entladung",
        },
        disabled={"switch.e3dc_maestro_erzwungene_entladung"},
    )
    monkeypatch.setattr(panel, "er", SimpleNamespace(async_get=lambda _hass: registry))
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
    assert panel.panel_entities(hass) == {"entry_id": None, "entities": {}, "disabled": []}


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

    assert registered == [panel._ws_panel_entities]


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


def test_panel_entity_keys_match_frontend():
    src = (ROOT / "panel-src" / "src" / "entities.ts").read_text(encoding="utf-8")
    block = re.search(r"export const DEFAULT_IDS = \{(.*?)\n\}", src, re.S)
    assert block, "DEFAULT_IDS not found in entities.ts"
    frontend_keys = set(re.findall(r"^\s+(\w+):", block.group(1), re.M))
    assert frontend_keys == set(panel.PANEL_ENTITIES)
