"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BlockRenderer } from "@/components/sections/BlockRenderer";
import { RevealItem, RevealList } from "@/components/motion/Reveal";
import type { Consultant } from "@/lib/types";

export function ConsultantsClient({ consultants }: { consultants: Consultant[] }) {
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = consultants.find((c) => c.id === activeId) ?? null;
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  // Open the matching profile from a deep link (#consultant-id).
  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (!id || !consultants.some((c) => c.id === id)) return;
    const t = window.setTimeout(() => setActiveId(id), 0);
    return () => window.clearTimeout(t);
  }, [consultants]);

  // Body scroll lock + ESC + focus while open.
  useEffect(() => {
    if (!active) return;
    lastFocused.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActiveId(null);
    document.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => closeRef.current?.focus(), 40);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
      lastFocused.current?.focus?.();
    };
  }, [active]);

  const open = (id: string) => setActiveId(id);

  return (
    <>
      <RevealList className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {consultants.map((c) => (
          <RevealItem key={c.id}>
            <article
              id={c.id}
              className="group flex h-full scroll-mt-28 flex-col overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-secondary/40 hover:shadow-lifted"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {c.image && c.image.startsWith("/") ? (
                  <Image src={c.image} alt={c.name} fill sizes="(min-width:1024px) 31vw, (min-width:640px) 47vw, 90vw" className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105" />
                ) : (
                  <div className="flex h-full items-center justify-center bg-soft text-6xl text-secondary/40">◎</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
                {c.specialisms[0] && (
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-teal-dark backdrop-blur">
                    {c.specialisms[0].split("•")[0].trim().slice(0, 24)}
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-xl font-bold text-ink">{c.name}</h2>
                <p className="mt-1 font-semibold text-teal-dark">{c.title}</p>
                <button
                  type="button"
                  onClick={() => open(c.id)}
                  className="group/btn mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-line py-3 font-semibold text-teal-dark transition-colors hover:border-secondary hover:bg-soft"
                >
                  Read Full Profile
                  <span aria-hidden className="transition-transform duration-300 group-hover/btn:translate-x-1.5">→</span>
                </button>
              </div>
            </article>
          </RevealItem>
        ))}
      </RevealList>

      {/* Premium profile modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveId(null)}
            aria-hidden={false}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-primary/60 backdrop-blur-md" />

            {/* Panel */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="consultant-modal-name"
              onClick={(e) => e.stopPropagation()}
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 12 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
              style={{ willChange: "transform, opacity" }}
              className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-lifted md:flex-row"
            >
              <button
                ref={closeRef}
                type="button"
                onClick={() => setActiveId(null)}
                aria-label="Close profile"
                className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-primary shadow-soft backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>

              {/* Left — image + identity */}
              <div className="relative h-64 w-full shrink-0 bg-primary md:h-auto md:w-[42%]">
                {active.image && active.image.startsWith("/") ? (
                  <Image src={active.image} alt={active.name} fill sizes="(min-width:768px) 42vw, 100vw" className="object-cover object-top" />
                ) : (
                  <div className="flex h-full items-center justify-center text-7xl text-brandlight/40">◎</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 id="consultant-modal-name" className="text-2xl font-bold text-white">
                    {active.name}
                  </h3>
                  <p className="mt-1 font-semibold text-brandlight">{active.title}</p>
                  <Link
                    href="/contact#booking-form"
                    onClick={() => setActiveId(null)}
                    className="group/bk mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-transform hover:-translate-y-0.5"
                  >
                    Book with {active.name.split(" ").slice(-1)[0]}
                    <span aria-hidden className="transition-transform duration-300 group-hover/bk:translate-x-1">→</span>
                  </Link>
                </div>
              </div>

              {/* Right — text content only (images filtered out) */}
              <div className="flex min-h-0 flex-1 flex-col">
                <div data-lenis-prevent className="overflow-y-auto p-6 sm:p-8">
                  {active.specialisms.length > 0 && (
                    <ul className="mb-6 flex flex-wrap gap-2">
                      {active.specialisms.map((s) => (
                        <li key={s} className="rounded-full bg-soft px-3.5 py-1.5 text-sm font-medium text-primary ring-1 ring-inset ring-line">
                          {s}
                        </li>
                      ))}
                    </ul>
                  )}
                  <BlockRenderer blocks={active.blocks.filter((b) => b.t !== "img")} headingShift />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
