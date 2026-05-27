import gsap from 'gsap';
import { useRef } from 'react';
import styled from 'styled-components';
import { LINKS } from '../../data/siteConfig';

export const AvailabilityBadge = ({ id, href = LINKS.calendly }) => {
  const trailRef    = useRef(null);
  const animationRef = useRef(null);

  const handleMouseEnter = () => {
    const trail = trailRef.current;
    if (!trail) return;
    if (animationRef.current) animationRef.current.kill();
    trail.classList.add('active');
    animationRef.current = gsap.to({}, {
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: function () {
        const startAngle  = this.progress() * 360;
        const segmentSize = 50;
        trail.style.background = `conic-gradient(
          from 0deg,
          transparent ${startAngle}deg,
          #282828 ${startAngle}deg,
          #282828 ${startAngle + segmentSize}deg,
          transparent ${startAngle + segmentSize}deg
        )`;
      },
    });
  };

  const handleMouseLeave = () => {
    const trail = trailRef.current;
    if (!trail) return;
    trail.classList.remove('active');
    if (animationRef.current) animationRef.current.kill();
    trail.style.background =
      'conic-gradient(from 0deg, transparent 0deg, #282828 0deg, #282828 360deg, transparent 360deg)';
  };

  return (
    <BadgeLink
      id={id}
      href={href}
      target="_blank" rel="noopener noreferrer"
    >
      <Badge
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role="status"
        aria-label="Availability status"
      >
        <Dot aria-hidden="true" />
        Available for work
        <BorderTrail ref={trailRef} aria-hidden="true" />
      </Badge>
    </BadgeLink>
  );
};

// ─── Styled Components ────────────────────────────────────────────────────────

const BadgeLink = styled.a.attrs({ className: 'availabilityBadge-BadgeLink' })`
  text-decoration: none;
`;

const Badge = styled.div.attrs({ className: 'availabilityBadge-Badge' })`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #fffefa;
  border-radius: 50px;
  border: 2px solid #282828;
  font-size: 16px;
  color: #282828;
  margin-bottom: 40px;
  font-weight: 600;
  position: relative;
  cursor: pointer;

  @media (max-width: 968px) {
    display: none;
  }
`;

const BorderTrail = styled.div.attrs({ className: 'availabilityBadge-BorderTrail' })`
  position: absolute;
  inset: -2.5px;
  border-radius: 51.5px;
  padding: 2.5px;
  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    #282828 0deg,
    #282828 360deg,
    transparent 360deg
  );
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
  filter: drop-shadow(0 0 3px rgba(40, 40, 40, 0.25));

  &.active {
    opacity: 0.9;
  }
`;

const Dot = styled.span.attrs({ className: 'availabilityBadge-Dot' })`
  width: 8px;
  height: 8px;
  background: #ff3863;
  border-radius: 50%;
  animation: breathe 2.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  box-shadow: 0 0 0 0 rgba(255, 56, 99, 0.4);
  position: relative;
  z-index: 1;

  @keyframes breathe {
    0% {
      transform: scale(0.95);
      opacity: 0.8;
      box-shadow: 0 0 0 0 rgba(255, 56, 99, 0.4);
    }
    50% {
      transform: scale(1.2);
      opacity: 1;
      box-shadow: 0 0 0 6px rgba(255, 56, 99, 0);
    }
    100% {
      transform: scale(0.95);
      opacity: 0.8;
      box-shadow: 0 0 0 0 rgba(255, 56, 99, 0);
    }
  }
`;
