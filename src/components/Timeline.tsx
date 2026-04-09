import { type ReactNode, useState, useEffect, useRef } from 'react';
import { ScrollReveal } from './ScrollReveal';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface TimelineProps {
  children: ReactNode;
  className?: string;
}

export function Timeline({ children, className = '' }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fillPercent, setFillPercent] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setFillPercent(100);
      return;
    }

    let rafId: number;
    const update = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrolled = viewportHeight - rect.top;
      const total = rect.height;
      const percent = Math.min(Math.max((scrolled / total) * 100, 0), 100);
      setFillPercent(percent);
      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, [prefersReducedMotion]);

  return (
    <div ref={containerRef} className={`relative pl-8 ${className}`}>
      {/* Timeline line */}
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5"
        style={{
          background: `linear-gradient(to bottom, var(--accent) ${fillPercent}%, var(--border) ${fillPercent}%)`,
        }}
      />
      {children}
    </div>
  );
}

interface TimelineItemProps {
  role: string;
  company: string;
  date: string;
  highlights: string[];
  activities?: string[];
  isCurrent?: boolean;
  delay?: number;
}

export function TimelineItem({ role, company, date, highlights, activities, isCurrent = false, delay = 0 }: TimelineItemProps) {
  return (
    <div className="relative mb-12 pl-8">
      {/* Dot */}
      <span
        className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full"
        style={{
          background: isCurrent ? 'var(--accent)' : 'var(--bg-primary)',
          border: `2px solid var(--accent)`,
          boxShadow: isCurrent ? '0 0 12px var(--accent-glow)' : undefined,
        }}
      />

      <ScrollReveal delay={delay}>
        <div
          className="rounded-card p-6 transition-all duration-200"
          style={{
            background: 'var(--bg-secondary)',
            border: `1px solid ${isCurrent ? 'rgba(59,130,246,0.15)' : 'var(--border)'}`,
          }}
          onMouseEnter={e => {
            if (window.matchMedia('(hover: hover)').matches) {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(59,130,246,0.06)';
            }
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = '';
            e.currentTarget.style.boxShadow = '';
          }}
        >
          <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>{role}</h3>
          <p className="text-[15px] font-medium mb-1" style={{ color: 'var(--accent)' }}>{company}</p>
          <p className="font-mono text-xs mb-3" style={{ color: 'var(--text-muted)' }}>{date}</p>

          {activities && activities.length > 0 && (
            <ul className="mb-3 space-y-1.5">
              {activities.map((a, i) => (
                <li key={i} className="text-sm flex items-start gap-2" style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: 'var(--accent)' }} />
                  {a}
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap gap-2">
            {highlights.map(h => (
              <span
                key={h}
                className="text-xs px-2.5 py-1 rounded-md"
                style={{
                  color: 'var(--text-secondary)',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border)',
                }}
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
