import { z } from "zod";

/** Treatment options offered in the booking form (live treatment list). */
export const treatmentOptions = [
  { value: "laser-eye-surgery", label: "Laser Eye Surgery" },
  { value: "evo-icl", label: "EVO ICL Lens Implantation" },
  { value: "clear-lens-exchange", label: "Clear Lens Exchange" },
  { value: "cataract-surgery", label: "Cataract Surgery" },
  { value: "laser-cataract-surgery", label: "Laser Cataract Surgery" },
  { value: "cosmetic-eye-surgery", label: "Cosmetic Eye Surgery" },
  { value: "glaucoma", label: "Glaucoma" },
  { value: "diabetic-retinopathy", label: "Diabetic Retinopathy" },
  { value: "keratoconus", label: "Keratoconus" },
  { value: "macular-degeneration", label: "Macular Degeneration" },
  { value: "retinal-detachment", label: "Retinal Detachment" },
  { value: "other", label: "Something else / not sure" },
] as const;

export const contactTimes = ["Morning", "Afternoon", "Evening", "Any time"] as const;

export const ageOptions = ["18-25", "26-40", "41-59", "60+"] as const;

const treatmentValues = treatmentOptions.map((t) => t.value) as [string, ...string[]];

/** Shared client + server validation for the booking form. */
export const enquirySchema = z.object({
  treatment: z.enum(treatmentValues, { message: "Please choose a treatment" }),
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(120, "Name looks too long"),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s()-]{7,20}$/, "Please enter a valid phone number"),
  email: z.string().trim().email("Please enter a valid email address").max(254),
  age: z.enum(ageOptions, { message: "Please select your age range" }),
  postcode: z
    .string()
    .trim()
    .min(5, "Please enter your postcode")
    .max(10, "Postcode looks too long")
    .regex(/^[A-Za-z]{1,2}\d[A-Za-z\d]?\s*\d[A-Za-z]{2}$/, "Please enter a valid UK postcode"),
  contactTime: z.enum(contactTimes, { message: "Please choose a preferred contact time" }),
  consent: z.literal(true, {
    message: "Please agree to the privacy policy so we can contact you",
  }),
  /** Honeypot — must stay empty. */
  company: z.string().max(0).optional().or(z.literal("")),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
