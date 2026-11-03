import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { FaCakeCandles, FaPaw, FaStar } from 'react-icons/fa6';
import CakeScene from '../components/birthday/CakeScene';
import CelebrationButton from '../components/birthday/CelebrationButton';
import MemoryTeaser from '../components/home/MemoryTeaser';
import Confetti, { type ConfettiHandle } from '../components/ui/Confetti';
import { birthdayConfig } from '../config/birthday';
import { useAudioActions, useAudioState } from '../context/audioPlayer';

export default function BirthdayPage() {
  const [celebrating, setCelebrating] = useState(false);
  const confettiRef = useRef<ConfettiHandle>(null);
  const timerRef = useRef<number | undefined>(undefined);
  const { activeTrackId, isPlaying } = useAudioState();
  const { play, stop } = useAudioActions();

  const birthdayPlaying =
    activeTrackId === birthdayConfig.birthdaySong.id && isPlaying;

  useEffect(() => {
    const stopOnHide = () => {
      if (document.visibilityState === 'hidden') stop();
    };

    window.addEventListener('pagehide', stop);
    document.addEventListener('visibilitychange', stopOnHide);

    return () => {
      window.clearTimeout(timerRef.current);
      window.removeEventListener('pagehide', stop);
      document.removeEventListener('visibilitychange', stopOnHide);
      stop();
    };
  }, [stop]);

  const handleCelebrate = (event?: MouseEvent<HTMLButtonElement>) => {
    if (!birthdayPlaying) {
      void play(birthdayConfig.birthdaySong);
    }
    setCelebrating(true);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setCelebrating(false), 4200);

    const clientX = event?.clientX ?? 0;
    const clientY = event?.clientY ?? 0;
    const x = clientX > 0 ? clientX : window.innerWidth / 2;
    const y = clientY > 0 ? clientY : window.innerHeight * 0.45;
    confettiRef.current?.burst({
      x,
      y,
      count: 120,
      spread: Math.PI * 1.35,
      power: 540,
    });
  };

  return (
    <div className="home">
      <section className="home__hero" aria-labelledby="hero-title">
        <div className="hero__copy">
          <span className="eyebrow">
            <FaCakeCandles aria-hidden="true" />
            {birthdayConfig.badge}
          </span>

          <h1 className="hero__title" id="hero-title">
            {birthdayConfig.kicker}
            <span className="hero__name">{birthdayConfig.title}</span>
          </h1>

          <p className="hero__message">{birthdayConfig.message}</p>

          <p className="hero__subtitle">
            <FaPaw aria-hidden="true" />
            {birthdayConfig.subtitle}
          </p>
        </div>

        <div className="hero__scene">
          <CakeScene celebrating={celebrating} />
        </div>
      </section>

      <section className="section celebration-section" aria-labelledby="celebrate-title">
        <div className="section__head">
          <span className="section__kicker">
            <FaStar aria-hidden="true" />
            Make a wish
          </span>
          <h2 className="section__title" id="celebrate-title">
            Ready for the magic?
          </h2>
        </div>

        <CelebrationButton
          label={birthdayConfig.celebrationLabel}
          hint={birthdayConfig.celebrationHint}
          onCelebrate={handleCelebrate}
        />
      </section>

      <MemoryTeaser />

      <Confetti ref={confettiRef} />
    </div>
  );
}
