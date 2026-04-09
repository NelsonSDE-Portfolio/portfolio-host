interface SectionLabelProps {
  number: string;
  label: string;
}

export function SectionLabel({ number, label }: SectionLabelProps) {
  return (
    <span
      aria-hidden="true"
      className="block font-mono text-xs font-medium uppercase tracking-[0.2em] mb-4"
      style={{ color: 'var(--accent)' }}
    >
      // {number}. {label}
    </span>
  );
}
