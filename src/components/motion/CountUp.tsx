"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

/** Animated stat count-up, triggers once in view; instant when reduced motion. */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 1.6,
  className,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (reduce) {
      el.textContent = `${prefix}${to.toLocaleString("en-GB")}${suffix}`;
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => {
        el.textContent = `${prefix}${Math.round(v).toLocaleString("en-GB")}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, to, prefix, suffix, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
