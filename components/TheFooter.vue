<template>
	<div class="py-10 md:p-20 text-primary text-center md:text-left">
		<div
			class="rounded-full border-2 border-secondary p-2 inline-flex mb-10 items-center"
		>
			<div>
				<h6 class="p-3">Contact me</h6>
			</div>
			<div>
				<PanelContact :is-github-visible="false" />
			</div>
		</div>
		<div class="md:flex md:flex-row-reverse justify-between items-center">
			<a href="#" class="border-2 border-secondary p-3 display-block">
				Back to top
			</a>
			<div class="p-10 py-16 md:p-0">
				All rights reserved © Peter Vavro 2013-{{ new Date().getFullYear() }}
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'TheFooter'
}
</script>
