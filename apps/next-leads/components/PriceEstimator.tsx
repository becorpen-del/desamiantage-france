"use client";

import { useMemo, useState } from "react";

import { getPrimaryColor } from "@/lib/utils";

const primaryColor = getPrimaryColor();

const RISK_FACTORS = [
  { id: "faible", label: "Exposition faible", multiplier: 0.9 },
  { id: "standard", label: "Standard", multiplier: 1 },
  { id: "élevé", label: "Zone à forte contrainte", multiplier: 1.25 },
];

export function PriceEstimator() {
  const [surface, setSurface] = useState(120);
  const [risk, setRisk] = useState(RISK_FACTORS[1]);

  const estimate = useMemo(() => {
    const base = surface * 45; // estimation moyenne €/m²
    return Math.round(base * risk.multiplier);
  }, [surface, risk]);

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-100 bg-slate-50/80 px-6 py-10 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="md:max-w-md">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand">
              Estimation rapide
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-900">
              Calculez l&apos;ordre de grandeur de votre chantier
            </h3>
            <p className="mt-3 text-sm text-slate-600">
              Obtenez un budget indicatif basé sur la surface à traiter et les
              contraintes du site. Un expert validera ensuite les données lors de
              la visite technique.
            </p>
          </div>
          <div className="flex-1 rounded-2xl bg-white p-6 shadow-inner">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-slate-700">
                Surface à traiter (m²)
              </span>
              <input
                type="range"
                min="20"
                max="500"
                value={surface}
                onChange={event => setSurface(Number(event.target.value))}
                style={{ accentColor: primaryColor }}
              />
              <span className="text-xs text-slate-500">{surface} m²</span>
            </label>

            <fieldset className="mt-6">
              <legend className="text-sm font-medium text-slate-700">
                Contraintes du chantier
              </legend>
              <div className="mt-3 flex flex-wrap gap-3">
                {RISK_FACTORS.map(option => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setRisk(option)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                      risk.id === option.id
                        ? "border-transparent text-white"
                        : "border-slate-200 text-slate-600 hover:border-slate-300"
                    }`}
                    style={
                      risk.id === option.id
                        ? {
                            backgroundColor: primaryColor,
                          }
                        : undefined
                    }
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-6 rounded-2xl bg-slate-900 px-5 py-4 text-white">
              <p className="text-sm uppercase text-slate-300">Budget estimatif</p>
              <p className="mt-1 text-3xl font-semibold">
                {new Intl.NumberFormat("fr-FR", {
                  style: "currency",
                  currency: "EUR",
                  maximumFractionDigits: 0,
                }).format(estimate)}
              </p>
              <p className="mt-2 text-xs text-slate-400">
                Estimation à confirmer après diagnostic amiante et visite technique.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
