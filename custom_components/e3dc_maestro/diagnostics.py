"""Home Assistant diagnostics for E3DC Maestro config entries."""
from __future__ import annotations

from typing import Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import DOMAIN
from .support_dump import build_support_dump


async def async_get_config_entry_diagnostics(
    hass: HomeAssistant, entry: ConfigEntry
) -> dict[str, Any]:
    """Return diagnostics for a config entry (redacted).

    Same core payload as the panel debug download, without the long debug_log
    list (HA device diagnostics stay compact; use the panel dump for tickets).
    """
    coordinator = hass.data.get(DOMAIN, {}).get(entry.entry_id)
    dump = build_support_dump(hass, entry, coordinator)
    dump.pop("debug_log", None)
    dump.pop("action_history", None)
    dump.pop("hint", None)
    return dump
