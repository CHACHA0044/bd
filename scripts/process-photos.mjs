/**
 * Creates the square, web-ready copies used by the gallery.
 *
 * - Original photographs live in /photos and are never modified.
 * - Output goes to /public/photos (webp + jpeg fallbacks, plus thumbnails).
 * - Exactly six photographs are used. Files are sorted naturally, so
 *   "… at 9.01 PM" comes before "… at 10.11 PM".
 *
 * Run with: npm run photos
 */
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceCandidates = [path.join(root, 'photos'), path.join(root, 'gallery')];
const outputDir = path.join(root, 'public', 'photos');
const thumbDir = path.join(outputDir, 'thumbs');
const manifestPath = path.join(root, 'scripts', 'photo-manifest.json');

const LIMIT = Number(process.env.PHOTO_LIMIT || 7);
const FULL_SIZE = 900;
const THUMB_SIZE = 360;
const EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
const PASTELS = ['#F7C9D4', '#CDECCF', '#C8E7FA', '#FFE69A', '#DDD0FF', '#FFD7C2'];

function naturalSort(a, b) {
  return a.localeCompare(b, 'en', { numeric: true, sensitivity: 'base' });
}

function placeholderSvg(index) {
  const pastel = PASTELS[index % PASTELS.length];
  return Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="900" height="900" viewBox="0 0 900 900">
      <defs>
        <radialGradient id="g" cx="50%" cy="42%" r="70%">
          <stop offset="0%" stop-color="#FFFDF8"/>
          <stop offset="100%" stop-color="${pastel}"/>
        </radialGradient>
      </defs>
      <rect width="900" height="900" fill="url(#g)"/>
      <circle cx="450" cy="430" r="210" fill="#FFF8EB" opacity=".82"/>
      <path d="M450 280l30 87 92 4-72 58 24 90-74-50-74 50 24-90-72-58 92-4z" fill="${pastel}"/>
      <text x="450" y="710" text-anchor="middle" font-family="sans-serif" font-size="44" fill="#634C42" opacity=".75">A little memory</text>
    </svg>
  `);
}

async function findSources() {
  for (const dir of sourceCandidates) {
    try {
      const entries = await readdir(dir, { withFileTypes: true });
      const images = entries
        .filter((entry) => entry.isFile() && EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
        .map((entry) => path.join(dir, entry.name))
        .sort((a, b) => naturalSort(path.basename(a), path.basename(b)));
      if (images.length > 0) return { dir, images };
    } catch {
      // Try the next folder.
    }
  }
  return { dir: null, images: [] };
}

async function main() {
  await mkdir(outputDir, { recursive: true });
  await mkdir(thumbDir, { recursive: true });

  const { dir, images } = await findSources();
  const chosen = images.slice(0, LIMIT);
  const manifest = [];

  console.log(`Source folder: ${dir ?? '(none found, using placeholders)'}`);
  console.log(`Found ${images.length} image(s); generating ${LIMIT}.`);

  for (let index = 0; index < LIMIT; index += 1) {
    const number = index + 1;
    const source = chosen[index] ?? null;
    let square;

    // Per-photo crop position overrides (1-indexed).
    // 'top'  = show more of the top of the image (preserve heads).
    // default = sharp.strategy.attention (AI-based saliency).
    const CROP_OVERRIDES = {
      4: 'top',   // "Our Little Star" — preserve the child's head
      7: 'top',   // "Pure Joy" — show more of the top (move crop up)
    };

    if (source) {
      const cropPosition = CROP_OVERRIDES[number] ?? sharp.strategy.attention;
      square = await sharp(source)
        .rotate()
        .resize(FULL_SIZE, FULL_SIZE, {
          fit: 'cover',
          position: cropPosition,
          withoutEnlargement: false,
        })
        .toBuffer();
    } else {
      square = await sharp(placeholderSvg(index)).resize(FULL_SIZE, FULL_SIZE).png().toBuffer();
    }

    const base = path.join(outputDir, `photo-${number}`);
    const thumbBase = path.join(thumbDir, `photo-${number}`);

    await Promise.all([
      sharp(square).webp({ quality: 82, effort: 4 }).toFile(`${base}.webp`),
      sharp(square).jpeg({ quality: 84, mozjpeg: true, progressive: true }).toFile(`${base}.jpg`),
      sharp(square)
        .resize(THUMB_SIZE, THUMB_SIZE)
        .webp({ quality: 78, effort: 4 })
        .toFile(`${thumbBase}.webp`),
      sharp(square)
        .resize(THUMB_SIZE, THUMB_SIZE)
        .jpeg({ quality: 82, mozjpeg: true, progressive: true })
        .toFile(`${thumbBase}.jpg`),
    ]);

    manifest.push({
      order: number,
      source: source ? path.basename(source) : null,
      placeholder: !source,
      image: `/photos/photo-${number}.webp`,
      imageFallback: `/photos/photo-${number}.jpg`,
      thumbnail: `/photos/thumbs/photo-${number}.webp`,
      thumbnailFallback: `/photos/thumbs/photo-${number}.jpg`,
    });
    console.log(`  photo-${number} ${source ? `<- ${path.basename(source)}` : '(cute placeholder)'}`);
  }

  await writeFile(manifestPath, `${JSON.stringify({ generatedAt: new Date().toISOString(), manifest }, null, 2)}\n`, 'utf8');
  console.log(`Done. Wrote ${LIMIT} square photo sets to public/photos.`);
}

main().catch((error) => {
  console.error('Photo processing failed:', error);
  process.exitCode = 1;
});
