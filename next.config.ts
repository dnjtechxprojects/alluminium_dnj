import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't advertise the framework/version to scanners.
  poweredByHeader: false,

  images: {
    // AVIF is ~40% smaller than WebP for photos; browsers without it get WebP.
    formats: ["image/avif", "image/webp"],
    // Next 16 only allows q=75 unless listed; 90 keeps detail in large showcase photos.
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "natrajaluform.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "natrajaluform.com",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      {
        // API responses are never framable, and never cached — except the
        // image route, which sets its own long-lived cache header.
        source: "/api/((?!image/).*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Cache-Control", value: "no-store" },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/((?!\\.well-known).*)",
        has: [
          {
            type: "header",
            key: "host",
            value: "www.natrajaluform.com",
          },
        ],
        destination: "https://natrajaluform.com/:path*",
        permanent: true,
      },
      {
        source: "/product/diemanufacturing",
        destination: "/product/mouldmanufacturing",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
