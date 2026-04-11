import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import CaseStudies from './components/case-studies/CaseStudies.jsx';
import { ConsentBanner } from './components/ConsentBanner';
import { Contact } from './components/Contact';
import { Experience } from './components/Experience';
import { Hero } from './components/hero-section/Hero';
import { Navigation } from './components/Navigation';
import { PendoExpert } from './components/PendoExpert';
import Testimonials from './components/Testimonials';
import { useSectionSnap } from './hooks/useSectionSnap';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { GlobalStyles, theme } from './styles/GlobalStyles';

function App() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 800);
  
  // Only use smooth scroll hooks on desktop
  const lenisRef = isDesktop ? useSmoothScroll() : null;
  useSectionSnap(isDesktop ? lenisRef : null);
  
  // Handle resize to enable/disable smooth scroll dynamically
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 800);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Clean up ScrollTriggers on mobile to prevent scroll blocking
  useEffect(() => {
    if (!isDesktop && window.ScrollTrigger) {
      // Kill all ScrollTriggers on mobile
      window.ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
  }, [isDesktop]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Navigation />
      <main style={{ position: 'relative', zIndex: 2 }} role="main">
        <Hero />
        <ConsentBanner />
        <CaseStudies />
        <PendoExpert />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
    </ThemeProvider>
  );
}

export default App;