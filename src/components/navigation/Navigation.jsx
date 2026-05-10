import { Menu } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { AnimatedStars } from './AnimatedStars';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';
import { scrollToElementCentered, useHoverRotation } from './navigationUtils';
import { NavLogo } from './NavLogo';

export const Navigation = ({ star1Ref, star2Ref, star3Ref }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';
  const isPendoPage = location.pathname === '/pendo-consultant';

  const getNavItems = () => {
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
  };

  const navItems = getNavItems();

  const handleHashClick = (e, target) => {
    if (target.startsWith('#')) {
      e.preventDefault();
      scrollToElementCentered(target.slice(1));
    }
  };

  const desktopStarRefs = [star1Ref, star2Ref, star3Ref];
  useHoverRotation(desktopStarRefs);

  return (
    <>
      <NavWrapper>
        <NavContainer>
          <LogoWrapper>
            <AnimatedStars starRefs={desktopStarRefs} />
            <NavLogo isHomePage={isHomePage} />
          </LogoWrapper>

          <DesktopNav navItems={navItems} onHashClick={handleHashClick} />

          <CTA href="https://calendly.com/12vblanco/30min" target="_blank">
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
  padding: 12px 14px;
  background: #282828;
  color: #ffffff;
  border-radius: 50px;
  font-size: 18px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.4s ease, box-shadow 0.2s ease;
  border: 2px solid #282828;
  animation: pulseScale 1.5s ease-in-out 6;
  @keyframes pulseScale {
    0% { transform: scale(1); border-color: #ff0037; }
    50% { transform: scale(1.02); border-color: #f40035; box-shadow: 0 0 15px rgba(255,56,99,0.5); }
    100% { transform: scale(1); border-color: #ff0037; }
  }
  &:hover {
    box-shadow: 0 4px 15px rgba(255, 56, 99, 0.3);
    background: transparent;
    color: #ff3863;
    border: 2px solid #ff3863;
    animation: pulseScale 1.5s ease-in-out 3;
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