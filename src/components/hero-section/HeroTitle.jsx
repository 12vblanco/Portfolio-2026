import gsap from 'gsap';
import { useEffect } from 'react';
import styled from 'styled-components';
import { HeroStamp } from './HeroStamp';
import { Star4Svg } from './StarIcons';

const STAR_HOVER = [
  { enter: 135, leave: -12 },
  { enter: -45, leave:  8  },
  { enter:  72, leave: -20 },
];

const useHoverRotation = (refs) => {
  useEffect(() => {
    const cleanups = refs.map((ref, i) => {
      const el = ref.current;
      if (!el) return () => {};
      const { enter, leave } = STAR_HOVER[i];

      const onEnter = () => gsap.to(el, { rotation: enter, scale: 1.25, duration: 0.35, ease: 'back.out(2)' });
      const onLeave = () => gsap.to(el, { rotation: leave, scale: 1,    duration: 0.5,  ease: 'elastic.out(1, 0.5)' });

      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
      return () => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      };
    });

    return () => cleanups.forEach((fn) => fn());
  }, );
};

export const HeroTitle = ({ line1Ref, line2Ref, star1Ref, star2Ref, star3Ref }) => {
  useHoverRotation([star1Ref, star2Ref, star3Ref]);

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
          <TitleText ref={line1Ref} style={{ color: '#282828' }}>Web Developer &</TitleText>
        </TitleLine>
        <TitleLine>
          <TitleText ref={line2Ref} style={{ color: '#FF3863' }}>Pendo Consultant</TitleText>
        </TitleLine>
      </Title>
      <HeroStamp />
    </TitleWrapper>
  );
};

// ─── Styled Components ────────────────────────────────────────────────────────

const TitleWrapper = styled.div.attrs({ className: 'heroTitle-TitleWrapper' })`
  position: relative;
  margin-bottom: 24px;
  width: 100%;
`;

const Title = styled.h1.attrs({ className: 'heroTitle-Title' })`
  font-weight: 700;
  line-height: 1;
  letter-spacing: -4%;
  color: #282828;
  position: relative;
  z-index: 1;

  @media (max-width: 968px) {   
    /* font-size: 60px; */
  }

  span {
    color: #FF3863;
    display: block;
  }
`;

const TitleLine = styled.span.attrs({ className: 'heroTitle-TitleLine' })`
  display: block;
  overflow: hidden;
`;

const TitleText = styled.span.attrs({ className: 'heroTitle-TitleText' })`
  display: inline-block;
  transform: translateY(105%);
`;

const StarsContainer = styled.div.attrs({ className: 'heroTitle-StarsContainer' })`
  position: absolute;
  top: -18px;
  left: -24px;
  width: 80px;
  height: 60px;
  z-index: 2;
`;

const StarEl = styled.div.attrs({ className: 'heroTitle-StarEl' })`
  position: absolute;
  transform: scale(0);
  opacity: 0;
  transform-origin: center center;
  cursor: pointer;
`;