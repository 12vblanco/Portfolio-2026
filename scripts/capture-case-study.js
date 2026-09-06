/* Captures case-study screenshots from a live site and writes the two-width
   WebP + JPEG derivatives the <Shot> component expects.

   Requires puppeteer-core (sharp is already a dependency):
     npm i -D puppeteer-core
   It drives the Chrome already installed at CHROME below, so nothing is downloaded.

   Usage: node scripts/capture-case-study.js scripts/capture-configs/<client>.json

   Config shape:
   {
     "outDir": "/abs/path/to/src/assets/case-studies/<client>",
     "userAgent": "Mozilla/5.0 …",        // optional, applies to every shot
     "shots": [
       { "name": "live-hero", "url": "https://…", "selector": "#home",
         "widths": [800, 1600], "viewport": 1600, "scale": 1,
         "hide": [".cookie-banner"], "blockHosts": ["usemessages.com"],
         "userAgent": "…", "settleAnimations": true, "waitMs": 2500,
         "actions": [           // for sites with one URL and no routes
           { "key": "ArrowDown" },
           { "click": "nav a", "text": "Exhibition", "wait": 1600 },
           { "scroll": 900 }    // scrolls the real inner scroller, not window
         ],
         "sourceOnly": true }   // keep the original, skip the derivatives
     ]
   }
   Originals land in <outDir>/_source (gitignored); derivatives beside them. */

import { mkdirSync, readFileSync } from "fs";
import { join } from "path";
import puppeteer from "puppeteer-core";
import sharp from "sharp";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const cfg = JSON.parse(readFileSync(process.argv[2], "utf-8"));
const srcDir = join(cfg.outDir, "_source");
mkdirSync(srcDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--hide-scrollbars", "--force-device-scale-factor=1"],
});

for (const s of cfg.shots) {
  const viewport = s.viewport || 1600;
  const scale = s.scale || 1;
  const page = await browser.newPage();
  await page.setViewport({
    width: viewport,
    height: s.viewportHeight || 1000,
    deviceScaleFactor: scale,
    isMobile: viewport < 700,
    hasTouch: viewport < 700,
  });

  // Some hosts (HubSpot CMS among them) answer the default HeadlessChrome UA
  // with a 404 on every path, so the capture silently photographs an error page.
  const ua = s.userAgent || cfg.userAgent;
  if (ua) await page.setUserAgent(ua);

  // Scroll-triggered reveals never fire in a full-page capture, so the page
  // would photograph as blank. Asking for reduced motion skips them entirely.
  if (s.reducedMotion) {
    await page.emulateMediaFeatures([
      { name: "prefers-reduced-motion", value: "reduce" },
    ]);
  }

  // Reveals driven by a scroll-linked timeline (animation-timeline: view())
  // ignore prefers-reduced-motion and never resolve in a full-page shot: Chrome
  // grows the viewport to the whole document, so nothing ever scrolls and every
  // band photographs empty. Re-pointing them at the document timeline and
  // collapsing the duration lands each one on its final frame.
  if (s.settleAnimations) {
    await page.evaluateOnNewDocument(() => {
      const css = `*, *::before, *::after {
        animation-timeline: auto !important;
        animation-range: normal !important;
        animation-delay: 0s !important;
        animation-duration: 1ms !important;
        animation-fill-mode: forwards !important;
        animation-play-state: running !important;
      }`;
      const add = () => {
        const el = document.createElement("style");
        el.textContent = css;
        document.head.appendChild(el);
      };
      if (document.head) add();
      else document.addEventListener("DOMContentLoaded", add);
    });
  }

  // Some third-party widgets (HubSpot's chat bubble, its cookie banner) re-render
  // themselves after `hide` has run, so display:none loses the race. Refusing their
  // script the network is the only thing that reliably keeps them off the shot.
  if (s.blockHosts?.length) {
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      let host = "";
      try {
        host = new URL(req.url()).host;
      } catch {
        host = "";
      }
      if (host && s.blockHosts.some((h) => host.includes(h))) req.abort();
      else req.continue();
    });
  }

  // networkidle2 is the right default, but a site holding a connection open
  // (analytics sockets, a dev server, a long poll) never reaches it and the
  // capture dies on a timeout instead. Those can fall back to domcontentloaded
  // and let waitMs do the settling.
  const waitUntil = s.waitUntil || cfg.waitUntil || "networkidle2";
  const res = await page.goto(s.url, { waitUntil, timeout: 90000 });
  // An error page still screenshots perfectly well, so fail loudly instead.
  if (res && res.status() >= 400) {
    throw new Error(`${s.name}: ${s.url} returned ${res.status()}`);
  }
  await new Promise((r) => setTimeout(r, s.waitMs ?? 2500));

  // Drop anything that would date the shot or cover the content.
  if (s.hide?.length) {
    await page.evaluate((sels) => {
      sels.forEach((sel) =>
        document
          .querySelectorAll(sel)
          .forEach((el) => (el.style.display = "none")),
      );
    }, s.hide);
    await new Promise((r) => setTimeout(r, 400));
  }

  // Some sites have no URL per screen: they navigate through a gesture behind a
  // transition lock, so `goto` can only ever reach the first one. `actions`
  // replays that gesture before the shot is taken.
  for (const a of s.actions ?? []) {
    // A keypress beats a synthetic wheel event on anything using a smooth-scroll
    // library: those often ignore wheel deltas below a velocity floor.
    if (a.key) await page.keyboard.press(a.key);

    // Nav items and cards built with styled-components have generated class
    // names, so the visible text is the only stable handle. Of the elements
    // matching, click the deepest — every ancestor up to <body> also contains
    // the text, and clicking a wrapper never reaches the child's own handler.
    // A click on the deepest one bubbles back up to whichever ancestor owns it.
    if (a.click) {
      const found = await page.evaluate(
        (sel, text) => {
          let els = [...document.querySelectorAll(sel)];
          if (text) els = els.filter((e) => e.textContent.includes(text));
          const el = els.find((e) => !els.some((o) => o !== e && e.contains(o)));
          if (!el) return false;
          el.click();
          return true;
        },
        a.click,
        a.text,
      );
      if (!found) {
        throw new Error(
          `${s.name}: no match for ${a.click}${a.text ? ` containing "${a.text}"` : ""}`,
        );
      }
    }

    // When the document itself is overflow:hidden, the thing that actually
    // scrolls is some inner element, and window.scrollTo is a silent no-op.
    // Find the real scroller rather than needing its generated class name.
    if (a.scroll != null) {
      const scrolled = await page.evaluate((y) => {
        const el = [...document.querySelectorAll("*")].find(
          (e) => e.scrollHeight > e.clientHeight + 50 && e.clientHeight > 200,
        );
        if (el) el.scrollTop = y;
        else window.scrollTo(0, y);
        return !!el;
      }, a.scroll);
      if (!scrolled && a.requireScroller) {
        throw new Error(`${s.name}: no inner scroller found to scroll`);
      }
    }

    // Between every step: a page that cross-fades and then holds an input lock
    // photographs mid-transition unless the wait clears both.
    await new Promise((r) => setTimeout(r, a.wait ?? 1400));
  }

  // A section taller than the phone screen reads as a 1:5 ribbon in a device
  // frame, so `scrollTo` captures one screenful of it instead of the whole box.
  if (s.scrollPx) {
    await page.evaluate((y) => window.scrollTo(0, y), s.scrollPx);
    await new Promise((r) => setTimeout(r, 900));
  }

  if (s.scrollTo) {
    await page.evaluate((sel) => {
      document.querySelector(sel)?.scrollIntoView({ block: "start" });
    }, s.scrollTo);
    await new Promise((r) => setTimeout(r, 900));
  }

  // A full-page shot never scrolls, so loading="lazy" images below the fold
  // stay unloaded and photograph as empty boxes. Walk the page first.
  if (s.fullPage) {
    await page.evaluate(async () => {
      const step = window.innerHeight;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 250));
      }
      window.scrollTo(0, 0);
    });
    await new Promise((r) => setTimeout(r, 1500));
  }

  const raw = join(srcDir, `${s.name}.png`);
  if (s.selector && !s.scrollTo) {
    const el = await page.$(s.selector);
    if (!el) throw new Error(`No match for ${s.selector} on ${s.url}`);
    await el.screenshot({ path: raw });
  } else {
    await page.screenshot({ path: raw, fullPage: !!s.fullPage });
  }
  await page.close();

  // Trim a fixed overlay (a cookie bar) that no selector reliably matched.
  if (s.cropBottom) {
    const m0 = await sharp(raw).metadata();
    const buf = await sharp(raw)
      .extract({ left: 0, top: 0, width: m0.width, height: m0.height - s.cropBottom })
      .toBuffer();
    await sharp(buf).toFile(raw);
  }

  const meta = await sharp(raw).metadata();

  // A full-page shot is usually only ever a source to cut section bands out of
  // (see extract-mockup.js), and its derivatives are megabytes nothing imports.
  // `sourceOnly` keeps it in _source, which is gitignored.
  if (s.sourceOnly) {
    console.log(`${s.name}: source ${meta.width}x${meta.height} -> _source only`);
    continue;
  }

  // Never upscale: a width above the source's own pixels would only invent
  // detail and lie about it in the srcSet.
  const widths = s.widths.filter((w) => w <= meta.width);
  if (!widths.length) widths.push(meta.width);

  for (const w of widths) {
    const base = join(cfg.outDir, `${s.name}-${w}`);
    await sharp(raw).resize({ width: w }).webp({ quality: 82 }).toFile(`${base}.webp`);
    await sharp(raw).resize({ width: w }).jpeg({ quality: 82, mozjpeg: true }).toFile(`${base}.jpg`);
  }
  // The largest width's real pixels, for the <Shot> width/height props.
  const big = Math.max(...widths);
  const dropped = s.widths.filter((w) => !widths.includes(w));
  console.log(
    `${s.name}: source ${meta.width}x${meta.height} -> ${widths.join("/")} ` +
      `(intrinsic ${big}x${Math.round((meta.height / meta.width) * big)})` +
      (dropped.length ? `  [skipped upscale: ${dropped.join("/")}]` : ""),
  );
}

await browser.close();
