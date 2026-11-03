import type { MouseEvent } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa6';

interface CelebrationButtonProps {
  label: string;
  playing: boolean;
  onToggle: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function CelebrationButton({
  label,
  playing,
  onToggle,
}: CelebrationButtonProps) {
  return (
    <div className="celebration">
      <button
        type="button"
        className={`celebration__action${playing ? ' is-playing' : ''}`}
        onClick={onToggle}
        aria-pressed={playing}
      >
        {playing ? <FaPause aria-hidden="true" /> : <FaPlay aria-hidden="true" />}
        <span>{label}</span>
      </button>
    </div>
  );
}
