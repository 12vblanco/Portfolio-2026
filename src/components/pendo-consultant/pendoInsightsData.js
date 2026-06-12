// pendoInsightsData.js
// Add new articles here; they render automatically as cards in the PendoInsights
// section and as full pages at /insights/<slug>.
// Each entry supports: slug, tag, title, name, date, read, subtitle, pills,
// meta (title/description for the article page <head>), datePublished,
// dateModified, sections, quote.
// Each section supports: heading, paragraphs, and optionally
//   figure: key into ARTICLE_FIGURES (see ArticleFigures.jsx)
//   list:   [{ term, text }] definition-style bullets
//   steps:  [{ label, text }] numbered process rows
//   table:  { head: [], rows: [[]] }
//   code:   { title, content } dark code block
// Set dashboard: true on any entry to render the PendoAnalyticsDashboard at the
// end of its article page.

export const insightsHeader = {
  label: "Pendo Insights",
  title: "From the field",
  subtitle:
    "Real-world notes on Pendo installation, auditing, and getting the most out of product analytics.",
};

export const insightsData = [
  {
    slug: "pendo-installation-audit",
    tag: "Pendo Audit",
    title: "Pendo installation audit: what it covers and what you get",
    name: "Victor Blanco - Pendo consultant",
    date: "April 2026",
    datePublished: "2026-04-01",
    dateModified: "2026-06-12",
    read: "6 min read",
    pills: [
      "Pendo audit",
      "Pendo installation",
      "Event Tracking",
      "SaaS onboarding",
      "Product analytics",
      "Page Tracking",
    ],
    subtitle:
      "Most SaaS teams install Pendo once and consider it done. A structured audit finds if there is something broken, before you build anything on top of it and the data does not add up.",
    meta: {
      title: "Pendo Installation Audit: What It Covers | Victor Blanco",
      description:
        "What a Pendo installation audit covers: snippet health, feature tagging, segmentation and guide configuration, plus the prioritised remediation report you get at the end.",
    },
    quote:
      "'Victor did a full audit of our initial Pendo installation and got us up to speed. We are now working on creating guides and a reporting dashboard, and are excited to see the analytics behind the improvements.' Renee C, The PUSH Agency",
    sections: [
      {
        heading: null,
        paragraphs: [
          "Often, after installation, the assumption is that the data is flowing correctly but sometimes isn't. A Pendo installation audit is the process of finding out exactly what is and isn't working, before you build dashboards, onboarding flows, or business decisions on top of a foundation you've never verified.",
          "The cost of skipping this step is rarely visible straight away. Broken tracking doesn't throw errors. It quietly produces numbers that look plausible and are wrong. Teams then spend months debating product decisions backed by inflated adoption figures or sessions that were never recorded. The audit covers four areas.",
        ],
        figure: "auditAreas",
      },
      {
        heading: "Technical installation health",
        paragraphs: [
          "The snippet needs to be present on every route, firing consistently, and identifying visitors correctly. In React apps, the snippet can end up conditionally rendered meaning entire user segments never load the agent, silently dropping sessions with no alert.",
          "Identity is the other half. Anonymous visitors who should be identified, visitor IDs that change between sessions, and accounts that never get mapped all fragment your data: the same human shows up as three different visitors, and account-level reporting becomes guesswork. The audit verifies the identify calls against how your authentication actually behaves, including edge cases like SSO redirects and embedded views.",
        ],
      },
      {
        heading: "Feature tagging quality",
        paragraphs: [
          "Selectors built on positional references like nth-child, or broad attribute selectors, silently break after frontend updates. The audit reviews every tag for selector stability, data integrity, and naming consistency and flags features recording zero data for investigation.",
          "Naming matters more than teams expect. When tags are named after CSS classes or sprint tickets instead of what users actually do, every report needs a translator. Part of the audit output is a naming convention your whole team can read without asking the person who created the tags.",
        ],
      },
      {
        heading: "Segmentation and metadata",
        paragraphs: [
          "The most critical gap in almost every DIY setup: internal users are not excluded from analytics, inflating every engagement metric the product team reports on. Without clean segments, you can't target guides, filter reports by account type, or build a meaningful onboarding flow.",
          "Segments are only as good as the metadata behind them. The audit checks which visitor and account fields are actually being sent (plan tier, role, signup date, account owner) and which reports and guides depend on fields that are empty or stale. This area is where I find the most issues, by a distance.",
        ],
        figure: "auditIssueBars",
      },
      {
        heading: "Guide configuration",
        paragraphs: [
          "Common issues include walkthroughs split across separate guides instead of configured as steps, throttling left off so users see the same guide repeatedly, and CTAs limited to dismiss which produces no measurable engagement signal. A guide that annoys users is worse than no guide, and without engagement CTAs you can't even tell which ones are annoying.",
        ],
      },
      {
        heading: "How the audit runs",
        paragraphs: [
          "The whole process takes about a week and needs very little of your team's time: read-only admin access and one call at the end.",
        ],
        steps: [
          {
            label: "Day 1",
            text: "Access and context: read-only Pendo admin, a quick walkthrough of your product, and your top three questions about the data.",
          },
          {
            label: "Days 2–4",
            text: "Full review of the four areas: snippet and identity, every feature and page tag, segments and metadata, and all live guides.",
          },
          {
            label: "Day 5",
            text: "Written report delivered, then a walkthrough call to go through the findings and agree what gets fixed first.",
          },
        ],
      },
      {
        heading: "What you get",
        paragraphs: [
          "The output is a structured report covering every finding, its impact on data reliability, and the exact steps to fix it ordered by priority. Most teams go from uncertainty about their Pendo data to a clear, sequenced remediation plan in under a week. A few examples of what findings look like in practice:",
        ],
        table: {
          head: ["Sample finding", "Why it matters", "Priority"],
          rows: [
            [
              "Internal users included in all dashboards",
              "Every engagement metric inflated; decisions made on noise",
              "P0",
            ],
            [
              "Snippet not loading on two product areas",
              "Sessions silently dropped for entire user journeys",
              "P0",
            ],
            [
              "12 features tagged with positional selectors",
              "Tags will break on the next UI change, creating data gaps",
              "P1",
            ],
            [
              "Onboarding split across six separate guides",
              "No funnel view, so it's impossible to see where users drop off",
              "P2",
            ],
          ],
        },
      },
    ],
  },

  {
    slug: "pendo-click-data-aggregation-api",
    tag: "Pendo Analytics",
    title:
      "What your Pendo click data tells you and how to utilize the Aggregation API",
    name: "Victor Blanco - Pendo consultant",
    date: "June 2026",
    datePublished: "2026-05-01",
    dateModified: "2026-06-12",
    read: "6 min read",
    pills: [
      "Pendo analytics",
      "Click events",
      "Feature adoption",
      "Product analytics",
      "Reporting dashboard",
      "Pendo API",
    ],
    subtitle:
      "Click events are Pendo's most granular data but raw counts without context are just noise. As well as building dashboards in Pendo and downloading CSV files with all shorts of events and click data, you can also utilize the integration API key to produce your own customized dashboard with live data",
    meta: {
      title: "Pendo Click Data & the Aggregation API | Victor Blanco",
      description:
        "How to read Pendo click events and use the Aggregation API to build live custom dashboards: feature adoption, visitor trends, and full event logs beyond CSV exports.",
    },
    quote: "",
    sections: [
      {
        heading: null,
        paragraphs: [
          "Click events are Pendo's most granular data, and the easiest to misread. Every tagged feature produces a stream of events with a visitor, an account, and a timestamp attached, but a raw count on its own tells you very little. The value comes from how you slice it.",
        ],
      },
      {
        heading: "What click data actually tells you",
        paragraphs: [
          "Sliced by feature, click data shows you which parts of the product carry real usage and which are ignored. Sliced by visitor and account, it separates one power user hammering a button from genuine adoption across a customer. Sliced over time, it shows whether a release, a guide, or an onboarding change actually moved behaviour, not just whether totals went up.",
        ],
        figure: "clicksVsVisitors",
      },
      {
        heading: "Why raw counts mislead",
        paragraphs: [
          "Three things distort raw click counts in almost every Pendo account. Internal users, your own team testing and demoing, can be a third of all events if they aren't segmented out. Power users concentrate volume: a handful of visitors often produce most of a feature's clicks, so a rising total can mean deeper usage by the same few people, not wider adoption. And repeat interactions inflate everything: a user who clicks an export button thirty times in one session is one unit of adoption, not thirty.",
          "The fix is to stop reporting totals and start reporting ratios: unique visitors per feature, the share of accounts that used a feature at least once, and how usage persists week over week. Those are exactly the kinds of questions the Aggregation API answers well.",
        ],
      },
      {
        heading: "Beyond dashboards and CSV exports",
        paragraphs: [
          "Pendo's built-in dashboards and CSV exports cover the common questions, but they are snapshots: someone has to run the export, and the answer is stale the moment it lands in a spreadsheet. For recurring reporting, like a weekly adoption review, a client-facing usage report, or a wallboard, you want the data to come to you.",
        ],
      },
      {
        heading: "How the Aggregation API works",
        paragraphs: [
          "The Aggregation API gives you query access to the same event data that powers Pendo's own UI. You authenticate with an integration key and send a pipeline: a sequence of stages, similar to a database query, where each stage shapes the output of the previous one: select a source, filter it, group it, sort it.",
        ],
        figure: "apiFlow",
        code: {
          title: "POST /api/v1/aggregation: clicks by feature, last 30 days",
          content: `POST https://app.eu.pendo.io/api/v1/aggregation
x-pendo-integration-key: <your-integration-key>

{
  "response": { "mimeType": "application/json" },
  "request": {
    "name": "clicks-by-feature-last-30-days",
    "pipeline": [
      {
        "source": {
          "featureEvents": null,
          "timeSeries": {
            "period": "dayRange",
            "first": "date_add(now(), -30, \\"days\\")",
            "count": 30
          }
        }
      },
      {
        "group": {
          "group": ["featureId"],
          "fields": { "clicks": { "sum": "numEvents" } }
        }
      },
      { "sort": ["-clicks"] }
    ]
  }
}`,
        },
        paragraphsAfter: [
          "Reading it top to bottom: the source stage pulls feature click events day by day for the last 30 days, the group stage sums clicks per feature, and the sort stage ranks them. Swap the group key to visitorId or accountId and the same query answers a completely different question. From there the response is plain JSON. Feed it to any charting library and the report updates itself.",
        ],
      },
      {
        heading: "Metrics worth building",
        paragraphs: [
          "Once the pipeline is in place, these are the reports I build most often for clients. None of them are available as a single number in the standard dashboards:",
        ],
        list: [
          {
            term: "Adoption rate",
            text: "share of active accounts that used a feature at least once in the period. It's the honest version of 'is anyone using this?'",
          },
          {
            term: "Stickiness",
            text: "daily active users over monthly active users, per feature. It separates habits from one-off visits.",
          },
          {
            term: "Time to first use",
            text: "days from signup to first click on a key feature. This is the metric that tells you whether onboarding actually works.",
          },
          {
            term: "Feature share",
            text: "each feature's percentage of total engagement. It shows where your product's gravity really is.",
          },
        ],
      },
      {
        heading: "A working example",
        paragraphs: [
          "The dashboard below is a working example of what this kind of reporting looks like when built directly on the Pendo Aggregation API. It pulls click events by feature, visitor, and account with a daily trend line, feature share breakdown, and a full event log. If you want this built for your product, connected to your live Pendo data, that's a service I offer.",
        ],
      },
    ],
    // Setting dashboard: true renders PendoAnalyticsDashboard at the end of the article page.
    dashboard: true,
  },
];

export const getInsightBySlug = (slug) =>
  insightsData.find((item) => item.slug === slug);
