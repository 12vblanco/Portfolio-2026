import { useEffect } from 'react';

// ─── YOUR TUNING ZONE ────────────────────────────────────────────────────────
const DESKTOP_SNAP_OFFSETS = {
  home:       -80,
  works:      -96,
  pendo:      -60,
  experience: -36,
  contact:    40,
};

const DEBOUNCE_MS    = 600;
const MAX_NUDGE_PX   = 180;
const THRESHOLD      = 0.55;
const LENIS_DURATION = 1.2;
const MOBILE_BP      = 768; // Anything below this gets no snapping
// ─────────────────────────────────────────────────────────────────────────────

export function useSectionSnap(lenisRef) {
  useEffect(() => {
    // ✅ DISABLE ON MOBILE/TABLET - exit immediately
    if (typeof window !== 'undefined' && window.innerWidth <= MOBILE_BP) {
      return;
    }

    const sectionIds = Object.keys(DESKTOP_SNAP_OFFSETS);
    let debounceTimer = null;
    let isSnapping    = false;
    let cleanupFn = null;

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
      const offset  = DESKTOP_SNAP_OFFSETS[id] ?? 0;
      const rect    = section.getBoundingClientRect();

      const delta = rect.top - (-offset);
      if (Math.abs(delta) < 8)            return;
      if (Math.abs(delta) > MAX_NUDGE_PX) return;

      const target = window.scrollY + delta;
      isSnapping = true;

      if (lenis) {
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

      setTimeout(() => { isSnapping = false; }, LENIS_DURATION * 1000 + 400);
    };

    const onScroll = () => {
      if (isSnapping) return;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(nudge, DEBOUNCE_MS);
    };

    if (lenis) {
      lenis.on('scroll', onScroll);
      cleanupFn = () => {
        lenis.off('scroll', onScroll);
        clearTimeout(debounceTimer);
      };
    } else {
      window.addEventListener('scroll', onScroll);
      cleanupFn = () => {
        window.removeEventListener('scroll', onScroll);
        clearTimeout(debounceTimer);
      };
    }

    return () => {
      if (cleanupFn) cleanupFn();
    };
  }, [lenisRef]);
}