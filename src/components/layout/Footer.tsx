import Image from "next/image";
import Link from "next/link";
import {
  clinic,
  legalNav,
  medicalDisclaimer,
  quickLinks,
  treatmentNav,
} from "@/content/global";

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

/** Micro-animated footer link: label lifts slightly, teal underline wipes in. */
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

const socials = [
  { label: "Facebook", href: "https://www.facebook.com/midlandeye", d: "M14 9h3V5h-3c-2.2 0-4 1.8-4 4v2H7v4h3v7h4v-7h3l1-4h-4V9c0-.6.4-1 1-1z" },
  { label: "Instagram", href: "https://www.instagram.com/midlandeye", d: "M12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zM17 6.2h.01M4 8a4 4 0 014-4h8a4 4 0 014 4v8a4 4 0 01-4 4H8a4 4 0 01-4-4V8z" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/midland-eye", d: "M7 9v10M7 6v.01M11 19v-6a2 2 0 014 0v6M11 13v6" },
  { label: "YouTube", href: "https://www.youtube.com/@midlandeye", d: "M3 8a3 3 0 013-3h12a3 3 0 013 3v8a3 3 0 01-3 3H6a3 3 0 01-3-3V8zm7 1.5v5l4-2.5-4-2.5z" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-primary text-white">
      {/* Aperture motif, large + soft */}
      <svg aria-hidden viewBox="0 0 200 200" fill="none" className="pointer-events-none absolute -right-20 -top-24 h-[420px] w-[420px] opacity-[0.07]">
        <circle cx="100" cy="100" r="90" stroke="#40BADA" strokeWidth="2" />
        <circle cx="100" cy="100" r="62" stroke="#40BADA" strokeWidth="2" />
        <circle cx="100" cy="100" r="34" stroke="#40BADA" strokeWidth="2" />
      </svg>

      <div className="container relative py-20">
        {/* Asymmetrical: wide brand block + three tighter nav columns */}
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Image
              src="/images/2024_11_ME-primary-logo.png"
              alt="Midland Eye Private Clinic"
              width={180}
              height={105}
              className="h-auto w-44"
            />
            <address className="mt-6 space-y-1 text-[15px] not-italic leading-relaxed text-white/70">
              <p className="text-base font-semibold text-white">{clinic.name}</p>
              <p>
                {clinic.address.street}, {clinic.address.town}, {clinic.address.county},{" "}
                {clinic.address.postcode}
              </p>
            </address>
            <a
              href={clinic.phoneHref}
              className="mt-4 inline-block text-2xl font-bold text-brandlight transition-colors hover:text-white"
            >
              {clinic.phone}
            </a>
            <p className="mt-1 text-sm text-white/60">Open 7 days a week</p>

            {/* Social anchors */}
            <ul className="mt-7 flex gap-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    rel="noopener noreferrer"
                    target="_blank"
                    aria-label={s.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-brandlight hover:text-brandlight"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d={s.d} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Treatments" className="lg:pt-2">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-brandlight">
              Treatments
            </p>
            <ul className="space-y-2.5">
              {allTreatments.map((t) => (
                <li key={t.href}>
                  <FLink href={t.href}>{t.label}</FLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Patients" className="lg:pt-2">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-brandlight">
              Patients
            </p>
            <ul className="space-y-2.5">
              {patientLinks.map((l) => (
                <li key={l.href}>
                  <FLink href={l.href}>{l.label}</FLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal information" className="lg:pt-2">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-brandlight">
              Legal Info
            </p>
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

        {/* Medical disclaimer — live copy, verbatim, every page */}
        <p className="mt-16 border-t border-white/15 pt-8 text-sm leading-relaxed text-white/55">
          {medicalDisclaimer}
        </p>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/15 pt-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>{clinic.legalLine}</p>
          <p>© {new Date().getFullYear()} All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
