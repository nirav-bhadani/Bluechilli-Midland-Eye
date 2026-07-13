import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BlockRenderer } from "@/components/sections/BlockRenderer";
import { CtaBand } from "@/components/sections/CtaBand";
import type { PageContent } from "@/lib/types";

/** T2 content page: navy hero H1 → verbatim prose → CTA band. */
export function ContentPage({
  content,
  title,
  intro,
  cta = true,
  children,
}: {
  content: PageContent;
  title: string;
  intro?: string;
  cta?: boolean;
  children?: React.ReactNode;
}) {
  const blocks = content.blocks.filter(
    (b, i) => !(i < 2 && b.t === "h1" && b.text.trim().toLowerCase() === title.trim().toLowerCase())
  );
  return (
    <>
      <Breadcrumbs items={[{ label: title, href: content.meta.path }]} />
      <section className="bg-primary py-12 text-white sm:py-16">
        <div className="mx-auto max-w-[1280px] px-6">
          <h1 className="text-4xl text-white sm:text-5xl">{title}</h1>
          {intro && <p className="mt-4 max-w-2xl text-lg text-white/85">{intro}</p>}
        </div>
      </section>
      <article className="mx-auto max-w-[1280px] px-6 py-14">
        <BlockRenderer blocks={blocks} headingShift />
      </article>
      {children}
      {cta && <CtaBand />}
    </>
  );
}
