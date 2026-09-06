import { LINKS } from "./siteConfig.js";

/* One source of truth for every published case study's search and social
   metadata. Consumed by the case-study pages themselves, the /work hub, the
   "More work" block at the foot of each study, the OG card generator
   (scripts/og-images.js) and scripts/prerender.js (routes + sitemap), so a
   study's dates and copy can never disagree between the page, the card, the
   structured data and the sitemap.

   Ordered newest first: that is the order the /work hub renders.

   Titles are kept at or under ~60 characters and descriptions at or under ~158
   so neither is truncated in a Google result. `tag` is the kicker printed on
   the generated OG card. */

export const caseStudiesMeta = [
  {
    slug: "sujin-kim",
    client: "Sujin Kim",
    tag: "React 19",
    title: "Sujin Kim: Designer Portfolio Case Study | Victor Blanco",
    description:
      "How a graphic designer's portfolio became a gallery in React 19: three rooms instead of pages and a career archive walked one scroll per year.",
    ogTitle: "Sujin Kim: a designer's portfolio built as a gallery",
    headline: "Sujin Kim: a designer's portfolio built as a gallery",
    schemaDescription:
      "A case study on building a graphic designer's portfolio in React 19 as three rooms rather than pages, with a career archive walked one scroll per year and a hero of canvas particles that scatter under the cursor.",
    cardTitle: "A designer's portfolio built as a gallery",
    cardIntro:
      "Three rooms instead of pages, a career archive walked one scroll per year, and a hero of canvas particles that scatter under the cursor.",
    datePublished: "2026-08-16",
    dateModified: "2026-08-16",
    year: "2025",
  },
  {
    slug: "orders-made-simple",
    client: "Orders Made Simple",
    tag: "HubSpot",
    title: "Orders Made Simple: SaaS Redesign Case Study | Victor Blanco",
    description:
      "How a B2B SaaS marketing site that had drifted into looking like everyone else got its identity back, rebuilt on a 39-token design system in HubSpot.",
    ogTitle: "Orders Made Simple: SaaS marketing site redesign case study",
    headline: "Orders Made Simple: SaaS marketing site redesign",
    schemaDescription:
      "A case study on rebuilding a B2B hospitality-procurement marketing site whose identity had drifted, using hand-written HTML, CSS and JavaScript injected into HubSpot and a 39-token design system.",
    cardTitle: "A SaaS marketing site that got its identity back",
    cardIntro:
      "A B2B site that had drifted into looking like everyone else, rebuilt as a 39-token design system in hand-written code inside HubSpot.",
    datePublished: "2026-08-02",
    dateModified: "2026-08-02",
    year: "2025 - 2026",
  },
  {
    slug: "lm-douglas",
    client: "L.M. Douglas",
    tag: "Vue 3",
    title: "L.M. Douglas: Vue Author Website Case Study | Victor Blanco",
    description:
      "How a two-book promotional site became a Vue 3 author platform with an interactive world map, a data-driven catalogue and a free-novella mailing list.",
    ogTitle: "L.M. Douglas: author platform design & build case study",
    headline: "L.M. Douglas: author platform design & build",
    schemaDescription:
      "A case study on growing a fantasy author's site from a two-book promotional page into a Vue 3 saga's hub with an interactive realm map, a status-tagged catalogue and a MailerLite lead-magnet funnel.",
    cardTitle: "A two-book site grown into an author platform",
    cardIntro:
      "An interactive realm map, a status-tagged catalogue and a free-novella funnel, built in Vue 3 for a fantasy saga.",
    datePublished: "2026-08-01",
    dateModified: "2026-08-01",
    year: "2024",
  },
  {
    slug: "the-orchard-bar",
    client: "The Orchard Bar",
    tag: "React + TypeScript",
    title: "The Orchard Bar: React Website Case Study | Victor Blanco",
    description:
      "How a dated WordPress site became a fast, bespoke React site with online booking and self-updating menus, plus a client relationship retained since 2020.",
    ogTitle: "The Orchard Bar: website design & build case study",
    headline: "The Orchard Bar: website design, build & maintenance",
    schemaDescription:
      "A case study on rebuilding The Orchard Bar, an Edinburgh bar & restaurant, from a dated WordPress theme into a fast bespoke React site with online booking and self-updating menus.",
    cardTitle: "A dated WordPress site rebuilt in React",
    cardIntro:
      "Online booking, self-updating seasonal menus and a design that matches the venue, for a client retained since 2020.",
    datePublished: "2026-06-29",
    dateModified: "2026-07-05",
    year: "2026",
  },
];

/* Lookup helpers. `caseStudyPath` is the single place the /work/<slug> URL
   shape is written, so changing it changes every link, canonical and sitemap
   entry at once. */
export const caseStudyPath = (slug) => `/work/${slug}`;
export const caseStudyUrl = (slug) => `${LINKS.site}${caseStudyPath(slug)}`;
export const caseStudyOgImage = (slug) => `${LINKS.site}/og/work-${slug}.png`;

export const getCaseStudyMeta = (slug) =>
  caseStudiesMeta.find((s) => s.slug === slug);

/* The other studies, in hub order, for the "More work" block. */
export const otherCaseStudies = (slug) =>
  caseStudiesMeta.filter((s) => s.slug !== slug);
