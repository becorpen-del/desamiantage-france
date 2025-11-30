import Link from "next/link";

import CityAreas from "@/components/CityAreas";
import { ContactForm } from "@/components/ContactForm";
import { StickyCta } from "@/components/StickyCta";
import { createMetadata } from "@/lib/seo";
import { getBrandName } from "@/lib/utils";

import type { Metadata } from "next";

const brandName = getBrandName();

const heroHighlights = [
  "Réseau national d'entreprises certifiées SS3/SS4",
  "Plans de retrait relus par notre cellule QSE",
  "Suivi BSD numérique et reporting photo en temps réel",
];

const serviceCards = [
  {
    title: "Diagnostics & repérages",
    description:
      "Organisation des repérages DTA, RAT et DAAT avec laboratoires accrédités pour sécuriser vos chantiers résidentiels, tertiaires ou industriels.",
  },
  {
    title: "Plans de retrait SS3/SS4",
    description:
      "Montage et validation des plans de retrait, coordination avec l'inspection du travail et gestion des autorisations préfectorales et voirie.",
  },
  {
    title: "Pilotage de chantier",
    description:
      "Sélection d'opérateurs certifiés, dimensionnement des confinements, contrôle QSE continu et gestion complète des déchets amiantés.",
  },
];

export const metadata: Metadata = createMetadata({
  title: `${brandName} | Coordination désamiantage certifiée en France`,
  description:
    "Obtenez vos diagnostics, plans de retrait et interventions de désamiantage partout en France grâce à un réseau d'entreprises SS3/SS4 auditées.",
  path: "/",
  openGraphType: "website",
});

export default function HomePage() {
  return (
    <>
      <section className="bg-slate-950 text-slate-50">
        <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-20 pt-16 lg:flex-row lg:items-start lg:gap-20">
          <div className="flex-1">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand/15 px-4 py-1 text-sm font-semibold text-brand">
              {brandName} · Réseau certifié
            </span>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Désamiantage certifié partout en France
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-200">
              {brandName} coordonne diagnostics, plans de retrait et interventions de désamiantage sur l&apos;ensemble du
              territoire. Nos chefs de projet assurent la conformité réglementaire, la sécurité des équipes et la traçabilité
              jusqu&apos;au BSD final.
            </p>
            <ul className="mt-6 space-y-3 text-base text-slate-200/90">
              {heroHighlights.map(item => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-2.5 w-2.5 flex-none rounded-full bg-brand" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="#devis"
                className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-brand/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                Obtenir un devis rapide
              </Link>
              <Link
                href="/paris"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Voir nos missions à Paris
              </Link>
            </div>
          </div>
          <aside className="flex w-full max-w-xl flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <div>
              <h2 className="text-lg font-semibold text-white">Un accompagnement complet</h2>
              <p className="mt-2 text-sm leading-6 text-slate-200">
                De l&apos;audit initial à la restitution, nous orchestrons prestataires, laboratoires et reporting documentaire pour
                sécuriser vos chantiers publics, privés ou industriels.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {serviceCards.map(card => (
                <div key={card.title} className="rounded-2xl bg-white/10 p-4">
                  <h3 className="text-sm font-semibold text-white">{card.title}</h3>
                  <p className="mt-2 text-xs text-slate-200/90">{card.description}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section id="services" className="bg-white py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 lg:flex-row">
          <div className="flex-1 space-y-5">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">Nos missions</p>
            <h2 className="text-3xl font-semibold text-slate-900">Un pilotage unique pour vos chantiers de désamiantage</h2>
            <p className="text-base text-slate-600">
              Nous intervenons en amont (diagnostic, repérage, audit documentaire), pendant les phases de retrait (plan de retrait
              SS3/SS4, coordination QSE, sas de confinement) et jusqu&apos;à la restitution réglementaire (mesures d&apos;empoussièrement,
              PV fin de chantier, BSD numériques).
            </p>
          </div>
          <div className="flex-1">
            <ul className="grid gap-4 sm:grid-cols-2">
              {serviceCards.map(card => (
                <li key={card.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{card.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="villes" className="bg-slate-100 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand">Nos implantations</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900">Présence renforcée sur les métropoles</h2>
              <p className="mt-4 text-base text-slate-600">
                Paris, Lyon, Marseille, Toulouse, Lille… nos équipes locales s&apos;appuient sur des opérateurs certifiés pour prendre en
                charge diagnostics, retrait et gestion des déchets selon les exigences de chaque territoire.
              </p>
            </div>
            <Link
              href="/desamiantage-france"
              className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-brand/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              Découvrir notre réseau national
            </Link>
          </div>
          <div className="mt-10">
            <CityAreas />
          </div>
        </div>
      </section>

      <section id="devis" className="bg-white py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 lg:flex-row">
          <div className="flex-1 space-y-4">
            <h2 className="text-3xl font-semibold text-slate-900">Un seul point de contact jusqu’à la restitution</h2>
            <p className="text-base text-slate-700">
              Décrivez votre projet : nous qualifions votre contexte, sélectionnons l&apos;entreprise certifiée adaptée et sécurisons le
              planning d&apos;intervention avec reporting en temps réel et BSD partagés.
            </p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• Chef de projet dédié et suivi QSE</li>
              <li>• Interventions planifiées sous 72 h selon l&apos;urgence</li>
              <li>• Gestion documentaire (plans de retrait, mesures, attestations)</li>
            </ul>
          </div>
          <div className="flex-1">
            <ContactForm />
          </div>
        </div>
      </section>

      <StickyCta />
    </>
  );
}
