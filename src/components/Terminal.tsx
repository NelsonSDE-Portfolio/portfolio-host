import { useTypewriter, type TypewriterSequence } from '../hooks/useTypewriter';

const SEQUENCES: TypewriterSequence[] = [
  { command: 'whoami', output: 'Nelson Riera — Senior Software Engineer' },
  { command: 'cat passion.txt', output: 'Curious engineer. Hard problems. Real impact.' },
  { command: 'echo $STATUS', output: 'Building something new.' },
];

const ARIA_LABEL =
  'Terminal showing: Nelson Riera, Senior Software Engineer. Passion: Curious engineer, hard problems, real impact. Status: Building something new.';

export function Terminal() {
  const { lines } = useTypewriter({ sequences: SEQUENCES, initialDelay: 400 });

  return (
    <div
      role="img"
      aria-label={ARIA_LABEL}
      className="rounded-xl overflow-hidden font-mono text-sm leading-7"
      style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)' }}
    >
      {/* Window chrome */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border)' }}
      >
        <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f56' }} />
        <span className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
        <span className="w-3 h-3 rounded-full" style={{ background: '#27c93f' }} />
        <span
          className="flex-1 text-center text-xs"
          style={{ color: 'var(--text-muted)' }}
        >
          nelson@portfolio ~ %
        </span>
      </div>

      {/* Terminal body */}
      <div className="p-5 min-h-[200px]">
        {lines.length === 0 && (
          <div>
            <span className="font-bold" style={{ color: 'var(--accent)' }}>$ </span>
            <span className="inline-block w-[2px] h-[1.1em] align-text-bottom animate-blink" style={{ background: 'var(--accent)' }} />
          </div>
        )}
        {lines.map((line, i) => {
          if (line.type === 'prompt') {
            return (
              <div key={i} className="mt-4">
                <span className="font-bold" style={{ color: 'var(--accent)' }}>$ </span>
                <span className="inline-block w-[2px] h-[1.1em] align-text-bottom animate-blink" style={{ background: 'var(--accent)' }} />
              </div>
            );
          }

          if (line.type === 'command') {
            return (
              <div key={i}>
                <span className="font-bold" style={{ color: 'var(--accent)' }}>$ </span>
                <span style={{ color: 'var(--text-primary)' }}>{line.text}</span>
                {line.isTyping && (
                  <span className="inline-block w-[2px] h-[1.1em] align-text-bottom animate-blink" style={{ background: 'var(--accent)' }} />
                )}
              </div>
            );
          }

          // output
          return (
            <div key={i} className={i > 0 && lines[i - 1]?.type === 'output' ? '' : 'mb-4'}>
              <span style={{ color: 'var(--text-secondary)' }}>{line.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
