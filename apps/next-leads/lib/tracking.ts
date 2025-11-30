"use client";

import { mergeTracking, parseTrackingFromSearch, type TrackingPayload } from "@shared/tracking";
import { useEffect, useMemo, useState } from "react";

import { isBrowser } from "./utils";

const STORAGE_KEY = "desamiant-tracking";

function readStoredTracking(): TrackingPayload | undefined {
  if (!isBrowser()) {
    return undefined;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as TrackingPayload) : undefined;
  } catch (error) {
    console.warn("Impossible de lire le tracking local", error);
    return undefined;
  }
}

function persistTracking(payload: TrackingPayload): void {
  if (!isBrowser()) {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (error) {
    console.warn("Impossible d'enregistrer le tracking local", error);
  }
}

export function useTracking(): TrackingPayload {
  const [tracking, setTracking] = useState<TrackingPayload>(() => readStoredTracking() ?? {});

  useEffect(() => {
    if (!isBrowser()) {
      return;
    }

    const fromUrl = parseTrackingFromSearch(window.location.search);
    const merged = mergeTracking(fromUrl, readStoredTracking());
    setTracking(merged);
    persistTracking(merged);
  }, []);

  return useMemo(() => tracking, [tracking]);
}

export function buildTrackingPayload(params: TrackingPayload): Record<string, string> {
  return Object.fromEntries(
    Object.entries(params)
      .filter(([, value]) => Boolean(value))
      .map(([key, value]) => [key, value as string]),
  );
}
