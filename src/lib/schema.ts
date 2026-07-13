import type { Block } from "@/lib/types";
import { clinic } from "@/content/global";

/** Sitewide clinic node — every page's schema references it via @id. */
export const clinicId = `${clinic.url}/#clinic`;

export function clinicNode() {
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "MedicalOrganization"],
    "@id": clinicId,
    name: clinic.name,
    legalName: clinic.legalName,
    url: clinic.url,
    telephone: clinic.phone,
    email: clinic.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: clinic.address.street,
      addressLocality: clinic.address.town,
      addressRegion: clinic.address.county,
      postalCode: clinic.address.postcode,
      addressCountry: "GB",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "08:00",
        closes: "16:00",
      },
    ],
    sameAs: [
      "https://uk.trustpilot.com/review/midlandeye.com",
      "https://find-and-update.company-information.service.gov.uk/company/04414314",
    ],
  };
}

/** All accordion Q&As on a page, flattened. */
export function faqsFromBlocks(blocks: Block[]) {
  return blocks
    .filter((b): b is Extract<Block, { t: "accordion" }> => b.t === "accordion")
    .flatMap((b) => b.items);
}

export function faqPageNode(blocks: Block[]) {
  const faqs = faqsFromBlocks(blocks);
  if (!faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a.replace(/<[^>]+>/g, " ").trim() },
    })),
  };
}

export function medicalProcedureNode(name: string, path: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name,
    url: `${clinic.url}${path}`,
    description,
    provider: { "@id": clinicId },
  };
}
