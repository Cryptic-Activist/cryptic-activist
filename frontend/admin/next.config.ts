import type { NextConfig } from 'next';
import { RemotePattern } from 'next/dist/shared/lib/image-config';

const IS_DEV = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
	output: 'standalone',
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'coin-images.coingecko.com'
			} as RemotePattern,
			...(IS_DEV
				? [
						{
							protocol: 'http',
							hostname: 'localhost',
							port: '5000',
							pathname: '/uploads/**'
						} as RemotePattern
				  ]
				: [])
		]
	}
};

module.exports = nextConfig;
