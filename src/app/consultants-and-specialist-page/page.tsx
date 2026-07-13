import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { consultants } from "@/content/consultants";
import { clinic } from "@/content/global";
import { clinicId } from "@/lib/schema";
import { ConsultantsClient } from "./ConsultantsClient";

export const metadata: Metadata = {
  title: { absolute: "Our Consultant Eye Surgeons | Midland Eye Solihull & Birmingham" },
  description:
    "Meet Midland Eye's team of NHS-trained consultant ophthalmologists — Fellows of the Royal College of Ophthalmologists specialising in cataract, laser, glaucoma, retina, cornea and oculoplastics.",
  alternates: { canonical: "/consultants-and-specialist-page" },
};

export default function ConsultantsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our team"
        title="Consultants &"
        highlight="Specialists"
        /* Live intro, verbatim */
        intro="The team of consultant eye surgeons at Midland Eye offers consultations and surgery to patients with any eye condition."
        crumbs={[{ label: "Consultants & Specialists", href: "/consultants-and-specialist-page" }]}
      />

      <section className="section">
        <div className="container">
          <ConsultantsClient consultants={consultants} />
        </div>
      </section>

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
