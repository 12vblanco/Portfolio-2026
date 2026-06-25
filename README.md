# victorblancoweb.com

Personal portfolio and freelance consulting site for **Victor Blanco** — an Edinburgh-based frontend developer, designer, and certified Pendo consultant.

It started as an animated React single-page app and grew into a **build-time prerendered (SSG) site** with a small data-driven content engine for technical articles, all deployed as flat static files on Netlify.

🌐 **Live:** [victorblancoweb.com](https://victorblancoweb.com)

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Routing | React Router 7 |
| Build tool | Vite 7 |
| Styling | styled-components 6 (with SSR via `ServerStyleSheet`) |
| Animation | GSAP 3 (`ScrollTrigger`, `ScrambleText`) + `@gsap/react` |
| Charts | Chart.js 4 |
| Icons | lucide-react + hand-built SVGs |
| Head / meta | react-helmet-async |
| Image tooling | sharp (build-time Open Graph card generation) |
| Hosting | Netlify |
| Analytics | GA4 + Pendo (consent-gated) |

No CSS framework and no UI library — every component and animation is bespoke.

---

## Features

- **Build-time prerendering (SSG):** Every route is rendered to a real static HTML file at build time, so crawlers and social scrapers get full content and meta tags with zero JavaScript required.
- **Data-driven content engine:** new `/insights` articles are added as a single object in one data file and automatically become a card, a full article page, a sitemap entry, an Open Graph card and JSON-LD — with support for figures, code blocks, tables, step lists, pull quotes and an interactive analytics dashboard.
- **Rich structured data:** JSON-LD for `Person`, `ProfessionalService`, `Service`, `FAQPage`, `BlogPosting`, `BreadcrumbList`, `ItemList`, `CollectionPage` and `WebSite`.
- **Auto-generated `sitemap.xml`** built from the same route list as the prerenderer, so the two can never drift.
- **Build-time OG images:** a branded 1200×630 card is generated per article from SVG via sharp.
- **Consent-gated analytics:** no third-party scripts load until the visitor accepts cookies.
- **GSAP animations:** scroll-triggered reveals, a horizontal case-studies carousel, scramble-text headings, and a floating certification-badge cluster.
- **Pure-SVG/CSS article figures** so charts and diagrams prerender into static HTML with no client charting library.
- **Performance-minded assets:** self-hosted WOFF2 fonts (preloaded), WebP imagery, lazy-loaded video, immutable caching on hashed assets.
- **Fully responsive** with `prefers-reduced-motion` support.

---

## Pages

| Route | Description |
|---|---|
| `/` | Homepage — hero, case-study carousel, experience, testimonials, insights strip, contact |
| `/pendo-consultant` | Landing page for Pendo consulting services (services, certifications, FAQ, insights) |
| `/insights` | Indexable hub listing all published articles |
| `/insights/:slug` | Full article pages (the content engine) |
| `*` | Real `404.html` (a true 404 status, not a soft-404) |

---

## How it's built

The interesting part of this project is the rendering pipeline. It's a normal React SPA in development, but the production build does three things in sequence (see the `build` script):

1. **`vite build`** — the usual client bundle.
2. **`vite build --ssr src/entry-server.jsx`** — a server build that can `renderToString` any route.
3. **`node scripts/prerender.js`** — walks a list of routes, renders each to HTML, injects the head tags and critical styled-components CSS, and writes a **flat file** per route (`pendo-consultant.html`, `insights/<slug>.html`). The same route list generates `sitemap.xml`.

A few deliberate decisions:

- **Flat files, not `dir/index.html`.** Directory-style output made Netlify 301-redirect `/page` → `/page/`, which had been hurting indexing. Flat files serve clean URLs directly.
- **No SPA catch-all redirect.** Every real route is prerendered, so unknown paths correctly serve a real `404` instead of soft-404ing with the homepage.
- **React 19 + react-helmet-async quirk.** Under React 19, helmet's server context isn't populated and head tags come out as hoistable elements at the *start* of the rendered markup. The prerenderer extracts that leading run of `<title>/<meta>/<link>` into `<head>` (marked `data-prerender`), and the client strips those on mount so React's own managed tags win after navigation.
- **`styled-components` SSR** via `ServerStyleSheet` so the static HTML ships with the styles it needs, no flash of unstyled content.

```bash
src/
├── entry-server.jsx          # renderToString entry used by the prerenderer
├── main.jsx                  # client entry (hydrates, strips prerender head tags)
├── App.jsx                   # routes
├── components/
│   ├── common/               # SEO, Contact, ConsentBanner, Hero primitives…
│   ├── navigation/
│   ├── home-section/         # hero, case studies, testimonials, insights strip
│   ├── pendo-consultant/     # services, expert/certs, article figures, data
│   └── pages/                # HomePage, PendoConsultantPage, InsightsIndexPage…
├── data/ · hooks/ · styles/ · utils/
scripts/
├── prerender.js              # SSG + sitemap generation
└── og-images.js              # build-time Open Graph cards (sharp)
```

---

## Getting started

**Prerequisites:** Node 20+ and npm.

```bash
git clone https://github.com/12vblanco/Portfolio-2026.git
cd Portfolio-2026
npm install
npm run dev          # http://localhost:5173
```

| Script | What it does |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | Client build → SSR build → prerender to `/dist` (deploy-ready) |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint |
| `npm run og-images` | Regenerate `/public/og/<slug>.png` after adding/renaming articles |

---

## What I learned

- **Client-side meta tags aren't enough for SEO.** The site originally set titles and descriptions at runtime with react-helmet; crawlers and social scrapers saw an empty shell. Moving to build-time prerendering was the single biggest fix.
- **React 19 changed how head tags render.** Tracking down why helmet's server output was empty (hoistable head elements) taught me a lot about how React 19 handles `<title>`, `<meta>` and `<link>`.
- **Host routing matters.** Netlify's `/page` → `/page/` redirect on directory output, and soft-404s from an SPA catch-all, were quietly costing indexation — invisible in the browser, obvious in Search Console.
- **Don't fake content for crawlers.** An early version used a hidden offscreen keyword block as a "Googlebot fallback." That's a spam-policy risk; the right answer was to prerender the *real* content instead. I removed it.
- **A small content model pays off.** Driving cards, pages, the sitemap, OG images and structured data from one data file keeps everything in sync and makes publishing a new article a one-line change.
- **Measure, don't assume.** Pairing the build with Google Search Console + Screaming Frog turned SEO from guesswork into a before/after I could actually verify.

---

## What could be improved

- **Bundle size.** The main client chunk is large (Chart.js and GSAP are heavy). The analytics dashboard and charting could be code-split / lazy-loaded so only the aggregation article pays for them.
- **A couple of pre-existing lint warnings** in the hero CTA (`react-hooks/refs`) are worth refactoring.
- **No automated tests** yet — at minimum a smoke test that every prerendered route emits a unique `<title>` and canonical.
- **OG image regeneration is manual** (`npm run og-images`); it could run automatically as part of the build.
- **GSAP plugins are registered eagerly**; they could be imported on demand per page.

---

## Future releases

- More `/insights` articles to build out the Pendo topical cluster (several drafts queued).
- Pagination and tag filtering on the `/insights` hub as the article count grows.
- Automated OG-card generation wired into the build step.
- An RSS feed for the insights section.
- A Lighthouse/performance budget in CI, plus the code-splitting above.
- Evaluate moving the SSG pipeline onto a framework with first-class static generation (e.g. Astro) if the custom prerenderer outgrows its usefulness.

---

## Contact

**Victor Blanco** — Edinburgh, Scotland

- 🌐 [victorblancoweb.com](https://victorblancoweb.com)
- 📅 Book a call (https://calendly.com/12vblanco/30min)




https://github.com/user-attachments/assets/6514ac13-2721-4a5c-b415-ee82a2d0eaa4



---

## Licence

Personal project — see [`LICENSE`](LICENSE). Feel free to take inspiration from the engineering, but please don't clone or repurpose the design or written content directly.
