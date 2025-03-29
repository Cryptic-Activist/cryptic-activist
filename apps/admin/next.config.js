/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
	env: {
		APP_NAME: process.env.APP_NAME,
		BACKEND: process.env.BACKEND
	}
};

module.exports = nextConfig;
