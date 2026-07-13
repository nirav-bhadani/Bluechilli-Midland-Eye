import type { MetadataRoute } from "next";
import { clinic } from "@/content/global";
import { posts } from "@/content/posts";

const treatments = [
  "/laser-eye-surgery",
  "/cataract-surgery",
  "/laser-cataract-surgery",
  "/clear-lens-exchange",
  "/evo-icl-lens-exchange",
  "/cosmetic-eye-surgery",
  "/glaucoma",
  "/diabetic-retinopathy-treatment",
  "/keratoconus-treatment",
  "/macular-degeneration",
  "/retinal-detachment",
];

const pages = [
  "/",
  "/about-us",
  "/consultants-and-specialist-page",
  "/refer-a-patient",
  "/finance-options",
  "/contact",
  "/translation-services",
  "/blog",
];

const legal = [
  "/care-quality-commission-rating",
  "/accessibility-guide",
  "/how-we-work-with-our-doctors-cma",
  "/fair-processing-information-for-patients-phin",
  "/patient-reported-outcome-measures-proms",
  "/privacy-policy",
  "/sms-privacy-policy",
  "/terms-and-conditions",
  "/feedback-draw-terms-and-conditions",
  "/refer-friends-and-family-tnc",
];

/** /thank-you deliberately excluded (noindex). */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pages.map((p) => ({
      url: `${clinic.url}${p === "/" ? "" : p}`,
      changeFrequency: "weekly" as const,
      priority: p === "/" ? 1 : 0.8,
    })),
    ...treatments.map((p) => ({
      url: `${clinic.url}${p}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...posts.map((p) => ({
      url: `${clinic.url}${p.meta.path}`,
      lastModified: p.modified || p.published || undefined,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
    ...legal.map((p) => ({
      url: `${clinic.url}${p}`,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
