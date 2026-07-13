/** Emits legal routes + simple T2 routes. */
import fs from "node:fs";
import path from "node:path";

const LEGAL = [
  ["care-quality-commission-rating", "Care Quality Commission Rating"],
  ["accessibility-guide", "Accessibility Guide"],
  ["how-we-work-with-our-doctors-cma", "How We Work With Our Doctors (CMA)"],
  ["fair-processing-information-for-patients-phin", "Fair Processing Information for Patients (PHIN)"],
  ["patient-reported-outcome-measures-proms", "Patient Reported Outcome Measures (PROMs)"],
  ["privacy-policy", "Privacy Policy"],
  ["sms-privacy-policy", "SMS Privacy Policy"],
  ["terms-and-conditions", "Terms and Conditions"],
  ["feedback-draw-terms-and-conditions", "Feedback Draw Terms and Conditions"],
  ["refer-friends-and-family-tnc", "Refer Friends and Family T&C"],
];

for (const [slug, title] of LEGAL) {
  const dir = path.join("src/app", slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, "page.tsx"),
    `import type { Metadata } from "next";
import { LegalPage } from "@/components/templates/LegalPage";
import { content } from "@/content/pages/legal/${slug}";

export const metadata: Metadata = {
  title: { absolute: content.meta.metaTitle },
  description:
    content.meta.metaDescription ||
    ${JSON.stringify(title)} + " — Midland Eye, private eye clinic in Solihull.",
  alternates: { canonical: content.meta.path },
};

export default function Page() {
  return <LegalPage content={content} title=${JSON.stringify(title)} />;
}
`
  );
}

const T2 = [
  ["about-us", "about", "About Midland Eye"],
  ["refer-a-patient", "refer-a-patient", "Refer a Patient"],
  ["translation-services", "translation-services", "Translation Services"],
];
for (const [route, file, title] of T2) {
  const dir = path.join("src/app", route);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, "page.tsx"),
    `import type { Metadata } from "next";
import { ContentPage } from "@/components/templates/ContentPage";
import { content } from "@/content/pages/${file}";

export const metadata: Metadata = {
  title: { absolute: content.meta.metaTitle },
  description: content.meta.metaDescription,
  alternates: { canonical: content.meta.path },
};

export default function Page() {
  return <ContentPage content={content} title=${JSON.stringify(title)} />;
}
`
  );
}
console.log("done:", LEGAL.length + T2.length, "routes");
