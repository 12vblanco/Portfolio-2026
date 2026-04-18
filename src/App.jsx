import { useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Navigation } from './components/Navigation';
import { Terms } from './components/Terms.jsx';
import { HomePage } from './components/pages/HomePage.jsx';
import { PendoConsultantPage } from './components/pages/PendoConsultantPage.jsx';
import { GlobalStyles, theme } from './styles/GlobalStyles';

function App() {
  const star1Ref = useRef(null);
  const star2Ref = useRef(null);
  const star3Ref = useRef(null);

  const [termsOpen, setTermsOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Navigation star1Ref={star1Ref} star2Ref={star2Ref} star3Ref={star3Ref} />
      <main style={{ position: 'relative', zIndex: 2 }} role="main">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                star1Ref={star1Ref}
                star2Ref={star2Ref}
                star3Ref={star3Ref}
                onOpenTerms={() => setTermsOpen(true)}
              />
            }
          />
          <Route
            path="/pendo-consultant"
            element={
              <PendoConsultantPage
                onOpenTerms={() => setTermsOpen(true)}
              />
            }
          />
        </Routes>
        <Terms open={termsOpen} onClose={() => setTermsOpen(false)} />
      </main>
    </ThemeProvider>
  );
}

export default App;