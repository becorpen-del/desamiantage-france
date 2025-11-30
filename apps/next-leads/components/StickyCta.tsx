"use client";

import { useEffect, useState } from "react";

import { fireLeadCtaClick } from "@/lib/utils";

type StickyCtaProps = {
  label?: string;
  anchorId?: string;
};

export function StickyCta({ label = "Demander un devis", anchorId = "devis" }: StickyCtaProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 320);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    fireLeadCtaClick(label);
    const target = document.getElementById(anchorId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.hash = `#${anchorId}`;
    }
  };

  return (
    <div
      className={`fixed inset-x-0 bottom-4 z-50 px-4 transition duration-300 sm:hidden ${
        isVisible ? "translate-y-0" : "translate-y-24"
      }`}
      aria-hidden={!isVisible}
    >
      <div className="mx-auto max-w-sm rounded-full border border-slate-900/10 bg-slate-900/95 px-3 py-2 shadow-2xl">
        <button
          type="button"
          onClick={handleClick}
          className="w-full rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/40 transition hover:bg-brand/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          {label}
        </button>
      </div>
    </div>
  );
}
