"""E3DC Maestro – charge orchestration for E3DC storage systems."""
from __future__ import annotations

import logging
from typing import Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import ConfigEntryNotReady
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers import entity_registry as er

from .const import DOMAIN, E3DC_RSCP_DOMAIN
from .coordinator import E3DCMaestroCoordinator

_LOGGER = logging.getLogger(__name__)

# Entity-ID-Migration: `sensor.py` hat den Anzeigenamen dieser Sensoren mehrfach
# umbenannt (z. B. "Aktives Lade-Limit" -> "Soll-Lade-Limit"). Home Assistant
# ändert die entity_id dabei NIE automatisch mit – nur der Anzeigename und die
# unique_id (die am `key=` hängt) folgen dem Code. Bestandsinstallationen
# bleiben also auf der alten entity_id sitzen, während Neuinstallationen die
# neue bekommen. Dashboards können immer nur eine der beiden ID referenzieren
# (siehe GitHub-Issue #3). Diese Migration zieht bestehende Installationen auf
# die ID nach, die auch eine Neuinstallation heute bekommen würde.
_ENTITY_ID_RENAMES: dict[str, str] = {
    # unique_id-Suffix (== SensorEntityDescription.key) -> Ziel-Object-ID
    "charge_power_limit": "soll_lade_limit",
    "discharge_power_limit": "soll_entlade_limit",
    "feed_in_avoided_today": "dc_abregelung_verhindert_heute",
    # Anzeigename HT* → Entladeschutz* (entity_id folgt dem Name-Slug)
    "ht_enabled": "entladeschutz",
    "ht_sat": "entladeschutz_samstag",
    "ht_sun": "entladeschutz_sonntag",
    "ht_protection_active": "entladeschutz_aktiv",
    "ht_on": "entladeschutz_beginn",
    "ht_off": "entladeschutz_ende",
    "ht_min": "entladeschutz_reserve_winter",
    "ht_sockel": "entladeschutz_sockel_aquinoktium",
}

# Removing `entity_registry_enabled_default=False` from a description only
# affects new installations: existing ones keep `disabled_by = "integration"` in
# the registry and the entity stays gone forever. That left dashboard cards
# permanently empty (GitHub-Issue #3, "Debug-Log" and "Einspeiselimit
# gesichert"). No description carries the flag anymore, so every entity the
# integration disabled should be handed back.
#
# INVARIANT: add a key here whenever a description gets
# `entity_registry_enabled_default=False`, otherwise this migration would
# immediately re-enable it again on the next restart.
_KEYS_INTENTIONALLY_DISABLED: frozenset[str] = frozenset()


def _is_disabled_by_integration(entity_entry: Any) -> bool:
    """True when HA disabled the entity via `entity_registry_enabled_default`."""
    disabled_by = entity_entry.disabled_by
    if disabled_by is None:
        return False
    # RegistryEntryDisabler is a StrEnum; compare on the raw value so this also
    # works when the enum is unavailable (tests/stubs).
    return getattr(disabled_by, "value", disabled_by) == "integration"


def _strip_area_prefix(ent_reg: Any, entity_entry: Any) -> str:
    """Rename ``sensor.keller_e3dc_maestro_x`` back to ``sensor.e3dc_maestro_x``.

    Installs whose device sits in an area got an area prefix from HA, which
    breaks the hardcoded dashboard entity_ids. Skipped when the target is taken.
    """
    domain, object_id = entity_entry.entity_id.split(".", 1)
    idx = object_id.find("e3dc_maestro_")
    if idx <= 0:
        return entity_entry.entity_id
    new_entity_id = f"{domain}.{object_id[idx:]}"
    if ent_reg.async_get(new_entity_id) is not None:
        _LOGGER.warning(
            "E3DC Maestro: kann %s nicht nach %s migrieren – Ziel-entity_id "
            "ist bereits belegt",
            entity_entry.entity_id,
            new_entity_id,
        )
        return entity_entry.entity_id
    _LOGGER.info(
        "E3DC Maestro: entferne Bereichs-Präfix %s -> %s",
        entity_entry.entity_id,
        new_entity_id,
    )
    ent_reg.async_update_entity(entity_entry.entity_id, new_entity_id=new_entity_id)
    return new_entity_id


async def _async_migrate_entity_ids(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Repair registry entries that code changes alone cannot fix.

    Two things happen here, both only relevant for existing installations:
    renaming entity_ids left behind by past `name=` renames, and re-enabling
    sensors that used to ship with `entity_registry_enabled_default=False`.
    """
    ent_reg = er.async_get(hass)
    for entity_entry in er.async_entries_for_config_entry(ent_reg, entry.entry_id):
        if entity_entry.platform != DOMAIN:
            continue
        prefix = f"{entry.entry_id}_"
        if not entity_entry.unique_id.startswith(prefix):
            continue
        key = entity_entry.unique_id[len(prefix):]

        if key not in _KEYS_INTENTIONALLY_DISABLED and _is_disabled_by_integration(
            entity_entry
        ):
            _LOGGER.info(
                "E3DC Maestro: aktiviere %s wieder – die Integration liefert "
                "diese Entity inzwischen standardmäßig aktiviert aus",
                entity_entry.entity_id,
            )
            ent_reg.async_update_entity(entity_entry.entity_id, disabled_by=None)

        current_id = _strip_area_prefix(ent_reg, entity_entry)

        new_object_id = _ENTITY_ID_RENAMES.get(key)
        if new_object_id is None:
            continue

        domain = current_id.split(".", 1)[0]
        new_entity_id = f"{domain}.e3dc_maestro_{new_object_id}"
        if current_id == new_entity_id:
            continue
        if ent_reg.async_get(new_entity_id) is not None:
            _LOGGER.warning(
                "E3DC Maestro: kann %s nicht nach %s migrieren – Ziel-entity_id "
                "ist bereits belegt",
                current_id,
                new_entity_id,
            )
            continue

        _LOGGER.info(
            "E3DC Maestro: migriere entity_id %s -> %s (Dashboard-Rename-Nachzug)",
            current_id,
            new_entity_id,
        )
        ent_reg.async_update_entity(current_id, new_entity_id=new_entity_id)


async def _async_enable_rscp_plant_entities(hass: HomeAssistant) -> None:
    """Enable plant entities that hacs-e3dc disables by default.

    Only ``disabled_by == integration`` on the RSCP config entries. A user
    who turned one of these off keeps that choice. The RSCP entry is reloaded
    once, and only when something actually changed, so the new entities publish
    state before the first control cycle.
    """
    from .panel import _PLANT_ENABLE_KEYS

    ent_reg = er.async_get(hass)
    reload_ids: set[str] = set()
    for rscp_entry in hass.config_entries.async_entries(E3DC_RSCP_DOMAIN):
        for entity_entry in er.async_entries_for_config_entry(ent_reg, rscp_entry.entry_id):
            if getattr(entity_entry, "translation_key", None) not in _PLANT_ENABLE_KEYS:
                continue
            if not _is_disabled_by_integration(entity_entry):
                continue
            _LOGGER.info(
                "E3DC Maestro: aktiviere %s – die Anlagenansicht braucht diese "
                "RSCP-Entity, hacs-e3dc liefert sie standardmäßig deaktiviert",
                entity_entry.entity_id,
            )
            ent_reg.async_update_entity(entity_entry.entity_id, disabled_by=None)
            reload_ids.add(rscp_entry.entry_id)

    for entry_id in reload_ids:
        _LOGGER.info(
            "E3DC Maestro: lade E3DC RSCP neu, damit die aktivierten "
            "Anlagen-Entities Zustände liefern"
        )
        await hass.config_entries.async_reload(entry_id)


PLATFORMS: list[Platform] = [
    Platform.SENSOR,
    Platform.BINARY_SENSOR,
    Platform.NUMBER,
    Platform.SELECT,
    Platform.SWITCH,
    Platform.BUTTON,
]

# Maestro is configured exclusively through its Config Flow.
CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)


async def async_setup(hass: HomeAssistant, config: dict[str, Any]) -> bool:
    """Set up the integration domain (once) and register the dashboard strategy."""
    del config  # unused – config-entry only
    from .dashboard_frontend import async_setup_frontend

    await async_setup_frontend(hass)
    return True


async def async_migrate_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Migrate config entry to the current schema version."""
    _LOGGER.debug("Migrating E3DC Maestro entry from version %s", entry.version)

    if entry.version < 2:
        # Phase B: power_factor removed – drop it from stored options
        new_options = dict(entry.options)
        new_options.pop("power_factor", None)
        hass.config_entries.async_update_entry(entry, options=new_options, version=2)
        _LOGGER.info("Migrated E3DC Maestro config entry to version 2 (power_factor removed)")

    if entry.version < 3:
        # v0.3.1: spreading_enabled wird zum Hardware-Schutz-Default.
        # Bestehende Installationen, die den Schalter nie explizit gesetzt haben
        # (oder ihn auf False stehen haben), werden auf True umgestellt, damit
        # die Auto-Lade-Bursts (0 W ↔ max_charge_power) nicht weiter Hardware
        # stressen. Wer das bewusst nicht möchte, kann den Switch im UI wieder
        # ausschalten.
        new_options = dict(entry.options)
        if not new_options.get("spreading_enabled", False):
            new_options["spreading_enabled"] = True
            _LOGGER.info(
                "E3DC Maestro v0.3.1: Spreading (Ladeverteilung) automatisch "
                "aktiviert – schützt die Hardware vor 0/max-Lade-Bursts. "
                "Kann im UI deaktiviert werden."
            )
        hass.config_entries.async_update_entry(entry, options=new_options, version=3)

    if entry.version < 4:
        # Max. Netzladung/Tag ist nur noch eine Sicherheitsgrenze (0 = keine).
        # Der alte Default von 3 kWh würde die bedarfsbasierte Netzladung
        # ausbremsen; selbst gewählte Werte bleiben.
        new_options = dict(entry.options)
        if new_options.get("max_grid_charge_kwh") == 3.0:
            new_options["max_grid_charge_kwh"] = 0.0
            _LOGGER.info(
                "E3DC Maestro: Max. Netzladung/Tag vom alten Standard 3 kWh auf "
                "0 (keine Grenze) gesetzt – der Wert ist jetzt nur noch eine "
                "Sicherheitsgrenze."
            )
        hass.config_entries.async_update_entry(entry, options=new_options, version=4)

    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up E3DC Maestro from a config entry."""
    # Verify that e3dc_rscp is configured
    rscp_entries = hass.config_entries.async_entries(E3DC_RSCP_DOMAIN)
    if not rscp_entries:
        raise ConfigEntryNotReady(
            f"E3DC Maestro requires the '{E3DC_RSCP_DOMAIN}' integration to be "
            "configured first. Please add the E3DC RSCP integration and restart."
        )
    # e3dc_rscp ist bewusst keine Manifest-Abhängigkeit: sonst startet
    # async_setup erst nach dem RSCP-Verbindungsaufbau, und Browser, die in
    # der Zwischenzeit laden, bekommen für das Strategy-JS ein 404 (Lovelace-
    # Timeout bis zum nächsten vollständigen Reload). Hier also selbst warten.
    loaded = [
        await hass.config_entries.async_wait_component(rscp_entry)
        for rscp_entry in rscp_entries
    ]
    if not any(loaded):
        raise ConfigEntryNotReady(f"'{E3DC_RSCP_DOMAIN}' is not loaded yet")

    # Ensure strategy is available even if async_setup was skipped (edge cases).
    from .dashboard_frontend import async_setup_frontend

    await async_setup_frontend(hass)
    await _async_migrate_entity_ids(hass, entry)
    await _async_enable_rscp_plant_entities(hass)

    # Persist RSCP day/additional sensors when options left them blank (runtime
    # fallback works, but the cockpit then looks unfinished).
    from .config_flow import seed_missing_rscp_source_options

    seeded = seed_missing_rscp_source_options(hass, dict(entry.options))
    if seeded is not None:
        hass.config_entries.async_update_entry(entry, options=seeded)
        _LOGGER.info("E3DC Maestro: fehlende Quell-Sensoren aus RSCP ergänzt")

    coordinator = E3DCMaestroCoordinator(hass, entry)
    await coordinator.async_config_entry_first_refresh()

    hass.data.setdefault(DOMAIN, {})[entry.entry_id] = coordinator

    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)

    from .panel import async_register_panel

    await async_register_panel(hass)

    entry.async_on_unload(entry.add_update_listener(_async_update_listener))

    return True


async def _async_update_listener(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Handle options update – reload so entities pick up new settings.

    Skipped when the change came from a live entity toggle (coordinator sets
    ``skip_reload`` around ``async_update_entry`` calls for that).
    """
    from .coordinator import E3DCMaestroCoordinator
    coordinator: E3DCMaestroCoordinator | None = (
        hass.data.get(DOMAIN, {}).get(entry.entry_id)
    )
    if coordinator is not None and coordinator.skip_reload:
        return
    await hass.config_entries.async_reload(entry.entry_id)


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload E3DC Maestro config entry."""
    coordinator: E3DCMaestroCoordinator = hass.data[DOMAIN][entry.entry_id]
    await coordinator.async_shutdown()

    if unload_ok := await hass.config_entries.async_unload_platforms(entry, PLATFORMS):
        hass.data[DOMAIN].pop(entry.entry_id)
        if not hass.data[DOMAIN]:
            from .panel import async_unregister_panel

            async_unregister_panel(hass)

    return unload_ok
