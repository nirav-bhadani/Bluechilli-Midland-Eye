"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ratingCategories,
  reviewAggregate,
  testimonials,
} from "@/content/testimonials";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Highlight } from "@/components/ui/Highlight";

function Stars({ value, className = "" }: { value: number; className?: string }) {
  return (
    <span className={`inline-flex gap-0.5 ${className}`} aria-label={`${value} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
          <path
            d="M12 3l2.6 5.6L21 9.3l-4.5 4 1.3 6L12 16.9 6.2 19.3l1.3-6L3 9.3l6.4-.7L12 3z"
            fill={i < Math.round(value) ? "#0088A5" : "#D7E6EC"}
          />
        </svg>
      ))}
    </span>
  );
}

export function TestimonialBlock() {
  const reduce = useReducedMotion();
  const [[i, dir], setI] = useState<[number, number]>([0, 0]);
  const t = testimonials[i];
  const go = (d: number) => setI(([p]) => [(p + d + testimonials.length) % testimonials.length, d]);

  const variants = {
    enter: (d: number) => (reduce ? { opacity: 0 } : { opacity: 0, x: 40 * d }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => (reduce ? { opacity: 0 } : { opacity: 0, x: -40 * d }),
  };

  return (
    <section className="section relative overflow-hidden bg-soft">
      <span aria-hidden className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
      <span aria-hidden className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-brandlight/10 blur-3xl" />

      <div className="container relative">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Eyebrow align="center">Patient stories</Eyebrow>
          </div>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            What our <Highlight>patients say</Highlight>
          </h2>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
          {/* Aggregate panel */}
          <div className="mesh-navy relative flex flex-col justify-center overflow-hidden rounded-[1.75rem] p-8 text-white shadow-lifted sm:p-10">
            <svg aria-hidden viewBox="0 0 200 200" fill="none" className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 opacity-15">
              <circle cx="100" cy="100" r="90" stroke="#40BADA" strokeWidth="2" />
              <circle cx="100" cy="100" r="58" stroke="#40BADA" strokeWidth="2" />
            </svg>
            <p className="relative text-6xl font-bold text-white">{reviewAggregate.rating}</p>
            <span className="relative mt-2 inline-flex gap-1" aria-label={`${reviewAggregate.rating} out of 5`}>
              {[0, 1, 2, 3, 4].map((s) => (
                <svg key={s} viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
                  <path d="M12 3l2.6 5.6L21 9.3l-4.5 4 1.3 6L12 16.9 6.2 19.3l1.3-6L3 9.3l6.4-.7L12 3z" fill="#40BADA" />
                </svg>
              ))}
            </span>
            <p className="relative mt-4 text-white/80">
              Based on <strong className="font-semibold text-white">{reviewAggregate.count}</strong>{" "}
              reviews, verified by {reviewAggregate.source}
            </p>
            <a
              href={reviewAggregate.url}
              rel="noopener noreferrer"
              target="_blank"
              className="relative mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-inset ring-white/20 transition-colors hover:bg-white/20"
            >
              Read all reviews on {reviewAggregate.source}
              <span aria-hidden>→</span>
            </a>
          </div>

          {/* Slider */}
          <div className="relative rounded-[1.75rem] border border-line bg-white p-8 shadow-soft sm:p-10">
            <svg viewBox="0 0 24 24" className="h-12 w-12 text-secondary/20" fill="currentColor" aria-hidden>
              <path d="M10 7H6a2 2 0 00-2 2v4a2 2 0 002 2h2v2a2 2 0 01-2 2H5v2h1a4 4 0 004-4V7zm10 0h-4a2 2 0 00-2 2v4a2 2 0 002 2h2v2a2 2 0 01-2 2h-1v2h1a4 4 0 004-4V7z" />
            </svg>

            <div className="relative mt-4 min-h-[15rem]">
              <AnimatePresence mode="wait" custom={dir} initial={false}>
                <motion.blockquote
                  key={i}
                  custom={dir}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{ willChange: "transform, opacity" }}
                >
                  <p className="text-xl leading-relaxed text-primary sm:text-2xl">“{t.quote}”</p>

                  <div className="mt-6 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                    {ratingCategories.map((c) => (
                      <div key={c} className="flex items-center justify-between gap-3 border-b border-line/60 py-1.5">
                        <span className="text-sm text-body">{c}</span>
                        <Stars value={t.ratings[c]} />
                      </div>
                    ))}
                  </div>

                  <footer className="mt-6 flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-2 font-semibold text-primary">
                      <svg viewBox="0 0 24 24" className="h-5 w-5 text-secondary" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 21a8 8 0 0116 0" />
                      </svg>
                      {t.author}
                    </span>
                    <span className="text-sm text-body/60">
                      {new Date(t.date).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })}
                    </span>
                    <span className="flex flex-wrap gap-2">
                      {t.treatments.map((tr) => (
                        <span key={tr} className="rounded-full bg-soft px-3 py-1 text-xs font-medium text-teal-dark ring-1 ring-inset ring-line">
                          {tr}
                        </span>
                      ))}
                    </span>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-2" aria-label="Choose review">
                {testimonials.map((_, k) => (
                  <button
                    key={k}
                    type="button"
                    aria-label={`Review ${k + 1}`}
                    aria-current={k === i}
                    onClick={() => setI([k, k > i ? 1 : -1])}
                    className={`h-2.5 rounded-full transition-all duration-300 ${k === i ? "w-7 bg-secondary" : "w-2.5 bg-line hover:bg-secondary/50"}`}
                  />
                ))}
              </div>
              <div className="flex gap-3">
                {[-1, 1].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => go(d)}
                    aria-label={d < 0 ? "Previous review" : "Next review"}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary hover:bg-secondary hover:text-white"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d={d < 0 ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
