import { journey } from "@/content/global";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/seo/JsonLd";
import { clinic } from "@/content/global";

/** 5-step journey — live copy verbatim + HowTo schema (home.md B5). */
export function JourneyStepper({ compact = false }: { compact?: boolean }) {
  const steps = compact ? journey.steps.slice(0, 4) : journey.steps;
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-6">
        <SectionHeading eyebrow={journey.heading} title={journey.intro} />
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <li key={s.stage} className="relative rounded-card border border-line bg-white p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-brandlight">
                {i + 1}
              </span>
              <p className="mt-3 text-sm font-medium uppercase tracking-wider text-teal-dark">
                {s.stage}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-primary">{s.title}</h3>
              <p className="mt-1.5 text-base">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: journey.intro,
          provider: { "@id": `${clinic.url}/#clinic` },
          step: journey.steps.map((s, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            name: s.title,
            text: s.text,
          })),
        }}
      />
    </section>
  );
}
