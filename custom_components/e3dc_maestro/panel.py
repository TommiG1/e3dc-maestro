"""Register the Maestro cockpit as a sidebar panel."""
from __future__ import annotations

import logging

from homeassistant.components import frontend, panel_custom
from homeassistant.core import HomeAssistant

from .const import DOMAIN, VERSION

_LOGGER = logging.getLogger(__name__)

# "e3dc-maestro" is taken by the Lovelace strategy dashboard.
PANEL_URL_PATH = "maestro-cockpit"
PANEL_COMPONENT = "e3dc-maestro-panel"
# Served by the static path registered in dashboard_frontend.async_setup_frontend.
_PANEL_MODULE = f"/{DOMAIN}/frontend/panel/maestro-panel.js"
_PANEL_FLAG = f"{DOMAIN}_panel_registered"


def panel_module_url() -> str:
    return f"{_PANEL_MODULE}?v={VERSION}"


async def async_register_panel(hass: HomeAssistant) -> None:
    """Add the Maestro panel to the sidebar (once, for all users).

    Never raises: a panel problem must not keep the control loop from starting.
    """
    if hass.data.get(_PANEL_FLAG):
        return
    try:
        await panel_custom.async_register_panel(
            hass,
            frontend_url_path=PANEL_URL_PATH,
            webcomponent_name=PANEL_COMPONENT,
            sidebar_title="Maestro",
            sidebar_icon="mdi:battery-charging-high",
            module_url=panel_module_url(),
            require_admin=False,
        )
    except ValueError as err:
        _LOGGER.warning("E3DC Maestro: Cockpit-Panel nicht registriert: %s", err)
        return
    hass.data[_PANEL_FLAG] = True


def async_unregister_panel(hass: HomeAssistant) -> None:
    """Remove the panel from the sidebar."""
    if hass.data.pop(_PANEL_FLAG, False):
        frontend.async_remove_panel(hass, PANEL_URL_PATH)
