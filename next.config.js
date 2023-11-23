const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: { esmExternals: true, scrollRestoration: true },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "coventiassets.blob.core.windows.net",
      },
    ],

    pwa: {
      dest: "public",
      register: true,
      skipwaiting: true,
      runtimeCaching,
      disable: process.env.NODE_ENV === "development",
      // sw: "/sw.js",
    },
    // buildExcludes: [/middleware-manifest.json$/],
  },
};

module.exports = withPWA(nextConfig);
