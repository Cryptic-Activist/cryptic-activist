export const APP_NAME = process.env
  .NEXT_PUBLIC_APP_NAME_FRONTEND_PUBLIC as string;
export const APP_URL = process.env.NEXT_PUBLIC_FRONTEND_PUBLIC as string;
export const BACKEND = process.env.NEXT_PUBLIC_BACKEND as string;
export const NODE_ENV = process.env.NODE_ENV as string;

export const IS_DEVELOPMENT = NODE_ENV === 'development';
export const IS_PRODUCTION = NODE_ENV === 'production';
export const GA_ID = process.env.GA_ID as string;
