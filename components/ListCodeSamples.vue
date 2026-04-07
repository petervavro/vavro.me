<script setup>
const { $gsap } = useNuxtApp()
import TECHNOLOGIES from '~/assets/data/technologies.json'
import JSON_DATA from '~/assets/data/codes.json'

const items = JSON_DATA.map(({ technologies, ...rest }) => ({
  ...rest,
  technologies: TECHNOLOGIES.filter(({ id }) =>
    technologies.split(',').includes(id)
  )
}))

const getSource = (url) => {
  if (url.includes('gist.github')) return 'GitHub Gist'
  if (url.includes('github')) return 'GitHub'
  if (url.includes('codepen')) return 'CodePen'
  if (url.includes('npmjs')) return 'npm'
  return 'Link'
}

onMounted(() => {
  $gsap.fromTo('.code-box',
    { y: 20, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
      stagger: { amount: 0.8, from: 'start' },
      scrollTrigger: {
        trigger: '#code-samples',
        start: 'top 60%',
        toggleActions: 'play none none none'
      }
    }
  )
})
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    <a :href="item.url" target="_blank" v-for="(item, index) in items" :key="item.title"
      class="code-box group relative flex flex-col gap-4 p-5 border border-neutral-light/5 hover:bg-neutral-light/5 transition-all duration-300 overflow-hidden">

      <!-- corner brackets -->
      <span class="absolute top-0 left-0 w-4 h-4 border-t border-l border-neutral-light/20 group-hover:border-secondary group-hover:w-6 group-hover:h-6 transition-all duration-300" />
      <span class="absolute top-0 right-0 w-4 h-4 border-t border-r border-neutral-light/20 group-hover:border-secondary group-hover:w-6 group-hover:h-6 transition-all duration-300" />
      <span class="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-neutral-light/20 group-hover:border-secondary group-hover:w-6 group-hover:h-6 transition-all duration-300" />
      <span class="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-neutral-light/20 group-hover:border-secondary group-hover:w-6 group-hover:h-6 transition-all duration-300" />

      <!-- top accent line -->
      <div class="absolute top-0 left-0 right-0 h-px bg-secondary/60 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />

      <!-- index + source -->
      <div class="flex items-center justify-between">
        <span class="text-xs font-mono text-neutral-light/30">{{ String(index + 1).padStart(2, '0') }}</span>
        <span class="text-xs text-neutral-light/40 group-hover:text-secondary/70 transition-colors duration-300">{{ getSource(item.url) }} →</span>
      </div>

      <!-- title -->
      <h3 class="text-base font-semibold text-primary group-hover:text-secondary transition-colors duration-300">{{ item.title }}</h3>

      <!-- desc -->
      <p class="text-xs text-white/50 leading-relaxed grow">{{ item.desc }}</p>

      <!-- tech pills -->
      <div class="flex flex-wrap gap-1.5 pt-2 border-t border-dotted border-neutral-light/10">
        <span v-for="t in item.technologies" :key="t.id"
          class="text-xs px-2 py-0.5 border border-primary/40 text-primary/80 group-hover:border-secondary/60 group-hover:text-secondary/80 transition-colors duration-300">
          {{ t.title }}
        </span>
      </div>

    </a>
  </div>
</template>
