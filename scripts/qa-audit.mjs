/** QA audit: fetches every route from the running server and checks structure + verbatim copy. */
import * as cheerio from "cheerio";

const BASE = "http://localhost:3115";
const routes = [
  "/", "/laser-eye-surgery", "/cataract-surgery", "/laser-cataract-surgery",
  "/clear-lens-exchange", "/evo-icl-lens-exchange", "/cosmetic-eye-surgery", "/glaucoma",
  "/diabetic-retinopathy-treatment", "/keratoconus-treatment", "/macular-degeneration",
  "/retinal-detachment", "/about-us", "/consultants-and-specialist-page", "/refer-a-patient",
  "/finance-options", "/contact", "/translation-services", "/blog", "/thank-you",
  "/care-quality-commission-rating", "/accessibility-guide", "/how-we-work-with-our-doctors-cma",
  "/fair-processing-information-for-patients-phin", "/patient-reported-outcome-measures-proms",
  "/privacy-policy", "/sms-privacy-policy", "/terms-and-conditions",
  "/feedback-draw-terms-and-conditions", "/refer-friends-and-family-tnc",
  "/blog/understanding-cataracts-when-is-cataract-surgery-right-for-you",
];

// Verbatim sentinels that MUST render on specific pages
const sentinels = {
  "/cataract-surgery": ["less than 1 case per 1000 procedures", "7.5%"],
  "/laser-eye-surgery": ["LASEK", "LASIK"],
  "/laser-cataract-surgery": ["Femto Second Laser"],
  "/finance-options": ["deposit is not required"],
  "/consultants-and-specialist-page": ["Royal College of Ophthalmologists", "Sivaraj", "Darren Shu Jeng Ting"],
  "/": ["FIVE-STAR RATED EYE HOSPITAL", "does not make claims or guarantees"],
  "/contact": ["50 Lode Lane", "Weekdays: 8am to 8pm"],
};

let fails = 0;
for (const r of routes) {
  const issues = [];
  try {
    const res = await fetch(BASE + r);
    if (res.status !== 200) issues.push(`status ${res.status}`);
    const html = await res.text();
    const $ = cheerio.load(html);
    const h1s = $("h1").length;
    if (h1s !== 1) issues.push(`${h1s} h1s`);
    if (!$("title").text().trim()) issues.push("no title");
    if (!$('meta[name="description"]').attr("content") && r !== "/thank-you") issues.push("no meta desc");
    const noAlt = $("img:not([alt])").length;
    if (noAlt) issues.push(`${noAlt} imgs missing alt`);
    if (!$("main, article, section").length) issues.push("no landmarks");
    const text = $("body").text();
    for (const s of sentinels[r] ?? []) {
      if (!text.includes(s) && !html.includes(s)) issues.push(`MISSING VERBATIM: "${s}"`);
    }
    if (r !== "/thank-you" && !text.includes("does not make claims")) issues.push("disclaimer missing");
  } catch (e) {
    issues.push(`fetch failed: ${e.message}`);
  }
  if (issues.length) {
    fails++;
    console.log(`FAIL ${r}: ${issues.join(" | ")}`);
  }
}
console.log(fails === 0 ? `ALL ${routes.length} ROUTES PASS` : `${fails} routes with issues`);
