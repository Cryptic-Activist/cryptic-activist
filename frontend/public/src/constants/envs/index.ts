export const APP_NAME = process.env
  .NEXT_PUBLIC_APP_NAME_FRONTEND_PUBLIC as string;
export const APP_URL = process.env.NEXT_PUBLIC_FRONTEND_PUBLIC as string;
export const BACKEND = process.env.NEXT_PUBLIC_BACKEND as string;
export const NODE_ENV = process.env.NODE_ENV as string;

export const IS_DEVELOPMENT = NODE_ENV === 'development';
export const IS_PRODUCTION = NODE_ENV === 'production';
export const GA_ID = process.env.GA_ID as string;

// Escrow Contract
export const ETHEREUM_NETWORK_URL = process.env
  .NEXT_PUBLIC_ETHEREUM_NETWORK_URL as string;
export const ETHEREUM_ESCROW_CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_ETHEREUM_ESCROW_CONTRACT_ADDRESS as `0x${string}`;
export const ETHEREUM_ESCROW_ARBITRATOR_ADDRESS = process.env
  .NEXT_PUBLIC_ETHEREUM_ESCROW_ARBITRATOR_ADDRESS as `0x${string}`;

// Premium Subscription Contract
export const ETHEREUM_PREMIUM_CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_ETHEREUM_PREMIUM_CONTRACT_ADDRESS as `0x${string}`;
export const ETHEREUM_PREMIUM_ARBITRATOR_ADDRESS = process.env
  .NEXT_PUBLIC_ETHEREUM_PREMIUM_ARBITRATOR_ADDRESS as `0x${string}`;
