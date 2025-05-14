import type { NextConfig } from 'next';
import { withSentryConfig } from '@sentry/nextjs';

const nextConfig: NextConfig = {
  output: 'standalone',
  turbopack: {
    resolveAlias: {
      underscore: 'lodash',
    },
    resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.json'],
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

const sentryWebpackPluginOptions = {
  org: 'cryptic-activist',
  project: 'cryptic-activist-frontend',
  silent: process.env.CI === 'true',
  dryRun: process.env.CI === 'true',
  widenClientFileUpload: true,
  disableLogger: true,
  automaticVercelMonitors: true,
  // tunnelRoute: "/monitoring", // optional
};

export default withSentryConfig(nextConfig, sentryWebpackPluginOptions);
