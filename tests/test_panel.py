"""Sidebar panel registration for the Maestro cockpit."""
from __future__ import annotations

import json
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
