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

onMounted(() => {
  $gsap.timeline({
    repeat: 0,
    repeatDelay: 0.5,
    scrollTrigger: {
      trigger: '#projects',
      start: 'top 50%',
      end: '+=100',
      toggleActions: 'play none none none'
    }
  }).fromTo(
    '.grid-box',
    {
      scale: 0.5,
      opacity: 0,
      rotateY: 180,
    },
    {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      duration: 0.5,
      ease: 'power1.inOut',
      stagger: {
        amount: 4.4,
      },
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
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-light/10">
        <button v-for="(item, index) in ITEMS" :key="item.id" :id="item.id" :data-index="index"
          @click="selectedProjectId = item.id" :class="[
            'grid-box group text-left text-primary hover:text-secondary bg-neutral hover:bg-neutral-light/5 p-5 flex flex-col gap-4 transition-colors duration-300'
          ]">
          <div class="flex items-center gap-3">
            <div :class="[
              item.id,
              'flex shrink-0 items-center w-12 h-12 p-2 overflow-hidden rounded-50p group-hover:rounded-none border-primary border group-hover:border-secondary group-hover:rotate-[360deg] transition-all duration-700 ease-out bg-white bg-cover bg-no-repeat bg-center saturate-150',
              animationIndex === index ? 'rotate-[360deg]' : ''
            ]">
              <NuxtImg :src="`img/${item.backgroundImage}`" loading="lazy" :alt="`Project ${item.title}`" width="48"
                class="saturate-150" />
            </div>
            <div class="font-medium text-sm leading-snug text-ellipsis overflow-hidden">
              {{ item.title }}
            </div>
          </div>
          <p v-if="item.role" class="text-xs font-medium text-secondary/90">{{ item.role }}</p>
          <p class="text-tertiary text-sm leading-relaxed grow">
            {{ item.contribution }}
          </p>
          <div class="text-xs text-neutral-light/50 group-hover:text-secondary border-t border-dotted border-neutral-light/20 pt-3 transition-colors duration-300">
            View details →
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
