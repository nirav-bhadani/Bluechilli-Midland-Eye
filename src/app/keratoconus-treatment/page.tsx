import type { Metadata } from "next";
import { TreatmentPage } from "@/components/templates/TreatmentPage";
import { content } from "@/content/treatments/keratoconus";

export const metadata: Metadata = {
  title: { absolute: content.meta.metaTitle },
  description: content.meta.metaDescription,
  alternates: { canonical: content.meta.path },
};

export default function Page() {
  return (
    <TreatmentPage
      content={content}
      title="Keratoconus Treatment"
      related={[{"label":"Laser Eye Surgery","href":"/laser-eye-surgery"}]}
    />
  );
}
