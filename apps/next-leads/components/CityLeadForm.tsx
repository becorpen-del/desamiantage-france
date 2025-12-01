"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

type CityLeadFormProps = {
  cityName: string;
  postalFallback: string;
};

type Option = { value: string; label: string };

const travauxOptions: Option[] = [
  { value: "", label: "Sélectionnez…" },
  { value: "toiture", label: "Désamiantage toiture" },
  { value: "fibrociment", label: "Retrait fibrociment" },
  { value: "diagnostic", label: "Diagnostic amiante" },
  { value: "autre", label: "Autre (préciser)" },
];

function useClickOutside(ref: RefObject<HTMLElement>, onClose: () => void) {
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose, ref]);
}

export function CityLeadForm({ cityName, postalFallback }: CityLeadFormProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option>(travauxOptions[0]);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(wrapRef, () => setOpen(false));

  return (
    <form action="/devis-submit/" method="POST" className="mt-5 grid gap-3">
      <input type="hidden" name="ville" value={cityName} />
      <input type="hidden" name="code_postal" value={postalFallback} />

      <label className="text-xs font-semibold uppercase tracking-wide text-slate-300">
        Type de travaux *
        {/* Wrapper en relative pour ancrer le menu déroulant sous le champ */}
        <div ref={wrapRef} className="relative mt-1">
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={open}
            onClick={() => setOpen(prev => !prev)}
            className="input flex w-full items-center justify-between text-left"
          >
            <span>{selected.label}</span>
            <svg
              aria-hidden
              className={`h-4 w-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 8l4 4 4-4" />
            </svg>
          </button>
          {open ? (
            // Menu en absolute aligné sous le champ, même largeur, z-index élevé pour mobile
            <ul className="absolute left-0 top-full z-50 mt-1 w-full max-h-60 overflow-auto rounded-lg border border-slate-200 bg-slate-900 text-sm text-white shadow-lg">
              {travauxOptions.map(option => (
                <li key={option.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={option.value === selected.value}
                    onClick={() => {
                      setSelected(option);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between px-3 py-2 text-left hover:bg-slate-800 ${
                      option.value === selected.value ? "bg-slate-800 font-semibold text-white" : "text-slate-200"
                    }`}
                  >
                    <span>{option.label}</span>
                    {option.value === selected.value ? (
                      <svg
                        aria-hidden
                        className="h-4 w-4 text-emerald-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
          <input type="hidden" name="type_travaux" value={selected.value} />
        </div>
      </label>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-300">
          Surface estimée
          <input className="input mt-1" type="number" name="surface" placeholder="m²" />
        </label>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-300">
          Code postal chantier *
          <input className="input mt-1" type="text" name="code_postal_ville" placeholder="Ex. 69001" required />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <input className="input" type="text" name="nom" placeholder="Nom et prénom *" required />
        <input className="input" type="tel" name="tel" placeholder="Téléphone *" required />
      </div>
      <input className="input" type="email" name="email" placeholder="Email *" required />

      <label className="inline-flex items-start gap-2 text-xs text-slate-300">
        <input type="checkbox" name="rgpd" required className="mt-1 accent-emerald-500" />
        <span>
          J&apos;accepte d&apos;être recontacté par les entreprises partenaires pour l&apos;étude de mon dossier (max 3 devis).
          Mes données sont traitées conformément à notre politique de confidentialité.
        </span>
      </label>

      <button type="submit" className="btn-cta justify-center">
        Recevoir mes devis gratuits
      </button>

      <p className="text-center text-[11px] text-slate-400">✓ Gratuit · ✓ Sans engagement · ✓ Réponse sous 24h</p>
    </form>
  );
}
