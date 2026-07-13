import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { BlockRenderer } from "@/components/sections/BlockRenderer";
import { JsonLd } from "@/components/seo/JsonLd";
import { posts } from "@/content/posts";
import { clinicId } from "@/lib/schema";
import { clinic } from "@/content/global";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: { absolute: post.meta.metaTitle },
    description: post.meta.metaDescription,
    alternates: { canonical: post.meta.path },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const blocks = post.blocks.filter(
    (b, i) => !(i < 3 && (b.t === "h1" || b.t === "h2") && b.text.trim() === post.title.trim())
  );
  const dateLabel = post.published
    ? new Date(post.published).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : undefined;

  return (
    <>
      <PageHero
        eyebrow={post.categories[0] ?? "Article"}
        title={post.title}
        intro={dateLabel ? `Published ${dateLabel}` : undefined}
        crumbs={[
          { label: "Blog", href: "/blog" },
          { label: post.title, href: post.meta.path },
        ]}
      />

      <section className="section">
        <div className="container">
          <article className="mx-auto max-w-3xl">
            <BlockRenderer blocks={blocks} headingShift />
          </article>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          datePublished: post.published,
          dateModified: post.modified || post.published,
          url: `${clinic.url}${post.meta.path}`,
          publisher: { "@id": clinicId },
        }}
      />
    </>
  );
}
