import gsap from 'gsap';
import { useRef } from 'react';
import styled from 'styled-components';
import { HeroCTA } from '../common/HeroCTA';
import { HeroTitle } from '../common/HeroTitle';

export const PendoHero = ({ heroRef, line1Ref, line2Ref, star1Ref, star2Ref, star3Ref }) => {
  const badgeRef = useRef(null);
  const dotRef = useRef(null);
  const trailRef = useRef(null);
  const animationRef = useRef(null);

  const handleMouseEnter = () => {
    const trail = trailRef.current;
    if (animationRef.current) animationRef.current.kill();
    trail.style.background = 'conic-gradient(from 0deg, transparent 0deg, #282828 0deg, #282828 360deg, transparent 360deg)';
    trail.classList.add('active');
    animationRef.current = gsap.to({}, {
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: function() {
        const startAngle = this.progress() * 360;
        const segmentSize = 50;
        trail.style.background = `conic-gradient(
          from 0deg,
          transparent ${startAngle}deg,
          #282828 ${startAngle}deg,
          #282828 ${startAngle + segmentSize}deg,
          transparent ${startAngle + segmentSize}deg
        )`;
      },
    });
  };

  const handleMouseLeave = () => {
    const trail = trailRef.current;
    trail.classList.remove('active');
    if (animationRef.current) animationRef.current.kill();
    trail.style.background = 'conic-gradient(from 0deg, transparent 0deg, #282828 0deg, #282828 360deg, transparent 360deg)';
  };

  return (
    <PendoHeroSection ref={heroRef}>
      <PendoHeroContainer>
        <a 
          href="https://calendly.com/12vblanco/30min"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <PendoBadge
            ref={badgeRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            role="status"
            aria-label="Availability status"
          >
            <PendoDot ref={dotRef} aria-hidden="true" />
            Available for work
            <PendoBorderTrail ref={trailRef} aria-hidden="true" />
          </PendoBadge>
        </a>

        <HeroTitle
          line1Ref={line1Ref}
          line2Ref={line2Ref}
          star1Ref={star1Ref}
          star2Ref={star2Ref}
          star3Ref={star3Ref}
          line1Text="Content Developer"
          line2Text="& Pendo Consultant"
        />

        <PendoContentWrapper>
          <PendoLeftColumn>
            <PendoSubtitle>
              I'm a <strong>Certified Pendo Developer</strong> based in Edinburgh, UK. 
              I help teams install Pendo, audit setups, and design and implement roadmaps 
              to create analytics that inform product decisions.
            </PendoSubtitle>
          </PendoLeftColumn>

          <PendoRightColumn>
            <HeroCTA 
              primaryButtonText="View Services"
              primaryButtonLink="#pendo"
              secondaryButtonText="Book a Call"
            />
          </PendoRightColumn>
        </PendoContentWrapper>
      </PendoHeroContainer>
    </PendoHeroSection>
  );
};

// ─── Styled Components ────────────────────────────────────────────────────────

const PendoHeroSection = styled.section`
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

const PendoHeroContainer = styled.div`
  max-width: 920px;
    min-height: 426px;;
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

const PendoBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #FFFEFA;
  border-radius: 50px;
  border: 2px solid #282828;
  font-size: 16px;
  color: #282828;
  margin-bottom: 40px;
  font-weight: 600;
  position: relative;
  cursor: pointer;

  @media (max-width: 968px) {
    display: none;
  }
`;

const PendoBorderTrail = styled.div`
  position: absolute;
  inset: -2.5px;
  border-radius: 51.5px;
  padding: 2.5px;
  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    #282828 0deg,
    #282828 360deg,
    transparent 360deg
  );
  mask: 
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask: 
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
  filter: drop-shadow(0 0 3px rgba(40, 40, 40, 0.25));
  
  &.active {
    opacity: 0.9;
  }
`;

const PendoDot = styled.span`
  width: 8px;
  height: 8px;
  background: #FF3863;
  border-radius: 50%;
  animation: breathe 2.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  box-shadow: 0 0 0 0 rgba(255, 56, 99, 0.4);
  position: relative;
  z-index: 1;

  @keyframes breathe {
    0% {
      transform: scale(0.95);
      opacity: 0.8;
      box-shadow: 0 0 0 0 rgba(255, 56, 99, 0.4);
    }
    50% {
      transform: scale(1.2);
      opacity: 1;
      box-shadow: 0 0 0 6px rgba(255, 56, 99, 0);
    }
    100% {
      transform: scale(0.95);
      opacity: 0.8;
      box-shadow: 0 0 0 0 rgba(255, 56, 99, 0);
    }
  }
`;

const PendoContentWrapper = styled.div`
  display: flex;
  gap: 40px;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 1.5rem;

  @media (max-width: 968px) {
    flex-direction: column;
    gap: 32px;
  }
`;

const PendoLeftColumn = styled.div`
  max-width: 420px;
`;

const PendoRightColumn = styled.div`
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

const PendoSubtitle = styled.p`
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