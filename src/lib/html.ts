/**
 * Strips inline media from migrated HTML — Elementor icon-list bullets and
 * decorative icons come through as raw <img>/<svg> with no size and render
 * huge inside prose. Text content is preserved.
 */
export function stripInlineMedia(html: string): string {
  return (
    html
      .replace(/<svg[\s\S]*?<\/svg>/gi, "")
      .replace(/<img\b[^>]*>/gi, "")
      .replace(/<i\b[^>]*><\/i>/gi, "")
      // Literal bullet glyphs in migrated text render black — tint them teal
      // to match our CSS list markers.
      .replace(/[•●▪‣]/g, '<span class="text-secondary">$&</span>')
  );
}
