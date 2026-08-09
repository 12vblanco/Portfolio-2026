/* Captures case-study screenshots from a live site and writes the two-width
   WebP + JPEG derivatives the <Shot> component expects.

   Requires puppeteer-core (sharp is already a dependency):
     npm i -D puppeteer-core
   It drives the Chrome already installed at CHROME below, so nothing is downloaded.

   Usage: node scripts/capture-case-study.js scripts/capture-configs/<client>.json

   Config shape:
   {
     "outDir": "/abs/path/to/src/assets/case-studies/<client>",
     "shots": [
       { "name": "live-hero", "url": "https://…", "selector": "#home",
         "widths": [800, 1600], "viewport": 1600, "scale": 1,
         "hide": [".cookie-banner"], "blockHosts": ["usemessages.com"],
         "waitMs": 2500 }
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

  // Scroll-triggered reveals never fire in a full-page capture, so the page
  // would photograph as blank. Asking for reduced motion skips them entirely.
  if (s.reducedMotion) {
    await page.emulateMediaFeatures([
      { name: "prefers-reduced-motion", value: "reduce" },
    ]);
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

  await page.goto(s.url, { waitUntil: "networkidle2", timeout: 90000 });
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

  // Never upscale: a width above the source's own pixels would only invent
  // detail and lie about it in the srcSet.
  const meta = await sharp(raw).metadata();
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
