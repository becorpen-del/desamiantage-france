import Link from "next/link";

import { createMetadata, getBreadcrumbJsonLd, getFaqJsonLd } from "@/lib/seo";

import type { Metadata } from "next";

const pagePath = "/tarif-desamiantage";

export const metadata: Metadata = createMetadata({
  title: "Tarif Désamiantage 2024 : Grille et Estimations rapides",
  description: "Tarifs désamiantage 2024 : fourchettes 30-150€/m² selon travaux. Grille simplifiée, facteurs de prix, devis gratuits en 24h.",
  path: pagePath,
  openGraphType: "article",
});

const breadcrumbLd = getBreadcrumbJsonLd([
  { name: "Accueil", path: "/" },
  { name: "Tarif désamiantage", path: pagePath },
]);

const faqItems = [
  {
    question: "Quel est le tarif moyen d’un désamiantage ?",
    answer: "Entre 35 et 80€/m² pour la majorité des chantiers, jusqu’à 150€/m² pour les flocages ou confinements complexes.",
  },
  {
    question: "Le tarif inclut-il l’évacuation des déchets ?",
    answer: "Oui dans la plupart des cas, mais vérifiez que le BSD et le centre agréé sont mentionnés. Coût évacuation : 150-400€/tonne.",
  },
  {
    question: "Pourquoi les tarifs varient-ils ?",
    answer: "Matériau (fibrociment vs flocage), accessibilité, surface, urgence et région impactent le tarif désamiantage final.",
  },
  {
    question: "Combien coûte un diagnostic amiante ?",
    answer: "150 à 400€ selon surface et accessibilité. Il est facturé à part du tarif de retrait.",
  },
];

const faqLd = getFaqJsonLd(faqItems);

const quickGrid = [
  { label: "Toiture fibrociment", range: "25-45€/m²", note: "1 500-6 000€ selon surface" },
  { label: "Toiture ardoise/shingle", range: "35-65€/m²", note: "2 000-8 000€" },
  { label: "Dalles de sol", range: "35-90€/m²", note: "800-7 000€" },
  { label: "Murs / plafonds", range: "40-100€/m²", note: "1 200-9 000€" },
  { label: "Flocage", range: "30-60€/m²", note: "4 000-12 000€" },
  { label: "Calorifugeage", range: "80-150€/m²", note: "5 000-15 000€" },
  { label: "Bardage", range: "30-50€/m²", note: "1 800-7 000€" },
];

const factors = [
  "Surface : effet d’échelle, forfait minimum 800-1 500€.",
  "Matériau : flocage/calorifugeage plus chers que fibrociment.",
  "Accessibilité : hauteur, cour intérieure, coactivité (+20 à +40%).",
  "Confinement : statique/dynamique peut ajouter 30-80€/m².",
  "Zone géographique : +10-20% en Île-de-France.",
  "Urgence : +15-50% si intervention < 1 semaine.",
  "Déchets : 150-400€/tonne selon centre agréé et distance.",
];

export default function TarifDesamiantagePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {faqLd ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} /> : null}

      <header className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        <div className="mx-auto max-w-6xl space-y-6 px-6 py-12">
          <h1 className="text-3xl font-semibold leading-tight md:text-4xl">Tarif Désamiantage 2024 : Grille et Estimations rapides</h1>
          <p className="text-lg text-slate-200">
            Retrouvez les principaux tarifs désamiantage : de 30 à 150€/m² selon le matériau (fibrociment, dalles, flocage), l&apos;accès et le
            confinement. Comparez avec nos exemples et recevez 3 devis gratuits pour connaître votre budget réel.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-slate-200">
            <span className="rounded-full bg-white/10 px-3 py-1">Tarifs 2024</span>
            <span className="rounded-full bg-white/10 px-3 py-1">30-150€/m² selon travaux</span>
            <span className="rounded-full bg-white/10 px-3 py-1">Devis sous 24-72h</span>
          </div>
          <div className="rounded-3xl border border-emerald-500/25 bg-emerald-500/10 p-5 text-sm text-emerald-100">
            <p className="text-base font-semibold text-emerald-200">💰 Quel est votre tarif désamiantage ?</p>
            <p className="mt-2 text-slate-100">Indiquez votre projet et recevez 3 devis gratuits.</p>
            <form className="mt-3 grid gap-2 sm:grid-cols-3">
              <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-slate-300">
                Type de travaux
                <select
                  name="type"
                  className="rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none transition focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                  required
                >
                  <option value="">Sélectionner</option>
                  <option value="toiture">Toiture</option>
                  <option value="dalles">Dalles</option>
                  <option value="murs">Murs / plafonds</option>
                  <option value="flocage">Flocage</option>
                  <option value="autre">Autre</option>
                </select>
              </label>
              <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-slate-300">
                Code postal
                <input
                  name="code_postal"
                  type="text"
                  required
                  className="rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none transition focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                />
              </label>
              <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-slate-300">
                Téléphone ou email
                <input
                  name="contact"
                  type="text"
                  required
                  className="rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none transition focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                />
              </label>
              <div className="sm:col-span-3">
                <button
                  type="submit"
                  className="w-full rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:brightness-110"
                >
                  Recevoir 3 devis gratuits
                </button>
                <p className="mt-1 text-[11px] text-slate-400">Gratuit · Sans engagement</p>
              </div>
            </form>
          </div>
        </div>
      </header>

      <main className="bg-slate-950 text-slate-200">
        <div className="mx-auto max-w-6xl space-y-14 px-6 py-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Grille rapide des tarifs désamiantage</h2>
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
              <table className="w-full text-sm text-slate-200">
                <thead className="bg-white/5 text-xs uppercase tracking-wide text-emerald-200">
                  <tr>
                    <th className="px-3 py-3 text-left">Type de travaux</th>
                    <th className="px-3 py-3 text-left">Tarif au m²</th>
                    <th className="px-3 py-3 text-left">Prix indicatif chantier</th>
                  </tr>
                </thead>
                <tbody>
                  {quickGrid.map(row => (
                    <tr key={row.label} className="border-t border-white/5">
                      <td className="px-3 py-3 font-semibold text-white">{row.label}</td>
                      <td className="px-3 py-3">{row.range}</td>
                      <td className="px-3 py-3">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm">
              Ces tarifs incluent généralement main d&apos;œuvre, confinement, évacuation, certificat. Le diagnostic est facturé à part (150-400€).
              Consultez la page pilier pour plus de détails.
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-emerald-200">
              <Link href="/prix-desamiantage-au-m2" className="hover:text-emerald-100">
                Prix moyens détaillés →
              </Link>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Pourquoi votre tarif peut changer ?</h2>
            <div className="grid gap-4 lg:grid-cols-2">
              {factors.map(item => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                  {item}
                </div>
              ))}
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm">
              <p className="text-base font-semibold text-white">Besoin d&apos;une estimation ?</p>
              <p className="mt-2">Décrivez votre surface, matériau et accès pour recevoir 3 devis gratuits.</p>
              <p className="mt-2 text-slate-300">Utilisez le formulaire en haut de page (projet, code postal, contact).</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Liens utiles du silo prix</h2>
            <ul className="space-y-2 text-sm text-emerald-200">
              <li>
                <Link className="hover:text-emerald-100" href="/prix-desamiantage-au-m2">
                  Guide des prix désamiantage (pilier)
                </Link>
              </li>
              <li>
                <Link className="hover:text-emerald-100" href="/devis-gratuit">
                  Demander vos devis gratuits
                </Link>
              </li>
              <li>
                <Link className="hover:text-emerald-100" href="/entreprises-certifiees">
                  Vérifier les entreprises certifiées
                </Link>
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Questions fréquentes sur les tarifs</h2>
            <div className="space-y-3">
              {faqItems.map(item => (
                <details key={item.question} className="group rounded-2xl border border-white/10 bg-white/5 p-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-white">
                    {item.question}
                    <span className="text-xl transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-slate-200">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
