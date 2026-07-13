"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { clinic, journey } from "@/content/global";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Highlight } from "@/components/ui/Highlight";
import { JsonLd } from "@/components/seo/JsonLd";

const STEP_ICONS = [
  "M8 4h8v3H8z|M6 4H5a2 2 0 00-2 2v13a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2h-1|M8 12h8M8 16h5", // assessment
  "M12 11a4 4 0 100-8 4 4 0 000 8z|M4 21a8 8 0 0116 0", // consultant
  "M7 3h8l4 4v14H7z|M15 3v4h4|M9 13l2 2 4-4", // finalise
  "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z|M12 9a3 3 0 100 6 3 3 0 000-6z", // treatment
  "M12 21s-7-4.5-9.5-9A5.5 5.5 0 0112 5a5.5 5.5 0 019.5 7c-2.5 4.5-9.5 9-9.5 9z", // aftercare
];

function StepIcon({ i }: { i: number }) {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {STEP_ICONS[i].split("|").map((d, k) => (
        <path key={k} d={d} />
      ))}
    </svg>
  );
}

export function JourneyStepper() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="section overflow-hidden">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Eyebrow align="center">{journey.heading}</Eyebrow>
          </div>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Your 5 step journey to <Highlight>visual excellence</Highlight>
          </h2>
        </div>

        <div ref={ref} className="relative mx-auto mt-16 max-w-4xl">
          {/* Spine */}
          <div aria-hidden className="absolute bottom-0 left-7 top-0 w-[3px] -translate-x-1/2 rounded-full bg-line md:left-1/2">
            <motion.div className="w-full origin-top rounded-full bg-gradient-to-b from-secondary to-brandlight" style={{ scaleY: reduce ? 1 : fill }} />
          </div>

          <ol className="space-y-8 md:space-y-2">
            {journey.steps.map((s, i) => {
              const left = i % 2 === 0;
              return (
                <li key={s.stage} className="relative md:grid md:grid-cols-2 md:items-center md:gap-x-20">
                  {/* Node */}
                  <motion.span
                    initial={reduce ? false : { scale: 0.4, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-90px" }}
                    transition={{ type: "spring", stiffness: 200, damping: 18 }}
                    className="absolute left-7 top-7 z-10 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border-2 border-secondary bg-white text-secondary shadow-[0_0_0_6px_var(--color-soft)] md:left-1/2 md:top-1/2 md:-translate-y-1/2"
                  >
                    <StepIcon i={i} />
                    <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                      {i + 1}
                    </span>
                  </motion.span>

                  {/* Card */}
                  <motion.div
                    initial={reduce ? false : { opacity: 0, x: left ? -40 : 40, y: 16 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ type: "spring", stiffness: 110, damping: 20 }}
                    className={`group ml-20 py-2 md:ml-0 md:py-8 ${left ? "md:col-start-1 md:pr-4 md:text-right" : "md:col-start-2 md:pl-4"}`}
                  >
                    <div className="relative overflow-hidden rounded-[1.5rem] border border-line bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lifted sm:p-7">
                      <span aria-hidden className={`pointer-events-none absolute -top-10 h-24 w-24 rounded-full bg-secondary/10 blur-2xl transition-opacity duration-300 group-hover:bg-secondary/20 ${left ? "md:-right-6 md:left-auto -left-6" : "-left-6"}`} />
                      <div className={`relative flex items-center gap-3 ${left ? "md:flex-row-reverse" : ""}`}>
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-soft text-teal-dark">
                          <StepIcon i={i} />
                        </span>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-dark">
                          {s.stage}
                        </p>
                      </div>
                      <h3 className="relative mt-4 text-xl font-semibold text-primary">{s.title}</h3>
                      <p className="relative mt-2 text-[15px] leading-relaxed text-body">{s.text}</p>
                    </div>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: journey.intro,
          provider: { "@id": `${clinic.url}/#clinic` },
          step: journey.steps.map((s, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            name: s.title,
            text: s.text,
          })),
        }}
      />
    </section>
  );
}
