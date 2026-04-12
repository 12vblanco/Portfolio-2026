import styled, { keyframes } from 'styled-components';
import { IconAWS } from '../assets/icons/IconAWS';
import { IconFigma } from '../assets/icons/IconFigma';
import { IconGSAP } from '../assets/icons/IconGSAP';
import { IconGit } from '../assets/icons/IconGit';
import { IconPendo } from '../assets/icons/IconPendo';
import { IconReact } from '../assets/icons/IconReact';
import { IconVB } from '../assets/icons/IconVB';
import { IconVue } from '../assets/icons/IconVue';

// Order: VB → tool → tech → tool → tech → tool → tech → tool → tech → tool
const LOGOS = [
  { Icon: IconVB,               label: 'Victor Blanco'     },
  { Icon: IconPendo,            label: 'Pendo'              },
  { Icon: IconReact,            label: 'React'              },
  { Icon: IconFigma,            label: 'Figma'              },
  { Icon: IconVue,              label: 'Vue'                },
  { Icon: IconGSAP,             label: 'GSAP'               },
  { Icon: IconGit,              label: 'Git'                },
  { Icon: IconAWS,              label: 'AWS'                },
];

export const MobileLogoScroller = () => (
  <Wrapper>
    <FadeLeft />
    <Track>
      {[0, 1].map((pass) => (
        <LogoSet key={pass} aria-hidden={pass === 1}>
          {LOGOS.map((logo, i) => {
            const LogoIcon = logo.Icon;
            return (
              <LogoItem key={i} title={logo.label}>
                <LogoIcon />
              </LogoItem>
            );
          })}
        </LogoSet>
      ))}
    </Track>
    <FadeRight />
  </Wrapper>
);

const scroll = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
`;

const Wrapper = styled.div.attrs({ className: 'mobileLogoScroller-Wrapper' })`
  position: absolute;
  bottom: 5rem;
  left: 0;
  right: 0;
  overflow: hidden;
  padding: 20px 0 24px;
`;

const Track = styled.div.attrs({ className: 'mobileLogoScroller-Track' })`
  display: flex;
  width: max-content;
  animation: ${scroll} 14s linear infinite;
  &:hover { animation-play-state: paused; }
`;

const LogoSet = styled.div.attrs({ className: 'mobileLogoScroller-LogoSet' })`
  display: flex;
  align-items: center;
`;

const LogoItem = styled.div.attrs({ className: 'mobileLogoScroller-LogoItem' })`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 28px;
  opacity: 1;
  transition: opacity 0.2s ease;
  svg { width: 44px; height: 44px; }
  &:hover { opacity: 1; }
`;

const FadeLeft = styled.div.attrs({ className: 'mobileLogoScroller-FadeLeft' })`
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 46px;
  background: linear-gradient(to right, #FFFEFA, transparent);
  z-index: 2;
  pointer-events: none;
`;

const FadeRight = styled.div.attrs({ className: 'mobileLogoScroller-FadeRight' })`
  position: absolute;
  right: 0; top: 0; bottom: 0;
  width: 46px;
  background: linear-gradient(to left, #FFFEFA, transparent);
  z-index: 2;
  pointer-events: none;
`;