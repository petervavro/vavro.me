<template>
	<div class="grid place-items-center h-screen grid-rows-1 grid-cols-1">
		<div class="intro pl-10" :class="{ show: isVisible }">
			<div
				class="px-10 py-5 text-tertiary text-lg border-primary-light/50 border-l-2"
			>
				<div style="--delay: 0">
					<p :style="`--index: 0;`">Hi, I am</p>
					<p :style="`--index: 1;`" class="text-6xl py-1">
						Peter Vavro
					</p>
					<p :style="`--index: 2;`">
						the <span class="text-secondary"> web & mobile </span>
						developer you're looking for.
					</p>
				</div>
				<div style="--delay: 2" class="pt-10">
					<p
						:style="`--index: 0;`"
						class="text-primary-light transition-all"
					>
						Please, let me show why you should hire me...
					</p>
				</div>
			</div>
			<i
				class="p-3 border-primary-light border-r-2 border-b-2 inline-block -ml-3 rotate-45 animate-pulse"
			>
			</i>
		</div>
	</div>
</template>

<script>
export default {
	mounted() {
		this.isVisible = true
	},
	data() {
		return {
			isVisible: false
		}
	}
}
</script>
<style scoped>
.intro p {
	@apply opacity-0 duration-1000 delay-1000 ease-out transition-all translate-x-0 translate-y-1/2;
}

.intro.show p {
	@apply opacity-100 translate-x-0 translate-y-0;
	transition-delay: calc(var(--delay) * 1s + 0.5s * var(--index));
}
</style>