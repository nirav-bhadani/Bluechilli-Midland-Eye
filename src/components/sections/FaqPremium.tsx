"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { stripInlineMedia } from "@/lib/html";

/** Premium FAQ — glass cards, animated height + plus/minus, accessible. */
export function FaqPremium({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);
  const reduce = useReducedMotion();
  const base = useId();

  return (
    <div className="space-y-4">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${base}-p${i}`;
        const btnId = `${base}-b${i}`;
        return (
          <div
            key={i}
            className={`glass overflow-hidden rounded-2xl border transition-shadow duration-300 ${
              isOpen ? "border-secondary/40 shadow-lifted" : "border-line shadow-soft hover:border-secondary/30"
            }`}
          >
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full min-h-14 items-center justify-between gap-4 px-6 py-5 text-left text-lg font-semibold text-primary"
              >
                {item.q}
                <span aria-hidden className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${isOpen ? "bg-secondary text-white" : "bg-soft text-teal-dark"}`}>
                  <span className="absolute h-0.5 w-3.5 rounded-full bg-current" />
                  <span className={`absolute h-3.5 w-0.5 rounded-full bg-current transition-transform duration-300 ${isOpen ? "scale-y-0" : "scale-y-100"}`} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  key="content"
                  initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div
                    className="border-t border-line/60 px-6 py-5 [&_a]:font-semibold [&_a]:text-teal-dark [&_a]:underline [&_li]:mt-1 [&_p]:mt-2 [&_p:first-child]:mt-0 [&_ul]:list-disc [&_ul]:pl-5"
                    dangerouslySetInnerHTML={{ __html: stripInlineMedia(item.a) }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
