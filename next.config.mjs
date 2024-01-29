import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  cacheStartUrl: false,
});

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withPWA(nextConfig);
