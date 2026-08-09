/* Records the hero carousel showing all four titles: a scripted cursor clicks
   each indicator dot in turn. Same technique as record-interaction.js (injected
   SVG pointer, frame-indexed timeline, scrollIntoView pinning).

   The carousel does not self-advance under headless Chrome, so driving the dots
   is both deterministic and a truer picture: it shows the control working. */

import { mkdirSync } from "fs";
import puppeteer from "puppeteer-core";

const OUT =
  "/private/tmp/claude-501/-Users-vbl-Desktop--WEBSITES-VB-Portfolio-victor-blanco-portfolio-styled/1e5b5821-8925-4f8a-85ef-646edf03d9a6/scratchpad/anim/hero";
mkdirSync(OUT, { recursive: true });

const FPS = 20;
const W = 1600;
const H = 1050; // the hero's exact height, so the frame holds it and nothing else

const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: "new",
  args: ["--hide-scrollbars", "--force-device-scale-factor=1"],
});
const page = await browser.newPage();
await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
await page.goto("https://lmdouglas.com/", { waitUntil: "networkidle2", timeout: 90000 });
await new Promise((r) => setTimeout(r, 5000));

const pin = () =>
  page.evaluate(() =>
    document.querySelector("#home").scrollIntoView({ block: "start", behavior: "instant" }),
  );
await pin();
await new Promise((r) => setTimeout(r, 1000));

const dots = await page.evaluate(() =>
  [...document.querySelectorAll(".carousel-indicator")].map((el) => {
    const b = el.getBoundingClientRect();
    return {
      x: Math.round(b.left + b.width / 2),
      y: Math.round(b.top + b.height / 2),
      label: el.getAttribute("aria-label"),
    };
  }),
);
console.log("dots:", JSON.stringify(dots));

await page.evaluate(() => {
  const c = document.createElement("div");
  c.id = "__cursor";
  c.style.cssText =
    "position:fixed;left:0;top:0;z-index:2147483647;pointer-events:none;transition:none;";
  c.innerHTML = `
    <svg width="26" height="34" viewBox="0 0 26 34" style="filter:drop-shadow(0 2px 3px rgba(0,0,0,.5))">
      <path d="M2 2 L2 25 L8.5 19.5 L12.5 29 L16.5 27 L12.5 18 L20 18 Z"
            fill="#fffefa" stroke="#282828" stroke-width="1.8" stroke-linejoin="round"/>
    </svg>`;
  document.body.appendChild(c);
  window.__setCursor = (x, y, down) => {
    c.style.transform = `translate(${x}px, ${y}px) scale(${down ? 0.82 : 1})`;
  };
});

// Hold on slide 1, then click through 2, 3, 4 and rest on the last cover.
const timeline = [
  { frames: 30, to: { x: dots[0].x - 30, y: dots[0].y - 40 } }, // arrive, slide 1 showing
  { frames: 12, to: dots[1] },
  { frames: 3, click: true },
  { frames: 33 },
  { frames: 10, to: dots[2] },
  { frames: 3, click: true },
  { frames: 33 },
  { frames: 10, to: dots[3] },
  { frames: 3, click: true },
  { frames: 42 },
];

let cur = { x: dots[0].x - 160, y: dots[0].y + 60 };
let n = 0;
await page.evaluate((p) => window.__setCursor(p.x, p.y, false), cur);

for (const seg of timeline) {
  const from = { ...cur };
  const to = seg.to || cur;
  for (let f = 0; f < seg.frames; f++) {
    const t = seg.frames === 1 ? 1 : ease(f / (seg.frames - 1));
    const x = Math.round(from.x + (to.x - from.x) * t);
    const y = Math.round(from.y + (to.y - from.y) * t);
    await pin();
    await page.evaluate((a) => window.__setCursor(a.x, a.y, a.d), {
      x,
      y,
      d: !!seg.click && f < 2,
    });

    if (seg.click && f === 0) {
      await page.mouse.click(x, y);
      await new Promise((r) => setTimeout(r, 200));
    }

    await page.screenshot({ path: `${OUT}/f${String(n).padStart(4, "0")}.png` });
    n++;
  }
  cur = { ...to };
}

console.log(`captured ${n} frames at ${FPS}fps (${(n / FPS).toFixed(1)}s)`);
await browser.close();
