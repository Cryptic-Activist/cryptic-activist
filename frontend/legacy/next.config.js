/** @type {import('next').NextConfig} */

module.exports = {
	env: {
		MAIN_API: process.env.MAIN_API,
		MAIN_DOMAIN: process.env.MAIN_DOMAIN,
		USER_API: process.env.USER_API,
		OFFER_API: process.env.OFFER_API,
		CHAT_API: process.env.CHAT_API,
		CRYPTOCURRENCY_API: process.env.CRYPTOCURRENCY_API,
		FIAT_API: process.env.FIAT_API,
		TRADE_API: process.env.TRADE_API,
		WEB3_ETHEREUM_HTTP_PROVIDER: process.env.WEB3_ETHEREUM_HTTP_PROVIDER,
	},
	reactStrictMode: true,
	swcMinify: true,
	experimental: {
		appDir: true,
	},
};
