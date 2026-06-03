import { mkdirSync, readFileSync, writeFileSync } from "fs";

const base = readFileSync("dist/index.html", "utf-8");

const injection = `
  <title>Certified Pendo Consultant Edinburgh | Victor Blanco</title>
  <meta name="description" content="Certified Pendo consultant for SaaS teams. Installation, audits, in-app guides and product analytics. Edinburgh-based, available worldwide. Book a free call." />
  <link rel="canonical" href="https://victorblancoweb.com/pendo-consultant" />
  <meta property="og:url" content="https://victorblancoweb.com/pendo-consultant" />
  <meta property="og:title" content="Pendo Consultant | Victor Blanco" />
  <meta property="og:image" content="https://victorblancoweb.com/og-image-pendo.png" />`;

const html = base.replace("</head>", injection + "\n</head>");

mkdirSync("dist/pendo-consultant", { recursive: true });
writeFileSync("dist/pendo-consultant/index.html", html);
console.log("✅ Generated dist/pendo-consultant/index.html");
