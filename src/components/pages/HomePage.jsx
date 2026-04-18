import CaseStudies from '../case-studies/CaseStudies.jsx';
import { ConsentBanner } from '../ConsentBanner.jsx';
import { Contact } from '../Contact';
import { Experience } from '../Experience';
import { Hero } from '../hero-section/Hero';
import { PendoExpert } from '../PendoExpert';
import Testimonials from '../Testimonials';

export const HomePage = ({ star1Ref, star2Ref, star3Ref, onOpenTerms }) => {
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