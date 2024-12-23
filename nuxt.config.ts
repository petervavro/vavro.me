// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  runtimeConfig: {
    encryptionKey: "",
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-svgo",
    "nuxt-gtag",
    "@nuxt/image",
    "@nuxtjs/google-fonts",
  ],
  gtag: {
    enabled: process.env.NODE_ENV === "production",
    id: "G-6Z1S75YS32",
  },
  tailwindcss: {
    // Options
  },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        {
          name: "description",
          content:
            "Peter Vavro is a Full-Stack Engineer, in to programming since 1994, specialized in web&mobile technologies.",
        },
        {
          name: "keywords",
          content:
            "Peter,Vavro,full-stack,developer,engineer,computer programmer,programmer,back-end,front-end,,backend,frontend,programming,personal,website,presentation, technologies,history,scrum master",
        },
        { name: "author", content: "Peter Vavro" },
        { name: "copyright", content: "Peter Vavro" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "favicon.ico" }],
    },
  },
  googleFonts: {
    families: {
      "Roboto+Mono": true,
      Staatliches: true,
    },
    display: "swap",
  },
});
