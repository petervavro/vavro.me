<script setup lang="ts">
const isVisible = ref(true);

onMounted(() => {
  isVisible.value = true;
});
</script>

<template>
  <div class="grid place-items-center h-screen grid-rows-1 grid-cols-1">
    <div class="content opacity-0" :class="{ 'opacity-100': isVisible }">
      <IntroObject />
      <div class="absolute bottom-10 left-10">
        <div class="pt-3">
          <NuxtLink to="/#about-me" class="menu-link" aria-label="Go to About me">
            <i
              class="p-2 border-primary-light hover:border-tertiary border-r-2 border-b-2 inline-block ml-2 rotate-45 animate-pulse">
            </i>
          </NuxtLink>
        </div>
      </div>
      <div class="absolute bottom-10 right-10 flex">
        <span class="pr-3 text-secondary/80 text-xs">Available</span>
        <span class="relative flex h-3 w-3 mt-1">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content {
  @apply flex transition ease-in-out delay-300;
}

.no-js .content {
  @apply opacity-100;
}
</style>