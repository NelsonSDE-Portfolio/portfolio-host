import { Link } from 'react-router-dom';

export function ArchitecturePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Architecture Overview
        </h1>
        <p className="text-xl text-gray-600">
          How this portfolio demonstrates modern microfrontend architecture
        </p>
      </header>

      {/* Architecture Diagram */}
      <section className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          System Architecture
        </h2>
        <div className="bg-gray-50 rounded-lg p-6 font-mono text-sm overflow-x-auto">
          <pre className="text-gray-800">
{`┌─────────────────────────────────────────────────────────────────┐
│                        Vercel (Frontend)                         │
│  ┌────────────────────┐      ┌────────────────────────────────┐ │
│  │   portfolio-host   │─────▶│   challenge-tracker (Remote)   │ │
│  │   (Host Shell)     │      │                                │ │
│  │   Port: 5000       │      │   Port: 5001                   │ │
│  │                    │      │   Exposes: ./App               │ │
│  │   - Landing Page   │      │                                │ │
│  │   - Auth UI        │      │   - Challenge Dashboard        │ │
│  │   - Navigation     │      │   - Workout Logging            │ │
│  │   - Auth Context   │      │   - Participant Views          │ │
│  └────────────────────┘      └────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    │ REST API
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Render (Backend)                          │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                      challenge-api                          │ │
│  │                      (NestJS + Mongoose)                    │ │
│  │                                                             │ │
│  │   - JWT Authentication                                      │ │
│  │   - Challenge Management                                    │ │
│  │   - Workout Logging                                         │ │
│  │   - Presigned URL Generation                                │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                           │                    │
                           │                    │
                           ▼                    ▼
┌─────────────────────────────┐    ┌─────────────────────────────┐
│      MongoDB Atlas          │    │         AWS S3              │
│      (Database)             │    │     (File Storage)          │
│                             │    │                             │
│   - users                   │    │   - Workout photos          │
│   - challenges              │    │   - Profile images          │
│   - workoutlogs             │    │   - Presigned URLs          │
└─────────────────────────────┘    └─────────────────────────────┘`}
          </pre>
        </div>
      </section>

      {/* Module Federation */}
      <section className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Module Federation
        </h2>
        <p className="text-gray-600 mb-6">
          Module Federation enables runtime integration of separately built and
          deployed applications. The host shell loads the Challenge Tracker
          remote dynamically, enabling independent deployments and team autonomy.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-3">
              Host Configuration
            </h3>
            <pre className="text-sm bg-blue-100 rounded p-4 overflow-x-auto">
{`federation({
  name: 'portfolio-host',
  remotes: {
    challengeTracker:
      'http://localhost:5001/assets/remoteEntry.js'
  },
  shared: ['react', 'react-dom', '@clerk/clerk-react']
})`}
            </pre>
          </div>

          <div className="bg-purple-50 rounded-lg p-6">
            <h3 className="font-semibold text-purple-900 mb-3">
              Remote Configuration
            </h3>
            <pre className="text-sm bg-purple-100 rounded p-4 overflow-x-auto">
{`federation({
  name: 'challengeTracker',
  filename: 'remoteEntry.js',
  exposes: {
    './App': './src/App.tsx'
  },
  shared: ['react', 'react-dom', 'react-router-dom']
})`}
            </pre>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Key Benefits
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🚀</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                Independent Deployments
              </h3>
              <p className="text-gray-600 text-sm">
                Each application can be deployed independently without affecting
                others.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Team Autonomy</h3>
              <p className="text-gray-600 text-sm">
                Different teams can own different parts of the application with
                their own release cycles.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📦</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Shared Dependencies</h3>
              <p className="text-gray-600 text-sm">
                Common libraries like React are shared to avoid duplication and
                ensure compatibility.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🔒</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Fault Isolation</h3>
              <p className="text-gray-600 text-sm">
                If a remote fails to load, an error boundary prevents the entire
                application from crashing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Technology Stack
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-blue-500">●</span> Frontend
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Vite + React + TypeScript</li>
              <li>• Module Federation</li>
              <li>• Tailwind CSS</li>
              <li>• Zustand (State)</li>
              <li>• React Query</li>
              <li>• React Hook Form</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-green-500">●</span> Backend
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>• NestJS + TypeScript</li>
              <li>• Mongoose ODM</li>
              <li>• Passport JWT</li>
              <li>• Class Validator</li>
              <li>• AWS SDK (S3)</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-purple-500">●</span> Infrastructure
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Vercel (Frontend)</li>
              <li>• Render (Backend)</li>
              <li>• MongoDB Atlas</li>
              <li>• AWS S3</li>
              <li>• GitHub Actions</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Authentication Flow */}
      <section className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Authentication Flow
        </h2>
        <p className="text-gray-600 mb-6">
          Authentication is handled by Clerk, providing secure session management
          across both host and remote applications via shared React context.
        </p>
        <div className="bg-gray-50 rounded-lg p-6 font-mono text-sm">
          <pre className="text-gray-800">
{`1. User signs in via Clerk (OAuth, email, etc.)
2. Clerk manages session tokens automatically
3. Auth state shared via ClerkProvider context
4. Remote apps access auth via @clerk/clerk-react hooks
5. API requests include Clerk JWT via getToken()
6. Unauthenticated users redirected to Clerk sign-in`}
          </pre>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <Link
          to="/challenges"
          className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-lg"
        >
          Try the Challenge Tracker
        </Link>
      </section>
    </div>
  );
}
