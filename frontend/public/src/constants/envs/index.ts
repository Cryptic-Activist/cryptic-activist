export const NODE_ENV = process.env.NODE_ENV as string;
export const IS_DEVELOPMENT = NODE_ENV === 'development';

export const APP_NAME = process.env.APP_NAME as string;
export const BACKEND = process.env.BACKEND as string;

console.log({ BACKENDED: process.env.BACKEND });
