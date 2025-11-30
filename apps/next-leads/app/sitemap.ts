import { cities } from "@/lib/cities";
import { getSitemapEntries } from "@/lib/seo";
import { getSiteUrl } from "@/lib/utils";

import type { MetadataRoute } from "next";

const regionPaths = [
  "ile-de-france",
  "auvergne-rhone-alpes",
  "nouvelle-aquitaine",
  "occitanie",
  "provence-alpes-cote-d-azur",
  "hauts-de-france",
  "grand-est",
  "bretagne",
  "pays-de-la-loire",
  "centre-val-de-loire",
  "normandie",
  "bourgogne-franche-comte",
  "corse",
].map(slug => `/desamiantage-${slug}`);

const staticPaths = [
  "/",
  "/desamiantage-france",
  "/diagnostic-amiante",
  "/prix-desamiantage",
  "/prix-desamiantage-au-m2",
  "/devis-desamiantage",
  "/tarif-desamiantage",
  "/desamiantage-fibrociment",
  "/types-desamiantage/toiture",
  "/types-desamiantage/dalles-de-sol",
  "/mentions-legales",
  "/politique-confidentialite",
  ...regionPaths,
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const entries = getSitemapEntries(staticPaths, Object.values(cities));

  return entries.map(entry => ({
    url: `${siteUrl}${entry.path}`,
    lastModified: entry.lastModified,
    changefreq: entry.changefreq,
    priority: entry.priority,
  }));
}
