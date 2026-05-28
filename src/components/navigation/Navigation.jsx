import { Menu } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { LINKS } from '../../data/siteConfig';
import { AnimatedStars } from './AnimatedStars';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';
import { scrollToElementCentered, useHoverRotation } from './navigationUtils';
import { NavLogo } from './NavLogo';

export const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navStar1Ref = useRef(null);
  const navStar2Ref = useRef(null);
  const navStar3Ref = useRef(null);
  const location = useLocation();

  const isHomePage = location.pathname === '/';
  const isPendoPage = location.pathname === '/pendo-consultant';

  const navItems = useMemo(() => {
    if (isHomePage) {
      return [
        { label: 'Web Works', target: '#works', type: 'hash' },
        { label: 'Pendo', target: '/pendo-consultant', type: 'route' },
        { label: 'Experience', target: '#experience', type: 'hash' },
      ];
    }
    if (isPendoPage) {
      return [
        { label: 'Web Works', target: '/#works', type: 'route' },
        { label: 'Pendo', target: '#pendo', type: 'hash' },
        { label: 'Insights', target: '#insights', type: 'hash' },
      ];
    }
    return [
      { label: 'Web Works', target: '/#works', type: 'route' },
      { label: 'Pendo', target: '/pendo-consultant', type: 'route' },
      { label: 'Experience', target: '/#experience', type: 'route' },
    ];
  }, [isHomePage, isPendoPage]);

  const handleHashClick = (e, target) => {
    if (target.startsWith('#')) {
      e.preventDefault();
      scrollToElementCentered(target.slice(1));
    }
  };

  useHoverRotation([navStar1Ref, navStar2Ref, navStar3Ref]);

  return (
    <>
      <NavWrapper>
        <NavContainer>
          <LogoWrapper>
            <AnimatedStars star1Ref={navStar1Ref} star2Ref={navStar2Ref} star3Ref={navStar3Ref} />
            <NavLogo isHomePage={isHomePage} />
          </LogoWrapper>

          <DesktopNav navItems={navItems} onHashClick={handleHashClick} />

          <CTA id="calend-navCTA" href={LINKS.calendly} target="_blank" rel="noopener noreferrer">
            Let's Talk
          </CTA>

          <MobileMenuButton onClick={() => setMobileOpen(true)}>
            <Menu size={34} aria-hidden="true" />
          </MobileMenuButton>
        </NavContainer>
      </NavWrapper>

      <MobileNav
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navItems={navItems}
        isHomePage={isHomePage}
        onHashClick={handleHashClick}
      />
    </>
  );
};

const pulseScale = keyframes`
  0%   { transform: scale(1);    border-color: #ff0037; }
  50%  { transform: scale(1.02); border-color: #f40035; box-shadow: 0 0 15px rgba(255,56,99,0.5); }
  100% { transform: scale(1);    border-color: #ff0037; }
`;

// Styled components (only those not already defined in subcomponents)
const NavWrapper = styled.div`
  position: relative;
  z-index: 1000;
  width: 100%;
  max-width: 900px;
  margin: 37px auto 0;
  background: #fffefa;
  border-radius: 50px;
  box-shadow: 0 4px 20px rgba(40, 40, 40, 0.1);
  border: 0.4px solid #282828;
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

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: transparent;
  height: fit-content;
`;

const LogoWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const CTA = styled.a`
  padding: 18px 28px 15px 28px;
  background: #282828;
  color: #ffffff;
  border-radius: 50px;
  line-height: 1;
  font-size: 18px;
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  transition: all 0.4s ease, box-shadow 0.2s ease;
  border: 2px solid #282828;
  animation: ${pulseScale} 1.5s ease-in-out 6;
  &:hover {
    box-shadow: 0 4px 15px rgba(255, 56, 99, 0.3);
    background: transparent;
    color: #ff3863;
    border: 2px solid #ff3863;
    animation: ${pulseScale} 1.5s ease-in-out 3;
  }
  @media (max-width: 968px) {
    display: none;
  }
`;

const MobileMenuButton = styled.button`
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