/**
 * Header navigation config. Treatment groups mirror the live IA (slugs unchanged);
 * the one-line descriptions are [NEW – UX] plain-English wayfinding only — no medical claims.
 */

export interface NavItem {
  label: string;
  href: string;
  desc?: string;
}

export const megaMenu: { group: string; items: NavItem[] }[] = [
  {
    group: "Vision Correction",
    items: [
      {
        label: "Laser Eye Surgery",
        href: "/laser-eye-surgery",
        desc: "LASIK, LASEK and PRK to reduce dependence on glasses",
      },
      {
        label: "EVO ICL",
        href: "/evo-icl-lens-exchange",
        desc: "Implantable lens for those unsuitable for laser surgery",
      },
      {
        label: "Clear Lens Exchange",
        href: "/clear-lens-exchange",
        desc: "Replace your natural lens with a personalised artificial one",
      },
      {
        label: "Cataract Surgery",
        href: "/cataract-surgery",
        desc: "Private cataract removal with no waiting times",
      },
      {
        label: "Laser Cataract Surgery",
        href: "/laser-cataract-surgery",
        desc: "Femtosecond laser-assisted cataract surgery",
      },
    ],
  },
  {
    group: "Oculoplastic",
    items: [
      {
        label: "Cosmetic Eye Surgery",
        href: "/cosmetic-eye-surgery",
        desc: "Eyelid and oculoplastic procedures by consultant surgeons",
      },
    ],
  },
  {
    group: "Retinal & Eye Disease",
    items: [
      {
        label: "Glaucoma",
        href: "/glaucoma",
        desc: "Diagnosis, drops, SLT laser and surgical options",
      },
      {
        label: "Diabetic Retinopathy",
        href: "/diabetic-retinopathy-treatment",
        desc: "Fast follow-up after diabetic eye screening",
      },
      {
        label: "Keratoconus",
        href: "/keratoconus-treatment",
        desc: "Cross-linking and corneal care from cornea specialists",
      },
      {
        label: "Macular Degeneration",
        href: "/macular-degeneration",
        desc: "Rapid assessment and treatment for wet and dry AMD",
      },
      {
        label: "Retinal Detachment",
        href: "/retinal-detachment",
        desc: "Urgent assessment and retinal repair surgery",
      },
    ],
  },
];

export const primaryNav: (NavItem & { children?: NavItem[] })[] = [
  { label: "Treatments", href: "/cataract-surgery" }, // rendered as mega menu trigger
  { label: "Consultants", href: "/consultants-and-specialist-page" },
  {
    label: "About Us",
    href: "/about-us",
    children: [
      { label: "About Us", href: "/about-us" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    label: "Patient Info",
    href: "/finance-options",
    children: [
      { label: "Finance Options", href: "/finance-options" },
      { label: "Refer a Patient", href: "/refer-a-patient" },
      { label: "Translation Services", href: "/translation-services" },
    ],
  },
  { label: "Contact", href: "/contact" },
];
