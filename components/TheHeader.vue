<script>
export default {
  data() {
    return { isVisible: false }
  },
  mounted() {
    this.isVisible = true
  }
}
</script>

<template>
  <Transition>
    <div
      class="bg-neutral/50 fixed w-full p-5 lg:p-10 flex justify-between items-center z-20"
      v-show="isVisible"
    >
      <div class="flex">
        <div>
          <NuxtLink to="/">
            <h1 class="text-primary text-2xl">Peter Vavro</h1>
          </NuxtLink>
          <p
            class="hidden lg:block text-secondary border-secondary border-t-2 pt-1 mt-1 w-80"
          >
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
    </div>
  </Transition>
</template>

<style>
.v-enter-active,
.v-leave-active {
  @apply transition-all duration-500 ease-in-out;
}

.v-enter-from,
.v-leave-to {
  @apply opacity-0 -translate-y-4;
}
</style>
