<script setup lang="ts">
import { ref, onMounted } from 'vue'
const { $gsap } = useNuxtApp()

const delay = 2

const slider = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!slider.value) return

  const tl = $gsap.timeline({ repeat: -1, delay })

  $gsap.utils.toArray<HTMLElement>(slider.value.children)
    .forEach((slide, i) => {
      tl.from(slide, {
        opacity: 0
      }).to(slide, {
        opacity: 1
      }).to(slide, {
        opacity: 0,
        delay: delay + i
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
  @apply relative h-14 overflow-hidden;

  &>div {
    @apply absolute top-0 bottom-0 left-0 right-0;
  }
}
</style>
