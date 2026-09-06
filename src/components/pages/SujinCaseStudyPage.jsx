import { useRef } from "react";
import figmaArchiveJpg1440 from "../../assets/case-studies/sujin/figma-archive-1440.jpg";
import figmaArchiveWebp1440 from "../../assets/case-studies/sujin/figma-archive-1440.webp";
import figmaArchiveJpg720 from "../../assets/case-studies/sujin/figma-archive-720.jpg";
import figmaArchiveWebp720 from "../../assets/case-studies/sujin/figma-archive-720.webp";
import figmaExhibitionJpg1440 from "../../assets/case-studies/sujin/figma-exhibition-1440.jpg";
import figmaExhibitionWebp1440 from "../../assets/case-studies/sujin/figma-exhibition-1440.webp";
import figmaExhibitionJpg720 from "../../assets/case-studies/sujin/figma-exhibition-720.jpg";
import figmaExhibitionWebp720 from "../../assets/case-studies/sujin/figma-exhibition-720.webp";
import exhibitionJpg1440 from "../../assets/case-studies/sujin/live-exhibition-1440.jpg";
import exhibitionWebp1440 from "../../assets/case-studies/sujin/live-exhibition-1440.webp";
import exhibitionJpg720 from "../../assets/case-studies/sujin/live-exhibition-720.jpg";
import exhibitionWebp720 from "../../assets/case-studies/sujin/live-exhibition-720.webp";
import gridJpg1440 from "../../assets/case-studies/sujin/live-exhibition-grid-1440.jpg";
import gridWebp1440 from "../../assets/case-studies/sujin/live-exhibition-grid-1440.webp";
import gridJpg720 from "../../assets/case-studies/sujin/live-exhibition-grid-720.jpg";
import gridWebp720 from "../../assets/case-studies/sujin/live-exhibition-grid-720.webp";
import invitationJpg1440 from "../../assets/case-studies/sujin/live-invitation-1440.jpg";
import invitationWebp1440 from "../../assets/case-studies/sujin/live-invitation-1440.webp";
import invitationJpg720 from "../../assets/case-studies/sujin/live-invitation-720.jpg";
import invitationWebp720 from "../../assets/case-studies/sujin/live-invitation-720.webp";
import landingJpg1440 from "../../assets/case-studies/sujin/live-landing-1440.jpg";
import landingWebp1440 from "../../assets/case-studies/sujin/live-landing-1440.webp";
import landingJpg720 from "../../assets/case-studies/sujin/live-landing-720.jpg";
import landingWebp720 from "../../assets/case-studies/sujin/live-landing-720.webp";
import mExhibitionJpg390 from "../../assets/case-studies/sujin/live-mobile-exhibition-390.jpg";
import mExhibitionWebp390 from "../../assets/case-studies/sujin/live-mobile-exhibition-390.webp";
import mExhibitionJpg780 from "../../assets/case-studies/sujin/live-mobile-exhibition-780.jpg";
import mExhibitionWebp780 from "../../assets/case-studies/sujin/live-mobile-exhibition-780.webp";
import mLandingJpg390 from "../../assets/case-studies/sujin/live-mobile-landing-390.jpg";
import mLandingWebp390 from "../../assets/case-studies/sujin/live-mobile-landing-390.webp";
import mLandingJpg780 from "../../assets/case-studies/sujin/live-mobile-landing-780.jpg";
import mLandingWebp780 from "../../assets/case-studies/sujin/live-mobile-landing-780.webp";
import mTimelineJpg390 from "../../assets/case-studies/sujin/live-mobile-timeline-390.jpg";
import mTimelineWebp390 from "../../assets/case-studies/sujin/live-mobile-timeline-390.webp";
import mTimelineJpg780 from "../../assets/case-studies/sujin/live-mobile-timeline-780.jpg";
import mTimelineWebp780 from "../../assets/case-studies/sujin/live-mobile-timeline-780.webp";
import detailJpg1440 from "../../assets/case-studies/sujin/live-project-detail-1440.jpg";
import detailWebp1440 from "../../assets/case-studies/sujin/live-project-detail-1440.webp";
import detailJpg720 from "../../assets/case-studies/sujin/live-project-detail-720.jpg";
import detailWebp720 from "../../assets/case-studies/sujin/live-project-detail-720.webp";
import timelineJpg1440 from "../../assets/case-studies/sujin/live-timeline-1440.jpg";
import timelineWebp1440 from "../../assets/case-studies/sujin/live-timeline-1440.webp";
import timelineJpg720 from "../../assets/case-studies/sujin/live-timeline-720.jpg";
import timelineWebp720 from "../../assets/case-studies/sujin/live-timeline-720.webp";
import clipPoster from "../../assets/case-studies/sujin/sujin-interaction-poster.jpg";
import clipMp4 from "../../assets/case-studies/sujin/sujin-interaction.mp4";
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
  Hero,
  HeroBody,
  HeroFigure,
  HeroSideFigure,
  Lede,
  P,
  Page,
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

const canonical = `${LINKS.site}/SujinCaseStudyPage`;

const SHOTS = {
  landing: shot({
    webp: [
      [landingWebp720, 720],
      [landingWebp1440, 1440],
    ],
    jpg: [
      [landingJpg720, 720],
      [landingJpg1440, 1440],
    ],
    width: 1440,
    height: 900,
  }),
  timeline: shot({
    webp: [
      [timelineWebp720, 720],
      [timelineWebp1440, 1440],
    ],
    jpg: [
      [timelineJpg720, 720],
      [timelineJpg1440, 1440],
    ],
    width: 1440,
    height: 900,
  }),
  exhibition: shot({
    webp: [
      [exhibitionWebp720, 720],
      [exhibitionWebp1440, 1440],
    ],
    jpg: [
      [exhibitionJpg720, 720],
      [exhibitionJpg1440, 1440],
    ],
    width: 1440,
    height: 900,
  }),
  grid: shot({
    webp: [
      [gridWebp720, 720],
      [gridWebp1440, 1440],
    ],
    jpg: [
      [gridJpg720, 720],
      [gridJpg1440, 1440],
    ],
    width: 1440,
    height: 900,
  }),
  detail: shot({
    webp: [
      [detailWebp720, 720],
      [detailWebp1440, 1440],
    ],
    jpg: [
      [detailJpg720, 720],
      [detailJpg1440, 1440],
    ],
    width: 1440,
    height: 900,
  }),
  invitation: shot({
    webp: [
      [invitationWebp720, 720],
      [invitationWebp1440, 1440],
    ],
    jpg: [
      [invitationJpg720, 720],
      [invitationJpg1440, 1440],
    ],
    width: 1440,
    height: 900,
  }),
  // Sujin's own Figma, exported from the file the build was made against.
  figmaArchive: shot({
    webp: [
      [figmaArchiveWebp720, 720],
      [figmaArchiveWebp1440, 1440],
    ],
    jpg: [
      [figmaArchiveJpg720, 720],
      [figmaArchiveJpg1440, 1440],
    ],
    width: 1440,
    height: 1700,
  }),
  figmaExhibition: shot({
    webp: [
      [figmaExhibitionWebp720, 720],
      [figmaExhibitionWebp1440, 1440],
    ],
    jpg: [
      [figmaExhibitionJpg720, 720],
      [figmaExhibitionJpg1440, 1440],
    ],
    width: 1440,
    height: 900,
  }),
  // Shot at 390 rather than the usual 510: below 480 the hero drops its canvas
  // for the static treatment the design specifies for phones.
  mobileLanding: shot({
    webp: [
      [mLandingWebp390, 390],
      [mLandingWebp780, 780],
    ],
    jpg: [
      [mLandingJpg390, 390],
      [mLandingJpg780, 780],
    ],
    width: 780,
    height: 1688,
  }),
  mobileTimeline: shot({
    webp: [
      [mTimelineWebp390, 390],
      [mTimelineWebp780, 780],
    ],
    jpg: [
      [mTimelineJpg390, 390],
      [mTimelineJpg780, 780],
    ],
    width: 780,
    height: 1688,
  }),
  mobileExhibition: shot({
    webp: [
      [mExhibitionWebp390, 390],
      [mExhibitionWebp780, 780],
    ],
    jpg: [
      [mExhibitionJpg390, 390],
      [mExhibitionJpg780, 780],
    ],
    width: 780,
    height: 1688,
  }),
};

const SCREENS = [
  {
    id: "entrance",
    name: "Entrance",
    note: "The foyer",
    shot: SHOTS.mobileLanding,
    alt: "The landing page on a phone: A curated archive of Design and Perspective set in a large editorial serif, black on bone white, with Curated by Sujin Kim on a rule and a Scroll to begin prompt",
  },
  {
    id: "archive",
    name: "Archive",
    note: "One year per scroll",
    shot: SHOTS.mobileTimeline,
    alt: "A career chapter on a phone: the year 2023 set large in an editorial serif above ADsologist, Marketing Agency Toronto Canada, the title UIUX Graphic Designer, a paragraph of description and a list of five disciplines, white on near black",
  },
  {
    id: "exhibition",
    name: "Exhibition",
    note: "The gallery floor",
    shot: SHOTS.mobileExhibition,
    alt: "The project grid on a phone: a photograph of red and white takeaway packaging above the title Logo Design, the year 2025, the tools used and a short description, with the next project beginning below",
  },
];

const VIEWS = [{ id: "mobile", label: "The three rooms" }];

const stack = [
  "React 19",
  "Vite 6",
  "styled-components 6",
  "Lenis",
  "Canvas 2D",
  "Adobe Typekit",
];

const buildHighlights = [
  {
    term: "The hero is not text",
    text: "The word is painted to a canvas once, read back with getImageData, and every pixel above alpha 50 becomes a particle with its own size and its own sensitivity to the cursor. Inside a 100px radius they are pushed away along the vector from the mouse, so the word does not shift, it shreds. Two layers crossfade, which keeps the typography sharp at rest and only pays for particles while someone is touching it.",
  },
  {
    term: "Scroll read as intent, not distance",
    text: "The page never scrolls: it is overflow hidden throughout, with a hidden element giving Lenis something to measure and each chapter moved on a transform. Four input sources feed one index, behind a 1000ms lockout and a velocity floor, so one flick of a trackpad advances exactly one year rather than three.",
  },
  {
    term: "An archive the client can extend",
    text: "The twelve chapters are not twelve components. They are derived at module scope from one keyed data file, which splits composite keys so a single year can hold several pages and branches when several things happened at once. The file documents the contract in its own comment, so adding a year is duplicating an object.",
  },
];

const structuredData = caseStudySchemas({
  headline: "Sujin Kim: a designer's portfolio built as a gallery",
  description:
    "A case study on building a graphic designer's portfolio in React 19 as three rooms rather than pages, with a career archive walked one scroll per year and a hero of canvas particles that scatter under the cursor.",
  canonical,
  datePublished: "2026-08-16",
  dateModified: "2026-08-16",
  crumb: "Sujin Kim",
  about: {
    "@type": "Person",
    name: "Sujin Kim",
    jobTitle: "UI/UX, Branding and Graphic Designer",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Toronto",
      addressCountry: "CA",
    },
  },
});

export const SujinCaseStudyPage = ({ onOpenTerms }) => {
  const rootRef = useRef(null);
  useReveal(rootRef);

  const num = createSectionNumber();

  return (
    <Page ref={rootRef}>
      <SEO
        title="Sujin Kim: Designer Portfolio Case Study | Victor Blanco"
        description="How a graphic designer's portfolio became a gallery: three rooms instead of pages, a career archive walked one scroll per year, and a hero of canvas particles that scatter under the cursor. Built in React 19."
        canonical={canonical}
        ogType="article"
        ogTitle="Sujin Kim: a designer's portfolio built as a gallery"
        noindex
        structuredData={structuredData}
      />

      <Container>
        <Breadcrumb current="Sujin Kim" />

        {/* ── Hero ── */}
        <Hero as="header">
          <Title>
            Sujin Kim<Dot>.</Dot>
          </Title>
          <RoleLine>
            Designer&apos;s portfolio · Figma to React build · 2025
          </RoleLine>
          <HeroBody>
            <div>
              <Lede>
                Sujin is a UI/UX, branding and graphic designer, so the brief was
                less &ldquo;show my work&rdquo; than &ldquo;the site is a piece
                of work&rdquo;. She designed it as a gallery: three rooms rather
                than pages, and a career you walk through rather than read. I
                built it.
              </Lede>
              <P>
                That framing decides the engineering. A gallery has no address
                bar and no scrollbar, so the site has neither: one URL, a state
                machine, and scroll treated as a step rather than a distance. The
                work was making an interface that behaves like a place while
                staying something its owner can still add a year to.
              </P>
            </div>
            <HeroSideFigure>
              <Shot
                shot={SHOTS.invitation}
                sizes={SIZES.side}
                alt="The contact page: two cards dropped at slight opposing angles on a near black ground, a dark form card headed Name with phone, email and note fields above a Send Note button, and a bone white card behind it carrying Leave a Note in an oval"
              />
              <Caption>
                The third room. Two cards land at a resting tilt, as though
                dropped on a desk.
              </Caption>
            </HeroSideFigure>
          </HeroBody>
        </Hero>

        <HeroFigure>
          <Shot
            shot={SHOTS.landing}
            sizes={SIZES.full}
            alt="The landing page: A curated archive of, then Design and Perspective set very large in an editorial serif, black on bone white, with Curated by Sujin Kim on a rule between them and a Click here or Scroll to begin prompt at the right"
            eager
          />
          <Caption>
            The entrance. At rest the word is real text; the moment a cursor
            enters it, it is roughly 90,000 particles.
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
              <StatValue>3 rooms</StatValue>
              <StatLabel>
                Entrance, Exhibition and Invitation, reached without a router and
                without a single route
              </StatLabel>
            </StatTile>
            <StatTile>
              <StatValue>12</StatValue>
              <StatLabel>
                Chapters of career history, all derived from one data file rather
                than built by hand
              </StatLabel>
            </StatTile>
            <StatTile>
              <StatValue>~90k</StatValue>
              <StatLabel>
                Particles sampled from the pixels of one word, at 60fps, under
                the cursor
              </StatLabel>
            </StatTile>
          </StatBand>
        </Section>

        {/* ── From Figma to build ── */}
        <Section data-reveal>
          <SecHead>
            <SecNum>{num()}</SecNum>
            <SecTitle>From Figma to build</SecTitle>
          </SecHead>
          <Prose>
            <P>
              What arrived was unusually complete: a designer&apos;s file, drawn
              to the pixel, with the type and spacing already decided. What it
              could not describe is the part that matters most here, because a
              static frame has no way to say{" "}
              <B>how long a transition takes or what a scroll means</B>. The
              archive was handed over as one continuous column. The build had to
              turn it into somewhere you move through.
            </P>
          </Prose>
          <BeforeAfterGrid>
            <BACol>
              <BATag>The Figma</BATag>
              <Figure>
                <Shot
                  shot={SHOTS.figmaArchive}
                  sizes={SIZES.before}
                  alt="The career archive as a single Figma frame: year blocks for 2024, 2023 and 2022 stacked one under another down a tall dark column, each with a large serif year, an employer, a job title and a description"
                />
                <Caption>
                  The archive as delivered: one column, 6,235 pixels tall, every
                  year stacked. This is the top of it.
                </Caption>
              </Figure>
              <Figure>
                <Shot
                  shot={SHOTS.figmaExhibition}
                  sizes={SIZES.before}
                  alt="The exhibition page in Figma: the three-item navigation, five filter pills with ALL filled in white, a search field reading Type to dig through the archive, and the Korean logotype palbangmiin below"
                />
                <Caption>
                  The exhibition, with a search field above the archive and
                  twelve project slots waiting to be filled.
                </Caption>
              </Figure>
            </BACol>
            <BACol>
              <BATag $after>The build</BATag>
              <Figure>
                <Shot
                  shot={SHOTS.timeline}
                  sizes={SIZES.before}
                  alt="One chapter of the built archive filling the viewport: 2023 set large with 2022 beneath it, the ADsologist entry beside them, and a year rail from 1991 to 2025 along the bottom with a warm glow falling from the active dot"
                />
                <Caption>
                  One chapter, one screenful, one scroll. The rail along the
                  bottom is the part the column could not have: a sense of where
                  you are in a career.
                </Caption>
              </Figure>
              <Figure>
                <Shot
                  shot={SHOTS.exhibition}
                  sizes={SIZES.before}
                  alt="The built exhibition page: the same navigation and five filter pills, with the Korean logotype palbangmiin large and white below them and the first row of project cards beginning at the foot of the screen"
                />
                <Caption>
                  The same page built, with the search field dropped and the
                  logotype turned into something that opens.
                </Caption>
              </Figure>
            </BACol>
          </BeforeAfterGrid>
          <ChangeList aria-label="What changed between the design and the build">
            <ChangeItem>
              <ChangeKey>The archive:</ChangeKey> one continuous column{" "}
              <Arrow aria-hidden="true">→</Arrow> twelve full-screen chapters,
              generated from a data file, with a year rail to navigate them
            </ChangeItem>
            <ChangeItem>
              <ChangeKey>Finding work:</ChangeKey> a search field and five
              category filters <Arrow aria-hidden="true">→</Arrow> the filters
              alone, since six projects across five categories is a list to
              browse rather than a corpus to query
            </ChangeItem>
            <ChangeItem>
              <ChangeKey>The category image:</ChangeKey> a static logotype{" "}
              <Arrow aria-hidden="true">→</Arrow> two halves that slide apart on
              hover to expose a dictionary entry underneath
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
              None of this photographs. A screenshot of the hero is a word, and a
              screenshot of the archive is a page: the whole argument of the site
              is what happens between two of them. So the clip below is the
              honest version of the build.
            </P>
          </Prose>
          <FigureWide>
            <Clip
              src={clipMp4}
              poster={clipPoster}
              width={1200}
              height={750}
              label="A recording of the site being used: the cursor scatters the word Perspective into particles, a rule collapses and hands over to the career archive, two chapters advance a year at a time, then the exhibition opens, its category image splits apart on hover to reveal a definition card, and a project detail page assembles itself as it scrolls"
            />
            <Caption>
              The site being used end to end: the hero shredding under the
              cursor, the line wipe out of the entrance, a year per scroll, and
              the exhibition splitting open.
            </Caption>
          </FigureWide>
          <FigureWide>
            <FlowBoard
              title="Sujin Kim / the three rooms"
              idPrefix="sujin"
              views={VIEWS}
              screens={SCREENS}
              renderScreen={(screen) => (
                <Shot shot={screen.shot} sizes={SIZES.board} alt={screen.alt} />
              )}
              caption="Arrive in the foyer, walk the archive one year at a time, then reach the gallery floor. The museum language is not decoration: it is the information architecture, and the copy carries it through."
            />
          </FigureWide>
          <FigureBlock>
            <Shot
              shot={SHOTS.grid}
              sizes={SIZES.full}
              alt="The project grid: four large project photographs in two columns, each captioned with its title, year, the tools used and a short description in white on near black"
            />
            <Caption>
              The gallery floor. Filtering runs on tags rather than a single
              category, so a logo project can sit under both Branding and
              Graphic.
            </Caption>
          </FigureBlock>
          <FigureBlock>
            <Shot
              shot={SHOTS.detail}
              sizes={SIZES.full}
              alt="A project detail page: a full-width photograph of yellow supplement packaging on a blue and cream ground, under a Back to Exhibition button and the site navigation"
            />
            <Caption>
              Each block of a project page has its own entrance, fired by an
              observer as it comes into view, so the page assembles rather than
              simply appearing.
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
            Also in the build: a nav that scrambles its letters through five
            randomised phases before resolving, a warm glow that falls from the
            active year onto the rail below it, seven photographs of the
            client&apos;s dog wired up as cursors, and an explicit filename to
            import map so the data files can stay plain strings while Vite still
            gets imports it can fingerprint.
          </CraftLine>
          <StackRow items={stack} />
        </Section>

        {/* ── Results ── */}
        <Section data-reveal>
          <SecHead>
            <SecNum>{num()}</SecNum>
            <SecTitle>Results</SecTitle>
          </SecHead>
          <Bullets>
            <Bullet>
              <B>The metaphor survived the build</B>: Entrance, Exhibition and
              Invitation are the actual architecture, not section headings, and
              the copy stays in the same voice all the way down to the archive
              calling itself a chronicle.
            </Bullet>
            <Bullet>
              <B>The hero is hers, not an effect</B>: the particles are sampled
              from the letterforms of her chosen display face, so what scatters
              is the typography rather than a generic field laid over it.
            </Bullet>
            <Bullet>
              <B>She can extend it without me</B>: a new year in the archive is a
              duplicated object in one data file, which is why the twelve
              chapters are generated rather than drawn.
            </Bullet>
          </Bullets>
          <Quote>
            <QuoteText>
              “Victor is absolutely amazing developer to work with. He is very
              responsible professional, and his kind advice will make your
              project even better. Attentive, caring, professional person to work
              with. Will definitely work with him again.”
            </QuoteText>
            <QuoteBy>Sujin Kim, via Upwork</QuoteBy>
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
                  <B>Two layers instead of one</B>: keeping real text at rest and
                  only crossfading to particles on contact meant the hero could
                  be both crisp typography and a physical effect, without paying
                  for 90,000 particles while nobody is there.
                </Bullet>
                <Bullet>
                  <B>Deriving the archive rather than drawing it</B>: twelve
                  chapters from one keyed file was more work up front than twelve
                  components, and it is the only reason the site is still hers to
                  edit.
                </Bullet>
              </Bullets>
            </div>
            <div>
              <ReflectHead>What I&apos;d improve</ReflectHead>
              <Bullets>
                <Bullet>
                  <B>No reduced-motion path</B>: on a site this motion-dependent
                  that is the first thing I would fix. The particles, the
                  chapter transitions and the entrance animations all run
                  regardless of what the visitor has asked their system for.
                </Bullet>
                <Bullet>
                  <B>Nothing is linkable</B>: no router means no URL for a
                  project or a year, so a visitor cannot send anyone a specific
                  piece of work. It is a defensible trade for one continuous
                  canvas, but it is a real cost and I would want it priced
                  openly next time.
                </Bullet>
              </Bullets>
            </div>
          </ReflectGrid>
        </Section>

        {/* ── CTA ── */}
        <CTABand data-reveal>
          <CTATitle>Need something similar?</CTATitle>
          <CTAText>
            If you have a design that only makes sense in motion, the interesting
            work is deciding what the transitions mean. Happy to talk it through.
          </CTAText>
          <CTAActions>
            <PrimaryLink
              href={LINKS.calendly}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a call ↗
            </PrimaryLink>
          </CTAActions>
          <BackLink to="/#works">← Back to all work</BackLink>
        </CTABand>
      </Container>

      <ConsentBanner onOpenTerms={onOpenTerms} />
      <Contact onOpenTerms={onOpenTerms} />
    </Page>
  );
};
