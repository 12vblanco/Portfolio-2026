import { forwardRef, useImperativeHandle, useRef } from 'react';
import styled from 'styled-components';
import { Star4Svg } from '../../components/common/StarIcons';

export const AnimatedStars = forwardRef((props, ref) => {
  const star1Ref = useRef(null);
  const star2Ref = useRef(null);
  const star3Ref = useRef(null);

  // Expose the star refs to the parent component
  useImperativeHandle(ref, () => ({
    star1: star1Ref,
    star2: star2Ref,
    star3: star3Ref,
  }));

  return (
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
  );
});

const StarsContainer = styled.div`
  position: absolute;
  top: -26px;
  left: -22px;
  width: 80px;
  height: 60px;
  z-index: 2;
  pointer-events: none;
`;

const StarEl = styled.div`
  position: absolute;
  transform: scale(0);
  opacity: 0;
  transform-origin: center center;
  cursor: pointer;
  pointer-events: auto;
`;