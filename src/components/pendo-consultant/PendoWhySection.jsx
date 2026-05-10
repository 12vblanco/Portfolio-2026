import styled from 'styled-components';
import { whyData, whyHeader } from './pendoData';

export const PendoWhySection = () => {
  return (
    <PendoWhySectionWrapper>
      <PendoWhyContainer>
        <PendoWhyHeader>
          <PendoWhyHeaderLeft>
            <PendoWhyLabel>{whyHeader.label}</PendoWhyLabel>
            <PendoWhyTitle>{whyHeader.title}</PendoWhyTitle>
          </PendoWhyHeaderLeft>
          {whyHeader.subtitle && (
            <PendoWhySubtitle>{whyHeader.subtitle}</PendoWhySubtitle>
          )}
        </PendoWhyHeader>

        <PendoWhyGrid>
          {whyData.map((item, i) => (
            <PendoWhyCard key={i}>
              <PendoWhyCardTitle>{item.title}</PendoWhyCardTitle>
              <PendoWhyCardText>{item.text}</PendoWhyCardText>
            </PendoWhyCard>
          ))}
        </PendoWhyGrid>
      </PendoWhyContainer>
    </PendoWhySectionWrapper>
  );
};

// ─── Styled Components ────────────────────────────────────────────────────────

const PendoWhySectionWrapper = styled.section`
  padding: 5rem 0;
  @media (max-width: 768px) { padding: 3rem 0; }
`;

const PendoWhyContainer = styled.div`
  max-width: 1805px;
  width: 100%;
  margin: 0 auto;
  padding: 0 136px;

  @media (max-width: 968px) {
    padding: 0 2rem 0 6rem;
  }
  @media (max-width: 426px) {
    padding: 0 2rem;
  }
`;

const PendoWhyHeader = styled.div`
  margin-bottom: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 968px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const PendoWhyHeaderLeft = styled.div``;

const PendoWhyLabel = styled.span`
  display: block;
  font-size: 2rem;
  color: #282828;
  line-height: 1.2;
  font-weight: 800;
`;

const PendoWhyTitle = styled.h2`
  font-weight: 700;
  color: #FF3863;
  margin-bottom: 0;
  line-height: 1.1;
  letter-spacing: 0;
  font-size: clamp(1.8rem, 5vw, 2.5rem);
`;

const PendoWhySubtitle = styled.p`
  font-size: 20px;
  color: #282828;
  max-width: 460px;

  @media (max-width: 968px) {
    font-size: 18px;
    max-width: 100%;
  }
`;

const PendoWhyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 1rem;

  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const PendoWhyCard = styled.div`
  padding: 1.75rem;
  border-left: 3px solid #FF3863;
  background: rgba(255, 56, 99, 0.02);
  border-radius: 0 8px 8px 0;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateX(4px);
  }
`;

const PendoWhyCardTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #282828;
  margin: 0 0 0.5rem 0;
`;

const PendoWhyCardText = styled.p`
  font-size: 17px;
  line-height: 1.7;
  color: #555;
  margin: 0;
`;