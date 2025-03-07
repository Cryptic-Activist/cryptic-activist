/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		APP_NAME: process.env.APP_NAME,
		BACKEND: process.env.BACKEND
	}
};

module.exports = nextConfig;
