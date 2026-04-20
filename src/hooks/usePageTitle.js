// Create a file: hooks/usePageTitle.js
import { useEffect } from 'react';

export function usePageTitle(title, description) {
  useEffect(() => {
    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && description) {
      metaDesc.setAttribute('content', description);
    }
  }, [title, description]);
}