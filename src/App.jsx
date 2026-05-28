import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Terms } from './components/common/Terms.jsx';
import { Navigation } from './components/navigation/Navigation.jsx';
import { HomePage } from './components/pages/HomePage.jsx';
import { PendoConsultantPage } from './components/pages/PendoConsultantPage.jsx';
import { GlobalStyles, theme } from './styles/GlobalStyles';

function App() {
  const [termsOpen, setTermsOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Navigation />
      <main style={{ position: 'relative', zIndex: 2 }} role="main">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
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