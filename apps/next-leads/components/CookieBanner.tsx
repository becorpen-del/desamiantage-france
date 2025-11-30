"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "desamiant-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      setVisible(stored !== "accepted");
    } catch (error) {
      console.warn("Impossible de lire le consentement cookie", error);
    }
  }, []);

  const accept = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "accepted");
    } catch (error) {
      console.warn("Impossible d'enregistrer le consentement", error);
    }
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 bg-slate-900 text-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-200">
          Nous utilisons des cookies analytiques pour mesurer l&apos;audience et améliorer le service.
          Consultez notre <Link href="/politique-confidentialite" className="text-brand underline">politique de confidentialité</Link>.
        </p>
        <button
          type="button"
          onClick={accept}
          className="inline-flex w-full justify-center rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white shadow-sm sm:w-auto"
        >
          Accepter
        </button>
      </div>
    </div>
  );
}
