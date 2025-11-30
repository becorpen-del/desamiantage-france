import { getSiteUrl } from "@/lib/utils";

import type { MetadataRoute } from "next";

const siteUrl = getSiteUrl();

export default function robots(): MetadataRoute.Robots {
  const regionPaths = [
    "/desamiantage-ile-de-france",
    "/desamiantage-auvergne-rhone-alpes",
    "/desamiantage-nouvelle-aquitaine",
    "/desamiantage-occitanie",
    "/desamiantage-provence-alpes-cote-d-azur",
    "/desamiantage-hauts-de-france",
    "/desamiantage-grand-est",
    "/desamiantage-bretagne",
    "/desamiantage-pays-de-la-loire",
    "/desamiantage-centre-val-de-loire",
    "/desamiantage-normandie",
    "/desamiantage-bourgogne-franche-comte",
    "/desamiantage-corse",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/desamiantage-france",
          "/prix-desamiantage",
          "/prix-desamiantage-au-m2",
          "/devis-desamiantage",
          "/tarif-desamiantage",
          "/diagnostic-amiante",
          "/desamiantage-fibrociment",
          "/paris",
          "/bordeaux",
          "/lyon",
          "/toulouse",
          "/nantes",
          ...regionPaths,
        ],
        disallow: ["/api/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
