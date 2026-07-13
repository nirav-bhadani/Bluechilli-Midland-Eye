import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { BookingForm } from "@/components/sections/BookingForm";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { clinic } from "@/content/global";
import { content } from "@/content/pages/contact";
import { clinicNode } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: content.meta.metaTitle },
  description: content.meta.metaDescription,
  alternates: { canonical: "/contact" },
};

const mapsQuery = encodeURIComponent(
  `${clinic.name}, ${clinic.address.street}, ${clinic.address.town} ${clinic.address.postcode}`
);

const ICONS = {
  pin: "M12 21s-7-6-7-11a7 7 0 1114 0c0 5-7 11-7 11z|M12 8a2.5 2.5 0 100 5 2.5 2.5 0 000-5z",
  phone: "M4 5c0 9 6 15 15 15l1.5-4-4-1.5-2 2c-3-1.5-5.5-4-7-7l2-2L8 3.5 4 5z",
  mail: "M4 6h16v12H4z|M4 7l8 6 8-6",
  clock: "M12 3a9 9 0 100 18 9 9 0 000-18z|M12 8v4l3 2",
  refer: "M9 11a4 4 0 100-8 4 4 0 000 8z|M3 21a6 6 0 0112 0|M19 8v6M16 11h6",
};

function Detail({ d, title, children }: { d: string; title: string; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-4 rounded-2xl border border-line bg-white p-4 shadow-soft">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-soft text-teal-dark">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          {d.split("|").map((p, k) => (
            <path key={k} d={p} />
          ))}
        </svg>
      </span>
      <div className="min-w-0">
        <p className="font-semibold text-primary">{title}</p>
        <div className="mt-0.5 text-[15px] text-body">{children}</div>
      </div>
    </li>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Contact"
        highlight="Us"
        /* Live intro, verbatim */
        intro="We're here to help with all your eye care needs. Whether you have questions, need to schedule an appointment, or want to learn more about our treatments, get in touch."
        crumbs={[{ label: "Contact", href: "/contact" }]}
      />

      <section className="section">
        <div className="container grid gap-8 lg:grid-cols-2 lg:items-start">
          {/* Details + map */}
          <Reveal className="space-y-6">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-line shadow-soft">
              <iframe
                title={`Map to ${clinic.name}`}
                src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-72 w-full sm:h-80"
              />
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              <Detail d={ICONS.pin} title="Address">
                {clinic.address.street}, {clinic.address.town}, {clinic.address.county},{" "}
                {clinic.address.postcode}
              </Detail>
              <Detail d={ICONS.phone} title="Phone">
                <a href={clinic.phoneHref} className="font-semibold text-teal-dark">
                  {clinic.phone}
                </a>
              </Detail>
              <Detail d={ICONS.mail} title="Email">
                <a href={`mailto:${clinic.email}`} className="break-all font-semibold text-teal-dark">
                  {clinic.email}
                </a>
              </Detail>
              <Detail d={ICONS.clock} title="Opening times">
                {clinic.openingTimes.map((o) => (
                  <span key={o.days} className="block">
                    {o.days}: {o.hours}
                  </span>
                ))}
              </Detail>
              <li className="sm:col-span-2">
                <div className="flex items-start gap-4 rounded-2xl border border-line bg-soft p-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-teal-dark">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      {ICONS.refer.split("|").map((p, k) => (
                        <path key={k} d={p} />
                      ))}
                    </svg>
                  </span>
                  <div>
                    <p className="font-semibold text-primary">Healthcare professionals</p>
                    <p className="mt-0.5 text-[15px] text-body">
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
              </li>
            </ul>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <div className="rounded-[1.75rem] border border-line bg-soft/60 p-6 shadow-soft sm:p-8">
              <h2 className="text-2xl font-bold text-ink">Book a consultation</h2>
              <p className="mt-2 text-body">
                Call{" "}
                <a href={clinic.phoneHref} className="font-semibold text-teal-dark">
                  {clinic.phone}
                </a>{" "}
                or send us your details and we&rsquo;ll be in touch.
              </p>
              <div className="mt-6">
                <BookingForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <TrustStrip />
      <JsonLd data={{ ...clinicNode(), "@type": ["MedicalClinic", "MedicalOrganization"] }} />
    </>
  );
}
