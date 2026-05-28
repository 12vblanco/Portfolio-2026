import styled from 'styled-components';
import { Star4Svg } from '../../components/common/StarIcons';

export const AnimatedStars = ({ star1Ref, star2Ref, star3Ref }) => (
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
