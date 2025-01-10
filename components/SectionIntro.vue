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