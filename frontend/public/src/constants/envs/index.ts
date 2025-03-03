export const APP_NAME = process.env.APP_NAME as string;
export const CRYPTOCURRENCY_API = process.env.CRYPTOCURRENCY_API as string;
export const USER_API = process.env.USER_API as string;
export const OFFER_API = process.env.OFFER_API as string;
export const CHAT_API = process.env.CHAT_API as string;
export const FIAT_API = process.env.FIAT_API as string;
export const TRADE_API = process.env.TRADE_API as string;
export const NODE_ENV = process.env.NODE_ENV as string;

export const IS_DEVELOPMENT = NODE_ENV === 'development';
