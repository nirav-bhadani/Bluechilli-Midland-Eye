import { clinic, hero } from "@/content/global";
import { ButtonLink } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Highlight } from "@/components/ui/Highlight";

/**
 * Navy conversion band. `callFirst` swaps CTA priority for emergency-intent
 * pages (retinal detachment).
 */
export function CtaBand({ callFirst = false }: { callFirst?: boolean }) {
  return (
    <section className="mesh-navy relative overflow-hidden py-16 text-white sm:py-20">
      <svg aria-hidden className="float-slow pointer-events-none absolute -right-24 -top-24 h-96 w-96 opacity-15" viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="100" r="80" stroke="#40BADA" strokeWidth="2" />
        <circle cx="100" cy="100" r="55" stroke="#40BADA" strokeWidth="2" />
        <circle cx="100" cy="100" r="30" stroke="#40BADA" strokeWidth="2" />
      </svg>
      <div className="container relative text-center">
        <h2 className="mx-auto max-w-2xl text-3xl font-bold text-white sm:text-4xl">
          Book your consultation <Highlight dark>today</Highlight>
        </h2>
        <p className="mt-4 text-lg text-white/85">{hero.strap}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {callFirst ? (
            <>
              <ButtonLink href={clinic.phoneHref} variant="accent" size="lg">
                ☎ Call {clinic.phone} now
              </ButtonLink>
              <ButtonLink href="/contact#booking-form" variant="white">
                Book a Consultation
              </ButtonLink>
            </>
          ) : (
            <>
              <ButtonLink href="/contact#booking-form" variant="accent">
                Book a Consultation
              </ButtonLink>
              <ButtonLink href="/finance-options" variant="white">
                View Finance Options
              </ButtonLink>
            </>
          )}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {hero.chips.slice(0, 3).map((c) => (
            <Chip key={c} dark>
              {c}
            </Chip>
          ))}
        </div>
      </div>
    </section>
  );
}
