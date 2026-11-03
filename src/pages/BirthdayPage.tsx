import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { FaCakeCandles, FaChevronRight, FaImages, FaMusic, FaPaw, FaStar } from 'react-icons/fa6';
import CakeScene from '../components/birthday/CakeScene';
import CelebrationButton from '../components/birthday/CelebrationButton';
import MemoryTeaser from '../components/home/MemoryTeaser';
import BirthdayMusicCard from '../components/music/BirthdayMusicCard';
import Confetti, { type ConfettiHandle } from '../components/ui/Confetti';
import { birthdayConfig } from '../config/birthday';
import { useAudioActions, useAudioState } from '../context/audioPlayer';

export default function BirthdayPage() {
  const [celebrating, setCelebrating] = useState(false);
  const confettiRef = useRef<ConfettiHandle>(null);
  const timerRef = useRef<number | undefined>(undefined);
  const { activeTrackId, isPlaying } = useAudioState();
  const { toggle } = useAudioActions();

  const birthdayPlaying =
    activeTrackId === birthdayConfig.birthdaySong.id && isPlaying;

  useEffect(() => {
    return () => window.clearTimeout(timerRef.current);
  }, []);

  const handleCelebrate = (event: MouseEvent<HTMLButtonElement>) => {
    setCelebrating(true);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setCelebrating(false), 4200);

    const x = event.clientX > 0 ? event.clientX : window.innerWidth / 2;
    const y = event.clientY > 0 ? event.clientY : window.innerHeight * 0.45;
    confettiRef.current?.burst({
      x,
      y,
      count: 120,
      spread: Math.PI * 1.35,
      power: 540,
    });
  };

  const handlePlayBirthdaySong = () => {
    const smooth =
      !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    document.getElementById('birthday-song')?.scrollIntoView({
      behavior: smooth ? 'smooth' : 'auto',
      block: 'center',
    });

    if (!birthdayPlaying) {
      void toggle(birthdayConfig.birthdaySong);
    }
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

          <div className="hero__actions">
            <a href="#/memories" className="btn btn--primary">
              <FaImages aria-hidden="true" />
              Explore the memories
              <FaChevronRight aria-hidden="true" />
            </a>
            <button type="button" className="btn btn--soft" onClick={handlePlayBirthdaySong}>
              <FaMusic aria-hidden="true" />
              Play the birthday song
            </button>
          </div>
        </div>

        <div className="hero__scene">
          <CakeScene celebrating={celebrating} />
        </div>
      </section>

      <MemoryTeaser />

      <section className="section" id="birthday-song" aria-labelledby="birthday-song-title">
        <div className="section__head">
          <span className="section__kicker">
            <FaMusic aria-hidden="true" />
            A little soundtrack
          </span>
          <h2 className="section__title" id="birthday-song-title">
            A song made for your day
          </h2>
          <p className="section__text">
            Press play and let the animals dance along with you.
          </p>
        </div>
        <BirthdayMusicCard />
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
          <p className="section__text">{birthdayConfig.surprise}</p>
        </div>

        <CelebrationButton
          label={birthdayConfig.celebrationLabel}
          hint={birthdayConfig.celebrationHint}
          onCelebrate={handleCelebrate}
        />
      </section>

      <Confetti ref={confettiRef} />
    </div>
  );
}
