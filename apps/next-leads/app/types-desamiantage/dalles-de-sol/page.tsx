import Link from "next/link";
import type { Route } from "next";

import { createMetadata, getBreadcrumbJsonLd, getFaqJsonLd } from "@/lib/seo";

import type { Metadata } from "next";

const pagePath = "/types-desamiantage/dalles-de-sol";

export const metadata: Metadata = createMetadata({
  title: "Désamiantage Dalles de Sol : Prix & Entreprises Certifiées [2024]",
  description:
    "Retrait de dalles vinyle-amiante : prix 35-120€/m², processus, réglementation. Comparez 3 devis gratuits d'entreprises certifiées SS4.",
  path: pagePath,
  openGraphType: "article",
});

const breadcrumbLd = getBreadcrumbJsonLd([
  { name: "Accueil", path: "/" },
  { name: "Types de désamiantage", path: "/types-desamiantage" },
  { name: "Dalles de sol", path: pagePath },
]);

type LeadField = { label: string; name: string; type?: string; options?: string[]; required?: boolean };

function LeadForm({
  title,
  button,
  fields,
  id,
  subtitle,
  note,
}: {
  title: string;
  button: string;
  fields: LeadField[];
  id?: string;
  subtitle?: string;
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

const faqItems = [
  {
    question: "Puis-je retirer moi-même mes dalles si le diagnostic est négatif ?",
    answer: "Oui si le diagnostic est négatif et confirmé. Attention aux colles : certaines peuvent contenir de l'amiante.",
  },
  {
    question: "Combien de temps dure le chantier ?",
    answer: "En général 1 à 3 jours pour 50-100 m² selon la complexité (colle, accès, mobilier).",
  },
  {
    question: "Faut-il évacuer les locaux pendant les travaux ?",
    answer: "Oui, la zone confinée doit être vide. Prévoir de vider meubles et occupants.",
  },
  {
    question: "Les dalles amiantées sont-elles dangereuses si on ne les touche pas ?",
    answer: "Le risque est faible si elles sont en bon état. Mais un diagnostic et un retrait sont recommandés avant rénovation.",
  },
  {
    question: "Existe-t-il des aides financières ?",
    answer: "Certaines aides locales ou ANAH peuvent exister. Vérifiez votre éligibilité.",
  },
  {
    question: "Que deviennent les dalles après retrait ?",
    answer: "Elles sont conditionnées et envoyées en centre agréé avec BSD, souvent enfouies en casier spécifique.",
  },
];

const faqLd = getFaqJsonLd(faqItems);

const priceTable = [
  { type: "Retrait simple", price: "35-60€/m²", min: "800€" },
  { type: "Retrait complexe*", price: "60-90€/m²", min: "1 200€" },
  { type: "Retrait + colles", price: "70-120€/m²", min: "1 500€" },
];

const processSteps = [
  { title: "Étape 1 - Diagnostic amiante avant travaux", text: "Prélèvements et analyses labo. Durée 7-10 jours. Obligatoire avant toute dépose." },
  {
    title: "Étape 2 - Préparation du chantier",
    text: "Confinement étanche, extracteurs HEPA, sas de décontamination, protection des zones adjacentes.",
  },
  {
    title: "Étape 3 - Retrait des dalles",
    text: "Humidification, dépose manuelle dalle par dalle, enlèvement des colles, conditionnement double sac étanche.",
  },
  {
    title: "Étape 4 - Contrôle et évacuation",
    text: "Mesure d'empoussièrement final, certificat de restitution, évacuation centre agréé avec BSD.",
  },
];

const internalLinks: Array<{ href: Route; label: string }> = [
  { href: "/types-desamiantage/" as Route, label: "Tous les types de désamiantage" },
  { href: "/diagnostic-amiante/" as Route, label: "En savoir plus sur le diagnostic amiante" },
  { href: "/prix-desamiantage/" as Route, label: "Voir les prix moyens" },
  { href: "/entreprises-certifiees/" as Route, label: "Entreprises certifiées" },
  { href: "/entreprises-certifiees/qualibat-1552/" as Route, label: "Certification Qualibat 1552" },
  { href: "/types-desamiantage/toiture/" as Route, label: "Désamiantage de toiture" },
  { href: "/types-desamiantage/fibrociment/" as Route, label: "Désamiantage fibrociment" },
  { href: "/desamiantage-france/" as Route, label: "Trouver un pro près de chez vous" },
];

export default function DallesDeSolPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {faqLd ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} /> : null}

      <header className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        <div className="mx-auto max-w-6xl space-y-6 px-6 py-12">
          <h1 className="text-3xl font-semibold leading-tight md:text-4xl">Désamiantage Dalles de Sol : Prix, Procédure & Entreprises Certifiées</h1>
          <p className="text-lg text-slate-200">
            Les dalles de sol posées avant 1997 peuvent contenir de l&apos;amiante (VAT, thermoplastiques, colles). Lors d&apos;une rénovation, le risque de
            fibres est réel si l&apos;on ponce ou décolle ces matériaux. Faire appel à un professionnel certifié sous-section 4 est indispensable pour un
            retrait sécurisé.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-slate-200">
            <span className="rounded-full bg-white/10 px-3 py-1">Dalles vinyle-amiante</span>
            <span className="rounded-full bg-white/10 px-3 py-1">Prix 35-120€/m²</span>
            <span className="rounded-full bg-white/10 px-3 py-1">Intervention 1-3 jours</span>
          </div>
          <LeadForm
            id="cta-1"
            title="🔍 Besoin d'enlever vos dalles amiantées ?"
            button="Recevoir 3 devis gratuits"
            fields={[
              { label: "Code postal", name: "code_postal", type: "text" },
              { label: "Téléphone ou email", name: "contact", type: "text" },
            ]}
            note="Gratuit · Sans engagement"
          />
        </div>
      </header>

      <main className="bg-slate-950 text-slate-200">
        <div className="mx-auto max-w-6xl space-y-14 px-6 py-12">
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Comment reconnaître des dalles de sol contenant de l&apos;amiante ?</h2>
            <div className="grid gap-4 lg:grid-cols-2">
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">Types de dalles concernées</h3>
                <ul className="mt-2 space-y-2">
                  <li>• Dalles vinyle-amiante (VAT)</li>
                  <li>• Dalles thermoplastiques</li>
                  <li>• Dalles PVC avec sous-couche amiantée</li>
                  <li>• Colles et mastics amiantés</li>
                </ul>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">Périodes à risque</h3>
                <p className="mt-2">Installations entre 1960 et 1997, notamment dans les bâtiments publics, écoles, bureaux et commerces.</p>
                <p className="mt-2">
                  Identification visuelle : formats 30x30 ou 40x40 cm, aspect marbré. Seul un diagnostic amiante certifié peut confirmer la
                  présence d&apos;amiante.
                </p>
              </article>
            </div>
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-100">
              <p className="font-semibold text-amber-200">⚠️ Important</p>
              <p className="mt-2">
                Ne tentez jamais de retirer vous-même des dalles suspectes. Le désamiantage dalles de sol doit être réalisé par une entreprise
                certifiée SS4 pour éviter la dispersion de fibres.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Pourquoi le désamiantage des dalles de sol est-il obligatoire ?</h2>
            <div className="grid gap-4 lg:grid-cols-3">
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">Risques pour la santé</h3>
                <p className="mt-2">
                  Les dalles amiantées libèrent des fibres en cas de dégradation, ponçage, perçage ou dépose. Ces fibres peuvent provoquer
                  asbestose et cancers. L&apos;humectage et le confinement sont indispensables.
                </p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">Obligation légale</h3>
                <p className="mt-2">
                  Code du travail (R4412-94 à R4412-148) : diagnostic avant travaux obligatoire, intervention par entreprise certifiée sous-section 4,
                  plan de prévention et BSD pour les déchets.
                </p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">Sanctions</h3>
                <p className="mt-2">Amendes jusqu&apos;à 75 000€ et responsabilité pénale du maître d&apos;ouvrage en cas de non-conformité.</p>
              </article>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Comment se déroule le désamiantage de dalles de sol ?</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {processSteps.map(step => (
                <article key={step.title} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                  <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-2">{step.text}</p>
                </article>
              ))}
            </div>
            <p className="text-sm text-slate-300">
              Diagnostic amiante :{" "}
              <Link href="/diagnostic-amiante" className="text-emerald-200 hover:text-emerald-100">
                en savoir plus →
              </Link>
            </p>
            <LeadForm
              id="cta-2"
              title="💰 Quel est le coût pour votre projet ?"
              button="Obtenir un devis gratuit"
              subtitle="Surface, type de bâtiment, code postal."
              fields={[
                { label: "Surface", name: "surface", options: ["<50 m²", "50-100 m²", "100-200 m²", ">200 m²"] },
                { label: "Type de bâtiment", name: "batiment", options: ["Maison", "Appartement", "Local commercial", "Autre"] },
                { label: "Code postal", name: "code_postal", type: "text" },
                { label: "Téléphone ou email", name: "contact", type: "text" },
              ]}
              note="Devis sous 24-72h"
            />
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Prix du désamiantage de dalles de sol : combien ça coûte ?</h2>
            <p>
              Le prix désamiantage dalles de sol varie de 35 à 120€/m² selon la présence de colle amiantée, l&apos;accès et le phasage. Les forfaits
              minimum couvrent la mise en place du confinement et la logistique déchets.
            </p>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <table className="w-full text-sm text-slate-200">
                <thead className="bg-white/5 text-xs uppercase tracking-wide text-emerald-200">
                  <tr>
                    <th className="px-3 py-2 text-left">Type d&apos;intervention</th>
                    <th className="px-3 py-2 text-left">Prix au m²</th>
                    <th className="px-3 py-2 text-left">Prix forfait minimum</th>
                  </tr>
                </thead>
                <tbody>
                  {priceTable.map(row => (
                    <tr key={row.type} className="border-t border-white/5">
                      <td className="px-3 py-2 font-semibold text-white">{row.type}</td>
                      <td className="px-3 py-2">{row.price}</td>
                      <td className="px-3 py-2">{row.min}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm">
              Pour plus de repères tarifaires :{" "}
              <Link href="/prix-desamiantage" className="text-emerald-200 hover:text-emerald-100">
                consulter le guide des prix →
              </Link>
            </p>
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-100">
              <p className="text-base font-semibold text-emerald-200">📊 Exemple : 80 m² de dalles vinyle-amiante</p>
              <p className="mt-2 text-slate-100">Prix moyen : 3 500 - 5 500€ TTC (diagnostic + retrait + évacuation).</p>
              <Link href="/desamiantage-france" className="mt-2 inline-flex text-emerald-200 hover:text-emerald-100">
                Comparez les devis dans votre région →
              </Link>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Comment choisir une entreprise de désamiantage de dalles de sol ?</h2>
            <div className="grid gap-4 lg:grid-cols-3">
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">Certifications obligatoires</h3>
                <ul className="mt-2 space-y-2">
                  <li>• Certification sous-section 4</li>
                  <li>• Qualification Qualibat 1552 ou équivalent</li>
                  <li>
                    <Link href="/entreprises-certifiees" className="text-emerald-200 hover:text-emerald-100">
                      Voir les entreprises certifiées →
                    </Link>
                  </li>
                </ul>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">Points de vigilance</h3>
                <ul className="mt-2 space-y-2">
                  <li>• Vérifier certification en cours de validité</li>
                  <li>• Devis écrit et détaillé</li>
                  <li>• Assurance décennale</li>
                  <li>• Références récentes</li>
                  <li>• BSD mentionné pour les déchets</li>
                </ul>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">Questions à poser</h3>
                <ul className="mt-2 space-y-2">
                  <li>• Êtes-vous certifiés sous-section 4 ?</li>
                  <li>• Comment gérez-vous le confinement ?</li>
                  <li>• Quel délai d&apos;intervention ?</li>
                  <li>• Le diagnostic est-il inclus ?</li>
                  <li>• Fournissez-vous le certificat de restitution ?</li>
                </ul>
              </article>
            </div>
            <LeadForm
              id="cta-3"
              title="📍 Trouvez une entreprise certifiée près de chez vous"
              button="Voir les entreprises disponibles"
              fields={[{ label: "Code postal", name: "code_postal", type: "text" }]}
              note="Nous vous mettons en relation avec des entreprises certifiées."
            />
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Que faire après le retrait des dalles amiantées ?</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">Vérifications obligatoires</h3>
                <p className="mt-2">Contrôle visuel, certificat de restitution, conservation du BSD (30 ans).</p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">Nouveau revêtement</h3>
                <p className="mt-2">Attendre validation finale. Choisir revêtement adapté, pose après certificat.</p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">Garanties et documents</h3>
                <p className="mt-2">Conservez attestations, factures, certificats et BSD.</p>
              </article>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Situations spécifiques de désamiantage de dalles</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">Bâtiments occupés</h3>
                <p className="mt-2">Horaires décalés, phasage, confinement renforcé.</p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">Parties communes (copropriété)</h3>
                <p className="mt-2">Vote en AG, devis à présenter au syndic, planning coordonné.</p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">Dalles collées sur dalle béton</h3>
                <p className="mt-2">Retrait adapté, rabotage si colle amiantée, coût supérieur.</p>
              </article>
            </div>
            <p className="text-sm text-slate-300">
              Vous avez aussi un toit en fibrociment ?{" "}
              <Link href="/types-desamiantage/toiture" className="text-emerald-200 hover:text-emerald-100">
                Voir la page toiture →
              </Link>
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Questions fréquentes sur le désamiantage de dalles de sol</h2>
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
            <p className="text-sm text-emerald-200">
              Aides financières : renseignez-vous auprès de l&apos;ANAH et des collectivités locales pour identifier les subventions mobilisables.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Conclusion</h2>
            <p>
              Le désamiantage dalles de sol exige un professionnel certifié sous-section 4. Les prix varient de 35 à 120€/m² selon colle et accès,
              pour des chantiers souvent réalisés en 1 à 3 jours. Assurez-vous d&apos;un diagnostic préalable, d&apos;un devis détaillé et du BSD final.
            </p>
            <p>Recevez vos devis en 24-72h, comparez et choisissez l&apos;entreprise la plus transparente.</p>
            <div className="rounded-3xl border border-emerald-500/25 bg-emerald-500/10 p-5 text-sm text-emerald-100">
              <p className="text-base font-semibold text-emerald-200">✅ Prêt à lancer votre projet de désamiantage ?</p>
              <p className="mt-2 text-slate-100">Recevez 3 devis gratuits d&apos;entreprises certifiées dans votre région.</p>
              <form className="mt-3 grid gap-2 sm:grid-cols-2">
                <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-slate-300">
                  Prénom
                  <input
                    name="prenom"
                    type="text"
                    required
                    className="rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none transition focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                  />
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
                  Surface (m²)
                  <input
                    name="surface"
                    type="number"
                    required
                    className="rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none transition focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                  />
                </label>
                <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-slate-300">
                  Téléphone
                  <input
                    name="tel"
                    type="tel"
                    required
                    className="rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none transition focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                  />
                </label>
                <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-slate-300 sm:col-span-2">
                  Email
                  <input
                    name="email"
                    type="email"
                    required
                    className="rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none transition focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                  />
                </label>
                <label className="flex items-start gap-2 text-xs text-slate-300 sm:col-span-2">
                  <input type="checkbox" required className="mt-1 accent-emerald-500" />
                  <span>J&apos;accepte d&apos;être contacté par des professionnels certifiés</span>
                </label>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:brightness-110"
                  >
                    Envoyer ma demande
                  </button>
                  <p className="mt-1 text-[11px] text-slate-400">Données protégées · Entreprises certifiées</p>
                </div>
              </form>
            </div>
          </section>

          <section className="space-y-2 text-sm text-emerald-200">
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
