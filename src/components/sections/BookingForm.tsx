"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ageOptions,
  contactTimes,
  enquirySchema,
  treatmentOptions,
  type EnquiryInput,
} from "@/lib/enquiry";
import { formConsentLine } from "@/content/global";
import { Button } from "@/components/ui/Button";

type Errors = Partial<Record<keyof EnquiryInput, string>>;

const stepFields: (keyof EnquiryInput)[][] = [
  ["treatment"],
  ["name", "phone", "email", "age", "postcode"],
  ["contactTime", "consent"],
];

const stepLabels = ["Treatment", "Your details", "Book"];

const inputCls =
  "h-14 w-full rounded-2xl border border-line bg-white px-5 text-primary placeholder:text-body/40 transition-shadow focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:shadow-[0_0_0_6px_rgba(0,136,165,0.12)]";
const labelCls = "mb-2 block text-sm font-medium text-primary";
const slideStyle = { willChange: "transform, opacity" };

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-error">
      <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4m0 4h.01" />
      </svg>
      {msg}
    </p>
  );
}

/** Aperture-dot progress stepper — connector line centered on the 28px icons. */
function Stepper({ step }: { step: number }) {
  return (
    <div className="relative mb-7" aria-label={`Step ${step + 1} of 3`}>
      {/* Connector track sits at the vertical centre of the 28px (h-7) dots */}
      <div aria-hidden className="pointer-events-none absolute left-0 right-0 top-[14px] mx-[14px] -translate-y-1/2">
        <div className="h-[3px] rounded-full bg-line" />
        <div
          className="absolute inset-0 h-[3px] origin-left rounded-full bg-secondary transition-transform duration-500 ease-out"
          style={{ transform: `scaleX(${step / (stepLabels.length - 1)})` }}
        />
      </div>
      <ol className="relative flex justify-between">
        {stepLabels.map((label, i) => (
          <li key={label} className="flex flex-col items-center gap-2">
            <span
              aria-hidden
              className={`flex h-7 w-7 items-center justify-center rounded-full border-2 bg-white transition-all duration-300 ${
                i < step
                  ? "border-secondary bg-secondary text-white"
                  : i === step
                    ? "border-secondary ring-4 ring-secondary/15"
                    : "border-line"
              }`}
            >
              {i < step ? (
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                  <path d="m5 13 4 4L19 7" />
                </svg>
              ) : (
                <span className={`h-2 w-2 rounded-full ${i === step ? "bg-secondary" : "bg-line"}`} />
              )}
            </span>
            <span className={`text-[11px] font-medium ${i <= step ? "text-teal-dark" : "text-body/50"}`}>
              {label}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function BookingForm({
  compact = false,
  defaultTreatment,
}: {
  /** Compact = hero mini-form styling on treatment pages. */
  compact?: boolean;
  defaultTreatment?: string;
}) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [values, setValues] = useState<Record<string, unknown>>({
    treatment: defaultTreatment ?? "",
    name: "",
    phone: "",
    email: "",
    age: "",
    postcode: "",
    contactTime: "",
    consent: false,
    company: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");

  const set = (k: string, v: unknown) => {
    setValues((s) => ({ ...s, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validateStep = (s: number): boolean => {
    const result = enquirySchema.safeParse(values);
    if (result.success) return true;
    const flat = result.error.flatten().fieldErrors;
    const relevant: Errors = {};
    for (const f of stepFields[s]) {
      const msg = (flat as Record<string, string[] | undefined>)[f]?.[0];
      if (msg !== undefined) relevant[f] = msg;
    }
    setErrors(relevant);
    return Object.keys(relevant).length === 0;
  };

  const go = (target: number) => {
    setDir(target > step ? 1 : -1);
    setStep(target);
  };
  const next = () => {
    if (validateStep(step)) go(Math.min(step + 1, 2));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(2)) return;
    const parsed = enquirySchema.safeParse(values);
    if (!parsed.success) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error(String(res.status));
      router.push(`/thank-you?t=${encodeURIComponent(parsed.data.treatment)}`);
    } catch {
      setStatus("error");
    }
  };

  const variants = {
    enter: (d: number) => (reduce ? { opacity: 0 } : { opacity: 0, x: 36 * d }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => (reduce ? { opacity: 0 } : { opacity: 0, x: -36 * d }),
  };

  return (
    <form
      id="booking-form"
      onSubmit={submit}
      noValidate
      className={`glass relative overflow-hidden rounded-3xl border border-white/60 shadow-lifted ${
        compact ? "p-6" : "p-6 sm:p-9"
      }`}
    >
      <Stepper step={step} />
      {/* Honeypot */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label>
          Company
          <input type="text" tabIndex={-1} autoComplete="off" value={String(values.company)} onChange={(e) => set("company", e.target.value)} />
        </label>
      </div>

      <AnimatePresence mode="wait" custom={dir} initial={false}>
        {step === 0 && (
          <motion.fieldset key="s0" custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.22, ease: "easeOut" }} style={slideStyle}>
            <legend className="mb-3 text-xl font-semibold text-primary">
              Which treatment are you interested in?
            </legend>
            {/* Radio-cards, not a native dropdown */}
            <div role="radiogroup" aria-label="Treatment" className={`grid gap-2 ${compact ? "max-h-64 overflow-y-auto pr-1" : "sm:grid-cols-2"}`}>
              {treatmentOptions.map((t) => {
                const active = values.treatment === t.value;
                return (
                  <label
                    key={t.value}
                    className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-2xl border-2 px-4 py-2.5 font-medium transition-all duration-150 ${
                      active
                        ? "border-secondary bg-soft text-primary shadow-[0_0_0_4px_rgba(0,136,165,0.1)]"
                        : "border-line bg-white text-body hover:border-secondary/50 hover:bg-soft/60"
                    }`}
                  >
                    <input
                      type="radio"
                      name="treatment"
                      value={t.value}
                      checked={active}
                      onChange={() => set("treatment", t.value)}
                      className="sr-only"
                    />
                    <span
                      aria-hidden
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                        active ? "border-secondary" : "border-line"
                      }`}
                    >
                      {active && <span className="h-2.5 w-2.5 rounded-full bg-secondary" />}
                    </span>
                    {t.label}
                  </label>
                );
              })}
            </div>
            <FieldError msg={errors.treatment} />
            <Button type="button" variant="accent" className="mt-5 w-full" onClick={next}>
              Continue
            </Button>
          </motion.fieldset>
        )}

        {step === 1 && (
          <motion.fieldset key="s1" custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.22, ease: "easeOut" }} style={slideStyle} className="space-y-4">
            <legend className="mb-1 text-xl font-semibold text-primary">Your details</legend>
            <div>
              <label htmlFor="bf-name" className={labelCls}>Full name</label>
              <input id="bf-name" className={inputCls} autoComplete="name" value={String(values.name)} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} />
              <FieldError msg={errors.name} />
            </div>
            <div>
              <label htmlFor="bf-phone" className={labelCls}>Phone number</label>
              <input id="bf-phone" type="tel" className={inputCls} autoComplete="tel" value={String(values.phone)} onChange={(e) => set("phone", e.target.value)} aria-invalid={!!errors.phone} />
              <FieldError msg={errors.phone} />
            </div>
            <div>
              <label htmlFor="bf-email" className={labelCls}>Email address</label>
              <input id="bf-email" type="email" className={inputCls} autoComplete="email" value={String(values.email)} onChange={(e) => set("email", e.target.value)} aria-invalid={!!errors.email} />
              <FieldError msg={errors.email} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="bf-age" className={labelCls}>Age</label>
                <select id="bf-age" className={`${inputCls} select-brand pr-12`} value={String(values.age)} onChange={(e) => set("age", e.target.value)} aria-invalid={!!errors.age}>
                  <option value="" disabled>Select age…</option>
                  {ageOptions.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
                <FieldError msg={errors.age} />
              </div>
              <div>
                <label htmlFor="bf-postcode" className={labelCls}>Postcode</label>
                <input id="bf-postcode" className={`${inputCls} uppercase placeholder:normal-case`} autoComplete="postal-code" placeholder="e.g. B91 2AW" value={String(values.postcode)} onChange={(e) => set("postcode", e.target.value)} aria-invalid={!!errors.postcode} />
                <FieldError msg={errors.postcode} />
              </div>
            </div>
            <div className="flex gap-3 pt-1">
              <Button type="button" variant="outline" onClick={() => go(0)}>Back</Button>
              <Button type="button" variant="accent" className="flex-1" onClick={next}>Continue</Button>
            </div>
          </motion.fieldset>
        )}

        {step === 2 && (
          <motion.fieldset key="s2" custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.22, ease: "easeOut" }} style={slideStyle} className="space-y-4">
            <legend className="mb-1 text-xl font-semibold text-primary">Nearly there</legend>
            <div>
              <label htmlFor="bf-time" className={labelCls}>Preferred contact time</label>
              <select id="bf-time" className={`${inputCls} select-brand pr-12`} value={String(values.contactTime)} onChange={(e) => set("contactTime", e.target.value)} aria-invalid={!!errors.contactTime}>
                <option value="" disabled>Choose a time…</option>
                {contactTimes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <FieldError msg={errors.contactTime} />
            </div>
            <div>
              <label className="flex cursor-pointer items-start gap-3">
                <span className="relative mt-0.5 inline-flex">
                  <input
                    type="checkbox"
                    checked={Boolean(values.consent)}
                    onChange={(e) => set("consent", e.target.checked)}
                    aria-invalid={!!errors.consent}
                    className="peer h-6 w-6 cursor-pointer appearance-none rounded-md border-2 border-line bg-white transition-colors checked:border-secondary checked:bg-secondary"
                  />
                  <svg aria-hidden viewBox="0 0 24 24" className="pointer-events-none absolute inset-0 m-auto h-4 w-4 text-white opacity-0 transition-opacity peer-checked:opacity-100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <path d="m5 13 4 4L19 7" />
                  </svg>
                </span>
                <span className="text-sm">
                  {/* Live form consent line, verbatim */}
                  {formConsentLine.replace("View our Privacy Policy.", "")}View our{" "}
                  <Link href="/privacy-policy" className="font-semibold text-teal-dark underline">Privacy Policy</Link>.
                </span>
              </label>
              <FieldError msg={errors.consent} />
            </div>
            {status === "error" && (
              <p role="alert" className="rounded-2xl border border-error/30 bg-error/5 px-4 py-3 text-sm font-medium text-error">
                Sorry — something went wrong sending your enquiry. Please try again or call us on 0121 711 2020.
              </p>
            )}
            <div className="flex gap-3 pt-1">
              <Button type="button" variant="outline" onClick={() => go(1)}>Back</Button>
              <Button type="submit" variant="accent" className="flex-1" disabled={status === "submitting"}>
                {status === "submitting" ? (
                  <>
                    <span className="aperture-spinner" aria-hidden />
                    Sending…
                  </>
                ) : (
                  "Book my consultation"
                )}
              </Button>
            </div>
          </motion.fieldset>
        )}
      </AnimatePresence>
    </form>
  );
}
