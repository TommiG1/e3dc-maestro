"""Cache-busting query strings for Maestro frontend assets."""
from __future__ import annotations

import hashlib
from pathlib import Path

from homeassistant.core import HomeAssistant

from .const import VERSION


def asset_query(path: Path) -> str:
    """Cache-busting query for a frontend file. Blocking: reads the whole file.

    Uses the file content, not the mtime. Copies that keep the old timestamp
    and iPad/app caches that ignore a silent overwrite still get a new URL.
    Call it through ``async_asset_query`` from the event loop.
    """
    try:
        digest = hashlib.sha256(path.read_bytes()).hexdigest()[:12]
    except OSError:
        digest = "0"
    return f"v={VERSION}-{digest}"


async def async_asset_query(hass: HomeAssistant, path: Path) -> str:
    """Same as ``asset_query`` but the file is read and hashed in the executor."""
    return await hass.async_add_executor_job(asset_query, path)
