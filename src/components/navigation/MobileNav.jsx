import gsap from 'gsap';
import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MobileLogoScroller } from '../common/MobileLogoScroller';
import { AnimatedStars } from './AnimatedStars';
import { NavCTA } from './NavCTA';
import { NavLogo } from './NavLogo';
import { startFloat, useHoverRotation } from './navigationUtils';

export const MobileNav = ({ isOpen, onClose, navItems, isHomePage, onHashClick }) => {
  const mStar1Ref = useRef(null);
  const mStar2Ref = useRef(null);
  const mStar3Ref = useRef(null);
  const mobileStarRefs = [mStar1Ref, mStar2Ref, mStar3Ref];

  useHoverRotation([mStar1Ref, mStar2Ref, mStar3Ref]);

  useEffect(() => {
    if (isOpen) {
      mobileStarRefs.forEach((ref, i) => {
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
      mobileStarRefs.forEach((ref) => ref.current && gsap.killTweensOf(ref.current));
    }
  }, [isOpen]);

  return (
    <>
      <MobileNavOverlay $isOpen={isOpen} onClick={onClose} />
      <MobileNavContainer $isOpen={isOpen}>
        <CloseButton onClick={onClose}>
          <X size={31} aria-hidden="true" />
        </CloseButton>

        <MobileLogoWrapper>
          <AnimatedStars star1Ref={mStar1Ref} star2Ref={mStar2Ref} star3Ref={mStar3Ref} />
          <NavLogo isHomePage={isHomePage} variant="mobile" />
        </MobileLogoWrapper>

        {navItems.map((item, idx) =>
          item.type === 'route' ? (
            <MobileRouterLink key={idx} to={item.target} onClick={onClose}>
              {item.label}
            </MobileRouterLink>
          ) : (
            <MobileNavLink
              key={idx}
              href={item.target}
              onClick={(e) => {
                onHashClick(e, item.target);
                onClose();
              }}
            >
              {item.label}
            </MobileNavLink>
          )
        )}

        {isHomePage && (
          <MobilePendoLink to="/pendo-consultant" onClick={onClose}>
            Hire Pendo Consultant
          </MobilePendoLink>
        )}

        <NavCTA id="calend-mobileCTA" onClick={onClose} mobile />

        <MobileLogoScroller />
      </MobileNavContainer>
    </>
  );
};

const MobileNavOverlay = styled.div`
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

const MobileNavContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  background: #fffefa;
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

const CloseButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  background: none;
  border: none;
  cursor: pointer;
  color: #282828;
  padding: 4px;
`;

const sharedNavLinkStyles = `
  font-size: 31.25px;
  color: #282828;
  text-decoration: none;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -1px;
  transition: color 0.2s ease;
  &:hover {
    color: #ff3863;
  }
`;

const MobileNavLink = styled.a`
  ${sharedNavLinkStyles}
`;

const MobileRouterLink = styled(Link)`
  ${sharedNavLinkStyles}
`;

const MobilePendoLink = styled(Link)`
  font-size: 31.25px;
  color: #ff3863;
  text-decoration: none;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -1px;
  transition: opacity 0.2s ease;
  &:hover {
    opacity: 0.75;
  }
`;

const MobileLogoWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-top: -2rem;
  margin-bottom: 0.5rem;
`;

