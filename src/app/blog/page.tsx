import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { RevealItem, RevealList } from "@/components/motion/Reveal";
import { content as blog } from "@/content/pages/blog";
import { posts } from "@/content/posts";

export const metadata: Metadata = {
  title: { absolute: blog.meta.metaTitle },
  description: blog.meta.metaDescription,
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Eye Health"
        highlight="Blog"
        /* Live intro, verbatim */
        intro="Keep up to date with Midland Eye"
        crumbs={[{ label: "Blog", href: "/blog" }]}
      />

      <section className="section">
        <div className="container">
          <RevealList className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <RevealItem key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lifted">
                  {p.image?.startsWith("/") && (
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image src={p.image} alt="" fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                      {p.categories[0] && (
                        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-teal-dark backdrop-blur">
                          {p.categories[0]}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    {p.published && (
                      <p className="text-xs font-medium uppercase tracking-[0.15em] text-body/50">
                        {new Date(p.published).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                      </p>
                    )}
                    <h2 className="mt-2 text-xl font-bold text-primary transition-colors group-hover:text-teal-dark">
                      {p.title}
                    </h2>
                    {p.excerpt && <p className="mt-3 text-[15px] text-body">{p.excerpt.slice(0, 130)}…</p>}
                    <span className="mt-5 inline-flex items-center gap-2 pt-1 text-sm font-semibold text-teal-dark">
                      Read more
                      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                    </span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealList>
        </div>
      </section>
    </>
  );
}
