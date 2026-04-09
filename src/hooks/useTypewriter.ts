import { useState, useEffect } from 'react';
import { useReducedMotion } from './useReducedMotion';

export interface TypewriterSequence {
  command: string;
  output: string;
}

export interface TypedLine {
  type: 'command' | 'output' | 'prompt';
  text: string;
  isTyping: boolean;
}

interface TypewriterConfig {
  sequences: TypewriterSequence[];
  typingSpeed?: number;
  pauseBetween?: number;
  initialDelay?: number;
}

export function useTypewriter({
  sequences,
  typingSpeed = 50,
  pauseBetween = 400,
  initialDelay = 800,
}: TypewriterConfig) {
  const prefersReducedMotion = useReducedMotion();
  const [lines, setLines] = useState<TypedLine[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      const result: TypedLine[] = [];
      for (const seq of sequences) {
        result.push({ type: 'command', text: seq.command, isTyping: false });
        result.push({ type: 'output', text: seq.output, isTyping: false });
      }
      result.push({ type: 'prompt', text: '', isTyping: false });
      setLines(result);
      setIsComplete(true);
      return;
    }

    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const delay = (ms: number) =>
      new Promise<void>(resolve => {
        timeouts.push(setTimeout(resolve, ms));
      });

    (async () => {
      await delay(initialDelay);
      if (cancelled) return;

      const built: TypedLine[] = [];

      for (let s = 0; s < sequences.length; s++) {
        if (cancelled) return;
        const seq = sequences[s];

        // Add command line and type it character by character
        const cmdIdx = built.length;
        built.push({ type: 'command', text: '', isTyping: true });

        for (let c = 1; c <= seq.command.length; c++) {
          if (cancelled) return;
          built[cmdIdx] = { type: 'command', text: seq.command.slice(0, c), isTyping: true };
          setLines(built.slice());
          await delay(typingSpeed);
        }
        if (cancelled) return;

        built[cmdIdx] = { type: 'command', text: seq.command, isTyping: false };
        setLines(built.slice());

        await delay(pauseBetween);
        if (cancelled) return;

        // Show output instantly
        built.push({ type: 'output', text: seq.output, isTyping: false });
        setLines(built.slice());

        if (s < sequences.length - 1) {
          await delay(pauseBetween);
        }
      }

      if (cancelled) return;
      built.push({ type: 'prompt', text: '', isTyping: false });
      setLines(built.slice());
      setIsComplete(true);
    })();

    return () => {
      cancelled = true;
      for (const t of timeouts) clearTimeout(t);
    };
  // sequences is a module-level constant, safe to omit
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion, typingSpeed, pauseBetween, initialDelay]);

  return { lines, isComplete };
}
