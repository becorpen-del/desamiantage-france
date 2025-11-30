export type TrackingPayload = {
  source?: string | null;
  medium?: string | null;
  campaign?: string | null;
  term?: string | null;
  content?: string | null;
  gclid?: string | null;
};

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
] as const;

export function parseTrackingFromSearch(search: string): TrackingPayload {
  const params = new URLSearchParams(search);

  return {
    source: params.get("utm_source"),
    medium: params.get("utm_medium"),
    campaign: params.get("utm_campaign"),
    term: params.get("utm_term"),
    content: params.get("utm_content"),
    gclid: params.get("gclid"),
  };
}

export function serializeTracking(payload: TrackingPayload): Record<string, string> {
  const entries = Object.entries(payload).filter(([, value]) => Boolean(value));
  return Object.fromEntries(entries) as Record<string, string>;
}

export function mergeTracking(
  primary?: TrackingPayload,
  fallback?: TrackingPayload,
): TrackingPayload {
  return {
    source: primary?.source ?? fallback?.source ?? null,
    medium: primary?.medium ?? fallback?.medium ?? null,
    campaign: primary?.campaign ?? fallback?.campaign ?? null,
    term: primary?.term ?? fallback?.term ?? null,
    content: primary?.content ?? fallback?.content ?? null,
    gclid: primary?.gclid ?? fallback?.gclid ?? null,
  };
}
