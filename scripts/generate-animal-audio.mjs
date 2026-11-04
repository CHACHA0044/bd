import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SAMPLE_RATE = 44100;
const OUT_DIR = path.resolve('public/audio/animals');
const BALLOON_OUT = path.resolve('public/audio/balloon-pop.wav');

const TAU = Math.PI * 2;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const smooth = (value) => {
  const t = clamp(value, 0, 1);
  return t * t * (3 - 2 * t);
};

function seededRandom(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

const sin = (t, frequency) => Math.sin(TAU * frequency * t);
const saw = (t, frequency) => 2 * (((frequency * t) % 1 + 1) % 1) - 1;
const square = (t, frequency) => (sin(t, frequency) >= 0 ? 1 : -1);

function writeWav(samples) {
  const length = samples.length;
  const buffer = Buffer.alloc(44 + length * 2);
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + length * 2, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(SAMPLE_RATE, 24);
  buffer.writeUInt32LE(SAMPLE_RATE * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(length * 2, 40);

  for (let i = 0; i < length; i += 1) {
    const sample = clamp(samples[i], -1, 1);
    buffer.writeInt16LE(Math.round(sample * 32767), 44 + i * 2);
  }

  return buffer;
}

function render(duration, seed, generator) {
  const total = Math.floor(duration * SAMPLE_RATE);
  const random = seededRandom(seed);
  const samples = new Float32Array(total);
  let peak = 0;

  for (let i = 0; i < total; i += 1) {
    const t = i / SAMPLE_RATE;
    samples[i] = generator(t, duration, random);
    peak = Math.max(peak, Math.abs(samples[i]));
  }

  const gain = peak > 0 ? 0.72 / peak : 1;
  const fade = Math.floor(SAMPLE_RATE * 0.012);
  for (let i = 0; i < samples.length; i += 1) {
    const edge = Math.min(1, i / fade, (samples.length - 1 - i) / fade);
    samples[i] *= gain * edge;
  }

  return samples;
}

const sounds = {
  elephant: render(1.05, 11, (t, duration, random) => {
      const env = smooth(t / 0.05) * Math.pow(Math.max(0, 1 - t / duration), 1.15);
      const wobble = 1 + 0.06 * sin(t, 7.5) + 0.025 * sin(t, 13);
      const frequency = (185 + 280 * smooth(t / duration)) * wobble;
      const body =
        0.56 * saw(t, frequency) +
        0.28 * sin(t, frequency * 2.01) +
        0.12 * sin(t, frequency * 3.02) +
        0.04 * sin(t, frequency * 4.04);
      return body * env + (random() * 2 - 1) * 0.018 * env;
    }),

  lion: render(1.15, 23, (t, duration, random) => {
      const env = smooth(t / 0.12) * Math.pow(Math.max(0, 1 - t / duration), 1.5);
      const pulse = 0.62 + 0.38 * Math.sin(TAU * 8.5 * t);
      const frequency = 92 - 16 * smooth(t / duration) + 10 * sin(t, 4.2);
      const growl =
        0.5 * saw(t, frequency) +
        0.24 * sin(t, frequency * 0.5) +
        0.14 * sin(t, frequency * 1.98);
      return growl * env * pulse + (random() * 2 - 1) * 0.05 * env * pulse;
    }),

  monkey: render(0.88, 37, (t, duration, random) => {
      const chirp = Math.max(0, Math.sin(TAU * 6.5 * t));
      const gate = Math.pow(chirp, 2.6);
      const frequency = 760 + 560 * (0.5 + 0.5 * sin(t, 11)) + 120 * sin(t, 27);
      const voice = 0.58 * sin(t, frequency) + 0.22 * square(t, frequency * 0.5) + 0.1 * sin(t, frequency * 2);
      const env = smooth(t / 0.02) * Math.pow(Math.max(0, 1 - t / duration), 0.8);
      return voice * gate * env + (random() * 2 - 1) * 0.015 * gate * env;
    }),

  giraffe: render(0.82, 61, (t, duration, random) => {
      const env = smooth(t / 0.08) * Math.pow(Math.max(0, 1 - t / duration), 1.3);
      const frequency = 255 + 125 * smooth(t / duration) + 8 * sin(t, 5.4);
      const voice = 0.62 * sin(t, frequency) + 0.2 * sin(t, frequency * 2.005) + 0.1 * sin(t, frequency * 3.01);
      return voice * env + (random() * 2 - 1) * 0.012 * env;
    }),

  bunny: render(0.62, 73, (t, duration, random) => {
      const gate = Math.pow(Math.max(0, Math.sin(TAU * 9 * t)), 3);
      const frequency = 1320 + 640 * smooth(t / duration) + 90 * sin(t, 23);
      const env = smooth(t / 0.015) * Math.pow(Math.max(0, 1 - t / duration), 0.8);
      return (0.62 * sin(t, frequency) + 0.18 * sin(t, frequency * 2)) * gate * env + (random() * 2 - 1) * 0.012 * gate * env;
    }),

  bird: render(0.78, 89, (t, duration, random) => {
      const gate = Math.pow(Math.max(0, Math.sin(TAU * 7.4 * t)), 2.4);
      const frequency = 2050 + 620 * smooth(t / duration) + 180 * sin(t, 31);
      const env = smooth(t / 0.012) * Math.pow(Math.max(0, 1 - t / duration), 0.7);
      return (0.55 * sin(t, frequency) + 0.2 * sin(t, frequency * 1.5)) * gate * env + (random() * 2 - 1) * 0.01 * gate * env;
    }),

  butterfly: render(0.95, 101, (t, duration) => {
      const notes = [880, 1174.66, 1567.98, 2093];
      let value = 0;
      notes.forEach((frequency, index) => {
        const start = index * 0.16;
        if (t < start) return;
        const local = t - start;
        const env = Math.exp(-local * 5.5) * smooth(local / 0.015);
        value += (0.42 * sin(local, frequency) + 0.18 * sin(local, frequency * 2)) * env;
      });
      return value * Math.pow(Math.max(0, 1 - t / duration), 0.8);
    }),
};

const balloon = render(0.38, 131, (t, duration, random) => {
  const noise = random() * 2 - 1;
  const crack = Math.exp(-t * 42) * noise;
  const thump = Math.exp(-t * 18) * Math.sin(TAU * (110 - 40 * t) * t);
  const tail = Math.exp(-t * 9) * (random() * 2 - 1) * 0.18;
  const env = Math.pow(Math.max(0, 1 - t / duration), 1.2);
  return (crack * 0.85 + thump * 0.5 + tail) * env;
});

await mkdir(OUT_DIR, { recursive: true });
for (const [name, samples] of Object.entries(sounds)) {
  const file = path.join(OUT_DIR, `${name}.wav`);
  await writeFile(file, writeWav(samples));
  console.log(`Created ${path.relative(process.cwd(), file)}`);
}
await writeFile(BALLOON_OUT, writeWav(balloon));
console.log(`Created ${path.relative(process.cwd(), BALLOON_OUT)}`);
