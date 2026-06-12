import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../../utils/motion';
import { ConsentBanner } from '../common/ConsentBanner.jsx';
import { Contact } from '../common/Contact.jsx';
import { SEO } from '../common/SEO.jsx';
import { PendoCTA } from '../pendo-consultant/PendoCTA.jsx';
import { faqStructuredData, insightsStructuredData, pageMetadata, pendoStructuredData } from '../pendo-consultant/pendoData.js';
import { PendoExpert } from '../pendo-consultant/PendoExpert.jsx';
import { PendoHero } from '../pendo-consultant/PendoHero.jsx';
import { PendoInsights } from '../pendo-consultant/PendoInsights.jsx';

gsap.registerPlugin(ScrollTrigger);

export const PendoConsultantPage = ({ onOpenTerms }) => {
  const ctaRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      if (ctaRef.current) {
        ScrollTrigger.create({
          trigger: ctaRef.current,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            if (ctaRef.current) {
              gsap.fromTo(ctaRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
              );
            }
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <SEO
        title={pageMetadata.title}
        description={pageMetadata.description}
        canonical={pageMetadata.canonical}
        ogTitle={pageMetadata.ogTitle}
        ogDescription={pageMetadata.ogDescription}
        ogImage={pageMetadata.ogImage}
        structuredData={[pendoStructuredData, insightsStructuredData, faqStructuredData]}
      />

      <PendoHero />
      <PendoExpert />
      <PendoInsights /> 
      <PendoCTA ref={ctaRef} />
      <ConsentBanner onOpenTerms={onOpenTerms} />
      <Contact onOpenTerms={onOpenTerms} />
    </>
  );
};