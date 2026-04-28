import gsap from 'gsap';
import { useEffect } from 'react';
import styled from 'styled-components';
import { HeroStamp } from './HeroStamp';
import { Star4Svg } from './StarIcons';

const STAR_HOVER = [
  { enter: 135, leave: -12 },
  { enter: -45, leave: 8 },
  { enter: 72, leave: -20 },
];

const useHoverRotation = (refs) => {
  useEffect(() => {
    const cleanups = refs.map((ref, i) => {
      const el = ref.current;
      if (!el) return () => {};
      const { enter, leave } = STAR_HOVER[i];

      const onEnter = () => gsap.to(el, { rotation: enter, scale: 1.25, duration: 0.35, ease: 'back.out(2)' });
      const onLeave = () => gsap.to(el, { rotation: leave, scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' });

      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
      return () => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      };
    });

    return () => cleanups.forEach((fn) => fn());
  }, [refs]);
};

export const HeroTitle = ({ 
  line1Ref, 
  line2Ref, 
  star1Ref, 
  star2Ref, 
  star3Ref, 
  line1Text = "Web Developer &",
  line2Text = "Pendo Consultant",
  line2Color = "#FF3863"
}) => {
  useHoverRotation([star1Ref, star2Ref, star3Ref]);

  // Animate stars on mount with floating effect
  useEffect(() => {
    const stars = [star1Ref.current, star2Ref.current, star3Ref.current];
    const delays = [0.1, 0.2, 0.15];
    const floatDurations = [1.5, 1.8, 1.3];
    const floatDistances = [8, 6, 10];
    
    stars.forEach((star, i) => {
      if (star) {
        gsap.set(star, { scale: 0, opacity: 0, y: 0 });
        gsap.to(star, {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          delay: delays[i],
          ease: 'back.out(2)',
          onComplete: () => {
            gsap.to(star, {
              y: -floatDistances[i],
              duration: floatDurations[i],
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
              delay: i * 0.2,
            });
          }
        });
      }
    });
  }, [star1Ref, star2Ref, star3Ref]);

  return (
    <TitleWrapper>
      <StarsContainer>
        <StarEl ref={star1Ref} style={{ top: 0, left: 0 }}>
          <Star4Svg size={34} />
        </StarEl>
        <StarEl ref={star2Ref} style={{ top: 18, left: 36 }}>
          <Star4Svg size={17} />
        </StarEl>
        <StarEl ref={star3Ref} style={{ top: 36, left: 10 }}>
          <Star4Svg size={24} />
        </StarEl>
      </StarsContainer>

      <Title>
        <TitleLine>
          <TitleText ref={line1Ref}>{line1Text}</TitleText>
        </TitleLine>
        <TitleLine>
          <TitleText ref={line2Ref} style={{ color: line2Color }}>{line2Text}</TitleText>
        </TitleLine>
      </Title>
      <HeroStamp />
    </TitleWrapper>
  );
};

// ─── Styled Components ────────────────────────────────────────────────────────

const TitleWrapper = styled.div`
  position: relative;
  margin-bottom: 24px;
  width: 100%;
`;

const Title = styled.h1`
  font-weight: 700;
  line-height: 1;
  letter-spacing: -4%;
  color: #282828;
  position: relative;
  z-index: 1;
`;

const TitleLine = styled.span`
  display: block;
  overflow: hidden;
`;

const TitleText = styled.span`
  display: inline-block;
  transform: translateY(105%);
  font-size: clamp(2.5rem, 8vw, 5.5rem);
`;

const StarsContainer = styled.div`
  position: absolute;
  top: -18px;
  left: -24px;
  width: 80px;
  height: 60px;
  z-index: 2;
`;

const StarEl = styled.div`
  position: absolute;
  transform: scale(0);
  opacity: 0;
  transform-origin: center center;
  cursor: pointer;
`;