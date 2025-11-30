"use client";

import Link from "next/link";
import { useCallback } from "react";

import { fireLeadCtaClick } from "@/lib/utils";

import type { Route } from "next";

type CtaVariant = "primary" | "secondary";

export type CtaHref =
  | Route
  | { hash: string }
  | { pathname: string; params?: Record<string, string> }
  | string;

type CtaButtonProps = {
  href: CtaHref;
  label: string;
  variant?: CtaVariant;
  trackingLabel?: string;
  className?: string;
};

export function CtaButton({ href, label, variant = "primary", trackingLabel, className }: CtaButtonProps) {
  const handleClick = useCallback(() => {
    fireLeadCtaClick(trackingLabel ?? label);
  }, [label, trackingLabel]);

  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

  const variantClasses =
    variant === "primary"
      ? "bg-brand text-white shadow-lg shadow-brand/30 hover:bg-brand/90"
      : "bg-white/90 text-brand ring-1 ring-brand/30 hover:bg-white";

  const resolvedHref = typeof href === "string"
    ? href.startsWith("#")
      ? { hash: href.slice(1) }
      : (href as Route)
    : href;

  return (
    <Link
      href={resolvedHref}
      className={`${baseClasses} ${variantClasses}${className ? ` ${className}` : ""}`}
      onClick={handleClick}
      data-analytics-event="lead_cta_click"
    >
      {label}
    </Link>
  );
}
