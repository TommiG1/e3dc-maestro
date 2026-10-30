/** Maestro News tip: RSS latest item + browser-local seen/enabled state. */

export interface NewsItem {
  title: string;
  link: string;
  guid: string;
  description: string;
  pub_date: string;
}

export interface NewsFeedResult {
  ok: boolean;
  item?: NewsItem;
  error?: string;
}

/**
 * Bump this on a release that should show the latest News tip once after update.
 * Empty string = only real RSS changes (no forced post-update tip).
 */
export const NEWS_TIP_CAMPAIGN = "news-tip-v1";

const SEEN_KEY = "e3dc-maestro.news-seen.v1";
const HINTS_KEY = "e3dc-maestro.news-hints.v1";
const CAMPAIGN_KEY = "e3dc-maestro.news-tip-campaign.v1";

export const NEWS_SITE_URL = "https://glowdash.de/maestro/news/";

export function parseNewsItem(raw: unknown): NewsItem | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const row = raw as Record<string, unknown>;
  const title = typeof row.title === "string" ? row.title.trim() : "";
  const link = typeof row.link === "string" ? row.link.trim() : "";
  const guid = typeof row.guid === "string" ? row.guid.trim() : link;
  const description = typeof row.description === "string" ? row.description.trim() : "";
  const pub_date = typeof row.pub_date === "string" ? row.pub_date.trim() : "";
  if (!title || !link || !guid) return undefined;
  return { title, link, guid, description, pub_date };
}

export function parseNewsItems(raw: unknown): NewsItem[] {
  if (!Array.isArray(raw)) {
    const one = parseNewsItem(raw);
    return one ? [one] : [];
  }
  const out: NewsItem[] = [];
  for (const row of raw) {
    const item = parseNewsItem(row);
    if (item) out.push(item);
    if (out.length >= 3) break;
  }
  return out;
}

/** Missing key = enabled (default on). Explicit "0" turns hints off. */
export function parseNewsHintsEnabled(raw: string | null): boolean {
  return raw !== "0";
}

export function loadNewsHintsEnabled(): boolean {
  try {
    return parseNewsHintsEnabled(localStorage.getItem(HINTS_KEY));
  } catch {
    return true;
  }
}

export function saveNewsHintsEnabled(enabled: boolean): void {
  try {
    localStorage.setItem(HINTS_KEY, enabled ? "1" : "0");
  } catch {
    // storage blocked: choice still applies for this session
  }
}

export function loadSeenGuid(): string | undefined {
  try {
    const raw = localStorage.getItem(SEEN_KEY);
    return raw && raw.trim() ? raw.trim() : undefined;
  } catch {
    return undefined;
  }
}

export function saveSeenGuid(guid: string): void {
  try {
    localStorage.setItem(SEEN_KEY, guid);
  } catch {
    // storage blocked: seen still applies for this session
  }
}

export function loadNewsCampaignAck(): string | undefined {
  try {
    const raw = localStorage.getItem(CAMPAIGN_KEY);
    return raw && raw.trim() ? raw.trim() : undefined;
  } catch {
    return undefined;
  }
}

export function saveNewsCampaignAck(campaign: string): void {
  if (!campaign) return;
  try {
    localStorage.setItem(CAMPAIGN_KEY, campaign);
  } catch {
    // storage blocked: ack still applies for this session
  }
}

export function campaignPending(campaignAck: string | undefined, campaign = NEWS_TIP_CAMPAIGN): boolean {
  return Boolean(campaign) && campaignAck !== campaign;
}

/**
 * First visit (no seen guid, no campaign): seed silently, no badge.
 * Active release campaign: show latest once until dismissed (even if guid already seen).
 * Later: badge when latest guid differs and hints are on.
 */
export function applyNewsFetch(
  item: NewsItem | undefined,
  seen: string | undefined,
  enabled: boolean,
  campaignAck?: string | undefined,
  campaign = NEWS_TIP_CAMPAIGN,
): { seen: string | undefined; unread: boolean; seeded: boolean } {
  if (!item) return { seen, unread: false, seeded: false };
  if (!enabled) return { seen, unread: false, seeded: false };
  if (campaignPending(campaignAck, campaign)) {
    return { seen, unread: true, seeded: false };
  }
  if (!seen) return { seen: item.guid, unread: false, seeded: true };
  return { seen, unread: item.guid !== seen, seeded: false };
}
