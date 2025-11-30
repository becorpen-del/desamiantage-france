import { buildCanonical, getSiteUrl } from "./utils";

import type { SitemapEntry } from "./seo";

const siteUrl = getSiteUrl();

function xmlEscape(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function buildSitemapXml(entries: SitemapEntry[]): string {
  const filtered = entries.filter(entry => entry.noindex !== true);
  const urls = filtered
    .map(entry => {
      const loc = buildCanonical(entry.path);
      const lastmod = entry.lastModified ?? new Date().toISOString();
      const changefreq = entry.changefreq ? `<changefreq>${entry.changefreq}</changefreq>` : "";
      const priority = entry.priority ? `<priority>${entry.priority}</priority>` : "";

      return `  <url>\n    <loc>${xmlEscape(loc)}</loc>\n    <lastmod>${xmlEscape(lastmod)}</lastmod>\n${changefreq ? `    ${changefreq}` : ""}${priority ? `\n    ${priority}` : ""}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
}

export function buildSitemapIndexXml(paths: string[]): string {
  const indexEntries = paths
    .map(path => {
      const loc = new URL(path, siteUrl).toString();
      const lastmod = new Date().toISOString();
      return `  <sitemap>\n    <loc>${xmlEscape(loc)}</loc>\n    <lastmod>${xmlEscape(lastmod)}</lastmod>\n  </sitemap>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexEntries}\n</sitemapindex>`;
}
