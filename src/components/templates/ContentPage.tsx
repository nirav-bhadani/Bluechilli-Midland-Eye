import { PageHero } from "@/components/layout/PageHero";
import { BlockRenderer } from "@/components/sections/BlockRenderer";
import type { PageContent } from "@/lib/types";

/** T2 content page: premium PageHero → verbatim prose. */
export function ContentPage({
  content,
  title,
  eyebrow = "Midland Eye",
  highlight,
  intro,
  children,
}: {
  content: PageContent;
  title: string;
  eyebrow?: string;
  highlight?: string;
  intro?: string;
  children?: React.ReactNode;
}) {
  // Drop the leading title H1 (rendered by the hero instead), by position.
  const hIdx = content.blocks.findIndex((b) => b.t === "h1");
  const blocks = hIdx >= 0 && hIdx < 2 ? content.blocks.filter((_, i) => i !== hIdx) : content.blocks;
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        highlight={highlight}
        intro={intro}
        crumbs={[{ label: title, href: content.meta.path }]}
      />
      <section className="section">
        <div className="container">
          <article className="mx-auto max-w-3xl">
            <BlockRenderer blocks={blocks} headingShift />
          </article>
        </div>
      </section>
      {children}
    </>
  );
}
