import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BookingForm } from "@/components/sections/BookingForm";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { JsonLd } from "@/components/seo/JsonLd";
import { clinic } from "@/content/global";
import { content } from "@/content/pages/contact";
import { clinicNode } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: content.meta.metaTitle },
  description: content.meta.metaDescription,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Contact", href: "/contact" }]} />
      <section className="bg-primary py-12 text-white sm:py-16">
        <div className="mx-auto max-w-[1280px] px-6">
          <h1 className="text-4xl text-white sm:text-5xl">Contact Us</h1>
          {/* Live intro, verbatim */}
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            We&rsquo;re here to help with all your eye care needs. Whether you have questions, need
            to schedule an appointment, or want to learn more about our treatments, get in touch.
          </p>
          <p className="mt-6">
            <a href={clinic.phoneHref} className="text-3xl font-bold text-brandlight hover:text-white">
              ☎ {clinic.phone}
            </a>
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-6 lg:grid-cols-[1fr_400px]">
          <div>
            <h2 className="text-2xl">Book a consultation</h2>
            <div className="mt-5">
              <BookingForm />
            </div>
          </div>
          <div className="space-y-6">
            {/* Live contact facts, verbatim */}
            <div className="rounded-card border border-line bg-soft p-6">
              <h2 className="text-xl">Where to find us</h2>
              <address className="mt-3 not-italic">
                {clinic.address.street}, {clinic.address.town},<br />
                {clinic.address.county}, {clinic.address.postcode}
              </address>
              <p className="mt-3">
                <a href={`mailto:${clinic.email}`} className="font-semibold text-teal-dark underline">
                  {clinic.email}
                </a>
              </p>
              <h3 className="mt-5 text-lg">Opening Times</h3>
              <ul className="mt-2 space-y-1">
                {clinic.openingTimes.map((o) => (
                  <li key={o.days}>
                    <strong>{o.days}:</strong> {o.hours}
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                    `${clinic.name}, ${clinic.address.street}, ${clinic.address.town} ${clinic.address.postcode}`
                  )}`}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="font-semibold text-teal-dark underline"
                >
                  Get directions →
                </a>
              </p>
            </div>
            <div className="rounded-card border border-line p-6">
              <h2 className="text-xl">Healthcare professionals</h2>
              <p className="mt-2 text-sm">
                Referring a patient? Email{" "}
                <a href={`mailto:${clinic.referralEmail}`} className="font-semibold text-teal-dark underline">
                  {clinic.referralEmail}
                </a>{" "}
                or see our{" "}
                <a href="/refer-a-patient" className="font-semibold text-teal-dark underline">
                  referral information
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />
      <JsonLd data={{ ...clinicNode(), "@type": ["MedicalClinic", "MedicalOrganization"] }} />
    </>
  );
}
