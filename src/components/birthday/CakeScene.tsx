import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type CSSProperties,
} from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  Bunny,
  Butterfly,
  Cat,
  Dog,
  Elephant,
  Giraffe,
  Lion,
  LittleBird,
  Monkey,
} from '../animals/Animals';
import { useSoundEffects } from '../../hooks/useSoundEffects';
import { resolveAnimalSound } from '../../config/animalSounds';
import BirthdayCake from './BirthdayCake';

interface CakeSceneProps {
  celebrating: boolean;
}

interface AnimalMeta {
  id: string;
  label: string;
  sound: string;
  className: string;
  Component: ComponentType<{ className?: string }>;
}

const ANIMALS: AnimalMeta[] = [
  {
    id: 'giraffe',
    label: 'Tap the giraffe to hear its playful hello',
    sound: resolveAnimalSound('giraffe', '/audio/animals/giraffe.wav'),
    className: 'animal--giraffe',
    Component: Giraffe,
  },
  {
    id: 'elephant',
    label: 'Tap the elephant to hear it trumpet',
    sound: resolveAnimalSound('elephant', '/audio/animals/elephant.wav'),
    className: 'animal--elephant',
    Component: Elephant,
  },
  {
    id: 'lion',
    label: 'Tap the lion cub to hear a cute little roar',
    sound: resolveAnimalSound('lion', '/audio/animals/lion.wav'),
    className: 'animal--lion',
    Component: Lion,
  },
  {
    id: 'bunny',
    label: 'Tap the bunny to hear a sweet squeak',
    sound: resolveAnimalSound('bunny', '/audio/animals/bunny.wav'),
    className: 'animal--bunny',
    Component: Bunny,
  },
  {
    id: 'cat',
    label: 'Tap the cat to hear a gentle meow',
    sound: resolveAnimalSound('cat', '/audio/animals/cat.wav'),
    className: 'animal--cat',
    Component: Cat,
  },
  {
    id: 'dog',
    label: 'Tap the dog to hear a happy bark',
    sound: resolveAnimalSound('dog', '/audio/animals/dog.wav'),
    className: 'animal--dog',
    Component: Dog,
  },
  {
    id: 'monkey',
    label: 'Tap the monkey to hear it chatter',
    sound: resolveAnimalSound('monkey', '/audio/animals/monkey.wav'),
    className: 'animal--monkey',
    Component: Monkey,
  },
  {
    id: 'bird',
    label: 'Tap the little bird to hear it chirp',
    sound: resolveAnimalSound('bird', '/audio/animals/bird.wav'),
    className: 'animal--bird',
    Component: LittleBird,
  },
  {
    id: 'butterfly',
    label: 'Tap the butterfly to hear a sparkly chime',
    sound: resolveAnimalSound('butterfly', '/audio/animals/butterfly.wav'),
    className: 'animal--butterfly',
    Component: Butterfly,
  },
];

const POP_PARTICLES = [
  { color: '#f7c9d4', x: '-72px', y: '-58px', delay: '0ms' },
  { color: '#c8e7fa', x: '58px', y: '-72px', delay: '18ms' },
  { color: '#ffe69a', x: '-84px', y: '16px', delay: '36ms' },
  { color: '#ddd0ff', x: '76px', y: '28px', delay: '10ms' },
  { color: '#ff927e', x: '-24px', y: '-92px', delay: '28ms' },
  { color: '#cdeccf', x: '38px', y: '76px', delay: '44ms' },
  { color: '#f7c9d4', x: '-52px', y: '70px', delay: '22ms' },
  { color: '#ffe69a', x: '94px', y: '-14px', delay: '34ms' },
];

function AnimalButton({ animal, onSound }: { animal: AnimalMeta; onSound: (src: string) => void }) {
  const [tapTick, setTapTick] = useState(0);
  const { Component } = animal;

  const handleTap = useCallback(() => {
    onSound(animal.sound);
    setTapTick((tick) => tick + 1);
  }, [animal.sound, onSound]);

  return (
    <button
      type="button"
      className={`scene-animal ${animal.className}`}
      aria-label={animal.label}
      title={animal.label}
      onClick={handleTap}
    >
      <span key={tapTick} className={`scene-animal__body${tapTick > 0 ? ' is-tapped' : ''}`}>
        <Component />
      </span>
    </button>
  );
}

function SceneBalloon({
  className,
  color,
  highlight,
  label,
  onSound,
}: {
  className: string;
  color: string;
  highlight: string;
  label: string;
  onSound: (src: string) => void;
}) {
  const [popped, setPopped] = useState(false);
  const timerRef = useRef<number | undefined>(undefined);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    return () => window.clearTimeout(timerRef.current);
  }, []);

  const handlePop = useCallback(() => {
    if (popped) return;

    onSound('/audio/balloon-pop.wav');
    setPopped(true);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setPopped(false), 2800);
  }, [onSound, popped]);

  return (
    <button
      type="button"
      className={`scene-balloon ${className}${popped ? ' is-popped' : ''}`}
      aria-label={`Pop the ${label} balloon`}
      title={`Pop the ${label} balloon`}
      onClick={handlePop}
    >
      <span className="scene-balloon__float">
        <span className="scene-balloon__body" style={{ background: color }}>
          <span className="scene-balloon__shine" style={{ background: highlight }} />
        </span>
        <span className="scene-balloon__knot" />
        <span className="scene-balloon__string" />
      </span>

      {!reduceMotion && (
        <span className="scene-balloon__burst" aria-hidden="true">
          {POP_PARTICLES.map((particle, index) => (
            <span
              key={index}
              style={
                {
                  '--burst-x': particle.x,
                  '--burst-y': particle.y,
                  '--burst-delay': particle.delay,
                  background: particle.color,
                } as CSSProperties
              }
            />
          ))}
        </span>
      )}
    </button>
  );
}

function Sparkle({ className }: { className: string }) {
  return (
    <span className={`scene-sparkle ${className}`} aria-hidden="true">
      <svg viewBox="0 0 20 20">
        <path d="M10 1l2.2 6.1L18 10l-5.8 2.9L10 19l-2.2-6.1L2 10l5.8-2.9z" fill="currentColor" />
      </svg>
    </span>
  );
}

function Heart({ className }: { className: string }) {
  return (
    <span className={`scene-heart ${className}`} aria-hidden="true">
      <svg viewBox="0 0 24 22">
        <path
          d="M12 21S2 14.7 2 7.8C2 4.1 4.7 2 7.6 2 9.5 2 11.2 3 12 4.5 12.8 3 14.5 2 16.4 2 19.3 2 22 4.1 22 7.8 22 14.7 12 21 12 21z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}

export default function CakeScene({ celebrating }: CakeSceneProps) {
  const reduceMotion = useReducedMotion();
  const { play } = useSoundEffects();

  return (
    <motion.div
      className={`cake-scene${celebrating ? ' is-celebrating' : ''}`}
      role="group"
      aria-label="A birthday scene with Heer Betu behind a three-layer cake, pastel balloons and animal friends. Tap an animal to hear its sound, or pop a balloon."
      initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
    >
      <div className="scene-sky" aria-hidden="true">
        <span className="scene-cloud scene-cloud--one" />
        <span className="scene-cloud scene-cloud--two" />
        <Sparkle className="scene-sparkle--one" />
        <Sparkle className="scene-sparkle--two" />
        <Sparkle className="scene-sparkle--three" />
        <Sparkle className="scene-sparkle--four" />
        <Heart className="scene-heart--one" />
        <Heart className="scene-heart--two" />
        <SceneBalloon
          className="scene-balloon--left"
          color="linear-gradient(145deg, #FFD0DC, #F49DB4)"
          highlight="rgba(255,255,255,.65)"
          label="pink"
          onSound={play}
        />
        <SceneBalloon
          className="scene-balloon--right"
          color="linear-gradient(145deg, #D3EDFF, #8CC8EB)"
          highlight="rgba(255,255,255,.65)"
          label="blue"
          onSound={play}
        />
      </div>

      <div className="scene-glow" aria-hidden="true" />
      <div className="scene-ground" aria-hidden="true" />

      <div className="scene-portrait">
        <img
          src="/photos/heer-birthday.webp"
          alt="Heer Betu in a red dress, smiling behind her birthday cake"
          draggable={false}
        />
      </div>

      <span className="scene-flower scene-flower--one" aria-hidden="true" />
      <span className="scene-flower scene-flower--two" aria-hidden="true" />
      <span className="scene-flower scene-flower--three" aria-hidden="true" />

      {ANIMALS.map((animal) => (
        <AnimalButton key={animal.id} animal={animal} onSound={play} />
      ))}

      <div className="scene-cake" aria-hidden="true">
        <BirthdayCake />
      </div>

      <AnimatePresence>
        {celebrating && (
          <motion.div
            className="scene-bubble"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -6 }}
            transition={{ type: 'spring', stiffness: 420, damping: 22 }}
            aria-hidden="true"
          >
            Yay! Happy birthday!
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
