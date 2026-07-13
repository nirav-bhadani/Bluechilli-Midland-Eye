import type { Metadata } from "next";
import { LegalPage } from "@/components/templates/LegalPage";
import { content } from "@/content/pages/legal/care-quality-commission-rating";

export const metadata: Metadata = {
  title: { absolute: content.meta.metaTitle },
  description:
    content.meta.metaDescription ||
    "Care Quality Commission Rating" + " — Midland Eye, private eye clinic in Solihull.",
  alternates: { canonical: content.meta.path },
};

export default function Page() {
  return <LegalPage content={content} title="Care Quality Commission Rating" />;
}
