interface EqualizerProps {
  playing: boolean;
  className?: string;
}

export default function Equalizer({ playing, className }: EqualizerProps) {
  return (
    <span
      className={`equalizer${playing ? ' is-playing' : ''}${className ? ` ${className}` : ''}`}
      aria-hidden="true"
    >
      <span className="equalizer__bar" />
      <span className="equalizer__bar" />
      <span className="equalizer__bar" />
      <span className="equalizer__bar" />
    </span>
  );
}
