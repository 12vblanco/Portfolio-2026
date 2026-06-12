import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { StaticRouter } from 'react-router-dom';
import { ServerStyleSheet } from 'styled-components';
import App from './App.jsx';

// Renders a route to static HTML at build time (see scripts/prerender.js).
// With React 19, react-helmet-async renders head tags as hoistable elements
// inside the markup (the server context is never populated), so the prerender
// script extracts them from appHtml rather than from a helmet context.
export function render(url) {
  const sheet = new ServerStyleSheet();

  try {
    const appHtml = renderToString(
      sheet.collectStyles(
        <HelmetProvider>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </HelmetProvider>
      )
    );

    return { appHtml, styleTags: sheet.getStyleTags() };
  } finally {
    sheet.seal();
  }
}
