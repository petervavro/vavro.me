<template>
	<Transition name="modal">
		<div
			v-if="show"
			class="fixed top-0 left-0 w-full h-full z-20 display-block bg-secondary overflow-x-hidden overflow-y-auto"
		>
			<div class="w-screen max-w-none h-full m-0 relative">
				<div class="relative flex flex-col w-full h-full">
					<div class="overflow-y-auto relative grow shrink basis-auto">
						<div class="flex shrink-0 items-center justify-between p-5">
							<div></div>
							<div>
								<button
									@click="$emit('close')"
									class="border-neutral border-2 p-3 text-neutral"
									ref="target"
								>
									Close
								</button>
							</div>
						</div>
						<slot />
						<div class="w-full text-center pb-10">
							<button
								@click="$emit('close')"
								class="border-neutral border-2 p-3 text-neutral"
							>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Transition>
</template>

<script>
export default {
	props: {
		show: Boolean
	}
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
	@apply transition-all duration-300 ease-out;
}

.modal-enter-from,
.modal-leave-to {
	@apply opacity-0;
}
</style>
