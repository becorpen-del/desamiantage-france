import Link from "next/link";
import type { Route } from "next";

import { cities } from "@/lib/cities";
import { slugify } from "@/lib/utils";

type CityCoverageProps = {
  cityName: string;
  arrondissements: readonly string[];
  neighbors: readonly string[];
  introduction: string;
};

type CityHref = Route | { hash: string };

function resolveCityHref(name: string): CityHref {
  const slug = slugify(name);
  const existingCity = cities[slug as keyof typeof cities];
  if (existingCity) {
    return `/${existingCity.slug}` as Route;
  }

  return { hash: "devis" };
}

export function CityCoverage({ cityName, arrondissements, neighbors, introduction }: CityCoverageProps) {
  return (
    <section className="bg-slate-50 py-16" aria-labelledby="areas-title">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl space-y-4">
          <h2 id="areas-title" className="text-3xl font-semibold text-slate-900">
            Zones d&apos;intervention à {cityName}
          </h2>
          <p className="text-lg text-slate-600">{introduction}</p>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-brand">
              Arrondissements couverts
            </h3>
            <ul className="mt-4 grid gap-2 text-sm text-slate-600">
              {arrondissements.map(area => (
                <li key={area} className="flex gap-2">
                  <span className="mt-1 inline-flex h-1.5 w-1.5 flex-none rounded-full bg-brand/70" aria-hidden />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-brand">
              Communes limitrophes et proches
            </h3>
            <ul className="mt-4 grid gap-2 text-sm text-slate-600">
              {neighbors.map(neighbor => (
                <li key={neighbor} className="flex items-start gap-2">
                  <span className="mt-1 inline-flex h-1.5 w-1.5 flex-none rounded-full bg-brand/70" aria-hidden />
                  <Link
                    href={resolveCityHref(neighbor)}
                    className="text-slate-700 underline-offset-4 hover:text-brand hover:underline"
                    prefetch={false}
                  >
                    {neighbor}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-slate-500">
              Besoin d&apos;ajouter une ville ? Ajoutez-la dans `lib/cities.ts` et elle sera générée automatiquement
              (sitemap et maillage mis à jour).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
