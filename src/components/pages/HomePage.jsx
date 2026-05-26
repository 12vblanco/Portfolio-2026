import { ConsentBanner } from '../common/ConsentBanner.jsx';
import { Contact } from '../common/Contact.jsx';
import { SEO } from '../common/SEO.jsx';
import CaseStudies from '../home-section/case-studies/CaseStudies.jsx';
import { Experience } from '../home-section/Experience';
import { Hero } from '../home-section/Hero.jsx';
import Testimonials from '../home-section/Testimonials';


export const HomePage = ({ star1Ref, star2Ref, star3Ref, onOpenTerms }) => {



  return (
    <>
      <SEO
        title="Freelance Web Developer & Pendo Consultant | Victor Blanco"
        description="Fast modern websites and expert Pendo consulting. Certified, 5-star rated on Upwork. Based in Edinburgh, working with clients worldwide."
        canonical="https://victorblancoweb.com"
        ogDescription="Edinburgh-based freelance Web Developer specializing in React, GSAP animations, and Pendo Consultant..."
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Victor Blanco",
          "url": "https://victorblancoweb.com",
          "jobTitle": "Freelance Web Developer & Pendo Consultant",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Edinburgh",
            "addressCountry": "GB"
          },
          "sameAs": [
            "https://github.com/12vblanco",
            "https://www.upwork.com/freelancers/victorblanco",
            "https://dribbble.com/Victor-Blanco"
          ]
        }}
      />

      <Hero star1Ref={star1Ref} star2Ref={star2Ref} star3Ref={star3Ref} />
      <ConsentBanner onOpenTerms={onOpenTerms} />
      <CaseStudies />
      <Experience />
      <Testimonials />
      <Contact onOpenTerms={onOpenTerms} />
    </>
  );
};