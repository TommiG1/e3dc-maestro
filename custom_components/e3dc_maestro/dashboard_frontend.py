"""Register the Lovelace community dashboard strategy with Home Assistant."""
from __future__ import annotations

import logging
from pathlib import Path

from homeassistant.components.frontend import add_extra_js_url
from homeassistant.components.http import StaticPathConfig
from homeassistant.components.lovelace.const import (
    CONF_RESOURCE_TYPE_WS,
    DOMAIN as LOVELACE_DOMAIN,
)
from homeassistant.components.lovelace.resources import (
    ResourceStorageCollection,
    ResourceYAMLCollection,
)
from homeassistant.const import CONF_ID, CONF_URL
from homeassistant.core import HomeAssistant

from .const import DOMAIN
from .frontend_cache import async_asset_query

_LOGGER = logging.getLogger(__name__)

_FRONTEND_DIR = Path(__file__).parent / "frontend"
_STRATEGY_JS = "e3dc-maestro-strategy.js"
_STATIC_URL_BASE = f"/{DOMAIN}/frontend"
_SETUP_FLAG = f"{DOMAIN}_frontend_registered"
_YAML_WARNED = f"{DOMAIN}_strategy_yaml_warned"
_EXTRA_JS_URL = f"{DOMAIN}_extra_js_url"


async def _strategy_module_url(hass: HomeAssistant) -> str:
    query = await async_asset_query(hass, _FRONTEND_DIR / _STRATEGY_JS)
    return f"{_STATIC_URL_BASE}/{_STRATEGY_JS}?{query}"


def _strategy_module_path(url: str) -> str:
    return url.split("?", 1)[0]


def _is_strategy_resource(url: str) -> bool:
    path = _strategy_module_path(url)
    return path.endswith(f"/{_STRATEGY_JS}") or path.endswith(_STRATEGY_JS)


def _prioritize_item(data: dict, item_id: str) -> bool:
    """Move one mapping entry to the front. Returns whether the order changed."""
    if item_id not in data:
        return False
    if next(iter(data), None) == item_id:
        return False
    item = data.pop(item_id)
    ordered = {item_id: item}
    ordered.update(data)
    data.clear()
    data.update(ordered)
    return True


async def async_setup_frontend(hass: HomeAssistant) -> None:
    """Serve strategy assets, preload the JS module, and register a Lovelace resource.

    Assets are served only from the integration's own static path. Nothing is
    written to the user's config/www. Installs whose Lovelace resource still
    points at the old www copy are moved to the static path below.
    """
    module_url = await _strategy_module_url(hass)
    if not hass.data.get(_SETUP_FLAG):
        await hass.http.async_register_static_paths(
            [
                StaticPathConfig(
                    _STATIC_URL_BASE,
                    str(_FRONTEND_DIR),
                    cache_headers=False,
                )
            ]
        )
        hass.data[_SETUP_FLAG] = True
    # Always refresh the preload URL when the file content changed. Leaving the
    # first URL in place after a HACS update kept the old strategy in the cache.
    previous = hass.data.get(_EXTRA_JS_URL)
    if previous != module_url:
        add_extra_js_url(hass, module_url)
        hass.data[_EXTRA_JS_URL] = module_url
        _LOGGER.debug("Registered E3DC Maestro dashboard strategy at %s", module_url)

    # Lovelace waits only 5s for ll-strategy-dashboard-* and starts that timer
    # before resources finish loading. The resource is kept first so its script
    # tag is not queued behind the other Lovelace modules; the extra JS URL above
    # preloads it on every frontend page.
    await _async_register_lovelace_resource(hass, module_url)


def _lovelace_resources(hass: HomeAssistant):
    lovelace_data = hass.data.get(LOVELACE_DOMAIN)
    if lovelace_data is None:
        return None
    resources = getattr(lovelace_data, "resources", None)
    if resources is None and isinstance(lovelace_data, dict):
        return lovelace_data.get("resources")
    return resources


def _matching_resources(resources) -> list[dict]:
    return [
        item
        for item in resources.async_items()
        if _is_strategy_resource(str(item.get(CONF_URL) or ""))
    ]


def _warn_yaml_resource(
    hass: HomeAssistant, module_url: str, stale: str | None = None
) -> None:
    """Resources in YAML mode cannot be edited here; tell the user once."""
    if hass.data.get(_YAML_WARNED):
        return
    hass.data[_YAML_WARNED] = True
    if stale:
        _LOGGER.warning(
            "Lovelace resources are in YAML mode and still use the old Maestro "
            "address %s. Replace that entry so the dashboard strategy keeps "
            "loading:\n  - url: %s\n    type: module",
            stale,
            module_url,
        )
        return
    _LOGGER.warning(
        "Lovelace resources are in YAML mode; add this module so the Maestro "
        "dashboard strategy can load:\n  - url: %s\n    type: module",
        module_url,
    )


async def _async_register_lovelace_resource(hass: HomeAssistant, module_url: str) -> None:
    """Ensure the strategy JS is the first Lovelace JavaScript module resource."""
    resources = _lovelace_resources(hass)
    if not resources:
        _LOGGER.debug(
            "Lovelace resources not available; strategy relies on extra JS until restart"
        )
        return

    if isinstance(resources, ResourceStorageCollection) and not resources.loaded:
        await resources.async_load()
        resources.loaded = True

    matches = _matching_resources(resources)
    existing = matches[0] if matches else None

    if existing is not None:
        if (
            existing.get(CONF_URL) != module_url
            and isinstance(resources, ResourceStorageCollection)
        ):
            await resources.async_update_item(
                existing[CONF_ID],
                {CONF_RESOURCE_TYPE_WS: "module", CONF_URL: module_url},
            )
            _LOGGER.debug(
                "Updated E3DC Maestro Lovelace strategy resource to %s", module_url
            )
        for duplicate in matches[1:]:
            if isinstance(resources, ResourceStorageCollection):
                await resources.async_delete_item(duplicate[CONF_ID])
        if isinstance(resources, ResourceYAMLCollection) and (
            _strategy_module_path(str(existing.get(CONF_URL) or ""))
            != _strategy_module_path(module_url)
        ):
            # Older versions served the module from the user's www folder.
            _warn_yaml_resource(hass, module_url, stale=str(existing.get(CONF_URL)))
    elif isinstance(resources, ResourceYAMLCollection):
        _warn_yaml_resource(hass, module_url)
        return
    elif isinstance(resources, ResourceStorageCollection):
        await resources.async_create_item(
            {CONF_RESOURCE_TYPE_WS: "module", CONF_URL: module_url}
        )
        _LOGGER.info("Registered E3DC Maestro Lovelace strategy resource %s", module_url)
    else:
        return

    if isinstance(resources, ResourceStorageCollection):
        _async_prioritize_strategy_resource(resources)


def _async_prioritize_strategy_resource(resources: ResourceStorageCollection) -> None:
    """Load the strategy module before the other Lovelace resources."""
    data = getattr(resources, "data", None)
    if not isinstance(data, dict):
        return
    item_id = next(
        (
            item_id
            for item_id, item in data.items()
            if _is_strategy_resource(str(item.get(CONF_URL) or ""))
        ),
        None,
    )
    if item_id is None or not _prioritize_item(data, item_id):
        return
    schedule = getattr(resources, "_async_schedule_save", None)
    if schedule is not None:
        schedule()
    _LOGGER.debug("Moved E3DC Maestro strategy resource to the front of the list")
