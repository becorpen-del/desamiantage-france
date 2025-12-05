import Link from "next/link";

import { createMetadata, getBreadcrumbJsonLd, getFaqJsonLd } from "@/lib/seo";

import type { Metadata } from "next";

const pagePath = "/diagnostic-amiante";

export const metadata: Metadata = createMetadata({
  title: "Diagnostic Amiante : Prix, Obligations & Démarches [2024]",
  description:
    "Tout savoir sur le diagnostic amiante obligatoire : prix moyens (90-600€), réglementation, types de diagnostics. Obtenez 3 devis gratuits de diagnostiqueurs certifiés.",
  path: pagePath,
  openGraphType: "article",
});

const breadcrumbLd = getBreadcrumbJsonLd([
  { name: "Accueil", path: "/" },
  { name: "Diagnostic amiante", path: pagePath },
]);

const faqItems = [
  {
    question: "Le diagnostic amiante est-il obligatoire pour une location ?",
    answer:
      "Il n’est pas systématiquement exigé pour une location, mais peut être demandé dans certaines situations. Il reste obligatoire avant travaux et pour une vente de tout bien dont le permis de construire est antérieur au 1er juillet 1997.",
  },
  {
    question: "Quelle est la durée de validité d’un diagnostic amiante ?",
    answer:
      "Si le rapport est négatif, sa validité est illimitée tant que le bâtiment n’est pas modifié. En cas de présence d’amiante, la durée de validité est de 3 ans pour un diagnostic avant vente.",
  },
  {
    question: "Qui paie le diagnostic amiante ?",
    answer:
      "Le propriétaire vendeur ou le maître d’ouvrage pour un diagnostic avant travaux. Le coût se répercute souvent dans la négociation de vente ou dans le budget travaux.",
  },
  {
    question: "Combien de temps faut-il pour recevoir les résultats ?",
    answer:
      "Le rapport est généralement remis sous 7 à 10 jours après l’inspection et les analyses laboratoire. En urgence, certains opérateurs proposent un rendu accéléré.",
  },
  {
    question: "Peut-on habiter pendant le diagnostic ?",
    answer:
      "Oui, le diagnostic amiante ne nécessite pas de quitter le logement. Seules les zones de prélèvement ponctuel peuvent être momentanément inaccessibles.",
  },
  {
    question: "Le diagnostic amiante est-il le même que le DPE ?",
    answer:
      "Non, le diagnostic amiante est spécifique à la recherche d’amiante. Il est distinct du DPE (performance énergétique) et du diagnostic plomb.",
  },
];

const faqLd = getFaqJsonLd(faqItems);

const priceTable = [
  { type: "Appartement", surface: "< 50 m²", price: "90-150€" },
  { type: "Maison", surface: "≈ 100 m²", price: "150-250€" },
  { type: "Immeuble", surface: "> 200 m²", price: "300-600€" },
];

const steps = [
  "Prise de rendez-vous avec un diagnostiqueur certifié (COFRAC).",
  "Inspection visuelle et prélèvements ciblés des matériaux suspectés.",
  "Analyses en laboratoire accrédité.",
  "Remise du rapport complet (7-10 jours), mise à jour du DTA si applicable.",
];

const zoneRisks = [
  "Flocages et calorifugeages",
  "Faux plafonds et dalles de sol",
  "Conduits et gaines techniques",
  "Plaques fibrociment (toiture, bardage)",
  "Joints et colles anciennes",
];

const internalLinks = [
  { href: "/types-desamiantage/", label: "Découvrez tous les types de désamiantage" },
  { href: "/prix-desamiantage/", label: "Consultez notre guide des prix" },
  { href: "/entreprises-certifiees/", label: "Vérifiez les certifications d'une entreprise" },
  { href: "/desamiantage-france/", label: "Trouvez un pro près de chez vous" },
  { href: "/types-desamiantage/toiture/", label: "Désamiantage de toiture" },
];

const timelineItems = [
  { year: "1997", text: "Interdiction de l’amiante en France (1er juillet 1997)." },
  { year: "2012", text: "Décret 2012-639 renforçant les obligations de repérage et de retrait." },
  { year: "2024", text: "Obligation persistante de diagnostic avant vente et avant travaux pour les bâtiments pré-1997." },
];

const keyStats = [
  "Plus de 3 000 chantiers de désamiantage pilotés par notre réseau",
  "98% de clients satisfaits (enquêtes internes 2024)",
  "Délais de réponse devis : 48-72h en moyenne",
];

function PriceTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <table className="w-full text-sm text-slate-200">
        <thead className="bg-white/5 text-xs uppercase tracking-wide text-emerald-200">
          <tr>
            <th className="px-3 py-2 text-left">Type de bien</th>
            <th className="px-3 py-2 text-left">Surface</th>
            <th className="px-3 py-2 text-left">Prix moyen</th>
          </tr>
        </thead>
        <tbody>
          {priceTable.map(row => (
            <tr key={row.type} className="border-t border-white/5">
              <td className="px-3 py-2 font-semibold text-white">{row.type}</td>
              <td className="px-3 py-2">{row.surface}</td>
              <td className="px-3 py-2">{row.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StepsList() {
  return (
    <ol className="space-y-2 text-sm">
      {steps.map(step => (
        <li key={step} className="flex gap-2">
          <span className="text-emerald-200">•</span>
          <span>{step}</span>
        </li>
      ))}
    </ol>
  );
}

function Timeline() {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {timelineItems.map(item => (
        <article key={item.year} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">{item.year}</p>
          <p className="mt-2 text-slate-200">{item.text}</p>
        </article>
      ))}
    </div>
  );
}

function Stats() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
      <p className="text-base font-semibold text-white">Chiffres clés</p>
      <ul className="mt-2 space-y-1 text-slate-200">
        {keyStats.map(item => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}

type LeadField = { label: string; name: string; type?: string; options?: string[]; required?: boolean };

function LeadForm({
  title,
  subtitle,
  fields,
  id,
}: {
  title: string;
  subtitle?: string;
  fields: LeadField[];
  id?: string;
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
            Recevoir mes devis gratuits
          </button>
          <p className="mt-1 text-[11px] text-slate-400">Gratuit · Sans engagement · Diagnostiqueurs certifiés COFRAC</p>
        </div>
      </form>
    </div>
  );
}

export default function DiagnosticAmiantePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {faqLd ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} /> : null}

      <header className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        <div className="mx-auto max-w-6xl space-y-6 px-6 py-12">
          <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
            Diagnostic Amiante : Guide Complet 2024 - Obligations, Prix & Démarches
          </h1>
          <p className="text-lg text-slate-200">
            Le diagnostic amiante est obligatoire pour tout bien dont le permis de construire est antérieur au 1er juillet 1997, en vente ou avant
            travaux. Il sécurise occupants, acheteurs et entreprises en identifiant les matériaux amiantés et en prescrivant la gestion adaptée.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-slate-200">
            <span className="rounded-full bg-white/10 px-3 py-1">Obligatoire avant vente et avant travaux</span>
            <span className="rounded-full bg-white/10 px-3 py-1">Prix moyen 90-600€ selon surface</span>
            <span className="rounded-full bg-white/10 px-3 py-1">Rapport en 7-10 jours</span>
          </div>
          <div className="rounded-3xl border border-emerald-500/25 bg-emerald-500/10 p-5 text-sm text-emerald-100">
            <p className="text-base font-semibold text-emerald-200">Obtenez votre diagnostic amiante</p>
            <p className="mt-2 text-slate-100">Diagnostiqueurs certifiés COFRAC · Intervention rapide · Devis gratuits</p>
            <div className="mt-3">
              <a href="#cta-form" className="inline-flex items-center justify-center rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:brightness-110">
                Obtenez votre diagnostic amiante
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="bg-slate-950 text-slate-200">
        <div className="mx-auto max-w-6xl space-y-16 px-6 py-12">
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Qu&apos;est-ce que le diagnostic amiante et pourquoi est-il obligatoire ?</h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <article className="space-y-3 lg:col-span-2">
                <p>
                  Le diagnostic amiante est un repérage réglementaire des matériaux et produits contenant de l&apos;amiante (MPCA) dans un bâtiment.
                  Il s&apos;appuie sur la norme NF X 46-020 et devient obligatoire pour tout bien construit avant le 1er juillet 1997 lors d&apos;une vente
                  ou avant travaux. Il permet d&apos;identifier les risques, de prescrire des mesures (surveillance, retrait, confinement) et de protéger
                  travailleurs et occupants.
                </p>
                <p>
                  La réglementation (Code de la santé publique, articles R1334-14 à R1334-29) impose ce diagnostic pour sécuriser la transaction et le
                  chantier. Les matériaux amiantés sont classés en listes A, B et C selon leur dangerosité et leur accessibilité. Seul un
                  diagnostiqueur certifié peut le réaliser.
                </p>
                <p>
                  Tous les bâtiments dont le permis de construire est antérieur au 1er juillet 1997 sont concernés : maisons, appartements, immeubles,
                  locaux tertiaires, bâtiments publics ou industriels. Le rapport précise les MPCA, leur état, et recommande un plan d&apos;action.
                </p>
              </article>
              <aside className="rounded-2xl border border-emerald-500/25 bg-emerald-500/10 p-4 text-sm text-emerald-100">
                <p className="font-semibold text-emerald-200">Statistiques amiante en France</p>
                <p className="mt-2 text-slate-100">
                  Le parc bâti antérieur à 1997 représente des millions de m² à surveiller. Les MPCA sont encore fréquents dans les flocages,
                  calorifugeages et faux plafonds. Un diagnostic amiante obligatoire reste la seule façon de lever le doute avant travaux ou vente.
                </p>
              </aside>
            </div>
            <Timeline />
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Les différents types de diagnostics amiante</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">Diagnostic Amiante avant Vente (DAV)</h3>
                <p className="mt-2">
                  Obligatoire pour vendre un bien pré-1997. Validité illimitée si négatif, 3 ans si positif (suivi nécessaire). Le rapport doit être
                  remis à l&apos;acquéreur avant signature pour éviter toute contestation ou annulation.
                </p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">Diagnostic Amiante avant Travaux (DAAT)</h3>
                <p className="mt-2">
                  Obligatoire avant tous travaux susceptibles de libérer des fibres (démolition, rénovation, perçage). Inspecte les zones impactées
                  (plafonds, cloisons, conduits, sols). Condition indispensable pour protéger les équipes et valider le plan de retrait si amiante.
                </p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">Dossier Technique Amiante (DTA)</h3>
                <p className="mt-2">
                  Obligatoire pour les copropriétés et bâtiments tertiaires. Doit être mis à jour après chaque intervention. Il regroupe les
                  repérages, les travaux réalisés, et les mesures de surveillance. Accessible aux occupants et aux entreprises intervenantes.
                </p>
              </article>
            </div>
            <Stats />
          <LeadForm
            id="cta-form"
            title="Quel type de diagnostic avez-vous besoin ?"
            subtitle="Choisissez (vente, travaux, DTA) et recevez 3 devis gratuits en 48-72h."
            fields={[
              { label: "Type de diagnostic", name: "type", options: ["Avant vente (DAV)", "Avant travaux (DAAT)", "DTA", "Autre"] },
              { label: "Type de bien", name: "bien", options: ["Appartement", "Maison", "Immeuble", "Local tertiaire"] },
              { label: "Surface (m²)", name: "surface", type: "number" },
              { label: "Code postal", name: "code_postal", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Téléphone", name: "tel", type: "tel" },
            ]}
          />
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Prix d&apos;un diagnostic amiante : combien ça coûte ?</h2>
            <p>
              Le prix d&apos;un diagnostic amiante dépend du type de repérage (vente, travaux), de la surface, de l&apos;accessibilité et de la zone
              géographique. Comptez 90 à 150€ pour un appartement, 150 à 250€ pour une maison de 100 m², et 300 à 600€ pour un immeuble ou local
              tertiaire de plus de 200 m².
            </p>
            <h3 className="text-lg font-semibold text-white">Coût moyen d&apos;un diagnostic amiante</h3>
            <p>
              Les tarifs incluent l&apos;inspection, les prélèvements ciblés, les analyses en laboratoire et le rapport. Un diagnostic amiante avant
              travaux peut coûter davantage si les zones à inspecter sont nombreuses ou difficiles d&apos;accès.
            </p>
            <PriceTable />
            <h3 className="text-lg font-semibold text-white">Facteurs qui influencent le prix</h3>
            <ul className="list-disc space-y-2 pl-6 text-sm">
              <li>Type de diagnostic (vente, travaux, DTA).</li>
              <li>Surface et complexité des zones à inspecter.</li>
              <li>Accessibilité (hauteur, faux-plafonds, gaines techniques).</li>
              <li>Zone géographique et disponibilité des diagnostiqueurs.</li>
            </ul>
            <div className="rounded-3xl border border-emerald-500/25 bg-emerald-500/10 p-5 text-sm text-emerald-100">
              <p className="font-semibold text-emerald-200">Comparez les prix de 3 diagnostiqueurs certifiés près de chez vous</p>
              <p className="mt-2 text-slate-100">
                Réponse sous 48-72h, tarifs transparents, rapports conformes à la norme NF X 46-020, laboratoires accrédités.
              </p>
              <a href="#cta-form" className="mt-3 inline-flex rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:brightness-110">
                Comparez les tarifs
              </a>
            </div>
            <p className="text-sm">
              Pour plus de détails sur les coûts, consultez notre{" "}
              <Link href="/prix-desamiantage" className="text-emerald-200 hover:text-emerald-100">
                guide des prix
              </Link>
              .
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Comment se déroule un diagnostic amiante ?</h2>
            <h3 className="text-lg font-semibold text-white">Les étapes du diagnostic</h3>
            <StepsList />
            <h3 className="text-lg font-semibold text-white">Durée du diagnostic</h3>
            <p>Selon la taille du bien, l&apos;inspection dure de 1 à 3 heures. Le rapport est remis en 7 à 10 jours, parfois plus vite en option urgente.</p>
            <h3 className="text-lg font-semibold text-white">Zones inspectées</h3>
            <ul className="grid gap-2 sm:grid-cols-2 text-sm">
              {zoneRisks.map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span aria-hidden className="text-emerald-200">
                    •
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
              <p className="text-base font-semibold text-white">Infographie suggérée</p>
              <p className="mt-2">
                “Les 5 étapes du diagnostic amiante” : prise de RDV → inspection/prélèvements → analyses labo → rapport → plan d&apos;action. Inclure un
                schéma des matériaux à risque dans une maison (toiture fibrociment, faux plafonds, gaines, sols).
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Obligations légales et réglementation du diagnostic amiante</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">Qui doit faire réaliser le diagnostic ?</h3>
                <p className="mt-2">
                  Propriétaires vendeurs (DAV), maîtres d&apos;ouvrage avant travaux (DAAT), syndics de copropriété (DTA), bailleurs pour certains
                  contrôles. Tout bâtiment pré-1997 doit être diagnostiqué avant vente ou chantier.
                </p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">Sanctions en cas de non-respect</h3>
                <p className="mt-2">
                  Amendes, annulation de vente, responsabilité civile et pénale en cas d&apos;exposition. L&apos;absence de diagnostic amiante obligatoire peut
                  bloquer une transaction et engager la responsabilité du maître d&apos;ouvrage.
                </p>
              </article>
            </div>
            <LeadForm
              id="cta-form-2"
              title="Trouvez un diagnostiqueur certifié près de chez vous"
              subtitle="Comparez 3 devis gratuits en 48-72h."
              fields={[
                { label: "Code postal", name: "code_postal", type: "text" },
                { label: "Type de bien", name: "bien", options: ["Appartement", "Maison", "Immeuble", "Local tertiaire"] },
                { label: "Besoin", name: "besoin", options: ["Vente", "Travaux", "Location", "Autre"] },
                { label: "Email", name: "email", type: "email" },
                { label: "Téléphone", name: "tel", type: "tel" },
              ]}
            />
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Que faire après un diagnostic amiante positif ?</h2>
            <h3 className="text-lg font-semibold text-white">Interpréter les résultats</h3>
            <p>
              Le rapport classe les MPCA par liste (A, B, C) et peut recommander une mesure d&apos;empoussièrement. Un score élevé impose des actions
              rapides (confinement ou retrait).
            </p>
            <h3 className="text-lg font-semibold text-white">Les solutions</h3>
            <ul className="list-disc space-y-2 pl-6 text-sm">
              <li>Désamiantage obligatoire si matériaux dégradés ou travaux prévus.</li>
              <li>Surveillance périodique (visuelle, mesures) si l&apos;état est stable.</li>
              <li>Confinement temporaire en attendant un retrait planifié.</li>
            </ul>
            <p className="text-sm">
              Découvrez nos solutions de désamiantage :{" "}
              <Link href="/types-desamiantage" className="text-emerald-200 hover:text-emerald-100">
                désamiantage obligatoire
              </Link>
              .
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Comment choisir son diagnostiqueur immobilier ?</h2>
            <p>
              Un diagnostiqueur amiante doit être certifié COFRAC, assuré, expérimenté et transparent sur ses tarifs. Vérifiez ses références, le
              détail de la mission (zones inspectées, nombre de prélèvements) et le délai de rendu.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">Critères de sélection</h3>
                <ul className="mt-2 space-y-2">
                  <li>• Certification COFRAC en cours de validité.</li>
                  <li>• Assurance RC professionnelle couvrant le diagnostic.</li>
                  <li>• Expérience (références locales, typologie similaire).</li>
                  <li>• Tarifs transparents et rapport détaillé.</li>
                </ul>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">Questions à poser</h3>
                <ul className="mt-2 space-y-2">
                  <li>• Combien de prélèvements prévoyez-vous ?</li>
                  <li>• Quel délai pour le rapport ?</li>
                  <li>• Quels laboratoires accrédités utilisez-vous ?</li>
                  <li>• Le tarif inclut-il déplacement et analyses ?</li>
                </ul>
                <p className="mt-2 text-sm">
                  Vérifiez toujours la certification sur l&apos;annuaire officiel du Ministère. Consultez aussi la{" "}
                  <Link href="/entreprises-certifiees" className="text-emerald-200 hover:text-emerald-100">
                    liste des entreprises certifiées
                  </Link>
                  .
                </p>
              </article>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm">
              <p className="text-base font-semibold text-white">Besoin d&apos;un diagnostic amiante rapidement ?</p>
              <p className="mt-2">Obtenez 3 devis gratuits en 24h auprès de diagnostiqueurs certifiés COFRAC.</p>
              <div className="mt-3">
                <a href="#cta-form" className="inline-flex rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:brightness-110">
                  Obtenez 3 devis gratuits en 24h
                </a>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Questions fréquentes sur le diagnostic amiante</h2>
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
            <h2 className="text-2xl font-semibold text-white">Conclusion</h2>
            <p>
              Le diagnostic amiante est un passage obligé pour tout bien pré-1997 en vente ou avant travaux. Il protège occupants et entreprises,
              sécurise la transaction et prépare d&apos;éventuels travaux de désamiantage. En choisissant un diagnostiqueur certifié, vous obtenez un
              rapport fiable, conforme aux exigences réglementaires.
            </p>
            <p>
              Besoin d&apos;aide ? Nos experts vous accompagnent gratuitement pour qualifier votre besoin, comparer les prix et programmer votre
              rendez-vous.
            </p>
            <LeadForm
              title="Besoin d'un diagnostic amiante rapidement ?"
              subtitle="Service gratuit · Diagnostiqueurs certifiés COFRAC · Réponse en 24/48h."
              fields={[
                { label: "Type de diagnostic", name: "type", options: ["Avant vente (DAV)", "Avant travaux (DAAT)", "DTA"] },
                { label: "Code postal", name: "code_postal", type: "text" },
                { label: "Email", name: "email", type: "email" },
                { label: "Téléphone", name: "tel", type: "tel" },
              ]}
            />
          </section>

          <section className="space-y-3 text-sm text-emerald-200">
            {internalLinks.map(link => (
              <Link key={link.href} className="block hover:text-emerald-100" href={link.href}>
                {link.label}
              </Link>
            ))}
          </section>
        </div>
      </main>
    </>
  );
}
