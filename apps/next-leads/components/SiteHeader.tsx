import Link from "next/link";

import { cities } from "@/lib/cities";
import { getBrandName } from "@/lib/utils";

import type { Route } from "next";

type NavLink = {
  href: Route | { pathname: string; hash?: string } | { hash: string };
  label: string;
};

const navLinks: NavLink[] = [
  { href: "/" as Route, label: "Accueil" },
  { href: { pathname: "/", hash: "services" }, label: "Services" },
  { href: { pathname: "/", hash: "villes" }, label: "Villes" },
  { href: "/desamiantage-france" as Route, label: "Désamiantage France" },
];

const cityNavLinks = Object.values(cities).filter(
  (city, index, list) => list.findIndex(item => item.name === city.name) === index,
);

export function SiteHeader() {
  const brandName = getBrandName();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-lg font-semibold text-slate-900 hover:text-brand">
            {brandName}
          </Link>
          <span className="hidden text-xs uppercase tracking-[0.3em] text-slate-400 sm:inline">
            Désamiantage certifié
          </span>
        </div>
        <nav aria-label="Navigation principale" className="hidden items-center gap-6 text-sm font-medium text-slate-600 lg:flex">
          {navLinks.map(link => (
            <Link key={link.label} href={link.href} className="hover:text-brand">
              {link.label}
            </Link>
          ))}
          <details className="relative [&>summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center gap-1 rounded-full px-3 py-1 text-sm hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
              Désamiantage par ville
              <span aria-hidden className="text-xs text-slate-400">
                ▾
              </span>
            </summary>
            <div className="absolute right-0 z-40 mt-3 w-72 rounded-2xl border border-slate-200 bg-white p-3 text-slate-600 shadow-xl">
              <ul className="grid grid-cols-2 gap-2 text-sm">
                {cityNavLinks.map(city => (
                  <li key={city.slug}>
                    <Link href={`/${city.slug}`} className="block rounded px-3 py-2 hover:bg-slate-50">
                      {city.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </nav>
        <Link
          href="#devis"
          className="hidden rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 lg:inline-flex"
        >
          Obtenir un devis
        </Link>
      </div>
      <div className="flex flex-col gap-3 border-t border-slate-200 px-6 py-3 text-xs text-slate-500 lg:hidden">
        <nav aria-label="Navigation mobile" className="flex flex-wrap gap-4">
          {navLinks.map(link => (
            <Link key={link.label} href={link.href} className="hover:text-brand">
              {link.label}
            </Link>
          ))}
        </nav>
        <details className="w-full [&>summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between rounded border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
            Désamiantage par ville
            <span aria-hidden className="text-xs text-slate-400">
              ▾
            </span>
          </summary>
          <ul className="mt-2 grid grid-cols-2 gap-2 text-sm text-slate-600">
            {cityNavLinks.map(city => (
              <li key={city.slug}>
                <Link href={`/${city.slug}`} className="block rounded px-3 py-2 hover:bg-slate-100">
                  {city.name}
                </Link>
              </li>
            ))}
          </ul>
        </details>
        <Link href="#devis" className="rounded-full bg-brand px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
          Devis express
        </Link>
      </div>
    </header>
  );
}
