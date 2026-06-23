import { useState, useEffect, useCallback } from 'react';

export function useHash(defaultHash = '') {
  const [hash, setHashState] = useState(() => {
    return window.location.hash.replace('#', '') || defaultHash;
  });

  useEffect(() => {
    const handleHashChange = () => {
      setHashState(window.location.hash.replace('#', '') || defaultHash);
    };
    
    // Add event listener
    window.addEventListener('hashchange', handleHashChange);
    
    // Cleanup
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [defaultHash]);

  const setHash = useCallback((newHash) => {
    if (newHash !== hash) {
      window.location.hash = newHash;
    }
  }, [hash]);

  return [hash, setHash];
}
