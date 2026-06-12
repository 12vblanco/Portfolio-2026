import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { SEO } from '../common/SEO.jsx';

export const NotFoundPage = () => (
  <>
    <SEO
      title="Page Not Found | Victor Blanco"
      description="This page doesn't exist. Find web development case studies and Pendo consulting services on the main site."
      noindex
    />

    <NotFoundSection>
      <NotFoundCard>
        <NotFoundCode>404</NotFoundCode>
        <NotFoundTitle>Page not found</NotFoundTitle>
        <NotFoundText>
          The page you're looking for doesn't exist or has moved.
        </NotFoundText>
        <NotFoundLinks>
          <NotFoundLink to="/">Go to the homepage</NotFoundLink>
          <NotFoundLink to="/pendo-consultant">Pendo consulting services</NotFoundLink>
        </NotFoundLinks>
      </NotFoundCard>
    </NotFoundSection>
  </>
);

const NotFoundSection = styled.section`
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
`;

const NotFoundCard = styled.div`
  background: #FFFEFA;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 3.5rem 4rem;
  box-shadow: 0 2px 8px rgba(40, 40, 40, 0.05);
  text-align: center;
  max-width: 520px;
  @media (max-width: 768px) { padding: 2.5rem 1.5rem; }
`;

const NotFoundCode = styled.span`
  display: block;
  font-size: 16px;
  font-weight: 700;
  color: #FF3863;
  letter-spacing: 0.08em;
  margin-bottom: 0.5rem;
`;

const NotFoundTitle = styled.h1`
  font-size: clamp(1.9rem, 4.5vw, 2.6rem);
  font-weight: 700;
  letter-spacing: -1px;
  margin-bottom: 1rem;
`;

const NotFoundText = styled.p`
  font-size: 18px;
  color: #555;
  margin-bottom: 2rem;
`;

const NotFoundLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const NotFoundLink = styled(Link)`
  font-size: 16px;
  font-weight: 600;
  color: #282828;
  border-bottom: 2px solid #FF3863;
  padding-bottom: 2px;
  transition: color 0.2s ease;
  &:hover { color: #FF3863; }
`;
