import { FaCakeCandles, FaHouse, FaImages } from 'react-icons/fa6';
import { birthdayConfig } from '../../config/birthday';
import type { SiteRoute } from '../../hooks/useHashRoute';

interface HeaderProps {
  route: SiteRoute;
}

export default function Header({ route }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a href="#/" className="brand" aria-label={`${birthdayConfig.name} — home`}>
          <span className="brand__mark" aria-hidden="true">
            <FaCakeCandles />
          </span>
          <span className="brand__text">
            <span className="brand__name">{birthdayConfig.name}</span>
            <span className="brand__sub">Birthday world</span>
          </span>
          <span className="brand__age" aria-hidden="true">
            {birthdayConfig.age}
          </span>
        </a>

        <nav className="site-nav" aria-label="Main">
          <a
            href="#/"
            className="site-nav__link"
            aria-label="Home"
            aria-current={route === 'home' ? 'page' : undefined}
          >
            <FaHouse aria-hidden="true" />
            <span>Home</span>
          </a>
          <a
            href="#/memories"
            className="site-nav__link"
            aria-label="Memories"
            aria-current={route === 'memories' ? 'page' : undefined}
          >
            <FaImages aria-hidden="true" />
            <span>Memories</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
