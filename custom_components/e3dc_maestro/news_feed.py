"""Fetch and parse Maestro News RSS for the cockpit tip."""
from __future__ import annotations

import logging
import re
from html import unescape
from typing import TYPE_CHECKING, Any
from xml.etree import ElementTree as ET

if TYPE_CHECKING:
    from homeassistant.core import HomeAssistant

_LOGGER = logging.getLogger(__name__)

NEWS_FEED_URL = "https://glowdash.de/maestro/news/feed.xml"
NEWS_HISTORY_LIMIT = 3
_TAG = re.compile(r"<[^>]+>")


def _text(node: ET.Element | None) -> str:
    if node is None or node.text is None:
        return ""
    return node.text.strip()


def _strip_html(raw: str) -> str:
    return unescape(_TAG.sub("", raw)).strip()


def _item_dict(item: ET.Element) -> dict[str, str] | None:
    title = _text(item.find("title"))
    link = _text(item.find("link"))
    guid = _text(item.find("guid")) or link
    description = _strip_html(_text(item.find("description")))
    pub_date = _text(item.find("pubDate"))
    if not title or not link or not guid:
        return None
    return {
        "title": title,
        "link": link,
        "guid": guid,
        "description": description,
        "pub_date": pub_date,
    }


def parse_items(xml_text: str, limit: int = NEWS_HISTORY_LIMIT) -> list[dict[str, str]]:
    """Return up to ``limit`` RSS items in feed order."""
    try:
        root = ET.fromstring(xml_text)
    except ET.ParseError:
        return []
    channel = root.find("channel")
    if channel is None:
        return []
    out: list[dict[str, str]] = []
    for item in channel.findall("item"):
        row = _item_dict(item)
        if row is None:
            continue
        out.append(row)
        if len(out) >= limit:
            break
    return out


def parse_latest_item(xml_text: str) -> dict[str, str] | None:
    """Return the first RSS item as a plain dict, or None if empty/invalid."""
    items = parse_items(xml_text, 1)
    return items[0] if items else None


async def async_fetch_latest(hass: HomeAssistant) -> dict[str, Any]:
    """Fetch the public feed; never raises into the websocket handler."""
    from aiohttp import ClientError, ClientTimeout
    from homeassistant.helpers.aiohttp_client import async_get_clientsession

    session = async_get_clientsession(hass)
    try:
        async with session.get(NEWS_FEED_URL, timeout=ClientTimeout(total=8)) as response:
            if response.status != 200:
                _LOGGER.debug("Maestro news feed HTTP %s", response.status)
                return {"ok": False, "error": f"http_{response.status}"}
            body = await response.text()
    except (ClientError, TimeoutError, OSError) as err:
        _LOGGER.debug("Maestro news feed failed: %s", err)
        return {"ok": False, "error": "fetch_failed"}
    items = parse_items(body, NEWS_HISTORY_LIMIT)
    if not items:
        return {"ok": False, "error": "empty"}
    return {"ok": True, "items": items, "item": items[0]}
