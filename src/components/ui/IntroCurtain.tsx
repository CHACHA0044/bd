import { useEffect, useState } from 'react';
import { FaCakeCandles } from 'react-icons/fa6';

const SEEN_KEY = 'heer-betu-intro-seen';

type Phase = 'visible' | 'leaving' | 'gone';

function initialPhase(): Phase {
  try {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const seen = window.sessionStorage.getItem(SEEN_KEY) === '1';
    if (reduced || seen) return 'gone';
    return 'visible';
  } catch {
    return 'visible';
  }
}

export default function IntroCurtain() {
  const [phase, setPhase] = useState<Phase>(initialPhase);

  useEffect(() => {
    if (phase !== 'visible') return;

    try {
      window.sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      // Session storage is optional.
    }

    const leave = window.setTimeout(() => setPhase('leaving'), 900);
    return () => window.clearTimeout(leave);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'leaving') return;

    const gone = window.setTimeout(() => setPhase('gone'), 700);
    return () => window.clearTimeout(gone);
  }, [phase]);

  if (phase === 'gone') return null;

  return (
    <div className={`intro-curtain${phase === 'leaving' ? ' is-leaving' : ''}`} aria-hidden="true">
      <div className="intro-curtain__content">
        <span className="intro-curtain__mark">
          <FaCakeCandles />
        </span>
        <span className="intro-curtain__title">Heer Betu turns three!</span>
        <span className="intro-curtain__text">A little birthday magic is on its way…</span>
      </div>
    </div>
  );
}
