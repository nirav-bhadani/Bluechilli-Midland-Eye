import { PageHero } from "@/components/layout/PageHero";
import { BlockRenderer } from "@/components/sections/BlockRenderer";
import type { LegalPageContent } from "@/lib/types";

/** Legal/document page: premium compact PageHero → verbatim prose, no CTA. */
export function LegalPage({ content, title }: { content: LegalPageContent; title: string }) {
  // Drop the leading title H1 (rendered by the hero instead), by position.
  const hIdx = content.blocks.findIndex((b) => b.t === "h1");
  const blocks = hIdx >= 0 && hIdx < 2 ? content.blocks.filter((_, i) => i !== hIdx) : content.blocks;
  return (
    <>
      <PageHero
        eyebrow="Legal & compliance"
        title={title}
        crumbs={[{ label: title, href: content.meta.path }]}
      />
      <section className="section">
        <div className="container">
          <article className="mx-auto max-w-3xl">
            {content.lastModified && (
              <p className="mb-8 inline-flex items-center gap-2 rounded-full bg-soft px-4 py-1.5 text-sm font-medium text-teal-dark ring-1 ring-inset ring-line">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                Last updated{" "}
                {new Date(content.lastModified).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            )}
            <BlockRenderer blocks={blocks} headingShift />
          </article>
        </div>
      </section>
    </>
  );
}
