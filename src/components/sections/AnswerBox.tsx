/**
 * [NEW – AEO] 40–60-word answer distilled from the page's own live intro —
 * same facts, no new claims (home.md B6).
 */
export function AnswerBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 max-w-2xl rounded-card border-l-4 border-secondary bg-soft p-5">
      <p className="text-base leading-relaxed text-primary">{children}</p>
    </div>
  );
}
