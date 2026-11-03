# Happy Birthday Heer Betu!

A warm, playful, mobile-first birthday website for Heer Betu's third birthday. It combines a hand-drawn animal cake scene, a WebGL circular memory gallery, a flying celebration button, confetti, and a shared music player for the birthday song and six memory songs.

## What is inside

- **Birthday home page** — playful hero, animated cake scene with eight animal friends, birthday song player, memory teaser, and a flying "Let's Celebrate!" button with confetti.
- **Memory gallery** — six square photographs in a draggable, swipeable React Bits circular gallery, with a matching music card for the selected memory and a card grid fallback for browsers without WebGL2.
- **Shared audio player** — one audio element for the whole site, per-track availability checks, play/pause, seeking, volume, mute, and friendly "music coming soon" states when a file has not been added yet.
- **Thoughtful details** — hash-based routing for static hosting, lazy-loaded gallery and flying button, reduced-motion support, visible keyboard focus, safe-area padding, and no horizontal overflow on small screens.

## Getting started

```bash
npm install
npm run dev
```

Open the URL printed by Vite (usually `http://localhost:5173`).

Useful scripts:

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Type-check and create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run typecheck` | Run the TypeScript compiler without emitting files |
| `npm run lint` | Run ESLint |
| `npm run photos` | Regenerate the optimised square photos from `photos/` |

## Add the music

The site works without audio, but the players are designed for seven tracks:

```
public/audio/birthday-song.mp3
public/audio/photo-1.mp3
public/audio/photo-2.mp3
public/audio/photo-3.mp3
public/audio/photo-4.mp3
public/audio/photo-5.mp3
public/audio/photo-6.mp3
```

Drop the files in place and refresh. Any missing track shows "Music coming soon" instead of a broken player. Track titles and paths live in `src/config/birthday.ts`.

To use a different file format, update the corresponding `src` in `src/config/birthday.ts` (for example `.m4a` or `.ogg`).

## Replace the photos

1. Put the original photographs in `photos/` (JPG, PNG, WebP, AVIF, HEIC, or TIFF are accepted by the script).
2. Run `npm run photos`.
3. The script writes square, attention-cropped copies to `public/photos/` and `public/photos/thumbs/`:

   - `photo-1` … `photo-6` at 900×900, WebP plus JPEG fallback
   - `thumbs/photo-1` … `photo-6` at 360×360, WebP plus JPEG fallback

The originals are never modified. The generated files are what the site uses.

To change captions, descriptions, alt text, or audio titles, edit the `memories` array in `src/config/birthday.ts`.

## Customise the words

Everything you are likely to change is in `src/config/birthday.ts`:

- name, age, headline, message, subtitle, badge, footer
- celebration button label and hint
- gallery title, intro, hint, and teaser copy
- birthday song and memory track details

## Project structure

```
photos/                     Original photographs (input for the photo script)
public/
  audio/                    Birthday and memory songs
  photos/                   Generated square gallery images
  favicon.svg
  apple-touch-icon.png
scripts/
  process-photos.mjs        Sharp-based photo pipeline
  photo-manifest.json       Record of the last photo run
src/
  components/
    animals/                Hand-drawn SVG animal friends
    birthday/               Cake, cake scene, celebration button
    gallery/                WebGL fallback grid
    home/                   Memory teaser
    layout/                 Header and footer
    music/                  Birthday and memory music cards
    reactbits/              Circular Gallery and Flying Button
    ui/                     Confetti, equalizer, sliders, loaders, intro
  config/birthday.ts        All birthday content and audio configuration
  context/                  Shared audio provider and hooks
  hooks/                    Hash routing, WebGL detection, delayed flags
  pages/                    Birthday and gallery pages
  App.tsx
  main.tsx
  index.css
```

## Deploy to Vercel

1. Push the repository to GitHub.
2. Import the repository in Vercel.
3. Keep the detected settings:

   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Output directory:** `dist`

4. Deploy.

The site uses hash routing (`#/` and `#/memories`), so deep links work on any static host. The included `vercel.json` also provides a safe SPA rewrite.

The gallery and flying button are split into their own lazy-loaded chunks. WebGL2 is detected before the circular gallery mounts; older devices get a fully usable card grid instead.

## A note on autoplay

Browsers block music that starts without a tap. The site therefore never autoplays. Press play on the birthday song card, use the hero's "Play the birthday song" button, or press play on a memory card. If a browser blocks playback anyway, the player shows a gentle "tap play once more" hint.
