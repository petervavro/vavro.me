<script setup lang="ts">

const isWrapVisible = ref(false);

onMounted(() => {
  isWrapVisible.value = true;
});

</script>

<template>
  <div class="grid place-items-center h-screen grid-rows-1 grid-cols-1">
    <div class="flex px-5" v-show="isWrapVisible">
      <IntroObjectA />
    </div>
  </div>
</template>
