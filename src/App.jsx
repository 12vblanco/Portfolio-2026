import { ThemeProvider } from 'styled-components';
import CaseStudies from './components/case-studies/CaseStudies.jsx';
import { ConsentBanner } from './components/ConsentBanner';
import { Contact } from './components/Contact';
import { Experience } from './components/Experience';
import { Hero } from './components/hero-section/Hero';
import { Navigation } from './components/Navigation';
import { PendoExpert } from './components/PendoExpert';
import Testimonials from './components/Testimonials';
// import { useSectionSnap } from './hooks/useSectionSnap';
// import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useEffect } from 'react';
import { GlobalStyles, theme } from './styles/GlobalStyles';

function App() {
  
  // Add this useEffect inside the Experience component
useEffect(() => {
  // On mobile, kill any ScrollTriggers that might be capturing scroll events
  if (window.innerWidth <= 768 && window.ScrollTrigger) {
    window.ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars?.once !== true) {
        trigger.kill();
      }
    });
  }
}, []);

  // const lenisRef = useSmoothScroll();
  // useSectionSnap(lenisRef);

  // Simple mobile scroll fix
  useEffect(() => {
    // Only run on mobile
    if (window.innerWidth <= 768) {
      // Re-enable transitions after a short delay so scrolling isn't blocked
      const timer = setTimeout(() => {
        const style = document.createElement('style');
        style.textContent = `
          @media (max-width: 768px) {
            *, *::before, *::after {
              transition: revert !important;
            }
          }
        `;
        document.head.appendChild(style);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, []);

  // Add loaded class after a short delay to re-enable animations
  useEffect(() => {
    const timer = setTimeout(() => {
      document.body.classList.add('loaded');
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

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