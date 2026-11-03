import type { CSSProperties } from 'react';

interface ProgressSliderProps {
  label: string;
  value: number;
  max: number;
  step?: number;
  disabled?: boolean;
  className?: string;
  onChange: (value: number) => void;
}

export default function ProgressSlider({
  label,
  value,
  max,
  step = 0.1,
  disabled = false,
  className = '',
  onChange,
}: ProgressSliderProps) {
  const safeMax = Math.max(max, 0);
  const clamped = Math.min(Math.max(value, 0), safeMax || 0);
  const progress = safeMax > 0 ? (clamped / safeMax) * 100 : 0;

  return (
    <input
      type="range"
      className={`range ${className}`.trim()}
      min={0}
      max={safeMax || 0.1}
      step={step}
      value={safeMax > 0 ? clamped : 0}
      disabled={disabled || safeMax <= 0}
      aria-label={label}
      onChange={(event) => onChange(Number(event.target.value))}
      style={{ '--range-progress': `${progress}%` } as CSSProperties}
    />
  );
}
