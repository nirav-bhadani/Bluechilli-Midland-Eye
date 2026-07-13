/**
 * Two-color heading accent — highlighted word in the brand colour with a
 * hand-drawn squiggle underline (reference treatment). Rest of the heading
 * inherits the primary ink colour.
 */
export function Highlight({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <span className={`relative inline-block whitespace-nowrap ${dark ? "text-brandlight" : "text-teal-dark"}`}>
      {children}
      <svg
        aria-hidden
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        className="absolute -bottom-1.5 left-0 h-2.5 w-full"
      >
        <path
          d="M3 8C50 3 150 3 197 8"
          stroke={dark ? "#40BADA" : "#0088A5"}
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </span>
  );
}
