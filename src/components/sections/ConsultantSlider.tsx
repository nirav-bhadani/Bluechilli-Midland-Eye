"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Highlight } from "@/components/ui/Highlight";
import type { Consultant } from "@/lib/types";

type Item = Pick<Consultant, "id" | "name" | "title" | "image" | "specialisms">;

/** Premium contained slider — snap track + circular-arrow controls with end states. */
export function ConsultantSlider({ items }: { items: Item[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollByCards = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = (card ? card.offsetWidth + 24 : el.clientWidth) * dir;
    el.scrollBy({ left: amount, behavior: reduce ? "auto" : "smooth" });
  };

  const arrow =
    "flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white text-primary transition-all duration-300 enabled:hover:-translate-y-0.5 enabled:hover:border-secondary enabled:hover:bg-secondary enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-35";

  return (
    <section className="section bg-soft">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <Eyebrow>Meet the team</Eyebrow>
            <h2 className="mt-5 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              World-Class Surgeons and <Highlight>Practitioners</Highlight>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-4 sm:items-end">
            <ButtonLink href="/consultants-and-specialist-page" variant="outline">
              View All Consultants
            </ButtonLink>
            <div className="hidden items-center gap-3 sm:flex">
              <button type="button" className={arrow} onClick={() => scrollByCards(-1)} disabled={!canPrev} aria-label="Previous consultants">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M15 6l-6 6 6 6" />
                </svg>
              </button>
              <button type="button" className={arrow} onClick={() => scrollByCards(1)} disabled={!canNext} aria-label="Next consultants">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div
          ref={trackRef}
          className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2"
        >
          {items.map((c) => (
            <Link
              data-card
              key={c.id}
              href={`/consultants-and-specialist-page#${c.id}`}
              className="group w-[80%] shrink-0 snap-start sm:w-[47%] lg:w-[31%] xl:w-[23.5%]"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-line bg-white shadow-soft transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lifted">
                {c.image && c.image.startsWith("/") ? (
                  <Image src={c.image} alt={c.name} fill sizes="(min-width:1280px) 24vw, (min-width:1024px) 31vw, (min-width:640px) 47vw, 80vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="flex h-full items-center justify-center bg-soft text-5xl text-secondary/40">◎</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/15 to-transparent" />
                {c.specialisms?.[0] && (
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-teal-dark">
                    {c.specialisms[0].split("•")[0].trim().slice(0, 22)}
                  </span>
                )}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-lg font-semibold text-white">{c.name}</h3>
                  <p className="mt-0.5 text-sm text-white/75">{c.title}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brandlight opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    View profile
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
