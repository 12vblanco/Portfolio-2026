/**
 * Extract case-study shots from a flat design mockup (a Figma export, a PDF page,
 * a stitched comp) rather than from a live site.
 *
 * Sibling of scripts/capture-case-study.js: same output contract, so the shots it
 * writes drop straight into <Shot> via shot() in src/components/case-study/utils.js.
 * Use this one when the build is not reachable by a browser (unpublished, behind a
 * login, or the nav/footer are not wired up yet) but a full-page design exists.
 *
 *   node scripts/extract-mockup.js scripts/capture-configs/oms-mockup.json
 *
 * Config:
 *   src      default path to the mockup image; a crop may override
 *   outDir   where derivatives land (originals go to <outDir>/_source, gitignored)
 *   widths   default derivative widths; a crop may override
 *   crops[]  { name, left, top, width, height, src?, widths?, sourceOnly? }
 *
 * Widths larger than the crop's own pixel width are dropped rather than upscaled,
 * matching the capture harness.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const configPath = process.argv[2];
if (!configPath) {
  console.error("usage: node scripts/extract-mockup.js <config.json>");
  process.exit(1);
}

const cfg = JSON.parse(await (await import("node:fs/promises")).readFile(configPath, "utf8"));
const outDir = path.resolve(cfg.outDir);
const sourceDir = path.join(outDir, "_source");
await mkdir(sourceDir, { recursive: true });

// Cached per source, since a config may cut from several images.
const metaCache = new Map();
const metaFor = async (file) => {
  if (!metaCache.has(file)) metaCache.set(file, await sharp(file).metadata());
  return metaCache.get(file);
};

if (cfg.src) {
  const m = await metaFor(path.resolve(cfg.src));
  console.log(`mockup ${path.basename(cfg.src)} ${m.width}x${m.height}`);
}

const manifest = [];

for (const crop of cfg.crops) {
  const { name, left, top, width, height } = crop;
  const src = path.resolve(crop.src ?? cfg.src);
  const meta = await metaFor(src);

  if (left + width > meta.width || top + height > meta.height) {
    console.error(`  ! ${name}: crop exceeds ${path.basename(src)}, skipped`);
    continue;
  }

  // The untouched crop, kept out of git, so a shot can be re-derived without
  // re-cutting it out of the mockup by hand.
  const original = path.join(sourceDir, `${name}.png`);
  await sharp(src).extract({ left, top, width, height }).png().toFile(original);

  if (crop.sourceOnly) {
    console.log(`  ${name}  ${width}x${height}  -> _source only`);
    manifest.push({ name, width, height, widths: [] });
    continue;
  }

  const widths = (crop.widths ?? cfg.widths).filter((w) => w <= width);
  const dropped = (crop.widths ?? cfg.widths).filter((w) => w > width);
  if (dropped.length) console.log(`  ${name}: dropping ${dropped.join(",")} (source is ${width}px)`);

  for (const w of widths) {
    const resized = sharp(original).resize({ width: w, withoutEnlargement: true });
    await resized.clone().webp({ quality: 82 }).toFile(path.join(outDir, `${name}-${w}.webp`));
    await resized.clone().jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(outDir, `${name}-${w}.jpg`));
  }

  console.log(`  ${name}  ${width}x${height}  -> ${widths.join(", ")}`);
  manifest.push({ name, width, height, widths });
}

// Intrinsic dimensions, so shot() gets the right width/height without guessing.
await writeFile(
  path.join(sourceDir, "manifest.json"),
  `${JSON.stringify({ src: cfg.src, crops: manifest }, null, 2)}\n`,
);
console.log(`\n${manifest.length} crops -> ${path.relative(process.cwd(), outDir)}`);
