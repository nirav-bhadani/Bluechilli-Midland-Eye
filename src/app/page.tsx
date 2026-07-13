import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookingForm } from "@/components/sections/BookingForm";
import { ConsultantSlider } from "@/components/sections/ConsultantSlider";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { FinanceTeaser } from "@/components/sections/FinanceTeaser";
import { JourneyStepper } from "@/components/sections/JourneyStepper";
import { TestimonialBlock } from "@/components/sections/TestimonialBlock";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal, RevealItem, RevealList } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Highlight } from "@/components/ui/Highlight";
import { clinic, hero, whyChooseUs } from "@/content/global";
import { content as home } from "@/content/pages/home";
import { consultants } from "@/content/consultants";
import { posts } from "@/content/posts";
import { content as cataract } from "@/content/treatments/cataract-surgery";
import { content as laser } from "@/content/treatments/laser-eye-surgery";
import { faqsFromBlocks } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: home.meta.metaTitle },
  description: home.meta.metaDescription,
  alternates: { canonical: "/" },
};

/** Live "Popular Treatments" cards (images + titles from the live homepage). */
const popularTreatments = [
  {
    title: "Laser Eye Surgery",
    tag: "Vision correction",
    href: "/laser-eye-surgery",
    img: "/images/2024_11_ophthalmology-medical-eye-exam-with-old-man-consulting-vision-healthcare-glaucoma-check-laser-light-innovation-with-face-patient-machine-scanning-optometry.jpg",
  },
  {
    title: "Cataract Surgery",
    tag: "No waiting times",
    href: "/cataract-surgery",
    img: "/images/2024_11_elderly-couple-with-glasses-cuddling-up-one-other-during-tense-time-generative-ai.jpg",
  },
  {
    title: "Glaucoma",
    tag: "Consultant-led",
    href: "/glaucoma",
    img: "/images/2024_11_eye-man-blue-eye-young-girl.jpg",
  },
];

const stats = [
  { n: 5, suffix: "★", label: "Doctify & Trustpilot rated" },
  { n: 300, suffix: "+", label: "Five-star patient reviews" },
  { n: 14, suffix: "", label: "Consultant eye surgeons" },
  { n: 7, suffix: " days", label: "Open every week" },
];

/** Distinct line-icons for the "Why choose us" tiles (presentational). */
const WHY_ICONS = [
  "M9 18h6|M10 22h4|M12 2a7 7 0 00-4 12c.5.5 1 1.4 1 3h6c0-1.6.5-2.5 1-3a7 7 0 00-4-12z", // pioneers
  "M12 21s-7-6-7-11a7 7 0 1114 0c0 5-7 11-7 11z|M12 8a2.5 2.5 0 100 5 2.5 2.5 0 000-5z", // Solihull
  "M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z|M9 12l2 2 4-4", // aftercare
  "M12 3l2.6 5.6L21 9.3l-4.5 4 1.3 6L12 16.9 6.2 19.3l1.3-6L3 9.3l6.4-.7L12 3z", // 5 star
  "M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2|M12 8a4 4 0 100 8 4 4 0 000-8z", // facilities
  "M3 7h18v10H3z|M3 11h18|M7 15h3", // finance
];

// [NEW – AEO] Top questions surfaced from existing treatment-page FAQ copy (verbatim answers).
const homeFaqs = [
  ...faqsFromBlocks(cataract.blocks).slice(0, 3),
  ...faqsFromBlocks(laser.blocks).slice(0, 3),
];

const featuredConsultants = consultants.slice(0, 8);

export default function Home() {
  return (
    <>
      {/* ============================================================
          1 — HERO
          ============================================================ */}
      <section className="mesh-navy relative overflow-hidden text-white">
        <svg aria-hidden viewBox="0 0 200 200" fill="none" className="float-slow pointer-events-none absolute -right-40 top-1/2 h-[720px] w-[720px] -translate-y-1/2 opacity-[0.13]">
          <circle cx="100" cy="100" r="92" stroke="#40BADA" strokeWidth="1.2" />
          <circle cx="100" cy="100" r="66" stroke="#40BADA" strokeWidth="1.2" />
          <circle cx="100" cy="100" r="40" stroke="#40BADA" strokeWidth="1.2" />
          <circle cx="100" cy="100" r="16" stroke="#40BADA" strokeWidth="1.2" />
        </svg>

        <div className="container relative grid items-center gap-14 pb-28 pt-20 lg:grid-cols-[1.05fr_440px] lg:pb-32 lg:pt-24">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-brandlight/40 bg-white/5 px-4 py-1.5 text-sm font-medium text-brandlight">
              <span className="h-1.5 w-1.5 rounded-full bg-brandlight" />
              Private eye hospital · Solihull
            </span>
            {/* Verbatim live hero copy, restyled — two-colour treatment */}
            <h1 className="mt-6 text-[clamp(2.6rem,6vw,4.75rem)] font-bold leading-[1.02] tracking-tight text-white">
              Five-star rated{" "}
              <Highlight dark>eye hospital</Highlight>
              <span className="mt-3 block text-[0.55em] font-semibold text-white/90">
                {hero.subtitle}
              </span>
            </h1>
            <p className="mt-7 max-w-md text-lg text-white/75">{hero.strap}</p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ButtonLink href="/contact#booking-form" variant="accent" size="lg">
                Book a Consultation
              </ButtonLink>
              <a href={clinic.phoneHref} className="group inline-flex items-center gap-2 text-lg font-semibold text-white">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 transition-colors group-hover:border-brandlight group-hover:text-brandlight">
                  ☎
                </span>
                {clinic.phone}
              </a>
            </div>

            <div className="mt-9 flex flex-wrap gap-2.5">
              {hero.chips.map((c) => (
                <Chip key={c} dark>
                  {c}
                </Chip>
              ))}
            </div>
          </div>

          <div className="relative text-body">
            <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-brandlight/10 blur-2xl" />
            <BookingForm compact />
          </div>
        </div>
      </section>

      {/* ============================================================
          2 — STAT BAND overlapping the hero (decorative accent lines)
          ============================================================ */}
      <section className="relative z-10 -mt-16">
        <div className="container">
          <RevealList className="flex flex-col divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white shadow-lifted sm:flex-row sm:divide-x sm:divide-y-0">
            {stats.map((s) => (
              <RevealItem key={s.label} className="flex-1">
                <div className="flex h-full flex-col items-center justify-center gap-1 px-6 py-9 text-center">
                  <p className="text-4xl font-bold text-primary sm:text-5xl">
                    <CountUp to={s.n} suffix={s.suffix} />
                  </p>
                  <span aria-hidden className="my-2 h-[3px] w-9 rounded-full bg-secondary/70" />
                  <p className="text-sm text-body/70">{s.label}</p>
                </div>
              </RevealItem>
            ))}
          </RevealList>
        </div>
      </section>

      {/* ============================================================
          3 — OUR EXPERTISE (redesigned): sticky intro + premium cards
          ============================================================ */}
      <section className="section">
        <div className="container grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <Reveal className="lg:sticky lg:top-28">
            <Eyebrow>Our expertise</Eyebrow>
            <h2 className="mt-5 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              Popular <Highlight>Treatments</Highlight>
            </h2>
            {/* Verbatim live intro */}
            <p className="mt-5 max-w-md text-lg text-body">
              Explore our most popular range of treatments at your fingertips by simply clicking
              through the options below.
            </p>
            <div className="mt-8">
              <ButtonLink href="/cataract-surgery" variant="outline">
                View All Treatments
              </ButtonLink>
            </div>
          </Reveal>

          <RevealList className="space-y-5">
            {popularTreatments.map((t, i) => (
              <RevealItem key={t.href}>
                <Link
                  href={t.href}
                  className="group flex items-center gap-6 rounded-[1.75rem] border border-line bg-white p-4 pr-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-lifted"
                >
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl sm:h-28 sm:w-28">
                    <Image
                      src={t.img}
                      alt={t.title}
                      fill
                      sizes="112px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <span aria-hidden className="absolute left-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-sm font-bold text-teal-dark">
                      0{i + 1}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-dark">
                      {t.tag}
                    </p>
                    <h3 className="mt-1.5 text-xl font-bold text-primary transition-colors group-hover:text-teal-dark sm:text-2xl">
                      {t.title}
                    </h3>
                    <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-body/60">
                      Learn more
                    </span>
                  </div>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line text-teal-dark transition-all duration-300 group-hover:border-secondary group-hover:bg-secondary group-hover:text-white">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealList>
        </div>
      </section>

      {/* ============================================================
          4 — WHY MIDLAND EYE: premium bento, distinct icons
          ============================================================ */}
      <section className="section bg-soft">
        <div className="container">
          <Reveal className="max-w-2xl">
            <Eyebrow>Why choose us</Eyebrow>
            {/* Verbatim */}
            <h2 className="mt-5 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              At Midland Eye Clinic, we&rsquo;re changing lives through{" "}
              <Highlight>visionary care.</Highlight>
            </h2>
          </Reveal>

          <RevealList className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.points.map((p, i) => {
              // Bento rhythm: alternating wide tiles; one navy feature tile.
              const wide = i === 0 || i === 3 || i === 5 ? "lg:col-span-2" : "";
              const navy = i === 3;
              return (
                <RevealItem key={p.title} className={wide}>
                  <div
                    className={`group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lifted ${
                      navy ? "mesh-navy border-primary text-white" : "border-line bg-white"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100 ${
                        navy ? "bg-brandlight/30" : "bg-secondary/15"
                      }`}
                    />
                    <span
                      className={`relative flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105 ${
                        navy ? "bg-white/10 text-brandlight" : "bg-soft text-teal-dark"
                      }`}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                        {WHY_ICONS[i].split("|").map((d, k) => (
                          <path key={k} d={d} />
                        ))}
                      </svg>
                    </span>
                    <h3 className={`relative mt-6 text-xl font-semibold ${navy ? "text-white" : "text-primary"}`}>
                      {p.title}
                    </h3>
                    <p className={`relative mt-2 ${navy ? "text-white/80" : "text-body"}`}>{p.text}</p>
                    {/* Hover accent bar */}
                    <span
                      aria-hidden
                      className={`absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${
                        navy ? "bg-brandlight" : "bg-secondary"
                      }`}
                    />
                  </div>
                </RevealItem>
              );
            })}
          </RevealList>
        </div>
      </section>

      {/* ============================================================
          5 — CLINIC INTRO: editorial pull-quote + lens-masked photo
          ============================================================ */}
      <section className="section overflow-hidden">
        <div className="container grid items-center gap-14 lg:grid-cols-[1fr_0.85fr]">
          <Reveal>
            <Eyebrow>The clinic</Eyebrow>
            {/* Verbatim live intro line */}
            <p className="mt-6 text-[clamp(1.6rem,3vw,2.5rem)] font-semibold leading-snug text-ink">
              Midland Eye Private Clinic has an extensive team of Consultant Ophthalmologists and
              Surgeons, who offer{" "}
              <span className="text-teal-dark">world-class patient experiences and outcomes.</span>
            </p>
            <div className="mt-8">
              <ButtonLink href="/about-us" variant="text">
                About Midland Eye
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative mx-auto">
            <div className="relative aspect-square w-[min(78vw,420px)] overflow-hidden rounded-full ring-8 ring-soft">
              <Image
                src="/images/2024_11_ophthalmology-medical-eye-exam-with-old-man-consulting-vision-healthcare-glaucoma-check-laser-light-innovation-with-face-patient-machine-scanning-optometry.jpg"
                alt="Consultant-led eye examination at Midland Eye"
                fill
                sizes="420px"
                className="object-cover"
              />
            </div>
            <svg aria-hidden viewBox="0 0 200 200" fill="none" className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 opacity-40">
              <circle cx="100" cy="100" r="92" stroke="#40BADA" strokeWidth="3" />
              <circle cx="100" cy="100" r="60" stroke="#0088A5" strokeWidth="3" />
            </svg>
          </Reveal>
        </div>
      </section>

      {/* 6 — CONSULTANTS: premium contained slider */}
      <ConsultantSlider items={featuredConsultants} />

      {/* 7 — Journey (component) */}
      <Reveal>
        <JourneyStepper />
      </Reveal>

      {/* 8 — Finance (verbatim, component) */}
      <FinanceTeaser />

      {/* 9 — Testimonials (component) */}
      <TestimonialBlock />

      {/* ============================================================
          10 — FAQs
          ============================================================ */}
      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <Eyebrow>Answers</Eyebrow>
            <h2 className="mt-5 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              Frequently asked <Highlight>questions</Highlight>
            </h2>
            <p className="mt-5 text-body">
              Straight answers from our consultants. Can&rsquo;t see yours?{" "}
              <Link href="/contact" className="font-semibold text-teal-dark underline">
                Get in touch.
              </Link>
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <FaqAccordion items={homeFaqs} />
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          11 — LATEST POSTS: featured + list
          ============================================================ */}
      <section className="section bg-soft">
        <div className="container">
          <Reveal className="max-w-xl">
            <Eyebrow>Insights</Eyebrow>
            {/* Verbatim */}
            <h2 className="mt-5 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              Latest <Highlight>Posts</Highlight>
            </h2>
            <p className="mt-5 text-lg text-body">Keep up to date with Midland Eye</p>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {posts[0] && (
              <Reveal>
                <Link href={`/blog/${posts[0].slug}`} className="group block h-full overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-soft transition-shadow duration-300 hover:shadow-lifted">
                  {posts[0].image?.startsWith("/") && (
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image src={posts[0].image} alt="" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                  )}
                  <div className="p-7">
                    {posts[0].categories[0] && (
                      <p className="text-xs font-medium uppercase tracking-[0.15em] text-teal-dark">
                        {posts[0].categories[0]}
                      </p>
                    )}
                    <h3 className="mt-2 text-2xl font-bold text-primary group-hover:text-teal-dark">
                      {posts[0].title}
                    </h3>
                    {posts[0].excerpt && <p className="mt-3 text-body">{posts[0].excerpt.slice(0, 150)}…</p>}
                  </div>
                </Link>
              </Reveal>
            )}
            <div className="flex flex-col gap-6">
              {posts.slice(1, 4).map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.08}>
                  <Link href={`/blog/${p.slug}`} className="group flex gap-5 rounded-2xl border border-line bg-white p-4 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lifted">
                    {p.image?.startsWith("/") && (
                      <div className="relative aspect-square w-28 shrink-0 overflow-hidden rounded-xl">
                        <Image src={p.image} alt="" fill sizes="112px" className="object-cover" />
                      </div>
                    )}
                    <div className="min-w-0">
                      {p.categories[0] && (
                        <p className="text-xs font-medium uppercase tracking-[0.15em] text-teal-dark">
                          {p.categories[0]}
                        </p>
                      )}
                      <h3 className="mt-1 line-clamp-3 font-semibold text-primary group-hover:text-teal-dark">
                        {p.title}
                      </h3>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          12 — VISIT US
          ============================================================ */}
      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <Eyebrow>Find us</Eyebrow>
            <h2 className="mt-5 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              Visit <Highlight>Us</Highlight>
            </h2>
            <address className="mt-6 space-y-1 text-lg not-italic text-body">
              <p className="font-semibold text-primary">{clinic.name}</p>
              <p>
                {clinic.address.street}, {clinic.address.town}, {clinic.address.county},{" "}
                {clinic.address.postcode}
              </p>
            </address>
            <a href={clinic.phoneHref} className="mt-4 inline-block text-2xl font-bold text-teal-dark">
              {clinic.phone}
            </a>
            <ul className="mt-5 space-y-1 text-body">
              {clinic.openingTimes.map((o) => (
                <li key={o.days}>
                  <strong className="text-primary">{o.days}:</strong> {o.hours}
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <ButtonLink
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                  `${clinic.name}, ${clinic.address.street}, ${clinic.address.town} ${clinic.address.postcode}`
                )}`}
                variant="text"
              >
                Get directions
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mesh-navy relative h-full overflow-hidden rounded-[1.75rem] p-8 text-white">
              <svg aria-hidden viewBox="0 0 200 200" fill="none" className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 opacity-15">
                <circle cx="100" cy="100" r="90" stroke="#40BADA" strokeWidth="2" />
                <circle cx="100" cy="100" r="60" stroke="#40BADA" strokeWidth="2" />
              </svg>
              <h3 className="relative text-2xl font-semibold text-white">Getting here</h3>
              <p className="relative mt-3 text-white/80">
                Free on-site parking is available. Solihull station is a short taxi journey away, and
                we&rsquo;re open 7 days a week including evenings and weekends.
              </p>
              <p className="relative mt-6">
                <a href={`mailto:${clinic.email}`} className="font-semibold text-brandlight underline">
                  {clinic.email}
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 13 — CTA band */}
      <CtaBand />

      <JsonLd
        data={{ "@context": "https://schema.org", "@type": "WebSite", name: clinic.name, url: clinic.url }}
      />
    </>
  );
}
