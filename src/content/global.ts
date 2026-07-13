/**
 * Global site facts and shared copy — all strings verbatim from the live site
 * (extracted 2026-07-10; sources noted inline).
 */

export const clinic = {
  name: "Midland Eye",
  legalName: "Eye Docs Ltd",
  /** Live footer, verbatim. */
  legalLine:
    "Eye Docs Ltd trading as Midland Eye with companies house no 04414314 and registered address at 50 Lode Lane, Solihull, West Midlands, B91 2AW",
  address: {
    street: "50 Lode Lane",
    town: "Solihull",
    county: "West Midlands",
    postcode: "B91 2AW",
  },
  phone: "0121 711 2020",
  phoneHref: "tel:+441217112020",
  email: "info@midlandeye.com",
  referralEmail: "referralsupport@midlandeye.com",
  /** Live contact page, verbatim. */
  openingTimes: [
    { days: "Weekdays", hours: "8am to 8pm" },
    { days: "Weekends", hours: "8am to 4pm" },
  ],
  url: "https://midlandeye.com",
  companiesHouseNo: "04414314",
} as const;

/** Home hero, verbatim. */
export const hero = {
  title: "FIVE-STAR RATED EYE HOSPITAL",
  subtitle: "Local World-Class Consultants.",
  strap: "Book your consultation today. No waiting times.",
  chips: [
    "No waiting times",
    "0% finance available",
    "One year free aftercare",
    "World class local surgeons",
  ],
} as const;

/** Home "Why choose us?" tiles, verbatim. */
export const whyChooseUs = {
  heading: "Why choose us?",
  intro: "At Midland Eye Clinic, we’re changing lives through visionary care.",
  points: [
    {
      title: "Modern eye treatment pioneers",
      text: "We’re specialists for the diagnosis & treatment of all eye conditions.",
    },
    {
      title: "Based in Solihull",
      text: "We’re locally based, with our world class team based in Solihull.",
    },
    {
      title: "Complimentary aftercare",
      text: "We offer one year comprehensive free aftercare post surgery.",
    },
    {
      title: "5 star rated",
      text: "Our world class surgeons & results are 5* rated on Doctify.",
    },
    {
      title: "Unrivalled facilities",
      text: "Our state-of-the-art surgical facilities are truly world class in terms of quality.",
    },
    {
      title: "Interest free payments",
      text: "We offer 0% finance and payment options on our surgical services.",
    },
  ],
} as const;

/** Treatment-page journey stepper, verbatim (live laser/cataract pages). */
export const journey = {
  heading: "Treatment journey",
  intro: "Your 5 step journey to visual excellence.",
  steps: [
    {
      stage: "Stage 1",
      title: "Initial assessment",
      text: "A thorough and in-depth initial assessment is performed to determine if you are a suitable candidate for your preferred treatment",
    },
    {
      stage: "Stage 2",
      title: "Meet your consultant",
      text: "At this meeting with your Surgeon, we will identify and discuss a recommended, fully personalised treatment pathway.",
    },
    {
      stage: "Stage 3",
      title: "Finalise your treatment",
      text: "You’ll meet our Clinical Liaison Lead to discuss treatment details and financial arrangements during your visit.",
    },
    {
      stage: "Stage 4",
      title: "Have your treatment",
      text: "On your procedure day, our Nurse and Clinical Team ensure your comfort, making the virtually painless surgery a swift experience.",
    },
    {
      stage: "Stage 5",
      title: "Comprehensive aftercare",
      text: "Our aftercare package ensures safety and successful treatment, including one year of post-treatment care for select laser eye surgery procedure.",
    },
  ],
} as const;

/** Home finance block, verbatim. */
export const financeTeaser = {
  eyebrow: "Payment Plans",
  heading: "Finance Done Right",
  points: [
    {
      title: "Interest Free",
      text: "With our interest-free payment plan, you can focus on your treatment, not the cost, with no extra charges or hidden fees.",
    },
    {
      title: "Long-Term Payment",
      text: "Get more time to enjoy life and less time worrying about how to pay, with treatment costs spread over 24 to 60 months.",
    },
  ],
} as const;

/** Form consent line, verbatim (home + contact forms). */
export const formConsentLine =
  "By filling in the form you agree to share your information and be contacted by Midland Eye. View our Privacy Policy.";

/** Sitewide medical disclaimer, verbatim (rendered above the footer bottom bar). */
export const medicalDisclaimer =
  "Midland Eye does not make claims or guarantees regarding the outcome of any consultation, procedure, or treatment. Clinical results can vary depending on individual patient factors, medical history, and response to treatment. While we strive to provide the highest standard of care, all medical procedures carry potential risks and uncertainties. Any patient testimonials presented are for informational purposes only and should not be interpreted as a guarantee of specific results.";

/** Header/footer treatment links — live IA, slugs unchanged. */
export const treatmentNav = {
  visionCorrection: [
    { label: "Laser Eye Surgery", href: "/laser-eye-surgery" },
    { label: "EVO ICL Lens Implantation", href: "/evo-icl-lens-exchange" },
    { label: "Clear Lens Exchange Surgery", href: "/clear-lens-exchange" },
    { label: "Cataract Surgery", href: "/cataract-surgery" },
    { label: "Laser Cataract Surgery", href: "/laser-cataract-surgery" },
  ],
  oculoplastic: [{ label: "Cosmetic Eye Treatments", href: "/cosmetic-eye-surgery" }],
  retinalAndDisease: [
    { label: "Glaucoma", href: "/glaucoma" },
    { label: "Diabetic Retinopathy", href: "/diabetic-retinopathy-treatment" },
    { label: "Keratoconus", href: "/keratoconus-treatment" },
    { label: "Macular Degeneration", href: "/macular-degeneration" },
    { label: "Retinal Detachment", href: "/retinal-detachment" },
  ],
} as const;

export const legalNav = [
  { label: "Care Quality Commission Rating", href: "/care-quality-commission-rating" },
  { label: "Accessibility Guide", href: "/accessibility-guide" },
  { label: "How We Work With Our Doctors (CMA)", href: "/how-we-work-with-our-doctors-cma" },
  {
    label: "Fair processing information for patients (PHIN)",
    href: "/fair-processing-information-for-patients-phin",
  },
  {
    label: "Patient Reported Outcome Measures (PROMs)",
    href: "/patient-reported-outcome-measures-proms",
  },
  {
    label: "Data Opt-Out",
    href: "https://digital.nhs.uk/services/national-data-opt-out",
    external: true,
  },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "SMS Privacy Policy", href: "/sms-privacy-policy" },
  { label: "Terms and Conditions", href: "/terms-and-conditions" },
] as const;

export const quickLinks = [
  { label: "Consultants and Specialists", href: "/consultants-and-specialist-page" },
  { label: "How to Refer", href: "/refer-a-patient" },
  { label: "Translation Services", href: "/translation-services" },
] as const;
