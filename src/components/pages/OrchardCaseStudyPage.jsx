import { useRef } from "react";
import styled from "styled-components";
import aboutJpg640 from "../../assets/case-studies/orchard/before-about-2019-640.jpg";
import aboutWebp640 from "../../assets/case-studies/orchard/before-about-2019-640.webp";
import aboutJpg1200 from "../../assets/case-studies/orchard/before-about-2019-1200.jpg";
import aboutWebp1200 from "../../assets/case-studies/orchard/before-about-2019-1200.webp";
import foodJpg640 from "../../assets/case-studies/orchard/before-food-2019-640.jpg";
import foodWebp640 from "../../assets/case-studies/orchard/before-food-2019-640.webp";
import foodJpg1200 from "../../assets/case-studies/orchard/before-food-2019-1200.jpg";
import foodWebp1200 from "../../assets/case-studies/orchard/before-food-2019-1200.webp";
import heroJpg800 from "../../assets/case-studies/orchard/live-hero-800.jpg";
import heroWebp800 from "../../assets/case-studies/orchard/live-hero-800.webp";
import heroJpg1600 from "../../assets/case-studies/orchard/live-hero-1600.jpg";
import heroWebp1600 from "../../assets/case-studies/orchard/live-hero-1600.webp";
import dMenuJpg800 from "../../assets/case-studies/orchard/live-desktop-menu-800.jpg";
import dMenuWebp800 from "../../assets/case-studies/orchard/live-desktop-menu-800.webp";
import dMenuJpg1600 from "../../assets/case-studies/orchard/live-desktop-menu-1600.jpg";
import dMenuWebp1600 from "../../assets/case-studies/orchard/live-desktop-menu-1600.webp";
import mBookJpg373 from "../../assets/case-studies/orchard/live-mobile-booking-373.jpg";
import mBookWebp373 from "../../assets/case-studies/orchard/live-mobile-booking-373.webp";
import mHomeJpg510 from "../../assets/case-studies/orchard/live-mobile-home-510.jpg";
import mHomeWebp510 from "../../assets/case-studies/orchard/live-mobile-home-510.webp";
import mHomeJpg1020 from "../../assets/case-studies/orchard/live-mobile-home-1020.jpg";
import mHomeWebp1020 from "../../assets/case-studies/orchard/live-mobile-home-1020.webp";
import mMenuJpg510 from "../../assets/case-studies/orchard/live-mobile-menu-510.jpg";
import mMenuWebp510 from "../../assets/case-studies/orchard/live-mobile-menu-510.webp";
import mMenuJpg1020 from "../../assets/case-studies/orchard/live-mobile-menu-1020.jpg";
import mMenuWebp1020 from "../../assets/case-studies/orchard/live-mobile-menu-1020.webp";
import venueJpg400 from "../../assets/case-studies/orchard/venue-400.jpg";
import venueWebp400 from "../../assets/case-studies/orchard/venue-400.webp";
import venueJpg640 from "../../assets/case-studies/orchard/venue-640.jpg";
import venueWebp640 from "../../assets/case-studies/orchard/venue-640.webp";
import { IconGit } from "../../assets/icons/IconGit.jsx";
import {
  Arrow,
  BACol,
  BATag,
  BackLink,
  BeforeAfterGrid,
  Breadcrumb,
  Bullet,
  Bullets,
  B,
  CTAActions,
  CTABand,
  CTAText,
  CTATitle,
  Caption,
  Container,
  ChangeItem,
  ChangeKey,
  ChangeList,
  CraftLine,
  DefItem,
  DefList,
  DefTerm,
  DefText,
  Dot,
  Figure,
  FigureBlock,
  FigureWide,
  FlowBoard,
  GhostLink,
  Hero,
  HeroActions,
  HeroBody,
  HeroFigure,
  HeroSideFigure,
  Lede,
  P,
  Page,
  PhoneFigure,
  PrimaryLink,
  Prose,
  Quote,
  QuoteBy,
  QuoteText,
  RelatedWork,
  ReflectGrid,
  ReflectHead,
  SIZES,
  SecHead,
  SecNum,
  SecTitle,
  Section,
  Shot,
  StackRow,
  StatBand,
  StatLabel,
  StatTile,
  StatValue,
  Title,
  TitleSub,
  RoleLine,
  caseStudySchemas,
  createSectionNumber,
  shot,
  useReveal,
} from "../case-study";
import {
  caseStudyOgImage,
  getCaseStudyMeta,
} from "../../data/caseStudiesMeta";
import { LINKS } from "../../data/siteConfig";
import { ConsentBanner } from "../common/ConsentBanner.jsx";
import { Contact } from "../common/Contact.jsx";
import { SEO } from "../common/SEO.jsx";

const SITE = "https://theorchardbar.co.uk/";
const REPO = "https://github.com/12vblanco/the-orchard-2026";
const canonical = `${LINKS.site}/work/the-orchard-bar`;
// Titles, descriptions and dates live in the shared registry so this page,
// the /work hub, the OG card and the sitemap cannot drift apart.
const meta = getCaseStudyMeta("the-orchard-bar");
const ogImage = caseStudyOgImage("the-orchard-bar");

const SHOTS = {
  venue: shot({
    webp: [
      [venueWebp400, 400],
      [venueWebp640, 640],
    ],
    jpg: [
      [venueJpg400, 400],
      [venueJpg640, 640],
    ],
    width: 640,
    height: 509,
  }),
  liveHero: shot({
    webp: [
      [heroWebp800, 800],
      [heroWebp1600, 1600],
    ],
    jpg: [
      [heroJpg800, 800],
      [heroJpg1600, 1600],
    ],
    width: 1600,
    height: 1000,
  }),
  beforeAbout: shot({
    webp: [
      [aboutWebp640, 640],
      [aboutWebp1200, 1200],
    ],
    jpg: [
      [aboutJpg640, 640],
      [aboutJpg1200, 1200],
    ],
    width: 1200,
    height: 748,
  }),
  beforeFood: shot({
    webp: [
      [foodWebp640, 640],
      [foodWebp1200, 1200],
    ],
    jpg: [
      [foodJpg640, 640],
      [foodJpg1200, 1200],
    ],
    width: 1200,
    height: 817,
  }),
  desktopMenu: shot({
    webp: [
      [dMenuWebp800, 800],
      [dMenuWebp1600, 1600],
    ],
    jpg: [
      [dMenuJpg800, 800],
      [dMenuJpg1600, 1600],
    ],
    width: 1600,
    height: 1000,
  }),
  mobileHome: shot({
    webp: [
      [mHomeWebp510, 510],
      [mHomeWebp1020, 1020],
    ],
    jpg: [
      [mHomeJpg510, 510],
      [mHomeJpg1020, 1020],
    ],
    width: 1020,
    height: 1811,
  }),
  // Supplied capture: the TableSense widget is a cross-origin iframe that will
  // not paint in a headless screenshot, so this one cannot be re-shot at 2x.
  mobileBooking: shot({
    webp: [[mBookWebp373, 373]],
    jpg: [[mBookJpg373, 373]],
    width: 373,
    height: 663,
  }),
  mobileMenu: shot({
    webp: [
      [mMenuWebp510, 510],
      [mMenuWebp1020, 1020],
    ],
    jpg: [
      [mMenuJpg510, 510],
      [mMenuJpg1020, 1020],
    ],
    width: 1020,
    height: 1814,
  }),
};

/* ── Prototype board ───────────────────────────────────────────────────────
   Two views of the same three screens. The wireframes are drawn here as SVG
   rather than screenshotted, on the same 374x664 device frame as the hi-fi
   shots, so switching tabs swaps the fidelity and nothing else moves. */

// [kind, x, y, w, h] on a 374x664 artboard.
const WIRE_NAV = [
  ["bar", 0, 0, 374, 52],
  ["strong", 24, 18, 108, 16],
  ["line", 316, 20, 34, 3],
  ["line", 316, 27, 34, 3],
  ["line", 316, 34, 34, 3],
];

const WIREFRAMES = {
  home: [
    ...WIRE_NAV,
    ["bar", 0, 52, 374, 34],
    ["line", 78, 65, 218, 9],
    ["img", 0, 86, 374, 474],
    ["strong", 62, 236, 250, 26],
    ["strong", 104, 270, 166, 26],
    ["line", 58, 322, 258, 10],
    ["line", 64, 342, 246, 10],
    ["line", 96, 362, 182, 10],
    ["fill", 77, 404, 220, 40],
    ["outline", 77, 452, 220, 40],
    ["line", 112, 520, 150, 8],
    ["bar", 0, 560, 374, 104],
    ["line", 96, 596, 182, 12],
    ["line", 66, 620, 242, 8],
  ],
  menu: [
    ...WIRE_NAV,
    ["strong", 112, 88, 150, 22],
    ["line", 56, 126, 262, 10],
    ["line", 50, 146, 274, 10],
    ["line", 76, 166, 222, 10],
    ["strong", 76, 208, 96, 18],
    ["line", 192, 208, 106, 18],
    ["accent", 76, 232, 96, 4],
    ["line", 128, 258, 44, 8],
    ["line", 204, 258, 44, 8],
    ["rule", 24, 284, 326, 1],
    ["strong", 70, 306, 84, 14],
    ["line", 170, 306, 84, 14],
    ["line", 84, 336, 90, 14],
    ["line", 196, 336, 84, 14],
    ["line", 96, 372, 182, 10],
    ["strong", 84, 406, 150, 14],
    ["line", 250, 406, 40, 14],
    ["line", 76, 428, 222, 8],
    ["strong", 84, 462, 170, 14],
    ["line", 270, 462, 30, 14],
    ["line", 76, 484, 222, 8],
    ["strong", 84, 518, 140, 14],
    ["line", 240, 518, 44, 14],
    ["line", 76, 540, 222, 8],
    ["strong", 84, 574, 160, 14],
    ["line", 260, 574, 32, 14],
    ["line", 76, 596, 222, 8],
  ],
  booking: [
    ...WIRE_NAV,
    ["img", 0, 52, 374, 268],
    ["strong", 112, 352, 150, 22],
    ["line", 70, 392, 234, 10],
    ["line", 104, 412, 166, 10],
    ["outline", 47, 448, 280, 42],
    ["outline", 47, 500, 280, 42],
    ["fill", 47, 556, 280, 46],
    ["line", 96, 624, 182, 8],
  ],
};

const WIRE_FILL = {
  bar: "#ededed",
  img: "#e3e3e3",
  line: "#d2d2d2",
  strong: "#bfbfbf",
  rule: "#e0e0e0",
  accent: "#ff3863",
};

const Wireframe = ({ screen, label }) => (
  <WireSvg viewBox="0 0 374 664" role="img" aria-label={label}>
    <rect x="0" y="0" width="374" height="664" fill="#fffefa" />
    {WIREFRAMES[screen].map(([kind, x, y, w, h], i) => {
      if (kind === "outline") {
        return (
          <rect
            key={i}
            x={x + 0.5}
            y={y + 0.5}
            width={w - 1}
            height={h - 1}
            rx="6"
            fill="none"
            stroke="#c4c4c4"
            strokeWidth="2"
          />
        );
      }
      if (kind === "fill") {
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={w}
            height={h}
            rx="6"
            fill="#ff3863"
            opacity="0.45"
          />
        );
      }
      return (
        <g key={i}>
          <rect
            x={x}
            y={y}
            width={w}
            height={h}
            rx={kind === "rule" ? 0 : 3}
            fill={WIRE_FILL[kind]}
          />
          {kind === "img" && (
            <g stroke="#d0d0d0" strokeWidth="1.5">
              <line x1={x} y1={y} x2={x + w} y2={y + h} />
              <line x1={x + w} y1={y} x2={x} y2={y + h} />
            </g>
          )}
        </g>
      );
    })}
  </WireSvg>
);

const WireSvg = styled.svg`
  display: block;
  width: 100%;
  height: auto;
`;

const SCREENS = [
  {
    id: "home",
    name: "Home",
    note: "Hero, promo bar, two ways in",
    shot: SHOTS.mobileHome,
    alt: "The rebuilt site on a phone: the bar photograph fills the screen behind the Welcome to The Orchard Bar heading, with See the menus and Book a table buttons stacked below",
    wireAlt:
      "Wireframe of the home screen: navigation bar, promo strip, a large hero image block with heading, body text and two stacked buttons",
  },
  {
    id: "menu",
    name: "Menu",
    note: "Tabs, sub-menus, dietary flags",
    shot: SHOTS.mobileMenu,
    alt: "The rebuilt menu on a phone: Food and Drinks tabs, sub-menu switchers, a vegetarian and vegan legend, and dishes listed with prices",
    wireAlt:
      "Wireframe of the menu screen: heading, two top-level tabs with the first underlined, a row of sub-menu switchers, and repeating dish rows each with a name, a price and a description line",
  },
  {
    id: "booking",
    name: "Booking",
    note: "Live availability, then address",
    shot: SHOTS.mobileBooking,
    alt: "The booking section of the rebuilt site on a phone: the TableSense widget with Party Size, Date and Ideal Time dropdowns above a Check Availability button, over a photograph of the bar, with the Howard Place address and phone number below",
    wireAlt:
      "Wireframe of the booking screen: navigation bar, an image block, a heading, address lines, two input fields and a primary action button",
  },
];

const VIEWS = [
  { id: "hifi", label: "Hi-fi prototype" },
  { id: "wire", label: "Wireframe" },
];

const stack = [
  "React 19",
  "TypeScript",
  "Vite",
  "React Router",
  "CSS Modules",
  "Vitest",
  "TableSense",
];

const buildHighlights = [
  {
    term: "Typed menu engine",
    text: "Menus are modelled as a small schema (menu, sub-menu, category, item) carrying prices, dietary flags and a featured flag. The tabs, switchers, legend and featured cards all build from that one source, so nothing drifts out of sync.",
  },
  {
    term: "Online booking",
    text: "An embedded TableSense reservation widget with a branded loading state, alongside address, map link and contact details, replacing the old phone-only flow.",
  },
  {
    term: "Time-aware promotions",
    text: "Event banners carry start and end dates; only the active promo shows, opening to a full-screen overlay. Getting it above a z-indexed nav was a stacking-context problem, not a bigger-number problem.",
  },
];

const structuredData = caseStudySchemas({
  headline: meta.headline,
  description: meta.schemaDescription,
  canonical,
  image: ogImage,
  datePublished: meta.datePublished,
  dateModified: meta.dateModified,
  crumb: "The Orchard Bar",
  about: {
    "@type": "Restaurant",
    name: "The Orchard Bar",
    url: SITE,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Edinburgh",
      addressRegion: "Scotland",
      addressCountry: "GB",
    },
  },
});

export const OrchardCaseStudyPage = ({ onOpenTerms }) => {
  const rootRef = useRef(null);
  useReveal(rootRef);

  const num = createSectionNumber();

  return (
    <Page ref={rootRef}>
      <SEO
        title={meta.title}
        description={meta.description}
        canonical={canonical}
        ogType="article"
        ogTitle={meta.ogTitle}
        ogImage={ogImage}
        structuredData={structuredData}
      />

      <Container>
        <Breadcrumb current="The Orchard Bar" />

        {/* ── Hero ── */}
        <Hero as="header">
          <Title>
            The Orchard Bar<Dot>.</Dot>
            <TitleSub>
              React website design &amp; build for an Edinburgh restaurant
            </TitleSub>
          </Title>
          <RoleLine>
            Solo: design, build &amp; maintenance · 2020 to present
          </RoleLine>
          <HeroBody>
            <div>
              <Lede>
                A dated WordPress site rebuilt as a fast, bespoke React site:
                online booking, self-updating menus, and a design that finally
                matches the venue.
              </Lede>
              <P>
                The Orchard Bar is a neighbourhood restaurant and bar in
                Canonmills, Edinburgh, a few minutes from the Royal Botanic
                Garden. Owners Lorraine and Chris were my first client contract
                in 2020; I've designed, built and maintained the site since,
                including the 2026 React rebuild documented here.
              </P>
              <HeroActions>
                <PrimaryLink
                  href={SITE}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit live site ↗
                </PrimaryLink>
                <GhostLink
                  href={REPO}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View the code <IconGit />
                </GhostLink>
              </HeroActions>
            </div>
            <HeroSideFigure>
              <Shot
                shot={SHOTS.venue}
                sizes={SIZES.side}
                alt="The Orchard Bar on its corner site in Canonmills, Edinburgh: a sandstone tenement building with green and cream painted frontage and a gold ORCHARD sign above the door"
                eager
              />
              <Caption>The venue on Howard Place, Canonmills.</Caption>
            </HeroSideFigure>
          </HeroBody>
        </Hero>

        <HeroFigure>
          <Shot
            shot={SHOTS.liveHero}
            sizes={SIZES.full}
            alt="The Orchard Bar website in 2026: a full-width photograph of the bar behind the heading Welcome to The Orchard Bar, with See the menus and Book a table buttons"
            eager
          />
          <Caption>
            The Orchard Bar today, rebuilt from scratch in React (2026).
          </Caption>
        </HeroFigure>

        {/* ── Outcomes ── */}
        <Section data-reveal>
          <SecHead>
            <SecNum>{num()}</SecNum>
            <SecTitle>Outcomes</SecTitle>
          </SecHead>
          <StatBand>
            <StatTile>
              <StatValue>3,325</StatValue>
              <StatLabel>Bookings through the site last year</StatLabel>
            </StatTile>
            <StatTile>
              <StatValue>15,148</StatValue>
              <StatLabel>Covers booked last year</StatLabel>
            </StatTile>
            <StatTile>
              <StatValue>277</StatValue>
              <StatLabel>Bookings a month on average</StatLabel>
            </StatTile>
          </StatBand>
        </Section>

        {/* ── Before & after ── */}
        <Section data-reveal>
          <SecHead>
            <SecNum>{num()}</SecNum>
            <SecTitle>Before &amp; after</SecTitle>
          </SecHead>
          <Prose>
            <P>
              The original site was a homemade WordPress build on an
              off-the-shelf theme: dated, desktop-first, and unable to do the
              two jobs a hospitality site exists to do: take bookings and show
              the menus.
            </P>
          </Prose>
          <BeforeAfterGrid>
            <BACol>
              <BATag>Before: the WordPress site</BATag>
              <Figure>
                <Shot
                  shot={SHOTS.beforeAbout}
                  sizes={SIZES.before}
                  alt="The Orchard Bar's old WordPress site in 2019: a narrow fixed-width column on a tiled beer photograph background, with a nearly empty About Us page"
                />
                <Caption>
                  The 2019 About page on an off-the-shelf Pique theme, captured
                  from the Wayback Machine.
                </Caption>
              </Figure>
              <Figure>
                <Shot
                  shot={SHOTS.beforeFood}
                  sizes={SIZES.before}
                  alt="The old site's Food page in 2019, showing five plain text links reading Main Menu, Gluten Free, Children's Menu, Buffet Menu and Desserts with no prices or dish names"
                />
                <Caption>
                  The Food page: five links, no dishes, no prices.
                </Caption>
              </Figure>
            </BACol>
            <BACol>
              <BATag $after>After: the 2026 rebuild</BATag>
              <PhoneFigure>
                <Shot
                  shot={SHOTS.mobileHome}
                  sizes={SIZES.phone}
                  alt="The rebuilt site on a phone: the bar photograph fills the screen behind the Welcome to The Orchard Bar heading, with See the menus and Book a table buttons stacked below"
                />
                <Caption>
                  The same site on a phone, built mobile first.
                </Caption>
              </PhoneFigure>
            </BACol>
          </BeforeAfterGrid>

          {/* The menu is the one screen worth showing at full desktop width. */}
          <FigureBlock>
            <Shot
              shot={SHOTS.desktopMenu}
              sizes={SIZES.full}
              alt="The rebuilt menu on desktop: Food and Drinks tabs above sub-menu switchers for Main Menu, Gluten Free, Sunday Roasts and Kids Menu, a vegetarian and vegan legend, dishes with prices and descriptions, and featured dish cards down the right"
            />
            <Caption>
              And the menu those five links became: tabs, sub-menus, dietary
              flags, prices and featured cards, all generated from one typed
              source.
            </Caption>
          </FigureBlock>
          <ChangeList aria-label="What changed">
            <ChangeItem>
              <ChangeKey>Booking:</ChangeKey> phone-only{" "}
              <Arrow aria-hidden="true">→</Arrow> TableSense reservations on
              the page
            </ChangeItem>
            <ChangeItem>
              <ChangeKey>Menus:</ChangeKey> a list of bare links{" "}
              <Arrow aria-hidden="true">→</Arrow> readable, self-updating menus
            </ChangeItem>
            <ChangeItem>
              <ChangeKey>Layout:</ChangeKey> desktop theme{" "}
              <Arrow aria-hidden="true">→</Arrow> mobile-first bespoke build
            </ChangeItem>
          </ChangeList>
        </Section>

        {/* ── The solution ── */}
        <Section data-reveal>
          <SecHead>
            <SecNum>{num()}</SecNum>
            <SecTitle>The React build</SecTitle>
          </SecHead>
          <Prose>
            <P>
              I designed the site in Figma first, warm and characterful to fit
              a neighbourhood pub, but clean and legible, with space for the
              menus and photography to do the work. The build is a React site
              where <B>all content lives as typed data</B>: menus, prices,
              hours and promotions are edited as data, not JSX. Every layout is
              hand-written CSS Modules over one design-token system, with no
              framework and no UI library.
            </P>
          </Prose>
          <FigureWide>
            <FlowBoard
              title="The Orchard Bar / mobile flow"
              tabsLabel="Prototype fidelity"
              idPrefix="proto"
              views={VIEWS}
              screens={SCREENS}
              renderScreen={(screen, view) =>
                view === "hifi" ? (
                  <Shot
                    shot={screen.shot}
                    sizes={SIZES.board}
                    alt={screen.alt}
                  />
                ) : (
                  <Wireframe screen={screen.id} label={screen.wireAlt} />
                )
              }
              caption="The three screens the design was built around, at both fidelities: wireframes for the structure, then the visual language on top. Shown as built, since the site ships the design that was signed off."
            />
          </FigureWide>
          <DefList>
            {buildHighlights.map((h) => (
              <DefItem key={h.term}>
                <DefTerm>{h.term}</DefTerm>
                <DefText>{h.text}</DefText>
              </DefItem>
            ))}
          </DefList>
          <CraftLine>
            Also in the build: scraper-resistant contact details, one
            design-token scale driving all type and spacing, and
            prefers-reduced-motion support throughout.
          </CraftLine>
          <StackRow items={stack} />
        </Section>

        {/* ── Results & the client's words ── */}
        <Section data-reveal>
          <SecHead>
            <SecNum>{num()}</SecNum>
            <SecTitle>Results &amp; the client's words</SecTitle>
          </SecHead>
          <Bullets>
            <Bullet>
              <B>A site that finally fits the venue</B>: modern, fast and
              mobile-first.
            </Bullet>
            <Bullet>
              <B>Menus stay current</B>: updates are a quick data edit, not a
              fight with a CMS.
            </Bullet>
          </Bullets>
          <Quote>
            <QuoteText>
              “If you need a website and don't have the technical skills to
              make one yourself, then I strongly suggest you choose Victor. He
              constructed one for the Orchard Bar, our business, and is now
              working on one for my individual ventures. He takes the time to
              hear the details and investigates what your business requires.
              Easy to communicate with, a very professional service. Thank you
              Victor.”
            </QuoteText>
            <QuoteBy>Lorraine, The Orchard Bar</QuoteBy>
          </Quote>
        </Section>

        {/* ── Reflection ── */}
        <Section data-reveal>
          <SecHead>
            <SecNum>{num()}</SecNum>
            <SecTitle>Reflection</SecTitle>
          </SecHead>
          <ReflectGrid>
            <div>
              <ReflectHead>What worked</ReflectHead>
              <Bullets>
                <Bullet>
                  <B>Modelling content as types paid off</B>: publishing a
                  change is editing data, and nothing falls out of sync.
                </Bullet>
                <Bullet>
                  <B>One token scale</B> beat per-component media queries.
                </Bullet>
              </Bullets>
            </div>
            <div>
              <ReflectHead>What I'd improve</ReflectHead>
              <Bullets>
                <Bullet>
                  <B>SEO/meta pass</B>: real titles, Open Graph and
                  LocalBusiness JSON-LD.
                </Bullet>
                <Bullet>
                  <B>Test coverage</B>: a smoke test per section.
                </Bullet>
              </Bullets>
            </div>
          </ReflectGrid>
        </Section>

        {/* ── More work ── */}
        <RelatedWork slug="the-orchard-bar" />

        {/* ── CTA ── */}
        <CTABand data-reveal>
          <CTATitle>Need something similar?</CTATitle>
          <CTAText>
            See the live site, read the code, or get in touch about a project.
          </CTAText>
          <CTAActions>
            <PrimaryLink href={SITE} target="_blank" rel="noopener noreferrer">
              Visit live site ↗
            </PrimaryLink>
            <GhostLink href={REPO} target="_blank" rel="noopener noreferrer">
              View the code ↗
            </GhostLink>
            <GhostLink
              href={LINKS.calendly}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a call ↗
            </GhostLink>
          </CTAActions>
          <BackLink to="/work">← Back to all work</BackLink>
        </CTABand>
      </Container>

      <ConsentBanner onOpenTerms={onOpenTerms} />
      <Contact onOpenTerms={onOpenTerms} />
    </Page>
  );
};
