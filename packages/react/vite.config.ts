import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
    entryRoot: 'src',
    outDirs: 'dist',
    insertTypesEntry: true,
    include: [
      'src/index.ts',
      'src/TextHighlighter.tsx',
    ],
    })
  ],

  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'index',
    },

    rollupOptions: {
      external: [
        'react',
        'react/jsx-runtime',
        '@nigmatulin8/text-highlighter-core',
      ],
    },
  },
});
