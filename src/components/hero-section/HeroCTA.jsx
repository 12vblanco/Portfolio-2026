import gsap from 'gsap';
import { ArrowRight, Calendar } from 'lucide-react';
import { useCallback, useRef } from 'react';
import styled from 'styled-components';

const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
  justify-content: space-between;
  min-height: 112px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  flex-direction: row;
`;

const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  background: #282828;
  color: #FFFEFA;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  min-width: 176px;
  border: 2px solid transparent;
  position: relative;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(40, 40, 40, 0.15);
    border-color: #FF3863;
    background: #FFFEFA;
    color: #FF3863;
  }
`;

const SecondaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  background: #FFFEFA;
  color: #282828;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  min-width: 176px;
  border: 2px solid #242424;
  position: relative;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(40, 40, 40, 0.15);
    border-color: #FF3863;
    color: #FF3863;
  }
`;

const BorderTrail = styled.div`
  position: absolute;
  inset: -2.5px;
  border-radius: 51.5px;
  padding: 2.5px;
  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    #FF3863 0deg,
    #FF3863 360deg,
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

const TrustBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 16px;
  color: #282828;
`;

const Trust = styled.span`
  transition: all 0.3s ease-in-out;
  &:hover {
    color: #FF3863;
    cursor: pointer;
    transform: translateY(-2px);
  }
`;

const AvatarGroup = styled.div`
  display: flex;
`;

const AvatarRing = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #eaeaea;
  padding: 2px;
  margin-left: ${p => p.$first ? '0' : '-12px'};
`;

const AvatarInner = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: ${p => p.$color};
`;

const AVATARS = [
  { color: '#DBE1E8', first: true },
  { color: '#B8C4D1' },
  { color: '#94A3B8' },
];

export const HeroCTA = () => {
  const primaryTrailRef = useRef(null);
  const primaryAnimRef = useRef(null);
  const secondaryTrailRef = useRef(null);
  const secondaryAnimRef = useRef(null);

  const handlePrimaryEnter = useCallback(() => {
    const trail = primaryTrailRef.current;
    if (!trail) return;
    if (primaryAnimRef.current) primaryAnimRef.current.kill();
    trail.style.background = 'conic-gradient(from 0deg, transparent 0deg, #FF3863 0deg, #FF3863 360deg, transparent 360deg)';
    trail.classList.add('active');
    primaryAnimRef.current = gsap.to({}, {
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: function () {
        const startAngle = this.progress() * 360;
        const segmentSize = 50;
        trail.style.background = `conic-gradient(from 0deg, transparent ${startAngle}deg, #FF3863 ${startAngle}deg, #FF3863 ${startAngle + segmentSize}deg, transparent ${startAngle + segmentSize}deg)`;
      },
    });
  }, []);

  const handlePrimaryLeave = useCallback(() => {
    const trail = primaryTrailRef.current;
    if (!trail) return;
    trail.classList.remove('active');
    if (primaryAnimRef.current) primaryAnimRef.current.kill();
    trail.style.background = 'conic-gradient(from 0deg, transparent 0deg, #FF3863 0deg, #FF3863 360deg, transparent 360deg)';
  }, []);

  const handleSecondaryEnter = useCallback(() => {
    const trail = secondaryTrailRef.current;
    if (!trail) return;
    if (secondaryAnimRef.current) secondaryAnimRef.current.kill();
    trail.style.background = 'conic-gradient(from 0deg, transparent 0deg, #FF3863 0deg, #FF3863 360deg, transparent 360deg)';
    trail.classList.add('active');
    secondaryAnimRef.current = gsap.to({}, {
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: function () {
        const startAngle = this.progress() * 360;
        const segmentSize = 50;
        trail.style.background = `conic-gradient(from 0deg, transparent ${startAngle}deg, #FF3863 ${startAngle}deg, #FF3863 ${startAngle + segmentSize}deg, transparent ${startAngle + segmentSize}deg)`;
      },
    });
  }, []);

  const handleSecondaryLeave = useCallback(() => {
    const trail = secondaryTrailRef.current;
    if (!trail) return;
    trail.classList.remove('active');
    if (secondaryAnimRef.current) secondaryAnimRef.current.kill();
    trail.style.background = 'conic-gradient(from 0deg, transparent 0deg, #FF3863 0deg, #FF3863 360deg, transparent 360deg)';
  }, []);

  return (
    <RightContent>
      <ButtonGroup>
        <PrimaryButton
          href="#works"
          onMouseEnter={handlePrimaryEnter}
          onMouseLeave={handlePrimaryLeave}
        >
          View Works
          <ArrowRight size={18} />
          <BorderTrail ref={primaryTrailRef} />
        </PrimaryButton>

        <SecondaryButton
          href="https://calendly.com"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={handleSecondaryEnter}
          onMouseLeave={handleSecondaryLeave}
        >
          <Calendar size={18} />
          Book a Call
          <BorderTrail ref={secondaryTrailRef} />
        </SecondaryButton>
      </ButtonGroup>

      <TrustBadge>
        <AvatarGroup>
          {AVATARS.map(({ color, first }, i) => (
            <AvatarRing key={i} $first={first}>
              <AvatarInner $color={color} />
            </AvatarRing>
          ))}
        </AvatarGroup>
        <Trust>Trusted by clients and partners worldwide</Trust>
      </TrustBadge>
    </RightContent>
  );
};