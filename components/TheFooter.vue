<script>
export default {}
</script>
	
<template>
	<div class="py-10 md:p-20 text-primary text-center md:text-left">
		<div
			class="p-1 rounded-full border-2 border-secondary inline-flex mb-10 items-center"
		>
			<div class="p-3">Contact me</div>
			<PanelContact :is-github-visible="false" />
		</div>
		<div class="md:flex md:flex-row-reverse justify-between items-center">
			<a href="#" class="p-2 border-2 border-secondary display-block">
				Back to top
			</a>
			<div class="p-10 py-16 md:p-0">
				All rights reserved © Peter Vavro 2013-{{
					new Date().getFullYear()
				}}
			</div>
		</div>
	</div>
</template>