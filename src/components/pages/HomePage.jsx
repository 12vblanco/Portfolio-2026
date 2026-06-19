import { ConsentBanner } from '../common/ConsentBanner.jsx';
import { Contact } from '../common/Contact.jsx';
import { SEO } from '../common/SEO.jsx';
import CaseStudies from '../home-section/case-studies/CaseStudies.jsx';
import { Experience } from '../home-section/Experience';
import { Hero } from '../home-section/Hero.jsx';
import { InsightsStrip } from '../home-section/InsightsStrip.jsx';
import Testimonials from '../home-section/Testimonials';


export const HomePage = ({ onOpenTerms }) => {



  return (
    <>
      <SEO
  title="Freelance Web Developer Edinburgh | Victor Blanco"
  description="Edinburgh freelance web developer building fast modern websites and expert Pendo consulting. 5-star rated on Upwork. Book a free call today."
  canonical="https://victorblancoweb.com"
  ogDescription="Freelance web developer based in Edinburgh. I build fast modern websites using React and GSAP, and provide expert Pendo consulting for SaaS teams."
  structuredData={[
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Victor Blanco",
      "url": "https://victorblancoweb.com",
      "inLanguage": "en-GB"
    },
    {
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
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Victor Blanco - Freelance Web Developer & Pendo Consultant",
      "description": "Edinburgh-based freelance web developer specialising in React websites and certified Pendo consulting for SaaS teams worldwide.",
      "url": "https://victorblancoweb.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Edinburgh",
        "addressRegion": "Scotland",
        "addressCountry": "GB"
      },
      "areaServed": ["Edinburgh", "United Kingdom", "Worldwide"],
      "priceRange": "$$",
      "sameAs": [
        "https://github.com/12vblanco",
        "https://www.upwork.com/freelancers/victorblanco",
        "https://dribbble.com/Victor-Blanco"
      ]
    }
  ]}
/>

      <Hero />
      <ConsentBanner onOpenTerms={onOpenTerms} />
      <CaseStudies />
      <Experience />
      <Testimonials />
      <InsightsStrip />
      <Contact onOpenTerms={onOpenTerms} />
    </>
  );
};