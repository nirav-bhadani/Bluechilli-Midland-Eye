import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BlockRenderer } from "@/components/sections/BlockRenderer";
import { CtaBand } from "@/components/sections/CtaBand";
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

  // Drop the duplicated title heading from the migrated blocks.
  const blocks = post.blocks.filter(
    (b, i) => !(i < 3 && (b.t === "h1" || b.t === "h2") && b.text.trim() === post.title.trim())
  );

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Blog", href: "/blog" },
          { label: post.title, href: post.meta.path },
        ]}
      />
      <article className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-3xl sm:text-4xl">{post.title}</h1>
        <p className="mt-3 text-sm text-body/70">
          {post.categories.join(" · ")}
          {post.published &&
            ` · Published ${new Date(post.published).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`}
        </p>
        <div className="mt-8">
          <BlockRenderer blocks={blocks} headingShift />
        </div>
      </article>
      <CtaBand />
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
