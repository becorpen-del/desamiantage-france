import Link from "next/link";

import { createMetadata, getBreadcrumbJsonLd, getFaqJsonLd } from "@/lib/seo";
import { getBrandName } from "@/lib/utils";

import type { Metadata } from "next";

const brandName = getBrandName();
const pagePath = "/desamiantage-fibrociment";

export const metadata: Metadata = createMetadata({
  title: "Désamiantage Fibrociment : Prix, Devis & Entreprises Certifiées",
  description:
    "Prix, réglementation et processus du désamiantage fibrociment. Comparez 3 devis gratuits d'entreprises certifiées. Intervention rapide partout en France.",
  path: pagePath,
  openGraphType: "article",
});

const breadcrumbLd = getBreadcrumbJsonLd([
  { name: "Accueil", path: "/" },
  { name: "Types de désamiantage", path: "/types-desamiantage" },
  { name: "Fibrociment", path: pagePath },
]);

const faqItems = [
  {
    question: "Puis-je retirer moi-même du fibrociment ?",
    answer:
      "Non. Le retrait de fibrociment amianté doit être réalisé par une entreprise de désamiantage certifiée Qualibat 1552. Le DIY est interdit pour des raisons sanitaires et réglementaires, et expose à des sanctions.",
  },
  {
    question: "Combien de temps durent les travaux ?",
    answer:
      "En moyenne 2 à 5 jours selon la surface, l'accessibilité et le phasage. Les délais incluent le montage du confinement, la dépose, l'évacuation des déchets et le contrôle final.",
  },
  {
    question: "Que faire des déchets de fibrociment ?",
    answer:
      "Ils doivent être conditionnés (filmés, étiquetés) et évacués vers un centre agréé avec BSD. Le stockage sauvage ou en déchetterie classique est interdit.",
  },
  {
    question: "Le fibrociment est-il toujours amianté ?",
    answer:
      "Tout fibrociment posé avant 1997 est suspect. Seul un diagnostic amiante (norme NF X46-020) ou une analyse en laboratoire peut confirmer la présence d'amiante.",
  },
  {
    question: "Comment reconnaître du fibrociment amianté ?",
    answer:
      "Plaques ondulées gris clair ou ardoises artificielles posées avant 1997, aspect fibreux et poreux, parfois marquage NT (non amianté) pour les produits post-1997. En cas de doute, faites réaliser un repérage.",
  },
];

const faqLd = getFaqJsonLd(faqItems);

const ctaBlocks = {
  devis: "[FORMULAIRE_LEAD_FIBROCIMENT]",
  boutonTarifs: "[CTA_DEVIS_FIBROCIMENT]",
};

const priceRows = [
  { label: "Toiture fibrociment (plaques ondulées)", range: "25 à 50€/m²", note: "Accès simple, faible pente, plaques peu dégradées" },
  { label: "Toiture fibrociment complexe", range: "50 à 90€/m²", note: "Hauteur, nacelle, plaques fragilisées, phasage en site occupé" },
  { label: "Bardages et façades", range: "30 à 60€/m²", note: "Échafaudages, filets, accès en façade" },
  { label: "Conduits et canalisations", range: "40 à 80€/ml", note: "Découpe, confinement local, évacuation sous ADR" },
];

const processSteps = [
  {
    title: "1. Diagnostic amiante obligatoire",
    text: "Repérage conforme à la NF X 46-020, prélèvements si besoin, cartographie des MPCA et intégration au DTA. Condition indispensable avant toute intervention.",
  },
  {
    title: "2. Plan de retrait et confinement",
    text: "Plan SS3 détaillant les EPI/EPC, le phasage, les accès et la logistique déchets. Déclaration DREETS/CARSAT et coordination avec la mairie si voirie impactée.",
  },
  {
    title: "3. Techniques de retrait du fibrociment",
    text: "Humidification, dépose par travées, palettisation, filmage. Interdiction de casser ou poncer les plaques pour éviter la dispersion de fibres.",
  },
  {
    title: "4. Évacuation et traitement des déchets",
    text: "Étiquetage, transport ADR, dépôt en centre agréé. Suivi via BSD numériques et certificat de dépôt.",
  },
  {
    title: "5. Contrôle final et certificat",
    text: "Nettoyage, contrôle visuel, mesure d'empoussièrement si nécessaire, remise du rapport de fin de chantier et mise à jour du DTA.",
  },
];

const testimonials = [
  {
    author: "Syndic, copropriété 75",
    text: "Dépose de toiture fibrociment 450 m², phasage par cages d’escalier, BSD numériques et remise hors d’eau quotidienne. Devis en 48h.",
  },
  {
    author: "Responsable maintenance, site logistique 33",
    text: "Retrait de bardages et conduits amiantés en horaires de nuit. Confinement dynamique et mesures d’empoussièrement quotidiennes.",
  },
  {
    author: "Agriculteur, hangar 64",
    text: "Toiture fibrociment 1200 m² avec nacelles et palettisation mécanique. Subvention locale et étude solaire intégrée.",
  },
];

function PriceTable() {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
      <table className="w-full text-sm text-slate-200">
        <thead className="bg-white/5 text-xs uppercase tracking-wide text-emerald-200">
          <tr>
            <th className="px-4 py-3 text-left">Type de prestation</th>
            <th className="px-4 py-3 text-left">Prix indicatif</th>
            <th className="px-4 py-3 text-left">Conditions</th>
          </tr>
        </thead>
        <tbody>
          {priceRows.map(row => (
            <tr key={row.label} className="border-t border-white/5">
              <td className="px-4 py-3 font-semibold text-white">{row.label}</td>
              <td className="px-4 py-3">{row.range}</td>
              <td className="px-4 py-3">{row.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Process() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {processSteps.map(step => (
        <article key={step.title} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
          <h3 className="text-base font-semibold text-white">{step.title}</h3>
          <p className="mt-2 text-slate-200">{step.text}</p>
        </article>
      ))}
    </div>
  );
}

function Testimonials() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {testimonials.map(item => (
        <article key={item.author} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
          <p className="text-slate-200">“{item.text}”</p>
          <p className="mt-2 text-xs text-emerald-200">{item.author}</p>
        </article>
      ))}
    </div>
  );
}

export default function FibrocimentPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {faqLd ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} /> : null}

      <header className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        <div className="mx-auto max-w-6xl px-6 py-12 space-y-6">
          <nav className="text-sm text-slate-300">
            <Link href="/" className="hover:text-emerald-200">
              Accueil
            </Link>{" "}
            ›{" "}
            <Link href="/types-desamiantage/" className="hover:text-emerald-200">
              Types de désamiantage
            </Link>{" "}
            › <span className="text-white font-semibold">Fibrociment</span>
          </nav>
          <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
            Désamiantage Fibrociment : Prix, Réglementation et Entreprises Certifiées
          </h1>
          <p className="text-lg text-slate-200">
            Le désamiantage fibrociment concerne toitures, bardages, ardoises et conduits installés avant 1997. Découvrez les prix moyens, la
            réglementation et les étapes pour confier l&apos;enlèvement fibrociment à une entreprise de désamiantage certifiée.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-slate-200">
            <span className="rounded-full bg-white/10 px-3 py-1">25 à 50€/m² (accès simple)</span>
            <span className="rounded-full bg-white/10 px-3 py-1">2 à 5 jours de travaux</span>
            <span className="rounded-full bg-white/10 px-3 py-1">Certifications Qualibat 1552</span>
          </div>
        </div>
      </header>

      <main className="bg-slate-950 text-slate-200">
        <div className="mx-auto max-w-6xl space-y-14 px-6 py-12">
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Qu&apos;est-ce que le fibrociment amianté ?</h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <article className="lg:col-span-2 space-y-4">
                <h3 className="text-lg font-semibold text-white">Composition et dangers du fibrociment</h3>
                <p>
                  Le fibrociment est un matériau composite à base de ciment et de fibres. Avant 1997, ces fibres étaient majoritairement
                  amiantées. Les plaques ondulées ou ardoises en fibrociment peuvent libérer des fibres lorsqu&apos;elles sont cassées, sciées ou
                  érodées. Les risques santé incluent mésothéliome, asbestose et cancers respiratoires. Ne jamais poncer ni casser ces
                  matériaux.
                </p>
                <h3 className="text-lg font-semibold text-white">Où trouve-t-on du fibrociment dans les bâtiments ?</h3>
                <p>
                  On retrouve du fibrociment amianté sur les toitures (plaques ondulées, ardoises artificielles), bardages, garages,
                  dépendances, conduits de ventilation ou canalisations enterrées, et parfois en sous-face de balcons. Tout bâtiment construit
                  avant 1997 est susceptible d&apos;en contenir.
                </p>
                <h3 className="text-lg font-semibold text-white">Quand le fibrociment est-il dangereux ?</h3>
                <p>
                  Tant que les plaques sont intactes et non manipulées, l&apos;empoussièrement reste faible. Le danger apparaît lors des
                  détériorations (chocs, perforations, intempéries) ou interventions (perçage, découpe). Un diagnostic amiante est obligatoire
                  avant travaux pour qualifier le risque et décider d&apos;un retrait ou d&apos;un encapsulage.
                </p>
              </article>
              <aside className="rounded-2xl border border-emerald-500/25 bg-emerald-500/10 p-4 text-sm text-emerald-100">
                <p className="font-semibold text-emerald-200">💡 Bon à savoir</p>
                <p className="mt-2 text-slate-100">
                  Poids moyen d&apos;une plaque ondulée : 10 à 15 kg/m². Les plaques installées avant 1997 doivent être présumées amiantées et
                  retirées par une entreprise de désamiantage fibrociment certifiée.
                </p>
              </aside>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Pourquoi faire appel à un professionnel pour le désamiantage de fibrociment ?</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-lg font-semibold text-white">Risques pour la santé</h3>
                <p className="mt-2 text-sm">
                  Inhaler des fibres d&apos;amiante provoque cancers pulmonaires et mésothéliomes. Les fibres sont invisibles à l&apos;œil nu et peuvent
                  être libérées dès qu&apos;une plaque est cassée ou poncée.
                </p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-lg font-semibold text-white">Obligations légales et réglementaires</h3>
                <p className="mt-2 text-sm">
                  Diagnostic amiante avant travaux (NF X 46-020), plan de retrait SS3, certification Qualibat 1552, Code de la santé publique
                  (R1334-14 à R1334-29). Le non-respect expose à des sanctions et à l&apos;arrêt de chantier.
                </p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-lg font-semibold text-white">Sanctions en cas de non-conformité</h3>
                <p className="mt-2 text-sm">
                  Amendes, arrêt de chantier, responsabilité pénale et refus d&apos;assurance en cas d&apos;accident. Le recours à une entreprise
                  désamiantage fibrociment certifiée sécurise le chantier et les occupants.
                </p>
              </article>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm">
              <p className="text-base font-semibold text-white">Recevez 3 devis gratuits de professionnels certifiés</p>
              <p className="mt-2">
                Délais de réponse 48-72h · Plans SS3 · Traçabilité BSD · Intervention partout en France. Décrivez votre toiture, bardage ou
                conduits en fibrociment : surface, hauteur, photos, accessibilité.
              </p>
              <div className="mt-3 text-white">{ctaBlocks.devis}</div>
              <p className="mt-2 text-xs text-slate-300">Devis 100% gratuits · Sans engagement · Entreprises certifiées</p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Prix et tarifs du désamiantage fibrociment</h2>
            <p>
              Le tarif désamiantage fibrociment dépend de l&apos;accès, de l&apos;état des plaques et de la logistique déchets. Comptez 25 à 50€/m² pour
              une toiture simple et jusqu&apos;à 90€/m² sur un chantier complexe (nacelle, fragilisation, forte pente). Les conduits se chiffrent
              entre 40 et 80€/ml. Les devis incluent confinement, dépose, conditionnement, transport et BSD.
            </p>
            <h3 className="text-lg font-semibold text-white">Fourchette de prix au m²</h3>
            <p>
              Toiture fibrociment standard : 25-50€/m². Toiture complexe : 50-90€/m². Bardage : 30-60€/m². Ces prix couvrent l&apos;enlèvement
              fibrociment, les protections et l&apos;évacuation en centre agréé.
            </p>
            <h3 className="text-lg font-semibold text-white">Facteurs qui influencent le coût</h3>
            <ul className="list-disc space-y-2 pl-6 text-sm">
              <li>Accessibilité (pente, hauteur, besoin de nacelle ou filets).</li>
              <li>État des plaques (cassantes, poreuses, infiltrations).</li>
              <li>Distance au centre de traitement et coût du transport ADR.</li>
              <li>Phasage en site occupé et contraintes météo.</li>
            </ul>
            <h3 className="text-lg font-semibold text-white">Comparatif : fibrociment vs autres matériaux amiantés</h3>
            <p>
              Le retrait fibrociment est souvent moins cher que le désamiantage intérieur de flocages ou calorifugeages, mais plus coûteux qu&apos;un
              simple retrait de dalles vinyles. La logistique toiture (échafaudages, nacelles) et la gestion de l&apos;étanchéité temporaire
              expliquent l&apos;écart.
            </p>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <table className="w-full text-sm text-slate-200">
                <thead className="bg-white/5 text-xs uppercase tracking-wide text-emerald-200">
                  <tr>
                    <th className="px-3 py-2 text-left">Matériau amianté</th>
                    <th className="px-3 py-2 text-left">Fourchette prix</th>
                    <th className="px-3 py-2 text-left">Contraintes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-white/5">
                    <td className="px-3 py-2 font-semibold text-white">Fibrociment (toiture/bardage)</td>
                    <td className="px-3 py-2">25-90€/m²</td>
                    <td className="px-3 py-2">Accès toiture, nacelles, remise hors d&apos;eau</td>
                  </tr>
                  <tr className="border-t border-white/5">
                    <td className="px-3 py-2 font-semibold text-white">Dalles vinyles + colle</td>
                    <td className="px-3 py-2">35-50€/m²</td>
                    <td className="px-3 py-2">Confinement intérieur, dépose minutieuse</td>
                  </tr>
                  <tr className="border-t border-white/5">
                    <td className="px-3 py-2 font-semibold text-white">Flocages / calorifugeages</td>
                    <td className="px-3 py-2">80-150€/m²</td>
                    <td className="px-3 py-2">Empoussièrement élevé, confinement dynamique</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h3 className="text-lg font-semibold text-white">Exemples de devis réels</h3>
            <ul className="space-y-2 text-sm">
              <li>60 m² de toiture garage : 25-45€/m², 2 jours de travaux, remise hors d&apos;eau provisoire.</li>
              <li>120 m² de toiture pavillon avec lucarnes : 40-70€/m², échafaudages, filmage sous toiture.</li>
              <li>200 m² de hangar agricole : 30-55€/m², palettisation mécanique, benne ADR, possible subvention.</li>
            </ul>
            <p className="text-sm">
              Pour un chiffrage précis, consultez notre{" "}
              <Link href="/prix-desamiantage/" className="text-emerald-200 hover:text-emerald-100">
                guide complet des prix
              </Link>{" "}
              et notre{" "}
              <Link href="/devis-gratuit/" className="text-emerald-200 hover:text-emerald-100">
                service de devis gratuit
              </Link>
              . Le tarif désamiantage fibrociment dépend aussi des accès (rue étroite, cour intérieure) et des contraintes de copropriété.
            </p>
            <PriceTable />
            <div className="rounded-3xl border border-emerald-500/25 bg-emerald-500/10 p-5 text-sm text-emerald-100">
              <p className="font-semibold text-emerald-200">Comparez les tarifs dans votre région</p>
              <p className="mt-2 text-slate-100">
                Obtenez trois devis détaillés en 48-72h. Ajustement selon l&apos;état des plaques, la hauteur et la distance au centre de traitement.
              </p>
              <div className="mt-3 text-white">{ctaBlocks.boutonTarifs}</div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Processus de désamiantage du fibrociment étape par étape</h2>
            <Process />
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
              <p className="text-base font-semibold text-white">⚠️ Important</p>
              <p className="mt-2">
                Ne jamais casser, percer ou meuler les plaques : ces gestes dispersent des fibres d&apos;amiante. Seul un professionnel certifié peut
                organiser un retrait sécurisé avec confinement et plan de retrait validé.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
              <h3 className="text-base font-semibold text-white">Timeline type d&apos;un chantier (indicatif)</h3>
              <ul className="mt-2 space-y-2">
                <li>• J0-J5 : qualification, photos, métrés, devis comparatifs (48-72h).</li>
                <li>• J5-J20 : diagnostic amiante si manquant, plan de retrait, déclarations DREETS/CARSAT.</li>
                <li>• J20-J30 : intervention (2-5 jours selon surface), évacuation déchets, remise hors d&apos;eau.</li>
                <li>• J30 : contrôle final, BSD, mise à jour DTA et attestation de conformité.</li>
              </ul>
              <p className="mt-2">
                En urgence (fuite, sinistre), certaines étapes peuvent être accélérées, mais le cadre réglementaire reste obligatoire.{" "}
                <Link href="/desamiantage-france/" className="text-emerald-200 hover:text-emerald-100">
                  Accédez à la carte des régions
                </Link>{" "}
                pour mobiliser rapidement une entreprise désamiantage fibrociment proche.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Types de fibrociment à désamianter</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { title: "Plaques ondulées de toiture", text: "Utilisées sur garages, hangars, ateliers. Poids 10-15 kg/m², fragilisées après 25 ans." },
                { title: "Ardoises en fibrociment", text: "Ardoises artificielles posées avant 1997, souvent en losange ou écaille sur maisons individuelles." },
                { title: "Canalisations et conduits", text: "Conduits de ventilation ou évacuations. Découpe encadrée, confinement localisé et transport ADR." },
                { title: "Bardages et façades", text: "Panneaux verticaux, nécessitent échafaudages, filets, protections contre la chute de matériaux." },
              ].map(item => (
                <article key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm">{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Réglementation du désamiantage fibrociment en 2024</h2>
            <div className="grid gap-4 lg:grid-cols-3">
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-lg font-semibold text-white">Certifications obligatoires (Qualibat 1552)</h3>
                <p className="mt-2 text-sm">
                  Les entreprises doivent être certifiées Qualibat 1552 (sous-section 3) pour le retrait amiante. Les plans de retrait sont
                  relus et audités, avec personnel formé SS3/SS4.
                </p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-lg font-semibold text-white">Normes de sécurité</h3>
                <p className="mt-2 text-sm">
                  Confinement adapté, EPI/EPC, mesures d&apos;empoussièrement, suivi des déchets via BSD. Diagnostic amiante préalable selon NF X
                  46-020, obligations du Code de la santé publique (R1334-14 à R1334-29).
                </p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-lg font-semibold text-white">Obligations du propriétaire</h3>
                <p className="mt-2 text-sm">
                  Fournir un diagnostic amiante à jour, autoriser l&apos;accès, conserver le DTA et les BSD. Informer les occupants et voisins en cas
                  de chantier impactant la voirie ou la copropriété.
                </p>
              </article>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Comment choisir son entreprise de désamiantage fibrociment ?</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-lg font-semibold text-white">5 critères essentiels</h3>
                <ul className="mt-2 space-y-2 text-sm">
                  <li>• Certification Qualibat 1552 et audits à jour.</li>
                  <li>• Assurances RC pro et décennale incluant amiante.</li>
                  <li>• Références similaires (toiture, bardage, conduits).</li>
                  <li>• Procédure déchets et réservation centre agréé.</li>
                  <li>• Plan de retrait détaillé et phasage clair.</li>
                </ul>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-lg font-semibold text-white">Questions à poser avant de signer</h3>
                <ul className="mt-2 space-y-2 text-sm">
                  <li>• Quel confinement et quelles protections collectives ?</li>
                  <li>• Quel planning (jour/nuit) et quelles remises hors d&apos;eau provisoires ?</li>
                  <li>• Quel centre agréé et quels BSD seront fournis ?</li>
                </ul>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-lg font-semibold text-white">Vérifier les certifications</h3>
              <p className="mt-2 text-sm">
                Demandez l&apos;attestation Qualibat 1552, les habilitations SS3/SS4 des opérateurs, les attestations d&apos;assurance et les rapports
                d&apos;audit. Consultez la liste des entreprises certifiées.
              </p>
              <Link href="/entreprises-certifiees/" className="mt-2 inline-flex text-emerald-200 hover:text-emerald-100">
                Vérifiez les certifications d&apos;une entreprise →
              </Link>
            </article>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm">
            <p className="text-base font-semibold text-white">Trouvez une entreprise certifiée près de chez vous</p>
            <p className="mt-2">
              Réponse en 48-72h, devis comparatifs, accompagnement administratif (plans SS3, BSD, assurances). Sélection selon votre région,
              la hauteur et la surface.
            </p>
            <div className="mt-3 text-white">{ctaBlocks.devis}</div>
            <p className="mt-2 text-xs text-slate-300">Plus de 3000 chantiers réalisés · 98% de clients satisfaits · Devis 100% gratuits</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
            <h3 className="text-base font-semibold text-white">Checklist propriétaire avant signature</h3>
            <ul className="mt-2 space-y-2">
              <li>• Diagnostic amiante à jour (NF X 46-020) et DTA disponible.</li>
              <li>• Plan de retrait détaillé (phasage, confinements, EPI/EPC).</li>
              <li>• Attestations assurance amiante et Qualibat 1552 fournies.</li>
              <li>• Preuve de réservation du centre de traitement et procédure BSD.</li>
              <li>• Modalités de remise hors d&apos;eau et gestion des intempéries.</li>
            </ul>
            <p className="mt-2">
              Pour toute question sur les obligations, consultez{" "}
              <Link href="/types-desamiantage/" className="text-emerald-200 hover:text-emerald-100">
                tous les types de désamiantage
              </Link>{" "}
              ou notre{" "}
              <Link href="/prix-desamiantage/" className="text-emerald-200 hover:text-emerald-100">
                guide des prix
              </Link>
              .
            </p>
          </div>
        </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Alternatives au désamiantage du fibrociment</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { title: "Encapsulage", text: "Application d'un revêtement pour bloquer les fibres. Solution transitoire, nécessite suivi régulier du DTA." },
                { title: "Confinement", text: "Mise en place de protections (films, barrières) pour limiter la dispersion, utile en attente d'un retrait." },
                { title: "Quand choisir le retrait total ?", text: "Plaques dégradées, projet de rénovation énergétique, revente ou mise en conformité. Le retrait complet supprime le risque et facilite la pose d'une nouvelle couverture." },
              ].map(item => (
                <article key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm">{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Aides financières pour le désamiantage fibrociment</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-lg font-semibold text-white">Aides de l&apos;ANAH</h3>
                <p className="mt-2 text-sm">
                  Possibles lorsque le désamiantage s&apos;intègre à une rénovation énergétique. Montants variables selon ressources et performance
                  énergétique visée.
                </p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-lg font-semibold text-white">Prêts à taux zéro</h3>
                <p className="mt-2 text-sm">
                  L&apos;éco-PTZ peut financer le désamiantage fibrociment dans un bouquet de travaux. Les banques exigent devis, attestations et BSD.
                </p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-lg font-semibold text-white">Aides locales et régionales</h3>
                <p className="mt-2 text-sm">
                  Certaines régions subventionnent le retrait de toitures ou bardages amiantés (notamment agricoles). Plafonds autour de 20-40€/m².
                </p>
              </article>
            </div>
            <p>
              Pour optimiser vos dossiers d&apos;aides, préparez devis détaillés, plan de retrait, attestations RGE si rénovation énergétique et BSD
              fin de chantier.
            </p>
            <p className="text-sm text-emerald-100">Renseignez-vous auprès des collectivités pour identifier les subventions mobilisables.</p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Questions fréquentes sur le désamiantage fibrociment</h2>
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
            <h2 className="text-2xl font-semibold text-white">Comparez les tarifs de 3 entreprises locales</h2>
            <p>
              {brandName} qualifie votre chantier, contacte des entreprises de désamiantage fibrociment certifiées et compare les tarifs. Vous
              recevez trois devis détaillés en 48-72h, avec phasage, protections collectives et filière déchets.
            </p>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm">
              <div className="text-white">{ctaBlocks.devis}</div>
              <p className="mt-2 text-xs text-slate-300">Devis 100% gratuits · Sans engagement · Partenaires certifiés Qualibat</p>
            </div>
            <Testimonials />
          </section>

          <section className="space-y-4 text-sm text-emerald-200">
            <Link className="hover:text-emerald-100" href="/types-desamiantage/">
              Découvrez tous les types de désamiantage
            </Link>
            <Link className="hover:text-emerald-100" href="/prix-desamiantage/">
              Consultez notre guide complet des prix
            </Link>
            <Link className="hover:text-emerald-100" href="/types-desamiantage/toiture/">
              Désamiantage de toiture
            </Link>
            <Link className="hover:text-emerald-100" href="/entreprises-certifiees/">
              Vérifiez les certifications d&apos;une entreprise
            </Link>
            <Link className="hover:text-emerald-100" href="/devis-gratuit/">
              Obtenez votre devis gratuit
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}
