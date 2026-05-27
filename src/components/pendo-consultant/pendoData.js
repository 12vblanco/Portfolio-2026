

export const servicesHeader = {
  label: 'What I do',
  title: 'Pendo consulting services',
  subtitle: "Whether you need a full Pendo setup for a new SaaS product, an audit of an existing installation, or ongoing consulting,  I cover the full stack of Pendo services.",
};

export const featuresData = [
  {
    number: '01',
    title: 'Installation & Setup',
    before: 'Full Pendo installation for SaaS products by a ',
    link: 'pendo certified consultant',
    after: ' — snippet deployment, data layer configuration, and account structure set up correctly from day one so everything downstream is reliable.',
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
    title: 'Analytics, Dashboards & Reporting',
    before: 'Dashboards, funnels, NPS reports, and retention analytics that surface what actually matters. ',
    link: 'Data you can act on',
    after: ' to build effective products.',
  },
];

import { LINKS } from '../../data/siteConfig';

export const ctaData = {
  title: 'Ready to get more from Pendo?',
  subtitle: "Book a free 30-minute call and let's talk about how I can help get the most from your Pendo subscription.",
  primaryButtonText: 'Book a free call',
  secondaryButtonText: 'My Upwork profile',
  primaryButtonLink: LINKS.calendly,
  secondaryButtonLink: LINKS.upwork,
};

export const pageMetadata = {
  title: 'Pendo Consultant | Installation, Audit, Guides & Analytics | Victor Blanco',
  description: 'Certified freelance Pendo consultant helping SaaS teams with Pendo installation, audits, in-app guides, and product analytics reporting. Based in Edinburgh, available worldwide.',
  canonical: 'https://victorblancoweb.com/pendo-consultant',
  ogTitle: 'Pendo Consultant | Victor Blanco',
  ogDescription: 'Certified Pendo consultant helping SaaS teams install Pendo correctly, fix broken setups, build in-app guides, and create product analytics dashboards that actually get used.',
  ogImage: 'https://victorblancoweb.com/og-image-pendo.png',
};

export const pendoStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Pendo Consulting Services",
  "description": "Certified Pendo consultant helping SaaS teams get more from their subscription. Installation, audits, custom guides, and analytics reporting.",
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
    "Pendo Analytics & Reporting"
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
          "name": "Analytics & Reporting",
          "description": "Pendo dashboards, funnels, and reports that surface actionable data to build effective products."
        }
      }
    ]
  }
};

export const insightsStructuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Article",
        "headline": "Pendo installation audit: what it covers and what you get",
        "description": "Most SaaS teams install Pendo once and consider it done. A structured audit finds if there is something broken, before you build anything on top of it.",
        "author": {
          "@type": "Person",
          "name": "Victor Blanco",
          "url": "https://victorblancoweb.com"
        },
        "publisher": {
          "@type": "Person",
          "name": "Victor Blanco",
          "url": "https://victorblancoweb.com"
        },
        "datePublished": "2026-04-01",
        "url": "https://victorblancoweb.com/pendo-consultant#insights",
        "keywords": ["Pendo audit", "Pendo installation", "SaaS onboarding", "Product analytics"]
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Article",
        "headline": "What your Pendo click data tells you and how to utilize the Aggregation API",
        "description": "Click events are Pendo's most granular data but raw counts without context are just noise.",
        "author": {
          "@type": "Person",
          "name": "Victor Blanco",
          "url": "https://victorblancoweb.com"
        },
        "publisher": {
          "@type": "Person",
          "name": "Victor Blanco",
          "url": "https://victorblancoweb.com"
        },
        "datePublished": "2026-05-01",
        "url": "https://victorblancoweb.com/pendo-consultant#insights",
        "keywords": ["Pendo analytics", "Click events", "Feature adoption", "Pendo API"]
      }
    }
  ]
};