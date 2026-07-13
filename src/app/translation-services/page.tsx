import type { Metadata } from "next";
import { ContentPage } from "@/components/templates/ContentPage";
import { content } from "@/content/pages/translation-services";

export const metadata: Metadata = {
  title: { absolute: content.meta.metaTitle },
  description: content.meta.metaDescription,
  alternates: { canonical: content.meta.path },
};

export default function Page() {
  return <ContentPage content={content} title="Translation Services" />;
}
