import { FaCakeCandles } from 'react-icons/fa6';

export default function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-live="polite">
      <span className="page-loader__cake" aria-hidden="true">
        <FaCakeCandles />
      </span>
      <span className="page-loader__text">Wrapping up the memories…</span>
      <span className="page-loader__dots" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
    </div>
  );
}
