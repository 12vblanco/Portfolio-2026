import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const MOBILE_BP = 768;

export const useSmoothScroll = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Only use Lenis on desktop/tablet (not mobile)
    if (window.innerWidth <= MOBILE_BP) {
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

    // ⚠️ Only disable lag smoothing on desktop where Lenis is active.
    // On mobile, lag smoothing should remain enabled — disabling it
    // globally caused scroll freezes when the browser tab briefly lost
    // focus (common on mobile) because nothing was driving lenis.raf.
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerFn);
      // Restore lag smoothing default when Lenis is torn down
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, []);

  return lenisRef;
};