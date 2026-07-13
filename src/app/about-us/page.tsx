import type { Metadata } from "next";
import { ContentPage } from "@/components/templates/ContentPage";
import { content } from "@/content/pages/about";

export const metadata: Metadata = {
  title: { absolute: content.meta.metaTitle },
  description: content.meta.metaDescription,
  alternates: { canonical: content.meta.path },
};

export default function Page() {
  return (
    <ContentPage
      content={content}
      eyebrow="About us"
      title="About"
      highlight="Midland Eye"
      intro="A comprehensive private eye clinic in Solihull, rated 'Good' by the CQC and 5 stars on Trustpilot."
    />
  );
}
