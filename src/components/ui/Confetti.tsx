import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';

export interface ConfettiBurstOptions {
  x?: number;
  y?: number;
  count?: number;
  spread?: number;
  power?: number;
}

export interface ConfettiHandle {
  burst: (options?: ConfettiBurstOptions) => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  spin: number;
  color: string;
  shape: 'rect' | 'circle';
  life: number;
  maxLife: number;
  wobble: number;
  wobbleSpeed: number;
}

const COLORS = ['#FF927E', '#FFE69A', '#F7C9D4', '#CDECCF', '#C8E7FA', '#DDD0FF', '#F2B25C', '#FFFDF8'];

const Confetti = forwardRef<ConfettiHandle>(function Confetti(_props, ref) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef(0);
  const lastRef = useRef(0);
  const reducedRef = useRef(false);
  const sizeRef = useRef({ width: 1, height: 1, ratio: 1 });

  const stop = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;
    lastRef.current = 0;
  }, []);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    sizeRef.current = { width, height, ratio };
    canvas.width = Math.max(1, Math.round(width * ratio));
    canvas.height = Math.max(1, Math.round(height * ratio));
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
  }, []);

  const drawFrame = useCallback(
    (now: number) => {
      rafRef.current = 0;
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;
      if (document.hidden) {
        rafRef.current = requestAnimationFrame(drawFrame);
        return;
      }

      const dt = lastRef.current ? Math.min((now - lastRef.current) / 1000, 0.05) : 1 / 60;
      lastRef.current = now;
      const { width, height, ratio } = sizeRef.current;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index];
        particle.life -= dt;
        if (particle.life <= 0 || particle.y > height + 40) {
          particles.splice(index, 1);
          continue;
        }

        particle.vy += 620 * dt;
        particle.vx *= 1 - 1.1 * dt;
        particle.vy *= 1 - 0.35 * dt;
        particle.wobble += particle.wobbleSpeed * dt;
        particle.x += (particle.vx + Math.sin(particle.wobble) * 28) * dt;
        particle.y += particle.vy * dt;
        particle.rotation += particle.spin * dt;

        const fade = Math.min(1, particle.life / (particle.maxLife * 0.35));
        ctx.save();
        ctx.globalAlpha = fade;
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        ctx.fillStyle = particle.color;
        if (particle.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, particle.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const heightScale = Math.max(0.25, Math.abs(Math.cos(particle.rotation * 1.7)));
          ctx.fillRect(
            -particle.size * 0.5,
            (-particle.size * 0.5) * heightScale,
            particle.size,
            particle.size * heightScale,
          );
        }
        ctx.restore();
      }

      if (particles.length > 0) {
        rafRef.current = requestAnimationFrame(drawFrame);
      } else {
        ctx.clearRect(0, 0, width, height);
        lastRef.current = 0;
      }
    },
    [],
  );

  const start = useCallback(() => {
    if (rafRef.current) return;
    lastRef.current = 0;
    rafRef.current = requestAnimationFrame(drawFrame);
  }, [drawFrame]);

  const burst = useCallback(
    (options: ConfettiBurstOptions = {}) => {
      if (reducedRef.current) return;
      resize();
      const { width, height } = sizeRef.current;
      const x = options.x ?? width / 2;
      const y = options.y ?? height * 0.35;
      const count = Math.min(options.count ?? 70, 140);
      const spread = options.spread ?? Math.PI * 2;
      const power = options.power ?? 460;

      for (let index = 0; index < count; index += 1) {
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * spread;
        const speed = power * (0.35 + Math.random() * 0.85);
        const maxLife = 1.8 + Math.random() * 1.4;
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 140,
          vy: Math.sin(angle) * speed - Math.random() * 90,
          size: 5 + Math.random() * 8,
          rotation: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 12,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          shape: Math.random() > 0.72 ? 'circle' : 'rect',
          life: maxLife,
          maxLife,
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: 3 + Math.random() * 5,
        });
      }

      if (particlesRef.current.length > 320) {
        particlesRef.current.splice(0, particlesRef.current.length - 320);
      }
      start();
    },
    [resize, start],
  );

  useImperativeHandle(ref, () => ({ burst }), [burst]);

  useEffect(() => {
    reducedRef.current = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    resize();
    window.addEventListener('resize', resize);

    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const onChange = (event: MediaQueryListEvent) => {
      reducedRef.current = event.matches;
    };
    media?.addEventListener('change', onChange);

    const onVisibility = () => {
      if (!document.hidden) start();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      window.removeEventListener('resize', resize);
      media?.removeEventListener('change', onChange);
      document.removeEventListener('visibilitychange', onVisibility);
      particlesRef.current = [];
    };
  }, [resize, start, stop]);

  return <canvas ref={canvasRef} className="confetti-canvas" aria-hidden="true" />;
});

export default Confetti;
