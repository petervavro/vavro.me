<template>
  <div class="h-screen pt-[20vh] w-full flex justify-center">
    <div class="w-96 p-10 text-xl text-tertiary border-r border-dotted border-secondary">
      <p v-if="!isIntroTextVisible">Welcome.</p>
      <div class="intro" :class="{ show: isIntroTextVisible }">
        <div style="--delay: 0;" class="py-2 text-tertiary">
          <p :style="`--index: 0;`">Hi.</p>
          <p :style="`--index: 1;`">It's me, Peter Vavro,</p>
          <p :style="`--index: 2;`">your new <span class="text-primary-light">web &
              mobile</span> developer</p>
          <p :style="`--index: 3;`">you're looking for.</p>
        </div>
        <div style="--delay: 4;" class="py-1 text-secondary">
          <p :style="`--index: 0;`">let me show you why...</p>
        </div>
        <div style="--delay: 5;" class="py-2 text-white">
          <p :style="`--index: 0;`">but before, ...</p>
          <p :style="`--index: 1;`">catch some circles first</p>
          <p :style="`--index: 2;`">Go.</p>
        </div>
      </div>
    </div>
    <div class="grow"></div>
  </div>
</template>

<script>
export default {
  name: 'MainIntro',
  mounted() {
    this.isIntroTextVisible = true
  },
  data() {
    return {
      isIntroTextVisible: false,
    }
  }
}
</script>
<style scoped>
.intro p {
  @apply opacity-0 duration-1000 delay-500 ease-out transition-all translate-x-0 translate-y-1/2;
}

.intro.show p {
  @apply opacity-100 translate-x-0 translate-y-0;
  transition-delay: calc(var(--delay) * 1s + 0.5s * var(--index));
}
</style>