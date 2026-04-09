import { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface CountUpProps {
  end: number;
  suffix?: string;
  duration?: number;
  className?: string;
  trigger?: boolean;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function CountUp({ end, suffix = '', duration = 2000, className = '', trigger = true }: CountUpProps) {
  const [value, setValue] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!trigger || hasAnimated.current) return;

    if (prefersReducedMotion) {
      setValue(end);
      hasAnimated.current = true;
      return;
    }

    hasAnimated.current = true;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      setValue(Math.round(eased * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [trigger, end, duration, prefersReducedMotion]);

  return (
    <span className={`font-mono font-bold tracking-tight ${className}`}>
      {value}{suffix}
    </span>
  );
}
