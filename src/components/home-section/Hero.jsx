import { useHeroAnimation } from "../../hooks/useHeroAnimation";
import { AvailabilityBadge } from "../common/AvailabilityBadge";
import { HeroCTA } from "../common/HeroCTA";
import {
  HeroContainer,
  HeroContentWrapper,
  HeroLeftColumn,
  HeroRightColumn,
  HeroSection,
  HeroSubtitle,
} from "../common/HeroLayout";
import { HeroTitle } from "../common/HeroTitle";

export const Hero = () => {
  const {
    heroRef,
    line1Ref,
    line2Ref,
    line3Ref,
    star1Ref,
    star2Ref,
    star3Ref,
  } = useHeroAnimation();

  return (
    <HeroSection id="home" ref={heroRef}>
      <HeroContainer>
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

        <HeroContentWrapper>
          <HeroLeftColumn>
            <HeroSubtitle ref={line3Ref}>
              Edinburgh-based web developer{" "}
              <strong>designing and building websites</strong> that work for
              you. <strong>Expert Pendo services</strong>, installation, audits,
              and improving product adoption.
            </HeroSubtitle>
          </HeroLeftColumn>

          <HeroRightColumn>
            <HeroCTA
              primaryButtonId="works-heroCTA-home"
              secondaryButtonText="Book a Call"
              secondaryButtonId="calend-heroCTA-home"
            />
          </HeroRightColumn>
        </HeroContentWrapper>
      </HeroContainer>
    </HeroSection>
  );
};
