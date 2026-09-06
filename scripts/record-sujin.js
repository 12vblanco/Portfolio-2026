/* Records Sujin Kim's portfolio being *used*: the cursor shreds the particle
   hero, the line wipe hands over to the archive, then the three rooms.

   Sibling of record-oms.js and the same technique: an injected SVG pointer (a
   real capture has no cursor) and a frame-indexed timeline, so motion stays
   smooth however slow each screenshot is. Three things are new, all forced by
   what this site is:

   1. The real mouse moves every frame, not just on clicks. The hero is a canvas
      that repels particles from `mousemove`, so a purely decorative pointer
      would record a word that never reacts. Moving the real mouse also lights
      up the hover states (the nav scramble, the split hero) for free.
   2. `key` is a timeline verb. The site has no routes: the entrance advances on
      a keydown listener behind a 1000ms input lock, which at 20fps is 20 frames.
   3. Scrolling targets the inner scroller. html/body/#root are overflow:hidden,
      so window.scrollTo is a silent no-op and only an inner overflow:auto div
      actually moves.

     node scripts/record-sujin.js [outDir]

   Then encode with scripts/encode-sujin.js, which reads markers.json.

   `at` resolves in viewport coordinates when its segment starts, so do not put
   `at` and `scrollTo` in the same segment: move first, then scroll. */

import { mkdirSync, writeFileSync } from "fs";
import puppeteer from "puppeteer-core";

const OUT =
  process.argv[2] ||
  "/private/tmp/claude-501/-Users-vbl-Desktop--WEBSITES-VB-Portfolio-victor-blanco-portfolio-styled/6c5eb703-aae9-48da-97ad-8287072e9c93/scratchpad/sujin-frames";
mkdirSync(OUT, { recursive: true });

const FPS = 20;
// Rendered through <Clip> at content width, not in a home-page card, so this is
// the site's own desktop viewport rather than the card's 1.586 ratio.
const W = 1440;
const H = 900;
const SITE = "https://sujink.netlify.app/";
// The site never reliably reaches network idle; the wait after goto settles it.
const WAIT_UNTIL = "domcontentloaded";
// One transition is a 300ms fade plus a 1000ms input lock: 26 frames clears both.
const LOCK = 26;

const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: "new",
  args: ["--hide-scrollbars", "--force-device-scale-factor=1"],
});
const page = await browser.newPage();
await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });

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

/* The document does not scroll; some inner element does. Find it once per
   segment rather than hard-coding a generated styled-components class name. */
const setScroll = (y) =>
  page.evaluate((v) => {
    const el = [...document.querySelectorAll("*")].find(
      (e) => e.scrollHeight > e.clientHeight + 50 && e.clientHeight > 200,
    );
    if (el) el.scrollTop = v;
    else window.scrollTo(0, v);
  }, y);

/* Viewport-space centre of an element, named by selector and optionally by the
   text it contains, since nav items and cards have generated class names. */
const rectOf = (sel, text) =>
  page.evaluate(
    (s, t) => {
      let els = [...document.querySelectorAll(s)];
      if (t) els = els.filter((e) => e.textContent.includes(t));
      const el = els.find((e) => !els.some((o) => o !== e && e.contains(o)));
      if (!el) return null;
      const b = el.getBoundingClientRect();
      return {
        x: Math.round(b.left + b.width / 2),
        y: Math.round(b.top + b.height / 2),
      };
    },
    sel,
    text,
  );

/* A DOM click on the element the last `at` resolved. Every "page" here is a
   full-viewport position:fixed layer, so a real mouse click on the navbar is
   swallowed by whichever layer is stacked above it; dispatching the click on the
   element itself bypasses hit-testing. The pointer still travels there first, so
   the recording reads the same either way. */
const domClick = (sel, text) =>
  page.evaluate(
    (s, t) => {
      let els = [...document.querySelectorAll(s)];
      if (t) els = els.filter((e) => e.textContent.includes(t));
      const el = els.find((e) => !els.some((o) => o !== e && e.contains(o)));
      el?.click();
    },
    sel,
    text,
  );

let n = 0;
let scrollY = 0;
let cur = { x: 220, y: 800 };
let lastTarget = null;
const markers = [];

// Only a frame that actually landed takes a number, so the sequence ffmpeg
// reads never has a hole in it.
const shoot = async () => {
  await page.screenshot({ path: `${OUT}/f${String(n).padStart(4, "0")}.png` });
  n++;
};

async function run(label, segs) {
  const start = n;
  for (const seg of segs) {
    const fromScroll = scrollY;
    const toScroll = seg.scrollTo ?? scrollY;
    const from = { ...cur };

    let to = seg.to || null;
    if (seg.at) {
      const r = await rectOf(seg.at, seg.text);
      if (!r) throw new Error(`no element for ${seg.at}${seg.text ? ` "${seg.text}"` : ""}`);
      to = r;
      lastTarget = { sel: seg.at, text: seg.text };
    }
    if (!to) to = { ...cur };

    for (let f = 0; f < seg.frames; f++) {
      const t = seg.frames === 1 ? 1 : ease(f / (seg.frames - 1));
      const y = Math.round(fromScroll + (toScroll - fromScroll) * t);
      if (y !== scrollY) {
        await setScroll(y);
        scrollY = y;
      }
      const cx = Math.round(from.x + (to.x - from.x) * t);
      const cy = Math.round(from.y + (to.y - from.y) * t);
      const down = !!seg.click && f < 2;

      // The real pointer, not just the drawn one: the hero canvas repels
      // particles from mousemove, and hover states depend on it too.
      await page.mouse.move(cx, cy);
      await page.evaluate((a) => window.__setCursor?.(a.x, a.y, a.d), {
        x: cx,
        y: cy,
        d: down,
      });

      if (seg.click && f === 0) {
        if (seg.click === "dom" && lastTarget) {
          await domClick(lastTarget.sel, lastTarget.text);
        } else {
          await page.mouse.click(cx, cy);
        }
        await new Promise((r) => setTimeout(r, 120));
      }
      // The entrance advances on a keydown listener, not a link.
      if (seg.key && f === 0) {
        await page.keyboard.press(seg.key);
        await new Promise((r) => setTimeout(r, 120));
      }
      await shoot();
    }
    cur = { ...to };
  }
  markers.push({ label, start, end: n - 1 });
  console.log(`  ${label}: f${start}-${n - 1}`);
}

await page.goto(SITE, { waitUntil: WAIT_UNTIL, timeout: 90000 });
// The canvas only samples the word once document.fonts.load resolves PP
// Editorial New; sampling earlier gives the fallback serif's letterforms.
await new Promise((r) => setTimeout(r, 6000));
await page.evaluate(CURSOR);
await page.evaluate((p) => window.__setCursor(p.x, p.y, false), cur);

// ── Entrance: the particle hero ─────────────────────────────────────────────
console.log("entrance:");
// At rest the word is real text, crisp. Hold before touching it.
await run("landing", [{ frames: 18 }]);
// Straight through "Perspective", left to right: each pass shreds the pixels it
// passes and they ease back once the cursor has gone by.
await run("particles-in", [{ frames: 30, to: { x: 320, y: 620 } }]);
await run("particles-sweep", [
  { frames: 34, to: { x: 900, y: 590 } },
  { frames: 30, to: { x: 1260, y: 640 } },
]);
// Up through "Design" on the way out, then away so the text resolves back in.
await run("particles-out", [
  { frames: 26, to: { x: 700, y: 360 } },
  { frames: 24, to: { x: 1180, y: 180 } },
]);

// ── The line wipe, then the archive ─────────────────────────────────────────
// The first scroll down does not navigate: the rule under "Curated by Sujin
// Kim" collapses 68% -> 0 first, and navigation follows 700ms later.
await run("wipe", [{ frames: 4, key: "ArrowDown" }, { frames: 30 }]);
console.log("archive:");
await run("archive-2025", [{ frames: 22 }]);
await run("archive-step", [{ frames: 4, key: "ArrowDown" }, { frames: LOCK + 8 }]);
await run("archive-step-2", [{ frames: 4, key: "ArrowDown" }, { frames: LOCK + 10 }]);

// ── Exhibition ──────────────────────────────────────────────────────────────
console.log("exhibition:");
await run("to-exhibition", [
  { frames: 20, at: "nav > div", text: "Exhibition" },
  { frames: 4, click: "dom" },
  { frames: LOCK + 10 },
]);
// The two halves of the category image slide apart 110px on hover to expose the
// dictionary card underneath: palbangmiin, a person talented in many areas.
await run("split-hero", [
  { frames: 22, to: { x: 720, y: 470 } },
  { frames: 30 },
]);
await run("filter", [
  { frames: 20, at: "button", text: "BRANDING" },
  { frames: 4, click: "dom" },
  { frames: 22 },
]);
await run("grid", [
  { frames: 20, to: { x: 700, y: 700 } },
  { frames: 44, scrollTo: 800 },
  { frames: 16 },
]);

// ── A project ───────────────────────────────────────────────────────────────
// Each block of the detail page has its own IntersectionObserver entrance, so
// this has to scroll for any of them to play.
console.log("project:");
await run("open-project", [
  { frames: 20, at: "div", text: "Logo Design" },
  { frames: 4, click: "dom" },
  { frames: 24 },
]);
await run("project-scroll", [
  { frames: 46, scrollTo: 700 },
  { frames: 14 },
  { frames: 42, scrollTo: 1500 },
  { frames: 18 },
]);

writeFileSync(
  `${OUT}/markers.json`,
  `${JSON.stringify({ fps: FPS, w: W, h: H, markers }, null, 2)}\n`,
);
console.log(`\ncaptured ${n} frames at ${FPS}fps (${(n / FPS).toFixed(1)}s) -> ${OUT}`);
await browser.close();
