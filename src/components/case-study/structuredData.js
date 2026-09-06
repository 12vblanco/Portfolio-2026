/* Article + BreadcrumbList JSON-LD for a case-study page. Every study describes
   the same author and sits at the same depth under Work, so only the parts that
   actually differ are arguments. */

import { BRAND, LINKS } from "../../data/siteConfig";

const AUTHOR = {
  "@type": "Person",
  name: "Victor Blanco",
  url: LINKS.site,
  image: BRAND.logo,
  jobTitle: "Freelance Web Developer",
  sameAs: [LINKS.github, LINKS.upwork, LINKS.dribbble],
};

/* Article.publisher.logo is where Google reads a publisher logo, and `logo` is
   only valid on an Organization, so the publisher is the business entity even
   though the author is the person. */
const PUBLISHER = {
  "@type": "Organization",
  name: BRAND.name,
  url: LINKS.site,
  logo: { "@type": "ImageObject", url: BRAND.logo, width: 512, height: 512 },
};

/* `crumb` is the study's name in the breadcrumb trail; `about` is an optional
   schema.org node for the client (Restaurant, Organization, Person...);
   `image` is the study's OG card, which Google lists as a recommended Article
   property and warns about when missing.
   Returns the array the <SEO> component's structuredData prop expects. */
export const caseStudySchemas = ({
  headline,
  description,
  canonical,
  datePublished,
  dateModified,
  crumb,
  about,
  image,
}) => [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url: canonical,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    ...(image ? { image } : {}),
    inLanguage: "en-GB",
    datePublished,
    dateModified,
    author: AUTHOR,
    publisher: PUBLISHER,
    ...(about ? { about } : {}),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: LINKS.site },
      // A real /work hub, not the old /#works fragment: a fragment resolved to
      // the same URL as position 1, which made the trail degenerate.
      {
        "@type": "ListItem",
        position: 2,
        name: "Work",
        item: `${LINKS.site}/work`,
      },
      { "@type": "ListItem", position: 3, name: crumb, item: canonical },
    ],
  },
];
