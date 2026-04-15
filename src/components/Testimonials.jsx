import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ReviewCard from './ReviewCard';
import { reviewsData } from './reviewsData';

gsap.registerPlugin(ScrollTrigger);

const slotTransform = (slot, isMobile) => {
  if (isMobile) {
    // Same drag feel as desktop but compressed for narrow screens.
    // slot 0  = centre stage
    // slot ±1 = peeking in from the sides (mostly off-screen)
    // slot ±2+ = fully hidden off-screen
    if (slot === 0)  return 'translateX(0%)   scale(1)';
    if (slot === 1)  return 'translateX(105%) scale(0.9)';
    if (slot === -1) return 'translateX(-105%) scale(0.9)';
    if (slot > 1)    return 'translateX(210%) scale(0.8)';
    return                  'translateX(-210%) scale(0.8)';
  }
  if (slot === 0)  return 'translateX(0%)    translateY(-12px) scale(1.08)';
  if (slot === 1)  return 'translateX(108%)  translateY(0px)   scale(0.92)';
  if (slot === -1) return 'translateX(-108%) translateY(0px)   scale(0.92)';
  if (slot > 0)    return 'translateX(220%)  scale(0.8)';
  return                  'translateX(-220%) scale(0.8)';
};

const slotOpacity = (slot, isMobile) => {
  if (isMobile) {
    if (slot === 0)                return 1;
    if (slot === 1 || slot === -1) return 0;   // hidden but still animates through
    return 0;
  }
  if (slot === 0)                return 1;
  if (slot === 1 || slot === -1) return 0.4;
  return 0;
};

const Testimonials = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % reviewsData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(headerRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const getSlot = (cardIndex) => {
    const total = reviewsData.length;
    let slot = cardIndex - currentIndex;
    if (slot > Math.floor(total / 2))  slot -= total;
    if (slot < -Math.floor(total / 2)) slot += total;
    return slot;
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <Section ref={sectionRef}>
      <Container>
        <Header ref={headerRef}>
          <Eyebrow>Don't take my <br />word for it</Eyebrow>
        </Header>

        <DotsRow>
          {reviewsData.map((_, i) => (
            <Dot
              key={i}
              $active={i === currentIndex}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => setCurrentIndex(i)}
            />
          ))}
        </DotsRow>

        <Scene $isMobile={isMobile}>
          <CardsContainer $isMobile={isMobile}>
            {reviewsData.map((review, i) => {
              const slot = getSlot(i);
              return (
                <CardWrapper
                  key={review.id}
                  $slot={slot}
                  $isMobile={isMobile}
                  onClick={() => slot !== 0 && setCurrentIndex(i)}
                >
                  <ReviewCard review={review} isCenter={slot === 0} />
                </CardWrapper>
              );
            })}
          </CardsContainer>
        </Scene>
      </Container>
    </Section>
  );
};

export default Testimonials;

// ─── Styled Components ────────────────────────────────────────────────────────

const Section = styled.section.attrs({ className: 'testimonials-Section' })`
  width: 100%;
  background: #282828;
  padding: 3rem 0 5rem 0;
  min-height: 70vh;
  height: auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 638px;

  @media (max-width: 768px) {
    min-height: auto;
    padding: 3rem 0 4rem;
    overflow: hidden;
  }
`;

const Container = styled.div.attrs({ className: 'testimonials-Container' })`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  flex: 1;
  min-height: 0;
`;

const Header = styled.div.attrs({ className: 'testimonials-Header' })`
  text-align: center;
  margin-bottom: 1.5rem;
  opacity: 0;
  transform: translateY(30px);
  width: 100%;
  flex-shrink: 0;
`;

const Eyebrow = styled.h2.attrs({ className: 'testimonials-Eyebrow' })`
  color: #FFFEFA;
  font-weight: 700;
  letter-spacing: 0.3px;
  margin: 0 auto;
  text-align: center;
  display: block;
  line-height: 1.2;
`;

const DotsRow = styled.div.attrs({ className: 'testimonials-DotsRow' })`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 2.5rem;
  flex-shrink: 0;
`;

const Dot = styled.button.attrs({ className: 'testimonials-Dot' })`
  width: ${p => p.$active ? '24px' : '8px'};
  height: 8px;
  border-radius: 4px;
  background: ${p => p.$active ? '#FF3863' : 'rgba(255,255,255,0.25)'};
  border: none;
  padding: 0;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${p => p.$active ? '#FF3863' : 'rgba(255,255,255,0.5)'};
  }
`;

const Scene = styled.div.attrs({ className: 'testimonials-Scene' })`
  perspective: 1200px;
  perspective-origin: 50% 50%;
  flex: 1;
  min-height: 0;

  @media (max-width: 768px) {
    /* Fixed height so the absolutely-positioned cards have something to fill */
    height: 360px;
    flex: none;
  }
`;

const CardsContainer = styled.div.attrs({ className: 'testimonials-CardsContainer' })`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  height: 100%;
  padding-bottom: 20px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    height: 100%;
    padding: 0;
  }
`;

const CardWrapper = styled.div.attrs({ className: 'testimonials-CardWrapper' })`
  position: absolute;
  width: 480px;
  height: 100%;
  max-height: 450px;
  transform-style: preserve-3d;
  transition: transform 0.9s cubic-bezier(0.4, 0, 0.2, 1),
              opacity   0.9s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${p => slotTransform(p.$slot, p.$isMobile)};
  opacity:   ${p => slotOpacity(p.$slot, p.$isMobile)};
  z-index:   ${p => p.$slot === 0 ? 10 : (p.$slot === 1 || p.$slot === -1) ? 5 : 0};
  pointer-events: ${p => p.$slot === 0 ? 'auto' : 'none'};
  cursor: ${p => p.$slot === 0 ? 'default' : 'pointer'};

  & > div {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 768px) {
    width: calc(100vw - 48px);
    max-width: 420px;
    height: 320px;
    max-height: none;
  }
`;