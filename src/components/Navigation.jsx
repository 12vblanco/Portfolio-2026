import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import styled from 'styled-components';

export const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <NavWrapper>
        <NavContainer>
          <Logo href="#home">
            Victor Blanco<span>.</span>
          </Logo>
          
          <NavLinks>
            <NavLink href="#works">Works</NavLink>
            <NavLink href="#pendo">Pendo</NavLink>
            <NavLink href="#experience">Experience</NavLink>
          </NavLinks>
          
          <CTA href="#contact">Let's Talk</CTA>
          
          <MobileMenu>
            <button onClick={() => setMobileOpen(true)} style={{ background: 'none', border: 'none' }}>
              <Menu size={24} />
            </button>
          </MobileMenu>
        </NavContainer>
      </NavWrapper>
      
      <MobileNav $isOpen={mobileOpen}>
        <CloseButton onClick={() => setMobileOpen(false)}>
          <X size={24} />
        </CloseButton>
        <NavLink href="#works" onClick={() => setMobileOpen(false)}>Works</NavLink>
        <NavLink href="#pendo" onClick={() => setMobileOpen(false)}>Pendo</NavLink>
        <NavLink href="#experience" onClick={() => setMobileOpen(false)}>Experience</NavLink>
        <CTA href="#contact" onClick={() => setMobileOpen(false)}>Let's Talk</CTA>
      </MobileNav>
    </>
  );
};

// ─── Styled Components ────────────────────────────────────────────────────────

const NavWrapper = styled.div.attrs({ className: 'navigation-NavWrapper' })`
  position: relative;
  z-index: 10000;
  padding: 2px;
  width: 100%;
  max-width: 900px;
  margin: 37px auto 0;
  /* padding: 6px 8px 6px 12px; */
  padding-right: 2px;
  background: #FFFEFA;
  border-radius: 50px;
  box-shadow: 0 4px 20px rgba(40, 40, 40, 0.1);
  border: .4px solid #282828;
  
  @media (max-width: 768px) {
    padding: 8px 16px;
    margin: 16px auto 0;
  }
`;

const NavContainer = styled.nav.attrs({ className: 'navigation-NavContainer' })`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: transparent;
`;

const Logo = styled.a.attrs({ className: 'navigation-Logo' })`
  font-family: 'Switzer', sans-serif;
  margin-left: 1rem;
  margin-top: 4px;
  font-size: 28px;
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
  align-items: center;
  @media (max-width: 768px) {
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
  padding: 10px 14px;
  background: #282828;
  color: #FFFFFF;
  border-radius: 50px;
  font-size: 18px;
  font-weight: 600;
  text-decoration: none;
    margin-right: 1px;
  transition: all 0.4s ease, box-shadow 0.2s ease;
    border: 2px solid #282828;
    animation: pulseScale 1.5s ease-in-out 6;

  @keyframes pulseScale {
    0% {
      transform: scale(1);
      border-color: #ff0037;
    }
    50% {
      transform: scale(1.02);
      border-color: #f40035;
      box-shadow: 0 0 15px rgba(255, 56, 99, 0.5);
    }
    100% {
      transform: scale(1);
      border-color: #ff0037;
    }
  }
  

  
  &:hover {
    box-shadow: 0 4px 15px rgba(255, 56, 99, 0.3);
    background: transparent;
  color: #FF3863;
  border: 2px solid #FF3863;
  animation: pulseScale 1.5s ease-in-out 3;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenu = styled.div.attrs({ className: 'navigation-MobileMenu' })`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileNav = styled.div.attrs({ className: 'navigation-MobileNav' })`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #FFFEFA;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  transform: translateX(${props => props.$isOpen ? '0' : '100%'});
  transition: transform 0.3s ease;
`;

const CloseButton = styled.button.attrs({ className: 'navigation-CloseButton' })`
  position: absolute;
  top: 24px;
  right: 32px;
  background: none;
  border: none;
  cursor: pointer;
  color: #282828;
`;
