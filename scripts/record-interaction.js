/* Records a live site being *used*, for a case study's <Clip> figure: a scripted
   cursor moves between hotspots and opens each one.

   This is a template, not a general tool. It is currently set up for the
   L.M. Douglas realm map (`.map-point` markers on lmdouglas.com); copy it per
   study and edit `stops` and `timeline` to suit that interaction.

   The cursor is drawn as an injected SVG, since a real screenshot has no
   pointer, and the timeline is frame-indexed rather than wall-clock, so motion
   stays perfectly smooth however slow each screenshot is.

   Then encode (ffmpeg). MP4 beat both alternatives on this clip, at 1200px:
     mp4 0.29 MB  ·  gif 0.60 MB (900px, 12fps, 128 colours)  ·  webm 1.09 MB

     ffmpeg -framerate 20 -i frames/f%04d.png -vf "scale=1200:-2" \
       -c:v libx264 -pix_fmt yuv420p -crf 24 -movflags +faststart out.mp4

   Poster frame for <Clip poster>: resize frames/f0000.png to the same width. */

import { mkdirSync } from "fs";
import puppeteer from "puppeteer-core";

const OUT =
  "/private/tmp/claude-501/-Users-vbl-Desktop--WEBSITES-VB-Portfolio-victor-blanco-portfolio-styled/1e5b5821-8925-4f8a-85ef-646edf03d9a6/scratchpad/anim/frames";
mkdirSync(OUT, { recursive: true });

const FPS = 20;
const W = 1600;
const H = 1000;

// easeInOutCubic, so the pointer accelerates and settles like a hand does.
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: "new",
  args: ["--hide-scrollbars", "--force-device-scale-factor=1"],
});
const page = await browser.newPage();
await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
await page.goto("https://lmdouglas.com/", { waitUntil: "networkidle2", timeout: 90000 });
await new Promise((r) => setTimeout(r, 4000));

/* Frame the map, and keep it framed. The page scrolls a wrapper element rather
   than the window, so `window.scrollTo` is a no-op here and `overflow:hidden`
   on <body> jumps back to the top: only scrollIntoView actually moves it. */
const pin = () =>
  page.evaluate(() =>
    document.querySelector("#map").scrollIntoView({ block: "start", behavior: "instant" }),
  );
await pin();
await new Promise((r) => setTimeout(r, 1400));

const points = await page.evaluate(() =>
  [...document.querySelectorAll(".map-point")].map((el) => {
    const b = el.getBoundingClientRect();
    return { x: Math.round(b.left + b.width / 2), y: Math.round(b.top + b.height / 2) };
  }),
);

// Three markers, spread across the map, all comfortably inside the frame.
const inFrame = points.filter((p) => p.x > 120 && p.x < W - 120 && p.y > 120 && p.y < H - 160);
inFrame.sort((a, b) => a.x - b.x);
const stops = [
  inFrame[1],
  inFrame[Math.floor(inFrame.length / 2)],
  inFrame[inFrame.length - 2],
].filter(Boolean);
console.log("stops:", JSON.stringify(stops));

// The pointer itself: an arrow that never intercepts the clicks it is miming.
await page.evaluate(() => {
  const c = document.createElement("div");
  c.id = "__cursor";
  c.style.cssText =
    "position:fixed;left:0;top:0;z-index:2147483647;pointer-events:none;" +
    "will-change:transform;transition:none;";
  c.innerHTML = `
    <svg width="26" height="34" viewBox="0 0 26 34" style="filter:drop-shadow(0 2px 3px rgba(0,0,0,.45))">
      <path d="M2 2 L2 25 L8.5 19.5 L12.5 29 L16.5 27 L12.5 18 L20 18 Z"
            fill="#fffefa" stroke="#282828" stroke-width="1.8" stroke-linejoin="round"/>
    </svg>`;
  document.body.appendChild(c);
  window.__setCursor = (x, y, down) => {
    c.style.transform = `translate(${x}px, ${y}px) scale(${down ? 0.82 : 1})`;
  };
});

/* Timeline: a list of segments, each a number of frames. `to` moves the pointer
   there over the segment; `click` fires on the segment's first frame. */
const timeline = [
  { frames: 12, to: { x: 200, y: 760 } },              // settle in from the corner
  { frames: 18, to: stops[0] },
  { frames: 4, click: true },
  { frames: 30 },                                       // read the lore card
  { frames: 20, to: stops[1] },
  { frames: 4, click: true },
  { frames: 30 },
  { frames: 20, to: stops[2] },
  { frames: 4, click: true },
  { frames: 34 },
  { frames: 14, to: { x: 1380, y: 820 } },              // drift away, hold the map
];

let cur = { x: 120, y: 900 };
let n = 0;
await page.evaluate((p) => window.__setCursor(p.x, p.y, false), cur);

for (const seg of timeline) {
  const from = { ...cur };
  const to = seg.to || cur;
  for (let f = 0; f < seg.frames; f++) {
    const t = seg.frames === 1 ? 1 : ease(f / (seg.frames - 1));
    const x = Math.round(from.x + (to.x - from.x) * t);
    const y = Math.round(from.y + (to.y - from.y) * t);
    const down = !!seg.click && f < 2;
    await pin();
    await page.evaluate((a) => window.__setCursor(a.x, a.y, a.d), { x, y, d: down });

    if (seg.click && f === 0) {
      await page.mouse.click(x, y);
      await new Promise((r) => setTimeout(r, 260)); // let the card animate in
    }

    // No `clip`: its coordinates are page-relative, so it would photograph the
    // top of the document every time. A plain shot captures the viewport.
    await page.screenshot({ path: `${OUT}/f${String(n).padStart(4, "0")}.png` });
    n++;
  }
  cur = { ...to };
}

console.log(`captured ${n} frames at ${FPS}fps (${(n / FPS).toFixed(1)}s)`);
await browser.close();
