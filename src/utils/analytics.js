// GA4 event helper. window.gtag only exists after cookie consent
// (see the consent-gated loader in index.html), so without consent
// this is a silent no-op.
export const trackEvent = (name, params = {}) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
};
