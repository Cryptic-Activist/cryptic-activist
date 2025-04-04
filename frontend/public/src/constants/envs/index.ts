export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME as string;
export const BACKEND = process.env.NEXT_PUBLIC_BACKEND as string;
export const NODE_ENV = process.env.NODE_ENV as string;

export const IS_DEVELOPMENT = NODE_ENV === 'development';
