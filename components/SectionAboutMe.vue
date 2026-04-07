<script setup lang="ts">
const { $gsap } = useNuxtApp()
import JSON_DATA from '~/assets/data/technologies.json'
import type { Technology } from '~/types';

const getExperienceYears = (technologyId: string): number => {
  const t = JSON_DATA.find(({ id }) => id === technologyId) as Technology | undefined
  return t ? new Date().getFullYear() - t.year : 0
}

onMounted(() => {
  let mm = $gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {
    $gsap.set('#me', { opacity: 0 })

    $gsap.timeline({
      scrollTrigger: {
        trigger: '#me',
        start: 'top 80%',
        end: '+=100',
        toggleActions: 'play none none none'
      },
    }).fromTo('#me', { x: `-24rem`, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3 })

    $gsap.timeline({
      scrollTrigger: {
        trigger: '#detail',
        start: '-=40 80%',
        end: '+=100',
        toggleActions: 'play none none none'
      }
    }).fromTo('#detail', { x: `24rem`, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3 })
  });
})
</script>

<template>
  <div class="container mx-auto lg:max-w-4xl px-10">

    <h2 class="pb-5 text-2xl md:text-2xl uppercase text-tertiary/50">About Me</h2>

    <div class="flex flex-col lg:flex-row gap-6">

      <section id="me" class="bio lg:w-1/2">
        <p class="lead">
          Full-Stack Engineer with a passion for programming since 1994.
        </p>
        <p>
          My focus today is building accessible digital experiences in
          JavaScript&nbsp;/&nbsp;TypeScript — equally adept at front-end and back-end.
        </p>
        <div class="stats">
          <div class="stat">
            <span class="stat-value">{{ getExperienceYears('javascript') }}+</span>
            <span class="stat-label">years JS</span>
          </div>
          <div class="stat">
            <span class="stat-value">{{ getExperienceYears('react') }}+</span>
            <span class="stat-label">years React</span>
          </div>
          <div class="stat">
            <span class="stat-value">{{ getExperienceYears('vuejs') }}+</span>
            <span class="stat-label">years Vue</span>
          </div>
          <div class="stat">
            <span class="stat-value">{{ getExperienceYears('nodejs') }}+</span>
            <span class="stat-label">years Node</span>
          </div>
        </div>
      </section>

      <section id="detail" class="lg:w-1/2 border border-primary/10 p-6 bg-neutral/40">
        <ExperienceDetail />
      </section>

    </div>
  </div>
</template>

<style scoped lang="scss">
.bio {
  @apply border border-secondary/20 p-6 bg-neutral/40 flex flex-col gap-4;

  .lead {
    @apply text-lg font-semibold text-secondary leading-snug;
  }

  p {
    @apply text-sm text-white/60 leading-relaxed;
  }
}

.stats {
  @apply grid grid-cols-2 gap-3 mt-2;

  .stat {
    @apply border border-primary/10 p-3 flex flex-col bg-neutral/60;

    .stat-value {
      @apply text-2xl font-bold text-primary;
    }

    .stat-label {
      @apply text-xs text-white/40 mt-1;
    }
  }
}
</style>
