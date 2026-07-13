/** Generates favicon + app icons from the aperture ring mark (navy bg, safe padding). */
import fs from "node:fs";
import sharp from "sharp";
import pngToIco from "png-to-ico";

// Aperture ring mark: concentric arcs echoing the logo's iris — bold enough for 16px.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" fill="#002C48"/>
  <circle cx="256" cy="256" r="150" fill="none" stroke="#40BADA" stroke-width="34"/>
  <circle cx="256" cy="256" r="86" fill="none" stroke="#0088A5" stroke-width="26"/>
  <circle cx="256" cy="256" r="34" fill="#40BADA"/>
</svg>`;

const buf = Buffer.from(svg);
const out = async (size, file) => {
  await sharp(buf).resize(size, size).png().toFile(file);
  console.log("wrote", file);
};

await out(512, "src/app/icon.png");
await out(180, "src/app/apple-icon.png");
await out(512, "public/icon-512.png");
await out(192, "public/icon-192.png");

const tmp = [];
for (const s of [16, 32, 48]) {
  const f = `scripts/.tmp-${s}.png`;
  await sharp(buf).resize(s, s).png().toFile(f);
  tmp.push(f);
}
fs.writeFileSync("src/app/favicon.ico", await pngToIco(tmp));
tmp.forEach((f) => fs.unlinkSync(f));
console.log("wrote src/app/favicon.ico");

fs.writeFileSync(
  "public/site.webmanifest",
  JSON.stringify(
    {
      name: "Midland Eye",
      short_name: "Midland Eye",
      theme_color: "#002C48",
      background_color: "#002C48",
      display: "standalone",
      icons: [
        { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
    },
    null,
    2
  )
);
console.log("wrote public/site.webmanifest");
