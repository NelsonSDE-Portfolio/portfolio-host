import { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

const SUBTITLES = ['Backend Architect', 'Full Stack Engineer', 'AI Enthusiast'];
const TYPE_SPEED = 60;
const PAUSE_DURATION = 2000;
const DELETE_SPEED = 30;

export function useSubtitleRotation() {
  const prefersReducedMotion = useReducedMotion();
  const [text, setText] = useState('');
  const stateRef = useRef({ index: 0, charPos: 0, phase: 'typing' as 'typing' | 'pausing' | 'deleting' });

  useEffect(() => {
    if (prefersReducedMotion) {
      setText(SUBTITLES[0]);
      return;
    }

    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      const s = stateRef.current;
      const word = SUBTITLES[s.index];

      if (s.phase === 'typing') {
        s.charPos++;
        setText(word.slice(0, s.charPos));
        if (s.charPos >= word.length) {
          s.phase = 'pausing';
          timer = setTimeout(tick, PAUSE_DURATION);
        } else {
          timer = setTimeout(tick, TYPE_SPEED);
        }
      } else if (s.phase === 'pausing') {
        s.phase = 'deleting';
        timer = setTimeout(tick, DELETE_SPEED);
      } else {
        s.charPos--;
        setText(word.slice(0, s.charPos));
        if (s.charPos <= 0) {
          s.index = (s.index + 1) % SUBTITLES.length;
          s.phase = 'typing';
          timer = setTimeout(tick, TYPE_SPEED);
        } else {
          timer = setTimeout(tick, DELETE_SPEED);
        }
      }
    };

    timer = setTimeout(tick, TYPE_SPEED);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [prefersReducedMotion]);

  return text;
}
