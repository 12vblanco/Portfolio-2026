import { usePageTitle } from '../../hooks/usePageTitle.js';
import CaseStudies from '../case-studies/CaseStudies.jsx';
import { ConsentBanner } from '../ConsentBanner.jsx';
import { Contact } from '../Contact';
import { Experience } from '../Experience';
import { Hero } from '../hero-section/Hero';
import { PendoExpert } from '../PendoExpert';
import Testimonials from '../Testimonials';


export const HomePage = ({ star1Ref, star2Ref, star3Ref, onOpenTerms }) => {

usePageTitle(
  'Freelance Web Developer & Pendo Consultant | Victor Blanco',
  'Freelance Web Developer and Pendo Consultant based in Edinburgh. I build fast modern websites and help clients manage their Pendo subscription, set up analytics and improve onboarding.'
);

  return (
    <>
      <Hero star1Ref={star1Ref} star2Ref={star2Ref} star3Ref={star3Ref} />
      <ConsentBanner onOpenTerms={onOpenTerms} />
      <CaseStudies />
      <PendoExpert />
      <Experience />
      <Testimonials />
      <Contact onOpenTerms={onOpenTerms} />
    </>
  );
};