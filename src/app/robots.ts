import type { MetadataRoute } from "next";
import { clinic } from "@/content/global";

/**
 * STAGING: all crawlers disallowed until client sign-off.
 * TODO(go-live): switch to allow-all (+ AI crawlers per home.md B7) — see
 * project memory "post-launch todos".
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", disallow: "/" }],
    sitemap: `${clinic.url}/sitemap.xml`,
  };
}
