import { whyChooseUs } from "@/content/global";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Highlight } from "@/components/ui/Highlight";
import { Reveal, RevealItem, RevealList } from "@/components/motion/Reveal";

/** Distinct line-icons per point (matches the homepage bento). */
const ICONS = [
  "M9 18h6|M10 22h4|M12 2a7 7 0 00-4 12c.5.5 1 1.4 1 3h6c0-1.6.5-2.5 1-3a7 7 0 00-4-12z",
  "M12 21s-7-6-7-11a7 7 0 1114 0c0 5-7 11-7 11z|M12 8a2.5 2.5 0 100 5 2.5 2.5 0 000-5z",
  "M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z|M9 12l2 2 4-4",
  "M12 3l2.6 5.6L21 9.3l-4.5 4 1.3 6L12 16.9 6.2 19.3l1.3-6L3 9.3l6.4-.7L12 3z",
  "M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2|M12 8a4 4 0 100 8 4 4 0 000-8z",
  "M3 7h18v10H3z|M3 11h18|M7 15h3",
];

/** "Why choose us" — verbatim tiles in the homepage premium bento (home.md B5). */
export function TrustStrip() {
  return (
    <section className="section bg-soft">
      <div className="container">
        <Reveal className="max-w-2xl">
          <Eyebrow>Why Midland Eye</Eyebrow>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            {/* Verbatim */}
            At Midland Eye Clinic, we&rsquo;re changing lives through{" "}
            <Highlight>visionary care.</Highlight>
          </h2>
        </Reveal>

        <RevealList className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.points.map((p, i) => {
            const wide = i === 0 || i === 3 || i === 5 ? "lg:col-span-2" : "";
            const navy = i === 3;
            return (
              <RevealItem key={p.title} className={wide}>
                <div
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lifted ${
                    navy ? "mesh-navy border-primary text-white" : "border-line bg-white"
                  }`}
                >
                  <span aria-hidden className={`absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100 ${navy ? "bg-brandlight/30" : "bg-secondary/15"}`} />
                  <span className={`relative flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105 ${navy ? "bg-white/10 text-brandlight" : "bg-soft text-teal-dark"}`}>
                    <svg viewBox="0 0 24 24" aria-hidden className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      {ICONS[i].split("|").map((d, k) => (
                        <path key={k} d={d} />
                      ))}
                    </svg>
                  </span>
                  <h3 className={`relative mt-6 text-xl font-semibold ${navy ? "text-white" : "text-primary"}`}>
                    {p.title}
                  </h3>
                  <p className={`relative mt-2 ${navy ? "text-white/80" : "text-body"}`}>{p.text}</p>
                  <span aria-hidden className={`absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${navy ? "bg-brandlight" : "bg-secondary"}`} />
                </div>
              </RevealItem>
            );
          })}
        </RevealList>
      </div>
    </section>
  );
}
