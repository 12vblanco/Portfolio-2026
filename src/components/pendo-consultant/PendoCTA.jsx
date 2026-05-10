import { forwardRef } from 'react';
import styled from 'styled-components';
import { ctaData } from './pendoData';

export const PendoCTA = forwardRef((props, ref) => {
  return (
    <PendoCTASection ref={ref}>
      <PendoCTAContainer>
        <PendoCTABox>
          <PendoCTATitle>{ctaData.title}</PendoCTATitle>
          <PendoCTASubtitle>{ctaData.subtitle}</PendoCTASubtitle>
          <PendoCTAButtonRow>
            <PendoCTAPrimary
              href={ctaData.primaryButtonLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {ctaData.primaryButtonText}
            </PendoCTAPrimary>
            <PendoCTASecondary href={ctaData.secondaryButtonLink}>
              {ctaData.secondaryButtonText}
            </PendoCTASecondary>
          </PendoCTAButtonRow>
        </PendoCTABox>
      </PendoCTAContainer>
    </PendoCTASection>
  );
});

// ─── Styled Components ────────────────────────────────────────────────────────

const PendoCTASection = styled.section`
  padding: 5rem 0;
  @media (max-width: 768px) { padding: 3rem 0; }
`;

const PendoCTAContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  /* padding: 0 136px; */

  @media (max-width: 968px) {
    padding: 0 2rem;
  }
`;

const PendoCTABox = styled.div`
  background: #282828;
  border-radius: 6px;
  padding: 5cap 3rem;
  text-align: center;

  @media (max-width: 768px) { padding: 2.5rem 1.5rem; }
`;

const PendoCTATitle = styled.h2`
  font-family: 'Switzer', sans-serif;
  font-weight: 700;
  letter-spacing: -1px;
  color: #FFFEFA;
  margin: 0 0 1rem 0;
  font-size: clamp(1.5rem, 4vw, 2rem);
`;

const PendoCTASubtitle = styled.p`
  font-size: 18px;
  color: #FFFEFA;
  max-width: 520px;
  margin: 0 auto 2rem;
  line-height: 1.7;
`;

const PendoCTAButtonRow = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const PendoCTAPrimary = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 20px 12px;
  background: #FF3863;
  color: #FFFEFA;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  border: 2px solid #FF3863;

  &:hover {
    background: #e02d56;
    border-color: #e02d56;
    transform: translateY(-2px);
  }
`;

const PendoCTASecondary = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0.85rem 1.75rem;
  background: transparent;
  color: #FFFEFA;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  border: 2px solid #FFFEFA;

  &:hover {
    background: #FFFEFA;
    color: #282828;
    transform: translateY(-2px);
  }
`;