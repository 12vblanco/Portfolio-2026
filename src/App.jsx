import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Terms } from './components/common/Terms.jsx';
import { Navigation } from './components/navigation/Navigation.jsx';
import { HomePage } from './components/pages/HomePage.jsx';
import { InsightArticlePage } from './components/pages/InsightArticlePage.jsx';
import { InsightsIndexPage } from './components/pages/InsightsIndexPage.jsx';
import { LMDouglasCaseStudyPage } from './components/pages/LMDouglasCaseStudyPage.jsx';
import { NotFoundPage } from './components/pages/NotFoundPage.jsx';
import { OMSCaseStudyPage } from './components/pages/OMSCaseStudyPage.jsx';
import { SujinCaseStudyPage } from './components/pages/SujinCaseStudyPage.jsx';
import { OrchardCaseStudyPage } from './components/pages/OrchardCaseStudyPage.jsx';
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
          <Route
            path="/insights"
            element={
              <InsightsIndexPage
                onOpenTerms={() => setTermsOpen(true)}
              />
            }
          />
          <Route
            path="/insights/:slug"
            element={
              <InsightArticlePage
                onOpenTerms={() => setTermsOpen(true)}
              />
            }
          />
          <Route
            path="/OrchardCaseStudyPage"
            element={
              <OrchardCaseStudyPage
                onOpenTerms={() => setTermsOpen(true)}
              />
            }
          />
          <Route
            path="/LMDouglasCaseStudyPage"
            element={
              <LMDouglasCaseStudyPage
                onOpenTerms={() => setTermsOpen(true)}
              />
            }
          />
          <Route
            path="/OMSCaseStudyPage"
            element={
              <OMSCaseStudyPage
                onOpenTerms={() => setTermsOpen(true)}
              />
            }
          />
          <Route
            path="/SujinCaseStudyPage"
            element={
              <SujinCaseStudyPage
                onOpenTerms={() => setTermsOpen(true)}
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Terms open={termsOpen} onClose={() => setTermsOpen(false)} />
      </main>
    </ThemeProvider>
  );
}

export default App;