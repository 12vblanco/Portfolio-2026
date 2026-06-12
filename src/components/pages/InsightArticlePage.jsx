import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { LINKS } from '../../data/siteConfig';
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

export const InsightArticlePage = ({ onOpenTerms }) => {
  const { slug } = useParams();
  const article = getInsightBySlug(slug);

  const cardRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

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

  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.meta.description,
    "url": canonical,
    "mainEntityOfPage": { "@type": "WebPage", "@id": canonical },
    "image": "https://victorblancoweb.com/og-image-pendo.png",
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

  return (
    <>
      <SEO
        title={article.meta.title}
        description={article.meta.description}
        canonical={canonical}
        ogType="article"
        ogTitle={article.title}
        ogImage="https://victorblancoweb.com/og-image-pendo.png"
        structuredData={[articleStructuredData, breadcrumbStructuredData]}
      />

      <ArticleSection>
        <ArticleContainer>
          <BackLink to="/pendo-consultant#insights">← All Pendo insights</BackLink>

          <ArticleCard ref={cardRef} as="article">
            <ArticleHeader>
              <ArticleTag>{article.tag}</ArticleTag>
              <ArticleTitle>{article.title}</ArticleTitle>
              <ArticleMetaRow>
                <ArticleAuthor>{article.name}</ArticleAuthor>
                <ArticleMetaDivider>·</ArticleMetaDivider>
                <ArticleMetaItem>{article.date}</ArticleMetaItem>
                <ArticleMetaDivider>·</ArticleMetaDivider>
                <ArticleMetaItem>{article.read}</ArticleMetaItem>
              </ArticleMetaRow>
              <ArticleIntro>{article.subtitle}</ArticleIntro>
            </ArticleHeader>

            <ArticleBody>
              {article.sections.map((section, i) => {
                const Figure = section.figure ? ARTICLE_FIGURES[section.figure] : null;
                return (
                  <ArticleSectionBlock key={i}>
                    {section.heading && <ArticleHeading>{section.heading}</ArticleHeading>}
                    {section.paragraphs.map((para, j) => (
                      <ArticleParagraph key={j}>{para}</ArticleParagraph>
                    ))}

                    {Figure && <Figure />}

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
                  </ArticleSectionBlock>
                );
              })}

              {article.quote && (
                <ArticleQuote>
                  <ArticleQuoteText>{article.quote}</ArticleQuoteText>
                </ArticleQuote>
              )}

              {article.dashboard && <PendoAnalyticsDashboard />}

              {article.pills?.length > 0 && (
                <ArticlePills>
                  {article.pills.map((pill, i) => (
                    <ArticlePill key={i}>{pill}</ArticlePill>
                  ))}
                </ArticlePills>
              )}
            </ArticleBody>
          </ArticleCard>
        </ArticleContainer>
      </ArticleSection>

      <PendoCTA />
      <ConsentBanner onOpenTerms={onOpenTerms} />
      <Contact onOpenTerms={onOpenTerms} />
    </>
  );
};

// ─── Styled Components ────────────────────────────────────────────────────────

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

const BackLink = styled(Link)`
  display: inline-block;
  font-size: 16px;
  font-weight: 600;
  color: #282828;
  margin-bottom: 1.5rem;
  transition: color 0.2s ease;
  &:hover { color: #FF3863; }
  &:focus-visible {
    outline: 2px solid #FF3863;
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

const ArticleCard = styled.div`
  background: #FFFEFA;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 3.5rem 5rem;
  box-shadow: 0 2px 8px rgba(40, 40, 40, 0.05);
  @media (max-width: 968px) { padding: 2.5rem 2rem; }
  @media (max-width: 768px) { padding: 2rem 1.25rem; }
`;

const ArticleHeader = styled.header`
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 1.75rem;
  margin-bottom: 1.75rem;
`;

const ArticleTag = styled.span`
  display: block;
  font-size: 16px;
  font-weight: 700;
  color: #FF3863;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
`;

const ArticleTitle = styled.h1`
  font-size: clamp(1.9rem, 4.5vw, 3rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -1px;
  color: #282828;
  margin: 0 0 1rem;
`;

const ArticleMetaRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 1.25rem;
`;

const ArticleAuthor = styled.span` font-size: 15px; font-weight: 600; color: #282828; `;
const ArticleMetaDivider = styled.span` font-size: 15px; color: #999; `;
const ArticleMetaItem = styled.span` font-size: 15px; color: #999; `;

const ArticleIntro = styled.p`
  font-size: 20px;
  line-height: 1.7;
  color: #555;
  margin: 0;
  max-width: 62rem;
  @media (max-width: 768px) { font-size: 17px; }
`;

const ArticleBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
`;

const ArticleSectionBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
`;

const ArticleHeading = styled.h2`
  font-size: clamp(1.4rem, 3vw, 1.8rem);
  font-weight: 700;
  letter-spacing: -0.5px;
  line-height: 1.25;
  color: #282828;
  margin: 1.25rem 0 0;
`;

const ArticleParagraph = styled.p`
  font-size: 18px;
  line-height: 1.85;
  color: #555;
  margin: 0;
  max-width: 62rem;
  @media (max-width: 768px) { font-size: 16px; }
`;

const CodeBlock = styled.div`
  max-width: 62rem;
  margin: 0.5rem 0;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #282828;
`;

const CodeTitle = styled.div`
  background: #282828;
  color: rgba(255, 254, 250, 0.7);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.03em;
  padding: 0.7rem 1.25rem;
  border-bottom: 1px solid rgba(255, 254, 250, 0.12);
`;

const CodePre = styled.pre`
  background: #282828;
  margin: 0;
  padding: 1.25rem;
  overflow-x: auto;

  code {
    font-family: 'SF Mono', 'Fira Code', Menlo, Consolas, monospace;
    font-size: 14px;
    line-height: 1.65;
    color: #FFFEFA;
    white-space: pre;
  }
`;

const DefinitionList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 62rem;
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
    top: 0.65em;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #FF3863;
  }

  @media (max-width: 768px) { font-size: 16px; }
`;

const DefinitionTerm = styled.strong`
  font-weight: 700;
  color: #282828;
`;

const StepsList = styled.ol`
  list-style: none;
  margin: 0.25rem 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  max-width: 62rem;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  overflow: hidden;
`;

const StepRow = styled.li`
  display: flex;
  gap: 1.25rem;
  padding: 1.1rem 1.5rem;
  background: rgba(40, 40, 40, 0.02);
  &:not(:last-child) { border-bottom: 1px solid #e5e5e5; }
  @media (max-width: 600px) { flex-direction: column; gap: 0.25rem; }
`;

const StepLabel = styled.span`
  flex: 0 0 92px;
  font-size: 16px;
  font-weight: 700;
  color: #FF3863;
`;

const StepText = styled.span`
  font-size: 17px;
  line-height: 1.7;
  color: #555;
  @media (max-width: 768px) { font-size: 16px; }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  margin: 0.5rem 0;
`;

const FindingsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  overflow: hidden;

  th {
    text-align: left;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #282828;
    background: rgba(40, 40, 40, 0.04);
    padding: 0.9rem 1.25rem;
    border-bottom: 1px solid #e5e5e5;
  }

  td {
    font-size: 16px;
    line-height: 1.6;
    color: #555;
    padding: 0.9rem 1.25rem;
    border-bottom: 1px solid #f0f0f0;
    vertical-align: top;
  }

  tr:last-child td { border-bottom: none; }

  td:last-child {
    font-weight: 700;
    color: #FF3863;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    th, td { padding: 0.7rem 0.9rem; font-size: 14px; }
  }
`;

const ArticleQuote = styled.blockquote`
  margin: 1rem 0;
  padding: 1rem 1.25rem;
  border-left: 3px solid #FF3863;
  background: rgba(255, 56, 99, 0.03);
  border-radius: 0 8px 8px 0;
`;

const ArticleQuoteText = styled.p`
  font-size: 17px;
  font-style: italic;
  line-height: 1.75;
  color: #555;
  margin: 0;
  @media (max-width: 768px) { font-size: 15px; }
`;

const ArticlePills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 1rem;
`;

const ArticlePill = styled.span`
  font-size: 14px;
  padding: 3px 11px;
  border-radius: 20px;
  border: 1px solid #333;
  color: #333;
  letter-spacing: 0.03em;
  background: rgba(40, 40, 40, 0.02);
`;
