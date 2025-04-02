export const NODE_ENV = process.env.NODE_ENV as string;
export const IS_DEVELOPMENT = NODE_ENV === 'development';

export const APP_NAME = IS_DEVELOPMENT
  ? (process.env.APP_NAME as string)
  : (process.env.NEXT_PUBLIC_FRONTEND_PUBLIC as string);
export const BACKEND = IS_DEVELOPMENT
  ? (process.env.BACKEND as string)
  : (process.env.NEXT_PUBLIC_BACKEND as string);

console.log({ BACKENDED: process.env.BACKEND });
