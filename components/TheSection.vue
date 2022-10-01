<script>
export default {
    setup() {
        const { target, isVisible } = useIsInViewport()

        return {
            target,
            isVisible
        }
    },
    props: {
        title: String
    }
}
</script>
        
<template>
    <div ref="target">
        <div class="container mx-auto lg:max-w-4xl">
            <section class="p-10">
                <h2 class="text-2xl pb-5 uppercase text-primary">
                    {{ title }}
                </h2>
                <slot v-if="isVisible" />
            </section>
        </div>
    </div>
</template>