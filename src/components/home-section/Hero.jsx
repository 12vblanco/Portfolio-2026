import styled from 'styled-components';
import { useHeroAnimation } from '../../hooks/useHeroAnimation';
import { AvailabilityBadge } from '../common/AvailabilityBadge';
import { HeroCTA } from '../common/HeroCTA';
import { HeroTitle } from '../common/HeroTitle';


export const Hero = ({ star1Ref, star2Ref, star3Ref }) => {
  const { heroRef, line1Ref, line2Ref, line3Ref } =
    useHeroAnimation({ star1Ref, star2Ref, star3Ref });

  return (
    <HeroSection id="home" ref={heroRef}>
      <Container>
        <AvailabilityBadge id="calend-hero-available" />

        <HeroTitle
          line1Ref={line1Ref}
          line2Ref={line2Ref}
          star1Ref={star1Ref}
          star2Ref={star2Ref}
          star3Ref={star3Ref}
          line1Text="Web Developer &"
          line2Text="Pendo Consultant"
          stampId="calend-stamp-home"
        />

        <ContentWrapper>
          <LeftColumn>
            <Subtitle ref={line3Ref}>
              Edinburgh-based web developer <strong>designing and building websites</strong> that work for your business.
              I provide <strong>expert Pendo services</strong> — installation, audits, and improving SaaS product adoption. 
            </Subtitle>
          </LeftColumn>

          <RightColumn>
            <HeroCTA
              primaryButtonId="works-heroCTA-home"
              secondaryButtonText="Book a Call"
              secondaryButtonId="calend-heroCTA-home"
            />
          </RightColumn>
        </ContentWrapper>
      </Container>
    </HeroSection>
  );
};

// ─── Styled Components ────────────────────────────────────────────────────────

const HeroSection = styled.section.attrs({ className: 'hero-HeroSection' })`
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

const Container = styled.div.attrs({ className: 'hero-Container' })`
  max-width: 920px;
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

const ContentWrapper = styled.div.attrs({ className: 'hero-ContentWrapper' })`
  display: flex;
  gap: 40px;
  align-items: flex-start;
  justify-content: flex-start;

  @media (max-width: 968px) {
    flex-direction: column;
    gap: 32px;
  }
`;

const LeftColumn = styled.div.attrs({ className: 'hero-LeftColumn' })`
  max-width: 420px;
`;

const RightColumn = styled.div.attrs({ className: 'hero-RightColumn' })`
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

const Subtitle = styled.p.attrs({ className: 'hero-Subtitle' })`
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
