// import { defineNuxtConfig } from 'nuxt'
import svgLoader from 'vite-svg-loader'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        {
          name: 'description',
          content:
            'Peter Vavro is a Full-Stack Engineer, in to programming since 1994, specialized in web&mobile technologies.'
        },
        {
          name: 'keywords',
          content:
            'Peter,Vavro,full-stack,developer,engineer,computer programmer,programmer,back-end,front-end,,backend,frontend,programming,personal,website,presentation, technologies,history,scrum master'
        },
        { name: 'author', content: 'Peter Vavro' },
        { name: 'copyright', content: 'Peter Vavro' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: ''
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto+Mono&family=Staatliches&display=swap',
          crossorigin: ''
        }
      ]
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxt/image-edge',
    'nuxt-svgo'
  ]
})
