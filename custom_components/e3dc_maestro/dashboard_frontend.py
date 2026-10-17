"""Register the Lovelace community dashboard strategy with Home Assistant."""
from __future__ import annotations

import logging
import shutil
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

from .const import DOMAIN, VERSION

_LOGGER = logging.getLogger(__name__)

_FRONTEND_DIR = Path(__file__).parent / "frontend"
_STRATEGY_JS = "e3dc-maestro-strategy.js"
_DASHBOARD_JSON = "maestro_dashboard.json"
_STATIC_URL_BASE = f"/{DOMAIN}/frontend"
_LOCAL_URL_BASE = f"/local/{DOMAIN}"
_SETUP_FLAG = f"{DOMAIN}_frontend_registered"
_YAML_WARNED = f"{DOMAIN}_strategy_yaml_warned"


def _strategy_module_url(published_locally: bool) -> str:
    # Bust caches when the integration version changes.
    base = _LOCAL_URL_BASE if published_locally else _STATIC_URL_BASE
    return f"{base}/{_STRATEGY_JS}?v={VERSION}"


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


def _publish_www(config_path: str) -> bool:
    """Copy strategy assets into config/www so /local is served before setup.

    Returns True only if /local already serves them: HA registers /local at
    frontend setup and only when config/www existed then.
    """
    target = Path(config_path)
    www_existed = target.parent.is_dir()
    try:
        target.mkdir(parents=True, exist_ok=True)
        for name in (_STRATEGY_JS, _DASHBOARD_JSON):
            shutil.copyfile(_FRONTEND_DIR / name, target / name)
    except OSError as err:
        _LOGGER.warning(
            "Could not publish the Maestro dashboard strategy to %s: %s", target, err
        )
        return False
    return www_existed


async def async_setup_frontend(hass: HomeAssistant) -> None:
    """Serve strategy assets, preload the JS module, and register a Lovelace resource."""
    published = await hass.async_add_executor_job(
        _publish_www, hass.config.path("www", DOMAIN)
    )
    module_url = _strategy_module_url(published)
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
        add_extra_js_url(hass, module_url)
        hass.data[_SETUP_FLAG] = True
        _LOGGER.debug("Registered E3DC Maestro dashboard strategy at %s", module_url)

    # Lovelace waits only 5s for ll-strategy-dashboard-* and starts that timer
    # before resources finish loading. /local is served as soon as HTTP is up
    # (the custom static path is not). The resource itself is kept first so its
    # script tag is not queued behind the other Lovelace modules.
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
    elif isinstance(resources, ResourceYAMLCollection):
        if not hass.data.get(_YAML_WARNED):
            hass.data[_YAML_WARNED] = True
            _LOGGER.warning(
                "Lovelace resources are in YAML mode; add this module so the Maestro "
                "dashboard strategy can load:\n  - url: %s\n    type: module",
                module_url,
            )
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
