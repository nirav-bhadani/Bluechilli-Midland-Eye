export function Chip({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium ${
        dark
          ? "bg-white/10 text-white ring-1 ring-inset ring-brandlight/40"
          : "bg-soft text-primary ring-1 ring-inset ring-line"
      }`}
    >
      <svg viewBox="0 0 12 12" aria-hidden className="h-3 w-3 shrink-0">
        <circle cx="6" cy="6" r="4.5" fill="none" stroke="#40BADA" strokeWidth="2" />
      </svg>
      {children}
    </span>
  );
}
