import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1
          className="font-mono font-bold tracking-tight mb-6"
          style={{
            fontSize: 'clamp(80px, 15vw, 160px)',
            lineHeight: 1,
            background: 'linear-gradient(to right, #60a5fa, #67e8f9)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          404
        </h1>
        <p className="text-lg mb-2" style={{ color: 'var(--text-primary)' }}>
          Page not found in production.
        </p>
        <p className="text-base mb-10" style={{ color: 'var(--text-muted)' }}>
          Works on my machine though.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold px-6 py-3 rounded-lg text-white transition-colors duration-200"
          style={{ background: 'var(--accent)' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-hover)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)'; }}
        >
          Take me home &rarr;
        </Link>
      </div>
    </div>
  );
}
