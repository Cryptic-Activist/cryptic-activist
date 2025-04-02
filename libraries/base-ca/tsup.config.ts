import 'dotenv/config';

import { defineConfig } from 'tsup';

const IS_DEV = process.env.NODE_ENV === 'development';

console.log({ IS_DEV: process.env.NODE_ENV });

export default defineConfig({
  entry: ['src'],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: IS_DEV,
});
