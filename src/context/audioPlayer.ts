import { createContext, useContext } from 'react';
import type { MusicTrackConfig } from '../config/birthday';

export type TrackAvailability = 'checking' | 'ready' | 'missing';

export interface AudioState {
  availability: Record<string, TrackAvailability>;
  activeTrackId: string | null;
  isPlaying: boolean;
  isLoading: boolean;
  blocked: boolean;
  error: string | null;
  currentTime: number;
  duration: number;
  volume: number;
}

export interface AudioActions {
  play: (track: MusicTrackConfig) => Promise<boolean>;
  toggle: (track: MusicTrackConfig) => Promise<boolean>;
  pause: () => void;
  stop: () => void;
  seek: (seconds: number) => void;
  setVolume: (volume: number) => void;
}

export const AudioStateContext = createContext<AudioState | null>(null);
export const AudioActionsContext = createContext<AudioActions | null>(null);

export function useAudioState() {
  const state = useContext(AudioStateContext);
  if (!state) throw new Error('useAudioState must be used inside AudioPlayerProvider');
  return state;
}

export function useAudioActions() {
  const actions = useContext(AudioActionsContext);
  if (!actions) throw new Error('useAudioActions must be used inside AudioPlayerProvider');
  return actions;
}

export function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const whole = Math.floor(seconds);
  const minutes = Math.floor(whole / 60);
  const rest = Math.floor(whole % 60)
    .toString()
    .padStart(2, '0');
  return `${minutes}:${rest}`;
}
