"""§14a Modul 3 – Zone, Preisschicht, Tarif-Slots."""
from __future__ import annotations

import datetime as dt

from custom_components.e3dc_maestro.modul3 import (
    ZONE_HT,
    ZONE_NT,
    ZONE_ST,
    Modul3Profile,
    Modul3Window,
    Modul3Zone,
    add_modul3_to_horizon,
    clean_modul3_zones,
    parse_modul3_profile,
    tariff_slots_from_modul3,
    zone_at,
)
from custom_components.e3dc_maestro.price_curve import PriceHorizon

TZ = dt.timezone(dt.timedelta(hours=1))


def _profile(**kwargs) -> Modul3Profile:
    zones = {
        ZONE_NT: Modul3Zone(3.84, (Modul3Window(0.0, 5.0),)),
        ZONE_ST: Modul3Zone(9.59, ()),
        ZONE_HT: Modul3Zone(11.21, (Modul3Window(17.0, 21.0),)),
    }
    return Modul3Profile(enabled=True, add_to_curve=True, apply_vat=False, zones=zones, **kwargs)


def test_zone_priority_ht_over_nt():
    profile = Modul3Profile(
        enabled=True,
        zones={
            ZONE_NT: Modul3Zone(1.0, (Modul3Window(0.0, 24.0),)),
            ZONE_ST: Modul3Zone(2.0, ()),
            ZONE_HT: Modul3Zone(3.0, (Modul3Window(10.0, 12.0),)),
        },
    )
    assert zone_at(dt.datetime(2026, 4, 1, 11, 0, tzinfo=TZ), profile) == ZONE_HT
    assert zone_at(dt.datetime(2026, 4, 1, 3, 0, tzinfo=TZ), profile) == ZONE_NT


def test_zone_rest_is_st():
    assert zone_at(dt.datetime(2026, 4, 1, 12, 0, tzinfo=TZ), _profile()) == ZONE_ST


def test_midnight_window():
    profile = Modul3Profile(
        enabled=True,
        zones={
            ZONE_NT: Modul3Zone(1.0, (Modul3Window(22.0, 6.0),)),
            ZONE_ST: Modul3Zone(2.0, ()),
            ZONE_HT: Modul3Zone(3.0, ()),
        },
    )
    assert zone_at(dt.datetime(2026, 4, 1, 23, 0, tzinfo=TZ), profile) == ZONE_NT
    assert zone_at(dt.datetime(2026, 4, 1, 5, 0, tzinfo=TZ), profile) == ZONE_NT
    assert zone_at(dt.datetime(2026, 4, 1, 12, 0, tzinfo=TZ), profile) == ZONE_ST


def test_add_to_horizon_nt_and_st():
    now = dt.datetime(2026, 4, 1, 3, 0, tzinfo=TZ)
    horizon = PriceHorizon(
        start=now,
        slot_hours=[2.0, 2.0],
        prices=[0.20, 0.20],
        known_until=now + dt.timedelta(hours=4),
    )
    # Slot midpoints: 04:00 → NT (+0.0384), 06:00 → ST (+0.0959)
    out = add_modul3_to_horizon(horizon, _profile(), now)
    assert out is not None
    assert abs(out.prices[0] - 0.2384) < 1e-6
    assert abs(out.prices[1] - 0.2959) < 1e-6


def test_add_skipped_when_all_in():
    now = dt.datetime(2026, 4, 1, 3, 0, tzinfo=TZ)
    horizon = PriceHorizon(start=now, slot_hours=[1.0], prices=[0.20], known_until=now + dt.timedelta(hours=1))
    profile = _profile()
    profile = Modul3Profile(
        enabled=True,
        add_to_curve=False,
        apply_vat=False,
        zones=profile.zones,
    )
    assert add_modul3_to_horizon(horizon, profile, now) is horizon


def test_vat_multiplier():
    profile = _profile()
    profile = Modul3Profile(enabled=True, add_to_curve=True, apply_vat=True, zones=profile.zones)
    assert abs(profile.fee_eur(ZONE_NT) - 0.0384 * 1.19) < 1e-9


def test_tariff_slots_from_modul3():
    slots = tariff_slots_from_modul3(_profile())
    assert len(slots) == 2
    assert slots[0]["class_"] == "low" and slots[0]["start_h"] == 0.0
    assert slots[1]["class_"] == "high" and slots[1]["start_h"] == 17.0
    assert slots[0]["weekdays"] == list(range(7))


def test_parse_and_clean_zones():
    options = {
        "modul3_enabled": True,
        "modul3_add_to_curve": True,
        "modul3_apply_vat": False,
        "modul3_zones": {
            "nt": {"price_ct_kwh": 3.84, "windows": [{"start_h": 0, "end_h": 5}]},
            "st": {"price_ct_kwh": 9.59, "windows": []},
            "ht": {"price_ct_kwh": 11.21, "windows": [{"start_h": 17, "end_h": 21}]},
        },
    }
    profile = parse_modul3_profile(options)
    assert profile.enabled and profile.zones[ZONE_NT].price_ct_kwh == 3.84
    cleaned, err = clean_modul3_zones(options["modul3_zones"])
    assert err is None and cleaned is not None
    assert cleaned["nt"]["windows"][0]["end_h"] == 5.0
