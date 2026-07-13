import type { Metadata } from "next";
import { TreatmentPage } from "@/components/templates/TreatmentPage";
import { content } from "@/content/treatments/laser-eye-surgery";

export const metadata: Metadata = {
  title: { absolute: content.meta.metaTitle },
  description: content.meta.metaDescription,
  alternates: { canonical: content.meta.path },
};

export default function Page() {
  return (
    <TreatmentPage
      content={content}
      title="Laser Eye Surgery"
      related={[{"label":"EVO ICL","href":"/evo-icl-lens-exchange"},{"label":"Clear Lens Exchange","href":"/clear-lens-exchange"},{"label":"Cataract Surgery","href":"/cataract-surgery"}]}
    />
  );
}
