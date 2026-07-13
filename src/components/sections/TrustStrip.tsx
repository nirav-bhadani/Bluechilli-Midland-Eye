import { whyChooseUs } from "@/content/global";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** "Why choose us?" tiles — live homepage copy, verbatim (home.md B5). */
export function TrustStrip({ heading = true }: { heading?: boolean }) {
  return (
    <section className="bg-soft py-16 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-6">
        {heading && (
          <SectionHeading title={whyChooseUs.heading} intro={whyChooseUs.intro} />
        )}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.points.map((p) => (
            <div key={p.title} className="rounded-card bg-white p-6 shadow-soft">
              <svg viewBox="0 0 24 24" aria-hidden className="mb-3 h-8 w-8">
                <circle cx="12" cy="12" r="9" fill="none" stroke="#0088A5" strokeWidth="2" />
                <circle cx="12" cy="12" r="3.5" fill="#40BADA" />
              </svg>
              <h3 className="text-lg font-semibold text-primary">{p.title}</h3>
              <p className="mt-1.5 text-base">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
