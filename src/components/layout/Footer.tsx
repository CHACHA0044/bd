import { FaHeart } from 'react-icons/fa6';
import { birthdayConfig } from '../../config/birthday';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__love">
          {birthdayConfig.footer}
          <FaHeart className="site-footer__heart" aria-hidden="true" />
        </p>
        <p className="site-footer__small">
          {birthdayConfig.badge} · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
