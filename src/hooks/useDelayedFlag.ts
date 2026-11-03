import { useEffect, useState } from 'react';

/** Turns true after `delay` ms, or immediately when `activate` is called. */
export function useDelayedFlag(delay: number, enabled: boolean) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setReady(false);
      return;
    }
    const timer = window.setTimeout(() => setReady(true), delay);
    return () => window.clearTimeout(timer);
  }, [delay, enabled]);

  return [ready, () => setReady(true)] as const;
}
