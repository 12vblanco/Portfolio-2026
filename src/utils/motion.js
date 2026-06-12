// Respect the OS-level reduced motion preference. Animation effects
// early-return on this; content stays fully visible because initial
// hidden states are only ever set inside the skipped animation code.
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
