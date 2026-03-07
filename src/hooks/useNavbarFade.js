import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useNavbarFade = () => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      // Navbar is at top: 24px with approx 60px height
      // Start fading 16px (1rem) before navbar (at 100px from top)
      // Fully transparent when reaching navbar (at 84px from top)
      gsap.to(element, {
        opacity: 0,
        scrollTrigger: {
          trigger: element,
          start: 'top 100px', // Start fading when element top is 100px from viewport top
          end: 'top 84px',    // Fully faded at 84px (navbar area)
          scrub: true,
        }
      });
    }, element);

    return () => ctx.revert();
  }, []);

  return elementRef;
};
