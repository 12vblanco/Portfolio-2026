import { useEffect } from 'react';

/**
 * useSectionSnap
 *
 * Magnetic snap that drives through Lenis (your smooth-scroll instance),
 * so it works in harmony with Lenis rather than fighting it.
 *
 * Pass the lenisRef returned by useSmoothScroll:
 *   const lenisRef = useSmoothScroll();
 *   useSectionSnap(lenisRef);
 *
 * ── Per-section offsets ───────────────────────────────────────────────────
 * SNAP_OFFSETS[id] = px from the section's top edge you want sitting at
 * the very top of the viewport when snapped.
 * 0   = section top flush with viewport top
 * 80  = snap 80px into the section (section top is 80px above viewport top)
 * -60 = leave 60px of space above the section top (e.g. for a sticky nav)
 */

// ─── YOUR TUNING ZONE ────────────────────────────────────────────────────────
const SNAP_OFFSETS = {
  home:       -80,   // nav height clearance
  works:       -96,
  pendo:       -60,
  experience:  -36,
  contact:     40,
};

const DEBOUNCE_MS    = 400;   // reduced from 600ms — snaps feel more responsive
const MAX_NUDGE_PX   = 600;   // won't snap if target is further than this
const THRESHOLD      = 0.25;  // section must fill this fraction of viewport
const LENIS_DURATION = 1.2;   // snap animation duration (seconds)
const MOBILE_BP      = 768;
// ─────────────────────────────────────────────────────────────────────────────

export function useSectionSnap(lenisRef) {
  useEffect(() => {
    const sectionIds = Object.keys(SNAP_OFFSETS);
    let debounceTimer = null;
    let isSnapping    = false;

    // ⚠️ Reduced from 300ms to 50ms. The original 300ms init delay combined
    // with the 600ms debounce meant the page felt frozen for ~900ms on load.
    // 50ms is enough to ensure Lenis has initialised before we hook in.
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

        // We want rect.top to equal -offset
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

      // Hook into Lenis scroll event — fires reliably during Lenis-driven scrolling
      const onLenisScroll = () => {
        if (isSnapping) return;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(nudge, DEBOUNCE_MS);
      };

      lenis.on('scroll', onLenisScroll);

      // Cleanup stored on closure
      initTimer._cleanup = () => {
        lenis.off('scroll', onLenisScroll);
        clearTimeout(debounceTimer);
      };
    }, 50);

    return () => {
      clearTimeout(initTimer);
      initTimer._cleanup?.();
    };
  }, [lenisRef]);
}