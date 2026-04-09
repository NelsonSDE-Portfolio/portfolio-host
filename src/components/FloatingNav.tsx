import { useState, useEffect, useRef, useCallback } from 'react';
import { useActiveSection } from '../hooks/useActiveSection';

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
];

interface FloatingNavProps {
  onCommandPalette?: () => void;
}

export function FloatingNav({ onCommandPalette }: FloatingNavProps) {
  const activeSection = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const container = document.querySelector('.snap-container');
    if (!container) return;
    const handleScroll = () => setScrolled(container.scrollTop > 400);
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Focus trap + escape for drawer
  useEffect(() => {
    if (!drawerOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDrawerOpen(false);
        hamburgerRef.current?.focus();
        return;
      }

      if (e.key === 'Tab' && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'a, button, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    // Focus first item in drawer
    const firstLink = drawerRef.current?.querySelector<HTMLElement>('a, button');
    firstLink?.focus();

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [drawerOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const scrollTo = useCallback((id: string) => {
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
    setDrawerOpen(false);
  }, []);

  return (
    <>
      <nav
        aria-label="Main navigation"
        className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-6 md:gap-8 px-5 md:px-6 py-3 rounded-pill backdrop-blur-xl transition-all duration-200"
        style={{
          background: scrolled ? 'rgba(17,17,24,0.92)' : 'var(--glass)',
          border: '1px solid var(--border)',
        }}
      >
        {/* Monogram */}
        <a
          href="#"
          onClick={e => { e.preventDefault(); const c = document.querySelector('.snap-container'); if (c) c.scrollTo({ top: 0, behavior: 'smooth' }); else window.scrollTo({ top: 0, behavior: 'smooth' }); history.replaceState(null, '', ' '); }}
          className="font-mono font-bold text-sm"
          style={{ color: 'var(--accent)' }}
        >
          NR
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {SECTIONS.map(section => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={e => { e.preventDefault(); scrollTo(section.id); }}
              className="relative text-sm font-medium transition-colors duration-200 pb-1"
              style={{ color: activeSection === section.id ? 'var(--text-primary)' : 'var(--text-secondary)' }}
              {...(activeSection === section.id ? { 'aria-current': 'true' as const } : {})}
            >
              {section.label}
              {activeSection === section.id && (
                <span
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ background: 'var(--accent)' }}
                />
              )}
            </a>
          ))}
        </div>

        {/* Cmd+K badge (desktop) */}
        {onCommandPalette && (
          <button
            onClick={onCommandPalette}
            className="hidden md:inline-flex font-mono text-[11px] px-1.5 py-0.5 rounded cursor-pointer transition-colors duration-200"
            style={{
              color: 'var(--text-muted)',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid var(--border)',
            }}
          >
            ⌘K
          </button>
        )}

        {/* Hamburger (mobile) */}
        <button
          ref={hamburgerRef}
          onClick={() => setDrawerOpen(true)}
          className="md:hidden flex flex-col gap-1 p-1 cursor-pointer"
          aria-label="Open navigation menu"
          aria-expanded={drawerOpen}
        >
          <span className="block w-5 h-0.5 rounded" style={{ background: 'var(--text-secondary)' }} />
          <span className="block w-5 h-0.5 rounded" style={{ background: 'var(--text-secondary)' }} />
          <span className="block w-3.5 h-0.5 rounded" style={{ background: 'var(--text-secondary)' }} />
        </button>
      </nav>

      {/* Mobile drawer */}
      {drawerOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[150] backdrop-blur-sm"
            style={{ background: 'rgba(0,0,0,0.5)' }}
            onClick={() => { setDrawerOpen(false); hamburgerRef.current?.focus(); }}
          />

          {/* Drawer */}
          <div
            ref={drawerRef}
            role="dialog"
            aria-label="Navigation menu"
            className="fixed top-0 right-0 bottom-0 z-[151] w-64 p-8 flex flex-col gap-6"
            style={{
              background: 'var(--bg-secondary)',
              borderLeft: '1px solid var(--border)',
              animation: 'slideInRight 200ms ease-out',
            }}
          >
            <button
              onClick={() => { setDrawerOpen(false); hamburgerRef.current?.focus(); }}
              className="self-end p-2 cursor-pointer"
              style={{ color: 'var(--text-secondary)' }}
              aria-label="Close navigation menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {SECTIONS.map(section => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={e => { e.preventDefault(); scrollTo(section.id); hamburgerRef.current?.focus(); }}
                className="text-lg font-medium py-2 transition-colors duration-200"
                style={{
                  color: activeSection === section.id ? 'var(--accent)' : 'var(--text-secondary)',
                  minHeight: '44px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {section.label}
              </a>
            ))}
          </div>
        </>
      )}

      {/* Drawer animation keyframes */}
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
