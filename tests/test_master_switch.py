"""Der Hauptschalter behält An und Aus über einen Neustart."""
from __future__ import annotations

from datetime import datetime, timezone
from types import SimpleNamespace

from custom_components.e3dc_maestro.const import CONF_REGELUNG_AKTIV, CONF_REGELUNG_PAUSE_UNTIL
from custom_components.e3dc_maestro.coordinator import (
    E3DCMaestroCoordinator,
    pause_until_from_options,
    regelung_aktiv_from_options,
)


def test_missing_option_stays_on():
    assert regelung_aktiv_from_options({}) is True


def test_stored_off_stays_off():
    assert regelung_aktiv_from_options({CONF_REGELUNG_AKTIV: False}) is False


def test_stored_on_stays_on():
    assert regelung_aktiv_from_options({CONF_REGELUNG_AKTIV: True}) is True


def _coordinator(options: dict) -> tuple[E3DCMaestroCoordinator, SimpleNamespace]:
    entry = SimpleNamespace(options=dict(options))
    hass = SimpleNamespace()

    def async_update_entry(_entry, options):
        _entry.options = options

    hass.config_entries = SimpleNamespace(async_update_entry=async_update_entry)
    coordinator = E3DCMaestroCoordinator.__new__(E3DCMaestroCoordinator)
    coordinator.entry = entry
    coordinator.hass = hass
    coordinator._skip_reload = False
    coordinator.regelung_aktiv = regelung_aktiv_from_options(options)
    coordinator.regelung_pause_until = None if coordinator.regelung_aktiv else pause_until_from_options(options)
    coordinator._create_background_task = lambda *_args, **_kwargs: None
    coordinator.async_update_listeners = lambda: None
    return coordinator, entry


def test_turning_off_is_stored():
    coordinator, entry = _coordinator({})
    coordinator.set_regelung_aktiv(False)
    assert coordinator.regelung_aktiv is False
    assert entry.options[CONF_REGELUNG_AKTIV] is False
    assert coordinator._skip_reload is False


def test_restart_reads_the_stored_off_position():
    _, entry = _coordinator({})
    entry.options[CONF_REGELUNG_AKTIV] = False
    restored, _ = _coordinator(entry.options)
    assert restored.regelung_aktiv is False


def test_pause_end_survives_restart_and_turns_control_back_on():
    end = datetime(2026, 10, 20, 8, 0, tzinfo=timezone.utc)
    coordinator, entry = _coordinator({
        CONF_REGELUNG_AKTIV: False,
        CONF_REGELUNG_PAUSE_UNTIL: end.timestamp(),
    })
    assert coordinator.regelung_pause_until == end.timestamp()
    coordinator.resume_pause_if_due(datetime(2026, 10, 20, 7, 0, tzinfo=timezone.utc))
    assert coordinator.regelung_aktiv is False
    coordinator.resume_pause_if_due(end)
    assert coordinator.regelung_aktiv is True
    assert CONF_REGELUNG_PAUSE_UNTIL not in entry.options
    assert entry.options[CONF_REGELUNG_AKTIV] is True
