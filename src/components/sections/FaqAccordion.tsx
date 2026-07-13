import { stripInlineMedia } from "@/lib/html";

/**
 * Native <details> accordion — content stays in the HTML (indexable),
 * first item open by default (home.md B5). Server Component; no JS.
 * Premium open state: teal accent bar, rotating chevron, content slide-in.
 */
export function FaqAccordion({
  items,
  className = "",
  firstOpen = true,
}: {
  items: { q: string; a: string }[];
  className?: string;
  firstOpen?: boolean;
}) {
  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item, i) => (
        <details
          key={i}
          open={firstOpen && i === 0}
          className="group relative overflow-hidden rounded-card border border-line bg-white transition-shadow open:shadow-lifted"
        >
          <span
            aria-hidden
            className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-secondary transition-transform duration-300 group-open:scale-y-100"
          />
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 font-semibold text-primary transition-colors hover:bg-soft [&::-webkit-details-marker]:hidden">
            {item.q}
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="h-5 w-5 shrink-0 text-secondary transition-transform duration-300 group-open:rotate-180"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </summary>
          <div className="border-t border-line/60 px-6 pb-6 pt-4 motion-safe:animate-[faq-in_0.3s_ease-out]">
            <div
              className="[&_a]:font-semibold [&_a]:text-teal-dark [&_a]:underline [&_li]:mt-1 [&_p]:mt-2 [&_p:first-child]:mt-0 [&_ul]:list-disc [&_ul]:pl-5"
              dangerouslySetInnerHTML={{ __html: stripInlineMedia(item.a) }}
            />
          </div>
        </details>
      ))}
    </div>
  );
}
