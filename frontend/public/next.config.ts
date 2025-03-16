import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    APP_NAME: process.env.APP_NAME,
    BACKEND: process.env.BACKEND,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'coin-images.coingecko.com',
      },
    ],
  },
};

export default nextConfig;
