const GITHUB_URL = 'https://github.com/NelsonSDE';
const LINKEDIN_URL = 'https://www.linkedin.com/in/nelson-riera-76421879/';
const EMAIL = 'nelsonr.sde@gmail.com';

function FooterLink({ href, label, external = true }: { href: string; label: string; external?: boolean }) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="text-sm transition-colors duration-200"
      style={{ color: 'var(--text-secondary)' }}
      onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; }}
      onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
    >
      {label}
      {external && <span className="sr-only"> (opens in new tab)</span>}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="py-16 text-center" style={{ borderTop: '1px solid var(--border)', scrollSnapAlign: 'end' }}>
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex justify-center gap-6 mb-6">
          <FooterLink href={GITHUB_URL} label="GitHub" />
          <FooterLink href={LINKEDIN_URL} label="LinkedIn" />
          <FooterLink href={`mailto:${EMAIL}`} label="Email" external={false} />
        </div>
        <p className="font-mono text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
          &copy; {new Date().getFullYear()} Nelson Riera
        </p>
        <p className="text-[13px]" style={{ color: 'var(--text-muted)' }}>
          Engineered by Nelson Riera.{' '}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            Source on GitHub &rarr;
          </a>
        </p>
      </div>
    </footer>
  );
}
