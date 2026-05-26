import styled from 'styled-components';
import { usePendoHeroAnimation } from '../../hooks/usePendoHeroAnimation';
import { AvailabilityBadge } from '../common/AvailabilityBadge';
import { HeroCTA } from '../common/HeroCTA';
import { HeroTitle } from '../common/HeroTitle';

export const PendoHero = ({ star1Ref, star2Ref, star3Ref }) => {
  const { heroRef, line1Ref, line2Ref } =
    usePendoHeroAnimation({ star1Ref, star2Ref, star3Ref });

  return (
    <PendoHeroSection id="pendo-home" ref={heroRef}>
      <Container>
        <AvailabilityBadge id="calend-pendo-hero" />

        <HeroTitle
          id="hero-title-pendo"
          line1Ref={line1Ref}
          line2Ref={line2Ref}
          star1Ref={star1Ref}
          star2Ref={star2Ref}
          star3Ref={star3Ref}
          line1Text="Certified Pendo"
          line2Text="Consultant"
          stampId="calend-stamp-pendo"
        />

        <ContentWrapper>
          <LeftColumn>
            <Subtitle>
             I'm a <strong>Certified Pendo Developer</strong> based in Edinburgh, UK. 
            I help SaaS teams improve product adoption, install Pendo, audit setups, 
            and build analytics that <strong>inform product decisions.</strong>
            </Subtitle>
          </LeftColumn>

          <RightColumn>
            <HeroCTA
              primaryButtonText="View Services"
              primaryButtonLink="#pendo"
              primaryButtonId="services-heroCTA-pendo"
              secondaryButtonText="Book a Call"
              secondaryButtonId="calend-heroCTA-pendo"
            />
          </RightColumn>
        </ContentWrapper>
      </Container>
    </PendoHeroSection>
  );
};

// ─── Styled Components ────────────────────────────────────────────────────────

const PendoHeroSection = styled.section.attrs({ className: 'pendoHero-PendoHeroSection' })`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 80px 32px;
  margin-top: -4rem;

  @media (max-width: 968px) {
    margin-top: -2rem;
    min-height: 84vh !important;
    padding: 1rem;
  }
`;

const Container = styled.div.attrs({ className: 'pendoHero-Container' })`
  max-width: 986px;
  min-height: 426px;
  margin: 0 auto;
  padding: 0 32px;
  width: 100%;

  @media (max-width: 968px) {
    padding: 4rem 1rem 0 1rem;
    width: fit-content;
  }
  @media (max-width: 426px) {
    width: 100%;
  }
`;

const ContentWrapper = styled.div.attrs({ className: 'pendoHero-ContentWrapper' })`
  display: flex;
  gap: 40px;
  align-items: flex-start;
  justify-content: flex-start;

  @media (max-width: 968px) {
    flex-direction: column;
    gap: 32px;
  }
`;

const LeftColumn = styled.div.attrs({ className: 'pendoHero-LeftColumn' })`
  max-width: 420px;
`;

const RightColumn = styled.div.attrs({ className: 'pendoHero-RightColumn' })`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
  width: 480px;

  @media (max-width: 968px) {
    align-items: flex-start;
    width: 100%;
  }
  @media (max-width: 432px) {
    align-items: flex-start;
    width: 100%;
  }
`;

const Subtitle = styled.p.attrs({ className: 'pendoHero-Subtitle' })`
  font-size: 20px;
  line-height: 1.6;
  color: #282828;
  max-width: 540px;
  margin-bottom: 0;

  strong {
    font-weight: 700;
    color: #282828;
  }

  @media (max-width: 968px) {
    font-size: 18px;
  }
`;
