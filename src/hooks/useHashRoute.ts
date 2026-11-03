import { useEffect, useState } from 'react';

export type SiteRoute = 'home' | 'memories';

function parseHash(hash: string): SiteRoute {
  const clean = hash.replace(/^#\/?/, '').replace(/\/+$/, '').toLowerCase();
  if (clean === 'memories' || clean === 'gallery') return 'memories';
  return 'home';
}

export function useHashRoute() {
  const [route, setRoute] = useState<SiteRoute>(() => parseHash(window.location.hash));

  useEffect(() => {
    const onChange = () => setRoute(parseHash(window.location.hash));
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
}
