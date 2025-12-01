import Link from "next/link";

import { CityLeadForm } from "@/components/CityLeadForm";
import { cities, cityList } from "@/lib/cities";

import type { Metadata } from "next";

type CityPageProps = {
  params: {
    city: string;
  };
};

export async function generateStaticParams() {
  return cityList.map(slug => ({ city: slug }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const c = cities[params.city as keyof typeof cities];
  if (!c) return {};

  const title = `Désamiantage ${c.name} : Comparez 3 devis gratuits d'entreprises certifiées`;
  const description = `Trouvez une entreprise de désamiantage certifiée Qualibat 1552 à ${c.name}. Comparez 3 devis gratuits. ✅ ${c.prosCount} pros certifiés ✅ Prix moyen: ${c.priceAvgM2} ✅ Réponse en ${c.responseDelay}.`;

  return {
    title,
    description,
    alternates: { canonical: c.canonical },
    openGraph: {
      title,
      description,
      url: c.canonical,
      type: "article",
      locale: "fr_FR",
    },
    other: {
      "geo.region": c.deptCode,
      "geo.placename": c.geoPlacename,
      keywords: `désamiantage ${c.name.toLowerCase()}, entreprise désamiantage ${c.name.toLowerCase()}, prix désamiantage ${c.name.toLowerCase()}, devis désamiantage ${c.name.toLowerCase()}`,
    },
  };
}

export default function CityPage({ params }: CityPageProps) {
  const city = cities[params.city as keyof typeof cities];
  if (!city) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-2xl font-semibold">Ville inconnue</h1>
        <p className="mt-2 text-slate-500">Cette page n’existe pas.</p>
      </main>
    );
  }

  const otherCities = cityList.filter(slug => slug !== city.slug).map(slug => cities[slug]);
  const priceRows = [
    {
      label: "Désamiantage toiture (fibrociment, plaques ondulées)",
      range: "45€ – 65€/m²",
      forfait: "4 500€ – 6 500€ pour 100 m²",
    },
    {
      label: "Retrait fibrociment (bardages, gaines techniques)",
      range: "40€ – 55€/m²",
      forfait: "3 800€ – 5 300€ pour un lot moyen",
    },
    {
      label: "Dalles vinyles amiantées + colle",
      range: "35€ – 50€/m²",
      forfait: "3 000€ – 5 000€ pour 80 m²",
    },
    {
      label: "Diagnostic amiante avant travaux",
      range: "—",
      forfait: "180€ – 350€ (forfait)",
    },
  ];

  const steps = [
    {
      title: "Qualification & diagnostic",
      desc: "Analyse du besoin, repérage amiante (DAAT/RAT) et cartographie des matériaux à risque par un diagnostiqueur certifié.",
    },
    {
      title: "Plan de retrait & autorisations",
      desc: "Élaboration du plan de retrait SS3/SS4, déclaration DREETS/CARSAT, coordination avec la mairie pour les accès et confinements.",
    },
    {
      title: "Retrait, contrôle & traçabilité",
      desc: "Retrait sous confinement, mesures d’empoussièrement, conditionnement ADR, BSD numériques et dossier de fin de chantier.",
    },
  ];

  const faqItems = [
    {
      question: `Quel est le prix moyen d’un désamiantage à ${city.name} ?`,
      answer:
        "Selon le matériau et la complexité d’accès, comptez entre 40€ et 70€ par m² pour un retrait complet. Les diagnostics varient de 180€ à 350€.",
    },
    {
      question: "Comment vérifier la certification d’une entreprise ?",
      answer:
        "Demandez la certification Qualibat 1552, l’assurance RC décennale dédiée amiante, et un suivi documenté (plans, attestations, BSD).",
    },
    {
      question: "Quel délai pour lancer les travaux ?",
      answer:
        "Le dossier administratif prend 2 à 4 semaines. Les travaux s’effectuent ensuite sur 1 à 3 semaines selon la surface et le confinement requis.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.desamiantage-pro.fr/" },
          { "@type": "ListItem", position: 2, name: "Désamiantage-France", item: "https://www.desamiantage-pro.fr/desamiantage-france" },
          { "@type": "ListItem", position: 3, name: "France" },
          { "@type": "ListItem", position: 4, name: city.name },
        ],
      },
      {
        "@type": "Service",
        name: `Désamiantage à ${city.name}`,
        areaServed: { "@type": "City", name: city.name },
        offers: { "@type": "AggregateOffer", priceCurrency: "EUR", lowPrice: "40", highPrice: "70" },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Fil d’Ariane */}
      <nav className="border-b border-white/5 bg-slate-950/80 text-sm text-slate-300">
        <div className="mx-auto flex max-w-6xl items-center gap-1 px-4 py-3">
          <Link href="/" className="transition hover:text-emerald-300">
            Accueil
          </Link>
          <span aria-hidden>›</span>
          <Link href="/desamiantage-france" className="transition hover:text-emerald-300">
            Désamiantage-France
          </Link>
          <span aria-hidden>›</span>
          <strong className="text-slate-100">{city.name}</strong>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-14 lg:flex-row">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
              {city.deptCode} · {city.name}
            </div>
            <h1 className="text-3xl font-semibold leading-snug md:text-4xl">
              Désamiantage {city.name} : Comparez 3 devis gratuits d&apos;entreprises certifiées Qualibat 1552
            </h1>
            <p className="text-lg text-slate-200">
              {city.prosCount}+ entreprises certifiées interviennent à {city.name} et ses environs. Réceptionnez 3 devis gratuits en{" "}
              {city.responseDelay} pour vos opérations de retrait, confinement ou diagnostic amiante.
            </p>
            <div className="grid gap-3 text-sm text-slate-200 sm:grid-cols-3">
              {[
                { label: "Prix moyen observé", value: city.priceAvgM2 },
                { label: "Délai de réponse", value: city.responseDelay },
                { label: "Entreprises certifiées", value: `${city.prosCount}+` },
              ].map(item => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <strong className="text-lg text-white">{item.value}</strong>
                  <p className="text-xs text-slate-300">{item.label}</p>
                </div>
              ))}
            </div>
            <ul className="flex flex-wrap gap-3 text-sm text-slate-200">
              <li className="flex items-center gap-2">
                <span aria-hidden>✅</span> Diagnostic sous 48h
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden>🔒</span> Plans SS3/SS4 validés
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden>🗂️</span> BSD numérique inclus
              </li>
            </ul>
          </div>

          <div id="hero-form" className="w-full max-w-xl shrink-0">
            <div className="relative rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-emerald-500/10 backdrop-blur">
              <div className="absolute -top-5 left-6 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-slate-900 shadow">
                Offert · Service gratuit
              </div>
              <h2 className="text-lg font-semibold text-white">Recevez 3 devis gratuits</h2>
              <p className="mt-1 text-sm text-slate-300">Entreprises certifiées Qualibat 1552 · Sans engagement</p>

              <CityLeadForm cityName={city.name} postalFallback={city.postalFallback} />
            </div>
          </div>
        </div>
      </section>

      <main className="bg-slate-950 text-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
            <article className="space-y-12">
              <section id="pourquoi" className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300">
                  Expertise locale
                </div>
                <h2 className="text-2xl font-semibold text-white">
                  Pourquoi faire appel à une entreprise de désamiantage à {city.name} ?
                </h2>
                <p>
                  {city.name} et sa métropole concentrent un parc immobilier construit avant 1997. Toitures fibrociment, flocages de parkings,
                  dalles vinyles ou réseaux techniques exigent une intervention par des professionnels certifiés Qualibat 1552.
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    { title: "Sécurité renforcée", desc: "Confinement adapté, SAS, contrôle d’empoussièrement, protections collectives." },
                    { title: "Conformité réglementaire", desc: "Plans SS3/SS4, déclaration DREETS/CARSAT, dossiers transmis aux administrations." },
                    { title: "Assurances dédiées", desc: "Responsabilité civile et décennale spécifiques amiante, attestations fournies." },
                    { title: "Traçabilité complète", desc: "BSD numériques, rapports photo, archivage du dossier dans un espace sécurisé." },
                  ].map(item => (
                    <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                      <p className="mt-2 text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 text-sm text-amber-100">
                  <strong className="text-amber-200">💡 Le saviez-vous ?</strong>
                  <p className="mt-2">
                    Un diagnostic amiante est obligatoire avant travaux sur tout bâtiment construit avant 1997. Nos partenaires peuvent missionner
                    un diagnostiqueur certifié en moins de 48h pour cartographier les matériaux à risque.
                  </p>
                </div>
              </section>

              <section id="prix" className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300">
                  Budgets indicatifs
                </div>
                <h2 className="text-2xl font-semibold text-white">Prix du désamiantage à {city.name}</h2>
                <p>
                  Le <Link href="/prix-desamiantage/">prix du désamiantage</Link> dépend du type de matériaux (friables ou non), de la surface, du confinement et de la
                  logistique (hauteur, accès, gestion des déchets). Les estimations ci-dessous permettent de situer votre budget avant devis.
                </p>

                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                  <table className="w-full text-sm">
                    <thead className="bg-white/10 text-xs uppercase tracking-wide text-slate-200">
                      <tr>
                        <th className="px-4 py-3 text-left">Type de prestation</th>
                        <th className="px-4 py-3 text-left">Prix au m²</th>
                        <th className="px-4 py-3 text-left">Prix indicatif</th>
                      </tr>
                    </thead>
                    <tbody>
                      {priceRows.map(row => (
                        <tr key={row.label} className="border-t border-white/5">
                          <td className="px-4 py-3 font-medium text-white">{row.label}</td>
                          <td className="px-4 py-3 text-slate-200">{row.range}</td>
                          <td className="px-4 py-3 text-slate-200">{row.forfait}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex flex-col gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-100 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <strong>💰 Besoin d’un devis détaillé ?</strong>
                    <p>Faites évaluer votre chantier par une entreprise certifiée et obtenez un phasage personnalisé.</p>
                  </div>
                  <a href="#hero-form" className="btn-secondary">
                    Comparer 3 devis gratuits
                  </a>
                </div>
              </section>

              <section id="quartiers" className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300">
                  Zones d’intervention
                </div>
                <h2 className="text-2xl font-semibold text-white">Quartiers et communes prioritaires autour de {city.name}</h2>
                <p>
                  Nos partenaires couvrent l’ensemble de l’agglomération : arrondissements historiques, quartiers tertiaires, zones
                  industrielles, copropriétés des années 1960–1980 ou pavillons périphériques.
                </p>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    { icon: "🏛️", title: "Centre historique", desc: "Immeubles anciens, conduits et planchers nécessitant des retraits délicats." },
                    { icon: "🏢", title: "Quartiers tertiaires", desc: "Faux-plafonds, planchers techniques et gaines HVAC en milieu occupé." },
                    { icon: "🏭", title: "Zones industrielles", desc: "Conduits calorifugés, bardages fibrociment, sas statiques & dynamiques." },
                    { icon: "🏘️", title: "Pavillons & copropriétés", desc: "Toitures fibrociment, garages, abris de jardin, dépendances." },
                    { icon: "🏗️", title: "Chantiers publics", desc: "Écoles, hôpitaux, ERP : coordination stricte et plan de retrait sur-mesure." },
                    { icon: "🚧", title: "Sites en reconversion", desc: "Friches industrielles, entrepôts, plateformes logistiques à assainir." },
                  ].map(item => (
                    <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-2xl">{item.icon}</div>
                      <h3 className="mt-3 text-sm font-semibold text-white">{item.title}</h3>
                      <p className="mt-2 text-sm text-slate-200">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section id="demarches" className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300">
                  Démarches réglementaires
                </div>
                <h2 className="text-2xl font-semibold text-white">Quelles étapes pour un chantier amiante à {city.name} ?</h2>
                <div className="grid gap-4 lg:grid-cols-3">
                  {steps.map(step => (
                    <div key={step.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <h3 className="text-sm font-semibold text-white">{step.title}</h3>
                      <p className="mt-2 text-sm text-slate-200">{step.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                    <h4 className="text-base font-semibold text-white">Documents obligatoires</h4>
                    <ul className="mt-3 space-y-2 text-slate-200">
                      <li>• Diagnostic amiante avant travaux (DAAT ou RAT)</li>
                      <li>• Déclaration de chantier (DREETS, CARSAT, inspection du travail)</li>
                      <li>• Plan de retrait / mode opératoire SS4 validé</li>
                      <li>• Consignes sécurité et notices de poste</li>
                      <li>• Bordereaux de suivi des déchets (BSD)</li>
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-100">
                    <h4 className="text-base font-semibold text-emerald-200">Contacts utiles</h4>
                    <p className="mt-3">
                      <strong>Mairie de {city.name}</strong> · service urbanisme & voirie (autorisations d’accès, stationnement, horaires)
                    </p>
                    <p className="mt-2">Inspection du travail · CARSAT · ARS · Préfecture · pour validation des plans de retrait.</p>
                    <p className="mt-2">Centres de traitement agréés · réservation des créneaux de dépôt déchets amiantés.</p>
                  </div>
                </div>
              </section>

              <section id="aides" className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300">
                  Aides & financements
                </div>
                <h2 className="text-2xl font-semibold text-white">Quelles aides pour financer vos travaux ?</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                    <h3 className="text-base font-semibold text-white">🏠 MaPrimeRénov&apos;</h3>
                    <p className="mt-2 text-slate-200">
                      Financement partiel du désamiantage lorsqu’il s’inscrit dans un bouquet de travaux énergétiques (isolation, chauffage).
                    </p>
                    <strong className="mt-3 block text-emerald-200">Jusqu&apos;à 75€/m² selon vos revenus</strong>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                    <h3 className="text-base font-semibold text-white">🏛️ ANAH & dispositifs locaux</h3>
                    <p className="mt-2 text-slate-200">
                      Subventions pour propriétaires occupants, bailleurs ou copropriétés visant la rénovation thermique ou la mise en sécurité.
                    </p>
                    <strong className="mt-3 block text-emerald-200">35% à 50% du montant HT</strong>
                    <Link href="/aides-financieres/" className="mt-2 inline-flex text-xs text-emerald-300 hover:text-emerald-200">
                      En savoir plus →
                    </Link>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm md:col-span-2">
                    <h3 className="text-base font-semibold text-white">💶 Éco-PTZ & prêts complémentaires</h3>
                    <p className="mt-2 text-slate-200">
                      Le prêt à taux zéro peut financer une partie du retrait amiante lorsqu’il s’inscrit dans une rénovation globale. Certaines banques
                      proposent également des prêts travaux à taux préférentiel.
                    </p>
                    <strong className="mt-3 block text-emerald-200">Jusqu&apos;à 50 000€ sans intérêt</strong>
                  </div>
                </div>
              </section>

              <section id="faq" className="space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300">
                  FAQ
                </div>
                <h2 className="text-2xl font-semibold text-white">Questions fréquentes sur le désamiantage à {city.name}</h2>
                <div className="space-y-4">
                  {faqItems.map(item => (
                    <details key={item.question} className="group rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-white">
                        {item.question}
                        <span className="text-xl transition-transform group-open:rotate-45">+</span>
                      </summary>
                      <p className="mt-3 text-slate-200">{item.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            </article>

            <aside className="space-y-6">
              <div className="sticky top-24 space-y-6">
                <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-sm text-emerald-100 shadow-lg shadow-emerald-500/10">
                  <h3 className="text-lg font-semibold text-emerald-200">💼 Besoin d&apos;un devis ?</h3>
                  <p className="mt-2">
                    Sélectionnez jusqu’à trois entreprises certifiées pour votre chantier à {city.name}. Devis gratuits, réponse sous 24h.
                  </p>
                  <a href="#hero-form" className="btn-cta mt-4 w-full justify-center">
                    Comparer les devis
                  </a>
                  <ul className="mt-4 space-y-2 text-xs">
                    <li>✓ Plans et BSD conformes</li>
                    <li>✓ Prestataires assurés</li>
                    <li>✓ Dossier numérique partagé</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                  <h4 className="text-base font-semibold text-white">Navigation rapide</h4>
                  <ul className="mt-3 space-y-2 text-sm">
                    {[
                      { href: "#pourquoi", label: `Pourquoi ${city.name} ?` },
                      { href: "#prix", label: "Prix & budgets" },
                      { href: "#quartiers", label: "Quartiers concernés" },
                      { href: "#demarches", label: "Démarches" },
                      { href: "#aides", label: "Aides financières" },
                      { href: "#faq", label: "FAQ" },
                    ].map(item => (
                      <li key={item.href}>
                        <a href={item.href} className="transition hover:text-emerald-300">
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                    <h4 className="font-semibold text-white">Vous pourriez aussi aimer</h4>
                    <ul className="mt-3 space-y-2 text-emerald-200">
                      <li>
                        <Link href="/prix-desamiantage/" className="transition hover:text-emerald-100">
                          💰 Prix du désamiantage
                        </Link>
                      </li>
                      <li>
                        <Link href="/types-desamiantage/toiture/" className="transition hover:text-emerald-100">
                          🏠 Désamiantage toiture
                        </Link>
                      </li>
                      <li>
                        <Link href="/entreprises-certifiees/" className="transition hover:text-emerald-100">
                          ✅ Entreprises certifiées
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                    <h4 className="font-semibold text-white">Villes voisines</h4>
                    <ul className="mt-3 space-y-2 text-emerald-200">
                      {otherCities.slice(0, 3).map(other => (
                        <li key={other.slug}>
                          <Link href={`/${other.slug}`} className="transition hover:text-emerald-100">
                            📍 {other.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <section className="bg-slate-950 py-14 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-5">
              <h2 className="text-3xl font-semibold">Prêt à sécuriser votre chantier à {city.name} ?</h2>
              <p className="text-lg text-slate-200">
                Décrivez votre projet : nous mobilisons l’entreprise la plus adaptée, organisons la visite technique et vous remettons un dossier
                complet (plans, BSD, attestations) dans un espace sécurisé.
              </p>
              <ul className="grid gap-3 text-sm text-slate-200 sm:grid-cols-2">
                {[
                  { title: "Diagnostic accéléré", detail: "Visite et prélèvements sous 48h." },
                  { title: "Plan validé", detail: "Déclaration DREETS & CARSAT prise en charge." },
                  { title: "Traçabilité numérique", detail: "BSD et rapports photo consolident votre dossier." },
                  { title: "Aides mobilisées", detail: "Accompagnement sur MaPrimeRénov’, ANAH, Éco-PTZ." },
                ].map(item => (
                  <li key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <strong className="text-white">{item.title}</strong>
                    <p className="text-sm text-slate-200">{item.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-200">
              <h3 className="text-lg font-semibold text-white">Pourquoi passer par notre réseau ?</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li>• Audit de votre besoin par un chef de projet spécialisé</li>
                <li>• Entreprises Qualibat 1552 auditées chaque année</li>
                <li>• Process documenté : plans, attestations, BSD, photos</li>
                <li>• Suivi en ligne et assistance administrative dédiée</li>
              </ul>
              <a href="#hero-form" className="btn-cta mt-6 w-full justify-center">
                Demander mes devis gratuits
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
