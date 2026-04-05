import { ThemeProvider } from 'styled-components';
import CaseStudies from './components/case-studies';
import { ConsentBanner } from './components/ConsentBanner';
import { Contact } from './components/Contact';
import { Experience } from './components/Experience';
import { Hero } from './components/hero-section/Hero';
import { Navigation } from './components/Navigation';
import { PendoExpert } from './components/PendoExpert';
import Testimonials from './components/Testimonials';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { GlobalStyles, theme } from './styles/GlobalStyles';

function App() {
  useSmoothScroll();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Navigation />
      <main style={{ position: 'relative', zIndex: 2 }}>
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