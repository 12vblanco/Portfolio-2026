import { usePendoHeroAnimation } from '../../hooks/usePendoHeroAnimation';
import { AvailabilityBadge } from '../common/AvailabilityBadge';
import { HeroCTA } from '../common/HeroCTA';
import { HeroContainer, HeroContentWrapper, HeroLeftColumn, HeroRightColumn, HeroSection, HeroSubtitle } from '../common/HeroLayout';
import { HeroTitle } from '../common/HeroTitle';

export const PendoHero = () => {
  const { heroRef, line1Ref, line2Ref, star1Ref, star2Ref, star3Ref } =
    usePendoHeroAnimation();

  return (
    <HeroSection id="pendo-home" ref={heroRef}>
      <HeroContainer $maxWidth="986px">
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

        <HeroContentWrapper>
          <HeroLeftColumn>
            <HeroSubtitle>
              I'm a <strong>Certified Pendo Developer</strong> based in Edinburgh, UK.
              I help SaaS teams improve product adoption, install Pendo, audit setups,
              and build analytics that <strong>inform product decisions.</strong>
            </HeroSubtitle>
          </HeroLeftColumn>

          <HeroRightColumn>
            <HeroCTA
              primaryButtonText="View Services"
              primaryButtonLink="#pendo"
              primaryButtonId="services-heroCTA-pendo"
              secondaryButtonText="Book a Call"
              secondaryButtonId="calend-heroCTA-pendo"
            />
          </HeroRightColumn>
        </HeroContentWrapper>
      </HeroContainer>
    </HeroSection>
  );
};
