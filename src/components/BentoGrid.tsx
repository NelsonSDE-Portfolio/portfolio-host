import { type ReactNode } from 'react';

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className = '' }: BentoGridProps) {
  return (
    <div
      role="list"
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}
    >
      {children}
    </div>
  );
}

interface BentoCellProps {
  children: ReactNode;
  span?: 1 | 2;
  className?: string;
}

export function BentoCell({ children, span = 1, className = '' }: BentoCellProps) {
  return (
    <div
      role="listitem"
      className={`rounded-card p-6 transition-all duration-200 ${
        span === 2 ? 'md:col-span-2' : ''
      } ${className}`}
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border)',
      }}
      onMouseEnter={e => {
        if (window.matchMedia('(hover: hover)').matches) {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 0 30px var(--accent-glow)';
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = '';
        e.currentTarget.style.boxShadow = '';
      }}
    >
      {children}
    </div>
  );
}
