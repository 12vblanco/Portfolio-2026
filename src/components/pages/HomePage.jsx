import { usePageTitle } from '../../hooks/usePageTitle.js';
import { ConsentBanner } from '../common/ConsentBanner.jsx';
import { Contact } from '../common/Contact.jsx';
import CaseStudies from '../home-section/case-studies/CaseStudies.jsx';
import { Experience } from '../home-section/Experience';
import { Hero } from '../home-section/Hero.jsx';
import Testimonials from '../home-section/Testimonials';


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
      <Experience />
      <Testimonials />
      <Contact onOpenTerms={onOpenTerms} />
    </>
  );
};