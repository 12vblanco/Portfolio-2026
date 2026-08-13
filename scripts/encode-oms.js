/* Turns the frames from scripts/record-oms.js into the two videos the OMS work
   needs, plus the card stills that stand in until each one plays.

     node scripts/record-oms.js                 # writes frames + markers.json
     node scripts/encode-oms.js [framesDir]

   Outputs, all under src/assets/case-studies/oms:

     oms.mp4                        the full take, for the home-page card
     oms1.webp / .jpg               that card's still, cut from frame 0 so the
     oms-M.webp / .jpg              poster and the video cannot disagree
     linkedin-oms/oms-relaunch-linkedin.mp4
     linkedin-oms/oms-relaunch-linkedin-cover.jpg

   The LinkedIn cut is assembled from named segments in markers.json rather than
   by counting frames, and a stride above 1 drops frames to speed a segment up:
   the scrolls are the parts worth running fast, the form completing is not.

   Requires ffmpeg on PATH. */

import { cpSync, existsSync, mkdirSync, readFileSync, rmSync } from "fs";
import { execFileSync } from "child_process";
import { join } from "path";
import sharp from "sharp";

const ROOT = "/Users/vbl/Desktop/_WEBSITES/VB Portfolio/victor-blanco-portfolio-styled";
const FRAMES =
  process.argv[2] ||
  "/private/tmp/claude-501/-Users-vbl-Desktop--WEBSITES-VB-Portfolio-victor-blanco-portfolio-styled/d7587600-7c4a-46c9-84a0-7e0a37fd0dc4/scratchpad/oms-frames";
const OUT = join(ROOT, "src/assets/case-studies/oms");
const LI = join(OUT, "linkedin-oms");
const TMP = join(FRAMES, "..", "oms-li-frames");

const { fps, markers } = JSON.parse(readFileSync(join(FRAMES, "markers.json"), "utf8"));
const seg = (label) => {
  const m = markers.find((x) => x.label === label);
  if (!m) throw new Error(`no marker "${label}"`);
  return m;
};
const frame = (i) => join(FRAMES, `f${String(i).padStart(4, "0")}.png`);
const ff = (args) => execFileSync("ffmpeg", ["-y", "-loglevel", "error", ...args], { stdio: "inherit" });

mkdirSync(LI, { recursive: true });

// ── 1. The home-page card: the whole take ───────────────────────────────────
// 1440x908 down to 1024x646, keeping the card's own 1.586 ratio so `object-fit:
// cover` has nothing to trim. The card renders around 440px wide, so 1024 is
// still well over 2x, and it roughly halves the file against a 1280 encode with
// the form's labels still crisp at full size.
ff([
  "-framerate", String(fps),
  "-i", join(FRAMES, "f%04d.png"),
  "-vf", "scale=1024:-2",
  "-c:v", "libx264", "-preset", "slow", "-crf", "28",
  "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an",
  join(OUT, "oms.mp4"),
]);
console.log("oms.mp4");

// ── 2. Card stills ──────────────────────────────────────────────────────────
// These are what the card shows before the clip loads and again once it ends,
// so on mobile (where the video is never fetched at all) the still is the whole
// impression. The desktop one is frame 0 of the clip itself, so the poster and
// the first video frame are the same picture and the card does not jump.
const still = async (src, name, w, h, opts = {}) => {
  let img = sharp(src);
  if (opts.extract) img = sharp(await img.extract(opts.extract).toBuffer());
  img = img.resize({ width: w, height: h, fit: "cover", position: opts.position || "top" });
  await img.clone().webp({ quality: 82 }).toFile(join(OUT, `${name}.webp`));
  await img.clone().jpeg({ quality: 84, mozjpeg: true }).toFile(join(OUT, `${name}.jpg`));
  console.log(`${name}  ${w}x${h}`);
};
await still(frame(0), "oms1", 943, 595);

/* The mobile card is 366x380 CSS, so this is cut at 2x for a phone screen. The
   window matters more than the size: the top of the 510px layout is logo,
   burger and illustration, which says nothing about who OMS are, and the bottom
   is body copy. y=420 is the one 1020x1079 window holding the phone *and* the
   whole "Restaurant ordering software that saves time & protects your margins"
   headline, which is what the other studies' mobile cards lead with. */
await still(join(OUT, "_source/live-mobile-home.png"), "oms-M", 718, 760, {
  extract: { left: 0, top: 420, width: 1020, height: 1079 },
});

// ── 3. The LinkedIn cut ─────────────────────────────────────────────────────
// Named moments, in order. `stride` 2 halves a segment's length by dropping
// every other frame, which reads as double speed at the same frame rate.
const cut = [
  { label: "hero" },
  { label: "scroll-to-form", stride: 2 },
  { label: "form-plan", stride: 2 },
  { label: "form-company", stride: 2 },
  { label: "form-role", stride: 2 },
  { label: "form-locations", stride: 2 },
  { label: "form-email", stride: 2 },
  { label: "form-consent" },
  { label: "form-send" },
  // Stopping at "Plans for everyone" rather than riding the homepage down to
  // its CTA: both pages end on the same lime band, and the cut already closes
  // on the How it Works one.
  { label: "plans", stride: 3 },
  { label: "back-to-top", stride: 3 },
  { label: "nav-to-hiw" },
  // How it Works gets the same treatment as the homepage rather than a hero and
  // a jump to the end: the four steps are the page's whole argument, so they run
  // here at the pace the form does.
  { label: "hiw-hero" },
  { label: "hiw-steps", stride: 2 },
  { label: "hiw-benefits" },
  { label: "hiw-cta", stride: 2 },
];

rmSync(TMP, { recursive: true, force: true });
mkdirSync(TMP, { recursive: true });
let k = 0;
for (const c of cut) {
  const m = seg(c.label);
  for (let i = m.start; i <= m.end; i += c.stride || 1) {
    if (!existsSync(frame(i))) continue;
    cpSync(frame(i), join(TMP, `f${String(k++).padStart(4, "0")}.png`));
  }
}
console.log(`linkedin cut: ${k} frames (${(k / fps).toFixed(1)}s)`);

// The card the recording sits on: OMS lime #C3E04D and their hot pink #FF69B4,
// both sampled off the live site rather than guessed.
const LIME = "#C3E04D";
const PINK = "#FF69B4";
/* The recording is shot at the home card's ratio, so at 1080 wide it is 681
   tall and the card has 399px to divide between the headline and the URL. */
const VIDEO_TOP = 255;
const VIDEO_H = 681;
const card = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080">
  <rect width="1080" height="1080" fill="#141414"/>
  <rect x="0" y="${VIDEO_TOP}" width="1080" height="${VIDEO_H}" fill="#000000"/>
  <g font-family="Helvetica Neue, Helvetica, Arial, sans-serif" text-anchor="middle">
    <text x="540" y="80" fill="${LIME}" font-size="25" font-weight="700" letter-spacing="6">ORDERS MADE SIMPLE</text>
    <text x="540" y="172" fill="#ffffff" font-size="82" font-weight="700" letter-spacing="-2">Relaunched<tspan fill="${PINK}">.</tspan></text>
    <text x="540" y="224" fill="#9a9a9a" font-size="26" font-weight="400">A hospitality procurement site, rebuilt from the brand up</text>
    <text x="540" y="1018" fill="${LIME}" font-size="30" font-weight="700" letter-spacing="1">ordersmadesimple.com</text>
  </g>
</svg>`);
const cardPng = join(TMP, "card.png");
await sharp(card).png().toFile(cardPng);

// The card is looped at the same frame rate and overlay is told to end with the
// shorter input: given a single still, ffmpeg would otherwise time the output
// off the image's default 25fps and resample the whole take up from 20, which
// duplicates frames unevenly and shows as judder in the scrolls.
ff([
  "-framerate", String(fps),
  "-i", join(TMP, "f%04d.png"),
  "-loop", "1", "-framerate", String(fps),
  "-i", cardPng,
  "-filter_complex", `[0:v]scale=1080:-2[v];[1:v][v]overlay=0:${VIDEO_TOP}:shortest=1[o]`,
  "-map", "[o]",
  "-c:v", "libx264", "-preset", "slow", "-crf", "23",
  "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an",
  join(LI, "oms-relaunch-linkedin.mp4"),
]);
console.log("linkedin-oms/oms-relaunch-linkedin.mp4");

// A cover image for the post, in case LinkedIn is given a thumbnail by hand.
await sharp(await sharp(cardPng).toBuffer())
  .composite([
    {
      input: await sharp(join(TMP, "f0000.png")).resize({ width: 1080 }).toBuffer(),
      top: VIDEO_TOP,
      left: 0,
    },
  ])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(join(LI, "oms-relaunch-linkedin-cover.jpg"));
console.log("linkedin-oms/oms-relaunch-linkedin-cover.jpg");
