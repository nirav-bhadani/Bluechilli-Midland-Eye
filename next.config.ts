import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () => [
    { source: "/contact-us", destination: "/contact", permanent: true },
    {
      source: "/test-consultants-page",
      destination: "/consultants-and-specialist-page",
      permanent: true,
    },
    // Legacy WP date-based post URLs → new /blog/<slug>
    { source: "/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:slug", destination: "/blog/:slug", permanent: true },
  ],
};

export default nextConfig;
