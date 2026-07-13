import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CtaBand } from "@/components/sections/CtaBand";
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
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }]} />
      <section className="bg-primary py-12 text-white sm:py-16">
        <div className="mx-auto max-w-[1280px] px-6">
          <h1 className="text-4xl text-white sm:text-5xl">Blog</h1>
          {/* Live intro, verbatim */}
          <p className="mt-4 text-lg text-white/85">Keep up to date with Midland Eye</p>
        </div>
      </section>
      <section className="py-14">
        <div className="mx-auto grid max-w-[1280px] gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group overflow-hidden rounded-card border border-line bg-white shadow-soft">
              {p.image && p.image.startsWith("/") && (
                <div className="relative aspect-[16/9]">
                  <Image src={p.image} alt="" fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
                </div>
              )}
              <div className="p-5">
                {p.categories.length > 0 && (
                  <p className="text-xs font-medium uppercase tracking-widest text-teal-dark">
                    {p.categories.join(" · ")}
                  </p>
                )}
                <h2 className="mt-1 text-lg font-semibold text-primary group-hover:text-teal-dark">
                  {p.title}
                </h2>
                {p.published && (
                  <p className="mt-2 text-sm text-body/70">
                    {new Date(p.published).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                )}
                {p.excerpt && <p className="mt-2 text-sm">{p.excerpt.slice(0, 140)}…</p>}
              </div>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
