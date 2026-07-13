import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { BlockRenderer } from "@/components/sections/BlockRenderer";
import { ButtonLink } from "@/components/ui/Button";
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
      <PageHero
        eyebrow="Enquiry received"
        title="Thank you"
        intro={`We'll contact you from ${clinic.phone} to schedule a convenient time for your consultation — save this number to your contacts so you don't miss our call.`}
        crumbs={[{ label: "Thank You", href: "/thank-you" }]}
      />

      <section className="section">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <article className="rounded-[1.75rem] border border-line bg-white p-7 shadow-soft sm:p-10">
              <BlockRenderer blocks={content.blocks} headingShift />
            </article>

            <div className="mt-8 rounded-[1.75rem] border border-line bg-soft/60 p-7 sm:p-8">
              <h2 className="text-2xl font-bold text-ink">While you wait</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Link href="/consultants-and-specialist-page" className="group flex items-center justify-between gap-3 rounded-2xl border border-line bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lifted">
                  <span className="font-semibold text-primary group-hover:text-teal-dark">Meet the consultants</span>
                  <span aria-hidden className="text-teal-dark transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
                <Link href="/finance-options" className="group flex items-center justify-between gap-3 rounded-2xl border border-line bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lifted">
                  <span className="font-semibold text-primary group-hover:text-teal-dark">Explore 0% finance options</span>
                  <span aria-hidden className="text-teal-dark transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>
              <div className="mt-6">
                <ButtonLink href={clinic.phoneHref} variant="accent">
                  ☎ Call {clinic.phone}
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
