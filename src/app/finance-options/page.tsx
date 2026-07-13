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
      <ContentPage content={content} title="Finance Options">
        <div className="mx-auto max-w-[1280px] px-6 pb-14">
          <FinanceCalculator />
        </div>
        <TrustStrip />
      </ContentPage>
      {faq && <JsonLd data={faq} />}
    </>
  );
}
