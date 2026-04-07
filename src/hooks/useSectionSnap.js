import { useEffect } from 'react';

const SNAP_OFFSETS = {
  home:       -80,
  works:      -96,
  pendo:      -60,
  experience: -36,
  contact:     40,
};

const DEBOUNCE_MS    = 600;
const MAX_NUDGE_PX   = 600;
const THRESHOLD      = 0.25;
const LENIS_DURATION = 1.2;
const MOBILE_BP      = 768;
 
export function useSectionSnap(lenisRef) {
  useEffect(() => {
    const sectionIds = Object.keys(SNAP_OFFSETS);
    let debounceTimer = null;
    let isSnapping    = false;
    let cleanupFn = null;  
    
    const initTimer = setTimeout(() => {
      const lenis = lenisRef?.current;
      if (!lenis) return;
 
      const sections = sectionIds
        .map(id => document.getElementById(id))
        .filter(Boolean);
 
      const getMostVisibleSection = () => {
        const vh = window.innerHeight;
        let best         = null;
        let bestCoverage = 0;
 
        sections.forEach(section => {
          const rect     = section.getBoundingClientRect();
          const visible  = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
          const coverage = Math.max(0, visible) / vh;
          if (coverage > bestCoverage) {
            bestCoverage = coverage;
            best = section;
          }
        });
 
        return bestCoverage >= THRESHOLD ? best : null;
      };
 
      const nudge = () => {
        if (isSnapping) return;
        if (window.innerWidth <= MOBILE_BP) return;
 
        const section = getMostVisibleSection();
        if (!section) return;
 
        const id     = section.id;
        const offset = SNAP_OFFSETS[id] ?? 0;
        const rect   = section.getBoundingClientRect();
 
        const delta  = rect.top - (-offset);
 
        if (Math.abs(delta) < 8)            return;
        if (Math.abs(delta) > MAX_NUDGE_PX) return;
 
        const target = window.scrollY + delta;
 
        isSnapping = true;
        lenis.scrollTo(target, {
          duration: LENIS_DURATION,
          easing: (t) => t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2,
          onComplete: () => { isSnapping = false; },
        });
 
        setTimeout(() => { isSnapping = false; }, LENIS_DURATION * 1000 + 400);
      };
 
      // Hook into Lenis scroll event
      const onLenisScroll = () => {
        if (isSnapping) return;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(nudge, DEBOUNCE_MS);
      };
 
      lenis.on('scroll', onLenisScroll);
 
      // ✅ Store cleanup function separately
      cleanupFn = () => {
        lenis.off('scroll', onLenisScroll);
        clearTimeout(debounceTimer);
      };
    }, 300);
 
    return () => {
      clearTimeout(initTimer);
      if (cleanupFn) cleanupFn();  
    };
  }, [lenisRef]);
}