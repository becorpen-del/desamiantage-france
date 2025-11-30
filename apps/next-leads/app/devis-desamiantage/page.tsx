import Link from "next/link";

import { createMetadata, getBreadcrumbJsonLd, getFaqJsonLd } from "@/lib/seo";

import type { Metadata } from "next";

const pagePath = "/devis-desamiantage";

export const metadata: Metadata = createMetadata({
  title: "Exemples de Devis Désamiantage : Vrais Modèles 2024",
  description:
    "Découvrez 3 exemples réels de devis désamiantage (toiture, dalles, flocage). Apprenez à reconnaître un bon devis. Recevez vos 3 devis gratuits sous 24h.",
  path: pagePath,
  openGraphType: "article",
});

const breadcrumbLd = getBreadcrumbJsonLd([
  { name: "Accueil", path: "/" },
  { name: "Prix désamiantage", path: "/prix-desamiantage-au-m2" },
  { name: "Exemples de devis", path: pagePath },
]);

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

const faqItems = [
  {
    question: "Combien de devis dois-je demander ?",
    answer: "Au moins 3 devis. Idéalement 4 pour comparer prix, délais et niveau de détail.",
  },
  {
    question: "Les devis sont-ils vraiment gratuits ?",
    answer: "Oui, un devis de désamiantage est gratuit et sans engagement. Refusez s'il est facturé.",
  },
  {
    question: "Combien de temps pour recevoir mes devis ?",
    answer: "Entre 24 et 72h en général. Relancez si aucune réponse sous une semaine.",
  },
  {
    question: "Puis-je négocier le prix du devis ?",
    answer: "Oui, surtout au-delà de 80 m² ou si vous confiez plusieurs lots. Négocier 5 à 15% est courant.",
  },
  {
    question: "Le prix du devis peut-il changer après ?",
    answer: "Non, sauf si le périmètre change (surface différente ou amiante supplémentaire découvert).",
  },
  {
    question: "Dois-je payer pour la visite avant devis ?",
    answer: "Non, la visite est normalement gratuite. Refusez si on vous la facture.",
  },
  {
    question: "Que faire si un devis est trop cher ?",
    answer: "Comparez avec les autres. Si un seul est très cher, écartez-le. Si tous sont élevés, c'est le marché.",
  },
  {
    question: "Puis-je me rétracter après avoir signé ?",
    answer: "Oui, vous avez 14 jours de rétractation pour les travaux à domicile. Envoyez un recommandé.",
  },
];

const faqLd = getFaqJsonLd(faqItems);

const compareRows = [
  { label: "Surface", toit: "85 m²", dalles: "45 m²", floc: "180 m²" },
  { label: "Prix total", toit: "5 198€", dalles: "3 831€", floc: "23 958€" },
  { label: "Prix au m²", toit: "61€/m²", dalles: "85€/m²", floc: "133€/m²" },
  { label: "Durée travaux", toit: "3 jours", dalles: "2 jours", floc: "7 jours" },
  { label: "Complexité", toit: "Moyenne", dalles: "Moyenne", floc: "Élevée" },
];

const signs = [
  { title: "✅ SIGNE #1 : La certification est visible", text: "Numéro sous-section 4 indiqué et vérifiable en ligne." },
  { title: "✅ SIGNE #2 : Tout est détaillé ligne par ligne", text: "Pas de forfait global opaque, chaque étape a son prix." },
  { title: "✅ SIGNE #3 : L'évacuation des déchets est incluse", text: "Transport centre agréé + BSD mentionné." },
  { title: "✅ SIGNE #4 : Le certificat final est inclus", text: "Obligatoire pour revendre ou louer sans risque." },
  { title: "✅ SIGNE #5 : Les délais sont réalistes", text: "2-4 jours (petit), 1-2 semaines (gros). Méfiance si 'demain'." },
  { title: "✅ SIGNE #6 : Le prix est dans la moyenne", text: "Toiture 50-70€/m², dalles 70-95€/m², flocage 100-150€/m²." },
  { title: "✅ SIGNE #7 : Pas de 100% payé d'avance", text: "Acompte 30-40% maximum, solde après certificat." },
  { title: "✅ SIGNE #8 : Ce qui n'est pas inclus est indiqué", text: "Diagnostic, finitions, nouveaux revêtements clairement exclus." },
  { title: "✅ SIGNE #9 : Assurance mentionnée", text: "RC pro et décennale visibles, numéros indiqués." },
  { title: "✅ SIGNE #10 : Validité 3 mois", text: "Standard, vous avez le temps de comparer." },
];

export default function DevisDesamiantagePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {faqLd ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} /> : null}

      <header className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        <div className="mx-auto max-w-6xl space-y-6 px-6 py-12">
          <h1 className="text-3xl font-semibold leading-tight md:text-4xl">Exemples de Devis Désamiantage : Découvrez ce que Vous Allez Recevoir</h1>
          <p className="text-lg text-slate-200">
            Vous vous demandez à quoi ressemble un devis de désamiantage ? Voici ce que vous allez recevoir : des exemples réels et détaillés pour
            savoir exactement ce qui sera fait chez vous, les prix, les délais et ce qui est inclus. Transparence totale, aucune surprise.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-slate-200">
            <span className="rounded-full bg-white/10 px-3 py-1">Exemples réels 2024</span>
            <span className="rounded-full bg-white/10 px-3 py-1">Prix détaillés et délais clairs</span>
            <span className="rounded-full bg-white/10 px-3 py-1">Entreprises certifiées</span>
          </div>
          <div className="text-sm text-emerald-200">
            <Link href="/prix-desamiantage-au-m2/" className="hover:text-emerald-100">
              Voir les prix moyens du marché →
            </Link>
          </div>
          <LeadForm
            id="cta-form-1"
            title="✅ Prêt à recevoir VOS devis personnalisés ?"
            subtitle="Découvrez combien coûtera VOTRE projet."
            button="Recevoir 3 devis gratuits sous 24h"
            fields={[
              { label: "Votre projet", name: "type", options: ["Toiture", "Dalles sol", "Murs/plafonds", "Flocage", "Autre"] },
              { label: "Code postal", name: "code_postal", type: "text" },
              { label: "Téléphone ou email", name: "contact", type: "text" },
            ]}
            note="Devis gratuits · Sans engagement"
          />
        </div>
      </header>

      <main className="bg-slate-950 text-slate-200">
        <div className="mx-auto max-w-6xl space-y-14 px-6 py-12">
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">À quoi ressemble un devis de désamiantage que vous allez recevoir ?</h2>
            <div className="grid gap-4 lg:grid-cols-2">
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm lg:col-span-2">
                <h3 className="text-lg font-semibold text-white">Ce que TOUS les bons devis doivent contenir</h3>
                <ul className="mt-3 space-y-2">
                  <li>• Informations de l&apos;entreprise : nom, numéro de certification, assurance, coordonnées.</li>
                  <li>• Vos informations : nom, adresse, adresse du chantier.</li>
                  <li>• Ce qui sera fait : description, surface en m², type de matériau à enlever.</li>
                  <li>• Prix désamiantage décomposé : chaque ligne avec son prix, inclus et suppléments.</li>
                  <li>• Délais : durée des travaux, date possible de démarrage.</li>
                  <li>• Prix total : HT, TVA, TTC (ce que vous paierez vraiment).</li>
                </ul>
              </article>
              <aside className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-100 lg:col-span-2">
                <p className="font-semibold text-emerald-200">💡 Bon à savoir</p>
                <p className="mt-2 text-slate-100">
                  Un devis sérieux fait 2-4 pages avec ces détails. Si on vous envoie une demi-page avec juste un prix global, méfiez-vous : c&apos;est
                  le signe d&apos;une entreprise peu sérieuse.
                </p>
              </aside>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Exemple réel : Devis pour enlever une toiture en fibrociment (85 m²)</h2>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm space-y-2">
              <p className="text-emerald-200 font-semibold">Contexte</p>
              <p className="text-slate-200">
                M. et Mme Martin à Draveil (91) ont une toiture fibrociment de 85 m². Voici un devis parmi les 3 reçus.
              </p>
              <pre className="whitespace-pre-wrap rounded-xl border border-white/10 bg-slate-900/60 p-4 text-xs text-slate-200">
{`═══════════════════════════════════════════════════════════
DEVIS N° 2024-03-1547
Entreprise DÉSAMIANTAGE PRO IDF
═══════════════════════════════════════════════════════════
Pour : M. et Mme MARTIN
45 avenue des Chênes, 91210 Draveil
Travaux : Enlever votre toiture fibrociment amiantée
Surface : 85m²
───────────────────────────────────────────────────────────
CE QUE NOUS ALLONS FAIRE CHEZ VOUS :
───────────────────────────────────────────────────────────
Diagnostic obligatoire → 280€
Préparation (protections, extracteurs) → 8,50€/m² × 85 = 722€
Dépose des plaques → 28€/m² × 85 = 2 380€
Évacuation déchets (2,8 t) → 518€
Contrôle final + certificat → 350€
Location échafaudage (5 jours) → 475€
───────────────────────────────────────────────────────────
TOTAL :
HT : 4 725€
TVA 10% : 473€
= TTC : 5 198€
───────────────────────────────────────────────────────────
Délais : 3 jours de travaux, démarrage sous 3 semaines
Paiement : 30% à l'acceptation, solde à la remise du certificat
Validité devis : 3 mois
Certifications SS4 et assurance jointes
`}
              </pre>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">Ce que vous devez vérifier</h3>
                <ul className="mt-2 space-y-1">
                  <li>✅ Explication étape par étape, chaque ligne a son prix.</li>
                  <li>✅ Évacuation incluse avec BSD, certificat final inclus.</li>
                  <li>✅ Délais clairs (3 jours), certifications mentionnées.</li>
                </ul>
                <p className="mt-2 text-sm text-emerald-200">
                  Prix au m² : 5 198€ ÷ 85 = 61€/m², dans la moyenne (55-70€/m²).
                </p>
                <Link href="/prix-desamiantage-au-m2/" className="text-emerald-200 hover:text-emerald-100">
                  Comparer avec d&apos;autres prix →
                </Link>
              </article>
              <p className="text-sm text-slate-300">
                Pour recevoir vos devis toiture, utilisez simplement le formulaire en haut (projet, code postal, contact).
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Exemple réel : Devis pour enlever des dalles au sol (45 m²)</h2>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm space-y-2">
              <p className="text-emerald-200 font-semibold">Contexte</p>
              <p className="text-slate-200">
                M. Dubois (Lyon) retire des dalles vinyle-amiante 45 m² avant rénovation. Devis reçu après visite.
              </p>
              <pre className="whitespace-pre-wrap rounded-xl border border-white/10 bg-slate-900/60 p-4 text-xs text-slate-200">
{`═══════════════════════════════════════════════════════════
DEVIS N° D-2024-0892
DÉSAMIANT'EXPERT LYON
═══════════════════════════════════════════════════════════
Pour : M. DUBOIS Pierre, 8 avenue Gambetta, 69007 Lyon
Travaux : Retirer dalles vinyle-amiante
Surface : 45m² (séjour 22 + chambre 12 + couloir 11)
───────────────────────────────────────────────────────────
Isoler vos pièces (bâches) → 12€/m² × 45 = 540€
Retirer dalles (2 ouvriers) → 42€/m² × 45 = 1 890€
Gratter la colle → 8€/m² × 45 = 360€
Sacs amiante (8 sacs) → 120€
Évacuation centre agréé (650 kg) → 293€
Test + nettoyage final + certificat → 280€
───────────────────────────────────────────────────────────
TOTAL :
HT : 3 483€
TVA 10% : 348€
= TTC : 3 831€
───────────────────────────────────────────────────────────
Durée : 2 jours (J1 retrait, J2 finition/test)
Important : vider l'appartement
Paiement : 40% à la commande, 60% au certificat
Validité : 3 mois
`}
              </pre>
            </div>
            <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
              <h3 className="text-lg font-semibold text-white">Décryptage pour vous</h3>
              <ul className="mt-2 space-y-1">
                <li>✅ Pièces détaillées, colle prévue, durée précisée.</li>
                <li>✅ Ce qui n&apos;est pas inclus est clair (nouveau sol, meubles).</li>
                <li>💰 3 831€ ÷ 45 m² = 85€/m², correct pour dalles + colle.</li>
              </ul>
              <p className="mt-2 text-sm text-emerald-200">
                En savoir plus sur les dalles :{" "}
                <Link href="/types-desamiantage/dalles-de-sol/" className="text-emerald-200 hover:text-emerald-100">
                  désamiantage dalles →
                </Link>
              </p>
            </article>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Exemple réel : Devis pour parking de copropriété (180 m²)</h2>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm space-y-2">
              <p className="text-emerald-200 font-semibold">Contexte</p>
              <p className="text-slate-200">
                Syndic d&apos;une copropriété à Lyon, flocage amianté plafond parking -2 (180 m²). Devis professionnel détaillé.
              </p>
              <pre className="whitespace-pre-wrap rounded-xl border border-white/10 bg-slate-900/60 p-4 text-xs text-slate-200">
{`═══════════════════════════════════════════════════════════
DEVIS PROFESSIONNEL
AMIANTE SOLUTIONS PRO
═══════════════════════════════════════════════════════════
Pour : Syndicat "LES TERRASSES", 45 rue Garibaldi, 69006 Lyon
Travaux : Retrait flocage amianté plafond parking (-2)
Surface : 180m²
───────────────────────────────────────────────────────────
Préparation (1,5 j) : confinement complet, extracteurs, sas, protections → 5 180€
Retrait flocage (4 j, 4 ouvriers) → 8 640€ (48€/m²)
Nettoyage complet (1 j) → 1 000€
Évacuation (4,5 t, centre à 80 km) → 3 335€
Contrôles (5 tests, dossier) → 1 810€
───────────────────────────────────────────────────────────
TOTAL :
HT : 19 965€
TVA 20% : 3 993€
= TTC : 23 958€
───────────────────────────────────────────────────────────
Durée : 7 jours ouvrés
Parking fermé pendant les travaux
Options : protection anti-feu 3 200€, peinture plafond 2 160€
Paiement : 30% début, 40% milieu, 30% fin
Validité : 3 mois
`}
              </pre>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                <h3 className="text-lg font-semibold text-white">Ce qu&apos;il faut savoir</h3>
                <ul className="mt-2 space-y-1">
                  <li>Pourquoi c&apos;est plus cher : flocage friable, zone confinée, 5 tests.</li>
                  <li>Prix au m² : 23 958€ ÷ 180 = 133€/m², normal pour flocage.</li>
                  <li>En copro : vote en AG, fonds travaux, parking fermé à prévoir.</li>
                </ul>
                <p className="mt-2 text-slate-200">Analysez les postes de coûts ligne par ligne pour cadrer vos devis.</p>
              </article>
              <p className="text-sm text-slate-300">
                Pro ou copro ? Indiquez votre projet en haut, nous priorisons les demandes urgentes et les grandes surfaces.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Qu&apos;est-ce qu&apos;on apprend de ces 3 exemples ?</h2>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <table className="w-full text-sm text-slate-200">
                <thead className="bg-white/5 text-xs uppercase tracking-wide text-emerald-200">
                  <tr>
                    <th className="px-3 py-2 text-left">Élément</th>
                    <th className="px-3 py-2 text-left">Toiture maison</th>
                    <th className="px-3 py-2 text-left">Dalles appart</th>
                    <th className="px-3 py-2 text-left">Flocage parking</th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map(row => (
                    <tr key={row.label} className="border-t border-white/5">
                      <td className="px-3 py-2 font-semibold text-white">{row.label}</td>
                      <td className="px-3 py-2">{row.toit}</td>
                      <td className="px-3 py-2">{row.dalles}</td>
                      <td className="px-3 py-2">{row.floc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="space-y-3 text-sm">
              <p>1. Le prix au m² varie beaucoup selon matériau et difficulté.</p>
              <p>2. Plus grand ≠ moins cher au m² si le matériau est très friable (flocage).</p>
              <p>3. Tous incluent retrait, évacuation et certificat final.</p>
              <p>4. Délais réalistes : 2-3 jours (petits), 1 semaine (gros).</p>
              <Link href="/prix-desamiantage-au-m2/" className="text-emerald-200 hover:text-emerald-100">
                Voir tous les prix moyens →
              </Link>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">10 signes que votre devis est sérieux</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {signs.map(item => (
                <article key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2">{item.text}</p>
                </article>
              ))}
            </div>
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-100">
              <p className="font-semibold text-amber-200">🚨 Alerte</p>
              <p className="mt-2">
                Si 3 de ces signes manquent dans votre devis, ne signez pas. Demandez des précisions ou changez d&apos;entreprise. Un devis transparent
                protège votre sécurité et votre budget.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Vos questions les plus fréquentes sur les devis</h2>
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
            <p className="text-sm text-slate-300">
              Une question ? Ajoutez-la dans le message du formulaire en haut, nous répondons rapidement.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Comment recevoir vos propres devis personnalisés ?</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2 text-sm">
                <h3 className="text-lg font-semibold text-white">Étape 1 : Décrivez votre projet</h3>
                <p>Type de travaux, taille approximative, code postal.</p>
                <h3 className="text-lg font-semibold text-white">Étape 2 : Recevez 3 devis sous 24-48h</h3>
                <p>Entreprises certifiées près de chez vous, par email et téléphone.</p>
                <h3 className="text-lg font-semibold text-white">Étape 3 : Comparez tranquillement</h3>
                <p>Utilisez nos exemples pour comprendre et poser vos questions.</p>
                <h3 className="text-lg font-semibold text-white">Étape 4 : Choisissez la meilleure offre</h3>
                <p>Pas forcément la moins chère, mais la plus claire et certifiée.</p>
                <p className="text-sm text-emerald-200">
                  En savoir plus sur les certifications :{" "}
                  <Link href="/entreprises-certifiees/" className="text-emerald-200 hover:text-emerald-100">
                    entreprises certifiées →
                  </Link>
                </p>
              </div>
              <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-sm text-emerald-100">
                <p className="text-base font-semibold text-emerald-200">✅ Vous savez maintenant ce qui vous attend</p>
                <p className="mt-2 text-slate-100">
                  Utilisez le formulaire en haut (projet, code postal, contact) pour recevoir vos 3 devis personnalisés en 24-48h.
                </p>
              </div>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
