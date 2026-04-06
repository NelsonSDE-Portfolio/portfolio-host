import { Suspense, lazy } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from '@clerk/clerk-react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ProtectedRoute } from './components/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { ArchitecturePage } from './pages/ArchitecturePage';
import './App.css';

// Lazy load the remote Challenge Tracker app
const ChallengeTracker = lazy(() => import('challengeTracker/App'));

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
        <p className="text-slate-400">Loading application...</p>
      </div>
    </div>
  );
}

function Navigation() {
  const { user } = useUser();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const linkClass = (path: string) =>
    `transition ${
      isActive(path)
        ? 'text-blue-600 font-medium'
        : 'text-gray-600 hover:text-gray-900'
    }`;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-gray-800">
            Nelson Riera
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/" className={linkClass('/')}>
              Home
            </Link>
            <a href="/#projects" className="text-gray-600 hover:text-gray-900 transition">
              Projects
            </a>
            <Link to="/architecture" className={linkClass('/architecture')}>
              Architecture
            </Link>
            <div className="h-4 w-px bg-gray-300"></div>
            <SignedIn>
              <span className="text-gray-500 text-sm">
                {user?.firstName || user?.emailAddresses[0]?.emailAddress}
              </span>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-gray-600 hover:text-gray-900 transition">
                  Login
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
}

function RemoteErrorFallback() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="text-red-400 text-5xl mb-4">⚠️</div>
        <h2 className="text-xl font-semibold text-white mb-2">
          Failed to load application
        </h2>
        <p className="text-slate-400 mb-6">
          The application couldn't be loaded. This might be because the
          server is not running or there's a network issue.
        </p>
        <div className="space-y-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
          >
            Retry
          </button>
          <Link
            to="/"
            className="block w-full px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Nelson Riera</h3>
            <p className="text-gray-400">
              Senior Software Engineer building scalable microservices and
              modern web applications with 7+ years of experience.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <a href="/#projects" className="text-gray-400 hover:text-white transition">
                  Projects
                </a>
              </li>
              <li>
                <Link to="/architecture" className="text-gray-400 hover:text-white transition">
                  Architecture
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://github.com/nelsonriera" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/nelsonriera" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="mailto:nelsonr.sde@gmail.com" className="text-gray-400 hover:text-white transition">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>Built with Module Federation • React • NestJS • MongoDB</p>
        </div>
      </div>
    </footer>
  );
}

// Layout wrapper that conditionally shows nav/footer
function Layout({ children, fullScreen = false }: { children: React.ReactNode; fullScreen?: boolean }) {
  if (fullScreen) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function App() {
  const location = useLocation();

  // Check if we're in a full-screen project route
  const isFullScreenRoute = location.pathname.startsWith('/projects/challenge-tracker');

  return (
    <Layout fullScreen={isFullScreenRoute}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/architecture" element={<ArchitecturePage />} />
        <Route
          path="/projects/challenge-tracker/*"
          element={
            <ProtectedRoute>
              <ErrorBoundary fallback={<RemoteErrorFallback />}>
                <Suspense fallback={<LoadingFallback />}>
                  <ChallengeTracker />
                </Suspense>
              </ErrorBoundary>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
