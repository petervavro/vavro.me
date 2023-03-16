<script setup>
import gsap from 'gsap'

const slider = ref(null)

onMounted(() => {
  // Get height of wrapper element
  const slideHeight = +slider.value.clientHeight

  // Get top padding defined on first slide
  const topOffset = parseInt(
    window
      .getComputedStyle(slider.value.firstChild, null)
      .getPropertyValue('padding-top'),
    10
  )

  // Get slides
  const slides = [...slider.value.children]

  // Set delay
  const delay = 1

  var tl = gsap.timeline({ repeat: -1, delay })

  slides.forEach((slide, i) => {
    tl.to(slide, {
      y:
        -topOffset -
        slides
          .slice(0, i)
          .map((el) => el.clientHeight)
          .reduce((partialSum, a) => partialSum + a, 0),
      opacity: 1
    })

    tl.to(slide, {
      y: -slides
        .slice(0, i + 1)
        .map((el) => el.clientHeight)
        .reduce((partialSum, a) => partialSum + a, 0),
      opacity: 0,
      delay
    })
  })
})
</script>
<template>
  <span class="slider" ref="slider">
    <div>with analytical and critical thinking;</div>
    <div>passionate for clean, tested code;</div>
    <div>self-starter able to deliver on time;</div>
    <div>ability to execute new ideas with autonomy;</div>
  </span>
</template>
<style lang="scss">
.slider {
  @apply overflow-hidden absolute top-0 bottom-0 left-0 right-0;

  & > div {
    @apply text-secondary top-0 relative pt-16;
  }
}
</style>
