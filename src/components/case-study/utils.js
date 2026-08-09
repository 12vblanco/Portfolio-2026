/* Non-component helpers for case-study pages. Kept out of the .jsx files so
   fast refresh keeps working there (react-refresh/only-export-components). */

/* Every screenshot ships in two widths as WebP with a JPEG fallback. `webp`
   and `jpg` are [url, intrinsicWidth] pairs, smallest first; width/height are
   the largest variant's real pixels, so the browser can reserve the box
   before the file arrives. Feed the result to <Shot shot={...}>. */
export const shot = ({ webp, jpg, width, height }) => ({
  webp: webp.map(([url, w]) => `${url} ${w}w`).join(", "),
  jpg: jpg.map(([url, w]) => `${url} ${w}w`).join(", "),
  fallback: jpg[jpg.length - 1][0],
  width,
  height,
});

/* How wide an image actually renders, so the browser picks the right variant.
   Pages pass one of these to <Shot sizes>. */
export const SIZES = {
  // Full content width.
  full: "(max-width: 968px) 100vw, min(80vw, 1080px)",
  // The hero's side figure.
  side: "(max-width: 768px) calc(100vw - 4rem), 400px",
  // The before column of a before/after row running 1.3fr to 1fr.
  before: "(max-width: 700px) calc(100vw - 4rem), 580px",
  // The single phone in the after column.
  phone: "(max-width: 700px) min(calc(100vw - 4rem), 360px), 450px",
  // One cell of a three-up flow board.
  board: "(max-width: 700px) calc(100vw - 4rem), 300px",
};

/* Sections number themselves, so reordering or dropping one never leaves a gap.
   Call once per render (inside the component body) and use the result in each
   <SecNum>. */
export const createSectionNumber = () => {
  let n = 0;
  return () => String(++n).padStart(2, "0");
};
