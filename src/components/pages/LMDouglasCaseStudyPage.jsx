import { useRef } from "react";
import booksJpg1504 from "../../assets/case-studies/lmdouglas/live-desktop-books-1504.jpg";
import booksWebp1504 from "../../assets/case-studies/lmdouglas/live-desktop-books-1504.webp";
import booksJpg752 from "../../assets/case-studies/lmdouglas/live-desktop-books-752.jpg";
import booksWebp752 from "../../assets/case-studies/lmdouglas/live-desktop-books-752.webp";
import heroPoster from "../../assets/case-studies/lmdouglas/live-hero-carousel-poster.jpg";
import heroCarousel from "../../assets/case-studies/lmdouglas/live-hero-carousel.mp4";
import mapPoster from "../../assets/case-studies/lmdouglas/live-map-tour-poster.jpg";
import mapTour from "../../assets/case-studies/lmdouglas/live-map-tour.mp4";
import mBooksJpg1020 from "../../assets/case-studies/lmdouglas/live-mobile-books-1020.jpg";
import mBooksWebp1020 from "../../assets/case-studies/lmdouglas/live-mobile-books-1020.webp";
import mBooksJpg510 from "../../assets/case-studies/lmdouglas/live-mobile-books-510.jpg";
import mBooksWebp510 from "../../assets/case-studies/lmdouglas/live-mobile-books-510.webp";
import mHomeJpg1020 from "../../assets/case-studies/lmdouglas/live-mobile-home-1020.jpg";
import mHomeWebp1020 from "../../assets/case-studies/lmdouglas/live-mobile-home-1020.webp";
import mHomeJpg510 from "../../assets/case-studies/lmdouglas/live-mobile-home-510.jpg";
import mHomeWebp510 from "../../assets/case-studies/lmdouglas/live-mobile-home-510.webp";
import mMapJpg1020 from "../../assets/case-studies/lmdouglas/live-mobile-map-1020.jpg";
import mMapWebp1020 from "../../assets/case-studies/lmdouglas/live-mobile-map-1020.webp";
import mMapJpg510 from "../../assets/case-studies/lmdouglas/live-mobile-map-510.jpg";
import mMapWebp510 from "../../assets/case-studies/lmdouglas/live-mobile-map-510.webp";
import v1ArchJpg1160 from "../../assets/case-studies/lmdouglas/v1-archived-2024-1160.jpg";
import v1ArchWebp1160 from "../../assets/case-studies/lmdouglas/v1-archived-2024-1160.webp";
import v1ArchJpg580 from "../../assets/case-studies/lmdouglas/v1-archived-2024-580.jpg";
import v1ArchWebp580 from "../../assets/case-studies/lmdouglas/v1-archived-2024-580.webp";
import v1RealmJpg1440 from "../../assets/case-studies/lmdouglas/v1-desktop-realm-1440.jpg";
import v1RealmWebp1440 from "../../assets/case-studies/lmdouglas/v1-desktop-realm-1440.webp";
import v1RealmJpg720 from "../../assets/case-studies/lmdouglas/v1-desktop-realm-720.jpg";
import v1RealmWebp720 from "../../assets/case-studies/lmdouglas/v1-desktop-realm-720.webp";
import { IconGit } from "../../assets/icons/IconGit.jsx";
import { LINKS } from "../../data/siteConfig";
import {
  Arrow,
  B,
  BACol,
  BATag,
  BackLink,
  BeforeAfterGrid,
  Breadcrumb,
  Bullet,
  Bullets,
  CTAActions,
  CTABand,
  CTAText,
  CTATitle,
  Caption,
  ChangeItem,
  ChangeKey,
  ChangeList,
  Clip,
  Container,
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
  ReflectGrid,
  ReflectHead,
  RoleLine,
  SIZES,
  SecHead,
  SecNum,
  SecTitle,
  Section,
  Shot,
  StackRow,
  Stat,
  StatBand,
  StatLabel,
  StatTile,
  StatValue,
  Title,
  caseStudySchemas,
  createSectionNumber,
  shot,
  useReveal,
} from "../case-study";
import { ConsentBanner } from "../common/ConsentBanner.jsx";
import { Contact } from "../common/Contact.jsx";
import { SEO } from "../common/SEO.jsx";

const SITE = "https://lmdouglas.com/";
const REPO = "https://github.com/12vblanco/lmdouglas26";
const canonical = `${LINKS.site}/work/lm-douglas`;

const SHOTS = {
  books: shot({
    webp: [
      [booksWebp752, 752],
      [booksWebp1504, 1504],
    ],
    jpg: [
      [booksJpg752, 752],
      [booksJpg1504, 1504],
    ],
    width: 1504,
    height: 664,
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
    height: 1812,
  }),
  mobileBooks: shot({
    webp: [
      [mBooksWebp510, 510],
      [mBooksWebp1020, 1020],
    ],
    jpg: [
      [mBooksJpg510, 510],
      [mBooksJpg1020, 1020],
    ],
    width: 1020,
    height: 1812,
  }),
  mobileMap: shot({
    webp: [
      [mMapWebp510, 510],
      [mMapWebp1020, 1020],
    ],
    jpg: [
      [mMapJpg510, 510],
      [mMapJpg1020, 1020],
    ],
    width: 1020,
    height: 1812,
  }),
  // The 2024 React build as archived on 4 October 2024. Wayback could not
  // replay the page itself (it is client-rendered) and never stored the cover
  // art, so this is the layout without its imagery.
  v1Archived: shot({
    webp: [
      [v1ArchWebp580, 580],
      [v1ArchWebp1160, 1160],
    ],
    jpg: [
      [v1ArchJpg580, 580],
      [v1ArchJpg1160, 1160],
    ],
    width: 1160,
    height: 939,
  }),
  // The realm section, captured by running the 2024 repo locally, so the map
  // it actually shipped is visible.
  v1Realm: shot({
    webp: [
      [v1RealmWebp720, 720],
      [v1RealmWebp1440, 1440],
    ],
    jpg: [
      [v1RealmJpg720, 720],
      [v1RealmJpg1440, 1440],
    ],
    width: 1440,
    height: 770,
  }),
};

const SCREENS = [
  {
    id: "home",
    name: "Home",
    note: "Carousel, one slide per book",
    shot: SHOTS.mobileHome,
    alt: "The author site on a phone: a full-bleed slide for the novella Davga over a snowy mountain scene, with the blurb and a Buy it now button, and carousel dots below",
  },
  {
    id: "books",
    name: "Chronicles",
    note: "Every title, tagged by status",
    shot: SHOTS.mobileBooks,
    alt: "The Chronicles showcase on a phone: book cover cards stacked one per row, each with a status badge, the title, its place in the series and a Buy it now button",
  },
  {
    id: "map",
    name: "The realm",
    note: "Clickable lore across Gharantia",
    shot: SHOTS.mobileMap,
    alt: "The interactive map on a phone: a hand-drawn map of the realm of Gharantia with gold markers over its cities and seas, under the heading The Gharantia Realm",
  },
];

const VIEWS = [{ id: "live", label: "Live site" }];

const stack = [
  "Vue 3",
  "Vue Router 4",
  "Vite 7",
  "CSS custom properties",
  "Netlify Functions",
  "MailerLite",
  "Figma",
];

const buildHighlights = [
  {
    term: "One file, three views",
    text: "The books and the map's lore points live in a single data file. The hero carousel, the Chronicles grid and the map all render from it, so adding a release or a location is a one-object change rather than an edit in three places.",
  },
  {
    term: "A map that carries the lore",
    text: "The realm is a hand-drawn map with clickable points over its gods, cities, duchies, ports and ruins, each opening its own lore and character artwork. It was my suggestion, and it turned out to be the thing readers come back for.",
  },
  {
    term: "A mailing list with no backend",
    text: "Readers get a free novella for signing up. The form is a honeypot-protected Netlify Form that also posts to a Netlify Function, which creates the subscriber in MailerLite, so a static site runs a real funnel.",
  },
];

const structuredData = caseStudySchemas({
  headline: "L.M. Douglas: author platform design & build",
  description:
    "A case study on growing a fantasy author's site from a two-book promotional page into a Vue 3 saga's hub with an interactive realm map, a status-tagged catalogue and a MailerLite lead-magnet funnel.",
  canonical,
  datePublished: "2026-08-01",
  dateModified: "2026-08-01",
  crumb: "L.M. Douglas",
  about: {
    "@type": "Person",
    name: "L.M. Douglas",
    url: SITE,
    jobTitle: "Author",
    nationality: "Scottish",
  },
});

export const LMDouglasCaseStudyPage = ({ onOpenTerms }) => {
  const rootRef = useRef(null);
  useReveal(rootRef);

  const num = createSectionNumber();

  return (
    <Page ref={rootRef}>
      <SEO
        title="L.M. Douglas: Vue Author Website Case Study | Victor Blanco"
        description="How a two-book promotional site became a Vue 3 author platform with an interactive world map, a data-driven catalogue and a free-novella mailing list."
        canonical={canonical}
        ogType="article"
        ogTitle="L.M. Douglas: author platform design & build case study"
        structuredData={structuredData}
      />

      <Container>
        <Breadcrumb current="L.M. Douglas" />

        {/* ── Hero ── */}
        <Hero as="header">
          <Title>
            L.M. Douglas<Dot>.</Dot>
          </Title>
          <RoleLine>
            Fantasy author platform · Solo: design &amp; build · 2024 to present
          </RoleLine>
          <HeroBody>
            <div>
              <Lede>
                A one-book promotional page grown into a saga's hub: a live
                catalogue, an interactive map of the realm, character's updates,
                book reveals, and a mailing list that pays readers in fiction.
              </Lede>
              <P>
                L.M. Douglas is a Scottish fantasy author writing the Chronicles
                of the Endless War. She has a maintenance plan that allows for
                unlimited updates which suit her ever growing catalogue. From
                2024 her catalogue have grown from one book to four and two
                novellas.
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
                shot={SHOTS.books}
                sizes={SIZES.side}
                alt="Four book covers in a row: Davga, Gharantia's Guardian, Gharantia's Fury and Gharantia's Fate, each with a status badge reading New release, Available now or Coming soon"
                eager
              />
              <Caption>
                The Endless War catalogue: a free novella (plus one upcoming),
                three published books and one more coming soon!.
              </Caption>
            </HeroSideFigure>
          </HeroBody>
        </Hero>

        <HeroFigure>
          <Clip
            src={heroCarousel}
            poster={heroPoster}
            width={1200}
            height={714}
            label="A screen recording of the site's hero carousel advancing on its own through all four titles: the novella Davga marked New Book, Gharantia's Guardian, Gharantia's Fury, and Gharantia's Fate marked Coming Soon. Each slide fills the screen with its own cover art and photography, and carries the title, its place in the series, a blurb and a Buy it now button."
          />
          <Caption>
            The site today: one full-bleed slide per title, all four driven from
            the same data. Rebuilt in Vue (2026).
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
              <StatValue>
                <Stat>+80</Stat>
              </StatValue>
              <StatLabel>Mailing-list subscribers since launch</StatLabel>
            </StatTile>
            <StatTile>
              <StatValue>4</StatValue>
              <StatLabel>Titles in the hub</StatLabel>
            </StatTile>
            <StatTile>
              <StatValue>2nd</StatValue>
              <StatLabel>
                Project from the same client, and unlimited updates included in
                the maintenance plan
              </StatLabel>
            </StatTile>
          </StatBand>
        </Section>

        {/* ── How it evolved ── */}
        <Section data-reveal>
          <SecHead>
            <SecNum>{num()}</SecNum>
            <SecTitle>How it evolved</SecTitle>
          </SecHead>
          <Prose>
            <P>
              There was no bad site to rescue here. The 2024 build did its job:
              one page introducing a book first, expanded later to accommodate a
              second book. What changed was the work. A third and fourth title
              arrived, the world behind them kept growing, and a page that
              described a novel had to become somewhere a reader could spend
              time.
            </P>
          </Prose>
          <BeforeAfterGrid>
            <BACol>
              <BATag>2024: the promotional page</BATag>
              <Figure>
                <Shot
                  shot={SHOTS.v1Archived}
                  sizes={SIZES.before}
                  alt="The archived 2024 site: a dark single-column page where Gharantia's Fury and Gharantia's Guardian are each introduced by four paragraphs of text with Buy here buttons for Amazon, and captioned gaps stand where the book covers failed to archive"
                />
                <Caption>
                  The first build: one long page, first one book and then two,
                  each introduced by four paragraphs of blurb. The archive never
                  stored the artwork, hence the gaps.
                </Caption>
              </Figure>
              <Figure>
                <Shot
                  shot={SHOTS.v1Realm}
                  sizes={SIZES.before}
                  alt="The realm on the 2024 site: the heading The Gharantia Realm above a small parchment map shown as a flat image on a dark background"
                />
                <Caption>
                  The realm in 2024: one flat image, linking out to a bigger
                  JPEG.
                </Caption>
              </Figure>
            </BACol>
            <BACol>
              <BATag $after>2026: the saga's hub</BATag>
              <PhoneFigure>
                <Shot
                  shot={SHOTS.mobileHome}
                  sizes={SIZES.phone}
                  alt="The 2026 Vue site on a phone: a full-bleed slide for the novella Davga with its blurb and a Buy it now button, and carousel dots below"
                />
                <Caption>
                  The rebuild in Vue, designed for a reader rather than a
                  browser.
                </Caption>
              </PhoneFigure>
            </BACol>
          </BeforeAfterGrid>
          <ChangeList aria-label="What changed">
            <ChangeItem>
              <ChangeKey>Catalogue:</ChangeKey> two hand-written blurbs{" "}
              <Arrow aria-hidden="true">→</Arrow> a status-tagged grid built
              from data
            </ChangeItem>
            <ChangeItem>
              <ChangeKey>The realm:</ChangeKey> a flat map you could open full
              size <Arrow aria-hidden="true">→</Arrow> clickable lore over its
              gods, cities, ports and ruins
            </ChangeItem>
            <ChangeItem>
              <ChangeKey>Signup:</ChangeKey> a browser post to MailerLite's
              hosted form <Arrow aria-hidden="true">→</Arrow> a serverless
              function that keeps the key off the page
            </ChangeItem>
          </ChangeList>
        </Section>

        {/* ── The solution ── */}
        <Section data-reveal>
          <SecHead>
            <SecNum>{num()}</SecNum>
            <SecTitle>The solution</SecTitle>
          </SecHead>
          <Prose>
            <P>
              I designed the rebuild around the two things a reader actually
              wants: what to read next, and more of the world. The build is a
              Vue 3 single-page app where{" "}
              <B>the books and the world live as data</B>, with hand-written CSS
              over one set of custom properties. No CSS framework, no UI
              library: every component, animation and icon is bespoke, because
              an epic fantasy site that borrows its furniture from a SaaS
              template reads as exactly that.
            </P>
          </Prose>
          <FigureWide>
            <FlowBoard
              title="L.M. Douglas / mobile flow"
              idPrefix="lmd"
              views={VIEWS}
              screens={SCREENS}
              renderScreen={(screen) => (
                <Shot shot={screen.shot} sizes={SIZES.board} alt={screen.alt} />
              )}
              caption="The three screens the hub is built around: arrive on a book, see the whole series, then fall into the world behind it."
            />
          </FigureWide>
          <FigureBlock>
            <Clip
              src={mapTour}
              poster={mapPoster}
              width={1200}
              height={750}
              label="A screen recording of the realm map: a pointer moves between gold markers on the hand-drawn map of Gharantia, opening a card for each one. The cards carry a place name with its pronunciation, a paragraph of lore and a category tag, and one shows character artwork of Queen Velardis and Lord Xuren."
            />
            <Caption>
              The realm map in use: every marker opens its own lore, with
              pronunciations, character art and a tag for what it is. Lorraine's
              favourite part, and the readers' too.
            </Caption>
          </FigureBlock>
          <DefList>
            {buildHighlights.map((h) => (
              <DefItem key={h.term}>
                <DefTerm>{h.term}</DefTerm>
                <DefText>{h.text}</DefText>
              </DefItem>
            ))}
          </DefList>
          <CraftLine>
            Also in the build: self-hosted display and body fonts preloaded for
            a fast first paint, hand-built SVG icons, and a responsive WebP
            pipeline that detects support once and falls back cleanly to JPEG.
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
              <B>A destination between releases</B>: the map gives readers a
              reason to visit when there is no new book to buy.
            </Bullet>
            <Bullet>
              <B>The catalogue keeps up with the writing</B>: a new title is one
              object, and the carousel, the grid and the badges follow.
            </Bullet>
            <Bullet>
              <B>The signup grew up</B>: the same free-novella offer, now behind
              a serverless function with the API key off the page and a honeypot
              on the form.
            </Bullet>
          </Bullets>
          <Quote>
            <QuoteText>
              “Working with Victor to update and maintain my author website has
              been a fantastic experience. He created a moving carousel to
              showcase all of my books and suggested adding an interactive map
              of my fictional world, an idea that has proved very popular with
              visitors. He's been professional, creative, and easy to work with
              throughout the process. I wouldn't hesitate to recommend him to
              other authors or any business looking for a high-quality website.”
            </QuoteText>
            <QuoteBy>Lorraine, L.M. Douglas</QuoteBy>
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
                  <B>Modelling the world as data</B>: one file drives the
                  carousel, the catalogue and the map, and they cannot disagree.
                </Bullet>
                <Bullet>
                  <B>Proposing the map</B> rather than waiting to be asked. It
                  became the reason people come back.
                </Bullet>
              </Bullets>
            </div>
            <div>
              <ReflectHead>What I'd improve</ReflectHead>
              <Bullets>
                <Bullet>
                  <B>Hand her the keys</B>: adding a release is still a code
                  change, so a small editing layer is the obvious next step.
                </Bullet>
                <Bullet>
                  <B>Bring the blog in</B>: it is an embedded feed rather than
                  part of the design system.
                </Bullet>
              </Bullets>
            </div>
          </ReflectGrid>
        </Section>

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
          <BackLink to="/#works">← Back to all work</BackLink>
        </CTABand>
      </Container>

      <ConsentBanner onOpenTerms={onOpenTerms} />
      <Contact onOpenTerms={onOpenTerms} />
    </Page>
  );
};
