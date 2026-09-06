/* Shared visual language for every case-study page.
   Extracted verbatim from the Orchard build so all studies stay identical in
   type, spacing and colour. A page imports what it needs and composes it; the
   only things a page defines locally are figures unique to that project. */

import { Link } from "react-router-dom";
import styled from "styled-components";

export const MONO = "'SF Mono', 'Fira Code', Menlo, Consolas, monospace";

// ─── Layout ───────────────────────────────────────────────────────────────────

export const Page = styled.div`
  padding-top: 2rem;
`;

export const Container = styled.div`
  width: 80%;
  max-width: 1080px;
  margin: 0 auto;
  @media (max-width: 968px) {
    width: 100%;
    padding: 0 2rem;
  }
  @media (max-width: 426px) {
    padding: 0 1rem;
  }
`;

// ─── Breadcrumb ──
export const Crumbs = styled.nav`
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
export const CrumbLink = styled(Link)`
  color: #282828;
  &:hover {
    color: #ff3863;
  }
  &:focus-visible {
    outline: 2px solid #ff3863;
    outline-offset: 2px;
    border-radius: 4px;
  }
`;
export const CrumbDivider = styled.span`
  color: #ccc;
`;
export const CrumbCurrent = styled.span`
  color: #ff3863;
`;

/* Home / Work / <this study>. `current` is the study's display name. */
export const Breadcrumb = ({ current }) => (
  <Crumbs aria-label="Breadcrumb">
    <CrumbLink to="/">Home</CrumbLink>
    <CrumbDivider aria-hidden="true">/</CrumbDivider>
    <CrumbLink to="/work">Work</CrumbLink>
    <CrumbDivider aria-hidden="true">/</CrumbDivider>
    <CrumbCurrent aria-current="page">{current}</CrumbCurrent>
  </Crumbs>
);

// ─── Hero ──
export const Hero = styled.div`
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 2.5rem;
`;

export const Title = styled.h1`
  font-size: clamp(2.8rem, 7vw, 5rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.03em;
  color: #282828;
  margin: 0 0 1.25rem;
`;
export const Dot = styled.span`
  color: #ff3863;
`;
/* Lives INSIDE <Title> so the h1 carries what the study is about, not only the
   client's name. The name alone is a proper noun nobody searches to find a web
   developer; this line is where the service keywords go. Sized well below the
   name so the hero keeps its poster hierarchy. */
export const TitleSub = styled.span`
  display: block;
  max-width: 34ch;
  margin-top: 0.75rem;
  font-size: clamp(1.05rem, 2.2vw, 1.5rem);
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.01em;
  color: #666;
`;
export const RoleLine = styled.p`
  font-family: ${MONO};
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #999;
  margin: 0 0 1.5rem;
`;
export const Lede = styled.p`
  max-width: 60ch;
  margin: 0 0 1.25rem;
  font-weight: 600;
  color: #282828;
`;
/* Text column keeps its measure; the side figure fills the leftover space.
   Same grid idiom as InsightArticlePage's StandfirstRow. */
export const HeroBody = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
  gap: 3rem;
  align-items: start;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.75rem;
  }
`;
export const HeroSideFigure = styled.figure`
  margin: 0;
`;
export const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
`;
export const HeroFigure = styled.div`
  margin: 2.5rem 0 1rem;
`;

/* Site-wide pill buttons, matching PrimaryButton/SecondaryButton in HeroCTA.jsx */
export const PrimaryLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px 8px;
  background: #282828;
  color: #fffefa;
  border-radius: 50px;
  font-size: 16px;
  line-height: 1;
  font-weight: 600;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  svg {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
  }
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(40, 40, 40, 0.15);
    border-color: #ff3863;
    background: #fffefa;
    color: #ff3863;
  }
  &:focus-visible {
    outline: 2px solid #ff3863;
    outline-offset: 2px;
  }
`;
export const GhostLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px 8px;
  background: #fffefa;
  color: #282828;
  border-radius: 50px;
  font-size: 16px;
  line-height: 1;
  font-weight: 600;
  border: 2px solid #242424;
  transition: all 0.3s ease;
  svg {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
  }
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(40, 40, 40, 0.15);
    border-color: #ff3863;
    color: #ff3863;
  }
  &:focus-visible {
    outline: 2px solid #ff3863;
    outline-offset: 2px;
  }
`;

// ─── Sections ──
export const Section = styled.section`
  padding: 3.5rem 0;
  border-top: 1px solid #e5e5e5;
  @media (max-width: 768px) {
    padding: 2.5rem 0;
  }
`;
export const SecHead = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 1.75rem;
`;
export const SecNum = styled.span`
  font-family: ${MONO};
  font-size: 32px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #ff3863;
`;
export const SecTitle = styled.h2`
  font-size: clamp(1.7rem, 3.5vw, 2.4rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #282828;
  margin: 0;
`;

// ─── Prose ──
export const Prose = styled.div``;
export const P = styled.p`
  font-size: 18px;
  line-height: 1.8;
  color: #555;
  margin: 0 0 1.1rem;
  max-width: 68ch;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;
export const B = styled.strong`
  font-weight: 700;
  color: #282828;
`;

// ─── Figures & captions ──
export const Figure = styled.figure`
  margin: 0;
`;
/* A figure that follows body copy or a grid and needs air above it. */
export const FigureBlock = styled.figure`
  margin: 2rem 0 0;
`;
/* Sits directly under a section heading, so it needs less. */
export const FigureWide = styled.figure`
  margin: 1.5rem 0 0;
`;
/* The phone fills its column on desktop; on a narrow screen it stops short of
   full width so it still reads as a handset rather than a page. */
export const PhoneFigure = styled.figure`
  margin: 0;
  width: 100%;
  @media (max-width: 700px) {
    margin: 0 auto;
    max-width: 360px;
  }
`;
export const Caption = styled.figcaption`
  font-size: 14px;
  color: #999;
  line-height: 1.5;
  margin-top: 0.75rem;
  padding-top: 0.6rem;
  border-top: 1px solid #e5e5e5;
`;

// ─── Outcomes stat band ──
export const StatBand = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem 2rem;
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;
export const StatTile = styled.div`
  border-top: 2px solid #282828;
  padding-top: 0.85rem;
`;
export const StatValue = styled.div`
  font-size: clamp(1.9rem, 3.5vw, 2.6rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  color: #282828;
  line-height: 1.1;
`;
export const StatLabel = styled.span`
  display: block;
  font-family: ${MONO};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #999;
  margin-top: 0.5rem;
  line-height: 1.5;
`;
/* The pink chip that marks a number still to be confirmed by the client. */
export const Stat = styled.span`
  font-family: ${MONO};
  font-weight: 700;
  color: #ff3863;
  background: rgba(255, 56, 99, 0.08);
  padding: 1px 7px;
  border-radius: 4px;
  white-space: nowrap;
`;

// ─── Before & after ──
export const BeforeAfterGrid = styled.div`
  display: grid;
  /* Two stacked landscape shots on the left against one portrait phone on the
     right: this split lands the columns at roughly equal height. */
  grid-template-columns: 1.3fr 1fr;
  gap: 2rem;
  align-items: start;
  margin-top: 2rem;
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;
export const BACol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;
export const BATag = styled.span`
  font-family: ${MONO};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${(p) => (p.$after ? "#ff3863" : "#999")};
`;
export const ChangeList = styled.ul`
  list-style: none;
  margin: 2rem 0 0;
  padding: 1.25rem 0 0;
  border-top: 1px solid #e5e5e5;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;
export const ChangeItem = styled.li`
  font-family: ${MONO};
  font-size: 13px;
  line-height: 1.7;
  color: #555;
`;
export const ChangeKey = styled.strong`
  font-weight: 700;
  color: #282828;
`;
export const Arrow = styled.span`
  color: #ff3863;
  font-weight: 700;
`;

// ─── Build highlights ──
export const DefList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem 2rem;
  margin-top: 2.5rem;
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;
export const DefItem = styled.div`
  border-top: 2px solid #282828;
  padding-top: 0.85rem;
`;
export const DefTerm = styled.h3`
  font-size: 1.05rem;
  font-weight: 800;
  color: #282828;
  margin: 0 0 0.45rem;
`;
export const DefText = styled.p`
  font-size: 16px;
  line-height: 1.65;
  color: #555;
  margin: 0;
`;
export const CraftLine = styled.p`
  font-size: 15px;
  color: #999;
  margin-top: 1.5rem;
  max-width: 68ch;
`;

// ─── Stack chips ──
export const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.75rem;
`;
export const StackLabel = styled.span`
  font-family: ${MONO};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #999;
  margin-right: 0.5rem;
`;
export const Chip = styled.span`
  font-family: ${MONO};
  font-size: 12px;
  color: #282828;
  background: #fffefa;
  border: 1px solid #e5e5e5;
  border-radius: 999px;
  padding: 4px 12px;
  white-space: nowrap;
`;

/* `Stack` + chips in one line, since every study ends its solution section
   with the same row. */
export const StackRow = ({ items, label = "Stack" }) => (
  <ChipRow>
    <StackLabel>{label}</StackLabel>
    {items.map((item) => (
      <Chip key={item}>{item}</Chip>
    ))}
  </ChipRow>
);

// ─── Bullets ──
export const Bullets = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`;
export const Bullet = styled.li`
  font-size: 18px;
  line-height: 1.7;
  color: #555;
  padding-left: 1.5rem;
  position: relative;
  max-width: 70ch;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.6em;
    width: 9px;
    height: 9px;
    background: #ff3863;
    transform: rotate(45deg);
  }
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

// ─── Quote (sits inside the Results section, so no band borders of its own) ──
export const Quote = styled.blockquote`
  margin: 0;
  padding: 2.5rem 0 0.5rem;
  text-align: center;
  &::before {
    content: "“";
    display: block;
    font-size: 4rem;
    line-height: 0.4;
    font-weight: 800;
    color: #ff3863;
    margin-bottom: 1.25rem;
  }
`;
export const QuoteText = styled.p`
  font-size: clamp(1.2rem, 2.2vw, 1.6rem);
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: -0.3px;
  color: #282828;
  max-width: 60rem;
  margin: 0 auto;
`;
export const QuoteBy = styled.cite`
  display: block;
  font-family: ${MONO};
  font-style: normal;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #999;
  margin-top: 1.5rem;
`;

// ─── Reflection ──
export const ReflectGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;
export const ReflectHead = styled.h3`
  font-size: 1.15rem;
  font-weight: 800;
  color: #282828;
  margin: 0 0 1rem;
  padding-bottom: 0.6rem;
  border-bottom: 2px solid #ff3863;
  display: inline-block;
`;

// ─── CTA ──
export const CTABand = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  margin: 3.5rem 0 2rem;
  background: #282828;
  border-radius: 16px;
  color: #fffefa;
`;
export const CTATitle = styled.h2`
  font-size: clamp(1.6rem, 3.5vw, 2.4rem);
  font-weight: 800;
  color: #fffefa;
  margin: 0 0 0.75rem;
`;
export const CTAText = styled.p`
  font-size: 1.05rem;
  color: rgba(255, 254, 250, 0.75);
  margin: 0 0 2rem;
`;
export const CTAActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  /* Pill buttons inverted for the dark band */
  a {
    background: transparent;
    color: #fffefa;
    border-color: rgba(255, 254, 250, 0.4);
  }
  a:hover {
    background: transparent;
    color: #ff3863;
    border-color: #ff3863;
  }
  a:first-child {
    background: #fffefa;
    color: #282828;
    border-color: transparent;
  }
  a:first-child:hover {
    background: #ff3863;
    color: #fffefa;
    border-color: transparent;
  }
`;
export const BackLink = styled(Link)`
  display: inline-block;
  margin-top: 2rem;
  font-family: ${MONO};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 254, 250, 0.7);
  &:hover {
    color: #ff3863;
  }
`;
