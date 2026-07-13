import * as cheerio from "cheerio";
import fs from "node:fs";

const html = fs.readFileSync("../content-archive/pages/home.html", "utf8");
const $ = cheerio.load(html);
const footer = $('[data-elementor-type="footer"]').first();
const header = $('[data-elementor-type="header"]').first();

const out = {
  footerText: footer.text().replace(/\s+/g, " ").trim(),
  footerLinks: footer
    .find("a")
    .map((_, a) => ({ text: $(a).text().replace(/\s+/g, " ").trim(), href: $(a).attr("href") }))
    .get()
    .filter((l) => l.text),
  headerText: header.text().replace(/\s+/g, " ").trim().slice(0, 1500),
};
fs.writeFileSync("../content-archive/extracted/global-chrome.json", JSON.stringify(out, null, 1));
console.log(out.footerText.slice(0, 2400));
