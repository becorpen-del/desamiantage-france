import Link from "next/link";

import { ContactForm } from "@/components/ContactForm";
import { createMetadata } from "@/lib/seo";
import { getBrandName } from "@/lib/utils";

const brandName = getBrandName();

export const metadata = createMetadata({
  title: "Devis gratuit pour vos travaux de désamiantage",
  description:
    "Demandez un devis gratuit et sans engagement pour vos travaux de désamiantage, diagnostic ou retrait. Réponse sous 48-72h partout en France.",
  path: "/devis-gratuit",
  openGraphType: "article",
});

export default function DevisGratuitPage() {
  return (
    <main className="bg-white">
      <section className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-14 lg:flex-row lg:items-start">
          <div className="flex-1 space-y-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">Devis gratuit</p>
            <h1 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
              Devis gratuit pour vos travaux de désamiantage
            </h1>
            <p className="text-lg text-slate-700">
              Comparez rapidement plusieurs offres d&apos;entreprises certifiées Qualibat 1552. Diagnostic, retrait de toiture fibrociment, dalles
              de sol, flocage, calorifugeage : {brandName} qualifie votre besoin et mobilise des opérateurs vérifiés partout en France.
            </p>
            <p className="text-base text-slate-700">
              Le devis est gratuit et sans engagement. Partagez vos photos, la surface et l&apos;accès au chantier : un chef de projet vous rappelle
              sous 48-72h pour cadrer le planning et les autorisations nécessaires.
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-slate-800">
              <span className="rounded-full bg-slate-100 px-3 py-1">Diagnostics avant travaux</span>
              <span className="rounded-full bg-slate-100 px-3 py-1">Toitures fibrociment & bardages</span>
              <span className="rounded-full bg-slate-100 px-3 py-1">Dalles de sol et colles amiantées</span>
              <span className="rounded-full bg-slate-100 px-3 py-1">Sites tertiaires et industriels</span>
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
              <h2 className="text-xl font-semibold text-slate-900">Ce que couvre le devis</h2>
              <p className="mt-2 text-sm text-slate-700">
                Diagnostic amiante si nécessaire, plan de retrait SS3/SS4, protections collectives, conditionnement ADR, évacuation et BSD
                numériques, nettoyage et certificat de restitution.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-xl font-semibold text-slate-900">Informations utiles à fournir</h2>
              <p className="mt-2 text-sm text-slate-700">
                Adresse ou code postal, type de bâtiment, surface estimée, photos, accessibilité (hauteur, cour intérieure, ascenseur) et
                contraintes de planning (site occupé, urgence).
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-xl font-semibold text-slate-900">Zones d&apos;intervention</h2>
              <p className="mt-2 text-sm text-slate-700">
                Réseau national de partenaires certifiés. {brandName} mobilise les équipes locales et coordonne la logistique déchets avec les
                centres agréés les plus proches.
              </p>
            </article>
          </div>

          <div className="rounded-3xl border border-emerald-100 bg-emerald-50 px-5 py-6 text-slate-800">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-base font-semibold text-slate-900">Un chef de projet dédié vous rappelle sous 48-72h</p>
                <p className="text-sm text-slate-700">
                  Vos données restent confidentielles. Vous pouvez aussi joindre directement une entreprise certifiée de notre réseau.
                </p>
              </div>
              <Link
                href="/entreprises-certifiees"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                Voir les entreprises certifiées
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
