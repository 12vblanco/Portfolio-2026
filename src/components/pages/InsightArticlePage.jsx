import gsap from 'gsap';
import { Fragment, useEffect, useRef } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { LINKS } from '../../data/siteConfig';
import { prefersReducedMotion } from '../../utils/motion';
import { ConsentBanner } from '../common/ConsentBanner.jsx';
import { Contact } from '../common/Contact.jsx';
import { SEO } from '../common/SEO.jsx';
import {
  ApiFlowFigure,
  AuditAreasFigure,
  AuditIssueBarsFigure,
  ClicksVsVisitorsFigure,
} from '../pendo-consultant/ArticleFigures.jsx';
import { PendoAnalyticsDashboard } from '../pendo-consultant/PendoAnalyticsDashboard';
import { PendoCTA } from '../pendo-consultant/PendoCTA.jsx';
import { getInsightBySlug } from '../pendo-consultant/pendoInsightsData';

// Maps the `figure` key used in pendoInsightsData sections to its component
const ARTICLE_FIGURES = {
  auditAreas: AuditAreasFigure,
  auditIssueBars: AuditIssueBarsFigure,
  clicksVsVisitors: ClicksVsVisitorsFigure,
  apiFlow: ApiFlowFigure,
};

const MONO = "'SF Mono', 'Fira Code', Menlo, Consolas, monospace";

export const InsightArticlePage = ({ onOpenTerms }) => {
  const { slug } = useParams();
  const article = getInsightBySlug(slug);

  const cardRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
        );
      }
    });

    return () => ctx.revert();
  }, [slug]);

  if (!article) return <Navigate to="/pendo-consultant" replace />;

  const canonical = `${LINKS.site}/insights/${article.slug}`;
  const ogImage = `${LINKS.site}/og/${article.slug}.png`;
  const [authorName, authorRole] = (article.name || 'Victor Blanco').split(' - ');

  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.meta.description,
    "url": canonical,
    "mainEntityOfPage": { "@type": "WebPage", "@id": canonical },
    "image": ogImage,
    "datePublished": article.datePublished,
    "dateModified": article.dateModified,
    "keywords": article.pills,
    "author": {
      "@type": "Person",
      "name": "Victor Blanco",
      "url": LINKS.site,
      "jobTitle": "Certified Pendo Consultant",
      "sameAs": [LINKS.github, LINKS.upwork, LINKS.credly],
    },
    "publisher": {
      "@type": "Person",
      "name": "Victor Blanco",
      "url": LINKS.site,
    },
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": LINKS.site },
      { "@type": "ListItem", "position": 2, "name": "Pendo Consultant", "item": `${LINKS.site}/pendo-consultant` },
      { "@type": "ListItem", "position": 3, "name": article.title, "item": canonical },
    ],
  };

  // Numbered section headings, magazine style (intro sections have no heading)
  let sectionCounter = 0;

  return (
    <>
      <SEO
        title={article.meta.title}
        description={article.meta.description}
        canonical={canonical}
        ogType="article"
        ogTitle={article.title}
        ogImage={ogImage}
        structuredData={[articleStructuredData, breadcrumbStructuredData]}
      />

      <ArticleSection>
        <ArticleContainer>
          <Crumbs aria-label="Breadcrumb">
            <CrumbLink to="/">Home</CrumbLink>
            <CrumbDivider aria-hidden="true">/</CrumbDivider>
            <CrumbLink to="/pendo-consultant#insights">Pendo Insights</CrumbLink>
            <CrumbDivider aria-hidden="true">/</CrumbDivider>
            <CrumbCurrent aria-current="page">{article.tag}</CrumbCurrent>
          </Crumbs>

          <ArticleCard ref={cardRef} as="article">

            {/* ── Masthead ── */}
            <Masthead>
              <KickerRow>
                <KickerTag>{article.tag}</KickerTag>
                <KickerItem>{article.date}</KickerItem>
                <KickerItem>{article.read}</KickerItem>
              </KickerRow>

              <DisplayTitle>
                {article.title}
                <TitleDot>.</TitleDot>
              </DisplayTitle>

              <StandfirstRow>
                <Standfirst>{article.subtitle}</Standfirst>
                <BylineBlock>
                  <BylineLabel>Words</BylineLabel>
                  <BylineName>{authorName}</BylineName>
                  {authorRole && <BylineRole>{authorRole}</BylineRole>}
                </BylineBlock>
              </StandfirstRow>
            </Masthead>

            {/* ── Editorial body grid ── */}
            <BodyGrid>
              {article.sections.map((section, i) => {
                const Figure = section.figure ? ARTICLE_FIGURES[section.figure] : null;
                const num = section.heading ? ++sectionCounter : null;

                return (
                  <Fragment key={i}>
                    {section.heading && (
                      <SectionHeader>
                        <SectionNumber>{String(num).padStart(2, '0')}</SectionNumber>
                        <SectionHeading>{section.heading}</SectionHeading>
                      </SectionHeader>
                    )}

                    {section.paragraphs.map((para, j) => (
                      <ArticleParagraph key={j} $dropCap={i === 0 && j === 0}>
                        {para}
                      </ArticleParagraph>
                    ))}

                    {section.pull && (
                      <PullQuote>
                        <PullQuoteText>{section.pull}</PullQuoteText>
                      </PullQuote>
                    )}

                    {Figure && (
                      <FigureSlot>
                        <Figure />
                      </FigureSlot>
                    )}

                    {section.code && (
                      <CodeBlock>
                        {section.code.title && <CodeTitle>{section.code.title}</CodeTitle>}
                        <CodePre><code>{section.code.content}</code></CodePre>
                      </CodeBlock>
                    )}

                    {section.paragraphsAfter?.map((para, j) => (
                      <ArticleParagraph key={`after-${j}`}>{para}</ArticleParagraph>
                    ))}

                    {section.list && (
                      <DefinitionList>
                        {section.list.map((item) => (
                          <DefinitionItem key={item.term}>
                            <DefinitionTerm>{item.term}:</DefinitionTerm> {item.text}
                          </DefinitionItem>
                        ))}
                      </DefinitionList>
                    )}

                    {section.steps && (
                      <StepsList>
                        {section.steps.map((step) => (
                          <StepRow key={step.label}>
                            <StepLabel>{step.label}</StepLabel>
                            <StepText>{step.text}</StepText>
                          </StepRow>
                        ))}
                      </StepsList>
                    )}

                    {section.table && (
                      <TableWrapper>
                        <FindingsTable>
                          <thead>
                            <tr>
                              {section.table.head.map((h) => <th key={h}>{h}</th>)}
                            </tr>
                          </thead>
                          <tbody>
                            {section.table.rows.map((row, r) => (
                              <tr key={r}>
                                {row.map((cell, c) => <td key={c}>{cell}</td>)}
                              </tr>
                            ))}
                          </tbody>
                        </FindingsTable>
                      </TableWrapper>
                    )}
                  </Fragment>
                );
              })}

              {article.quote?.text && (
                <PullQuote as="blockquote">
                  <PullQuoteText>{article.quote.text}</PullQuoteText>
                  {article.quote.attribution && (
                    <PullAttribution>{article.quote.attribution}</PullAttribution>
                  )}
                </PullQuote>
              )}

              {article.dashboard && (
                <DashboardSlot>
                  <PendoAnalyticsDashboard />
                </DashboardSlot>
              )}

              <EndMark aria-hidden="true" />

              {article.pills?.length > 0 && (
                <FiledUnder>
                  <FiledUnderLabel>Filed under</FiledUnderLabel>
                  <FiledUnderPills>
                    {article.pills.map((pill, i) => (
                      <ArticlePill key={i}>{pill}</ArticlePill>
                    ))}
                  </FiledUnderPills>
                </FiledUnder>
              )}
            </BodyGrid>
          </ArticleCard>
        </ArticleContainer>
      </ArticleSection>

      <PendoCTA />
      <ConsentBanner onOpenTerms={onOpenTerms} />
      <Contact onOpenTerms={onOpenTerms} />
    </>
  );
};

// ─── Layout ───────────────────────────────────────────────────────────────────

const ArticleSection = styled.section`
  padding: 4rem 0 2rem;
  @media (max-width: 768px) { padding: 2.5rem 0 1rem; }
`;

const ArticleContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  @media (max-width: 968px) { width: 100%; padding: 0 2rem; }
  @media (max-width: 426px) { padding: 0 0.6rem; }
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
  margin-bottom: 1.5rem;
`;

const CrumbLink = styled(Link)`
  color: #282828;
  transition: color 0.2s ease;
  &:hover { color: #FF3863; }
  &:focus-visible {
    outline: 2px solid #FF3863;
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

const CrumbDivider = styled.span`
  color: #ccc;
`;

const CrumbCurrent = styled.span`
  color: #FF3863;
`;

const ArticleCard = styled.div`
  background: #FFFEFA;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 3.5rem 5rem 4rem;
  box-shadow: 0 2px 8px rgba(40, 40, 40, 0.05);
  @media (max-width: 968px) { padding: 2.5rem 2rem 3rem; }
  @media (max-width: 768px) { padding: 2rem 1.25rem 2.5rem; }
`;

// ─── Masthead ─────────────────────────────────────────────────────────────────

const Masthead = styled.header`
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 2.75rem;
  margin-bottom: 3rem;
  @media (max-width: 768px) { padding-bottom: 2rem; margin-bottom: 2rem; }
`;

const KickerRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  border-top: 3px solid #282828;
  border-bottom: 1px solid #e5e5e5;
  padding: 0.85rem 0;
  margin-bottom: 2.75rem;
  font-family: ${MONO};
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  @media (max-width: 768px) { margin-bottom: 1.75rem; }
`;

const KickerTag = styled.span`
  color: #FF3863;
  font-weight: 700;
`;

const KickerItem = styled.span`
  color: #999;
`;

const DisplayTitle = styled.h1`
  font-size: clamp(2.4rem, 5.5vw, 4.3rem);
  font-weight: 900;
  line-height: 1.02;
  letter-spacing: -0.025em;
  color: #282828;
  margin: 0 0 2.25rem;
  max-width: 22ch;
`;

const TitleDot = styled.span`
  color: #FF3863;
`;

const StandfirstRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 240px;
  gap: 3rem;
  align-items: end;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.75rem;
  }
`;

const Standfirst = styled.p`
  font-size: clamp(1.15rem, 1.8vw, 1.4rem);
  line-height: 1.55;
  color: #555;
  margin: 0;
  max-width: 56ch;
`;

const BylineBlock = styled.div`
  border-top: 2px solid #FF3863;
  padding-top: 0.85rem;
`;

const BylineLabel = styled.span`
  display: block;
  font-family: ${MONO};
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #999;
  margin-bottom: 0.35rem;
`;

const BylineName = styled.span`
  display: block;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #282828;
`;

const BylineRole = styled.span`
  display: block;
  font-size: 13px;
  color: #999;
  margin-top: 0.15rem;
`;

// ─── Editorial body grid ──────────────────────────────────────────────────────
// Prose sits in a readable centre column; figures, quotes, code and the
// dashboard break out to the full card width, like a magazine spread.

const BodyGrid = styled.div`
  display: grid;
  grid-template-columns: [full-start] 1fr [content-start] minmax(0, 68ch) [content-end] 1fr [full-end];
  row-gap: 1.4rem;
  counter-reset: fig;

  > * {
    grid-column: content;
    min-width: 0;
  }

  @media (max-width: 768px) {
    grid-template-columns: [full-start content-start] minmax(0, 1fr) [content-end full-end];
  }
`;

const SectionHeader = styled.div`
  margin-top: 2.25rem;
`;

const SectionNumber = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-family: ${MONO};
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.16em;
  color: #FF3863;
  margin-bottom: 0.7rem;

  &::after {
    content: '';
    width: 48px;
    height: 2px;
    background: #282828;
  }
`;

const SectionHeading = styled.h2`
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 800;
  letter-spacing: -0.8px;
  line-height: 1.15;
  color: #282828;
  margin: 0;
`;

const ArticleParagraph = styled.p`
  font-size: 18px;
  line-height: 1.85;
  color: #555;
  margin: 0;
  @media (max-width: 768px) { font-size: 16px; }

  ${({ $dropCap }) => $dropCap && `
    &::first-letter {
      float: left;
      font-size: 4.6em;
      line-height: 0.78;
      font-weight: 800;
      color: #FF3863;
      padding: 0.06em 0.12em 0 0;
    }
  `}
`;

// ─── Pull quotes ──────────────────────────────────────────────────────────────

const PullQuote = styled.div`
  grid-column: full;
  justify-self: center;
  width: min(100%, 56rem);
  text-align: center;
  margin: 2rem 0;
  padding: 2.5rem 1.5rem;
  border-top: 2px solid #282828;
  border-bottom: 2px solid #282828;

  &::before {
    content: '“';
    display: block;
    font-size: 4rem;
    font-weight: 800;
    line-height: 0.4;
    color: #FF3863;
    margin-bottom: 1.1rem;
  }

  @media (max-width: 768px) { padding: 2rem 0.5rem; margin: 1.25rem 0; }
`;

const PullQuoteText = styled.p`
  font-size: clamp(1.4rem, 2.6vw, 2rem);
  font-weight: 700;
  line-height: 1.35;
  letter-spacing: -0.5px;
  color: #282828;
  margin: 0;
`;

const PullAttribution = styled.cite`
  display: block;
  font-family: ${MONO};
  font-style: normal;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #999;
  margin-top: 1.25rem;
`;

// ─── Figures ──────────────────────────────────────────────────────────────────

const FigureSlot = styled.div`
  grid-column: full;
  counter-increment: fig;
  margin: 1rem 0;

  figure { margin: 0; }

  figcaption {
    border-top: 1px solid #e5e5e5;
    padding-top: 0.75rem;
    margin-top: 1.1rem;
  }

  figcaption::before {
    content: 'Fig. ' counter(fig, decimal-leading-zero);
    display: block;
    font-family: ${MONO};
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #FF3863;
    margin-bottom: 0.35rem;
  }
`;

const DashboardSlot = styled.div`
  grid-column: full;
  margin-top: 1rem;
`;

// ─── Code block ───────────────────────────────────────────────────────────────

const CodeBlock = styled.div`
  grid-column: full;
  justify-self: center;
  width: min(100%, 64rem);
  margin: 0.75rem 0;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #282828;
`;

const CodeTitle = styled.div`
  background: #282828;
  color: rgba(255, 254, 250, 0.7);
  font-family: ${MONO};
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.06em;
  padding: 0.7rem 1.25rem;
  border-bottom: 1px solid rgba(255, 254, 250, 0.12);
`;

const CodePre = styled.pre`
  background: #282828;
  margin: 0;
  padding: 1.25rem;
  overflow-x: auto;

  code {
    font-family: ${MONO};
    font-size: 14px;
    line-height: 1.65;
    color: #FFFEFA;
    white-space: pre;
  }
`;

// ─── Lists, steps, table ──────────────────────────────────────────────────────

const DefinitionList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const DefinitionItem = styled.li`
  font-size: 18px;
  line-height: 1.75;
  color: #555;
  padding-left: 1.4rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.62em;
    width: 9px;
    height: 9px;
    background: #FF3863;
    transform: rotate(45deg);
  }

  @media (max-width: 768px) { font-size: 16px; }
`;

const DefinitionTerm = styled.strong`
  font-weight: 700;
  color: #282828;
`;

const StepsList = styled.ol`
  list-style: none;
  margin: 0.5rem 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  border-top: 2px solid #282828;
`;

const StepRow = styled.li`
  display: flex;
  gap: 1.5rem;
  padding: 1.15rem 0;
  border-bottom: 1px solid #e5e5e5;
  @media (max-width: 600px) { flex-direction: column; gap: 0.3rem; }
`;

const StepLabel = styled.span`
  flex: 0 0 96px;
  font-family: ${MONO};
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #FF3863;
  padding-top: 0.25rem;
`;

const StepText = styled.span`
  font-size: 17px;
  line-height: 1.7;
  color: #555;
  @media (max-width: 768px) { font-size: 16px; }
`;

const TableWrapper = styled.div`
  grid-column: full;
  justify-self: center;
  width: min(100%, 64rem);
  overflow-x: auto;
  margin: 0.75rem 0;
`;

const FindingsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-top: 2px solid #282828;

  th {
    text-align: left;
    font-family: ${MONO};
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #282828;
    padding: 0.9rem 1.25rem 0.9rem 0;
    border-bottom: 1px solid #282828;
  }

  td {
    font-size: 16px;
    line-height: 1.6;
    color: #555;
    padding: 1rem 1.25rem 1rem 0;
    border-bottom: 1px solid #e5e5e5;
    vertical-align: top;
  }

  td:last-child {
    font-family: ${MONO};
    font-weight: 700;
    color: #FF3863;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    th, td { padding: 0.7rem 0.9rem 0.7rem 0; font-size: 14px; }
  }
`;

// ─── End matter ───────────────────────────────────────────────────────────────

const EndMark = styled.div`
  justify-self: center;
  width: 12px;
  height: 12px;
  background: #FF3863;
  transform: rotate(45deg);
  margin: 2rem 0 0.5rem;
`;

const FiledUnder = styled.div`
  border-top: 1px solid #e5e5e5;
  padding-top: 1.25rem;
  margin-top: 0.5rem;
`;

const FiledUnderLabel = styled.span`
  display: block;
  font-family: ${MONO};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #999;
  margin-bottom: 0.75rem;
`;

const FiledUnderPills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
`;

const ArticlePill = styled.span`
  font-size: 13px;
  padding: 4px 12px;
  border-radius: 4px;
  border: 1px solid #333;
  color: #333;
  letter-spacing: 0.03em;
  background: rgba(40, 40, 40, 0.02);
`;
