import { Breadcrumbs, type Crumb } from "@/components/layout/Breadcrumbs";
import { BlockRenderer } from "@/components/sections/BlockRenderer";
import { BookingForm } from "@/components/sections/BookingForm";
import { CtaBand } from "@/components/sections/CtaBand";
import { TestimonialBlock } from "@/components/sections/TestimonialBlock";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { JsonLd } from "@/components/seo/JsonLd";
import { Chip } from "@/components/ui/Chip";
import { hero as globalHero } from "@/content/global";
import { faqPageNode, medicalProcedureNode } from "@/lib/schema";
import type { TreatmentContent } from "@/lib/types";
import Link from "next/link";

export interface RelatedLink {
  label: string;
  href: string;
}

/**
 * T1 treatment template (home.md B6): breadcrumb → navy hero with H1 +
 * booking mini-form + trust chips → verbatim live content → Trust Strip →
 * testimonials → related treatments → CTA band. All copy from content/.
 */
export function TreatmentPage({
  content,
  title,
  related,
  callFirst = false,
}: {
  content: TreatmentContent;
  /** Visible H1 (live page H1). */
  title: string;
  related: RelatedLink[];
  callFirst?: boolean;
}) {
  const crumbs: Crumb[] =
    content.slug === "laser-cataract-surgery"
      ? [
          { label: "Cataract Surgery", href: "/cataract-surgery" },
          { label: title, href: content.meta.path },
        ]
      : [{ label: title, href: content.meta.path }];

  // The live page's own H1/H2 duplicate of the title is rendered by us instead.
  const blocks = content.blocks.filter(
    (b, i) => !(i < 3 && (b.t === "h1" || b.t === "h2") && b.text.trim().toLowerCase() === title.trim().toLowerCase())
  );

  return (
    <>
      <Breadcrumbs items={crumbs} />

      {/* Hero */}
      <section className="bg-primary py-12 text-white sm:py-16">
        <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-6 lg:grid-cols-[1fr_420px]">
          <div>
            <h1 className="text-4xl text-white sm:text-5xl">{title}</h1>
            <p className="mt-4 text-lg text-white/85">{globalHero.strap}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {globalHero.chips.slice(0, 3).map((c) => (
                <Chip key={c} dark>
                  {c}
                </Chip>
              ))}
            </div>
          </div>
          <div className="text-body">
            <BookingForm compact defaultTreatment={content.slug} />
          </div>
        </div>
      </section>

      {/* Verbatim live content */}
      <section className="py-14 sm:py-20">
        <article className="mx-auto max-w-[1280px] px-6">
          <BlockRenderer blocks={blocks} headingShift />
        </article>
      </section>

      <TrustStrip />
      <TestimonialBlock />

      {/* Related treatments */}
      {related.length > 0 && (
        <section className="py-14">
          <div className="mx-auto max-w-[1280px] px-6">
            <h2 className="text-2xl">Related treatments</h2>
            <ul className="mt-5 flex flex-wrap gap-4">
              {related.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className="inline-block rounded-full border-2 border-secondary px-5 py-2.5 font-semibold text-teal-dark hover:bg-soft"
                  >
                    {r.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand callFirst={callFirst} />

      <JsonLd data={medicalProcedureNode(title, content.meta.path, content.meta.metaDescription)} />
      {(() => {
        const faq = faqPageNode(content.blocks);
        return faq ? <JsonLd data={faq} /> : null;
      })()}
    </>
  );
}
