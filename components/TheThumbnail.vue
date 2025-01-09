<script setup>
const props = defineProps({
  id: String,
  title: String,
  titleClasses: [String, Array],
  thumbnailImage: String,
  thumbnailClasses: [String, Array],
  thumbnailImageClasses: [String, Array]
})
</script>

<template>
  <div>
    <div :class="['text-xs pb-3', props.titleClasses || 'text-center']">
      {{ props.title }}
    </div>
    <div :class="[
      props.id,
      props.thumbnailClasses || 'bg-neutral-light/50',
      'rounded-full border-2 border-neutral-light contrast-125',
      'flex items-center w-20 h-20 p-5 overflow-hidden'
    ]">
      <NuxtImg :src="`img/${props.thumbnailImage}`" :alt="props.title" width="100"
        :class="[props.thumbnailImageClasses || '']" />
    </div>
  </div>
</template>

<style scoped lang="scss">
img {
  @apply block;
}

.orientdb {
  @apply p-1 py-5;
}

.orientdb img,
.babel img {
  @apply max-w-none;
}

.babel {
  @apply p-2 justify-center;
}

.babel img {
  @apply block scale-50;
}

.express {
  @apply p-3;
}

.loopback,
.angularjs,
.mongodb,
.gsap,
.wordpress,
.joomla,
.mysql {
  @apply p-2;
}

.gsap img {
  @apply rounded-sm;
}

.php img,
.ejs img,
.react img,
.react-native img {
  @apply rounded-md;
}

.shadow-in {
  @apply bg-white/80;
  box-shadow: inset 0px 4px 22px theme('colors.primary.DEFAULT');
}
</style>
