import { forwardRef } from 'react';
import styled from 'styled-components';
import { CTAButton } from '../common/CTAButton';
import { ctaData } from './pendoData';

export const PendoCTA = forwardRef((props, ref) => {
  return (
    <PendoCTASection ref={ref}>
      <PendoCTAContainer>
        <PendoCTABox>
          <PendoCTATitle>{ctaData.title}</PendoCTATitle>
          <PendoCTASubtitle>{ctaData.subtitle}</PendoCTASubtitle>
          <PendoCTAButtonRow>
            <CTAButton
              href={ctaData.primaryButtonLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {ctaData.primaryButtonText}
            </CTAButton>
            <CTAButton
              variant="secondary"
              href={ctaData.secondaryButtonLink}
            >
              {ctaData.secondaryButtonText}
            </CTAButton>
          </PendoCTAButtonRow>
        </PendoCTABox>
      </PendoCTAContainer>
    </PendoCTASection>
  );
});

const PendoCTASection = styled.section`
  padding: 5rem 0;
  @media (max-width: 768px) { padding: 3rem 0; }
`;

const PendoCTAContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  @media (max-width: 968px) { padding: 0 2rem; }
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
  color: #fffefa;
  margin: 0 0 1rem 0;
  font-size: clamp(1.5rem, 4vw, 2rem);
`;

const PendoCTASubtitle = styled.p`
  font-size: 18px;
  color: #fffefa;
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