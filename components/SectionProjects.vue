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

<template>
    <div ref="target">
        <div class="py-28 container mx-auto lg:max-w-4xl">
            <section class="p-10 text-secondary">
                <h2 class="text-2xl drop-shadow-md pb-10 uppercase">
                    Things I've helped to build
                </h2>
                <list-projects v-if="isVisible" />
            </section>
        </div>
    </div>
</template>
