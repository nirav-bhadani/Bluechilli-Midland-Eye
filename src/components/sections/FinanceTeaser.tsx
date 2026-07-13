import { financeTeaser } from "@/content/global";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Highlight } from "@/components/ui/Highlight";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Chrysalis Finance wordmark (the live site's finance provider). Inline
 * approximation — drop the official asset at /images/chrysalis-finance.svg
 * and swap the <svg> for an <Image> for a pixel-exact logo.
 */
function ChrysalisMark() {
  return (
    <div className="flex items-center gap-3 text-white">
      <svg viewBox="0 0 72 52" className="h-11 w-auto shrink-0 overflow-visible" aria-hidden>
        <g fill="currentColor">
          <path d="M34 28C20 14 6 18 8 30 6 42 22 44 34 30Z" />
          <path d="M38 28C52 14 66 18 64 30 66 42 50 44 38 30Z" />
          <ellipse cx="36" cy="29" rx="2.3" ry="11" />
        </g>
        <path d="M35 18C32 10 28 8 26 9M37 18C40 10 44 8 46 9" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      </svg>
      <span className="leading-none">
        <span className="block text-2xl font-semibold tracking-tight">chrysalis</span>
        <span className="block text-[0.6rem] uppercase tracking-[0.45em] text-white/70">finance</span>
      </span>
    </div>
  );
}

/** Home finance block — live copy verbatim (home.md B5), premium redesign. */
export function FinanceTeaser() {
  return (
    <section className="mesh-navy section relative overflow-hidden text-white">
      {/* Floating soft shapes */}
      <span aria-hidden className="float-slow pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />
      <span aria-hidden className="float-slow pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-brandlight/15 blur-3xl" style={{ animationDelay: "-6s" }} />
      <svg aria-hidden viewBox="0 0 200 200" fill="none" className="pointer-events-none absolute right-10 top-1/2 hidden h-[440px] w-[440px] -translate-y-1/2 opacity-[0.08] lg:block">
        <circle cx="100" cy="100" r="92" stroke="#40BADA" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="62" stroke="#40BADA" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="32" stroke="#40BADA" strokeWidth="1.5" />
      </svg>

      <div className="container relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal>
          <Eyebrow dark>{financeTeaser.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Finance <Highlight dark>Done Right</Highlight>
          </h2>
          <p className="mt-5 max-w-md text-lg text-white/75">
            Spread the cost of your treatment over 24–60 months with 0% finance — no hidden fees,
            arranged through our FCA-regulated provider.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {financeTeaser.points.map((p) => (
              <div key={p.title} className="rounded-2xl bg-white/5 p-5 ring-1 ring-inset ring-white/10 transition-colors duration-300 hover:bg-white/10">
                <h3 className="text-lg font-semibold text-brandlight">{p.title}</h3>
                <p className="mt-2 text-sm text-white/80">{p.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink href="/contact#booking-form" variant="accent">
              Book your consultation
            </ButtonLink>
            <ButtonLink href="/finance-options" variant="white">
              Explore Finance Options
            </ButtonLink>
          </div>
        </Reveal>

        {/* Provider trust panel */}
        <Reveal delay={0.1}>
          <div className="glass rounded-[1.75rem] p-8 text-body shadow-lifted">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-teal-dark">
              Finance provider
            </p>
            <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl bg-primary p-6">
              <ChrysalisMark />
              <span className="rounded-full bg-brandlight/20 px-3 py-1 text-sm font-semibold text-brandlight">
                0% APR
              </span>
            </div>
            <ul className="mt-6 space-y-3">
              {[
                "Interest-free payments over 24 to 60 months",
                "No hidden fees or extra charges",
                "Quick, obligation-free monthly quote",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-secondary" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="m5 13 4 4L19 7" />
                  </svg>
                  <span className="text-[15px]">{t}</span>
                </li>
              ))}
            </ul>
            {/* Verbatim FCA credit line from the finance page */}
            <p className="mt-6 border-t border-line pt-4 text-xs leading-relaxed text-body/60">
              Finance provided by Chrysalis Finance Limited, which is authorised and regulated by the
              Financial Conduct Authority. Eye-Docs Limited is a credit broker, not a lender.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
