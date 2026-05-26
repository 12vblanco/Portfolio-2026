import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { ConsentBanner } from '../common/ConsentBanner.jsx';
import { Contact } from '../common/Contact.jsx';
import { SEO } from '../common/SEO.jsx';
import { PendoCTA } from '../pendo-consultant/PendoCTA.jsx';
import { pageMetadata } from '../pendo-consultant/pendoData.js';
import { PendoExpert } from '../pendo-consultant/PendoExpert.jsx';
import { PendoHero } from '../pendo-consultant/PendoHero.jsx';
import { PendoInsights } from '../pendo-consultant/PendoInsights.jsx';

gsap.registerPlugin(ScrollTrigger);

export const PendoConsultantPage = ({ onOpenTerms }) => {
  const heroRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const star1Ref = useRef(null);
  const star2Ref = useRef(null);
  const star3Ref = useRef(null);
  const servicesRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Hero fade in animation
      if (heroRef.current) {
        gsap.fromTo(heroRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.01 }
        );
      }

      // Animate the title lines
      if (line1Ref.current) {
        gsap.to(line1Ref.current, {
          y: 0,
          duration: 0.6,
          delay: 0.2,
          ease: 'power3.out',
        });
      }
      
      if (line2Ref.current) {
        gsap.to(line2Ref.current, {
          y: 0,
          duration: 0.6,
          delay: 0.35,
          ease: 'power3.out',
        });
      }

      // Services stagger
      if (servicesRef.current) {
        ScrollTrigger.create({
          trigger: servicesRef.current,
          start: 'top 75%',
          once: true,
          onEnter: () => {
            if (servicesRef.current) {
              gsap.fromTo(
                servicesRef.current.querySelectorAll('[data-service]'),
                { y: 24, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
              );
            }
          },
        });
      }

      // FAQ stagger - DISABLED since FAQ now has its own scroll animation
      // Comment out or remove this section
      /*
      if (faqRef.current) {
        ScrollTrigger.create({
          trigger: faqRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            if (faqRef.current) {
              gsap.fromTo(
                faqRef.current.querySelectorAll('[data-faq]'),
                { y: 16, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out' }
              );
            }
          },
        });
      }
      */

      // CTA
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
    />

      <PendoHero
        heroRef={heroRef}
        line1Ref={line1Ref}
        line2Ref={line2Ref}
        star1Ref={star1Ref}
        star2Ref={star2Ref}
        star3Ref={star3Ref}
      />
      <PendoExpert />
      <PendoInsights /> 
      <PendoCTA ref={ctaRef} />
      <ConsentBanner onOpenTerms={onOpenTerms} />
      <Contact onOpenTerms={onOpenTerms} />
    </>
  );
};