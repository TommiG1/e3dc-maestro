import { describe, expect, it } from "vitest";
import {
  applyNewsFetch,
  campaignPending,
  parseNewsHintsEnabled,
  parseNewsItem,
  parseNewsItems,
} from "./news";

const item = {
  title: "A",
  link: "https://example.test/a/",
  guid: "https://example.test/a/",
  description: "teaser",
  pub_date: "Fri, 30 Oct 2026 00:00:00 GMT",
};

describe("parseNewsItem", () => {
  it("requires title link and guid", () => {
    expect(parseNewsItem({ title: "x" })).toBeUndefined();
    expect(parseNewsItem(item)?.guid).toBe(item.guid);
  });

  it("falls back guid to link", () => {
    expect(parseNewsItem({ title: "t", link: "https://x/" })?.guid).toBe("https://x/");
  });
});

describe("parseNewsItems", () => {
  it("takes up to three items", () => {
    const rows = [
      item,
      { ...item, title: "B", guid: "b", link: "https://example.test/b/" },
      { ...item, title: "C", guid: "c", link: "https://example.test/c/" },
      { ...item, title: "D", guid: "d", link: "https://example.test/d/" },
    ];
    expect(parseNewsItems(rows).map((row) => row.title)).toEqual(["A", "B", "C"]);
  });
});

describe("parseNewsHintsEnabled", () => {
  it("defaults to on", () => {
    expect(parseNewsHintsEnabled(null)).toBe(true);
    expect(parseNewsHintsEnabled("1")).toBe(true);
    expect(parseNewsHintsEnabled("0")).toBe(false);
  });
});

describe("campaignPending", () => {
  it("is false when campaign empty", () => {
    expect(campaignPending(undefined, "")).toBe(false);
  });

  it("is true until ack matches", () => {
    expect(campaignPending(undefined, "news-tip-v1")).toBe(true);
    expect(campaignPending("old", "news-tip-v1")).toBe(true);
    expect(campaignPending("news-tip-v1", "news-tip-v1")).toBe(false);
  });
});

describe("applyNewsFetch", () => {
  it("seeds first visit without badge when no campaign", () => {
    const next = applyNewsFetch(item, undefined, true, undefined, "");
    expect(next).toEqual({ seen: item.guid, unread: false, seeded: true });
  });

  it("shows unread when guid changed", () => {
    expect(applyNewsFetch(item, "old", true, "done", "").unread).toBe(true);
    expect(applyNewsFetch(item, item.guid, true, "done", "").unread).toBe(false);
  });

  it("hides when hints disabled", () => {
    expect(applyNewsFetch(item, "old", false, undefined, "news-tip-v1").unread).toBe(false);
  });

  it("forces unread once for an active release campaign", () => {
    const next = applyNewsFetch(item, item.guid, true, undefined, "news-tip-v1");
    expect(next.unread).toBe(true);
    expect(next.seeded).toBe(false);
    expect(applyNewsFetch(item, item.guid, true, "news-tip-v1", "news-tip-v1").unread).toBe(false);
  });
});
