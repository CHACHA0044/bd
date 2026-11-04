import { useCallback, useEffect, useRef } from 'react';

/**
 * A single reusable audio element for short, local UI sounds.
 * Tapping something new stops the previous sound before starting the next,
 * so effects never overlap and no sound ever plays without a gesture.
 */
export function useSoundEffects() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentSrcRef = useRef<string | null>(null);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    try {
      audio.currentTime = 0;
    } catch {
      // Some browsers refuse a reset until metadata is available.
    }
  }, []);

  const play = useCallback(
    (src: string) => {
      if (typeof window === 'undefined') return;

      let audio = audioRef.current;
      if (!audio) {
        audio = new Audio();
        audio.preload = 'none';
        audio.setAttribute('playsinline', '');
        audioRef.current = audio;
      }

      stop();

      if (currentSrcRef.current !== src) {
        currentSrcRef.current = src;
        audio.src = src;
        try {
          audio.load();
        } catch {
          // play() below will surface any real failure.
        }
      }

      try {
        audio.currentTime = 0;
      } catch {
        // Ignore seek failures on browsers that are still loading the clip.
      }

      const started = audio.play();
      if (started && typeof started.catch === 'function') {
        started.catch(() => {
          // The browser may still be unlocking audio; stay silent.
        });
      }
    },
    [stop],
  );

  useEffect(() => {
    return () => {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.removeAttribute('src');
        try {
          audio.load();
        } catch {
          // Nothing left to clean up.
        }
      }
      audioRef.current = null;
      currentSrcRef.current = null;
    };
  }, []);

  return { play, stop };
}
