import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { popStar, popStarBig, r } from '../utils/heroAnimationUtils';

export const usePendoHeroAnimation = () => {
  const heroRef  = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const star1Ref = useRef(null);
  const star2Ref = useRef(null);
  const star3Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl
        .to(line1Ref.current, { y: 0, duration: 0.6, delay: 0.2, ease: 'power3.out' })
        .to(line2Ref.current, { y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
        .add(popStarBig(star1Ref),                           '-=0.4')
        .add(popStar(star2Ref, { peakScale: r(1.1, 1.2) }), '-=0.85')
        .add(popStar(star3Ref, { delay: 0.05 }),              '-=0.80');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return { heroRef, line1Ref, line2Ref, star1Ref, star2Ref, star3Ref };
};
