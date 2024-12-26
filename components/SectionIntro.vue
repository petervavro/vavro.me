<script setup lang="ts">
const { $gsap } = useNuxtApp()

onMounted(() => {
  $gsap.timeline()
    .set('#intro-content', {
      opacity: 0,
      scale: 0,
    }).to('#intro-content', {
      opacity: 1,
      scale: 1,
    });

  const introContent = document.getElementById('intro-content');

  if (introContent) {
    introContent.classList.remove('opacity-0');
  }
})
</script>

<template>
  <div class="grid place-items-center h-screen grid-rows-1 grid-cols-1">
    <section id="intro-content" class="flex px-5 corners relative opacity-0">
      <Bullets />
      <div class="text-tertiary text-sm md:text-base p-5 md:p-16 text-animation">
        <div>
          <p>Hi, I am</p>
          <p class="title-text text-4xl md:text-7xl py-1">Peter Vavro</p>
          <ul class="relative leading-relaxed list-square list-outside ml-5">
            <li class="text-primary">
              the full-stack
              <span class="text-secondary"> web & mobile </span>engineer;
            </li>
            <li class="h-14 relative">
              <TextCarousel />
            </li>
          </ul>
        </div>
        <div class="pt-8">
          <span class="pt-5">The developer you need is right here.</span>
          <!-- <span class="text-neutral-light text-sm md:text-sm">Please, let me show why you should hire me...</span> -->
          <div class="pt-3">
            <div>
              <i class="p-3 border-primary-light border-r-2 border-b-2 inline-block ml-2 rotate-45 animate-pulse">
              </i>
            </div>
            <div class="-translate-y-4">
              <i class="p-3 border-primary-light border-r-2 border-b-2 inline-block ml-2 rotate-45 animate-pulse">
              </i>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.corners {
  background: linear-gradient(to right,
      theme('colors.secondary.DEFAULT') 1px,
      transparent 1px) 0 0,
    linear-gradient(to right,
      theme('colors.secondary.DEFAULT') 1px,
      transparent 1px) 0 100%,
    linear-gradient(to left,
      theme('colors.secondary.DEFAULT') 1px,
      transparent 1px) 100% 0,
    linear-gradient(to left,
      theme('colors.secondary.DEFAULT') 1px,
      transparent 1px) 100% 100%,
    linear-gradient(to bottom,
      theme('colors.secondary.DEFAULT') 1px,
      transparent 1px) 0 0,
    linear-gradient(to bottom,
      theme('colors.secondary.DEFAULT') 1px,
      transparent 1px) 100% 0,
    linear-gradient(to top,
      theme('colors.secondary.DEFAULT') 1px,
      transparent 1px) 0 100%,
    linear-gradient(to top,
      theme('colors.secondary.DEFAULT') 1px,
      transparent 1px) 100% 100%;

  background-repeat: no-repeat;
  background-size: 1rem 1rem;
}

.no-js .corners {
  @apply opacity-100;
}

.title-text {
  font-family: 'Staatliches', cursive;
}
</style>
