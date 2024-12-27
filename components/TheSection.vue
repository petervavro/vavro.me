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
    id: String,
    title: String,
    titleClass: String
  }
}
</script>

<template>
  <div ref="target" :id="id">
    <div class="container mx-auto lg:max-w-4xl">
      <section class="p-10">
        <h2 class="text-2xl md:text-2xl uppercase text-gray-300" :class="[
          titleClass
            ? titleClass
            : 'lg:text-4xl lg:-rotate-90 lg:-translate-x-[28rem]'
        ]">
          <a :href="'#' + id">{{ title }}</a>
        </h2>
        <div class="pl-10 border-l border-primary border-dotted">
          <slot :class="[isVisible ? 'opacity-100' : 'opacity-0']" />
        </div>
      </section>
    </div>
  </div>
</template>
