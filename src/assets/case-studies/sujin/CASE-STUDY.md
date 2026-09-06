# Sujin Kim — Portfolio Site

**Case study source notes** — raw material for writing up this project on my own portfolio.

---

## 1. At a glance

| | |
|---|---|
| **Project** | Personal portfolio site for Sujin Kim, a UI/UX, branding and graphic designer (Seoul → Toronto) |
| **My role** | Sole front-end developer — translated the designer's Figma concept into a working site |
| **Type** | Single-page React app, no router, no backend |
| **Stack** | React 19, Vite 6, styled-components 6, Lenis smooth scroll, Canvas 2D |
| **Repos** | `origin` → github.com/12vblanco/sujink · `shared` → github.com/SujinK1210/portfolio |
| **Hosting** | Netlify (`netlify.toml`, SPA redirect to `/index.html`) |
| **Timeline** | First commit 2025-06-07 → last 2025-08-08 (~2 months, 34 commits) |
| **Size** | ~4,800 lines of JSX/JS across 22 source files; 5.4 MB of assets |

**One-line pitch:** a portfolio built as a gallery — three "rooms" (Entrance, Exhibition, Invitation) instead of pages, where the career history is walked through vertically like an exhibit and the hero title dissolves into particles under the cursor.

---

## 2. The concept

The client is a designer, so the brief was less "show my work" and more "the site *is* a piece of work." The whole information architecture borrows museum language, and the vocabulary is carried through consistently in the UI copy:

| Section | Museum metaphor | What it actually is |
|---|---|---|
| **Entrance** | The foyer + a walk through the archive | Landing hero, then a vertical chronological CV ("[Chrono Archive] — Roles, places, and chapters filed in time.") |
| **Exhibition** | The gallery floor | Filterable project grid + per-project detail pages |
| **Invitation** | The guest book | Contact card and form |

Even the landing copy is framed as a catalogue entry: *"A curated archive of Design and Perspective — Curated by Sujin Kim."*

**Design language:** two colours and two typefaces, nothing else. Bone white `#F9F8F6` and near-black `#111`. The Entrance landing is white-on-black inverted at the moment you leave it — landing is light, everything past it is dark, so the transition into the archive reads as walking from daylight into a gallery. Type is PP Editorial New (Pangram Pangram) for display — ultralight italic at 250px — against Museo Sans (Adobe Typekit) for UI text. Very high contrast between a fashion-editorial serif and a neutral grotesque.

---

## 3. The interesting technical bits

These are the parts worth actually writing about.

### 3.1 The particle hero — text that dissolves under the cursor

The landing word "Perspective" is not text. It's a `<canvas>` where the word is rendered once, read back with `getImageData`, and every opaque pixel above alpha 50 is converted into a `Particle` instance with a base position, a random size and a random "density" (its sensitivity to the mouse).

The interaction: the cursor carries a 100px repulsion radius. Particles inside it are pushed away along the vector from the mouse, scaled by their density — so the word doesn't shift uniformly, it *shreds*, some pixels flying further than others. Outside the radius, each particle eases back toward its base position at `dx/10` per frame. There's a crossfade running on top: the moment the mouse enters, the crisp text fades out (`0.1`/frame) while the particle layer fades in; once every particle has settled back within 0.5px of base and the mouse has left, the fade reverses slowly (`0.01`/frame) and the real text resolves back in. Two-layer approach means you get sharp typography at rest and a physical, scattering interaction on hover, without the cost of drawing particles when nobody's touching it.

**The bug worth telling:** the first build shipped a hero that was subtly the wrong shape on hard refresh. Because the particle positions are sampled from what the canvas painted, and the canvas painted before the webfont finished loading, the particles were sampled from the *fallback* serif — so the word dissolved into the wrong letterforms. Fix was to gate canvas initialisation behind `document.fonts.load('italic 250px "PP Editorial New"')` + `document.fonts.ready`, then wait one more `requestAnimationFrame` before the first paint. There are two commits literally named `animation bug fix wait for font`.

**Mobile:** the whole canvas is dropped below 480px and replaced with static styled text. ~90,000 particles at 60fps is a desktop-only pleasure, and there's no cursor to drive it anyway.

### 3.2 Scroll that doesn't scroll

The site is `overflow: hidden` at the html/body/#root level — the page never actually scrolls. Instead:

- A hidden `.scroll-content` div gives Lenis something to measure.
- Every page is `position: absolute`, full-viewport, stacked, and moved with `transform: translateY(-100vh → 0vh)` on a 1s `cubic-bezier(0.25, 0.46, 0.45, 0.94)`.
- Scroll input is treated as *discrete intent*, not distance. A 1000ms lockout (`isTransitioning` + a `lastScrollTime` timestamp) plus a velocity floor of `0.3` means one flick of a trackpad advances exactly one year of the career, never three.

The same navigation intent arrives from four sources, all funnelling into one `activeSection` index: Lenis scroll events, a raw `wheel` listener as a fallback, arrow keys, and the clickable year dots in the bottom timeline. Getting those four not to fight each other — particularly the wheel/Lenis overlap on trackpads with momentum — was the fiddliest part of the build (`navigation error fixed` appears three times in the log).

**The landing is a special case:** the first scroll down doesn't navigate. It fires a line-wipe animation under "Curated by Sujin Kim" (the rule collapses from 68% width to 0), *then* navigates 700ms later. So leaving the entrance has a deliberate beat to it rather than snapping.

### 3.3 Data-driven timeline

The career pages aren't hand-built. `work-history.js` is a keyed object (`2024`, `2023`, `2022-a`, `2022-b`, …) and `App.jsx` derives the entire page config from it at module scope: sorts descending by year, splits composite keys on `-` so a single year can hold multiple pages, and maps each to a `TimelinePage` instance. The comment in the data file spells out the contract for the client: *"you only need to duplicate the object below and change the year and content to create a new page."*

The schema flexes two ways — a year is either a single role (flat `company`/`role`/`description`/`skills`) or an `entries: []` array when several things happened at once (2022 has a college diploma running alongside restaurant work), and `TimelinePage` branches on the presence of `entries`. Twelve years, 1991 → 2025, live on the fixed bottom timeline rail.

### 3.4 Exhibition: filtering and reveals

Projects live in `exhibition.js` with a `category` plus a `tags[]` array, which is what actually drives filtering — so a logo project can be both `BRANDING` and `GRAPHIC` and appear under either filter. Five filters (ALL / BRANDING / UI UX / GRAPHIC / ILLUST).

Above the grid sits a **split-image reveal**: two halves of a category image that slide apart 110px on hover to expose a dictionary-style definition card underneath. The content is a Korean idiom — *palbangmiin* `/pa:lbaŋ'mi:ɪn/`, "a person talented in many different areas" — which doubles as the designer's own positioning statement. Each filter swaps the image pair, and the split offsets are tuned per-filter to keep the seam aligned against different label widths.

Project detail pages animate their sections in on scroll via `IntersectionObserver` (threshold 0.1, `-50px` bottom margin), with each block assigned a different entrance — bounce up, drop down, fade — so the page assembles rather than just appearing.

Images are handled through an explicit `imageMapping.jsx` module that imports every asset and exposes a `getImage(filename)` lookup, so the data files stay plain strings and Vite still gets static imports it can hash and fingerprint. Every `<img>` has an `onError` that swaps in an inline base64 SVG placeholder — nothing ever renders as a broken-image icon.

### 3.5 Small details that carry the personality

- **Nav scramble.** Hovering a nav item runs 5 phases of randomised character flips — 60–80% of the letters swap to random capitals each phase, at randomised 40–120ms intervals, with a per-letter `rotateX` flip animation — before resolving back. Deliberately chaotic rather than the tidy left-to-right decode you usually see.
- **Dog cursors.** The Invitation page ends with "Do you wanna see a REALLY cute dog?" — hovering it swaps the cursor to one of seven photos of the client's dog, picked at random each time, and clicking opens the dog's Instagram. Desktop only (guarded at 768px). The favicon is one of the same dogs.
- **Contact cards** enter with hand-tuned multi-stage keyframes — scale, `rotateX`, `rotateZ`, and a blur that resolves from 5px to 0 — landing at a slight resting tilt (−6° and +7°) so they read as two physical cards dropped on a desk, staggered 0.3s apart.

---

## 4. Architecture

```
src/
├── main.jsx                    React 19 root, StrictMode
├── App.jsx                     Single state machine — the whole router
├── components/
│   ├── pages/
│   │   ├── Landing.jsx         Hero + particle canvas
│   │   ├── TimelinePage.jsx    One year of career history
│   │   ├── Exhibition.jsx      Filter + split image + grid
│   │   ├── Invitation.jsx      Contact cards + dog easter egg
│   │   └── work-history.js     ← all CV content
│   ├── exhibition/
│   │   ├── WorkGrid / WorkCard / FilterContainer
│   │   ├── SplitImageContainer  Hover-split reveal
│   │   ├── ProjectDetail.jsx    IntersectionObserver reveals
│   │   └── exhibition.js        ← all project content
│   ├── navigation/
│   │   ├── Navbar.jsx           Scramble-on-hover nav
│   │   └── BottomTimeline.jsx   Fixed 1991–2025 year rail
├── styles/                     Reset, font-face declarations
└── utils/imageMapping.jsx      filename → hashed asset URL
```

**No router.** Navigation is four pieces of state in `App.jsx`:

```js
currentPage          // "entrance" | "exhibition" | "invitation"
activeSection        // index into the derived PAGES_CONFIG
isTransitioning      // input lock during the 1s slide
triggerLineAnimation // the landing's pre-navigation beat
isFadingOut          // 300ms crossfade between top-level rooms
```

Top-level room changes run a two-phase transition: fade the current room to 0 over 300ms, swap, then hold the input lock for another 1s. Every page component receives `active` and renders regardless — visibility is a transform/opacity concern, not a mount/unmount one, which is what makes the slide continuous.

Styling is 100% styled-components with transient `$props` (`$active`, `$isAnimating`) so state never leaks into the DOM as invalid attributes. Breakpoints are hand-placed per component at 480 / 768 / 1024 / 1200 / 1440 — the desktop layout is pixel-composed against the Figma, and each breakpoint re-composes rather than fluidly scaling.

---

## 5. Build & deploy

- **Vite 6** with `@vitejs/plugin-react`, near-stock config.
- **Netlify**, `npm run build` → `dist`, with a catch-all `/* → /index.html` 200 redirect.
- **Fonts** are split across two delivery paths: Museo Sans via Adobe Typekit CDN (`use.typekit.net`), PP Editorial New self-hosted as local `.otf` with `font-display: swap`. Worth flagging as an optimisation opportunity — `.otf` files are ~3.3MB total and would drop substantially as WOFF2 subsets.
- **Image weight** was a real concern given the exhibition is photography-led; the final commits (`imageExhibition`, `imageMin`) are a compression pass that brought the exhibition set down to ~1.6MB.
- **ESLint 9** flat config with react-hooks and react-refresh plugins.

---

## 6. Honest notes (things I'd change)

Useful if the write-up wants a "what I'd do differently" section:

- `gsap` and `@types/gsap` are in `package.json` but unused in the final build — a leftover from an earlier animation approach that was replaced by raw Canvas 2D and CSS transitions. Should be dropped.
- Three components are dead code from earlier iterations: `PerspectiveText.jsx`, `PerspectiveWithParticles.jsx`, `PageContent.jsx`. The particle work was inlined into `Landing.jsx` and the standalone versions were never removed.
- Debug `console.log`s ship to production in the scroll handler, nav handler and `WorkGrid`.
- The contact form is presentational — inputs and a Send button with no submit handler or backend. Would need a Netlify Forms attribute or a form service to actually deliver.
- No `prefers-reduced-motion` handling. Given how motion-dependent the site is, this is the most defensible thing to fix first.
- Deep links don't exist — no router means no shareable URL for a specific project or year, and no back-button support. A defensible trade for a continuous single-canvas experience, but it does cost SEO and shareability.
- `vite.config.js` still carries a commented-out alias block from debugging duplicate React copies during the styled-components integration.

---

## 7. Pull-quotes / phrasings that might be useful

- "A portfolio structured as an exhibition — Entrance, Exhibition, Invitation."
- "The hero isn't text with an effect on it. It's ~90,000 particles sampled from the pixels of a word, and the word only exists when you're not touching it."
- "The site never scrolls. Scroll is read as intent, and each flick advances exactly one year of a career."
- "Two colours, two typefaces, and one very good dog."

---

## 8. Assets available for the case study

- `screen-sujik.mov` — 14MB screen recording of the site in motion (best source for the particle hero and page transitions)
- `Group 187.jpg`, `Group 189.jpg`, `Mask group.jpg`, `Screenshot 2025-06-08 at 07.30.11 1.jpg` — design/screen captures in the repo root
- `src/assets/exhibition-images/` — the project imagery
- `src/assets/dogs/` — the seven cursor dogs
