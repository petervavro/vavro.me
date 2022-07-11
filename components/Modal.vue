<template>
  <Transition name="modal">
    <div
      v-if="show"
      class="fixed top-0 bottom-0 left-0 right-0 z-20 grid w-full h-full bg-secondary text-primary"
    >
      <div class="self-center justify-self-center">
        <button
          @click="$emit('close')"
          class="absolute top-10 right-10 border-primary border-2 p-3"
        >
          Close
        </button>
        <slot />
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  props: {
    show: Boolean
  }
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  @apply transition-all duration-500 ease-out;
}

.modal-enter-from,
.modal-leave-to {
  @apply opacity-0;
}
</style>
