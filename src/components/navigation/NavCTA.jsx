import styled, { css, keyframes } from 'styled-components';
import { LINKS } from '../../data/siteConfig';
import { trackEvent } from '../../utils/analytics';

export const NavCTA = ({ id, onClick, mobile }) => (
  <CTALink
    id={id}
    href={LINKS.calendly}
    target="_blank"
    rel="noopener noreferrer"
    $mobile={mobile}
    onClick={(e) => {
      trackEvent('cta_click', { cta_text: "Let's Talk", cta_url: LINKS.calendly });
      onClick?.(e);
    }}
  >
    Let's Talk
  </CTALink>
);

const pulseScale = keyframes`
  0%   { transform: scale(1);    border-color: #ff0037; }
  50%  { transform: scale(1.02); border-color: #f40035; box-shadow: 0 0 15px rgba(255,56,99,0.5); }
  100% { transform: scale(1);    border-color: #ff0037; }
`;

const desktopStyles = css`
  transition: all 0.4s ease, box-shadow 0.2s ease;
  animation: ${pulseScale} 1.5s ease-in-out 6;
  &:hover {
    box-shadow: 0 4px 15px rgba(255, 56, 99, 0.3);
    animation: ${pulseScale} 1.5s ease-in-out 3;
  }
  @media (max-width: 968px) {
    display: none;
  }
`;

const mobileStyles = css`
  transition: all 0.3s ease;
`;

const CTALink = styled.a`
  padding: 18px 28px 15px 28px;
  background: #282828;
  color: #ffffff;
  border-radius: 50px;
  line-height: 1;
  font-size: 18px;
  font-weight: 600;
  text-decoration: none;
  border: 2px solid #282828;
  &:hover {
    background: transparent;
    color: #ff3863;
    border-color: #ff3863;
  }
  ${p => p.$mobile ? mobileStyles : desktopStyles}
`;
