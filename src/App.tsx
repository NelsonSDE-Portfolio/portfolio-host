import { Suspense, lazy, useEffect, useState, useCallback } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { ErrorBoundary } from './components/ErrorBoundary';
import { FloatingNav } from './components/FloatingNav';
import { Footer } from './components/Footer';
import { CommandPalette, type CommandItem } from './components/CommandPalette';
import { useKonamiCode } from './hooks/useKonamiCode';
import { HomePage } from './pages/HomePage';
import { ArchitecturePage } from './pages/ArchitecturePage';
import { NotFoundPage } from './pages/NotFoundPage';

const ChallengeTracker = lazy(() => import('challengeTracker/App'));

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 rounded-full animate-spin" style={{ borderColor: 'var(--border)', borderTopColor: 'var(--accent)' }} />
        <p className="font-mono text-sm" style={{ color: 'var(--text-muted)' }}>Waking up the server... free tier life.</p>
      </div>
    </div>
  );
}

function RemoteErrorFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
      <div className="text-center max-w-md mx-auto p-8 rounded-card" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
        <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          Could not load Challenge Tracker
        </h2>
        <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
          The application couldn't be loaded. The server might be sleeping or there's a network issue.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 rounded-lg font-semibold text-sm text-white transition-colors duration-200 cursor-pointer"
            style={{ background: 'var(--accent)' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-hover)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--accent)')}
          >
            Retry
          </button>
          <Link
            to="/"
            className="px-5 py-2.5 rounded-lg text-sm text-center transition-colors duration-200"
            style={{ color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
          >
            Go back to portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const container = document.querySelector('.snap-container');
    if (container) {
      container.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    history.replaceState(null, '', `#${id}`);
  }
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isFullScreenRoute = location.pathname.startsWith('/projects/challenge-tracker');
  const [paletteOpen, setPaletteOpen] = useState(false);

  const commandItems: CommandItem[] = [
    { id: 'home', label: 'Home', category: 'section', action: () => { const c = document.querySelector('.snap-container'); if (c) c.scrollTo({ top: 0, behavior: 'smooth' }); else window.scrollTo({ top: 0, behavior: 'smooth' }); history.replaceState(null, '', ' '); } },
    { id: 'about', label: 'About', category: 'section', action: () => scrollToSection('about') },
    { id: 'projects', label: 'Projects', category: 'section', action: () => scrollToSection('projects') },
    { id: 'experience', label: 'Experience', category: 'section', action: () => scrollToSection('experience') },
    { id: 'challenge-tracker', label: 'Challenge Tracker', category: 'project', action: () => navigate('/projects/challenge-tracker') },
    { id: 'github', label: 'GitHub', category: 'link', action: () => window.open('https://github.com/NelsonSDE', '_blank') },
    { id: 'linkedin', label: 'LinkedIn', category: 'link', action: () => window.open('https://www.linkedin.com/in/nelson-riera-76421879/', '_blank') },
    { id: 'email', label: 'Email', category: 'link', action: () => { window.location.href = 'mailto:nelsonr.sde@gmail.com'; } },
    { id: 'source', label: 'View source code', category: 'fun', action: () => window.open('https://github.com/NelsonSDE', '_blank') },
  ];

  const togglePalette = useCallback(() => setPaletteOpen(p => !p), []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.body.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.body.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setPaletteOpen(p => !p);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Console easter egg
  useEffect(() => {
    console.log(
      '%c Hey, you\'re inspecting my code? 👀\n%c I like your curiosity. Let\'s talk → nelsonr.sde@gmail.com',
      'color: #3b82f6; font-size: 16px; font-weight: bold;',
      'color: #a1a1aa; font-size: 12px;'
    );
  }, []);

  // Konami code
  const [toast, setToast] = useState<string | null>(null);
  useKonamiCode(useCallback(() => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    setToast('Achievement Unlocked: Retro Gamer');
    setTimeout(() => setToast(null), 5000);
  }, []));

  // Scroll to hash on load
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      setTimeout(() => scrollToSection(hash), 100);
    }
  }, []);

  if (isFullScreenRoute) {
    return (
      <div style={{ height: '100%', overflowY: 'auto' }}>
        <Routes>
          <Route
            path="/projects/challenge-tracker/*"
            element={
              <ErrorBoundary fallback={<RemoteErrorFallback />}>
                <Suspense fallback={<LoadingFallback />}>
                  <ChallengeTracker />
                </Suspense>
              </ErrorBoundary>
            }
          />
        </Routes>
      </div>
    );
  }

  return (
    <div className="snap-container">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium"
        style={{ background: 'var(--accent)', color: 'white' }}
      >
        Skip to content
      </a>

      <FloatingNav onCommandPalette={togglePalette} />
      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} items={commandItems} />

      <main id="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/architecture" element={<ArchitecturePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />

      {/* Konami toast */}
      {toast && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] px-5 py-3 rounded-lg font-mono text-sm font-medium"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--accent)',
            color: 'var(--accent)',
            boxShadow: '0 0 20px var(--accent-glow)',
          }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}

export default App;
