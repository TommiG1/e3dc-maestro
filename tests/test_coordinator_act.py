"""RSCP-Übergänge aus dem Lademodus zurück in NORMAL (Fake-Coordinator)."""
from __future__ import annotations

import asyncio
from collections import deque

from custom_components.e3dc_maestro.const import (
    PHASE_CORRIDOR,
    PHASE_RESERVE_PROTECTION,
    POWER_MODE_CHARGE,
    POWER_MODE_NORMAL,
    SERVICE_CLEAR_POWER_LIMITS,
    SERVICE_SET_POWER_LIMITS,
    SERVICE_SET_POWER_MODE,
)
from custom_components.e3dc_maestro.control_engine import (
    MaestroDecision,
    MaestroParams,
    MaestroState,
)
from custom_components.e3dc_maestro.coordinator_act import CoordinatorActMixin


class _Fake(CoordinatorActMixin):
    def __init__(self, prev: MaestroDecision, sent_charge: int | None, sent_discharge: int | None):
        self._shutting_down = False
        self._params = MaestroParams()
        self.last_decision = prev
        self._last_rscp_act_ok = True
        self._last_sent_charge_limit = sent_charge
        self._last_sent_discharge_limit = sent_discharge
        self._action_history: deque = deque(maxlen=8)
        self.last_action_info = None
        self.calls: list[tuple[str, dict]] = []

    async def _call_e3dc(self, service: str, data: dict) -> bool:
        self.calls.append((service, data))
        return True

    def _log(self, _msg: str) -> None:
        pass

    def _can_manual_charge(self) -> bool:
        return False


def _state() -> MaestroState:
    return MaestroState(
        soc=30.0, pv_power=0.0, grid_power=0.0, battery_power=0.0, house_power=1300.0
    )


def _grid_charge() -> MaestroDecision:
    return MaestroDecision(
        phase=PHASE_RESERVE_PROTECTION,
        reason="Netzladung bis zur Reserve",
        power_mode=POWER_MODE_CHARGE,
        charge_power_limit=9000.0,
        discharge_power_limit=0.0,
    )


def test_reserve_reached_ends_grid_charge_mode():
    """SoC erreicht die Reserve: Netzladung muss enden, nur die Entladung bleibt gesperrt."""
    c = _Fake(_grid_charge(), sent_charge=9000, sent_discharge=0)
    decision = MaestroDecision(
        phase=PHASE_RESERVE_PROTECTION,
        reason="Entladung gesperrt",
        power_mode=POWER_MODE_NORMAL,
        discharge_power_limit=0.0,
    )
    asyncio.run(c._async_act(decision, _state(), {}, None))

    assert c.calls == [
        (SERVICE_CLEAR_POWER_LIMITS, {}),
        (SERVICE_SET_POWER_MODE, {"power_mode": POWER_MODE_NORMAL}),
        (SERVICE_SET_POWER_LIMITS, {"max_discharge": 0}),
    ]
    assert c._last_sent_charge_limit is None
    assert c._last_sent_discharge_limit == 0


def test_discharge_lock_without_mode_change_only_sets_limit():
    """Ohne vorherige Ladung bleibt es beim reinen Entlade-Cap (z. B. EVCC Now)."""
    prev = MaestroDecision(phase=PHASE_CORRIDOR, reason="x", power_mode=POWER_MODE_NORMAL)
    c = _Fake(prev, sent_charge=None, sent_discharge=None)
    decision = MaestroDecision(
        phase=PHASE_RESERVE_PROTECTION,
        reason="Entladung gesperrt",
        power_mode=POWER_MODE_NORMAL,
        discharge_power_limit=0.0,
    )
    asyncio.run(c._async_act(decision, _state(), {}, None))

    assert c.calls == [(SERVICE_SET_POWER_LIMITS, {"max_discharge": 0})]


def test_clear_after_charge_mode_resets_power_mode():
    """Wechsel aus CHARGE in NORMAL ohne Limits setzt den Modus explizit zurück."""
    c = _Fake(_grid_charge(), sent_charge=9000, sent_discharge=0)
    decision = MaestroDecision(phase=PHASE_CORRIDOR, reason="x", power_mode=POWER_MODE_NORMAL)
    asyncio.run(c._async_act(decision, _state(), {}, None))

    assert c.calls == [
        (SERVICE_CLEAR_POWER_LIMITS, {}),
        (SERVICE_SET_POWER_MODE, {"power_mode": POWER_MODE_NORMAL}),
    ]
    assert c._last_sent_charge_limit is None
