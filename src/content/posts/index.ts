import { post as p0 } from "./a-vision-for-zambia-celebrating-the-dedication-of-rev-simon-dr-ramesh";
import { post as p1 } from "./job-title-healthcare-assistant";
import { post as p2 } from "./job-title-ophthalmic-technician";
import { post as p3 } from "./oculoplastic-surgery-the-importance-in-maintaining-eye-health";
import { post as p4 } from "./understanding-cataracts-when-is-cataract-surgery-right-for-you";
import { post as p5 } from "./were-thrilled-to-announce-the-launch-of-the-evo-icl-consumer-campaign-featuring-none-other-than-england-lioness-and-chelsea-fc-star-lucy-bronze-mbe";
import { post as p6 } from "./what-eye-surgery-can-and-cant-do-for-your-eyesight";

export const posts = [p0, p1, p2, p3, p4, p5, p6].sort((a, b) =>
  b.published.localeCompare(a.published)
);
