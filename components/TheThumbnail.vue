<template>
	<div>
		<div class="text-xs pb-3 text-center">{{ title }}</div>
		<div
			v-if="thumbnailImage"
			class="w-20 h-20 rounded-full bg-secondary/50 border-2 border-secondary bg-[length:50%] bg-no-repeat bg-center contrast-125"
			:style="{
				'background-image': `url(${thumbnailImage})`
			}"
		></div>
	</div>
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