import Link from "next/link";
import type { Route } from "next";

import { getBrandName, getSiteUrl } from "@/lib/utils";

const brandName = getBrandName();
const siteUrl = getSiteUrl();
const logoUrl = `${siteUrl}/logo-desamiantage-france.png`;

type NavLink = { href: Route; label: string };

const serviceLinks: NavLink[] = [
  { href: "/desamiantage-france/" as Route, label: "Désamiantage (page pilier)" },
  { href: "/prix-desamiantage/" as Route, label: "Prix du désamiantage" },
  { href: "/types-desamiantage/toiture/" as Route, label: "Types de travaux" },
  { href: "/entreprises-certifiees/" as Route, label: "Entreprises certifiées" },
];

const cityLinks: NavLink[] = [
  { href: "/paris" as Route, label: "Désamiantage Paris" },
  { href: "/lyon" as Route, label: "Désamiantage Lyon" },
  { href: "/marseille" as Route, label: "Désamiantage Marseille" },
  { href: "/toulouse" as Route, label: "Désamiantage Toulouse" },
  { href: "/nice" as Route, label: "Désamiantage Nice" },
  { href: "/nantes" as Route, label: "Désamiantage Nantes" },
  { href: "/montpellier" as Route, label: "Désamiantage Montpellier" },
  { href: "/strasbourg" as Route, label: "Désamiantage Strasbourg" },
  { href: "/bordeaux" as Route, label: "Désamiantage Bordeaux" },
  { href: "/lille" as Route, label: "Désamiantage Lille" },
  { href: "/desamiantage-france/" as Route, label: "Voir toutes les villes →" },
];

const regionLinks: NavLink[] = [
  { href: "/desamiantage-ile-de-france/" as Route, label: "Île-de-France" },
  { href: "/desamiantage-auvergne-rhone-alpes/" as Route, label: "Auvergne-Rhône-Alpes" },
  { href: "/desamiantage-nouvelle-aquitaine/" as Route, label: "Nouvelle-Aquitaine" },
  { href: "/desamiantage-occitanie/" as Route, label: "Occitanie" },
  { href: "/desamiantage-provence-alpes-cote-d-azur/" as Route, label: "Provence-Alpes-Côte d'Azur" },
  { href: "/desamiantage-grand-est/" as Route, label: "Grand Est" },
];

const infoLinks: NavLink[] = [
  { href: "/a-propos/" as Route, label: "À propos" },
  { href: "/comment-ca-marche/" as Route, label: "Comment ça marche" },
  { href: "/mentions-legales/" as Route, label: "Mentions légales" },
  { href: "/politique-confidentialite/" as Route, label: "Politique de confidentialité" },
  { href: "/cgu/" as Route, label: "CGU" },
  { href: "/sitemap.xml" as Route, label: "Plan du site" },
];

export function Footer() {
  const year = new Date().getFullYear();

  const organizationLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: brandName,
        url: siteUrl,
        logo: logoUrl,
        sameAs: ["https://www.linkedin.com/company/desamiant-pro", "https://www.facebook.com"],
      },
      {
        "@type": "LocalBusiness",
        name: `${brandName} Désamiantage-France`,
        url: `${siteUrl}/desamiantage-france`,
        areaServed: "France",
        image: logoUrl,
        priceRange: "€€€",
        serviceType: "Désamiantage, retrait amiante, diagnostic",
        address: {
          "@type": "PostalAddress",
          streetAddress: "1 rue Exemple",
          addressLocality: "Paris",
          postalCode: "75000",
          addressCountry: "FR",
        },
        telephone: "+33 1 23 45 67 89",
      },
    ],
  };

  return (
    <footer className="bg-[#1a1a1a] text-[#e0e0e0]" aria-label="Pied de page">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">Services</h3>
            <ul className="grid gap-2">
              {serviceLinks.map(link => (
                <li key={link.href}>
                  <Link className="transition hover:text-[#00A9FF]" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">Villes principales</h3>
            <ul className="grid gap-2">
              {cityLinks.map(link => (
                <li key={link.href}>
                  <Link className="transition hover:text-[#00A9FF]" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">Régions</h3>
            <ul className="grid gap-2">
              {regionLinks.map(link => (
                <li key={link.href}>
                  <Link className="transition hover:text-[#00A9FF]" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">Informations</h3>
            <ul className="grid gap-2">
              {infoLinks.map(link => (
                <li key={link.href}>
                  {link.href.startsWith("http") ? (
                    <a className="transition hover:text-[#00A9FF]" href={link.href}>
                      {link.label}
                    </a>
                  ) : (
                    <Link className="transition hover:text-[#00A9FF]" href={link.href}>
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 sm:col-span-2 lg:col-span-4">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">Contact & confiance</h3>
                <form className="space-y-3" aria-label="Formulaire de contact rapide">
                  <label className="sr-only" htmlFor="footer-email">
                    Email professionnel
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    name="email"
                    placeholder="Votre email pro"
                    className="w-full rounded-md border border-[#2d2d2d] bg-[#111] px-3 py-2 text-sm text-white outline-none transition focus:border-[#00A9FF] focus:ring-1 focus:ring-[#00A9FF]"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full rounded-md bg-[#00A9FF] px-4 py-2 text-sm font-semibold text-[#0b0b0b] transition hover:brightness-110"
                  >
                    Être recontacté
                  </button>
                  <p className="text-xs text-[#b5b5b5]">Service gratuit et sans engagement · Partenaires certifiés Qualibat</p>
                </form>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">Réseaux</h3>
                <div className="flex items-center gap-3">
                  <a
                    aria-label="LinkedIn"
                    href="https://www.linkedin.com/company/desamiant-pro"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2d2d2d] text-sm transition hover:border-[#00A9FF] hover:text-[#00A9FF]"
                  >
                    in
                  </a>
                  <a
                    aria-label="Facebook"
                    href="https://www.facebook.com"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2d2d2d] text-sm transition hover:border-[#00A9FF] hover:text-[#00A9FF]"
                  >
                    f
                  </a>
                </div>
                <p className="text-xs text-[#b5b5b5]">Réseau national · Devis en 24h · Dossier BSD numérique</p>
              </div>

              <div className="space-y-3 lg:col-span-2">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">Maillage rapide</h3>
                <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  <li>
                    <Link className="transition hover:text-[#00A9FF]" href="/prix-desamiantage">
                      Découvrez les prix du désamiantage
                    </Link>
                  </li>
                  <li>
                    <Link className="transition hover:text-[#00A9FF]" href="/entreprises-certifiees">
                      Vérifiez les certifications
                    </Link>
                  </li>
                  <li>
                    <Link className="transition hover:text-[#00A9FF]" href="/prix-desamiantage">
                      Comparez les devis
                    </Link>
                  </li>
                  <li>
                    <Link className="transition hover:text-[#00A9FF]" href="/desamiantage-france">
                      Carte des régions et villes
                    </Link>
                  </li>
                  <li>
                    <Link className="transition hover:text-[#00A9FF]" href="/types-desamiantage/toiture">
                      Désamiantage toiture (fibrociment, ardoises)
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#2a2a2a] px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 py-4 text-xs text-[#b5b5b5] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {brandName} - Trouvez les meilleurs pros certifiés
          </p>
          <p className="text-[11px]">Réseau national · Prix comparés · Devis en 24h</p>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
      />
    </footer>
  );
}
