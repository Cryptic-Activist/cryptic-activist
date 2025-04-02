import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  env: {
    APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    BACKEND: process.env.NEXT_PUBLIC_BACKEND,
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
