
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
			<section class="p-10 text-tertiary">
				<h2 class="text-2xl pb-5 uppercase text-primary">
					My code samples
				</h2>
				<ListCodeSamples v-if="isVisible" />
			</section>
		</div>
	</div>
</template>