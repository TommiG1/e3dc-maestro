"""Sensor state reading and unit normalisation."""
from __future__ import annotations

import logging
from datetime import date, timedelta
from typing import Any

from homeassistant.const import STATE_UNAVAILABLE, STATE_UNKNOWN
from homeassistant.helpers import entity_registry as er
from homeassistant.util import dt as dt_util

from .const import (
    CONF_ADDITIONAL_ENERGY_TOTAL_SENSOR,
    CONF_ADDITIONAL_GENERATION_SENSOR,
    CONF_BATTERY_POWER_SENSOR,
    CONF_EVCC_CHARGING_ENTITY,
    CONF_EVCC_ENABLED,
    CONF_EVCC_MODE_ENTITY,
    CONF_GRID_POWER_INVERT,
    CONF_GRID_POWER_SENSOR,
    CONF_HOUSE_CONSUMPTION_TODAY_SENSOR,
    CONF_HOUSE_POWER_SENSOR,
    CONF_PV_FORECAST_ENABLED,
    CONF_PV_FORECAST_SENSOR,
    CONF_PV_FORECAST_TODAY_SENSOR,
    CONF_PV_POWER_SENSOR,
    CONF_PV_PRODUCTION_TODAY_SENSOR,
    CONF_SOC_SENSOR,
    CONF_TOMORROW_PV_SENSOR,
    CONF_WALLBOX_INCLUDED_IN_HOUSE,
    CONF_WALLBOX_POWER_SENSOR,
    E3DC_RSCP_DOMAIN,
    MAX_ADDITIONAL_PRODUCERS,
    PV_FORECAST_P10_ATTR,
    RSCP_SUFFIX_ADDITIONAL_TOTAL,
    RSCP_SUFFIX_HOUSE_CONSUMPTION_TODAY,
    RSCP_SUFFIX_SOLAR_PRODUCTION_TODAY,
    as_entity_list,
)
from .control_engine import MaestroState

_LOGGER = logging.getLogger(__name__)


class CoordinatorSensorsMixin:
    _POWER_UNIT_TO_W: dict[str, float] = {
        "w": 1.0,
        "watt": 1.0,
        "watts": 1.0,
        "kw": 1000.0,
        "kilowatt": 1000.0,
        "mw": 1_000_000.0,
        "megawatt": 1_000_000.0,
    }


    def _read_sensors(self, opts: dict) -> MaestroState:
        soc = self._read_float(opts[CONF_SOC_SENSOR], required=True)
        pv = self._read_power_w(opts[CONF_PV_POWER_SENSOR], required=True)
        additional_generation = self._read_additional_power_w(opts)
        house = self._read_power_w(opts[CONF_HOUSE_POWER_SENSOR], required=True)
        # Wallbox-Verbrauch separat (optional). Wenn der Hausverbrauchszähler die
        # Wallbox bereits enthält (typisch openWB am EVU-Zähler), ziehen wir sie
        # ab, damit die Optimierungs-Logik einen "reinen" Hausverbrauch sieht.
        wallbox = 0.0
        wb_sensor = opts.get(CONF_WALLBOX_POWER_SENSOR)
        if wb_sensor:
            wb_val = self._read_power_w(wb_sensor, required=False)
            if wb_val is not None:
                wallbox = max(0.0, wb_val)
                if opts.get(CONF_WALLBOX_INCLUDED_IN_HOUSE, False) and house is not None:
                    house = max(0.0, house - wallbox)
        grid = self._read_power_w(opts[CONF_GRID_POWER_SENSOR], required=True)
        if grid is not None and opts.get(CONF_GRID_POWER_INVERT, False):
            grid = -grid
        batt = self._read_power_w(opts[CONF_BATTERY_POWER_SENSOR], required=True)
        forecast: float | None = None
        forecast_p10: float | None = None
        if opts.get(CONF_PV_FORECAST_ENABLED) and opts.get(CONF_PV_FORECAST_SENSOR):
            forecast = self._read_float(opts[CONF_PV_FORECAST_SENSOR], required=False)
            # Konservative P10-Restprognose aus dem Sensor-Attribut (Solcast:
            # "estimate10"). Fehlt das Attribut (andere Quelle) → None, das Gate
            # fällt dann auf den P50-State zurück.
            forecast_p10 = self._read_attr_float(
                opts[CONF_PV_FORECAST_SENSOR], PV_FORECAST_P10_ATTR
            )

        # Morgen-PV immer lesen, sobald ein Sensor gewählt ist. Die Anzeige
        # hängt nicht an Vorausschau oder prognosebasierter Netzladung.
        # Der Wochentags-Verbrauch bleibt an diese Schalter gebunden.
        tomorrow_pv: float | None = None
        if opts.get(CONF_TOMORROW_PV_SENSOR):
            tomorrow_pv = self._read_float(
                opts[CONF_TOMORROW_PV_SENSOR], required=False
            )
        _needs_tomorrow = (
            self._params.forward_looking_enabled
            or getattr(self._params, "low_slot_forecast_based", False)
        )
        tomorrow_consumption: float | None = None
        if _needs_tomorrow and self._consumption_stats is not None:
            tomorrow_local = dt_util.now() + timedelta(days=1)
            tomorrow_consumption = self._consumption_stats.weekday_total_kwh(
                tomorrow_local.weekday()
            )

        # D1: EVCC state
        evcc_charging = False
        evcc_mode: str | None = None
        if opts.get(CONF_EVCC_ENABLED):
            if opts.get(CONF_EVCC_CHARGING_ENTITY):
                cs = self.hass.states.get(opts[CONF_EVCC_CHARGING_ENTITY])
                if cs and cs.state not in (STATE_UNAVAILABLE, STATE_UNKNOWN):
                    evcc_charging = cs.state.lower() in ("true", "on", "1", "yes")
            if opts.get(CONF_EVCC_MODE_ENTITY):
                ms = self.hass.states.get(opts[CONF_EVCC_MODE_ENTITY])
                if ms and ms.state not in (STATE_UNAVAILABLE, STATE_UNKNOWN):
                    evcc_mode = ms.state

        # Schwacher-PV-Tag: Tagesprognose + historischer Peak einlesen, latchen.
        today_pv_kwh, peak_pv_kwh = self._resolve_low_yield_inputs(opts)

        return MaestroState(
            soc=soc,
            pv_power=pv + additional_generation,
            house_power=house,
            grid_power=grid,
            battery_power=batt,
            pv_forecast_remaining_kwh=forecast,
            pv_forecast_remaining_p10_kwh=forecast_p10,
            wallbox_power=wallbox,
            evcc_charging=evcc_charging,
            evcc_mode=evcc_mode,
            tomorrow_pv_kwh=tomorrow_pv,
            tomorrow_consumption_kwh=tomorrow_consumption,
            pv_forecast_today_kwh=today_pv_kwh,
            pv_stats_peak_kwh=peak_pv_kwh,
        )


    def _resolve_low_yield_inputs(
        self, opts: dict[str, Any]
    ) -> tuple[float | None, float | None]:
        """Lese Tagesprognose + historischen Peak; latch nur die Eingangswerte.

        Rückgabe ``(today_kwh, peak_kwh)`` für die ``MaestroState``-Felder.
        Die Tagesprognose wird einmal pro lokalem Tag festgehalten, damit
        Solcast-Updates den Tag nicht hin- und herschalten. Schwelle und
        Referenz-Parameter werden in ``_is_low_yield_day_active`` live
        ausgewertet.
        """
        if not self._params.low_yield_priority_enabled:
            self._low_yield_latch_date = None
            self._low_yield_stats_peak_kwh = None
            self._low_yield_today_kwh = None
            return (None, None)

        today_kwh: float | None = None
        sensor_id = opts.get(CONF_PV_FORECAST_TODAY_SENSOR)
        if sensor_id:
            today_kwh = self._read_float(sensor_id, required=False)

        peak_kwh: float | None = None
        if self._pv_stats is not None and self._pv_stats.data_days >= 7:
            peak_kwh = self._pv_stats.peak_daily_yield_kwh()

        # Latchen: nur einmal pro lokalem Tag aktualisieren. Vor dem ersten
        # validen Wert (z. B. direkt nach HA-Start ohne Solcast-Update) bleibt
        # der Latch leer und das Feature ist inaktiv.
        local_today = dt_util.now().date()
        if today_kwh is not None and today_kwh >= 0:
            if (
                self._low_yield_latch_date != local_today
                or self._low_yield_today_kwh is None
            ):
                self._low_yield_today_kwh = today_kwh
                self._low_yield_stats_peak_kwh = peak_kwh
                self._low_yield_latch_date = local_today

        return (self._low_yield_today_kwh, self._low_yield_stats_peak_kwh)


    def _read_float(self, entity_id: str, required: bool = False) -> float | None:
        state = self.hass.states.get(entity_id)
        if state is None or state.state in (STATE_UNAVAILABLE, STATE_UNKNOWN, None, ""):
            if required:
                raise ValueError(f"Entity '{entity_id}' nicht verfügbar")
            return None
        try:
            return float(state.state)
        except (ValueError, TypeError) as err:
            if required:
                raise ValueError(f"Entity '{entity_id}' hat keinen numerischen Wert: {state.state}") from err
            return None

    def _rscp_sensor_by_suffix(self, suffix: str) -> str | None:
        """Resolve a stable RSCP sensor by entity_id suffix. Result is cached."""
        cache: dict[str, str] = getattr(self, "_rscp_suffix_cache", None) or {}
        if not hasattr(self, "_rscp_suffix_cache"):
            self._rscp_suffix_cache = cache
        if suffix in cache:
            return cache[suffix] or None
        found = ""
        rscp_entries = self.hass.config_entries.async_entries(E3DC_RSCP_DOMAIN)
        if rscp_entries:
            entry_ids = {e.entry_id for e in rscp_entries}
            registry = er.async_get(self.hass)
            for ent in registry.entities.values():
                if ent.config_entry_id not in entry_ids:
                    continue
                if ent.entity_id.startswith("sensor.") and ent.entity_id.endswith(suffix):
                    found = ent.entity_id
                    break
        cache[suffix] = found
        return found or None

    def _read_native_today_kwh(self, opts: dict, conf_key: str, suffix: str) -> float | None:
        """Day counter in kWh: configured entity, else RSCP suffix, else None."""
        entity_id = opts.get(conf_key) or self._rscp_sensor_by_suffix(suffix)
        if not entity_id:
            return None
        value = self._read_float(entity_id, required=False)
        if value is None:
            return None
        state = self.hass.states.get(entity_id)
        unit = (state.attributes.get("unit_of_measurement") or "").lower() if state else ""
        if unit == "wh":
            return value / 1000.0
        return value

    def _read_pv_production_today_kwh(self, opts: dict) -> float | None:
        """Haupt-PV heute (ohne Zusatzzähler)."""
        return self._read_native_today_kwh(
            opts, CONF_PV_PRODUCTION_TODAY_SENSOR, RSCP_SUFFIX_SOLAR_PRODUCTION_TODAY
        )

    def _read_house_consumption_today_kwh(self, opts: dict) -> float | None:
        return self._read_native_today_kwh(
            opts, CONF_HOUSE_CONSUMPTION_TODAY_SENSOR, RSCP_SUFFIX_HOUSE_CONSUMPTION_TODAY
        )

    def _additional_power_entity_ids(self, opts: dict) -> list[str]:
        return as_entity_list(
            opts.get(CONF_ADDITIONAL_GENERATION_SENSOR),
            max_items=MAX_ADDITIONAL_PRODUCERS,
        )

    def _additional_total_entity_ids(self, opts: dict) -> list[str]:
        raw = opts.get(CONF_ADDITIONAL_ENERGY_TOTAL_SENSOR)
        if raw is not None:
            # Explicit empty list = no totals (do not fall back to RSCP).
            return as_entity_list(raw, max_items=MAX_ADDITIONAL_PRODUCERS)
        fallback = self._rscp_sensor_by_suffix(RSCP_SUFFIX_ADDITIONAL_TOTAL)
        return [fallback] if fallback else []

    def _read_energy_total_kwh(self, entity_id: str) -> float | None:
        """Lifetime energy counter in kWh (Wh → kWh)."""
        value = self._read_float(entity_id, required=False)
        if value is None:
            return None
        state = self.hass.states.get(entity_id)
        unit = (state.attributes.get("unit_of_measurement") or "").lower() if state else ""
        if unit == "wh":
            return value / 1000.0
        return value

    def _read_additional_power_w(self, opts: dict) -> float:
        total = 0.0
        for entity_id in self._additional_power_entity_ids(opts):
            total += max(0.0, self._read_power_w(entity_id, required=False) or 0.0)
        return total


    def _read_attr_float(self, entity_id: str, attr: str) -> float | None:
        """Read a numeric attribute from an entity, or None if missing/invalid."""
        state = self.hass.states.get(entity_id)
        if state is None:
            return None
        val = state.attributes.get(attr)
        try:
            return float(val)
        except (TypeError, ValueError):
            return None


    def _read_power_w(self, entity_id: str, required: bool = False) -> float | None:
        """Read a power sensor and normalise the value to Watt.

        Auto-converts based on the entity's ``unit_of_measurement`` attribute
        (W / kW / MW). Falls back to W if the unit is missing or unknown so
        legacy configurations keep working. The detected unit is cached and
        only logged once per entity to avoid log spam.
        """
        state = self.hass.states.get(entity_id)
        if state is None or state.state in (STATE_UNAVAILABLE, STATE_UNKNOWN, None, ""):
            if required:
                raise ValueError(f"Entity '{entity_id}' nicht verfügbar")
            return None
        try:
            value = float(state.state)
        except (ValueError, TypeError) as err:
            if required:
                raise ValueError(
                    f"Entity '{entity_id}' hat keinen numerischen Wert: {state.state}"
                ) from err
            return None
        unit = (state.attributes.get("unit_of_measurement") or "").strip().lower()
        factor = self._POWER_UNIT_TO_W.get(unit, 1.0)
        cache = self.__dict__.setdefault("_power_unit_cache", {})
        prev = cache.get(entity_id)
        if prev != (unit, factor):
            cache[entity_id] = (unit, factor)
            if unit and unit not in self._POWER_UNIT_TO_W:
                _LOGGER.warning(
                    "Power sensor '%s' has unknown unit '%s' – treating as W",
                    entity_id, unit,
                )
            elif factor != 1.0:
                _LOGGER.info(
                    "Power sensor '%s' liefert %s – wird automatisch in W umgerechnet (×%g)",
                    entity_id, unit, factor,
                )
        return value * factor
