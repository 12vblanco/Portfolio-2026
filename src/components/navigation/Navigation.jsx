import { Menu } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { AnimatedStars } from './AnimatedStars';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';
import { NavCTA } from './NavCTA';
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

          <NavCTA id="calend-navCTA" />

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