<script>
export default {
  props: {
    show: Boolean,
    modalContentClass: String,
    buttonClass: String
  },
  methods: {
    handleClose(e) {
      if (e.keyCode === 27) this.$emit('close')
    }
  },
  watch: {
    show(newValue) {
      if (newValue) {
        document.body.addEventListener('keyup', this.handleClose)

        document.body.classList.add('overflow-hidden')
      } else {
        document.body.removeEventListener('keyup', this.handleClose)

        document.body.classList.remove('overflow-hidden')
      }
    }
  }
}
</script>

<template>
  <div>
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="show"
          :class="[
            'fixed top-0 left-0 w-full h-full z-30 display-block overflow-x-hidden overflow-y-auto',
            modalContentClass
          ]"
        >
          <div class="w-screen max-w-none h-full m-0 relative">
            <div class="relative flex flex-col w-full h-full">
              <div class="overflow-y-auto relative grow shrink basis-auto">
                <div
                  class="p-11 my-3 hidden md:flex shrink-0 items-center justify-between"
                ></div>
                <slot />
                <div class="w-full text-center py-10">
                  <button
                    @click="$emit('close')"
                    :class="[
                      'p-2 border-2 transition duration-300',
                      buttonClass ||
                        'bg-secondary hover:bg-neutral border-neutral text-neutral hover:text-secondary'
                    ]"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  @apply transition-all duration-300 ease-out;
}

.modal-enter-from,
.modal-leave-to {
  @apply opacity-0;
}
</style>
