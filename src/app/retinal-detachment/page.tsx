import type { Metadata } from "next";
import { TreatmentPage } from "@/components/templates/TreatmentPage";
import { content } from "@/content/treatments/retinal-detachment";

export const metadata: Metadata = {
  title: { absolute: content.meta.metaTitle },
  description: content.meta.metaDescription,
  alternates: { canonical: content.meta.path },
};

export default function Page() {
  return (
    <TreatmentPage
      content={content}
      title="Retinal Detachment"
      related={[{"label":"Diabetic Retinopathy","href":"/diabetic-retinopathy-treatment"},{"label":"Macular Degeneration","href":"/macular-degeneration"}]}
      callFirst
    />
  );
}
