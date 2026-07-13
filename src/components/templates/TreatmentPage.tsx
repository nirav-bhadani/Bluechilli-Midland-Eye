import Link from "next/link";
import { type Crumb } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/layout/PageHero";
import { BookingForm } from "@/components/sections/BookingForm";
import { TestimonialBlock } from "@/components/sections/TestimonialBlock";
import { TreatmentSections } from "@/components/sections/TreatmentContent";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { JsonLd } from "@/components/seo/JsonLd";
import { hero as globalHero } from "@/content/global";
import { faqPageNode, medicalProcedureNode } from "@/lib/schema";
import type { TreatmentContent } from "@/lib/types";

export interface RelatedLink {
  label: string;
  href: string;
}

/**
 * T1 treatment template: premium PageHero + booking form → verbatim content →
 * Trust Strip → testimonials → related treatments → CTA band.
 */
export function TreatmentPage({
  content,
  title,
  related,
}: {
  content: TreatmentContent;
  title: string;
  related: RelatedLink[];
  /** Accepted for the retinal-detachment call-first variant (currently unused). */
  callFirst?: boolean;
}) {
  const crumbs: Crumb[] =
    content.slug === "laser-cataract-surgery"
      ? [
          { label: "Cataract Surgery", href: "/cataract-surgery" },
          { label: title, href: content.meta.path },
        ]
      : [{ label: title, href: content.meta.path }];

  const blocks = content.blocks.filter(
    (b, i) => !(i < 3 && (b.t === "h1" || b.t === "h2") && b.text.trim().toLowerCase() === title.trim().toLowerCase())
  );

  return (
    <>
      <PageHero
        eyebrow="Treatment"
        title={title}
        intro={globalHero.strap}
        crumbs={crumbs}
        chips={globalHero.chips.slice(0, 3)}
      >
        <div className="relative">
          <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-brandlight/10 blur-2xl" />
          <BookingForm compact defaultTreatment={content.slug} />
        </div>
      </PageHero>

      {/* Verbatim live content — intelligently sectioned */}
      <TreatmentSections blocks={blocks} />

      <TrustStrip />
      <TestimonialBlock />

      {/* Related treatments — premium cards */}
      {related.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tight text-ink">Related treatments</h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-lifted"
                  >
                    <span className="text-lg font-semibold text-primary transition-colors group-hover:text-teal-dark">
                      {r.label}
                    </span>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-teal-dark transition-all duration-300 group-hover:border-secondary group-hover:bg-secondary group-hover:text-white">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <JsonLd data={medicalProcedureNode(title, content.meta.path, content.meta.metaDescription)} />
      {(() => {
        const faq = faqPageNode(content.blocks);
        return faq ? <JsonLd data={faq} /> : null;
      })()}
    </>
  );
}
