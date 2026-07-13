import Image from "next/image";
import Link from "next/link";
import { clinic, legalNav, quickLinks, treatmentNav } from "@/content/global";

const allTreatments = [
  ...treatmentNav.visionCorrection,
  ...treatmentNav.oculoplastic,
  ...treatmentNav.retinalAndDisease,
];

const patientLinks = [
  ...quickLinks,
  { label: "Finance Options", href: "/finance-options" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/** Micro-animated footer link: teal underline wipes in on hover. */
function FLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const cls =
    "group/fl relative inline-block w-fit py-0.5 text-white/70 transition-colors duration-300 hover:text-white";
  const underline = (
    <span
      aria-hidden
      className="absolute -bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-brandlight transition-transform duration-300 group-hover/fl:scale-x-100"
    />
  );
  if (external) {
    return (
      <a href={href} rel="noopener noreferrer" target="_blank" className={cls}>
        {children}
        {underline}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
      {underline}
    </Link>
  );
}

/** Real live-site socials + brand icons (from the live footer markup). */
const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/midlandeyesocial/",
    viewBox: "0 0 320 512",
    d: "M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/midland_eye/?hl=en",
    viewBox: "0 0 448 512",
    d: "M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@midland.eye",
    viewBox: "0 0 24 24",
    d: "M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/the-midland-eye-institute-limited/?originalSubdomain=uk",
    viewBox: "0 0 448 512",
    d: "M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@MidlandEye",
    viewBox: "0 0 576 512",
    d: "M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z",
  },
];

const awards = [
  { src: "/images/2024_11_image-9-300x173-1.png", alt: "Midland Eye accreditation", w: 300, h: 173 },
  { src: "/images/2025_08_CQC-inspected-and-rated-good-RGB.jpg", alt: "CQC inspected and rated Good", w: 1184, h: 821 },
  { src: "/images/2026_04_great-patient-experience-badge.png", alt: "Great Patient Experience award", w: 899, h: 519 },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-primary text-white">
      <svg aria-hidden viewBox="0 0 200 200" fill="none" className="pointer-events-none absolute -right-20 -top-24 h-[420px] w-[420px] opacity-[0.07]">
        <circle cx="100" cy="100" r="90" stroke="#40BADA" strokeWidth="2" />
        <circle cx="100" cy="100" r="62" stroke="#40BADA" strokeWidth="2" />
        <circle cx="100" cy="100" r="34" stroke="#40BADA" strokeWidth="2" />
      </svg>

      <div className="container relative py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Image src="/images/2024_11_ME-primary-logo.png" alt="Midland Eye Private Clinic" width={240} height={140} className="h-auto w-56" />
            <address className="mt-6 space-y-1 text-[15px] not-italic leading-relaxed text-white/70">
              <p className="text-base font-semibold text-white">{clinic.name}</p>
              <p>
                {clinic.address.street}, {clinic.address.town}, {clinic.address.county},{" "}
                {clinic.address.postcode}
              </p>
            </address>
            <a href={clinic.phoneHref} className="mt-4 inline-block text-2xl font-bold text-brandlight transition-colors hover:text-white">
              {clinic.phone}
            </a>
            <p className="mt-1 text-sm text-white/60">Open 7 days a week</p>

            <ul className="mt-7 flex flex-wrap gap-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    rel="noopener noreferrer"
                    target="_blank"
                    aria-label={s.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-brandlight hover:bg-brandlight/10 hover:text-brandlight"
                  >
                    <svg viewBox={s.viewBox} className="h-[18px] w-[18px]" fill="currentColor" aria-hidden>
                      <path d={s.d} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Treatments" className="lg:pt-2">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-brandlight">Treatments</p>
            <ul className="space-y-2.5">
              {allTreatments.map((t) => (
                <li key={t.href}>
                  <FLink href={t.href}>{t.label}</FLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Patients" className="lg:pt-2">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-brandlight">Patients</p>
            <ul className="space-y-2.5">
              {patientLinks.map((l) => (
                <li key={l.href}>
                  <FLink href={l.href}>{l.label}</FLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal information" className="lg:pt-2">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-brandlight">Legal Info</p>
            <ul className="space-y-2.5">
              {legalNav.map((l) => (
                <li key={l.href}>
                  <FLink href={l.href} external={"external" in l && l.external}>
                    {l.label}
                  </FLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Awards / accreditations — all in one row, white chips for readability */}
        <div className="mt-14 border-t border-white/15 pt-8">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.15em] text-brandlight">
            Accredited &amp; awarded
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {awards.map((a) => (
              <span key={a.src} className="flex h-[76px] items-center justify-center rounded-2xl bg-white px-6 shadow-soft">
                <Image src={a.src} alt={a.alt} width={a.w} height={a.h} className="h-12 w-auto object-contain" />
              </span>
            ))}
          </div>
        </div>

        {/* Verbatim registered-company line */}
        <p className="mt-10 border-t border-white/15 pt-6 text-sm leading-relaxed text-white/60">
          {clinic.legalLine}
        </p>

        {/* Bottom bar: © left · Design by BlueChilli right */}
        <div className="mt-4 flex flex-col gap-2 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} All Rights Reserved.</p>
          <p>
            Design by{" "}
            <a href="https://bluechilli.agency/" rel="noopener noreferrer" target="_blank" className="font-semibold text-brandlight transition-colors hover:text-white">
              BlueChilli
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
