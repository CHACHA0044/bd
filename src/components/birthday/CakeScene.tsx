import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Bear, Bunny, Butterfly, Elephant, Giraffe, Lion, LittleBird, Monkey } from '../animals/Animals';
import BirthdayCake from './BirthdayCake';

interface CakeSceneProps {
  celebrating: boolean;
}

function SceneBalloon({
  className,
  color,
  highlight,
}: {
  className: string;
  color: string;
  highlight: string;
}) {
  return (
    <div className={`scene-balloon ${className}`} aria-hidden="true">
      <span className="scene-balloon__body" style={{ background: color }}>
        <span className="scene-balloon__shine" style={{ background: highlight }} />
      </span>
      <span className="scene-balloon__knot" />
      <span className="scene-balloon__string" />
    </div>
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

  return (
    <motion.div
      className={`cake-scene${celebrating ? ' is-celebrating' : ''}`}
      role="img"
      aria-label="A three-layer birthday cake with three candles, surrounded by a baby elephant, lion cub, giraffe, bunny, bear, monkey, little bird and butterfly, with pastel balloons and sparkles."
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
        />
        <SceneBalloon
          className="scene-balloon--right"
          color="linear-gradient(145deg, #D3EDFF, #8CC8EB)"
          highlight="rgba(255,255,255,.65)"
        />
      </div>

      <div className="scene-glow" aria-hidden="true" />
      <div className="scene-ground" aria-hidden="true" />
      <span className="scene-flower scene-flower--one" aria-hidden="true" />
      <span className="scene-flower scene-flower--two" aria-hidden="true" />
      <span className="scene-flower scene-flower--three" aria-hidden="true" />

      <div className="scene-animal animal--giraffe" aria-hidden="true">
        <Giraffe />
      </div>
      <div className="scene-animal animal--elephant" aria-hidden="true">
        <Elephant />
      </div>
      <div className="scene-animal animal--lion" aria-hidden="true">
        <Lion />
      </div>
      <div className="scene-cake" aria-hidden="true">
        <BirthdayCake />
      </div>
      <div className="scene-animal animal--bunny" aria-hidden="true">
        <Bunny />
      </div>
      <div className="scene-animal animal--bear" aria-hidden="true">
        <Bear />
      </div>
      <div className="scene-animal animal--monkey" aria-hidden="true">
        <Monkey />
      </div>
      <div className="scene-animal animal--bird" aria-hidden="true">
        <LittleBird />
      </div>
      <div className="scene-animal animal--butterfly" aria-hidden="true">
        <Butterfly />
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
