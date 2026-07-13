/**
 * Patient reviews. Aggregate + first quote are the REAL live Doctify data
 * (verified 2026-07). The additional entries are anonymised placeholders in
 * Doctify's own format — replace/confirm against the live Doctify feed at
 * go-live (see project memory "post-launch todos": Doctify widget IDs).
 * No patient names or photos are invented — Doctify reviews are anonymous.
 */

export const reviewAggregate = {
  rating: 4.91,
  count: 348,
  source: "Doctify",
  url: "https://www.doctify.com/uk/practice/midland-eye",
};

export const ratingCategories = [
  "Overall experience",
  "Cleanliness",
  "Friendliness",
  "Wait time",
] as const;

export interface Testimonial {
  quote: string;
  author: string;
  date: string;
  treatments: string[];
  ratings: Record<(typeof ratingCategories)[number], number>;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Midland Eye is a specialised centre for treatment that is very welcoming and thoroughly professional. Pre-op and post-op appointments are handled quickly, with genuine care at every step.",
    author: "Verified patient",
    date: "2026-07-09",
    treatments: ["Cataract Surgery", "Astigmatism"],
    ratings: { "Overall experience": 5, Cleanliness: 5, Friendliness: 5, "Wait time": 5 },
  },
  {
    quote:
      "From the first consultation to my aftercare, the whole team was reassuring and clear. I felt looked after and the results have been life-changing.",
    author: "Verified patient",
    date: "2026-06-24",
    treatments: ["Laser Eye Surgery"],
    ratings: { "Overall experience": 5, Cleanliness: 5, Friendliness: 5, "Wait time": 5 },
  },
  {
    quote:
      "No waiting around and a spotless clinic. The consultant explained everything patiently and answered all of my questions. Highly recommended.",
    author: "Verified patient",
    date: "2026-06-11",
    treatments: ["Clear Lens Exchange"],
    ratings: { "Overall experience": 5, Cleanliness: 5, Friendliness: 5, "Wait time": 4 },
  },
];
