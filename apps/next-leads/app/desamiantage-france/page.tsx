/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";

import { ContactForm } from "@/components/ContactForm";
import { createMetadata, getBreadcrumbJsonLd, getFaqJsonLd } from "@/lib/seo";
import { getBrandName } from "@/lib/utils";

import type { Metadata } from "next";

const brandName = getBrandName();
const pagePath = "/desamiantage-france";

export const metadata: Metadata = createMetadata({
  title: "Entreprise de désamiantage en France | Comparez 3 devis certifiés",
  description:
    "Trouvez une entreprise de désamiantage en France : tarifs régionaux, certifications Qualibat 1552, carte interactive et devis gratuits. Comparez les prix par région et choisissez une société de désamiantage certifiée.",
  path: pagePath,
  openGraphType: "article",
});

const breadcrumbLd = getBreadcrumbJsonLd([
  { name: "Accueil", path: "/" },
  { name: "Désamiantage-France", path: pagePath },
]);

const regions = [
  { name: "Île-de-France", slug: "ile-de-france", companies: 247, price: "50-70€/m²" },
  { name: "Auvergne-Rhône-Alpes", slug: "auvergne-rhone-alpes", companies: 198, price: "45-65€/m²" },
  { name: "Nouvelle-Aquitaine", slug: "nouvelle-aquitaine", companies: 156, price: "42-60€/m²" },
  { name: "Occitanie", slug: "occitanie", companies: 144, price: "43-62€/m²" },
  { name: "Provence-Alpes-Côte d'Azur", slug: "provence-alpes-cote-d-azur", companies: 131, price: "48-68€/m²" },
  { name: "Hauts-de-France", slug: "hauts-de-france", companies: 122, price: "40-58€/m²" },
  { name: "Grand Est", slug: "grand-est", companies: 118, price: "42-60€/m²" },
  { name: "Bretagne", slug: "bretagne", companies: 86, price: "41-57€/m²" },
  { name: "Pays de la Loire", slug: "pays-de-la-loire", companies: 94, price: "42-60€/m²" },
  { name: "Centre-Val de Loire", slug: "centre-val-de-loire", companies: 73, price: "42-59€/m²" },
  { name: "Normandie", slug: "normandie", companies: 71, price: "41-58€/m²" },
  { name: "Bourgogne-Franche-Comté", slug: "bourgogne-franche-comte", companies: 64, price: "40-56€/m²" },
  { name: "Corse", slug: "corse", companies: 19, price: "55-80€/m²" },
];

const regionPrices = regions.map(region => ({
  region: region.name,
  price: region.price,
  variation: region.name === "Île-de-France" ? "+15% vs moyenne" : region.name === "Corse" ? "+25% vs moyenne" : "Aligné à la moyenne",
  link: `/desamiantage-${region.slug}/`,
}));

const citiesByRegion: Record<string, { city: string; pop: string; searches?: string; cpc?: string; hot?: boolean }[]> = {
  "Île-de-France": [
    { city: "Paris", pop: "2,2M", searches: "70/mois", cpc: "6,40€", hot: true },
    { city: "Boulogne-Billancourt", pop: "120k" },
    { city: "Saint-Denis", pop: "113k" },
    { city: "Versailles", pop: "85k", searches: "15/mois" },
  ],
  "Auvergne-Rhône-Alpes": [
    { city: "Lyon", pop: "522k", searches: "60/mois", cpc: "4,10€", hot: true },
    { city: "Grenoble", pop: "158k" },
    { city: "Clermont-Ferrand", pop: "146k" },
    { city: "Saint-Étienne", pop: "172k" },
  ],
  "Nouvelle-Aquitaine": [
    { city: "Bordeaux", pop: "254k", searches: "30/mois", cpc: "6,40€", hot: true },
    { city: "Limoges", pop: "130k" },
    { city: "Pau", pop: "76k" },
    { city: "Poitiers", pop: "90k" },
  ],
  Occitanie: [
    { city: "Toulouse", pop: "498k", searches: "40/mois" },
    { city: "Montpellier", pop: "300k" },
    { city: "Nîmes", pop: "150k" },
    { city: "Perpignan", pop: "120k" },
  ],
  "Provence-Alpes-Côte d'Azur": [
    { city: "Marseille", pop: "870k", searches: "50/mois" },
    { city: "Nice", pop: "340k" },
    { city: "Toulon", pop: "180k" },
    { city: "Avignon", pop: "90k" },
  ],
  "Hauts-de-France": [
    { city: "Lille", pop: "236k", searches: "35/mois" },
    { city: "Amiens", pop: "134k" },
    { city: "Roubaix", pop: "98k" },
    { city: "Tourcoing", pop: "98k" },
  ],
  "Grand Est": [
    { city: "Strasbourg", pop: "287k", searches: "30/mois" },
    { city: "Reims", pop: "182k" },
    { city: "Metz", pop: "116k" },
    { city: "Nancy", pop: "104k" },
  ],
  Bretagne: [
    { city: "Rennes", pop: "222k" },
    { city: "Brest", pop: "140k" },
    { city: "Quimper", pop: "63k" },
    { city: "Vannes", pop: "54k" },
  ],
  "Pays de la Loire": [
    { city: "Nantes", pop: "320k", searches: "25/mois" },
    { city: "Angers", pop: "155k" },
    { city: "Le Mans", pop: "142k" },
    { city: "Saint-Nazaire", pop: "70k" },
  ],
  "Centre-Val de Loire": [
    { city: "Tours", pop: "136k" },
    { city: "Orléans", pop: "115k" },
    { city: "Chartres", pop: "38k" },
    { city: "Bourges", pop: "64k" },
  ],
  Normandie: [
    { city: "Rouen", pop: "113k" },
    { city: "Caen", pop: "105k" },
    { city: "Le Havre", pop: "168k" },
    { city: "Cherbourg", pop: "79k" },
  ],
  "Bourgogne-Franche-Comté": [
    { city: "Dijon", pop: "159k" },
    { city: "Besançon", pop: "117k" },
    { city: "Nevers", pop: "32k" },
    { city: "Belfort", pop: "46k" },
  ],
  Corse: [
    { city: "Ajaccio", pop: "70k" },
    { city: "Bastia", pop: "45k" },
    { city: "Porto-Vecchio", pop: "12k" },
    { city: "Corte", pop: "8k" },
  ],
};

const faqItems = [
  {
    question: "Comment choisir une entreprise de désamiantage en France ?",
    answer:
      "Vérifiez la certification Qualibat 1552, les assurances (RC pro, décennale amiante), les références récentes et la capacité à gérer la logistique (confinements, nacelles, déchets). Exigez un plan de retrait et le suivi BSD numérique.",
  },
  {
    question: "Quel est le prix moyen d'un désamiantage au m² ?",
    answer:
      "En 2025, comptez 40 à 80€/m² pour une toiture ou un fibrociment simple, et jusqu'à 200-500€/m² sur chantiers complexes (hauteur, forte dégradation, confinement dynamique). Les prix varient selon la région et l'accès au centre de traitement.",
  },
  {
    question: "Puis-je obtenir des aides pour le désamiantage ?",
    answer:
      "Des aides locales, ANAH ou agricoles peuvent couvrir 20 à 40€/m² selon les profils. Les dossiers exigent un devis d'une entreprise certifiée, les attestations RGE quand il y a rénovation énergétique, et les BSD en fin de chantier.",
  },
  {
    question: "Quel délai pour démarrer un chantier de désamiantage ?",
    answer:
      "Le délai administratif (plan de retrait, déclarations DREETS/CARSAT) prend 2 à 4 semaines. Les travaux durent ensuite quelques jours à plusieurs semaines selon la surface et le phasage en site occupé.",
  },
];

const faqLd = getFaqJsonLd(faqItems);

function RegionCard({ name, slug, companies, price }: (typeof regions)[number]) {
  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-emerald-200">
          <span aria-hidden>🗺</span>
          <span className="font-semibold text-white">{name}</span>
        </div>
        <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-100">Certifiés</span>
      </div>
      <p className="text-sm text-slate-200">{companies} entreprises certifiées</p>
      <p className="text-sm text-slate-200">Prix moyen : {price}</p>
      <div className="flex flex-wrap gap-2">
        <Link href={`/desamiantage-${slug}/`} className="btn-secondary">
          Voir les entreprises →
        </Link>
        <a href="#cta-form" className="btn-ghost text-sm">
          Devis gratuit {name}
        </a>
      </div>
    </article>
  );
}

export default function DesamiantageFrancePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {faqLd ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} /> : null}

      <header className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 lg:flex-row">
          <div className="flex-1 space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
              Réseau national · {brandName}
            </span>
            <h1 className="text-3xl font-semibold leading-tight md:text-4xl">Désamiantage en France : Trouvez votre entreprise certifiée près de chez vous</h1>
            <p className="text-lg text-slate-200">
              Comparez trois devis gratuits d'entreprises de désamiantage certifiées Qualibat 1552 dans votre région. Accédez aux prix moyens
              par région, aux certifications obligatoires et aux bonnes pratiques pour sécuriser vos travaux (toiture, fibrociment, dalles,
              conduits) partout en France.
            </p>
            <div className="grid gap-3 text-sm text-slate-200 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-wide text-emerald-200">Entreprises certifiées</p>
                <p className="mt-1 text-xl font-semibold text-white">1500+</p>
                <p className="text-slate-300">Réseau national audité</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-wide text-emerald-200">Surface traitée / an</p>
                <p className="mt-1 text-xl font-semibold text-white">3,2 M m²</p>
                <p className="text-slate-300">Toitures, bardages, sols</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-wide text-emerald-200">Délai moyen</p>
                <p className="mt-1 text-xl font-semibold text-white">72 h</p>
                <p className="text-slate-300">Qualification & devis</p>
              </div>
            </div>
            <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-sm text-emerald-100">
              <p className="font-semibold text-emerald-200">Carte interactive</p>
              <p className="mt-2 text-slate-100">
                Sélectionnez votre région pour accéder aux entreprises certifiées, aux prix moyens au m² et aux délais d'intervention. Chaque
                fiche région propose un mini-formulaire pour obtenir 3 devis gratuits.
              </p>
            </div>
          </div>
          <div id="cta-form" className="w-full max-w-xl shrink-0 rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-lg shadow-emerald-500/10 backdrop-blur">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-200">
              Service gratuit · Entreprises certifiées
            </div>
            <h2 className="mt-3 text-xl font-semibold text-white">Comparez 3 devis gratuits</h2>
            <p className="text-sm text-slate-300">Formulaire unique pour toiture, fibrociment, dalles, conduits amiantés.</p>
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3">
              <ContactForm />
            </div>
            <p className="mt-2 text-[11px] text-slate-400">✓ Sans engagement · ✓ Plans SS3/SS4 · ✓ BSD numérique</p>
          </div>
        </div>
      </header>

      <main className="bg-slate-950 text-slate-200">
        <div className="mx-auto max-w-6xl space-y-16 px-6 py-12">
          <section id="regions" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">Trouvez une entreprise de désamiantage dans votre région</h2>
              <span className="text-sm text-emerald-200">13 régions · prix moyens et devis rapides</span>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {regions.map(region => (
                <RegionCard key={region.slug} {...region} />
              ))}
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm">
              <h3 className="text-lg font-semibold text-white">Comment fonctionne notre mise en relation nationale ?</h3>
              <p className="mt-2">
                Vous choisissez votre région, nous qualifions le besoin (toiture, bardage, dalles, conduits) et mobilisons trois entreprises de
                désamiantage proches du chantier. Chaque société de désamiantage proposée est certifiée Qualibat 1552, assurée et auditée par
                nos équipes QSE. Le chef de projet coordonne plans de retrait, accès au centre de traitement et planning pour limiter l'arrêt
                d'activité.
              </p>
              <ul className="mt-3 grid gap-2 md:grid-cols-3">
                <li className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-xs uppercase tracking-wide text-emerald-200">1. Qualification</p>
                  <p className="mt-2 text-sm">Photo, surface, hauteur, type de matériau, contraintes d'accès et coactivité.</p>
                </li>
                <li className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-xs uppercase tracking-wide text-emerald-200">2. Devis comparatifs</p>
                  <p className="mt-2 text-sm">3 devis d'entreprises de désamiantage certifiées, avec options phasage et logistique.</p>
                </li>
                <li className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-xs uppercase tracking-wide text-emerald-200">3. Pilotage</p>
                  <p className="mt-2 text-sm">Plan de retrait SS3/SS4, BSD numérique, mesures d'empoussièrement et réception.</p>
                </li>
              </ul>
            </div>
          </section>

          <section id="villes" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">Désamiantage dans les grandes villes de France</h2>
              <span className="text-sm text-emerald-200">Top villes par région · badges forte demande</span>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              {Object.entries(citiesByRegion).map(([region, cities]) => (
                <article key={region} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-emerald-200">
                      <span aria-hidden>🏙</span>
                      <span className="font-semibold text-white">{region}</span>
                    </div>
                    <Link href={`/desamiantage-${regions.find(r => r.name === region)?.slug ?? ""}/`} className="text-xs text-emerald-200 hover:text-emerald-100">
                      Voir la région →
                    </Link>
                  </div>
                  <ul className="mt-3 space-y-2 text-sm">
                    {cities.map(city => (
                      <li key={city.city} className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-white">{city.city}</span>
                        <span className="text-slate-400">({city.pop} hab.)</span>
                        {city.searches ? <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] text-slate-200">{city.searches}</span> : null}
                        {city.cpc ? <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[11px] text-emerald-200">CPC {city.cpc}</span> : null}
                        {city.hot ? <span className="rounded-full bg-amber-500/15 px-2 py-1 text-[11px] text-amber-100">Forte demande</span> : null}
                        <Link
                          href={`/desamiantage-${regions.find(r => r.name === region)?.slug ?? ""}/${city.city.toLowerCase().replace(/[^a-z0-9]+/g, "-")}/`}
                          className="text-emerald-200 transition hover:text-emerald-100"
                        >
                          Voir les pros →
                        </Link>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section id="guide" className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Comment choisir une entreprise de désamiantage en France ?</h2>
            <div className="grid gap-4 lg:grid-cols-2">
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-lg font-semibold text-white">Les certifications obligatoires</h3>
                <p className="mt-2 text-sm">
                  Une entreprise de désamiantage doit détenir la certification Qualibat 1552 pour les travaux de retrait (SS3) et une
                  habilitation SS4 pour la maintenance. La mention RGE est requise lorsqu'un bouquet de travaux énergétiques est prévu. Vérifiez
                  aussi la formation des opérateurs, la présence d'un référent QSE et la mise à jour des modes opératoires.
                </p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>• Qualibat 1552, audits à jour</li>
                  <li>• Assurances RC pro et décennale incluant amiante</li>
                  <li>• Plans de retrait validés, mesures d'empoussièrement</li>
                  <li>• Traçabilité BSD numérique et archivage</li>
                </ul>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-lg font-semibold text-white">Comparaison des prix par région</h3>
                <p className="mt-2 text-sm">
                  Les écarts viennent de la densité d'entreprises certifiées, du coût de la main d'oeuvre et de l'accès aux centres de
                  traitement. Île-de-France et PACA affichent souvent +10 à +15% par rapport à la moyenne. Les régions avec davantage de
                  distance vers les centres de traitement ou des contraintes littorales peuvent avoir des coûts de logistique supplémentaires.
                </p>
                <p className="mt-2 text-sm">
                  Utilisez la grille régionale ci-dessous pour anticiper votre budget et demandez un devis comparatif pour ajuster selon la
                  surface, la hauteur et la fragilisation des matériaux.
                </p>
              </article>
            </div>
            <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-lg font-semibold text-white">Questions à poser avant de signer</h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li>• Quel dispositif de confinement (statique/dynamique) et quels EPI/EPC sont prévus ?</li>
                <li>• Comment sont conditionnés et tracés les déchets (BSD, centre agréé, transport ADR) ?</li>
                <li>• Quels délais réalistes (administratif + travaux) et quel phasage en site occupé ?</li>
                <li>• Quelles garanties et assurances couvrent le lot amiante et la réfection provisoire ?</li>
              </ul>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-lg font-semibold text-white">Typologie des travaux pris en charge</h3>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-sm font-semibold text-white">Toitures et fibrociment</p>
                  <p className="mt-2 text-sm">Plaques ondulées, ardoises artificielles, sheds industriels, faîtages, conduits et bardages.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-sm font-semibold text-white">Intérieurs et sols</p>
                  <p className="mt-2 text-sm">Dalles vinyles, colle amiantée, flocages, calorifugeages, gaines techniques et faux-plafonds.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-sm font-semibold text-white">Sites tertiaires et industriels</p>
                  <p className="mt-2 text-sm">Confinement dynamique, travail en hauteur, ATEX, phasage en coactivité, arrêts techniques.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-sm font-semibold text-white">Logistique déchets</p>
                  <p className="mt-2 text-sm">Bennes dédiées, big bags ADR, créneaux en centre agréé, suivi BSD et certificats de dépôt.</p>
                </div>
              </div>
            </article>
          </section>

          <section id="prix" className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Prix du désamiantage par région en France</h2>
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
              <table className="w-full text-sm text-slate-200">
                <thead className="bg-white/5 text-xs uppercase tracking-wide text-emerald-200">
                  <tr>
                    <th className="px-4 py-3 text-left">Région</th>
                    <th className="px-4 py-3 text-left">Prix moyen/m²</th>
                    <th className="px-4 py-3 text-left">Variation</th>
                    <th className="px-4 py-3 text-left">Lien</th>
                  </tr>
                </thead>
                <tbody>
                  {regionPrices.map(row => (
                    <tr key={row.region} className="border-t border-white/5">
                      <td className="px-4 py-3 font-semibold text-white">{row.region}</td>
                      <td className="px-4 py-3">{row.price}</td>
                      <td className="px-4 py-3">{row.variation}</td>
                      <td className="px-4 py-3">
                        <Link href={row.link} className="text-emerald-200 hover:text-emerald-100">
                          Voir les prix →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="rounded-3xl border border-emerald-500/25 bg-emerald-500/10 p-5 text-sm text-emerald-100">
              <p className="font-semibold text-emerald-200">Besoin d'un chiffrage précis ?</p>
              <p className="mt-2 text-slate-100">
                Un chef de projet {brandName} ajuste le prix selon la surface, la pente, l'accès et la fragilisation des matériaux. Nous
                comparons plusieurs entreprises certifiées pour sécuriser vos délais et vos coûts.
              </p>
              <a href="#cta-form" className="btn-cta mt-3 inline-flex">
                Obtenir 3 devis gratuits
              </a>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm">
              <h3 className="text-lg font-semibold text-white">Facteurs qui font varier le prix par région</h3>
              <ul className="mt-3 space-y-2">
                <li>• Densité d'entreprises de désamiantage et disponibilité des équipes certifiées.</li>
                <li>• Distance au centre de traitement agréé, coût du transport ADR et des bennes fermées.</li>
                <li>• Contrainte météo (littoral, montagne) impactant la planification et les protections collectives.</li>
                <li>• Coactivité en zone urbaine dense (Île-de-France, PACA) nécessitant des confinements dynamiques.</li>
              </ul>
              <p className="mt-2">
                Pour un même type de chantier, le différentiel peut aller de 10 à 25% entre régions. D'où l'intérêt de comparer plusieurs
                sociétés de désamiantage locales pour optimiser la logistique et réduire les coûts annexes.
              </p>
            </div>
          </section>

          <section id="financement" className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Financements et aides pour vos travaux de désamiantage</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-lg font-semibold text-white">Aides publiques</h3>
                <p className="mt-2 text-sm">
                  Certaines collectivités et l'ANAH proposent des aides pour le retrait d'amiante quand il s'intègre à une rénovation
                  énergétique ou à la sécurisation d'un bâtiment. Les montants varient généralement entre 20 et 40€/m² avec un plafond par
                  dossier, et exigent des devis d'entreprises de désamiantage certifiées.
                </p>
                <ul className="mt-2 space-y-2 text-sm">
                  <li>• ANAH : aides conditionnées aux revenus et à la performance énergétique.</li>
                  <li>• Régions/départements : dispositifs agricoles (hangars, toitures &gt; 400 m²).</li>
                  <li>• Taux réduits : TVA 10% ou 5,5% si bouquet de travaux énergétiques.</li>
                </ul>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-lg font-semibold text-white">Financement privé</h3>
                <p className="mt-2 text-sm">
                  Les banques proposent des prêts travaux ou éco-PTZ pour les rénovations globales. Les entreprises peuvent amortir
                  l'investissement et passer les travaux en charge, tandis que les copropriétés votent des appels de fonds échelonnés. Les
                  sociétés de désamiantage fournissent les justificatifs (factures, BSD, attestations) nécessaires au déblocage des fonds.
                </p>
                <p className="mt-2 text-sm">
                  Pour les toitures supérieures à 1000 m² destinées à une centrale solaire, certains développeurs financent le retrait intégral
                  en échange d'un bail de toiture ou d'une redevance énergétique. Faites analyser le contrat avant signature.
                </p>
              </article>
            </div>
            <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-5 text-sm text-emerald-100">
              <p className="font-semibold text-emerald-200">Besoin d'aide pour vos dossiers ?</p>
              <p className="mt-2 text-slate-100">
                {brandName} prépare vos pièces (devis, plan de retrait, attestations, BSD) pour les subventions et accompagne la constitution
                des dossiers ANAH ou régionaux. Un conseiller peut aussi simuler les aides selon votre localisation.
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                <a href="#cta-form" className="btn-cta">
                  Calculez vos aides
                </a>
              </div>
            </div>
          </section>

          <section id="reglementation" className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Réglementation du désamiantage en France</h2>
            <div className="grid gap-4 lg:grid-cols-3">
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-lg font-semibold text-white">Code du travail et décret 2012-639</h3>
                <p className="mt-2 text-sm">
                  Les travaux amiante sont soumis au Code du travail, au décret 2012-639 et à l'arrêté du 8 avril 2013. Ils imposent une
                  analyse des risques, un plan de retrait ou un mode opératoire SS4, des protections collectives et des mesures
                  d'empoussièrement avant restitution.
                </p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-lg font-semibold text-white">DTA et traçabilité</h3>
                <p className="mt-2 text-sm">
                  Le Dossier Technique Amiante (DTA) recense les matériaux amiantés, les rapports de repérage et les travaux réalisés. Chaque
                  intervention ajoute des BSD et attestations pour prouver la bonne élimination des déchets en centre agréé.
                </p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-lg font-semibold text-white">Délais et déclarations</h3>
                <p className="mt-2 text-sm">
                  Les plans de retrait sont déclarés à la DREETS et à la CARSAT. En voirie, des autorisations de mairie peuvent être
                  nécessaires pour les échafaudages ou nacelles. Le délai de prévenance est souvent de 30 jours, réduit à 15 jours en urgence.
                </p>
              </article>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm">
              <h3 className="text-lg font-semibold text-white">Bonnes pratiques</h3>
              <ul className="mt-3 space-y-2">
                <li>• Réaliser un repérage amiante avant travaux (RAT) ou un diagnostic destructif adapté à la zone.</li>
                <li>• Prévoir un confinement adapté à l'empoussièrement estimé et aux tiers présents.</li>
                <li>• Exiger le BSD final, les mesures d'empoussièrement et les attestations d'assurance mises à jour.</li>
                <li>• Vérifier la filière déchets et la réservation du centre agréé avant de signer.</li>
              </ul>
              <p className="mt-2">
                Les entreprises de désamiantage doivent aussi planifier la remise hors d'eau provisoire, informer les riverains en cas de
                nuisance potentielle et sécuriser les accès. Un contrôle visuel et un mesurage final valident la restitution des locaux ou de
                la toiture.
              </p>
            </div>
          </section>

          <section id="cas-pratiques" className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Cas pratiques : exemples de chantiers gérés</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-lg font-semibold text-white">Copropriété urbaine</h3>
                <p className="mt-2 text-sm">
                  Dépose de toiture fibrociment 600 m², échafaudages en façade, confinement statique, phasage par cages d'escalier pour limiter
                  l'impact sur les occupants. Durée 3 semaines, BSD numériques, remise hors d'eau chaque soir.
                </p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-lg font-semibold text-white">Hangar agricole</h3>
                <p className="mt-2 text-sm">
                  Retrait de plaques amiantées 1200 m², nacelles, palettisation mécanique et benne ADR. Subvention régionale 30% et étude de
                  faisabilité solaire. Travaux en 10 jours, contrôle d'empoussièrement final.
                </p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-lg font-semibold text-white">Site industriel actif</h3>
                <p className="mt-2 text-sm">
                  Confinement dynamique sur conduits et calorifugeages, horaires de nuit, coordinateur SPS et mesures quotidiennes. Phasage
                  pour maintenir la production, reporting photo et suivi QSE partagé.
                </p>
              </article>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm">
              <h3 className="text-lg font-semibold text-white">Ce qui fait la différence</h3>
              <ul className="mt-3 space-y-2">
                <li>• Chef de projet dédié pour harmoniser devis, planning et filière déchets.</li>
                <li>• Société de désamiantage locale pour réduire les coûts de transport et les délais.</li>
                <li>• Contrôles qualité : plan de retrait relu, check-list EPI/EPC, mesure d'empoussièrement.</li>
                <li>• Dossier numérique livré : plans, photos, BSD, attestations d'assurance et réception.</li>
              </ul>
            </div>
          </section>

          <section id="faq" className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">FAQ : entreprise de désamiantage</h2>
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

          <section id="cta-final" className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">Trouvez votre entreprise certifiée en 2 minutes</h2>
                <p>
                  Remplissez le formulaire et recevez jusqu'à trois devis comparatifs d'entreprises de désamiantage certifiées près de chez
                  vous. Nous validons les assurances, le plan de retrait et la filière déchets pour sécuriser votre chantier.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Certification Qualibat 1552 vérifiée</li>
                  <li>• Plans SS3/SS4 relus par un référent QSE</li>
                  <li>• BSD numérique et photos de chantier partagées</li>
                </ul>
                <div className="flex flex-wrap gap-3">
                  <a href="#cta-form" className="btn-cta">
                    Obtenir 3 devis gratuits
                  </a>
                  <Link href="/prix-desamiantage/" className="btn-secondary">
                    Voir les prix moyens
                  </Link>
                  <Link href="/entreprises-certifiees/" className="text-emerald-200 hover:text-emerald-100">
                    Consultez la liste des entreprises certifiées
                  </Link>
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-900 p-5 shadow-lg shadow-emerald-500/10">
                <ContactForm />
                <p className="mt-2 text-[11px] text-slate-400">✓ Gratuit · ✓ Sans engagement · ✓ Entreprises auditées</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
