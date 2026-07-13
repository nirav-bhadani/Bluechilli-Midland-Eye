import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BlockRenderer } from "@/components/sections/BlockRenderer";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { consultants } from "@/content/consultants";
import { clinic } from "@/content/global";
import { clinicId } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: "Our Consultant Eye Surgeons | Midland Eye Solihull & Birmingham" },
  description:
    "Meet Midland Eye's team of NHS-trained consultant ophthalmologists — Fellows of the Royal College of Ophthalmologists specialising in cataract, laser, glaucoma, retina, cornea and oculoplastics.",
  alternates: { canonical: "/consultants-and-specialist-page" },
};

export default function ConsultantsPage() {
  return (
    <>
      <Breadcrumbs
        items={[{ label: "Consultants & Specialists", href: "/consultants-and-specialist-page" }]}
      />
      <section className="bg-primary py-12 text-white sm:py-16">
        <div className="mx-auto max-w-[1280px] px-6">
          <h1 className="text-4xl text-white sm:text-5xl">Consultants &amp; Specialists</h1>
          {/* Live intro, verbatim */}
          <p className="mt-4 max-w-3xl text-lg text-white/85">
            The team of consultant eye surgeons at Midland Eye offers consultations and surgery to
            patients with any eye condition.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-[1280px] space-y-10 px-6">
          {consultants.map((c) => (
            <article
              key={c.id}
              id={c.id}
              className="scroll-mt-28 rounded-card border border-line bg-white p-6 shadow-soft sm:p-8"
            >
              <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
                <div>
                  {c.image && c.image.startsWith("/") && (
                    <div className="relative mx-auto aspect-square w-44 overflow-hidden rounded-full ring-2 ring-line lg:w-52">
                      <Image src={c.image} alt={c.name} fill sizes="208px" className="object-cover object-top" />
                    </div>
                  )}
                  <div className="mt-5 text-center">
                    <ButtonLink href="/contact#booking-form" variant="accent" className="text-sm">
                      Book with {c.name.split(" ").slice(-1)[0]}
                    </ButtonLink>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl">{c.name}</h2>
                  <p className="mt-1 font-semibold text-teal-dark">{c.title}</p>
                  {c.specialisms.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {c.specialisms.map((s) => (
                        <li key={s} className="rounded-full bg-soft px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-line">
                          {s}
                        </li>
                      ))}
                    </ul>
                  )}
                  <details className="group mt-5">
                    <summary className="cursor-pointer font-semibold text-teal-dark hover:underline">
                      <span className="group-open:hidden">Read full profile ▾</span>
                      <span className="hidden group-open:inline">Hide full profile ▴</span>
                    </summary>
                    <div className="mt-4 text-base">
                      <BlockRenderer blocks={c.blocks} headingShift />
                    </div>
                  </details>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBand />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: consultants.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Physician",
              name: c.name,
              url: `${clinic.url}/consultants-and-specialist-page#${c.id}`,
              medicalSpecialty: c.specialisms,
              worksFor: { "@id": clinicId },
            },
          })),
        }}
      />
    </>
  );
}
