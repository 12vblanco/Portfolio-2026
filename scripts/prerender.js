// Prerenders every route to a flat static HTML file so crawlers and social
// scrapers get full content + meta tags without executing JavaScript, and
// generates sitemap.xml from the same route list so they can never drift.
// Runs after `vite build` + `vite build --ssr` (see "build" in package.json).
//
// Flat files (pendo-consultant.html, insights/<slug>.html) are intentional:
// directory/index.html output makes Netlify 301-redirect /page to /page/.
//
// With React 19, react-helmet-async renders title/meta/link as hoistable
// elements that renderToString emits at the very start of the app markup.
// We move that leading run of tags into <head>, marked data-prerender so
// main.jsx can drop them before React mounts its own managed copies.

import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { dirname } from 'path';
import { publishedInsights } from '../src/components/pendo-consultant/pendoInsightsData.js';
import { render } from '../dist-ssr/entry-server.js';

const SITE = 'https://victorblancoweb.com';
const template = readFileSync('dist/index.html', 'utf-8');

// Remove any stale directory-based output (old builds used pendo-consultant/index.html
// which causes Netlify to 301-redirect /pendo-consultant to /pendo-consultant/)
if (existsSync('dist/pendo-consultant')) {
  rmSync('dist/pendo-consultant', { recursive: true, force: true });
}

const buildDate = new Date().toISOString().slice(0, 10);

// lastmod for the evergreen pages is pinned to the last meaningful content
// change (bump by hand when you edit them) rather than buildDate, so a routine
// rebuild doesn't churn the sitemap and tell crawlers nothing changed actually did.
const HOME_LASTMOD = '2026-08-03';
const PENDO_LASTMOD = '2026-06-19';
// The insights hub's freshness tracks the most recently updated article.
const INSIGHTS_LASTMOD = publishedInsights
  .map((i) => i.dateModified || buildDate)
  .sort()
  .at(-1) || buildDate;

const routes = [
  { url: '/', out: 'dist/index.html', sitemap: { lastmod: HOME_LASTMOD, priority: '1.0' } },
  { url: '/pendo-consultant', out: 'dist/pendo-consultant.html', sitemap: { lastmod: PENDO_LASTMOD, priority: '0.9' } },
  { url: '/insights', out: 'dist/insights.html', sitemap: { lastmod: INSIGHTS_LASTMOD, priority: '0.8' } },
  ...publishedInsights.map((item) => ({
    url: `/insights/${item.slug}`,
    out: `dist/insights/${item.slug}.html`,
    sitemap: { lastmod: item.dateModified || buildDate, priority: '0.7' },
  })),
  // Renders the catch-all NotFoundPage; Netlify serves dist/404.html with a
  // real 404 status for any unknown path. Not in the sitemap.
  { url: '/__not_found__', out: 'dist/404.html' },
];

function splitHoistedHeadTags(appHtml) {
  const headTags = [];
  let rest = appHtml;
  const leadingTag = /^(<title>[\s\S]*?<\/title>|<meta [^>]*?\/>|<link [^>]*?\/>)/;
  let match;
  while ((match = leadingTag.exec(rest))) {
    headTags.push(match[1]);
    rest = rest.slice(match[1].length);
  }
  return { headTags, rest };
}

for (const { url, out } of routes) {
  const { appHtml, styleTags } = render(url);
  const { headTags, rest } = splitHoistedHeadTags(appHtml);

  const head = headTags
    // React's speculative preload hints aren't needed in static output
    .filter((tag) => !tag.includes('rel="preload"'))
    .map((tag) =>
      tag
        .replace(/^<title>/, '<title data-prerender="">')
        .replace(/^<(meta|link) /, '<$1 data-prerender="" ')
    )
    .join('\n  ');

  const html = template
    .replace('</head>', `  ${head}\n  ${styleTags}\n</head>`)
    .replace('<div id="root"></div>', `<div id="root">${rest}</div>`);

  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);

  const title = (head.match(/<title[^>]*>([\s\S]*?)<\/title>/) || [])[1] || '(no title!)';
  console.log(`✅ Prerendered ${url} -> ${out} [${title}]`);
}

// ── sitemap.xml, generated from the same routes ──────────────────────────────
const sitemapEntries = routes
  .filter((r) => r.sitemap)
  .map((r) => `  <url>
    <loc>${SITE}${r.url === '/' ? '' : r.url}</loc>
    <lastmod>${r.sitemap.lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${r.sitemap.priority}</priority>
  </url>`)
  .join('\n');

writeFileSync(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`
);
console.log(`✅ Generated dist/sitemap.xml (${routes.filter((r) => r.sitemap).length} urls)`);

rmSync('dist-ssr', { recursive: true, force: true });
