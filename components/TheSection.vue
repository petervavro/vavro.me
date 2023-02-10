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
    title: String,
    titleClass: String
  }
}
</script>

<template>
  <div ref="target">
    <div class="container mx-auto lg:max-w-4xl">
      <section class="p-10">
        <h2
          class="text-4xl uppercase text-primary"
          :class="[
            titleClass
              ? titleClass
              : 'lg:text-4xl lg:-rotate-90 lg:-translate-x-[28rem]'
          ]"
        >
          {{ title }}
        </h2>
        <div class="pt-5">
          <slot :class="[isVisible ? 'opacity-100' : 'opacity-0']" />
        </div>
      </section>
    </div>
  </div>
</template>
