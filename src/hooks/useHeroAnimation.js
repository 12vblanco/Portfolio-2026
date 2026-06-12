import gsap from 'gsap';
import { useLayoutEffect, useRef } from 'react';
import { popStar, popStarBig, r } from '../utils/heroAnimationUtils';
import { prefersReducedMotion } from '../utils/motion';

export const useHeroAnimation = () => {
  const heroRef  = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const star1Ref = useRef(null);
  const star2Ref = useRef(null);
  const star3Ref = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Set initial states here (not in CSS) so crawlers see the content
      gsap.set([line1Ref.current, line2Ref.current], { y: '105%' });
      if (line3Ref.current) gsap.set(line3Ref.current, { opacity: 0, y: 20 });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl
        .to(line1Ref.current, { y: 0, duration: 0.6, delay: 0.2, ease: 'power3.out' })
        .to(line2Ref.current, { y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
        .add(popStarBig(star1Ref),                           '-=0.4')
        .add(popStar(star2Ref, { peakScale: r(1.1, 1.2) }), '-=0.85')
        .add(popStar(star3Ref, { delay: 0.05 }),              '-=0.80');

      if (line3Ref.current) {
        gsap.to(line3Ref.current, { y: 0, opacity: 1, duration: 0.6, delay: 0.55, ease: 'power3.out' });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return { heroRef, line1Ref, line2Ref, line3Ref, star1Ref, star2Ref, star3Ref };
};
