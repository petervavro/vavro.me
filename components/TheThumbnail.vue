<template>
    <a :href="url" target="_blank">
        <div class="text-xs pb-3 text-center">{{ title }}</div>
        <div v-if="thumbnailImage"
            class="w-20 h-20 rounded-full border-2 border-primary-contrast shadow-lg shadow-primary-500/50 bg-white bg-[length:50%] bg-no-repeat bg-center"
            :style="{
                'background-image': `url(${thumbnailImage})`,
            }"></div>
    </a>
</template>
<script>
export default {
    props: {
        url: String,
        title: String,
        thumbnailImage: String
    }
}
</script>