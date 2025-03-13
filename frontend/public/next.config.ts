import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    APP_NAME: process.env.APP_NAME,
    BACKEND: process.env.BACKEND,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
