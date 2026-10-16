"""Shared device metadata for E3DC Maestro entities."""
from __future__ import annotations

from typing import TYPE_CHECKING

from .const import DOMAIN, VERSION

if TYPE_CHECKING:
    from .coordinator import E3DCMaestroCoordinator


def set_stable_entity_id(entity, domain: str) -> None:
    """Pin the entity_id to ``<domain>.e3dc_maestro_<slug(name)>`` on first registration.

    Without this HA derives the id itself, and installs whose device sits in an
    area get a prefix (``sensor.keller_e3dc_maestro_...``), breaking every
    dashboard. Already registered entities keep their id (see the migration in
    ``__init__``). An id that is already set (``stable_object_id``) wins.
    """
    from homeassistant.util import slugify

    if getattr(entity, "entity_id", None):
        return
    description = getattr(entity, "entity_description", None)
    name = getattr(description, "name", None) or entity._attr_name
    entity.entity_id = f"{domain}.e3dc_maestro_{slugify(str(name))}"


def device_info(coordinator: E3DCMaestroCoordinator) -> dict:
    """Return Home Assistant device_info for all Maestro platforms."""
    return {
        "identifiers": {(DOMAIN, coordinator.entry.entry_id)},
        "name": "E3DC Maestro",
        "manufacturer": "E3DC Maestro",
        "model": "Charge Orchestrator",
        "sw_version": VERSION,
    }
