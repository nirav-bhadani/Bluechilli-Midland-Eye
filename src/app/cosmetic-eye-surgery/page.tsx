import type { Metadata } from "next";
import { TreatmentPage } from "@/components/templates/TreatmentPage";
import { content } from "@/content/treatments/cosmetic-eye-surgery";

export const metadata: Metadata = {
  title: { absolute: content.meta.metaTitle },
  description: content.meta.metaDescription,
  alternates: { canonical: content.meta.path },
};

export default function Page() {
  return (
    <TreatmentPage
      content={content}
      title="Cosmetic Eye Surgery"
      related={[{"label":"Consultants","href":"/consultants-and-specialist-page"}]}
    />
  );
}
