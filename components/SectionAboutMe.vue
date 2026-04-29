<script setup lang="ts">
const { $gsap } = useNuxtApp()
import JSON_DATA from '~/assets/data/technologies.json'
import type { Technology } from '~/types';

const getExperience = (technologyId: string): { title: string; since: number } => {
  const t = JSON_DATA.find(({ id }) => id === technologyId) as Technology | undefined
  return { title: t?.title ?? technologyId, since: t?.year ?? 0 }
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

    <h2 class="pb-5 text-2xl md:text-2xl uppercase text-primary">About Me</h2>

    <div class="flex flex-col lg:flex-row gap-6">

      <section id="me" class="bio lg:w-1/2">
        <p class="lead">
          Full-Stack Engineer with a passion for programming since 1994.
        </p>
        <p>
          My focus today is building accessible digital experiences in
          JavaScript&nbsp;/&nbsp;TypeScript - equally adept at front-end and back-end.
        </p>
        <div class="stats">
          <p class="stats-label">Long-term familiarity</p>
          <div v-for="id in ['javascript', 'typescript', 'nodejs', 'react', 'vuejs', 'angularjs']" :key="id"
            class="stat">
            <span class="stat-tech">{{ getExperience(id).title }}</span>
            <div class="stat-count">
              <span class="stat-eyebrow">since</span>
              <span class="stat-value">{{ getExperience(id).since }}</span>
            </div>
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
    @apply text-sm text-neutral-light leading-relaxed;
  }
}

.stats {
  @apply grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2;

  .stats-label {
    @apply col-span-2 sm:col-span-3 text-xs uppercase tracking-widest text-white/30 -mb-1;
  }

  .stat {
    @apply relative border border-primary/10 p-4 flex flex-col gap-0.5 bg-neutral/60 overflow-hidden text-wrap;

    &::before {
      content: '';
      @apply absolute top-0 left-0 right-0 h-px bg-secondary/40;
    }

    .stat-tech {
      @apply text-sm font-bold text-secondary leading-tight;
    }

    .stat-count {
      @apply flex flex-col;

      .stat-eyebrow {
        @apply text-xs text-white/30;
      }

      .stat-value {
        @apply text-2xl font-bold text-primary;
      }
    }
  }
}
</style>
