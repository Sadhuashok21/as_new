/**
 * UTM Tracking and Activity Logging Utility
 *
 * Captures ?utm_source= (and companion UTMs: utm_medium, utm_campaign, utm_term, utm_content)
 * across all platform pages, preserves them across user navigation, decorates shared links/files,
 * and logs visits to the backend database (total_activity via /insertions/sfs_insert).
 */

export interface UtmData {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  captured_at?: string;
  initial_landing?: string;
}

const STORAGE_KEY = 'as_utm_data';
const STORAGE_SOURCE_KEY = 'as_utm_source';
const LOGGED_CACHE_KEY = 'as_utm_logged_cache';

const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');

/**
 * Extract UTM params from a query string or current window location.
 */
export function extractUtmParams(search?: string): UtmData | null {
  if (typeof window === 'undefined') return null;
  const queryString = search !== undefined ? search : window.location.search;
  if (!queryString) return null;

  const params = new URLSearchParams(queryString);
  const source = params.get('utm_source') || params.get('source') || params.get('ref');

  if (!source) return null;

  return {
    utm_source: source,
    utm_medium: params.get('utm_medium'),
    utm_campaign: params.get('utm_campaign'),
    utm_term: params.get('utm_term'),
    utm_content: params.get('utm_content'),
    captured_at: new Date().toISOString(),
    initial_landing: window.location.pathname,
  };
}

/**
 * Retrieve persisted UTM parameters from sessionStorage or localStorage.
 */
export function getStoredUtm(): UtmData | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // ignore json parse error
  }
  const source = sessionStorage.getItem(STORAGE_SOURCE_KEY) || localStorage.getItem(STORAGE_SOURCE_KEY);
  if (source) {
    return {
      utm_source: source,
      utm_medium: null,
      utm_campaign: null,
      utm_term: null,
      utm_content: null,
    };
  }
  return null;
}

/**
 * Save active UTM data into session & local storage.
 */
export function saveUtm(data: UtmData): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    if (data.utm_source) {
      sessionStorage.setItem(STORAGE_SOURCE_KEY, data.utm_source);
      localStorage.setItem(STORAGE_SOURCE_KEY, data.utm_source);
    }
  } catch {
    // quota exceeded or disabled storage
  }
}

/**
 * Capture UTM from current URL, saving to storage if present.
 * Returns either newly captured UTM data or persisted UTM data.
 */
export function captureAndStoreUtm(search?: string): UtmData | null {
  const fromUrl = extractUtmParams(search);
  if (fromUrl && fromUrl.utm_source) {
    saveUtm(fromUrl);
    return fromUrl;
  }
  return getStoredUtm();
}

/**
 * Returns current active utm_source (from URL or storage).
 */
export function getActiveUtmSource(): string | null {
  const active = captureAndStoreUtm();
  return active?.utm_source || null;
}

/**
 * Append ?utm_source= to any outgoing link or file URL if not already present.
 */
export function appendUtmToUrl(rawUrl: string, defaultSource: string = 'share'): string {
  if (!rawUrl) return rawUrl;
  const activeSource = getActiveUtmSource() || defaultSource;

  try {
    // Handle both relative and absolute URLs
    const isRelative = !rawUrl.startsWith('http://') && !rawUrl.startsWith('https://');
    const dummyBase = 'https://ascentracoresolutions.com';
    const parsed = new URL(isRelative ? `${dummyBase}${rawUrl.startsWith('/') ? '' : '/'}${rawUrl}` : rawUrl);

    if (!parsed.searchParams.has('utm_source')) {
      parsed.searchParams.set('utm_source', activeSource);
      const stored = getStoredUtm();
      if (stored?.utm_medium && !parsed.searchParams.has('utm_medium')) {
        parsed.searchParams.set('utm_medium', stored.utm_medium);
      }
      if (stored?.utm_campaign && !parsed.searchParams.has('utm_campaign')) {
        parsed.searchParams.set('utm_campaign', stored.utm_campaign);
      }
    }

    if (isRelative) {
      return parsed.pathname + parsed.search + parsed.hash;
    }
    return parsed.toString();
  } catch {
    // Fallback simple string append
    if (rawUrl.includes('utm_source=')) return rawUrl;
    const sep = rawUrl.includes('?') ? '&' : '?';
    return `${rawUrl}${sep}utm_source=${encodeURIComponent(activeSource)}`;
  }
}

/**
 * Log a user action or UTM visit directly into the backend database (total_activity).
 */
export async function logUtmRecord(
  activityId: string,
  options?: {
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    userId?: string;
    platform?: string;
    platformName?: string;
  }
): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  const stored = getStoredUtm();
  const utmSource = options?.utmSource || stored?.utm_source || null;
  const utmMedium = options?.utmMedium || stored?.utm_medium || null;
  const utmCampaign = options?.utmCampaign || stored?.utm_campaign || null;

  // Retrieve current logged in user if available
  let userId = options?.userId;
  if (!userId) {
    try {
      const storedUser = localStorage.getItem('as_auth_user') || localStorage.getItem('user');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        userId = parsed.user_id || parsed.id || parsed.username;
      }
    } catch {}
  }

  const payload = {
    activity_id: activityId.slice(0, 50),
    utm_source: utmSource ? utmSource.slice(0, 100) : null,
    utm_medium: utmMedium ? utmMedium.slice(0, 100) : null,
    utm_campaign: utmCampaign ? utmCampaign.slice(0, 100) : null,
    user_id: userId || null,
    platform: options?.platform || 'web',
    platform_name: options?.platformName || 'sfs_blueprints',
  };

  const endpoint = `${API_BASE}/insertions/sfs_insert`;

  try {
    // Use keepalive fetch for high reliability
    await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      keepalive: true,
      credentials: 'include',
    });
    return true;
  } catch {
    // Fallback to GET beacon
    try {
      const query = new URLSearchParams({
        activity_id: payload.activity_id,
        ...(payload.utm_source ? { utm_source: payload.utm_source } : {}),
        ...(payload.utm_medium ? { utm_medium: payload.utm_medium } : {}),
        ...(payload.utm_campaign ? { utm_campaign: payload.utm_campaign } : {}),
        ...(payload.user_id ? { user_id: payload.user_id } : {}),
      }).toString();
      fetch(`${endpoint}?${query}`, { method: 'GET', keepalive: true }).catch(() => {});
      return true;
    } catch {
      return false;
    }
  }
}

/**
 * Check if this route + utm combination has already been logged during this session
 * to prevent duplicate flooding.
 */
function shouldLogVisit(routeKey: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const raw = sessionStorage.getItem(LOGGED_CACHE_KEY);
    const cache = raw ? JSON.parse(raw) : [];
    if (Array.isArray(cache) && cache.includes(routeKey)) {
      return false;
    }
    cache.push(routeKey);
    // Keep max 100 recent entries in session cache
    if (cache.length > 100) cache.shift();
    sessionStorage.setItem(LOGGED_CACHE_KEY, JSON.stringify(cache));
    return true;
  } catch {
    return true;
  }
}

/**
 * Automatically captures UTM parameters from current URL and logs the page visit.
 */
export function trackCurrentPageVisit(pathname: string, search: string): void {
  const activeUtm = captureAndStoreUtm(search);
  const utmSource = activeUtm?.utm_source;

  if (utmSource) {
    const cacheKey = `${pathname}:${utmSource}`;
    if (shouldLogVisit(cacheKey)) {
      // Activity ID capped to 50 chars for database column
      const actId = `utm:${utmSource}:${pathname}`.slice(0, 50);
      logUtmRecord(actId, {
        utmSource,
        utmMedium: activeUtm.utm_medium || undefined,
        utmCampaign: activeUtm.utm_campaign || undefined,
      });
    }
  }
}

