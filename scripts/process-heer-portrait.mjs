import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const source = path.resolve('photos/red_dress.jpeg');
const outputDir = path.resolve('public/photos');
const output = path.join(outputDir, 'heer-birthday.webp');

const OUT_W = 720;
const OUT_H = 1280;

const smoothstep = (edge0, edge1, value) => {
  const t = Math.min(1, Math.max(0, (value - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};

const meta = await sharp(source).metadata();
if (!meta.width || !meta.height) throw new Error('Could not read photo dimensions');

const crop = {
  left: Math.round(meta.width * 0.18),
  top: Math.round(meta.height * 0.06),
  width: Math.round(meta.width * 0.6),
  height: Math.round(meta.height * 0.8),
};

const portrait = await sharp(source)
  .extract(crop)
  .resize(OUT_W, OUT_H, { fit: 'cover', position: 'centre' })
  .modulate({ brightness: 1.02, saturation: 1.03 })
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const alpha = Buffer.alloc(OUT_W * OUT_H);

for (let y = 0; y < OUT_H; y += 1) {
  const ny = y / (OUT_H - 1);
  for (let x = 0; x < OUT_W; x += 1) {
    const nx = x / (OUT_W - 1);
    let a = 1;

    a *= smoothstep(0.0, 0.09, nx) * smoothstep(1.0, 0.91, nx);
    a *= smoothstep(0.0, 0.055, ny);
    a *= smoothstep(0.0, 0.1, 1 - ny);

    const dx = (nx - 0.5) / 0.6;
    const dy = (ny - 0.43) / 0.61;
    const d = Math.sqrt(dx * dx + dy * dy);
    a *= 1 - smoothstep(0.84, 1.02, d);

    alpha[y * OUT_W + x] = Math.round(Math.min(1, Math.max(0, a)) * 255);
  }
}

await mkdir(outputDir, { recursive: true });

const tinted = Buffer.alloc(portrait.data.length);
for (let i = 0; i < portrait.data.length; i += 3) {
  tinted[i] = Math.round(portrait.data[i] * 0.94 + 255 * 0.06);
  tinted[i + 1] = Math.round(portrait.data[i + 1] * 0.94 + 245 * 0.06);
  tinted[i + 2] = Math.round(portrait.data[i + 2] * 0.94 + 232 * 0.06);
}

await sharp(tinted, { raw: { width: OUT_W, height: OUT_H, channels: 3 } })
  .joinChannel(alpha, { raw: { width: OUT_W, height: OUT_H, channels: 1 } })
  .webp({ quality: 88, alphaQuality: 92 })
  .toFile(output);

console.log(`Created ${path.relative(process.cwd(), output)} from ${path.relative(process.cwd(), source)}`);
