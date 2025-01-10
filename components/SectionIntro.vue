<script setup lang="ts">
const isVisible = ref(false);

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
          <NuxtLink to="/#about-me" class="menu-link">
            <i
              class="p-2 border-primary-light hover:border-tertiary border-r-2 border-b-2 inline-block ml-2 rotate-45 animate-pulse">
            </i>
          </NuxtLink>
        </div>
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