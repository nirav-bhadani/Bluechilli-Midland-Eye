/**
 * Opens the global Midland Eye assistant. Optionally seeds it with a starting
 * prompt (e.g. from a suggestion chip or CTA), which the panel sends
 * automatically on open.
 *
 * Usage from any button:
 *   onClick={() => openChat()}                       // just open
 *   onClick={() => openChat("Do you offer 0% finance?")}  // open + ask
 */
export function openChat(prompt?: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("openChat", { detail: prompt ? { prompt } : {} })
  );
}
