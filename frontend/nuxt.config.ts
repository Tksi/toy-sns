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
  app: {
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐤</text></svg>',
        },
      ],
    },
  },
});
