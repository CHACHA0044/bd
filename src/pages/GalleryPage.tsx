import { useEffect, useRef, useState } from 'react';
import { FaArrowsLeftRight, FaImages, FaPause, FaPlay } from 'react-icons/fa6';
import GalleryFallback from '../components/gallery/GalleryFallback';
import CircularGallery from '../components/reactbits/CircularGallery';
import Equalizer from '../components/ui/Equalizer';
import { birthdayConfig } from '../config/birthday';
import { useAudioActions, useAudioState } from '../context/audioPlayer';
import { useWebGLSupport } from '../hooks/useWebGLSupport';

interface GalleryApi {
  open: (index: number) => void;
  focus: (index: number) => void;
  close: () => void;
}

const memories = birthdayConfig.memories;

const galleryItems = memories.map((memory) => ({
  image: memory.photo,
  text: memory.caption,
  alt: memory.alt,
  description: memory.description ?? '',
}));

export default function GalleryPage() {
  const webgl = useWebGLSupport();
  const galleryRef = useRef<GalleryApi | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { play, toggle, stop } = useAudioActions();
  const { activeTrackId, isPlaying } = useAudioState();

  const activeMemory = memories[activeIndex] ?? memories[0];

  const selectMemory = (index: number) => {
    setActiveIndex(index);
    galleryRef.current?.focus(index);
  };

  useEffect(() => {
    void play(activeMemory.track);
  }, [activeMemory, play]);

  useEffect(() => {
    const stopOnHide = () => {
      if (document.visibilityState === 'hidden') stop();
    };

    window.addEventListener('pagehide', stop);
    document.addEventListener('visibilitychange', stopOnHide);

    return () => {
      window.removeEventListener('pagehide', stop);
      document.removeEventListener('visibilitychange', stopOnHide);
      stop();
    };
  }, [stop]);

  const trackPlaying = activeTrackId === activeMemory.track.id && isPlaying;

  return (
    <div className="gallery-page">
      <header className="gallery-hero">
        <span className="eyebrow">
          <FaImages aria-hidden="true" />
          Our memories
        </span>
        <h1 className="gallery-hero__title">{birthdayConfig.galleryTitle}</h1>
        <p className="gallery-hero__text">{birthdayConfig.galleryIntro}</p>
        <span className="gallery-hint">
          <FaArrowsLeftRight aria-hidden="true" />
          {birthdayConfig.galleryHint}
        </span>
      </header>

      {webgl === null && (
        <div className="gallery-skeleton" role="status" aria-live="polite">
          Waking up the photo carousel…
        </div>
      )}

      {webgl === false && <GalleryFallback />}

      {webgl === true && (
        <div className="gallery-shell">
          <div className="gallery-stage">
            <CircularGallery
              items={galleryItems}
              bend={2.8}
              textColor="#634C42"
              borderRadius={0.09}
              font="bold 22px 'Fredoka Variable', Fredoka, sans-serif"
              scrollSpeed={2.1}
              scrollEase={0.06}
              itemSize={1}
              itemAspect={1}
              gap={0.34}
              wave={0.8}
              fadeEdges={0.14}
              shadow={0.28}
              snap
              autoScroll={0}
              intro
              onActiveChange={(index: number) => setActiveIndex(index)}
              apiRef={galleryRef}
              className="gallery-canvas"
            />
          </div>

          <div className="gallery-dots" role="group" aria-label="Choose a memory">
            {memories.map((memory, index) => (
              <button
                key={memory.id}
                type="button"
                className={`gallery-dot${index === activeIndex ? ' is-active' : ''}`}
                onClick={() => selectMemory(index)}
                aria-label={`Show memory ${index + 1}: ${memory.caption}`}
                aria-pressed={index === activeIndex}
              >
                <picture>
                  <source srcSet={memory.thumbnail} type="image/webp" />
                  <img
                    src={memory.thumbnailFallback}
                    alt=""
                    width={360}
                    height={360}
                    loading="lazy"
                  />
                </picture>
              </button>
            ))}
          </div>

          <div className="gallery-bottom">
            <div className="gallery-selected">
              <span className="gallery-selected__eyebrow">
                Memory {activeIndex + 1} of {memories.length}
              </span>
              <h2 className="gallery-selected__title">{activeMemory.caption}</h2>
              {activeMemory.description && (
                <p className="gallery-selected__text">{activeMemory.description}</p>
              )}
              <button
                type="button"
                className={`gallery-sound-pill${trackPlaying ? ' is-playing' : ''}`}
                onClick={() => void toggle(activeMemory.track)}
                aria-label={
                  trackPlaying
                    ? `Pause ${activeMemory.track.title}`
                    : `Play ${activeMemory.track.title}`
                }
              >
                <Equalizer playing={trackPlaying} className="gallery-sound-pill__eq" />
                <span className="gallery-sound-pill__title">{activeMemory.track.title}</span>
                {trackPlaying ? <FaPause aria-hidden="true" /> : <FaPlay aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
