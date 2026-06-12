import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

// Drop build-time head tags (see scripts/prerender.js) so the ones React
// mounts and manages are the only copies, otherwise the stale static title
// would keep winning over route changes.
document.querySelectorAll('[data-prerender]').forEach((el) => el.remove());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
);