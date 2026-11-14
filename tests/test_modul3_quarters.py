"""Modul 3 nach Quartalen: keine Netzladung außerhalb der gewählten Quartale.

Sicherheitsnetz für die Live-Slots (NT→low, HT→high) und die Preisschicht.
Referenz: Stadtwerke Jena Netze 2026 (NT 22:15–06:15, HT 17–20, nur Q1+Q4)
und Bayernwerk 2026 (NT 10–15, HT 17–22, nur Q2+Q3).
"""
from __future__ import annotations

import dataclasses
import datetime as dt
from zoneinfo import ZoneInfo

import pytest

from custom_components.e3dc_maestro.const import PHASE_GRID_CHARGE
from custom_components.e3dc_maestro.control_engine import (
    MaestroParams,
    MaestroState,
    decide,
)
from custom_components.e3dc_maestro.control_tariff import (
    TARIFF_HIGH,
    TARIFF_LOW,
    TariffSlot,
    active_tariff_slot,
    current_tariff_class,
    tariff_schedule_from_params,
)
from custom_components.e3dc_maestro.coordinator_helpers import _params_from_options
from custom_components.e3dc_maestro.grid_charge_need import low_slot_hours_left
from custom_components.e3dc_maestro.modul3 import (
    SLOTS_MIGRATED_KEY,
    TARIFF_SLOTS_BACKUP_KEY,
    ZONE_NT,
    ZONE_ST,
    add_modul3_to_horizon,
    derived_tariff_slots,
    migrate_copied_modul3_slots,
    modul3_runtime_status,
    parse_modul3_profile,
    tariff_slots_from_modul3,
    zone_at,
)
from custom_components.e3dc_maestro.price_curve import PriceHorizon

BERLIN = ZoneInfo("Europe/Berlin")

JENA_ZONES = {
    "nt": {"price_ct_kwh": 2.32, "windows": [{"start_h": 22.25, "end_h": 6.25}]},
    "st": {"price_ct_kwh": 6.82, "windows": []},
    "ht": {"price_ct_kwh": 13.58, "windows": [{"start_h": 17.0, "end_h": 20.0}]},
}
BAYERNWERK_ZONES = {
    "nt": {"price_ct_kwh": 0.47, "windows": [{"start_h": 10.0, "end_h": 15.0}]},
    "st": {"price_ct_kwh": 4.72, "windows": []},
    "ht": {"price_ct_kwh": 9.03, "windows": [{"start_h": 17.0, "end_h": 22.0}]},
}


def _options(zones=JENA_ZONES, quarters=(1, 4), **extra) -> dict:
    options = {
        "modul3_enabled": True,
        "modul3_add_to_curve": True,
        "modul3_vat": "off",
        "modul3_zones": zones,
        "modul3_tariff_slots": True,
    }
    if quarters is not None:
        options["modul3_quarters"] = list(quarters)
    options.update(extra)
    return options


def _year_local(year: int = 2026, step_min: int = 15):
    """Every real 15-min instant of a year, as Berlin wall time (DST-correct)."""
    cursor = dt.datetime(year, 1, 1, tzinfo=BERLIN).astimezone(dt.timezone.utc)
    end = dt.datetime(year + 1, 1, 1, tzinfo=BERLIN).astimezone(dt.timezone.utc)
    step = dt.timedelta(minutes=step_min)
    while cursor < end:
        yield cursor.astimezone(BERLIN)
        cursor += step


def _quarter(when: dt.datetime) -> int:
    return (when.month - 1) // 3 + 1


# ── Jahresscan: kein low außerhalb der Quartale ─────────────────────────────


@pytest.mark.parametrize(
    ("zones", "quarters"),
    [(JENA_ZONES, (1, 4)), (BAYERNWERK_ZONES, (2, 3))],
)
def test_year_scan_no_low_outside_selected_quarters(zones, quarters):
    params = _params_from_options(_options(zones=zones, quarters=quarters))
    schedule = tariff_schedule_from_params(params)
    profile = parse_modul3_profile(_options(zones=zones, quarters=quarters))
    low_seen = 0
    for when in _year_local():
        cls = current_tariff_class(when, schedule)
        zone = zone_at(when, profile)
        if _quarter(when) not in quarters:
            assert cls != TARIFF_LOW, when
            assert cls != TARIFF_HIGH, when
            assert zone == ZONE_ST, when
            assert active_tariff_slot(when, schedule) is None, when
        elif cls == TARIFF_LOW:
            low_seen += 1
            assert zone == ZONE_NT, when
    # Sanity: the windows do fire inside the selected quarters.
    assert low_seen > 1000


def test_all_four_quarters_when_option_missing():
    options = _options(quarters=None)
    assert parse_modul3_profile(options).quarters == frozenset({1, 2, 3, 4})
    params = _params_from_options(options)
    schedule = tariff_schedule_from_params(params)
    summer_night = dt.datetime(2026, 7, 15, 23, 0, tzinfo=BERLIN)
    assert current_tariff_class(summer_night, schedule) == TARIFF_LOW


# ── Quartalsgrenzen ────────────────────────────────────────────────────────


@pytest.mark.parametrize(
    ("when", "expected"),
    [
        (dt.datetime(2026, 3, 31, 23, 0, tzinfo=BERLIN), TARIFF_LOW),
        (dt.datetime(2026, 4, 1, 0, 0, tzinfo=BERLIN), "normal"),
        (dt.datetime(2026, 4, 1, 3, 0, tzinfo=BERLIN), "normal"),
        (dt.datetime(2026, 9, 30, 23, 0, tzinfo=BERLIN), "normal"),
        (dt.datetime(2026, 10, 1, 3, 0, tzinfo=BERLIN), TARIFF_LOW),
        (dt.datetime(2026, 12, 31, 23, 0, tzinfo=BERLIN), TARIFF_LOW),
        (dt.datetime(2027, 1, 1, 3, 0, tzinfo=BERLIN), TARIFF_LOW),
    ],
)
def test_quarter_boundaries_use_instant_not_window_start(when, expected):
    schedule = tariff_schedule_from_params(_params_from_options(_options()))
    assert current_tariff_class(when, schedule) == expected


def test_jit_hours_capped_at_quarter_end():
    slot = derived_tariff_slots(parse_modul3_profile(_options()))[0]
    assert slot.class_ == TARIFF_LOW
    # 31.3. 23:00 → Q2 not selected: window ends at midnight, not 06:15.
    assert low_slot_hours_left(dt.datetime(2026, 3, 31, 23, 0, tzinfo=BERLIN), slot) == pytest.approx(1.0)
    # 31.12. 23:00 → Q1 selected: full window to 06:15.
    assert low_slot_hours_left(dt.datetime(2026, 12, 31, 23, 0, tzinfo=BERLIN), slot) == pytest.approx(7.25)
    # Ordinary January night unaffected.
    assert low_slot_hours_left(dt.datetime(2026, 1, 10, 23, 0, tzinfo=BERLIN), slot) == pytest.approx(7.25)


# ── Preisschicht ───────────────────────────────────────────────────────────


def test_price_layer_uses_st_in_unselected_quarter():
    profile = parse_modul3_profile(_options())
    start = dt.datetime(2026, 7, 15, 22, 0, tzinfo=BERLIN)
    horizon = PriceHorizon(start=start, slot_hours=[1.0] * 4, prices=[0.0] * 4, known_until=start)
    out = add_modul3_to_horizon(horizon, profile, start)
    assert out is not None
    assert out.prices == pytest.approx([0.0682] * 4)


def test_price_layer_dst_spring_forward():
    """29.3.2026: 02:00 CET → 03:00 CEST. Slot mids must follow real time."""
    zones = {
        "nt": {"price_ct_kwh": 1.0, "windows": [{"start_h": 0.0, "end_h": 5.0}]},
        "st": {"price_ct_kwh": 5.0, "windows": []},
        "ht": {"price_ct_kwh": 9.0, "windows": []},
    }
    profile = parse_modul3_profile(_options(zones=zones, quarters=(1, 2, 3, 4)))
    start = dt.datetime(2026, 3, 29, 0, 0, tzinfo=BERLIN)
    horizon = PriceHorizon(start=start, slot_hours=[1.0] * 6, prices=[0.0] * 6, known_until=start)
    out = add_modul3_to_horizon(horizon, profile, start)
    assert out is not None
    # Real mids: 00:30, 01:30, 03:30, 04:30 (CEST), 05:30, 06:30 local.
    assert out.prices == pytest.approx([0.01, 0.01, 0.01, 0.01, 0.05, 0.05])


# ── Default aus: keine neuen Slots ohne Opt-in ──────────────────────────────


def test_no_live_slots_without_opt_in():
    options = _options()
    options.pop("modul3_tariff_slots")
    params = _params_from_options(options)
    assert params.derived_tariff_slots == ()
    schedule = tariff_schedule_from_params(params)
    jan_night = dt.datetime(2026, 1, 10, 23, 0, tzinfo=BERLIN)
    assert current_tariff_class(jan_night, schedule) != TARIFF_LOW


def test_no_live_slots_when_modul3_disabled():
    params = _params_from_options(_options(modul3_enabled=False))
    assert params.derived_tariff_slots == ()


def test_runtime_status_reports_quarter_and_zone():
    profile = parse_modul3_profile(_options())
    status = modul3_runtime_status(profile, dt.datetime(2026, 7, 15, 23, 0, tzinfo=BERLIN))
    assert status["quarter"] == 3
    assert status["quarters"] == [1, 4]
    assert status["active"] is False
    assert status["zone"] == ZONE_ST
    assert status["derived_slots"][0] == {"start_h": 22.25, "end_h": 6.25, "class_": "low"}
    winter = modul3_runtime_status(profile, dt.datetime(2026, 1, 10, 23, 0, tzinfo=BERLIN))
    assert winter["active"] is True and winter["zone"] == ZONE_NT


# ── Regel-Ebene: Phase 6.97 lädt nur im gewählten Quartal ───────────────────


def _night_params(options: dict) -> MaestroParams:
    params = _params_from_options(options)
    return dataclasses.replace(
        params,
        low_slot_grid_charge_enabled=True,
        low_slot_target_soc=60.0,
        low_slot_grid_charge_jit=False,
        max_grid_charge_kwh=0.0,
        tariff_mode="fixed",
        ht_enabled=False,
        battery_capacity_kwh=10.0,
        max_charge_power=3000,
    )


def _night_state() -> MaestroState:
    return MaestroState(soc=40, pv_power=0, house_power=500, grid_power=500, battery_power=0)


def test_decide_grid_charges_in_winter_night():
    params = _night_params(_options())
    decision = decide(_night_state(), params, dt.datetime(2026, 1, 14, 23, 0, tzinfo=BERLIN))
    assert decision.phase == PHASE_GRID_CHARGE


@pytest.mark.parametrize(
    "when",
    [
        dt.datetime(2026, 7, 14, 23, 0, tzinfo=BERLIN),
        dt.datetime(2026, 4, 1, 3, 0, tzinfo=BERLIN),
        dt.datetime(2026, 9, 30, 23, 30, tzinfo=BERLIN),
    ],
)
def test_decide_never_grid_charges_outside_quarters(when):
    params = _night_params(_options())
    decision = decide(_night_state(), params, when)
    assert decision.phase != PHASE_GRID_CHARGE


# ── Migration: kopierte Slots → Live-Slots, verhaltensgleich ────────────────


def _filled_options(extra_slots=(), zones=JENA_ZONES) -> dict:
    """Options as left by the old "fill slots from Modul 3" button."""
    options = _options(zones=zones, quarters=None, dynamic_tariff_enabled=True, cheap_threshold=0.12)
    options.pop("modul3_tariff_slots")
    copies = tariff_slots_from_modul3(parse_modul3_profile(options))
    options["tariff_slots"] = [*copies, *extra_slots]
    return options


_USER_SLOT = {
    "weekdays": [0, 1, 2, 3, 4],
    "start_h": 21.0,
    "end_h": 23.0,
    "class_": "low",
    "min_reserve_soc": 25.0,
}


def _slot_key(slot: TariffSlot | None):
    if slot is None:
        return None
    return (slot.start_h, slot.end_h, slot.class_, slot.min_reserve_soc)


@pytest.mark.parametrize("extra", [(), (_USER_SLOT,)])
def test_migration_is_behaviour_neutral_over_a_year(extra):
    old = _filled_options(extra_slots=extra)
    new = migrate_copied_modul3_slots(old)
    assert new is not None
    assert new["modul3_tariff_slots"] is True
    assert new[SLOTS_MIGRATED_KEY] is True
    assert new[TARIFF_SLOTS_BACKUP_KEY] == old["tariff_slots"]
    assert new["tariff_slots"] == list(extra)

    old_schedule = tariff_schedule_from_params(_params_from_options(old))
    new_schedule = tariff_schedule_from_params(_params_from_options(new))
    assert new_schedule.cheap_threshold == old_schedule.cheap_threshold
    for when in _year_local(step_min=15):
        for price in (None, 0.05, 0.30):
            assert current_tariff_class(when, new_schedule, price) == current_tariff_class(
                when, old_schedule, price
            ), (when, price)
        assert _slot_key(active_tariff_slot(when, new_schedule)) == _slot_key(
            active_tariff_slot(when, old_schedule)
        ), when


def test_migration_keeps_legacy_ht_slot_out():
    """All slots were copies: legacy ht_* must not reappear after migration."""
    old = _filled_options()
    old.update({"ht_enabled": True, "ht_on": 6, "ht_off": 9})
    new = migrate_copied_modul3_slots(old)
    assert new is not None and new["tariff_slots"] == []
    old_schedule = tariff_schedule_from_params(_params_from_options(old))
    new_schedule = tariff_schedule_from_params(_params_from_options(new))
    morning = dt.datetime(2026, 2, 10, 7, 0, tzinfo=BERLIN)
    assert current_tariff_class(morning, new_schedule) == current_tariff_class(morning, old_schedule)


def _mutate(options: dict, index: int, **changes) -> dict:
    out = dict(options)
    slots = [dict(s) for s in out["tariff_slots"]]
    slots[index].update(changes)
    out["tariff_slots"] = slots
    return out


@pytest.mark.parametrize(
    "options",
    [
        pytest.param(_mutate(_filled_options(), 0, start_h=22.0), id="edited-window"),
        pytest.param(_mutate(_filled_options(), 0, weekdays=[0, 1, 2, 3, 4]), id="edited-weekdays"),
        pytest.param(_mutate(_filled_options(), 1, min_reserve_soc=30.0), id="reserve-on-copy"),
        pytest.param(
            {**_filled_options(), "tariff_slots": _filled_options()["tariff_slots"][:1]},
            id="ht-copy-deleted",
        ),
        pytest.param(
            {
                **_filled_options(),
                "tariff_slots": [_USER_SLOT, *_filled_options()["tariff_slots"]],
            },
            id="copies-not-at-head",
        ),
        pytest.param({**_filled_options(), "modul3_enabled": False}, id="modul3-off"),
        pytest.param({**_filled_options(), "modul3_quarters": [1, 4]}, id="quarters-set"),
        pytest.param({**_filled_options(), "tariff_slots": []}, id="no-slots"),
    ],
)
def test_migration_leaves_non_copies_untouched(options):
    assert migrate_copied_modul3_slots(options) is None
