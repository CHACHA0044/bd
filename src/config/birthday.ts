/**
 * ─────────────────────────────────────────────────────────────
 *  HEER BETU'S BIRTHDAY CONFIG
 *  Everything you are likely to change lives in this one file.
 * ─────────────────────────────────────────────────────────────
 *
 *  Photos
 *  ------
 *  Put your original photographs in the `photos/` folder at the project
 *  root, then run `npm run photos`. The script creates square, optimised
 *  copies in `public/photos/` (the originals are never modified).
 *  The six generated files are always `photo-1` … `photo-6`.
 *
 *  Music
 *  -----
 *  Place the birthday song at  public/audio/birthday-song.mp3
 *  Place the six memory songs at public/audio/photo-1.mp3 … photo-6.mp3
 *  Any file that is missing will simply show a friendly "music coming
 *  soon" state — the site never shows a broken player.
 *
 *  Captions, titles, alt text and audio paths can all be edited below.
 */

export interface MusicTrackConfig {
  /** A stable id used by the shared audio player. */
  id: string;
  /** Shown in the music card. */
  title: string;
  /** Path inside the public folder. */
  src: string;
  kind: 'birthday' | 'memory';
}

export interface MemoryConfig {
  id: string;
  /** Square, optimised image used by the circular gallery. */
  photo: string;
  /** JPEG fallback for browsers without WebP. */
  photoFallback: string;
  /** Small square image for the memory cards and home-page teaser. */
  thumbnail: string;
  thumbnailFallback: string;
  /** Describe the photograph for screen readers. */
  alt: string;
  /** Short, sweet caption shown in the gallery. */
  caption: string;
  /** Optional one-line note shown when a photo is opened. Leave empty to hide. */
  description?: string;
  track: MusicTrackConfig;
}

export const birthdayConfig = {
  name: 'Heer Betu',
  age: 3,

  /* ── Words ─────────────────────────────────────────────────── */
  headline: 'Happy Birthday Heer Betu!',
  kicker: 'Happy Birthday',
  title: 'Heer Betu!',
  message:
    'Three years of smiles, giggles, cuddles and endless magic. Keep shining, our little princess!',
  subtitle: 'Our little animal friends have come to celebrate with you!',
  surprise:
    'You are loved to the moon and back, little star. May every day be as sweet as this one.',
  badge: '3 Years of Magic',
  celebrationLabel: "Let's Celebrate!",
  celebrationHint: 'Tap the little rocket and watch the magic!',
  footer: 'Made with lots of love for Heer Betu',

  /* ── Gallery wording ──────────────────────────────────────── */
  galleryTeaserTitle: 'A Little Collection of Happy Memories',
  galleryTeaserText: "Let's look at some of your sweetest moments!",
  galleryTitle: "Heer Betu's Happy Memories",
  galleryIntro: 'Six little moments, six little melodies — all wrapped in love.',
  galleryHint: 'Swipe, drag or use the arrow keys to wander through the memories.',

  /* ── The birthday song ────────────────────────────────────── */
  birthdaySong: {
    id: 'birthday-song',
    title: "Heer Betu's Birthday Song",
    src: '/audio/birthday-song.mp3',
    kind: 'birthday',
  } satisfies MusicTrackConfig,

  /* ── Six memories ─────────────────────────────────────────── */
  memories: [
    {
      id: 'memory-1',
      photo: '/photos/photo-1.webp',
      photoFallback: '/photos/photo-1.jpg',
      thumbnail: '/photos/thumbs/photo-1.webp',
      thumbnailFallback: '/photos/thumbs/photo-1.jpg',
      alt: 'Heer Betu smiling brightly in a favourite family photograph',
      caption: 'Little Sunshine',
      description: 'That smile that makes every day brighter.',
      track: {
        id: 'photo-1',
        title: 'Little Sunshine Song',
        src: '/audio/photo-1.mp3',
        kind: 'memory',
      },
    },
    {
      id: 'memory-2',
      photo: '/photos/photo-2.webp',
      photoFallback: '/photos/photo-2.jpg',
      thumbnail: '/photos/thumbs/photo-2.webp',
      thumbnailFallback: '/photos/thumbs/photo-2.jpg',
      alt: 'Heer Betu sharing a happy, giggly moment with family',
      caption: 'Sweet Smiles',
      description: 'Giggles, cuddles and a little bit of mischief.',
      track: {
        id: 'photo-2',
        title: 'Sweet Smiles Song',
        src: '/audio/photo-2.mp3',
        kind: 'memory',
      },
    },
    {
      id: 'memory-3',
      photo: '/photos/photo-3.webp',
      photoFallback: '/photos/photo-3.jpg',
      thumbnail: '/photos/thumbs/photo-3.webp',
      thumbnailFallback: '/photos/thumbs/photo-3.jpg',
      alt: 'A warm birthday memory of Heer Betu enjoying a happy celebration',
      caption: 'Happy Moments',
      description: 'A little snapshot of a very big smile.',
      track: {
        id: 'photo-3',
        title: 'Happy Moments Song',
        src: '/audio/photo-3.mp3',
        kind: 'memory',
      },
    },
    {
      id: 'memory-4',
      photo: '/photos/photo-4.webp',
      photoFallback: '/photos/photo-4.jpg',
      thumbnail: '/photos/thumbs/photo-4.webp',
      thumbnailFallback: '/photos/thumbs/photo-4.jpg',
      alt: 'Heer Betu looking curious and delightful during a family moment',
      caption: 'Our Little Star',
      description: 'Shining in every single frame.',
      track: {
        id: 'photo-4',
        title: 'Our Little Star Song',
        src: '/audio/photo-4.mp3',
        kind: 'memory',
      },
    },
    {
      id: 'memory-5',
      photo: '/photos/photo-5.webp',
      photoFallback: '/photos/photo-5.jpg',
      thumbnail: '/photos/thumbs/photo-5.webp',
      thumbnailFallback: '/photos/thumbs/photo-5.jpg',
      alt: 'Heer Betu on a tiny adventure, full of wonder',
      caption: 'Tiny Adventures',
      description: 'The world is one big playground.',
      track: {
        id: 'photo-5',
        title: 'Tiny Adventures Song',
        src: '/audio/photo-5.mp3',
        kind: 'memory',
      },
    },
    {
      id: 'memory-6',
      photo: '/photos/photo-6.webp',
      photoFallback: '/photos/photo-6.jpg',
      thumbnail: '/photos/thumbs/photo-6.webp',
      thumbnailFallback: '/photos/thumbs/photo-6.jpg',
      alt: 'A precious family memory of Heer Betu being loved and celebrated',
      caption: 'Precious Memories',
      description: 'Moments we will keep in our hearts forever.',
      track: {
        id: 'photo-6',
        title: 'Precious Memories Song',
        src: '/audio/photo-6.mp3',
        kind: 'memory',
      },
    },
  ] satisfies MemoryConfig[],
} as const;

export type BirthdayConfig = typeof birthdayConfig;
