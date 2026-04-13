import gsap from 'gsap';
import { useRef } from 'react';
import styled from 'styled-components';

const CALENDLY_URL = 'https://calendly.com/12vblanco/30min';

export const PendoDiscoveryCTA = () => {
  const clockHandRef = useRef(null);

  const handleEnter = () => {
    gsap.to(clockHandRef.current, {
      rotation: 360,
      duration: 1.2,
      ease: 'power2.inOut',
      transformOrigin: '50% 85%',
    });
  };

  return (
    <Wrapper
      href={CALENDLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleEnter}
      aria-label="Book a free 30-minute Pendo discovery call"
    >
      <BottomRow>
        <TextCol>
          <Heading>
            Let's talk Pendo.<br />No obligation.
          </Heading>
          
          <Chip>Book your slot →</Chip>
        </TextCol>
        <TextCol>
                    <Eyebrow>Free Discovery Call</Eyebrow>

          <Body>
            30 minutes. We'll look at your setup, identify quick wins, and figure out if we're a good fit.
          </Body>
        </TextCol>

      </BottomRow>

    </Wrapper>
  );
};

export default PendoDiscoveryCTA;


// ─── Styled Components ────────────────────────────────────────────────────────

const Wrapper = styled.a.attrs({ className: 'pendoDiscoveryCTA-Wrapper' })`
  flex: 1;
  max-width: 940px;
  height: fit-content;
  padding: 3rem 5rem;
  display: flex;
  flex-direction: column;
  gap: 0;
  background: #FFFEFA;
  border: 1.5px solid rgba(255, 56, 99, 0.15);
  border-radius: 20px;
  text-decoration: none;
  color: #282828;
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
  cursor: pointer;
  margin: 6rem auto 8rem;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255, 56, 99, 0.03) 0%, transparent 60%);
    pointer-events: none;
    border-radius: inherit;
    z-index: 0;
  }

  &:hover {
    box-shadow: 0 16px 48px rgba(255, 56, 99, 0.15);
  }

  @media (max-width: 968px) {
    max-width: 100%;
    width: 100%;
  }
`;



const BottomRow = styled.div.attrs({ className: 'pendoDiscoveryCTA-BottomRow' })`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  padding: 28px 32px;
  flex: 1;

  @media (max-width: 480px) {
    padding: 24px 20px;
    gap: 12px;
  }
`;

const TextCol = styled.div.attrs({ className: 'pendoDiscoveryCTA-TextCol' })`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Eyebrow = styled.span.attrs({ className: 'pendoDiscoveryCTA-Eyebrow' })`
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  color: #FF3863;
`;

const Heading = styled.h3.attrs({ className: 'pendoDiscoveryCTA-Heading' })`
  font-size: 24px;
  width: 280px;
  color: #282828;
  margin: 0;
`;

const Body = styled.p.attrs({ className: 'pendoDiscoveryCTA-Body' })`
  color: #666;
  margin: 0;
`;

const Chip = styled.span.attrs({ className: 'pendoDiscoveryCTA-Chip' })`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 4px;
  padding: 8px 16px;
  background: #282828;
  color: #FFFEFA;
  border-radius: 50px;
  font-size: 13px;
  font-weight: 700;
  width: fit-content;
  transition: background 0.3s ease;

  ${Wrapper}:hover & {
    background: #FF3863;
  }
`;

const ClockCol = styled.div.attrs({ className: 'pendoDiscoveryCTA-ClockCol' })`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ClockSVG = styled.svg.attrs({ className: 'pendoDiscoveryCTA-ClockSVG' })`
  transition: transform 0.3s ease;

  ${Wrapper}:hover & {
    transform: scale(1.08);
  }
`;
