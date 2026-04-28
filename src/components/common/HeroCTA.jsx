import gsap from 'gsap';
import { ArrowRight, Calendar } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const CHARS = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,\'-&';

const TRUST_TEXTS = [
  'Trusted by clients worldwide',
  '5-star reviews on Upwork',
  'Pendo certified consultant',
  'Based in Edinburgh, Scotland',
];

const MAX_LEN = Math.max(...TRUST_TEXTS.map(t => t.length));

const FlipChar = ({ char }) => {
  const ref = useRef(null);
  const prev = useRef(char);

  useEffect(() => {
    if (char !== prev.current && ref.current) {
      ref.current.classList.remove('flip');
      void ref.current.offsetWidth;
      ref.current.classList.add('flip');
      prev.current = char;
    }
  }, [char]);

  return <FlipSpan ref={ref}>{char}</FlipSpan>;
};

const FlipText = () => {
  const [displayed, setDisplayed] = useState(
    () => TRUST_TEXTS[0].padEnd(MAX_LEN, ' ').split('').map(char => ({ char }))
  );
  const indexRef = useRef(0);
  const timeoutsRef = useRef([]);

  const animateTo = useCallback((target) => {
    const padded = target.padEnd(MAX_LEN, ' ');

    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    for (let i = 0; i < MAX_LEN; i++) {
      const targetChar = padded[i];
      const delay = Math.random() * 700;
      const maxFlips = 3 + Math.floor(Math.random() * 7);
      let flips = 0;

      const run = (wait) => {
        const t = setTimeout(() => {
          flips++;
          const isLast = flips >= maxFlips;
          const ch = isLast ? targetChar : CHARS[Math.floor(Math.random() * CHARS.length)];
          setDisplayed(prev => {
            const next = [...prev];
            next[i] = { char: ch };
            return next;
          });
          if (!isLast) run(80);
        }, wait);
        timeoutsRef.current.push(t);
      };

      const t = setTimeout(() => run(0), delay);
      timeoutsRef.current.push(t);
    }
  }, []);

  useEffect(() => {
    const loop = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % TRUST_TEXTS.length;
      animateTo(TRUST_TEXTS[indexRef.current]);
    }, 3500);
    return () => {
      clearInterval(loop);
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, [animateTo]);

  return (
    <FlipWrapper>
      {displayed.map(({ char }, i) => (
        <FlipChar key={i} char={char} />
      ))}
    </FlipWrapper>
  );
};

const AVATARS = [
  { color: '#94A3B8', first: true },
  { color: '#B8C4D1' },
  { color: '#DBE1E8' },
];

export const HeroCTA = ({ 
  primaryButtonText = "View Works",
  primaryButtonLink = "#works",
  secondaryButtonText = "Book a Call",
  secondaryButtonLink = "https://calendly.com/12vblanco/30min"
}) => {
  const primaryTrailRef = useRef(null);
  const primaryAnimRef = useRef(null);
  const secondaryTrailRef = useRef(null);
  const secondaryAnimRef = useRef(null);

  const handlePrimaryEnter = useCallback(() => {
    const trail = primaryTrailRef.current;
    if (!trail) return;
    if (primaryAnimRef.current) primaryAnimRef.current.kill();
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
          href={primaryButtonLink}
          onMouseEnter={handlePrimaryEnter}
          onMouseLeave={handlePrimaryLeave}
        >
          {primaryButtonText}
          <ArrowRight size={18} />
          <BorderTrail ref={primaryTrailRef} />
        </PrimaryButton>

        <SecondaryButton
          href={secondaryButtonLink}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={handleSecondaryEnter}
          onMouseLeave={handleSecondaryLeave}
        >
          {secondaryButtonText}
          <Calendar size={18} style={{ marginTop: '-3px' }} />
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
        <FlipText />
      </TrustBadge>
    </RightContent>
  );
};

// ─── Styled Components ────────────────────────────────────────────────────────

const charFlip = keyframes`
  0%   { transform: rotateX(-90deg) scaleY(0.5); opacity: 0; }
  60%  { transform: rotateX(8deg); opacity: 1; }
  100% { transform: rotateX(0deg); opacity: 1; }
`;

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
  @media (max-width: 432px) {
    gap: 8px;
    width: 100%;
  }
`;

const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px 8px;
  background: #282828;
  color: #FFFEFA;
  border-radius: 50px;
  font-size: 16px;
  line-height: 1;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  position: relative;

  svg { flex-shrink: 0; }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(40, 40, 40, 0.15);
    border-color: #FF3863;
    background: #FFFEFA;
    color: #FF3863;
  }

  @media (max-width: 432px) {
    min-width: 140px;
  }
`;

const SecondaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px 8px;
  background: #FFFEFA;
  color: #282828;
  border-radius: 50px;
  font-size: 16px;
  line-height: 1;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  min-width: 176px;
  border: 2px solid #242424;
  position: relative;

  svg { flex-shrink: 0; }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(40, 40, 40, 0.15);
    border-color: #FF3863;
    color: #FF3863;
  }

  @media (max-width: 432px) {
    min-width: 140px;
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
  overflow: hidden;
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

const FlipWrapper = styled.div`
  display: inline-flex;
  font-size: 15px;
  color: #282828;
  font-weight: 500;
  letter-spacing: 0.2px;
  cursor: default;
  perspective: 400px;
  @media (max-width: 430px) {
    font-size: 13px;
  }
`;

const FlipSpan = styled.span`
  display: inline-block;
  min-width: 0.55em;
  text-align: center;
  overflow: hidden;
  &.flip {
    animation: ${charFlip} 0.1s ease forwards;
  }
`;