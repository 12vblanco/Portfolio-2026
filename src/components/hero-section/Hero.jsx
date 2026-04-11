import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import styled from 'styled-components';
import { useHeroAnimation } from '../../hooks/useHeroAnimation';
import { HeroCTA } from './HeroCTA';
import { HeroStamp } from './HeroStamp';
import { HeroTitle } from './HeroTitle';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const { heroRef, line1Ref, line2Ref, line3Ref, star1Ref, star2Ref, star3Ref } =
    useHeroAnimation();
  
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
    <HeroSection id="home" ref={heroRef}>
      <Container>
        <HeroStamp />
          <a 
           href="https://calendly.com/12vblanco/30min"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          
          <Badge
          ref={badgeRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          role="status"
          aria-label="Availability status"
        >
          <Dot ref={dotRef} aria-hidden="true" />
          Available for work
          <BorderTrail ref={trailRef} aria-hidden="true" />
        </Badge></a>

        <HeroTitle
          line1Ref={line1Ref}
          line2Ref={line2Ref}
          star1Ref={star1Ref}
          star2Ref={star2Ref}
          star3Ref={star3Ref}
        />

        <ContentWrapper>
          <LeftColumn>
            <Subtitle ref={line3Ref}>
              I specialize in <strong>designing and building websites</strong> using modern technologies.
              I provide <strong>expert Pendo services</strong>, from audit and setup to expert custom guides, analytics & reporting.
            </Subtitle>
          </LeftColumn>

          <RightColumn>
            <HeroCTA />
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

const Badge = styled.div.attrs({ className: 'hero-Badge' })`
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

@media (max-width: 968px) {    display: none;
  }
`;

const BorderTrail = styled.div.attrs({ className: 'hero-BorderTrail' })`
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

const Dot = styled.span.attrs({ className: 'hero-Dot' })`
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

@media (max-width: 968px) {    font-size: 18px;
  }
`;
