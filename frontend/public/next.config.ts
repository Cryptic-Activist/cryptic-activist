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

console.log({
  org: 'cryptic-activist',
  project: 'cryptic-activist-frontend',
  silent: true,
  dryRun: true,
  widenClientFileUpload: true,
  disableLogger: true,
  automaticVercelMonitors: true,
  hideSourceMaps: true,
  // tunnelRoute: "/monitoring", // optional
});

const sentryWebpackPluginOptions = {
  org: 'cryptic-activist',
  project: 'cryptic-activist-frontend',
  silent: true,
  dryRun: true,
  widenClientFileUpload: true,
  disableLogger: true,
  automaticVercelMonitors: true,
  // tunnelRoute: "/monitoring", // optional
};

export default withSentryConfig(nextConfig, sentryWebpackPluginOptions);
