<script setup>
const props = defineProps({
  id: String,
  title: String,
  titleClasses: String,
  thumbnailImage: String,
  thumbnailClasses: String
})
</script>

<template>
  <div>
    <div
      :class="[
        props.titleClasses || '',
        'text-xs pb-3 transition duration-300 text-center'
      ]"
    >
      {{ props.title }}
    </div>
    <div
      :class="[
        props.id,
        props.thumbnailClasses || '',
        'rounded-full bg-secondary/50  border-2 border-secondary contrast-125',
        'transition duration-300',
        'flex items-center w-20 h-20 p-5 overflow-hidden'
      ]"
    >
      <nuxt-img
        :src="`img/${props.thumbnailImage}`"
        :alt="props.title"
        width="100"
      />
    </div>
  </div>
</template>

<style scoped>
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
</style>
