export const NODE_ENV = process.env.NODE_ENV as string;
export const PORT = parseInt(process.env.PORT as string);
export const APP_NAME = process.env.APP_NAME as string;

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

export const ETHEREUM_NETWORK_URL = process.env.ETHEREUM_NETWORK_URL as string;
export const ETHEREUM_ESCROW_CONTRACT_ADDRESS = process.env
  .ETHEREUM_ESCROW_CONTRACT_ADDRESS as `0x${string}`;
export const ETHEREUM_ESCROW_ADDRESS = process.env
  .ETHEREUM_ESCROW_ADDRESS as `0x${string}`;
export const ETHEREUM_ESCROW_PRIVATE_KEY = process.env
  .ETHEREUM_ESCROW_PRIVATE_KEY as `0x${string}`;
export const ETHEREUM_ESCROW_ARBITRATOR_ADDRESS = process.env
  .ETHEREUM_ESCROW_ARBITRATOR_ADDRESS as `0x${string}`;

export const ETHEREUM_DEPLOYER_ADDRESS = process.env
  .ETHEREUM_DEPLOYER_ADDRESS as `0x${string}`;
export const ETHEREUM_DEPLOYER_PRIVATE_KEY = process.env
  .ETHEREUM_DEPLOYER_PRIVATE_KEY as `0${string}`;
