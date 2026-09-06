// Generates the VB brand mark at the sizes Google, browsers and iOS ask for:
// a 512px logo for schema.org Organization.logo, a 192px favicon (Google wants
// a square multiple of 48) and a 180px apple-touch-icon.
// Run with: npm run brand-icons  (re-run only when the mark itself changes)

import { Buffer } from 'node:buffer';
import { mkdirSync } from 'fs';
import sharp from 'sharp';

// Same three brand values the OG cards use, so the mark and the cards match.
const INK = '#282828';
const PAPER = '#FFFEFA';
const ACCENT = '#FF3863';

// The mark is drawn once on a 512 grid, then rasterised down to each size.
const G = 512;

// Solid ink ground rather than the old transparent one: a transparent favicon
// with dark letters disappears in a dark browser tab.
// Solid ink ground rather than the old transparent one: a transparent favicon
// with dark letters disappears in a dark browser tab. "VB" and the accent
// square are positioned as one group so the pair sits centred on the grid.
const markSvg = `<svg width="${G}" height="${G}" viewBox="0 0 ${G} ${G}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${G}" height="${G}" fill="${INK}" />
  <text x="42" y="353"
        font-family="Helvetica, Arial, sans-serif" font-size="270" font-weight="800"
        letter-spacing="-16" fill="${PAPER}">VB</text>
  <rect x="412" y="295" width="58" height="58" fill="${ACCENT}" />
</svg>`;

const OUTPUTS = [
  ['public/logo.png', 512],
  ['public/favicon-192.png', 192],
  ['public/apple-touch-icon.png', 180],
];

mkdirSync('public', { recursive: true });

for (const [out, size] of OUTPUTS) {
  await sharp(Buffer.from(markSvg)).resize(size, size).png().toFile(out);
  console.log(`✅ ${out} (${size}x${size})`);
}
