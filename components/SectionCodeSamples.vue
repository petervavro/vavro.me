
<script>
export default {
    setup() {
        const { target, isVisible } = useIsInViewport()

        return {
            target,
            isVisible
        }
    }
}
</script>
<style scoped>
.title-enter-active,
.title-leave-active {
    @apply transition duration-500 ease-in-out;
}

.title-enter-from,
.title-leave-to {
    @apply opacity-0;
}
</style>
<template>
    <div ref="target">
        <div class="py-28 container mx-auto lg:max-w-4xl">
            <section class="p-10 text-tertiary">
                <Transition name="title">
                    <h2
                        class="text-2xl pb-5 uppercase text-primary"
                        v-if="isVisible"
                    >
                        My code samples
                    </h2>
                </Transition>
                <ListCodeSamples v-if="isVisible" />
            </section>
        </div>
    </div>
</template>