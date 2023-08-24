// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@invictus.codes/nuxt-vuetify',
    'nuxt-vitest',
    '@nuxtjs/google-fonts',
  ],
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
  googleFonts: {
    families: {
      'Noto Sans JP': true,
    },
  },
});
