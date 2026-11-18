"""Hold last good delta when an additional lifetime meter is unavailable."""
from __future__ import annotations

from types import SimpleNamespace

import pytest

from custom_components.e3dc_maestro.const import (
    STAT_PV_ADDITIONAL_INTEGRATED,
    STAT_PV_ADDITIONAL_TODAY,
)
from custom_components.e3dc_maestro.coordinator import E3DCMaestroCoordinator


@pytest.mark.asyncio
async def test_additional_today_holds_last_delta_when_meter_unavailable():
    reads = iter([110.0, None])

    coord = SimpleNamespace(
        _additional_bases={"sensor.add_total": 100.0},
        _additional_last_delta={},
        stats={
            STAT_PV_ADDITIONAL_INTEGRATED: 0.0,
            STAT_PV_ADDITIONAL_TODAY: 0.0,
        },
        _read_energy_total_kwh=lambda _eid: next(reads, None),
        _async_today_stat_change=lambda _eid: None,
        _additional_total_entity_ids=lambda _opts: ["sensor.add_total"],
        _additional_power_entity_ids=lambda _opts: [],
    )
    method = E3DCMaestroCoordinator._async_additional_today_kwh.__get__(
        coord, E3DCMaestroCoordinator
    )

    first = await method({}, None, 0.0)
    assert first == pytest.approx(10.0)
    second = await method({}, None, 0.0)
    assert second == pytest.approx(10.0)