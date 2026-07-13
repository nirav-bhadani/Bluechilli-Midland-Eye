import type { Metadata } from "next";
import { TreatmentPage } from "@/components/templates/TreatmentPage";
import { content } from "@/content/treatments/laser-cataract-surgery";

export const metadata: Metadata = {
  title: { absolute: content.meta.metaTitle },
  description: content.meta.metaDescription,
  alternates: { canonical: content.meta.path },
};

export default function Page() {
  return (
    <TreatmentPage
      content={content}
      title="Laser Cataract Surgery"
      related={[{"label":"Cataract Surgery","href":"/cataract-surgery"},{"label":"Clear Lens Exchange","href":"/clear-lens-exchange"}]}
    />
  );
}
