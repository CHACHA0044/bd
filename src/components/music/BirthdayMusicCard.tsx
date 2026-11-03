import { FaCakeCandles, FaMusic, FaPause, FaPlay, FaVolumeHigh, FaVolumeXmark } from 'react-icons/fa6';
import { birthdayConfig } from '../../config/birthday';
import { formatTime, useAudioActions, useAudioState } from '../../context/audioPlayer';
import Equalizer from '../ui/Equalizer';
import ProgressSlider from '../ui/ProgressSlider';

export default function BirthdayMusicCard() {
  const track = birthdayConfig.birthdaySong;
  const { availability, activeTrackId, isPlaying, isLoading, blocked, error, currentTime, duration, volume } =
    useAudioState();
  const { toggle, seek, setVolume } = useAudioActions();

  const status = availability[track.id] ?? 'checking';
  const ready = status === 'ready';
  const isActive = activeTrackId === track.id;
  const playing = isActive && isPlaying;
  const loading = isActive && isLoading;
  const time = isActive ? currentTime : 0;
  const total = isActive ? duration : 0;

  const statusLabel =
    status === 'checking'
      ? 'Tuning the music…'
      : status === 'missing'
        ? 'Music coming soon'
        : playing
          ? 'Now playing'
          : loading
            ? 'Starting the music…'
            : 'Ready when you are';

  return (
    <article className="music-card music-card--birthday" aria-label="Birthday song player">
      <div className="music-card__top">
        <span className="music-card__art music-card__art--birthday" aria-hidden="true">
          <FaCakeCandles />
        </span>
        <div className="music-card__info">
          <span className="music-card__eyebrow">The birthday song</span>
          <span className="music-card__title">{track.title}</span>
          <span className="music-card__status" aria-live="polite">
            {statusLabel}
          </span>
        </div>
        <Equalizer playing={playing} className="music-card__equals" />
      </div>

      {status === 'missing' ? (
        <p className="music-card__note">
          <FaMusic aria-hidden="true" />
          The birthday song is still warming up — it will be here very soon!
        </p>
      ) : (
        <>
          <div className="music-card__body">
            <div className="music-card__controls">
              <button
                type="button"
                className="music-button music-button--primary"
                onClick={() => void toggle(track)}
                disabled={!ready}
                aria-label={playing ? 'Pause the birthday song' : 'Play the birthday song'}
              >
                {playing ? <FaPause aria-hidden="true" /> : <FaPlay aria-hidden="true" />}
              </button>
              <div className="music-card__progress">
                <ProgressSlider
                  label="Birthday song progress"
                  value={time}
                  max={total}
                  disabled={!ready || total <= 0}
                  onChange={seek}
                />
                <div className="music-card__time">
                  <span>{formatTime(time)}</span>
                  <span>{total > 0 ? formatTime(total) : '0:00'}</span>
                </div>
              </div>
            </div>

            <div className="music-card__volume">
              <button
                type="button"
                className="music-button music-button--ghost music-button--small"
                onClick={() => setVolume(volume > 0 ? 0 : 0.8)}
                aria-label={volume > 0 ? 'Mute the music' : 'Unmute the music'}
              >
                {volume > 0 ? <FaVolumeHigh aria-hidden="true" /> : <FaVolumeXmark aria-hidden="true" />}
              </button>
              <ProgressSlider
                label="Music volume"
                value={volume}
                max={1}
                step={0.01}
                className="range--volume"
                onChange={setVolume}
              />
            </div>
          </div>

          {blocked && isActive && (
            <p className="music-card__hint">
              Tap play once more — your browser just needs a little nudge to start the music.
            </p>
          )}
          {error && isActive && (
            <p className="music-card__hint" role="status">
              {error}
            </p>
          )}
          {status === 'checking' && <p className="music-card__hint">Checking for the birthday song…</p>}
        </>
      )}
    </article>
  );
}
