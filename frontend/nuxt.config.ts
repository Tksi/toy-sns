// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@invictus.codes/nuxt-vuetify', 'nuxt-vitest'],
  devtools: { enabled: true },
  ssr: false,
  typescript: {
    strict: true,
  },
  runtimeConfig: {
    public: {
      api: 'http://localhost:4000',
    },
  },
});
