import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { birthdayConfig, type MusicTrackConfig } from '../config/birthday';
import {
  AudioActionsContext,
  AudioStateContext,
  type AudioActions,
  type AudioState,
  type TrackAvailability,
} from './audioPlayer';

const ALL_TRACKS: MusicTrackConfig[] = [
  birthdayConfig.birthdaySong,
  ...birthdayConfig.memories.map((memory) => memory.track),
];

const VOLUME_KEY = 'heer-betu-volume';

function readStoredVolume() {
  try {
    const raw = window.localStorage.getItem(VOLUME_KEY);
    if (raw === null) return 0.8;
    const stored = Number(raw);
    if (Number.isFinite(stored) && stored >= 0 && stored <= 1) return stored;
  } catch {
    // Private mode / storage unavailable — use the default.
  }
  return 0.8;
}

async function probeTrack(track: MusicTrackConfig, signal: AbortSignal): Promise<TrackAvailability> {
  try {
    const response = await fetch(track.src, { method: 'HEAD', cache: 'no-store', signal });
    if (!response.ok) return 'missing';
    const type = response.headers.get('content-type')?.toLowerCase() ?? '';
    if (type.includes('text/html')) return 'missing';
    return 'ready';
  } catch {
    return 'missing';
  }
}

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const handlersRef = useRef<{
    play: () => void;
    pause: () => void;
    ended: () => void;
    timeupdate: () => void;
    durationchange: () => void;
    loadedmetadata: () => void;
    waiting: () => void;
    playing: () => void;
    canplay: () => void;
    error: () => void;
  } | null>(null);
  const activeTrackRef = useRef<MusicTrackConfig | null>(null);
  const availabilityRef = useRef<Record<string, TrackAvailability>>({});
  const volumeRef = useRef(0.8);
  const pendingStartTimeRef = useRef<number | null>(null);

  const [availability, setAvailability] = useState<Record<string, TrackAvailability>>(() => {
    const initial: Record<string, TrackAvailability> = {};
    ALL_TRACKS.forEach((track) => {
      initial[track.id] = 'checking';
    });
    return initial;
  });
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(() => readStoredVolume());

  volumeRef.current = volume;
  availabilityRef.current = availability;

  const ensureAudio = useCallback(() => {
    if (audioRef.current) return audioRef.current;

    const audio = new Audio();
    audio.preload = 'none';
    audio.volume = volumeRef.current;
    audio.setAttribute('playsinline', '');

    const syncTime = () => setCurrentTime(Number.isFinite(audio.currentTime) ? audio.currentTime : 0);
    const syncDuration = () =>
      setDuration(Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration : 0);

    const applySeek = () => {
      if (pendingStartTimeRef.current !== null && pendingStartTimeRef.current > 0) {
        const time = pendingStartTimeRef.current;
        try {
          audio.currentTime = time;
          setCurrentTime(time);
          pendingStartTimeRef.current = null;
        } catch {
          // May retry on next ready event
        }
      }
    };

    const handlers = {
      play: () => {
        setIsPlaying(true);
        setIsLoading(false);
      },
      pause: () => setIsPlaying(false),
      ended: () => {
        setIsPlaying(false);
        setCurrentTime(0);
        try {
          audio.currentTime = 0;
        } catch {
          // Ignore browsers that do not allow a reset here.
        }
      },
      timeupdate: syncTime,
      durationchange: syncDuration,
      loadedmetadata: () => {
        syncDuration();
        applySeek();
      },
      waiting: () => setIsLoading(true),
      playing: () => {
        setIsPlaying(true);
        setIsLoading(false);
        setError(null);
        applySeek();
      },
      canplay: () => {
        setIsLoading(false);
        applySeek();
      },
      error: () => {
        setIsLoading(false);
        setIsPlaying(false);
        const trackId = activeTrackRef.current?.id;
        const code = audio.error?.code;
        if (trackId && code === 4) {
          setAvailability((current) => ({ ...current, [trackId]: 'missing' }));
        } else {
          setError('This little song could not be played. Please try again.');
        }
      },
    };

    audio.addEventListener('play', handlers.play);
    audio.addEventListener('pause', handlers.pause);
    audio.addEventListener('ended', handlers.ended);
    audio.addEventListener('timeupdate', handlers.timeupdate);
    audio.addEventListener('durationchange', handlers.durationchange);
    audio.addEventListener('loadedmetadata', handlers.loadedmetadata);
    audio.addEventListener('waiting', handlers.waiting);
    audio.addEventListener('playing', handlers.playing);
    audio.addEventListener('canplay', handlers.canplay);
    audio.addEventListener('error', handlers.error);

    handlersRef.current = handlers;
    audioRef.current = audio;
    return audio;
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    ALL_TRACKS.forEach((track) => {
      probeTrack(track, controller.signal)
        .then((status) => {
          if (controller.signal.aborted) return;
          setAvailability((current) => ({ ...current, [track.id]: status }));
        })
        .catch(() => {
          if (controller.signal.aborted) return;
          setAvailability((current) => ({ ...current, [track.id]: 'missing' }));
        });
    });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    return () => {
      const audio = audioRef.current;
      const handlers = handlersRef.current;
      if (audio) {
        if (handlers) {
          audio.removeEventListener('play', handlers.play);
          audio.removeEventListener('pause', handlers.pause);
          audio.removeEventListener('ended', handlers.ended);
          audio.removeEventListener('timeupdate', handlers.timeupdate);
          audio.removeEventListener('durationchange', handlers.durationchange);
          audio.removeEventListener('loadedmetadata', handlers.loadedmetadata);
          audio.removeEventListener('waiting', handlers.waiting);
          audio.removeEventListener('playing', handlers.playing);
          audio.removeEventListener('canplay', handlers.canplay);
          audio.removeEventListener('error', handlers.error);
        }
        audio.pause();
        audio.removeAttribute('src');
        try {
          audio.load();
        } catch {
          // Nothing else to clean up.
        }
      }
      audioRef.current = null;
      handlersRef.current = null;
    };
  }, []);

  const play = useCallback(async (track: MusicTrackConfig) => {
    const status = availabilityRef.current[track.id];
    if (status === 'missing') return false;

    const audio = ensureAudio();
    audio.loop = track.kind === 'birthday';
    setError(null);
    setBlocked(false);

    const targetStartTime = track.startTime ?? 0;

    if (activeTrackRef.current?.id !== track.id) {
      activeTrackRef.current = track;
      setActiveTrackId(track.id);
      setCurrentTime(targetStartTime);
      setDuration(0);
      setIsLoading(true);
      pendingStartTimeRef.current = targetStartTime > 0 ? targetStartTime : null;
      audio.src = track.src;
      try {
        audio.load();
      } catch {
        // The play() call below will surface any real failure.
      }
    }

    try {
      if (pendingStartTimeRef.current !== null && pendingStartTimeRef.current > 0) {
        try {
          audio.currentTime = pendingStartTimeRef.current;
        } catch {
          // Handled by event listener if audio isn't ready
        }
      }
      await audio.play();
      if (pendingStartTimeRef.current !== null && pendingStartTimeRef.current > 0) {
        try {
          audio.currentTime = pendingStartTimeRef.current;
          pendingStartTimeRef.current = null;
        } catch {
          // Audio might be transitioning, seek will apply on next event
        }
      }
      return true;
    } catch (caught) {
      setIsLoading(false);
      setIsPlaying(false);
      if (caught instanceof DOMException && caught.name === 'AbortError') {
        return false;
      }
      if (caught instanceof DOMException && caught.name === 'NotAllowedError') {
        setBlocked(true);
      } else {
        setError('This little song could not be played. Please try again.');
      }
      return false;
    }
  }, [ensureAudio]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (audio) audio.pause();
    setIsPlaying(false);
    setIsLoading(false);
  }, []);

  const toggle = useCallback(
    async (track: MusicTrackConfig) => {
      const audio = ensureAudio();
      if (activeTrackRef.current?.id === track.id && !audio.paused) {
        pause();
        return false;
      }
      return play(track);
    },
    [ensureAudio, pause, play],
  );

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.loop = false;
      audio.removeAttribute('src');
      try {
        audio.load();
      } catch {
        // Nothing else to clean up.
      }
    }
    activeTrackRef.current = null;
    setActiveTrackId(null);
    setIsPlaying(false);
    setIsLoading(false);
    setBlocked(false);
    setError(null);
    setCurrentTime(0);
    setDuration(0);
  }, []);

  const seek = useCallback((seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;
    const next = Math.min(Math.max(seconds, 0), audio.duration);
    try {
      audio.currentTime = next;
      setCurrentTime(next);
    } catch {
      // Some browsers refuse seeks before metadata is loaded.
    }
  }, []);

  const setVolume = useCallback((next: number) => {
    const clamped = Math.min(Math.max(next, 0), 1);
    volumeRef.current = clamped;
    setVolumeState(clamped);
    const audio = audioRef.current;
    if (audio) audio.volume = clamped;
    try {
      window.localStorage.setItem(VOLUME_KEY, String(clamped));
    } catch {
      // Storage is optional.
    }
  }, []);

  const actions = useMemo<AudioActions>(
    () => ({ play, toggle, pause, stop, seek, setVolume }),
    [pause, play, seek, setVolume, stop, toggle],
  );

  const state = useMemo<AudioState>(
    () => ({
      availability,
      activeTrackId,
      isPlaying,
      isLoading,
      blocked,
      error,
      currentTime,
      duration,
      volume,
    }),
    [
      activeTrackId,
      availability,
      blocked,
      currentTime,
      duration,
      error,
      isLoading,
      isPlaying,
      volume,
    ],
  );

  return (
    <AudioActionsContext.Provider value={actions}>
      <AudioStateContext.Provider value={state}>{children}</AudioStateContext.Provider>
    </AudioActionsContext.Provider>
  );
}


