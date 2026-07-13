/**
 * Extracts the main-content copy of every archived live-site page into
 * ordered JSON blocks (content-archive/extracted/*.json).
 * Verbatim rule: text/HTML is captured exactly as served; only wayback
 * prefixes and midlandeye.com asset URLs are rewritten to local paths.
 */
import * as cheerio from "cheerio";
import fs from "node:fs";
import path from "node:path";

const ARCHIVE = path.resolve(process.cwd(), "../content-archive");
const IMAGES_DIR = path.resolve(process.cwd(), "public/images");
const OUT = path.join(ARCHIVE, "extracted");
fs.mkdirSync(OUT, { recursive: true });

const WAYBACK_RE = /https?:\/\/web\.archive\.org\/web\/\d+(?:im_|js_|cs_)?\//g;

function localAsset(url) {
  const clean = url.replace(WAYBACK_RE, "").split("?")[0];
  const m = clean.match(/wp-content\/uploads\/(.+)$/);
  if (!m) return clean;
  const flat = m[1].replace(/\//g, "_");
  if (flat.endsWith(".pdf")) return `/downloads/${flat}`;
  if (fs.existsSync(path.join(IMAGES_DIR, flat))) return `/images/${flat}`;
  const orig = flat.replace(/-\d+x\d+(\.[a-zA-Z]+)$/, "$1");
  if (fs.existsSync(path.join(IMAGES_DIR, orig))) return `/images/${orig}`;
  return clean; // keep original URL so missing assets are findable
}

function cleanHtml($, el) {
  const $el = $(el).clone();
  $el.find("script,style").remove();
  $el.find("[href]").each((_, a) => {
    let href = $(a).attribs?.href ?? $(a).attr("href") ?? "";
    href = href.replace(WAYBACK_RE, "");
    if (/wp-content\/uploads/.test(href)) href = localAsset(href);
    href = href.replace(/^https?:\/\/midlandeye\.com/, "");
    $(a).attr("href", href || "/");
  });
  $el.find("img").each((_, img) => {
    const src = $(img).attr("src") || "";
    $(img).attr("src", localAsset(src));
    $(img).removeAttr("srcset");
  });
  return $el.html()?.replace(/\s+/g, " ").trim() ?? "";
}

function textOf($, el) {
  return $(el).text().replace(/\s+/g, " ").trim();
}

function extract(file, outName) {
  const html = fs.readFileSync(file, "utf8");
  const $ = cheerio.load(html);
  const main = $("main#content").first().length
    ? $("main#content").first()
    : $('[data-elementor-type="wp-page"], [data-elementor-type="wp-post"]').first();
  if (!main.length) {
    console.error(`NO MAIN: ${file}`);
    return;
  }

  const blocks = [];
  const seenToggles = new Set();

  main
    .find("h1,h2,h3,h4,h5,p,ul,ol,table,img,.elementor-toggle,.elementor-accordion,a.elementor-button")
    .each((_, el) => {
      const $el = $(el);
      // skip anything living inside an accordion body/title — captured with its toggle
      if ($el.parents(".elementor-toggle,.elementor-accordion").length) return;
      const tag = el.tagName?.toLowerCase();

      if ($el.hasClass("elementor-toggle") || $el.hasClass("elementor-accordion")) {
        if (seenToggles.has(el)) return;
        seenToggles.add(el);
        const items = [];
        $el.find(".elementor-toggle-item, .elementor-accordion-item").each((_, item) => {
          const q = textOf($, $(item).find(".elementor-toggle-title, .elementor-tab-title").first());
          const a = cleanHtml($, $(item).find(".elementor-tab-content").first());
          if (q || a) items.push({ q, a });
        });
        if (items.length) blocks.push({ t: "accordion", items });
        return;
      }

      if (tag === "img") {
        const src = localAsset($el.attr("src") || "");
        if (/logo|flavicon|favicon/i.test(src)) return;
        blocks.push({ t: "img", src, alt: ($el.attr("alt") || "").trim() });
        return;
      }
      if (tag === "a") {
        const t = textOf($, el);
        if (t) blocks.push({ t: "cta", text: t, href: ($el.attr("href") || "").replace(WAYBACK_RE, "").replace(/^https?:\/\/midlandeye\.com/, "") });
        return;
      }
      if (tag === "ul" || tag === "ol") {
        if ($el.parents("ul,ol").length) return; // nested list: captured with parent
        const items = $el
          .children("li")
          .map((_, li) => cleanHtml($, li))
          .get()
          .filter(Boolean);
        if (items.length) blocks.push({ t: tag, items });
        return;
      }
      if (tag === "table") {
        blocks.push({ t: "table", html: cleanHtml($, el) });
        return;
      }
      if (tag === "p") {
        if ($el.parents("li,table").length) return;
        const htmlContent = cleanHtml($, el);
        if (htmlContent) blocks.push({ t: "p", html: htmlContent });
        return;
      }
      if (/^h[1-5]$/.test(tag || "")) {
        const t = textOf($, el);
        if (t) blocks.push({ t: tag, text: t });
      }
    });

  const meta = {
    sourceUrl: ($('meta[property="og:url"]').attr("content") || "").replace(WAYBACK_RE, ""),
    metaTitle: $("title").first().text().trim(),
    metaDescription: $('meta[name="description"]').attr("content") || "",
    published: $('meta[property="article:published_time"]').attr("content") || "",
    modified: $('meta[property="article:modified_time"]').attr("content") || "",
    categories: $('a[rel~="category"], a[rel~="tag"]')
      .map((_, a) => textOf($, a))
      .get(),
  };

  fs.writeFileSync(path.join(OUT, `${outName}.json`), JSON.stringify({ meta, blocks }, null, 1));
  console.log(`${outName}: ${blocks.length} blocks`);
}

for (const dir of ["pages", "posts"]) {
  for (const f of fs.readdirSync(path.join(ARCHIVE, dir))) {
    if (!f.endsWith(".html")) continue;
    const outName = (dir === "posts" ? "post__" : "") + f.replace(/\.html$/, "");
    extract(path.join(ARCHIVE, dir, f), outName);
  }
}
