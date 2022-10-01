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
		<div class="container mx-auto lg:max-w-4xl">
			<section class="p-10 text-primary">
				<h2 class="text-2xl pb-10 uppercase">My experience</h2>
				<list-technologies v-if="isVisible" />
			</section>
		</div>
	</div>
</template>