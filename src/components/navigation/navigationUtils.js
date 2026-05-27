import gsap from 'gsap';
import { useEffect } from 'react';

const r = (min, max) => min + Math.random() * (max - min);

export const startFloat = (el) => {
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
  { enter: -45, leave: 8 },
  { enter: 72, leave: -20 },
];

export const useHoverRotation = (refs) => {
  useEffect(() => {
    const cleanups = refs.map((ref, i) => {
      if (!ref) return () => {};
      const el = ref.current;
      if (!el) return () => {};
      const { enter, leave } = STAR_HOVER[i];
      const onEnter = () => gsap.to(el, { rotation: enter, scale: 1.25, duration: 0.35, ease: 'back.out(2)' });
      const onLeave = () => gsap.to(el, { rotation: leave, scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
      return () => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      };
    });
    return () => cleanups.forEach((fn) => fn());
  }, [refs]);
};

export const scrollToElementCentered = (elementId) => {
  const element = document.getElementById(elementId);
  if (!element) return;
  const elementRect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const elementCenter = elementRect.top + window.scrollY + elementRect.height / 2;
  const targetScrollY = elementCenter - viewportHeight / 2;
  window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
};