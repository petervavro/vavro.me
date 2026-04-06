<script setup>
const { $gsap } = useNuxtApp()
import TECHNOLOGIES from '~/assets/data/technologies.json'
import ITEMS from '~/assets/data/projects.json'

const selectedProjectId = ref(false)

const projectData = computed(() => {
  const project = ITEMS.find(({ id }) => id === selectedProjectId.value)

  return {
    ...project,
    technologies: TECHNOLOGIES.filter(({ id }) =>
      project.technologies.split(',').includes(id)
    )
  }
})

const animationIndex = ref(0)

const liveStatusClass = (status) => ({
  'bg-emerald-400 shadow-[0_0_6px_1px] shadow-emerald-400/60': status === 'live',
  'bg-sky-400 shadow-[0_0_6px_1px] shadow-sky-400/60': status === 'opensource',
  'bg-amber-400 shadow-[0_0_6px_1px] shadow-amber-400/60': status === 'private',
  'bg-neutral-light/30': status === 'archived',
})

onMounted(() => {
  $gsap.timeline({
    repeat: 0,
    scrollTrigger: {
      trigger: '#projects',
      start: 'top 60%',
      toggleActions: 'play none none none'
    }
  }).fromTo(
    '.grid-box',
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: 'power3.out',
      stagger: { amount: 1.0, from: 'start' },
    }
  )

  setInterval(() => {
    animationIndex.value = Math.floor(Math.random() * ITEMS.length)
  }, 2000)
})
</script>

<template>
  <div>
    <modal :show="!!selectedProjectId" @close="selectedProjectId = false" modalContentClass="bg-neutral text-secondary"
      buttonClass="text-white/50 hover:text-white hover:bg-neutral-light border-white/50">
      <article class="box mx-auto max-w-4xl md:p-10 pt-5">
        <div class="p-10">
          <h3 class="text-2xl pb-5">{{ projectData.title }}</h3>
          <section class="pb-5">
            <h4 class="pb-1">WHAT IT SOLVES</h4>
            <p class="pb-1 text-tertiary">{{ projectData.productSolves }}</p>
            <a v-if="projectData.url" :href="projectData.url" target="_blank" class="text-ellipsis overflow-hidden underline">
              Go to the project.
            </a>
          </section>
          <section class="pb-5" v-if="projectData.contribution">
            <h4 class="pb-1">MY CONTRIBUTION</h4>
            <p v-if="projectData.role" class="pb-1 text-secondary font-medium">{{ projectData.role }}</p>
            <p class="pb-2 text-tertiary">{{ projectData.contribution }}</p>
            <p class="text-tertiary">
              <span v-if="projectData.BE">Back-end</span>
              <span v-if="projectData.BE && projectData.FE">&nbsp;&&nbsp;</span>
              <span v-if="projectData.FE">Front-end</span>
              <span v-if="projectData.BE || projectData.FE">&nbsp;development.</span>
            </p>
          </section>
          <section class="pb-5" v-if="projectData.scale">
            <h4 class="pb-1">SCALE</h4>
            <p class="text-tertiary">{{ projectData.scale }}</p>
          </section>
          <section class="pb-5 flex flex-wrap">
            <the-thumbnail v-for="t in projectData.technologies" :key="t.id" :id="t.id" :title="t.title"
              :thumbnailImage="t.thumbnailImage" class="p-3" thumbnailClasses="border-white/10" />
          </section>
        </div>
      </article>
    </modal>
    <div id="projects">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <button v-for="(item, index) in ITEMS" :key="item.id" :id="item.id" :data-index="index"
          @click="selectedProjectId = item.id"
          class="grid-box group relative text-left text-primary hover:text-secondary flex flex-col gap-4 p-5 border border-neutral-light/10 hover:border-neutral-light/25 hover:bg-neutral-light/5 transition-all duration-300 overflow-hidden">

          <!-- top accent line -->
          <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/0 to-transparent group-hover:via-secondary/50 transition-all duration-500" />

          <!-- live status dot -->
          <div class="absolute top-4 right-4">
            <span :class="liveStatusClass(item.liveStatus)" class="w-2 h-2 rounded-full block" />
          </div>

          <!-- icon + title + role -->
          <div class="flex items-center gap-3 pr-5">
            <div :class="[
              item.id,
              'flex shrink-0 items-center justify-center w-12 h-12 p-2 overflow-hidden rounded-full group-hover:rounded-lg border border-neutral-light/20 group-hover:border-secondary group-hover:rotate-[360deg] transition-all duration-700 ease-out bg-white saturate-150',
              animationIndex === index ? 'rotate-[360deg]' : ''
            ]">
              <NuxtImg :src="`img/${item.backgroundImage}`" loading="lazy" :alt="`Project ${item.title}`" width="48" class="saturate-150" />
            </div>
            <div class="min-w-0">
              <div class="font-semibold text-sm truncate">{{ item.title }}</div>
              <div v-if="item.role" class="text-xs text-secondary/60 truncate mt-0.5">{{ item.role }}</div>
            </div>
          </div>

          <!-- contribution -->
          <p class="text-tertiary text-sm leading-relaxed grow">{{ item.contribution }}</p>

          <!-- footer -->
          <div class="flex items-center justify-between border-t border-dotted border-neutral-light/15 pt-3">
            <span class="text-xs text-neutral-light/40 group-hover:text-secondary transition-colors duration-300">View details →</span>
            <span class="text-xs text-neutral-light/25 capitalize tracking-wide">{{ item.liveStatus }}</span>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box {
  --border-angle: 0turn;
  background-image: conic-gradient(from var(--border-angle) at -2% -2%,
      transparent 20%,
      theme('colors.neutral.light'),
      theme('colors.neutral.DEFAULT'));
  background-repeat: no-repeat;
  background-position: center center;
  animation: bg-spin 6s linear infinite;
}

@keyframes bg-spin {
  to {
    --border-angle: 1turn;
  }
}

@property --border-angle {
  syntax: '<angle>';
  inherits: true;
  initial-value: 0turn;
}

.vavromeV3,
.vavromeV2 {
  background-color: #1c2127;
}

.terminal {
  background-color: #00b0ff;
  @apply p-0;
}

.duenio img {
  @apply scale-[3];
}

.yovoca,
.daysalive,
.galeriaremix,
.epsa,
.inmovis,
.icl,
.justmassage {
  @apply p-0;
}
</style>
