import { Suspense, lazy } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { ErrorBoundary } from './components/ErrorBoundary'
import './App.css'

// Lazy load the remote Challenge Tracker app
const ChallengeTracker = lazy(() => import('challengeTracker/App'))

function Home() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h1>
      <p className="text-gray-600 mb-8">
        Explore my projects and track your challenges
      </p>
      <Link
        to="/challenges"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go to Challenge Tracker
      </Link>
    </div>
  )
}

function LoadingFallback() {
  return (
    <div className="p-8 text-center">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
      </div>
      <p className="text-gray-500 mt-4">Loading Challenge Tracker...</p>
    </div>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl font-bold text-gray-800">
              Portfolio
            </Link>
            <div className="flex gap-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-900 transition"
              >
                Home
              </Link>
              <Link
                to="/challenges"
                className="text-gray-600 hover:text-gray-900 transition"
              >
                Challenges
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/challenges/*"
            element={
              <ErrorBoundary>
                <Suspense fallback={<LoadingFallback />}>
                  <ChallengeTracker />
                </Suspense>
              </ErrorBoundary>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
