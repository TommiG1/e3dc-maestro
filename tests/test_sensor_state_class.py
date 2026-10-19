"""device_class / state_class must match Home Assistant's sensor rules."""
from __future__ import annotations

from custom_components.e3dc_maestro.sensor import SENSOR_DESCRIPTIONS

# homeassistant/components/sensor/const.py DEVICE_CLASS_STATE_CLASSES
_ALLOWED = {
    "energy": {"total", "total_increasing"},
    "monetary": {"total"},
    "power": {"measurement"},
    "battery": {"measurement"},
}


def test_device_class_accepts_state_class():
    bad = [
        (desc.key, desc.device_class, desc.state_class)
        for desc in SENSOR_DESCRIPTIONS
        if desc.device_class is not None
        and desc.state_class is not None
        and desc.state_class not in _ALLOWED.get(desc.device_class, set())
    ]
    assert bad == []
