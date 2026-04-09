import { useState, useEffect, useRef, useCallback } from 'react';

export interface CommandItem {
  id: string;
  label: string;
  category: 'section' | 'project' | 'link' | 'fun';
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  items: CommandItem[];
}

const CATEGORY_LABELS: Record<string, string> = {
  section: 'Sections',
  project: 'Projects',
  link: 'Links',
  fun: 'Fun',
};

function fuzzyMatch(query: string, text: string): boolean {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  let qi = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) qi++;
  }
  return qi === q.length;
}

export function CommandPalette({ isOpen, onClose, items }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = query
    ? items.filter(item => fuzzyMatch(query, item.label))
    : items;

  const grouped = filtered.reduce<Record<string, CommandItem[]>>((acc, item) => {
    (acc[item.category] ??= []).push(item);
    return acc;
  }, {});

  const flatFiltered = Object.values(grouped).flat();

  const select = useCallback((item: CommandItem) => {
    item.action();
    onClose();
    setQuery('');
    setActiveIndex(0);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.querySelector('[data-active="true"]');
    activeEl?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(i => Math.min(i + 1, flatFiltered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && flatFiltered[activeIndex]) {
      e.preventDefault();
      select(flatFiltered[activeIndex]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  let flatIndex = 0;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[200] backdrop-blur-sm"
        style={{ background: 'rgba(0,0,0,0.5)' }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-label="Command palette"
        className="fixed z-[201] top-[20%] left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-lg rounded-xl overflow-hidden"
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
        }}
        onKeyDown={handleKeyDown}
      >
        {/* Search input */}
        <div className="p-4" style={{ borderBottom: '1px solid var(--border)' }}>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Type a command or search..."
            className="w-full bg-transparent text-sm outline-none font-display"
            style={{ color: 'var(--text-primary)' }}
            aria-label="Search commands"
          />
        </div>

        {/* Results */}
        <div ref={listRef} role="listbox" className="max-h-72 overflow-y-auto p-2">
          {flatFiltered.length === 0 && (
            <p className="text-sm px-3 py-6 text-center" style={{ color: 'var(--text-muted)' }}>
              No results for "{query}"
            </p>
          )}

          {Object.entries(grouped).map(([category, categoryItems]) => (
            <div key={category}>
              <p className="text-[11px] font-mono uppercase tracking-wider px-3 pt-3 pb-1" style={{ color: 'var(--text-muted)' }}>
                {CATEGORY_LABELS[category] || category}
              </p>
              {categoryItems.map(item => {
                const idx = flatIndex++;
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={item.id}
                    role="option"
                    aria-selected={isActive}
                    data-active={isActive}
                    onClick={() => select(item)}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm cursor-pointer transition-colors duration-100 flex items-center"
                    style={{
                      color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                      background: isActive ? 'var(--bg-tertiary)' : 'transparent',
                    }}
                    onMouseEnter={() => setActiveIndex(idx)}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer hint */}
        <div className="px-4 py-2.5 flex gap-4 text-[11px]" style={{ borderTop: '1px solid var(--border)', color: 'var(--text-muted)' }}>
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span>esc close</span>
        </div>
      </div>
    </>
  );
}
