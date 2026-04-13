import { useRef, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import CaseStudies from './components/case-studies/CaseStudies.jsx';
import { ConsentBanner } from './components/ConsentBanner';
import { Contact } from './components/Contact';
import { Experience } from './components/Experience';
import { Hero } from './components/hero-section/Hero';
import { Navigation } from './components/Navigation';
import { PendoExpert } from './components/PendoExpert';
import { Terms } from './components/Terms.jsx';
import Testimonials from './components/Testimonials';
import { useSectionSnap } from './hooks/useSectionSnap';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { GlobalStyles, theme } from './styles/GlobalStyles';

function App() {
  const lenisRef = useSmoothScroll();
  useSectionSnap(lenisRef);

  const star1Ref = useRef(null);
  const star2Ref = useRef(null);
  const star3Ref = useRef(null);

  const [termsOpen, setTermsOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Navigation star1Ref={star1Ref} star2Ref={star2Ref} star3Ref={star3Ref} />
      <main style={{ position: 'relative', zIndex: 2 }} role="main">
        <Hero star1Ref={star1Ref} star2Ref={star2Ref} star3Ref={star3Ref} />
        <ConsentBanner onOpenTerms={() => setTermsOpen(true)} />
        <CaseStudies />
        <PendoExpert />
        <Experience />
        <Testimonials />
        <Contact onOpenTerms={() => setTermsOpen(true)} />
        <Terms open={termsOpen} onClose={() => setTermsOpen(false)} />
      </main>
    </ThemeProvider>
  );
}

export default App;