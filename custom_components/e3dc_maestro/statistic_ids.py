"""IDs of the external statistics written by the CSV history import.

Dependency free on purpose, so importer, sizing and consumption stats can all
use it without circular imports.
"""
from __future__ import annotations

STAT_SOURCE = "e3dc_maestro"
HISTORY_PREFIX = f"{STAT_SOURCE}:history_"

# Cumulative kWh series (has_sum).
HISTORY_ENERGY_ROLES: tuple[str, ...] = (
    "solar",
    "external",
    "grid_import",
    "grid_export",
    "battery_charge",
    "battery_discharge",
    "house",
    "wallbox",
    "heat_pump",
)
# Hourly mean in W (has_mean).
HISTORY_POWER_ROLES: tuple[str, ...] = ("house_power",)
HISTORY_ROLES: tuple[str, ...] = (*HISTORY_ENERGY_ROLES, *HISTORY_POWER_ROLES)


def history_statistic_id(role: str) -> str:
    return f"{HISTORY_PREFIX}{role}"


HISTORY_SOLAR = history_statistic_id("solar")
HISTORY_EXTERNAL = history_statistic_id("external")
HISTORY_GRID_IMPORT = history_statistic_id("grid_import")
HISTORY_GRID_EXPORT = history_statistic_id("grid_export")
HISTORY_BATTERY_CHARGE = history_statistic_id("battery_charge")
HISTORY_BATTERY_DISCHARGE = history_statistic_id("battery_discharge")
HISTORY_HOUSE = history_statistic_id("house")
HISTORY_WALLBOX = history_statistic_id("wallbox")
HISTORY_HEAT_PUMP = history_statistic_id("heat_pump")
HISTORY_HOUSE_POWER = history_statistic_id("house_power")

ALL_HISTORY_IDS: tuple[str, ...] = tuple(history_statistic_id(r) for r in HISTORY_ROLES)
