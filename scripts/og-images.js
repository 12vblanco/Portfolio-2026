// Generates a branded 1200x630 Open Graph card for every article (drafts
// included, so the image is ready the day one is published) and every case
// study into public/og/.
// Run with: npm run og-images  (re-run after adding or renaming either)

import { Buffer } from 'node:buffer';
import { mkdirSync } from 'fs';
import sharp from 'sharp';
import { insightsData } from '../src/components/pendo-consultant/pendoInsightsData.js';
import { caseStudiesMeta } from '../src/data/caseStudiesMeta.js';

const W = 1200;
const H = 630;
const PAD = 80;

const escapeXml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function wrap(text, maxChars) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const word of words) {
    if ((line + ' ' + word).trim().length > maxChars && line) {
      lines.push(line.trim());
      line = word;
    } else {
      line = (line + ' ' + word).trim();
    }
  }
  if (line) lines.push(line);
  return lines;
}

// One card layout for both content types: a pink kicker naming the series, the
// headline set as large as it will fit, and the byline rule along the bottom.
function buildSvg({ kicker, title }) {
  let fontSize = 72;
  let lines = wrap(title, 26);
  if (lines.length > 3) {
    fontSize = 56;
    lines = wrap(title, 34);
  }
  const lineHeight = fontSize * 1.15;
  const titleY = 240;

  const titleSpans = lines
    .map((line, i) => `<tspan x="${PAD}" y="${titleY + i * lineHeight}">${escapeXml(line)}</tspan>`)
    .join('');

  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="#282828" />
  <rect x="0" y="0" width="${W}" height="10" fill="#FF3863" />
  <text x="${PAD}" y="130" font-family="Menlo, Consolas, monospace" font-size="26" font-weight="700" letter-spacing="6" fill="#FF3863">${escapeXml(kicker.toUpperCase())}</text>
  <text font-family="Helvetica, Arial, sans-serif" font-size="${fontSize}" font-weight="800" fill="#FFFEFA" letter-spacing="-1">${titleSpans}</text>
  <line x1="${PAD}" y1="${H - 110}" x2="${W - PAD}" y2="${H - 110}" stroke="#555" stroke-width="1" />
  <text x="${PAD}" y="${H - 62}" font-family="Helvetica, Arial, sans-serif" font-size="28" font-weight="700" fill="#FFFEFA" letter-spacing="2">VICTOR BLANCO</text>
  <text x="${W - PAD}" y="${H - 62}" text-anchor="end" font-family="Menlo, Consolas, monospace" font-size="22" fill="#999" letter-spacing="2">victorblancoweb.com</text>
</svg>`;
}

mkdirSync('public/og', { recursive: true });

const cards = [
  // Hub cards for the two index pages, so every route has its own artwork.
  {
    out: 'public/og/work.png',
    kicker: 'Case studies',
    title: 'Web development case studies',
  },
  {
    out: 'public/og/insights.png',
    kicker: 'Pendo Insights',
    title: 'Practical notes from the field',
  },
  ...insightsData.map((article) => ({
    out: `public/og/${article.slug}.png`,
    kicker: `Pendo Insights · ${article.tag}`,
    title: article.title,
  })),
  // Case-study cards: the client name is the recognisable half, so it carries
  // the kicker and the descriptive line takes the headline slot.
  ...caseStudiesMeta.map((study) => ({
    out: `public/og/work-${study.slug}.png`,
    kicker: `Case study · ${study.client}`,
    title: study.cardTitle,
  })),
];

for (const card of cards) {
  await sharp(Buffer.from(buildSvg(card))).png().toFile(card.out);
  console.log(`✅ ${card.out}`);
}
