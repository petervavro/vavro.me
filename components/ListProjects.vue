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
    { y: 20, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
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
      <article class="box mx-auto max-w-4xl">

        <!-- header -->
        <div class="flex items-center gap-5 p-8 pb-6 border-b border-white/10">
          <div :class="[
            projectData.id,
            'flex shrink-0 items-center justify-center w-16 h-16 p-2 rounded-xl bg-white saturate-150 shadow-lg'
          ]">
            <NuxtImg :src="`img/${projectData.backgroundImage}`" :alt="projectData.title" width="64" class="saturate-150" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-3 flex-wrap">
              <h3 class="text-2xl font-semibold">{{ projectData.title }}</h3>
              <span :class="liveStatusClass(projectData.liveStatus)" class="w-2 h-2 rounded-full shrink-0 mt-1" />
              <span class="text-xs text-neutral-light/40 capitalize">{{ projectData.liveStatus }}</span>
            </div>
            <p v-if="projectData.role" class="text-sm text-secondary/60 mt-1">{{ projectData.role }}</p>
            <a v-if="projectData.url" :href="projectData.url" target="_blank"
              class="sm:hidden inline-flex items-center gap-2 text-xs border border-white/20 hover:border-secondary hover:text-secondary px-3 py-1.5 mt-2 transition-all duration-200">
              Visit project →
            </a>
          </div>
          <a v-if="projectData.url" :href="projectData.url" target="_blank"
            class="hidden sm:flex shrink-0 items-center gap-2 text-xs border border-white/20 hover:border-secondary hover:text-secondary px-4 py-2 transition-all duration-200">
            Visit project →
          </a>
        </div>

        <!-- body -->
        <div class="p-8 flex flex-col gap-7">

          <section>
            <h4 class="text-xs tracking-widest text-white/60 mb-3 uppercase">What it solves</h4>
            <p class="text-tertiary leading-relaxed border-l-2 border-secondary/30 pl-4">{{ projectData.productSolves }}</p>
          </section>

          <section v-if="projectData.contribution">
            <h4 class="text-xs tracking-widest text-white/60 mb-3 uppercase">My Contribution</h4>
            <p class="text-tertiary leading-relaxed border-l-2 border-secondary/30 pl-4">{{ projectData.contribution }}</p>
            <div class="flex gap-2 mt-3 pl-4">
              <span v-if="projectData.BE" class="text-xs border border-white/30 px-2 py-0.5 text-white/70">Back-end</span>
              <span v-if="projectData.FE" class="text-xs border border-white/30 px-2 py-0.5 text-white/70">Front-end</span>
            </div>
          </section>

          <section v-if="projectData.scale">
            <h4 class="text-xs tracking-widest text-white/60 mb-3 uppercase">Scale</h4>
            <p class="text-tertiary leading-relaxed border-l-2 border-secondary/30 pl-4">{{ projectData.scale }}</p>
          </section>

          <section v-if="projectData.technologies?.length">
            <h4 class="text-xs tracking-widest text-white/60 mb-3 uppercase">Technologies</h4>
            <div class="flex flex-wrap">
              <the-thumbnail v-for="t in projectData.technologies" :key="t.id" :id="t.id" :title="t.title"
                :thumbnailImage="t.thumbnailImage" class="p-2" thumbnailClasses="border-white/10" />
            </div>
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
