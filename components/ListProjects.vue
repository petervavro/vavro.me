<script setup>
import { gsap } from 'gsap'
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

const tl = gsap.timeline({ repeat: 0, repeatDelay: 0.5 })

onMounted(() => {
  tl.fromTo(
    '.grid-box',
    {
      scale: 0.1,
      y: 60,
      opacity: 0
    },
    {
      scale: 1,
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power1.inOut',
      stagger: {
        amount: 1.5,
        grid: [8, 3],
        axis: null,
        ease: 'power3.inOut',
        from: 'center'
      },
      scrollTrigger: {
        trigger: '#projects',
        start: 'top 40%',
        end: '+=100',
        scrub: 0.5,
        toggleActions: 'play none none reverse'
      }
    }
  )
})
</script>

<template>
  <div>
    <modal
      :show="!!selectedProjectId"
      @close="selectedProjectId = false"
      modalContentClass="bg-neutral text-secondary"
      buttonClass="text-white/50 hover:text-white hover:bg-neutral-light border-white/50"
    >
      <article class="box mx-auto max-w-4xl md:p-10 pt-5 mt-24">
        <div class="p-10">
          <h3 class="text-2xl pb-5">{{ projectData.title }}</h3>
          <section class="pb-5">
            <h4 class="pb-1">PROJECT DESCRIPTION</h4>
            <p class="pb-1 text-tertiary">{{ projectData.description }}</p>
            <a
              :href="projectData.url"
              target="_blank"
              class="text-ellipsis overflow-hidden underline"
            >
              Go to the project.
            </a>
          </section>
          <section class="pb-5">
            <h4 class="pb-1">JOB DESCRIPTION</h4>
            <p class="pb-2 text-tertiary" v-if="projectData.jobDescription">
              {{ projectData.jobDescription }}
            </p>
            <p class="text-tertiary">
              <span v-if="projectData.BE">Back-end</span>
              <span v-if="projectData.BE && projectData.FE">&nbsp;&&nbsp;</span>
              <span v-if="projectData.FE">Front-end</span>
              <span v-if="projectData.BE || projectData.FE"
                >&nbsp;development.</span
              >
            </p>
          </section>
          <section class="pb-5 flex flex-wrap">
            <the-thumbnail
              v-for="t in projectData.technologies"
              :key="t.id"
              :id="t.id"
              :title="t.title"
              :thumbnailImage="t.thumbnailImage"
              class="p-3"
              thumbnailClasses="border-white/10"
            />
          </section>
        </div>
      </article>
    </modal>
    <div id="projects">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 opacity-0 transition-all duration-700 ease-out"
        v-display-when-in-view="0.1"
      >
        <button
          v-for="(item, index) in ITEMS"
          :key="item.id"
          :id="item.id"
          :data-index="index"
          @click="selectedProjectId = item.id"
          :class="[
            'grid-box flex flex-row group text-primary hover:text-secondary py-5 md:p-5'
          ]"
        >
          <div
            :class="[
              item.id,
              'flex shrink-0 items-center w-20 h-20 p-3 overflow-hidden rounded-50p group-hover:rounded-none shadow-black/80 group-hover:shadow-2xl group-hover:rotate-[360deg] border-primary border-2 group-hover:border-secondary transition-all duration-700 ease-out bg-white bg-cover bg-no-repeat bg-center saturate-150'
            ]"
          >
            <nuxt-img
              :src="`img/${item.backgroundImage}`"
              :alt="`Project ${item.title}`"
              width="80"
              class="saturate-150"
            />
          </div>
          <div class="grow min-w-0 p-1 pl-3">
            <div
              class="title p-2 pr-1 text-left text-ellipsis overflow-hidden border-b border-r border-dotted border-neutral-light/50 group-hover:border-secondary transition-all duration-500 ease-out"
            >
              {{ item.title }}
            </div>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box {
  --border-angle: 0turn;
  background-image: conic-gradient(
    from var(--border-angle) at -2% -2%,
    transparent 20%,
    theme('colors.neutral.light'),
    theme('colors.neutral.DEFAULT')
  );
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
  @apply scale-[3] translate-x-10 translate-y-1;
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
