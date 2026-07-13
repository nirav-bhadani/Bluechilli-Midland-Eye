/** Emits app/<slug>/page.tsx for all 11 treatments (T1 template, SSG). */
import fs from "node:fs";
import path from "node:path";

const T = [
  ["laser-eye-surgery", "laser-eye-surgery", "Laser Eye Surgery", [["EVO ICL", "/evo-icl-lens-exchange"], ["Clear Lens Exchange", "/clear-lens-exchange"], ["Cataract Surgery", "/cataract-surgery"]]],
  ["cataract-surgery", "cataract-surgery", "Cataract Surgery", [["Laser Cataract Surgery", "/laser-cataract-surgery"], ["Clear Lens Exchange", "/clear-lens-exchange"], ["Glaucoma", "/glaucoma"]]],
  ["laser-cataract-surgery", "laser-cataract-surgery", "Laser Cataract Surgery", [["Cataract Surgery", "/cataract-surgery"], ["Clear Lens Exchange", "/clear-lens-exchange"]]],
  ["clear-lens-exchange", "clear-lens-exchange", "Clear Lens Exchange", [["Cataract Surgery", "/cataract-surgery"], ["EVO ICL", "/evo-icl-lens-exchange"], ["Laser Eye Surgery", "/laser-eye-surgery"]]],
  ["evo-icl", "evo-icl-lens-exchange", "EVO ICL Lens Implantation", [["Laser Eye Surgery", "/laser-eye-surgery"], ["Clear Lens Exchange", "/clear-lens-exchange"]]],
  ["cosmetic-eye-surgery", "cosmetic-eye-surgery", "Cosmetic Eye Surgery", [["Consultants", "/consultants-and-specialist-page"]]],
  ["glaucoma", "glaucoma", "Glaucoma", [["Cataract Surgery", "/cataract-surgery"]]],
  ["diabetic-retinopathy", "diabetic-retinopathy-treatment", "Diabetic Retinopathy Treatment", [["Macular Degeneration", "/macular-degeneration"], ["Retinal Detachment", "/retinal-detachment"]]],
  ["keratoconus", "keratoconus-treatment", "Keratoconus Treatment", [["Laser Eye Surgery", "/laser-eye-surgery"]]],
  ["macular-degeneration", "macular-degeneration", "Macular Degeneration", [["Diabetic Retinopathy", "/diabetic-retinopathy-treatment"], ["Retinal Detachment", "/retinal-detachment"]]],
  ["retinal-detachment", "retinal-detachment", "Retinal Detachment", [["Diabetic Retinopathy", "/diabetic-retinopathy-treatment"], ["Macular Degeneration", "/macular-degeneration"]], true],
];

for (const [file, route, title, related, callFirst] of T) {
  const dir = path.join("src/app", route);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, "page.tsx"),
    `import type { Metadata } from "next";
import { TreatmentPage } from "@/components/templates/TreatmentPage";
import { content } from "@/content/treatments/${file}";

export const metadata: Metadata = {
  title: { absolute: content.meta.metaTitle },
  description: content.meta.metaDescription,
  alternates: { canonical: content.meta.path },
};

export default function Page() {
  return (
    <TreatmentPage
      content={content}
      title=${JSON.stringify(title)}
      related={${JSON.stringify(related.map(([label, href]) => ({ label, href })))}}${callFirst ? "\n      callFirst" : ""}
    />
  );
}
`
  );
  console.log("wrote", route);
}
