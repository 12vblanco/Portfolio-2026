import { Link } from "react-router-dom";
import styled from "styled-components";
import lmdouglasJpg from "../../assets/case-studies/lmdouglas/lmdouglas.jpg";
import lmdouglasWebp from "../../assets/case-studies/lmdouglas/lmdouglas.webp";
import omsJpg from "../../assets/case-studies/oms/oms1.jpg";
import omsWebp from "../../assets/case-studies/oms/oms1.webp";
import orchardJpg from "../../assets/case-studies/orchard/orchard.jpg";
import orchardWebp from "../../assets/case-studies/orchard/orchard.webp";
import sujinJpg from "../../assets/case-studies/sujin/sujin.jpg";
import sujinWebp from "../../assets/case-studies/sujin/sujin.webp";
import {
  caseStudiesMeta,
  caseStudyPath,
  caseStudyUrl,
} from "../../data/caseStudiesMeta";
import { LINKS } from "../../data/siteConfig";
import { ConsentBanner } from "../common/ConsentBanner.jsx";
import { Contact } from "../common/Contact.jsx";
import { SEO } from "../common/SEO.jsx";

const MONO = "'SF Mono', 'Fira Code', Menlo, Consolas, monospace";
const CANONICAL = `${LINKS.site}/work`;

/* Thumbnails live here rather than in caseStudiesMeta because that module is
   imported by Node (scripts/prerender.js, scripts/og-images.js), which cannot
   resolve Vite asset imports. Alt text matches the homepage cards. */
const THUMBS = {
  "sujin-kim": {
    webp: sujinWebp,
    jpg: sujinJpg,
    width: 1259,
    height: 944,
    alt: "The Sujin Kim portfolio landing page: A curated archive of Design and Perspective set in a large editorial serif, black on bone white, with Curated by Sujin Kim on a rule between them and a Scroll to begin prompt at the right",
  },
  "orders-made-simple": {
    webp: omsWebp,
    jpg: omsJpg,
    width: 943,
    height: 595,
    alt: "Orders Made Simple homepage after the redesign: the headline Restaurant ordering software that saves time and protects your margins beside an illustrated phone running the app, over a row of hospitality client logos",
  },
  "lm-douglas": {
    webp: lmdouglasWebp,
    jpg: lmdouglasJpg,
    width: 776,
    height: 540,
    alt: "LM Douglas fantasy author website featuring illustrated fantasy map background and interactive book cover carousel with Vue.js components",
  },
  "the-orchard-bar": {
    webp: orchardWebp,
    jpg: orchardJpg,
    width: 934,
    height: 584,
    alt: "The Orchard Bar website homepage on desktop showing a full-width hero photo of the bar over a warm dark theme with the venue name and navigation",
  },
};

/* Real, indexable hub for the case studies, and the counterpart to /insights.
   Before this the studies were reachable only from the homepage #works
   fragment: the breadcrumb's "Work" step resolved to the same URL as "Home",
   and the four pages never linked to one another. */
export const WorkIndexPage = ({ onOpenTerms }) => {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Web development case studies",
      description:
        "Detailed case studies from a freelance web developer: React and Vue websites, a B2B SaaS marketing redesign and a designer's portfolio.",
      url: CANONICAL,
      inLanguage: "en-GB",
      hasPart: caseStudiesMeta.map((study) => ({
        "@type": "Article",
        headline: study.headline,
        url: caseStudyUrl(study.slug),
        datePublished: study.datePublished,
        dateModified: study.dateModified,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: LINKS.site },
        { "@type": "ListItem", position: 2, name: "Work", item: CANONICAL },
      ],
    },
  ];

  return (
    <>
      <SEO
        title="Web Development Case Studies | Victor Blanco"
        description="Case studies from a freelance web developer: React and Vue sites, a B2B SaaS marketing redesign and a designer's portfolio, each with the build and outcome."
        canonical={CANONICAL}
        ogTitle="Web development case studies"
        ogImage={`${LINKS.site}/og/work.png`}
        structuredData={structuredData}
      />

      <IndexSection>
        <IndexContainer>
          <Crumbs aria-label="Breadcrumb">
            <CrumbLink to="/">Home</CrumbLink>
            <CrumbDivider aria-hidden="true">/</CrumbDivider>
            <CrumbCurrent aria-current="page">Work</CrumbCurrent>
          </Crumbs>

          <Header>
            <Label>Case Studies</Label>
            <Title>
              Web development case studies<TitleDot>.</TitleDot>
            </Title>
            <Subtitle>
              Long-form write-ups of client projects: what the site was, what it
              needed to become, how it was built and what changed afterwards.
              Mostly React and Vue, plus{" "}
              <CopyLink to="/pendo-consultant">Pendo consulting</CopyLink> for
              SaaS teams.
            </Subtitle>
          </Header>

          <Grid>
            {caseStudiesMeta.map((study, i) => {
              const thumb = THUMBS[study.slug];
              return (
                <Card key={study.slug} to={caseStudyPath(study.slug)}>
                  {thumb && (
                    <Thumb>
                      {/* The first card is the likely LCP element, so it loads
                          eagerly; the rest stay lazy. */}
                      <picture>
                        <source srcSet={thumb.webp} type="image/webp" />
                        <img
                          src={thumb.jpg}
                          alt={thumb.alt}
                          width={thumb.width}
                          height={thumb.height}
                          loading={i === 0 ? "eager" : "lazy"}
                          decoding="async"
                        />
                      </picture>
                    </Thumb>
                  )}
                  <CardBody>
                    <CardTag>
                      {study.client} · {study.tag} · {study.year}
                    </CardTag>
                    <CardTitle>{study.cardTitle}</CardTitle>
                    <CardIntro>{study.cardIntro}</CardIntro>
                    <CardReadMore aria-hidden="true">
                      Read the case study →
                    </CardReadMore>
                  </CardBody>
                </Card>
              );
            })}
          </Grid>
        </IndexContainer>
      </IndexSection>

      <ConsentBanner onOpenTerms={onOpenTerms} />
      <Contact onOpenTerms={onOpenTerms} />
    </>
  );
};

// ─── Layout ───────────────────────────────────────────────────────────────────

const IndexSection = styled.section`
  padding: 4rem 0 2rem;
  @media (max-width: 768px) {
    padding: 2.5rem 0 1rem;
  }
`;

const IndexContainer = styled.div`
  width: 80%;
  max-width: 1100px;
  margin: 0 auto;
  @media (max-width: 968px) {
    width: 100%;
    padding: 0 2rem;
  }
  @media (max-width: 426px) {
    padding: 0 1rem;
  }
`;

const Crumbs = styled.nav`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.6rem;
  font-family: ${MONO};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 1rem;
`;

const CrumbLink = styled(Link)`
  color: #282828;
  &:hover {
    color: #ff3863;
  }
`;

const CrumbDivider = styled.span`
  color: #ccc;
`;

const CrumbCurrent = styled.span`
  color: #ff3863;
`;

const Header = styled.header`
  margin-bottom: 3rem;
`;

const Label = styled.span`
  display: block;
  font-family: ${MONO};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #ff3863;
  margin-bottom: 0.75rem;
`;

const Title = styled.h1`
  font-size: clamp(2.2rem, 6vw, 4rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  line-height: 1.05;
  color: #282828;
  margin: 0 0 1rem;
`;

const TitleDot = styled.span`
  color: #ff3863;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
  max-width: 60ch;
  margin: 0;
`;

const CopyLink = styled(Link)`
  color: #282828;
  text-decoration: underline;
  text-underline-offset: 3px;
  &:hover {
    color: #ff3863;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  border: 1px solid #e5e5e5;
  border-radius: 14px;
  overflow: hidden;
  background: #fffefa;
  text-decoration: none;
  transition: border-color 0.2s ease, transform 0.2s ease;
  &:hover {
    border-color: #ff3863;
    transform: translateY(-3px);
  }
  &:focus-visible {
    outline: 2px solid #ff3863;
    outline-offset: 2px;
  }
`;

/* Fixed ratio box so the differing intrinsic sizes cannot shift the grid. */
const Thumb = styled.div`
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: #f2f2f2;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const CardBody = styled.div`
  padding: 1.5rem;
`;

const CardTag = styled.span`
  display: block;
  font-family: ${MONO};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #ff3863;
  margin-bottom: 0.6rem;
`;

const CardTitle = styled.h2`
  font-size: 22px;
  font-weight: 800;
  /* Reset the global display-heading tracking (h2 is -2px). */
  letter-spacing: -0.3px;
  color: #282828;
  margin: 0 0 0.6rem;
  line-height: 1.2;
`;

const CardIntro = styled.p`
  font-size: 0.98rem;
  line-height: 1.55;
  color: #555;
  margin: 0 0 1.25rem;
`;

const CardReadMore = styled.span`
  font-family: ${MONO};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #282828;
`;
