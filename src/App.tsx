import { Suspense, lazy } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useAuth } from './contexts/AuthContext';
import { HomePage } from './pages/HomePage';
import { ArchitecturePage } from './pages/ArchitecturePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import './App.css';

// Lazy load the remote Challenge Tracker app
const ChallengeTracker = lazy(() => import('challengeTracker/App'));

function LoadingFallback() {
  return (
    <div className="p-8 text-center">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
      </div>
      <p className="text-gray-500 mt-4">Loading Challenge Tracker...</p>
    </div>
  );
}

function Navigation() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
            Portfolio
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/" className={linkClass('/')}>
              Home
            </Link>
            <Link to="/challenges" className={linkClass('/challenges')}>
              Challenges
            </Link>
            <Link to="/architecture" className={linkClass('/architecture')}>
              Architecture
            </Link>
            <div className="h-4 w-px bg-gray-300"></div>
            {isAuthenticated ? (
              <>
                <span className="text-gray-500 text-sm">
                  {user?.name || user?.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-gray-900 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function RemoteErrorFallback() {
  return (
    <div className="p-8 text-center max-w-md mx-auto">
      <div className="text-red-500 text-5xl mb-4">⚠️</div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Failed to load Challenge Tracker
      </h2>
      <p className="text-gray-600 mb-6">
        The remote application couldn't be loaded. This might be because the
        remote server is not running or there's a network issue.
      </p>
      <div className="space-y-3">
        <button
          onClick={() => window.location.reload()}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Retry
        </button>
        <Link
          to="/"
          className="block w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
        >
          Go Back Home
        </Link>
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
            <h3 className="font-bold text-lg mb-4">Portfolio</h3>
            <p className="text-gray-400">
              A modern portfolio showcasing microfrontend architecture and
              full-stack development skills.
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
                <Link to="/challenges" className="text-gray-400 hover:text-white transition">
                  Challenge Tracker
                </Link>
              </li>
              <li>
                <Link to="/architecture" className="text-gray-400 hover:text-white transition">
                  Architecture
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-gray-800 rounded text-sm">React</span>
              <span className="px-2 py-1 bg-gray-800 rounded text-sm">TypeScript</span>
              <span className="px-2 py-1 bg-gray-800 rounded text-sm">NestJS</span>
              <span className="px-2 py-1 bg-gray-800 rounded text-sm">MongoDB</span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>Built with Module Federation • Deployed on Vercel & Render</p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/architecture" element={<ArchitecturePage />} />
          <Route
            path="/challenges/*"
            element={
              <ProtectedRoute>
                <ErrorBoundary fallback={<RemoteErrorFallback />}>
                  <Suspense fallback={<LoadingFallback />}>
                    <div className="max-w-7xl mx-auto py-8 px-4">
                      <ChallengeTracker />
                    </div>
                  </Suspense>
                </ErrorBoundary>
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
