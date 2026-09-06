import { Link } from "react-router-dom";
import styled from "styled-components";
import { LINKS } from "../../data/siteConfig";
import { ConsentBanner } from "../common/ConsentBanner.jsx";
import { Contact } from "../common/Contact.jsx";
import { SEO } from "../common/SEO.jsx";
import { PendoCTA } from "../pendo-consultant/PendoCTA.jsx";
import { publishedInsights } from "../pendo-consultant/pendoInsightsData";

const MONO = "'SF Mono', 'Fira Code', Menlo, Consolas, monospace";
const CANONICAL = `${LINKS.site}/insights`;

// Real, indexable hub for every published article. Gives the insights cluster
// a single crawlable home (was a 301 to /pendo-consultant#insights) so older
// articles keep an internal link even after they drop off the homepage strip.
export const InsightsIndexPage = ({ onOpenTerms }) => {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Pendo Insights",
      description:
        "Practical Pendo articles from a certified consultant: installation audits, click-data analytics and the Aggregation API.",
      url: CANONICAL,
      inLanguage: "en-GB",
      hasPart: publishedInsights.map((item) => ({
        "@type": "BlogPosting",
        headline: item.title,
        url: `${LINKS.site}/insights/${item.slug}`,
        datePublished: item.datePublished,
        dateModified: item.dateModified,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: LINKS.site },
        { "@type": "ListItem", position: 2, name: "Insights", item: CANONICAL },
      ],
    },
  ];

  return (
    <>
      <SEO
        title="Pendo Insights & Guides | Victor Blanco"
        description="Practical Pendo insights from a certified consultant: installation audits, click-data analytics, the Aggregation API, guide throttling and more."
        canonical={CANONICAL}
        ogImage={`${LINKS.site}/og/insights.png`}
        structuredData={structuredData}
      />

      <IndexSection>
        <IndexContainer>
          <Crumbs aria-label="Breadcrumb">
            <CrumbLink to="/">Home</CrumbLink>
            <CrumbDivider aria-hidden="true">/</CrumbDivider>
            <CrumbCurrent aria-current="page">Insights</CrumbCurrent>
          </Crumbs>

          <Header>
            <Label>Pendo Insights</Label>
            <Title>
              From the field<TitleDot>.</TitleDot>
            </Title>
            <Subtitle>
              Real-world notes on Pendo installation, auditing, and getting the
              most out of product analytics, written while doing the work for{" "}
              <CopyLink to="/pendo-consultant">SaaS teams</CopyLink>.
            </Subtitle>
          </Header>

          <Grid>
            {publishedInsights.map((item) => (
              <Card key={item.slug} to={`/insights/${item.slug}`}>
                <CardTag>{item.tag}</CardTag>
                <CardTitle>{item.title}</CardTitle>
                <CardMeta>
                  {item.date} · {item.read}
                </CardMeta>
                <CardIntro>{item.subtitle}</CardIntro>
                <CardReadMore aria-hidden="true">
                  Read the full article →
                </CardReadMore>
              </Card>
            ))}
          </Grid>
        </IndexContainer>
      </IndexSection>

      <PendoCTA />
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
  margin-bottom: 1.5rem;
`;

const CrumbLink = styled(Link)`
  color: #282828;
  transition: color 0.2s ease;
  &:hover {
    color: #ff3863;
  }
  &:focus-visible {
    outline: 2px solid #ff3863;
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

const CrumbDivider = styled.span`
  color: #ccc;
`;

const CrumbCurrent = styled.span`
  color: #ff3863;
`;

const Header = styled.header`
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 2.25rem;
  margin-bottom: 2.5rem;
`;

const Label = styled.span`
  display: block;
  font-family: ${MONO};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #ff3863;
  margin-bottom: 0.75rem;
`;

const Title = styled.h1`
  font-size: clamp(2.4rem, 5.5vw, 4rem);
  font-weight: 900;
  line-height: 1.02;
  letter-spacing: -0.025em;
  color: #282828;
  margin: 0 0 1.5rem;
`;

const TitleDot = styled.span`
  color: #ff3863;
`;

const Subtitle = styled.p`
  font-size: clamp(1.1rem, 1.8vw, 1.35rem);
  line-height: 1.55;
  color: #555;
  margin: 0;
  max-width: 60ch;
`;

const CopyLink = styled(Link)`
  color: #282828;
  border-bottom: 2px solid #ff3863;
  padding-bottom: 1px;
  transition: color 0.2s ease;
  &:hover {
    color: #ff3863;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.25rem;
`;

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  background: #fffefa;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 2rem 2.25rem;
  box-shadow: 0 2px 8px rgba(40, 40, 40, 0.05);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 6px 24px rgba(40, 40, 40, 0.09);
  }
  &:focus-visible {
    outline: 2px solid #ff3863;
    outline-offset: 2px;
  }
`;

const CardTag = styled.span`
  display: block;
  font-family: ${MONO};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #ff3863;
  margin-bottom: 0.7rem;
`;

const CardTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.3px;
  line-height: 1.25;
  color: #282828;
  margin: 0 0 0.6rem;
  transition: color 0.2s ease;

  ${Card}:hover & {
    color: #ff3863;
  }
`;

const CardMeta = styled.span`
  font-size: 14px;
  color: #999;
  margin-bottom: 1rem;
`;

const CardIntro = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: #555;
  margin: 0 0 1.25rem;
`;

const CardReadMore = styled.span`
  margin-top: auto;
  font-size: 15px;
  font-weight: 600;
  color: #282828;
  ${Card}:hover & {
    color: #ff3863;
  }
`;
