import { Link } from 'react-router-dom';

interface FeaturedProjectProps {
  title: string;
  description: string;
  metrics: string[];
  liveUrl: string;
  architectureUrl: string;
  screenshotSrc?: string;
  isLive: boolean;
}

export function FeaturedProject({
  title,
  description,
  metrics,
  liveUrl,
  architectureUrl,
  screenshotSrc,
  isLive,
}: FeaturedProjectProps) {
  return (
    <div
      className="rounded-card overflow-hidden grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] transition-all duration-300"
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border)',
      }}
      onMouseEnter={e => {
        if (window.matchMedia('(hover: hover)').matches) {
          e.currentTarget.style.boxShadow = '0 0 40px rgba(59,130,246,0.08)';
        }
      }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; }}
    >
      {/* Browser mockup */}
      <div className="p-6 md:p-8 flex items-center justify-center" style={{ background: 'var(--bg-tertiary)' }}>
        <div className="w-full rounded-lg overflow-hidden" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)' }}>
          {/* Browser bar */}
          <div
            className="flex items-center gap-1.5 px-3.5 py-2.5"
            style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border)' }}
          >
            <span className="w-2 h-2 rounded-full" style={{ background: 'var(--text-muted)', opacity: 0.3 }} />
            <span className="w-2 h-2 rounded-full" style={{ background: 'var(--text-muted)', opacity: 0.3 }} />
            <span className="w-2 h-2 rounded-full" style={{ background: 'var(--text-muted)', opacity: 0.3 }} />
            <span className="flex-1 text-center font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>
              challenge-tracker.nelsonriera.dev
            </span>
          </div>
          {/* Screenshot area */}
          <div
            className="h-48 md:h-56 flex items-center justify-center"
            style={{
              background: screenshotSrc ? undefined : 'linear-gradient(135deg, var(--bg-tertiary), var(--bg-secondary))',
            }}
          >
            {screenshotSrc ? (
              <img src={screenshotSrc} alt={`${title} screenshot`} className="w-full h-full object-cover" />
            ) : (
              <span className="text-sm" style={{ color: 'var(--text-muted)' }}>[ Screenshot ]</span>
            )}
          </div>
        </div>
      </div>

      {/* Project info */}
      <div className="p-6 md:p-10 flex flex-col justify-center">
        {isLive && (
          <span
            className="inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1 rounded-pill w-fit mb-4"
            style={{
              color: '#27c93f',
              background: 'rgba(39,201,63,0.1)',
              border: '1px solid rgba(39,201,63,0.2)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#27c93f' }} />
            Live
          </span>
        )}

        <h3 className="text-2xl font-semibold tracking-tight mb-3" style={{ color: 'var(--text-primary)' }}>
          {title}
        </h3>

        <p className="text-[15px] mb-5" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {metrics.map(m => (
            <span
              key={m}
              className="text-xs font-medium px-3 py-1.5 rounded-md"
              style={{
                color: 'var(--text-secondary)',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border)',
              }}
            >
              {m}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to={liveUrl}
            className="inline-flex items-center gap-1.5 text-sm font-semibold px-5 py-2.5 rounded-lg text-white transition-colors duration-200"
            style={{ background: 'var(--accent)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-hover)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)'; }}
          >
            Try it live →
          </Link>
          <Link
            to={architectureUrl}
            className="inline-flex items-center gap-1.5 text-sm font-medium px-5 py-2.5 rounded-lg transition-colors duration-200"
            style={{
              color: 'var(--text-secondary)',
              border: '1px solid var(--border)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--text-primary)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.borderColor = 'var(--border)';
            }}
          >
            View Architecture →
          </Link>
        </div>
      </div>
    </div>
  );
}
