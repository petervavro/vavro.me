<script setup lang="ts">
import { ref, onMounted } from 'vue'
const { $gsap } = useNuxtApp()

const delay = 2

onMounted(() => {

  // Get all elements
  const slotElements = useSlots().default().map((v) => v.el);

  const tl = $gsap.timeline({ repeat: -1, delay })

  $gsap.utils.toArray<HTMLElement>(slotElements)
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
  <slot />
</template>
