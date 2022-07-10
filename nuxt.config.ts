import { defineNuxtConfig } from 'nuxt'
import svgLoader from 'vite-svg-loader'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  meta: {
    title: 'vavro.me'
    // charset: 'utf-8'
  },
  head: {
    title: 'vavro.me',
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: true
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;500;700&family=Varela+Round&display=swap'
      }
    ]
  },
  modules: ['@nuxtjs/tailwindcss'],
  vite: {
    plugins: [svgLoader()]
  }
})
