import { getPrivacyMetadata } from "@/lib/seo";
import { getBrandName } from "@/lib/utils";

import type { Metadata } from "next";

export const metadata: Metadata = getPrivacyMetadata();

const lastUpdated = "1 juin 2024";

const sections = [
  {
    title: "1. Responsable du traitement",
    content: [
      "Le responsable du traitement des données collectées sur le site est {brandName}. Pour toute demande relative à vos données personnelles, vous pouvez écrire à privacy@desamiant-pro.fr ou via notre formulaire #devis.",
    ],
  },
  {
    title: "2. Données collectées",
    content: [
      "Lors d'une demande de devis, nous collectons les informations nécessaires au cadrage du projet de désamiantage (identité, coordonnées, informations techniques sur le chantier, descriptions et documents additionnels).",
      "Les données de navigation (pages consultées, source d'acquisition, adresse IP tronquée) sont enregistrées pour mesurer la performance du site et lutter contre la fraude.",
    ],
  },
  {
    title: "3. Finalités du traitement",
    content: [
      "Qualification de votre besoin et mise en relation avec une entreprise certifiée SS3/SS4.",
      "Suivi des dossiers, génération des bordereaux BSD et archivage réglementaire.",
      "Statistiques anonymisées pour améliorer le service.",
    ],
  },
  {
    title: "4. Bases légales",
    content: [
      "Exécution de mesures précontractuelles (article 6.1.b RGPD).",
      "Respect d'obligations légales liées à la traçabilité des déchets dangereux.",
      "Intérêt légitime pour la lutte anti-spam et la sécurisation des accès.",
    ],
  },
  {
    title: "5. Durées de conservation",
    content: [
      "Les demandes de devis sont conservées 3 ans. Les BSD et documents réglementaires associés sont archivés 10 ans conformément aux prescriptions amiante.",
      "Les données techniques anonymisées peuvent être conservées au-delà pour établir des statistiques.",
    ],
  },
  {
    title: "6. Sous-traitants et transferts",
    content: [
      "Les données peuvent être traitées par des prestataires situés dans l'Union Européenne (hébergeur, outils CRM, services analytiques). Des clauses contractuelles assurent un niveau de sécurité équivalent. Aucun transfert hors UE n'est opéré sans garanties adéquates.",
    ],
  },
  {
    title: "7. Vos droits",
    content: [
      "Vous disposez des droits d'accès, rectification, opposition, limitation, portabilité et effacement. Pour les exercer, contactez privacy@desamiant-pro.fr en précisant le périmètre de votre demande. Une réponse sera apportée sous 30 jours.",
      "Vous pouvez introduire une réclamation auprès de la CNIL si vous estimez que vos droits ne sont pas respectés.",
    ],
  },
  {
    title: "8. Sécurité",
    content: [
      "Les données sont hébergées en France, protégées par chiffrement en transit, authentification renforcée et journalisation des accès. Seuls les collaborateurs habilités accèdent aux dossiers.",
    ],
  },
  {
    title: "9. Mise à jour",
    content: [
      "La présente politique peut être actualisée à tout moment. Dernière mise à jour : {lastUpdated}.",
    ],
  },
];

export default function PrivacyPage() {
  const brandName = getBrandName();

  return (
    <div className="bg-white py-16">
      <div className="mx-auto max-w-4xl px-6">
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold text-slate-900">Politique de confidentialité</h1>
          <p className="text-sm text-slate-600">
            Cette politique décrit la manière dont {brandName} collecte, utilise et protège vos données personnelles dans le cadre des demandes de désamiantage.
          </p>
        </header>
        <div className="mt-10 space-y-8">
          {sections.map(section => (
            <section key={section.title} className="space-y-3">
              <h2 className="text-xl font-semibold text-slate-900">{section.title}</h2>
              {section.content.map(paragraph => (
                <p key={paragraph} className="text-sm leading-6 text-slate-600">
                  {paragraph
                    .replace("{brandName}", brandName)
                    .replace("{lastUpdated}", lastUpdated)}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
