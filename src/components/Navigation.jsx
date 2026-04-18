import gsap from 'gsap';
import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MobileLogoScroller } from './MobileLogoScroller';
import { Star4Svg } from './hero-section/StarIcons';

const r = (min, max) => min + Math.random() * (max - min);

const startFloat = (el) => {
  if (!el) return;
  gsap.to(el, {
    y: r(-4, -8),
    rotation: r(-65, 75),
    duration: r(1.6, 2.4),
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
  });
};

const STAR_HOVER = [
  { enter: 135, leave: -12 },
  { enter: -45, leave:  8  },
  { enter:  72, leave: -20 },
];

const useHoverRotation = (refs) => {
  useEffect(() => {
    const cleanups = refs.map((ref, i) => {
      if (!ref) return () => {};
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

export const Navigation = ({ star1Ref, star2Ref, star3Ref }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const mStar1Ref = useRef(null);
  const mStar2Ref = useRef(null);
  const mStar3Ref = useRef(null);

  useHoverRotation([star1Ref, star2Ref, star3Ref]);
  useHoverRotation([mStar1Ref, mStar2Ref, mStar3Ref]);

  useEffect(() => {
    if (mobileOpen) {
      [mStar1Ref, mStar2Ref, mStar3Ref].forEach((ref, i) => {
        if (!ref.current) return;
        gsap.killTweensOf(ref.current);
        gsap.fromTo(
          ref.current,
          { scale: 0, opacity: 0, rotation: -25 },
          {
            scale: 1, opacity: 1, rotation: 0,
            duration: 0.5, delay: 0.15 + i * 0.07, ease: 'back.out(2)',
            onComplete: () => startFloat(ref.current),
          }
        );
      });
    } else {
      [mStar1Ref, mStar2Ref, mStar3Ref].forEach((ref) => {
        if (ref.current) gsap.killTweensOf(ref.current);
      });
    }
  }, [mobileOpen]);

  return (
    <>
      <NavWrapper>
        <NavContainer>
          <LogoWrapper>
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
            <Logo href="#home">
              Victor Blanco<span>.</span>
            </Logo>
          </LogoWrapper>

          <NavLinks>
            <NavLink href="#works">Works</NavLink>
            <NavLink href="#pendo">Pendo</NavLink>
            <NavLink href="#experience">Experience</NavLink>
          </NavLinks>

          <CTA href="https://calendly.com/12vblanco/30min" target="_blank">Let's Talk</CTA>

          <MobileMenuButton aria-label="Open menu" onClick={() => setMobileOpen(true)}>
            <Menu size={34} aria-hidden="true" />
          </MobileMenuButton>
        </NavContainer>
      </NavWrapper>

      <MobileNavOverlay
        $isOpen={mobileOpen}
        role="button"
        aria-label="Close menu"
        tabIndex={0}
        onClick={() => setMobileOpen(false)}
        onKeyDown={(e) => e.key === 'Escape' && setMobileOpen(false)}
      />
      <MobileNav $isOpen={mobileOpen} role="navigation" aria-label="Mobile navigation">
        <CloseButton aria-label="Close menu" onClick={() => setMobileOpen(false)}>
          <X size={31} aria-hidden="true" />
        </CloseButton>

        <MobileLogoWrapper>
          <StarsContainer>
            <StarEl ref={mStar1Ref} style={{ top: 0, left: 0 }}>
              <Star4Svg size={34} />
            </StarEl>
            <StarEl ref={mStar2Ref} style={{ top: 18, left: 36 }}>
              <Star4Svg size={17} />
            </StarEl>
            <StarEl ref={mStar3Ref} style={{ top: 36, left: 10 }}>
              <Star4Svg size={24} />
            </StarEl>
          </StarsContainer>
          <Logo href="#home" style={{ fontSize: '48px', letterSpacing: '-2px', lineHeight: '1.1' }}>
            Victor Blanco<span>.</span>
          </Logo>
        </MobileLogoWrapper>

        <MobileNavLink href="#works" aria-label="navigate to works" onClick={() => setMobileOpen(false)}>Works</MobileNavLink>
        <MobileNavLink href="#pendo" aria-label="navigate to pendo" onClick={() => setMobileOpen(false)}>Pendo</MobileNavLink>
        <MobileNavLink href="#experience" aria-label="navigate to experience" onClick={() => setMobileOpen(false)}>Experience</MobileNavLink>

        {/* Pendo Consultant page link — mobile only */}
        <MobileRouterLink
          to="/pendo-consultant"
          aria-label="navigate to Pendo Consultant page"
          onClick={() => setMobileOpen(false)}
        >
          Hire Pendo Consultant
        </MobileRouterLink>

        <MobileCTA href="https://calendly.com/12vblanco/30min" aria-label="navigate to contact" onClick={() => setMobileOpen(false)}>Let's Talk</MobileCTA>

        {/* Logo scroller pinned to the bottom of the mobile menu */}
        <MobileLogoScroller />
      </MobileNav>
    </>
  );
};

// ─── Styled Components ────────────────────────────────────────────────────────

const NavWrapper = styled.div.attrs({ className: 'navigation-NavWrapper' })`
  position: relative;
  z-index: 1000;
  width: 100%;
  max-width: 900px;
  margin: 37px auto 0;
  background: #FFFEFA;
  border-radius: 50px;
  box-shadow: 0 4px 20px rgba(40, 40, 40, 0.1);
  border: .4px solid #282828;

  @media (max-width: 968px) {
    width: 50%;
    margin: 24px auto 0;
    padding: 8px 16px;
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    margin: 16px auto 0;
    width: 80%;
  }
`;

const NavContainer = styled.nav.attrs({ className: 'navigation-NavContainer' })`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: transparent;
  height: fit-content;
`;

const LogoWrapper = styled.div.attrs({ className: 'navigation-LogoWrapper' })`
  position: relative;
  display: flex;
  align-items: center;
`;

const StarsContainer = styled.div.attrs({ className: 'navigation-StarsContainer' })`
  position: absolute;
  top: -26px;
  left: -22px;
  width: 80px;
  height: 60px;
  z-index: 2;
  pointer-events: none;
`;

const StarEl = styled.div.attrs({ className: 'navigation-StarEl' })`
  position: absolute;
  transform: scale(0);
  opacity: 0;
  transform-origin: center center;
  cursor: pointer;
  pointer-events: auto;
`;

const Logo = styled.a.attrs({ className: 'navigation-Logo' })`
  font-family: 'Switzer', sans-serif;
  margin-top: 3px;
  margin-left: 1rem;
  font-size: 32px;
  font-weight: 900;
  letter-spacing: -2%;
  color: #282828;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 4px;

  span {
    color: #FF3863;
    border-radius: 250px;
  }
`;

const NavLinks = styled.div.attrs({ className: 'navigation-NavLinks' })`
  display: flex;
  gap: 40px;
  margin-top: 3px;
  align-items: center;
  @media (max-width: 968px) {
    display: none;
  }
`;

const NavLink = styled.a.attrs({ className: 'navigation-NavLink' })`
  font-size: 20px;
  color: #282828;
  text-decoration: none;
  transition: color 0.2s ease;
  font-weight: 500;
  margin-top: 2px;

  &:hover {
    color: #FF3863;
  }
`;

const CTA = styled.a.attrs({ className: 'navigation-CTA' })`
  padding: 12px 14px;
  background: #282828;
  color: #FFFFFF;
  border-radius: 50px;
  font-size: 18px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.4s ease, box-shadow 0.2s ease;
  border: 2px solid #282828;
  animation: pulseScale 1.5s ease-in-out 6;

  @keyframes pulseScale {
    0%   { transform: scale(1);    border-color: #ff0037; }
    50%  { transform: scale(1.02); border-color: #f40035; box-shadow: 0 0 15px rgba(255,56,99,0.5); }
    100% { transform: scale(1);    border-color: #ff0037; }
  }

  &:hover {
    box-shadow: 0 4px 15px rgba(255, 56, 99, 0.3);
    background: transparent;
    color: #FF3863;
    border: 2px solid #FF3863;
    animation: pulseScale 1.5s ease-in-out 3;
  }

  @media (max-width: 968px) {
    display: none;
  }
`;

const MobileMenuButton = styled.button.attrs({ className: 'navigation-MobileMenuButton' })`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: #282828;
  margin: 6px 4px 2px 4px;
  padding-right: 4px;

  @media (max-width: 968px) {
    display: block;
  }
`;

const MobileNavOverlay = styled.div.attrs({ className: 'navigation-MobileNavOverlay' })`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9998;
  opacity: ${p => p.$isOpen ? 1 : 0};
  pointer-events: ${p => p.$isOpen ? 'auto' : 'none'};
  transition: opacity 0.3s ease;
`;

const MobileNav = styled.div.attrs({ className: 'navigation-MobileNav' })`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  background: #FFFEFA;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  transform: translateX(${p => p.$isOpen ? '0' : '100%'});
  transition: transform 0.3s ease;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
  padding-bottom: 88px;
`;

const CloseButton = styled.button.attrs({ className: 'navigation-CloseButton' })`
  position: absolute;
  top: 24px;
  right: 24px;
  background: none;
  border: none;
  cursor: pointer;
  color: #282828;
  padding: 4px;
`;

const MobileNavLink = styled.a.attrs({ className: 'navigation-MobileNavLink' })`
  font-size: 31.25px;
  color: #282828;
  text-decoration: none;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -1px;
  transition: color 0.2s ease;

  &:hover {
    color: #FF3863;
  }
`;

// React Router Link styled to match MobileNavLink but with accent colour
// to signal it navigates to a separate page rather than scrolling
const MobileRouterLink = styled(Link)`
  font-size: 31.25px;
  color: #FF3863;
  text-decoration: none;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -1px;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.75;
  }
`;

const MobileLogoWrapper = styled.div.attrs({ className: 'navigation-MobileLogoWrapper' })`
  position: relative;
  display: flex;
  align-items: center;
  margin-top: -2rem;
  margin-bottom: 0.5rem;
`;

const MobileCTA = styled.a.attrs({ className: 'navigation-MobileCTA' })`
  padding: 12px 28px;
  background: #282828;
  color: #FFFFFF;
  border-radius: 50px;
  font-size: 18px;
  font-weight: 600;
  text-decoration: none;
  border: 2px solid #282828;
  transition: all 0.3s ease;

  &:hover {
    background: transparent;
    color: #FF3863;
    border-color: #FF3863;
  }
`;