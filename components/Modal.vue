<template>
    <Teleport to="body">
        <Transition name="modal">
            <div
                v-if="show"
                class="fixed top-0 left-0 w-full h-full z-20 display-block bg-secondary overflow-x-hidden overflow-y-auto"
            >
                <div class="w-screen max-w-none h-full m-0 relative">
                    <div class="relative flex flex-col w-full h-full">
                        <div
                            class="overflow-y-auto relative grow shrink basis-auto"
                        >
                            <div
                                class="p-11 my-3 hidden md:flex shrink-0 items-center justify-between"
                            >
                                <div></div>
                                <div>
                                    <button
                                        @click="$emit('close')"
                                        class="p-2 border-2 bg-secondary hover:bg-neutral border-neutral text-neutral hover:text-secondary transition duration-300"
                                        ref="target"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                            <slot />
                            <div class="w-full text-center pb-10">
                                <button
                                    @click="$emit('close')"
                                    class="p-2 border-2 bg-secondary hover:bg-neutral border-neutral text-neutral hover:text-secondary transition duration-300"
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
</template>

<script>
export default {
    props: {
        show: Boolean
    },
    methods: {
        handleClose(e) {
            if (e.keyCode === 27) this.$emit('close')
        }
    },
    watch: {
        show(newValue) {
            if (newValue)
                document.body.addEventListener('keyup', this.handleClose)
            else document.body.removeEventListener('keyup', this.handleClose)
        }
    }
}
</script>

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
