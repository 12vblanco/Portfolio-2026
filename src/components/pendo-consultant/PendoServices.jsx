import { forwardRef } from 'react';
import styled from 'styled-components';
import { servicesData, servicesHeader } from './pendoData';

export const PendoServices = forwardRef((props, ref) => {
  return (
    <PendoServicesSection ref={ref}>
      <PendoServicesContainer>
        <PendoServicesHeader>
          <PendoServicesHeaderLeft>
            <PendoServicesLabel>{servicesHeader.label}</PendoServicesLabel>
            <PendoServicesTitle>{servicesHeader.title}</PendoServicesTitle>
          </PendoServicesHeaderLeft>
          {servicesHeader.subtitle && (
            <PendoServicesSubtitle>{servicesHeader.subtitle}</PendoServicesSubtitle>
          )}
        </PendoServicesHeader>

        <PendoServiceGrid>
          {servicesData.map((service, i) => (
            <PendoServiceCard key={i} data-service>
              <PendoServiceNumber>{service.number}</PendoServiceNumber>
              <PendoServiceTitle>{service.title}</PendoServiceTitle>
              <PendoServiceText>{service.text}</PendoServiceText>
            </PendoServiceCard>
          ))}
        </PendoServiceGrid>
      </PendoServicesContainer>
    </PendoServicesSection>
  );
});

// ─── Styled Components ────────────────────────────────────────────────────────

const PendoServicesSection = styled.section`
  padding: 5rem 0;
  background: rgba(40, 40, 40, 0.02);
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  @media (max-width: 768px) { padding: 3rem 0; }
`;

const PendoServicesContainer = styled.div`
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

const PendoServicesHeader = styled.div`
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

const PendoServicesHeaderLeft = styled.div``;

const PendoServicesLabel = styled.span`
  display: block;
  font-size: 2rem;
  color: #282828;
  line-height: 1.2;
  font-weight: 800;
`;

const PendoServicesTitle = styled.h2`
  font-weight: 700;
  color: #FF3863;
  margin-bottom: 0;
  line-height: 1.1;
  letter-spacing: 0;
  font-size: clamp(1.8rem, 5vw, 2.5rem);
`;

const PendoServicesSubtitle = styled.p`
  font-size: 20px;
  color: #282828;
  max-width: 460px;

  @media (max-width: 968px) {
    font-size: 18px;
    max-width: 100%;
  }
`;

const PendoServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const PendoServiceCard = styled.div`
  background: #FFFEFA;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 2rem;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  opacity: 0;

  &:hover { 
    box-shadow: 0 8px 24px rgba(40, 40, 40, 0.08);
    transform: translateY(-4px);
  }
`;

const PendoServiceNumber = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: #FF3863;
  letter-spacing: 0.1em;
  display: block;
  margin-bottom: 0.75rem;
`;

const PendoServiceTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #282828;
  margin: 0 0 0.6rem 0;
`;

const PendoServiceText = styled.p`
  font-size: 17px;
  line-height: 1.7;
  color: #555;
  margin: 0;
`;