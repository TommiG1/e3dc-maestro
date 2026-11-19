"""Integration: Wallbox-Lademodi in Optionen, Ansteuerung und Abstecken."""
from __future__ import annotations

import asyncio
from collections import deque
from dataclasses import replace
from types import SimpleNamespace
from unittest.mock import patch

from custom_components.e3dc_maestro import coordinator_act
from custom_components.e3dc_maestro.const import (
    CONF_WALLBOX_MODE,
    CONF_WALLBOX_MODE_RESET,
    CONF_WALLBOX_MAX_PRICE,
    CONF_WALLBOX_TYPE,
    E3DC_RSCP_DOMAIN,
    SERVICE_SET_WALLBOX_CURRENT,
    WALLBOX_TYPE_E3DC,
)
from custom_components.e3dc_maestro.control_engine import (
    MaestroParams,
    MaestroState,
    WALLBOX_MODE_SOLAR,
)
from custom_components.e3dc_maestro.coordinator import E3DCMaestroCoordinator
from custom_components.e3dc_maestro.coordinator_act import CoordinatorActMixin, dt_util
from custom_components.e3dc_maestro.coordinator_helpers import _params_from_options


def _params(**kw) -> MaestroParams:
    base = dict(
        wallbox_enabled=True,
        wallbox_phases=3,
        wallbox_min_current=6,
        wallbox_max_current=16,
        wallbox_min_surplus=1400,
    )
    base.update(kw)
    return MaestroParams(**base)


def _state(pv: float, house: float = 500.0, **kw) -> MaestroState:
    return MaestroState(
        soc=60,
        pv_power=pv,
        house_power=house,
        grid_power=0,
        battery_power=0,
        **kw,
    )


def test_params_from_options_max_price_zero_is_none():
    p = _params_from_options({CONF_WALLBOX_MAX_PRICE: 0})
    assert p.wallbox_max_price is None
    p2 = _params_from_options({CONF_WALLBOX_MAX_PRICE: 0.15})
    assert p2.wallbox_max_price == 0.15


def test_params_from_options_invalid_mode_defaults_solar():
    p = _params_from_options({CONF_WALLBOX_MODE: "invalid"})
    assert p.wallbox_mode == WALLBOX_MODE_SOLAR


class _Fake(CoordinatorActMixin):
    def __init__(self, states: dict[str, str] | None = None, fail: bool = False):
        self._params = _params()
        self._last_wallbox_current = None
        self._e3dc_wallbox = None
        self._wallbox_toggled_at = None
        self._wallbox_retry_after = None
        self._wallbox_history = deque(maxlen=30)
        self._e3dc_device_id = "hub"
        self._consecutive_rscp_failures = 0
        self._rscp_watchdog_notified = False
        self.current_price = None
        self.calls: list[tuple[str, str, dict]] = []
        self.logs: list[str] = []
        st = {k: SimpleNamespace(state=v) for k, v in (states or {}).items()}

        async def _call(domain, service, data, blocking=False):
            if fail:
                raise asyncio.TimeoutError
            self.calls.append((domain, service, data))

        self.hass = SimpleNamespace(
            states=SimpleNamespace(get=st.get),
            services=SimpleNamespace(async_call=_call),
        )

    def _log(self, msg: str) -> None:
        self.logs.append(msg)


def _registry():
    def ent(entity_id, key, device="wb1"):
        return SimpleNamespace(
            entity_id=entity_id,
            platform=E3DC_RSCP_DOMAIN,
            disabled_by=None,
            device_id=device,
            translation_key=key,
        )

    entities = {
        "a": ent("sensor.soc", "battery-soc", device="hub"),
        "b": ent("button.wb_toggle", "wallbox-toggle-wallbox-charging"),
        "c": ent("binary_sensor.wb_canceled", "wallbox-charging-canceled"),
    }
    return SimpleNamespace(entities=entities)


def _run(c: _Fake, state: MaestroState, opts: dict) -> None:
    with patch.object(coordinator_act.er, "async_get", return_value=_registry(), create=True):
        asyncio.run(c._async_act_wallbox(state, opts))


E3DC = {CONF_WALLBOX_TYPE: WALLBOX_TYPE_E3DC}


def test_act_now_mode_starts_at_max_without_surplus():
    c = _Fake({"binary_sensor.wb_canceled": "off"})
    c._params = _params(wallbox_mode="now")
    _run(c, _state(1000), E3DC)
    assert c._last_wallbox_current == 16
    assert any("Sofort" in log for log in c.logs)
    start_events = [e for e in c._wallbox_history if e["kind"] == "start"]
    assert start_events and start_events[0].get("from_grid") is True


def test_act_solar_grid_cheap_price_starts_without_surplus():
    c = _Fake({"binary_sensor.wb_canceled": "off"})
    c._params = _params(wallbox_mode="solar_grid", wallbox_max_price=0.30)
    c.current_price = 0.08
    _run(c, _state(1000), E3DC)
    assert c._last_wallbox_current == 16
    assert any(e.get("from_grid") for e in c._wallbox_history)


class _CoordStub:
    """Minimale Koordinator-Hülle für Abstecken → Modus zurücksetzen."""

    def __init__(self, *, mode: str, reset: bool):
        self.entry = SimpleNamespace(
            options={
                CONF_WALLBOX_MODE: mode,
                CONF_WALLBOX_MODE_RESET: reset,
            }
        )
        self._params = MaestroParams(wallbox_enabled=True, wallbox_mode=mode)
        self._wallbox_plugged = True
        self._wallbox_history: list[dict] = []
        self.logs: list[str] = []
        self._skip_reload = False
        self.hass = SimpleNamespace(
            config_entries=SimpleNamespace(
                async_update_entry=lambda entry, options: setattr(entry, "options", options)
            )
        )

    def _log(self, msg: str) -> None:
        self.logs.append(msg)

    def _wallbox_record(self, kind: str, **data) -> None:
        self._wallbox_history.append({"kind": kind, **data})

    def update_param(self, key: str, value) -> None:
        from custom_components.e3dc_maestro.control_engine import WALLBOX_MODES, WALLBOX_MODE_SOLAR

        new_options = dict(self.entry.options)
        if key == CONF_WALLBOX_MODE:
            if value not in WALLBOX_MODES:
                value = WALLBOX_MODE_SOLAR
            setattr(self._params, key, value)
        elif hasattr(self._params, key):
            setattr(self._params, key, value)
        new_options[key] = value
        self.entry.options = new_options


def _simulate_unplug(coord: _CoordStub) -> None:
    E3DCMaestroCoordinator._maybe_reset_wallbox_mode(coord, False)
    coord._wallbox_plugged = False


def test_unplug_resets_now_to_solar_when_enabled():
    c = _CoordStub(mode="now", reset=True)
    _simulate_unplug(c)
    assert c._params.wallbox_mode == WALLBOX_MODE_SOLAR
    assert c.entry.options[CONF_WALLBOX_MODE] == WALLBOX_MODE_SOLAR
    assert any(e["kind"] == "mode_reset" for e in c._wallbox_history)


def test_unplug_leaves_solar_grid_unchanged():
    c = _CoordStub(mode="solar_grid", reset=True)
    before = c._params.wallbox_mode
    _simulate_unplug(c)
    assert c._params.wallbox_mode == before
    assert not any(e["kind"] == "mode_reset" for e in c._wallbox_history)


def test_unplug_keeps_now_when_reset_disabled():
    c = _CoordStub(mode="now", reset=False)
    _simulate_unplug(c)
    assert c._params.wallbox_mode == "now"


def test_unplugged_at_first_read_after_restart_resets_now():
    c = _CoordStub(mode="now", reset=True)
    c._wallbox_plugged = None
    _simulate_unplug(c)
    assert c._params.wallbox_mode == WALLBOX_MODE_SOLAR


def test_staying_unplugged_does_not_reset_again():
    c = _CoordStub(mode="now", reset=True)
    c._wallbox_plugged = False
    E3DCMaestroCoordinator._maybe_reset_wallbox_mode(c, False)
    assert c._params.wallbox_mode == "now"