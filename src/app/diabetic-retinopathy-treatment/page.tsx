import type { Metadata } from "next";
import { TreatmentPage } from "@/components/templates/TreatmentPage";
import { content } from "@/content/treatments/diabetic-retinopathy";

export const metadata: Metadata = {
  title: { absolute: content.meta.metaTitle },
  description: content.meta.metaDescription,
  alternates: { canonical: content.meta.path },
};

export default function Page() {
  return (
    <TreatmentPage
      content={content}
      title="Diabetic Retinopathy Treatment"
      related={[{"label":"Macular Degeneration","href":"/macular-degeneration"},{"label":"Retinal Detachment","href":"/retinal-detachment"}]}
    />
  );
}
