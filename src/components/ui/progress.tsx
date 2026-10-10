export function Progress({ value, label }: { value: number; label?: string }) {
  const safe = Math.max(0, Math.min(100, value));
  return (
    <div className="w-full" aria-label={label ?? `Progresso: ${Math.round(safe)}%`}>
      <div className="h-2 overflow-hidden rounded-full bg-black/7 dark:bg-white/10">
        <div className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--cyan)] transition-[width] duration-500" style={{ width: `${safe}%` }} />
      </div>
    </div>
  );
}
