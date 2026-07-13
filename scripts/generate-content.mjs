/**
 * Generates typed src/content/*.ts files from content-archive/extracted/*.json.
 * Blocks are embedded verbatim; meta titles/descriptions come from the
 * approved page specs in "All Pages MD files" (legal pages/posts keep live meta).
 */
import fs from "node:fs";
import path from "node:path";

const EX = path.resolve(process.cwd(), "../content-archive/extracted");
const SRC = path.resolve(process.cwd(), "src/content");

const read = (n) => JSON.parse(fs.readFileSync(path.join(EX, `${n}.json`), "utf8"));
const write = (rel, body) => {
  const f = path.join(SRC, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, body);
  console.log("wrote", rel);
};
const j = (v) => JSON.stringify(v, null, 2);

/* ---- Spec meta (from All Pages MD files; verbatim titles/descriptions) ---- */
const TREATMENTS = {
  "laser-eye-surgery": {
    path: "/laser-eye-surgery",
    metaTitle: "Laser Eye Surgery in Solihull & Birmingham (LASIK, LASEK, PRK) | Midland Eye",
    metaDescription:
      "LASIK, LASEK & PRK laser eye surgery at Midland Eye, Solihull. World-class surgeons, 0% finance from £500 deposit, and one year of aftercare on select procedures.",
  },
  "cataract-surgery": {
    path: "/cataract-surgery",
    metaTitle: "Private Cataract Surgery in Solihull & Birmingham | Midland Eye",
    metaDescription:
      "Private cataract surgery with no waiting times at Midland Eye, Solihull. Standard phacoemulsification or LENSAR laser-assisted surgery, one year aftercare and 0% finance.",
  },
  "laser-cataract-surgery": {
    src: "laser-cataract-surgery.WAYBACK-20241114",
    path: "/laser-cataract-surgery",
    metaTitle: "Laser Cataract Surgery (Femtosecond LENSAR) | Midland Eye Solihull",
    metaDescription:
      "Femtosecond laser-assisted cataract surgery at Midland Eye. Safe, precise LENSAR technology with 3-D eye imaging, performed by consultant surgeons in Solihull.",
  },
  "clear-lens-exchange": {
    path: "/clear-lens-exchange",
    metaTitle: "Clear Lens Exchange & Lens Replacement Surgery Solihull | Midland Eye",
    metaDescription:
      "Lens replacement (clear lens exchange) at Midland Eye, Solihull — replace your natural lens with a personalised artificial lens to correct vision or treat cataracts. 0% finance available.",
  },
  "evo-icl": {
    src: "evo-icl-lens-exchange",
    path: "/evo-icl-lens-exchange",
    metaTitle: "EVO ICL Implantable Contact Lens Surgery Solihull | Midland Eye",
    metaDescription:
      "EVO ICL vision correction at Midland Eye, Solihull — an additive implantable lens for people unsuitable for laser eye surgery. Consultant-delivered with one year aftercare.",
  },
  "cosmetic-eye-surgery": {
    path: "/cosmetic-eye-surgery",
    metaTitle: "Cosmetic Eye & Eyelid Surgery Solihull (Blepharoplasty & More) | Midland Eye",
    metaDescription:
      "Oculoplastic and cosmetic eye surgery at Midland Eye, Solihull — blepharoplasty, ptosis correction, ectropion/entropion, eyelid lumps and watery eye, by consultant oculoplastic surgeons.",
  },
  glaucoma: {
    path: "/glaucoma",
    metaTitle: "Private Glaucoma Treatment in Solihull & Birmingham | Midland Eye",
    metaDescription:
      "Fast access to consultant-led glaucoma care at Midland Eye, Solihull — diagnosis, eye drops, SLT laser, iStent MIGS and PreserFlo, with an on-site SLT laser.",
  },
  "diabetic-retinopathy": {
    src: "diabetic-retinopathy-treatment",
    path: "/diabetic-retinopathy-treatment",
    metaTitle: "Diabetic Retinopathy Treatment Solihull & Birmingham | Midland Eye",
    metaDescription:
      "Consultant-led diagnosis and treatment of diabetic retinopathy at Midland Eye, Solihull — including intravitreal injections and vitrectomy, with fast access and no waiting times.",
  },
  keratoconus: {
    src: "keratoconus-treatment",
    path: "/keratoconus-treatment",
    metaTitle: "Keratoconus Treatment & Cross-Linking Solihull | Midland Eye",
    metaDescription:
      "Specialist keratoconus care at Midland Eye, Solihull — diagnosis, corneal cross-linking and corneal graft surgery from cornea consultants including Prof. Sunil Shah and A/Prof. Darren Ting.",
  },
  "macular-degeneration": {
    path: "/macular-degeneration",
    metaTitle: "Macular Degeneration (AMD) Treatment Solihull & Birmingham | Midland Eye",
    metaDescription:
      "Fast, consultant-led assessment and treatment of macular degeneration at Midland Eye, Solihull, including intravitreal injections for wet AMD — with no waiting times.",
  },
  "retinal-detachment": {
    path: "/retinal-detachment",
    metaTitle: "Retinal Detachment Surgery & Urgent Care Solihull | Midland Eye",
    metaDescription:
      "Urgent assessment and surgery for retinal detachment at Midland Eye, Solihull — vitrectomy and retinal repair by consultant vitreoretinal surgeons. Call 0121 711 2020 today.",
  },
};

const PAGES = {
  home: {
    src: "home",
    path: "/",
    metaTitle: "Private Eye Hospital in Solihull | Midland Eye Clinic",
    metaDescription:
      "Midland Eye is a 5-star rated private eye clinic in Solihull with world-class consultant surgeons, no waiting times, 0% finance and one year of free aftercare. Book your consultation today.",
  },
  about: {
    src: "about-us",
    path: "/about-us",
    metaTitle: "About Midland Eye | Private Eye Clinic in Solihull for 25+ Years",
    metaDescription:
      "Midland Eye is a comprehensive private eye clinic in Solihull rated 'Good' by the CQC and 5 stars on Trustpilot, with on-site theatre, femtosecond and refractive lasers, IPL and SLT.",
  },
  contact: {
    src: "contact",
    path: "/contact",
    metaTitle: "Contact Midland Eye | Book a Consultation in Solihull",
    metaDescription:
      "Contact Midland Eye, 50 Lode Lane, Solihull B91 2AW. Call 0121 711 2020 or book a consultation online. Open 7 days a week with free on-site parking via Grove Road.",
  },
  finance: {
    src: "finance-options",
    path: "/finance-options",
    metaTitle: "0% Finance & Payment Plans for Eye Surgery | Midland Eye Solihull",
    metaDescription:
      "Spread the cost of laser eye surgery, lens replacement or cataract surgery at Midland Eye with 0% finance and payment plans over 24–60 months. No hidden fees.",
  },
  "refer-a-patient": {
    src: "refer-a-patient",
    path: "/refer-a-patient",
    metaTitle: "Refer a Patient to Midland Eye | Optometrist & GP Referrals Solihull",
    metaDescription:
      "How to refer patients to Midland Eye for cataract, refractive and specialist eye care — direct optometrist referral scheme, referral forms and post-op protocols.",
  },
  "translation-services": {
    src: "translation-services",
    path: "/translation-services",
    metaTitle: "Translation & Interpreter Services | Midland Eye Solihull",
    metaDescription:
      "Midland Eye offers translation and interpreter support so every patient can understand their diagnosis and treatment. Learn how to arrange language support for your visit.",
  },
  blog: {
    src: "blog",
    path: "/blog",
    metaTitle: "Eye Health Blog & News | Midland Eye",
    metaDescription:
      "Keep up to date with Midland Eye — patient education, news and updates from our consultant ophthalmologists in Solihull.",
  },
  "thank-you": {
    src: "thank-you",
    path: "/thank-you",
    metaTitle: "Thank You — We'll Be In Touch | Midland Eye",
    metaDescription:
      "Thanks for your enquiry. Our patient care team will contact you from 0121 711 2020 to schedule a convenient time for your consultation.",
  },
};

const LEGAL = [
  "care-quality-commission-rating",
  "accessibility-guide",
  "how-we-work-with-our-doctors-cma",
  "fair-processing-information-for-patients-phin",
  "patient-reported-outcome-measures-proms",
  "privacy-policy",
  "sms-privacy-policy",
  "terms-and-conditions",
  "feedback-draw-terms-and-conditions",
  "refer-friends-and-family-tnc",
];

/* ------------------------------- treatments ------------------------------- */
for (const [slug, m] of Object.entries(TREATMENTS)) {
  const data = read(m.src || slug);
  write(
    `treatments/${slug}.ts`,
    `import type { TreatmentContent } from "@/lib/types";

export const content: TreatmentContent = ${j({
      kind: "treatment",
      slug,
      meta: { metaTitle: m.metaTitle, metaDescription: m.metaDescription, path: m.path },
      blocks: data.blocks,
    })};
`
  );
}

/* --------------------------------- pages ---------------------------------- */
for (const [name, m] of Object.entries(PAGES)) {
  const data = read(m.src);
  write(
    `pages/${name}.ts`,
    `import type { PageContent } from "@/lib/types";

export const content: PageContent = ${j({
      slug: name,
      meta: { metaTitle: m.metaTitle, metaDescription: m.metaDescription, path: m.path },
      blocks: data.blocks,
    })};
`
  );
}

/* --------------------------------- legal ---------------------------------- */
for (const slug of LEGAL) {
  const data = read(slug);
  const h1 = data.blocks.find((b) => b.t === "h1");
  write(
    `pages/legal/${slug}.ts`,
    `import type { LegalPageContent } from "@/lib/types";

export const content: LegalPageContent = ${j({
      kind: "legal",
      slug,
      meta: {
        metaTitle: data.meta.metaTitle || `${h1?.text ?? slug} | Midland Eye`,
        metaDescription: data.meta.metaDescription || "",
        path: `/${slug}`,
      },
      lastModified: data.meta.modified || undefined,
      blocks: data.blocks,
    })};
`
  );
}

/* --------------------------------- posts ---------------------------------- */
const postFiles = fs
  .readdirSync(EX)
  .filter((f) => f.startsWith("post__"))
  .map((f) => f.replace(/\.json$/, ""));
const postSlugs = [];
for (const pf of postFiles) {
  const slug = pf.replace(/^post__/, "");
  postSlugs.push(slug);
  const data = read(pf);
  const h1 = data.blocks.find((b) => b.t === "h1" || b.t === "h2");
  const title = (data.meta.metaTitle || "").replace(/ - Midland Eye.*$/, "") || h1?.text || slug;
  const img = data.blocks.find((b) => b.t === "img");
  const firstP = data.blocks.find((b) => b.t === "p");
  write(
    `posts/${slug}.ts`,
    `import type { PostContent } from "@/lib/types";

export const post: PostContent = ${j({
      kind: "post",
      slug,
      title,
      published: data.meta.published,
      modified: data.meta.modified || undefined,
      categories: [...new Set(data.meta.categories)],
      image: img?.src,
      excerpt: firstP ? firstP.html.replace(/<[^>]+>/g, "").slice(0, 200) : undefined,
      meta: {
        metaTitle: data.meta.metaTitle || title,
        metaDescription: data.meta.metaDescription || "",
        path: `/blog/${slug}`,
      },
      blocks: data.blocks,
    })};
`
  );
}
write(
  `posts/index.ts`,
  postSlugs.map((s, i) => `import { post as p${i} } from "./${s}";`).join("\n") +
    `\n\nexport const posts = [${postSlugs.map((_, i) => `p${i}`).join(", ")}].sort((a, b) =>\n  b.published.localeCompare(a.published)\n);\n`
);

/* ------------------------------ consultants -------------------------------- */
const cons = read("consultants-and-specialist-page");
const NAME_RE = /^(Miss|Mr|Ms|Mrs|Associate Professor|Professor|Prof\.?|Dr)\s+[A-Z]/;
const records = [];
let cur = null;
let pendingImg = null;
for (const b of cons.blocks) {
  if (b.t === "img") {
    pendingImg = b.src;
    if (cur) cur.blocks.push(b);
    continue;
  }
  if (b.t === "h4" && NAME_RE.test(b.text)) {
    cur = { name: b.text, image: pendingImg || undefined, title: "", specialisms: [], blocks: [] };
    records.push(cur);
    pendingImg = null;
    continue;
  }
  if (!cur) continue;
  if (!cur.title && b.t === "p") {
    cur.title = b.html.replace(/<[^>]+>/g, "").trim();
    continue;
  }
  if (!cur.specialisms.length && (b.t === "ul" || b.t === "ol")) {
    cur.specialisms = b.items.map((x) => x.replace(/<[^>]+>/g, "").trim()).filter(Boolean);
    continue;
  }
  if (b.t === "h2" && b.text.trim() === "Specialisms") continue;
  cur.blocks.push(b);
}
const slugify = (n) =>
  n
    .toLowerCase()
    .replace(/^(miss|mr|ms|mrs|associate professor|professor|prof\.?|dr)\s+/, "")
    .replace(/[^a-z\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
for (const r of records) r.id = slugify(r.name);

// The live page renders two device-specific sections with overlapping rosters —
// merge duplicates, keeping whichever profile has the fuller bio.
const byId = new Map();
for (const r of records) {
  const prev = byId.get(r.id);
  if (!prev || r.blocks.length > prev.blocks.length) byId.set(r.id, prev ? { ...r, order: prev.order } : { ...r, order: byId.size });
}
const deduped = [...byId.values()].sort((a, b) => a.order - b.order);

write(
  `consultants.ts`,
  `import type { Consultant } from "@/lib/types";

/** Verified against the live consultants page 2026-07-10 — ${deduped.length} consultants. */
export const consultants: Consultant[] = ${j(deduped.map(({ id, name, title, image, specialisms, blocks }) => ({ id, name, title, image, specialisms, blocks })))};

export const consultantsIntro = ${j(cons.blocks.filter((b) => ["h1", "p"].includes(b.t)).slice(0, 4))};
`
);
console.log(
  "consultants:",
  records.map((r) => r.name).join(" | ")
);
