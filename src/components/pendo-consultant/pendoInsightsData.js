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
//   pull:   short sentence rendered as a large editorial pull quote
//   recommendation: personal note rendered as a "My recommendation" callout,
//           signed off, for sections where the reader has a choice to make
// Set dashboard: true on any entry to render the PendoAnalyticsDashboard at the
// end of its article page.
//
// ORDER: display order comes from `datePublished` (newest first), not from the
// position of an entry in this array, so new articles can be added anywhere.
//
// PUBLISHING: every article has a `published` flag. Drafts (published: false)
// are excluded from the insights cards, the homepage strip, the prerendered
// routes, the sitemap and the slug lookup. To launch a draft: set
// published: true, update date/datePublished/dateModified, then build+deploy.

export const insightsHeader = {
  label: "Pendo Insights",
  title: "From the field",
  subtitle:
    "Real-world notes on Pendo installation, auditing, and getting the most out of product analytics.",
};

export const insightsData = [
  {
    published: true,
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
        "What a Pendo installation audit covers: snippet health, feature tagging, segmentation and guides, plus the prioritised remediation report you get.",
    },
    quote: {
      text: "Victor did a full audit of our initial Pendo installation and got us up to speed. We are now working on creating guides and a reporting dashboard, and are excited to see the analytics behind the improvements.",
      attribution: "Renee C, The PUSH Agency",
    },
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
        pull: "Internal users are not excluded from analytics, inflating every engagement metric the product team reports on.",
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
          tagLast: true,
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
    published: true,
    slug: "pendo-click-data-aggregation-api",
    tag: "Pendo Analytics",
    title:
      "What your Pendo click data tells you and how to use the Aggregation API",
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
      "Click events are Pendo's most granular data but raw counts without context are just noise. As well as building dashboards in Pendo and downloading CSV files with all sorts of events and click data, you can also use the integration API key to produce your own customised dashboard with live data.",
    meta: {
      title: "Pendo Click Data & the Aggregation API | Victor Blanco",
      description:
        "How to read Pendo click events and use the Aggregation API to build live dashboards: feature adoption, visitor trends and event logs beyond CSV exports.",
    },
    quote: null,
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
        pull: "A user who clicks an export button thirty times in one session is one unit of adoption, not thirty.",
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

{ "response": { "mimeType": "application/json" },
  "request": {
    "name": "clicks-by-feature-last-30-days",
    "pipeline": [
      { "source": {
          "featureEvents": null,
          "timeSeries": {
            "period": "dayRange",
            "first": "date_add(now(), -30, \\"days\\")",
            "count": 30 }}},
      { "group": {
          "group": ["featureId"],
          "fields": { "clicks": { "sum": "numEvents" } }}},
      { "sort": ["-clicks"] }]}}`,
        },
        paragraphsAfter: [
          "Reading it top to bottom: the source stage pulls feature click events day by day for the last 30 days, the group stage sums clicks per feature, and the sort stage ranks them. Swap the group key to visitorId or accountId and the same query answers a completely different question. From there the response is plain JSON. Feed it to any charting library and the report updates itself.",
        ],
      },
      {
        heading: "What the query doesn't show",
        paragraphs: [
          "The pipeline above is the easy part. Getting it into production is the rest: the integration key has read access to your entire subscription, so it has to be stored and rotated like any other secret and never shipped to the browser. Large accounts page their responses, so a naive query silently truncates. And a feature ID on its own means nothing until you join it to the visitor and account metadata that says who these people actually are.",
          "Then it has to keep running: a scheduled refresh, somewhere to host it, a chart layer, and an alert for when a pipeline quietly starts returning zero because a tag broke upstream. None of it is especially hard, but it is the difference between a query you ran once and a report a team can trust every week. That part is what I build.",
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

  // ──────────────────────────────────────────────────────────────────────────
  // DRAFTS: set published: true (and update the dates) to launch one.
  // ──────────────────────────────────────────────────────────────────────────

  {
    published: true,
    slug: "pendo-mcp-server",
    tag: "Pendo AI",
    title:
      "The Pendo MCP server: what it reaches, how to connect it, and what it won't fix",
    name: "Victor Blanco - Pendo consultant",
    date: "August 2026",
    datePublished: "2026-08-03",
    dateModified: "2026-08-09",
    read: "9 min read",
    pills: [
      "Pendo MCP",
      "Model Context Protocol",
      "Pendo AI",
      "AI agents",
      "Product analytics",
      "Pendo automation",
      "Claude",
      "ChatGPT",
    ],
    subtitle:
      "Pendo's MCP server puts product data in front of people who never had a Pendo login. It is genuinely useful, but it can inherit every weakness in your tagging. Here is what it reaches, how to connect it to Claude, ChatGPT and other clients, and how I would roll it out.",
    meta: {
      title:
        "Pendo MCP Server: How to Connect It to Claude & ChatGPT | Victor Blanco",
      description:
        "How to connect the Pendo MCP server to Claude, ChatGPT and Cursor, what data it reaches, read-only versus write tools, service accounts, MCP versus Leo, and the limits to plan for.",
    },
    quote: null,
    sections: [
      {
        heading: null,
        paragraphs: [
          "For most of Pendo's life, the answer to “how are they actually using it?” sat behind a login that most of the company never had. The support agent handling a complaint, the account manager preparing for a renewal, the founder who wants one number before a board meeting: each of them had to find someone with a seat, and wait. Pendo's pitch for its MCP server is that this stops being true, and that any AI tool can become a product expert.",
          "The server is now a remotely hosted gateway between your subscription and any AI client that speaks the Model Context Protocol (MPC). You ask a question in Claude, ChatGPT or Cursor, and the answer comes back from your live Pendo data, in the tool where you already work, with no dashboard and no export. Pendo greatly improved reach. What it does not sell is a view on how to adopt it without quietly making your reporting worse.",
        ],
        figure: "mcpFlow",
      },
      {
        heading: "What the Pendo MCP server can reach",
        paragraphs: [
          "The catalogue is broader than most people expect. Page and feature usage is the obvious part, but guides, sentiment surveys, session replays, raw customer feedback and Orchestrate journeys are all reachable too. What matters more is that every area carries a ceiling, and the ceilings decide which workflows are viable.",
        ],
        table: {
          tagLast: true,
          head: ["Product area", "What an AI client can reach", "Key limit"],
          rows: [
            [
              "Pages & Features",
              "Ranked usage, time series, funnels and retention curves",
              "367 days",
            ],
            [
              "Visitors & accounts",
              "Metadata fields, segment membership, single-visitor timelines",
              "31-day timeline",
            ],
            [
              "Guides & polls",
              "Views, completions, effectiveness rates and poll responses",
              "Guides Pro",
            ],
            [
              "Listen",
              "Raw feedback, ideas and AI-clustered themes",
              "30 per call",
            ],
            [
              "Session Replay",
              "Replay links, frustration events, console and network logs",
              "50 per query",
            ],
            [
              "Orchestrate",
              "Journey configuration, step graphs and email performance",
              "367 days",
            ],
          ],
        },
      },
      {
        heading: "How to connect Pendo to Claude, ChatGPT and other AI clients",
        paragraphs: [
          "Nothing works until a subscription admin turns it on, under Settings, Subscription settings, AI access. Read-only tools and write tools are separate toggles there, and read-only has to be on first.",
          "After that, connecting is a per-user job, and the experience is not the same across tools. That difference matters more than Pendo lets on, because the client you pick decides whether your non-technical people ever actually use this.",
        ],
        table: {
          head: ["AI client", "How you connect", "Where it fits"],
          rows: [
            [
              "Claude.ai & Desktop",
              "An admin adds Pendo once under Admin settings, Connectors. After that each user connects in one click and signs in with OAuth.",
              "Non-technical teams. The smoothest path, and the one your renewals and support people will actually use.",
            ],
            [
              "Claude Code",
              "One line in the terminal, then OAuth on first run.",
              "Developers, and anything you plan to automate later.",
            ],
            [
              "ChatGPT",
              "Requires Developer mode, then a custom connector with your regional URL and OAuth.",
              "Teams already standardised on ChatGPT, if they can live with the extra setup.",
            ],
            [
              "Cursor & other MCP clients",
              "A short JSON block pointing at your regional endpoint.",
              "Editors and custom agents that already speak MCP.",
            ],
          ],
        },
        code: {
          title: "Connecting Claude Code to the Pendo MCP server",
          content: `# Claude Code, US region
claude mcp add --transport http pendo \\
  https://app.pendo.io/mcp/v0/shttp

# Use the endpoint that matches your Pendo login region
# US1        https://us1.app.pendo.io/mcp/v0/shttp
# EU         https://app.eu.pendo.io/mcp/v0/shttp
# Japan      https://app.jpn.pendo.io/mcp/v0/shttp
# Australia  https://app.au.pendo.io/mcp/v0/shttp

# Any other MCP client
{ "mcpServers": { "Pendo": { "url": "<your-regional-endpoint>" } } }`,
        },
        paragraphsAfter: [
          "Whichever client you use, you are sent through an OAuth prompt and sign in with your normal Pendo credentials. In Claude, every tool starts on “needs approval”, so it asks before each query until you tell it otherwise. When a connection fails it is almost always the URL: people paste their Pendo login address instead of the full /mcp/v0/shttp path, and the client caches the mistake.",
        ],
        recommendation:
          "Turn on read-only tools, connect one client, and live with it for a while before you widen access. Start with Claude if your goal is to get product data to people who never log in. You will learn more from watching which questions your team actually asks than from any meeting about which ones they might. Waiting costs you nothing here.",
      },
      {
        heading: "Pendo MCP or Leo: when to use each",
        paragraphs: [
          "These get confused, and they answer different questions. Leo is Pendo's built-in AI. You use it inside Pendo, it needs no setup, and it hands you curated insights without leaving the product. The MCP server does the opposite: it brings your Pendo data out to the tool you already work in, and lets you sit it next to your CRM, your tickets or your docs.",
          "The rule of thumb is simple. Reach for Leo when you want a quick, curated answer and you are already in Pendo. Reach for the MCP server when the work is happening somewhere else, or when you want product data combined with another source, or when you are building something that runs on a schedule. They are not rivals. One keeps you in Pendo, the other meets you where you left it.",
        ],
        recommendation:
          "If your team lives in Pendo, Leo is the shorter road. If they live in Claude or ChatGPT and keep pinging someone else to pull a Pendo number, that ping is the gap the MCP closes.",
      },
      {
        heading: "Read-only by default, and why to keep it that way",
        paragraphs: [
          "The write tools are deliberately narrow. They cover creating and updating feedback items and ideas, and linking the two together, so the worst case is a cluttered Listen backlog rather than a damaged analytics record. An admin has to opt into them separately.",
          "Everything else is inherited rather than configured. Every request runs as the person who signed in, so nobody can reach data they could not already open in Pendo, and nothing crosses regions.",
        ],
        pull: "Read-only is the default for a reason, and most businesses should leave it that way.",
        recommendation:
          "Leave the write toggle off unless you have a specific, named workflow that needs it. An agent filing feedback and ideas still needs a person who decided they were worth filing, and that judgement is most of what the record is worth.",
      },
      {
        heading: "Automation without a person in the loop: service accounts",
        paragraphs: [
          "Interactive OAuth covers a person asking questions. For anything that runs on its own, a scheduled digest, a churn-risk check, a support bot with live product context, Pendo provides service accounts: a client credentials grant exchanged for a bearer token that lasts sixty minutes and carries no refresh token. You get twenty-five per subscription, and they need the API package.",
          "One warning in Pendo's documentation is worth repeating, because it is easy to get wrong in a hurry. The credential grants access to everything that account can see, so it must never sit behind anything your end users can type into.",
        ],
        recommendation:
          "Use interactive OAuth while you are still learning what this is good for. Treat a service account as something you graduate to, with a named owner, a rotation schedule and a written note of what it may touch. It looks like the quick way to start. It isn't.",
      },
      {
        heading: "The limits nobody mentions",
        paragraphs: [
          "The ceilings are inconsistent, and hitting one rarely produces an error you would notice. You get a shorter answer than you expected, delivered with the same confidence as a complete one.",
        ],
        list: [
          {
            term: "Date windows",
            text: "most usage tools reach back 367 days, but Product Engagement Score stops at 180, agent analytics at 90, and single-visitor timelines and replay searches at 31.",
          },
          {
            term: "Result caps",
            text: "feedback and ideas return thirty items per call, replay searches fifty, developer logs a hundred.",
          },
          {
            term: "No replay content",
            text: "you get links, metadata and the console and network logs, never the recording itself.",
          },
          {
            term: "Pendo's own boundary",
            text: "the documentation recommends the Pendo UI for historical trends and in-depth guide reporting. That is Pendo drawing the line, not me.",
          },
        ],
        recommendation:
          "Use MCP for the fast questions and the Pendo UI for anything historical or board-facing. Before you trust it on a question you cannot answer yourself, ask it five you can. If it gets those wrong, the problem is your data, not the tool.",
      },
      {
        heading: "What the MCP won't fix",
        paragraphs: [
          "None of this checks whether the data underneath is worth querying. An LLM will not tell you your feature tags are broken. It answers the question you asked, fluently, using whatever is there, and it sounds exactly as certain when the numbers are wrong.",
          "So the problems I usually find in an installation audit get amplified rather than exposed. Internal users nobody excluded now inflate the adoption figure a sales rep quotes on a call. A feature tagged with a positional selector that broke three releases ago now reads as a feature nobody wants. Before, a bad number reached one analyst who might have questioned it. Now it reaches everyone at once, in prose that sounds like an answer.",
        ],
        pull: "An LLM will not tell you your feature tags are broken.",
      },
      {
        heading: "Where to start",
        paragraphs: [
          "If you want a sequence: verify the installation first, then enable read-only tools, connect one client, and give the fastest questions to the people who already know your data. Used that way it makes your Pendo team considerably quicker, which is a better outcome than handing the whole company a confident answer nobody checks. If you would rather have the verification done properly first, or the whole thing set up and governed, that is what I do.",
        ],
      },
    ],
  },
  {
    published: true,
    slug: "pendo-aggregation-api-examples",
    tag: "Pendo API",
    title: "Five practical Pendo Aggregation API examples",
    name: "Victor Blanco - Pendo consultant",
    date: "June 2026",
    datePublished: "2026-06-19",
    dateModified: "2026-06-19",
    read: "7 min read",
    pills: [
      "Pendo API",
      "Aggregation API",
      "Product analytics",
      "Custom dashboards",
      "Feature adoption",
      "Pendo reporting",
    ],
    subtitle:
      "The Aggregation API answers questions Pendo's dashboards can't. These five pipelines cover the reports I get asked to build most often, from daily feature usage to guide funnels.",
    meta: {
      title: "Pendo Aggregation API: 5 Practical Examples | Victor Blanco",
      description:
        "Five copy-paste Pendo Aggregation API pipelines: daily active visitors per feature, monthly feature adoption by account, guide completion funnels, and more.",
    },
    quote: null,
    sections: [
      {
        heading: null,
        paragraphs: [
          "This is the follow-up to my article on Pendo click data, which covers how the Aggregation API works and when to reach for it. Here I want to be purely practical: five pipelines you can adapt, each answering a question I get asked by real product teams. All of them POST to the same endpoint with your integration key.",
        ],
        figure: "apiFlow",
      },
      {
        heading: "Daily active visitors per feature",
        paragraphs: [
          "The basic shape of feature analytics: who used what, day by day. Group feature events by both feature and day, counting unique visitors rather than raw clicks.",
        ],
        code: {
          title: "Pipeline: daily unique visitors by feature, last 30 days",
          content: `{ "response": { "mimeType": "application/json" },
  "request": {
    "pipeline": [
      { "source": {
          "featureEvents": null,
          "timeSeries": {
            "period": "dayRange",
            "first": "date_add(now(), -30, \\"days\\")",
            "count": 30}}},
      { "group": { "group": ["featureId", "day"],
          "fields": { "visitors": { "count": "visitorId" } }}},
      { "sort": ["day", "-visitors"] }]}}`,
        },
      },
      {
        heading: "Accounts that adopted a feature this month",
        paragraphs: [
          "Adoption questions are account questions in B2B. Swap the grouping key to accountId and filter to one feature, and the result is the list of customers actually using what you shipped.",
        ],
        code: {
          title: "Pipeline: accounts using one feature, current month",
          content: `{ "response": { "mimeType": "application/json" },
  "request": {
    "pipeline": [
      { "source": {
          "featureEvents": { "featureId": "<your-feature-id>" },
          "timeSeries": {
            "period": "dayRange",
            "first": "startOfPeriod(now(), \\"month\\")",
            "count": 31}}},
      { "group": {
          "group": ["accountId"],
          "fields": {
            "events": { "sum": "numEvents" },
            "visitors": { "count": "visitorId" }}}},
      { "sort": ["-events"] }]}}`,
        },
      },
      {
        heading: "Guide completion funnel",
        paragraphs: [
          "Guide analytics in the UI show totals; the API lets you build a proper step funnel. Source guide events for one guide, group by step and event type, and the drop-off between steps falls out of the numbers.",
        ],
        code: {
          title: "Pipeline: guide events by step, last 90 days",
          content: `{ "response": { "mimeType": "application/json" },
  "request": {
    "pipeline": [
      { "source": {
          "guideEvents": { "guideId": "<your-guide-id>" },
          "timeSeries": {
            "period": "dayRange",
            "first": "date_add(now(), -90, \\"days\\")",
            "count": 90}}},
      { "group": {
          "group": ["guideStepId", "type"],
          "fields": { "visitors": { "count": "visitorId" } }}}]}}`,
        },
        pull: "Dashboards answer the questions Pendo thought of. The Aggregation API answers yours.",
      },
      {
        heading: "Two more worth knowing",
        paragraphs: [
          "Stickiness per feature: run the daily-visitors pipeline twice, once over a day and once over thirty, and divide. DAU over MAU per feature separates habit-forming features from occasional ones, and it is not a number any standard dashboard gives you.",
          "Page time by account: swap the source to pageEvents and sum numMinutes grouped by accountId. Where accounts actually spend time is often embarrassingly different from where the roadmap assumes they do.",
        ],
      },
      {
        heading: "What these pipelines leave out",
        paragraphs: [
          "Every example here is the query, not the system around it. In a real deployment the integration key has to be secured and rotated (it can read your whole subscription), responses from large accounts have to be paginated, and raw IDs have to be joined to the visitor and account metadata that makes them readable. Then the whole thing needs scheduling, hosting, a chart layer, and an alert for when a pipeline starts returning zero because a tag broke upstream.",
          "That gap, between a query that runs once and a report a team checks every Monday, is most of the actual work.",
        ],
        pull: "The query is the easy part. The system around it is the job.",
      },
      {
        heading: "Putting it together",
        paragraphs: [
          "Each of these returns plain JSON, which means each can feed a chart, a scheduled report, or a wallboard without anyone exporting a CSV again. The live dashboard on my click data article is built from exactly these building blocks. If you want pipelines like these wired to your own Pendo subscription, that is a service I offer.",
        ],
      },
    ],
  },
  {
    published: false,
    slug: "exclude-internal-users-pendo",
    tag: "Pendo Setup",
    title: "How to exclude internal users from Pendo analytics",
    name: "Victor Blanco - Pendo consultant",
    date: "2026", // set on publish
    datePublished: "2026-07-01", // set on publish
    dateModified: "2026-07-01", // set on publish
    read: "5 min read",
    pills: [
      "Pendo segments",
      "Internal users",
      "Data quality",
      "Product analytics",
      "Pendo setup",
    ],
    subtitle:
      "Your own team is probably the most active user of your product. Until they are excluded from Pendo, every adoption metric, funnel and NPS score you report carries their fingerprints.",
    meta: {
      title: "Exclude Internal Users from Pendo Analytics | Victor Blanco",
      description:
        "Three reliable ways to keep your own team out of Pendo data: exclude lists, email domain segments and metadata flags, plus how to keep the segment clean over time.",
    },
    quote: null,
    sections: [
      {
        heading: null,
        paragraphs: [
          "Support reproducing bugs, sales running demos, QA clicking through every flow before a release: internal sessions look exactly like engaged customers to Pendo, except they behave like power users. In smaller products they can account for a third of all events. Nothing else you do in Pendo matters much until this traffic is out of your reports.",
        ],
      },
      {
        heading: "Three ways to identify internal traffic",
        paragraphs: [
          "There is no single switch for this; you combine signals depending on how your authentication works. These are the three approaches I use, often together:",
        ],
        table: {
          head: ["Method", "How it works", "Best for"],
          rows: [
            [
              "Email domain segment",
              "Pass the user's email as visitor metadata, then segment out anyone matching your company domain",
              "Teams whose staff log in with company email",
            ],
            [
              "Metadata flag",
              "Send an isInternal field from your auth system as visitor or account metadata",
              "Products with role data in the backend",
            ],
            [
              "Exclude list",
              "Add specific visitor or account IDs to Pendo's exclude list in subscription settings",
              "Demo accounts, test tenants, contractors",
            ],
          ],
        },
        pull: "If your own team is in the data, every adoption number you report is optimistic by default.",
      },
      {
        heading: "Build the segment once, apply it everywhere",
        paragraphs: [
          "The mistake is treating exclusion as a per-report filter someone has to remember. Make it structural instead:",
        ],
        steps: [
          {
            label: "Step 1",
            text: "Create a saved segment such as 'Customers only' that combines your exclusion rules in one place.",
          },
          {
            label: "Step 2",
            text: "Set it as the default filter on every dashboard the product team looks at, not just the ones you built.",
          },
          {
            label: "Step 3",
            text: "Check guide targeting. Internal users seeing onboarding guides skews completion rates and wastes guide views.",
          },
          {
            label: "Step 4",
            text: "Verify in Data Explorer: compare event counts with and without the segment. The gap is how wrong your numbers have been.",
          },
        ],
      },
      {
        heading: "Keeping it clean over time",
        paragraphs: [
          "Exclusion rules rot quietly. New hires join with personal emails during trials, contractors use client-side accounts, and demo tenants multiply before conferences. A quarterly review of the segment definition takes ten minutes: scan the most active visitors in your data, and question any account whose usage pattern looks like someone testing rather than working.",
          "This is also one of the first things I check in a Pendo audit, because it is the highest-impact fix with the least effort. If you are not sure how much internal traffic is in your data right now, that is usually a sign it has never been measured.",
        ],
      },
    ],
  },

  {
    published: false,
    slug: "pendo-guide-throttling",
    tag: "Pendo Guides",
    title: "Pendo guide throttling: stop spamming your users",
    name: "Victor Blanco - Pendo consultant",
    date: "2026", // set on publish
    datePublished: "2026-07-15", // set on publish
    dateModified: "2026-07-15", // set on publish
    read: "4 min read",
    pills: [
      "Pendo guides",
      "Guide throttling",
      "User onboarding",
      "In-app messaging",
      "Guide fatigue",
    ],
    subtitle:
      "Guides are the most visible thing Pendo does, which makes them the easiest thing to overdo. Throttling is the difference between in-app guidance and in-app noise.",
    meta: {
      title: "Pendo Guide Throttling Best Practices | Victor Blanco",
      description:
        "How to configure Pendo guide throttling so users see helpful guidance instead of popup noise: frequency caps, settings that work for SaaS, and how to measure guide fatigue.",
    },
    quote: null,
    sections: [
      {
        heading: null,
        paragraphs: [
          "Every team that gets access to Pendo guides goes through the same arc: excitement, a burst of announcements and walkthroughs, then a slow realisation that users have started dismissing everything on sight. The product did not get worse. The guides trained people to ignore them.",
        ],
      },
      {
        heading: "What throttling actually controls",
        paragraphs: [
          "Pendo's throttling settings limit how many guides a visitor can be shown in a given window, and how those guides queue when several are eligible at once. Without it, a returning user who matches three segments gets three popups stacked on their first session back. With it, guides take turns: the most important one shows, the rest wait.",
        ],
      },
      {
        heading: "Symptoms you have a guide problem",
        paragraphs: [
          "You rarely need a survey to detect guide fatigue. The data shows it first:",
        ],
        list: [
          {
            term: "Rising dismiss rates",
            text: "guides that performed well at launch now get closed within a second of appearing.",
          },
          {
            term: "Falling completion",
            text: "multi-step walkthroughs lose users at step one, not at the hard step in the middle.",
          },
          {
            term: "Support tickets about popups",
            text: "when users take time to complain about messaging, the threshold was crossed long ago.",
          },
          {
            term: "NPS comments",
            text: "the word 'popups' appearing in detractor comments is the clearest signal Pendo will ever give you.",
          },
        ],
        pull: "Every guide a user dismisses makes the next one easier to dismiss.",
      },
      {
        heading: "Settings that work for most SaaS products",
        paragraphs: [
          "Defaults depend on product type, but this configuration is the starting point I use with clients: at most one guide per session for announcements, onboarding walkthroughs exempt from throttling but limited to one active walkthrough per product area, snooze options enabled on everything, and a minimum gap of a day between non-critical guides. Then stagger launches: when three teams ship guides the same week, the queue decides what users see, not the teams.",
        ],
      },
      {
        heading: "Measure fatigue, not just views",
        paragraphs: [
          "Guide analytics default to counting views, which rewards exactly the wrong behaviour. The numbers worth watching are dismissal rate, time-to-dismiss, and completion by step. A guide seen by fewer users at the right moment beats one seen by everyone at the wrong one. If your guides are tagged and throttled properly, those metrics tell you which messages earn their place in the product and which are just noise with a brand colour.",
        ],
      },
    ],
  },

  {
    published: false,
    slug: "pendo-react-installation-checklist",
    tag: "Pendo Setup",
    title: "Pendo installation checklist for React apps",
    name: "Victor Blanco - Pendo consultant",
    date: "2026", // set on publish
    datePublished: "2026-08-15", // set on publish
    dateModified: "2026-08-15", // set on publish
    read: "6 min read",
    pills: [
      "Pendo installation",
      "React",
      "SPA tracking",
      "Pendo snippet",
      "Visitor ID",
      "Pendo setup",
    ],
    subtitle:
      "Single-page apps are where most broken Pendo installations I audit come from. This is the checklist I use when installing Pendo in a React product, and what each item protects you from.",
    meta: {
      title: "Pendo Installation Checklist for React Apps | Victor Blanco",
      description:
        "A practical checklist for installing Pendo in React and SPA products: snippet placement, visitor identification timing, route tracking, environment keys and verification.",
    },
    quote: null,
    sections: [
      {
        heading: null,
        paragraphs: [
          "Pendo's install instructions assume a website. React apps are not websites: routes change without page loads, users authenticate mid-session, components mount and unmount constantly, and development runs everything twice in StrictMode. None of this breaks Pendo loudly. It breaks it quietly, which is worse.",
        ],
        pull: "Most broken Pendo installs in React apps come down to one thing: the snippet living inside a component that does not always render.",
      },
      {
        heading: "Where the snippet goes",
        paragraphs: [
          "The agent snippet belongs in index.html, outside the React tree entirely. The moment it lives inside a component, its loading depends on rendering logic: a layout that does not wrap every route, a conditional that skips it for some user type, a lazy-loaded shell that mounts late. Entire user journeys then never load the agent, and no error tells you so.",
          "Initialise once. If you must initialise from React because identity lives there, do it in a module-level call or a top-level effect with a guard, never in a component that can remount.",
        ],
      },
      {
        heading: "Identify users at the right moment",
        paragraphs: [
          "The standard SPA flow is anonymous first, identified after login. Initialise with a stable anonymous ID, then call pendo.identify with your real user ID and account once authentication resolves. Two rules keep the data sane: visitor IDs must survive a refresh (no random IDs generated per session), and the account ID must come from your backend's tenant model, not from whatever happens to be in the URL.",
        ],
      },
      {
        heading: "The verification checklist",
        paragraphs: [
          "Installation is not done when events appear. It is done when every line below holds:",
        ],
        steps: [
          {
            label: "Check 1",
            text: "The agent loads on every route, including auth pages, settings, and anything behind lazy loading. Watch the network tab while clicking through the whole app.",
          },
          {
            label: "Check 2",
            text: "Visitor ID is identical before and after a refresh, and after logout/login by the same user.",
          },
          {
            label: "Check 3",
            text: "Client-side route changes appear as page views in Pendo. If only the first page of each session registers, the agent is not seeing your router.",
          },
          {
            label: "Check 4",
            text: "Staging and production use separate subscription keys. Test traffic in production data is internal-user pollution you chose to have.",
          },
          {
            label: "Check 5",
            text: "Internal users are excluded by segment before anyone builds a dashboard on the data.",
          },
        ],
      },
      {
        heading: "React-specific pitfalls",
        paragraphs: [
          "StrictMode runs effects twice in development, so an unguarded initialise call double-counts everything locally and trains you to distrust dev data. Server-side rendering needs a window guard around any Pendo call. And environment-based keys belong in your build config, not in a runtime conditional that can pick the wrong subscription silently.",
          "Most of this takes an afternoon to get right and an audit to get wrong-then-right. If your install predates this checklist and nobody has verified it since, you can probably guess which of these checks it fails.",
        ],
      },
    ],
  },
];

/* Newest first, by `datePublished`, so the insights index, the homepage strip
   and the ItemList schema all agree without anyone having to paste a new
   article into the right slot in `insightsData` above. Sorted here rather than
   in each consumer because InsightsStrip takes `.slice(0, 3)` and calls the
   result "latest", which is only true if this list is ordered. */
export const publishedInsights = insightsData
  .filter((item) => item.published)
  .sort((a, b) => b.datePublished.localeCompare(a.datePublished));

export const getInsightBySlug = (slug) =>
  publishedInsights.find((item) => item.slug === slug);
