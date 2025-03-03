/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    APP_NAME: process.env.APP_NAME,
    USER_API: process.env.USER_API,
    OFFER_API: process.env.OFFER_API,
    CHAT_API: process.env.CHAT_API,
    CRYPTOCURRENCY_API: process.env.CRYPTOCURRENCY_API,
    FIAT_API: process.env.FIAT_API,
    TRADE_API: process.env.TRADE_API,
  },
};

module.exports = nextConfig;
