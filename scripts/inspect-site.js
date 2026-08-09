// Dumps a live site's structure so I can write the case study from what is
// actually there: section headings, nav labels, and each section's box.
import puppeteer from "puppeteer-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const url = process.argv[2];
const width = Number(process.argv[3] || 1600);
const height = Number(process.argv[4] || 1000);

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--hide-scrollbars"],
});
const page = await browser.newPage();
await page.setViewport({ width, height, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
await new Promise((r) => setTimeout(r, 2500));

const info = await page.evaluate(() => {
  const text = (el) => (el.innerText || "").trim().replace(/\s+/g, " ");
  const sections = [...document.querySelectorAll("section, main > div, header, footer")]
    .map((el) => {
      const r = el.getBoundingClientRect();
      return {
        tag: el.tagName.toLowerCase(),
        id: el.id || null,
        cls: (el.className || "").toString().slice(0, 60),
        top: Math.round(r.top + window.scrollY),
        h: Math.round(r.height),
        text: text(el).slice(0, 260),
      };
    })
    .filter((s) => s.h > 120);
  return {
    title: document.title,
    pageHeight: document.body.scrollHeight,
    nav: [...document.querySelectorAll("nav a, header a")].map((a) => ({
      label: text(a),
      href: a.getAttribute("href"),
    })),
    headings: [...document.querySelectorAll("h1, h2, h3")].map((h) => ({
      level: h.tagName,
      text: text(h).slice(0, 120),
    })),
    sections,
  };
});

console.log(JSON.stringify(info, null, 2));
await browser.close();
