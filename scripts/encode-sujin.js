/* Turns the frames from scripts/record-sujin.js into the in-page clip for the
   Sujin Kim case study, plus its poster.

     node scripts/record-sujin.js               # writes frames + markers.json
     node scripts/encode-sujin.js [framesDir]

   Outputs, under src/assets/case-studies/sujin:

     sujin-interaction.mp4          the clip, rendered through <Clip>
     sujin-interaction-poster.jpg   frame 0, so the poster and the first video
                                    frame are the same picture

   Unlike encode-oms.js there is no home-card export here: that card already has
   sujik.mp4. This is a case-study figure at content width instead.

   The cut is assembled from named segments in markers.json rather than by
   counting frames, and a stride above 1 drops frames to speed a segment up. The
   full take runs 35s, which is a long loop to sit under; the parts worth their
   full frame count are the two that only exist as motion — the cursor shredding
   the hero, and the split hero opening — so everything else is strided down.

   Requires ffmpeg on PATH. */

import { cpSync, existsSync, mkdirSync, readFileSync, rmSync } from "fs";
import { execFileSync } from "child_process";
import { join } from "path";
import sharp from "sharp";

const ROOT = "/Users/vbl/Desktop/_WEBSITES/VB Portfolio/victor-blanco-portfolio-styled";
const FRAMES =
  process.argv[2] ||
  "/private/tmp/claude-501/-Users-vbl-Desktop--WEBSITES-VB-Portfolio-victor-blanco-portfolio-styled/6c5eb703-aae9-48da-97ad-8287072e9c93/scratchpad/sujin-frames";
const OUT = join(ROOT, "src/assets/case-studies/sujin");
const TMP = join(FRAMES, "..", "sujin-cut-frames");

const { fps, markers } = JSON.parse(readFileSync(join(FRAMES, "markers.json"), "utf8"));
const seg = (label) => {
  const m = markers.find((x) => x.label === label);
  if (!m) throw new Error(`no marker "${label}"`);
  return m;
};
const frame = (dir, i) => join(dir, `f${String(i).padStart(4, "0")}.png`);
const ff = (args) =>
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", ...args], { stdio: "inherit" });

// Named moments, in order. No stride on the hero or the split hero: those two
// are the whole reason the clip exists and they read as gimmicks when rushed.
const cut = [
  { label: "landing" },
  { label: "particles-in" },
  { label: "particles-sweep" },
  { label: "particles-out", stride: 2 },
  { label: "wipe" },
  { label: "archive-2025", stride: 2 },
  { label: "archive-step", stride: 2 },
  { label: "archive-step-2", stride: 2 },
  { label: "to-exhibition", stride: 2 },
  { label: "split-hero" },
  { label: "filter", stride: 2 },
  { label: "grid", stride: 2 },
  { label: "open-project", stride: 2 },
  { label: "project-scroll", stride: 2 },
];

rmSync(TMP, { recursive: true, force: true });
mkdirSync(TMP, { recursive: true });
let k = 0;
for (const c of cut) {
  const m = seg(c.label);
  for (let i = m.start; i <= m.end; i += c.stride || 1) {
    if (!existsSync(frame(FRAMES, i))) continue;
    cpSync(frame(FRAMES, i), frame(TMP, k++));
  }
}
console.log(`cut: ${k} frames (${(k / fps).toFixed(1)}s)`);

/* 1440 down to 1200. The figure renders at min(80vw, 1080px), so 1200 clears
   full size on a 1x screen and the type in the archive stays readable; the
   particle field is fine detail on a near-flat ground, which is what pushes the
   bitrate here, so crf 30 rather than the 28 the OMS card uses. */
ff([
  "-framerate", String(fps),
  "-i", join(TMP, "f%04d.png"),
  "-vf", "scale=1200:-2",
  "-c:v", "libx264", "-preset", "slow", "-crf", "30",
  "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an",
  join(OUT, "sujin-interaction.mp4"),
]);
console.log("sujin-interaction.mp4");

// The poster is frame 0 of the cut, so the still the reader sees before pressing
// play is exactly the frame the video opens on: the hero at rest, as real text.
await sharp(frame(TMP, 0))
  .resize({ width: 1200 })
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(join(OUT, "sujin-interaction-poster.jpg"));
console.log("sujin-interaction-poster.jpg");
