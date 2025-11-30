const FALLBACK_BRAND = "Desamiant'Pro";
const FALLBACK_PRIMARY = "#0E7490";
const FALLBACK_SITE_URL = "https://www.desamiant-pro.fr";

const brandName =
  process.env.NEXT_PUBLIC_BRAND_NAME ??
  process.env.BRAND_NAME ??
  FALLBACK_BRAND;
const primaryColor =
  process.env.NEXT_PUBLIC_PRIMARY_COLOR ??
  process.env.PRIMARY_COLOR ??
  FALLBACK_PRIMARY;
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.SITE_URL ??
  FALLBACK_SITE_URL;
const honeypotField =
  process.env.NEXT_PUBLIC_HONEYPOT_FIELD_NAME ??
  process.env.HONEYPOT_FIELD_NAME ??
  "_company";
const submitDelay = Number(
  process.env.NEXT_PUBLIC_MIN_SUBMIT_DELAY_MS ??
    process.env.MIN_SUBMIT_DELAY_MS ??
    2500,
);

export function getBrandName(): string {
  return brandName;
}

export function getPrimaryColor(): string {
  return primaryColor;
}

export function getSiteUrl(): string {
  return siteUrl.replace(/\/+$/, "");
}

export const HONEYPOT_FIELD_NAME = honeypotField;
export const MIN_SUBMIT_DELAY_MS = Number.isFinite(submitDelay)
  ? submitDelay
  : 2500;

export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function extractDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export function formatPhoneForLink(phone: string): string {
  const digits = extractDigits(phone);
  if (!digits) {
    return "";
  }

  const hasInternationalPrefix = phone.trim().startsWith("+");
  return hasInternationalPrefix ? `+${digits}` : digits;
}

export function formatPhoneForDisplay(phone: string): string {
  const normalized = formatPhoneForLink(phone);

  if (normalized.startsWith("+33")) {
    const digits = normalized.slice(3);
    return `+33 ${digits.replace(/(\d{1})(?=(\d{2})+(?!\d))/g, "$1 ")}`.trim();
  }

  const digits = extractDigits(normalized);
  if (digits.length === 10 && digits.startsWith("0")) {
    return digits.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
  }

  return normalized;
}

export function formatPhoneInput(value: string): string {
  const trimmed = value.trim();
  const digits = extractDigits(trimmed);
  if (!digits) {
    return trimmed.startsWith("+") ? "+" : "";
  }

  if (trimmed.startsWith("+")) {
    return `+${digits.replace(/(\d{1,3})(?=\d)/g, "$1 ")}`.trim();
  }

  if (digits.length <= 10) {
    return digits.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
  }

  return digits.replace(/(\d{3})(?=\d)/g, "$1 ").trim();
}

export function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function buildCanonical(pathname: string): string {
  const base = getSiteUrl();
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const trimmedPath =
    normalizedPath === "/" ? "" : normalizedPath.replace(/\/+$/, "");
  return `${base}${trimmedPath}`;
}

export function fireLeadEvent(score?: number): void {
  if (!isBrowser()) {
    return;
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", "lead_submitted", {
      event_category: "lead",
      value: score ?? undefined,
    });
  }
}

export function fireLeadCtaClick(label: string): void {
  if (!isBrowser()) {
    return;
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", "lead_cta_click", {
      event_category: "engagement",
      event_label: label,
    });
  }
}
