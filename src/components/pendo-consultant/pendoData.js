

export const featuresData = [
  {
    number: '01',
    title: 'Installation & Setup',
    before: 'Full Pendo installation for SaaS products by a ',
    link: 'pendo certified consultant',
    after: ': snippet deployment, data layer configuration, and account structure set up correctly from day one so everything downstream is reliable.',
  },
  {
    number: '02',
    title: 'Audit & Gap Analysis',
    before: 'Comprehensive audit of your existing Pendo installation. I identify ',
    link: 'pendo tracking gaps',
    after: ', redundant or broken tags, misconfigured funnels, and deliver a prioritised action list to get your data trustworthy again.',
  },
  {
    number: '03',
    title: 'Guides, Onboarding & User Flows',
    before: 'From tooltips to multi-step onboarding flows and announcements, I build ',
    link: 'fully customised guides',
    after: ' that match your brand and move users toward key activation actions.',
  },
  {
    number: '04',
    title: 'Analytics, Dashboards & Custom Reporting',
    before: 'Dashboards, funnels, NPS reports and retention analytics inside Pendo, plus ',
    link: 'custom dashboards built on the Aggregation API',
    after: ' with secured keys, scheduled refreshes and alerting when a pipeline stops returning data.',
  },
  {
    number: '05',
    title: 'AI & MCP Enablement',
    before: 'Setup and governance of the ',
    link: 'Pendo MCP server',
    after: ' so your team can query live product data from Claude or ChatGPT: client rollout, read-only defaults, service accounts with a named owner, and verification that the data underneath is worth querying.',
  },
];

import { LINKS } from '../../data/siteConfig';
import { publishedInsights } from './pendoInsightsData';

export const ctaData = {
  title: 'Ready to get more from Pendo?',
  subtitle: "Book a free 30-minute call and let's talk about how I can help get the most from your Pendo subscription.",
  primaryButtonText: 'Book a free call',
  secondaryButtonText: 'My Upwork profile',
  primaryButtonLink: LINKS.calendly,
  secondaryButtonLink: LINKS.upwork,
};

export const pageMetadata = {
  title: 'Certified Pendo Consultant Edinburgh | Victor Blanco',
  description: 'Certified Pendo consultant for SaaS teams: installation, audits, in-app guides, Aggregation API dashboards and MCP setup. Edinburgh-based, worldwide.',
  canonical: 'https://victorblancoweb.com/pendo-consultant',
  ogTitle: 'Pendo Consultant | Victor Blanco',
  ogDescription: 'Certified Pendo consultant helping SaaS teams install Pendo correctly, fix broken setups, build in-app guides, create live dashboards on the Aggregation API, and set up the Pendo MCP server.',
  ogImage: 'https://victorblancoweb.com/og-image-pendo.png',
  ogImageWidth: 2928,
  ogImageHeight: 1636,
};

export const pendoStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Pendo Consulting Services",
  "description": "Certified Pendo consultant helping SaaS teams get more from their subscription. Installation, audits, custom guides, analytics reporting, Aggregation API dashboards, and Pendo MCP setup.",
  "url": "https://victorblancoweb.com/pendo-consultant",
  "provider": {
    "@type": "Person",
    "name": "Victor Blanco",
    "url": "https://victorblancoweb.com",
    "jobTitle": "Certified Pendo Consultant",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Edinburgh",
      "addressCountry": "GB"
    },
    "sameAs": [
      "https://github.com/12vblanco",
      "https://www.upwork.com/freelancers/victorblanco",
      "https://www.credly.com/users/victor-blanco.4783f91c"
    ]
  },
  "areaServed": "Worldwide",
  "serviceType": [
    "Pendo Installation & Setup",
    "Pendo Audit & Optimisation",
    "Pendo Guides & Onboarding",
    "Pendo Analytics, Dashboards & Custom Reporting",
    "Pendo AI & MCP Enablement"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Pendo Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Pendo Installation & Setup",
          "description": "Full Pendo installation by a certified Pendo Admin. Account setup done right so everything downstream is reliable."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Pendo Audit & Optimisation",
          "description": "Audit of existing Pendo installations identifying gaps in tracking coverage, broken tags, and a prioritised list of improvements."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Guides, Onboarding & User Flows",
          "description": "Custom Pendo guides from tooltips to multi-step onboarding flows and announcements, matched to your brand."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Analytics, Dashboards & Custom Reporting",
          "description": "Pendo dashboards, funnels, and reports that surface actionable data, plus custom reporting built on the Pendo Aggregation API with secured keys, scheduled refreshes, and alerting."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI & MCP Enablement",
          "description": "Setup and governance of the Pendo MCP server so teams can query live product data from Claude or ChatGPT, including client rollout, read-only defaults, and service accounts for automation."
        }
      }
    ]
  }
};

export const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does a Pendo consultant do?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Pendo consultant helps SaaS companies install, audit, and optimise their Pendo setup. This includes configuring the Pendo snippet, building in-app guides and onboarding flows, setting up analytics dashboards, and fixing broken or incomplete tracking."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer a free initial consultation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. I offer a free 30-minute call to discuss your Pendo setup, goals, and how I can help. You can book directly via Calendly."
      }
    },
    {
      "@type": "Question",
      "name": "Are you a certified Pendo expert?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. I hold multiple Pendo certifications including Pendo Admin and Pendo for Product. I have worked with SaaS teams on Pendo implementation, auditing, and optimisation."
      }
    },
    {
      "@type": "Question",
      "name": "Do you work with clients outside Edinburgh?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. I work with SaaS companies worldwide. All consulting is done remotely, so location is no barrier. I am based in Edinburgh, Scotland, UK."
      }
    },
    {
      "@type": "Question",
      "name": "What is included in a Pendo audit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Pendo audit covers your full installation: snippet configuration, event tracking coverage, funnel setup, guide performance, data layer quality, and account structure. You will receive a prioritised action list of what to fix and how."
      }
    },
    {
      "@type": "Question",
      "name": "Can you build custom dashboards from Pendo data?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Beyond Pendo's built-in dashboards, I build custom reporting on the Pendo Aggregation API: pipelines for adoption, stickiness and guide funnels, wired to a scheduled refresh and a chart layer so the report stays live instead of relying on someone running a CSV export."
      }
    },
    {
      "@type": "Question",
      "name": "Can you set up the Pendo MCP server?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. That covers enabling AI access in your subscription settings, connecting clients such as Claude, ChatGPT or Cursor, keeping the write tools off by default, and setting up service accounts where something needs to run on a schedule. I verify the underlying tagging first, because an AI client answers confidently whether or not the data behind it is correct."
      }
    }
  ]
};

// Derived from publishedInsights so the ItemList can never drift from the
// articles actually live on the page (and in the sitemap/prerender routes).
export const insightsStructuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": publishedInsights.map((item, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "name": item.title,
    "url": `https://victorblancoweb.com/insights/${item.slug}`,
  })),
};