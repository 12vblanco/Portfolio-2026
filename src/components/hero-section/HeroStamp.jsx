import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

export const HeroStamp = ({ href = 'https://calendly.com/12vblanco/30min' }) => {
  const wrapperRef = useRef(null);
  const ringRef = useRef(null);
  const rotRef = useRef(0);
  const speedRef = useRef(0.25);
  const rafRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      wrapperRef.current,
      { scale: 0.4, rotation: -25, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 0.6, ease: 'back.out(2)', delay: 1.4 }
    );

    const spin = () => {
      rotRef.current += speedRef.current;
      if (ringRef.current) {
        ringRef.current.style.transform = `rotate(${rotRef.current}deg)`;
      }
      rafRef.current = requestAnimationFrame(spin);
    };
    spin();

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <Wrapper
      ref={wrapperRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Book a free 30 minute discovery call"
      onMouseEnter={() => { speedRef.current = 1.4; }}
      onMouseLeave={() => { speedRef.current = 0.25; }}
    >
      <Ring ref={ringRef} viewBox="0 0 120 120" width="120" height="120">
        <defs>
          <path
            id="stamp-circle-path"
            d="M60,60 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0"
          />
        </defs>
        <text fontSize="9.6" fontWeight="600" fill="#282828" letterSpacing="3.05" fontFamily="inherit">
          <textPath href="#stamp-circle-path">
            BOOK A FREE 30 MINUTES CALL  •
          </textPath>
        </text>
      </Ring>
      <Center>
        <RedDot>
          <CalIcon />
        </RedDot>
      </Center>
    </Wrapper>
  );
};

const CalIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="4" width="18" height="17" rx="2" stroke="#FFFEFA" strokeWidth="2" />
    <path d="M16 2v4M8 2v4M3 9h18" stroke="#FFFEFA" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const Wrapper = styled.a`
  position: absolute;
  top: 27%;
  right: 29%;
  width: 120px;
  height: 120px;
  display: block;
  text-decoration: none;
  cursor: pointer;
  opacity: 0;

  @media (max-width: 968px) {
    display: none;
  }
`;

const Ring = styled.svg`
  position: absolute;
  inset: 0;
  transform-origin: center;
  pointer-events: none;
`;

const Center = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

const RedDot = styled.div`
  width: 60px;
  height: 60px;
  background: #FF3863;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  ${Wrapper}:hover & {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(255, 56, 99, 0.35);
  }
`;