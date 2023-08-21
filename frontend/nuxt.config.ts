// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@invictus.codes/nuxt-vuetify'],
  devtools: { enabled: true },
  ssr: false,
  typescript: {
    strict: true,
  },
});
