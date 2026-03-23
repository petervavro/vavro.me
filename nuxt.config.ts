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
  googleFonts: {
    families: {
      "Roboto+Mono": true,
      Staatliches: true,
    },
    display: "swap",
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
        class: "no-js",
      },
      script: [
        {
          type: "text/javascript",
          innerHTML: 'document.documentElement.classList.remove("no-js");',
        },
      ],
      meta: [
        {
          name: "description",
          content:
            "Peter Vavro — Full-Stack Engineer with 20+ years of experience building web & mobile products. Specialized in React, Vue, TypeScript, Node.js and AI-powered applications. Open to new opportunities.",
        },
        {
          name: "keywords",
          content:
            "Peter Vavro, full-stack engineer, frontend developer, backend developer, React, Vue, TypeScript, Node.js, GraphQL, AWS, LangChain, AI engineer, software engineer, web developer, mobile developer",
        },
        { name: "author", content: "Peter Vavro" },
        { name: "copyright", content: "Peter Vavro" },
        // Open Graph
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://www.vavro.me" },
        { property: "og:title", content: "Peter Vavro — Full-Stack Engineer" },
        {
          property: "og:description",
          content:
            "Full-Stack Engineer with 20+ years of experience. React, Vue, TypeScript, Node.js, AI-powered applications. Open to new opportunities.",
        },
        // Twitter / X
        { name: "twitter:card", content: "summary" },
        { name: "twitter:title", content: "Peter Vavro — Full-Stack Engineer" },
        {
          name: "twitter:description",
          content:
            "Full-Stack Engineer with 20+ years of experience. React, Vue, TypeScript, Node.js, AI-powered applications. Open to new opportunities.",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
});
