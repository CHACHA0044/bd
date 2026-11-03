import { lazy, Suspense, useEffect } from 'react';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import IntroCurtain from './components/ui/IntroCurtain';
import PageLoader from './components/ui/PageLoader';
import { AudioPlayerProvider } from './context/AudioPlayerContext';
import { useHashRoute } from './hooks/useHashRoute';
import BirthdayPage from './pages/BirthdayPage';

const GalleryPage = lazy(() => import('./pages/GalleryPage'));

export default function App() {
  const route = useHashRoute();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [route]);

  return (
    <AudioPlayerProvider>
      <a className="skip-link" href="#main-content">
        Skip to the birthday fun
      </a>

      <div className="site">
        <Header route={route} />

        <main className="site__main" id="main-content">
          {route === 'memories' ? (
            <Suspense fallback={<PageLoader />}>
              <GalleryPage />
            </Suspense>
          ) : (
            <BirthdayPage />
          )}
        </main>

        <Footer />
      </div>

      <IntroCurtain />
    </AudioPlayerProvider>
  );
}
