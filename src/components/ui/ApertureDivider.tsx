/** Signature aperture-arc divider — single 2px #40BADA arc (home.md A4). */
export function ApertureDivider() {
  return (
    <div aria-hidden className="flex justify-center py-2">
      <svg width="120" height="24" viewBox="0 0 120 24" fill="none">
        <path
          d="M10 22C22 6 44 2 60 2s38 4 50 20"
          stroke="#40BADA"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
