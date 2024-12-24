<script setup lang="ts">
const { $gsap } = useNuxtApp()
import JSON_DATA from '~/assets/data/technologies.json'
import type { Technology } from '~/types';

const getExperienceYears = (technologyId: string): number => {
  const t = JSON_DATA.find(({ id }) => id === technologyId) as Technology | undefined
  return t ? new Date().getFullYear() - t.year : 0
}

onMounted(() => {

  $gsap.set('#me', { opacity: 0 })

  $gsap.timeline({
    scrollTrigger: {
      trigger: '#me',
      start: 'top 80%',
      end: '+=100',
      toggleActions: 'play none none none'
    }
  }).fromTo(
    '#me',
    {
      x: -300,
      opacity: 0
    },
    {
      x: 0,
      opacity: 1,
    })

  $gsap.timeline({
    scrollTrigger: {
      trigger: '#detail',
      start: '-=40 80%',
      end: '+=100',
      toggleActions: 'play none none none',
    }
  }).fromTo(
    '#detail',
    {
      x: 300,
      y: -50,
      opacity: 0
    },
    {
      x: 50,
      opacity: 1,
    })
})
</script>

<template>
  <div class="container mx-auto lg:max-w-4xl">
    <section id="me"
      class="transition-all duration-500 ease-out p-10 pb-20 max-w-xl bg-secondary/90 drop-shadow-custom">
      <h2 class="pb-5 text-2xl uppercase">Get to Know Me</h2>
      <p>
        <strong>I am a seasoned Full-Stack Engineer with a passion for programming
          that dates back to 1994.</strong>
        My focus today is on creating accessible digital experiences using
        JavaScript/Typescript. Having worked with JS for over
        {{ getExperienceYears('javascript') }} years, I am equally adept at
        front-end and back-end development. My extensive experience in
        front-end web and mobile development includes React ({{
          getExperienceYears('react')
        }}+ years), React Native, Vue.js ({{ getExperienceYears('vuejs') }}+
        years), AngularJS, as well as several other exciting frameworks and
        libraries. Additionally, I have over
        {{ getExperienceYears('nodejs') }} years of experience working with
        Node.js for back-end development, having worked with various
        frameworks and libraries.
      </p>
    </section>
    <div id="detail" class="h-[32rem] max-w-xl md:max-w-2xl lg:max-w-3xl">
      <section class="p-10 bg-neutral border-neutral-light/50 border-l border-t border-b border-dotted">
        <h3 class="pb-5 text-xl text-tertiary">My current focus is on</h3>
        <ExperienceDetail />
      </section>
    </div>
  </div>
</template>

<style scoped>
.drop-shadow-custom {
  box-shadow: 0px 0px 80px -10px theme('colors.neutral.800');
}
</style>
