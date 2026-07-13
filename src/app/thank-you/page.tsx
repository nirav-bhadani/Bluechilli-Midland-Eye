import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BlockRenderer } from "@/components/sections/BlockRenderer";
import { content } from "@/content/pages/thank-you";
import { clinic } from "@/content/global";

export const metadata: Metadata = {
  title: { absolute: content.meta.metaTitle },
  description: content.meta.metaDescription,
  alternates: { canonical: "/thank-you" },
  robots: { index: false, follow: true },
};

export default function ThankYouPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Thank You", href: "/thank-you" }]} />
      <section className="bg-primary py-14 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-4xl text-white">Thank you — we&rsquo;ve received your enquiry</h1>
          <p className="mt-4 text-lg text-white/85">
            We&rsquo;ll contact you from{" "}
            <a href={clinic.phoneHref} className="font-bold text-brandlight">
              {clinic.phone}
            </a>{" "}
            — save this number to your contacts so you don&rsquo;t miss our call.
          </p>
        </div>
      </section>
      <article className="mx-auto max-w-3xl px-6 py-12">
        <BlockRenderer blocks={content.blocks} headingShift />
        <h2 className="mt-12 text-2xl">While you wait</h2>
        <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-secondary">
          <li>
            <Link href="/consultants-and-specialist-page" className="font-semibold text-teal-dark underline">
              Meet the consultants
            </Link>{" "}
            who could be looking after you
          </li>
          <li>
            <Link href="/finance-options" className="font-semibold text-teal-dark underline">
              Explore 0% finance and payment options
            </Link>
          </li>
        </ul>
      </article>
    </>
  );
}
