import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import tailwindcss from '@tailwindcss/vite';

import path from 'path';

export default defineConfig({
  base: '/leafer-htmltext-edit-website/',
  plugins: [vue(), vueJsx(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@content': path.resolve(__dirname, 'src/content'),
      vue: 'vue/dist/vue.esm-bundler.js'
    }
  }
});
