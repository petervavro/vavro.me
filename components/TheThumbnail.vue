<template>
  <div>
    <div
      class="text-xs pb-3 text-center group-hover:text-primary transition duration-300"
    >
      {{ title }}
    </div>
    <div
      v-if="thumbnailImage"
      class="w-20 h-20 rounded-full bg-secondary/50 group-hover:bg-primary/50 border-2 border-secondary group-hover:border-primary bg-[length:50%] bg-no-repeat bg-center contrast-125 transition duration-300"
      :style="{
        'background-image': `url(${thumbnailImage})`
      }"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    thumbnailImage: String
  }
}
</script>
