<script setup>
import gsap from 'gsap'

onMounted(() => {
  var tl = gsap.timeline({ repeat: -1, delay: 3 })
  tl.from('.slider > div', { top: 40, opacity: 0 })
  tl.to('.slider > div', { top: 0, opacity: 1 })
  tl.to('.slider > div', { top: -40, opacity: 0, delay: 3 })
  tl.to('.slider > div', { top: -80, opacity: 1 })
  tl.to('.slider > div', { top: -120, opacity: 0, delay: 3 })
  tl.to('.slider > div', { top: -160, opacity: 1 })
  tl.to('.slider > div', { top: -200, opacity: 0, delay: 3 })
  tl.to('.slider > div', { top: 40 })
})
</script>
<template>
  <span class="slider">
    <div>with analytical and critical thinking;</div>
    <div>passionate for clean, tested code;</div>
    <div>self-starter able to deliver on time;</div>
    <div>ability to execute new ideas with autonomy;</div>
  </span>
</template>
<style lang="scss">
.slider {
  @apply h-9 overflow-hidden absolute;

  &:before,
  &:after {
    background: linear-gradient(
      rgb(52 58 64) 0%,
      rgba(255, 255, 255, 0) 20%,
      rgba(255, 255, 255, 0) 80%,
      rgb(52 58 64) 100%
    );
    content: '';
    @apply h-9 z-10 absolute top-0 bottom-0 left-0 right-0;
  }

  & > div {
    @apply text-secondary h-20 top-0 relative;
  }
}
</style>
