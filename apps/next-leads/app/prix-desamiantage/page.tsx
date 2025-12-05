import Link from "next/link";

import { createMetadata, getBreadcrumbJsonLd, getFaqJsonLd } from "@/lib/seo";

import type { Metadata } from "next";

const pagePath = "/prix-desamiantage";

export const metadata: Metadata = createMetadata({
  title: "Prix Désamiantage 2024 : Tarifs, Coûts & Devis Gratuits",
  description:
    "Guide complet des prix de désamiantage 2024 : 25-150€/m² selon travaux. Tableaux détaillés, exemples réels, aides financières. Comparez 3 devis gratuits d'entreprises certifiées.",
  path: pagePath,
  openGraphType: "article",
});

const breadcrumbLd = getBreadcrumbJsonLd([
  { name: "Accueil", path: "/" },
  { name: "Prix désamiantage", path: pagePath },
]);

const faqItems = [
  {
    question: "Quel est le prix moyen d'un désamiantage ?",
    answer:
      "Le prix désamiantage moyen se situe entre 35 et 80€/m² selon le type de travaux. Un chantier résidentiel se situe souvent entre 3 000 et 7 000€ TTC.",
  },
  {
    question: "Pourquoi les prix varient-ils autant ?",
    answer:
      "Surface, type de matériau, accessibilité, région, urgence et quantité de déchets influencent le prix désamiantage. Les confinements complexes ou les sites occupés augmentent le tarif.",
  },
  {
    question: "Le diagnostic est-il inclus dans le prix ?",
    answer: "Généralement non. Il est facturé à part (150-400€). Certains forfaits l'intègrent, vérifiez les devis.",
  },
  {
    question: "Puis-je négocier le prix ?",
    answer:
      "Oui, surtout au-delà de 100 m² ou si plusieurs lots sont confiés. Comparez au moins trois devis pour obtenir un prix désamiantage juste.",
  },
  {
    question: "Y a-t-il un forfait minimum ?",
    answer: "La plupart des entreprises appliquent un forfait plancher de 800 à 1 500€ pour couvrir le confinement et la logistique du prix désamiantage.",
  },
  {
    question: "Le prix inclut-il l'évacuation des déchets ?",
    answer: "Souvent oui, mais confirmez. L'évacuation varie de 150 à 400€/tonne. Le BSD doit toujours être fourni.",
  },
  {
    question: "Combien coûte un désamiantage total de maison ?",
    answer:
      "Le prix désamiantage total d'une maison va de 5 000€ pour une petite surface simple à plus de 30 000€ si plusieurs zones et confinements complexes sont nécessaires.",
  },
  {
    question: "Les prix ont-ils augmenté en 2024 ?",
    answer:
      "Hausse modérée de 5-8% liée aux coûts énergie, EPI/EPC et aux exigences réglementaires. Les prix restent encadrés par la concurrence locale.",
  },
];

const faqLd = getFaqJsonLd(faqItems);

type LeadField = { label: string; name: string; type?: string; options?: string[]; required?: boolean };

function LeadForm({
  title,
  subtitle,
  button,
  fields,
  id,
  note,
}: {
  title: string;
  subtitle?: string;
  button: string;
  fields: LeadField[];
  id?: string;
  note?: string;
}) {
  return (
    <div id={id} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
      <p className="text-base font-semibold text-white">{title}</p>
      {subtitle ? <p className="mt-1 text-slate-300">{subtitle}</p> : null}
      <form className="mt-3 grid gap-2 sm:grid-cols-2">
        {fields.map(field => (
          <label key={field.name} className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-slate-300">
            {field.label}
            {field.options ? (
              <select
                name={field.name}
                required={field.required ?? true}
                className="rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none transition focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
              >
                <option value="">Sélectionner</option>
                {field.options.map(opt => (
                  <option key={opt} value={opt.toLowerCase()}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                name={field.name}
                type={field.type ?? "text"}
                required={field.required ?? true}
                className="rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none transition focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
              />
            )}
          </label>
        ))}
        <div className="sm:col-span-2">
          <button
            type="submit"
            className="w-full rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:brightness-110"
          >
            {button}
          </button>
          {note ? <p className="mt-1 text-[11px] text-slate-400">{note}</p> : null}
        </div>
      </form>
    </div>
  );
}

const priceMain = [
  { type: "🏠 Toiture fibrociment", m2: "25-45€/m²", min: "1 500€", avg: "3 000-6 000€" },
  { type: "🏗️ Toiture ardoise", m2: "35-65€/m²", min: "2 000€", avg: "4 000-8 000€" },
  { type: "⬜ Dalles de sol", m2: "35-90€/m²", min: "800€", avg: "2 500-7 000€" },
  { type: "🧱 Murs et plafonds", m2: "40-100€/m²", min: "1 200€", avg: "3 500-9 000€" },
  { type: "🔥 Calorifugeage", m2: "80-150€/m²", min: "2 000€", avg: "5 000-15 000€" },
  { type: "💨 Flocage", m2: "30-60€/m²", min: "1 500€", avg: "4 000-12 000€" },
  { type: "🏭 Bardage", m2: "30-50€/m²", min: "1 800€", avg: "3 000-7 000€" },
];

const materialSummary = [
  { mat: "Flocage", friability: "Élevée", level: "+++" },
  { mat: "Calorifugeage", friability: "Élevée", level: "+++" },
  { mat: "Dalles vinyle", friability: "Faible", level: "+" },
  { mat: "Fibrociment", friability: "Faible", level: "++" },
];

const breakdown = [
  { post: "Main d'œuvre", percent: "60-70%", amount: "1 800-2 800€" },
  { post: "Matériel et consommables", percent: "15-20%", amount: "450-800€" },
  { post: "Évacuation déchets", percent: "10-15%", amount: "300-600€" },
  { post: "Frais structure", percent: "5-10%", amount: "150-400€" },
];

const surfaceRanges = [
  { surface: "< 20 m²", m2: "60-90€/m²", total: "1 200-1 800€", economy: "-20%" },
  { surface: "20-50 m²", m2: "45-70€/m²", total: "1 800-3 500€", economy: "-25%" },
  { surface: "50-100 m²", m2: "35-55€/m²", total: "2 800-5 500€", economy: "-42%" },
  { surface: "100-200 m²", m2: "28-45€/m²", total: "4 500-9 000€", economy: "-53%" },
  { surface: "> 200 m²", m2: "25-40€/m²", total: "Sur devis", economy: "-58%" },
];

const regionPrices = [
  { region: "Île-de-France", price: "45-70€", delta: "+20%" },
  { region: "PACA", price: "40-65€", delta: "+10%" },
  { region: "Auvergne-Rhône-Alpes", price: "38-60€", delta: "+5%" },
  { region: "Occitanie", price: "35-55€", delta: "Standard" },
  { region: "Nouvelle-Aquitaine", price: "35-55€", delta: "Standard" },
  { region: "Grand Est", price: "32-50€", delta: "-5%" },
  { region: "Hauts-de-France", price: "30-48€", delta: "-10%" },
  { region: "Bretagne", price: "33-52€", delta: "-3%" },
];

const megaTable = [
  { type: "Toiture fibrociment", diff: "⭐⭐", min: "25€/m²", avg: "35€/m²", max: "45€/m²", delay: "2-4j" },
  { type: "Toiture ardoise", diff: "⭐⭐⭐", min: "35€/m²", avg: "50€/m²", max: "65€/m²", delay: "3-6j" },
  { type: "Dalles sol simple", diff: "⭐⭐", min: "35€/m²", avg: "55€/m²", max: "70€/m²", delay: "1-3j" },
  { type: "Dalles sol + colle", diff: "⭐⭐⭐", min: "60€/m²", avg: "75€/m²", max: "90€/m²", delay: "2-4j" },
  { type: "Murs/plafonds", diff: "⭐⭐⭐", min: "40€/m²", avg: "70€/m²", max: "100€/m²", delay: "3-7j" },
  { type: "Flocage", diff: "⭐⭐⭐⭐", min: "30€/m²", avg: "45€/m²", max: "60€/m²", delay: "4-10j" },
  { type: "Calorifugeage", diff: "⭐⭐⭐⭐⭐", min: "80€/m²", avg: "110€/m²", max: "150€/m²", delay: "5-15j" },
  { type: "Bardage", diff: "⭐⭐", min: "30€/m²", avg: "40€/m²", max: "50€/m²", delay: "2-5j" },
];

export default function PrixDesamiantagePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {faqLd ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} /> : null}

      <header className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        <div className="mx-auto max-w-6xl space-y-6 px-6 py-12">
          <h1 className="text-3xl font-semibold leading-tight md:text-4xl">Prix Désamiantage 2024 : Guide Complet des Tarifs et Coûts</h1>
          <p className="text-lg text-slate-200">
            Connaître le prix désamiantage est essentiel pour budgéter vos travaux. Les prix désamiantage varient de 30 à 150€/m² selon le
            matériau, l&apos;accessibilité et le confinement requis. Ce guide 2024 rassemble les tarifs, facteurs de coût et aides pour comparer et
            obtenir des devis fiables.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-slate-200">
            <span className="rounded-full bg-white/10 px-3 py-1">Fourchettes 30-150€/m²</span>
            <span className="rounded-full bg-white/10 px-3 py-1">Devis sous 24-72h</span>
            <span className="rounded-full bg-white/10 px-3 py-1">Entreprises certifiées</span>
          </div>
          <LeadForm
            id="cta-form-1"
            title="💰 Quel budget prévoir pour votre désamiantage ?"
            subtitle="Estimez immédiatement votre budget et recevez 3 devis gratuits."
            button="Recevoir 3 devis gratuits"
            fields={[
              { label: "Type de travaux", name: "type", options: ["Toiture", "Dalles sol", "Murs/plafonds", "Autre"] },
              { label: "Code postal", name: "code_postal", type: "text" },
              { label: "Téléphone ou email", name: "contact", type: "text" },
            ]}
            note="Devis gratuits · Sans engagement · Tarifs 2024"
          />
        </div>
      </header>

      <main className="bg-slate-950 text-slate-200">
        <div className="mx-auto max-w-6xl space-y-16 px-6 py-12">
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Prix désamiantage selon le type de travaux</h2>
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
              <table className="w-full text-sm text-slate-200">
                <thead className="bg-white/5 text-xs uppercase tracking-wide text-emerald-200">
                  <tr>
                    <th className="px-3 py-3 text-left">Type de désamiantage</th>
                    <th className="px-3 py-3 text-left">Prix au m²</th>
                    <th className="px-3 py-3 text-left">Prix minimum</th>
                    <th className="px-3 py-3 text-left">Prix moyen chantier</th>
                  </tr>
                </thead>
                <tbody>
                  {priceMain.map(row => (
                    <tr key={row.type} className="border-t border-white/5">
                      <td className="px-3 py-3 font-semibold text-white">{row.type}</td>
                      <td className="px-3 py-3">{row.m2}</td>
                      <td className="px-3 py-3">{row.min}</td>
                      <td className="px-3 py-3">{row.avg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
              <p className="text-base font-semibold text-white">ℹ️ Inclus généralement dans un prix désamiantage</p>
              <p className="mt-2">
                Main d&apos;œuvre, confinement, évacuation des déchets, certificat de restitution. Le diagnostic amiante est facturé à part
                (150-400€). Vérifiez toujours si le prix désamiantage annoncé inclut le BSD et la remise hors d&apos;eau.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Qu&apos;est-ce qui fait varier le prix désamiantage ?</h2>
            <div className="grid gap-4 lg:grid-cols-2">
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">1. La surface à traiter</h3>
                <p className="mt-2">
                  Effet d&apos;échelle : plus la surface augmente, plus le prix désamiantage au m² baisse. Forfait minimum 800 à 1 500€.
                </p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">2. Le type de matériau amianté</h3>
                <p className="mt-2">
                  Friabilité, dangerosité et accessibilité jouent. Flocage et calorifugeage font grimper le prix désamiantage, alors que le
                  fibrociment reste plus bas mais nécessite toujours un retrait encadré.
                </p>
                <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
                  <table className="w-full text-xs text-slate-200">
                    <thead className="bg-white/5 text-[11px] uppercase tracking-wide text-emerald-200">
                      <tr>
                        <th className="px-3 py-2 text-left">Matériau</th>
                        <th className="px-3 py-2 text-left">Friabilité</th>
                        <th className="px-3 py-2 text-left">Prix relatif</th>
                      </tr>
                    </thead>
                    <tbody>
                      {materialSummary.map(item => (
                        <tr key={item.mat} className="border-t border-white/5">
                          <td className="px-3 py-2 font-semibold text-white">{item.mat}</td>
                          <td className="px-3 py-2">{item.friability}</td>
                          <td className="px-3 py-2">{item.level}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">3. L&apos;accessibilité du chantier</h3>
                <p className="mt-2">
                  Hauteur, accès véhicule, coactivité : +20 à +40% sur le prix désamiantage si toiture haute, cour intérieure ou site occupé. Les
                  équipements (nacelles, filets) augmentent le coût.
                </p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">4. La complexité du confinement</h3>
                <p className="mt-2">Confinement simple : +15-25€/m². Statique : +30-50€/m². Dynamique : +50-80€/m².</p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">5. La zone géographique</h3>
                <p className="mt-2">
                  Île-de-France : +10-20% vs province. Grandes villes plus chères, zones rurales avec frais de déplacement.{" "}
                  <Link href="/desamiantage-france" className="text-emerald-200 hover:text-emerald-100">
                    Prix par région →
                  </Link>
                </p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">6. L&apos;urgence de l&apos;intervention</h3>
                <p className="mt-2">Standard 2-4 semaines : prix normal. Rapide : +15-25%. Urgence &lt; 48h : +30-50%.</p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">7. La quantité de déchets</h3>
                <p className="mt-2">Évacuation : 150-400€/tonne selon centre agréé et distance. Le volume dépend de l&apos;épaisseur des matériaux.</p>
              </article>
            </div>
            <p className="text-sm text-slate-300">
              Pour une estimation personnalisée, utilisez le formulaire en haut de page : type de travaux, code postal, contact suffisent.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Prix désamiantage détaillés selon le type de travaux</h2>
            <div className="grid gap-4 lg:grid-cols-2">
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">Désamiantage de toiture</h3>
                <p className="mt-2">
                  Prix désamiantage toiture fibrociment : 25-45€/m² (simple 25-35€, complexe 35-45€). Ardoise/shingle : 35-65€/m². Exemple 100 m² : 2 800-4 200€.
                </p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">Désamiantage de dalles de sol</h3>
                <p className="mt-2">
                  Prix désamiantage dalles vinyle-amiante : 35-90€/m² (simple 35-60€, colle 60-90€). Forfait min. 800-1 200€. Exemple 60 m² :
                  2 500-4 500€.
                </p>
                <Link href="/types-desamiantage/dalles-de-sol" className="text-emerald-200 hover:text-emerald-100">
                  En savoir plus sur les dalles de sol →
                </Link>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">Murs et plafonds</h3>
                <p className="mt-2">
                  Flocage 30-60€/m², plaques 40-80€/m², enduits 50-100€/m². Confinement complexe fréquent, surtout en tertiaire et industriel.
                </p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">Canalisations (calorifugeage)</h3>
                <p className="mt-2">
                  80-150€/m², intervention très technique. Exemple 50 m de tuyaux : 4 000-7 500€. Demandez un devis détaillé avec phasage.
                </p>
              </article>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
              <p className="text-base font-semibold text-white">💡 Exemple de projet complet - Maison 120 m²</p>
              <ul className="mt-2 space-y-2">
                <li>Toiture 80 m² fibrociment : 2 400-3 600€</li>
                <li>Dalles sol 40 m² : 1 600-3 000€</li>
                <li>Diagnostic + test final : 400-600€</li>
                <li>Total projet : 4 400-7 200€ TTC</li>
              </ul>
              <p className="mt-2 text-slate-200">Ces montants varient selon l&apos;accès, le phasage et l&apos;état des matériaux.</p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Que comprend le prix désamiantage ?</h2>
            <div className="grid gap-4 lg:grid-cols-2">
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">Prestations incluses</h3>
                <ul className="mt-2 space-y-1">
                  <li>✅ Main d&apos;œuvre qualifiée (60-70% du prix)</li>
                  <li>✅ EPI/EPC, confinements, extracteurs HEPA</li>
                  <li>✅ Retrait, conditionnement, évacuation</li>
                  <li>✅ Certificat de restitution et BSD</li>
                </ul>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">Prestations en supplément</h3>
                <ul className="mt-2 space-y-1">
                  <li>❌ Diagnostic avant travaux : 150-400€</li>
                  <li>❌ Test d&apos;air final : 200-500€</li>
                  <li>❌ Dépose d&apos;éléments (radiateurs, cloisons) : variable</li>
                  <li>❌ Finitions et nouveaux revêtements : hors lot</li>
                </ul>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">Coûts cachés à anticiper</h3>
                <ul className="mt-2 space-y-1">
                  <li>Mise en conformité électrique</li>
                  <li>Réfection après désamiantage (toiture, sols)</li>
                  <li>Relogement temporaire si travaux lourds</li>
                  <li>Déplacements en zone rurale</li>
                </ul>
              </article>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <table className="w-full text-sm text-slate-200">
                <thead className="bg-white/5 text-xs uppercase tracking-wide text-emerald-200">
                  <tr>
                    <th className="px-3 py-2 text-left">Poste de dépense</th>
                    <th className="px-3 py-2 text-left">% du total</th>
                    <th className="px-3 py-2 text-left">Montant (pour 100 m²)</th>
                  </tr>
                </thead>
                <tbody>
                  {breakdown.map(row => (
                    <tr key={row.post} className="border-t border-white/5">
                      <td className="px-3 py-2 font-semibold text-white">{row.post}</td>
                      <td className="px-3 py-2">{row.percent}</td>
                      <td className="px-3 py-2">{row.amount}</td>
                    </tr>
                  ))}
                  <tr className="border-t border-white/5 bg-white/5">
                    <td className="px-3 py-2 font-semibold text-white">TOTAL</td>
                    <td className="px-3 py-2">100%</td>
                    <td className="px-3 py-2">3 000-4 000€</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-300">
              Besoin d&apos;un tarif local ? Remplissez le formulaire en haut avec votre code postal et le type de travaux.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Prix désamiantage selon la surface à traiter</h2>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <table className="w-full text-sm text-slate-200">
                <thead className="bg-white/5 text-xs uppercase tracking-wide text-emerald-200">
                  <tr>
                    <th className="px-3 py-2 text-left">Surface</th>
                    <th className="px-3 py-2 text-left">Prix au m² moyen</th>
                    <th className="px-3 py-2 text-left">Prix total indicatif</th>
                    <th className="px-3 py-2 text-left">Économie</th>
                  </tr>
                </thead>
                <tbody>
                  {surfaceRanges.map(row => (
                    <tr key={row.surface} className="border-t border-white/5">
                      <td className="px-3 py-2 font-semibold text-white">{row.surface}</td>
                      <td className="px-3 py-2">{row.m2}</td>
                      <td className="px-3 py-2">{row.total}</td>
                      <td className="px-3 py-2">{row.economy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>Effet d&apos;échelle : les coûts fixes se diluent sur les grandes surfaces. Les tarifs unitaires baissent lorsque la surface augmente.</p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Exemples de devis réels de désamiantage</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">Exemple 1 - Toiture maison individuelle</h3>
                <p className="mt-2">Région parisienne, 120 m² fibrociment, complexité moyenne. Total : 5 030€ TTC (diagnostic 280€, dépose 3 600€, évacuation 800€, test 350€).</p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">Exemple 2 - Dalles de sol local commercial</h3>
                <p className="mt-2">Lyon, 85 m² dalles vinyle-amiante, complexité simple. Total : 4 495€ TTC (diagnostic 220€, retrait 3 825€, évacuation 450€).</p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">Exemple 3 - Flocage parking souterrain (Pro)</h3>
                <p className="mt-2">Marseille, 300 m² flocage, complexité élevée. Total : 19 000€ TTC (diagnostic 600€, retrait 13 500€, confinement 2 400€, évacuation 1 800€, tests 700€).</p>
              </article>
            </div>
            <p className="text-sm">Plus d&apos;exemples disponibles sur demande avec votre code postal et le type de travaux.</p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Comment comparer les devis de désamiantage ?</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">Éléments à vérifier</h3>
                <ul className="mt-2 space-y-1">
                  <li>✓ Certifications SS4 / Qualibat 1552</li>
                  <li>✓ Détail des prestations et des inclusions (diagnostic, évacuation, certificat)</li>
                  <li>✓ Délais d&apos;intervention et conditions de paiement</li>
                  <li>✓ BSD et traçabilité déchets</li>
                </ul>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">Questions à poser</h3>
                <ul className="mt-2 space-y-1">
                  <li>Le prix inclut-il l&apos;évacuation des déchets ?</li>
                  <li>Le diagnostic est-il compris ?</li>
                  <li>Quel est le délai d&apos;intervention ?</li>
                  <li>Fournissez-vous le certificat de restitution ?</li>
                  <li>Y a-t-il des frais supplémentaires possibles ?</li>
                </ul>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">Red flags</h3>
                <ul className="mt-2 space-y-1">
                  <li>Prix anormalement bas (&lt; 20€/m²)</li>
                  <li>Pas de certification visible</li>
                  <li>Devis vague sans détails</li>
                  <li>Paiement total d&apos;avance</li>
                  <li>Absence de BSD mentionné</li>
                </ul>
                <Link href="/devis-gratuit" className="text-emerald-200 hover:text-emerald-100">
                  Demandez vos devis gratuits →
                </Link>
              </article>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Existe-t-il des aides pour le désamiantage ?</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">Aides nationales</h3>
                <p className="mt-2">MaPrimeRénov&apos;, éco-PTZ, TVA 10% (logements &gt; 2 ans). Vérifiez l&apos;éligibilité.</p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">Aides locales</h3>
                <p className="mt-2">
                  Régions et communes subventionnent parfois le retrait (agricole, copro). ANAH pour profils modestes. Renseignez-vous auprès de
                  votre collectivité pour connaître les aides disponibles.
                </p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">Cas particuliers</h3>
                <p className="mt-2">Copropriétés (fonds travaux), assurances après sinistre, aides spécifiques pour bâtiments classés.</p>
              </article>
            </div>
            <LeadForm
              id="cta-form-4"
              title="💶 Vérifiez votre éligibilité aux aides"
              subtitle="En 2 minutes, identifiez les subventions mobilisables."
              button="Vérifier mes aides disponibles"
              fields={[
                { label: "Type de bien", name: "bien", options: ["Maison", "Appartement", "Copropriété"] },
                { label: "Année de construction", name: "annee", options: ["Avant 1997", "Après 1997"] },
                { label: "Revenus", name: "revenus", options: ["Modeste", "Standard", "Élevé"] },
                { label: "Code postal", name: "code_postal", type: "text" },
                { label: "Contact", name: "contact", type: "text" },
              ]}
              note="Réponse sous 48h · Sans engagement"
            />
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Comment réduire le coût de son désamiantage ?</h2>
            <div className="grid gap-4 lg:grid-cols-3">
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">Astuces légales</h3>
                <ul className="mt-2 space-y-1">
                  <li>Regrouper les travaux (toiture + dalles)</li>
                  <li>Choisir une période creuse (hiver)</li>
                  <li>Préparer les accès (dégagement, stationnement)</li>
                  <li>Comparer 3-4 devis minimum</li>
                  <li>Négocier sur grandes surfaces</li>
                </ul>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">Ce qu&apos;il ne faut jamais faire</h3>
                <ul className="mt-2 space-y-1">
                  <li>❌ Retirer l&apos;amiante soi-même</li>
                  <li>❌ Choisir une entreprise non certifiée</li>
                  <li>❌ Négliger le diagnostic</li>
                  <li>❌ Reporter indéfiniment (dégradation accrue)</li>
                </ul>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">Le bon rapport qualité-prix</h3>
                <p className="mt-2">
                  Prix désamiantage réaliste : 35-80€/m² selon matériau et accès. Certification et références restent les meilleurs indicateurs.
                </p>
              </article>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Variations des prix désamiantage selon les régions françaises</h2>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <table className="w-full text-sm text-slate-200">
                <thead className="bg-white/5 text-xs uppercase tracking-wide text-emerald-200">
                  <tr>
                    <th className="px-3 py-2 text-left">Région</th>
                    <th className="px-3 py-2 text-left">Prix moyen au m²</th>
                    <th className="px-3 py-2 text-left">Variation</th>
                  </tr>
                </thead>
                <tbody>
                  {regionPrices.map(row => (
                    <tr key={row.region} className="border-t border-white/5">
                      <td className="px-3 py-2 font-semibold text-white">{row.region}</td>
                      <td className="px-3 py-2">{row.price}</td>
                      <td className="px-3 py-2">{row.delta}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-emerald-200">
              <Link href="/desamiantage-france" className="hover:text-emerald-100">
                Voir tous les prix par ville →
              </Link>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Questions fréquentes sur les prix du désamiantage</h2>
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

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Récapitulatif des prix 2024</h2>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <table className="w-full text-sm text-slate-200">
                <thead className="bg-white/5 text-xs uppercase tracking-wide text-emerald-200">
                  <tr>
                    <th className="px-3 py-2 text-left">Type de travaux</th>
                    <th className="px-3 py-2 text-left">Difficulté</th>
                    <th className="px-3 py-2 text-left">Prix mini</th>
                    <th className="px-3 py-2 text-left">Prix moyen</th>
                    <th className="px-3 py-2 text-left">Prix maxi</th>
                    <th className="px-3 py-2 text-left">Délai</th>
                  </tr>
                </thead>
                <tbody>
                  {megaTable.map(row => (
                    <tr key={row.type} className="border-t border-white/5">
                      <td className="px-3 py-2 font-semibold text-white">{row.type}</td>
                      <td className="px-3 py-2">{row.diff}</td>
                      <td className="px-3 py-2">{row.min}</td>
                      <td className="px-3 py-2">{row.avg}</td>
                      <td className="px-3 py-2">{row.max}</td>
                      <td className="px-3 py-2">{row.delay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Conclusion</h2>
            <p>
              Les prix désamiantage 2024 se situent entre 35 et 80€/m² pour la plupart des chantiers, avec des pointes à 150€/m² en confinement
              complexe. Comparer trois devis et vérifier certifications et inclusions garantit un tarif juste. Un projet résidentiel tourne autour
              de 3 000-7 000€ TTC.
            </p>
            <p>Ne négligez pas les aides ni les critères qualité (Qualibat 1552, BSD, références).</p>
            <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-sm text-emerald-100">
              <p className="text-base font-semibold text-emerald-200">🎯 Prêt à lancer votre projet de désamiantage ?</p>
              <p className="mt-2 text-slate-100">Recevez 3 devis détaillés et personnalisés gratuitement.</p>
              <p className="text-sm text-slate-200">
                Prêt à comparer ? Utilisez le formulaire en haut : type de travaux, code postal, contact. Nous vous envoyons 3 devis en 24-72h.
              </p>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
