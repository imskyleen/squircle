import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/squircle-generator.ts'],
  format: ['esm', 'cjs'],
  globalName: 'Squircle',
  dts: true,
  outDir: 'dist',
  splitting: false,
  minify: true,
  sourcemap: false,
});
