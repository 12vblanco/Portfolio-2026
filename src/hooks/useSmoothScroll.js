import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const MOBILE_BP = 768;

export const useSmoothScroll = () => {
  const lenisRef = useRef(null);

  useGSAP(() => {
    // Only use Lenis on desktop/tablet (not mobile)
    if (typeof window !== 'undefined' && window.innerWidth <= MOBILE_BP) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const tickerFn = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFn);
    
    // Safely set lag smoothing
    try {
      gsap.ticker.lagSmoothing(0);
    } 
    catch  {
      // Ignore in React strict mode
    }

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      gsap.ticker.remove(tickerFn);
      try {
        gsap.ticker.lagSmoothing(500, 33);
      } catch (error) {
        // Ignore cleanup errors
      }
    };
  }, []);

  return lenisRef;
};