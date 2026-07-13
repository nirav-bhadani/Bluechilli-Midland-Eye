import fs from "node:fs";
const name = process.argv[2];
const from = Number(process.argv[3] || 0);
const to = Number(process.argv[4] || 9999);
const j = JSON.parse(fs.readFileSync(`../content-archive/extracted/${name}.json`, "utf8"));
j.blocks.slice(from, to).forEach((b, i) => {
  const body =
    b.text ||
    b.html ||
    (b.items
      ? Array.isArray(b.items) && typeof b.items[0] === "object"
        ? b.items.map((x) => x.q).join(" | ")
        : b.items.join(" • ")
      : b.src || b.text || "");
  console.log(
    from + i,
    b.t.padEnd(9),
    String(body)
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .slice(0, 110)
  );
});
