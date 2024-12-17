// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-svgo",
    "nuxt-gtag",
    "@nuxt/image",
  ],
  gtag: {
    enabled: process.env.NODE_ENV === "production",
    id: "G-6Z1S75YS32",
  },
  tailwindcss: {
    // Options
  },
});