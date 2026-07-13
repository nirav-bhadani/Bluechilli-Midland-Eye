import type { Metadata } from "next";
import { TreatmentPage } from "@/components/templates/TreatmentPage";
import { content } from "@/content/treatments/cataract-surgery";

export const metadata: Metadata = {
  title: { absolute: content.meta.metaTitle },
  description: content.meta.metaDescription,
  alternates: { canonical: content.meta.path },
};

export default function Page() {
  return (
    <TreatmentPage
      content={content}
      title="Cataract Surgery"
      related={[{"label":"Laser Cataract Surgery","href":"/laser-cataract-surgery"},{"label":"Clear Lens Exchange","href":"/clear-lens-exchange"},{"label":"Glaucoma","href":"/glaucoma"}]}
    />
  );
}
