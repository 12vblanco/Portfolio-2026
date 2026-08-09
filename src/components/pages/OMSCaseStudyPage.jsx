import { useRef } from "react";
import beforeHomeJpg1440 from "../../assets/case-studies/oms/before-home-1440.jpg";
import beforeHomeWebp1440 from "../../assets/case-studies/oms/before-home-1440.webp";
import beforeHomeJpg720 from "../../assets/case-studies/oms/before-home-720.jpg";
import beforeHomeWebp720 from "../../assets/case-studies/oms/before-home-720.webp";
import beforeHowJpg1440 from "../../assets/case-studies/oms/before-how-1440.jpg";
import beforeHowWebp1440 from "../../assets/case-studies/oms/before-how-1440.webp";
import beforeHowJpg720 from "../../assets/case-studies/oms/before-how-720.jpg";
import beforeHowWebp720 from "../../assets/case-studies/oms/before-how-720.webp";
import benefitsJpg1440 from "../../assets/case-studies/oms/live-hiw-benefits-1440.jpg";
import benefitsWebp1440 from "../../assets/case-studies/oms/live-hiw-benefits-1440.webp";
import benefitsJpg720 from "../../assets/case-studies/oms/live-hiw-benefits-720.jpg";
import benefitsWebp720 from "../../assets/case-studies/oms/live-hiw-benefits-720.webp";
import hiwHeroJpg1440 from "../../assets/case-studies/oms/live-hiw-hero-1440.jpg";
import hiwHeroWebp1440 from "../../assets/case-studies/oms/live-hiw-hero-1440.webp";
import hiwHeroJpg720 from "../../assets/case-studies/oms/live-hiw-hero-720.jpg";
import hiwHeroWebp720 from "../../assets/case-studies/oms/live-hiw-hero-720.webp";
import liveFoldJpg1440 from "../../assets/case-studies/oms/live-home-fold-1440.jpg";
import logoJpg800 from "../../assets/case-studies/oms/logo-800.jpg";
import logoWebp800 from "../../assets/case-studies/oms/logo-800.webp";
import liveFoldWebp1440 from "../../assets/case-studies/oms/live-home-fold-1440.webp";
import liveFoldJpg720 from "../../assets/case-studies/oms/live-home-fold-720.jpg";
import liveFoldWebp720 from "../../assets/case-studies/oms/live-home-fold-720.webp";
import mFormJpg1020 from "../../assets/case-studies/oms/live-mobile-form-1020.jpg";
import mFormWebp1020 from "../../assets/case-studies/oms/live-mobile-form-1020.webp";
import mFormJpg510 from "../../assets/case-studies/oms/live-mobile-form-510.jpg";
import mFormWebp510 from "../../assets/case-studies/oms/live-mobile-form-510.webp";
import mHiwJpg1020 from "../../assets/case-studies/oms/live-mobile-hiw-1020.jpg";
import mHiwWebp1020 from "../../assets/case-studies/oms/live-mobile-hiw-1020.webp";
import mHiwJpg510 from "../../assets/case-studies/oms/live-mobile-hiw-510.jpg";
import mHiwWebp510 from "../../assets/case-studies/oms/live-mobile-hiw-510.webp";
import mHomeJpg1020 from "../../assets/case-studies/oms/live-mobile-home-1020.jpg";
import mHomeWebp1020 from "../../assets/case-studies/oms/live-mobile-home-1020.webp";
import mHomeJpg510 from "../../assets/case-studies/oms/live-mobile-home-510.jpg";
import mHomeWebp510 from "../../assets/case-studies/oms/live-mobile-home-510.webp";
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

// ⚠️ As of 3 Aug 2026 this domain returns 404 on every path, including every
// URL in its own sitemap: the rebuild is still staged in HubSpot and unpublished.
// The button is here at Victor's request, ready for go-live. Re-check before
// this page is itself published, or it sends visitors to an error page.
const SITE = "https://www.ordersmadesimple.com";
// No public repo: the code is hand-written and injected into a HubSpot template.
const canonical = `${LINKS.site}/OMSCaseStudyPage`;

const SHOTS = {
  // The OMS brand mark. One width only: it renders at 400px at most, so 800
  // already covers 2x, and a 400px variant would fall under Vite's 4 kB inline
  // limit and end up base64'd into the JS bundle.
  logo: shot({
    webp: [[logoWebp800, 800]],
    jpg: [[logoJpg800, 800]],
    width: 800,
    height: 400,
  }),
  // The old site, from Victor's own captures. ordersmadesimple.com now 404s on
  // every path, and these are a later state than the last Wayback snapshot.
  beforeHome: shot({
    webp: [
      [beforeHomeWebp720, 720],
      [beforeHomeWebp1440, 1440],
    ],
    jpg: [
      [beforeHomeJpg720, 720],
      [beforeHomeJpg1440, 1440],
    ],
    width: 1440,
    height: 781,
  }),
  beforeHow: shot({
    webp: [
      [beforeHowWebp720, 720],
      [beforeHowWebp1440, 1440],
    ],
    jpg: [
      [beforeHowJpg720, 720],
      [beforeHowJpg1440, 1440],
    ],
    width: 1440,
    height: 725,
  }),
  liveFold: shot({
    webp: [
      [liveFoldWebp720, 720],
      [liveFoldWebp1440, 1440],
    ],
    jpg: [
      [liveFoldJpg720, 720],
      [liveFoldJpg1440, 1440],
    ],
    width: 1440,
    height: 900,
  }),
  hiwHero: shot({
    webp: [
      [hiwHeroWebp720, 720],
      [hiwHeroWebp1440, 1440],
    ],
    jpg: [
      [hiwHeroJpg720, 720],
      [hiwHeroJpg1440, 1440],
    ],
    width: 1440,
    height: 1014,
  }),
  benefits: shot({
    webp: [
      [benefitsWebp720, 720],
      [benefitsWebp1440, 1440],
    ],
    jpg: [
      [benefitsJpg720, 720],
      [benefitsJpg1440, 1440],
    ],
    width: 1440,
    height: 1053,
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
  mobileHiw: shot({
    webp: [
      [mHiwWebp510, 510],
      [mHiwWebp1020, 1020],
    ],
    jpg: [
      [mHiwJpg510, 510],
      [mHiwJpg1020, 1020],
    ],
    width: 1020,
    height: 1812,
  }),
  mobileForm: shot({
    webp: [
      [mFormWebp510, 510],
      [mFormWebp1020, 1020],
    ],
    jpg: [
      [mFormJpg510, 510],
      [mFormJpg1020, 1020],
    ],
    width: 1020,
    height: 1812,
  }),
};

const SCREENS = [
  {
    id: "home",
    name: "Home",
    note: "The claim, then the proof",
    shot: SHOTS.mobileHome,
    alt: "The rebuilt homepage on a phone: an illustrated handset running the OMS app above the headline Restaurant ordering software that saves time and protects your margins, a short explainer, and Book a demo and Get OMS Lite buttons over the three stat figures",
  },
  {
    id: "how",
    name: "How it works",
    note: "One page, four steps",
    shot: SHOTS.mobileHiw,
    alt: "The How it Works page on a phone: the heading How OMS simplifies supplier ordering, invoices and cost control for hospitality, two buttons, and a line-drawn illustration of a commercial kitchen in the brand's lime green",
  },
  {
    id: "form",
    name: "Signup",
    note: "Posted straight to the API",
    shot: SHOTS.mobileForm,
    alt: "The signup form on a phone: company name, role and locations selects, an email field and a consent checkbox above a Send button that stays disabled, with the hint Tick the box above to continue, followed by the round feature icons",
  },
];

const VIEWS = [{ id: "live", label: "The rebuild" }];

const stack = [
  "HubSpot CMS",
  "Vanilla JavaScript",
  "CSS custom properties",
  "HubSpot Forms API",
  "Figma",
];

const buildHighlights = [
  {
    term: "The brand rebuilt as tokens, not pages",
    text: "The identity lives in 39 CSS custom properties: the palette, a full type scale, a nine-step spacing scale and a set of radii. Every section reads from them, so the look is defined in one place rather than re-decided page by page. That is the part meant to outlast me.",
  },
  {
    term: "HubSpot as a shell, not a page builder",
    text: "The markup, styles and behaviour are hand-written and injected into a HubSpot template. No drag-and-drop modules, no marketplace theme, no framework and no UI library. Marketing keeps the CMS it already knows, and the pages stop looking like everyone else's.",
  },
  {
    term: "Forms that match the site around them",
    text: "The signup posts straight to the HubSpot Forms API with a hand-written fetch rather than embedding HubSpot's own form widget, so the fields inherit the same tokens as everything else. The submit button stays disabled until consent is ticked, and says so.",
  },
];

const structuredData = caseStudySchemas({
  headline: "Orders Made Simple: SaaS marketing site redesign",
  description:
    "A case study on rebuilding a B2B hospitality-procurement marketing site whose identity had drifted, using hand-written HTML, CSS and JavaScript injected into HubSpot and a 39-token design system.",
  canonical,
  datePublished: "2026-08-02",
  dateModified: "2026-08-02",
  crumb: "Orders Made Simple",
  about: {
    "@type": "Organization",
    name: "Orders Made Simple",
    description:
      "Hospitality procurement platform for restaurants, pubs, cafés and multi-site operators.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "84 Commercial Street",
      addressLocality: "Edinburgh",
      postalCode: "EH6 6LX",
      addressCountry: "GB",
    },
  },
});

export const OMSCaseStudyPage = ({ onOpenTerms }) => {
  const rootRef = useRef(null);
  useReveal(rootRef);

  const num = createSectionNumber();

  return (
    <Page ref={rootRef}>
      <SEO
        title="Orders Made Simple: SaaS Website Redesign Case Study | Victor Blanco"
        description="How a B2B SaaS marketing site that had drifted into looking like everyone else got its identity back, rebuilt as a 39-token design system in hand-written code inside HubSpot."
        canonical={canonical}
        ogType="article"
        ogTitle="Orders Made Simple: SaaS marketing site redesign case study"
        noindex
        structuredData={structuredData}
      />

      <Container>
        <Breadcrumb current="Orders Made Simple" />

        {/* ── Hero ── */}
        <Hero as="header">
          <Title>
            Orders Made Simple<Dot>.</Dot>
          </Title>
          <RoleLine>
            B2B SaaS marketing site · Solo: design &amp; build · 2025 to 2026
          </RoleLine>
          <HeroBody>
            <div>
              <Lede>
                Orders Made Simple is an hospitality procurement platform and
                their marketing website drifted from their original look and
                feel. Years of small edits had eroded the brand down until the
                site did not look as polished as it once did. I rebuilt it as a
                design system, so the next round of edits will fit easily in the
                design.
              </Lede>
              <P>
                OMS helps restaurants, pubs, cafés and multi-site operators to
                do manage things easily. I worked for them as a software
                developer while I was in university and I also was their acting
                designer from 2021 to 2023, which meant I already knew the
                visual language the site had drifted away from. I offered
                Stephen to rebuild the site to adapt the old look and feel to a
                modern design.
              </P>
            </div>
            <HeroSideFigure>
              <Shot
                shot={SHOTS.logo}
                sizes={SIZES.side}
                alt="The Orders Made Simple logo: the words Orders Made Simple in white on a lime green field, with Simple reversed out inside a white speech bubble"
                eager
              />
              <Caption>
                The brand the site had drifted away from: lime green, rounded
                type and the speech bubble.
              </Caption>
            </HeroSideFigure>
          </HeroBody>
        </Hero>

        <HeroFigure>
          <Shot
            shot={SHOTS.liveFold}
            sizes={SIZES.full}
            alt="The rebuilt homepage on desktop: a three-item navigation, the headline Restaurant ordering software that saves time and protects your margins with saves time and protects your margins in pink, an explanatory paragraph, two buttons, the figures 35h+ saved per month, 100% existing suppliers kept and 1 platform for everything, and a strip of customer logos"
            eager
          />
          <Caption>
            The homepage rebuilt: bold and clean with the product as the main
            focus point.
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
              <StatValue>2</StatValue>
              <StatLabel>
                Pages holding the most vital information, making it easy for
                client to navigate and find what they need
              </StatLabel>
            </StatTile>
            <StatTile>
              <StatValue>5 to 3</StatValue>
              <StatLabel>
                Top-level nav items simplifying the navigation.
              </StatLabel>
            </StatTile>
            <StatTile>
              <StatValue>2 yrs</StatValue>
              <StatLabel>
                On the team before the rebuild, so the original DNA was not
                guesswork
              </StatLabel>
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
              Nothing here failed all at once. The site was updated steadily for
              years, and each change was reasonable on its own: a heading in
              title case, another nav item, a stock photo to fill a gap, a
              gradient to make a section feel branded. The result was a site
              that said the right things while looking like anyone else's.
            </P>
          </Prose>
          <BeforeAfterGrid>
            <BACol>
              <BATag>Before: the site as it stood</BATag>
              <Figure>
                <Shot
                  shot={SHOTS.beforeHome}
                  sizes={SIZES.before}
                  alt="The old homepage: five navigation items across the top, the headline Save 35+ Hours Per Month On Restaurant Supplier Management in title case with an exclamation mark, a second heading below it, a bulleted feature list and a phone screenshot, all over a lime green gradient that fills the page"
                />
                <Caption>
                  The old homepage: two stacked headings, a bulleted list of
                  features, and a green gradient doing the work a palette should
                  do.
                </Caption>
              </Figure>
              <Figure>
                <Shot
                  shot={SHOTS.beforeHow}
                  sizes={SIZES.before}
                  alt="The old How OMS Works page: the heading How Orders Made Simple Works above Run your kitchen. Not your inbox., three paragraphs of explanation, and a stock photograph of a chef in whites holding a phone, over the same lime green gradient"
                />
                <Caption>
                  The old How OMS Works page. The explanation existed, but stock
                  photography and the same gradient made it look like anyone's
                  SaaS site.
                </Caption>
              </Figure>
            </BACol>
            <BACol>
              <BATag $after>After: the rebuild</BATag>
              <PhoneFigure>
                <Shot
                  shot={SHOTS.mobileHome}
                  sizes={SIZES.phone}
                  alt="The rebuilt homepage on a phone: an illustrated handset running the OMS app above the headline Restaurant ordering software that saves time and protects your margins, a short explainer, and Book a demo and Get OMS Lite buttons"
                />
                <Caption>
                  One claim, in sentence case, with the explanation immediately
                  under it and the brand carried by type and illustration
                  instead of a gradient.
                </Caption>
              </PhoneFigure>
            </BACol>
          </BeforeAfterGrid>
          <ChangeList aria-label="What changed">
            <ChangeItem>
              <ChangeKey>Navigation:</ChangeKey> five top-level items{" "}
              <Arrow aria-hidden="true">→</Arrow> three, with pricing, suppliers
              and insights moved into the footer
            </ChangeItem>
            <ChangeItem>
              <ChangeKey>Voice:</ChangeKey> Title Case And Exclamation Marks{" "}
              <Arrow aria-hidden="true">→</Arrow> sentence case, opening on what
              the product actually is
            </ChangeItem>
            <ChangeItem>
              <ChangeKey>Look:</ChangeKey> a full-bleed green gradient and stock
              photography <Arrow aria-hidden="true">→</Arrow> a palette, type
              scale and spacing defined once and reused everywhere
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
              The brief was not "make it prettier", it was{" "}
              <B>make it theirs again, and make it stay that way</B>. So the
              work was less about drawing pages and more about deciding where
              the identity should live. It now lives in a small set of CSS
              custom properties that every section reads from, hand-written and
              injected into a HubSpot template so marketing keeps the CMS it
              already knows.
            </P>
          </Prose>
          <FigureWide>
            <FlowBoard
              title="Orders Made Simple / mobile flow"
              idPrefix="oms"
              views={VIEWS}
              screens={SCREENS}
              renderScreen={(screen) => (
                <Shot shot={screen.shot} sizes={SIZES.board} alt={screen.alt} />
              )}
              caption="Arrive on the claim, get the four-step explanation, then a signup form that looks like the rest of the site instead of like an embedded widget."
            />
          </FigureWide>
          <FigureBlock>
            <Shot
              shot={SHOTS.hiwHero}
              sizes={SIZES.full}
              alt="The How it Works page on desktop: the heading How OMS simplifies supplier ordering, invoices and cost control for hospitality with three phrases in pink, a short explainer, Book a demo and Get OMS Lite buttons, and a wide line-drawn illustration of a commercial kitchen with lime green units and pendant lights"
            />
            <Caption>
              The same page, rewritten. It opens on the problem in the reader's
              own words, then answers it in four numbered steps rather than
              three paragraphs beside a stock photo.
            </Caption>
          </FigureBlock>
          <FigureBlock>
            <Shot
              shot={SHOTS.benefits}
              sizes={SIZES.full}
              alt="A section headed Key Benefits of OMS with six outlined cards in two rows: Time saving, Cost Control, Simplified Stock Takes, Better Supplier Relationships, Proven Industry Experience and Accounting Integration, each with a line icon and a short description"
            />
            <Caption>
              Six cards, one card component. Spacing, radius, border and type
              all come from the same tokens, which is why the grid holds
              together.
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
            Also in the build: a nine-step spacing scale rather than ad-hoc
            margins, hand-named form fields and hints wired to their inputs, and
            line-drawn illustrations in the brand palette instead of stock
            photography.
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
              <B>The identity is recoverable</B>: it is written down as tokens
              rather than spread across pages, so a future edit changes a value
              instead of eroding a look.
            </Bullet>
            <Bullet>
              <B>The explanation has a shape</B>: How it Works went from
              paragraphs beside a stock photo to four numbered steps, each
              ending in the words a customer would actually search for.
            </Bullet>
            <Bullet>
              <B>The forms stopped looking borrowed</B>: posting to the API
              rather than embedding a widget means the signup inherits the same
              type, spacing and colour as everything around it.
            </Bullet>
          </Bullets>
          <Quote>
            <QuoteText>
              “If you're looking for a good developer, Victor is genuinely a
              pleasure to work with. Super sharp, picks up new things fast. He's
              a real problem-solver who approaches every challenge with a clear
              head. His strengths are communication and organisation.”
            </QuoteText>
            <QuoteBy>Stephen S., Orders Made Simple</QuoteBy>
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
                  <B>Treating drift as the real problem</B>: the brief was a
                  redesign, but the thing that had actually failed was that the
                  identity had nowhere to live. Tokens fix that, a new layout
                  would not have.
                </Bullet>
                <Bullet>
                  <B>Having been on the inside</B>: two years on the team meant
                  I was restoring a visual language I already knew rather than
                  reverse-engineering one from old screenshots.
                </Bullet>
              </Bullets>
            </div>
            <div>
              <ReflectHead>What I'd improve</ReflectHead>
              <Bullets>
                <Bullet>
                  <B>Hand-written code is awkward to hand over</B>: marketing
                  can edit copy, but building a new page in the same language
                  still comes back to me. Turning the token system into real
                  HubSpot modules is the obvious next step.
                </Bullet>
                <Bullet>
                  <B>Two pages is not a site</B>: Home and How it Works set the
                  language, and the rest of the site has yet to be brought over
                  to it.
                </Bullet>
              </Bullets>
            </div>
          </ReflectGrid>
        </Section>

        {/* ── CTA ── */}
        <CTABand data-reveal>
          <CTATitle>Need something similar?</CTATitle>
          <CTAText>
            If your site has drifted away from your brand, that is usually a
            systems problem rather than a design one. Happy to talk it through.
          </CTAText>
          <CTAActions>
            <PrimaryLink href={SITE} target="_blank" rel="noopener noreferrer">
              Visit live site ↗
            </PrimaryLink>
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
