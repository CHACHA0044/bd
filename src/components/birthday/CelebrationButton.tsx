import { useCallback, type MouseEvent } from 'react';
import { useReducedMotion } from 'framer-motion';
import { FaRocket, FaStar } from 'react-icons/fa6';
import FlyingButton from '../reactbits/FlyingButton';
import { prefersSaveData, useWebGLSupport } from '../../hooks/useWebGLSupport';

interface CelebrationButtonProps {
  label: string;
  hint?: string;
  onCelebrate: (event?: MouseEvent<HTMLButtonElement>) => void;
}

function ButtonFace({ label }: { label: string }) {
  return (
    <span className="celebration__label">
      <FaStar aria-hidden="true" />
      {label}
    </span>
  );
}

export default function CelebrationButton({
  label,
  hint,
  onCelebrate,
}: CelebrationButtonProps) {
  const reduceMotion = useReducedMotion();
  const webgl = useWebGLSupport();
  const canFly = Boolean(webgl) && !reduceMotion && !prefersSaveData();

  const handleFallbackClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      onCelebrate(event);
    },
    [onCelebrate],
  );

  return (
    <div className="celebration">
      {hint && (
        <p className="celebration__hint">
          <FaRocket aria-hidden="true" />
          {hint}
        </p>
      )}
      <div className="celebration__stage">
        <div className="celebration__sky" aria-hidden="true">
          <span className="cloud cloud--one" />
          <span className="cloud cloud--two" />
          <span className="spark spark--one" />
          <span className="spark spark--two" />
          <span className="spark spark--three" />
          <span className="dotted-path" />
        </div>
        <span className="celebration__pad" aria-hidden="true" />

        {canFly ? (
          <FlyingButton
            theme="light"
            size="extra-large"
            trigger="click"
            carryCursor={false}
            altitude={150}
            hoverTime={1.4}
            jets={2}
            thrusters
            smoke={0.8}
            turbulence={0.7}
            wobble={0.55}
            buttonColor="#DE5C46"
            textColor="#FFF8EB"
            thrustColor="#FFE69A"
            smokeColor="#FFF3DE"
            ramp={false}
            className="celebration__flyer"
            onClick={onCelebrate}
          >
            <ButtonFace label={label} />
          </FlyingButton>
        ) : (
          <div className="celebration__fallback">
            <button
              type="button"
              className="celebration__fallback-button"
              onClick={handleFallbackClick}
            >
              <ButtonFace label={label} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
