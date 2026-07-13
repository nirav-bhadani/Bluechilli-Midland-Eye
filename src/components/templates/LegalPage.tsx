import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BlockRenderer } from "@/components/sections/BlockRenderer";
import type { LegalPageContent } from "@/lib/types";

/** T2 document style: breadcrumb, H1, last-updated, verbatim prose, no CTAs. */
export function LegalPage({ content, title }: { content: LegalPageContent; title: string }) {
  const blocks = content.blocks.filter(
    (b, i) => !(i < 2 && b.t === "h1" && b.text.trim().toLowerCase() === title.trim().toLowerCase())
  );
  return (
    <>
      <Breadcrumbs items={[{ label: title, href: content.meta.path }]} />
      <article className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-4xl">{title}</h1>
        {content.lastModified && (
          <p className="mt-3 text-sm text-body/70">
            Last updated:{" "}
            {new Date(content.lastModified).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        )}
        <div className="mt-8">
          <BlockRenderer blocks={blocks} headingShift />
        </div>
      </article>
    </>
  );
}
