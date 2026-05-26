

export const servicesHeader = {
  label: 'What I do',
  title: 'Pendo consulting services',
  subtitle: "Whether you need a full Pendo setup for a new SaaS product, an audit of an existing installation, or ongoing consulting — I cover the full stack of Pendo services.",
};


export const ctaData = {
  title: 'Ready to get more from Pendo?',
  subtitle: "Book a free 30-minute call and let's talk about how I can help get the most from your Pendo subscription.",
  primaryButtonText: 'Book a free call',
  secondaryButtonText: 'My Upwork profile',
  primaryButtonLink: 'https://calendly.com/12vblanco/30min',
  secondaryButtonLink: 'https://www.upwork.com/freelancers/victorblanco',
};

export const pageMetadata = {
  title: 'Pendo Consultant | Installation, Audit, Guides & Analytics | Victor Blanco',
  description: 'Certified Pendo consultant expert on installation, audit, creating custom guides, and analytics reporting.',
  canonical: 'https://victorblancoweb.com/pendo-consultant',
};

export const pendoStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Pendo Consulting Services",
  "description": "Certified Pendo consultant offering installation, audit, custom guides, onboarding flows, and analytics reporting for SaaS teams.",
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
  },
  "review": {
    "@type": "Review",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "5",
      "bestRating": "5"
    },
    "author": {
      "@type": "Person",
      "name": "Renee C."
    },
    "reviewBody": "Victor has been working on our Pendo account for a month, and he did a full audit of our initial installation and got us up to speed. We are now working on creating guides and a reporting dashboard, and are excited to see the analytics behind the improvements.",
    "publisher": {
      "@type": "Organization",
      "name": "The PUSH Agency"
    }
  }
};