/* Article + BreadcrumbList JSON-LD for a case-study page. Every study describes
   the same author and sits at the same depth under Work, so only the parts that
   actually differ are arguments. */

import { LINKS } from "../../data/siteConfig";

const AUTHOR = {
  "@type": "Person",
  name: "Victor Blanco",
  url: LINKS.site,
  jobTitle: "Freelance Web Developer",
  sameAs: [LINKS.github, LINKS.upwork, LINKS.dribbble],
};

/* `crumb` is the study's name in the breadcrumb trail; `about` is an optional
   schema.org node for the client (Restaurant, Organization, Person...).
   Returns the array the <SEO> component's structuredData prop expects. */
export const caseStudySchemas = ({
  headline,
  description,
  canonical,
  datePublished,
  dateModified,
  crumb,
  about,
}) => [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url: canonical,
    inLanguage: "en-GB",
    datePublished,
    dateModified,
    author: AUTHOR,
    ...(about ? { about } : {}),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: LINKS.site },
      {
        "@type": "ListItem",
        position: 2,
        name: "Work",
        item: `${LINKS.site}/#works`,
      },
      { "@type": "ListItem", position: 3, name: crumb, item: canonical },
    ],
  },
];
