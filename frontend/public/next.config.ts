import type { NextConfig } from 'next';

export const NODE_ENV = process.env.NODE_ENV as string;
export const IS_DEVELOPMENT = NODE_ENV === 'development';

console.log({ ENV: process.env });

const nextConfig: NextConfig = {
  output: 'standalone',
  env: {
    APP_NAME: IS_DEVELOPMENT
      ? process.env.APP_NAME
      : process.env.NEXT_PUBLIC_APP_NAME,
    BACKEND: IS_DEVELOPMENT
      ? process.env.BACKEND
      : process.env.NEXT_PUBLIC_BACKEND,
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
