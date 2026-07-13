/**
 * Premium section subtitle — uppercase tracked label with a short decorative
 * accent line beneath (consistent across every homepage section).
 */
export function Eyebrow({
  children,
  align = "left",
  dark = false,
}: {
  children: React.ReactNode;
  align?: "left" | "center";
  dark?: boolean;
}) {
  return (
    <div className={`flex flex-col ${align === "center" ? "items-center" : "items-start"}`}>
      <span
        className={`text-xs font-semibold uppercase tracking-[0.25em] ${
          dark ? "text-brandlight" : "text-teal-dark"
        }`}
      >
        {children}
      </span>
      <span
        aria-hidden
        className={`mt-3 h-[3px] w-12 rounded-full ${dark ? "bg-brandlight" : "bg-secondary"}`}
      />
    </div>
  );
}
