"""Maestro News RSS parser for the cockpit tip."""
from __future__ import annotations

from custom_components.e3dc_maestro.news_feed import parse_items, parse_latest_item

SAMPLE = """<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Maestro News</title>
    <item>
      <title>Home Assistant und E3DC</title>
      <link>https://glowdash.de/maestro/news/e3dc-home-assistant-community/</link>
      <guid isPermaLink="true">https://glowdash.de/maestro/news/e3dc-home-assistant-community/</guid>
      <pubDate>Fri, 30 Oct 2026 00:00:00 GMT</pubDate>
      <description>E3/DC schreibt jetzt &lt;b&gt;öffentlich&lt;/b&gt; über Home Assistant.</description>
    </item>
    <item>
      <title>Older</title>
      <link>https://example.test/older/</link>
      <guid>https://example.test/older/</guid>
    </item>
  </channel>
</rss>
"""


def test_parse_latest_item_takes_first():
    item = parse_latest_item(SAMPLE)
    assert item is not None
    assert item["title"] == "Home Assistant und E3DC"
    assert item["link"].endswith("e3dc-home-assistant-community/")
    assert item["guid"].endswith("e3dc-home-assistant-community/")
    assert item["description"] == "E3/DC schreibt jetzt öffentlich über Home Assistant."
    assert "2026" in item["pub_date"]


def test_parse_latest_item_invalid_xml():
    assert parse_latest_item("not xml") is None


def test_parse_latest_item_empty_channel():
    xml = """<?xml version="1.0"?><rss><channel><title>x</title></channel></rss>"""
    assert parse_latest_item(xml) is None


def test_parse_latest_item_guid_falls_back_to_link():
    xml = """<?xml version="1.0"?><rss><channel><item>
      <title>T</title><link>https://example.test/a/</link><description>d</description>
    </item></channel></rss>"""
    item = parse_latest_item(xml)
    assert item is not None
    assert item["guid"] == "https://example.test/a/"


def test_parse_items_limit():
    items = parse_items(SAMPLE, limit=2)
    assert len(items) == 2
    assert items[0]["title"] == "Home Assistant und E3DC"
    assert items[1]["title"] == "Older"
