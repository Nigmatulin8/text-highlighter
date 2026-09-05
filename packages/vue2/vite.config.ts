import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      entryRoot: 'src',
      outDirs: 'dist',
      insertTypesEntry: true,
      include: ['src/**/*.ts'],
    }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: [
        'vue',
        '@nigmatulin8/text-highlighter-core',
      ],
    },
  },
});
