export const NODE_ENV = process.env.NODE_ENV as string;
export const PORT = parseInt(process.env.PORT as string);
export const APP_NAME = process.env.APP_NAME_BACKEND as string;

export const MONGODB_URL = process.env.MONGODB_URL as string;
export const REDIS_HOST = process.env.REDIS_HOST as string;
export const REDIS_PORT = parseInt(process.env.REDIS_PORT as string);

export const JWT_SECRET = process.env.JWT_SECRET as string;
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

export const MAIN_API = process.env.MAIN_API as string;
export const MAIN_DOMAIN = process.env.MAIN_DOMAIN as string;
export const USER_API = process.env.USER_API as string;
export const OFFER_API = process.env.OFFER_API as string;
export const CHAT_API = process.env.CHAT_API as string;
export const CRYPTOCURRENCY_API = process.env.CRYPTOCURRENCY_API as string;
export const FIAT_API = process.env.FIAT_API as string;
export const TRADE_API = process.env.TRADE_API as string;
export const NEW_CRYPTIC_ACTIVIST_CATALOG = process.env
  .NEW_CRYPTIC_ACTIVIST_CATALOG as string;
export const WEB3_ETHEREUM_HTTP_PROVIDER = process.env
  .WEB3_ETHEREUM_HTTP_PROVIDER as string;
export const CRYPTIC_ACTIVIST_CATALOG = process.env
  .CRYPTIC_ACTIVIST_CATALOG as string;
export const ADMIN_CRYPTIC_ACTIVIST_CATALOG = process.env
  .ADMIN_CRYPTIC_ACTIVIST_CATALOG as string;
export const BACKEND = process.env.BACKEND as string;

export const FRONTEND_ADMIN = process.env.FRONTEND_ADMIN as string;
export const FRONTEND_PUBLIC = process.env.FRONTEND_PUBLIC as string;
export const DEFAULT_PREMIUM_DISCOUNT = parseFloat(
  process.env.DEFAULT_PREMIUM_DISCOUNT as string,
);

// Escrow Contract
export const ETHEREUM_NETWORK_URL = process.env.ETHEREUM_NETWORK_URL as string;
export const ETHEREUM_ESCROW_CONTRACT_ADDRESS = process.env
  .ETHEREUM_ESCROW_CONTRACT_ADDRESS as `0x${string}`;
export const ETHEREUM_ESCROW_ARBITRATOR_ADDRESS = process.env
  .ETHEREUM_ESCROW_ARBITRATOR_ADDRESS as `0x${string}`;
export const ETHEREUM_DEPLOYER_PRIVATE_KEY = process.env
  .ETHEREUM_DEPLOYER_PRIVATE_KEY as `0${string}`;

// Premium Subscription Contract
export const ETHEREUM_PREMIUM_CONTRACT_ADDRESS = process.env
  .ETHEREUM_PREMIUM_CONTRACT_ADDRESS as `0x${string}`;
export const ETHEREUM_PREMIUM_ARBITRATOR_ADDRESS = process.env
  .ETHEREUM_PREMIUM_ARBITRATOR_ADDRESS as `0x${string}`;

export const ALTCHA_HMAC_SECRET_KEY = process.env
  .ALTCHA_HMAC_SECRET_KEY as string;

export const MAILTRAP_TOKEN = process.env.MAILTRAP_TOKEN as string;
export const MAILTRAP_TESTINBOX_ID = parseInt(
  process.env.MAILTRAP_TESTINBOX_ID as string,
);
export const MAILTRAP_SEND_EMAIL_API = process.env
  .MAILTRAP_SEND_EMAIL_API as string;

export const SUPER_ADMIN_EMAIL = process.env.ADMIN_EMAIL as string;
export const SUPER_ADMIN_PASSWORD = process.env.SUPER_ADMIN_PASSWORD as string;

export const SETTINGS_CACHE_TTL_SECONDS = parseInt(
  process.env.SETTINGS_CACHE_TTL_SECONDS as string,
);

export const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY as string;
