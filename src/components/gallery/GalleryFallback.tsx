import { FaCircleInfo, FaPause, FaPlay } from 'react-icons/fa6';
import { birthdayConfig } from '../../config/birthday';
import { useAudioActions, useAudioState } from '../../context/audioPlayer';

export default function GalleryFallback() {
  const { availability, activeTrackId, isPlaying } = useAudioState();
  const { toggle } = useAudioActions();

  return (
    <div className="gallery-fallback">
      <p className="gallery-fallback__notice">
        <FaCircleInfo aria-hidden="true" />
        Your browser is showing our simpler photo view. All seven memories and their little songs are
        still here to enjoy.
      </p>

      <div className="gallery-fallback__grid">
        {birthdayConfig.memories.map((memory) => {
          const status = availability[memory.track.id] ?? 'checking';
          const ready = status === 'ready';
          const isActive = activeTrackId === memory.track.id;
          const playing = isActive && isPlaying;

          return (
            <article className="gallery-fallback__card" key={memory.id}>
              <div className="gallery-fallback__media">
                <picture>
                  <source srcSet={memory.photo} type="image/webp" />
                  <img
                    src={memory.photoFallback}
                    alt={memory.alt}
                    width={900}
                    height={900}
                    loading="lazy"
                  />
                </picture>
              </div>

              <div className="gallery-fallback__caption">
                <div className="gallery-fallback__caption-text">
                  <strong>{memory.caption}</strong>
                  <span>{memory.description}</span>
                </div>
                <button
                  type="button"
                  className="music-button music-button--primary"
                  onClick={() => void toggle(memory.track)}
                  disabled={!ready}
                  aria-label={
                    playing
                      ? `Pause ${memory.caption} music`
                      : `Play ${memory.caption} music`
                  }
                >
                  {playing ? <FaPause aria-hidden="true" /> : <FaPlay aria-hidden="true" />}
                </button>
              </div>

              {status === 'checking' && (
                <span className="gallery-fallback__note">Tuning the music…</span>
              )}
              {status === 'missing' && (
                <span className="gallery-fallback__note">
                  This little song is still on its way.
                </span>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
