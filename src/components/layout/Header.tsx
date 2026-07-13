"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { megaMenu, primaryNav } from "@/content/nav";
import { ButtonLink } from "@/components/ui/Button";

/* ── Presentational line-icons (not content) ─────────────────────────── */
const PATHS: Record<string, string> = {
  "/laser-eye-surgery": "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z|M12 9a3 3 0 100 6 3 3 0 000-6z",
  "/evo-icl-lens-exchange": "M12 4a8 8 0 100 16 8 8 0 000-16z|M12 8a4 4 0 100 8 4 4 0 000-8z",
  "/clear-lens-exchange": "M7 8h11l-3-3|M17 16H6l3 3",
  "/cataract-surgery": "M12 3v2m0 14v2m9-9h-2M5 12H3m14.5-6.5-1.4 1.4M7.9 16.1l-1.4 1.4m11 0-1.4-1.4M7.9 7.9 6.5 6.5|M12 8a4 4 0 100 8 4 4 0 000-8z",
  "/laser-cataract-surgery": "M13 2 4 14h7l-1 8 9-12h-7l1-8z",
  "/cosmetic-eye-surgery": "M12 3l1.9 4.6L18 9.2l-3.6 2.9L15.4 17 12 14.3 8.6 17l1-4.9L6 9.2l4.1-1.6L12 3z",
  "/glaucoma": "M12 3s6 6.5 6 11a6 6 0 11-12 0c0-4.5 6-11 6-11z",
  "/diabetic-retinopathy-treatment": "M3 12h4l2 6 4-14 2 8h6",
  "/keratoconus-treatment": "M12 3 3 20h18L12 3z",
  "/macular-degeneration": "M12 3a9 9 0 100 18 9 9 0 000-18z|M12 8a4 4 0 100 8 4 4 0 000-8z|M12 11a1 1 0 100 2 1 1 0 000-2z",
  "/retinal-detachment": "M12 4 2.5 20h19L12 4z|M12 10v4m0 3h.01",
  "/consultants-and-specialist-page": "M9 11a3 3 0 100-6 3 3 0 000 6z|M3 20a6 6 0 0112 0|M16 11a3 3 0 100-6|M21 20a6 6 0 00-5-5.9",
  "/about-us": "M12 3a9 9 0 100 18 9 9 0 000-18z|M12 11v5m0-8h.01",
  "/blog": "M6 3h9l3 3v15H6V3z|M9 8h6M9 12h6M9 16h4",
  "/finance-options": "M3 7h18v10H3V7z|M3 11h18",
  "/refer-a-patient": "M9 11a4 4 0 100-8 4 4 0 000 8z|M3 21a6 6 0 0112 0|M19 8v6M16 11h6",
  "/translation-services": "M12 3a9 9 0 100 18 9 9 0 000-18z|M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18",
  "/contact": "M4 5h16v14H4z|M4 7l8 6 8-6",
};

function NavIcon({ k, className = "" }: { k: string; className?: string }) {
  const d = PATHS[k];
  if (!d) return null;
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {d.split("|").map((p, i) => (
        <path key={i} d={p} />
      ))}
    </svg>
  );
}

const groupMeta: Record<string, string> = {
  "Vision Correction": "Laser, lens & refractive procedures",
  Oculoplastic: "Eyelid & cosmetic eye surgery",
  "Retinal & Eye Disease": "Diagnosis & specialist treatment",
};

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && (setOpen(null), setMobileOpen(false));
    const onClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const dropdownNav = primaryNav.filter((n) => n.label !== "Treatments");

  return (
    <header
      ref={headerRef}
      onMouseLeave={() => setOpen(null)}
      className={`sticky top-0 z-50 border-b bg-white transition-all duration-300 ${
        scrolled ? "border-line shadow-[0_4px_24px_rgba(0,44,72,0.08)]" : "border-line/50"
      }`}
    >
      <nav
        aria-label="Main"
        className={`container flex items-center justify-between gap-4 transition-all duration-300 ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        {/* Logo — larger, brand-forward */}
        <Link href="/" className="flex shrink-0 items-center" aria-label="Midland Eye — home">
          <span className="inline-flex items-center rounded-xl bg-primary px-4 py-2 transition-all duration-300">
            <Image
              src="/images/2024_11_ME-primary-logo.png"
              alt="Midland Eye Private Clinic"
              width={190}
              height={112}
              priority
              className={`w-auto transition-all duration-300 ${scrolled ? "h-11" : "h-14"} max-[400px]:h-10`}
            />
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden h-full items-stretch gap-0.5 lg:flex">
          <li className="flex items-center">
            <button
              type="button"
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[15px] font-semibold text-primary transition-colors hover:bg-soft ${
                open === "Treatments" ? "bg-soft" : ""
              }`}
              aria-expanded={open === "Treatments"}
              onClick={() => setOpen(open === "Treatments" ? null : "Treatments")}
              onMouseEnter={() => setOpen("Treatments")}
            >
              Treatments
              <svg viewBox="0 0 24 24" className={`h-4 w-4 transition-transform duration-300 ${open === "Treatments" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </li>
          {dropdownNav.map((n) =>
            n.children ? (
              <li key={n.label} className="relative flex items-center" onMouseEnter={() => setOpen(n.label)}>
                <button
                  type="button"
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[15px] font-semibold text-primary transition-colors hover:bg-soft ${
                    open === n.label ? "bg-soft" : ""
                  }`}
                  aria-expanded={open === n.label}
                  onClick={() => setOpen(open === n.label ? null : n.label)}
                >
                  {n.label}
                  <svg viewBox="0 0 24 24" className={`h-4 w-4 transition-transform duration-300 ${open === n.label ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {open === n.label && (
                  <ul className="absolute left-0 top-full w-72 origin-top rounded-b-2xl border border-t-0 border-line bg-white p-2 shadow-lifted motion-safe:animate-[faq-in_0.2s_ease-out]">
                    {n.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-soft"
                          onClick={() => setOpen(null)}
                        >
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-soft text-teal-dark transition-colors group-hover:bg-secondary group-hover:text-white">
                            <NavIcon k={c.href} className="h-[18px] w-[18px]" />
                          </span>
                          <span className="font-medium text-primary">{c.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ) : (
              <li key={n.label} className="flex items-center" onMouseEnter={() => setOpen(null)}>
                <Link
                  href={n.href}
                  className="inline-flex items-center rounded-full px-4 py-2.5 text-[15px] font-semibold text-primary transition-colors hover:bg-soft"
                >
                  {n.label}
                </Link>
              </li>
            )
          )}
        </ul>

        <div className="hidden shrink-0 lg:block">
          <ButtonLink variant="accent" href="/contact#booking-form">
            Book a Consultation
          </ButtonLink>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="rounded-lg p-2 text-primary lg:hidden"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
            {mobileOpen ? (
              <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {/* ── Mega menu — container-aligned card ───────────────────────── */}
      {open === "Treatments" && (
        <div className="absolute inset-x-0 top-full hidden lg:block">
          <div className="container pb-4">
            <div className="grid grid-cols-[repeat(3,1fr)_300px] overflow-hidden rounded-2xl border border-line bg-white shadow-lifted motion-safe:animate-[faq-in_0.22s_ease-out]">
              {megaMenu.map((col) => (
                <div key={col.group} className="border-r border-line/60 p-6">
                  <div className="mb-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.12em] text-teal-dark">
                      {col.group}
                    </p>
                    <p className="mt-1 text-xs text-body/60">{groupMeta[col.group]}</p>
                  </div>
                  <ul className="space-y-1">
                    {col.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-soft"
                          onClick={() => setOpen(null)}
                        >
                          <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-soft text-teal-dark transition-all duration-300 group-hover:bg-secondary group-hover:text-white">
                            <NavIcon k={item.href} className="h-5 w-5" />
                          </span>
                          <span className="min-w-0">
                            <span className="block font-semibold text-primary transition-colors group-hover:text-teal-dark">
                              {item.label}
                            </span>
                            {item.desc && (
                              <span className="mt-0.5 block text-[13px] leading-snug text-body/70">
                                {item.desc}
                              </span>
                            )}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Promo panel */}
              <div className="mesh-navy relative flex flex-col justify-between p-6 text-white">
                <svg aria-hidden viewBox="0 0 200 200" fill="none" className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 opacity-20">
                  <circle cx="100" cy="100" r="90" stroke="#40BADA" strokeWidth="3" />
                  <circle cx="100" cy="100" r="58" stroke="#40BADA" strokeWidth="3" />
                </svg>
                <div className="relative">
                  <p className="text-lg font-bold leading-snug">Not sure which treatment is right for you?</p>
                  <p className="mt-2 text-sm text-white/75">
                    Book a consultation and our consultants will guide you.
                  </p>
                </div>
                <div className="relative mt-6 space-y-2">
                  <Link href="/finance-options" onClick={() => setOpen(null)} className="group flex items-center justify-between rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold transition-colors hover:bg-white/20">
                    <span className="inline-flex items-center gap-2">
                      <NavIcon k="/finance-options" className="h-[18px] w-[18px] text-brandlight" />
                      0% Finance Options
                    </span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                  <Link href="/consultants-and-specialist-page" onClick={() => setOpen(null)} className="group flex items-center justify-between rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold transition-colors hover:bg-white/20">
                    <span className="inline-flex items-center gap-2">
                      <NavIcon k="/consultants-and-specialist-page" className="h-[18px] w-[18px] text-brandlight" />
                      Meet our Consultants
                    </span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Mobile menu ──────────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="max-h-[calc(100vh-72px)] overflow-y-auto border-t border-line bg-white lg:hidden">
          <nav aria-label="Mobile" className="container space-y-1 py-5">
            <details className="group rounded-xl">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between rounded-xl px-3 py-2.5 font-semibold text-primary hover:bg-soft">
                Treatments
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-secondary transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </summary>
              {megaMenu.map((col) => (
                <div key={col.group} className="mt-1 pl-1">
                  <p className="px-3 pt-3 text-xs font-semibold uppercase tracking-[0.12em] text-teal-dark">
                    {col.group}
                  </p>
                  {col.items.map((i) => (
                    <Link
                      key={i.href}
                      href={i.href}
                      className="flex min-h-12 items-center gap-3 rounded-xl px-3 py-2 font-medium text-primary hover:bg-soft"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-soft text-teal-dark">
                        <NavIcon k={i.href} className="h-[18px] w-[18px]" />
                      </span>
                      {i.label}
                    </Link>
                  ))}
                </div>
              ))}
            </details>
            {dropdownNav
              .flatMap((n) => (n.children ? n.children : [n]))
              .map((n) => (
                <Link
                  key={n.href + n.label}
                  href={n.href}
                  className="flex min-h-12 items-center gap-3 rounded-xl px-3 py-2.5 font-semibold text-primary hover:bg-soft"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-soft text-teal-dark">
                    <NavIcon k={n.href} className="h-[18px] w-[18px]" />
                  </span>
                  {n.label}
                </Link>
              ))}
            <div className="pt-4">
              <ButtonLink variant="accent" href="/contact#booking-form" className="w-full" onClick={() => setMobileOpen(false)}>
                Book a Consultation
              </ButtonLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
