import type { Metadata } from "next";
import { LegalPage } from "@/components/templates/LegalPage";
import { content } from "@/content/pages/legal/accessibility-guide";

export const metadata: Metadata = {
  title: { absolute: content.meta.metaTitle },
  description:
    content.meta.metaDescription ||
    "Accessibility Guide" + " — Midland Eye, private eye clinic in Solihull.",
  alternates: { canonical: content.meta.path },
};

export default function Page() {
  return <LegalPage content={content} title="Accessibility Guide" />;
}
