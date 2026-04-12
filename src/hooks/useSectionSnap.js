import { useEffect } from 'react';

// ─── YOUR TUNING ZONE ────────────────────────────────────────────────────────
const DESKTOP_SNAP_OFFSETS = {
  home:       -80,
  works:      -96,
  pendo:      -60,
  experience: -36,
  contact:    40,
};

const MOBILE_SNAP_OFFSETS = {
  home:       -60,
  works:      -50,
  pendo:      -40,
  experience: -20,
  contact:    180,
};

const DEBOUNCE_MS    = 600;   // wait longer after scroll stops before snapping
const MAX_NUDGE_PX   = 180;   // only snap if within 180px of target — prevents
                               // snapping the user back from a deliberate scroll
const THRESHOLD      = 0.55;  // section must fill >55% of viewport to be a candidate
const LENIS_DURATION = 1.2;
const MOBILE_BP      = 768;
// ─────────────────────────────────────────────────────────────────────────────

export function useSectionSnap(lenisRef) {
  useEffect(() => {
    const sectionIds = Object.keys(DESKTOP_SNAP_OFFSETS);
    let debounceTimer = null;
    let isSnapping    = false;
    let isMobile = window.innerWidth <= MOBILE_BP;

    const getSnapOffsets = () => isMobile ? MOBILE_SNAP_OFFSETS : DESKTOP_SNAP_OFFSETS;

    const handleResize = () => { isMobile = window.innerWidth <= MOBILE_BP; };
    window.addEventListener('resize', handleResize);

    const initTimer = setTimeout(() => {
      const lenis = lenisRef?.current;

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

        const section = getMostVisibleSection();
        if (!section) return;

        const id      = section.id;
        const offsets = getSnapOffsets();
        const offset  = offsets[id] ?? 0;
        const rect    = section.getBoundingClientRect();

        // delta = how far we need to scroll to place the section correctly
        const delta = rect.top - (-offset);
        if (Math.abs(delta) < 8)            return;
        if (Math.abs(delta) > MAX_NUDGE_PX) return;

        const target = window.scrollY + delta;
        isSnapping = true;

        if (!isMobile && lenis) {
          lenis.scrollTo(target, {
            duration: LENIS_DURATION,
            easing: (t) => t < 0.5
              ? 4 * t * t * t
              : 1 - Math.pow(-2 * t + 2, 3) / 2,
            onComplete: () => { isSnapping = false; },
          });
        } else {
          window.scrollTo({ top: target, behavior: 'smooth' });
          setTimeout(() => { isSnapping = false; }, LENIS_DURATION * 1000);
        }

        // Safety release in case onComplete never fires
        setTimeout(() => { isSnapping = false; }, LENIS_DURATION * 1000 + 400);
      };

      const onScroll = () => {
        if (isSnapping) return;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(nudge, DEBOUNCE_MS);
      };

      let cleanup;
      if (lenis && !isMobile) {
        lenis.on('scroll', onScroll);
        cleanup = () => {
          lenis.off('scroll', onScroll);
          clearTimeout(debounceTimer);
        };
      } else {
        window.addEventListener('scroll', onScroll);
        cleanup = () => {
          window.removeEventListener('scroll', onScroll);
          clearTimeout(debounceTimer);
        };
      }

      // Store cleanup so the outer return can call it
      initTimer._cleanup = cleanup;
    }, 50);

    return () => {
      clearTimeout(initTimer);
      initTimer._cleanup?.();
      window.removeEventListener('resize', handleResize);
    };
  }, [lenisRef]);
}