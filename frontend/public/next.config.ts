import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  env: {
    APP_NAME: process.env.APP_NAME,
    BACKEND: process.env.BACKEND,
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
