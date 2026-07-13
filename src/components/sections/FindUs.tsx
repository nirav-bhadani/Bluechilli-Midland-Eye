import { clinic } from "@/content/global";
import { BookingForm } from "@/components/sections/BookingForm";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Highlight } from "@/components/ui/Highlight";
import { Reveal } from "@/components/motion/Reveal";

const mapsQuery = encodeURIComponent(
  `${clinic.name}, ${clinic.address.street}, ${clinic.address.town} ${clinic.address.postcode}`
);

const ICONS = {
  pin: "M12 21s-7-6-7-11a7 7 0 1114 0c0 5-7 11-7 11z|M12 8a2.5 2.5 0 100 5 2.5 2.5 0 000-5z",
  phone: "M4 5c0 9 6 15 15 15l1.5-4-4-1.5-2 2c-3-1.5-5.5-4-7-7l2-2L8 3.5 4 5z",
  mail: "M4 6h16v12H4z|M4 7l8 6 8-6",
  clock: "M12 3a9 9 0 100 18 9 9 0 000-18z|M12 8v4l3 2",
  car: "M5 12l1.5-4.5A2 2 0 018.4 6h7.2a2 2 0 011.9 1.5L19 12M5 12h14v5H5z|M7 17v2M17 17v2|M7.5 14h.01M16.5 14h.01",
};

function DetailIcon({ d }: { d: string }) {
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-soft text-teal-dark">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {d.split("|").map((p, k) => (
          <path key={k} d={p} />
        ))}
      </svg>
    </span>
  );
}

export function FindUs() {
  return (
    <section className="section">
      <div className="container">
        <div className="max-w-2xl">
          <Eyebrow>Find us</Eyebrow>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Visit <Highlight>Us</Highlight>
          </h2>
          <p className="mt-5 text-lg text-body">
            We&rsquo;re open 7 days a week with free on-site parking. Call us or book your
            consultation below.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-start">
          {/* Left — map + details */}
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
              <li className="flex items-start gap-4 rounded-2xl border border-line bg-white p-4 shadow-soft">
                <DetailIcon d={ICONS.pin} />
                <div>
                  <p className="font-semibold text-primary">Address</p>
                  <p className="mt-0.5 text-[15px] text-body">
                    {clinic.address.street}, {clinic.address.town}, {clinic.address.county},{" "}
                    {clinic.address.postcode}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4 rounded-2xl border border-line bg-white p-4 shadow-soft">
                <DetailIcon d={ICONS.phone} />
                <div>
                  <p className="font-semibold text-primary">Phone</p>
                  <a href={clinic.phoneHref} className="mt-0.5 block text-[15px] font-semibold text-teal-dark">
                    {clinic.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4 rounded-2xl border border-line bg-white p-4 shadow-soft">
                <DetailIcon d={ICONS.mail} />
                <div>
                  <p className="font-semibold text-primary">Email</p>
                  <a href={`mailto:${clinic.email}`} className="mt-0.5 block break-all text-[15px] font-semibold text-teal-dark">
                    {clinic.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4 rounded-2xl border border-line bg-white p-4 shadow-soft">
                <DetailIcon d={ICONS.clock} />
                <div>
                  <p className="font-semibold text-primary">Opening times</p>
                  {clinic.openingTimes.map((o) => (
                    <p key={o.days} className="mt-0.5 text-[15px] text-body">
                      {o.days}: {o.hours}
                    </p>
                  ))}
                </div>
              </li>
              <li className="flex items-start gap-4 rounded-2xl border border-line bg-white p-4 shadow-soft sm:col-span-2">
                <DetailIcon d={ICONS.car} />
                <div>
                  <p className="font-semibold text-primary">Parking &amp; directions</p>
                  <p className="mt-0.5 text-[15px] text-body">
                    Free on-site parking accessed via Grove Road. Solihull station is a 10-minute
                    taxi journey.{" "}
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="font-semibold text-teal-dark underline"
                    >
                      Get directions →
                    </a>
                  </p>
                </div>
              </li>
            </ul>
          </Reveal>

          {/* Right — integrated enquiry form */}
          <Reveal delay={0.1}>
            <div className="rounded-[1.75rem] border border-line bg-soft/60 p-6 shadow-soft sm:p-8">
              <h3 className="text-2xl font-bold text-ink">Book your consultation</h3>
              <p className="mt-2 text-body">
                Tell us a little about you and we&rsquo;ll be in touch to arrange your visit.
              </p>
              <div className="mt-6">
                <BookingForm />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
