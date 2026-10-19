"""Aktualisierungsintervall hängt am Coordinator, nicht an MaestroParams."""
from __future__ import annotations

from datetime import timedelta
from types import SimpleNamespace

from custom_components.e3dc_maestro.const import CONF_UPDATE_INTERVAL
from custom_components.e3dc_maestro.coordinator import E3DCMaestroCoordinator


def test_poll_interval_seconds_reads_the_coordinator():
    coordinator = SimpleNamespace(update_interval=timedelta(seconds=30))
    assert E3DCMaestroCoordinator.poll_interval_seconds(coordinator) == 30.0
    coordinator.update_interval = None
    assert E3DCMaestroCoordinator.poll_interval_seconds(coordinator) is None


def test_set_poll_interval_persists_and_reschedules():
    saved: dict[str, int] = {}
    scheduled: dict[str, bool] = {}
    coordinator = E3DCMaestroCoordinator.__new__(E3DCMaestroCoordinator)
    coordinator.update_param = lambda key, value: saved.__setitem__(key, value)  # type: ignore[method-assign]
    coordinator._listeners = {object(): (None, None)}
    coordinator._schedule_refresh = lambda: scheduled.__setitem__("called", True)  # type: ignore[method-assign]

    coordinator.set_poll_interval(45)

    assert saved[CONF_UPDATE_INTERVAL] == 45
    assert coordinator.update_interval == timedelta(seconds=45)
    assert scheduled["called"] is True


def test_set_poll_interval_waits_for_the_first_listener():
    coordinator = E3DCMaestroCoordinator.__new__(E3DCMaestroCoordinator)
    coordinator.update_param = lambda key, value: None  # type: ignore[method-assign]
    coordinator._listeners = {}
    coordinator._schedule_refresh = lambda: (_ for _ in ()).throw(AssertionError("scheduled"))  # type: ignore[method-assign]

    coordinator.set_poll_interval(20)

    assert coordinator.update_interval == timedelta(seconds=20)
