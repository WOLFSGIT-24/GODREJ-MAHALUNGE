import type { APIRoute } from 'astro';

// Indexable pages only (thank-you and 404 are noindex).
const PAGES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms-and-conditions', priority: '0.3', changefreq: 'yearly' },
];

export const GET: APIRoute = ({ site }) => {
  // A sitemap must use absolute URLs; without SITE_URL it is left empty rather than invalid.
  const urls = site
    ? PAGES.map(
        (p) =>
          `  <url>\n    <loc>${new URL(p.path, site).href}</loc>\n    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`
      ).join('\n')
    : '';
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
