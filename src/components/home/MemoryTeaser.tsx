import { FaChevronRight, FaImages } from 'react-icons/fa6';
import { birthdayConfig } from '../../config/birthday';

export default function MemoryTeaser() {
  const memories = birthdayConfig.memories;

  return (
    <section className="section teaser" aria-labelledby="teaser-title">
      <div className="teaser__copy">
        <span className="section__kicker">
          <FaImages aria-hidden="true" />
          Little memories
        </span>
        <h2 className="teaser__title" id="teaser-title">
          {birthdayConfig.galleryTeaserTitle}
        </h2>
        <p className="teaser__text">{birthdayConfig.galleryTeaserText}</p>
        <div className="teaser__actions">
          <a
            href="#/memories"
            className="teaser__gallery-btn"
            aria-label="Open the memory gallery"
          >
            <FaImages aria-hidden="true" />
            <span>Gallery</span>
            <FaChevronRight aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="teaser__gallery">
        <div className="teaser__grid">
          {memories.map((memory) => (
            <a
              className="teaser__photo"
              href="#/memories"
              key={memory.id}
              aria-label={`Open the memory gallery — ${memory.caption}`}
            >
              <picture>
                <source srcSet={memory.thumbnail} type="image/webp" />
                <img
                  src={memory.thumbnailFallback}
                  alt={memory.alt}
                  width={360}
                  height={360}
                  loading="lazy"
                />
              </picture>
              <span>{memory.caption}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
