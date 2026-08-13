/* Records the relaunched Orders Made Simple site being *navigated and used*:
   a scripted cursor scrolls the homepage, completes the signup form, then jumps
   to How it Works through the nav and reads down it.

   Sibling of record-interaction.js and record-carousel.js, and the same
   technique: an injected SVG pointer (a real capture has no cursor) and a
   frame-indexed timeline, so motion stays smooth however slow each screenshot
   is. What is new here is scrolling as a timeline verb, because this site
   reveals its sections on a scroll-linked animation-timeline: the reveals only
   play if the recording actually scrolls, which is most of what there is to
   show.

   It writes frames plus markers.json, a list of {label, start, end} covering
   every segment, so a shorter cut can be assembled from named moments rather
   than by counting frames by hand.

     node scripts/record-oms.js [outDir]

   Then encode with scripts/encode-oms.js, which reads markers.json.

   NOTE: the form is filled but never submitted. Send is hovered and left alone,
   because clicking it would post a fake lead into the client's live HubSpot. */

import { mkdirSync, writeFileSync } from "fs";
import puppeteer from "puppeteer-core";

const OUT =
  process.argv[2] ||
  "/private/tmp/claude-501/-Users-vbl-Desktop--WEBSITES-VB-Portfolio-victor-blanco-portfolio-styled/d7587600-7c4a-46c9-84a0-7e0a37fd0dc4/scratchpad/oms-frames";
mkdirSync(OUT, { recursive: true });

const FPS = 20;
const W = 1440; // the width every OMS measurement in this repo was taken at
/* The home-page card's MediaContainer is a fixed 300px tall against a card
   width that only varies a little, so it holds ~1.586 at every desktop
   breakpoint (measured 431x272 at 1920 through 463x292 at 969). Shooting at
   that ratio means `object-fit: cover` has nothing to crop; 16:9 lost about a
   ninth of the frame off each side. */
const CARD_ASPECT = 1.586;
const H = Math.round(W / CARD_ASPECT / 2) * 2; // 908, kept even for h264
const HOME = "https://ordersmadesimple.com/";
const HIW = "https://ordersmadesimple.com/how-it-works";
// HubSpot answers the HeadlessChrome UA with a 404 on every path.
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";
const BLOCK = ["usemessages.com", "hs-banner.com", "hotjar.com"];

const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: "new",
  args: ["--hide-scrollbars", "--force-device-scale-factor=1"],
});
const page = await browser.newPage();
await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
await page.setUserAgent(UA);
await page.setRequestInterception(true);
page.on("request", (req) => {
  let host = "";
  try {
    host = new URL(req.url()).host;
  } catch {
    host = "";
  }
  if (host && BLOCK.some((b) => host.includes(b))) req.abort();
  else req.continue();
});

const CURSOR = () => {
  const c = document.createElement("div");
  c.id = "__cursor";
  c.style.cssText =
    "position:fixed;left:0;top:0;z-index:2147483647;pointer-events:none;transition:none;";
  c.innerHTML = `
    <svg width="26" height="34" viewBox="0 0 26 34" style="filter:drop-shadow(0 2px 3px rgba(0,0,0,.45))">
      <path d="M2 2 L2 25 L8.5 19.5 L12.5 29 L16.5 27 L12.5 18 L20 18 Z"
            fill="#fffefa" stroke="#282828" stroke-width="1.8" stroke-linejoin="round"/>
    </svg>`;
  document.body.appendChild(c);
  window.__setCursor = (x, y, down) => {
    c.style.transform = `translate(${x}px, ${y}px) scale(${down ? 0.82 : 1})`;
  };
};

const hideChrome = () =>
  page.evaluate(() => {
    [
      "#hs-eu-cookie-confirmation",
      "#hs-web-interactives-top-anchor",
      "#hubspot-messages-iframe-container",
    ].forEach((sel) =>
      document.querySelectorAll(sel).forEach((el) => (el.style.display = "none")),
    );
  });

/* Document-space rect of a selector, so a timeline can name an element and let
   the runner work out where it lands once the page has scrolled. */
const rectOf = (sel) =>
  page.evaluate((s) => {
    const el = document.querySelector(s);
    if (!el) return null;
    const b = el.getBoundingClientRect();
    return {
      x: Math.round(b.left + b.width / 2),
      docY: Math.round(b.top + window.scrollY + b.height / 2),
      top: Math.round(b.top + window.scrollY),
      h: Math.round(b.height),
    };
  }, sel);

let n = 0;
let scrollY = 0;
let cur = { x: 300, y: 700 };
const markers = [];

// Only a frame that actually landed takes a number, so the sequence ffmpeg
// reads never has a hole in it.
const shoot = async () => {
  await page.screenshot({ path: `${OUT}/f${String(n).padStart(4, "0")}.png` });
  n++;
};

/* One timeline segment. `scrollTo` and `to` both ease across the segment, so a
   scroll and a pointer move inside the same segment stay in step. */
async function run(label, segs) {
  const start = n;
  for (const seg of segs) {
    const fromScroll = scrollY;
    const toScroll = seg.scrollTo ?? scrollY;
    const from = { ...cur };

    // An element target is resolved once, at the scroll position it will be
    // read at, not at the one the page happens to be on now.
    let to = seg.to || null;
    if (seg.at) {
      const r = await rectOf(seg.at);
      if (!r) throw new Error(`no element for ${seg.at}`);
      to = { x: r.x, y: r.docY - toScroll };
    }
    if (!to) to = { ...cur };

    // A click that follows a link tears down the execution context, so every
    // page call in that segment has to survive the frame it happens on.
    const soft = async (fn) => {
      try {
        await fn();
      } catch (e) {
        if (!seg.navigates) throw e;
      }
    };

    for (let f = 0; f < seg.frames; f++) {
      const t = seg.frames === 1 ? 1 : ease(f / (seg.frames - 1));
      const y = Math.round(fromScroll + (toScroll - fromScroll) * t);
      if (y !== scrollY) {
        await soft(() => page.evaluate((v) => window.scrollTo(0, v), y));
        scrollY = y;
      }
      const cx = Math.round(from.x + (to.x - from.x) * t);
      const cy = Math.round(from.y + (to.y - from.y) * t);
      const down = !!seg.click && f < 2;
      await soft(() =>
        page.evaluate((a) => window.__setCursor?.(a.x, a.y, a.d), { x: cx, y: cy, d: down }),
      );

      if (seg.click && f === 0) {
        await soft(() => page.mouse.click(cx, cy));
        await new Promise((r) => setTimeout(r, 120));
      }
      // One character per frame, so typing reads at a human speed.
      if (seg.type && f < seg.type.text.length) {
        await page.evaluate(
          (a) => {
            const el = document.querySelector(a.sel);
            el.value = a.text.slice(0, a.i + 1);
            el.dispatchEvent(new Event("input", { bubbles: true }));
          },
          { sel: seg.type.sel, text: seg.type.text, i: f },
        );
      }
      if (seg.select && f === 0) {
        await page.select(seg.select.sel, seg.select.value);
        await new Promise((r) => setTimeout(r, 120));
      }
      await soft(shoot);
    }
    cur = { ...to };
  }
  markers.push({ label, start, end: n - 1 });
  console.log(`  ${label}: f${start}-${n - 1}`);
}

// ── Home ────────────────────────────────────────────────────────────────────
await page.goto(HOME, { waitUntil: "networkidle2", timeout: 90000 });
await new Promise((r) => setTimeout(r, 4500));
await hideChrome();
await page.evaluate(CURSOR);
await page.evaluate((p) => window.__setCursor(p.x, p.y, false), cur);

console.log("home:");
await run("hero", [{ frames: 26, to: { x: 520, y: 560 } }]);
await run("scroll-to-form", [{ frames: 46, scrollTo: 980, to: { x: 700, y: 430 } }]);

await run("form-plan", [
  { frames: 14, at: '#oms-signup input[name="plan_interest"][value="Growth"]' },
  { frames: 3, click: true },
  { frames: 8 },
]);
await run("form-company", [
  { frames: 12, at: "#oms-company" },
  { frames: 3, click: true },
  { frames: 30, type: { sel: "#oms-company", text: "The Orchard Bar" } },
]);
await run("form-role", [
  { frames: 12, at: "#oms-position" },
  { frames: 8, select: { sel: "#oms-position", value: "Owner" } },
]);
await run("form-locations", [
  { frames: 10, at: "#oms-locations" },
  { frames: 8, select: { sel: "#oms-locations", value: "2-3" } },
]);
await run("form-email", [
  { frames: 12, at: "#oms-email" },
  { frames: 3, click: true },
  { frames: 34, type: { sel: "#oms-email", text: "hello@theorchardbar.co.uk" } },
]);
// The moment the form is trying to show: consent ticked, Send comes alive.
await run("form-consent", [
  { frames: 14, at: "#oms-consent" },
  { frames: 3, click: true },
  { frames: 16 },
]);
await run("form-send", [
  { frames: 12, at: "#oms-submit" },
  { frames: 22 }, // hovered, never clicked: this posts to a live HubSpot
]);

await run("plans", [{ frames: 52, scrollTo: 2450, to: { x: 1050, y: 520 } }, { frames: 18 }]);
await run("tiers", [
  { frames: 44, scrollTo: 3450 },
  { frames: 14 },
  { frames: 40, scrollTo: 4230 },
  { frames: 22 },
]);

// ── Nav across to How it Works ──────────────────────────────────────────────
// The header scrolls away with the page (position: relative), so the recording
// has to travel back up to reach the link. That read is worth keeping rather
// than hard-coding, since a sticky header would make the trip unnecessary.
const navSticky = await page.evaluate(() => {
  const h = document.querySelector("header");
  return h ? getComputedStyle(h).position : "static";
});
console.log("header position:", navSticky);
if (navSticky !== "sticky" && navSticky !== "fixed") {
  await run("back-to-top", [{ frames: 30, scrollTo: 0 }]);
}
const navLink = await page.evaluate(() => {
  const a = [...document.querySelectorAll("header a")].find((el) =>
    /how it works/i.test(el.textContent),
  );
  const b = a.getBoundingClientRect();
  return { x: Math.round(b.left + b.width / 2), y: Math.round(b.top + b.height / 2) };
});
await run("nav-to-hiw", [
  { frames: 18, to: navLink },
  { frames: 4, click: true, navigates: true },
]);

await page.waitForNavigation({ waitUntil: "networkidle2", timeout: 90000 }).catch(() => {});
await new Promise((r) => setTimeout(r, 3500));
await hideChrome();
await page.evaluate(CURSOR);
scrollY = await page.evaluate(() => window.scrollY);
await page.evaluate((p) => window.__setCursor(p.x, p.y, false), cur);

// ── How it Works ────────────────────────────────────────────────────────────
console.log("how it works:");
await run("hiw-hero", [{ frames: 26, to: { x: 620, y: 520 } }]);
await run("hiw-steps", [
  { frames: 46, scrollTo: 1000, to: { x: 900, y: 470 } },
  { frames: 16 },
  { frames: 44, scrollTo: 1980 },
  { frames: 16 },
]);
await run("hiw-benefits", [{ frames: 46, scrollTo: 2860, to: { x: 720, y: 520 } }, { frames: 26 }]);
await run("hiw-proof", [{ frames: 42, scrollTo: 3880 }, { frames: 20 }]);
await run("hiw-cta", [{ frames: 36, scrollTo: 4560 }, { frames: 30 }]);

writeFileSync(`${OUT}/markers.json`, `${JSON.stringify({ fps: FPS, w: W, h: H, markers }, null, 2)}\n`);
console.log(`\ncaptured ${n} frames at ${FPS}fps (${(n / FPS).toFixed(1)}s) -> ${OUT}`);
await browser.close();
