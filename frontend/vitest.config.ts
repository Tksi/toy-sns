/// <reference types="vitest" />
import path from 'node:path';
import { defineVitestConfig } from 'nuxt-vitest/config';
import vuetify from 'vite-plugin-vuetify';

export default defineVitestConfig({
  plugins: [vuetify()],
  test: {
    environment: 'nuxt',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
