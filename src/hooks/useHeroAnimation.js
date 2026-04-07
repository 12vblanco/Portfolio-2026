import gsap from 'gsap';
import { useEffect, useRef } from 'react';

export const useHeroAnimation = () => {
  const heroRef  = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const star1Ref = useRef(null);
  const star2Ref = useRef(null);
  const star3Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const r = (min, max) => min + Math.random() * (max - min);

      const startFloat = (el) => {
        gsap.to(el, {
          y: r(-4, -8),
          rotation: r(-65, 75),
          duration: r(1.6, 2.4),
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      };

      const popStar = (ref, opts = {}) => {
        const { peakScale = r(1.08, 1.18), rotation = r(-18, 18) } = opts;
        const sub = gsap.timeline({
          onComplete: () => startFloat(ref.current),
        });
        sub
          .to(ref.current, {
            scale: peakScale, opacity: 1, rotation,
            duration: r(0.18, 0.26), ease: 'back.out(2.5)',
          })
          .to(ref.current, {
            scale: 1, rotation: r(-6, 6),
            duration: r(0.12, 0.18), ease: 'power2.inOut',
          })
          .to(ref.current, {
            scale: r(0.55, 0.68), rotation: r(-10, 10),
            duration: r(0.14, 0.20), ease: 'power2.in', delay: r(0.05, 0.10),
          })
          .to(ref.current, {
            scale: r(1.06, 1.14), rotation: r(-8, 8),
            duration: r(0.18, 0.24), ease: 'back.out(2)',
          })
          .to(ref.current, {
            scale: 1, rotation: 0,
            duration: r(0.10, 0.16), ease: 'power2.inOut',
          });
        return sub;
      };

      const popStarBig = (ref) => {
        const sub = gsap.timeline({
          delay: 0.12,
          onComplete: () => startFloat(ref.current),
        });
        sub
          .to(ref.current, {
            scale: r(1.08, 1.14), opacity: 1, rotation: r(-15, 15),
            duration: 0.12, ease: 'back.out(2)',
          })
          .to(ref.current, {
            scale: 1, rotation: r(-5, 5),
            duration: 0.14, ease: 'power2.inOut',
          })
          .to(ref.current, {
            scale: r(0.55, 0.65), rotation: r(-12, 12),
            duration: 0.18, ease: 'power2.in', delay: 0.08,
          })
          .to(ref.current, {
            scale: r(1.08, 1.14), rotation: r(-10, 10),
            duration: 0.22, ease: 'back.out(2)',
          })
          .to(ref.current, {
            scale: 1, rotation: r(-4, 4),
            duration: 0.14, ease: 'power2.inOut',
          })
          .to(ref.current, {
            scale: r(0.78, 0.86), rotation: r(-8, 8),
            duration: 0.10, ease: 'power2.in', delay: 0.10,
          })
          .to(ref.current, {
            scale: r(1.04, 1.08), rotation: r(-6, 6),
            duration: 0.14, ease: 'back.out(3)',
          })
          .to(ref.current, {
            scale: 1, rotation: 0,
            duration: 0.10, ease: 'power2.inOut',
          });
        return sub;
      };

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl
        .fromTo(line1Ref.current,
          { y: 0 },
          { y: 0, duration: 0.001 }
        )
        .fromTo(line2Ref.current,
          { y: 0 },
          { y: 0, duration: 0.001 },
          '-=0.6'
        )
        .fromTo(line3Ref.current,
          { y: 0 },
          { y: 0, duration: 0.001 },
          '-=0.6'
        )
        .fromTo(line2Ref.current,
          { y: 0 },
          { y: 0, duration: 0.001 },
          '-=0.6'
        )
        .fromTo(line3Ref.current,
          { y: 0 },
          { y: 0, duration: 0.001 },
          '-=0.6'
        )
        .add(popStarBig(star1Ref),                           '-=0.4')
        .add(popStar(star2Ref, { peakScale: r(1.1, 1.2) }), '-=0.85')
        .add(popStar(star3Ref, { delay: 0.05 }),              '-=0.80');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return { heroRef, line1Ref, line2Ref, line3Ref, star1Ref, star2Ref, star3Ref };
};