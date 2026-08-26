import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Blocks the whole site from search engine indexing (applies to every
  // route and asset, and cannot be overridden by page-level metadata).
  // TODO(go-live): remove this headers() block when the client signs off.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive, nosnippet, noimageindex",
          },
        ],
      },
    ];
  },
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
