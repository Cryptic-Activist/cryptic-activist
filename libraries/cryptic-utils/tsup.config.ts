import { defineConfig } from 'tsup';

const IS_DEV = process.env.NODE_ENV === 'development';

export default defineConfig({
  entry: ['src'],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: IS_DEV,
});
