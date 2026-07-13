import Image from "next/image";
import type { Block } from "@/lib/types";
import { BlockRenderer } from "@/components/sections/BlockRenderer";
import { FaqPremium } from "@/components/sections/FaqPremium";
import { Reveal } from "@/components/motion/Reveal";
import { stripInlineMedia } from "@/lib/html";

interface Section {
  heading?: string;
  body: Block[];
}

function groupSections(blocks: Block[]): Section[] {
  const sections: Section[] = [];
  let current: Section = { body: [] };
  for (const b of blocks) {
    if (b.t === "h1" || b.t === "h2") {
      if (current.heading || current.body.length) sections.push(current);
      current = { heading: b.text, body: [] };
    } else {
      current.body.push(b);
    }
  }
  if (current.heading || current.body.length) sections.push(current);
  return sections;
}

const RISK = /risk|complication|warning|safety|side.?effect|caution|is it safe/i;
const INFO =
  /recover|aftercare|after your|what happens|what to expect|on the day|prepar|before your|success|outcome|result/i;

/* ---------- shared building blocks ---------- */

function NumberBadge({ n, dark = false }: { n: number; dark?: boolean }) {
  return (
    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-lg font-bold ${dark ? "bg-white/10 text-brandlight" : "bg-primary text-brandlight"}`}>
      {String(n).padStart(2, "0")}
    </span>
  );
}

function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
      {items.map((it, k) => (
        <li key={k} className="flex items-start gap-3 rounded-2xl border border-line bg-white p-4 shadow-soft">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-soft">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-secondary" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m5 13 4 4L19 7" />
            </svg>
          </span>
          <span className="text-[15px] leading-relaxed text-body [&_a]:font-semibold [&_a]:text-teal-dark [&_a]:underline" dangerouslySetInnerHTML={{ __html: stripInlineMedia(it) }} />
        </li>
      ))}
    </ul>
  );
}

/** Prose + inline lists → checklist grids. */
function Prose({ body }: { body: Block[] }) {
  const out: React.ReactNode[] = [];
  let buffer: Block[] = [];
  const flush = (key: string) => {
    if (buffer.length) {
      out.push(<BlockRenderer key={key} blocks={buffer} headingShift />);
      buffer = [];
    }
  };
  body.forEach((b, i) => {
    if (b.t === "ul" || b.t === "ol") {
      flush(`b${i}`);
      out.push(<Checklist key={`l${i}`} items={b.items} />);
    } else if (b.t === "accordion") {
      flush(`b${i}`);
      out.push(
        <div key={`a${i}`} className="mt-6">
          <FaqPremium items={b.items} />
        </div>
      );
    } else {
      buffer.push(b);
    }
  });
  flush("end");
  return <>{out}</>;
}

/* ---------- section variants (each visually distinct) ---------- */

function Callout({ heading, body, kind }: { heading?: string; body: Block[]; kind: "risk" | "info" }) {
  return (
    <div className={`overflow-hidden rounded-[2rem] border-l-4 p-8 shadow-soft sm:p-10 ${kind === "risk" ? "border-accent bg-accent/[0.06]" : "border-secondary bg-white"}`}>
      <div className="flex items-center gap-4">
        <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${kind === "risk" ? "bg-accent/15 text-accent" : "bg-soft text-teal-dark"}`}>
          {kind === "risk" ? (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 3l9 16H3L12 3z" />
              <path d="M12 10v4M12 17h.01" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 3a9 9 0 100 18 9 9 0 000-18z" />
              <path d="M12 11v5M12 8h.01" />
            </svg>
          )}
        </span>
        {heading && <h2 className="text-2xl font-bold text-ink sm:text-3xl">{heading}</h2>}
      </div>
      <div className="mt-5">
        <Prose body={body} />
      </div>
    </div>
  );
}

function ImageSplit({ heading, body, num, image, left }: { heading?: string; body: Block[]; num: number; image: Extract<Block, { t: "img" }>; left: boolean }) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-line bg-white shadow-soft">
      <div className="grid md:grid-cols-2">
        <div className={`relative min-h-[15rem] md:min-h-full ${left ? "" : "md:order-2"}`}>
          <Image src={image.src} alt={image.alt || heading || ""} fill sizes="(min-width:768px) 40vw, 100vw" className="object-cover" />
        </div>
        <div className="p-8 sm:p-10">
          <div className="mb-5 flex items-center gap-4">
            <NumberBadge n={num} />
            {heading && <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">{heading}</h2>}
          </div>
          <Prose body={body} />
        </div>
      </div>
    </div>
  );
}

function ChecklistFeature({ heading, body, num }: { heading?: string; body: Block[]; num: number }) {
  const firstList = body.findIndex((b) => b.t === "ul" || b.t === "ol");
  const intro = firstList > 0 ? body.slice(0, firstList) : [];
  const rest = firstList >= 0 ? body.slice(firstList) : body;
  return (
    <div className="rounded-[2rem] border border-line bg-white p-8 shadow-soft sm:p-10">
      <div className="grid gap-8 md:grid-cols-[0.85fr_1.15fr]">
        <div className="md:sticky md:top-28 md:self-start">
          <NumberBadge n={num} />
          {heading && <h2 className="mt-4 text-2xl font-bold tracking-tight text-ink sm:text-3xl">{heading}</h2>}
          {intro.length > 0 && (
            <div className="mt-3">
              <Prose body={intro} />
            </div>
          )}
        </div>
        <div>
          <Prose body={rest} />
        </div>
      </div>
    </div>
  );
}

function WatermarkCard({ heading, body, num }: { heading?: string; body: Block[]; num: number }) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-line bg-white p-8 shadow-soft sm:p-10">
      <span aria-hidden className="pointer-events-none absolute -right-3 -top-8 select-none text-[8rem] font-bold leading-none text-soft">
        {String(num).padStart(2, "0")}
      </span>
      <div className="relative">
        <span aria-hidden className="mb-5 block h-[3px] w-12 rounded-full bg-secondary" />
        {heading && <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">{heading}</h2>}
        <Prose body={body} />
      </div>
    </div>
  );
}

function NavyFeature({ heading, body, num }: { heading?: string; body: Block[]; num: number }) {
  return (
    <div className="mesh-navy relative overflow-hidden rounded-[2rem] p-8 shadow-lifted sm:p-10">
      <svg aria-hidden viewBox="0 0 200 200" fill="none" className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 opacity-15">
        <circle cx="100" cy="100" r="90" stroke="#40BADA" strokeWidth="2" />
        <circle cx="100" cy="100" r="58" stroke="#40BADA" strokeWidth="2" />
      </svg>
      <div className="relative flex items-center gap-4">
        <NumberBadge n={num} dark />
        {heading && <h2 className="text-2xl font-bold text-white sm:text-3xl">{heading}</h2>}
      </div>
      <div className="relative mt-5 text-white [&_a]:!text-brandlight [&_h3]:text-white [&_h4]:text-white [&_p]:text-white/85 [&_strong]:text-white">
        <Prose body={body} />
      </div>
    </div>
  );
}

function StickyTwoCol({ heading, body, num }: { heading?: string; body: Block[]; num: number }) {
  return (
    <div className="rounded-[2rem] border border-line bg-white p-8 shadow-soft sm:p-10">
      <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
        <div className="md:sticky md:top-28 md:self-start">
          <NumberBadge n={num} />
          {heading && <h2 className="mt-4 text-2xl font-bold tracking-tight text-ink sm:text-3xl">{heading}</h2>}
        </div>
        <div>
          <Prose body={body} />
        </div>
      </div>
    </div>
  );
}

/* ---------- orchestrator ---------- */

export function TreatmentSections({ blocks }: { blocks: Block[] }) {
  const sections = groupSections(blocks);
  let num = 0; // numbered heading counter
  let plain = 0; // rotation index for plain text sections
  let splits = 0; // image-split alternation

  const plainVariants = [WatermarkCard, NavyFeature, StickyTwoCol];

  return (
    <section className="bg-soft py-16 sm:py-20">
      <div className="container">
        <div className="mx-auto max-w-4xl space-y-8">
          {sections.map((s, i) => {
            const hasAccordion = s.body.some((b) => b.t === "accordion");
            const hasList = s.body.some((b) => b.t === "ul" || b.t === "ol");
            const image = s.body.find(
              (b): b is Extract<Block, { t: "img" }> => b.t === "img" && b.src.startsWith("/")
            );
            const kind = s.heading ? (RISK.test(s.heading) ? "risk" : INFO.test(s.heading) ? "info" : "default") : "default";
            const n = s.heading ? ++num : 0;

            let node: React.ReactNode;

            if (!s.heading && i === 0) {
              // Lead intro
              node = (
                <div className="rounded-[2rem] border border-line bg-white p-8 shadow-soft sm:p-10 [&_p]:text-lg [&_p]:text-body">
                  <Prose body={s.body} />
                </div>
              );
            } else if (hasAccordion) {
              // FAQ — plain, accordion cards provide the surface
              node = (
                <div className="pt-4">
                  {s.heading && (
                    <div className="mb-6 flex items-center gap-4">
                      <NumberBadge n={n} />
                      <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">{s.heading}</h2>
                    </div>
                  )}
                  <Prose body={s.body} />
                </div>
              );
            } else if (kind !== "default") {
              node = <Callout heading={s.heading} body={image ? s.body.filter((b) => b !== image) : s.body} kind={kind} />;
            } else if (image) {
              node = <ImageSplit heading={s.heading} body={s.body.filter((b) => b !== image)} num={n} image={image} left={splits++ % 2 === 0} />;
            } else if (hasList) {
              node = <ChecklistFeature heading={s.heading} body={s.body} num={n} />;
            } else {
              const V = plainVariants[plain++ % plainVariants.length];
              node = <V heading={s.heading} body={s.body} num={n} />;
            }

            return (
              <Reveal key={i}>{node}</Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
