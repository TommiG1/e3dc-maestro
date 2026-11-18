"""Select-Plattform: alle Entitäten lassen sich anlegen (ein Fehler legt alle Selects lahm)."""
from __future__ import annotations

import asyncio
from types import SimpleNamespace

from custom_components.e3dc_maestro import select
from custom_components.e3dc_maestro.const import DOMAIN


def test_select_platform_sets_up_all_entities():
    coord = SimpleNamespace(entry=SimpleNamespace(entry_id="eid", options={}))
    hass = SimpleNamespace(data={DOMAIN: {"eid": coord}})
    added: list = []

    asyncio.run(select.async_setup_entry(hass, coord.entry, added.extend))

    names = {type(e).__name__: e._attr_name for e in added}
    assert names["MaestroWallboxModeSelect"] == "Wallbox-Lademodus"
    assert len(names) == 6
    assert all(e.entity_id for e in added)
