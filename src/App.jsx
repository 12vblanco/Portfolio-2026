import { useEffect, useRef, useState } from 'react';
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

  useEffect(() => {
        // Wait for the component to mount and stabilize
        const timer = setTimeout(() => {
            const getAnonymousId = () => {
                let id = localStorage.getItem('pendo_anonymous_id');
                if (!id) {
                    id = 'anon_' + Math.random().toString(36).substring(2, 15);
                    localStorage.setItem('pendo_anonymous_id', id);
                }
                return id;
            };

            if (window.pendo && window.pendo.initialize) {
                try {
                    window.pendo.initialize({
                        visitor: { id: getAnonymousId() },
                        account: { id: "victor-blanco-portfolio" },
                        disableDomMutationTracking: true  // Prevents React conflicts
                    });
                    console.log('Pendo initialized from React');
                } catch (error) {
                    console.warn('Pendo initialization error:', error);
                }
            }
        }, 1000); // Delay 1 second to ensure React is stable
        
        return () => clearTimeout(timer);
    }, []);

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