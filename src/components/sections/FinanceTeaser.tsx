import { financeTeaser } from "@/content/global";
import { ButtonLink } from "@/components/ui/Button";

/** Home finance block — live copy verbatim (home.md B5). */
export function FinanceTeaser() {
  return (
    <section className="bg-primary py-16 text-white sm:py-24">
      <div className="mx-auto max-w-[1280px] px-6">
        <p className="text-sm font-medium uppercase tracking-widest text-brandlight">
          {financeTeaser.eyebrow}
        </p>
        <h2 className="mt-2 text-3xl text-white sm:text-4xl">{financeTeaser.heading}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {financeTeaser.points.map((p) => (
            <div key={p.title} className="rounded-card bg-white/5 p-6 ring-1 ring-inset ring-brandlight/30">
              <h3 className="text-xl font-semibold text-brandlight">{p.title}</h3>
              <p className="mt-2 text-white/85">{p.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <ButtonLink href="/finance-options" variant="teal">
            Learn More
          </ButtonLink>
          <ButtonLink href="/contact#booking-form" variant="accent">
            Book your consultation
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
