import type { Metadata } from "next";
import { ContentPage } from "@/components/templates/ContentPage";
import { FinanceCalculator } from "@/components/sections/FinanceCalculator";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { JsonLd } from "@/components/seo/JsonLd";
import { content } from "@/content/pages/finance";
import { faqPageNode } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: content.meta.metaTitle },
  description: content.meta.metaDescription,
  alternates: { canonical: "/finance-options" },
};

export default function FinancePage() {
  const faq = faqPageNode(content.blocks);
  return (
    <>
      <ContentPage
        content={content}
        eyebrow="Payment plans"
        title="Finance"
        highlight="Options"
        intro="Spread the cost of your treatment with 0% finance over 24 to 60 months — no hidden fees."
      >
        <div className="container pb-16">
          <FinanceCalculator />
        </div>
        <TrustStrip />
      </ContentPage>
      {faq && <JsonLd data={faq} />}
    </>
  );
}
