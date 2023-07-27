/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,

  // emotion 설정
  compiler: {
    emotion: true,
  },
  images: {
    domains: ['picsum.photos', 'raw.githubusercontent.com', 'cdn.shopify.com'],
  },
};

module.exports = nextConfig;
