import Link from "next/link";

import { ContactForm } from "@/components/ContactForm";
import { createMetadata } from "@/lib/seo";
import { getBrandName } from "@/lib/utils";

const brandName = getBrandName();

export const metadata = createMetadata({
  title: "Entreprises de désamiantage certifiées (Qualibat 1552)",
  description:
    "Trouvez une entreprise de désamiantage certifiée Qualibat 1552. Vérifications réglementaires, plans SS3/SS4 et devis rapides partout en France.",
  path: "/entreprises-certifiees",
  openGraphType: "article",
});

export default function EntreprisesCertifieesPage() {
  return (
    <main className="bg-white">
      <section className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-14 lg:flex-row lg:items-start">
          <div className="flex-1 space-y-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">Qualibat 1552</p>
            <h1 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
              Entreprises de désamiantage certifiées
            </h1>
            <p className="text-lg text-slate-700">
              {brandName} s&apos;appuie sur un réseau d&apos;entreprises auditées (Qualibat 1552, SS3/SS4) pour sécuriser vos projets de retrait
              amiante. Chaque dossier inclut plans de retrait, protections collectives et traçabilité BSD.
            </p>
            <p className="text-base text-slate-700">
              Choisir un opérateur certifié garantit la conformité réglementaire (Code du travail, décret 2012-639), la protection des équipes et
              des occupants, ainsi qu&apos;un reporting clair pour votre assurance ou vos démarches en copropriété.
            </p>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>• Certification Qualibat 1552 et audits à jour</li>
              <li>• Plans de retrait SS3/SS4, mesures d&apos;empoussièrement et BSD numériques</li>
              <li>• Assurance RC Pro / décennale incluant l&apos;amiante</li>
            </ul>
            <div className="flex flex-wrap gap-3 text-sm text-slate-800">
              <span className="rounded-full bg-slate-100 px-3 py-1">Diagnostics, toitures, sols, calorifugeage</span>
              <span className="rounded-full bg-slate-100 px-3 py-1">Interventions France entière</span>
              <span className="rounded-full bg-slate-100 px-3 py-1">Devis comparés sous 48-72h</span>
            </div>
          </div>

          <div className="flex w-full max-w-xl flex-col gap-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/70">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-6xl space-y-8 px-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-xl font-semibold text-slate-900">Ce qu&apos;implique une certification</h2>
              <p className="mt-2 text-sm text-slate-700">
                Habilitations SS3/SS4, personnel formé, procédures de confinement, autocontrôles et audits réguliers. Les certifications valident
                la capacité à gérer des chantiers complexes en sécurité.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-xl font-semibold text-slate-900">Pourquoi c&apos;est indispensable</h2>
              <p className="mt-2 text-sm text-slate-700">
                Une entreprise certifiée réduit le risque sanitaire et juridique : arrêtés préfectoraux, DREETS, traçabilité déchets et dossier de
                fin de travaux sont gérés dans les règles.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-xl font-semibold text-slate-900">Comment trouver le bon opérateur</h2>
              <p className="mt-2 text-sm text-slate-700">
                Comparez références similaires (toiture, sols, industriel), vérifiez les attestations Qualibat 1552 et les assurances amiante,
                puis exigez un plan de retrait détaillé avant travaux.
              </p>
            </article>
          </div>

          <div className="rounded-3xl border border-emerald-100 bg-emerald-50 px-5 py-6 text-slate-800">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-base font-semibold text-slate-900">Accédez rapidement à 3 entreprises certifiées près de chez vous</p>
                <p className="text-sm text-slate-700">
                  Décrivez votre chantier (type de matériau, surface, accès). Nous qualifions votre besoin et mobilisons des opérateurs audités.
                </p>
              </div>
              <Link
                href="/devis-gratuit"
                className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-brand/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                Demander un devis
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
