import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { insightsHeader, publishedInsights } from '../pendo-consultant/pendoInsightsData';

const MONO = "'SF Mono', 'Fira Code', Menlo, Consolas, monospace";

// Compact editorial strip on the homepage linking to the latest published
// insights — internal links from the strongest page on the site.
export const InsightsStrip = () => {
  const latest = publishedInsights.slice(0, 3);
  if (latest.length === 0) return null;

  return (
    <StripSection aria-label="Latest Pendo insights">
      <StripContainer>
        <StripHeader>
          <StripHeading>
            <StripLabel>{insightsHeader.label}</StripLabel>
            <StripTitle>Latest from the field</StripTitle>
          </StripHeading>
          <StripAllLink to="/insights">All insights →</StripAllLink>
        </StripHeader>

        <StripGrid>
          {latest.map((item) => (
            <StripCard key={item.slug} to={`/insights/${item.slug}`}>
              <StripCardTag>{item.tag}</StripCardTag>
              <StripCardTitle>{item.title}</StripCardTitle>
              <StripCardMeta>{item.date} · {item.read}</StripCardMeta>
            </StripCard>
          ))}
        </StripGrid>
      </StripContainer>
    </StripSection>
  );
};

const StripSection = styled.section`
  padding: 4rem 0;
  border-top: 1px solid #e5e5e5;
  background: rgba(40, 40, 40, 0.02);
  @media (max-width: 768px) { padding: 2.5rem 0; }
`;

const StripContainer = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 0 2rem;
`;

const StripHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.75rem;
`;

const StripHeading = styled.div``;

const StripLabel = styled.span`
  display: block;
  font-family: ${MONO};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #FF3863;
  margin-bottom: 0.4rem;
`;

const StripTitle = styled.h2`
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 800;
  letter-spacing: -0.5px;
  color: #282828;
  margin: 0;
`;

const StripAllLink = styled(Link)`
  font-size: 16px;
  font-weight: 600;
  color: #282828;
  border-bottom: 2px solid #FF3863;
  padding-bottom: 2px;
  transition: color 0.2s ease;
  &:hover { color: #FF3863; }
`;

const StripGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
`;

const StripCard = styled(Link)`
  display: block;
  background: #FFFEFA;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 1.75rem 2rem;
  box-shadow: 0 2px 8px rgba(40, 40, 40, 0.05);
  transition: box-shadow 0.3s ease;

  &:hover { box-shadow: 0 6px 24px rgba(40, 40, 40, 0.09); }
  &:focus-visible {
    outline: 2px solid #FF3863;
    outline-offset: 2px;
  }
`;

const StripCardTag = styled.span`
  display: block;
  font-family: ${MONO};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #FF3863;
  margin-bottom: 0.6rem;
`;

const StripCardTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.3px;
  line-height: 1.3;
  color: #282828;
  margin: 0 0 0.75rem;
  transition: color 0.2s ease;

  ${StripCard}:hover & { color: #FF3863; }
`;

const StripCardMeta = styled.span`
  font-size: 14px;
  color: #999;
`;
