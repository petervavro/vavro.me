<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const slider = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!slider.value) return

  // Get slides
  const slides = Array.from(slider.value.children) as HTMLElement[]

  // Set delay
  const delay = 2

  const tl = gsap.timeline({ repeat: -1, delay })

  slides.forEach((slide, i) => {
    tl.to(slide, {
      opacity: 1
    })

    tl.to(slide, {
      opacity: 0,
      delay
    })
  })
})
</script>

<template>
  <div ref="slider" class="slider">
    <div>with analytical and critical thinking;</div>
    <div>passionate for clean, tested code;</div>
    <div>self-starter able to deliver on time;</div>
    <div>ability to execute new ideas with autonomy;</div>
  </div>
</template>

<style lang="scss">
.slider {
  @apply overflow-hidden text-secondary relative pt-16;

  &>div {
    @apply absolute top-0 bottom-0 left-0 right-0 opacity-0;
  }
}
</style>
