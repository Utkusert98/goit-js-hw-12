import { defineConfig } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => ({
  base: '/goit-js-hw-12/',
  root: 'src',   // <--- burayı ekledik, root klasörü src oldu
  build: {
    sourcemap: true,
    rollupOptions: {
      input: 'src/index.html',  // <--- src içindeki index.html'i belirt
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        entryFileNames(chunkInfo) {
          if (chunkInfo.name === 'commonHelpers') {
            return 'commonHelpers.js';
          }
          return '[name].js';
        },
        assetFileNames(assetInfo) {
          if (assetInfo.name && assetInfo.name.endsWith('.html')) {
            return '[name].[ext]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    outDir: '../dist',  // src dışına build klasörü oluştur
    emptyOutDir: true,
  },
  plugins: [
    injectHTML(),
    FullReload(['./src/**/*.html']),
    SortCss({
      sort: 'mobile-first',
    }),
  ],
}));
