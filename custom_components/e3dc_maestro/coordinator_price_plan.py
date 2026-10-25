"""Price plan: compute and cache the price-based charge/hold plan (optionally actuated)."""
from __future__ import annotations

import logging
from datetime import datetime, timedelta
from typing import TYPE_CHECKING, Any

from homeassistant.const import STATE_UNAVAILABLE, STATE_UNKNOWN
from homeassistant.helpers import entity_registry as er

from .const import (
    CONF_ENERGYFORECAST_MARKET_ZONE,
    CONF_ENERGYFORECAST_TOKEN,
    CONF_PRICE_SENSOR,
    DEFAULT_ENERGYFORECAST_MARKET_ZONE,
)
from .energyforecast import API_URL, extend_horizon, slots_from_payload
from .grid_charge_strategy import plan_tuning
from .control_engine import PricePlanAction, reserve_floor_soc as _reserve_floor_soc
from .modul3 import add_modul3_to_horizon, parse_modul3_profile
from .ostrom_prices import normalize_ostrom_curve_attrs
from .price_curve import PriceHorizon, read_price_horizon
from .price_plan_runner import STATUS_OK, PricePlanSnapshot, compute_price_plan
from .tibber_prices import is_tibber_electricity_price, price_slots_for_home

if TYPE_CHECKING:
    from .control_engine import MaestroState

_LOGGER = logging.getLogger(__name__)

# Ein Plan, der älter ist (z. B. Preis-Sensor ausgefallen), steuert nicht mehr.
PRICE_PLAN_MAX_AGE_S = 20 * 60
# Tibber-Preise ändern sich stündlich; morgen steht frühestens am Nachmittag fest.
TIBBER_PRICE_REFRESH_S = 15 * 60
# Energyforecast aktualisiert 2× täglich; sechs Stunden reichen laut Anbieter.
ENERGYFORECAST_REFRESH_S = 6 * 60 * 60


class CoordinatorPricePlanMixin:
    price_plan: PricePlanSnapshot | None = None
    _price_plan_fingerprint: tuple | None = None
    _tibber_curve_sensor: str | None = None
    _tibber_curve_at: datetime | None = None
    _tibber_curve_attrs: dict | None = None
    _tibber_curve_warned: bool = False
    _energyforecast_at: datetime | None = None
    _energyforecast_slots: list | None = None
    _energyforecast_token: str | None = None
    _energyforecast_zone: str | None = None
    _energyforecast_warned: bool = False
    _price_provider_until: datetime | None = None

    def _reset_price_plan(self) -> None:
        self.price_plan = None
        self._price_plan_fingerprint = None
        self._price_provider_until = None

    def _price_plan_action(self, now: datetime) -> PricePlanAction | None:
        """Aktuelle Handlungsempfehlung – nur wenn der Plan steuern soll und frisch ist.

        Ohne gültigen Plan (keine Preise, veraltet, Fehler) gibt es ``None`` und
        Maestro regelt normal weiter (fail-safe).
        """
        params = self._params
        if not (params.price_plan_enabled and params.price_plan_active):
            return None
        snap = self.price_plan
        if snap is None or snap.status != STATUS_OK or snap.plan is None or snap.computed_at is None:
            return None
        if abs((now - snap.computed_at).total_seconds()) > PRICE_PLAN_MAX_AGE_S:
            return None
        plan = snap.plan
        return PricePlanAction(
            charge_now=plan.charge_now,
            hold_now=plan.hold_now,
            target_soc=plan.target_soc_pct,
            message=plan.reason,
        )

    async def _async_price_horizon(self, now: datetime) -> PriceHorizon | None:
        """Preiskurve ab jetzt aus dem Preis-Sensor (oder der Tibber-Aktion).

        Optional verlängert Energyforecast.de die Kurve hinter dem letzten
        echten Tarifpreis. ``_price_provider_until`` markiert die Nahtstelle.
        """
        self._price_provider_until = None
        sensor_id = self.entry.options.get(CONF_PRICE_SENSOR)
        if not sensor_id:
            return None
        attrs: dict = {}
        st = self.hass.states.get(sensor_id)
        if st is not None and st.state not in (STATE_UNAVAILABLE, STATE_UNKNOWN):
            attrs = dict(st.attributes)
        horizon = read_price_horizon(attrs, now)
        if horizon is None:
            ostrom_attrs = normalize_ostrom_curve_attrs(attrs)
            if ostrom_attrs:
                horizon = read_price_horizon(ostrom_attrs, now)
        if horizon is None:
            tibber_attrs = await self._async_tibber_curve_attrs(sensor_id, st, now)
            if tibber_attrs:
                horizon = read_price_horizon(tibber_attrs, now)
        if horizon is None:
            return None
        forecast = await self._async_energyforecast_slots(now)
        if forecast:
            horizon, provider_until = extend_horizon(horizon, forecast, now)
            self._price_provider_until = provider_until
        # §14a Modul 3: Netzentgelt-Schicht auf die fertige Kurve (inkl. Forecast).
        modul3 = parse_modul3_profile(self.entry.options)
        return add_modul3_to_horizon(horizon, modul3, now)

    async def _async_update_price_plan(
        self, state: MaestroState, now: datetime, horizon: PriceHorizon | None
    ) -> None:
        """Compute the plan. Actuation happens in ``decide()`` only when price_plan_active is on."""
        params = self._params
        if not params.price_plan_enabled:
            if self.price_plan is not None:
                self._reset_price_plan()
            return
        try:
            floor_pct = _reserve_floor_soc(state, params, now)

            cons_stats = getattr(self, "_consumption_stats", None)
            pv_stats = getattr(self, "_pv_stats", None)
            cons_profile = list(cons_stats.hourly_profile_w) if cons_stats is not None else None
            pv_hist = list(pv_stats.hourly_profile_w) if pv_stats is not None else None
            pv_today = self._read_pv_forecast_profile(now, days_ahead=0, ignore_enabled=True)
            pv_tomorrow = self._read_pv_forecast_profile(now, days_ahead=1, ignore_enabled=True)

            cap = max(float(params.battery_capacity_kwh), 0.1)
            tuning = plan_tuning(params)
            if tuning.wear_eur_per_kwh is None:
                cycles = max(float(getattr(params, "battery_total_cycles", 5000.0)), 100.0)
                capex = max(float(getattr(params, "battery_capex_eur", 8000.0)), 0.0)
                wear = capex / (cycles * 2.0 * cap)
            else:
                wear = tuning.wear_eur_per_kwh

            # Re-plan every 5 min (slot boundaries move "now") or when inputs change.
            fingerprint = (
                (now.date(), now.hour, now.minute // 5),
                round(state.soc),
                tuple(horizon.prices) if horizon else None,
                round(floor_pct),
                params.price_plan_max_soc, tuning, wear,
                params.battery_capacity_kwh,
            )
            if fingerprint == self._price_plan_fingerprint and self.price_plan is not None:
                return

            def _run() -> PricePlanSnapshot:
                return compute_price_plan(
                    horizon=horizon,
                    now=now,
                    soc_pct=state.soc,
                    capacity_kwh=cap,
                    floor_pct=floor_pct,
                    ceiling_pct=float(params.price_plan_max_soc),
                    max_charge_kw=max(float(params.max_charge_power), 100.0) / 1000.0,
                    max_discharge_kw=max(float(params.inverter_power), 100.0) / 1000.0,
                    efficiency=tuning.efficiency,
                    min_spread=tuning.min_spread,
                    safety_factor=tuning.safety_factor,
                    wear_eur_per_kwh=wear,
                    feed_in_price=float(params.feed_in_price),
                    cons_profile_w=cons_profile,
                    house_power_w=float(state.house_power),
                    pv_today_w=pv_today,
                    pv_tomorrow_w=pv_tomorrow,
                    pv_hist_w=pv_hist,
                    provider_until=self._price_provider_until,
                )

            snapshot = await self.hass.async_add_executor_job(_run)
            self.price_plan = snapshot
            self._price_plan_fingerprint = fingerprint
            _LOGGER.debug("Preisplan: %s", snapshot.message)
        except Exception as err:  # noqa: BLE001
            _LOGGER.debug("Preisplan fehlgeschlagen: %s", err)

    async def _async_tibber_curve_attrs(
        self, sensor_id: str, state: Any, now: datetime
    ) -> dict | None:
        """Stundenkurve des Tibber-Strompreis-Sensors, höchstens alle 15 Minuten neu."""
        attributes = state.attributes if state is not None else {}
        # Cheap attribute check first: every other price sensor ends here untouched.
        if "app_nickname" not in attributes or "max_price" not in attributes:
            return None
        platform = None
        try:
            registry_entry = er.async_get(self.hass).async_get(sensor_id)
        except Exception:  # noqa: BLE001
            registry_entry = None
        if registry_entry is not None:
            platform = registry_entry.platform
        if not is_tibber_electricity_price(platform, attributes):
            return None

        if (
            self._tibber_curve_sensor == sensor_id
            and self._tibber_curve_at is not None
            and (now - self._tibber_curve_at).total_seconds() < TIBBER_PRICE_REFRESH_S
        ):
            return self._tibber_curve_attrs

        nickname = attributes.get("app_nickname")
        nickname = nickname if isinstance(nickname, str) else None
        fetched = await self._async_fetch_tibber_curve(nickname, now)
        if fetched is None and self._tibber_curve_attrs and self._tibber_curve_sensor == sensor_id:
            self._tibber_curve_at = now
            return self._tibber_curve_attrs

        self._tibber_curve_sensor = sensor_id
        self._tibber_curve_at = now
        self._tibber_curve_attrs = fetched
        return fetched

    async def _async_energyforecast_slots(self, now: datetime) -> list | None:
        """Cached Energyforecast-Slots, nur wenn ein Token gesetzt ist."""
        token = self.entry.options.get(CONF_ENERGYFORECAST_TOKEN)
        if not isinstance(token, str) or not token.strip():
            self._energyforecast_slots = None
            self._energyforecast_token = None
            return None
        token = token.strip()
        zone = self.entry.options.get(CONF_ENERGYFORECAST_MARKET_ZONE)
        if not isinstance(zone, str) or not zone.strip():
            zone = DEFAULT_ENERGYFORECAST_MARKET_ZONE
        zone = zone.strip()

        if (
            self._energyforecast_slots is not None
            and self._energyforecast_token == token
            and self._energyforecast_zone == zone
            and self._energyforecast_at is not None
            and (now - self._energyforecast_at).total_seconds() < ENERGYFORECAST_REFRESH_S
        ):
            return self._energyforecast_slots

        from aiohttp import ClientTimeout
        from homeassistant.helpers.aiohttp_client import async_get_clientsession

        session = async_get_clientsession(self.hass)
        try:
            async with session.get(
                API_URL,
                params={"token": token, "market_zone": zone},
                timeout=ClientTimeout(total=30),
            ) as resp:
                if resp.status != 200:
                    raise RuntimeError(f"HTTP {resp.status}")
                payload = await resp.json(content_type=None)
        except Exception as err:  # noqa: BLE001
            if not self._energyforecast_warned:
                _LOGGER.warning("Energyforecast-Abruf fehlgeschlagen: %s", err)
                self._energyforecast_warned = True
            if (
                self._energyforecast_slots is not None
                and self._energyforecast_token == token
                and self._energyforecast_zone == zone
            ):
                self._energyforecast_at = now
                return self._energyforecast_slots
            return None

        slots = slots_from_payload(payload)
        if not slots:
            if not self._energyforecast_warned:
                _LOGGER.warning("Energyforecast-Antwort ohne nutzbare Preis-Slots")
                self._energyforecast_warned = True
            return None

        self._energyforecast_warned = False
        self._energyforecast_token = token
        self._energyforecast_zone = zone
        self._energyforecast_at = now
        self._energyforecast_slots = slots
        _LOGGER.debug(
            "Energyforecast: %s Slots bis %s (%s)",
            len(slots),
            slots[-1].end.isoformat(),
            zone,
        )
        return slots

    async def _async_fetch_tibber_curve(self, nickname: str | None, now: datetime) -> dict | None:
        if not self.hass.services.has_service("tibber", "get_prices"):
            if not self._tibber_curve_warned:
                _LOGGER.warning(
                    "Tibber-Strompreis-Sensor gewählt, aber die Aktion tibber.get_prices fehlt"
                )
                self._tibber_curve_warned = True
            return None
        end = now + timedelta(days=1)
        end = end.replace(hour=23, minute=59, second=0, microsecond=0)
        try:
            response = await self.hass.services.async_call(
                "tibber",
                "get_prices",
                {"end": end.strftime("%Y-%m-%d %H:%M:%S")},
                blocking=True,
                return_response=True,
            )
        except Exception as err:  # noqa: BLE001
            if not self._tibber_curve_warned:
                _LOGGER.warning("Tibber-Preiskurve nicht abrufbar: %s", err)
                self._tibber_curve_warned = True
            return None

        slots = price_slots_for_home(response, nickname)
        if not slots:
            if not self._tibber_curve_warned:
                _LOGGER.warning(
                    "Tibber-Preiskurve leer oder Wohnung %r nicht in der Antwort", nickname
                )
                self._tibber_curve_warned = True
            return None
        self._tibber_curve_warned = False
        return {"prices": slots}
