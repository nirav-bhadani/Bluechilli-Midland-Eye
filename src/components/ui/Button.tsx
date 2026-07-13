import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "accent" | "teal" | "outline" | "white" | "text";

/**
 * Premium CTA. On hover the button stays completely stationary — no move, no
 * scale. A pseudo-element layer wipes a fill colour left→right
 * (origin-left scale-x-0 → scale-x-100). Label sits above via z-10.
 */
const variants: Record<Variant, { shell: string; fill: string; label: string }> = {
  accent: {
    // Orange border stays visible on hover (border sits outside the slide-fill).
    shell: "bg-accent text-white shadow-soft border-2 border-accent",
    fill: "bg-primary",
    label: "",
  },
  teal: {
    shell: "bg-secondary text-white shadow-soft",
    fill: "bg-primary",
    label: "",
  },
  outline: {
    shell: "border-2 border-secondary text-teal-dark",
    fill: "bg-secondary",
    label: "group-hover:text-white",
  },
  white: {
    shell: "bg-white text-primary shadow-soft",
    fill: "bg-primary",
    label: "group-hover:text-white",
  },
  text: {
    shell: "text-teal-dark px-0",
    fill: "",
    label: "",
  },
};

const base =
  "group relative isolate inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3 text-base font-semibold leading-none transition-colors duration-300";

const fillBase =
  "absolute inset-0 -z-10 origin-left scale-x-0 rounded-full transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:transition-none";

function Inner({ variant, children }: { variant: Variant; children: ReactNode }) {
  const v = variants[variant];
  return (
    <>
      {v.fill && <span aria-hidden className={`${fillBase} ${v.fill}`} />}
      <span className={`relative z-10 inline-flex items-center gap-2 ${v.label}`}>
        {children}
        {variant === "text" && (
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">
            →
          </span>
        )}
      </span>
    </>
  );
}

export function ButtonLink({
  variant = "teal",
  size = "md",
  className = "",
  href,
  children,
  ...rest
}: {
  variant?: Variant;
  size?: "md" | "lg";
  href: string;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href">) {
  return (
    <Link
      href={href}
      className={`${base} ${size === "lg" ? "min-h-14 px-9 text-lg" : ""} ${variants[variant].shell} ${className}`}
      {...rest}
    >
      <Inner variant={variant}>{children}</Inner>
    </Link>
  );
}

export function Button({
  variant = "teal",
  size = "md",
  className = "",
  children,
  ...rest
}: {
  variant?: Variant;
  size?: "md" | "lg";
  children: ReactNode;
} & ComponentProps<"button">) {
  return (
    <button
      className={`${base} ${size === "lg" ? "min-h-14 px-9 text-lg" : ""} ${variants[variant].shell} disabled:pointer-events-none disabled:opacity-60 ${className}`}
      {...rest}
    >
      <Inner variant={variant}>{children}</Inner>
    </button>
  );
}
