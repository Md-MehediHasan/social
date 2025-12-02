/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // ✅ allows TS errors to pass
  },
  // eslint removed, configure ESLint separately
};

module.exports = nextConfig;
