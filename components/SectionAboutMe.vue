<script setup>
import JSON_DATA from '~/assets/data/technologies.json'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const getExperienceYears = (technologyId) => {
  const t = JSON_DATA.find(({ id }) => id === technologyId)
  return t ? new Date().getFullYear() - t.year : 0
}

onMounted(() => {
  gsap.set('#me', { x: 0, opacity: 0 })
  gsap.to('#me', {
    opacity: 1,
    y: -100,
    scrollTrigger: {
      trigger: '#me',
      start: 'top 80%',
      end: '+=200',
      scrub: 0.5,
      toggleActions: 'play none none reverse'
    }
  })
})
</script>

<template>
  <div class="container mx-auto lg:max-w-4xl">
    <div ref="target">
      <section
        id="me"
        class="transition-all duration-500 ease-out p-10 pb-20 max-w-xl bg-secondary/90 drop-shadow-custom"
      >
        <h2 class="pb-5 text-2xl uppercase">Get to Know Me</h2>
        <p>
          <strong
            >I am a seasoned Full-Stack Engineer with a passion for programming
            that dates back to 1994.</strong
          >
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
    </div>
    <div ref="targetDetail" class="h-[32rem]">
      <section
        class="opacity-0 transition-all duration-500 ease-out p-10 max-w-3xl bg-neutral border-neutral-light/50 border-l border-t border-b border-dotted -translate-y-10 sm:translate-x-20 m-3 sm:m-0"
        v-display-when-in-view="0.4"
      >
        <h3 class="pb-5 text-xl text-tertiary">My current focus is on</h3>
        <ExperienceDetail />
      </section>
    </div>
  </div>
</template>

<style scoped>
.drop-shadow-custom {
  box-shadow: 0px 0px 100px 10px rgb(10 12 13);
}

.v-enter-active,
.v-leave-active {
  @apply transition-all duration-500 ease-in-out;
}

.v-enter-from,
.v-leave-to {
  @apply opacity-0 -translate-y-20;
}

.detail-enter-active,
.detail-leave-active {
  @apply sm:translate-x-20 sm:-translate-y-10 transition-all duration-500 ease-in delay-300;
}

.detail-enter-from,
.detail-leave-to {
  @apply opacity-0 translate-y-20;
}
</style>
