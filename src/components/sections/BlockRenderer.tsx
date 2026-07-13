import Image from "next/image";
import type { Block } from "@/lib/types";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { ButtonLink } from "@/components/ui/Button";
import { stripInlineMedia } from "@/lib/html";

/**
 * Renders verbatim content blocks in live-page order. Inline HTML inside
 * p/li/table blocks is served exactly as migrated (verbatim rule) — it comes
 * from our own extraction of the live site, never from user input.
 */
export function BlockRenderer({
  blocks,
  headingShift = false,
}: {
  blocks: Block[];
  /** Shift h1 blocks down to h2 when the page already renders its own h1. */
  headingShift?: boolean;
}) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.t) {
          case "h1": {
            return headingShift ? (
              <h2 key={i} className="mt-10 text-3xl first:mt-0">
                {b.text}
              </h2>
            ) : (
              <h1 key={i} className="text-4xl sm:text-5xl">
                {b.text}
              </h1>
            );
          }
          case "h2":
            return (
              <h2 key={i} className="mt-10 text-3xl first:mt-0">
                {b.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="mt-8 text-2xl first:mt-0">
                {b.text}
              </h3>
            );
          case "h4":
          case "h5":
            return (
              <h4 key={i} className="mt-6 text-xl first:mt-0">
                {b.text}
              </h4>
            );
          case "p": {
            const html = stripInlineMedia(b.html);
            if (!html.replace(/&nbsp;|\s/g, "")) return null; // drop empty/icon-only paragraphs
            return (
              <p
                key={i}
                className="mt-4 max-w-[68ch] [&_a]:font-semibold [&_a]:text-teal-dark [&_a]:underline"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            );
          }
          case "ul":
            return (
              <ul key={i} className="mt-4 max-w-[68ch] list-disc space-y-2 pl-6 marker:text-secondary">
                {b.items.map((li, k) => (
                  <li key={k} dangerouslySetInnerHTML={{ __html: stripInlineMedia(li) }} />
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="mt-4 max-w-[68ch] list-decimal space-y-2 pl-6 marker:text-secondary">
                {b.items.map((li, k) => (
                  <li key={k} dangerouslySetInnerHTML={{ __html: stripInlineMedia(li) }} />
                ))}
              </ol>
            );
          case "table":
            return (
              <div key={i} className="mt-6 overflow-x-auto rounded-card border border-line">
                <div
                  className="[&_table]:w-full [&_table]:border-collapse [&_td]:border-b [&_td]:border-line [&_td]:p-3 [&_th]:bg-soft [&_th]:p-3 [&_th]:text-left"
                  dangerouslySetInnerHTML={{ __html: stripInlineMedia(b.html) }}
                />
              </div>
            );
          case "img":
            // Non-local srcs are dead/legacy assets from the archive — skip.
            if (!b.src.startsWith("/")) return null;
            return (
              <Image
                key={i}
                src={b.src}
                alt={b.alt}
                width={960}
                height={640}
                className="mt-6 h-auto w-full max-w-2xl rounded-image object-cover"
              />
            );
          case "cta":
            return (
              <p key={i} className="mt-6">
                <ButtonLink href={b.href || "/contact#booking-form"} variant="teal">
                  {b.text}
                </ButtonLink>
              </p>
            );
          case "accordion":
            return <FaqAccordion key={i} items={b.items} className="mt-8" />;
        }
      })}
    </>
  );
}
