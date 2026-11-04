const AUDIO_EXTENSIONS = new Set(['mp3', 'wav', 'ogg']);

const PROVIDED_AUDIO = import.meta.glob('../../audio/animal audios/*', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>;

const ANIMAL_ALIASES: Record<string, string[]> = {
  elephant: ['elephant', 'elephants'],
  lion: ['lion', 'lio', 'lioness', 'lion cub'],
  giraffe: ['giraffe'],
  monkey: ['monkey', 'monkeys'],
  cat: ['cat', 'cats', 'kitten', 'kittens'],
  dog: ['dog', 'dogs', 'puppy', 'puppies'],
  bunny: ['bunny', 'bunnies', 'rabbit', 'rabbits', 'hare'],
  bird: ['bird', 'birds', 'little bird', 'chick'],
  butterfly: ['butterfly', 'butterflies'],
};

type Match = { animal: string; score: number; path: string; url: string };

function normalizeName(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function scoreAlias(normalizedName: string, alias: string) {
  if (normalizedName === alias) return 4;
  if (normalizedName.startsWith(`${alias} `)) return 3;
  if (normalizedName.endsWith(` ${alias}`)) return 2;
  if (normalizedName.includes(` ${alias} `)) return 1;
  return 0;
}

function findProvidedSounds() {
  const bestMatches = new Map<string, Match>();

  for (const [path, url] of Object.entries(PROVIDED_AUDIO)) {
    const fileName = path.split('/').pop() ?? '';
    const extensionIndex = fileName.lastIndexOf('.');
    if (extensionIndex <= 0) continue;

    const extension = fileName.slice(extensionIndex + 1).toLowerCase();
    if (!AUDIO_EXTENSIONS.has(extension)) continue;

    const normalizedName = normalizeName(fileName.slice(0, extensionIndex));

    for (const [animal, aliases] of Object.entries(ANIMAL_ALIASES)) {
      const score = Math.max(...aliases.map((alias) => scoreAlias(normalizedName, alias)));
      if (score === 0) continue;

      const previous = bestMatches.get(animal);
      if (
        !previous ||
        score > previous.score ||
        (score === previous.score && path.localeCompare(previous.path) < 0)
      ) {
        bestMatches.set(animal, { animal, score, path, url });
      }
    }
  }

  return Object.fromEntries(
    Array.from(bestMatches.values()).map((match) => [match.animal, match.url]),
  ) as Record<string, string>;
}

const PROVIDED_SOUNDS = findProvidedSounds();

export function resolveAnimalSound(animal: string, fallback: string) {
  return PROVIDED_SOUNDS[animal] ?? fallback;
}
