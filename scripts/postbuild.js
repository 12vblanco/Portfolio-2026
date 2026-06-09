import { existsSync, readFileSync, rmSync, writeFileSync } from "fs";

// Remove any stale directory-based output (old builds used pendo-consultant/index.html
// which causes Netlify to 301-redirect /pendo-consultant to /pendo-consultant/)
if (existsSync("dist/pendo-consultant")) {
  rmSync("dist/pendo-consultant", { recursive: true, force: true });
}

const base = readFileSync("dist/index.html", "utf-8");

// Remove the generic og:image fallback before injecting the page-specific one
const stripped = base.replace(/<meta\s+property=["']og:image["'][^>]*>/i, "");

const injection = `
  <title>Certified Pendo Consultant Edinburgh | Victor Blanco</title>
  <meta name="description" content="Certified Pendo consultant for SaaS teams. Installation, audits, in-app guides and product analytics. Edinburgh-based, available worldwide. Book a free call." />
  <link rel="canonical" href="https://victorblancoweb.com/pendo-consultant" />
  <meta property="og:url" content="https://victorblancoweb.com/pendo-consultant" />
  <meta property="og:title" content="Pendo Consultant | Victor Blanco" />
  <meta property="og:image" content="https://victorblancoweb.com/og-image-pendo.png" />`;

const html = stripped.replace("</head>", injection + "\n</head>");

writeFileSync("dist/pendo-consultant.html", html);
console.log("✅ Generated dist/pendo-consultant.html");
