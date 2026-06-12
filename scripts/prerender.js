// Prerenders every route to a flat static HTML file so crawlers and social
// scrapers get full content + meta tags without executing JavaScript.
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
import { insightsData } from '../src/components/pendo-consultant/pendoInsightsData.js';
import { render } from '../dist-ssr/entry-server.js';

const template = readFileSync('dist/index.html', 'utf-8');

// Remove any stale directory-based output (old builds used pendo-consultant/index.html
// which causes Netlify to 301-redirect /pendo-consultant to /pendo-consultant/)
if (existsSync('dist/pendo-consultant')) {
  rmSync('dist/pendo-consultant', { recursive: true, force: true });
}

const routes = [
  { url: '/', out: 'dist/index.html' },
  { url: '/pendo-consultant', out: 'dist/pendo-consultant.html' },
  ...insightsData.map((item) => ({
    url: `/insights/${item.slug}`,
    out: `dist/insights/${item.slug}.html`,
  })),
  // Renders the catch-all NotFoundPage; Netlify serves dist/404.html with a
  // real 404 status for any unknown path.
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

rmSync('dist-ssr', { recursive: true, force: true });
