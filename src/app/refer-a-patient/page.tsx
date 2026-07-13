import type { Metadata } from "next";
import { ContentPage } from "@/components/templates/ContentPage";
import { content } from "@/content/pages/refer-a-patient";

export const metadata: Metadata = {
  title: { absolute: content.meta.metaTitle },
  description: content.meta.metaDescription,
  alternates: { canonical: content.meta.path },
};

export default function Page() {
  return (
    <ContentPage
      content={content}
      eyebrow="For professionals"
      title="Refer a"
      highlight="Patient"
      intro="Seamless referrals for optometrists and GPs — direct schemes, referral forms and post-op protocols."
    />
  );
}
