import { SERVICES } from "@shared/constants";

import { slugify } from "./utils";

type ServiceMeta = {
  headline: string;
  summary: string;
  deliverables: string[];
  faq: { question: string; answer: string }[];
};
type BaseService = { name: string; slug?: string } & Record<string, unknown>;

export type ServiceWithMeta = Omit<BaseService, "slug"> & {
  slug: string;
  meta: ServiceMeta;
};

const serviceMetaBySlug: Record<string, ServiceMeta> = {
  "diagnostic-amiante": {
    headline: "Diagnostic amiante conforme avant travaux",
    summary:
      "Repérage exhaustif des matériaux et produits contenant de l'amiante (MPCA) selon la norme NF X46-020. Le diagnostic intègre prélèvements ciblés, cartographie détaillée et recommandations de gestion ou de retrait.",
    deliverables: [
      "Visite sur site par diagnostiqueur certifié",
      "Repérage des MPCA et plan de localisation",
      "Prélèvements analysés par laboratoire accrédité",
      "Rapport normé NF X46-020 avec photos",
      "Recommandations de gestion du risque",
    ],
    faq: [
      {
        question: "Quand réaliser un diagnostic amiante ?",
        answer:
          "Il est obligatoire avant tout travaux ou démolition d'un bâtiment dont le permis de construire est antérieur au 1er juillet 1997.",
      },
      {
        question: "Quels sont les délais ?",
        answer:
          "Nous intervenons sous 72h dans la plupart des villes, avec rendu du rapport en 48h après prélèvements.",
      },
      {
        question: "Le diagnostic comprend-il des prélèvements ?",
        answer:
          "Oui, des prélèvements destructifs sont réalisés lorsque nécessaire et analysés par un laboratoire accrédité COFRAC afin de confirmer la présence d'amiante.",
      },
      {
        question: "Que faire si des MPCA sont détectés ?",
        answer:
          "Le rapport précise les matériaux concernés, leur état de conservation et les actions à engager (surveillance, retrait, confinement) conformément aux obligations réglementaires.",
      },
      {
        question: "Combien de temps le rapport est-il valable ?",
        answer:
          "Le diagnostic reste valable tant que l'état des matériaux ne change pas. En cas de travaux, un nouveau repérage peut être exigé pour la zone concernée.",
      },
    ],
  },
  "desamiantage-batiment": {
    headline: "Désamiantage complet de bâtiments",
    summary:
      "Mise en sécurité, confinement et retrait des MPCA pour logements, copropriétés, établissements recevant du public et bâtiments tertiaires. Les interventions sont orchestrées pour limiter l'impact sur les occupants.",
    deliverables: [
      "Analyse des risques et plan de retrait (PRP)",
      "Confinements statiques ou dynamiques certifiés",
      "Gestion des sas et du matériel de décontamination",
      "Mesures d'empoussièrement réglementaires",
      "Rapport de fin de travaux et BSDASRI",
    ],
    faq: [
      {
        question: "Comment se déroule un désamiantage intérieur ?",
        answer:
          "Nous planifions, confinons les zones, retirons les matériaux amiantés sous dépression et effectuons un contrôle final avant restitution.",
      },
      {
        question: "Gérez-vous les déchets ?",
        answer:
          "Oui, nous assurons l'emballage, l'étiquetage, le transport et le suivi en centre de traitement agréé.",
      },
      {
        question: "Comment est organisée la coactivité avec les occupants ?",
        answer:
          "Nous définissons des zones de travaux étanches, planifions les interventions en horaires adaptés et informons les occupants des consignes de sécurité.",
      },
      {
        question: "Quelles assurances couvrent le chantier ?",
        answer:
          "Les entreprises partenaires disposent d'une assurance responsabilité civile professionnelle, d'une décennale et d'une assurance environnementale couvrant les opérations amiante.",
      },
      {
        question: "Peut-on phaser un immeuble ?",
        answer:
          "Oui, nous organisons le chantier par cages d'escalier ou par lots pour limiter l'impact sur les occupants et respecter les contraintes de planning.",
      },
    ],
  },
  "desamiantage-toiture": {
    headline: "Retrait d'amiante sur toitures et fibrociment",
    summary:
      "Retrait sécurisé de plaques fibrociment, ardoises artificielles, faîtages et conduits amiantés, suivi d'une réfection complète de la couverture ou d'une mise hors d'eau provisoire.",
    deliverables: [
      "Étaiement et sécurisation de la charpente",
      "Protections collectives (lignes de vie, filets)",
      "Démontage et palettisation des plaques",
      "Conditionnement ADR et transport agréé",
      "Pose d'une nouvelle couverture ou étanchéité",
    ],
    faq: [
      {
        question: "Faut-il déposer l'intégralité de la toiture ?",
        answer:
          "Nous analysons le taux d'amiante et l'état des plaques pour décider d'une dépose partielle ou totale en conformité avec la réglementation.",
      },
      {
        question: "Peut-on rester dans la maison pendant le chantier ?",
        answer:
          "La zone est confinée et inaccessible pendant les travaux afin de garantir l'absence de fibres pour les occupants.",
      },
      {
        question: "Quelles sont les obligations vis-à-vis de la mairie ?",
        answer:
          "Une déclaration préalable peut être nécessaire pour l'installation d'échafaudages ou la fermeture de voirie. Nous préparons les dossiers et panneaux réglementaires.",
      },
      {
        question: "Quelle alternative proposez-vous après retrait ?",
        answer:
          "Nous proposons des solutions de réfection adaptées : bac acier, tuiles, membrane d'étanchéité, panneaux sandwich, avec étude thermique si besoin.",
      },
      {
        question: "Comment sont gérés les jours de pluie ?",
        answer:
          "Le planning intègre une mise hors d'eau provisoire (films PE, étanchéité temporaire) pour sécuriser le bâtiment en cas d'intempéries.",
      },
    ],
  },
  "desamiantage-industriel": {
    headline: "Désamiantage industriel lourd",
    summary:
      "Gestion des MPCA sur sites industriels, chaufferies, gaines techniques, tours de refroidissement et ateliers à forte contrainte de production. Interventions sous confinement dynamique ou zones ATEX.",
    deliverables: [
      "Études de faisabilité et méthodologies spécifiques",
      "Plan de prévention, PPSPS et coordination SPS",
      "Interventions en horaires décalés ou arrêts techniques",
      "Monitoring SSE et reporting quotidien",
      "Gestion logistique des déchets dangereux",
    ],
    faq: [
      {
        question: "Pouvez-vous intervenir sur sites Seveso ?",
        answer:
          "Oui, avec plan de prévention, autorisations spécifiques et coordinateur SPS intégré à l'équipe.",
      },
      {
        question: "Quelles certifications détenez-vous ?",
        answer:
          "Nos partenaires disposent des certifications 1552, SS4 et des habilitations CACES nécessaires.",
      },
      {
        question: "Comment est gérée la continuité de production ?",
        answer:
          "Nous planifions les travaux pendant les arrêts techniques, de nuit ou le week-end, et installons des confinements modulaires pour limiter l'impact sur les lignes actives.",
      },
      {
        question: "Intervenez-vous en milieu confiné ou à grande hauteur ?",
        answer:
          "Oui, avec des équipes habilitées CAH, CATEC et cordistes selon les besoins. Des moyens d'accès spécifiques sont prévus (nacelles, échafaudages suspendus).",
      },
      {
        question: "Proposez-vous des solutions temporaires de calorifugeage ?",
        answer:
          "À l'issue du retrait, nous pouvons installer des isolants provisoires ou définitifs (calorifuge inox, laine minérale, coquilles) selon vos exigences thermiques.",
      },
    ],
  },
};

const buildServices = (): ServiceWithMeta[] => {
  const items: ServiceWithMeta[] = [];

  for (const entry of Array.from(SERVICES)) {
    const service = entry as BaseService;
    const slug = service.slug ?? slugify(service.name);
    const meta = serviceMetaBySlug[slug] ?? {
      headline: service.name,
      summary: "Solution de désamiantage clé en main adaptée à votre projet.",
      deliverables: [
        "Visite technique et analyse des risques",
        "Plan de retrait sur mesure",
        "Suivi de chantier et attestation de conformité",
      ],
      faq: [],
    };

    items.push({
      ...service,
      slug,
      meta,
    });
  }

  return items;
};

export const services = buildServices();

export function getServiceBySlug(slug: string): ServiceWithMeta | undefined {
  return services.find(service => service.slug === slug);
}

export function getServicePaths(): { slug: string }[] {
  return services.map(service => ({ slug: service.slug }));
}
