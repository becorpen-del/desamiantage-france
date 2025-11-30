/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
import Link from "next/link";

import { ContactForm } from "@/components/ContactForm";
import { createMetadata, getBreadcrumbJsonLd, getFaqJsonLd } from "@/lib/seo";
import { getBrandName } from "@/lib/utils";

import type { Metadata } from "next";

const brandName = getBrandName();
const pagePath = "/types-desamiantage/toiture";

const faqItems = [
  {
    question: "Quel prix pour désamianter une toiture ?",
    answer:
      "En 2025, le prix d'un désamiantage toiture complet varie généralement entre 40 et 80€/m² pour une configuration simple et peut monter à 200-500€/m² en cas d'accès complexe, de forte hauteur ou de plaques très dégradées. Sur 60m², cela représente un budget de 12 000 à 30 000€ tout compris (diagnostic, confinement, retrait, déchets et remise hors d'eau).",
  },
  {
    question: "Quelles aides pour un désamiantage de toiture ?",
    answer:
      "Les aides dépendent du profil. Les exploitants agricoles peuvent obtenir jusqu'à 30% (plafond 40€/m²) via des dispositifs régionaux. Les entreprises peuvent être aidées à hauteur de 20% sur certains programmes de prévention. Les particuliers peuvent mobiliser l'ANAH ou des aides locales quand le désamiantage est intégré à une rénovation énergétique.",
  },
  {
    question: "Est-il possible de retirer soi-même l'amiante d'une toiture ?",
    answer:
      "Non, la réglementation impose des entreprises certifiées (Qualibat 1552) pour les retraits de matériaux amiantés. Le retrait amateur est fortement déconseillé pour des raisons sanitaires, juridiques et d'assurance. Les sanctions peuvent inclure l'arrêt du chantier, des amendes et l'absence de prise en charge en cas de sinistre.",
  },
  {
    question: "Quel est le prix d'un désamiantage de toit selon la technique ?",
    answer:
      "Le retrait complet est le plus courant (40-80€/m²). Un encapsulage ponctuel peut être envisagé si l'état des plaques le permet, mais il reste exceptionnel sur les toitures fibrociment. Les confinements lourds (bâchage complet, nacelles) font grimper le coût vers 200-500€/m².",
  },
  {
    question: "Quelle est la durée de vie d'une toiture en amiante ?",
    answer:
      "La durée de vie théorique est d'environ 30 ans, mais de nombreuses toitures en fibrociment dépassent 50 ans. Avec le temps, les plaques se microfissurent et libèrent plus facilement des fibres, ce qui justifie un diagnostic régulier et un retrait dès que l'état de dégradation est constaté.",
  },
  {
    question: "Est-il possible de bénéficier d'un désamiantage gratuit ?",
    answer:
      "Oui, dans des cas très spécifiques : surfaces supérieures à 1000m² en fibrociment et projet de centrale solaire ou d'isolation industrielle. Les opérateurs photovoltaïques prennent parfois en charge le retrait pour poser leur centrale, mais l'éligibilité reste limitée et les conditions contractuelles doivent être étudiées.",
  },
];

const breadcrumbLd = getBreadcrumbJsonLd([
  { name: "Accueil", path: "/" },
  { name: "Types de désamiantage", path: "/types-desamiantage" },
  { name: "Toiture", path: pagePath },
]);

const faqLd = getFaqJsonLd(faqItems);

export const metadata: Metadata = createMetadata({
  title: "Désamiantage Toiture : Prix, Aides & Devis Gratuit 2025",
  description:
    "Prix désamiantage toiture : 40-80€/m². Comparez 3 devis gratuits d'entreprises certifiées. Aides ANAH jusqu'à 40€/m². Guide complet 2025.",
  path: pagePath,
  openGraphType: "article",
});

const toc = [
  { id: "pourquoi", label: "Pourquoi le désamiantage est obligatoire ?" },
  { id: "prix", label: "Prix du désamiantage de toiture" },
  { id: "fibrociment", label: "Cas des toitures fibrociment" },
  { id: "techniques", label: "Techniques de désamiantage" },
  { id: "aides", label: "Aides financières" },
  { id: "entreprises", label: "Choisir son entreprise" },
  { id: "etapes", label: "Étapes d'un chantier" },
  { id: "diy", label: "Pourquoi éviter de le faire soi-même" },
  { id: "vente", label: "Vendre ou louer avec amiante" },
  { id: "alternatives", label: "Alternatives et surtoiture" },
  { id: "faq", label: "FAQ complète" },
];

const illustrationSvg = encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='360' viewBox='0 0 600 360' fill='none'>
    <defs>
      <linearGradient id='g' x1='0' y1='0' x2='600' y2='360' gradientUnits='userSpaceOnUse'>
        <stop stop-color='#0f172a'/>
        <stop offset='1' stop-color='#10b981'/>
      </linearGradient>
    </defs>
    <rect width='600' height='360' rx='28' fill='url(#g)'/>
    <path d='M60 240 L180 140 L300 220 L420 130 L540 210' stroke='#ffffff' stroke-width='12' stroke-linecap='round' stroke-linejoin='round'/>
    <path d='M60 240 L60 310 L540 310 L540 210' stroke='#a7f3d0' stroke-width='8' stroke-linecap='round' stroke-linejoin='round'/>
    <circle cx='180' cy='140' r='12' fill='#10b981'/>
    <circle cx='420' cy='130' r='12' fill='#10b981'/>
    <text x='80' y='280' fill='#e2e8f0' font-family='Inter,Arial,sans-serif' font-size='26'>Désamiantage toiture sécurisé</text>
  </svg>`
);

function PriceTable() {
  const rows = [
    {
      type: "Toiture fibrociment simple (pente faible)",
      price: "40 à 80€/m²",
      total: "4 000 à 8 000€ pour 100 m²",
    },
    {
      type: "Toiture amiantée complexe (hauteur, nacelle, fragilisation)",
      price: "200 à 500€/m²",
      total: "12 000 à 30 000€ pour 60 m²",
    },
    {
      type: "Encapsulage / confinement provisoire",
      price: "25 à 45€/m²",
      total: "Intervention limitée, études spécifiques",
    },
    {
      type: "Evacuation et traitement des déchets",
      price: "250 à 350€/tonne",
      total: "Incluse dans la plupart des devis toiture",
    },
  ];

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
      <table className="w-full text-sm text-slate-200">
        <thead className="bg-white/5 text-xs uppercase tracking-wide text-emerald-200">
          <tr>
            <th className="px-4 py-3 text-left">Type de prestation</th>
            <th className="px-4 py-3 text-left">Prix au m²</th>
            <th className="px-4 py-3 text-left">Budget indicatif</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.type} className="border-t border-white/5">
              <td className="px-4 py-3 font-semibold text-white">{row.type}</td>
              <td className="px-4 py-3">{row.price}</td>
              <td className="px-4 py-3">{row.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DevisExamples() {
  const items = [
    {
      surface: "60 m²",
      detail:
        "Toiture fibrociment sur garage, pente faible, accès direct. Confinement périphérique, dépose manuelle, palettisation, transport ADR et remise hors d'eau provisoire.",
      budget: "12 000 à 30 000€ TTC",
      delai: "5 à 7 jours",
    },
    {
      surface: "100 m²",
      detail:
        "Maison individuelle, couverture ondulée, présence de lucarnes. Ligne de vie, nacelle ponctuelle, filmage sous charpente, remise en place d'une sous-toiture avant pose neuve.",
      budget: "18 000 à 32 000€ TTC",
      delai: "7 à 10 jours",
    },
    {
      surface: "200 m²",
      detail:
        "Petit bâtiment industriel, plaques vieillissantes, zone partiellement occupée. Confinement statique, phasage par zones, benne dédiée, contrôle d'empoussièrement final.",
      budget: "32 000 à 70 000€ HT",
      delai: "10 à 15 jours",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map(item => (
        <div key={item.surface} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
          <div className="flex items-baseline justify-between text-white">
            <h4 className="text-base font-semibold">Exemple {item.surface}</h4>
            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-200">Devis</span>
          </div>
          <p className="mt-3 text-slate-200">{item.detail}</p>
          <p className="mt-3 text-emerald-200 font-semibold">{item.budget}</p>
          <p className="mt-1 text-xs text-slate-300">Durée estimée : {item.delai}</p>
        </div>
      ))}
    </div>
  );
}

const aids = [
  {
    title: "Aide ANAH pour particuliers",
    content:
      "Pour les propriétaires occupants ou bailleurs, l'ANAH peut financer une partie du désamiantage toiture quand il est inclus dans une rénovation énergétique. Les montants varient selon les ressources et la performance énergétique visée.",
    amount: "Jusqu'à 35-50% du montant HT, plafond 40€/m² dans certains territoires.",
  },
  {
    title: "Aides régionales et départementales",
    content:
      "Plusieurs régions et départements soutiennent le retrait d'amiante sur les bâtiments agricoles ou artisanaux. Les exploitants peuvent obtenir environ 30% d'aide avec un plafond par m², souvent conditionné à la mise en place d'une nouvelle couverture isolée.",
    amount: "30% du coût, plafond 40€/m² pour les exploitants agricoles.",
  },
  {
    title: "Crédit d'impôt et TVA réduite",
    content:
      "En 2025, la TVA à taux réduit peut s'appliquer lorsque le désamiantage s'intègre à des travaux de rénovation énergétique. Les entreprises peuvent amortir l'investissement et passer les travaux en charges déductibles.",
    amount: "TVA réduite à 10% sur certains lots, cumulable avec un éco-PTZ pour la partie rénovation.",
  },
  {
    title: "Désamiantage gratuit : cas spécifiques",
    content:
      "Certains développeurs photovoltaïques prennent en charge le retrait complet des toitures en fibrociment supérieures à 1000 m² pour installer une centrale solaire. Cette gratuité est contractuelle et nécessite de sécuriser la propriété des certificats et du BSD.",
    amount: "Gratuité possible si >1000 m² et projet solaire ; vérifier les clauses de propriété et de garanties.",
  },
];

const prosCons = [
  {
    title: "Avantages du retrait complet",
    points: [
      "Suppression définitive du risque amiante et conformité immédiate aux contrôles DREAL ou inspection du travail.",
      "Possibilité de poser une nouvelle couverture performante (étanchéité, isolation, panneaux solaires).",
      "Valorisation immobilière sans décote liée à l'amiante et meilleur accès aux assurances.",
    ],
  },
  {
    title: "Limites de l'encapsulage",
    points: [
      "Solution transitoire seulement si les plaques sont saines ; inefficace sur fibrociment poreux ou fissuré.",
      "Toujours soumis au suivi du DTA avec contrôles réguliers et risque de retrait différé.",
      "Peut compliquer un futur démontage et alourdir le coût final de traitement des déchets.",
    ],
  },
];

const techniques = [
  {
    title: "Retrait complet de la toiture",
    body:
      "C'est la technique la plus répandue pour le désamiantage toiture. Elle consiste à déposer intégralement les plaques amiantées, les faîtages et accessoires, puis à conditionner les déchets sous film PE homologué avant transport ADR vers un centre agréé. Le coût se situe entre 40 et 80€/m² en configuration simple, et peut atteindre 200-500€/m² en cas d'accès par nacelle, de pente forte ou de charpente fragilisée. La remise hors d'eau provisoire est incluse pour sécuriser le bâtiment avant la nouvelle couverture.",
  },
  {
    title: "Encapsulage de l'amiante",
    body:
      "L'encapsulage consiste à appliquer un revêtement spécifique sur les plaques pour bloquer la diffusion des fibres. Il reste marginal sur les toitures fibrociment parce que l'exposition aux intempéries et aux UV accélère les dégradations. Cette solution peut être envisagée pour temporiser quelques mois dans le cadre d'un projet de rénovation globale, mais elle n'exonère pas du suivi du DTA ni des obligations de retrait lors d'une revente ou de travaux lourds.",
  },
  {
    title: "Confinement et isolation",
    body:
      "Le confinement dynamique (bâchage complet, dépression) est utilisé sur les chantiers sensibles ou en site occupé. Il sécurise les riverains et les équipes en évitant toute dispersion de fibres. Cette technique augmente les coûts (jusqu'à 200-500€/m²) mais devient obligatoire dès que l'empoussièrement potentiel est élevé ou que des tiers circulent sous la zone d'intervention.",
  },
];

const ctaButtons = [
  { label: "Obtenez 3 devis gratuits d'entreprises certifiées", anchor: "#cta-form" },
  { label: "Calculez vos aides et subventions en 2 minutes", anchor: "#cta-aides" },
  { label: "Trouvez une entreprise qualifiée près de chez vous", anchor: "#cta-form" },
  { label: "Comparez les tarifs dans votre région", anchor: "#cta-form" },
];

function Illustration({ alt, caption }: { alt: string; caption: string }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <img src={`data:image/svg+xml,${illustrationSvg}`} alt={alt} className="h-full w-full object-cover" />
      <figcaption className="px-3 py-2 text-xs text-slate-300">{caption}</figcaption>
    </figure>
  );
}

export default function DesamiantageToiturePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {faqLd ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} /> : null}

      <header className="border-b border-white/5 bg-slate-950 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1 space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
              Mise à jour mars 2025 · {brandName}
            </span>
            <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
              Désamiantage de Toiture : Prix, Aides et Entreprises Certifiées [2025]
            </h1>
            <p className="text-lg text-slate-200">
              Le désamiantage toiture garantit la sécurité des occupants, évite les décotes immobilières et respecte la réglementation. Ce guide
              détaille les prix, aides, techniques et démarches pour confier votre chantier à une entreprise certifiée Qualibat 1552 en 2025.
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-slate-200">
              <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-emerald-200">Mot-clé : désamiantage toiture</span>
              <span className="rounded-full bg-white/10 px-3 py-1">40-80€/m² (standard)</span>
              <span className="rounded-full bg-white/10 px-3 py-1">200-500€/m² (complexe)</span>
              <span className="rounded-full bg-white/10 px-3 py-1">Certifications Qualibat 1552 · RGE</span>
            </div>
          </div>
          <figure className="w-full max-w-xl shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            <img
              src={`data:image/svg+xml,${illustrationSvg}`}
              alt="Schéma de désamiantage toiture sécurisé avec confinement"
              className="h-full w-full object-cover"
            />
            <figcaption className="px-4 py-3 text-sm text-slate-200">
              Désamiantage toiture : confinement, retrait contrôlé et traçabilité BSD.
            </figcaption>
          </figure>
        </div>
      </header>

      <nav className="bg-slate-900 text-sm text-slate-200">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-white">Sommaire cliquable</p>
            <span className="text-xs text-emerald-200">Guide 2025 · 3500+ mots</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {toc.map(item => (
              <a key={item.id} href={`#${item.id}`} className="group flex items-center gap-2 rounded-2xl border border-white/5 bg-white/5 px-4 py-3 transition hover:-translate-y-0.5 hover:border-emerald-300/40 hover:bg-emerald-500/5">
                <span className="text-emerald-200">•</span>
                <span className="text-slate-200 group-hover:text-white">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main className="bg-slate-950 text-slate-200">
        <div className="mx-auto max-w-6xl space-y-16 px-6 py-12">
          <section id="pourquoi" className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Pourquoi le désamiantage de toiture est-il obligatoire ?</h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <article className="rounded-3xl border border-white/10 bg-white/5 p-5 lg:col-span-2">
                <h3 className="text-xl font-semibold text-white">Les risques sanitaires de l'amiante dans les toitures</h3>
                <p className="mt-3">
                  Les plaques fibrociment ou ardoises artificielles contiennent des fibres d'amiante qui se libèrent sous l'effet des
                  intempéries, des perforations ou des vibrations. Une toiture ancienne (&gt;30 ans) peut se microfissurer et générer des fibres
                  respirables. L'inhalation provoque mésothéliome, cancer bronchopulmonaire ou asbestose, ce qui rend indispensable un
                  désamiantage toiture encadré par des professionnels formés SS3/SS4.
                </p>
                <p className="mt-3">
                  Le Code du travail (décret 2012-639) impose la protection des travailleurs et des riverains. Des mesures d'empoussièrement
                  sont réalisées avant et après les travaux pour vérifier que le seuil réglementaire est respecté. Plus la toiture vieillit,
                  plus la diffusion de fibres augmente, d'où l'intérêt d'une intervention avant dégradation sévère.
                </p>
                <h3 className="mt-6 text-xl font-semibold text-white">Réglementation en vigueur en 2025</h3>
                <p className="mt-3">
                  En 2025, tout retrait d'amiante friable ou non friable est soumis à des entreprises certifiées (Qualibat 1552) avec plans de
                  retrait validés, protections collectives et suivi des déchets via BSD. La réglementation distingue les travaux de sous-section
                  3 (retrait) et sous-section 4 (entretien/maintenance) mais impose dans les deux cas des équipements de protection, une
                  formation et une traçabilité documentaire dans le Dossier Technique Amiante (DTA).
                </p>
                <h3 className="mt-6 text-xl font-semibold text-white">Quand faut-il désamianter sa toiture ?</h3>
                <p className="mt-3">
                  Trois situations déclenchent un désamiantage toiture : un diagnostic révélant un état dégradé, un projet de rénovation
                  énergétique (isolation, panneaux solaires) ou une vente qui met en évidence une non-conformité dans le DTA. Dès que les
                  plaques présentent des fissures, que des mousses fragilisent la surface ou que des infiltrations apparaissent, le retrait
                  complet devient la solution la plus sûre.
                </p>
                <p className="mt-3">
                  Un contrôle visuel annuel et une mesure d'empoussièrement ponctuelle permettent d'anticiper. Attendre une dégradation avancée
                  entraîne des coûts plus élevés (200-500€/m²) car le confinement devient plus lourd et la manipulation plus délicate.
                </p>
              </article>
              <aside className="space-y-4 rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-5 text-sm text-emerald-100">
                <p className="font-semibold text-emerald-200">Points clés</p>
                <ul className="space-y-2 text-sm">
                  <li>• Taux d'empoussièrement contrôlé avant/après travaux.</li>
                  <li>• Obligation d'entreprise certifiée Qualibat 1552.</li>
                  <li>• Inscription des interventions au DTA et BSD numériques.</li>
                  <li>• Durée de vie d'une toiture amiante : 30-50 ans, avec hausse du risque après 25 ans.</li>
                </ul>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-200">
                  <p className="text-xs uppercase tracking-wide text-emerald-200">CTA</p>
                  <p className="mt-2 text-sm">Vous avez un doute sur l'état de votre couverture ?</p>
                  <a href="#cta-form" className="btn-cta mt-3 w-full justify-center">
                    Programmer un diagnostic toiture
                  </a>
                </div>
              </aside>
            </div>
          </section>

          <section id="prix" className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Prix du désamiantage de toiture au m²</h2>
            <p>
              Le prix d'un désamiantage toiture dépend de la surface, de l'accessibilité, du type de fibrociment et de l'état de dégradation.
              En 2025, la fourchette standard se situe entre 40 et 80€/m², tandis que les chantiers complexes (forte pente, nacelle, hauteur,
              plaques cassantes) évoluent entre 200 et 500€/m². Cette variation inclut la mise en sécurité, le confinement, la dépose,
              l'évacuation et la remise hors d'eau.
            </p>
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 lg:col-span-2">
                <h3 className="text-xl font-semibold text-white">Fourchette de prix détaillée</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <h4 className="text-sm font-semibold text-emerald-200">Prix moyen : 40 à 80€/m²</h4>
                    <p className="mt-2 text-sm">
                      Toiture simple, accès par échafaudage, plaques peu dégradées. Le coût inclut la protection collective, la dépose, le
                      conditionnement et le transport vers un centre agréé.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <h4 className="text-sm font-semibold text-emerald-200">Prix élevé : 200 à 500€/m²</h4>
                    <p className="mt-2 text-sm">
                      Cas complexes : toiture fragile, travail en hauteur, confinement dynamique, nacelles multiples ou phasage en site occupé.
                      La logistique et les EPI/EPC renforcés expliquent le surcoût.
                    </p>
                  </div>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">Facteurs qui influencent le coût</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>• Type de matériau amianté : fibrociment ondulé, ardoise artificielle, plaques planes.</li>
                  <li>• Surface et accessibilité : pente, hauteur, recours à nacelles ou filets anti-chute.</li>
                  <li>• État de dégradation : plaques poreuses ou cassantes nécessitent plus de protections.</li>
                  <li>• Évacuation et traitement des déchets : distance au centre, frais de bennes, BSD.</li>
                </ul>
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-white">Exemple de devis pour 60m², 100m² et 200m²</h3>
                  <DevisExamples />
                </div>
                <div className="mt-6">
                  <PriceTable />
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <Illustration
                    alt="Tableau comparatif des prix de désamiantage toiture 2025"
                    caption="Comparatif prix désamiantage toiture : standard, complexe, encapsulage et déchets."
                  />
                  <Illustration
                    alt="Chantier de désamiantage toiture fibrociment en sécurité"
                    caption="Sécurisation, ligne de vie et palettisation des plaques fibrociment avant transport ADR."
                  />
                </div>
              </div>
              <aside className="space-y-5 rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-5 text-sm text-emerald-100">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-200">
                  <p className="text-xs uppercase tracking-wide text-emerald-200">Action</p>
                  <p className="mt-2">Obtenez 3 devis gratuits d'entreprises certifiées.</p>
                  <a href="#cta-form" className="btn-cta mt-3 w-full justify-center">
                    Comparer les tarifs toiture
                  </a>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-200">
                  <p className="text-xs uppercase tracking-wide text-emerald-200">Liens utiles</p>
                  <ul className="mt-2 space-y-2">
                    <li>
                      <Link href="/prix-desamiantage/" className="text-emerald-200 hover:text-emerald-100">
                        Découvrez tous nos prix de désamiantage
                      </Link>
                    </li>
                  </ul>
                </div>
              </aside>
            </div>
            <div className="rounded-3xl border border-emerald-500/25 bg-emerald-500/10 p-5 text-sm text-emerald-100">
              <strong className="text-emerald-200">💡 Après le prix</strong>
              <p className="mt-2">
                Un conseiller {brandName} peut affiner le chiffrage selon votre charpente et le projet de réfection. Joignez vos photos,
                l'année de construction et la surface estimée pour réduire le délai de réponse.
              </p>
              <a href="#cta-form" className="btn-secondary mt-3 inline-flex">
                Obtenez 3 devis gratuits d'entreprises certifiées
              </a>
            </div>
          </section>

          <section id="fibrociment" className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Désamiantage de toiture en fibrociment : particularités</h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <article className="rounded-3xl border border-white/10 bg-white/5 p-5 lg:col-span-2">
                <h3 className="text-xl font-semibold text-white">Reconnaître une toiture en fibro-ciment amianté</h3>
                <p className="mt-3">
                  Les plaques ondulées gris clair, poreuses, avec des mousses incrustées sont typiques du fibrociment amianté des années 1970-1997.
                  Les ardoises artificielles posées en losange ou en écaille peuvent également contenir de l'amiante. Le diagnostic amiante est
                  la seule confirmation fiable, complété par des prélèvements analysés en laboratoire accrédité COFRAC.
                </p>
                <h3 className="mt-6 text-xl font-semibold text-white">Étapes spécifiques du désamiantage fibrociment</h3>
                <p className="mt-3">
                  Le désamiantage toiture fibrociment prévoit l'arrosage des plaques pour limiter la poussière, la dépose méthodique avec
                  palettisation, puis un filmage serré avant l'étiquetage ADR. Les équipes installent lignes de vie, filets de sécurité et
                  échafaudages roulants pour travailler en sécurité. Les déchets sont acheminés vers un centre agréé, et le BSD est remis au
                  propriétaire.
                </p>
                <h3 className="mt-6 text-xl font-semibold text-white">Coût désamiantage toiture fibro ciment</h3>
                <p className="mt-3">
                  Comptez 40-80€/m² pour une toiture fibrociment simple, et jusqu'à 200-500€/m² lorsque les plaques sont cassantes ou que le
                  site est en coactivité. La présence d'aménagements (panneaux solaires, cheminées multiples, sheds) allonge le temps de
                  dépose et augmente les coûts. Un phasage peut être proposé pour étaler le budget tout en sécurisant la structure.
                </p>
              </article>
              <aside className="space-y-4 rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-5 text-sm text-emerald-100">
                <p className="font-semibold text-emerald-200">Focus fibrociment</p>
                <ul className="space-y-2 text-sm">
                  <li>• Empoussièrement généralement faible mais contrôlé.</li>
                  <li>• Dépose en plaques entières pour limiter les casse.</li>
                  <li>• Filmage et palettisation pour optimiser le transport.</li>
                  <li>• Recouvrement possible si plaques intactes, à valider par un diagnostiqueur.</li>
                </ul>
                <Link href="/desamiantage-fibrociment/" className="inline-flex text-emerald-200 hover:text-emerald-100">
                  En savoir plus sur le fibrociment →
                </Link>
              </aside>
            </div>
          </section>

          <section id="techniques" className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Les différentes techniques de désamiantage</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {techniques.map(item => (
                <article key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm">{item.body}</p>
                </article>
              ))}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Illustration
                alt="Confinement et encapsulage lors d'un désamiantage toiture"
                caption="Choix de la technique : retrait complet, encapsulage ou confinement dynamique selon l'empoussièrement."
              />
              <Illustration
                alt="Contrôle d'empoussièrement après désamiantage de toiture"
                caption="Mesure d'empoussièrement et contrôle visuel avant restitution et remise hors d'eau."
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {prosCons.map(block => (
                <div key={block.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <h4 className="text-base font-semibold text-white">{block.title}</h4>
                  <ul className="mt-2 space-y-2 text-sm">
                    {block.points.map(point => (
                      <li key={point}>• {point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section id="aides" className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Aides financières pour le désamiantage de toiture</h2>
            <p>
              Plusieurs dispositifs peuvent diminuer le coût du désamiantage toiture : aides publiques (ANAH), subventions régionales, TVA
              réduite, prêts à taux zéro ou programmes spécifiques pour les grandes surfaces agricoles. Ces aides sont conditionnées à
              l'intervention d'une entreprise certifiée et à la production des justificatifs (devis, factures, BSD, attestations RGE).
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {aids.map(aid => (
                <article key={aid.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <h3 className="text-lg font-semibold text-white">{aid.title}</h3>
                  <p className="mt-2 text-sm text-slate-200">{aid.content}</p>
                  <p className="mt-2 text-sm font-semibold text-emerald-200">{aid.amount}</p>
                </article>
              ))}
            </div>
            <div id="cta-aides" className="rounded-3xl border border-emerald-500/25 bg-emerald-500/10 p-5 text-sm text-emerald-100">
              <p className="font-semibold text-emerald-200">Calculez vos aides et subventions en 2 minutes</p>
              <p className="mt-2 text-slate-100">
                Nous vérifions votre éligibilité aux aides ANAH, dispositifs locaux et programmes agricoles avant d'envoyer vos devis.
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                <a href="#cta-form" className="btn-cta justify-center">
                  Calculez vos aides
                </a>
              </div>
            </div>
          </section>

          <section id="entreprises" className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Comment choisir son entreprise de désamiantage ?</h2>
            <p>
              Une entreprise de désamiantage toiture doit disposer de la certification Qualibat 1552, de la mention RGE pour les travaux de
              rénovation énergétique associés et d'assurances dédiées (RC pro, décennale avec extension amiante). Le choix se fait aussi sur
              la capacité à gérer la logistique (échafaudages, nacelles, benne fermée) et à livrer un dossier documentaire complet.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-lg font-semibold text-white">Certifications obligatoires</h3>
                <ul className="mt-2 space-y-2 text-sm">
                  <li>• Qualibat 1552 (retrait amiante) et habilitation SS3/SS4.</li>
                  <li>• Mention RGE lorsque le désamiantage s'intègre à une rénovation énergétique.</li>
                  <li>• Formation des opérateurs et FDES à jour.</li>
                </ul>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-lg font-semibold text-white">Critères de sélection</h3>
                <ul className="mt-2 space-y-2 text-sm">
                  <li>• Références récentes en désamiantage toiture similaire au vôtre.</li>
                  <li>• Détails du plan de retrait, protections collectives et mesures d'empoussièrement.</li>
                  <li>• Délais réalistes et gestion des imprévus météo.</li>
                </ul>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-lg font-semibold text-white">Questions à poser avant de signer</h3>
                <ul className="mt-2 space-y-2 text-sm">
                  <li>• Quel dispositif de confinement est prévu et quelles assurances couvrent le chantier ?</li>
                  <li>• Comment seront conditionnés les déchets et quels centres agréés les recevront ?</li>
                  <li>• Quel est le phasage si la toiture doit rester partiellement étanche chaque soir ?</li>
                </ul>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-lg font-semibold text-white">Vérifier les assurances et garanties</h3>
                <p className="mt-2 text-sm">
                  Demandez les attestations RC pro et décennale incluant le lot amiante, ainsi que la procédure de déclaration de sinistre.
                  Vérifiez que le BSD et le rapport fin de chantier sont fournis systématiquement.
                </p>
                <Link href="/entreprises-certifiees/" className="mt-3 inline-flex text-emerald-200 hover:text-emerald-100">
                  Consultez la liste des entreprises certifiées
                </Link>
              </article>
            </div>
            <div className="rounded-3xl border border-emerald-500/25 bg-emerald-500/10 p-5 text-sm text-emerald-100">
              <p className="font-semibold text-emerald-200">Trouvez une entreprise qualifiée près de chez vous</p>
              <p className="mt-2 text-slate-100">
                {brandName} présélectionne des entreprises certifiées, vérifie leurs assurances et coordonne la réponse à votre cahier des
                charges. Un chef de projet suit votre dossier jusqu'au BSD final.
              </p>
              <a href="#cta-form" className="btn-cta mt-3 inline-flex">
                Trouver mon entreprise certifiée
              </a>
            </div>
          </section>

          <section id="etapes" className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Étapes d'un chantier de désamiantage de toiture</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Diagnostic amiante préalable obligatoire",
                  text:
                    "Un repérage amiante avant travaux (RAT) ou un diagnostic destructif est réalisé pour identifier les matériaux amiantés. Les prélèvements sont analysés par un laboratoire accrédité et intégrés au DTA.",
                },
                {
                  title: "Plan de retrait et mise en sécurité",
                  text:
                    "L'entreprise rédige un plan de retrait (SS3) détaillant confinements, EPI/EPC, phasage et mesures d'empoussièrement. Il est transmis à la DREETS et à la CARSAT, avec déclaration en mairie si la voirie est impactée.",
                },
                {
                  title: "Dépose des matériaux amiantés",
                  text:
                    "Les plaques sont humidifiées, démontées, palettisées et filmées. Les équipes travaillent sous protection respiratoire, avec lignes de vie, filets ou nacelles selon la pente.",
                },
                {
                  title: "Conditionnement et évacuation",
                  text:
                    "Les déchets sont étiquetés, chargés dans des bennes ou camions ADR et tracés via BSD jusqu'au centre de traitement agréé. Un certificat de dépôt est remis.",
                },
                {
                  title: "Contrôle final et certificat",
                  text:
                    "Après nettoyage de la zone, une mesure d'empoussièrement et un contrôle visuel sont effectués. Le chantier est réceptionné avec un rapport complet (plans, photos, BSD, attestations).",
                },
              ].map(step => (
                <article key={step.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm">{step.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="diy" className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Peut-on désamianter soi-même sa toiture ?</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-lg font-semibold text-white">Pourquoi c'est fortement déconseillé</h3>
                <p className="mt-2 text-sm">
                  Le retrait amateur expose à des fibres d'amiante et engage la responsabilité pénale en cas de contamination. Sans
                  certification, les assurances refusent de couvrir un sinistre lié à l'amiante. Les sanctions peuvent inclure l'arrêt de
                  chantier et des amendes.
                </p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-lg font-semibold text-white">Risques juridiques et sanitaires</h3>
                <p className="mt-2 text-sm">
                  Les fibres invisibles se déposent dans les poumons et restent nocives des années plus tard. Les riverains et occupants sont
                  exposés en cas de dispersion. Le Code du travail impose des équipements et une traçabilité que seuls les professionnels
                  maîtrisent.
                </p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-lg font-semibold text-white">Équipement professionnel nécessaire</h3>
                <p className="mt-2 text-sm">
                  Confinement, extracteurs d'air, SAS, EPI respiratoires, lignes de vie, conditionnement ADR : autant d'équipements coûteux et
                  réglementés. Le recours à une entreprise certifiée reste la seule solution sécurisée.
                </p>
              </article>
            </div>
          </section>

          <section id="vente" className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Vendre ou louer avec une toiture amiantée</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-lg font-semibold text-white">Peut-on vendre une maison avec un toit en amiante ?</h3>
                <p className="mt-2 text-sm">
                  Oui, mais l'acquéreur peut négocier une décote importante ou exiger un retrait avant signature. Le DTA et le diagnostic
                  doivent mentionner la présence d'amiante. Un devis de désamiantage toiture joint au dossier rassure et cadre la négociation.
                </p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-lg font-semibold text-white">Décote immobilière liée à l'amiante</h3>
                <p className="mt-2 text-sm">
                  La décote peut atteindre 10 à 20% pour une maison individuelle. Présenter des devis précis (prix désamiantage toiture m²,
                  coût global, planning) réduit l'incertitude et limite la baisse de prix.
                </p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-lg font-semibold text-white">Obligations légales du vendeur</h3>
                <p className="mt-2 text-sm">
                  Le vendeur doit fournir un DTA à jour, signaler les matériaux amiantés et transmettre les éventuels BSD si des retraits
                  partiels ont été faits. Toute dissimulation engage sa responsabilité.
                </p>
              </article>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Illustration
                alt="Dossier Technique Amiante et BSD pour une toiture avant vente"
                caption="Le DTA, les mesures d'empoussièrement et les BSD sécurisent la transaction immobilière."
              />
              <Illustration
                alt="Comparaison des devis de désamiantage toiture avant signature"
                caption="Joindre des devis détaillés (prix désamiantage toiture m², planning, garanties) réduit la décote à la vente."
              />
            </div>
          </section>

          <section id="alternatives" className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Alternatives au désamiantage complet</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-lg font-semibold text-white">Recouvrement de toiture amiantée</h3>
                <p className="mt-2 text-sm">
                  Le recouvrement (surtoiture) peut être envisagé quand les plaques sont intactes et que le diagnostic confirme un bon état.
                  Il reste soumis à des calculs de charge et à l'accord des autorités. Il ne supprime pas l'amiante et maintient l'obligation
                  de suivi dans le DTA.
                </p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-lg font-semibold text-white">Quand privilégier la surtoiture ?</h3>
                <p className="mt-2 text-sm">
                  Elle est pertinente pour sécuriser rapidement une grande surface en attendant un projet de retrait complet ou lorsqu'un
                  calendrier industriel impose une solution transitoire. Les coûts peuvent être proches d'un retrait, surtout avec la hausse
                  des matériaux.
                </p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-lg font-semibold text-white">Limites et réglementation</h3>
                <p className="mt-2 text-sm">
                  La surtoiture peut compliquer un futur démontage et n'est pas acceptée partout. Elle nécessite une étude structurelle et une
                  validation de la mairie. Le retrait complet reste la solution privilégiée pour éliminer le risque sanitaire.
                </p>
              </article>
            </div>
          </section>

          <section id="faq" className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Questions fréquentes (FAQ)</h2>
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

          <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-white">Comparez les tarifs dans votre région</h3>
                <p>
                  Un chef de projet {brandName} qualifie votre besoin, contacte les entreprises certifiées les plus proches et orchestre la
                  logistique (échafaudages, créneau déchetterie, contrôle final). Vous recevez jusqu'à 3 devis détaillés et comparables.
                </p>
                <div className="flex flex-wrap gap-3">
                  {ctaButtons.map(btn => (
                    <a key={btn.label} href={btn.anchor} className="btn-cta">
                      {btn.label}
                    </a>
                  ))}
                </div>
                <p className="text-sm text-slate-300">
                  ✓ Gratuit · ✓ Sans engagement · ✓ Entreprises Qualibat 1552 · ✓ BSD et dossier numérique fournis
                </p>
              </div>
              <div id="cta-form" className="rounded-3xl border border-white/10 bg-slate-900 p-5 shadow-lg shadow-emerald-500/10">
                <ContactForm />
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
