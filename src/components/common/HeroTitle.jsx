import gsap from 'gsap';
import { useEffect } from 'react';
import styled from 'styled-components';
import { startFloat, useHoverRotation } from '../navigation/navigationUtils';
import { HeroStamp } from './HeroStamp';
import { Star4Svg } from './StarIcons';

export const HeroTitle = ({ 
  line1Ref, 
  line2Ref, 
  star1Ref, 
  star2Ref, 
  star3Ref, 
  line1Text = "Web Developer &",
  line2Text = "Pendo Consultant",
  line2Color = "#FF3863",
  stampId,
}) => {
  useHoverRotation([star1Ref, star2Ref, star3Ref]);

  // Animate stars on mount with floating effect
  useEffect(() => {
    const stars = [star1Ref.current, star2Ref.current, star3Ref.current];
    const delays = [0.1, 0.2, 0.15];

    stars.forEach((star, i) => {
      if (star) {
        gsap.set(star, { scale: 0, opacity: 0, y: 0 });
        gsap.to(star, {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          delay: delays[i],
          ease: 'back.out(2)',
          onComplete: () => startFloat(star),
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
      <HeroStamp id={stampId} />
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