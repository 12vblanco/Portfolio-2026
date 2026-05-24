// pendoInsightsData.js
// Add new articles here they render automatically in the PendoInsights section.
// Each entry supports: tag, title, name, date, read, subtitle, body, quote, pills.
// Set dashboard: true on any entry to render the PendoAnalyticsDashboard inside
// the expanded body, below the article text.

export const insightsHeader = {
  label: 'Pendo Insights',
  title: 'From the field',
  subtitle: 'Real-world notes on Pendo installation, auditing, and getting the most out of product analytics.',
};

export const insightsData = [
  {
    tag: 'Pendo Audit',
    title: 'Pendo installation audit: what it covers and what you get',
    name: 'Victor Blanco - Pendo consultant',
    date: 'April 2026',
    read: '5 min read',
    pills: ['Pendo audit', 'Pendo installation', 'Event Tracking', 'SaaS onboarding', 'Product analytics', 'Page Tracking'],
    subtitle: "Most SaaS teams install Pendo once and consider it done. A structured audit finds if there is something broken, before you build anything on top of it and the data does not add up.",
    quote: "'Victor did a full audit of our initial Pendo installation and got us up to speed. We are now working on creating guides and a reporting dashboard, and are excited to see the analytics behind the improvements.' Renee C, The PUSH Agency",
    body: [
      "Often, after installation, the assumption is that the data is flowing correctly but sometimes isn't. A Pendo installation audit is the process of finding out exactly what is and isn't working, before you build dashboards, onboarding flows, or business decisions on top of a foundation you've never verified.",
      "The audit covers four areas. First, technical installation health: the snippet needs to be present on every route, firing consistently, and identifying visitors correctly. In React apps, the snippet can end up conditionally rendered meaning entire user segments never load the agent, silently dropping sessions with no alert.",
      "Second, feature tagging quality. Selectors built on positional references like nth-child, or broad attribute selectors, silently break after frontend updates. The audit reviews every tag for selector stability, data integrity, and naming consistency and flags features recording zero data for investigation.",
      "Third, segmentation and metadata. The most critical gap in almost every DIY setup: internal users are not excluded from analytics, inflating every engagement metric the product team reports on. Without clean segments, you can't target guides, filter reports by account type, or build a meaningful onboarding flow.",
      "Finally, guide configuration. Common issues include walkthroughs split across separate guides instead of configured as steps, throttling left off so users see the same guide repeatedly, and CTAs limited to dismiss which produces no measurable engagement signal.",
      "The output is a structured report covering every finding, its impact on data reliability, and the exact steps to fix it ordered by priority. Most teams go from uncertainty about their Pendo data to a clear, sequenced remediation plan in under a week.",
    ],
  },

  {
    tag: 'Pendo Analytics',
    title: 'What your Pendo click data tells you and how to utilize the Aggregation API',
    name: 'Victor Blanco - Pendo consultant',
    date: 'May 2026',
    read: '4 min read',
    pills: ['Pendo analytics', 'Click events', 'Feature adoption', 'Product analytics', 'Reporting dashboard', 'Pendo API'],
    subtitle: "Click events are Pendo's most granular data but raw counts without context are just noise. As well as building dashboards in Pendo and downloading CSV files with all shorts of events and click data, you can also utilize the integration API key to produce your own customized dashboard with live data",
    quote: "",
    body: [
      "The dashboard below is a working example of what this kind of reporting looks like when built directly on the Pendo Aggregation API. It pulls click events by feature, visitor, and account with a daily trend line, feature share breakdown, and a full event log. If you want this built for your product, connected to your live Pendo data, that's a service I offer.",
    ],
    // Setting dashboard: true renders PendoAnalyticsDashboard inside this card when expanded.
    dashboard: true,
  },
];