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
  title="Freelance Web Developer Edinburgh | Victor Blanco"
  description="Edinburgh-based freelance web developer specialising in React, GSAP, and Pendo consulting. Fast modern websites and 5-star rated Pendo services. Working with clients worldwide."
  canonical="https://victorblancoweb.com"
  ogDescription="Freelance web developer based in Edinburgh. I build fast modern websites using React and GSAP, and provide expert Pendo consulting for SaaS teams."
  structuredData={{
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Victor Blanco",
    "url": "https://victorblancoweb.com",
    "jobTitle": "Freelance Web Developer & Pendo Consultant",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Edinburgh",
      "addressRegion": "Scotland",
      "addressCountry": "GB"
    },
    "knowsAbout": [
      "Web Development",
      "React",
      "GSAP",
      "Pendo",
      "Frontend Development",
      "Product Analytics"
    ],
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