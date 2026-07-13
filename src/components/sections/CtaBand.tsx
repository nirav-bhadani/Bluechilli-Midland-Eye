import { clinic, hero } from "@/content/global";
import { ButtonLink } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";

/**
 * Navy conversion band (home.md B5). `callFirst` swaps CTA priority for
 * emergency-intent pages (retinal detachment).
 */
export function CtaBand({ callFirst = false }: { callFirst?: boolean }) {
  return (
    <section className="relative overflow-hidden bg-primary py-16 text-white sm:py-20">
      <svg
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 opacity-20"
        viewBox="0 0 200 200"
        fill="none"
      >
        <circle cx="100" cy="100" r="80" stroke="#40BADA" strokeWidth="2" />
        <circle cx="100" cy="100" r="55" stroke="#40BADA" strokeWidth="2" />
        <circle cx="100" cy="100" r="30" stroke="#40BADA" strokeWidth="2" />
      </svg>
      <div className="relative mx-auto max-w-[1280px] px-6 text-center">
        <h2 className="text-3xl text-white sm:text-4xl">Book your consultation today</h2>
        <p className="mt-3 text-lg text-white/85">{hero.strap}</p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
          {callFirst ? (
            <>
              <ButtonLink href={clinic.phoneHref} variant="accent" className="text-lg">
                ☎ Call {clinic.phone} now
              </ButtonLink>
              <ButtonLink href="/contact#booking-form" variant="teal">
                Book a Consultation
              </ButtonLink>
            </>
          ) : (
            <>
              <ButtonLink href="/contact#booking-form" variant="accent">
                Book a Consultation
              </ButtonLink>
              <a
                href={clinic.phoneHref}
                className="text-lg font-semibold text-brandlight hover:text-white"
              >
                ☎ {clinic.phone}
              </a>
            </>
          )}
        </div>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
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
