import { buildCanonical, getBrandName, getSiteUrl } from "./utils";

import type { City } from "./cities";
import type { Metadata } from "next";

const brandName = getBrandName();
const siteUrl = getSiteUrl();
const logoPath = `${siteUrl}/logo-site.webp`;
const metadataBase = new URL(siteUrl);

type MetadataOptions = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  openGraphType?: "website" | "article";
};

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type SitemapEntry = {
  path: string;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
  priority: number;
  lastModified: string;
  noindex?: boolean;
};

export function createMetadata({
  title,
  description,
  path,
  noindex = false,
  openGraphType = "website",
}: MetadataOptions): Metadata {
  const canonical = buildCanonical(path);

  return {
    title,
    description,
    metadataBase,
    robots: {
      index: !noindex,
      follow: !noindex,
    },
    alternates: {
      canonical,
      languages: {
        "fr-FR": canonical,
      },
    },
    openGraph: {
      type: openGraphType,
      siteName: brandName,
      title,
      description,
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function getParisMetadata(): Metadata {
  return createMetadata({
    title: `Désamiantage Paris (75) | ${brandName} – Diagnostic & Retrait Amiante certifié`,
    description:
      "Désamiantage certifié à Paris : diagnostic amiante, RAT, retrait SS3/SS4 et élimination des déchets BSD en 72h. Équipe certifiée, devis rapide pour Paris 75.",
    path: "/paris",
    openGraphType: "article",
  });
}

export function getCityMetadata(city: City, options?: { description?: string; title?: string; noindex?: boolean }): Metadata {
  const baseTitle = options?.title ?? `Désamiantage ${city.name} (${city.dept}) | ${brandName}`;
  const description =
    options?.description ??
    `Expertise désamiantage à ${city.name} : diagnostic, confinement, retrait et traçabilité BSD pour ${city.cp} et le département ${city.dept}. Intervention sur ${[
      city.name,
      ...city.neighbors,
    ].join(", ")}.`;

  return createMetadata({
    title: baseTitle,
    description,
    path: `/${city.slug}`,
    noindex: options?.noindex ?? false,
    openGraphType: "article",
  });
}

export function getLegalMetadata(): Metadata {
  return createMetadata({
    title: `Mentions légales | ${brandName}`,
    description: "Informations légales, responsabilité éditoriale et coordonnées de l'exploitant Desamiantage-Fraance.",
    path: "/mentions-legales",
    openGraphType: "article",
  });
}

export function getPrivacyMetadata(): Metadata {
  return createMetadata({
    title: `Politique de confidentialité | ${brandName}`,
    description:
      "Cadre de collecte, de conservation et d'utilisation des données personnelles pour les demandes de désamiantage traitées par Desamiantage-Fraance.",
    path: "/politique-confidentialite",
    openGraphType: "article",
  });
}

export function getBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: buildCanonical(item.path),
    })),
  };
}

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brandName,
    url: siteUrl,
    logo: logoPath,
    sameAs: ["https://www.linkedin.com/company/desamiant-pro"],
  };
}

export function getServiceJsonLd(city?: City) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Désamiantage et retrait amiante",
    serviceType: "Confinement, retrait, encapsulage amiante",
    provider: {
      "@type": "Organization",
      name: brandName,
      url: siteUrl,
      logo: logoPath,
    },
    areaServed: city ? [city.name, ...city.neighbors] : "France",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        priceCurrency: "EUR",
        price: "Sur devis",
        unitText: "m²",
      },
    },
  };
}

export function getLocalBusinessJsonLd(city: City) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${brandName} ${city.name}`,
    image: logoPath,
    url: buildCanonical(`/${city.slug}`),
    areaServed: [city.name, ...city.neighbors],
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      postalCode: city.cp,
      addressRegion: city.region,
      addressCountry: "FR",
    },
    parentOrganization: {
      "@type": "Organization",
      name: brandName,
      url: siteUrl,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:30",
      },
    ],
    priceRange: "€€€",
  };
}

export function getFaqJsonLd(items: FaqItem[]) {
  if (!items.length) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(item => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function getSitemapEntries(staticPaths: string[], cities: City[]): SitemapEntry[] {
  const now = new Date().toISOString();
  const priorityMap: Record<string, number> = {
    "/": 1,
    "/desamiantage-france": 0.9,
  };

  const staticEntries: SitemapEntry[] = staticPaths.map(path => ({
    path,
    changefreq: "monthly",
    priority: priorityMap[path] ?? 0.5,
    lastModified: now,
  }));

  const cityEntries: SitemapEntry[] = cities.map(city => ({
    path: `/${city.slug}`,
    changefreq: "monthly",
    priority: city.slug === "paris" ? 0.85 : 0.7,
    lastModified: now,
  }));

  return [...staticEntries, ...cityEntries];
}
