import { FaChevronRight, FaImages } from 'react-icons/fa6';
import { birthdayConfig } from '../../config/birthday';

const teaserMemories = birthdayConfig.memories.filter((_, index) => index % 2 === 0).slice(0, 3);

export default function MemoryTeaser() {
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
          <a href="#/memories" className="btn btn--primary">
            <FaImages aria-hidden="true" />
            Visit the memory gallery
            <FaChevronRight aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="teaser__gallery">
        <div className="teaser__grid">
          {teaserMemories.map((memory) => (
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
        <span className="teaser__sticker" aria-hidden="true">
          Six sweet
          <br />
          memories
        </span>
      </div>
    </section>
  );
}
