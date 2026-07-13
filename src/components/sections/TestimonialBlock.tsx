import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Patient reviews section. The live Trustpilot/Doctify widgets need account
 * widget IDs (post-approval task) — until then this renders the rating facts
 * with links out, no third-party script.
 */
export function TestimonialBlock({ quote }: { quote?: { text: string; source: string } }) {
  return (
    <section className="bg-soft py-16 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-6 text-center">
        <SectionHeading title="What our patients say" />
        <p aria-label="Rated 5 stars" className="text-3xl tracking-widest text-accent">
          ★★★★★
        </p>
        <p className="mt-3 text-lg font-semibold text-primary">
          Rated 5 stars by our patients on Trustpilot and Doctify
        </p>
        {quote && (
          <blockquote className="mx-auto mt-8 max-w-2xl rounded-card bg-white p-8 shadow-soft">
            <p className="text-lg">“{quote.text}”</p>
            <footer className="mt-4 text-sm font-medium text-teal-dark">— {quote.source}</footer>
          </blockquote>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm font-semibold">
          <a
            href="https://uk.trustpilot.com/review/midlandeye.com"
            rel="noopener noreferrer"
            target="_blank"
            className="text-teal-dark underline hover:text-primary"
          >
            Read our Trustpilot reviews
          </a>
          <a
            href="https://www.doctify.com/uk/practice/midland-eye"
            rel="noopener noreferrer"
            target="_blank"
            className="text-teal-dark underline hover:text-primary"
          >
            Find our surgeons on Doctify
          </a>
        </div>
      </div>
    </section>
  );
}
