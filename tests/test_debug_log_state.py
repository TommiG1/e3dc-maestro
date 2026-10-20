"""debug_log sensor state must stay within Home Assistant's 255-char limit."""
from __future__ import annotations

from custom_components.e3dc_maestro.debug_log_format import (
    HA_STATE_MAX_LEN,
    format_debug_log_state,
)


def test_empty_log() -> None:
    assert format_debug_log_state([]) == ""
    assert format_debug_log_state(None) == ""


def test_short_lines_unchanged() -> None:
    lines = ["10:00:00 a", "10:01:00 b"]
    assert format_debug_log_state(lines) == "10:00:00 a\n10:01:00 b"


def test_prefers_newest_lines_when_over_limit() -> None:
    old = "x" * 200
    new = "y" * 200
    text = format_debug_log_state([old, new], limit=255)
    assert len(text) <= 255
    assert "y" in text
    assert "x" not in text


def test_single_oversized_line_truncated() -> None:
    line = "z" * 400
    text = format_debug_log_state([line])
    assert text == line[:HA_STATE_MAX_LEN]
    assert len(text) == HA_STATE_MAX_LEN


def test_gemuesepudding_style_verbose_lines_fit() -> None:
    """Reproduce the Core error: five verbose German rule lines > 255 chars."""
    lines = [
        "10:13:55 Parameter 'low_slot_forecast_based' geändert → True",
        (
            "10:14:57 [corridor] mode=normal power=12000.0W → Ladekorridor "
            "[Schwacher-PV-Tag: Überschuss-Priorität]: SoC 1% → Ladeende-Ziel 100% "
            "(Rampen-Ziel 52% übersteuert), max_charge 12000 W "
            "(E3DC nutzt PV-Überschuss, kein Netz, Restprognose-Deckung 0.11)"
        ),
        "10:22:33 Parameter 'battery_capex_eur' geändert → 1.0",
        "10:22:50 Parameter 'price_plan_enabled' geändert → True",
        (
            "10:30:57 [grid_charge] mode=charge power=12000.0W → Netzladung im "
            "günstigen Slot: SoC 1% < Ziel 30% (prognosebasiert), Restbudget 60.0 kWh"
        ),
    ]
    joined = "\n".join(lines)
    assert len(joined) > HA_STATE_MAX_LEN
    text = format_debug_log_state(lines)
    assert len(text) <= HA_STATE_MAX_LEN
    assert "grid_charge" in text
