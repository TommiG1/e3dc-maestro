"""RSCP actuation, wallbox/HP control, and watchdogs for E3DC Maestro."""
from __future__ import annotations

import asyncio
import dataclasses
import math
import logging
from datetime import timedelta
from typing import Any

from homeassistant.components import persistent_notification
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers import entity_registry as er
from homeassistant.util import dt as dt_util

from .const import (
    CONF_BATTERY_POWER_SENSOR,
    CONF_GRID_POWER_SENSOR,
    CONF_HOUSE_POWER_SENSOR,
    CONF_HP_ENABLED,
    CONF_HP_SERVICE_OFF,
    CONF_HP_SERVICE_ON,
    CONF_HP_SWITCH_ENTITY,
    CONF_PV_POWER_SENSOR,
    CONF_SOC_SENSOR,
    CONF_WALLBOX_CURRENT_ENTITY,
    CONF_WALLBOX_ENABLED,
    CONF_WALLBOX_SERVICE_OFF,
    CONF_WALLBOX_SERVICE_ON,
    CONF_WALLBOX_PHASES_ENTITY,
    CONF_WALLBOX_TYPE,
    CONF_WATCHDOG_TIMEOUT,
    DEFAULT_WATCHDOG_TIMEOUT,
    E3DC_RSCP_DOMAIN,
    MANUAL_CHARGE_MIN_INTERVAL_HOURS,
    POWER_MODE_DISCHARGE,
    POWER_MODE_NORMAL,
    SERVICE_CLEAR_POWER_LIMITS,
    SERVICE_MANUAL_CHARGE,
    SERVICE_SET_POWER_LIMITS,
    SERVICE_SET_POWER_MODE,
    SERVICE_SET_WALLBOX_CURRENT,
    WALLBOX_RETRY_SECONDS,
    WALLBOX_TOGGLE_COOLDOWN_SECONDS,
    WALLBOX_TYPE_E3DC,
)
from .control_engine import (
    MaestroDecision,
    MaestroState,
    hp_action_explanation,
    hp_desired_state,
    hp_surplus_w,
    wallbox_desired_current,
)
from .coordinator_helpers import (
    E3DC_RSCP_POWER_MODE_MAP,
    _action_history_changed,
    _build_power_mode_data,
    _effective_discharge_limit_w,
    _limits_changed_vs_sent_values,
    config_wallbox_phases_int,
    parse_wallbox_phases_value,
)

_LOGGER = logging.getLogger(__name__)

def _surplus_w(state: MaestroState) -> int:
    return round(state.pv_power - state.house_power - max(state.battery_power, 0))


# e3dc_rscp translation_key -> Rolle für die Wallbox-Steuerung
_E3DC_WALLBOX_ROLES = {
    "wallbox-toggle-wallbox-charging": "toggle",
    "wallbox-charging-canceled": "canceled",
    "wallbox-phases": "phases",
}


class CoordinatorActMixin:
    def _create_background_task(self, coro: Any, name: str) -> None:
        """Schedule a background task that is cancelled on shutdown."""
        if self._shutting_down:
            if hasattr(coro, "close"):
                coro.close()
            return
        task = self.hass.async_create_task(coro, name=name)
        self._background_tasks.add(task)

        def _done(t: asyncio.Task[Any]) -> None:
            self._background_tasks.discard(t)

        task.add_done_callback(_done)


    async def _async_schedule_act(
        self,
        decision: MaestroDecision,
        state: MaestroState,
        opts: dict,
        current_price: float | None,
    ) -> None:
        """Queue actuation so the poll cycle is not blocked by RSCP I/O.

        Pending payloads coalesce (last write wins). A single serial worker
        processes them so service order stays deterministic.
        """
        if self._shutting_down:
            return
        self._pending_act = (decision, state, opts, current_price)
        if self._act_task is not None and not self._act_task.done():
            return

        async def _worker() -> None:
            try:
                while True:
                    async with self._act_lock:
                        pending = self._pending_act
                        self._pending_act = None
                    if pending is None:
                        return
                    await self._async_act(*pending)
            finally:
                self._act_task = None
                # A new payload may have arrived after we cleared pending.
                if self._pending_act is not None and not self._shutting_down:
                    self._act_task = self.hass.async_create_task(
                        _worker(), name="e3dc_maestro_act_worker"
                    )
                    self._background_tasks.add(self._act_task)

                    def _done(t: asyncio.Task[Any]) -> None:
                        self._background_tasks.discard(t)

                    self._act_task.add_done_callback(_done)

        self._act_task = self.hass.async_create_task(
            _worker(), name="e3dc_maestro_act_worker"
        )
        self._background_tasks.add(self._act_task)

        def _done(t: asyncio.Task[Any]) -> None:
            self._background_tasks.discard(t)

        self._act_task.add_done_callback(_done)


    def _limits_changed_vs_sent(self, decision: MaestroDecision) -> bool:
        """True when decision limits differ enough from last RSCP call to resend."""
        return _limits_changed_vs_sent_values(
            decision.charge_power_limit,
            _effective_discharge_limit_w(decision, self._params.max_charge_power),
            self._last_sent_charge_limit,
            self._last_sent_discharge_limit,
        )


    async def _async_act(
        self,
        decision: MaestroDecision,
        state: MaestroState,
        opts: dict,
        current_price: float | None,
    ) -> None:
        """Translate decision into e3dc_rscp service calls."""
        if self._shutting_down:
            return

        prev = self.last_decision
        needs_retry = not self._last_rscp_act_ok

        # Power mode / limits
        mode_changed = prev is None or prev.power_mode != decision.power_mode or needs_retry
        limits_changed = self._limits_changed_vs_sent(decision) or needs_retry
        act_attempted = False
        act_ok = True

        if mode_changed or limits_changed:
            act_attempted = True
            if decision.power_mode == POWER_MODE_NORMAL and decision.charge_power_limit is None and decision.discharge_power_limit is None:
                ok = await self._call_e3dc(SERVICE_CLEAR_POWER_LIMITS, {})
                # clear_power_limits beendet keinen aktiven CHARGE/DISCHARGE-
                # Modus – die E3DC würde sonst weiter aus dem Netz laden.
                if ok and mode_changed:
                    ok = await self._call_e3dc(
                        SERVICE_SET_POWER_MODE, {"power_mode": POWER_MODE_NORMAL}
                    )
                act_ok = ok
                if ok:
                    self._last_sent_charge_limit = None
                    self._last_sent_discharge_limit = None
                    self._log(f"[{decision.phase}] clear_power_limits → {decision.reason}")
            elif decision.power_mode == POWER_MODE_NORMAL and decision.charge_power_limit is None and decision.discharge_power_limit is not None:
                # Nur Entladung begrenzen (z. B. EVCC Now-Modus) – kein Ladebefehl
                _max_discharge_w = max(0, int(decision.discharge_power_limit))
                ok = True
                if ok and mode_changed:
                    ok = await self._call_e3dc(
                        SERVICE_SET_POWER_MODE, {"power_mode": POWER_MODE_NORMAL}
                    )
                if ok:
                    # max_charge explizit öffnen: set_power_limits sendet nur die
                    # übergebenen Tags, ein altes Lade-Cap (z. B. 0/1 W aus Preisplan,
                    # Hard-Cap oder vor einem HA-Neustart) bliebe sonst auf der E3DC
                    # bestehen und der PV-Überschuss ginge ins Netz statt in den Akku.
                    ok = await self._call_e3dc(
                        SERVICE_SET_POWER_LIMITS,
                        {
                            "max_charge": max(0, int(self._params.max_charge_power)),
                            "max_discharge": _max_discharge_w,
                        },
                    )
                act_ok = ok
                if ok:
                    # Lade-Cap ist offen (= "kein Cap") → als nicht gesetzt tracken,
                    # passend zu decision.charge_power_limit is None.
                    self._last_sent_charge_limit = None
                    self._last_sent_discharge_limit = _max_discharge_w
                    self._log(
                        f"[{decision.phase}] set_power_limits max_discharge={_max_discharge_w}W → {decision.reason}"
                    )
            elif decision.power_mode is not None:
                # E3DC-RSCP erwartet: max_charge >= 0 (set_power_limits) und
                # power_mode mit power_value NUR bei CHARGE/DISCHARGE. Im
                # NORMAL-Modus reicht das Lade-Cap aus; ein zusätzliches
                # power_value verwirrt manche Firmwares.
                limits_data: dict[str, Any] = {}
                if decision.charge_power_limit is not None:
                    limits_data["max_charge"] = max(0, int(decision.charge_power_limit))
                _effective_discharge = _effective_discharge_limit_w(
                    decision, self._params.max_charge_power
                )
                if _effective_discharge is not None:
                    limits_data["max_discharge"] = _effective_discharge
                limits_ok = True
                if limits_data:
                    limits_ok = await self._call_e3dc(
                        SERVICE_SET_POWER_LIMITS,
                        limits_data,
                    )
                power_mode_data = _build_power_mode_data(
                    decision.power_mode,
                    decision.charge_power_limit,
                    decision.discharge_power_limit,
                )
                mode_ok = await self._call_e3dc(
                    SERVICE_SET_POWER_MODE,
                    power_mode_data,
                )
                act_ok = limits_ok and mode_ok
                if limits_ok:
                    if "max_charge" in limits_data:
                        self._last_sent_charge_limit = limits_data["max_charge"]
                    if "max_discharge" in limits_data:
                        self._last_sent_discharge_limit = limits_data["max_discharge"]
                    if (
                        decision.power_mode == POWER_MODE_DISCHARGE
                        and decision.discharge_power_limit is not None
                        and mode_ok
                    ):
                        self._last_sent_discharge_limit = int(decision.discharge_power_limit)
                if act_ok:
                    _action_w = (
                        decision.charge_power_limit
                        if decision.charge_power_limit is not None
                        else decision.discharge_power_limit
                    )
                    self._log(
                        f"[{decision.phase}] mode={decision.power_mode} "
                        f"power={_action_w}W → {decision.reason}"
                    )
            if act_ok:
                _now_local = dt_util.now()
                _charge_limit = (
                    int(round(decision.charge_power_limit))
                    if decision.charge_power_limit is not None
                    else None
                )
                self.last_action_info = {
                    "phase": decision.phase,
                    "reason": decision.reason,
                    "power_mode": decision.power_mode,
                    "charge_power_limit": _charge_limit,
                    # Tatsächlich per e3dc_rscp gesendete Caps – Diagnose für
                    # "Soll != Ist auf der E3DC" (z. B. Debounce-Drift).
                    "sent_charge_power_limit": self._last_sent_charge_limit,
                    "sent_discharge_power_limit": self._last_sent_discharge_limit,
                    "timestamp": _now_local.isoformat(timespec="seconds"),
                    "timestamp_display": _now_local.strftime("%d.%m.%Y %H:%M:%S"),
                }
                # News-Ticker-Historie: nur bei geändertem (phase, reason) anhängen,
                # damit identische Folge-Ticks (gleicher Grund) nicht spammen.
                _last_hist = self._action_history[0] if self._action_history else None
                if _action_history_changed(_last_hist, decision.phase, decision.reason):
                    # Compact Warum snapshot so "Warum war es um HH:MM so?" works
                    # without replaying decide() against lost live state.
                    _trace = getattr(decision, "trace", None)
                    _snap: dict[str, Any] = {
                        "winning_gate": getattr(_trace, "winning_gate", None),
                    }
                    if _trace is not None:
                        # Gate names + pass/fail only — keeps the ring buffer small.
                        _snap["path"] = [
                            {"name": g.name, "result": g.result}
                            for g in _trace.gates
                        ]
                        if _trace.winning_gate:
                            _won = next(
                                (g for g in _trace.gates if g.name == _trace.winning_gate),
                                None,
                            )
                            if _won is not None:
                                _snap["terms"] = [
                                    {
                                        "name": t.name,
                                        "actual": t.actual,
                                        "expected": t.expected,
                                        "setting_key": t.setting_key,
                                        "passed": t.passed,
                                    }
                                    for t in _won.terms
                                ]
                    self._action_history.appendleft(
                        {
                            "phase": decision.phase,
                            "reason": decision.reason,
                            "power_mode": decision.power_mode,
                            "charge_power_limit": _charge_limit,
                            "timestamp": _now_local.isoformat(timespec="seconds"),
                            "timestamp_display": _now_local.strftime("%d.%m.%Y %H:%M:%S"),
                            "warum_snapshot": _snap,
                        }
                    )

        if act_attempted:
            self._last_rscp_act_ok = act_ok

        # Manual charge (dynamic tariff)
        if decision.manual_charge_kwh and self._can_manual_charge():
            ok = await self._call_e3dc(
                SERVICE_MANUAL_CHARGE,
                {"charge_amount": int(decision.manual_charge_kwh * 1000)},
            )
            if ok:
                self._last_manual_charge = dt_util.utcnow()
                self._log(f"manual_charge {decision.manual_charge_kwh:.1f} kWh")

        # Wallbox
        if opts.get(CONF_WALLBOX_ENABLED):
            await self._async_act_wallbox(state, opts)

        # Heat pump
        if opts.get(CONF_HP_ENABLED) and self.regelung_aktiv:
            await self._async_control_hp(state, opts, current_price)


    async def _async_act_wallbox(self, state: MaestroState, opts: dict) -> None:
        desired_current, turn_off = wallbox_desired_current(state, self._params, self._last_wallbox_current or 0)
        now = dt_util.utcnow()
        if self._wallbox_retry_after is not None and now < self._wallbox_retry_after:
            return
        last = self._last_wallbox_current
        e3dc = opts.get(CONF_WALLBOX_TYPE, WALLBOX_TYPE_E3DC) == WALLBOX_TYPE_E3DC

        if turn_off:
            if last == 0:
                return
            ok = await (self._e3dc_wallbox_stop() if e3dc else self._generic_wallbox_stop(opts))
            if ok:
                self._last_wallbox_current = 0
                self._log("Wallbox ausgeschaltet (kein Überschuss)")
                self._wallbox_record("stop", surplus_w=_surplus_w(state))
        elif desired_current is not None:
            if last and abs(desired_current - last) < 1.0:
                return
            ok = await (
                self._e3dc_wallbox_start(desired_current)
                if e3dc
                else self._generic_wallbox_start(opts, desired_current, resume=not last)
            )
            if ok:
                self._last_wallbox_current = desired_current
                self._log(f"Wallbox {desired_current:.0f}A (Überschuss)")
                self._wallbox_record(
                    "current" if last else "start",
                    current=int(desired_current),
                    surplus_w=_surplus_w(state),
                )
        else:
            return
        if not ok and self._wallbox_retry_after is None:
            self._wallbox_record("error")
        self._wallbox_retry_after = None if ok else now + timedelta(seconds=WALLBOX_RETRY_SECONDS)

    def _wallbox_record(self, kind: str, **data: Any) -> None:
        """Ereignis für den Wallbox-Verlauf im Panel (neueste zuerst)."""
        self._wallbox_history.appendleft(
            {"timestamp": dt_util.now().isoformat(timespec="seconds"), "kind": kind, **data}
        )

    def _wallbox_phases_entity_id(self, opts: dict) -> str | None:
        """Configured phase entity or E3DC wallbox-phases sensor when type is e3dc."""
        eid = opts.get(CONF_WALLBOX_PHASES_ENTITY)
        if eid:
            return eid
        if not opts.get(CONF_WALLBOX_ENABLED):
            return None
        if opts.get(CONF_WALLBOX_TYPE, WALLBOX_TYPE_E3DC) != WALLBOX_TYPE_E3DC:
            return None
        wb = self._e3dc_wallbox_entities()
        if wb is None:
            return None
        return wb.get("phases")

    def _update_wallbox_phases(self, opts: dict) -> None:
        """Lese Phasenzahl live ein und schreibe sie in MaestroParams für diese Runde."""
        config_phases = config_wallbox_phases_int(opts)
        entity_id = self._wallbox_phases_entity_id(opts)
        self._wallbox_phases_entity_effective = entity_id

        if entity_id:
            st = self.hass.states.get(entity_id)
            parsed = parse_wallbox_phases_value(st.state if st else None)
            if parsed is not None:
                self._wallbox_phases_latched = parsed
            if self._wallbox_phases_latched is not None:
                effective = self._wallbox_phases_latched
                self._wallbox_phases_source = "sensor"
            else:
                effective = config_phases
                self._wallbox_phases_source = "config"
        else:
            self._wallbox_phases_latched = None
            effective = config_phases
            self._wallbox_phases_source = "config"

        self._params = dataclasses.replace(self._params, wallbox_phases=effective)
        if self._auto_params is not None:
            self._auto_params = dataclasses.replace(
                self._auto_params, wallbox_phases=effective
            )

    def _e3dc_wallbox_entities(self) -> dict[str, str] | None:
        """Wallbox device plus charging toggle/canceled entities from e3dc_rscp."""
        if self._e3dc_wallbox is not None:
            return self._e3dc_wallbox
        by_device: dict[str, dict[str, str]] = {}
        for ent in er.async_get(self.hass).entities.values():
            if ent.platform != E3DC_RSCP_DOMAIN or ent.disabled_by is not None or not ent.device_id:
                continue
            role = _E3DC_WALLBOX_ROLES.get(ent.translation_key or "")
            if role:
                by_device.setdefault(ent.device_id, {})[role] = ent.entity_id
        for device_id in sorted(by_device):
            if "toggle" in by_device[device_id]:
                self._e3dc_wallbox = {"device_id": device_id, **by_device[device_id]}
                return self._e3dc_wallbox
        _LOGGER.warning("E3DC Maestro: keine E3DC-Wallbox in e3dc_rscp gefunden")
        return None

    def _e3dc_wallbox_canceled(self, wb: dict[str, str]) -> bool | None:
        """True wenn das Laden an der E3DC-Wallbox abgebrochen ist, None wenn unbekannt."""
        st = self.hass.states.get(wb.get("canceled", ""))
        if st is None or st.state not in ("on", "off"):
            return None
        return st.state == "on"

    async def _e3dc_wallbox_toggle(self, wb: dict[str, str]) -> bool:
        """Lade-Toggle drücken; nie zweimal kurz hintereinander (Status hängt nach)."""
        now = dt_util.utcnow()
        if (
            self._wallbox_toggled_at is not None
            and (now - self._wallbox_toggled_at).total_seconds() < WALLBOX_TOGGLE_COOLDOWN_SECONDS
        ):
            return False
        try:
            await self.hass.services.async_call(
                "button", "press", {"entity_id": wb["toggle"]}, blocking=True
            )
        except (HomeAssistantError, ValueError, asyncio.TimeoutError) as err:
            _LOGGER.warning("Wallbox-Toggle fehlgeschlagen: %s", err)
            return False
        self._wallbox_toggled_at = now
        return True

    async def _e3dc_wallbox_start(self, current: float) -> bool:
        wb = self._e3dc_wallbox_entities()
        if wb is None:
            return False
        ok = await self._call_e3dc(
            SERVICE_SET_WALLBOX_CURRENT,
            {"max_charge_current": int(current)},
            device_id=wb["device_id"],
            watchdog=False,
        )
        if ok and self._e3dc_wallbox_canceled(wb):
            ok = await self._e3dc_wallbox_toggle(wb)
        return ok

    async def _e3dc_wallbox_stop(self) -> bool:
        # e3dc_rscp lehnt 0 A ab; Stoppen geht nur über den Lade-Toggle.
        wb = self._e3dc_wallbox_entities()
        if wb is None:
            return False
        canceled = self._e3dc_wallbox_canceled(wb)
        if canceled is None:
            _LOGGER.warning("Wallbox aus: Status 'Laden abgebrochen' unbekannt, Toggle ausgelassen")
            return False
        if canceled:
            return True
        return await self._e3dc_wallbox_toggle(wb)

    async def _generic_wallbox_start(self, opts: dict, current: float, *, resume: bool) -> bool:
        try:
            current_entity = opts.get(CONF_WALLBOX_CURRENT_ENTITY)
            if current_entity:
                await self.hass.services.async_call(
                    current_entity.split(".", 1)[0],
                    "set_value",
                    {"entity_id": current_entity, "value": int(current)},
                    blocking=True,
                )
            if resume and opts.get(CONF_WALLBOX_SERVICE_ON):
                await self._call_generic_service(opts[CONF_WALLBOX_SERVICE_ON])
        except (HomeAssistantError, ValueError, asyncio.TimeoutError) as err:
            _LOGGER.warning("Wallbox ein: %s", err)
            return False
        return True

    async def _generic_wallbox_stop(self, opts: dict) -> bool:
        if not opts.get(CONF_WALLBOX_SERVICE_OFF):
            return True
        try:
            await self._call_generic_service(opts[CONF_WALLBOX_SERVICE_OFF])
        except (HomeAssistantError, ValueError, asyncio.TimeoutError) as err:
            _LOGGER.warning("Wallbox aus: %s", err)
            return False
        return True


    def _sync_hp_running(self, opts: dict) -> None:
        """Adopt the real switch state (restart, manual switching)."""
        entity_id = opts.get(CONF_HP_SWITCH_ENTITY)
        st = self.hass.states.get(entity_id) if entity_id else None
        if st is None or st.state not in ("on", "off"):
            return
        real = st.state == "on"
        if real != self._hp_running:
            self._hp_running = real
            self._hp_last_change = dt_util.utcnow()
            msg = f"Wärmepumpe läuft extern {'an' if real else 'aus'}, übernommen"
            self._hp_record(msg)
            self._log(msg)

    def _hp_record(self, text: str) -> None:
        self._hp_history.appendleft(
            {"timestamp": dt_util.now().isoformat(timespec="seconds"), "text": text}
        )

    async def _async_control_hp(
        self, state: MaestroState, opts: dict, current_price: float | None
    ) -> None:
        if not self._params.hp_shadow:
            self._sync_hp_running(opts)
        now = dt_util.now()
        if hp_surplus_w(state, self._params) >= self._params.hp_min_surplus:
            if self._hp_surplus_since is None:
                self._hp_surplus_since = now
            surplus_min = (now - self._hp_surplus_since).total_seconds() / 60
        else:
            self._hp_surplus_since = None
            surplus_min = 0.0
        hp_last_change_min = (dt_util.utcnow() - self._hp_last_change).total_seconds() / 60
        hp_action = hp_desired_state(
            state, self._params, now, current_price,
            self._hp_running, hp_last_change_min, surplus_min,
        )
        if hp_action is not None:
            await self._async_act_hp(
                hp_action, opts, state, current_price, surplus_min
            )

    async def _async_act_hp(
        self,
        turn_on: bool,
        opts: dict,
        state: MaestroState | None = None,
        current_price: float | None = None,
        surplus_min: float = math.inf,
    ) -> None:
        shadow = self._params.hp_shadow
        service = opts.get(CONF_HP_SERVICE_ON if turn_on else CONF_HP_SERVICE_OFF)
        entity_id = opts.get(CONF_HP_SWITCH_ENTITY)
        if not shadow and not service and not entity_id:
            if not self._hp_no_target_warned:
                _LOGGER.warning(
                    "Wärmepumpen-Regelung aktiv, aber weder Schalter noch Service konfiguriert"
                )
                self._hp_no_target_warned = True
            return
        if not shadow:
            try:
                if service:
                    await self._call_generic_service(service)
                else:
                    await self.hass.services.async_call(
                        entity_id.split(".", 1)[0],
                        "turn_on" if turn_on else "turn_off",
                        {"entity_id": entity_id},
                        blocking=True,
                    )
            except (HomeAssistantError, ValueError, asyncio.TimeoutError) as err:
                _LOGGER.warning("Wärmepumpen-Umschaltung fehlgeschlagen: %s", err)
                return
        self._hp_running = turn_on
        self._hp_last_change = dt_util.utcnow()
        explanation = f"Wärmepumpe {'ein' if turn_on else 'aus'}geschaltet"
        if state is not None:
            explanation = hp_action_explanation(
                turn_on, state, self._params, current_price, dt_util.now(),
                surplus_min, shadow=shadow,
            )
        self._hp_last_explanation = explanation
        self._hp_record(explanation)
        self._log(explanation)


    async def _async_release_limits(self, reason: str) -> None:
        """Call clear_power_limits + set_power_mode normal."""
        if self._shutting_down and reason != "Integration entladen":
            return
        try:
            clear_ok = await self._call_e3dc(SERVICE_CLEAR_POWER_LIMITS, {})
            mode_ok = await self._call_e3dc(
                SERVICE_SET_POWER_MODE, {"power_mode": POWER_MODE_NORMAL}
            )
            if clear_ok and mode_ok:
                self._last_sent_charge_limit = None
                self._last_sent_discharge_limit = None
                self._last_rscp_act_ok = True
                self._log(f"Limits freigegeben: {reason}")
        except Exception as err:
            _LOGGER.warning("Fehler beim Freigeben der Limits: %s", err)


    async def _call_e3dc(
        self,
        service: str,
        data: dict,
        *,
        device_id: str | None = None,
        watchdog: bool = True,
    ) -> bool:
        """Call an e3dc_rscp service. Return True on success.

        Verschluckt Schema- und Timeout-Fehler bewusst: Wenn der
        e3dc_rscp-Service einen einzelnen Aufruf ablehnt (z. B. weil
        gentle_charge × 1 W auf 0 rundet) oder das RSCP-Gateway hängt,
        soll *nicht* der gesamte Coordinator-Update-Zyklus abbrechen –
        sonst würden alle Maestro-Entitäten kurzzeitig "unavailable".
        Stattdessen loggen und beim nächsten Tick erneut versuchen.
        Caller must only update ``_last_sent_*`` after a True return.

        ``watchdog=False`` (Wallbox): Fehler zählen nicht für den RSCP-Watchdog,
        der sonst die Akku-Limits freigibt.
        """
        note_failure = self._note_rscp_failure if watchdog else (lambda: None)
        if service == SERVICE_SET_POWER_MODE and "power_mode" in data:
            power_mode = data["power_mode"]
            data = {
                **data,
                "power_mode": E3DC_RSCP_POWER_MODE_MAP.get(power_mode, power_mode),
            }
        try:
            payload = {"device_id": device_id or self._resolve_e3dc_device_id(), **data}
        except HomeAssistantError as err:
            _LOGGER.warning("E3DC Maestro: device_id nicht auflösbar: %s", err)
            note_failure()
            return False
        try:
            async with asyncio.timeout(15):
                await self.hass.services.async_call(
                    E3DC_RSCP_DOMAIN, service, payload, blocking=True
                )
        except asyncio.TimeoutError:
            _LOGGER.warning(
                "E3DC Maestro: Service %s.%s hat 15 s nicht geantwortet "
                "(payload=%s) – nächster Tick versucht es erneut.",
                E3DC_RSCP_DOMAIN, service, data,
            )
            note_failure()
            return False
        except (HomeAssistantError, ValueError) as err:
            _LOGGER.warning(
                "E3DC Maestro: Service %s.%s abgelehnt (payload=%s): %s",
                E3DC_RSCP_DOMAIN, service, data, err,
            )
            note_failure()
            return False

        if not watchdog:
            return True
        self._consecutive_rscp_failures = 0
        if self._rscp_watchdog_notified:
            self._rscp_watchdog_notified = False
        return True


    def _note_rscp_failure(self) -> None:
        """Increment RSCP failure counter and trip watchdog if needed."""
        self._consecutive_rscp_failures += 1
        self._check_rscp_watchdog()


    def _resolve_e3dc_device_id(self) -> str:
        """Resolve the E3DC device id from one of the configured source sensors."""
        if self._e3dc_device_id is not None:
            return self._e3dc_device_id

        entity_registry = er.async_get(self.hass)
        for option_key in (
            CONF_SOC_SENSOR,
            CONF_PV_POWER_SENSOR,
            CONF_HOUSE_POWER_SENSOR,
            CONF_GRID_POWER_SENSOR,
            CONF_BATTERY_POWER_SENSOR,
        ):
            entity_id = self.entry.options.get(option_key)
            if not entity_id:
                continue
            registry_entry = entity_registry.async_get(entity_id)
            if registry_entry and registry_entry.device_id:
                self._e3dc_device_id = registry_entry.device_id
                return registry_entry.device_id

        raise HomeAssistantError(
            "Konnte keine E3DC device_id aus den konfigurierten Sensorsignalen ermitteln"
        )


    async def _call_generic_service(self, action: dict | list | str) -> None:
        """Call user-defined action(s).

        Formats: ``"domain.service"``; a dict with ``action``/``service`` plus
        ``target``/``data`` (panel, ActionSelector items) or legacy
        ``domain`` + ``service``; a list of those (ActionSelector).
        """
        for item in action if isinstance(action, list) else [action]:
            if isinstance(item, str):
                name, data = item, {}
            elif isinstance(item, dict):
                name = str(item.get("action") or item.get("service") or "")
                if item.get("domain") and "." not in name:
                    name = f"{item['domain']}.{name}"
                data = {
                    **(item.get("data") or item.get("service_data") or {}),
                    **(item.get("target") or {}),
                }
            else:
                name, data = "", {}
            domain, _, service = name.partition(".")
            if not domain or not service:
                raise ValueError(f"Ungültige Aktion: {item!r}")
            await self.hass.services.async_call(domain, service, data, blocking=True)


    def _check_watchdog(self) -> None:
        timeout = int(self.entry.options.get(CONF_WATCHDOG_TIMEOUT, DEFAULT_WATCHDOG_TIMEOUT))
        if timeout == 0:
            return
        ticks_needed = max(1, timeout * 60 // int(self.update_interval.total_seconds()))
        if self._consecutive_failures >= ticks_needed and not self._watchdog_notified:
            _LOGGER.error(
                "E3DC Maestro: Watchdog ausgelöst nach %d Fehlversuchen. "
                "Limits werden freigegeben.",
                self._consecutive_failures,
            )
            self._create_background_task(
                self._async_release_limits("Watchdog ausgelöst"),
                "e3dc_maestro_watchdog_release",
            )
            self._watchdog_notified = True
            persistent_notification.async_create(
                self.hass,
                f"E3DC Maestro: Verbindungsproblem nach {timeout} min – "
                "Limits wurden zurückgesetzt.",
                title="E3DC Maestro Warnung",
                notification_id="e3dc_maestro_watchdog",
            )


    def _check_rscp_watchdog(self) -> None:
        """Trip when consecutive RSCP service calls fail (independent of sensors)."""
        timeout = int(self.entry.options.get(CONF_WATCHDOG_TIMEOUT, DEFAULT_WATCHDOG_TIMEOUT))
        if timeout == 0:
            return
        ticks_needed = max(1, timeout * 60 // int(self.update_interval.total_seconds()))
        if self._consecutive_rscp_failures >= ticks_needed and not self._rscp_watchdog_notified:
            _LOGGER.error(
                "E3DC Maestro: RSCP-Watchdog ausgelöst nach %d Servicefehlern. "
                "Limits werden freigegeben.",
                self._consecutive_rscp_failures,
            )
            self._create_background_task(
                self._async_release_limits("RSCP-Watchdog ausgelöst"),
                "e3dc_maestro_rscp_watchdog_release",
            )
            self._rscp_watchdog_notified = True
            persistent_notification.async_create(
                self.hass,
                f"E3DC Maestro: RSCP-Servicefehler nach {timeout} min – "
                "Limits wurden zurückgesetzt.",
                title="E3DC Maestro Warnung",
                notification_id="e3dc_maestro_rscp_watchdog",
            )


    def _can_manual_charge(self) -> bool:
        if self._last_manual_charge is None:
            return True
        elapsed = (dt_util.utcnow() - self._last_manual_charge).total_seconds() / 3600
        return elapsed >= MANUAL_CHARGE_MIN_INTERVAL_HOURS
