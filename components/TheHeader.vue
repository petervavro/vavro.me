<script setup lang="ts">
const isVisible = ref(false);

onMounted(() => {
  isVisible.value = true;
});
</script>

<template>
  <header
    class="bg-neutral/50 fixed top-0 left-0 right-0 p-5 lg:px-10 flex justify-between items-center z-20 transition ease-in-out delay-150 opacity-0"
    :class="{ 'opacity-100': isVisible }">
    <div class="flex">
      <div>
        <NuxtLink to="/">
          <h1 class="text-primary text-2xl font-serif">Peter Vavro</h1>
        </NuxtLink>
        <p class="hidden lg:block text-sm text-secondary border-secondary border-t-2 pt-1 mt-1 w-80">
          Full-Stack Engineer<!-- with preference for Front-end -->
        </p>
      </div>
      <div class="hidden lg:block">
        <PanelContact class="pl-5" />
      </div>
    </div>
    <div>
      <MainMenu />
    </div>
  </header>
</template>

<style>
.no-js header {
  @apply opacity-100;
}
</style>
