import type { Metadata } from "next";
import { TreatmentPage } from "@/components/templates/TreatmentPage";
import { content } from "@/content/treatments/clear-lens-exchange";

export const metadata: Metadata = {
  title: { absolute: content.meta.metaTitle },
  description: content.meta.metaDescription,
  alternates: { canonical: content.meta.path },
};

export default function Page() {
  return (
    <TreatmentPage
      content={content}
      title="Clear Lens Exchange"
      related={[{"label":"Cataract Surgery","href":"/cataract-surgery"},{"label":"EVO ICL","href":"/evo-icl-lens-exchange"},{"label":"Laser Eye Surgery","href":"/laser-eye-surgery"}]}
    />
  );
}
